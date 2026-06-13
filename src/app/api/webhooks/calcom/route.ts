import { NextRequest, NextResponse } from 'next/server'
import { parseCalcomBooking, verifyCalcomSignature, type CalcomWebhookBody } from '@/lib/calcom-webhook'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-cal-signature-256')

  if (!verifyCalcomSignature(rawBody, signature, process.env.CALCOM_WEBHOOK_SECRET)) {
    console.error('[calcom webhook] Invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let body: CalcomWebhookBody
  try {
    body = JSON.parse(rawBody) as CalcomWebhookBody
  } catch (error) {
    console.error('[calcom webhook] Invalid JSON body:', error)
    return NextResponse.json({ ok: true })
  }

  if (body.triggerEvent !== 'BOOKING_CREATED') {
    return NextResponse.json({ ok: true })
  }

  const booking = parseCalcomBooking(body)
  if (!booking) {
    console.error('[calcom webhook] Missing required booking fields', {
      triggerEvent: body.triggerEvent,
      uid: body.payload?.uid,
    })
    return NextResponse.json({ ok: true })
  }

  try {
    const row = {
      name: booking.name,
      email: booking.email,
      event_time: booking.event_time,
      event_type: booking.event_type,
      notes: booking.notes,
      calcom_uid: booking.calcom_uid,
      preferred_date: booking.preferred_date,
      preferred_time: booking.preferred_time,
      service: booking.service,
      message: booking.message,
      status: booking.status,
    }

    const { error } = booking.calcom_uid
      ? await supabaseAdmin.from('bookings').upsert(row, { onConflict: 'calcom_uid' })
      : await supabaseAdmin.from('bookings').insert(row)

    if (error) {
      console.error('[calcom webhook] Supabase insert failed:', error)
    }
  } catch (error) {
    console.error('[calcom webhook] Unexpected error saving booking:', error)
  }

  return NextResponse.json({ ok: true })
}
