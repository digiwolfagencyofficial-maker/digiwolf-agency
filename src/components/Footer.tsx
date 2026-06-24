'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { COMPANY, companyFullAddress } from '@/lib/company'

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

const serviceIds = ['websites', 'ai', 'sro', 'maintenance'] as const

const serviceHrefs: Record<(typeof serviceIds)[number], string> = {
  websites: '/services',
  ai: '/services',
  sro: '/services',
  maintenance: '/contact',
}

const companyLinks = [
  { key: 'about', href: '/about' },
  { key: 'work', href: '/work' },
  { key: 'pricing', href: '/pricing' },
  { key: 'book', href: '/book' },
  { key: 'contact', href: '/contact' },
  { key: 'blog', href: '/blog' },
] as const

const legalLinks = [
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
  { key: 'cookies', href: '/cookies' },
] as const

const socialLinks = [
  { id: 'linkedin', icon: <LinkedinIcon />, href: 'https://linkedin.com/company/digiwolf-agency' },
  { id: 'facebook', icon: <XIcon />, href: 'https://facebook.com/digiwolf' },
  { id: 'instagram', icon: <InstagramIcon />, href: 'https://instagram.com/digiwolfagency' },
] as const

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 16 }}>
              <Image src="/digiwolf-lockup.png" alt={t('brandAlt')} width={200} height={49} unoptimized style={{ maxWidth: '200px', width: '100%', height: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {socialLinks.map(s => (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={t(`social.${s.id}`)} style={{
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
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>{t('sections.services.title')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {serviceIds.map(id => (
                <Link key={id} href={serviceHrefs[id]} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{t(`sections.services.${id}`)}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>{t('sections.company.title')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {companyLinks.map(l => (
                <Link key={l.key} href={l.href} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{t(`sections.company.${l.key}`)}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>{t('sections.contact.title')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { label: companyFullAddress, href: `https://maps.google.com/?q=${encodeURIComponent(companyFullAddress)}` },
                { label: t('sections.contact.secondaryLocation'), href: '#' },
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
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {legalLinks.map(l => (
              <Link key={l.key} href={l.href} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              >{t(`sections.legal.${l.key}`)}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
