'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Cal, { getCalApi } from '@calcom/embed-react'
import {
  Check,
  Globe,
  Scale,
  Bot,
  MessageSquare,
  Zap,
  Clock,
  Users,
  Target,
  Calendar,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const CAL_LINK = 'digi-wolf-agency/discovery'

type ServiceLabel = { id: string; label: string }
type TrustPill = { id: string; label: string }
type PrepareItem = { id: string; title: string; desc: string }
type CallTopic = { id: string; label: string }

const PREPARE_ICONS: Record<string, typeof Target> = {
  projectGoal: Target,
  timelineBudget: Clock,
  existingAssets: Globe,
  questions: MessageSquare,
}

const TOPIC_ICONS: Record<string, typeof Globe> = {
  agencyWebsites: Globe,
  sroFormation: Scale,
  aiWorkflows: Bot,
  strategyTimeline: Users,
}

function CalEmbed({ notes }: { notes?: string }) {
  const [ready, setReady] = useState(false)

  const config = useMemo(
    () => ({
      theme: 'dark' as const,
      layout: 'month_view' as const,
      ...(notes ? { notes } : {}),
    }),
    [notes],
  )

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: {
          branding: {
            brandColor: '#0047FF',
          },
        },
      })
      setReady(true)
    })()
  }, [])

  return (
    <div className="cal-embed-wrap">
      {!ready && (
        <div className="cal-embed-skeleton" aria-hidden="true">
          <div className="cal-skeleton-bar" />
          <div className="cal-skeleton-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="cal-skeleton-cell" />
            ))}
          </div>
        </div>
      )}
      <Cal
        calLink={CAL_LINK}
        config={config}
        style={{
          width: '100%',
          minHeight: ready ? 600 : 0,
          overflow: 'auto',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

function BookContent() {
  const t = useTranslations('book')
  const searchParams = useSearchParams()

  const serviceLabels = useMemo(() => t.raw('serviceLabels') as ServiceLabel[], [t])
  const trustPills = useMemo(() => t.raw('hero.trustPills') as TrustPill[], [t])
  const prepareItems = useMemo(() => t.raw('prepare.items') as PrepareItem[], [t])
  const callTopics = useMemo(() => t.raw('callTopics.items') as CallTopic[], [t])

  const serviceParam = searchParams.get('service')?.toLowerCase() ?? ''
  const serviceLabel = serviceLabels.find((s) => s.id === serviceParam)?.label ?? ''
  const notesPrefill = serviceLabel ? `Interested in: ${serviceLabel}` : undefined

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.book-fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '120px 24px 64px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,71,255,0.12) 0%, transparent 60%)',
            }}
          />
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: 'linear-gradient(to bottom, transparent, #030712)',
            }}
          />

          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="book-fade-up" style={{ marginBottom: 24 }}>
              <span className="badge">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00c864',
                    display: 'inline-block',
                    animation: 'pulseRing 2s ease-out infinite',
                  }}
                />
                {t('labels.freeDiscoveryCall')}
              </span>
            </div>

            <h1
              className="book-fade-up book-fade-up-delay-1"
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              {t('hero.title')}
            </h1>

            <p
              className="book-fade-up book-fade-up-delay-2"
              style={{
                color: '#8892b0',
                fontSize: 18,
                lineHeight: 1.7,
                maxWidth: 560,
                margin: '0 auto 28px',
              }}
            >
              {t('hero.subtitle')}
            </p>

            <div
              className="book-fade-up book-fade-up-delay-3"
              style={{
                display: 'flex',
                gap: 20,
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: 13,
                color: '#8892b0',
              }}
            >
              {trustPills.map((item) => (
                <span key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="#00c864" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section style={{ padding: '0 24px 100px', position: 'relative', zIndex: 2 }}>
          <div className="book-layout" style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Left column */}
            <div className="book-sidebar">
              {serviceLabel && (
                <div
                  className="book-fade-up"
                  style={{
                    background: 'rgba(0,71,255,0.1)',
                    border: '1px solid rgba(0,71,255,0.25)',
                    borderRadius: 12,
                    padding: '14px 18px',
                    marginBottom: 24,
                    fontSize: 14,
                    color: '#93c5fd',
                  }}
                >
                  <Calendar size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                  {t('labels.bookingFor')} <strong style={{ color: '#f0f4ff' }}>{serviceLabel}</strong>
                </div>
              )}

              <div className="book-fade-up" style={{ marginBottom: 32 }}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    marginBottom: 8,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t('prepare.title')}
                </h2>
                <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  {t('prepare.subtitle')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {prepareItems.map((item) => {
                    const Icon = PREPARE_ICONS[item.id] ?? Target
                    return (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          gap: 14,
                          alignItems: 'flex-start',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 12,
                          padding: '16px',
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(0,71,255,0.12)',
                            borderRadius: 10,
                            padding: 10,
                            flexShrink: 0,
                            color: '#3d74ff',
                          }}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                          <div style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.5 }}>{item.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="book-fade-up" style={{ marginBottom: 24 }}>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 16,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t('callTopics.title')}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {callTopics.map((topic) => {
                    const Icon = TOPIC_ICONS[topic.id] ?? Globe
                    return (
                      <div
                        key={topic.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          fontSize: 14,
                          color: '#c8d3f0',
                        }}
                      >
                        <Icon size={16} color="#3d74ff" />
                        {topic.label}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div
                className="book-fade-up"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 20,
                }}
              >
                <div style={{ marginBottom: 10, color: '#f59e0b' }}>
                  <Zap size={28} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>
                  {t('guarantees.response.title')}
                </h3>
                <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.6, margin: 0 }}>
                  {t('guarantees.response.desc')}
                </p>
              </div>

              <div
                className="book-fade-up"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.04) 100%)',
                  border: '1px solid rgba(0,71,255,0.25)',
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <span className="badge" style={{ marginBottom: 12, display: 'inline-flex', fontSize: 11 }}>
                  {t('guarantees.availability.badge')}
                </span>
                <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.6, margin: 0 }}>
                  {t('guarantees.availability.desc')}
                </p>
              </div>
            </div>

            {/* Right column — Cal embed */}
            <div className="book-fade-up book-fade-up-delay-1">
              <div
                style={{
                  background: '#0a0f1e',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #0047FF, #3d74ff)',
                    zIndex: 1,
                  }}
                />
                <div style={{ padding: '28px 24px 8px' }}>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      marginBottom: 4,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {t('labels.pickTime')}
                  </h2>
                  <p style={{ color: '#8892b0', fontSize: 13, marginBottom: 16 }}>
                    {t('labels.timezone')}
                  </p>
                </div>
                <div style={{ padding: '0 12px 20px' }}>
                  <CalEmbed notes={notesPrefill} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .book-fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .book-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .book-fade-up-delay-1 { transition-delay: 0.1s; }
        .book-fade-up-delay-2 { transition-delay: 0.2s; }
        .book-fade-up-delay-3 { transition-delay: 0.3s; }

        .book-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: start;
        }

        .cal-embed-wrap {
          position: relative;
          min-height: 520px;
        }

        .cal-embed-skeleton {
          position: absolute;
          inset: 0;
          padding: 16px;
        }

        .cal-skeleton-bar {
          height: 40px;
          background: rgba(255,255,255,0.06);
          border-radius: 10px;
          margin-bottom: 20px;
          animation: calPulse 1.5s ease-in-out infinite;
        }

        .cal-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .cal-skeleton-cell {
          height: 80px;
          background: rgba(255,255,255,0.04);
          border-radius: 10px;
          animation: calPulse 1.5s ease-in-out infinite;
        }

        .cal-skeleton-cell:nth-child(2) { animation-delay: 0.1s; }
        .cal-skeleton-cell:nth-child(3) { animation-delay: 0.2s; }
        .cal-skeleton-cell:nth-child(4) { animation-delay: 0.15s; }
        .cal-skeleton-cell:nth-child(5) { animation-delay: 0.25s; }
        .cal-skeleton-cell:nth-child(6) { animation-delay: 0.35s; }

        @keyframes calPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 900px) {
          .book-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .book-sidebar {
            order: 1;
          }
          .cal-embed-wrap {
            min-height: 480px;
          }
        }
      `}</style>
    </div>
  )
}

export default function BookClient() {
  return (
    <Suspense
      fallback={
        <div style={{ background: '#030712', minHeight: '100vh' }}>
          <Navbar />
        </div>
      }
    >
      <BookContent />
    </Suspense>
  )
}
