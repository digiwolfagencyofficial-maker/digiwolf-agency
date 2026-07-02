import Link from 'next/link'
import Image from 'next/image'
import { COMPANY, companyCopyright, companyFullAddress, companyLegalLine } from '@/lib/company'
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.86c0-2.39 1.42-3.72 3.6-3.72 1.04 0 2.13.19 2.13.19v2.35h-1.2c-1.18 0-1.55.74-1.55 1.5v1.8h2.64l-.42 2.91h-2.22V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
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
              <Image src="/digiwolf-lockup.png" alt="Digi Wolf Agency" width={200} height={49} unoptimized style={{ maxWidth: '200px', width: '100%', height: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, maxWidth: 300, marginBottom: 24 }}>
              Prague-based digital agency — complete websites, AI automation, and Czech S.R.O. formation for Mongolian entrepreneurs across Europe.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/digiwolf.agency', icon: <FacebookIcon /> },
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
                { label: 'Complete Website Development', href: '/services' },
                { label: 'AI Automation', href: '/services' },
                { label: 'Czech S.R.O. Formation', href: '/services' },
                { label: 'On-Demand Support', href: '/contact' },
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
                { label: 'Book a Call', href: '/book' },
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
                <a href={`mailto:${COMPANY.email}`} style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                >{COMPANY.email}</a>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Registered office</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                  {companyLegalLine}<br />
                  {companyFullAddress}<br />
                  {COMPANY.address.country}
                </div>
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
          <div style={{ fontSize: 13, color: '#475569' }}>{companyCopyright}</div>
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
