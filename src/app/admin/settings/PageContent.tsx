'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { COMPANY, companyFullAddress } from '@/lib/company'
import { useClientProfile } from '@/hooks/useClientProfile'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const adminNav = [
  { icon: '⬡', label: 'Overview', href: '/admin' },
  { icon: '👥', label: 'Clients', href: '/admin/clients' },
  { icon: '📋', label: 'Projects', href: '/admin/projects' },
  { icon: '🧾', label: 'Invoices', href: '/admin/invoices' },
  { icon: '🎯', label: 'Leads', href: '/admin/leads' },
  { icon: '📅', label: 'Bookings', href: '/admin/bookings' },
  { icon: '📊', label: 'Analytics', href: '/admin/analytics' },
  { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
  { icon: '🛠', label: 'Setup', href: '/admin/setup' },
  { icon: '🚪', label: 'Logout', href: '/logout' },
]

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #0f172a' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', boxSizing: 'border-box',
  background: '#0a1020', border: '1px solid #1e2a45',
  borderRadius: 10, color: '#f0f4ff', fontSize: 14, outline: 'none',
  transition: 'border-color 0.2s', fontFamily: 'Inter, system-ui, sans-serif',
}

export function AdminSettingsPage() {
  const { profile: loadedProfile, email, loading, refresh } = useClientProfile()
  const [account, setAccount] = useState({ name: '' })
  const [accountSaved, setAccountSaved] = useState(false)
  const [accountSaving, setAccountSaving] = useState(false)
  const [accountError, setAccountError] = useState('')
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [pwSaved, setPwSaved] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    if (loadedProfile) setAccount({ name: loadedProfile.full_name ?? '' })
  }, [loadedProfile])

  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setAccountSaving(true)
    setAccountError('')
    setAccountSaved(false)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: account.name }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save changes')
      }
      refresh()
      setAccountSaved(true)
      setTimeout(() => setAccountSaved(false), 3000)
    } catch (err) {
      setAccountError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setAccountSaving(false)
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

  const [agency, setAgency] = useState({
    name: COMPANY.legalName,
    email: COMPANY.email,
    phone: COMPANY.phone,
    currency: 'CZK',
    address: companyFullAddress,
    website: 'https://digiwolf.agency',
  })
  const [saved, setSaved] = useState(false)

  const handleAgencySave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = '#0047FF'
  }
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = '#1e2a45'
  }

  return (
    <DashboardLayout navItems={adminNav}>
      <div style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>Configuration</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>Agency Settings</h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>Manage your account and agency profile.</p>
        </div>

        {/* Your Account */}
        <SettingSection title="Your Account">
          <form onSubmit={handleAccountSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Full Name</label>
                <input
                  style={inputStyle}
                  value={account.name}
                  placeholder={loading ? 'Loading…' : 'Your name'}
                  onChange={e => setAccount({ name: e.target.value })}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Email Address</label>
                <input
                  type="email"
                  readOnly
                  disabled
                  style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                  value={email ?? ''}
                  placeholder={loading ? 'Loading…' : ''}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <button type="submit" disabled={accountSaving || loading} style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: accountSaving || loading ? 'not-allowed' : 'pointer', opacity: accountSaving || loading ? 0.6 : 1, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {accountSaving ? 'Saving…' : 'Save Changes'}
              </button>
              {accountSaved && <span style={{ fontSize: 13, color: '#22c55e' }}>✓ Saved successfully</span>}
              {accountError && <span style={{ fontSize: 13, color: '#f87171' }}>{accountError}</span>}
            </div>
          </form>
        </SettingSection>

        {/* Change Password */}
        <SettingSection title="Change Password">
          <form onSubmit={handlePasswordSave}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Current Password</label>
              <input type="password" style={inputStyle} value={passwords.current} placeholder="••••••••"
                onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>New Password</label>
                <input type="password" style={inputStyle} value={passwords.newPass} placeholder="••••••••"
                  onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Confirm New Password</label>
                <input type="password" style={inputStyle} value={passwords.confirm} placeholder="••••••••"
                  onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="submit" disabled={pwSaving} style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: pwSaving ? 'not-allowed' : 'pointer', opacity: pwSaving ? 0.6 : 1, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {pwSaving ? 'Updating…' : 'Update Password'}
              </button>
              {pwSaved && <span style={{ fontSize: 13, color: '#22c55e' }}>✓ Password updated</span>}
              {pwError && <span style={{ fontSize: 13, color: '#f87171' }}>{pwError}</span>}
            </div>
          </form>
        </SettingSection>

        {/* Agency Info */}
        <SettingSection title="Agency Information">
          <form onSubmit={handleAgencySave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Agency Name</label>
                <input
                  style={inputStyle}
                  value={agency.name}
                  onChange={e => setAgency(p => ({ ...p, name: e.target.value }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Contact Email</label>
                <input
                  type="email"
                  style={inputStyle}
                  value={agency.email}
                  onChange={e => setAgency(p => ({ ...p, email: e.target.value }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Phone Number</label>
                <input
                  type="tel"
                  style={inputStyle}
                  value={agency.phone}
                  onChange={e => setAgency(p => ({ ...p, phone: e.target.value }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Default Currency</label>
                <select
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  value={agency.currency}
                  onChange={e => setAgency(p => ({ ...p, currency: e.target.value }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                >
                  <option value="CZK">CZK — Czech Koruna</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="USD">USD — US Dollar</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Office Address</label>
                <input
                  style={inputStyle}
                  value={agency.address}
                  onChange={e => setAgency(p => ({ ...p, address: e.target.value }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 6 }}>Website URL</label>
                <input
                  type="url"
                  style={inputStyle}
                  value={agency.website}
                  onChange={e => setAgency(p => ({ ...p, website: e.target.value }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <button type="submit" style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Save Changes
              </button>
              {saved && <span style={{ fontSize: 13, color: '#22c55e' }}>✓ Saved successfully</span>}
            </div>
          </form>
        </SettingSection>
      </div>
    </DashboardLayout>
  )
}
