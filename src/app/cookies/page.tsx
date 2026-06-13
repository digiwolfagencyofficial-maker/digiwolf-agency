import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Digi Wolf Agency s.r.o. — how we use cookies and similar technologies on our website.',
}

const cookieTypes = [
  {
    type: 'Strictly Necessary Cookies',
    required: true,
    examples: ['Session and security cookies', 'Load balancing (Vercel hosting)', 'Authentication cookies (admin area, if logged in)'],
    purpose: 'These cookies are essential for the website to function. They enable security, routing, and basic site features. Under EU law, we do not need your consent for strictly necessary cookies.',
    retention: 'Session to 1 year',
  },
  {
    type: 'Third-Party Scheduling Cookies (Cal.com)',
    required: true,
    examples: ['Cal.com session cookies on /book', 'Booking widget preferences'],
    purpose: 'When you use our booking page, Cal.com embeds a scheduler that may set cookies to manage your session and complete a booking. These are required to book a discovery call through our site.',
    retention: 'Set by Cal.com — see their privacy policy',
  },
  {
    type: 'Preference Storage (Local Storage)',
    required: false,
    examples: ['dw-cookie-consent — your cookie notice choice'],
    purpose: 'We store your response to our cookie banner in your browser\'s local storage (not a cookie) so we do not show the notice again. This stores only "accepted" or "declined" — no personal data.',
    retention: 'Until you clear browser data',
  },
]

export default function CookiesPage() {
  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)', fontSize: 12, fontWeight: 600, color: '#3d74ff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Legal</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>Cookie Policy</h1>
          <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
            This Cookie Policy explains how Digi Wolf Agency s.r.o. uses cookies and similar technologies on digiwolf.agency.
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
            <span>Company: Digi Wolf Agency s.r.o., IČ 24344648</span>
            <span>Last updated: 13 June 2026</span>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>What Are Cookies?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
            Cookies are small text files stored on your device when you visit a website. They help the site remember your session, keep pages secure, and enable features such as booking a call. We also use local storage for your cookie preference — this works similarly but is stored in your browser, not sent with every request.
          </p>
        </div>

        <div style={{ background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 12, padding: 20, marginBottom: 48 }}>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            <strong style={{ color: '#f0f4ff' }}>We do not use analytics or advertising cookies</strong> on digiwolf.agency. We do not run Google Analytics or similar tracking tools on this site.
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 24 }}>Cookies and Technologies We Use</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cookieTypes.map((c, i) => (
              <div key={i} style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff' }}>{c.type}</h3>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                    background: c.required ? 'rgba(0,200,100,0.15)' : 'rgba(0,71,255,0.15)',
                    color: c.required ? '#00c864' : '#3d74ff',
                    border: `1px solid ${c.required ? 'rgba(0,200,100,0.3)' : 'rgba(0,71,255,0.3)'}`,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>
                    {c.required ? 'Essential' : 'Preference Only'}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>{c.purpose}</p>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Examples: </span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{c.examples.join(', ')}</span>
                </div>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Retention: </span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{c.retention}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>Third-Party Services</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            Our website is hosted on Vercel and uses Supabase for data storage. These providers may set strictly necessary cookies or process technical data as part of hosting. When you book a call, Cal.com processes your booking and may set its own cookies.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
            We encourage you to review the privacy and cookie policies of{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#3d74ff', textDecoration: 'none' }}>Vercel</a>,{' '}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3d74ff', textDecoration: 'none' }}>Supabase</a>, and{' '}
            <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3d74ff', textDecoration: 'none' }}>Cal.com</a> for more detail.
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>How to Manage Cookies</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            You can control cookies through your browser settings — refuse new cookies, delete existing ones, or be notified when a cookie is set. Disabling strictly necessary cookies may prevent parts of the site (including booking) from working correctly.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            To reset your cookie notice preference on our site, clear local storage for digiwolf.agency or delete the <code style={{ color: '#c8d3f0', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>dw-cookie-consent</code> entry in your browser.
          </p>
        </div>

        <div style={{ marginTop: 60, background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Questions or concerns?</h3>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Email{' '}
            <a href="mailto:info@digiwolf.agency" style={{ color: '#3d74ff', textDecoration: 'none' }}>info@digiwolf.agency</a>.
            For how we handle personal data overall, see our{' '}
            <Link href="/privacy" style={{ color: '#3d74ff', textDecoration: 'none' }}>Privacy Policy</Link>.
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#0047FF', color: '#fff', textDecoration: 'none',
            padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          }}>
            Contact Us →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
