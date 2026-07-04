'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Globe, Scale, Bot, Shield, Check, Inbox, Zap, User, Sparkles, Languages } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { FOUNDING_OFFER_ACTIVE, FOUNDING_SPOTS_LEFT, FOUNDING_PRICES } from '@/config/founding-offer'

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(0,71,255,0.12)', borderRadius: '10px', padding: '10px', display: 'inline-flex' }}>
    {children}
  </div>
)

const WolfSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7"/>
  </svg>
)

type HomeStat = { id: string; headline: string; detail: string }
type ServiceCard = { id: string; title: string; desc: string; tag: string; price: string }
type ProcessStep = { id: string; title: string; desc: string }
type ValueProp = { id: string; title: string; desc: string }
type FaqItem = { id: string; q: string; a: string }
type CapabilityItem = { id: string; label: string }
type TechStackItem = { id: string; label: string }
type CtaItem = { id: string; label: string }
type FloatingBadge = { id: string; title: string; subtitle: string }
type ChecklistItem = { id: string; label: string }
type FlowStep = { id: string; label: string }
type PricingPlan = {
  id: string
  name: string
  price: string
  currency: string
  desc: string
  cta: string
  featured: boolean
  badge?: string
  features: { id: string; label: string }[]
}
type MaintenanceNote = { title: string; desc: string; cta: string }
type CtaPoint = { id: string; label: string }

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  agencyWebsites: <Globe size={24} className="text-blue-400" />,
  aiAutomation: <Bot size={24} className="text-blue-400" />,
  sro: <Scale size={24} className="text-blue-400" />,
}

const VALUE_PROP_ICONS: Record<string, React.ReactNode> = {
  founderAttention: <User size={22} className="text-blue-400" />,
  foundingRates: <Sparkles size={22} className="text-blue-400" />,
  trilingualSupport: <Languages size={22} className="text-blue-400" />,
}

const AI_FLOW_ICONS: Record<string, React.ReactNode> = {
  inputData: <Inbox size={18} className="text-blue-400" />,
  aiProcessing: <Bot size={18} className="text-blue-400" />,
  automation: <Zap size={18} className="text-blue-400" />,
  resultsDelivered: <Check size={18} className="text-blue-400" />,
}

const CTA_HREFS: Record<string, string> = {
  startProject: '/book',
  bookCall: '/pricing',
}

export default function HomePageClient() {
  const t = useTranslations('home')

  const stats = t.raw('stats') as HomeStat[]
  const services = t.raw('servicesSection.cards') as ServiceCard[]
  const maintenanceNote = t.raw('servicesSection.maintenanceNote') as MaintenanceNote
  const process = t.raw('processSection.steps') as ProcessStep[]
  const valueProps = t.raw('testimonialsSection.items') as ValueProp[]
  const faqs = t.raw('faqSection.items') as FaqItem[]
  const showcaseFeatures = t.raw('caseStudiesSection.showcase.features') as ChecklistItem[]
  const capabilities = t.raw('caseStudiesSection.capabilities.items') as CapabilityItem[]
  const techStack = t.raw('techStack') as TechStackItem[]
  const heroCtas = t.raw('hero.ctas') as CtaItem[]
  const floatingBadges = t.raw('hero.floatingBadges') as FloatingBadge[]
  const aiChecklist = t.raw('aiSection.checklist') as ChecklistItem[]
  const aiFlow = t.raw('aiSection.flow') as FlowStep[]
  const pricingPlans = t.raw('pricingPreview.plans') as PricingPlan[]
  const ctaBannerCtas = t.raw('ctaBanner.ctas') as CtaItem[]
  const ctaBannerPoints = t.raw('ctaBanner.points') as CtaPoint[]

  const faqTitleParts = t('faqSection.title').split('? ')
  const aiTitleParts = t('aiSection.title').split(' with ')

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.fade-up, .slide-left, .slide-right, .stagger').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'cursor'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(cursor)
    document.body.appendChild(ring)

    let cx = 0, cy = 0, rx = 0, ry = 0
    const move = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY }
    window.addEventListener('mousemove', move)

    const hover = () => { cursor.classList.add('hovered'); ring.classList.add('hovered') }
    const unhover = () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered') }
    document.querySelectorAll('a, button').forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', unhover) })

    let raf: number
    const animate = () => {
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'
      rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); cursor.remove(); ring.remove() }
  }, [])

  return (
    <>
      <Navbar />

      {/* Founding offer banner */}
      {FOUNDING_OFFER_ACTIVE && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,140,0,0.12), rgba(0,71,255,0.12))',
          borderBottom: '1px solid rgba(255,180,0,0.2)',
          padding: '12px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 50,
        }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#ffc340', lineHeight: 1.5 }}>
            ⚡ {t('badge')} — {FOUNDING_SPOTS_LEFT} spots left.{' '}
            <Link href="/pricing" style={{ color: '#ffc340', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              See pricing →
            </Link>
          </p>
        </div>
      )}

      <main style={{ background: '#030712', minHeight: '100vh', overflow: 'hidden' }}>

        {/* ============ HERO ============ */}
        <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,71,255,0.12) 0%, transparent 60%)' }} />
          <div className="orb orb-1" style={{ position: 'absolute' }} />
          <div className="orb orb-2" style={{ position: 'absolute' }} />
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, #030712)', zIndex: 2 }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 3 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">

              <div>
                <div className="fade-up" style={{ marginBottom: 28 }}>
                  <span className="badge">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c864', display: 'inline-block', animation: 'pulseRing 2s ease-out infinite' }} />
                    {t('badge')}
                  </span>
                </div>

                <h1 className="fade-up fade-up-delay-1" style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
                  <span style={{ color: '#f0f4ff' }}>{t('hero.title.line1')}</span>
                  <br />
                  <span className="gradient-text">{t('hero.title.line2')}</span>
                </h1>

                <p className="fade-up fade-up-delay-2" style={{ fontSize: 18, color: '#8892b0', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
                  {t('hero.subtitle')}
                </p>

                <div className="fade-up fade-up-delay-3 btn-row" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
                  {heroCtas.map((cta) => (
                    <Link
                      key={cta.id}
                      href={CTA_HREFS[cta.id] ?? '/contact'}
                      style={
                        cta.id === 'startProject'
                          ? {
                              background: '#0047FF', color: '#fff', textDecoration: 'none',
                              padding: '16px 32px', borderRadius: 12, fontSize: 16, fontWeight: 700,
                              boxShadow: '0 8px 40px rgba(0,71,255,0.4)', transition: 'all 0.2s',
                              display: 'inline-flex', alignItems: 'center', gap: 8,
                            }
                          : {
                              color: '#f0f4ff', textDecoration: 'none',
                              padding: '16px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600,
                              border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s',
                              display: 'inline-flex', alignItems: 'center', gap: 8,
                            }
                      }
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        if (cta.id === 'startProject') {
                          el.style.transform = 'translateY(-2px)'
                          el.style.boxShadow = '0 16px 50px rgba(0,71,255,0.6)'
                        } else {
                          el.style.borderColor = '#0047FF'
                          el.style.background = 'rgba(0,71,255,0.1)'
                        }
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        if (cta.id === 'startProject') {
                          el.style.transform = 'none'
                          el.style.boxShadow = '0 8px 40px rgba(0,71,255,0.4)'
                        } else {
                          el.style.borderColor = 'rgba(255,255,255,0.12)'
                          el.style.background = 'transparent'
                        }
                      }}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>

                <div className="fade-up fade-up-delay-4 hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                  {stats.map((s) => (
                    <div key={s.id} style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 16 }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        {s.headline}
                      </div>
                      <div style={{ fontSize: 12, color: '#8892b0', marginTop: 6, lineHeight: 1.45 }}>{s.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fade-up fade-up-delay-2" style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 5}deg)`,
                transition: 'transform 0.1s ease-out',
              }}>
                <div className="browser-mockup" style={{ position: 'relative' }}>
                  <div className="browser-bar">
                    <div className="browser-dot" style={{ background: '#ff5f57' }} />
                    <div className="browser-dot" style={{ background: '#febc2e' }} />
                    <div className="browser-dot" style={{ background: '#28c840' }} />
                    <div style={{ flex: 1, background: '#0d1117', borderRadius: 6, height: 24, display: 'flex', alignItems: 'center', paddingLeft: 10, marginLeft: 8 }}>
                      <span style={{ color: '#8892b0', fontSize: 11 }}>digiwolf.agency</span>
                    </div>
                  </div>
                  <div style={{ padding: 24, background: '#0d1117' }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.3), rgba(61,116,255,0.1))', borderRadius: 12, padding: 32, marginBottom: 16, textAlign: 'center' }}>
                      <div style={{ width: 40, height: 40, background: '#0047FF', borderRadius: 10, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WolfSVG size={24} />
                      </div>
                      <div style={{ height: 10, background: 'rgba(255,255,255,0.3)', borderRadius: 5, marginBottom: 8, width: '60%', margin: '0 auto 8px' }} />
                      <div style={{ height: 7, background: 'rgba(255,255,255,0.15)', borderRadius: 5, width: '80%', margin: '0 auto' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                      {[
                        { icon: <Globe size={20} color="#0047FF" />, color: '#0047FF', rgb: '0,71,255' },
                        { icon: <Scale size={20} color="#00c864" />, color: '#00c864', rgb: '0,200,100' },
                        { icon: <Bot size={20} color="#7c3aed" />, color: '#7c3aed', rgb: '124,58,237' },
                      ].map(({ icon, color, rgb }, i) => (
                        <div key={i} style={{ background: `rgba(${rgb},0.1)`, borderRadius: 10, padding: 16, textAlign: 'center', border: `1px solid ${color}22` }}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>{icon}</div>
                          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 8 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ position: 'absolute', top: -20, right: -20, background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.3)', borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(10px)', animation: 'float 4s ease-in-out infinite' }}>
                  <div style={{ fontSize: 11, color: '#00c864', fontWeight: 700 }}>{floatingBadges[0]?.title}</div>
                  <div style={{ fontSize: 10, color: '#8892b0', marginTop: 2 }}>{floatingBadges[0]?.subtitle}</div>
                </div>
                <div style={{ position: 'absolute', top: 40, left: -24, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(10px)', animation: 'float 6s ease-in-out infinite', animationDelay: '-1s' }}>
                  <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>{floatingBadges[2]?.title}</div>
                  <div style={{ fontSize: 10, color: '#8892b0', marginTop: 2 }}>{floatingBadges[2]?.subtitle}</div>
                </div>
                <div style={{ position: 'absolute', bottom: -16, left: -20, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.3)', borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(10px)', animation: 'float 5s ease-in-out infinite', animationDelay: '-2s' }}>
                  <div style={{ fontSize: 11, color: '#3d74ff', fontWeight: 700 }}>{floatingBadges[1]?.title}</div>
                  <div style={{ fontSize: 10, color: '#8892b0', marginTop: 2 }}>{floatingBadges[1]?.subtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', overflow: 'hidden', position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.01)' }}>
          <div className="marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={`${tech.id}-${i}`} style={{ padding: '0 40px', color: '#8892b0', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0047FF', display: 'inline-block' }} />
                {tech.label}
              </span>
            ))}
          </div>
        </div>

        {/* ============ SERVICES ============ */}
        <section id="services" style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('servicesSection.badge')}</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                {t('servicesSection.titleLine1')}<br />
                <span className="gradient-text">{t('servicesSection.titleLine2')}</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, maxWidth: 540, margin: '0 auto' }}>
                {t('servicesSection.description')}
              </p>
            </div>

            <div className="stagger services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {services.map((s, index) => (
                <div key={s.id} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s ease', cursor: 'default',
                  gridColumn: index === 0 ? '1 / -1' : undefined,
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = '1px solid rgba(0,71,255,0.4)'
                    el.style.background = 'rgba(0,71,255,0.06)'
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 20px 60px rgba(0,71,255,0.15)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = '1px solid rgba(255,255,255,0.07)'
                    el.style.background = 'rgba(255,255,255,0.03)'
                    el.style.transform = 'none'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #0047FF, transparent)', opacity: 0.5 }} />

                  {s.tag && (
                    <span style={{
                      position: 'absolute', top: 20, right: 20,
                      background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.3)',
                      color: '#3d74ff', fontSize: 10, fontWeight: 700, padding: '4px 10px',
                      borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>{s.tag}</span>
                  )}

                  <div style={{ marginBottom: 20 }}>
                    <IconWrapper>{SERVICE_ICONS[s.id]}</IconWrapper>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f0f4ff', marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: '#8892b0', lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>{s.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#3d74ff', fontWeight: 700, fontSize: 14 }}>{s.price}</span>
                    <Link href="/services" style={{ color: '#8892b0', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                    >{t('servicesSection.learnMore')}</Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-up" style={{
              marginTop: 24, padding: '24px 28px',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, display: 'flex', flexWrap: 'wrap',
              alignItems: 'center', justifyContent: 'space-between', gap: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 240 }}>
                <div style={{ background: 'rgba(0,71,255,0.1)', borderRadius: 10, padding: 10, display: 'inline-flex', flexShrink: 0 }}>
                  <Shield size={20} className="text-blue-400" />
                </div>
                <div>
                  <p style={{ color: '#f0f4ff', fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{maintenanceNote.title}</p>
                  <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{maintenanceNote.desc}</p>
                </div>
              </div>
              <Link href="/contact" style={{
                color: '#3d74ff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
                border: '1px solid rgba(0,71,255,0.3)', padding: '10px 20px', borderRadius: 10,
                whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,71,255,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; }}
              >{maintenanceNote.cta}</Link>
            </div>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 80 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('processSection.badge')}</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                {t('processSection.titleLine1')} <span className="gradient-text">{t('processSection.titleLine2')}</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
                {t('processSection.description')}
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 40, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,71,255,0.3), transparent)', display: 'none' }} />

              <div className="stagger process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }} id="process-grid">
                {process.map((p, i) => (
                  <div key={p.id} style={{ textAlign: 'center', position: 'relative' }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,71,255,0.2), rgba(0,71,255,0.05))',
                      border: '1px solid rgba(0,71,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px', position: 'relative',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#3d74ff', letterSpacing: '0.05em' }}>{p.id}</span>
                      {i < process.length - 1 && (
                        <div style={{ position: 'absolute', left: '100%', top: '50%', width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(0,71,255,0.4), transparent)', transform: 'translateY(-50%)' }} />
                      )}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ SHOWCASE ============ */}
        <section id="work" style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('caseStudiesSection.badge')}</span>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff' }}>
                  {t('caseStudiesSection.titleLine1')}<br /><span className="gradient-text">{t('caseStudiesSection.titleLine2')}</span>
                </h2>
              </div>
              <Link href="/services" style={{ color: '#3d74ff', textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid rgba(0,71,255,0.3)', padding: '12px 24px', borderRadius: 10, transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,71,255,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; }}
              >{t('caseStudiesSection.cta')}</Link>
            </div>
            <p className="fade-up" style={{ color: '#8892b0', fontSize: 17, lineHeight: 1.7, maxWidth: 640, marginBottom: 48 }}>
              {t('caseStudiesSection.description')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="case-grid">
              <div className="fade-up" style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, overflow: 'hidden', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(0,71,255,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
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
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f0f4ff' }}>{t('caseStudiesSection.showcase.title')}</h3>
                    <span style={{ background: 'rgba(0,200,100,0.15)', border: '1px solid rgba(0,200,100,0.3)', color: '#00c864', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{t('caseStudiesSection.showcase.tag')}</span>
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

              <div className="fade-up" style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, padding: 32, transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(0,200,100,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f0f4ff', marginBottom: 24 }}>{t('caseStudiesSection.capabilities.title')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {capabilities.map((cap) => (
                    <div key={cap.id} style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12, padding: '14px 16px', color: '#c8d3f0', fontSize: 14, lineHeight: 1.5,
                    }}>
                      {cap.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOUNDING CLIENTS ============ */}
        <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('testimonialsSection.badge')}</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                {t('testimonialsSection.titleLine1')}<br /><span className="gradient-text">{t('testimonialsSection.titleLine2')}</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                {t('testimonialsSection.description')}
              </p>
            </div>

            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {valueProps.map((item) => (
                <div key={item.id} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: 32, transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,71,255,0.3)'; el.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'none'; }}
                >
                  <div style={{ marginBottom: 20 }}>
                    <IconWrapper>{VALUE_PROP_ICONS[item.id] ?? <Check size={22} className="text-blue-400" />}</IconWrapper>
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#f0f4ff', fontSize: 18, marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ color: '#8892b0', lineHeight: 1.7, fontSize: 15 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AI HIGHLIGHT ============ */}
        <section style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.08) 0%, rgba(0,71,255,0.03) 100%)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 32, padding: '80px 60px', position: 'relative', overflow: 'hidden' }} className="fade-up">
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(0,71,255,0.12), transparent 60%)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }} className="ai-grid">
                <div>
                  <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>{t('aiSection.badge')}</span>
                  <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 20 }}>
                    {aiTitleParts.length > 1 ? (
                      <>{aiTitleParts[0]} with <span className="gradient-text">{aiTitleParts[1]}</span></>
                    ) : (
                      t('aiSection.title')
                    )}
                  </h2>
                  <p style={{ color: '#8892b0', lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
                    {t('aiSection.description')}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                    {aiChecklist.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#c8d3f0', fontSize: 15 }}>
                        <span style={{ width: 20, height: 20, background: 'rgba(0,71,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={12} color="#3d74ff" />
                        </span>
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <Link href="/services#ai" style={{
                    background: '#0047FF', color: '#fff', textDecoration: 'none',
                    padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 8px 30px rgba(0,71,255,0.4)',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 16px 40px rgba(0,71,255,0.6)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 30px rgba(0,71,255,0.4)'; }}
                  >
                    {t('aiSection.cta')}
                  </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {aiFlow.map((step, i) => (
                    <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(0,71,255,${0.1 + i * 0.08})`, border: `1px solid rgba(0,71,255,${0.2 + i * 0.1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {AI_FLOW_ICONS[step.id]}
                      </div>
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px' }}>
                        <div style={{ color: '#f0f4ff', fontWeight: 600, fontSize: 13 }}>{step.label}</div>
                      </div>
                      {i < aiFlow.length - 1 && <div style={{ position: 'absolute', marginTop: 52, marginLeft: 20, width: 1, height: 12, background: 'rgba(0,71,255,0.3)' }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PRICING PREVIEW ============ */}
        <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('pricingPreview.badge')}</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                {t('pricingPreview.titleLine1')}<br /><span className="gradient-text">{t('pricingPreview.titleLine2')}</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, maxWidth: 480, margin: '0 auto' }}>
                {t('pricingPreview.subtitle')}
              </p>
              <p style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: '#3d74ff', fontSize: 14, fontWeight: 600,
                background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)',
                borderRadius: 100, padding: '8px 18px', marginTop: 20,
              }}>
                {t('pricingPreview.promoNote')}
              </p>
            </div>

            <div className="stagger pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {pricingPlans.map((plan) => {
                const foundingKey = plan.id === 'starter' ? 'starter' : plan.id === 'growth' ? 'growth' : null
                const foundingData = foundingKey ? FOUNDING_PRICES[foundingKey] : null

                return (
                  <div key={plan.id} style={{
                    background: plan.featured ? 'linear-gradient(135deg, rgba(0,71,255,0.15), rgba(61,116,255,0.06))' : 'rgba(255,255,255,0.03)',
                    border: plan.featured ? '1px solid rgba(0,71,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden',
                    boxShadow: plan.featured ? '0 0 60px rgba(0,71,255,0.15)' : 'none',
                    transition: 'all 0.3s',
                    transform: plan.featured ? 'scale(1.03)' : 'none',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = plan.featured ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = plan.featured ? 'scale(1.03)' : 'none'; }}
                  >
                    {plan.featured && plan.badge && (
                      <div style={{ position: 'absolute', top: 20, right: 20, background: '#0047FF', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{plan.badge}</div>
                    )}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: plan.featured ? 'linear-gradient(90deg, transparent, #0047FF, transparent)' : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', marginBottom: 8 }}>{plan.name}</h3>
                    <div style={{ marginBottom: FOUNDING_OFFER_ACTIVE && foundingData ? 6 : 16 }}>
                      {plan.price === 'Custom' ? (
                        <span style={{ fontSize: 36, fontWeight: 900, color: '#f0f4ff' }}>{plan.price}</span>
                      ) : FOUNDING_OFFER_ACTIVE && foundingData ? (
                        <div>
                          <span style={{ fontSize: 32, fontWeight: 900, color: '#ffc340', letterSpacing: '-0.03em' }}>{foundingData.discounted}</span>
                          <span style={{ fontSize: 14, color: '#8892b0', marginLeft: 5 }}>{plan.currency}</span>
                          <span style={{ fontSize: 12, color: '#5a6478', textDecoration: 'line-through', marginLeft: 8 }}>{foundingData.normal} {plan.currency}</span>
                        </div>
                      ) : (
                        <>
                          <span style={{ fontSize: 40, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>{plan.price}</span>
                          {plan.currency && <span style={{ fontSize: 16, color: '#8892b0', marginLeft: 6 }}>{plan.currency}</span>}
                        </>
                      )}
                    </div>
                    {FOUNDING_OFFER_ACTIVE && foundingData && (
                      <div style={{ marginBottom: 12 }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: 'linear-gradient(135deg, rgba(255,180,0,0.15), rgba(255,120,0,0.1))',
                          border: '1px solid rgba(255,180,0,0.35)',
                          borderRadius: 100, padding: '4px 10px',
                          fontSize: 10, fontWeight: 700, color: '#ffc340',
                        }}>
                          <Zap size={9} fill="#ffc340" />
                          50% off — founding clients
                        </span>
                      </div>
                    )}
                    <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>{plan.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                      {plan.features.map((f) => (
                        <div key={f.id} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          color: f.id === 'carePlan' ? '#8892b0' : '#c8d3f0',
                          fontSize: 14,
                          fontStyle: f.id === 'carePlan' ? 'italic' : 'normal',
                        }}>
                          <Check size={14} color={f.id === 'carePlan' ? '#4a5568' : plan.featured ? '#3d74ff' : '#8892b0'} /> {f.label}
                        </div>
                      ))}
                    </div>
                    <Link href={plan.id === 'enterprise' ? '/contact' : '/book'} style={{
                      display: 'block', textAlign: 'center', textDecoration: 'none',
                      padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                      background: plan.featured ? '#0047FF' : 'transparent',
                      color: plan.featured ? '#fff' : '#f0f4ff',
                      border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
                      boxShadow: plan.featured ? '0 8px 30px rgba(0,71,255,0.4)' : 'none',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.85'; el.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.transform = 'none'; }}
                    >
                      {plan.cta} →
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="fade-up" style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/pricing" style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              >
                {t('pricingPreview.viewFullBreakdown')}
              </Link>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('faqSection.badge')}</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff' }}>
                {faqTitleParts.length > 1 ? (
                  <>{faqTitleParts[0]}? <span className="gradient-text">{faqTitleParts[1]}</span></>
                ) : (
                  t('faqSection.title')
                )}
              </h2>
            </div>

            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section style={{ padding: '80px 24px 120px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="fade-up" style={{
              background: 'linear-gradient(135deg, rgba(0,71,255,0.15) 0%, rgba(0,71,255,0.05) 100%)',
              border: '1px solid rgba(0,71,255,0.25)',
              borderRadius: 32, padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,71,255,0.2), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>{t('ctaBanner.badge')}</span>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 20 }}>
                  {t('ctaBanner.titleLine1')}<br /><span className="gradient-text">{t('ctaBanner.titleLine2')}</span>
                </h2>
                <p style={{ color: '#8892b0', fontSize: 18, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
                  {t('ctaBanner.description')}
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {ctaBannerCtas.map((cta) => (
                    <Link
                      key={cta.id}
                      href={CTA_HREFS[cta.id] ?? '/contact'}
                      style={
                        cta.id === 'startProject'
                          ? {
                              background: '#0047FF', color: '#fff', textDecoration: 'none',
                              padding: '18px 40px', borderRadius: 14, fontSize: 17, fontWeight: 800,
                              boxShadow: '0 8px 40px rgba(0,71,255,0.5)', transition: 'all 0.2s',
                              display: 'inline-flex', alignItems: 'center', gap: 8,
                            }
                          : {
                              color: '#f0f4ff', textDecoration: 'none',
                              padding: '18px 40px', borderRadius: 14, fontSize: 17, fontWeight: 700,
                              border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s',
                              display: 'inline-flex', alignItems: 'center', gap: 8,
                            }
                      }
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        if (cta.id === 'startProject') {
                          el.style.transform = 'translateY(-3px)'
                          el.style.boxShadow = '0 16px 60px rgba(0,71,255,0.7)'
                        } else {
                          el.style.background = 'rgba(255,255,255,0.05)'
                          el.style.borderColor = 'rgba(255,255,255,0.3)'
                        }
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        if (cta.id === 'startProject') {
                          el.style.transform = 'none'
                          el.style.boxShadow = '0 8px 40px rgba(0,71,255,0.5)'
                        } else {
                          el.style.background = 'transparent'
                          el.style.borderColor = 'rgba(255,255,255,0.15)'
                        }
                      }}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
                <div style={{ color: '#8892b0', fontSize: 13, marginTop: 24, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {ctaBannerPoints.map((point) => (
                    <span key={point.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={14} color="#00c864" /> {point.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .case-grid { grid-template-columns: 1fr !important; }
          .ai-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          #process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .process-grid { grid-template-columns: 1fr !important; }
          #process-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-grid h1 { font-size: clamp(32px, 9vw, 48px) !important; }
          .browser-mockup { display: none !important; }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(0,200,100,0.4); }
          100% { box-shadow: 0 0 0 8px rgba(0,200,100,0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
