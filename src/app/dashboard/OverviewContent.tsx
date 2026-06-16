'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useClientProjects } from '@/hooks/useClientProjects'
import {
  formatProjectStatus,
  formatProjectTimestamp,
  getStatusStyle,
} from '@/lib/project-display'

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
]

const statsTemplate = [
  { label: 'Active Projects', icon: '📁', color: '#4d80ff', bg: 'rgba(0,71,255,0.08)' },
  { label: 'Pending Invoices', icon: '🧾', color: '#eab308', bg: 'rgba(234,179,8,0.08)', trend: '12,000 CZK due' },
  { label: 'Unread Messages', icon: '💬', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', trend: 'Reply needed' },
  { label: 'Next Milestone', icon: '📅', color: '#a855f7', bg: 'rgba(168,85,247,0.08)', trend: '12 days left' },
]

const mockInvoices = [
  { id: 'INV-2025-041', desc: 'Website Development — Phase 1', amount: '45,000 CZK', status: 'Paid', date: '1 Apr 2025' },
  { id: 'INV-2025-052', desc: 'SEO Monthly Retainer — April', amount: '12,000 CZK', status: 'Pending', date: '1 May 2025' },
]

const mockMessages = [
  { from: 'Tomáš Krejčí', avatar: 'T', time: '2h ago', preview: 'The new homepage mockups are ready for your review. Can you check before Friday?', unread: true },
  { from: 'Jana Marková', avatar: 'J', time: 'Yesterday', preview: 'Google rankings improved significantly this month. Full report attached.', unread: false },
]

const activity = [
  { icon: '✅', text: 'Phase 1 development completed', time: '2 hours ago', color: '#22c55e' },
  { icon: '📄', text: 'Invoice INV-2025-052 sent', time: '1 day ago', color: '#eab308' },
  { icon: '💬', text: 'New message from Tomáš K.', time: '2 days ago', color: '#4d80ff' },
  { icon: '📁', text: 'Brand guidelines PDF uploaded', time: '3 days ago', color: '#a855f7' },
]

function StatusBadge({ status }: { status: string }) {
  const invoiceMap: Record<string, { bg: string; color: string }> = {
    Paid: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
    Pending: { bg: 'rgba(234,179,8,0.12)', color: '#eab308' },
  }
  const s = invoiceMap[status] ?? getStatusStyle(status)
  const label = invoiceMap[status] ? status : formatProjectStatus(status)
  return <span style={{ padding: '4px 10px', borderRadius: 20, background: s.bg, color: s.color, fontSize: 12, fontWeight: 700 }}>{label}</span>
}

function StatCard({ s }: { s: { label: string; value: string; icon: string; color: string; bg: string; trend?: string } }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? '#060f22' : '#040d1f',
        border: `1px solid ${hover ? 'rgba(0,71,255,0.2)' : '#0d1a35'}`,
        borderRadius: 14, padding: '20px 22px',
        transition: 'all 0.2s', cursor: 'default',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 8px 30px rgba(0,71,255,0.08)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
        <span style={{ fontSize: 11, color: '#8892b0', background: '#0d1a35', padding: '3px 8px', borderRadius: 6 }}>{s.trend ?? ''}</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: s.color, marginBottom: 4, letterSpacing: '-1px' }}>{s.value}</div>
      <div style={{ fontSize: 13, color: '#8892b0' }}>{s.label}</div>
    </div>
  )
}

export function ClientDashboardPage() {
  const { projects, loading, error, displayName, userInitial } = useClientProjects()
  const projectCount = projects.length
  const stats = statsTemplate.map((s) =>
    s.label === 'Active Projects'
      ? { ...s, value: String(projectCount), trend: projectCount === 1 ? '1 project' : `${projectCount} projects` }
      : { ...s, value: s.label === 'Pending Invoices' ? '1' : s.label === 'Unread Messages' ? '3' : 'May 30' }
  )

  return (
    <DashboardLayout navItems={clientNav} role="client" userName={displayName} userInitial={userInitial}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px' }}>
          Welcome back, {displayName} 👋
        </h1>
        <p style={{ color: '#8892b0', fontSize: 14 }}>Here's what's happening with your projects today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map((s) => <StatCard key={s.label} s={s} />)}
      </div>

      {/* Projects table */}
      <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Active Projects</h2>
          <Link href="/dashboard/projects" style={{ fontSize: 13, color: '#0047FF', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #0d1a35' }}>
              {['Project', 'Status', 'Created'].map((h) => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} style={{ padding: '32px 20px', textAlign: 'center', color: '#8892b0', fontSize: 14 }}>
                  Loading projects…
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={3} style={{ padding: '32px 20px', textAlign: 'center', color: '#f87171', fontSize: 14 }}>
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && projects.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: '32px 20px', textAlign: 'center', color: '#8892b0', fontSize: 14 }}>
                  No projects yet — your agency will add them here.
                </td>
              </tr>
            )}
            {!loading && !error && projects.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i < projects.length - 1 ? '1px solid #0a1628' : 'none' }}>
                <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>{p.name}</td>
                <td style={{ padding: '16px 20px' }}><StatusBadge status={p.project_status} /></td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#8892b0' }}>{formatProjectTimestamp(p.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom 3-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>

        {/* Invoices */}
        <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Invoices</h2>
            <Link href="/dashboard/invoices" style={{ fontSize: 12, color: '#0047FF', textDecoration: 'none' }}>View all →</Link>
          </div>
          {mockInvoices.map((inv, i) => (
            <div key={inv.id} style={{ padding: '14px 20px', borderBottom: i < mockInvoices.length - 1 ? '1px solid #0a1628' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{inv.id}</div>
                  <div style={{ fontSize: 11, color: '#8892b0' }}>{inv.desc}</div>
                </div>
                <StatusBadge status={inv.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{inv.amount}</span>
                <span style={{ fontSize: 11, color: '#8892b0' }}>{inv.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Messages</h2>
            <Link href="/dashboard/messages" style={{ fontSize: 12, color: '#0047FF', textDecoration: 'none' }}>View all →</Link>
          </div>
          {mockMessages.map((msg, i) => (
            <div key={msg.from} style={{ padding: '14px 20px', borderBottom: i < mockMessages.length - 1 ? '1px solid #0a1628' : 'none', display: 'flex', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #0047FF, #3d74ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{msg.avatar}</div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{msg.from}</span>
                  <span style={{ fontSize: 11, color: '#8892b0' }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: 12, color: '#8892b0', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{msg.preview}</p>
                {msg.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0047FF', marginTop: 4 }} />}
              </div>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #0d1a35' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Recent Activity</h2>
          </div>
          <div style={{ padding: '8px 0' }}>
            {activity.map((a, i) => (
              <div key={i} style={{ padding: '12px 20px', display: 'flex', alignItems: 'flex-start', gap: 12, borderBottom: i < activity.length - 1 ? '1px solid #0a1628' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 13, color: '#f0f4ff', marginBottom: 2 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: '#8892b0' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
