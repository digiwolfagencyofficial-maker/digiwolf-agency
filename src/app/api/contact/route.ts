import { NextRequest, NextResponse } from 'next/server'
import { contactLeadSchema, formatContactFieldErrors } from '@/lib/contact-options'
import { sendLeadNotification } from '@/lib/email'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactLeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Please check the highlighted fields.',
          fields: formatContactFieldErrors(parsed.error),
        },
        { status: 400 }
      )
    }

    const { name, email, company, service, budget, message } = parsed.data

    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      company: company || null,
      service,
      budget,
      message,
      status: 'new',
      source: 'contact',
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        {
          error: 'We could not save your message. Please try again or email us directly.',
        },
        { status: 500 }
      )
    }

    sendLeadNotification({
      name,
      email,
      company: company || null,
      service,
      budget,
      message,
    }).catch((err) => console.error('Lead notification email failed:', err))

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch within 4 business hours.',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
