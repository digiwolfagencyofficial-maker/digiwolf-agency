'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useClientProfile } from '@/hooks/useClientProfile'

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
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
  const { displayName, userInitial } = useClientProfile()
  const [profile, setProfile] = useState({ name: 'Martin Novák', email: 'martin@techcorp.cz', company: 'TechCorp s.r.o.', phone: '+420 777 123 456' })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [saved, setSaved] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)
  const [notifications, setNotifications] = useState({ projectUpdates: true, invoices: true, messages: true, marketing: false })

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault()
    setPwSaved(true)
    setPasswords({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 3000)
  }

  return (
    <DashboardLayout navItems={clientNav} role="client" userName={displayName} userInitial={userInitial}>
      <div style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px' }}>Account Settings</h1>
          <p style={{ color: '#8892b0', fontSize: 14 }}>Manage your profile, password, and notification preferences.</p>
        </div>

        {/* Profile */}
        <SettingSection title="Profile Information">
          <form onSubmit={handleProfileSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FieldGroup label="Full Name">
                <input style={inputStyle} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
              </FieldGroup>
              <FieldGroup label="Email Address">
                <input type="email" style={inputStyle} value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
              </FieldGroup>
              <FieldGroup label="Company">
                <input style={inputStyle} value={profile.company} onChange={e => setProfile(p => ({ ...p, company: e.target.value }))}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
              </FieldGroup>
              <FieldGroup label="Phone">
                <input type="tel" style={inputStyle} value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#0047FF'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e2a45'} />
              </FieldGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <button type="submit" style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Save Changes
              </button>
              {saved && <span style={{ fontSize: 13, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}>✓ Saved successfully</span>}
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
              <button type="submit" style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Update Password
              </button>
              {pwSaved && <span style={{ fontSize: 13, color: '#22c55e' }}>✓ Password updated</span>}
            </div>
          </form>
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notification Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'projectUpdates', label: 'Project Updates', desc: 'Get notified when your project status changes or milestones are reached' },
              { key: 'invoices', label: 'Invoice Notifications', desc: 'Receive alerts for new invoices and payment confirmations' },
              { key: 'messages', label: 'New Messages', desc: 'Get notified when you receive a new message from the team' },
              { key: 'marketing', label: 'Marketing & Tips', desc: 'Occasional updates, tips, and news from DigiWolf' },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid #0d1a35' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#4a5678' }}>{item.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                  style={{
                    width: 44, height: 24, borderRadius: 12, flexShrink: 0, marginLeft: 16,
                    background: notifications[item.key as keyof typeof notifications] ? '#0047FF' : '#1e2a45',
                    border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    transition: 'left 0.2s',
                    left: notifications[item.key as keyof typeof notifications] ? 23 : 3,
                  }} />
                </button>
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Danger Zone */}
        <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f87171', marginBottom: 8 }}>Danger Zone</h2>
          <p style={{ fontSize: 14, color: '#8892b0', marginBottom: 20, lineHeight: 1.6 }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 10, color: '#f87171', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
