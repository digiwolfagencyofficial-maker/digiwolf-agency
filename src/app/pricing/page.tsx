'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    priceOnce: '15,000 CZK',
    priceMonthly: '3,500 CZK/mo',
    priceNote: 'One-time project fee',
    priceMonthlyNote: 'Billed monthly, 6-month minimum',
    tagline: 'For new businesses and solo founders',
    color: '#8892b0',
    featured: false,
    features: {
      'Website Pages': '5 pages',
      'Design Revisions': '2 rounds',
      'CMS Integration': 'Basic',
      'SEO Setup': '✓ Included',
      'Mobile Responsive': '✓ Included',
      'Analytics Setup': '✓ Google Analytics',
      'Performance Score': '90+ Lighthouse',
      'Delivery Time': '5–7 days',
      'Support Period': '14 days',
      'Custom Animations': '–',
      'Blog / News Section': '–',
      'Multi-language': '–',
      'Priority Support': '–',
      'Dedicated Manager': '–',
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    priceOnce: '45,000 CZK',
    priceMonthly: '9,500 CZK/mo',
    priceNote: 'Complete digital presence',
    priceMonthlyNote: 'Billed monthly, 3-month minimum',
    tagline: 'For scaling teams and serious brands',
    color: '#0047FF',
    featured: true,
    features: {
      'Website Pages': 'Up to 15 pages',
      'Design Revisions': 'Unlimited',
      'CMS Integration': 'Full (Sanity / Contentful)',
      'SEO Setup': '✓ Advanced + Schema',
      'Mobile Responsive': '✓ Included',
      'Analytics Setup': '✓ GA4 + Hotjar + GTM',
      'Performance Score': '100 Lighthouse',
      'Delivery Time': '7–10 days',
      'Support Period': '30 days',
      'Custom Animations': '✓ Included',
      'Blog / News Section': '✓ Included',
      'Multi-language': '2 languages',
      'Priority Support': '< 4hr response',
      'Dedicated Manager': '–',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceOnce: 'Custom',
    priceMonthly: 'Custom',
    priceNote: 'Tailored to your exact scope',
    priceMonthlyNote: 'Flexible billing options',
    tagline: 'For established businesses with complex needs',
    color: '#00C9A7',
    featured: false,
    features: {
      'Website Pages': 'Unlimited',
      'Design Revisions': 'Unlimited',
      'CMS Integration': 'Custom headless CMS',
      'SEO Setup': '✓ Enterprise SEO strategy',
      'Mobile Responsive': '✓ Included',
      'Analytics Setup': '✓ Full custom dashboard',
      'Performance Score': '100 Lighthouse',
      'Delivery Time': 'Agreed in contract',
      'Support Period': '90 days + ongoing option',
      'Custom Animations': '✓ Advanced interactions',
      'Blog / News Section': '✓ Full editorial suite',
      'Multi-language': 'Unlimited languages',
      'Priority Support': '< 1hr response SLA',
      'Dedicated Manager': '✓ Dedicated account manager',
    },
  },
];

const addons = [
  {
    icon: '📈',
    title: 'SEO & Growth Retainer',
    price: '8,000 CZK/mo',
    priceMonthly: '8,000 CZK/mo',
    desc: 'Full technical SEO, keyword research, content strategy, and monthly link building targeting Czech, Slovak, and English-language markets.',
    includes: ['Monthly keyword audit', 'On-page optimization', 'Content briefs (4/mo)', 'GSC management', 'Monthly report'],
    color: '#FF6B35',
    badge: 'Monthly',
  },
  {
    icon: '🛡️',
    title: 'Maintenance & Support',
    price: '3,000 CZK/mo',
    priceMonthly: '3,000 CZK/mo',
    desc: '24/7 uptime monitoring, weekly updates, daily backups, and priority bug fixes. Keep your site secure, fast, and always online.',
    includes: ['24/7 uptime monitoring', 'Weekly CMS updates', 'Daily backups', 'Security scanning', 'Priority bug fixes'],
    color: '#FFB300',
    badge: 'Monthly',
  },
  {
    icon: '🤖',
    title: 'AI Chatbot Integration',
    price: '15,000 CZK',
    priceMonthly: '15,000 CZK',
    desc: 'Custom GPT-4 powered chatbot for your website — trained on your content, integrated with your CRM, and live 24/7 to qualify and convert leads.',
    includes: ['Custom GPT-4 chatbot', 'Website integration', 'CRM connection', 'Lead qualification flows', '30-day optimization'],
    color: '#00C9A7',
    badge: 'One-time',
  },
  {
    icon: '🎨',
    title: 'Brand Identity System',
    price: '18,000 CZK',
    priceMonthly: '18,000 CZK',
    desc: 'Complete visual identity including logo suite, color system, typography, brand guidelines, and social media kit. Everything you need to look elite.',
    includes: ['Primary + secondary logos', 'Color palette system', 'Typography hierarchy', 'Brand guidelines PDF', 'Social media kit (10+)'],
    color: '#E040FB',
    badge: 'One-time',
  },
];

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
    q: 'What happens if I need more revisions than my plan includes?',
    a: 'On Starter plans, additional revision rounds are available at 2,500 CZK per round. Growth and Enterprise plans include unlimited revisions within scope. We define scope clearly in your proposal to avoid any ambiguity.',
  },
  {
    q: 'How does the 14-day money-back guarantee work?',
    a: 'If you\'re not satisfied with the initial design concepts after the first review round, you can request a full refund within 14 days of project start. This applies to new website projects only — not retainer or SRO services.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Absolutely. Many clients start on Starter and upgrade as their business grows. We apply a credit for work already done against your upgrade cost, so you never pay twice for the same work.',
  },
  {
    q: 'Do retainer contracts auto-renew?',
    a: 'Yes, monthly retainers auto-renew unless cancelled with 30 days\' written notice. Growth retainers have a 3-month minimum; SEO retainers have a 6-month minimum to allow sufficient time to demonstrate results.',
  },
  {
    q: 'Is VAT included in your prices?',
    a: 'All displayed prices are exclusive of VAT. If you\'re a Czech VAT-registered entity, standard Czech VAT (21%) will be applied to invoices. EU business clients with a valid VAT ID benefit from reverse-charge rules.',
  },
];

const featureKeys = [
  'Website Pages',
  'Design Revisions',
  'CMS Integration',
  'SEO Setup',
  'Mobile Responsive',
  'Analytics Setup',
  'Performance Score',
  'Delivery Time',
  'Support Period',
  'Custom Animations',
  'Blog / News Section',
  'Multi-language',
  'Priority Support',
  'Dedicated Manager',
];

export default function PricingPage() {
  const [isMonthly, setIsMonthly] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [hoveredAddon, setHoveredAddon] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCta, setHoveredCta] = useState(false);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '140px 24px 80px',
        textAlign: 'center', overflow: 'hidden',
      }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,71,255,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
          <div className="badge fade-up" style={{
            display: 'inline-block', marginBottom: 24,
            background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.35)',
            color: '#6b9fff', padding: '8px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Transparent Pricing
          </div>
          <h1 className="fade-up" style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: 24,
          }}>
            Simple Pricing.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0047FF 0%, #00C9A7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Zero Surprises.
            </span>
          </h1>
          <p className="fade-up" style={{
            fontSize: 20, color: '#8892b0', lineHeight: 1.75,
            maxWidth: 600, margin: '0 auto 40px',
          }}>
            Every price is fixed, every deliverable is defined. Choose your plan, know exactly what you get,
            and let us build something exceptional together.
          </p>

          {/* Toggle */}
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 16,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '6px 6px 6px 20px',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: !isMonthly ? '#f0f4ff' : '#8892b0', transition: 'color 0.2s' }}>
              One-Time
            </span>
            <button
              onClick={() => setIsMonthly(!isMonthly)}
              style={{
                width: 52, height: 28, borderRadius: 100,
                background: isMonthly ? '#0047FF' : 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'background 0.25s',
              }}
            >
              <span style={{
                position: 'absolute', top: 4,
                left: isMonthly ? 26 : 4,
                width: 20, height: 20, borderRadius: '50%',
                background: '#fff', transition: 'left 0.25s',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }} />
            </button>
            <span style={{
              fontSize: 14, fontWeight: 600, color: isMonthly ? '#f0f4ff' : '#8892b0',
              transition: 'color 0.2s', paddingRight: 14,
            }}>
              Monthly
              <span style={{
                marginLeft: 8, background: '#0047FF20', border: '1px solid #0047FF40',
                color: '#6b9fff', padding: '2px 8px', borderRadius: 100, fontSize: 11, fontWeight: 700,
              }}>
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '60px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24, alignItems: 'start',
        }}>
          {tiers.map((tier) => {
            const isHov = hoveredTier === tier.id;
            const price = isMonthly ? tier.priceMonthly : tier.priceOnce;
            const note = isMonthly ? tier.priceMonthlyNote : tier.priceNote;
            return (
              <div
                key={tier.id}
                className="glass"
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                style={{
                  background: tier.featured
                    ? 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.04) 100%)'
                    : isHov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                  border: tier.featured
                    ? '1.5px solid rgba(0,71,255,0.5)'
                    : `1px solid ${isHov ? tier.color + '35' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 28, padding: 40,
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: tier.featured ? 'scale(1.03)' : isHov ? 'translateY(-4px)' : 'none',
                  boxShadow: tier.featured
                    ? '0 0 60px rgba(0,71,255,0.2), 0 24px 60px rgba(0,0,0,0.4)'
                    : isHov ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
                  cursor: 'default',
                }}
              >
                {tier.featured && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #0047FF, #00C9A7)',
                    borderRadius: '28px 28px 0 0',
                  }} />
                )}
                {tier.featured && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: '#0047FF', color: '#fff',
                    padding: '4px 14px', borderRadius: 100,
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                    boxShadow: '0 4px 20px rgba(0,71,255,0.4)',
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
                    {price}
                  </div>
                  <div style={{ fontSize: 13, color: '#8892b0', marginTop: 8 }}>{note}</div>
                </div>

                <a href="/contact" style={{
                  display: 'block', textAlign: 'center',
                  background: tier.featured ? '#0047FF' : 'rgba(255,255,255,0.06)',
                  color: '#fff', padding: '13px 24px', borderRadius: 12,
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  border: tier.featured ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  marginBottom: 28,
                  boxShadow: tier.featured ? '0 8px 30px rgba(0,71,255,0.4)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {tier.id === 'enterprise' ? 'Contact Us' : 'Get Started →'}
                </a>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {featureKeys.map((key) => {
                    const val = tier.features[key as keyof typeof tier.features];
                    const isCheck = val === '✓ Included' || val?.startsWith('✓');
                    const isMissing = val === '–';
                    return (
                      <div key={key} style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: 12,
                        paddingBottom: 10,
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}>
                        <span style={{ fontSize: 13, color: '#8892b0' }}>{key}</span>
                        <span style={{
                          fontSize: 13, fontWeight: 600, textAlign: 'right',
                          color: isMissing ? '#4a5568' : isCheck ? '#00C9A7' : '#f0f4ff',
                        }}>
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Comparison Table */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
            Full Feature Comparison
          </h2>
          <p style={{ fontSize: 16, color: '#8892b0' }}>Every detail, side by side.</p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
            background: 'rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '20px 28px', gap: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Feature
            </div>
            {tiers.map((t) => (
              <div key={t.id} style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: t.color }}>
                {t.name}
              </div>
            ))}
          </div>
          {/* Rows */}
          {featureKeys.map((key, idx) => (
            <div
              key={key}
              style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '16px 28px', gap: 16,
                background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div style={{ fontSize: 14, color: '#c0c8d8' }}>{key}</div>
              {tiers.map((t) => {
                const val = t.features[key as keyof typeof t.features];
                const isMissing = val === '–';
                const isCheckmark = val?.startsWith('✓');
                return (
                  <div key={t.id} style={{
                    textAlign: 'center', fontSize: 13, fontWeight: 600,
                    color: isMissing ? '#3a4560' : isCheckmark ? '#00C9A7' : t.featured ? '#f0f4ff' : '#a0aec0',
                  }}>
                    {val}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="badge" style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)',
              color: '#6b9fff', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Supercharge Your Plan
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, marginBottom: 14 }}>
              Power-Up Add-Ons
            </h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              Add any of these services to your plan and build a complete digital engine for your business.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {addons.map((addon, i) => {
              const isHov = hoveredAddon === i;
              return (
                <div
                  key={addon.title}
                  className="glass"
                  onMouseEnter={() => setHoveredAddon(i)}
                  onMouseLeave={() => setHoveredAddon(null)}
                  style={{
                    background: isHov ? `${addon.color}08` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? addon.color + '35' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 22, padding: 32,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    transform: isHov ? 'translateY(-4px)' : 'none',
                    boxShadow: isHov ? `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${addon.color}15` : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: `${addon.color}18`, border: `1px solid ${addon.color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24,
                    }}>
                      {addon.icon}
                    </div>
                    <span style={{
                      background: `${addon.color}18`, border: `1px solid ${addon.color}35`,
                      color: addon.color, padding: '4px 12px', borderRadius: 100,
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {addon.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{addon.title}</h3>
                  <div style={{ fontSize: 22, fontWeight: 900, color: addon.color, marginBottom: 12 }}>
                    {isMonthly && addon.badge === 'Monthly' ? addon.priceMonthly : addon.price}
                  </div>
                  <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.7, marginBottom: 20 }}>{addon.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {addon.includes.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#c0c8d8' }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: '50%',
                          background: `${addon.color}20`, border: `1px solid ${addon.color}40`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, fontSize: 9, color: addon.color,
                        }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,201,167,0.08) 0%, rgba(0,71,255,0.08) 100%)',
          border: '1px solid rgba(0,201,167,0.25)',
          borderRadius: 28, padding: '60px 48px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(0,201,167,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          <div style={{ fontSize: 56, marginBottom: 20 }}>🛡️</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 900, marginBottom: 16 }}>
            14-Day Money-Back Guarantee
          </h2>
          <p style={{ fontSize: 17, color: '#8892b0', lineHeight: 1.8, maxWidth: 580, margin: '0 auto 32px' }}>
            Not happy with the initial design concepts after your first review? Request a full refund within 14 days of project start — no questions asked, no awkward conversations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { icon: '✓', text: 'No questions asked' },
              { icon: '✓', text: 'Full refund, not credit' },
              { icon: '✓', text: 'Applies to all new projects' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#00C9A7', fontWeight: 600 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,201,167,0.2)', border: '1px solid rgba(0,201,167,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, flexShrink: 0,
                }}>✓</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        padding: '80px 24px 100px',
        maxWidth: 760, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="badge" style={{
            display: 'inline-block', marginBottom: 20,
            background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)',
            color: '#6b9fff', padding: '7px 18px', borderRadius: 100,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Pricing FAQ
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 16, color: '#8892b0' }}>
            Everything you need to know about how we work and how we charge.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="glass"
                style={{
                  background: isOpen ? 'rgba(0,71,255,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isOpen ? 'rgba(0,71,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 16, overflow: 'hidden',
                  transition: 'all 0.3s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: '100%', padding: '20px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#f0f4ff', fontSize: 16, fontWeight: 600, textAlign: 'left', gap: 16,
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: isOpen ? '#0047FF' : 'rgba(255,255,255,0.08)',
                    border: `1px solid ${isOpen ? '#0047FF' : 'rgba(255,255,255,0.12)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0, transition: 'all 0.25s',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                  }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px',
                    fontSize: 15, color: '#8892b0', lineHeight: 1.8,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: '100px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,71,255,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, marginBottom: 20 }}>
            Not Sure Which Plan?{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0047FF 0%, #00C9A7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Let's Talk.
            </span>
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', lineHeight: 1.7, marginBottom: 40 }}>
            Book a free 30-minute strategy call. We'll understand your goals, recommend the right plan,
            and give you a detailed proposal within 24 hours. No commitment required.
          </p>
          <a
            href="/contact"
            onMouseEnter={() => setHoveredCta(true)}
            onMouseLeave={() => setHoveredCta(false)}
            style={{
              display: 'inline-block',
              background: hoveredCta ? '#0038cc' : '#0047FF',
              color: '#fff', padding: '18px 48px', borderRadius: 14,
              fontWeight: 800, fontSize: 18, textDecoration: 'none',
              boxShadow: hoveredCta ? '0 0 50px rgba(0,71,255,0.6)' : '0 0 30px rgba(0,71,255,0.35)',
              transform: hoveredCta ? 'translateY(-2px) scale(1.02)' : 'none',
              transition: 'all 0.25s',
            }}
          >
            Book Free Strategy Call →
          </a>
          <div style={{
            marginTop: 32, display: 'flex', justifyContent: 'center',
            gap: 32, flexWrap: 'wrap',
          }}>
            {[
              { text: '✓ Free 30-min call' },
              { text: '✓ Proposal in 24h' },
              { text: '✓ No commitment' },
              { text: '✓ Fixed pricing guaranteed' },
            ].map((item) => (
              <span key={item.text} style={{ fontSize: 14, color: '#8892b0' }}>{item.text}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
