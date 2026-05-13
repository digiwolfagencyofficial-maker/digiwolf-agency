import { NextRequest, NextResponse } from 'next/server'

// GET /api/auth/google — start OAuth flow (one-time admin setup)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== 'digiwolf2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return new NextResponse(`
      <html><body style="font-family:sans-serif;background:#030712;color:#f0f4ff;padding:40px;max-width:600px">
        <h2 style="color:#ff4444">⚠️ GOOGLE_CLIENT_ID not set</h2>
        <p>Add these to your Vercel environment variables first:</p>
        <ul>
          <li>GOOGLE_CLIENT_ID</li>
          <li>GOOGLE_CLIENT_SECRET</li>
          <li>GOOGLE_REDIRECT_URI = https://digiwolf-agency.vercel.app/api/auth/google/callback</li>
        </ul>
        <p>Then redeploy and visit this page again.</p>
      </body></html>
    `, { status: 400, headers: { 'Content-Type': 'text/html' } })
  }

  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://digiwolf-agency.vercel.app/api/auth/google/callback'

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.events',
    access_type: 'offline',
    prompt: 'consent',
    state: 'digiwolf2025',
  })

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
}
