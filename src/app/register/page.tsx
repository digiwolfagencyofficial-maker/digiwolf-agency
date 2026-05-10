'use client'
import Link from 'next/link'
import { useState } from 'react'

const WolfSVG = () => (
  <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
  </svg>
)

const input = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 10, padding: '14px 16px', fontSize: 15, color: '#F5F5F5', outline: 'none', boxSizing: 'border-box' as const, marginTop: 6 }

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' })
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
            <WolfSVG/>
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Create Account</h1>
          <p style={{ fontSize: 15, color: '#C0C8D8' }}>Join the Digi Wolf client portal</p>
        </div>
        <div style={{ background: '#111218', borderRadius: 20, border: '1px solid rgba(96,165,250,0.15)', padding: '40px 36px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#C0C8D8' }}>Full Name</label>
              <input style={input} placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#C0C8D8' }}>Email Address</label>
              <input type="email" style={input} placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#C0C8D8' }}>Company Name</label>
              <input style={input} placeholder="Your company (optional)" value={form.company} onChange={e => setForm({...form, company: e.target.value})}/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#C0C8D8' }}>Password</label>
              <input type="password" style={input} placeholder="Create a strong password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
            </div>
            <button type="submit" style={{ background: '#0047FF', color: '#fff', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 0 24px rgba(0,71,255,0.35)', marginTop: 4 }}>Create Account →</button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#C0C8D8' }}>
            Already have an account? <Link href="/login" style={{ color: '#3d74ff', fontWeight: 600 }}>Sign in</Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/" style={{ fontSize: 14, color: '#C0C8D8', opacity: 0.7 }}>← Back to digiwolf.agency</Link>
        </div>
      </div>
    </div>
  )
}
