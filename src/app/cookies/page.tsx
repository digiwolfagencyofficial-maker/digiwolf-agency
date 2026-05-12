import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Digi Wolf Agency s.r.o. — how we use cookies on our website.',
}

const cookieTypes = [
  {
    type: 'Strictly Necessary Cookies',
    required: true,
    examples: ['Session authentication tokens', 'CSRF protection tokens', 'Load balancing cookies'],
    purpose: 'These cookies are essential for the website to function correctly. They enable core features such as security, account login, and remembering your preferences during a session. These cookies cannot be disabled.',
    retention: 'Session / Up to 1 year',
  },
  {
    type: 'Analytics Cookies',
    required: false,
    examples: ['Google Analytics (_ga, _gid)', 'Page view tracking', 'User behaviour metrics'],
    purpose: 'These cookies help us understand how visitors interact with our website — which pages are most visited, how long visitors stay, and where they come from. This data is used to improve our website. We only set these cookies with your consent.',
    retention: 'Up to 2 years',
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
            This Cookie Policy explains how Digi Wolf Agency s.r.o. uses cookies and similar technologies on our website. We are committed to being transparent about how we collect and use data.
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
            <span>Last updated: January 2025</span>
          </div>
        </div>

        {/* What are cookies */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>What Are Cookies?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
            Cookies are small text files that are stored on your device when you visit a website. They allow the website to recognise your device on subsequent visits and remember certain information about your preferences or actions.
          </p>
        </div>

        {/* Cookie types */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 24 }}>Cookies We Use</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cookieTypes.map((c, i) => (
              <div key={i} style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff' }}>{c.type}</h3>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                    background: c.required ? 'rgba(0,200,100,0.15)' : 'rgba(0,71,255,0.15)',
                    color: c.required ? '#00c864' : '#3d74ff',
                    border: `1px solid ${c.required ? 'rgba(0,200,100,0.3)' : 'rgba(0,71,255,0.3)'}`,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>
                    {c.required ? 'Always Active' : 'Consent Required'}
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

        {/* How to opt out */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>How to Manage Cookies</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            Please note that refusing or disabling analytics cookies will not affect your ability to use our website. However, disabling strictly necessary cookies may prevent some features from working correctly.
          </p>
          <div style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
              For more information on how to manage cookies in popular browsers:
              browser settings → Privacy & Security → Cookies and site data.
            </p>
          </div>
        </div>

        {/* Third party */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>Third-Party Cookies</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
            Some cookies on our website are set by third-party services (such as Google Analytics). These third parties have their own privacy and cookie policies. We encourage you to review their policies for more information on how they use cookies.
          </p>
        </div>

        {/* Contact / links */}
        <div style={{ marginTop: 60, background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Questions or Concerns?</h3>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            If you have questions about how we use cookies, contact us at{' '}
            <a href="mailto:info@digiwolf.agency" style={{ color: '#3d74ff', textDecoration: 'none' }}>info@digiwolf.agency</a>.
            You can also read our{' '}
            <Link href="/privacy" style={{ color: '#3d74ff', textDecoration: 'none' }}>Privacy Policy</Link> for more information about how we handle your data.
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
