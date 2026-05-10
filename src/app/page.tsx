'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const WolfSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7"/>
    <circle cx="16" cy="21.5" r="1.3" fill="#0A1050"/>
  </svg>
)

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const fadeRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }) }
    setMenuOpen(false)
  }

  const services = [
    { icon: '🌐', title: 'Agency Websites', desc: 'High-converting, SEO-optimised websites that turn visitors into clients. Built fast, built right.', price: 'from 15,000 CZK' },
    { icon: '⚖️', title: 'Czech S.R.O. Formation', desc: 'We handle your entire Czech company registration end-to-end — in English, no bureaucracy stress.', price: 'from 12,000 CZK' },
    { icon: '🤖', title: 'AI Automation', desc: 'Custom workflows that save 10+ hours per week. Lead capture, client onboarding, reporting — automated.', price: 'from 20,000 CZK' },
    { icon: '📈', title: 'SEO & Growth', desc: 'Data-driven SEO strategies that compound over time. We build traffic that lasts.', price: 'from 8,000 CZK' },
    { icon: '🎨', title: 'Brand Identity', desc: 'Logo, color system, typography, and brand guidelines that make you look world-class.', price: 'from 10,000 CZK' },
    { icon: '🔧', title: 'Maintenance Plans', desc: 'Ongoing updates, backups, monitoring, and priority support — so you never worry about your site.', price: 'from 3,000 CZK/mo' },
  ]

  const steps = [
    { num: '1', label: 'Discovery', desc: 'We deep-dive into your goals' },
    { num: '2', label: 'Strategy', desc: 'Roadmap + tech stack decision' },
    { num: '3', label: 'Build', desc: 'AI-assisted rapid development' },
    { num: '4', label: 'Review', desc: 'You approve every detail' },
    { num: '5', label: 'Launch', desc: 'Deploy + handover + support' },
  ]

  const testimonials = [
    { quote: 'Digi Wolf made setting up my Czech company completely painless. I was worried the language barrier would be a problem, but they handled everything in English and had my S.R.O. registered in under two weeks. Exceptional service.', name: 'Bat-Erdene Munkh', role: 'Founder, MongolBiz.cz', initials: 'BM' },
    { quote: 'I gave them a rough idea and a tight deadline. They came back with a polished web app that looked and worked better than I imagined. The AI-assisted workflow is genuinely impressive — fast without sacrificing quality.', name: 'Jakub Novotný', role: 'CEO, TechStart Prague', initials: 'JN' },
    { quote: 'We needed an AI automation system to handle our client onboarding. Digi Wolf built it in 10 days and it\'s saved us 15+ hours per week. The ROI was immediate. We\'re already planning the next project with them.', name: 'Sophie Schreiber', role: 'Operations Lead, FlowLab GmbH', initials: 'SS' },
  ]

  const faqs = [
    { q: 'How fast can you deliver a website?', a: 'For a standard agency website (up to 5 pages), we typically deliver a live site within 3–7 business days after the brief is finalised. Larger projects like web apps or custom platforms take 2–6 weeks depending on scope. Our AI-assisted workflow significantly reduces build time compared to traditional agencies — without compromising on quality.' },
    { q: 'Do I need to speak Czech for the S.R.O. formation?', a: 'Not at all. We handle the entire Czech S.R.O. formation process in English on your behalf. This includes preparing all legal documents, liaising with the Czech Business Register (Obchodní rejstřík), guiding you through notarisation, and providing translated copies of all key documents. Many of our S.R.O. clients are international entrepreneurs with no Czech language skills whatsoever.' },
    { q: 'What is included in a maintenance plan?', a: 'Our maintenance plans (from 3,000 CZK/month) include: monthly plugin and CMS updates, daily automated backups, uptime and performance monitoring, minor content edits (up to 1 hour per month), SSL certificate management, and access to our priority support queue.' },
    { q: 'Do you work with international clients outside the Czech Republic?', a: 'Yes — we work with clients across Europe, Asia, and beyond. We\'ve served clients from Mongolia, Germany, the UK, Slovakia, and Hungary. All communication is in English and all project management, calls, and documentation are handled remotely.' },
    { q: 'Can I update my website myself after launch?', a: 'Absolutely. We build sites with easy-to-use CMS systems (such as Sanity, Contentful, or WordPress) so you can update text, images, blog posts, and more without touching any code. We provide a short handover session and documentation so you feel confident managing your site.' },
  ]

  const cal = 'https://calendly.com/digiwolf-agency-consultation/30min'

  return (
    <>
      {/* NAVBAR */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 800, letterSpacing: '0.06em', color: '#F5F5F5' }}>
              <WolfSVG /> DIGI WOLF
            </a>
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {['services','how','cases','pricing','faq'].map(s => (
                <button key={s} onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: '#C0C8D8', cursor: 'pointer', transition: 'color 0.2s', textTransform: 'capitalize' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#C0C8D8')}>
                  {s === 'how' ? 'Process' : s === 'cases' ? 'Case Studies' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
              <a href={cal} target="_blank" rel="noreferrer" style={{ background: '#0047FF', color: '#fff', padding: '10px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, boxShadow: '0 0 20px rgba(0,71,255,0.18)', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#3d74ff'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(0,71,255,0.35)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0047FF'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(0,71,255,0.18)' }}>
                Get Started
              </a>
            </div>
            <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {['services','how','cases','pricing','faq'].map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none', padding: '12px 0', fontSize: 15, fontWeight: 500, color: '#C0C8D8', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid rgba(96,165,250,0.15)', textTransform: 'capitalize' }}>
              {s === 'how' ? 'Process' : s === 'cases' ? 'Case Studies' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <a href={cal} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: 8, background: '#0047FF', color: '#fff', padding: '12px', borderRadius: 8, fontWeight: 600 }}>Get Started</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 90, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)', top: -100, right: -100 }}/>
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,71,255,0.07) 0%, transparent 70%)', bottom: 50, left: -50 }}/>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div className="fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3d74ff', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 22 }}>
                <span className="pulse-dot"/>Now Accepting New Clients
              </div>
              <h1 className="fade-in" style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#F5F5F5', marginBottom: 22 }}>
                From Idea to<br/><span style={{ color: '#0047FF' }}>Digital Reality</span>
              </h1>
              <p className="fade-in fade-in-delay-1" style={{ fontSize: 17, color: '#C0C8D8', lineHeight: 1.7, marginBottom: 36 }}>
                We build high-performance websites, web apps, and digital infrastructure for entrepreneurs entering the Czech market and beyond. Fast delivery. Real results.
              </p>
              <div className="fade-in fade-in-delay-2" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
                <a href={cal} target="_blank" rel="noreferrer" className="btn-primary">📅 Book Free Consultation →</a>
                <button onClick={() => scrollTo('cases')} className="btn-ghost">See Our Work</button>
              </div>
              <div className="fade-in fade-in-delay-3" style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
                {[['47+','Clients Served'],['98%','Satisfaction Rate'],['6 Day','Avg. Delivery']].map(([num, label], i) => (
                  <>
                    {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(96,165,250,0.15)' }}/>}
                    <div key={num}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#F5F5F5' }}>{num}</div>
                      <div style={{ fontSize: 12, color: '#C0C8D8', fontWeight: 500, marginTop: 1 }}>{label}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="browser-wrap" style={{ position: 'relative', padding: 20 }}>
              <div style={{ position: 'absolute', inset: -30, background: 'radial-gradient(ellipse at center, rgba(0,71,255,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}/>
              <div style={{ position: 'relative', zIndex: 1, background: '#0D0D14', borderRadius: 12, border: '1px solid rgba(96,165,250,0.25)', boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                <div style={{ background: '#181820', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}/>)}
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: '#C0C8D8' }}>🔒 digiwolf.agency</div>
                </div>
                <div style={{ padding: 20, minHeight: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#131320', borderRadius: 6, padding: '8px 12px' }}>
                    <div style={{ width: 60, height: 8, background: '#0047FF', borderRadius: 4, opacity: 0.9 }}/>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1,2,3].map(i => <div key={i} style={{ width: 28, height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }}/>)}
                    </div>
                    <div style={{ width: 36, height: 20, background: '#0047FF', borderRadius: 4, opacity: 0.85 }}/>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
                    <div style={{ width: '70%', height: 14, background: 'rgba(255,255,255,0.85)', borderRadius: 4 }}/>
                    <div style={{ width: '55%', height: 14, background: 'rgba(255,255,255,0.6)', borderRadius: 4 }}/>
                    <div style={{ width: '85%', height: 7, background: 'rgba(255,255,255,0.25)', borderRadius: 3 }}/>
                    <div style={{ width: '65%', height: 7, background: 'rgba(255,255,255,0.18)', borderRadius: 3 }}/>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <div style={{ width: 70, height: 22, background: '#0047FF', borderRadius: 5, opacity: 0.9 }}/>
                      <div style={{ width: 56, height: 22, background: 'rgba(255,255,255,0.08)', borderRadius: 5 }}/>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 4 }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{ height: 56, background: '#181825', borderRadius: 6, border: '1px solid rgba(96,165,250,0.12)', display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 3, background: 'rgba(0,71,255,0.4)' }}/>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 2, width: '80%' }}/>
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, width: '55%' }}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="float-badge-1" style={{ position: 'absolute', top: 18, right: -18, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(17,18,28,0.92)', border: '1px solid rgba(96,165,250,0.3)', backdropFilter: 'blur(12px)', borderRadius: 10, padding: '9px 14px', fontSize: 12, fontWeight: 600, color: '#F5F5F5', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }}/> Project Live
              </div>
              <div className="float-badge-2" style={{ position: 'absolute', bottom: 60, left: -22, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(17,18,28,0.92)', border: '1px solid rgba(96,165,250,0.3)', backdropFilter: 'blur(12px)', borderRadius: 10, padding: '9px 14px', fontSize: 12, fontWeight: 600, color: '#F5F5F5', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0047FF' }}/> AI-Powered Build
              </div>
              <div className="float-badge-3" style={{ position: 'absolute', bottom: -10, right: 30, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(17,18,28,0.92)', border: '1px solid rgba(96,165,250,0.3)', backdropFilter: 'blur(12px)', borderRadius: 10, padding: '9px 14px', fontSize: 12, fontWeight: 600, color: '#F5F5F5', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 10 }}>
                ⭐ 5.0 Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" style={{ background: '#0A0A0A' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-divider"/>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Services Built for Growth</h2>
            <p className="section-sub">From your first website to full digital infrastructure — we handle every layer of your online presence.</p>
          </div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {services.map((s, i) => (
              <div key={i} className={`service-card fade-in ${i > 0 ? `fade-in-delay-${Math.min(i,5)}` : ''}`}>
                <span style={{ fontSize: 28, marginBottom: 16, display: 'block' }}>{s.icon}</span>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#F5F5F5', marginBottom: 8 }}>{s.title}</div>
                <p style={{ fontSize: 13.5, color: '#C0C8D8', lineHeight: 1.6, marginBottom: 18 }}>{s.desc}</p>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#3d74ff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 16, height: 2, background: '#0047FF', borderRadius: 1, display: 'inline-block' }}/>{s.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="how" className="section" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0C0C14 100%)' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-divider"/>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Our Process</h2>
            <p className="section-sub">A clear, proven workflow that gets you from idea to live product — without the chaos.</p>
          </div>
          <div className="steps-wrap fade-in" style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }}>
            {steps.map((s, i) => (
              <>
                <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 130, flexShrink: 0 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,71,255,0.12)', border: '2px solid #0047FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#0047FF', marginBottom: 16, position: 'relative', boxShadow: '0 0 20px rgba(0,71,255,0.2)' }}>{s.num}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F5F5F5', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#C0C8D8', lineHeight: 1.5, maxWidth: 100 }}>{s.desc}</div>
                </div>
                {i < steps.length - 1 && <div key={`c${i}`} style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #0047FF 0%, rgba(0,71,255,0.2) 100%)', marginTop: 32, minWidth: 20 }}/>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="section" style={{ background: '#0A0A0A' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-divider"/>
            <span className="section-label">Case Studies</span>
            <h2 className="section-title">Real Projects, Real Results</h2>
            <p className="section-sub">From Mongolian entrepreneurs entering the Czech market to tech startups launching SaaS platforms.</p>
          </div>
          <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { url: 'mongolbiz.cz', tag: '🇲🇳 Company Formation + Website', title: 'MongolBiz.cz', desc: 'Mongolian entrepreneur expanding into Central Europe. We handled the full Czech S.R.O. registration, built a bilingual Czech/English corporate website, and set up email infrastructure — all within 3 weeks.', pills: ['S.R.O. Formation','Bilingual Site','3 weeks'], tagColor: '#0047FF' },
              { url: 'techstart.cz/app', tag: '🇨🇿 Full-Stack Web App', title: 'TechStart Prague', desc: 'Early-stage Czech SaaS startup needed a full-stack platform with user auth, subscription billing, real-time dashboard, and a REST API. Delivered MVP in 6 weeks with Next.js, Supabase, and Stripe integration.', pills: ['Next.js','Supabase','Stripe','6 weeks'], tagColor: '#28C840' },
            ].map((c, i) => (
              <div key={i} className={`case-card fade-in ${i > 0 ? 'fade-in-delay-2' : ''}`}>
                <div style={{ padding: 16 }}>
                  <div style={{ background: '#181820', borderRadius: '8px 8px 0 0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }}/>)}
                    </div>
                    <div style={{ fontSize: 11, color: '#C0C8D8', flex: 1, padding: '3px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, marginLeft: 8 }}>{c.url}</div>
                  </div>
                  <div style={{ background: '#0D0D18', borderRadius: '0 0 8px 8px', minHeight: 160, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ height: 10, background: '#0047FF', borderRadius: 3, width: 80, opacity: 0.8, marginBottom: 4 }}/>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 2, width: 55 }}/>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: c.tagColor, background: `rgba(${c.tagColor === '#28C840' ? '40,200,64' : '0,71,255'},0.1)`, border: `1px solid rgba(${c.tagColor === '#28C840' ? '40,200,64' : '0,71,255'},0.25)`, borderRadius: 4, padding: '3px 8px' }}>
                        {c.tagColor === '#28C840' ? 'Live 🟢' : 'S.R.O. ✓'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[90,75,60].map(w => <div key={w} style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, width: `${w}%` }}/>)}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
                      {[1,2,3,4].map(j => <div key={j} style={{ height: 36, background: '#181825', borderRadius: 5, border: '1px solid rgba(96,165,250,0.1)' }}/>)}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '20px 20px 24px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0047FF', marginBottom: 8, display: 'block' }}>{c.tag}</span>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F5', marginBottom: 8 }}>{c.title}</div>
                  <p style={{ fontSize: 13.5, color: '#C0C8D8', lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {c.pills.map(p => <span key={p} style={{ fontSize: 11, fontWeight: 500, color: '#C0C8D8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 100, padding: '4px 12px' }}>{p}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0C0C14 100%)' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-divider"/>
            <span className="section-label">Client Love</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-sub">We measure success by the results our clients achieve — and the relationships we build along the way.</p>
          </div>
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card fade-in ${i > 0 ? `fade-in-delay-${i}` : ''}`}>
                <div style={{ fontSize: 14, color: '#FEBC2E', marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: '#C0C8D8', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0047FF 0%, #0066ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F5' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#C0C8D8', marginTop: 1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI HIGHLIGHT */}
      <section id="ai-highlight" className="section" style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.08) 0%, rgba(0,71,255,0.03) 100%)', borderTop: '1px solid rgba(0,71,255,0.15)', borderBottom: '1px solid rgba(0,71,255,0.15)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(0,71,255,0.1) 0%, transparent 60%)' }}/>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="fade-in">
            <span className="section-label">AI-Powered Workflow</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, marginBottom: 14 }}><span style={{ color: '#0047FF' }}>Built by AI.</span> Reviewed by Humans.</h2>
            <p style={{ fontSize: 16, color: '#C0C8D8', maxWidth: 500, margin: '0 auto 52px' }}>Our proprietary Hermes AI pipeline accelerates every project — without cutting corners on quality. You get the speed of automation with the precision of expert review.</p>
          </div>
          <div className="fade-in fade-in-delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
            {[['📋','Brief'],['🤖','Hermes AI'],['✏️','Draft'],['👁️','Review'],['🚀','Live']].map(([icon, name], i, arr) => (
              <>
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 100 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, transition: 'all 0.3s ease' }}>{icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#C0C8D8' }}>{name}</div>
                </div>
                {i < arr.length - 1 && <div key={`arr${i}`} style={{ fontSize: 18, color: '#0047FF', padding: '0 8px', marginTop: -22, opacity: 0.6 }}>→</div>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section" style={{ background: '#0A0A0A' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-divider"/>
            <span className="section-label">Transparent Pricing</span>
            <h2 className="section-title">Simple, Honest Pricing</h2>
            <p className="section-sub">No hidden fees. No surprises. Choose a package that fits your goals and budget — or let's build something custom.</p>
          </div>
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { tier: 'Starter', price: '15,000', sub: 'CZK', desc: 'Perfect for solo founders and small businesses who need a professional online presence fast.', features: ['Up to 5-page custom website','Mobile-responsive design','Basic on-page SEO setup','Contact form & Google Maps','3 months free minor edits'], btn: 'Get Started →', primary: false },
              { tier: 'Growth', price: '35,000', sub: 'CZK', desc: 'For growing businesses that need a powerful site or web app with more pages and integrations.', features: ['Everything in Starter','Up to 15 pages or web app MVP','CMS integration (headless or WordPress)','Analytics & conversion tracking','AI chatbot or lead capture automation','Priority support & 6-month maintenance'], btn: 'Book Your Call →', primary: true, popular: true },
              { tier: 'Studio', price: 'Custom', sub: '', desc: 'For complex projects, mobile apps, full S.R.O. packages, or ongoing retainer partnerships.', features: ['Full-stack web or mobile app','Czech S.R.O. formation bundle','Dedicated project manager','AI automation & custom integrations','Ongoing maintenance retainer','White-glove strategy sessions'], btn: 'Talk to Us →', primary: false },
            ].map((p, i) => (
              <div key={i} className={`pricing-card ${p.primary ? 'featured' : ''} fade-in ${i > 0 ? `fade-in-delay-${i}` : ''}`}>
                {p.popular && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#0047FF', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, boxShadow: '0 0 20px rgba(0,71,255,0.35)', whiteSpace: 'nowrap' }}>⭐ Most Popular</div>}
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0047FF', marginBottom: 12 }}>{p.tier}</div>
                <div style={{ fontSize: p.price === 'Custom' ? 28 : 36, fontWeight: 900, color: '#F5F5F5', marginBottom: 4 }}>{p.price} {p.sub && <sub style={{ fontSize: 16, fontWeight: 400 }}>{p.sub}</sub>}</div>
                <p style={{ fontSize: 13, color: '#C0C8D8', marginBottom: 28 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, flex: 1 }}>
                  {p.features.map(f => <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#C0C8D8' }}><span style={{ color: '#0047FF', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{f}</div>)}
                </div>
                <a href={cal} target="_blank" rel="noreferrer" style={{ width: '100%', padding: 13, borderRadius: 10, fontSize: 14, fontWeight: 700, textAlign: 'center', display: 'block', transition: 'all 0.25s', background: p.primary ? '#0047FF' : 'transparent', color: p.primary ? '#fff' : '#F5F5F5', border: p.primary ? 'none' : '1px solid rgba(96,165,250,0.15)', boxShadow: p.primary ? '0 0 24px rgba(0,71,255,0.35)' : 'none', cursor: 'pointer' }}>{p.btn}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" style={{ background: 'linear-gradient(180deg,#0A0A0A 0%,#0C0C14 100%)' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-divider"/>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
            <p className="section-sub">Everything you need to know before getting started. Still have questions? Just book a call.</p>
          </div>
          <div className="faq-list fade-in fade-in-delay-1" style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#F5F5F5', gap: 16, userSelect: 'none' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s ease, background 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none', fontSize: 14, color: '#0047FF' }}>+</div>
                </div>
                <div className="faq-answer">
                  <div style={{ padding: '0 22px 20px', fontSize: 14, color: '#C0C8D8', lineHeight: 1.7 }}>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="final-cta" className="section">
        <div className="container">
          <div className="fade-in" style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.05) 100%)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 20, padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,71,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}/>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>Let's Build Something Great</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginBottom: 16 }}>Start Your Project <span style={{ color: '#0047FF' }}>Today</span></h2>
              <p style={{ fontSize: 17, color: '#C0C8D8', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.65 }}>Book a free 30-minute strategy call. No commitment, no pressure — just honest advice about how we can help your business grow online.</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
                <a href={cal} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>📅 Book Free Consultation</a>
                <a href="mailto:info@digiwolf.agency" className="btn-ghost" style={{ fontSize: 16, padding: '16px 28px' }}>✉️ Email Us Directly</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, color: '#C0C8D8' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L8.5 5.5H13L9.5 8L10.8 12.5L7 10L3.2 12.5L4.5 8L1 5.5H5.5L7 1Z" fill="#FEBC2E"/></svg>
                Free consultation · No commitment · Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 48, marginBottom: 56 }}>
            <div>
              <div className="footer-logo"><WolfSVG/> DIGI WOLF</div>
              <p style={{ fontSize: 14, color: '#C0C8D8', lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>Prague-based digital agency specialising in websites, web apps, mobile apps, Czech S.R.O. formation, and AI automation. We turn ideas into digital reality.</p>
              <div>
                {[
                  { href: 'https://facebook.com/digiwolfagency', label: 'Facebook', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  { href: 'mailto:info@digiwolf.agency', label: 'Email', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { href: 'https://linkedin.com/company/digiwolfagency', label: 'LinkedIn', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                ].map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-btn" aria-label={s.label}>{s.icon}</a>)}
              </div>
            </div>
            <div>
              <div className="footer-heading">Services</div>
              <ul className="footer-links">
                {['Agency Websites','Full-Stack Web Apps','Mobile Apps','Czech S.R.O. Formation','AI Automation','Maintenance Plans'].map(s => <li key={s}><a href="#services">{s}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Company</div>
              <ul className="footer-links">
                {[['Our Process','#how'],['Case Studies','#cases'],['Testimonials','#testimonials'],['Pricing','#pricing'],['FAQ','#faq'],['Book a Call',cal]].map(([label,href]) => <li key={label}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Get in Touch</div>
              {[
                { icon: '✉️', content: <a href="mailto:info@digiwolf.agency" style={{ color: '#C0C8D8', transition: 'color 0.2s' }}>info@digiwolf.agency</a> },
                { icon: '📍', content: <span>Digi Wolf Agency s.r.o.<br/>Wenceslas Square 1<br/>110 00 Prague 1, Czechia</span> },
                { icon: '🕐', content: <span>Mon–Fri, 9:00–18:00 CET<br/>Response within 24 hours</span> },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, color: '#C0C8D8', lineHeight: 1.6 }}>{item.content}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(96,165,250,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontSize: 13, color: '#C0C8D8' }}>© 2026 Digi Wolf Agency s.r.o. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => <a key={l} href="#" style={{ fontSize: 13, color: '#C0C8D8', transition: 'color 0.2s' }}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <button id="scrollTop" className={showTop ? 'visible' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
    </>
  )
}
