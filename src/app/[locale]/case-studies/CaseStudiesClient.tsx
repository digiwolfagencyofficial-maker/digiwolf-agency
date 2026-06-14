'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Stat = { id: string; value: string; label: string }
type Feature = { id: string; label: string }
type Capability = { id: string; label: string }
type Cta = { id: string; label: string }

const WolfSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9" />
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9" />
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6" />
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6" />
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95" />
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5" />
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5" />
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5" />
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A" />
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A" />
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7" />
  </svg>
)

const ctaHrefs: Record<string, string> = {
  bookCall: '/book',
  contact: '/contact',
  howWeWork: '/process',
}

export default function CaseStudiesClient() {
  const t = useTranslations('caseStudies')
  const heroStats = t.raw('hero.stats') as Stat[]
  const showcaseFeatures = t.raw('showcase.features') as Feature[]
  const capabilities = t.raw('capabilities.items') as Capability[]
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
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
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

      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p className="fade-up" style={{ color: '#8892b0', fontSize: 17, lineHeight: 1.7, maxWidth: 640, marginBottom: 48 }}>
            {t('showcase.description')}
          </p>

          <div className="work-grid fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, overflow: 'hidden', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(0,71,255,0.3)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.15), transparent)', padding: 32, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="browser-mockup" style={{ background: '#0d1117' }}>
                  <div className="browser-bar">
                    <div className="browser-dot" style={{ background: '#ff5f57' }} />
                    <div className="browser-dot" style={{ background: '#febc2e' }} />
                    <div className="browser-dot" style={{ background: '#28c840' }} />
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 20, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
                      <span style={{ color: '#8892b0', fontSize: 10 }}>digiwolf.agency</span>
                    </div>
                  </div>
                  <div style={{ padding: 20, height: 120, background: 'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(0,71,255,0.2)', border: '1px solid rgba(0,71,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WolfSVG size={22} />
                      </div>
                      <div>
                        <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, width: 120, marginBottom: 6 }} />
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 4, width: 80 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f4ff', margin: 0 }}>{t('showcase.title')}</h2>
                  <span style={{ background: 'rgba(0,200,100,0.15)', border: '1px solid rgba(0,200,100,0.3)', color: '#00c864', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('showcase.tag')}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {showcaseFeatures.map((feature) => (
                    <div key={feature.id} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#c8d3f0', fontSize: 14 }}>
                      <Check size={14} color="#3d74ff" /> {feature.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, padding: 32, transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(0,200,100,0.3)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f4ff', marginBottom: 8 }}>{t('capabilities.title')}</h2>
              <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{t('capabilities.subtitle')}</p>
              <div className="capabilities-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {capabilities.map((cap) => (
                  <div
                    key={cap.id}
                    style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12, padding: '14px 16px', color: '#c8d3f0', fontSize: 14, lineHeight: 1.5,
                    }}
                  >
                    {cap.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              <p style={{ color: '#8892b0', fontSize: 18, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
                {t('cta.description')}
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                {ctas.map((cta) => (
                  <Link
                    key={cta.id}
                    href={ctaHrefs[cta.id] ?? '/contact'}
                    style={{
                      background: cta.id === 'bookCall' ? '#0047FF' : 'transparent',
                      color: '#f0f4ff', textDecoration: 'none',
                      padding: '16px 36px', borderRadius: 12, fontSize: 16,
                      fontWeight: cta.id === 'bookCall' ? 700 : 600,
                      border: cta.id === 'bookCall' ? 'none' : '1px solid rgba(255,255,255,0.12)',
                      boxShadow: cta.id === 'bookCall' ? '0 8px 40px rgba(0,71,255,0.4)' : 'none',
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
          .work-grid { grid-template-columns: 1fr !important; }
          .capabilities-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
