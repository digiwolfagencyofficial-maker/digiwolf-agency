'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Monitor, Globe2, Bot, Target, Settings, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Stat = { id: string; value: string; label: string }
type Metric = { id: string; value: string; label: string }
type Service = { id: string; label: string }
type Quote = { text: string; author: string; role: string }
type CaseStudy = {
  id: string
  client: string
  category: string
  headline: string
  tagline: string
  metrics: Metric[]
  challenge: string
  solution: string
  results: string
  services: Service[]
  quote: Quote
}
type Cta = { id: string; label: string }

const caseStyles: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode; tags: string[] }> = {
  techventures: {
    color: '#0047FF', bg: 'rgba(0,71,255,0.06)', border: 'rgba(0,71,255,0.2)',
    icon: <Monitor size={24} />, tags: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion', 'Stripe'],
  },
  mnExportHub: {
    color: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)',
    icon: <Globe2 size={24} />, tags: ['Next.js', 'i18n', 'Supabase', 'S.R.O. Formation', 'B2B'],
  },
  novakConsulting: {
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.2)',
    icon: <Bot size={24} />, tags: ['Next.js', 'AI/GPT-4', 'n8n', 'Calendly API', 'Resend'],
  },
}

const ctaHrefs: Record<string, string> = {
  startProject: '/contact',
  howWeWork: '/process',
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#8892b0', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function WorkPageClient() {
  const t = useTranslations('work')
  const [activeCase, setActiveCase] = useState<string | null>(null)
  const heroStats = t.raw('hero.stats') as Stat[]
  const caseStudies = t.raw('caseStudies') as CaseStudy[]
  const ctas = t.raw('cta.ctas') as Cta[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up, .stagger').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      <section style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(0,71,255,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: 24 }}>
            <span className="badge">{t('hero.badge')}</span>
          </div>
          <h1 className="fade-up fade-up-delay-1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            {t('hero.titleLine1')}<br />
            <span className="gradient-text">{t('hero.titleLine2')}</span>
          </h1>
          <p className="fade-up fade-up-delay-2" style={{ fontSize: 20, color: '#8892b0', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 48px' }}>
            {t('hero.subtitle')}
          </p>

          <div className="fade-up fade-up-delay-3" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {heroStats.map((stat) => (
              <div key={stat.id} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#8892b0' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 24px 120px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {caseStudies.map((cs) => {
            const style = caseStyles[cs.id]
            return (
              <div
                key={cs.id}
                className="fade-up"
                style={{
                  background: `linear-gradient(135deg, ${style.bg}, rgba(255,255,255,0.01))`,
                  border: `1px solid ${style.border}`,
                  borderRadius: 28, overflow: 'hidden',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={() => setActiveCase(cs.id)}
                onMouseLeave={() => setActiveCase(null)}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${style.color}, transparent)` }} />

                <div style={{ padding: '48px 52px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: style.bg, border: `1px solid ${style.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: style.color }}>{style.icon}</div>
                        <div>
                          <div style={{ fontSize: 13, color: '#8892b0', marginBottom: 2 }}>{cs.category}</div>
                          <div style={{ fontSize: 20, fontWeight: 800 }}>{cs.client}</div>
                        </div>
                      </div>
                      <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.02em', color: style.color, marginBottom: 8 }}>{cs.headline}</h2>
                      <p style={{ color: '#8892b0', fontSize: 16 }}>{cs.tagline}</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {style.tags.map((tag) => (
                        <span key={tag} style={{ padding: '5px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#8892b0' }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
                    {cs.metrics.map((m) => (
                      <MetricCard key={m.id} value={m.value} label={m.label} />
                    ))}
                  </div>

                  <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 36 }}>
                    {[
                      { label: t('labels.challenge'), text: cs.challenge, icon: <Target size={18} /> },
                      { label: t('labels.solution'), text: cs.solution, icon: <Settings size={18} /> },
                      { label: t('labels.results'), text: cs.results, icon: <TrendingUp size={18} /> },
                    ].map((item) => (
                      <div key={item.label} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <span style={{ color: '#8892b0', display: 'flex' }}>{item.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                        </div>
                        <p style={{ fontSize: 14, color: '#c0c8d8', lineHeight: 1.75, margin: 0 }}>{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('labels.services')}</span>
                    {cs.services.map((s) => (
                      <span key={s.id} style={{ padding: '4px 12px', borderRadius: 100, background: style.bg, border: `1px solid ${style.border}`, color: style.color, fontSize: 12, fontWeight: 600 }}>{s.label}</span>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 32px' }}>
                    <div style={{ fontSize: 36, color: style.color, opacity: 0.6, lineHeight: 1, marginBottom: 12 }}>&ldquo;</div>
                    <p style={{ fontSize: 16, color: '#c8d3f0', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 20 }}>{cs.quote.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${style.color}, ${style.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>{cs.quote.author.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{cs.quote.author}</div>
                        <div style={{ color: '#8892b0', fontSize: 12 }}>{cs.quote.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="fade-up" style={{
            background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.04) 100%)',
            border: '1px solid rgba(0,71,255,0.2)',
            borderRadius: 28, padding: '72px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,71,255,0.18), transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>{t('cta.badge')}</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
                {t('cta.title')}
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
                {t('cta.description')}
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                {ctas.map((cta) => (
                  <Link
                    key={cta.id}
                    href={ctaHrefs[cta.id] ?? '/contact'}
                    style={{
                      background: cta.id === 'startProject' ? '#0047FF' : 'transparent',
                      color: '#f0f4ff', textDecoration: 'none',
                      padding: '16px 36px', borderRadius: 12, fontSize: 16,
                      fontWeight: cta.id === 'startProject' ? 700 : 600,
                      border: cta.id === 'startProject' ? 'none' : '1px solid rgba(255,255,255,0.12)',
                      boxShadow: cta.id === 'startProject' ? '0 8px 40px rgba(0,71,255,0.4)' : 'none',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
