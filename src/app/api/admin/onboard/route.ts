import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/auth'
import { sendClientWelcomeEmail } from '@/lib/email'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://digiwolf.agency'
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

  // Step B — insert profile (FK requires the auth user to exist first).
  const { error: profileError } = await supabaseAdmin.from('profiles').insert({
    id: userId,
    full_name: fullName,
    role: 'client',
  })

  if (profileError) {
    console.error('[onboard] profile insert failed:', profileError)
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

  // Step D — generate a set-password invite link. We build our own confirm URL
  // from the hashed token so the session is established server-side via
  // /auth/confirm (verifyOtp), then the client lands on /auth/update-password.
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'invite',
    email,
    options: { redirectTo: `${siteUrl()}/auth/update-password` },
  })

  const hashedToken = linkData?.properties?.hashed_token

  if (linkError || !hashedToken) {
    console.error('[onboard] generateLink failed:', linkError)
    await rollback(userId)
    return NextResponse.json({ error: 'Failed to generate the invite link.' }, { status: 500 })
  }

  const actionLink =
    `${siteUrl()}/auth/confirm?token_hash=${encodeURIComponent(hashedToken)}` +
    `&type=invite&next=${encodeURIComponent('/auth/update-password')}`

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
