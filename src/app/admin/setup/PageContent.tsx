'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

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

const SQL = `create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text not null, -- 'website' | 'sro' | 'ai' | 'app' | 'general'
  message text,
  preferred_date date not null,
  preferred_time text not null, -- '09:00' | '10:00' | '11:00' | '14:00' | '15:00' | '16:00'
  status text default 'pending', -- 'pending' | 'confirmed' | 'cancelled'
  google_event_id text,
  created_at timestamptz default now(),
  updated_at timestamptz
);
alter table bookings enable row level security;
create policy "Anyone can insert" on bookings for insert with check (true);
create policy "Admin can read all" on bookings for select using (auth.role() = 'authenticated');
create policy "Admin can update" on bookings for update using (auth.role() = 'authenticated');`

const GOOGLE_CLIENT_ID = typeof window === 'undefined' ? undefined : undefined

const sectionStyle: React.CSSProperties = {
  background: '#040d1f',
  border: '1px solid #0d1a35',
  borderRadius: 16,
  padding: '32px',
  marginBottom: 24,
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, color: '#8892b0',
  marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '11px 14px',
  color: '#f0f4ff', fontSize: 14, outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
}

export default function SetupPageContent() {
  const [copied, setCopied] = useState(false)
  const [testForm, setTestForm] = useState({ name: '', email: '', service: 'general', date: '', time: '09:00' })
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null)
  const [testing, setTesting] = useState(false)

  const copySQL = async () => {
    await navigator.clipboard.writeText(SQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTest = async () => {
    if (!testForm.name || !testForm.email || !testForm.date || !testForm.time) {
      setTestResult({ ok: false, msg: 'All fields required.' })
      return
    }
    setTesting(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testForm.name,
          email: testForm.email,
          service: testForm.service,
          preferred_date: testForm.date,
          preferred_time: testForm.time,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setTestResult({ ok: true, msg: `Booking created! Ref: #${data.ref}` })
      } else {
        setTestResult({ ok: false, msg: data.error || 'Error creating booking.' })
      }
    } catch {
      setTestResult({ ok: false, msg: 'Network error.' })
    } finally {
      setTesting(false)
    }
  }

  return (
    <DashboardLayout navItems={adminNav}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0f4ff', margin: '0 0 6px' }}>Setup Guide</h1>
          <p style={{ color: '#8892b0', fontSize: 14, margin: 0 }}>Supabase migration, Google Calendar OAuth, and test booking</p>
        </div>

        {/* Section 1: Supabase */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', margin: 0 }}>1. Supabase Setup</h2>
            <span style={{
              background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.4)',
              color: '#00c864', padding: '5px 14px', borderRadius: 100,
              fontSize: 12, fontWeight: 700,
            }}>
              ✅ Connected
            </span>
          </div>

          <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, margin: '0 0 20px' }}>
            Run this SQL in your <strong style={{ color: '#93c5fd' }}>Supabase Dashboard → SQL Editor</strong> to create the bookings table.
          </p>

          <div style={{ position: 'relative' }}>
            <pre style={{
              background: '#020812', border: '1px solid #0d1a35', borderRadius: 12,
              padding: '20px', fontSize: 12, lineHeight: 1.7, color: '#93c5fd',
              overflow: 'auto', margin: 0, fontFamily: 'monospace',
            }}>
              {SQL}
            </pre>
            <button
              onClick={copySQL}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: copied ? 'rgba(0,200,100,0.15)' : 'rgba(255,255,255,0.07)',
                border: copied ? '1px solid rgba(0,200,100,0.4)' : '1px solid rgba(255,255,255,0.12)',
                color: copied ? '#00c864' : '#8892b0',
                borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          <p style={{ color: '#4b5563', fontSize: 13, marginTop: 14, margin: '14px 0 0' }}>
            Paste into <strong style={{ color: '#8892b0' }}>Supabase Dashboard → SQL Editor → New query → Run</strong>
          </p>
        </div>

        {/* Section 2: Google Calendar */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', margin: 0 }}>2. Google Calendar Setup</h2>
            <span style={{
              background: 'rgba(107,114,128,0.12)', border: '1px solid rgba(107,114,128,0.3)',
              color: '#9ca3af', padding: '5px 14px', borderRadius: 100,
              fontSize: 12, fontWeight: 700,
            }}>
              ⚙ Not connected
            </span>
          </div>

          <ol style={{ color: '#c8d3f0', fontSize: 14, lineHeight: 2, paddingLeft: 20, margin: '0 0 24px' }}>
            <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3d74ff' }}>Google Cloud Console</a> → Create new project <strong>&quot;Digi Wolf Agency&quot;</strong></li>
            <li>Enable <strong>&quot;Google Calendar API&quot;</strong></li>
            <li>Go to <strong>APIs &amp; Services → Credentials → Create OAuth 2.0 Client ID</strong> (Web Application)</li>
            <li>Add Authorized redirect URI: <code style={{ background: 'rgba(0,71,255,0.1)', padding: '2px 8px', borderRadius: 6, color: '#93c5fd', fontSize: 12 }}>https://digiwolf-agency.vercel.app/api/auth/google/callback</code></li>
            <li>Copy Client ID + Secret → add to Vercel env vars: <code style={{ background: 'rgba(0,71,255,0.1)', padding: '2px 6px', borderRadius: 5, color: '#93c5fd', fontSize: 12 }}>GOOGLE_CLIENT_ID</code>, <code style={{ background: 'rgba(0,71,255,0.1)', padding: '2px 6px', borderRadius: 5, color: '#93c5fd', fontSize: 12 }}>GOOGLE_CLIENT_SECRET</code>, <code style={{ background: 'rgba(0,71,255,0.1)', padding: '2px 6px', borderRadius: 5, color: '#93c5fd', fontSize: 12 }}>GOOGLE_REDIRECT_URI</code></li>
            <li>Redeploy, then click <strong>&quot;Authorize Google Calendar&quot;</strong> below</li>
            <li>Copy the refresh token shown → add to Vercel as <code style={{ background: 'rgba(0,71,255,0.1)', padding: '2px 6px', borderRadius: 5, color: '#93c5fd', fontSize: 12 }}>GOOGLE_REFRESH_TOKEN</code> → redeploy</li>
          </ol>

          <a
            href="/api/auth/google?secret=digiwolf2025"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0047FF', color: '#fff', textDecoration: 'none',
              padding: '11px 22px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,71,255,0.35)',
            }}
          >
            Authorize Google Calendar →
          </a>
        </div>

        {/* Section 3: Test Booking */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', margin: '0 0 20px' }}>3. Test Booking</h2>
          <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 20px' }}>
            Send a test booking to verify the API and Supabase integration are working.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={testForm.name}
                  onChange={e => setTestForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Test User"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={testForm.email}
                  onChange={e => setTestForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="test@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Service</label>
                <select
                  value={testForm.service}
                  onChange={e => setTestForm(f => ({ ...f, service: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="general">Discovery Call</option>
                  <option value="website">Website Project</option>
                  <option value="sro">S.R.O. Formation</option>
                  <option value="ai">AI Automation</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  value={testForm.date}
                  onChange={e => setTestForm(f => ({ ...f, date: e.target.value }))}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <select
                  value={testForm.time}
                  onChange={e => setTestForm(f => ({ ...f, time: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleTest}
            disabled={testing}
            style={{
              marginTop: 20,
              background: testing ? 'rgba(0,71,255,0.5)' : '#0047FF',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '12px 24px', fontSize: 14, fontWeight: 700,
              cursor: testing ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              boxShadow: testing ? 'none' : '0 4px 20px rgba(0,71,255,0.35)',
            }}
          >
            {testing ? 'Sending…' : 'Send Test Booking →'}
          </button>

          {testResult && (
            <div style={{
              marginTop: 16,
              background: testResult.ok ? 'rgba(0,200,100,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${testResult.ok ? 'rgba(0,200,100,0.3)' : 'rgba(239,68,68,0.3)'}`,
              borderRadius: 10, padding: '12px 16px',
              fontSize: 14, color: testResult.ok ? '#00c864' : '#fca5a5',
              fontWeight: 600,
            }}>
              {testResult.ok ? '✅ ' : '⚠ '}{testResult.msg}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
