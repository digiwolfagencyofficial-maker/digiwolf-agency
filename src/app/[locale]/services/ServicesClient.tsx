'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Globe, Scale, Bot, Shield, Check, Clock, Lock, Infinity } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type ServiceCard = {
  id: string
  title: string
  tagline: string
  price: string
  badge: string
  startingAt: string
  includedTitle: string
  processTitle: string
  cta: string
  description: string
  features: { id: string; label: string }[]
}

type Stat = { id: string; num: string; label: string }
type Guarantee = { id: string; title: string; desc: string }
type Cta = { id: string; label: string }
type MaintenanceNote = { title: string; desc: string; cta: string }

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  web: <Globe size={26} />,
  ai: <Bot size={26} />,
  sro: <Scale size={26} />,
}

const SERVICE_COLORS: Record<string, string> = {
  web: '#3b82f6',
  ai: '#10b981',
  sro: '#6366f1',
}

const GUARANTEE_ICONS: Record<string, React.ReactNode> = {
  onTime: <Clock size={28} color="#3b82f6" />,
  fixedPricing: <Lock size={28} color="#3b82f6" />,
  unlimitedRevisions: <Infinity size={28} color="#3b82f6" />,
}

const CARD_PROCESS: Record<string, { step: string; label: string; desc: string }[]> = {
  web: [
    { step: '01', label: 'Discovery Call', desc: 'We map your goals, audience, and competitors in 60 minutes.' },
    { step: '02', label: 'Design Wireframes', desc: 'Low-fi to high-fi prototypes reviewed and approved by you.' },
    { step: '03', label: 'Development', desc: 'Clean, typed, documented code shipped in sprints.' },
    { step: '04', label: 'QA & Launch', desc: 'Cross-browser, cross-device testing. Zero bugs at launch.' },
  ],
  sro: [
    { step: '01', label: 'Document Checklist', desc: 'We send you a precise list of required documents.' },
    { step: '02', label: 'Notary Appointment', desc: 'We schedule and attend the notary signing with you.' },
    { step: '03', label: 'Court Registration', desc: 'Filed with the Commercial Register — typically 5 business days.' },
    { step: '04', label: 'Handover', desc: 'You receive all official documents and a complete company kit.' },
  ],
  ai: [
    { step: '01', label: 'Workflow Audit', desc: 'We identify your highest-ROI automation opportunities.' },
    { step: '02', label: 'System Design', desc: 'Architecture mapped and approved before a single line of code.' },
    { step: '03', label: 'Build & Test', desc: 'Iterative development with weekly demos and your feedback.' },
    { step: '04', label: 'Deploy & Train', desc: 'Live deployment with full team training and documentation.' },
  ],
}

function bookServiceParam(cardId: string) {
  return cardId === 'web' ? 'website' : cardId
}

export default function ServicesPage() {
  const t = useTranslations('services')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredProcess, setHoveredProcess] = useState<string | null>(null)

  const cards = useMemo(() => t.raw('cards') as ServiceCard[], [t])
  const maintenanceNote = useMemo(() => t.raw('maintenanceNote') as MaintenanceNote, [t])
  const stats = useMemo(() => t.raw('stats') as Stat[], [t])
  const guarantees = useMemo(() => t.raw('guarantees') as Guarantee[], [t])
  const heroCtas = useMemo(() => t.raw('hero.ctas') as Cta[], [t])
  const bottomCtas = useMemo(() => t.raw('bottomCta.ctas') as Cta[], [t])

  const startProjectCta = heroCtas.find((c) => c.id === 'startProject')
  const exploreServicesCta = heroCtas.find((c) => c.id === 'exploreServices')
  const bookStrategyCta = bottomCtas.find((c) => c.id === 'bookStrategyCall')
  const viewPricingCta = bottomCtas.find((c) => c.id === 'viewPricing')

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '140px 24px 100px', textAlign: 'center' as const, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', marginBottom: 24,
            background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)',
            color: '#93c5fd', padding: '8px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          }}>
            {t('hero.badge')}
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: 24,
          }}>
            {t('hero.titleLine1')}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {t('hero.titleLine2')}
            </span>
          </h1>
          <p style={{
            fontSize: 20, color: '#8892b0', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px',
          }}>
            {t('hero.subtitle')}
          </p>
          <div className="btn-row" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {startProjectCta && (
              <Link href="/book" style={{
                background: '#3b82f6', color: '#fff', padding: '14px 32px',
                borderRadius: 12, fontWeight: 700, fontSize: 16,
                textDecoration: 'none', display: 'inline-block',
                boxShadow: '0 0 30px rgba(59,130,246,0.4)',
              }}>
                {startProjectCta.label}
              </Link>
            )}
            {exploreServicesCta && (
              <a href="#services" style={{
                background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '14px 32px', borderRadius: 12, fontWeight: 600, fontSize: 16,
                textDecoration: 'none', display: 'inline-block',
              }}>
                {exploreServicesCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 24px',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32, textAlign: 'center' as const,
        }}>
          {stats.map((s) => (
            <div key={s.id}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#3b82f6' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#8892b0', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {cards.map((svc, index) => {
            const color = SERVICE_COLORS[svc.id] ?? '#3b82f6'
            const isHovered = hoveredCard === svc.id
            const process = CARD_PROCESS[svc.id] ?? []

            return (
              <div
                key={svc.id}
                id={svc.id}
                onMouseEnter={() => setHoveredCard(svc.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: isHovered
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHovered ? color + '44' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 24, padding: 40,
                  scrollMarginTop: 100,
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? `0 24px 60px rgba(0,0,0,0.4), 0 0 40px ${color}22` : '0 4px 20px rgba(0,0,0,0.2)',
                  cursor: 'default',
                  display: 'flex', flexDirection: 'column',
                  gridColumn: index === 0 ? '1 / -1' : undefined,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color,
                  }}>
                    {SERVICE_ICONS[svc.id]}
                  </div>
                  <span style={{
                    background: `${color}20`, border: `1px solid ${color}40`,
                    color, padding: '4px 14px', borderRadius: 100,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  }}>
                    {svc.badge}
                  </span>
                </div>

                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6, color: '#f0f4ff' }}>{svc.title}</h2>
                <p style={{ fontSize: 14, color, fontWeight: 600, marginBottom: 16 }}>{svc.tagline}</p>
                <p style={{ fontSize: 15, color: '#8892b0', lineHeight: 1.7, marginBottom: 28 }}>{svc.description}</p>

                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '14px 20px', marginBottom: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 13, color: '#8892b0' }}>{svc.startingAt}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color }}>{svc.price}</span>
                </div>

                <div style={{ marginBottom: 32, flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#8892b0', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
                    {svc.includedTitle}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {svc.features.map((f) => (
                      <li key={f.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#c8d0e0' }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: '50%',
                          background: `${color}20`, border: `1px solid ${color}50`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 1, color,
                        }}><Check size={10} /></span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {process.length > 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 16, padding: 20, marginBottom: 28,
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#8892b0', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
                      {svc.processTitle}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {process.map((p) => (
                        <div key={p.step}
                          onMouseEnter={() => setHoveredProcess(svc.id + p.step)}
                          onMouseLeave={() => setHoveredProcess(null)}
                          style={{
                            background: hoveredProcess === svc.id + p.step ? `${color}15` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${hoveredProcess === svc.id + p.step ? color + '40' : 'rgba(255,255,255,0.06)'}`,
                            borderRadius: 10, padding: 12,
                            transition: 'all 0.2s',
                          }}
                        >
                          <div style={{ fontSize: 11, fontWeight: 800, color, marginBottom: 4 }}>{p.step} {p.label}</div>
                          <div style={{ fontSize: 12, color: '#8892b0', lineHeight: 1.5 }}>{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link href={`/book?service=${bookServiceParam(svc.id)}`} style={{
                  display: 'block', textAlign: 'center' as const,
                  background: isHovered ? color : 'rgba(255,255,255,0.05)',
                  color: '#fff', padding: '14px 24px', borderRadius: 12,
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  border: `1px solid ${isHovered ? color : 'rgba(255,255,255,0.1)'}`,
                  transition: 'all 0.3s',
                  boxShadow: isHovered ? `0 8px 30px ${color}40` : 'none',
                }}>
                  {svc.cta}
                </Link>
              </div>
            )
          })}
        </div>

        <div style={{
          marginTop: 32, padding: '28px 32px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20, display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 280 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0,
            }}>
              <Shield size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f0f4ff', marginBottom: 8 }}>{maintenanceNote.title}</h3>
              <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.7, margin: 0 }}>{maintenanceNote.desc}</p>
            </div>
          </div>
          <Link href="/contact" style={{
            display: 'inline-block', textAlign: 'center' as const,
            background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
            padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
            whiteSpace: 'nowrap',
          }}>
            {maintenanceNote.cta}
          </Link>
        </div>
      </section>

      {/* Guarantees */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {guarantees.map((g) => (
              <div
                key={g.id}
                style={{
                  background: 'rgba(59,130,246,0.05)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: 20, padding: 32,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}
              >
                <div style={{ background: 'rgba(59,130,246,0.12)', borderRadius: 10, padding: 10, display: 'inline-flex', flexShrink: 0 }}>
                  {GUARANTEE_ICONS[g.id]}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{g.title}</h3>
                  <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.7 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: '100px 24px',
        textAlign: 'center' as const,
        background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 20 }}>
            {t('bottomCta.titleLine1')}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {t('bottomCta.titleLine2')}
            </span>
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', marginBottom: 40, lineHeight: 1.7 }}>
            {t('bottomCta.description')}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' as const, flexWrap: 'wrap' as const }}>
            {bookStrategyCta && (
              <Link href="/book" style={{
                background: '#3b82f6', color: '#fff', padding: '16px 40px',
                borderRadius: 12, fontWeight: 700, fontSize: 17,
                textDecoration: 'none', boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
              }}>
                {bookStrategyCta.label}
              </Link>
            )}
            {viewPricingCta && (
              <Link href="/pricing" style={{
                background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 40px', borderRadius: 12, fontWeight: 600, fontSize: 17,
                textDecoration: 'none',
              }}>
                {viewPricingCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
