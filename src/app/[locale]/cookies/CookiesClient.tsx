'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type CookieExample = { id: string; label: string }
type CookieType = {
  id: string
  type: string
  required: boolean
  requiredLabel: string
  purpose: string
  retention: string
  examples: CookieExample[]
}

export default function CookiesClient() {
  const t = useTranslations('legal.cookies')
  const cookieTypes = t.raw('cookieTypes') as CookieType[]

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)', fontSize: 12, fontWeight: 600, color: '#3d74ff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>{t('badge')}</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>{t('title')}</h1>
          <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
            {t('intro')}
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
            <span>{t('companyLine')}</span>
            <span>{t('lastUpdated')}</span>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>{t('whatAreCookiesTitle')}</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
            {t('whatAreCookiesText')}
          </p>
        </div>

        <div style={{ background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 12, padding: 20, marginBottom: 48 }}>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            {t('noAnalyticsNotice')}
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 24 }}>{t('technologiesTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cookieTypes.map((c) => (
              <div key={c.id} style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff' }}>{c.type}</h3>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                    background: c.required ? 'rgba(0,200,100,0.15)' : 'rgba(0,71,255,0.15)',
                    color: c.required ? '#00c864' : '#3d74ff',
                    border: `1px solid ${c.required ? 'rgba(0,200,100,0.3)' : 'rgba(0,71,255,0.3)'}`,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>
                    {c.requiredLabel}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>{c.purpose}</p>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Examples: </span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{c.examples.map((e) => e.label).join(', ')}</span>
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
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>{t('thirdPartyTitle')}</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            {t('thirdPartyText1')}
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
            {t('thirdPartyText2')}
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>{t('manageTitle')}</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            {t('manageText1')}
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            {t('manageText2')}
          </p>
        </div>

        <div style={{ marginTop: 60, background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t('contactCardTitle')}</h3>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            {t('contactCardText')}
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#0047FF', color: '#fff', textDecoration: 'none',
            padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          }}>
            {t('contactButton')}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
