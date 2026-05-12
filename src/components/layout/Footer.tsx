import Link from 'next/link'
import Image from 'next/image'
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: '#020a1a', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '80px 24px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 64 }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}>
              <Image src="/digiwolf-logo.png" alt="Digi Wolf Agency" width={200} height={80} style={{ maxWidth: '200px', width: '100%', height: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, maxWidth: 300, marginBottom: 24 }}>
              Prague-based digital agency specialising in premium websites, AI automation, and Czech S.R.O. formation. Serving clients across Europe and Mongolia.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/company/digiwolf-agency', icon: <LinkedinIcon /> },
                { label: 'X (Twitter)', href: 'https://twitter.com/digiwolfagency', icon: <XIcon /> },
                { label: 'Instagram', href: 'https://instagram.com/digiwolfagency', icon: <InstagramIcon /> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#f0f4ff'; el.style.borderColor = 'rgba(0,71,255,0.4)'; el.style.background = 'rgba(0,71,255,0.1)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#64748b'; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.05)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff', marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Website Design', href: '/services' },
                { label: 'Czech S.R.O. Formation', href: '/services' },
                { label: 'AI Automation', href: '/services' },
                { label: 'Web Apps & Mobile', href: '/services' },
              ].map(l => (
                <Link key={l.label} href={l.href} style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff', marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'About', href: '/about' },
                { label: 'Work', href: '/work' },
                { label: 'Process', href: '/process' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Contact', href: '/contact' },
              ].map(l => (
                <Link key={l.label} href={l.href} style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff', marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Email</div>
                <a href="mailto:digiwolfagencyofficial@gmail.com" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                >digiwolfagencyofficial@gmail.com</a>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Location</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>Prague, Czech Republic<br />Digi Wolf Agency s.r.o.</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Languages</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['🇬🇧 EN', '🇨🇿 CS', '🇲🇳 MN'].map(l => (
                    <span key={l} style={{ fontSize: 13, color: '#64748b', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.07)' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, color: '#475569' }}>© 2025 Digi Wolf Agency s.r.o. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookie Policy', href: '/cookies' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ fontSize: 13, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#475569'}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
