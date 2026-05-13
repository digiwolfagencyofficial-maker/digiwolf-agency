// Google Calendar integration — no external libraries, pure fetch
// Uses refresh token flow (one-time setup via /admin/setup)

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  if (!data.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(data))
  return data.access_token
}

export async function createCalendarEvent(booking: {
  name: string
  email: string
  service: string
  date: string   // YYYY-MM-DD
  time: string   // HH:MM
  company?: string | null
  message?: string | null
}): Promise<string | null> {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
    console.log('[Google Calendar] Not configured — skipping event creation')
    return null
  }

  try {
    const accessToken = await getAccessToken()

    const [h, m] = booking.time.split(':').map(Number)
    const endH = h + (m + 30 >= 60 ? 1 : 0)
    const endM = (m + 30) % 60
    const pad = (n: number) => String(n).padStart(2, '0')
    const startISO = `${booking.date}T${pad(h)}:${pad(m)}:00`
    const endISO   = `${booking.date}T${pad(endH)}:${pad(endM)}:00`

    const serviceLabels: Record<string, string> = {
      discovery: 'Discovery Call',
      website:   'Website Project',
      sro:       'Czech S.R.O. Formation',
      ai:        'AI Automation',
      app:       'Web / Mobile App',
    }
    const serviceLabel = serviceLabels[booking.service] ?? booking.service

    const event = {
      summary: `🐺 ${serviceLabel} — ${booking.name}${booking.company ? ` (${booking.company})` : ''}`,
      description: [
        `Client: ${booking.name}`,
        `Email: ${booking.email}`,
        booking.company ? `Company: ${booking.company}` : null,
        `Service: ${serviceLabel}`,
        booking.message ? `\nMessage:\n${booking.message}` : null,
        '\n---\nBooked via digiwolf.agency/book',
      ].filter(Boolean).join('\n'),
      start: { dateTime: `${startISO}+02:00`, timeZone: 'Europe/Prague' },
      end:   { dateTime: `${endISO}+02:00`,   timeZone: 'Europe/Prague' },
      attendees: [
        { email: 'info@digiwolf.agency', displayName: 'Digi Wolf Agency', organizer: true },
        { email: booking.email, displayName: booking.name },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 15 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `dw-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    }

    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('[Google Calendar] Create event failed:', err)
      return null
    }

    const created = await res.json()
    console.log('[Google Calendar] Event created:', created.id)
    return created.id as string
  } catch (err) {
    console.error('[Google Calendar] Error:', err)
    return null
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) return
  try {
    const accessToken = await getAccessToken()
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } }
    )
    if (res.ok) console.log('[Google Calendar] Event deleted:', eventId)
  } catch (err) {
    console.error('[Google Calendar] Delete error:', err)
  }
}
