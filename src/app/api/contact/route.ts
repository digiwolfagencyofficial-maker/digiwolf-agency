import { NextRequest, NextResponse } from 'next/server'
import { contactLeadSchema, formatContactFieldErrors } from '@/lib/contact-options'
import { sendLeadNotification } from '@/lib/email'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendTelegramNotification } from '@/lib/telegram'
import { mapLangToN8nLead, mapServiceToN8nLead, sendLeadToN8n } from '@/lib/n8n'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactLeadSchema.safeParse(body)
    // Not part of the validated lead schema — just metadata for the n8n webhook.
    const lang = mapLangToN8nLead(typeof body?.lang === 'string' ? body.lang : undefined)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Please check the highlighted fields.',
          fields: formatContactFieldErrors(parsed.error),
        },
        { status: 400 }
      )
    }

    // Guard: surface missing/placeholder Supabase config instead of silently
    // inserting into a placeholder client (the main "works locally" trap).
    if (!isSupabaseConfigured()) {
      console.error('[contact] Supabase is NOT configured. Missing env vars:', {
        NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      })
      return NextResponse.json(
        {
          error:
            'Server is not configured to accept submissions right now. Please email us directly.',
        },
        { status: 500 }
      )
    }

    const { name, email, company, service, budget, message } = parsed.data

    const { data: inserted, error: dbError } = await supabaseAdmin
      .from('leads')
      .insert({
        name,
        email,
        company: company || null,
        service,
        budget,
        message,
        status: 'new',
        source: 'contact',
      })
      .select('id')
      .single()

    if (dbError) {
      // Full error so it shows up clearly in Vercel runtime logs.
      console.error('[contact] Supabase insert failed:', {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code,
      })
      return NextResponse.json(
        {
          error: 'We could not save your message. Please try again or email us directly.',
        },
        { status: 500 }
      )
    }

    console.log('[contact] Lead saved:', inserted?.id)

    sendLeadNotification({
      name,
      email,
      company: company || null,
      service,
      budget,
      message,
    }).catch((err) => console.error('Lead notification email failed:', err))

    try {
      await sendTelegramNotification({
        title: 'New contact lead',
        name,
        email,
        service,
        summary: `${budget} — ${message}`,
      })
    } catch (err) {
      console.error('Telegram notification failed:', err)
    }

    // Awaited so the webhook POST completes before this serverless function's
    // execution is frozen — sendLeadToN8n() already catches its own errors,
    // so a webhook failure still can't affect the response below.
    await sendLeadToN8n({
      name,
      email,
      phone: '',
      message,
      service: mapServiceToN8nLead(service),
      lang,
      source: 'contact-form',
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch within 4 business hours.',
    })
  } catch (error) {
    console.error('[contact] Unexpected API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
