import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'date param required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('preferred_time')
    .eq('preferred_date', date)
    .neq('status', 'cancelled')

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }

  const booked = new Set((data || []).map((b: { preferred_time: string }) => b.preferred_time))
  const available = TIME_SLOTS.filter((t) => !booked.has(t))

  return NextResponse.json({ available })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message, preferred_date, preferred_time } = body

    if (!name || !email || !service || !preferred_date || !preferred_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!TIME_SLOTS.includes(preferred_time)) {
      return NextResponse.json({ error: 'Invalid time slot' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        name,
        email,
        company: company || null,
        service,
        message: message || null,
        preferred_date,
        preferred_time,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Booking insert error:', error)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
