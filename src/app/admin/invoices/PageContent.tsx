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

const invoices = [
  { id: 'INV-2026-001', client: 'Petr Novak', project: 'E-commerce Redesign', amount: '42,500 CZK', status: 'Paid', due: '1 Apr 2026', issued: '15 Mar 2026' },
  { id: 'INV-2026-002', client: 'Mike Chen', project: 'AI Chatbot Integration', amount: '60,000 CZK', status: 'Pending', due: '15 May 2026', issued: '1 May 2026' },
  { id: 'INV-2026-003', client: 'Sarah K', project: 'SEO Campaign Q2', amount: '15,000 CZK', status: 'Paid', due: '1 Apr 2026', issued: '15 Mar 2026' },
  { id: 'INV-2026-004', client: 'Tom B', project: 'Brand Identity Package', amount: '27,500 CZK', status: 'Pending', due: '30 May 2026', issued: '15 Apr 2026' },
  { id: 'INV-2026-005', client: 'Jana Horák', project: 'SRO Legal Setup', amount: '15,000 CZK', status: 'Paid', due: '20 Apr 2026', issued: '5 Apr 2026' },
  { id: 'INV-2026-006', client: 'Alena Novotna', project: 'Landing Page Redesign', amount: '20,000 CZK', status: 'Overdue', due: '1 May 2026', issued: '15 Apr 2026' },
]

const statusMap: Record<string, { bg: string; color: string }> = {
  Paid: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  Pending: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
  Overdue: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
}

export function AdminInvoicesPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + parseInt(i.amount.replace(/[^0-9]/g, '')), 0)
  const outstanding = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + parseInt(i.amount.replace(/[^0-9]/g, '')), 0)
  const overdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + parseInt(i.amount.replace(/[^0-9]/g, '')), 0)

  return (
    <DashboardLayout navItems={adminNav}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>Billing</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>Invoices</h1>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            + Create Invoice
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Collected', value: `${totalRevenue.toLocaleString()} CZK`, color: '#22c55e', borderColor: 'rgba(34,197,94,0.2)' },
            { label: 'Outstanding', value: `${outstanding.toLocaleString()} CZK`, color: '#fbbf24', borderColor: 'rgba(251,191,36,0.2)' },
            { label: 'Overdue', value: `${overdue.toLocaleString()} CZK`, color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' },
          ].map(s => (
            <div key={s.label} style={{ background: '#040d1f', border: `1px solid ${s.borderColor}`, borderRadius: 14, padding: '20px 24px' }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #0f172a' }}>
                {['Invoice #', 'Client', 'Project', 'Amount', 'Status', 'Due Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const s = statusMap[inv.status]
                return (
                  <tr key={inv.id}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ borderBottom: i < invoices.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: hoveredRow === i ? 'rgba(0,71,255,0.04)' : 'transparent', transition: 'background 0.15s' }}>
                    <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#4d8aff', fontFamily: 'monospace' }}>{inv.id}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#f1f5f9', fontWeight: 500 }}>{inv.client}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748b' }}>{inv.project}</td>
                    <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 700, color: '#f0f4ff' }}>{inv.amount}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color }}>{inv.status}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748b' }}>{inv.due}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <button style={{ fontSize: 12, background: 'rgba(0,71,255,0.12)', color: '#4d8aff', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Download
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Create Invoice Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
            <div style={{ background: '#040d1f', border: '1px solid #1e293b', borderRadius: 16, padding: 32, width: 480, maxWidth: '90%' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc', margin: 0 }}>Create Invoice</h2>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 18 }}>✕</button>
              </div>
              {['Client', 'Project', 'Amount (CZK)', 'Due Date', 'Description'].map(field => (
                <div key={field} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, fontWeight: 500 }}>{field}</label>
                  {field === 'Description' ? (
                    <textarea rows={3} placeholder={field} style={{ width: '100%', background: '#030712', border: '1px solid #1e293b', borderRadius: 8, padding: '10px 12px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, system-ui, sans-serif', resize: 'vertical' }} />
                  ) : (
                    <input placeholder={field} style={{ width: '100%', background: '#030712', border: '1px solid #1e293b', borderRadius: 8, padding: '10px 12px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, system-ui, sans-serif' }} />
                  )}
                </div>
              ))}
              <button style={{ width: '100%', marginTop: 8, background: '#0047FF', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Create & Send Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
