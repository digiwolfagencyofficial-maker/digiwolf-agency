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

const projects = [
  { id: 1, name: 'E-commerce Redesign', client: 'Petr Novak', status: 'In Progress', deadline: '15 Jun 2026', budget: '85,000 CZK', progress: 72 },
  { id: 2, name: 'AI Chatbot Integration', client: 'Mike Chen', status: 'In Progress', deadline: '2 Jul 2026', budget: '120,000 CZK', progress: 45 },
  { id: 3, name: 'Agency Website Build', client: 'Alena Novotna', status: 'Review', deadline: '31 May 2026', budget: '45,000 CZK', progress: 88 },
  { id: 4, name: 'SRO Formation — Bat-Erdene', client: 'Bat-Erdene', status: 'In Progress', deadline: '20 Jul 2026', budget: '15,000 CZK', progress: 30 },
  { id: 5, name: 'SRO Legal Setup', client: 'Jana Horák', status: 'Completed', deadline: '8 May 2026', budget: '15,000 CZK', progress: 100 },
  { id: 6, name: 'Landing Page Redesign', client: 'Alena Novotna', status: 'In Progress', deadline: '1 Jun 2026', budget: '40,000 CZK', progress: 60 },
]

const statusMap: Record<string, { bg: string; color: string }> = {
  'In Progress': { bg: 'rgba(0,71,255,0.12)', color: '#4d8aff' },
  'Review': { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
  'Completed': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  'Paused': { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8' },
}

export function AdminProjectsPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'In Progress', 'Review', 'Completed']
  const filtered = filter === 'All' ? projects : projects.filter(p => p.status === filter)

  return (
    <DashboardLayout navItems={adminNav}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>Project Management</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>Projects</h1>
            <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>{projects.length} total projects</p>
          </div>
          <button style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            + New Project
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total', value: projects.length, color: '#4d8aff', bg: 'rgba(0,71,255,0.08)' },
            { label: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length, color: '#4d8aff', bg: 'rgba(0,71,255,0.08)' },
            { label: 'In Review', value: projects.filter(p => p.status === 'Review').length, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
            { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
          ].map(s => (
            <div key={s.label} style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: '#040d1f', padding: 6, borderRadius: 12, width: 'fit-content', border: '1px solid rgba(255,255,255,0.06)' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14,
              fontWeight: filter === f ? 600 : 400,
              background: filter === f ? '#0047FF' : 'transparent',
              color: filter === f ? '#fff' : '#64748b',
              transition: 'all 0.2s', fontFamily: 'Inter, system-ui, sans-serif',
            }}>{f}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #0f172a' }}>
                {['Project', 'Client', 'Status', 'Progress', 'Deadline', 'Budget'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const s = statusMap[p.status] || { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8' }
                return (
                  <tr key={p.id}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: hoveredRow === i ? 'rgba(0,71,255,0.04)' : 'transparent', transition: 'background 0.15s' }}>
                    <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{p.name}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#64748b' }}>{p.client}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color }}>{p.status}</span>
                    </td>
                    <td style={{ padding: '16px 20px', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${p.progress}%`, height: '100%', background: p.progress === 100 ? '#22c55e' : '#0047FF', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: '#64748b', minWidth: 32 }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#64748b' }}>{p.deadline}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: '#f0f4ff' }}>{p.budget}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
