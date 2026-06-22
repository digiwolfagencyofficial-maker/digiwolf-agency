'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { friendlyAuthError } from '@/lib/auth-errors'
import { getPasswordStrength } from '@/lib/password-strength'
import {
  AuthShell,
  AuthHeader,
  AuthField,
  PasswordField,
  SubmitButton,
  GoogleButton,
  OrDivider,
  Banner,
  authColors,
} from '@/components/auth/AuthShell'

export default function RegisterPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const termsId = useId()
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const strength = getPasswordStrength(password)
  const passwordsMatch = confirm.length === 0 || confirm === password
  const canSubmit = strength.acceptable && confirm === password && agreed && email.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!strength.acceptable) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords don’t match. Please re-enter them.')
      return
    }
    if (!agreed) {
      setError('Please accept the Terms and Privacy Policy to continue.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, company },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        setError(friendlyAuthError(error.message))
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Network error — check your connection and try again.')
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

  if (success) {
    return (
      <AuthShell>
        <AuthHeader title="Check your email" subtitle="One quick step to activate your account." />
        <Banner tone="success">
          We’ve sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and sign in.
        </Banner>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: '8px 0 0' }}>
          <Link href="/login" style={{ color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>← Back to sign in</Link>
        </p>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <AuthHeader title="Create your account" subtitle="Free to join. No credit card required." />

      {error && <Banner tone="error">{error}</Banner>}

      <form onSubmit={handleSubmit} noValidate>
        <AuthField label="Full name" value={name} onChange={setName} placeholder="Your name" autoComplete="name" />
        <AuthField label="Company (optional)" value={company} onChange={setCompany} placeholder="Your company s.r.o." autoComplete="organization" />
        <AuthField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@company.com" required autoComplete="email" />
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          required
          autoComplete="new-password"
          showStrength
        />
        <PasswordField
          label="Confirm password"
          value={confirm}
          onChange={setConfirm}
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
          invalid={!passwordsMatch}
          hint={!passwordsMatch ? 'Passwords don’t match yet.' : undefined}
        />

        <label htmlFor={termsId} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, margin: '4px 0 20px', cursor: 'pointer' }}>
          <input
            id={termsId}
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ width: 16, height: 16, marginTop: 2, accentColor: authColors.ACCENT, cursor: 'pointer', flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
            I agree to the{' '}
            <Link href="/terms" style={{ color: '#3d74ff', textDecoration: 'underline' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: '#3d74ff', textDecoration: 'underline' }}>Privacy Policy</Link>.
          </span>
        </label>

        <SubmitButton loading={loading} loadingLabel="Creating account…" disabled={!canSubmit}>
          Create free account
        </SubmitButton>

        <OrDivider />
        <GoogleButton onClick={handleGoogleSignIn} label="Sign up with Google" />
      </form>

      <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: '24px 0 0' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link>
      </p>
    </AuthShell>
  )
}
