import { createHmac, timingSafeEqual } from 'crypto'

type CalcomAttendee = {
  name?: string
  email?: string
}

type CalcomResponseField = {
  value?: string
}

type CalcomBookingPayload = {
  uid?: string
  type?: string
  title?: string
  eventTitle?: string
  description?: string
  additionalNotes?: string
  startTime?: string
  attendees?: CalcomAttendee[]
  responses?: {
    name?: CalcomResponseField
    email?: CalcomResponseField
    notes?: CalcomResponseField
  }
}

export type CalcomWebhookBody = {
  triggerEvent?: string
  createdAt?: string
  payload?: CalcomBookingPayload
}

export function verifyCalcomSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string | undefined
): boolean {
  if (!secret) {
    console.error('[calcom webhook] CALCOM_WEBHOOK_SECRET is not configured')
    return false
  }

  if (!signatureHeader) {
    return false
  }

  const expected = createHmac('sha256', secret).update(rawBody).digest('hex')

  try {
    const expectedBuffer = Buffer.from(expected, 'hex')
    const receivedBuffer = Buffer.from(signatureHeader, 'hex')

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false
    }

    return timingSafeEqual(expectedBuffer, receivedBuffer)
  } catch {
    return false
  }
}

function firstAttendee(payload: CalcomBookingPayload): CalcomAttendee | undefined {
  return payload.attendees?.[0]
}

export function parseCalcomBooking(body: CalcomWebhookBody) {
  const payload = body.payload
  if (!payload) {
    return null
  }

  const attendee = firstAttendee(payload)
  const name =
    attendee?.name?.trim() ||
    payload.responses?.name?.value?.trim() ||
    null
  const email =
    attendee?.email?.trim() ||
    payload.responses?.email?.value?.trim() ||
    null
  const eventTime = payload.startTime || null
  const eventType =
    payload.eventTitle?.trim() ||
    payload.type?.trim() ||
    payload.title?.trim() ||
    null
  const notes =
    payload.additionalNotes?.trim() ||
    payload.responses?.notes?.value?.trim() ||
    payload.description?.trim() ||
    null
  const calcomUid = payload.uid?.trim() || null

  if (!name || !email || !eventTime) {
    return null
  }

  const start = new Date(eventTime)
  const preferredDate = Number.isNaN(start.getTime())
    ? null
    : start.toISOString().slice(0, 10)
  const preferredTime = Number.isNaN(start.getTime())
    ? null
    : `${String(start.getUTCHours()).padStart(2, '0')}:${String(start.getUTCMinutes()).padStart(2, '0')}`

  return {
    name,
    email,
    event_time: eventTime,
    event_type: eventType || 'calcom',
    notes,
    calcom_uid: calcomUid,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    service: eventType || 'general',
    message: notes,
    status: 'confirmed' as const,
    source_created_at: body.createdAt || null,
  }
}
