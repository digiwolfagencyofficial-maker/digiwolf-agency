import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, budget, message } = body

    if (!name || !email || !service || !budget || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert({
        name,
        email,
        company: company || null,
        service,
        budget,
        message,
        status: 'new',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Still return success to the user — don't expose DB errors
    }

    return NextResponse.json(
      { success: true, message: 'Thank you! We will be in touch within 4 business hours.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
