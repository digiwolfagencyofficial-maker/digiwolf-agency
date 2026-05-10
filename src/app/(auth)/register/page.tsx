'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    company: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name,
          company: formData.company,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    router.push('/login?registered=true')
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
        <h1 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Create Account
        </h1>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Join the Digi Wolf client portal
        </p>

        <form onSubmit={handleSubmit}>
          {[
            { key: 'full_name', label: 'Full Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'company', label: 'Company (optional)', type: 'text' },
            { key: 'password', label: 'Password', type: 'password' },
          ].map(({ key, label, type }) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#999', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                {label}
              </label>
              <input
                type={type}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                required={key !== 'company'}
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
          ))}

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
              marginTop: '0.5rem',
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
