'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Lock, Clock, Infinity, CreditCard, TrendingUp, Shield, Bot, Palette } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: '45,000 CZK',
    priceNote: 'One-time project fee',
    tagline: 'For new businesses and solo founders',
    color: '#8892b0',
    featured: false,
    features: [
      '5-page website',
      'Mobile-first responsive design',
      'Basic SEO setup',
      'Google Analytics integration',
      'Contact form',
      '2 rounds of design revisions',
      '90+ Lighthouse performance score',
      '5–7 business day delivery',
      '1 month post-launch support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '89,000 CZK',
    priceNote: 'Complete digital presence package',
    tagline: 'For scaling teams and serious brands',
    color: '#3b82f6',
    featured: true,
    features: [
      '10-page website',
      'E-commerce integration',
      'AI chatbot included',
      'Advanced SEO + schema markup',
      'GA4 + Hotjar + GTM setup',
      'Custom animations & interactions',
      'Multilingual support (2 languages)',
      'Unlimited design revisions',
      '100 Lighthouse performance score',
      '7–10 business day delivery',
      '3 months post-launch support',
      'Priority < 4hr response',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'Tailored to your exact scope',
    tagline: 'For established businesses with complex needs',
    color: '#10b981',
    featured: false,
    features: [
      'Full-stack custom application',
      'CRM & ERP integration',
      'AI automation systems',
      'Unlimited pages',
      'Enterprise SEO strategy',
      'Custom headless CMS',
      'Unlimited languages',
      'Advanced security & compliance',
      'Dedicated account manager',
      'SLA with < 1hr response',
      '90 days support + ongoing option',
      'Custom billing & contracts',
    ],
  },
]

const faqs = [
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
    a: 'Never. Our quotes are fully itemized and fixed. The only additional costs that could arise are third-party services you choose to add (e.g., a premium Sanity plan, specific API subscriptions) — we always disclose these upfront.',
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

export default function PricingPage() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null)

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '140px 24px 80px',
        textAlign: 'center' as const, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', marginBottom: 24,
            background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.35)',
            color: '#93c5fd', padding: '8px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          }}>
            Transparent Pricing
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: 24,
          }}>
            Simple Pricing.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Zero Surprises.
            </span>
          </h1>
          <p style={{
            fontSize: 20, color: '#8892b0', lineHeight: 1.75,
            maxWidth: 600, margin: '0 auto 40px',
          }}>
            Every price is fixed, every deliverable is defined. Choose your plan, know exactly what you get,
            and let us build something exceptional together.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '60px 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24, alignItems: 'start',
        }}>
          {tiers.map((tier) => {
            const isHov = hoveredTier === tier.id
            return (
              <div
                key={tier.id}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                style={{
                  background: tier.featured
                    ? 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)'
                    : isHov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                  border: tier.featured
                    ? '1.5px solid rgba(59,130,246,0.5)'
                    : `1px solid ${isHov ? tier.color + '35' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 28, padding: 40,
                  position: 'relative' as const, overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: tier.featured ? 'scale(1.03)' : isHov ? 'translateY(-4px)' : 'none',
                  boxShadow: tier.featured
                    ? '0 0 60px rgba(59,130,246,0.2), 0 24px 60px rgba(0,0,0,0.4)'
                    : isHov ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
                  cursor: 'default',
                }}
              >
                {tier.featured && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    borderRadius: '28px 28px 0 0',
                  }} />
                )}
                {tier.featured && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: '#3b82f6', color: '#fff',
                    padding: '4px 14px', borderRadius: 100,
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                    boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ marginBottom: 8 }}>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f0f4ff' }}>{tier.name}</h2>
                  <p style={{ fontSize: 14, color: '#8892b0', marginTop: 6, lineHeight: 1.5 }}>{tier.tagline}</p>
                </div>

                <div style={{ margin: '28px 0', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28 }}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: tier.color, lineHeight: 1 }}>
                    {tier.price}
                  </div>
                  <div style={{ fontSize: 13, color: '#8892b0', marginTop: 8 }}>{tier.priceNote}</div>
                </div>

                <Link href="/contact" style={{
                  display: 'block', textAlign: 'center' as const,
                  background: tier.featured ? '#3b82f6' : 'rgba(255,255,255,0.06)',
                  color: '#fff', padding: '13px 24px', borderRadius: 12,
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  border: tier.featured ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  marginBottom: 28,
                  boxShadow: tier.featured ? '0 8px 30px rgba(59,130,246,0.4)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {tier.id === 'enterprise' ? 'Contact Us' : 'Get Started →'}
                </Link>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
                    What&apos;s Included
                  </p>
                  {tier.features.map((feature) => (
                    <div key={feature} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      fontSize: 14, color: '#c8d0e0',
                    }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                        background: `${tier.color}20`, border: `1px solid ${tier.color}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: tier.color,
                      }}><Check size={10} /></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex', justifyContent: 'center' as const, gap: 40,
          flexWrap: 'wrap' as const, marginTop: 56,
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

      {/* Add-ons / Extra Services */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
            <div style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
              color: '#93c5fd', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>
              Additional Services
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, marginBottom: 14 }}>
              Supercharge Your Plan
            </h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              Add any of these services to your package and build a complete digital engine for your business.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                icon: <TrendingUp size={24} />, title: 'SEO & Growth Retainer',
                price: '8,000 CZK/mo', color: '#f59e0b', badge: 'Monthly',
                desc: 'Full technical SEO, keyword research, content strategy, and monthly link building.',
              },
              {
                icon: <Shield size={24} />, title: 'Website Maintenance',
                price: '3,000 CZK/mo', color: '#8b5cf6', badge: 'Monthly',
                desc: '24/7 uptime monitoring, weekly updates, daily backups, and priority bug fixes.',
              },
              {
                icon: <Bot size={24} />, title: 'AI Chatbot Integration',
                price: 'from 15,000 CZK', color: '#10b981', badge: 'One-time',
                desc: 'Custom GPT-4 powered chatbot trained on your content, integrated with your CRM.',
              },
              {
                icon: <Palette size={24} />, title: 'Brand Identity System',
                price: 'from 12,000 CZK', color: '#ec4899', badge: 'One-time',
                desc: 'Complete visual identity including logo, color system, typography, and guidelines.',
              },
            ].map((addon) => (
              <div
                key={addon.title}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 22, padding: 32,
                  cursor: 'default',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${addon.color}18`, border: `1px solid ${addon.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: addon.color,
                  }}>
                    {addon.icon}
                  </div>
                  <span style={{
                    background: `${addon.color}20`, border: `1px solid ${addon.color}40`,
                    color: addon.color, padding: '3px 10px', borderRadius: 100,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  }}>
                    {addon.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{addon.title}</h3>
                <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.6, marginBottom: 16 }}>{addon.desc}</p>
                <div style={{ fontSize: 20, fontWeight: 800, color: addon.color }}>{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '100px 24px', maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', marginBottom: 20,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
            color: '#93c5fd', padding: '7px 18px', borderRadius: 100,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          }}>
            FAQ
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 16, color: '#8892b0' }}>Everything you need to know about our pricing.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredFaq(i)}
              onMouseLeave={() => setHoveredFaq(null)}
              style={{
                background: '#0f0f0f',
                border: hoveredFaq === i || openFaq === i ? '1px solid rgba(59,130,246,0.35)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  padding: '20px 24px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', cursor: 'pointer', gap: 16, textAlign: 'left' as const,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#f0f4ff', fontFamily: 'Inter, sans-serif' }}>{faq.q}</span>
                <span style={{
                  color: '#3b82f6', fontSize: 20, fontWeight: 700, flexShrink: 0,
                  transition: 'transform 0.2s ease',
                  transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px' }}>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />
                  <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: '80px 24px 120px',
        textAlign: 'center' as const,
        background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.07) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 20 }}>
            Not Sure Which Plan to Choose?
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', marginBottom: 40, lineHeight: 1.7 }}>
            Book a free 30-minute strategy call and we&apos;ll help you figure out exactly what you need —
            no commitment, no sales pressure.
          </p>
          <Link href="/contact" style={{
            display: 'inline-block',
            background: '#3b82f6', color: '#fff', padding: '16px 40px',
            borderRadius: 12, fontWeight: 700, fontSize: 17,
            textDecoration: 'none', boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
          }}>
            Book a Free Call →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
