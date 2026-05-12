import Link from 'next/link'
import Image from 'next/image'

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
                { label: 'Email', href: 'mailto:digiwolfagencyofficial@gmail.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/digiwolfagency', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { label: 'Facebook', href: 'https://facebook.com/digiwolfagency', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 8,
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
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms' },
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
