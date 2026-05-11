'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const caseStudies = [
  {
    id: 'techventures',
    client: 'TechVentures Prague',
    category: 'SaaS Website + Client Portal',
    headline: '+340% Conversion Rate in 30 Days',
    tagline: 'Full-stack rebrand and Next.js platform launch',
    color: '#0047FF',
    bg: 'rgba(0,71,255,0.06)',
    border: 'rgba(0,71,255,0.2)',
    emoji: '💻',
    metrics: [
      { value: '+340%', label: 'Conversion rate' },
      { value: '5 days', label: 'Delivery time' },
      { value: '98', label: 'Lighthouse score' },
      { value: '€0', label: 'Downtime at launch' },
    ],
    challenge: "TechVentures Prague was losing enterprise clients to competitors with more polished digital presences. Their existing WordPress site was slow, generic, and failing to communicate the premium nature of their SaaS product. Conversion rates were under 1.2%.",
    solution: "We rebuilt their entire digital presence from scratch using Next.js 14, Supabase, and a custom client portal. The new site featured a premium dark design, interactive product demos, and a fully integrated dashboard for their existing clients.",
    results: "Within 30 days of launch, conversion rates jumped from 1.2% to 4.2% — a 340% increase. The average session duration doubled. Three enterprise clients explicitly cited the new website as a factor in their purchasing decision.",
    services: ['Next.js Website', 'Client Portal', 'Supabase Backend', 'Brand Identity', 'SEO Strategy'],
    quote: { text: "Digi Wolf built our entire platform in 5 days. The quality is exceptional — our conversion rate jumped 340% in the first month. Best investment we've made this year.", author: 'Arjun Sharma', role: 'CEO, TechVentures Prague' },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion', 'Stripe'],
  },
  {
    id: 'mn-export',
    client: 'MN Export Hub',
    category: 'E-commerce Platform + S.R.O. Formation',
    headline: '€180K Revenue in First 90 Days',
    tagline: 'Trilingual B2B marketplace + Czech company setup',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.2)',
    emoji: '🌏',
    metrics: [
      { value: '€180K', label: 'Revenue in 90 days' },
      { value: '3 langs', label: 'CZ / EN / MN' },
      { value: '14 days', label: 'Total delivery' },
      { value: 'S.R.O.', label: 'Czech entity formed' },
    ],
    challenge: "A Mongolian entrepreneur wanted to bridge Mongolian exporters with EU buyers but lacked both a Czech legal entity and an online platform. The challenge was creating a trilingual B2B marketplace while simultaneously handling Czech S.R.O. formation — all within a tight launch window.",
    solution: "We handled the complete Czech S.R.O. registration in parallel with building the e-commerce platform. The marketplace was built with Next.js, featured full Czech/English/Mongolian localization, B2B inquiry flows, and an admin portal for managing listings and leads.",
    results: "The platform launched within 14 days. In the first 90 days, MN Export Hub facilitated €180K in B2B transactions between Mongolian exporters and Czech/Slovak buyers. The company became operational with a valid Czech S.R.O. entity from day one.",
    services: ['E-commerce Platform', 'Czech S.R.O. Formation', 'Multilingual (CZ/EN/MN)', 'B2B Portal', 'Admin Dashboard'],
    quote: { text: "As a Mongolian entrepreneur in Prague, having an agency that speaks my language — literally — is invaluable. They formed my company and built my platform simultaneously. Results speak for themselves.", author: 'Enkhmaa B.', role: 'Founder, MN Export Hub' },
    tags: ['Next.js', 'i18n', 'Supabase', 'S.R.O. Formation', 'B2B'],
  },
  {
    id: 'novak-consulting',
    client: 'Novák Consulting s.r.o.',
    category: 'Agency Website + AI Automation',
    headline: '23 Hours/Week Saved with AI Workflows',
    tagline: 'Lead qualification chatbot + premium website',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.2)',
    emoji: '🤖',
    metrics: [
      { value: '23h/wk', label: 'Time saved on admin' },
      { value: '4.8×', label: 'More qualified leads' },
      { value: '6 days', label: 'Website delivery' },
      { value: '100%', label: 'Client satisfaction' },
    ],
    challenge: "Tomáš Novák was spending 20+ hours per week manually qualifying leads, following up with prospects, and managing consultation bookings. His existing website looked dated and wasn't converting. He needed both a new digital presence and automation to reclaim his time.",
    solution: "We built a premium consulting website and integrated a custom AI lead qualification chatbot that pre-qualifies prospects, books discovery calls directly into Calendly, and sends personalized follow-up sequences. The entire pipeline runs autonomously.",
    results: "The AI system reduced manual admin work from 20+ hours to under 3 hours per week. Lead quality improved — the chatbot's pre-qualification meant Tomáš only spoke to prospects who were already 80% ready to buy. Revenue grew 60% in the first quarter.",
    services: ['Consulting Website', 'AI Chatbot', 'Lead Automation', 'Calendly Integration', 'Email Sequences'],
    quote: { text: "They handled my Czech S.R.O. formation while simultaneously building my agency site. Then automated my entire lead pipeline. Professional, fast, and zero stress.", author: 'Tomáš Novák', role: 'Founder, Novák Consulting' },
    tags: ['Next.js', 'AI/GPT-4', 'n8n', 'Calendly API', 'Resend'],
  },
]

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#8892b0', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function WorkPageClient() {
  const [activeCase, setActiveCase] = useState<string | null>(null)

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

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(0,71,255,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: 24 }}>
            <span className="badge">Case Studies</span>
          </div>
          <h1 className="fade-up fade-up-delay-1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Real Results,<br />
            <span className="gradient-text">Real Clients</span>
          </h1>
          <p className="fade-up fade-up-delay-2" style={{ fontSize: 20, color: '#8892b0', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 48px' }}>
            Not mock-ups. Not hypotheticals. Actual projects we built for actual businesses — with the numbers to prove it.
          </p>

          <div className="fade-up fade-up-delay-3" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '47+', label: 'Projects Shipped' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '3', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#8892b0' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section style={{ padding: '40px 24px 120px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {caseStudies.map((cs, i) => (
            <div
              key={cs.id}
              className="fade-up"
              style={{
                background: `linear-gradient(135deg, ${cs.bg}, rgba(255,255,255,0.01))`,
                border: `1px solid ${cs.border}`,
                borderRadius: 28, overflow: 'hidden',
                transition: 'all 0.3s',
              }}
              onMouseEnter={() => setActiveCase(cs.id)}
              onMouseLeave={() => setActiveCase(null)}
            >
              {/* Top accent */}
              <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${cs.color}, transparent)` }} />

              <div style={{ padding: '48px 52px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: cs.bg, border: `1px solid ${cs.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{cs.emoji}</div>
                      <div>
                        <div style={{ fontSize: 13, color: '#8892b0', marginBottom: 2 }}>{cs.category}</div>
                        <div style={{ fontSize: 20, fontWeight: 800 }}>{cs.client}</div>
                      </div>
                    </div>
                    <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.02em', color: cs.color, marginBottom: 8 }}>{cs.headline}</h2>
                    <p style={{ color: '#8892b0', fontSize: 16 }}>{cs.tagline}</p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {cs.tags.map((tag) => (
                      <span key={tag} style={{ padding: '5px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#8892b0' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
                  {cs.metrics.map((m) => (
                    <MetricCard key={m.label} value={m.value} label={m.label} />
                  ))}
                </div>

                {/* Challenge / Solution / Results */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 36 }}>
                  {[
                    { label: 'The Challenge', text: cs.challenge, icon: '🎯' },
                    { label: 'Our Solution', text: cs.solution, icon: '⚙️' },
                    { label: 'The Results', text: cs.results, icon: '📈' },
                  ].map((item) => (
                    <div key={item.label} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                      </div>
                      <p style={{ fontSize: 14, color: '#c0c8d8', lineHeight: 1.75, margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Services used */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Services:</span>
                  {cs.services.map((s) => (
                    <span key={s} style={{ padding: '4px 12px', borderRadius: 100, background: cs.bg, border: `1px solid ${cs.border}`, color: cs.color, fontSize: 12, fontWeight: 600 }}>{s}</span>
                  ))}
                </div>

                {/* Quote */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 32px' }}>
                  <div style={{ fontSize: 36, color: cs.color, opacity: 0.6, lineHeight: 1, marginBottom: 12 }}>&ldquo;</div>
                  <p style={{ fontSize: 16, color: '#c8d3f0', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 20 }}>{cs.quote.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${cs.color}, ${cs.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>{cs.quote.author.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{cs.quote.author}</div>
                      <div style={{ color: '#8892b0', fontSize: 12 }}>{cs.quote.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="fade-up" style={{
            background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.04) 100%)',
            border: '1px solid rgba(0,71,255,0.2)',
            borderRadius: 28, padding: '72px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,71,255,0.18), transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>Your Project Next</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
                Ready to Join This List?
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
                Let&apos;s add your company to our case studies. Book a free discovery call and see what&apos;s possible.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  background: '#0047FF', color: '#fff', textDecoration: 'none',
                  padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 700,
                  boxShadow: '0 8px 40px rgba(0,71,255,0.4)', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Start Your Project →
                </Link>
                <Link href="/process" style={{
                  color: '#f0f4ff', textDecoration: 'none',
                  padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  How We Work
                </Link>
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
        @media (max-width: 600px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
