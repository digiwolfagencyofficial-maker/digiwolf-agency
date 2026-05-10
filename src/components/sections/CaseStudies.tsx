'use client'

import { useEffect, useRef } from 'react'

export function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

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
    if (card1Ref.current) observer.observe(card1Ref.current)
    if (card2Ref.current) observer.observe(card2Ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="cases" className="section" style={{ background: '#0A0A0A' }}>
      <div className="container">
        <div className="section-header fade-in" ref={headerRef}>
          <div className="section-divider"></div>
          <span className="section-label">Client Work</span>
          <h2 className="section-title">Real Projects, Real Results</h2>
          <p className="section-sub">From international entrepreneurs entering the Czech market to tech startups launching SaaS platforms.</p>
        </div>
        <div className="cases-grid">
          {/* Case 1 */}
          <div className="case-card fade-in" ref={card1Ref}>
            <div className="case-browser">
              <div className="case-browser-bar">
                <div className="browser-dots">
                  <div className="browser-dot"></div>
                  <div className="browser-dot"></div>
                  <div className="browser-dot"></div>
                </div>
                <div className="browser-url" style={{ fontSize: '11px', color: 'var(--muted)', flex: 1, padding: '3px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginLeft: '8px' }}>mongolbiz.cz</div>
              </div>
              <div className="case-browser-content">
                <div className="cbc-header">
                  <div className="cbc-logo-block">
                    <div className="cbc-logo-line"></div>
                    <div className="cbc-logo-sub"></div>
                  </div>
                  <div className="cbc-tag">S.R.O. ✓</div>
                </div>
                <div className="cbc-content">
                  <div className="cbc-line" style={{ width: '90%' }}></div>
                  <div className="cbc-line" style={{ width: '75%' }}></div>
                  <div className="cbc-line cbc-line-short"></div>
                </div>
                <div className="cbc-grid">
                  <div className="cbc-cell"></div>
                  <div className="cbc-cell"></div>
                  <div className="cbc-cell" style={{ background: 'rgba(0,71,255,0.08)', borderColor: 'rgba(0,71,255,0.2)' }}></div>
                  <div className="cbc-cell"></div>
                </div>
              </div>
            </div>
            <div className="case-info">
              <span className="case-tag">🇲🇳 Company Formation + Website</span>
              <div className="case-title">MongolBiz.cz</div>
              <p className="case-desc">Mongolian entrepreneur expanding into Central Europe. We handled the full Czech S.R.O. registration, built a bilingual Czech/English corporate website, and set up email infrastructure — all within 3 weeks.</p>
              <div className="case-pills">
                <span className="case-pill">S.R.O. Formation</span>
                <span className="case-pill">Bilingual Site</span>
                <span className="case-pill">3 weeks</span>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="case-card fade-in fade-in-delay-2" ref={card2Ref}>
            <div className="case-browser">
              <div className="case-browser-bar">
                <div className="browser-dots">
                  <div className="browser-dot"></div>
                  <div className="browser-dot"></div>
                  <div className="browser-dot"></div>
                </div>
                <div className="browser-url" style={{ fontSize: '11px', color: 'var(--muted)', flex: 1, padding: '3px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginLeft: '8px' }}>techstart.cz/app</div>
              </div>
              <div className="case-browser-content">
                <div className="cbc-header">
                  <div className="cbc-logo-block">
                    <div className="cbc-logo-line" style={{ background: 'var(--accent-light)' }}></div>
                    <div className="cbc-logo-sub"></div>
                  </div>
                  <div className="cbc-tag" style={{ color: '#28C840', background: 'rgba(40,200,64,0.1)', borderColor: 'rgba(40,200,64,0.25)' }}>Live 🟢</div>
                </div>
                <div className="cbc-content">
                  <div className="cbc-line" style={{ width: '85%' }}></div>
                  <div className="cbc-line" style={{ width: '65%' }}></div>
                </div>
                <div className="cbc-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="cbc-cell" style={{ height: '44px', background: 'rgba(0,71,255,0.1)', borderColor: 'rgba(0,71,255,0.2)' }}></div>
                  <div className="cbc-cell" style={{ height: '44px' }}></div>
                  <div className="cbc-cell" style={{ height: '44px' }}></div>
                </div>
              </div>
            </div>
            <div className="case-info">
              <span className="case-tag">🇨🇿 Full-Stack Web App</span>
              <div className="case-title">TechStart Prague</div>
              <p className="case-desc">Early-stage Czech SaaS startup needed a full-stack platform with user auth, subscription billing, real-time dashboard, and a REST API. Delivered MVP in 6 weeks with Next.js, Supabase, and Stripe integration.</p>
              <div className="case-pills">
                <span className="case-pill">Next.js</span>
                <span className="case-pill">Supabase</span>
                <span className="case-pill">Stripe</span>
                <span className="case-pill">6 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
