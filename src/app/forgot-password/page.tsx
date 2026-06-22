'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { AuthShell, AuthHeader, AuthField, SubmitButton, Banner } from '@/components/auth/AuthShell'

/** Cooldown (seconds) before another reset request can be sent. */
const RESEND_COOLDOWN = 30

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const lastSentRef = useRef(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Debounce: ignore rapid double-submits / spam.
    if (loading || cooldown > 0) return
    const now = Date.now()
    if (now - lastSentRef.current < 1500) return
    lastSentRef.current = now

    setLoading(true)
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
    } catch {
      // Swallow errors on purpose — we never reveal whether the account exists.
    } finally {
      setLoading(false)
      setSubmitted(true)
      setCooldown(RESEND_COOLDOWN)
    }
  }

  return (
    <AuthShell>
      <AuthHeader
        title="Reset your password"
        subtitle="Enter your email and we’ll send you a secure link to set a new password."
      />

      {submitted ? (
        <>
          <Banner tone="success">
            If an account exists for <strong>{email}</strong>, a reset link is on its way. It expires in 60 minutes — check your inbox and spam folder.
          </Banner>
          <form onSubmit={handleSubmit} noValidate>
            <SubmitButton loading={loading} loadingLabel="Sending…" disabled={cooldown > 0}>
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend link'}
            </SubmitButton>
          </form>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: '24px 0 0' }}>
            <Link href="/login" style={{ color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>← Back to sign in</Link>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} noValidate>
            <AuthField
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              required
              autoComplete="email"
            />
            <div style={{ marginTop: 8 }}>
              <SubmitButton loading={loading} loadingLabel="Sending…">Send reset link</SubmitButton>
            </div>
          </form>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: '24px 0 0' }}>
            Remember your password?{' '}
            <Link href="/login" style={{ color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
