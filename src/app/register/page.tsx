'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function RegisterPage() {
  const supabase = createClientComponentClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [focused, setFocused] = useState('')

  const fieldStyle = (id: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    background: focused === id ? '#0d1528' : '#0a1020',
    border: `1.5px solid ${focused === id ? '#0047FF' : '#1e2a45'}`,
    borderRadius: 10,
    color: '#f0f4ff',
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, company },
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030712',
      display: 'flex',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #020818 0%, #030f2a 60%, #040d20 100%)',
        borderRight: '1px solid #0d1a35',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,71,255,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 420, width: '100%' }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#f0f4ff', margin: '0 0 16px' }}>
              Start your digital transformation
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
              Join 47+ businesses across Central Europe who trust DigiWolf to build and grow their digital presence.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['🚀', 'Web Development', 'Premium sites delivered in 6 days'],
              ['⚡', 'AI Automation', 'Save 20+ hours per week'],
              ['🏢', 'Czech S.R.O. Formation', 'Company setup in 7 days'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid #0d1a35', borderRadius: 12 }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff', marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div style={{
        width: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 48px',
        background: '#030712',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <Image
                src="/digiwolf-icon-transparent.png"
                alt="DigiWolf"
                width={64}
                height={64}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f4ff', textAlign: 'center', margin: '0 0 8px' }}>Create your account</h1>
          <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 32px' }}>Free to join. No credit card required.</p>

          {success ? (
            <div style={{ background: 'rgba(0,200,100,0.1)', border: '1px solid rgba(0,200,100,0.3)', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📧</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#00c864', marginBottom: 8 }}>Check your email!</div>
              <div style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.6 }}>
                We&apos;ve sent a confirmation link to <strong style={{ color: '#f0f4ff' }}>{email}</strong>. Click it to activate your account.
              </div>
              <Link href="/login" style={{ display: 'inline-block', marginTop: 20, color: '#0047FF', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                Back to Sign In →
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#f87171', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>Full name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Uuganbayar Ganbaatar" required style={fieldStyle('name')} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>Company (optional)</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} onFocus={() => setFocused('company')} onBlur={() => setFocused('')} placeholder="Your Company s.r.o." style={fieldStyle('company')} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>Email address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="you@company.com" required style={fieldStyle('email')} />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocused('password')} onBlur={() => setFocused('')} placeholder="Min. 8 characters" required minLength={8} style={fieldStyle('password')} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: loading ? '#1e2a45' : 'linear-gradient(135deg, #0047FF, #0066ff)',
                    border: 'none',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: 28,
                  }}
                >
                  {loading ? 'Creating account...' : 'Create Free Account'}
                </button>
              </form>
            </>
          )}

          {!success && (
            <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: 0 }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#0047FF', fontWeight: 600, textDecoration: 'none' }}>
                Sign in →
              </Link>
            </p>
          )}

          <p style={{ textAlign: 'center', fontSize: 11, color: '#334155', marginTop: 16 }}>
            By creating an account you agree to our{' '}
            <Link href="/privacy" style={{ color: '#475569', textDecoration: 'underline' }}>Privacy Policy</Link>
            {' '}and{' '}
            <Link href="/terms" style={{ color: '#475569', textDecoration: 'underline' }}>Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
