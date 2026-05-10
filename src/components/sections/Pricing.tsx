'use client'

import { useEffect, useRef } from 'react'

const plans = [
  {
    tier: 'Starter',
    price: '15,000',
    currency: 'CZK',
    desc: 'Perfect for solo founders and small businesses who need a professional online presence fast.',
    features: [
      'Up to 5-page custom website',
      'Mobile-responsive design',
      'Basic on-page SEO setup',
      'Contact form & Google Maps',
      '3 months free minor edits',
    ],
    btnText: 'Get Started →',
    btnClass: 'pricing-btn-ghost',
    featured: false,
    delay: '',
  },
  {
    tier: 'Growth',
    price: '35,000',
    currency: 'CZK',
    desc: 'For growing businesses that need a powerful site or web app with more pages and integrations.',
    features: [
      'Everything in Starter',
      'Up to 15 pages or custom web app MVP',
      'CMS integration (headless or WordPress)',
      'Analytics & conversion tracking',
      'AI chatbot or lead capture automation',
      'Priority support & 6-month maintenance',
    ],
    btnText: 'Book Your Call →',
    btnClass: 'pricing-btn-primary',
    featured: true,
    delay: 'fade-in-delay-1',
    badge: '⭐ Most Popular',
  },
  {
    tier: 'Studio',
    price: 'Custom',
    currency: null,
    desc: 'For complex projects, mobile apps, full S.R.O. packages, or ongoing retainer partnerships.',
    features: [
      'Full-stack web or mobile app',
      'Czech S.R.O. formation bundle',
      'Dedicated project manager',
      'AI automation & custom integrations',
      'Ongoing maintenance retainer',
      'White-glove strategy sessions',
    ],
    btnText: 'Talk to Us →',
    btnClass: 'pricing-btn-ghost',
    featured: false,
    delay: 'fade-in-delay-2',
    customPrice: true,
  },
]

export function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    cardRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" className="section" style={{ background: '#0A0A0A' }}>
      <div className="container">
        <div className="section-header fade-in" ref={headerRef}>
          <div className="section-divider"></div>
          <span className="section-label">Transparent Pricing</span>
          <h2 className="section-title">Simple, Honest Pricing</h2>
          <p className="section-sub">No hidden fees. No surprises. Choose a package that fits your goals and budget — or let&apos;s build something custom.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className={`pricing-card fade-in ${plan.delay}${plan.featured ? ' featured' : ''}`}
              ref={el => { cardRefs.current[i] = el }}
            >
              {plan.badge && <div className="popular-badge">{plan.badge}</div>}
              <div className="pricing-tier">{plan.tier}</div>
              <div className="pricing-price" style={plan.customPrice ? { fontSize: '28px' } : {}}>
                {plan.price}
                {plan.currency && <sub> {plan.currency}</sub>}
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <div className="pricing-features">
                {plan.features.map(f => (
                  <div key={f} className="pricing-feature">{f}</div>
                ))}
              </div>
              <a
                href="https://calendly.com/digiwolf-agency-consultation/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-btn ${plan.btnClass}`}
              >
                {plan.btnText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
