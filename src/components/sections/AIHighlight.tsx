'use client'

import { useEffect, useRef } from 'react'

export function AIHighlight() {
  const innerRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)

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
    if (flowRef.current) observer.observe(flowRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="ai-highlight" className="section">
      <div className="container">
        <div className="ai-inner">
          <div className="fade-in" ref={innerRef}>
            <span className="section-label">AI-Powered Workflow</span>
            <h2 className="ai-title"><span>Built by AI.</span> Reviewed by Humans.</h2>
            <p className="ai-sub">Our proprietary Hermes AI pipeline accelerates every project — without cutting corners on quality. You get the speed of automation with the precision of expert review.</p>
          </div>
          <div className="ai-flow fade-in fade-in-delay-1" ref={flowRef}>
            <div className="ai-step">
              <div className="ai-step-icon">📋</div>
              <div className="ai-step-name">Brief</div>
            </div>
            <div className="ai-arrow">→</div>
            <div className="ai-step">
              <div className="ai-step-icon">🤖</div>
              <div className="ai-step-name">Hermes AI</div>
            </div>
            <div className="ai-arrow">→</div>
            <div className="ai-step">
              <div className="ai-step-icon">✏️</div>
              <div className="ai-step-name">Draft</div>
            </div>
            <div className="ai-arrow">→</div>
            <div className="ai-step">
              <div className="ai-step-icon">👁️</div>
              <div className="ai-step-name">Review</div>
            </div>
            <div className="ai-arrow">→</div>
            <div className="ai-step">
              <div className="ai-step-icon">🚀</div>
              <div className="ai-step-name">Live</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
