'use client'

import { useEffect, useRef, useState } from 'react'

const faqs = [
  {
    q: 'How fast can you deliver a website?',
    a: 'For a standard agency website (up to 5 pages), we typically deliver a live site within 3–7 business days after the brief is finalised. Larger projects like web apps or custom platforms take 2–6 weeks depending on scope. Our AI-assisted workflow significantly reduces build time compared to traditional agencies — without compromising on quality.',
  },
  {
    q: 'Do I need to speak Czech for the S.R.O. formation?',
    a: 'Not at all. We handle the entire Czech S.R.O. formation process in English on your behalf. This includes preparing all legal documents, liaising with the Czech Business Register (Obchodní rejstřík), guiding you through notarisation, and providing translated copies of all key documents. Many of our S.R.O. clients are international entrepreneurs with no Czech language skills whatsoever.',
  },
  {
    q: 'What is included in a maintenance plan?',
    a: 'Our maintenance plans (from 3,000 CZK/month) include: monthly plugin and CMS updates, daily automated backups, uptime and performance monitoring, minor content edits (up to 1 hour per month), SSL certificate management, and access to our priority support queue. For web apps, plans are tailored to include server management and dependency updates.',
  },
  {
    q: 'Do you work with international clients outside the Czech Republic?',
    a: "Yes — we work with clients across Europe, Asia, and beyond. We've served clients from Mongolia, Germany, the UK, Slovakia, and Hungary. All communication is in English and all project management, calls, and documentation are handled remotely. Payments can be made via international bank transfer or card. Being Prague-based simply means competitive European pricing with exceptional quality.",
  },
  {
    q: 'Can I update my website myself after launch?',
    a: 'Absolutely. We build sites with easy-to-use CMS systems (such as Sanity, Contentful, or WordPress) so you can update text, images, blog posts, and more without touching any code. We provide a short handover session and documentation so you feel confident managing your site. If you prefer, our maintenance plan means we handle all changes for you.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

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
    if (listRef.current) observer.observe(listRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <section id="faq" className="section" style={{ background: 'linear-gradient(180deg,#0A0A0A 0%,#0C0C14 100%)' }}>
      <div className="container">
        <div className="section-header fade-in" ref={headerRef}>
          <div className="section-divider"></div>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-sub">Everything you need to know before getting started. Still have questions? Just book a call.</p>
        </div>
        <div className="faq-list fade-in fade-in-delay-1" ref={listRef}>
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
              <div
                className="faq-question"
                onClick={() => toggle(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') toggle(i) }}
              >
                {faq.q}
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
