'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Section = { id: string; title: string; content: string }

export default function TermsClient() {
  const t = useTranslations('legal.terms')
  const sections = t.raw('sections') as Section[]

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
            <span>{t('governingLaw')}</span>
          </div>
        </div>

        <div style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#8892b0', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('contentsTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sections.map((s, i) => (
              <a key={s.id} href={`#section-${i}`} className="toc-link" style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {sections.map((s, i) => (
            <div key={s.id} id={`section-${i}`}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>{s.title}</h2>
              <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, whiteSpace: 'pre-line' }}>{s.content}</div>
            </div>
          ))}
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
      <style>{`.toc-link:hover { color: #f0f4ff !important; }`}</style>
    </div>
  )
}
