'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type CaseStudyItem = {
  id: string
  name: string
  client: string
  category: string
  tag: string
  metric: string
  metricLabel: string
  challenge: string
  solution: string
  results: { id: string; text: string }[]
  techStack: { id: string; label: string }[]
  testimonial: string
  author: string
}

type Filter = { id: string; label: string }

const FILTER_MAP: Record<string, string | null> = {
  all: null,
  websites: 'Websites',
  sroFormation: 'S.R.O. Formation',
  aiAutomation: 'AI Automation',
}

export default function CaseStudiesClient() {
  const t = useTranslations('caseStudies')
  const items = t.raw('items') as CaseStudyItem[]
  const filters = t.raw('filters') as Filter[]
  const heroStats = t.raw('hero.stats') as { id: string; n: string; l: string }[]
  const ctas = t.raw('cta.ctas') as { id: string; label: string }[]

  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() => {
    const category = FILTER_MAP[activeFilter]
    if (!category) return items
    return items.filter((item) => item.category === category)
  }, [activeFilter, items])

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main style={{ paddingTop: 100 }}>
        <section style={{ padding: '60px 24px 40px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('hero.badge')}</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {t('hero.titleLine1')} <span className="gradient-text">{t('hero.titleLine2')}</span>
          </h1>
          <p style={{ color: '#8892b0', fontSize: 18, lineHeight: 1.7 }}>{t('hero.subtitle')}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {heroStats.map((s) => (
              <div key={s.id}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{s.n}</div>
                <div style={{ color: '#8892b0', fontSize: 13 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '0 24px 24px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 100,
                  border: activeFilter === f.id ? '1px solid rgba(0,71,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  background: activeFilter === f.id ? 'rgba(0,71,255,0.15)' : 'transparent',
                  color: activeFilter === f.id ? '#f0f4ff' : '#8892b0',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            {filtered.map((cs) => (
              <article
                key={cs.id}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 32,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{cs.name}</h2>
                  <span style={{ fontSize: 12, color: '#3d74ff', fontWeight: 700 }}>{cs.tag}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 22, fontWeight: 800, color: '#00c864' }}>{cs.metric}</span>
                </div>
                <p style={{ color: '#8892b0', marginBottom: 20 }}>{cs.client}</p>
                <p style={{ marginBottom: 12 }}><strong>{t('labels.challenge')}</strong> {cs.challenge}</p>
                <p style={{ marginBottom: 12 }}><strong>{t('labels.solution')}</strong> {cs.solution}</p>
                <p style={{ fontWeight: 700, marginBottom: 8 }}>{t('labels.results')}</p>
                <ul style={{ marginBottom: 16, paddingLeft: 20, color: '#c8d3f0' }}>
                  {cs.results.map((r) => (
                    <li key={r.id} style={{ marginBottom: 6 }}>{r.text}</li>
                  ))}
                </ul>
                <p style={{ fontStyle: 'italic', color: '#8892b0' }}>&ldquo;{cs.testimonial}&rdquo; — {cs.author}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ padding: '80px 24px 120px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16 }}>
            {t('cta.titleLine1')} <span className="gradient-text">{t('cta.titleLine2')}</span>
          </h2>
          <p style={{ color: '#8892b0', marginBottom: 32 }}>{t('cta.subtitle')}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {ctas.map((cta) => (
              <Link
                key={cta.id}
                href={cta.id === 'startProject' ? '/contact' : '/services'}
                style={{
                  padding: '14px 28px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontWeight: 700,
                  background: cta.id === 'startProject' ? '#0047FF' : 'transparent',
                  color: '#fff',
                  border: cta.id === 'startProject' ? 'none' : '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
