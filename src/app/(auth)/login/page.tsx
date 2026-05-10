'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    router.push('/client')
  }

  return (
    <div
      style={{
        background: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid #1E1E1E',
          borderRadius: 12,
          padding: '2.5rem',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#0047FF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            🐺
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            Client Portal
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Sign in to your Digi Wolf account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#999', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0A0A0A',
                border: '1px solid #2A2A2A',
                borderRadius: 8,
                color: '#FFFFFF',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#999', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0A0A0A',
                border: '1px solid #2A2A2A',
                borderRadius: 8,
                color: '#FFFFFF',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#FF4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: '#0047FF',
              border: 'none',
              borderRadius: 8,
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
