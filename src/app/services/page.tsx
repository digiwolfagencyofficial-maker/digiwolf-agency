'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const services = [
  {
    id: 'web',
    icon: '💻',
    title: 'Web Development',
    tagline: 'Full-stack websites that convert',
    price: 'from 45,000 CZK',
    badge: 'Most Popular',
    description:
      'We build premium full-stack websites engineered for performance, SEO, and conversions. Next.js, Webflow, e-commerce — every pixel intentional, every millisecond optimized.',
    features: [
      'Next.js 14 + TypeScript full-stack',
      'Webflow & custom CMS builds',
      'E-commerce with Shopify / WooCommerce',
      'Mobile-first responsive design',
      'Technical SEO built-in from day one',
      'Core Web Vitals optimized (100/100)',
      'Custom animations & interactions',
      'Analytics & conversion tracking',
      '30-day post-launch support included',
    ],
    color: '#3b82f6',
    process: [
      { step: '01', label: 'Discovery Call', desc: 'We map your goals, audience, and competitors in 60 minutes.' },
      { step: '02', label: 'Design Wireframes', desc: 'Low-fi to high-fi prototypes reviewed and approved by you.' },
      { step: '03', label: 'Development', desc: 'Clean, typed, documented code shipped in sprints.' },
      { step: '04', label: 'QA & Launch', desc: 'Cross-browser, cross-device testing. Zero bugs at launch.' },
    ],
  },
  {
    id: 'sro',
    icon: '🏛️',
    title: 'Czech S.R.O. Formation',
    tagline: 'EU company in days, not months',
    price: 'from 15,000 CZK',
    badge: 'EU Gateway',
    description:
      'Complete company registration for your Czech S.R.O. — bank account setup, compliance, and full English-language guidance. We handle every form, notary, and government office.',
    features: [
      'Full company registration handled end-to-end',
      'Bank account opening assistance',
      'Trade license (živnostenský list) included',
      'Registered office address (1 year)',
      'VAT registration support',
      'Memorandum of Association drafting',
      'Apostille & certified translations if needed',
      'Ongoing compliance consultation',
      'English guidance throughout',
    ],
    color: '#6366f1',
    process: [
      { step: '01', label: 'Document Checklist', desc: 'We send you a precise list of required documents.' },
      { step: '02', label: 'Notary Appointment', desc: 'We schedule and attend the notary signing with you.' },
      { step: '03', label: 'Court Registration', desc: 'Filed with the Commercial Register — typically 5 business days.' },
      { step: '04', label: 'Handover', desc: 'You receive all official documents and a complete company kit.' },
    ],
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI Automation',
    tagline: 'Work smarter, scale faster',
    price: 'from 25,000 CZK',
    badge: 'Future-Proof',
    description:
      'We deploy custom AI systems — chatbots, workflow automation, and lead generation systems — that eliminate repetitive work and supercharge your team productivity.',
    features: [
      'Custom GPT-4 / Claude chatbots',
      'Lead qualification & nurturing bots',
      'Workflow automation (n8n / Make / Zapier)',
      'CRM & ERP integration',
      'Document processing pipelines',
      'AI-powered content generation',
      'Slack / Teams internal assistants',
      'Custom API integrations',
      'Training & handover documentation',
    ],
    color: '#10b981',
    process: [
      { step: '01', label: 'Workflow Audit', desc: 'We identify your highest-ROI automation opportunities.' },
      { step: '02', label: 'System Design', desc: 'Architecture mapped and approved before a single line of code.' },
      { step: '03', label: 'Build & Test', desc: 'Iterative development with weekly demos and your feedback.' },
      { step: '04', label: 'Deploy & Train', desc: 'Live deployment with full team training and documentation.' },
    ],
  },
  {
    id: 'seo',
    icon: '📈',
    title: 'SEO & Growth',
    tagline: 'Rank higher. Grow faster.',
    price: 'from 8,000 CZK/month',
    badge: 'Ongoing',
    description:
      'Technical SEO, content strategy, and Google Ads built for Central & Eastern European markets. We combine technical excellence with strategic content to get your site on Page 1.',
    features: [
      'Full technical SEO audit & fix',
      'Keyword research (CZ, SK, PL, EN)',
      'On-page optimization & schema markup',
      'Monthly content strategy & briefs',
      'Google Ads campaign management',
      'Link building in CEE markets',
      'Google Search Console management',
      'Competitor gap analysis',
      'Monthly reporting with real metrics',
    ],
    color: '#f59e0b',
    process: [
      { step: '01', label: 'SEO Audit', desc: 'Complete technical and content audit delivered in week one.' },
      { step: '02', label: 'Strategy Build', desc: 'Custom roadmap targeting your exact keywords and markets.' },
      { step: '03', label: 'Execution', desc: 'Monthly sprints covering technical fixes, content, and links.' },
      { step: '04', label: 'Review & Iterate', desc: 'Monthly calls reviewing rankings, traffic, and next steps.' },
    ],
  },
  {
    id: 'brand',
    icon: '🎨',
    title: 'Brand Identity',
    tagline: 'Look like the leader you are',
    price: 'from 12,000 CZK',
    badge: 'Premium',
    description:
      'A complete visual identity system — logo, brand guidelines, and visual system — that makes you instantly recognizable and unforgettable. From logo to brand guidelines.',
    features: [
      'Brand strategy & positioning workshop',
      'Primary + secondary logo suite',
      'Full color palette system',
      'Typography hierarchy selection',
      'Business card & letterhead design',
      'Social media kit (10+ templates)',
      'Brand guidelines PDF (50+ pages)',
      'Icon set & illustration style',
      'All source files (AI, EPS, Figma)',
    ],
    color: '#ec4899',
    process: [
      { step: '01', label: 'Brand Discovery', desc: 'Deep dive into your story, values, and ideal customer.' },
      { step: '02', label: 'Concept Directions', desc: '3 distinct creative directions presented for feedback.' },
      { step: '03', label: 'Refinement', desc: 'Two rounds of revisions until it feels exactly right.' },
      { step: '04', label: 'Brand Handover', desc: 'Complete asset library + guidelines delivered and walkthrough.' },
    ],
  },
  {
    id: 'maintenance',
    icon: '🛡️',
    title: 'Website Maintenance',
    tagline: 'Always online. Always protected.',
    price: 'from 3,000 CZK/month',
    badge: 'Peace of Mind',
    description:
      'Hosting, updates, security, and support — 24/7. Our proactive maintenance plans keep your website and systems running at peak performance, always.',
    features: [
      '24/7 uptime monitoring with alerts',
      'Managed hosting included',
      'Weekly CMS & dependency updates',
      'Security scanning & malware removal',
      'Daily automated backups (30-day retention)',
      'Performance monitoring & optimization',
      'Monthly performance report',
      'Priority bug fixes (< 4hr response)',
      'Dedicated Slack channel support',
    ],
    color: '#8b5cf6',
    process: [
      { step: '01', label: 'Onboarding', desc: 'We audit your current setup and set up monitoring tools.' },
      { step: '02', label: 'Baseline Fix', desc: 'Any critical issues resolved in the first week.' },
      { step: '03', label: 'Ongoing Maintenance', desc: 'Weekly updates, checks, and optimizations run automatically.' },
      { step: '04', label: 'Monthly Review', desc: 'Report delivered with metrics, changes made, and next steps.' },
    ],
  },
]

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredProcess, setHoveredProcess] = useState<string | null>(null)

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
            Full-Stack Agency Services
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: 24,
          }}>
            Every Service You Need to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Dominate Your Market
            </span>
          </h1>
          <p style={{
            fontSize: 20, color: '#8892b0', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px',
          }}>
            From zero to market leader — web development, company formation, AI automation, and more.
            Built by experts who understand Central European markets.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' as const, flexWrap: 'wrap' as const }}>
            <Link href="/contact" style={{
              background: '#3b82f6', color: '#fff', padding: '14px 32px',
              borderRadius: 12, fontWeight: 700, fontSize: 16,
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 0 30px rgba(59,130,246,0.4)',
            }}>
              Start a Project
            </Link>
            <a href="#services" style={{
              background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '14px 32px', borderRadius: 12, fontWeight: 600, fontSize: 16,
              textDecoration: 'none', display: 'inline-block',
            }}>
              Explore Services ↓
            </a>
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
          {[
            { num: '6', label: 'Core Services' },
            { num: '47+', label: 'Clients Served' },
            { num: '5–10', label: 'Day Delivery' },
            { num: '98%', label: 'Satisfaction Rate' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#3b82f6' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#8892b0', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 32 }}>
          {services.map((svc) => {
            const isHovered = hoveredCard === svc.id
            return (
              <div
                key={svc.id}
                onMouseEnter={() => setHoveredCard(svc.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: isHovered
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHovered ? svc.color + '44' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 24, padding: 40,
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? `0 24px 60px rgba(0,0,0,0.4), 0 0 40px ${svc.color}22` : '0 4px 20px rgba(0,0,0,0.2)',
                  cursor: 'default',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `${svc.color}20`,
                    border: `1px solid ${svc.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26,
                  }}>
                    {svc.icon}
                  </div>
                  <span style={{
                    background: `${svc.color}20`, border: `1px solid ${svc.color}40`,
                    color: svc.color, padding: '4px 14px', borderRadius: 100,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  }}>
                    {svc.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6, color: '#f0f4ff' }}>{svc.title}</h2>
                <p style={{ fontSize: 14, color: svc.color, fontWeight: 600, marginBottom: 16 }}>{svc.tagline}</p>
                <p style={{ fontSize: 15, color: '#8892b0', lineHeight: 1.7, marginBottom: 28 }}>{svc.description}</p>

                {/* Price */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '14px 20px', marginBottom: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 13, color: '#8892b0' }}>Starting at</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: svc.color }}>{svc.price}</span>
                </div>

                {/* Features */}
                <div style={{ marginBottom: 32, flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#8892b0', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
                    What&apos;s Included
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {svc.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#c8d0e0' }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: '50%',
                          background: `${svc.color}20`, border: `1px solid ${svc.color}50`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 1, fontSize: 10, color: svc.color,
                        }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16, padding: 20, marginBottom: 28,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#8892b0', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
                    Our Process
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {svc.process.map((p) => (
                      <div key={p.step}
                        onMouseEnter={() => setHoveredProcess(svc.id + p.step)}
                        onMouseLeave={() => setHoveredProcess(null)}
                        style={{
                          background: hoveredProcess === svc.id + p.step ? `${svc.color}15` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${hoveredProcess === svc.id + p.step ? svc.color + '40' : 'rgba(255,255,255,0.06)'}`,
                          borderRadius: 10, padding: 12,
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ fontSize: 11, fontWeight: 800, color: svc.color, marginBottom: 4 }}>{p.step} {p.label}</div>
                        <div style={{ fontSize: 12, color: '#8892b0', lineHeight: 1.5 }}>{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link href="/contact" style={{
                  display: 'block', textAlign: 'center' as const,
                  background: isHovered ? svc.color : 'rgba(255,255,255,0.05)',
                  color: '#fff', padding: '14px 24px', borderRadius: 12,
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  border: `1px solid ${isHovered ? svc.color : 'rgba(255,255,255,0.1)'}`,
                  transition: 'all 0.3s',
                  boxShadow: isHovered ? `0 8px 30px ${svc.color}40` : 'none',
                }}>
                  Get Started →
                </Link>
              </div>
            )
          })}
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
            {[
              { icon: '⏱️', title: 'On-Time Delivery', desc: 'We ship on schedule, every time. If we miss a deadline, you get 10% off your invoice.' },
              { icon: '🔒', title: 'Fixed Pricing', desc: 'Quote agreed upfront, no scope creep surprises. What we quote is what you pay.' },
              { icon: '♾️', title: 'Unlimited Revisions', desc: 'Within scope, we iterate until you\'re 100% satisfied. Period.' },
            ].map((g) => (
              <div
                key={g.title}
                style={{
                  background: 'rgba(59,130,246,0.05)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: 20, padding: 32,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 36 }}>{g.icon}</span>
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
            Ready to Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Exceptional?
            </span>
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', marginBottom: 40, lineHeight: 1.7 }}>
            Book a free 30-minute strategy call. We&apos;ll map your goals, identify the right services,
            and deliver a detailed proposal within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' as const, flexWrap: 'wrap' as const }}>
            <Link href="/contact" style={{
              background: '#3b82f6', color: '#fff', padding: '16px 40px',
              borderRadius: 12, fontWeight: 700, fontSize: 17,
              textDecoration: 'none', boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
            }}>
              Book a Free Strategy Call →
            </Link>
            <Link href="/pricing" style={{
              background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '16px 40px', borderRadius: 12, fontWeight: 600, fontSize: 17,
              textDecoration: 'none',
            }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
