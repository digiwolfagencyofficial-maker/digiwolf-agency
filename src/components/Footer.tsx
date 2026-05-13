'use client'

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
  const services = ['Agency Websites', 'Czech S.R.O. Formation', 'AI Automation', 'SEO & Growth', 'Branding', 'Maintenance']
  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Book a Call', href: '/book' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ]
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ]

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 16 }}>
              <Image src="/digiwolf-logo-transparent.png" alt="Digi Wolf Agency" width={200} height={80} style={{ maxWidth: '200px', width: '100%', height: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Full-stack digital agency helping entrepreneurs grow in Central & Eastern Europe.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                { icon: <LinkedinIcon />, href: 'https://linkedin.com/company/digiwolf-agency', label: 'LinkedIn' },
                { icon: <XIcon />, href: 'https://facebook.com/digiwolf', label: 'Facebook' },
                { icon: <InstagramIcon />, href: 'https://instagram.com/digiwolfagency', label: 'Instagram' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#8892b0', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3b82f6'; el.style.color = '#3b82f6'; el.style.background = 'rgba(59,130,246,0.1)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = '#8892b0'; el.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  {s.icon}
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
              {companyLinks.map(l => (
                <Link key={l.label} href={l.href} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'info@digiwolf.agency', href: 'mailto:info@digiwolf.agency' },
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
            © 2026 Digi Wolf Agency s.r.o. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {legalLinks.map(l => (
              <Link key={l.label} href={l.href} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
