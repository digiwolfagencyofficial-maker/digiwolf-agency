'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '🌐',
    title: 'Agency Websites',
    desc: 'Pixel-perfect, fast, and conversion-focused marketing sites built with modern tech. Custom design, CMS, SEO-ready — launched in days, not months.',
    price: 'from 15,000 CZK',
    delay: '',
  },
  {
    icon: '⚡',
    title: 'Full-Stack Web Apps',
    desc: 'Custom web applications with real-time features, user auth, dashboards, and APIs. We architect and build scalable platforms from scratch.',
    price: 'from 40,000 CZK',
    delay: 'fade-in-delay-1',
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS & Android apps with native performance. From MVP prototypes to production-ready apps with App Store deployment.',
    price: 'from 80,000 CZK',
    delay: 'fade-in-delay-2',
  },
  {
    icon: '🏢',
    title: 'Czech S.R.O. Formation',
    desc: 'We set up your Czech S.R.O. company from end to end — registration, legal documents, bank account guidance, and a business website. All in English.',
    price: 'from 25,000 CZK',
    delay: 'fade-in-delay-1',
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    desc: 'Eliminate repetitive work with intelligent workflows. AI-powered chatbots, lead capture automations, CRM integrations, and custom AI agents built for your business.',
    price: 'from 20,000 CZK',
    delay: 'fade-in-delay-2',
  },
  {
    icon: '🛡️',
    title: 'Maintenance Plans',
    desc: 'Keep your site secure, fast, and up to date. Monthly updates, uptime monitoring, backups, speed optimisation, and priority support included.',
    price: 'from 3,000 CZK/mo',
    delay: 'fade-in-delay-3',
  },
]

export function Services() {
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
    <section id="services" className="section">
      <div className="container">
        <div className="section-header fade-in" ref={headerRef}>
          <div className="section-divider"></div>
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Everything Your Business Needs Online</h2>
          <p className="section-sub">From a stunning marketing site to a full company launch — we handle the digital and legal heavy lifting so you can focus on growing.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card fade-in ${s.delay}`}
              ref={el => { cardRefs.current[i] = el }}
            >
              <span className="service-icon">{s.icon}</span>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-price">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
