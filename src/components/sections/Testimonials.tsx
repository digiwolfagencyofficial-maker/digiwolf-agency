'use client'

import { useEffect, useRef } from 'react'

const highlights = [
  {
    quote: 'You work directly with the founder — every project, every call, every line of code. No account managers, no hand-offs between departments.',
    initials: 'FL',
    name: 'Founder-Led',
    role: 'On every project',
    delay: '',
  },
  {
    quote: 'Full source code is yours on delivery. Fixed pricing agreed before we start — no hourly billing surprises, no scope-creep fees.',
    initials: 'TP',
    name: 'Transparent by Default',
    role: 'Source code + fixed pricing',
    delay: 'fade-in-delay-1',
  },
  {
    quote: 'As a new agency, our reputation is built one project at a time. The first 10 founding clients get 50% off and our full focus to prove it.',
    initials: 'FC',
    name: 'Founding-Client Offer',
    role: 'First 10 clients — 50% off',
    delay: 'fade-in-delay-2',
  },
]

export function Testimonials() {
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
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-header fade-in" ref={headerRef}>
          <div className="section-divider"></div>
          <span className="section-label">Founding Clients</span>
          <h2 className="section-title">What You Get as a Founding Client</h2>
          <p className="section-sub">We&apos;re a new agency — this is what we&apos;re offering the first clients who take a chance on us, not invented reviews.</p>
        </div>
        <div className="testimonials-grid">
          {highlights.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card fade-in ${t.delay}`}
              ref={el => { cardRefs.current[i] = el }}
            >
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
