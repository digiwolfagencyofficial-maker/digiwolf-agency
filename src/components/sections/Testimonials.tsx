'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: '"Digi Wolf made setting up my Czech company completely painless. I was worried the language barrier would be a problem, but they handled everything in English and had my S.R.O. registered in under two weeks. Exceptional service."',
    initials: 'BM',
    name: 'Bat-Erdene Munkh',
    role: 'Founder, MongolBiz.cz',
    delay: '',
  },
  {
    quote: '"I gave them a rough idea and a tight deadline. They came back with a polished web app that looked and worked better than I imagined. The AI-assisted workflow is genuinely impressive — fast without sacrificing quality."',
    initials: 'JN',
    name: 'Jakub Novotný',
    role: 'CEO, TechStart Prague',
    delay: 'fade-in-delay-1',
  },
  {
    quote: '"We needed an AI automation system to handle our client onboarding. Digi Wolf built it in 10 days and it\'s saved us 15+ hours per week. The ROI was immediate. We\'re already planning the next project with them."',
    initials: 'SS',
    name: 'Sophie Schreiber',
    role: 'Operations Lead, FlowLab GmbH',
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
          <span className="section-label">Client Love</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-sub">We measure success by the results our clients achieve — and the relationships we build along the way.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card fade-in ${t.delay}`}
              ref={el => { cardRefs.current[i] = el }}
            >
              <div className="stars">★★★★★</div>
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
