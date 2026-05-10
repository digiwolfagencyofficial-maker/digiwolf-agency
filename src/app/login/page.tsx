'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const [googleHover, setGoogleHover] = useState(false)
  const [forgotHover, setForgotHover] = useState(false)
  const [registerHover, setRegisterHover] = useState(false)

  const fieldStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    background: focused ? '#0d1528' : '#0a1020',
    border: `1.5px solid ${focused ? '#0047FF' : '#1e2a45'}`,
    borderRadius: 10,
    color: '#f0f4ff',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
  })

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
        }} className="login-left-panel">
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: '20%', left: '10%',
            width: 320, height: 320,
            background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '15%', right: '5%',
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(0,71,255,0.07) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
            <Image src="/digiwolf-logo.svg" alt="Digi Wolf Agency" width={140} height={56} priority />
          </div>

          {/* Headline */}
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, letterSpacing: '-1px' }}>
            Your digital growth<br />
            <span style={{ color: '#0047FF' }}>starts here.</span>
          </h2>
          <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, marginBottom: 56, maxWidth: 380 }}>
            Access your client portal, track projects, manage invoices, and collaborate with our team — all in one place.
          </p>

          {/* Testimonial */}
          <div style={{
            background: 'rgba(0,71,255,0.06)',
            border: '1px solid rgba(0,71,255,0.18)',
            borderRadius: 16,
            padding: '28px 32px',
            marginBottom: 48,
            position: 'relative',
          }}>
            <div style={{ fontSize: 48, color: '#0047FF', opacity: 0.4, lineHeight: 1, marginBottom: 8 }}>"</div>
            <p style={{ color: '#c8d0e0', fontSize: 15, lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>
              DigiWolf transformed our online presence completely. The client portal makes it incredibly easy to track progress and communicate with the team. Best investment we've made this year.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, color: '#fff',
              }}>M</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>Martin Novák</div>
                <div style={{ fontSize: 13, color: '#8892b0' }}>CEO, TechStart Praha</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40 }}>
            {[
              { value: '47+', label: 'Happy Clients' },
              { value: '120+', label: 'Projects Done' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#0047FF', marginBottom: 2 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#8892b0' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div style={{
          width: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 48px',
          flexShrink: 0,
        }}>
          <div style={{ width: '100%', maxWidth: 380 }}>
            {/* Logo + title */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
              <div style={{ marginBottom: 20 }}>
                <Image src="/digiwolf-logo.svg" alt="Digi Wolf Agency" width={140} height={56} />
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px', textAlign: 'center' }}>
                Welcome Back
              </h1>
              <p style={{ color: '#8892b0', fontSize: 14, textAlign: 'center' }}>
                Sign in to your DigiWolf client portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="you@company.com"
                  style={fieldStyle(emailFocused)}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#8892b0' }}>Password</label>
                  <a
                    href="#"
                    onMouseEnter={() => setForgotHover(true)}
                    onMouseLeave={() => setForgotHover(false)}
                    style={{ fontSize: 13, color: forgotHover ? '#3d74ff' : '#0047FF', textDecoration: 'none', transition: 'color 0.2s' }}
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="••••••••"
                  style={fieldStyle(passwordFocused)}
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  width: '100%',
                  padding: '13px 0',
                  background: btnHover
                    ? 'linear-gradient(135deg, #0038cc, #0047FF)'
                    : 'linear-gradient(135deg, #0047FF, #1a5cff)',
                  border: 'none',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: btnHover ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: btnHover ? '0 8px 24px rgba(0,71,255,0.35)' : '0 4px 12px rgba(0,71,255,0.2)',
                  letterSpacing: '0.3px',
                  marginTop: 4,
                }}
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#1e2a45' }} />
              <span style={{ color: '#8892b0', fontSize: 13 }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#1e2a45' }} />
            </div>

            {/* Google OAuth button */}
            <button
              onMouseEnter={() => setGoogleHover(true)}
              onMouseLeave={() => setGoogleHover(false)}
              style={{
                width: '100%',
                padding: '12px 0',
                background: googleHover ? '#0f1628' : '#0a1020',
                border: `1.5px solid ${googleHover ? '#2a3a5c' : '#1e2a45'}`,
                borderRadius: 10,
                color: '#f0f4ff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Register link */}
            <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: '#8892b0' }}>
              Don't have an account?{' '}
              <Link
                href="/register"
                onMouseEnter={() => setRegisterHover(true)}
                onMouseLeave={() => setRegisterHover(false)}
                style={{
                  color: registerHover ? '#3d74ff' : '#0047FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  )
}
