'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useClientProfile } from '@/hooks/useClientProfile'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
]

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #0d1a35' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  )
}

function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: 12, color: '#4a5678', marginTop: 6 }}>{hint}</p>}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', boxSizing: 'border-box',
  background: '#0a1020', border: '1px solid #1e2a45',
  borderRadius: 10, color: '#f0f4ff', fontSize: 14, outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'Inter, system-ui, sans-serif',
}

export function DashboardSettingsPage() {
  const { profile: loadedProfile, email, loading, refresh } = useClientProfile()
  const [profile, setProfile] = useState({ name: '' })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    if (loadedProfile) {
      setProfile({ name: loadedProfile.full_name ?? '' })
    }
  }, [loadedProfile])

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveError('')
    setSaved(false)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: profile.name }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save changes')
      }
      refresh()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    setPwSaved(false)

    if (passwords.newPass.length < 8) {
      setPwError('New password must be at least 8 characters.')
      return
    }
    if (passwords.newPass !== passwords.confirm) {
      setPwError('New passwords do not match.')
      return
    }
    if (!passwords.current) {
      setPwError('Please enter your current password.')
      return
    }
    if (!email) {
      setPwError('Could not verify your account. Please refresh and try again.')
      return
    }

    setPwSaving(true)
    try {
      const supabase = createSupabaseBrowserClient()
      // Re-authenticate with the current password before allowing a change.
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email,
        password: passwords.current,
      })
      if (reauthError) {
        setPwError('Current password is incorrect.')
        return
      }
      const { error: updateError } = await supabase.auth.updateUser({ password: passwords.newPass })
      if (updateError) {
        setPwError(updateError.message)
        return
      }
      setPwSaved(true)
      setPasswords({ current: '', newPass: '', confirm: '' })
      setTimeout(() => setPwSaved(false), 3000)
    } catch {
      setPwError('Something went wrong. Please try again.')
    } finally {
      setPwSaving(false)
    }
  }

  return (
    <DashboardLayout navItems={clientNav}>
      <div style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px' }}>Account Settings</h1>
          <p style={{ color: '#8892b0', fontSize: 14 }}>Manage your profile and password.</p>
        </div>

        {/* Profile */}
        <SettingSection title="Profile Information">
          <form onSubmit={handleProfileSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FieldGroup label="Full Name">
                <input style={inputStyle} value={profile.name} placeholder={loading ? 'Loading…' : 'Your name'}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
              </FieldGroup>
              <FieldGroup label="Email Address" hint="Contact us to change your email.">
                <input type="email" readOnly disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                  value={email ?? ''} placeholder={loading ? 'Loading…' : ''} />
              </FieldGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <button type="submit" disabled={saving || loading} style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: saving || loading ? 'not-allowed' : 'pointer', opacity: saving || loading ? 0.6 : 1, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              {saved && <span style={{ fontSize: 13, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}>✓ Saved successfully</span>}
              {saveError && <span style={{ fontSize: 13, color: '#f87171' }}>{saveError}</span>}
            </div>
          </form>
        </SettingSection>

        {/* Password */}
        <SettingSection title="Change Password">
          <form onSubmit={handlePasswordSave}>
            <FieldGroup label="Current Password">
              <input type="password" style={inputStyle} value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} placeholder="••••••••"
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
            </FieldGroup>
            <FieldGroup label="New Password" hint="Minimum 8 characters">
              <input type="password" style={inputStyle} value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} placeholder="••••••••"
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
            </FieldGroup>
            <FieldGroup label="Confirm New Password">
              <input type="password" style={inputStyle} value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} placeholder="••••••••"
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
            </FieldGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="submit" disabled={pwSaving} style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: pwSaving ? 'not-allowed' : 'pointer', opacity: pwSaving ? 0.6 : 1, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {pwSaving ? 'Updating…' : 'Update Password'}
              </button>
              {pwSaved && <span style={{ fontSize: 13, color: '#22c55e' }}>✓ Password updated</span>}
              {pwError && <span style={{ fontSize: 13, color: '#f87171' }}>{pwError}</span>}
            </div>
          </form>
        </SettingSection>
      </div>
    </DashboardLayout>
  )
}
