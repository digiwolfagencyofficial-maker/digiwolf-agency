'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Wolf SVG
const WolfSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
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
  </svg>
)

// Animated counter
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 2000
        const step = (end / duration) * 16
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Mouse parallax for hero
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.fade-up, .slide-left, .slide-right, .stagger').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Custom cursor
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'cursor'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(cursor)
    document.body.appendChild(ring)

    let cx = 0, cy = 0, rx = 0, ry = 0
    const move = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY }
    window.addEventListener('mousemove', move)

    const hover = () => { cursor.classList.add('hovered'); ring.classList.add('hovered') }
    const unhover = () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered') }
    document.querySelectorAll('a, button').forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', unhover) })

    let raf: number
    const animate = () => {
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'
      rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); cursor.remove(); ring.remove() }
  }, [])

  const services = [
    { icon: '🌐', title: 'Agency Websites', desc: 'High-converting, SEO-optimised websites built with Next.js that turn visitors into paying clients.', tag: 'Most Popular', price: 'from 15,000 CZK' },
    { icon: '⚖️', title: 'Czech S.R.O. Formation', desc: 'Full Czech company registration end-to-end in English. No bureaucracy, no stress, just results.', tag: '', price: 'from 12,000 CZK' },
    { icon: '🤖', title: 'AI Automation', desc: 'Custom AI workflows, chatbots, and automation pipelines that save your team 20+ hours per week.', tag: 'High Demand', price: 'from 25,000 CZK' },
    { icon: '📈', title: 'SEO & Growth', desc: 'Data-driven SEO strategies tailored for CEE markets. Rank higher, get found, grow consistently.', tag: '', price: 'from 8,000 CZK/mo' },
    { icon: '🎨', title: 'Brand Identity', desc: 'Premium logo, brand system, and visual identity that makes your business unforgettable.', tag: '', price: 'from 18,000 CZK' },
    { icon: '🛡️', title: 'Maintenance & Support', desc: '24/7 monitoring, updates, security patches, and priority support for your digital assets.', tag: '', price: 'from 3,000 CZK/mo' },
  ]

  const stats = [
    { value: 47, suffix: '+', label: 'Clients Served' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 6, suffix: ' days', label: 'Avg. Delivery' },
    { value: 3, suffix: ' countries', label: 'Markets Active' },
  ]

  const process = [
    { step: '01', title: 'Discovery Call', desc: 'We learn your goals, audience, and market. No fluff — just the information needed to build something that works.' },
    { step: '02', title: 'Strategy & Design', desc: 'Custom wireframes and design mockups tailored to your brand. You approve every pixel before we code.' },
    { step: '03', title: 'Development', desc: 'Production-grade code with Next.js, TypeScript, and Supabase. Built for performance and scale from day one.' },
    { step: '04', title: 'Review & Refine', desc: 'Full QA across all devices. You test, we fix. Unlimited revisions until it\'s exactly what you want.' },
    { step: '05', title: 'Launch & Grow', desc: 'We deploy, monitor, and continuously improve. Your success is a long-term partnership, not a one-off project.' },
  ]

  const testimonials = [
    { name: 'Arjun Sharma', role: 'CEO, TechVentures Prague', text: 'Digi Wolf built our entire SaaS website in 5 days. The quality is exceptional — our conversion rate jumped 340% in the first month.', avatar: 'A' },
    { name: 'Tomas Novák', role: 'Founder, Novák Consulting', text: 'They handled my Czech S.R.O. formation while simultaneously building my agency site. Professional, fast, and zero stress.', avatar: 'T' },
    { name: 'Enkhmaa B.', role: 'Director, MN Export Hub', text: 'As a Mongolian entrepreneur in Prague, having an agency that speaks my language (literally) is invaluable. Results speak for themselves.', avatar: 'E' },
  ]

  const faqs = [
    { q: 'How long does a website project take?', a: 'Most agency websites are delivered in 5–10 business days. Complex platforms with client portals or custom features take 3–4 weeks. We always agree on a timeline before starting.' },
    { q: 'Do you work with international clients?', a: 'Yes. We work with entrepreneurs across Czech Republic, Slovakia, Hungary, and Mongolia. All communication is in English, Czech, or Mongolian.' },
    { q: 'What is included in the Czech S.R.O. formation?', a: 'Everything: document preparation, notary coordination, trade office registration, bank account opening guidance, and full handover. We handle the entire process in English.' },
    { q: 'Can I upgrade my plan later?', a: 'Absolutely. All our websites are built to scale. You can add features, pages, or integrations at any time without rebuilding from scratch.' },
    { q: 'Do you offer ongoing support?', a: 'Yes. Our Maintenance & Support plan covers hosting, security updates, performance monitoring, and priority technical support for 3,000 CZK/month.' },
  ]

  const caseStudies = [
    { title: 'TechVentures Prague', category: 'SaaS Website + CRM', result: '+340% conversions', color: '#0047FF', desc: 'Full rebrand and Next.js site launch with integrated client dashboard and Stripe payments.' },
    { title: 'MN Export Hub', category: 'E-commerce + S.R.O.', result: '€180K revenue in 90 days', color: '#00c864', desc: 'Czech company formation + trilingual B2B marketplace connecting Mongolian exporters to EU buyers.' },
  ]

  const techStack = ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel', 'Stripe', 'Framer Motion', 'Prisma', 'React', 'PostgreSQL', 'Resend', 'Cloudflare']

  return (
    <>
      <Navbar />

      <main style={{ background: '#030712', minHeight: '100vh', overflow: 'hidden' }}>

        {/* ============ HERO ============ */}
        <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
          {/* Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,71,255,0.12) 0%, transparent 60%)' }} />
          <div className="orb orb-1" style={{ position: 'absolute' }} />
          <div className="orb orb-2" style={{ position: 'absolute' }} />

          {/* Grid */}
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

          {/* Gradient fade bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, #030712)', zIndex: 2 }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 3 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">

              {/* Left content */}
              <div>
                {/* Badge */}
                <div className="fade-up" style={{ marginBottom: 28 }}>
                  <span className="badge">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c864', display: 'inline-block', animation: 'pulseRing 2s ease-out infinite' }} />
                    Available for new projects
                  </span>
                </div>

                {/* Headline */}
                <h1 className="fade-up fade-up-delay-1" style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
                  <span style={{ color: '#f0f4ff' }}>Your Digital Agency</span>
                  <br />
                  <span className="gradient-text">in Central Europe</span>
                  <br />
                  <span style={{ color: '#f0f4ff' }}>— Done Right.</span>
                </h1>

                <p className="fade-up fade-up-delay-2" style={{ fontSize: 18, color: '#8892b0', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
                  We build high-converting websites, automate your workflows with AI, and handle Czech S.R.O. formation — so you can focus on growing your business.
                </p>

                {/* CTAs */}
                <div className="fade-up fade-up-delay-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
                  <Link href="/contact" style={{
                    background: '#0047FF', color: '#fff', textDecoration: 'none',
                    padding: '16px 32px', borderRadius: 12, fontSize: 16, fontWeight: 700,
                    boxShadow: '0 8px 40px rgba(0,71,255,0.4)', transition: 'all 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 16px 50px rgba(0,71,255,0.6)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 40px rgba(0,71,255,0.4)'; }}
                  >
                    Start Your Project →
                  </Link>
                  <Link href="/case-studies" style={{
                    color: '#f0f4ff', textDecoration: 'none',
                    padding: '16px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#0047FF'; el.style.background = 'rgba(0,71,255,0.1)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.background = 'transparent'; }}
                  >
                    View Case Studies
                  </Link>
                </div>

                {/* Stats row */}
                <div className="fade-up fade-up-delay-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                  {stats.map((s, i) => (
                    <div key={i} style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 16 }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em' }}>
                        <Counter end={s.value} suffix={s.suffix} />
                      </div>
                      <div style={{ fontSize: 12, color: '#8892b0', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Browser Mockup */}
              <div className="fade-up fade-up-delay-2" style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 5}deg)`,
                transition: 'transform 0.1s ease-out',
              }}>
                <div className="browser-mockup" style={{ position: 'relative' }}>
                  <div className="browser-bar">
                    <div className="browser-dot" style={{ background: '#ff5f57' }} />
                    <div className="browser-dot" style={{ background: '#febc2e' }} />
                    <div className="browser-dot" style={{ background: '#28c840' }} />
                    <div style={{ flex: 1, background: '#0d1117', borderRadius: 6, height: 24, display: 'flex', alignItems: 'center', paddingLeft: 10, marginLeft: 8 }}>
                      <span style={{ color: '#8892b0', fontSize: 11 }}>digiwolf.agency</span>
                    </div>
                  </div>
                  <div style={{ padding: 24, background: '#0d1117' }}>
                    {/* Mock website content */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.3), rgba(61,116,255,0.1))', borderRadius: 12, padding: 32, marginBottom: 16, textAlign: 'center' }}>
                      <div style={{ width: 40, height: 40, background: '#0047FF', borderRadius: 10, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WolfSVG size={24} />
                      </div>
                      <div style={{ height: 10, background: 'rgba(255,255,255,0.3)', borderRadius: 5, marginBottom: 8, width: '60%', margin: '0 auto 8px' }} />
                      <div style={{ height: 7, background: 'rgba(255,255,255,0.15)', borderRadius: 5, width: '80%', margin: '0 auto' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                      {[['🌐', '#0047FF'], ['⚖️', '#00c864'], ['🤖', '#7c3aed']].map(([icon, color], i) => (
                        <div key={i} style={{ background: `rgba(${color === '#0047FF' ? '0,71,255' : color === '#00c864' ? '0,200,100' : '124,58,237'},0.1)`, borderRadius: 10, padding: 16, textAlign: 'center', border: `1px solid ${color}22` }}>
                          <div style={{ fontSize: 20 }}>{icon}</div>
                          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 8 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div style={{ position: 'absolute', top: -20, right: -20, background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.3)', borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(10px)', animation: 'float 4s ease-in-out infinite' }}>
                  <div style={{ fontSize: 11, color: '#00c864', fontWeight: 700 }}>✓ Project Launched</div>
                  <div style={{ fontSize: 10, color: '#8892b0', marginTop: 2 }}>TechVentures Prague</div>
                </div>
                <div style={{ position: 'absolute', bottom: -16, left: -20, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.3)', borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(10px)', animation: 'float 5s ease-in-out infinite', animationDelay: '-2s' }}>
                  <div style={{ fontSize: 11, color: '#3d74ff', fontWeight: 700 }}>⚡ 98% Satisfaction</div>
                  <div style={{ fontSize: 10, color: '#8892b0', marginTop: 2 }}>47 happy clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', overflow: 'hidden', position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.01)' }}>
          <div className="marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} style={{ padding: '0 40px', color: '#8892b0', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0047FF', display: 'inline-block' }} />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ============ SERVICES ============ */}
        <section id="services" style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>What We Do</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                Everything Your Business Needs<br />
                <span className="gradient-text">to Win Online</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, maxWidth: 540, margin: '0 auto' }}>
                From stunning websites to AI automation and Czech company formation — we do it all, exceptionally.
              </p>
            </div>

            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
              {services.map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s ease', cursor: 'default',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = '1px solid rgba(0,71,255,0.4)'
                    el.style.background = 'rgba(0,71,255,0.06)'
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 20px 60px rgba(0,71,255,0.15)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = '1px solid rgba(255,255,255,0.07)'
                    el.style.background = 'rgba(255,255,255,0.03)'
                    el.style.transform = 'none'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #0047FF, transparent)', opacity: 0.5 }} />

                  {s.tag && (
                    <span style={{
                      position: 'absolute', top: 20, right: 20,
                      background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.3)',
                      color: '#3d74ff', fontSize: 10, fontWeight: 700, padding: '4px 10px',
                      borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>{s.tag}</span>
                  )}

                  <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f0f4ff', marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: '#8892b0', lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>{s.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#3d74ff', fontWeight: 700, fontSize: 14 }}>{s.price}</span>
                    <Link href="/services" style={{ color: '#8892b0', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
                    >Learn more →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 80 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>How We Work</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                From Idea to <span className="gradient-text">Live in Days</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
                Our proven process delivers results fast without sacrificing quality.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Connector line */}
              <div style={{ position: 'absolute', top: 40, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,71,255,0.3), transparent)', display: 'none' }} />

              <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }} id="process-grid">
                {process.map((p, i) => (
                  <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                    {/* Step number circle */}
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,71,255,0.2), rgba(0,71,255,0.05))',
                      border: '1px solid rgba(0,71,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px', position: 'relative',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#3d74ff', letterSpacing: '0.05em' }}>{p.step}</span>
                      {/* Connector */}
                      {i < process.length - 1 && (
                        <div style={{ position: 'absolute', left: '100%', top: '50%', width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(0,71,255,0.4), transparent)', transform: 'translateY(-50%)' }} />
                      )}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CASE STUDIES ============ */}
        <section id="work" style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>Case Studies</span>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff' }}>
                  Real Results,<br /><span className="gradient-text">Real Clients</span>
                </h2>
              </div>
              <Link href="/case-studies" style={{ color: '#3d74ff', textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid rgba(0,71,255,0.3)', padding: '12px 24px', borderRadius: 10, transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,71,255,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; }}
              >View All →</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="case-grid">
              {caseStudies.map((c, i) => (
                <div key={i} className="fade-up" style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 24, overflow: 'hidden', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.borderColor = `${c.color}44`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  {/* Mock browser */}
                  <div style={{ background: `linear-gradient(135deg, ${c.color}22, transparent)`, padding: 32, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="browser-mockup" style={{ background: '#0d1117' }}>
                      <div className="browser-bar">
                        <div className="browser-dot" style={{ background: '#ff5f57' }} />
                        <div className="browser-dot" style={{ background: '#febc2e' }} />
                        <div className="browser-dot" style={{ background: '#28c840' }} />
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 20, marginLeft: 8 }} />
                      </div>
                      <div style={{ padding: 20, height: 120, background: 'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, background: c.color + '33', border: `1px solid ${c.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                            {i === 0 ? '💻' : '🌏'}
                          </div>
                          <div>
                            <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, width: 120, marginBottom: 6 }} />
                            <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 4, width: 80 }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <span style={{ background: `${c.color}22`, border: `1px solid ${c.color}44`, color: c.color, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{c.category}</span>
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f0f4ff', marginBottom: 10 }}>{c.title}</h3>
                    <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{c.desc}</p>
                    <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>Testimonials</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff' }}>
                Trusted by Entrepreneurs<br /><span className="gradient-text">Across 3 Countries</span>
              </h2>
            </div>

            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: 32, transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,71,255,0.3)'; el.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'none'; }}
                >
                  <div style={{ fontSize: 32, color: '#0047FF', marginBottom: 16, opacity: 0.7 }}>"</div>
                  <p style={{ color: '#c8d3f0', lineHeight: 1.8, fontSize: 15, marginBottom: 28, fontStyle: 'italic' }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0047FF, #3d74ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#f0f4ff', fontSize: 14 }}>{t.name}</div>
                      <div style={{ color: '#8892b0', fontSize: 12, marginTop: 2 }}>{t.role}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#ffa000', fontSize: 12 }}>★★★★★</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AI HIGHLIGHT ============ */}
        <section style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.08) 0%, rgba(0,71,255,0.03) 100%)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 32, padding: '80px 60px', position: 'relative', overflow: 'hidden' }} className="fade-up">
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(0,71,255,0.12), transparent 60%)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }} className="ai-grid">
                <div>
                  <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>AI-Powered</span>
                  <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 20 }}>
                    Automate Your Business with <span className="gradient-text">Custom AI</span>
                  </h2>
                  <p style={{ color: '#8892b0', lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
                    We build AI pipelines, chatbots, and automation workflows that eliminate repetitive tasks. Our clients save an average of 23 hours per week.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                    {['Lead qualification chatbots', 'Document automation & e-signatures', 'CRM data enrichment pipelines', 'AI-generated weekly reports'].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#c8d3f0', fontSize: 15 }}>
                        <span style={{ width: 20, height: 20, background: 'rgba(0,71,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#3d74ff', flexShrink: 0 }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href="/services#ai" style={{
                    background: '#0047FF', color: '#fff', textDecoration: 'none',
                    padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 8px 30px rgba(0,71,255,0.4)',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 16px 40px rgba(0,71,255,0.6)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 30px rgba(0,71,255,0.4)'; }}
                  >
                    Explore AI Services →
                  </Link>
                </div>
                {/* AI Flow Visual */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Input Data', 'AI Processing', 'Automation', 'Results Delivered'].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(0,71,255,${0.1 + i * 0.08})`, border: `1px solid rgba(0,71,255,${0.2 + i * 0.1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                        {['📥', '🤖', '⚡', '✅'][i]}
                      </div>
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px' }}>
                        <div style={{ color: '#f0f4ff', fontWeight: 600, fontSize: 13 }}>{step}</div>
                      </div>
                      {i < 3 && <div style={{ position: 'absolute', marginTop: 52, marginLeft: 20, width: 1, height: 12, background: 'rgba(0,71,255,0.3)' }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PRICING PREVIEW ============ */}
        <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>Pricing</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 16 }}>
                Transparent Pricing,<br /><span className="gradient-text">No Surprises</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: 18, maxWidth: 480, margin: '0 auto' }}>
                Every plan includes full source code, 30-day support, and a satisfaction guarantee.
              </p>
            </div>

            <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { name: 'Starter', price: '15,000', currency: 'CZK', desc: 'Perfect for freelancers and small businesses launching their first professional website.', features: ['5-page website', 'Mobile responsive', 'SEO optimized', 'Contact form', '30-day support', 'Source code included'], cta: 'Get Started', featured: false },
                { name: 'Growth', price: '45,000', currency: 'CZK', desc: 'For growing agencies that need a full-featured site with client portal and integrations.', features: ['Unlimited pages', 'Client dashboard', 'Payment integration', 'CRM integration', 'AI chatbot', '90-day support', 'Priority delivery'], cta: 'Most Popular', featured: true },
                { name: 'Enterprise', price: 'Custom', currency: '', desc: 'Full-stack platform with custom features, AI automation, and dedicated account management.', features: ['Everything in Growth', 'Custom AI workflows', 'Multi-language', 'White-label option', 'SLA guarantee', 'Dedicated PM', 'Lifetime support'], cta: 'Contact Us', featured: false },
              ].map((plan, i) => (
                <div key={i} style={{
                  background: plan.featured ? 'linear-gradient(135deg, rgba(0,71,255,0.15), rgba(61,116,255,0.06))' : 'rgba(255,255,255,0.03)',
                  border: plan.featured ? '1px solid rgba(0,71,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden',
                  boxShadow: plan.featured ? '0 0 60px rgba(0,71,255,0.15)' : 'none',
                  transition: 'all 0.3s',
                  transform: plan.featured ? 'scale(1.03)' : 'none',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = plan.featured ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = plan.featured ? 'scale(1.03)' : 'none'; }}
                >
                  {plan.featured && (
                    <div style={{ position: 'absolute', top: 20, right: 20, background: '#0047FF', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>BEST VALUE</div>
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: plan.featured ? 'linear-gradient(90deg, transparent, #0047FF, transparent)' : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', marginBottom: 8 }}>{plan.name}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: plan.price === 'Custom' ? 36 : 40, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>{plan.price === 'Custom' ? '' : plan.price}</span>
                    {plan.price === 'Custom' ? <span style={{ fontSize: 36, fontWeight: 900, color: '#f0f4ff' }}>Custom</span> : null}
                    {plan.currency && <span style={{ fontSize: 16, color: '#8892b0', marginLeft: 6 }}>{plan.currency}</span>}
                  </div>
                  <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>{plan.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                    {plan.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#c8d3f0', fontSize: 14 }}>
                        <span style={{ color: plan.featured ? '#3d74ff' : '#8892b0', fontSize: 14 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" style={{
                    display: 'block', textAlign: 'center', textDecoration: 'none',
                    padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                    background: plan.featured ? '#0047FF' : 'transparent',
                    color: plan.featured ? '#fff' : '#f0f4ff',
                    border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    boxShadow: plan.featured ? '0 8px 30px rgba(0,71,255,0.4)' : 'none',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.85'; el.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.transform = 'none'; }}
                  >
                    {plan.cta} →
                  </Link>
                </div>
              ))}
            </div>

            <div className="fade-up" style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/pricing" style={{ color: '#8892b0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              >
                View full pricing breakdown →
              </Link>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section style={{ padding: '120px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>FAQ</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f4ff' }}>
                Questions? <span className="gradient-text">Answered.</span>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((f, i) => (
                <div key={i} className="fade-up" style={{
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${openFaq === i ? 'rgba(0,71,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.3s',
                }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    textAlign: 'left',
                  }}>
                    <span style={{ color: '#f0f4ff', fontWeight: 600, fontSize: 16 }}>{f.q}</span>
                    <span style={{ color: '#3d74ff', fontSize: 20, fontWeight: 700, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none', flexShrink: 0, marginLeft: 16 }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 28px 24px', color: '#8892b0', lineHeight: 1.8, fontSize: 15 }}>{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section style={{ padding: '80px 24px 120px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="fade-up" style={{
              background: 'linear-gradient(135deg, rgba(0,71,255,0.15) 0%, rgba(0,71,255,0.05) 100%)',
              border: '1px solid rgba(0,71,255,0.25)',
              borderRadius: 32, padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,71,255,0.2), transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>Limited Availability</span>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f0f4ff', marginBottom: 20 }}>
                  Ready to Build Something<br /><span className="gradient-text">Extraordinary?</span>
                </h2>
                <p style={{ color: '#8892b0', fontSize: 18, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
                  We only take 3 new clients per month to ensure exceptional quality. Book your discovery call before spots fill up.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/contact" style={{
                    background: '#0047FF', color: '#fff', textDecoration: 'none',
                    padding: '18px 40px', borderRadius: 14, fontSize: 17, fontWeight: 800,
                    boxShadow: '0 8px 40px rgba(0,71,255,0.5)', transition: 'all 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 16px 60px rgba(0,71,255,0.7)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 40px rgba(0,71,255,0.5)'; }}
                  >
                    Book Discovery Call →
                  </Link>
                  <Link href="/pricing" style={{
                    color: '#f0f4ff', textDecoration: 'none',
                    padding: '18px 40px', borderRadius: 14, fontSize: 17, fontWeight: 700,
                    border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.05)'; el.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  >
                    See Pricing
                  </Link>
                </div>
                <p style={{ color: '#8892b0', fontSize: 13, marginTop: 24 }}>
                  ✓ Free 30-minute consultation &nbsp;&nbsp; ✓ No commitment required &nbsp;&nbsp; ✓ Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .case-grid { grid-template-columns: 1fr !important; }
          .ai-grid { grid-template-columns: 1fr !important; }
          #process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          #process-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(0,200,100,0.4); }
          100% { box-shadow: 0 0 0 8px rgba(0,200,100,0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
