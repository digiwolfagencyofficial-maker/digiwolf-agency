import { NextRequest, NextResponse } from 'next/server'

// GET /api/auth/google/callback — exchanges code for refresh token (one-time setup)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code  = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    return new NextResponse(`
      <html><body style="font-family:sans-serif;background:#030712;color:#f0f4ff;padding:40px">
        <h2 style="color:#ff4444">❌ Authorization failed</h2>
        <p>Error: ${error}</p>
        <a href="/admin/setup" style="color:#0047FF">← Back to Setup</a>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }

  if (state !== 'digiwolf2025' || !code) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
  }

  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://digiwolf-agency.vercel.app/api/auth/google/callback'

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })

  const tokens = await tokenRes.json()

  if (!tokens.refresh_token) {
    return new NextResponse(`
      <html><body style="font-family:sans-serif;background:#030712;color:#f0f4ff;padding:40px;max-width:700px">
        <h2 style="color:#ff9900">⚠️ No refresh token returned</h2>
        <p>This usually means the Google account already authorized this app. Revoke access at 
        <a href="https://myaccount.google.com/permissions" style="color:#0047FF" target="_blank">myaccount.google.com/permissions</a>
        then try again.</p>
        <pre style="background:#040d1f;padding:16px;border-radius:8px;overflow:auto">${JSON.stringify(tokens, null, 2)}</pre>
        <a href="/api/auth/google?secret=digiwolf2025" style="color:#0047FF">← Try Again</a>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }

  return new NextResponse(`
    <html><body style="font-family:sans-serif;background:#030712;color:#f0f4ff;padding:40px;max-width:700px">
      <h2 style="color:#00c864">✅ Google Calendar Connected!</h2>
      <p>Copy the refresh token below and add it to your Vercel environment variables as <code style="color:#0047FF">GOOGLE_REFRESH_TOKEN</code>:</p>
      <div style="background:#040d1f;border:1px solid rgba(0,71,255,0.3);border-radius:8px;padding:16px;margin:16px 0;word-break:break-all;font-family:monospace;font-size:14px;color:#00c864">
        ${tokens.refresh_token}
      </div>
      <button onclick="navigator.clipboard.writeText('${tokens.refresh_token}');this.textContent='Copied!'" 
        style="background:#0047FF;color:#fff;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600">
        Copy Refresh Token
      </button>
      <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0">
      <h3>Next steps:</h3>
      <ol style="line-height:2">
        <li>Go to <a href="https://vercel.com" style="color:#0047FF" target="_blank">vercel.com</a> → your project → Settings → Environment Variables</li>
        <li>Add: <code>GOOGLE_REFRESH_TOKEN</code> = the token above</li>
        <li>Redeploy your project</li>
        <li>All new bookings will automatically appear in your Google Calendar at <strong>info@digiwolf.agency</strong></li>
      </ol>
      <a href="/admin/setup" style="color:#0047FF">← Back to Setup</a>
    </body></html>
  `, { headers: { 'Content-Type': 'text/html' } })
}
