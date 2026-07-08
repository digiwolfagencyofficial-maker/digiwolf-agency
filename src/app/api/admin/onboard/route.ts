import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/auth'
import { onboardClient, OnboardingError } from '@/lib/onboarding'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  try {
    const { userId, projectId } = await onboardClient({ email, fullName, serviceId })
    return NextResponse.json({
      success: true,
      userId,
      projectId,
      emailSent: true,
    })
  } catch (err) {
    if (err instanceof OnboardingError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error('[onboard] unexpected error:', err)
    return NextResponse.json({ error: 'Failed to onboard client.' }, { status: 500 })
  }
}
