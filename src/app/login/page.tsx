'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/admin')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
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
        {/* Glow effects */}
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,71,255,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(0,71,255,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 420, width: '100%' }}>
          {/* Quote */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 48, color: '#0047FF', lineHeight: 1, marginBottom: 16, opacity: 0.6 }}>&ldquo;</div>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
              DigiWolf transformed our online presence completely. The client portal makes it incredibly easy to track progress and communicate with the team.
            </p>
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0047FF, #00c6ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff' }}>M</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>Martin Novák</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>CEO, TechStart Praha</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            {[['47+', 'Clients'], ['98%', 'Satisfaction'], ['6 days', 'Avg. delivery']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#0047FF', marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div style={{
        width: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 48px',
        background: '#030712',
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          {/* Logo — icon only, transparent */}
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

          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f4ff', textAlign: 'center', margin: '0 0 8px' }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 32px' }}>Sign in to your DigiWolf admin portal</p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#f87171', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@company.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: emailFocused ? '#0d1528' : '#0a1020',
                  border: `1.5px solid ${emailFocused ? '#0047FF' : '#1e2a45'}`,
                  borderRadius: 10,
                  color: '#f0f4ff',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: passwordFocused ? '#0d1528' : '#0a1020',
                  border: `1.5px solid ${passwordFocused ? '#0047FF' : '#1e2a45'}`,
                  borderRadius: 10,
                  color: '#f0f4ff',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
              />
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
                transition: 'all 0.2s',
                marginBottom: 16,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: '#1e2a45' }} />
              <span style={{ fontSize: 12, color: '#64748b' }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#1e2a45' }} />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{
                width: '100%',
                padding: '12px',
                background: 'transparent',
                border: '1.5px solid #1e2a45',
                borderRadius: 10,
                color: '#f0f4ff',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.2s',
                marginBottom: 28,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: 0 }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#0047FF', fontWeight: 600, textDecoration: 'none' }}>
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
