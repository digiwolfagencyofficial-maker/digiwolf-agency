import { NextResponse } from 'next/server'
import { onboardClient, OnboardingError } from '@/lib/onboarding'
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface OnboardClientRequestBody {
  email?: string
  full_name?: string
  service_slug?: string
  amount?: number
  currency?: string
}

/**
 * Internal automation endpoint — called by n8n (WF3) after a successful
 * Stripe payment to run the same client-onboarding flow used by the admin
 * "Add Client" UI, without n8n reimplementing the Supabase/Resend logic.
 *
 * Auth: shared secret header, not a user session — this is server-to-server
 * only and must never be exposed to the browser.
 */
export async function POST(req: Request) {
  const internalSecret = process.env.N8N_INTERNAL_SECRET
  const providedSecret = req.headers.get('x-internal-secret')

  if (!internalSecret || !providedSecret || providedSecret !== internalSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Server is not configured. Missing Supabase environment variables.' },
      { status: 500 }
    )
  }

  let body: OnboardClientRequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  const fullName = body.full_name?.trim()
  const serviceSlug = body.service_slug?.trim()
  const amount = body.amount
  const currency = body.currency?.trim().toUpperCase() || 'CZK'

  if (!email || !fullName || !serviceSlug) {
    return NextResponse.json(
      { error: 'email, full_name and service_slug are all required.' },
      { status: 400 }
    )
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  if (amount !== undefined && (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0)) {
    return NextResponse.json({ error: 'amount must be a positive number.' }, { status: 400 })
  }

  const { data: service, error: serviceError } = await supabaseAdmin
    .from('services')
    .select('id, active')
    .eq('slug', serviceSlug)
    .maybeSingle()

  if (serviceError) {
    console.error('[internal/onboard-client] Service lookup failed:', serviceError)
    return NextResponse.json({ error: 'Could not validate the selected service.' }, { status: 500 })
  }

  if (!service || service.active === false) {
    return NextResponse.json({ error: `Unknown or inactive service_slug: ${serviceSlug}` }, { status: 400 })
  }

  let userId: string
  let projectId: string
  try {
    const result = await onboardClient({ email, fullName, serviceId: service.id })
    userId = result.userId
    projectId = result.projectId
  } catch (err) {
    if (err instanceof OnboardingError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error('[internal/onboard-client] unexpected onboarding error:', err)
    return NextResponse.json({ error: 'Failed to onboard client.' }, { status: 500 })
  }

  if (amount !== undefined) {
    const invoiceNumber = `INV-${Date.now()}-${userId.slice(0, 8).toUpperCase()}`
    const { error: invoiceError } = await supabaseAdmin.from('invoices').insert({
      invoice_number: invoiceNumber,
      amount,
      currency,
      status: 'paid',
      user_id: userId,
    })

    if (invoiceError) {
      // Client + project already exist at this point — don't roll those back over
      // an invoice-logging failure. Surface it so n8n can alert/retry the invoice step.
      console.error('[internal/onboard-client] invoice insert failed:', invoiceError)
      return NextResponse.json(
        {
          error: 'Client onboarded, but failed to record the paid invoice.',
          userId,
          projectId,
        },
        { status: 502 }
      )
    }
  }

  return NextResponse.json({ success: true, userId, projectId })
}
