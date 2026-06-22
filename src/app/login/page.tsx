'use client'

import { Suspense, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { postLoginRedirect, safeCallbackUrl } from '@/lib/auth-utils'
import { friendlyAuthError } from '@/lib/auth-errors'
import {
  AuthShell,
  AuthHeader,
  AuthField,
  PasswordField,
  SubmitButton,
  GoogleButton,
  OrDivider,
  Banner,
} from '@/components/auth/AuthShell'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const resetDone = searchParams.get('reset') === 'success'
  const linkError = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(friendlyAuthError(error.message))
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle()
        router.push(postLoginRedirect(profile?.role, callbackUrl))
      }
    } catch {
      setError('Network error — check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const next = safeCallbackUrl(callbackUrl)
    const redirectTo = next
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      : `${window.location.origin}/auth/callback`
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
  }

  return (
    <AuthShell>
      <AuthHeader title="Welcome back" subtitle="Sign in to your Digi Wolf account." />

      {resetDone && <Banner tone="success">Password updated. Sign in with your new password.</Banner>}
      {linkError && !resetDone && (
        <Banner tone="error">Your link was invalid or has expired. Please sign in or request a new reset link.</Banner>
      )}
      {error && <Banner tone="error">{error}</Banner>}

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

        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          labelAction={
            <Link href="/forgot-password" style={{ fontSize: 13, color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>
              Forgot password?
            </Link>
          }
        />

        <div style={{ marginTop: 8 }}>
          <SubmitButton loading={loading} loadingLabel="Signing in…">Sign In</SubmitButton>
        </div>

        <OrDivider />
        <GoogleButton onClick={handleGoogleSignIn} />
      </form>

      <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: '24px 0 0' }}>
        Don&apos;t have an account?{' '}
        <Link href="/register" style={{ color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>Create one free →</Link>
      </p>
    </AuthShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#64748b', fontFamily: 'Inter, system-ui, sans-serif' }}>Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
