'use client'
import Link from 'next/link'
import { useState } from 'react'

const WolfSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
  </svg>
)

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const input = { width: '100%', background: '#0D0D18', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 10, padding: '12px 16px', fontSize: 15, color: '#F5F5F5', outline: 'none', boxSizing: 'border-box' as const }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '0.06em' }}><WolfSVG/> DIGI WOLF</Link>
          <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ background: '#0047FF', color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Book a Call</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'inline-flex', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d74ff', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>Get In Touch</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, marginBottom: 16 }}>Let's Build <span style={{ color: '#0047FF' }}>Something Great</span></h1>
          <p style={{ fontSize: 17, color: '#C0C8D8', maxWidth: 520, margin: '0 auto' }}>Tell us about your project. We'll get back to you within 24 hours with a plan.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '✉️', label: 'Email', value: 'info@digiwolf.agency', href: 'mailto:info@digiwolf.agency' },
                { icon: '📍', label: 'Address', value: 'Wenceslas Square 1\n110 00 Prague 1, Czechia', href: null },
                { icon: '🕐', label: 'Hours', value: 'Mon–Fri, 9:00–18:00 CET\nResponse within 24 hours', href: null },
                { icon: '📅', label: 'Book a Call', value: 'Free 30-min consultation', href: 'https://calendly.com/digiwolf-agency-consultation/30min' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#111218', borderRadius: 14, border: '1px solid rgba(96,165,250,0.15)', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 20 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#3d74ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{item.label}</div>
                      {item.href ? <Link href={item.href} target="_blank" style={{ fontSize: 14, color: '#C0C8D8', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.value}</Link>
                        : <div style={{ fontSize: 14, color: '#C0C8D8', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.value}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#111218', borderRadius: 20, border: '1px solid rgba(96,165,250,0.15)', padding: '40px' }}>
            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: '#C0C8D8' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Send Us a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C0C8D8', marginBottom: 6 }}>Full Name *</label><input required style={input} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/></div>
                  <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C0C8D8', marginBottom: 6 }}>Email *</label><input required type="email" style={input} placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/></div>
                </div>
                <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C0C8D8', marginBottom: 6 }}>Company</label><input style={input} placeholder="Your company name" value={form.company} onChange={e => setForm({...form, company: e.target.value})}/></div>
                <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C0C8D8', marginBottom: 6 }}>Service Needed</label>
                  <select style={{ ...input }} value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                    <option value="">Select a service...</option>
                    {['Agency Website','Czech S.R.O. Formation','AI Automation','SEO & Growth','Brand Identity','Maintenance Plan','Full-Stack Web App','Other'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C0C8D8', marginBottom: 6 }}>Budget Range</label>
                  <select style={{ ...input }} value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                    <option value="">Select budget...</option>
                    {['Under 15,000 CZK','15,000–35,000 CZK','35,000–100,000 CZK','100,000+ CZK','Let\'s discuss'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#C0C8D8', marginBottom: 6 }}>Message *</label><textarea required style={{ ...input, minHeight: 120, resize: 'vertical' as const }} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}/></div>
                {status === 'error' && <div style={{ color: '#ff4444', fontSize: 14 }}>Something went wrong. Please email us directly at info@digiwolf.agency</div>}
                <button type="submit" disabled={status === 'sending'} style={{ background: '#0047FF', color: '#fff', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 0 24px rgba(0,71,255,0.35)' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
