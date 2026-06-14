'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Calendar } from 'lucide-react'

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
  google_event_id: string | null
  created_at: string
  message: string | null
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled'

const STATUS_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  pending:   { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', color: '#fbbf24' },
  confirmed: { bg: 'rgba(0,200,100,0.12)',  border: 'rgba(0,200,100,0.4)',  color: '#00c864' },
  cancelled: { bg: 'rgba(107,114,128,0.12)',border: 'rgba(107,114,128,0.3)',color: '#9ca3af' },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
      textTransform: 'capitalize', letterSpacing: '0.03em', whiteSpace: 'nowrap',
    }}>{status}</span>
  )
}

// Wolf icon SVG for empty state
const WolfIcon = () => (
  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" opacity="0.3">
    <polygon points="4,14 8,2 13,12" fill="#0047FF"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF"/>
    <circle cx="12" cy="17" r="2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2" fill="#F5F5F5"/>
  </svg>
)

export default function BookingsPageContent() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?status=${filter}` : ''
      const res = await fetch(`/api/admin/bookings${params}`)
      if (res.ok) {
        const data = await res.json()
        setBookings((data.bookings ?? []) as Booking[])
      }
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
    } finally {
      setUpdating(null)
      fetchBookings()
    }
  }

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
            <p style={{ color: '#8892b0', fontSize: 14, margin: 0 }}>Manage discovery call and service bookings</p>
          </div>
          <a href="/book" target="_blank" rel="noopener noreferrer" style={{
            background: '#0047FF', color: '#fff', textDecoration: 'none',
            padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 20px rgba(0,71,255,0.3)',
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
                transition: 'all 0.15s',
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
          ) : bookings.length === 0 ? (
            <div style={{ padding: '80px 32px', textAlign: 'center', color: '#8892b0' }}>
              <WolfIcon />
              <div style={{ marginTop: 16, fontSize: 16, fontWeight: 700, color: '#f0f4ff', marginBottom: 8 }}>No bookings yet</div>
              <div style={{ fontSize: 14, color: '#8892b0', marginBottom: 20 }}>Share <code style={{ background: 'rgba(0,71,255,0.1)', padding: '2px 8px', borderRadius: 6, color: '#3d74ff' }}>/book</code> to get started</div>
              <a href="/book" target="_blank" rel="noopener noreferrer" style={{ color: '#3d74ff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                Open booking page ↗
              </a>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                    {['Ref', 'Name', 'Email', 'Service', 'Date', 'Time', 'Status', 'Cal', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#8892b0', fontWeight: 700, fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid #0a1428' : 'none' }}>
                      <td style={{ padding: '14px 16px', color: '#3d74ff', fontWeight: 700, fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' }}>
                        #{b.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#f0f4ff', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {b.name}
                        {b.company && <div style={{ fontSize: 11, color: '#8892b0', fontWeight: 400, marginTop: 2 }}>{b.company}</div>}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#93c5fd', whiteSpace: 'nowrap' }}>
                        <a href={`mailto:${b.email}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>{b.email}</a>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#c8d3f0', whiteSpace: 'nowrap' }}>
                        {SERVICE_LABELS[b.service] || b.service}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#c8d3f0', whiteSpace: 'nowrap' }}>
                        {new Date(b.preferred_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#8892b0', whiteSpace: 'nowrap', fontSize: 13 }}>
                        {b.preferred_time} CET
                      </td>
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <StatusBadge status={b.status} />
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        {b.google_event_id ? (
                          <span title="Google Calendar event created" style={{ color: '#00c864', display: 'inline-flex' }}>
                            <Calendar size={16} />
                          </span>
                        ) : (
                          <span style={{ color: '#374151', fontSize: 16 }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {b.status !== 'confirmed' && (
                            <button
                              onClick={() => updateStatus(b.id, 'confirmed')}
                              disabled={updating === b.id}
                              style={{
                                background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.3)',
                                color: '#00c864', borderRadius: 7, padding: '6px 12px',
                                fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                opacity: updating === b.id ? 0.5 : 1, whiteSpace: 'nowrap',
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
                                opacity: updating === b.id ? 0.5 : 1, whiteSpace: 'nowrap',
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
