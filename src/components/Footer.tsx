'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { COMPANY, companyFullAddress } from '@/lib/company'

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.86c0-2.39 1.42-3.72 3.6-3.72 1.04 0 2.13.19 2.13.19v2.35h-1.2c-1.18 0-1.55.74-1.55 1.5v1.8h2.64l-.42 2.91h-2.22V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
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
  { id: 'facebook', icon: <FacebookIcon />, href: 'https://www.facebook.com/digiwolf.agency' },
] as const

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/JFqYT8pznvFcHpMr9'

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
                { label: companyFullAddress, href: GOOGLE_MAPS_URL },
              ].map(item => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                >{item.label}</a>
              ))}
              <span style={{ color: '#8892b0', fontSize: 14 }}>{t('sections.contact.secondaryLocation')}</span>
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
