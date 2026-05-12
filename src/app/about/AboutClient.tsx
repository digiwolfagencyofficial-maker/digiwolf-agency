'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Zap, Target, Handshake, TrendingUp, Scale, Rocket, Palette, Bot, Globe2, Settings, BookOpen, Heart, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const values = [
  {
    icon: <Zap size={24} />,
    title: 'Speed',
    desc: 'We move fast without cutting corners. Most projects launch in 5–10 days. Systematized delivery means premium results at startup velocity.',
    color: '#f59e0b',
  },
  {
    icon: <Target size={24} />,
    title: 'Precision',
    desc: 'Every line of code, every pixel, every document is crafted to the highest standard. We don\'t ship anything we wouldn\'t be proud to put our name on.',
    color: '#3b82f6',
  },
  {
    icon: <Handshake size={24} />,
    title: 'Transparency',
    desc: 'No hidden fees, no vague timelines, no agency doublespeak. Clear pricing, honest scoping, and direct communication throughout every project.',
    color: '#10b981',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Results',
    desc: 'We measure success by your growth metrics, not our activity. Every strategy we deploy is tied to concrete, trackable outcomes for your business.',
    color: '#8b5cf6',
  },
]

const stats = [
  { num: '47', label: 'Clients Served', suffix: '+' },
  { num: '98', label: 'Satisfaction Rate', suffix: '%' },
  { num: '3', label: 'Countries Active', suffix: '' },
  { num: '7', label: 'Avg Day Delivery', suffix: ' days' },
]

const timeline = [
  { year: '2020', event: 'Agency founded in Prague by Uuganbayar Ganbaatar', icon: <Scale size={18} /> },
  { year: '2021', event: 'First 10 Czech S.R.O. formations for Mongolian clients', icon: <Scale size={18} /> },
  { year: '2022', event: 'Expanded into web development — 15 sites launched', icon: <Rocket size={18} /> },
  { year: '2023', event: 'Brand Identity service launched; 30+ companies rebranded', icon: <Palette size={18} /> },
  { year: '2024', event: 'AI Automation division opens; 47+ clients across 3 countries', icon: <Bot size={18} /> },
  { year: '2025', event: 'Expanding into Slovak and Polish markets', icon: <Globe2 size={18} /> },
]

const culturePillars = [
  { icon: <Globe2 size={24} />, title: 'Global Mindset', desc: 'We serve clients in 3 countries and speak Czech, English, and Mongolian. Diversity is our superpower.' },
  { icon: <Settings size={24} />, title: 'Systems Thinking', desc: 'We build repeatable processes so quality is never an accident — it\'s engineered in from day one.' },
  { icon: <BookOpen size={24} />, title: 'Continuous Learning', desc: 'Every team member invests in staying ahead — new frameworks, new regulations, new AI tools.' },
  { icon: <Heart size={24} />, title: 'Client Empathy', desc: 'We\'ve all been outsiders building something new. That lived experience shapes how we treat every client.' },
]

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [hoveredCulture, setHoveredCulture] = useState<number | null>(null)
  const [hoveredCta, setHoveredCta] = useState(false)

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '140px 24px 120px',
        textAlign: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '15%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', marginBottom: 24,
            background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.35)',
            color: '#93c5fd', padding: '8px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          }}>
            Our Story
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: 28,
          }}>
            Meet the Pack
          </h1>
          <p style={{
            fontSize: 21, color: '#8892b0', lineHeight: 1.75,
            maxWidth: 680, margin: '0 auto 20px',
          }}>
            A Prague-based digital agency founded by a Mongolian entrepreneur — built to help ambitious
            businesses across Central & Eastern Europe dominate the digital age.
          </p>
          <p style={{
            fontSize: 17, color: '#6b7a96', lineHeight: 1.7,
            maxWidth: 600, margin: '0 auto 48px',
          }}>
            We believe every entrepreneur deserves world-class digital infrastructure, regardless of
            where they started. We build the tools. We open the doors.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/contact" style={{
              background: '#3b82f6', color: '#fff', padding: '14px 36px',
              borderRadius: 12, fontWeight: 700, fontSize: 16,
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 0 30px rgba(59,130,246,0.4)',
            }}>
              Work With Us
            </Link>
            <Link href="/services" style={{
              background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '14px 36px', borderRadius: 12, fontWeight: 600, fontSize: 16,
              textDecoration: 'none', display: 'inline-block',
            }}>
              Our Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 24px',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 40, textAlign: 'center' as const,
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontSize: 48, fontWeight: 900,
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1,
              }}>
                {s.num}{s.suffix}
              </div>
              <div style={{ fontSize: 15, color: '#8892b0', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Founder card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 32, padding: '48px',
            textAlign: 'center' as const,
            position: 'relative' as const,
          }}>
            <div style={{
              position: 'absolute' as const, top: 0, left: 0, right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              borderRadius: '32px 32px 0 0',
            }} />
            {/* Founder Photo */}
            <div style={{
              width: 140, height: 140, borderRadius: '50%',
              margin: '0 auto 24px',
              border: '3px solid rgba(59,130,246,0.5)',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(59,130,246,0.3)',
              position: 'relative' as const,
            }}>
              <Image
                src="/founder.jpg"
                alt="Uuganbayar Ganbaatar"
                width={140}
                height={140}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6, letterSpacing: '-0.02em' }}>
              Uuganbayar Ganbaatar
            </h3>
            <p style={{
              fontSize: 14, fontWeight: 700, marginBottom: 8,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '0.04em', textTransform: 'uppercase' as const,
            }}>
              Founder & CEO
            </p>
            <p style={{ fontSize: 13, color: '#6b7a96', marginBottom: 24 }}>
              🇲🇳 Ulaanbaatar → 🇨🇿 Prague
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center' as const }}>
              {['Next.js', 'TypeScript', 'AI Automation', 'Czech Business Law', 'Brand Strategy'].map((skill) => (
                <span key={skill} style={{
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.35)',
                  color: '#93c5fd', padding: '5px 14px', borderRadius: 100,
                  fontSize: 12, fontWeight: 600,
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Founder bio */}
          <div>
            <div style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
              color: '#93c5fd', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>
              The Founder
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              From Ulaanbaatar to Prague —{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Building Bridges
              </span>
            </h2>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>
              Mongolian entrepreneur based in Prague, Czech Republic. Uuganbayar founded Digi Wolf Agency
              to bridge the gap between Eastern European business opportunities and Mongolian diaspora entrepreneurs.
            </p>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>
              He specializes in web development, business formation (Czech S.R.O.), and AI automation —
              having helped over 47 entrepreneurs from Mongolia, Kazakhstan, and Central Asia establish their
              presence in the European market.
            </p>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85 }}>
              With over 10 years living and working in the Czech Republic, he understands firsthand what
              it means to be an outsider building something real in a new country — and that empathy is at
              the core of every service Digi Wolf offers.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: 64 }}>
            <div style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
              color: '#93c5fd', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>
              What We Stand For
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800 }}>
              Our Core Values
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map((v, i) => {
              const isHov = hoveredValue === i
              return (
                <div
                  key={v.title}
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  style={{
                    background: isHov ? `${v.color}10` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? v.color + '40' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 24, padding: 36,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    transform: isHov ? 'translateY(-4px)' : 'none',
                    boxShadow: isHov ? `0 20px 50px rgba(0,0,0,0.35), 0 0 30px ${v.color}15` : '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 18,
                    background: `${v.color}18`, border: `1px solid ${v.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, marginBottom: 24,
                    boxShadow: isHov ? `0 0 20px ${v.color}30` : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {v.icon}
                  </div>
                  <h3 style={{
                    fontSize: 22, fontWeight: 800, marginBottom: 14,
                    color: isHov ? v.color : '#f0f4ff',
                    transition: 'color 0.2s',
                  }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#8892b0', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Agency Story / Timeline */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
              color: '#93c5fd', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>
              Our Journey
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              5 Years of{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Relentless Growth
              </span>
            </h2>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>
              From a one-person consultancy to a full-stack digital agency serving clients across 3 countries —
              every milestone was earned by delivering exceptional results for our clients.
            </p>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85 }}>
              Today, Digi Wolf serves clients across the Czech Republic, Mongolia, and Slovakia, providing
              end-to-end digital services in English, Czech, and Mongolian.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28, padding: 40,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {timeline.map((item) => (
                <div key={item.year} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 20,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', marginBottom: 3, letterSpacing: '0.05em' }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: 14, color: '#c0c8d8', lineHeight: 1.5 }}>{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: 64 }}>
            <div style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
              color: '#93c5fd', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>
              How We Work
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              Team Culture
            </h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              We are a lean, high-performance team built on expertise, trust, and a genuine passion for
              what we do. No bloat. No politics. Just results.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {culturePillars.map((pillar, i) => {
              const isHov = hoveredCulture === i
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => setHoveredCulture(i)}
                  onMouseLeave={() => setHoveredCulture(null)}
                  style={{
                    background: isHov ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 20, padding: 32,
                    transition: 'all 0.3s',
                    transform: isHov ? 'translateY(-3px)' : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{pillar.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{pillar.title}</h3>
                  <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.75 }}>{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 24px', textAlign: 'center' as const,
        background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.07) 100%)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <Image src="/digiwolf-icon.png" alt="Digi Wolf" width={72} height={72} style={{ borderRadius: 16, opacity: 0.9 }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 20 }}>
            Ready to Join the Pack?
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', lineHeight: 1.7, marginBottom: 40 }}>
            Whether you&apos;re a Mongolian entrepreneur looking to enter the EU market, a Czech startup
            needing a digital edge, or any ambitious business ready to scale — we&apos;re here to help you dominate.
          </p>
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
            Get In Touch →
          </Link>
          <div style={{
            marginTop: 40, display: 'flex', justifyContent: 'center' as const,
            gap: 40, flexWrap: 'wrap' as const,
          }}>
            {[
              { icon: <MapPin size={14} />, text: 'Based in Prague, Czech Republic' },
              { icon: <Globe2 size={14} />, text: 'Serving 3 countries' },
              { icon: <Settings size={14} />, text: 'CZ, EN, MN spoken' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892b0', fontSize: 14 }}>
                <span style={{ display: 'flex' }}>{item.icon}</span>
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
