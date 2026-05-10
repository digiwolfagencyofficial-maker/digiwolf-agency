'use client'

import { useEffect, useRef } from 'react'

const steps = [
  { num: '1', label: 'Book a Call', desc: 'Free 30-min strategy session via Calendly' },
  { num: '2', label: 'Brief & Scope', desc: 'We gather your goals, brand, and requirements' },
  { num: '3', label: 'AI Builds', desc: 'Hermes AI accelerates design and development' },
  { num: '4', label: 'You Review', desc: 'Preview, feedback rounds, and refinements' },
  { num: '5', label: 'Go Live 🚀', desc: 'Deployment, handover, and ongoing support' },
]

export function Process() {
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

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
    if (stepsRef.current) observer.observe(stepsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how" className="section">
      <div className="container">
        <div className="section-header fade-in" ref={headerRef}>
          <div className="section-divider"></div>
          <span className="section-label">Our Process</span>
          <h2 className="section-title">From Brief to Live in 5 Steps</h2>
          <p className="section-sub">We&apos;ve designed our process to be fast, transparent, and stress-free — so you always know what&apos;s happening.</p>
        </div>
        <div className="steps-wrap fade-in fade-in-delay-1" ref={stepsRef}>
          {steps.map((step, i) => (
            <>
              <div className="step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div>
                  <div className="step-label">{step.label}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="step-connector" key={`conn-${i}`}></div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
