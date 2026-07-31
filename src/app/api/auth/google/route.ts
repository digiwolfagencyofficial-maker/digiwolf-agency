import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/auth'

// GET /api/auth/google — start OAuth flow (admin-only setup)
export async function GET() {
  const auth = await requireAdminApi()
  if (auth.error) return auth.error

  if (!process.env.GOOGLE_CLIENT_ID) {
    return new NextResponse(`
      <html><body style="font-family:sans-serif;background:#030712;color:#f0f4ff;padding:40px;max-width:600px">
        <h2 style="color:#ff4444">⚠️ GOOGLE_CLIENT_ID not set</h2>
        <p>Add these to your Vercel environment variables first:</p>
        <ul>
          <li>GOOGLE_CLIENT_ID</li>
          <li>GOOGLE_CLIENT_SECRET</li>
          <li>GOOGLE_REDIRECT_URI = https://digiwolf.agency/api/auth/google/callback</li>
        </ul>
        <p>Then redeploy and visit this page again.</p>
      </body></html>
    `, { status: 400, headers: { 'Content-Type': 'text/html' } })
  }

  const state = randomUUID()
  const cookieStore = await cookies()
  cookieStore.set('google_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  })

  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://digiwolf.agency/api/auth/google/callback'

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.events',
    access_type: 'offline',
    prompt: 'consent',
    state,
  })

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
}
