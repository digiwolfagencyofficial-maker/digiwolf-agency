'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'

const Step = ({ num, icon, title, desc }: { num: number; icon: string; title: string; desc: string }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    <div style={{
      width: 48, height: 48, borderRadius: 14,
      background: 'linear-gradient(135deg, rgba(0,71,255,0.2), rgba(0,71,255,0.08))',
      border: '1px solid rgba(0,71,255,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22, flexShrink: 0,
    }}>{icon}</div>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#0047FF', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Step {num}
        </span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.6 }}>{desc}</div>
    </div>
  </div>
)

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [focused, setFocused] = useState('')
  const [btnHover, setBtnHover] = useState(false)
  const [loginHover, setLoginHover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    background: focused === name ? '#0d1528' : '#0a1020',
    border: `1.5px solid ${focused === name ? '#0047FF' : '#1e2a45'}`,
    borderRadius: 10,
    color: '#f0f4ff',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
    fontFamily: 'Inter, system-ui, sans-serif',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the Terms of Service to continue.'); return }
    setError('')
    setLoading(true)
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, company },
        },
      })
      if (signUpError) {
        setError(signUpError.message)
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/login'), 3000)
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 64 }}>

        {/* Left decorative panel */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #020818 0%, #030f2a 50%, #040d20 100%)',
          borderRight: '1px solid #0d1a35',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 56px',
          position: 'relative',
          overflow: 'hidden',
        }} className="register-left-panel">
          <div style={{
            position: 'absolute', top: '15%', left: '5%',
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(0,71,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', right: '0%',
            width: 220, height: 220,
            background: 'radial-gradient(circle, rgba(0,71,255,0.07) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52 }}>
            <Image src="/digiwolf-logo.svg" alt="Digi Wolf Agency" width={140} height={56} priority />
          </div>

          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block',
              padding: '5px 12px',
              background: 'rgba(0,71,255,0.12)',
              border: '1px solid rgba(0,71,255,0.25)',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              color: '#4d80ff',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              How it works
            </span>
            <h2 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.8px' }}>
              3 steps to<br />
              <span style={{ color: '#0047FF' }}>launch your project</span>
            </h2>
            <p style={{ color: '#8892b0', fontSize: 15, lineHeight: 1.7, marginBottom: 44, maxWidth: 380 }}>
              Join 47+ clients who trust DigiWolf to build and grow their digital presence.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Step num={1} icon="📋" title="Create your account" desc="Sign up in under 2 minutes. No credit card required to get started." />
            <div style={{ width: 2, height: 20, background: 'linear-gradient(to bottom, rgba(0,71,255,0.4), transparent)', marginLeft: 23 }} />
            <Step num={2} icon="🤝" title="Discovery call" desc="We schedule a free 30-minute strategy session to understand your goals." />
            <div style={{ width: 2, height: 20, background: 'linear-gradient(to bottom, rgba(0,71,255,0.4), transparent)', marginLeft: 23 }} />
            <Step num={3} icon="🚀" title="Launch & scale" desc="We build, launch, and continuously optimize your digital presence." />
          </div>

          <div style={{ display: 'flex', gap: 20, marginTop: 52 }}>
            {['🔒 Secure & private', '⚡ Fast onboarding', '💬 24/7 support'].map((badge) => (
              <div key={badge} style={{
                padding: '6px 12px',
                background: 'rgba(0,71,255,0.06)',
                border: '1px solid rgba(0,71,255,0.15)',
                borderRadius: 20,
                fontSize: 12,
                color: '#8892b0',
              }}>{badge}</div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div style={{
          width: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 48px',
          flexShrink: 0,
          overflowY: 'auto',
        }}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
              <div style={{ marginBottom: 20 }}>
                <Image src="/digiwolf-logo.svg" alt="Digi Wolf Agency" width={140} height={56} />
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px', textAlign: 'center' }}>
                Create Account
              </h1>
              <p style={{ color: '#8892b0', fontSize: 14, textAlign: 'center' }}>
                Start your free DigiWolf client portal
              </p>
            </div>

            {success ? (
              <div style={{
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 14, padding: '32px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Account Created!</h3>
                <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6 }}>
                  Check your email to confirm your account. Redirecting to login...
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 10, padding: '12px 16px', marginBottom: 20,
                    fontSize: 14, color: '#fca5a5',
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="Jan Novák"
                      required
                      style={fieldStyle('name')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      placeholder="jan@firma.cz"
                      required
                      style={fieldStyle('email')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused('')}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      style={fieldStyle('password')}
                    />
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} style={{
                          flex: 1, height: 3, borderRadius: 2,
                          background: password.length > i * 2
                            ? (password.length > 8 ? '#22c55e' : '#eab308')
                            : '#1e2a45',
                          transition: 'background 0.3s',
                        }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Company Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused('')}
                      placeholder="Your s.r.o. or a.s."
                      style={fieldStyle('company')}
                    />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 4 }}>
                    <div
                      onClick={() => setAgreed(!agreed)}
                      style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                        background: agreed ? '#0047FF' : 'transparent',
                        border: `2px solid ${agreed ? '#0047FF' : '#2a3a5c'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {agreed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L4 7L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.5 }}>
                      I agree to the{' '}
                      <a href="#" style={{ color: '#0047FF', textDecoration: 'none' }}>Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" style={{ color: '#0047FF', textDecoration: 'none' }}>Privacy Policy</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    style={{
                      width: '100%',
                      padding: '13px 0',
                      background: loading ? 'rgba(0,71,255,0.5)' : btnHover
                        ? 'linear-gradient(135deg, #0038cc, #0047FF)'
                        : 'linear-gradient(135deg, #0047FF, #1a5cff)',
                      border: 'none',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      transform: btnHover && !loading ? 'translateY(-1px)' : 'translateY(0)',
                      boxShadow: btnHover && !loading ? '0 8px 24px rgba(0,71,255,0.35)' : '0 4px 12px rgba(0,71,255,0.2)',
                      letterSpacing: '0.3px',
                      marginTop: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                        Creating account...
                      </>
                    ) : 'Create Account — Free'}
                  </button>
                </form>
              </>
            )}

            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#8892b0' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                onMouseEnter={() => setLoginHover(true)}
                onMouseLeave={() => setLoginHover(false)}
                style={{
                  color: loginHover ? '#3d74ff' : '#0047FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .register-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  )
}
