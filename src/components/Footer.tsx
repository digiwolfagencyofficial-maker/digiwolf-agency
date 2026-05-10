import Link from 'next/link'

const WolfLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
  </svg>
)

export default function Footer() {
  const services = ['Agency Websites', 'Czech S.R.O. Formation', 'AI Automation', 'SEO & Growth', 'Branding', 'Maintenance']
  const company = ['About', 'Case Studies', 'Pricing', 'Contact', 'Blog']
  const legal = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']

  return (
    <footer style={{ background: '#030712', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, #0047FF, transparent)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <WolfLogo size={36} />
              <span style={{ fontWeight: 700, fontSize: 18, color: '#f0f4ff' }}>Digi Wolf<span style={{ color: '#0047FF' }}>.</span></span>
            </Link>
            <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Full-stack digital agency helping entrepreneurs grow in Central & Eastern Europe.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {['LinkedIn', 'X', 'Instagram'].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#8892b0', fontSize: 11, fontWeight: 600, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { const el = e.target as HTMLElement; el.style.borderColor = '#0047FF'; el.style.color = '#3d74ff'; }}
                  onMouseLeave={e => { const el = e.target as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = '#8892b0'; }}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {services.map(s => (
                <Link key={s} href="/services" style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{s}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {company.map(s => (
                <Link key={s} href={`/${s.toLowerCase().replace(' ', '-')}`} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{s}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'hello@digiwolf.agency', href: 'mailto:hello@digiwolf.agency' },
                { label: 'Prague, Czech Republic', href: '#' },
                { label: 'Ulaanbaatar, Mongolia', href: '#' },
              ].map(item => (
                <a key={item.label} href={item.href} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{item.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#8892b0', fontSize: 13 }}>
            © 2025 Digi Wolf Agency s.r.o. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {legal.map(l => (
              <a key={l} href="#" style={{ color: '#8892b0', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
