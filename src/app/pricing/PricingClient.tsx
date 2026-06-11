'use client'

import Link from 'next/link'
import { Check, Lock, Clock, Infinity, CreditCard, TrendingUp, Shield, Bot, Palette, Minus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/components/ui/FaqAccordion'

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: '15,000',
    currency: 'CZK',
    desc: 'Perfect for freelancers and small businesses launching their first professional website.',
    features: [
      '5-page website',
      'Mobile responsive',
      'SEO optimized',
      'Contact form',
      '30-day support',
      'Source code included',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '45,000',
    currency: 'CZK',
    desc: 'For growing agencies that need a full-featured site with client portal and integrations.',
    features: [
      'Unlimited pages',
      'Client dashboard',
      'Payment integration',
      'CRM integration',
      'AI chatbot',
      '90-day support',
      'Priority delivery',
    ],
    cta: 'Most Popular',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    currency: '',
    desc: 'Full-stack platform with custom features, AI automation, and dedicated account management.',
    features: [
      'Everything in Growth',
      'Custom AI workflows',
      'Multi-language',
      'White-label option',
      'SLA guarantee',
      'Dedicated PM',
      'Lifetime support',
    ],
    cta: 'Contact Us',
    featured: false,
  },
]

type CompareCell = boolean | string

const comparisonRows: { label: string; starter: CompareCell; growth: CompareCell; enterprise: CompareCell }[] = [
  { label: 'Pages included', starter: '5 pages', growth: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Mobile responsive design', starter: true, growth: true, enterprise: true },
  { label: 'SEO setup', starter: 'Basic', growth: 'Advanced', enterprise: 'Enterprise' },
  { label: 'Contact form', starter: true, growth: true, enterprise: true },
  { label: 'Post-launch support', starter: '30 days', growth: '90 days', enterprise: 'Lifetime' },
  { label: 'Source code ownership', starter: true, growth: true, enterprise: true },
  { label: 'Client dashboard', starter: false, growth: true, enterprise: true },
  { label: 'Payment integration', starter: false, growth: true, enterprise: true },
  { label: 'CRM integration', starter: false, growth: true, enterprise: true },
  { label: 'AI chatbot', starter: false, growth: true, enterprise: true },
  { label: 'Custom AI workflows', starter: false, growth: false, enterprise: true },
  { label: 'Multi-language', starter: false, growth: false, enterprise: true },
  { label: 'White-label option', starter: false, growth: false, enterprise: true },
  { label: 'SLA guarantee', starter: false, growth: false, enterprise: true },
  { label: 'Dedicated project manager', starter: false, growth: false, enterprise: true },
  { label: 'Delivery timeline', starter: '5–7 days', growth: 'Priority', enterprise: 'Custom SLA' },
]

const paymentFaqs = [
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. For projects over 20,000 CZK, we offer a 50/50 split — 50% upfront to begin work, and 50% on delivery. For retainer services, you\'re billed monthly at the start of each period.',
  },
  {
    q: 'What currency do you accept?',
    a: 'We invoice in Czech Koruna (CZK). We also accept EUR and USD at the current exchange rate. All payments are processed via bank transfer or Stripe for card payments.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'Never. Our quotes are fully itemized and fixed. The only additional costs that could arise are third-party services you choose to add (e.g., a premium CMS plan, specific API subscriptions) — we always disclose these upfront.',
  },
  {
    q: 'What happens if I need more revisions?',
    a: 'On Starter plans, additional revision rounds are available at 2,500 CZK per round. Growth and Enterprise plans include unlimited revisions within scope. We define scope clearly in your proposal to avoid any ambiguity.',
  },
  {
    q: 'How does the 14-day money-back guarantee work?',
    a: 'If you\'re not satisfied with the initial design concepts after the first review round, you can request a full refund within 14 days of project start. This applies to new website projects only.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Absolutely. Many clients start on Starter and upgrade as their business grows. We apply a credit for work already done against your upgrade cost, so you never pay twice for the same work.',
  },
  {
    q: 'Is VAT included in your prices?',
    a: 'All displayed prices are exclusive of VAT. If you\'re a Czech VAT-registered entity, standard Czech VAT (21%) will be applied to invoices. EU business clients with a valid VAT ID benefit from reverse-charge rules.',
  },
  {
    q: 'What\'s included in the AI chatbot for the Growth plan?',
    a: 'The Growth plan includes a custom GPT-4 powered chatbot trained on your website content, integrated into your site, with basic lead qualification flows. Full AI automation systems (CRM integration, complex pipelines) are priced separately.',
  },
]

function CompareValue({ value, featured }: { value: CompareCell; featured?: boolean }) {
  if (value === true) {
    return (
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <Check size={18} color={featured ? '#3d74ff' : '#8892b0'} />
      </span>
    )
  }
  if (value === false) {
    return (
      <span style={{ display: 'flex', justifyContent: 'center', color: '#4a5568' }}>
        <Minus size={16} />
      </span>
    )
  }
  return (
    <span style={{ fontSize: 13, color: featured ? '#f0f4ff' : '#c8d3f0', fontWeight: featured ? 600 : 400 }}>
      {value}
    </span>
  )
}

export default function PricingPage() {
  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '140px 24px 80px',
        textAlign: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,71,255,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>Pricing</span>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800,
            lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.03em',
          }}>
            Transparent Pricing,<br />
            <span className="gradient-text">No Surprises</span>
          </h1>
          <p style={{
            fontSize: 18, color: '#8892b0', lineHeight: 1.75,
            maxWidth: 520, margin: '0 auto',
          }}>
            Every plan includes full source code, 30-day support, and a satisfaction guarantee.
            Fixed prices — no hidden fees.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="pricing-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {tiers.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: plan.featured
                  ? 'linear-gradient(135deg, rgba(0,71,255,0.15), rgba(61,116,255,0.06))'
                  : 'rgba(255,255,255,0.03)',
                border: plan.featured ? '1px solid rgba(0,71,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden',
                boxShadow: plan.featured ? '0 0 60px rgba(0,71,255,0.15)' : 'none',
                transition: 'all 0.3s',
                transform: plan.featured ? 'scale(1.03)' : 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = plan.featured ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = plan.featured ? 'scale(1.03)' : 'none'
              }}
            >
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  background: '#0047FF', color: '#fff',
                  fontSize: 10, fontWeight: 800, padding: '4px 12px',
                  borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  BEST VALUE
                </div>
              )}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: plan.featured
                  ? 'linear-gradient(90deg, transparent, #0047FF, transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              }} />

              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', marginBottom: 8 }}>{plan.name}</h2>
              <div style={{ marginBottom: 16 }}>
                {plan.price === 'Custom' ? (
                  <span style={{ fontSize: 36, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>Custom</span>
                ) : (
                  <>
                    <span style={{ fontSize: 40, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>{plan.price}</span>
                    <span style={{ fontSize: 16, color: '#8892b0', marginLeft: 6 }}>{plan.currency}</span>
                  </>
                )}
              </div>
              <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>{plan.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#c8d3f0', fontSize: 14 }}>
                    <Check size={14} color={plan.featured ? '#3d74ff' : '#8892b0'} />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                style={{
                  display: 'block', textAlign: 'center', textDecoration: 'none',
                  padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                  background: plan.featured ? '#0047FF' : 'transparent',
                  color: plan.featured ? '#fff' : '#f0f4ff',
                  border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: plan.featured ? '0 8px 30px rgba(0,71,255,0.4)' : 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.opacity = '0.85'
                  el.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.opacity = '1'
                  el.style.transform = 'none'
                }}
              >
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 40,
          flexWrap: 'wrap', marginTop: 56,
        }}>
          {[
            { icon: <Lock size={14} />, text: 'Fixed pricing, no hidden fees' },
            { icon: <Clock size={14} />, text: 'On-time delivery guaranteed' },
            { icon: <Infinity size={14} />, text: 'Unlimited revisions within scope' },
            { icon: <CreditCard size={14} />, text: '50/50 payment plans available' },
          ].map((badge) => (
            <div key={badge.text} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: '#8892b0', fontSize: 14,
            }}>
              <span style={{ display: 'flex' }}>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.01)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>Compare Plans</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.03em' }}>
              Full Feature <span className="gradient-text">Comparison</span>
            </h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              See exactly what&apos;s included in each tier — no guesswork.
            </p>
          </div>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{
              width: '100%', minWidth: 640, borderCollapse: 'collapse',
              fontSize: 14,
            }}>
              <thead>
                <tr>
                  <th style={{
                    textAlign: 'left', padding: '16px 20px',
                    color: '#8892b0', fontWeight: 600, fontSize: 13,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      style={{
                        textAlign: 'center', padding: '16px 20px',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        background: tier.featured ? 'rgba(0,71,255,0.08)' : 'transparent',
                        borderRadius: tier.featured ? '12px 12px 0 0' : 0,
                      }}
                    >
                      <div style={{ fontWeight: 800, color: '#f0f4ff', fontSize: 15 }}>{tier.name}</div>
                      <div style={{ color: tier.featured ? '#3d74ff' : '#8892b0', fontSize: 13, marginTop: 4 }}>
                        {tier.price === 'Custom' ? 'Custom' : `${tier.price} ${tier.currency}`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} style={{
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  }}>
                    <td style={{
                      padding: '14px 20px', color: '#c8d3f0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      {row.label}
                    </td>
                    <td style={{
                      padding: '14px 20px', textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <CompareValue value={row.starter} />
                    </td>
                    <td style={{
                      padding: '14px 20px', textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: 'rgba(0,71,255,0.04)',
                    }}>
                      <CompareValue value={row.growth} featured />
                    </td>
                    <td style={{
                      padding: '14px 20px', textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <CompareValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                background: '#0047FF', color: '#fff',
                padding: '14px 36px', borderRadius: 12,
                fontWeight: 700, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(0,71,255,0.4)',
              }}
            >
              Get a Custom Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>Add-ons</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, marginBottom: 14 }}>
              Supercharge Your Plan
            </h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              Add any of these services to your package and build a complete digital engine.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                icon: <TrendingUp size={24} />, title: 'SEO & Growth Retainer',
                price: '8,000 CZK/mo', color: '#0047FF', badge: 'Monthly',
                desc: 'Full technical SEO, keyword research, content strategy, and monthly link building.',
              },
              {
                icon: <Shield size={24} />, title: 'Website Maintenance',
                price: '3,000 CZK/mo', color: '#3d74ff', badge: 'Monthly',
                desc: '24/7 uptime monitoring, weekly updates, daily backups, and priority bug fixes.',
              },
              {
                icon: <Bot size={24} />, title: 'AI Chatbot Integration',
                price: 'from 15,000 CZK', color: '#0047FF', badge: 'One-time',
                desc: 'Custom GPT-4 powered chatbot trained on your content, integrated with your CRM.',
              },
              {
                icon: <Palette size={24} />, title: 'Brand Identity System',
                price: 'from 12,000 CZK', color: '#3d74ff', badge: 'One-time',
                desc: 'Complete visual identity including logo, color system, typography, and guidelines.',
              },
            ].map((addon) => (
              <div
                key={addon.title}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 22, padding: 32,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: addon.color,
                  }}>
                    {addon.icon}
                  </div>
                  <span style={{
                    background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)',
                    color: '#3d74ff', padding: '3px 10px', borderRadius: 100,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    {addon.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{addon.title}</h3>
                <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.6, marginBottom: 16 }}>{addon.desc}</p>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0047FF' }}>{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment FAQ */}
      <section style={{ padding: '100px 24px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>Payments & Billing</span>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 16, color: '#8892b0' }}>Everything you need to know about how we bill and accept payment.</p>
        </div>
        <FaqAccordion items={paymentFaqs} />
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: '100px 24px 120px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,71,255,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.03em' }}>
            Ready to Start Your{' '}
            <span className="gradient-text">Project?</span>
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', marginBottom: 40, lineHeight: 1.7 }}>
            Tell us about your goals and we&apos;ll send a detailed proposal within 24 hours.
            No commitment, no sales pressure — just a clear plan and fixed price.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                background: '#0047FF', color: '#fff', padding: '16px 40px',
                borderRadius: 12, fontWeight: 700, fontSize: 17,
                textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,71,255,0.4)',
              }}
            >
              Start Your Project →
            </Link>
            <Link
              href="/book"
              style={{
                background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 40px', borderRadius: 12, fontWeight: 600, fontSize: 17,
                textDecoration: 'none',
              }}
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
