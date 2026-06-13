'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { COMPANY, companyFullAddress } from '@/lib/company'

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
  const [agency, setAgency] = useState({
    name: COMPANY.legalName,
    email: COMPANY.email,
    phone: COMPANY.phone,
    currency: 'CZK',
    address: companyFullAddress,
    website: 'https://digiwolf.agency',
  })
  const [notifications, setNotifications] = useState({
    newLead: true,
    projectUpdate: true,
    invoicePaid: true,
    weeklyReport: false,
    systemAlerts: true,
  })
  const [saved, setSaved] = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)

  const handleAgencySave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleNotifSave = (e: React.FormEvent) => {
    e.preventDefault()
    setNotifSaved(true)
    setTimeout(() => setNotifSaved(false), 3000)
  }

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = '#0047FF'
  }
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = '#1e2a45'
  }

  return (
    <DashboardLayout navItems={adminNav} role="admin" userName="Digi Wolf Admin" userInitial="D">
      <div style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>Configuration</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>Agency Settings</h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>Manage your agency profile, defaults, and notification preferences.</p>
        </div>

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

        {/* Notification Preferences */}
        <SettingSection title="Notification Preferences">
          <form onSubmit={handleNotifSave}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { key: 'newLead', label: 'New Lead Alert', desc: 'Get notified instantly when a new lead submits the contact form' },
                { key: 'projectUpdate', label: 'Project Status Changes', desc: 'Receive alerts when project milestones are updated' },
                { key: 'invoicePaid', label: 'Invoice Paid', desc: 'Get notified when a client pays an invoice' },
                { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'Receive a weekly digest of leads, revenue, and project status' },
                { key: 'systemAlerts', label: 'System Alerts', desc: 'Critical system notifications and security alerts' },
              ].map((item, idx, arr) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: idx < arr.length - 1 ? '1px solid #0f172a' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                    style={{
                      width: 44, height: 24, borderRadius: 12, flexShrink: 0, marginLeft: 24,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button type="submit" style={{ padding: '10px 24px', background: '#0047FF', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Save Preferences
              </button>
              {notifSaved && <span style={{ fontSize: 13, color: '#22c55e' }}>✓ Preferences saved</span>}
            </div>
          </form>
        </SettingSection>

        {/* Danger Zone */}
        <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f87171', marginBottom: 8 }}>Danger Zone</h2>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
            Reset all agency settings to defaults or export all data. These actions are irreversible.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(100,116,139,0.4)', borderRadius: 10, color: '#94a3b8', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
              Export All Data
            </button>
            <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 10, color: '#f87171', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
