'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

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
    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)
    return () => observer.disconnect()
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-inner">
          {/* Left */}
          <div className="hero-left fade-in" ref={leftRef}>
            <div className="hero-badge">Prague-Based Digital Agency</div>
            <h1 className="hero-title">
              From Idea to<br />
              <span className="accent">Digital Reality</span>
            </h1>
            <p className="hero-sub">
              We build modern websites, full-stack web apps, and mobile apps — powered by AI.{' '}
              Plus Czech S.R.O. company formation and intelligent automation for businesses worldwide.
            </p>
            <div className="hero-ctas">
              <a
                href="https://calendly.com/digiwolf-agency-consultation/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book Free Consultation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#services"
                className="btn-ghost"
                onClick={e => handleAnchorClick(e, '#services')}
              >
                View Services
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">12+</span>
                <span className="hero-stat-label">Happy Clients</span>
              </div>
              <div className="hero-stat-sep"></div>
              <div className="hero-stat">
                <span className="hero-stat-num">5</span>
                <span className="hero-stat-label">Countries Served</span>
              </div>
              <div className="hero-stat-sep"></div>
              <div className="hero-stat">
                <span className="hero-stat-num">AI</span>
                <span className="hero-stat-label">Powered Builds</span>
              </div>
            </div>
          </div>

          {/* Right: Browser Mockup */}
          <div className="hero-right fade-in fade-in-delay-2" ref={rightRef}>
            <div className="browser-wrap">
              <div className="browser-glow"></div>
              {/* Floating badges */}
              <div className="float-badge float-badge-1">
                <div className="dot" style={{ background: '#28C840', boxShadow: '0 0 8px #28C840' }}></div>
                Deployed ✓
              </div>
              <div className="float-badge float-badge-2">
                <div className="dot" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}></div>
                AI Generated
              </div>
              <div className="float-badge float-badge-3">
                <div className="dot" style={{ background: '#FEBC2E', boxShadow: '0 0 8px #FEBC2E' }}></div>
                3 days delivery
              </div>
              {/* Browser window */}
              <div className="browser">
                <div className="browser-bar">
                  <div className="browser-dots">
                    <div className="browser-dot"></div>
                    <div className="browser-dot"></div>
                    <div className="browser-dot"></div>
                  </div>
                  <div className="browser-url">digiwolf.agency</div>
                </div>
                <div className="browser-content">
                  <div className="bc-nav">
                    <div className="bc-logo"></div>
                    <div className="bc-nav-links">
                      <div className="bc-link"></div>
                      <div className="bc-link"></div>
                      <div className="bc-link"></div>
                    </div>
                    <div className="bc-btn"></div>
                  </div>
                  <div className="bc-hero-section">
                    <div className="bc-hero-title"></div>
                    <div className="bc-hero-title-2"></div>
                    <div className="bc-hero-sub"></div>
                    <div className="bc-hero-sub-2"></div>
                    <div className="bc-ctas">
                      <div className="bc-cta-1"></div>
                      <div className="bc-cta-2"></div>
                    </div>
                  </div>
                  <div className="bc-cards">
                    <div className="bc-card">
                      <div className="bc-card-icon"></div>
                      <div className="bc-card-line"></div>
                      <div className="bc-card-line-2"></div>
                    </div>
                    <div className="bc-card">
                      <div className="bc-card-icon"></div>
                      <div className="bc-card-line"></div>
                      <div className="bc-card-line-2"></div>
                    </div>
                    <div className="bc-card">
                      <div className="bc-card-icon"></div>
                      <div className="bc-card-line"></div>
                      <div className="bc-card-line-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
