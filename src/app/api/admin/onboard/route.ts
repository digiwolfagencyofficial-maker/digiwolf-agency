import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/auth'
import { sendClientWelcomeEmail } from '@/lib/email'
import { siteUrl } from '@/lib/site-url'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function canonicalSiteUrl() {
  return siteUrl.replace(/\/$/, '')
}

export async function GET() {
  const auth = await requireAdminApi()
  if (auth.error) return auth.error

  const { data, error } = await supabaseAdmin
    .from('services')
    .select('id, name, slug')
    .eq('active', true)
    .order('name')

  if (error) {
    console.error('[onboard] Failed to load services:', error)
    return NextResponse.json({ error: 'Failed to load services' }, { status: 500 })
  }

  return NextResponse.json({ services: data ?? [] })
}

export async function POST(req: Request) {
  const auth = await requireAdminApi()
  if (auth.error) return auth.error

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Server is not configured. Missing Supabase environment variables.' },
      { status: 500 }
    )
  }

  let body: { email?: string; full_name?: string; service_id?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  const fullName = body.full_name?.trim()
  const serviceId = body.service_id?.trim()

  if (!email || !fullName || !serviceId) {
    return NextResponse.json(
      { error: 'Email, full name and service are all required.' },
      { status: 400 }
    )
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const { data: service, error: serviceError } = await supabaseAdmin
    .from('services')
    .select('id, active')
    .eq('id', serviceId)
    .maybeSingle()

  if (serviceError) {
    console.error('[onboard] Service lookup failed:', serviceError)
    return NextResponse.json({ error: 'Could not validate the selected service.' }, { status: 500 })
  }

  if (!service || service.active === false) {
    return NextResponse.json({ error: 'The selected service is not available.' }, { status: 400 })
  }

  // Step A — create the auth user (no password; client sets it via invite link).
  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  })

  if (createError || !created?.user) {
    const message = createError?.message ?? 'Failed to create user'
    if (message.toLowerCase().includes('already')) {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 409 }
      )
    }
    console.error('[onboard] createUser failed:', createError)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const userId = created.user.id

  // Step B — ensure profile exists with correct name and role.
  // handle_new_user() trigger auto-creates a profile on auth.users insert;
  // upsert avoids duplicate-key errors and sets full_name from our form.
  const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
    {
      id: userId,
      full_name: fullName,
      role: 'client',
    },
    { onConflict: 'id' }
  )

  if (profileError) {
    console.error('[onboard] profile upsert failed:', profileError)
    await supabaseAdmin.from('profiles').delete().eq('id', userId)
    await supabaseAdmin.auth.admin.deleteUser(userId)
    return NextResponse.json({ error: 'Failed to create client profile.' }, { status: 500 })
  }

  // Step C — insert the project in the Onboarding state.
  const { data: project, error: projectError } = await supabaseAdmin
    .from('projects')
    .insert({
      user_id: userId,
      service_id: serviceId,
      project_status: 'Onboarding',
    })
    .select('id')
    .single()

  if (projectError || !project) {
    console.error('[onboard] project insert failed:', projectError)
    await supabaseAdmin.from('profiles').delete().eq('id', userId)
    await supabaseAdmin.auth.admin.deleteUser(userId)
    return NextResponse.json({ error: 'Failed to create client project.' }, { status: 500 })
  }

  // Step D — recovery link; redirect straight to update-password (implicit hash flow).
  const baseUrl = canonicalSiteUrl()
  const redirectTo = `${baseUrl}/auth/update-password`
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo },
  })

  const actionLink = linkData?.properties?.action_link

  if (linkError || !actionLink) {
    console.error('[onboard] generateLink failed:', linkError, linkData?.properties)
    await rollback(userId)
    return NextResponse.json({ error: 'Failed to generate the invite link.' }, { status: 500 })
  }

  // Step E — send the branded welcome email via Resend.
  try {
    await sendClientWelcomeEmail({ fullName, email, setPasswordUrl: actionLink })
  } catch (err) {
    console.error('[onboard] welcome email failed:', err)
    await rollback(userId)
    return NextResponse.json(
      { error: 'Client created but the welcome email could not be sent. Please try again.' },
      { status: 502 }
    )
  }

  return NextResponse.json({
    success: true,
    userId,
    projectId: project.id,
    emailSent: true,
  })
}

async function rollback(userId: string) {
  await supabaseAdmin.from('projects').delete().eq('user_id', userId)
  await supabaseAdmin.from('profiles').delete().eq('id', userId)
  await supabaseAdmin.auth.admin.deleteUser(userId)
}
