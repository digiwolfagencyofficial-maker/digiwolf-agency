'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Zap, Target, Handshake, TrendingUp, Scale, Rocket, Palette, Bot, Globe2, Settings, BookOpen, Heart, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Stat = { id: string; num: string; suffix: string; label: string }
type Skill = { id: string; label: string }
type Paragraph = { id: string; text: string }
type ValueItem = { id: string; title: string; desc: string }
type TimelineItem = { id: string; year: string; event: string }
type Pillar = { id: string; title: string; desc: string }
type HeroCta = { id: string; label: string }
type Fact = { id: string; text: string }

const valueMeta: Record<string, { icon: React.ReactNode; color: string }> = {
  speed: { icon: <Zap size={24} />, color: '#f59e0b' },
  precision: { icon: <Target size={24} />, color: '#3b82f6' },
  transparency: { icon: <Handshake size={24} />, color: '#10b981' },
  results: { icon: <TrendingUp size={24} />, color: '#8b5cf6' },
}

const timelineIcons: Record<string, React.ReactNode> = {
  '2020': <Scale size={18} />,
  '2021': <Scale size={18} />,
  '2022': <Rocket size={18} />,
  '2023': <Palette size={18} />,
  '2024': <Bot size={18} />,
  '2025': <Globe2 size={18} />,
}

const pillarIcons: Record<string, React.ReactNode> = {
  globalMindset: <Globe2 size={24} />,
  systemsThinking: <Settings size={24} />,
  continuousLearning: <BookOpen size={24} />,
  clientEmpathy: <Heart size={24} />,
}

const heroCtaHrefs: Record<string, string> = {
  workWithUs: '/book',
  ourServices: '/services',
}

const factIcons: Record<string, React.ReactNode> = {
  location: <MapPin size={14} />,
  countries: <Globe2 size={14} />,
  languages: <Settings size={14} />,
}

export default function AboutClient() {
  const t = useTranslations('about')
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [hoveredCulture, setHoveredCulture] = useState<number | null>(null)
  const [hoveredCta, setHoveredCta] = useState(false)

  const stats = t.raw('stats') as Stat[]
  const heroCtas = t.raw('hero.ctas') as HeroCta[]
  const skills = t.raw('founder.skills') as Skill[]
  const founderParagraphs = t.raw('founder.paragraphs') as Paragraph[]
  const values = t.raw('values.items') as ValueItem[]
  const journeyParagraphs = t.raw('journey.paragraphs') as Paragraph[]
  const timeline = t.raw('journey.timeline') as TimelineItem[]
  const pillars = t.raw('culture.pillars') as Pillar[]
  const facts = t.raw('cta.facts') as Fact[]

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      <section style={{ position: 'relative', padding: '140px 24px 120px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: 24, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.35)', color: '#93c5fd', padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
            {t('hero.badge')}
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 28 }}>
            {t('hero.title')}
          </h1>
          <p style={{ fontSize: 21, color: '#8892b0', lineHeight: 1.75, maxWidth: 680, margin: '0 auto 20px' }}>
            {t('hero.subtitle')}
          </p>
          <p style={{ fontSize: 17, color: '#6b7a96', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 48px' }}>
            {t('hero.paragraph2')}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            {heroCtas.map((cta) => (
              <Link
                key={cta.id}
                href={heroCtaHrefs[cta.id] ?? '/book'}
                style={{
                  background: cta.id === 'workWithUs' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                  color: '#f0f4ff',
                  border: cta.id === 'workWithUs' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  padding: '14px 36px', borderRadius: 12, fontWeight: cta.id === 'workWithUs' ? 700 : 600, fontSize: 16,
                  textDecoration: 'none', display: 'inline-block',
                  boxShadow: cta.id === 'workWithUs' ? '0 0 30px rgba(59,130,246,0.4)' : 'none',
                }}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, textAlign: 'center' as const }}>
          {stats.map((s) => (
            <div key={s.id}>
              <div style={{ fontSize: 48, fontWeight: 900, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                {s.num}{s.suffix}
              </div>
              <div style={{ fontSize: 15, color: '#8892b0', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 32, padding: '48px', textAlign: 'center' as const, position: 'relative' as const }}>
            <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '32px 32px 0 0' }} />
            <div style={{ width: 140, height: 140, borderRadius: '50%', margin: '0 auto 24px', border: '3px solid rgba(59,130,246,0.5)', overflow: 'hidden', boxShadow: '0 0 40px rgba(59,130,246,0.3)', position: 'relative' as const }}>
              <Image src="/founder.jpg" alt={t('founder.name')} width={140} height={140} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6, letterSpacing: '-0.02em' }}>{t('founder.name')}</h3>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
              {t('founder.role')}
            </p>
            <p style={{ fontSize: 13, color: '#6b7a96', marginBottom: 24 }}>{t('founder.route')}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center' as const }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.35)', color: '#93c5fd', padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                  {skill.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'inline-block', marginBottom: 20, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', padding: '7px 18px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              {t('founder.badge')}
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              {t('founder.sectionTitleLine1')}{' '}
              <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('founder.sectionTitleLine2')}
              </span>
            </h2>
            {founderParagraphs.map((p) => (
              <p key={p.id} style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>{p.text}</p>
            ))}
            <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3b82f6', color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, boxShadow: '0 8px 30px rgba(59,130,246,0.35)' }}>
              {t('founder.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: 64 }}>
            <div style={{ display: 'inline-block', marginBottom: 20, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', padding: '7px 18px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              {t('values.badge')}
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800 }}>{t('values.title')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map((v, i) => {
              const meta = valueMeta[v.id]
              const isHov = hoveredValue === i
              return (
                <div
                  key={v.id}
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  style={{
                    background: isHov ? `${meta.color}10` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? meta.color + '40' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 24, padding: 36,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    transform: isHov ? 'translateY(-4px)' : 'none',
                    boxShadow: isHov ? `0 20px 50px rgba(0,0,0,0.35), 0 0 30px ${meta.color}15` : '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'default',
                  }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: 18, background: `${meta.color}18`, border: `1px solid ${meta.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 24, boxShadow: isHov ? `0 0 20px ${meta.color}30` : 'none', transition: 'all 0.3s', color: meta.color }}>
                    {meta.icon}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, color: isHov ? meta.color : '#f0f4ff', transition: 'color 0.2s' }}>{v.title}</h3>
                  <p style={{ fontSize: 15, color: '#8892b0', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', marginBottom: 20, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', padding: '7px 18px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              {t('journey.badge')}
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              {t('journey.titleLine1')}{' '}
              <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('journey.titleLine2')}
              </span>
            </h2>
            {journeyParagraphs.map((p) => (
              <p key={p.id} style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>{p.text}</p>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {timeline.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20, color: '#3b82f6' }}>
                    {timelineIcons[item.id]}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', marginBottom: 3, letterSpacing: '0.05em' }}>{item.year}</div>
                    <div style={{ fontSize: 14, color: '#c0c8d8', lineHeight: 1.5 }}>{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: 64 }}>
            <div style={{ display: 'inline-block', marginBottom: 20, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', padding: '7px 18px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              {t('culture.badge')}
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>{t('culture.title')}</h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>{t('culture.subtitle')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {pillars.map((pillar, i) => {
              const isHov = hoveredCulture === i
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredCulture(i)}
                  onMouseLeave={() => setHoveredCulture(null)}
                  style={{
                    background: isHov ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 20, padding: 32, transition: 'all 0.3s',
                    transform: isHov ? 'translateY(-3px)' : 'none', cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16, color: '#3b82f6' }}>{pillarIcons[pillar.id]}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{pillar.title}</h3>
                  <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.75 }}>{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', textAlign: 'center' as const, background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.07) 100%)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <Image src="/digiwolf-icon.png" alt="Digi Wolf" width={72} height={72} unoptimized style={{ borderRadius: 16, opacity: 0.9, objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 20 }}>{t('cta.title')}</h2>
          <p style={{ fontSize: 18, color: '#8892b0', lineHeight: 1.7, marginBottom: 40 }}>{t('cta.description')}</p>
          <Link
            href="/contact"
            onMouseEnter={() => setHoveredCta(true)}
            onMouseLeave={() => setHoveredCta(false)}
            style={{
              display: 'inline-block',
              background: hoveredCta ? '#2563eb' : '#3b82f6',
              color: '#fff', padding: '18px 48px', borderRadius: 14,
              fontWeight: 800, fontSize: 18, textDecoration: 'none',
              boxShadow: hoveredCta ? '0 0 50px rgba(59,130,246,0.6)' : '0 0 30px rgba(59,130,246,0.35)',
              transform: hoveredCta ? 'translateY(-2px) scale(1.02)' : 'none',
              transition: 'all 0.25s',
            }}
          >
            {t('cta.button')}
          </Link>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' as const, gap: 40, flexWrap: 'wrap' as const }}>
            {facts.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892b0', fontSize: 14 }}>
                <span style={{ display: 'flex' }}>{factIcons[item.id]}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
