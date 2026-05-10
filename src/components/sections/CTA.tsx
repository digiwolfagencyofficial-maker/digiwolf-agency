'use client'

import { useEffect, useRef } from 'react'

export function CTA() {
  const innerRef = useRef<HTMLDivElement>(null)

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
    if (innerRef.current) observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="final-cta" className="section">
      <div className="container">
        <div className="cta-inner fade-in" ref={innerRef}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '20px' }}>Let&apos;s Build Something Great</span>
          <h2 className="cta-title">Start Your Project <span>Today</span></h2>
          <p className="cta-sub">Book a free 30-minute strategy call. No commitment, no pressure — just honest advice about how we can help your business grow online.</p>
          <div className="cta-actions">
            <a
              href="https://calendly.com/digiwolf-agency-consultation/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '16px', padding: '16px 32px' }}
            >
              📅 Book Free Consultation
            </a>
            <a
              href="mailto:info@digiwolf.agency"
              className="btn-ghost"
              style={{ fontSize: '16px', padding: '16px 28px' }}
            >
              ✉️ Email Us Directly
            </a>
          </div>
          <div className="cta-guarantee">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.5 5.5H13L9.5 8L10.8 12.5L7 10L3.2 12.5L4.5 8L1 5.5H5.5L7 1Z" fill="#FEBC2E"/>
            </svg>
            Free consultation · No commitment · Response within 24 hours
          </div>
        </div>
      </div>
    </section>
  )
}
