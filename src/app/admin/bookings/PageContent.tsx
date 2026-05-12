'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { supabase } from '@/lib/supabase'

const adminNav = [
  { icon: '⬡', label: 'Overview', href: '/admin' },
  { icon: '👥', label: 'Clients', href: '/admin/clients' },
  { icon: '📋', label: 'Projects', href: '/admin/projects' },
  { icon: '🧾', label: 'Invoices', href: '/admin/invoices' },
  { icon: '🎯', label: 'Leads', href: '/admin/leads' },
  { icon: '📅', label: 'Bookings', href: '/admin/bookings' },
  { icon: '📊', label: 'Analytics', href: '/admin/analytics' },
  { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
]

const SERVICE_LABELS: Record<string, string> = {
  website: 'Website',
  sro: 'S.R.O. Formation',
  ai: 'AI Automation',
  app: 'App Development',
  general: 'Discovery Call',
}

type Booking = {
  id: string
  name: string
  email: string
  company: string | null
  service: string
  preferred_date: string
  preferred_time: string
  status: string
  created_at: string
  message: string | null
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled'

const STATUS_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  pending:   { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', color: '#fbbf24' },
  confirmed: { bg: 'rgba(0,200,100,0.12)',  border: 'rgba(0,200,100,0.4)', color: '#00c864' },
  cancelled: { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)', color: '#f87171' },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
      textTransform: 'capitalize', letterSpacing: '0.03em',
    }}>{status}</span>
  )
}

export default function BookingsPageContent() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('bookings')
      .select('*')
      .order('preferred_date', { ascending: false })
      .order('preferred_time', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query
    if (!error && data) setBookings(data as Booking[])
    setLoading(false)
  }, [filter])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    await supabase.from('bookings').update({ status }).eq('id', id)
    setUpdating(null)
    fetchBookings()
  }

  const filtered = bookings

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <DashboardLayout navItems={adminNav} role="admin" userName="Admin" userInitial="A">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0f4ff', margin: '0 0 6px' }}>Bookings</h1>
            <p style={{ color: '#8892b0', fontSize: 14, margin: 0 }}>Manage discovery call bookings</p>
          </div>
          <a href="/book" target="_blank" rel="noopener noreferrer" style={{
            background: '#0047FF', color: '#fff', textDecoration: 'none',
            padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            + View Booking Page ↗
          </a>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {(['all', 'pending', 'confirmed', 'cancelled'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(0,71,255,0.15)' : 'rgba(255,255,255,0.04)',
                border: filter === f ? '1px solid rgba(0,71,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: filter === f ? '#3d74ff' : '#8892b0',
                borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ textTransform: 'capitalize' }}>{f}</span>
              <span style={{
                background: filter === f ? '#0047FF' : 'rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: 10, fontSize: 11, fontWeight: 700,
                padding: '1px 7px',
              }}>{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '60px 32px', textAlign: 'center', color: '#8892b0' }}>Loading bookings…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '60px 32px', textAlign: 'center', color: '#8892b0' }}>
              No bookings{filter !== 'all' ? ` with status "${filter}"` : ''} yet.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                    {['Name', 'Email', 'Service', 'Date & Time', 'Status', 'Created', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#8892b0', fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => (
                    <tr key={b.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #0a1428' : 'none' }}>
                      <td style={{ padding: '16px 20px', color: '#f0f4ff', fontWeight: 600 }}>
                        {b.name}
                        {b.company && <div style={{ fontSize: 12, color: '#8892b0', fontWeight: 400, marginTop: 2 }}>{b.company}</div>}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#93c5fd' }}>
                        <a href={`mailto:${b.email}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>{b.email}</a>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#c8d3f0' }}>
                        {SERVICE_LABELS[b.service] || b.service}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#c8d3f0', whiteSpace: 'nowrap' }}>
                        <div>{new Date(b.preferred_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</div>
                        <div style={{ fontSize: 12, color: '#8892b0', marginTop: 2 }}>{b.preferred_time} CET</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <StatusBadge status={b.status} />
                      </td>
                      <td style={{ padding: '16px 20px', color: '#8892b0', fontSize: 12, whiteSpace: 'nowrap' }}>
                        {new Date(b.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {b.status !== 'confirmed' && (
                            <button
                              onClick={() => updateStatus(b.id, 'confirmed')}
                              disabled={updating === b.id}
                              style={{
                                background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.3)',
                                color: '#00c864', borderRadius: 7, padding: '6px 12px',
                                fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                opacity: updating === b.id ? 0.5 : 1,
                              }}
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => updateStatus(b.id, 'cancelled')}
                              disabled={updating === b.id}
                              style={{
                                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                                color: '#f87171', borderRadius: 7, padding: '6px 12px',
                                fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                opacity: updating === b.id ? 0.5 : 1,
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
