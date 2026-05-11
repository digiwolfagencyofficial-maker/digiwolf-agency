'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const steps = [
  {
    num: '01',
    icon: '📞',
    title: 'Discovery Call',
    subtitle: '30 minutes — Free',
    desc: "We start with a focused 30-minute call to understand your business, goals, and audience. No fluff, no sales pitch — just the information we need to build something that actually works for you. We'll assess your competition, ask the hard questions, and come out with a crystal-clear picture of what success looks like.",
    deliverables: ['Project scope document', 'Competitor analysis', 'Timeline estimate', 'Fixed-price quote'],
    color: '#0047FF',
    bg: 'rgba(0,71,255,0.08)',
    border: 'rgba(0,71,255,0.25)',
  },
  {
    num: '02',
    icon: '🎨',
    title: 'Strategy & Design',
    subtitle: '2–3 days',
    desc: "Custom wireframes and high-fidelity mockups tailored to your brand. You see exactly what we're building before a single line of code is written. We design mobile-first, with every element purposefully placed to guide your visitors toward conversion. You approve every pixel — revisions are unlimited at this stage.",
    deliverables: ['Brand-aligned mockups', 'Mobile & desktop layouts', 'Interaction prototypes', 'Content strategy'],
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    num: '03',
    icon: '⚙️',
    title: 'Development',
    subtitle: '3–7 days',
    desc: "Production-grade code built with Next.js, TypeScript, and Supabase. We don't use page builders or templates — everything is custom-engineered for performance and scale. Core Web Vitals are a priority: we target 95+ scores across all metrics. Clean, documented code that you own completely.",
    deliverables: ['Next.js production build', 'TypeScript codebase', 'SEO optimization', 'Performance-first code'],
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    num: '04',
    icon: '🔍',
    title: 'Review & Refine',
    subtitle: '1–2 days',
    desc: "Full QA across all major browsers, devices, and screen sizes. You receive staging access to test everything yourself. Any changes you request are completed without question — we don't start counting revisions until you're completely satisfied. Accessibility and performance are validated before we move forward.",
    deliverables: ['Cross-browser testing', 'Staging environment access', 'Performance audit report', 'Unlimited revisions'],
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  {
    num: '05',
    icon: '🚀',
    title: 'Launch & Grow',
    subtitle: 'Ongoing',
    desc: "We handle the deployment, DNS configuration, and post-launch monitoring. Your site goes live with zero downtime. After launch, we monitor performance and are on call for any issues for 30 days. For ongoing clients, we provide continuous improvements, A/B testing, and growth optimization — turning your website into a sales machine.",
    deliverables: ['Zero-downtime deployment', 'DNS & SSL setup', '30-day post-launch support', 'Analytics dashboard'],
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
  },
]

const faqs = [
  { q: 'How long does the whole process take?', a: 'For a standard agency website, the end-to-end process takes 7–14 business days. Complex platforms with client portals, payment integration, or custom features take 3–5 weeks. We always agree on an exact timeline before starting, and we stick to it.' },
  { q: 'What do I need to prepare before we start?', a: 'Just your goals, a rough idea of what you like (reference sites are great), and your content (text, images, logo). We provide content strategy guidance if needed. No technical knowledge required from you at any point.' },
  { q: 'Can I make changes during development?', a: 'Absolutely. Changes to design are free and unlimited during the design phase. During development, we accommodate reasonable changes — major scope additions may require a quote adjustment, but we always discuss before proceeding.' },
  { q: 'What happens after launch?', a: 'You own everything — all source code, content, and accounts. We include 30 days of free support after launch. After that, our Maintenance Plan (3,000 CZK/mo) covers hosting, security updates, performance monitoring, and priority technical support.' },
]

export default function ProcessPageClient() {
  const stepsRef = useRef<HTMLDivElement[]>([])

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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.fade-up, .slide-left, .slide-right').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(0,71,255,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: 24 }}>
            <span className="badge">Our Process</span>
          </div>
          <h1 className="fade-up fade-up-delay-1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            From Idea to Live<br />
            <span className="gradient-text">in Days, Not Months</span>
          </h1>
          <p className="fade-up fade-up-delay-2" style={{ fontSize: 20, color: '#8892b0', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 48px' }}>
            Our battle-tested 5-step process eliminates the guesswork, delays, and revision hell that plague most agency relationships.
          </p>

          <div className="fade-up fade-up-delay-3" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '⚡', label: 'Avg. 6-day delivery' },
              { icon: '✓', label: 'Fixed-price, no surprises' },
              { icon: '🔄', label: 'Unlimited revisions' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892b0', fontSize: 15 }}>
                <span style={{ color: '#0047FF' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section style={{ padding: '60px 24px 120px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { if (el) stepsRef.current[i] = el }}
              className={i % 2 === 0 ? 'fade-up' : 'fade-up'}
              style={{ position: 'relative', marginBottom: i < steps.length - 1 ? 60 : 0 }}
            >
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', left: 39, top: 100, width: 2, height: 'calc(100% - 20px)', background: 'linear-gradient(180deg, rgba(0,71,255,0.4), rgba(0,71,255,0.05))', zIndex: 0 }} />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, position: 'relative', zIndex: 1 }}>
                {/* Step circle */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: step.bg,
                    border: `2px solid ${step.border}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 30px ${step.bg}`,
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 28 }}>{step.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.05em', marginTop: 2 }}>{step.num}</span>
                  </div>
                </div>

                {/* Content card */}
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${step.border}`,
                  borderRadius: 24, padding: '36px 40px',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>{step.title}</h2>
                        <span style={{ padding: '4px 12px', borderRadius: 100, background: step.bg, border: `1px solid ${step.border}`, color: step.color, fontSize: 12, fontWeight: 700 }}>{step.subtitle}</span>
                      </div>
                      <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{step.desc}</p>

                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Deliverables</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {step.deliverables.map((d) => (
                            <span key={d} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 13, color: '#c0c8d8' }}>
                              <span style={{ color: step.color, fontSize: 12 }}>✓</span>
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline summary bar */}
      <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Typical Project <span className="gradient-text">Timeline</span>
            </h2>
          </div>
          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {[
              { phase: 'Discovery', duration: 'Day 1', color: '#0047FF' },
              { phase: 'Design', duration: 'Day 2–4', color: '#8b5cf6' },
              { phase: 'Build', duration: 'Day 4–10', color: '#10b981' },
              { phase: 'QA', duration: 'Day 10–12', color: '#f59e0b' },
              { phase: 'Launch', duration: 'Day 12–14', color: '#ef4444' },
            ].map((phase) => (
              <div key={phase.phase} style={{ textAlign: 'center', padding: '24px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
                <div style={{ width: 40, height: 4, borderRadius: 2, background: phase.color, margin: '0 auto 16px' }} />
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{phase.phase}</div>
                <div style={{ fontSize: 13, color: '#8892b0' }}>{phase.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Process <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq) => (
              <details key={faq.q} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, overflow: 'hidden',
              }}>
                <summary style={{ padding: '22px 28px', cursor: 'pointer', fontSize: 16, fontWeight: 600, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <span style={{ color: '#0047FF', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <div style={{ padding: '0 28px 24px', color: '#8892b0', lineHeight: 1.8, fontSize: 15 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '40px 24px 120px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="fade-up" style={{
            background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.04) 100%)',
            border: '1px solid rgba(0,71,255,0.2)',
            borderRadius: 28, padding: '72px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,71,255,0.18), transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
                Ready to Start <span className="gradient-text">Your Project?</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
                Book your free discovery call and get a fixed-price quote within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  background: '#0047FF', color: '#fff', textDecoration: 'none',
                  padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 700,
                  boxShadow: '0 8px 40px rgba(0,71,255,0.4)', transition: 'all 0.2s',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Book Discovery Call →
                </Link>
                <Link href="/services" style={{
                  color: '#f0f4ff', textDecoration: 'none',
                  padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s',
                }}>
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 80px"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div > div[style*="grid-template-columns: 80px"] {
            grid-template-columns: 1fr !important;
          }
          #process-steps .step-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
