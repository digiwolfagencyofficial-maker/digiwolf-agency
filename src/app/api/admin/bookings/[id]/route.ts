import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { deleteCalendarEvent } from '@/lib/google-calendar'

// PATCH /api/admin/bookings/[id] — update booking status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // If cancelling, get the google_event_id first to delete from calendar
    if (status === 'cancelled') {
      const { data: booking } = await supabaseAdmin
        .from('bookings')
        .select('google_event_id')
        .eq('id', params.id)
        .single()

      if (booking?.google_event_id) {
        await deleteCalendarEvent(booking.google_event_id)
      }
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select('id, status')
      .single()

    if (error) {
      console.error('Booking update error:', error)
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
    }

    return NextResponse.json({ success: true, booking: data })
  } catch (err) {
    console.error('Admin booking PATCH error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
