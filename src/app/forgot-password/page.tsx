'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Image src="/digiwolf-icon.png" alt="Digi Wolf Agency" width={44} height={44} style={{ objectFit: 'contain' }} />
            <span style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', letterSpacing: '0.05em' }}>DIGIWOLF</span>
          </Link>
        </div>

        <div style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
          {/* Top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #0047FF, #6366f1)' }} />

          {!submitted ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>
                  🔐
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>Reset Your Password</h1>
                <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6 }}>
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 8 }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="you@company.com"
                    required
                    style={{
                      width: '100%', padding: '13px 16px', boxSizing: 'border-box',
                      background: focused ? '#0d1528' : '#0a1020',
                      border: `1.5px solid ${focused ? '#0047FF' : '#1e2a45'}`,
                      borderRadius: 10, color: '#f0f4ff', fontSize: 15, outline: 'none',
                      transition: 'all 0.2s',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 10,
                    background: loading ? 'rgba(0,71,255,0.5)' : '#0047FF',
                    border: 'none', color: '#fff', fontSize: 15, fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    boxShadow: '0 4px 20px rgba(0,71,255,0.3)', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                      Sending...
                    </>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Check Your Email</h2>
              <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
                If an account exists for <strong style={{ color: '#f0f4ff' }}>{email}</strong>, we&apos;ve sent a password reset link.
              </p>
              <p style={{ color: '#8892b0', fontSize: 13, marginBottom: 32 }}>
                Didn&apos;t receive it? Check your spam folder or try again.
              </p>
              <button
                onClick={() => { setSubmitted(false); setEmail('') }}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#8892b0', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Try again
              </button>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: '#8892b0' }}>
            Remember your password?{' '}
            <Link href="/login" style={{ color: '#0047FF', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
