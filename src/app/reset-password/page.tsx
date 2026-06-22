'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { establishSessionFromUrlHash } from '@/lib/auth-hash'
import { friendlyAuthError } from '@/lib/auth-errors'
import { getPasswordStrength } from '@/lib/password-strength'
import { AuthShell, AuthHeader, PasswordField, SubmitButton, Banner } from '@/components/auth/AuthShell'

type Status = 'checking' | 'ready' | 'invalid'

/** Read a Supabase error carried in the URL hash (e.g. expired recovery link). */
function readHashError(): string | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash
  if (!hash.includes('error')) return null
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const code = params.get('error_code')
  const desc = params.get('error_description')
  if (code === 'otp_expired' || (desc && /expired/i.test(desc))) {
    return 'This reset link has expired. Request a new one below.'
  }
  if (params.get('error')) {
    return 'This reset link is invalid or has already been used.'
  }
  return null
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [status, setStatus] = useState<Status>('checking')
  const [invalidReason, setInvalidReason] = useState('This link is invalid or has expired.')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true

    const sync = (hasSession: boolean) => {
      if (!active) return
      setStatus(hasSession ? 'ready' : 'invalid')
    }

    ;(async () => {
      const hashError = readHashError()
      if (hashError) {
        if (active) {
          setInvalidReason(hashError)
          setStatus('invalid')
        }
        return
      }
      try {
        // The global AuthHashRedirect may consume the hash first; that's fine —
        // it sets the same session, which getSession() then returns.
        await establishSessionFromUrlHash(supabase)
      } catch {
        if (active) {
          setInvalidReason('This reset link is invalid or has expired.')
          setStatus('invalid')
        }
        return
      }
      const { data } = await supabase.auth.getSession()
      sync(Boolean(data.session))
    })()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) sync(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const strength = getPasswordStrength(password)

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
    setLoading(true)
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        setError(friendlyAuthError(updateError.message))
        setLoading(false)
        return
      }
      // Sign out the temporary recovery session so the user logs in fresh.
      await supabase.auth.signOut().catch(() => {})
      router.push('/login?reset=success')
    } catch {
      setError('Network error — please try again.')
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <AuthHeader title="Set a new password" subtitle="Choose a strong password to secure your account." />

      {status === 'checking' && (
        <p style={{ color: '#64748b', fontSize: 14, textAlign: 'center', padding: '12px 0' }}>Verifying your reset link…</p>
      )}

      {status === 'invalid' && (
        <>
          <Banner tone="error">{invalidReason}</Banner>
          <Link
            href="/forgot-password"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
              padding: '14px', background: 'linear-gradient(135deg, #0047FF, #0066ff)', borderRadius: 10,
              color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 24px rgba(0,71,255,0.3)',
            }}
          >
            Request a new link
          </Link>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', margin: '24px 0 0' }}>
            <Link href="/login" style={{ color: '#3d74ff', fontWeight: 600, textDecoration: 'none' }}>← Back to sign in</Link>
          </p>
        </>
      )}

      {status === 'ready' && (
        <form onSubmit={handleSubmit} noValidate>
          {error && <Banner tone="error">{error}</Banner>}

          <PasswordField
            label="New password"
            value={password}
            onChange={setPassword}
            placeholder="At least 8 characters"
            required
            autoComplete="new-password"
            showStrength
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            placeholder="Re-enter your password"
            required
            autoComplete="new-password"
            invalid={confirm.length > 0 && confirm !== password}
            hint={confirm.length > 0 && confirm !== password ? 'Passwords don’t match yet.' : undefined}
          />

          <div style={{ marginTop: 8 }}>
            <SubmitButton loading={loading} loadingLabel="Updating…">Update password</SubmitButton>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
