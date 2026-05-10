import Link from 'next/link'

const WolfSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7"/>
    <circle cx="16" cy="21.5" r="1.3" fill="#0A1050"/>
  </svg>
)

export default function Footer() {
  const currentYear = 2026

  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(96,165,250,0.15)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
        {/* 4-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          {/* Col 1: Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <WolfSVG size={32} />
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.08em', color: '#F5F5F5' }}>DIGI WOLF</span>
            </Link>
            <p style={{ color: '#C0C8D8', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              Prague-based digital agency specialising in websites, web apps, Czech S.R.O. formation, and AI automation.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#111218', border: '1px solid rgba(96,165,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C8D8', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,71,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(96,165,250,0.15)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              {/* Email */}
              <a href="mailto:info@digiwolf.agency" style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#111218', border: '1px solid rgba(96,165,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C8D8', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,71,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(96,165,250,0.15)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#111218', border: '1px solid rgba(96,165,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C8D8', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,71,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(96,165,250,0.15)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 style={{ color: '#F5F5F5', fontWeight: 700, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>Services</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Agency Websites', 'Czech S.R.O. Formation', 'AI Automation', 'SEO & Growth', 'Brand Identity', 'Maintenance Plans'].map((item) => (
                <li key={item}>
                  <Link href="/services" style={{ color: '#C0C8D8', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#C0C8D8')}
                  >{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 style={{ color: '#F5F5F5', fontWeight: 700, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>Company</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Contact', href: '/contact' },
                { label: 'Client Portal', href: '/dashboard' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} style={{ color: '#C0C8D8', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#C0C8D8')}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 style={{ color: '#F5F5F5', fontWeight: 700, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="mailto:info@digiwolf.agency" style={{ color: '#C0C8D8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                info@digiwolf.agency
              </a>
              <div style={{ color: '#C0C8D8', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Wenceslas Square 1<br />Prague 1, Czech Republic</span>
              </div>
              <div style={{ color: '#C0C8D8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                Mon–Fri 9:00–18:00 CET
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(96,165,250,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#C0C8D8', fontSize: '13px' }}>
            © {currentYear} Digi Wolf Agency s.r.o. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'Cookie Policy'].map((item) => (
              <Link key={item} href="#" style={{ color: '#C0C8D8', fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                onMouseLeave={e => (e.currentTarget.style.color = '#C0C8D8')}
              >{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
