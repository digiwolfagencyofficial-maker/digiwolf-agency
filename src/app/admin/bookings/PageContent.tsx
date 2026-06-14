'use client'

export const dynamic = 'force-dynamic'

import { useCallback, useEffect, useState } from 'react'
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

type Booking = {
  id: string
  name: string
  email: string
  event_time: string | null
  notes: string | null
  created_at: string
  preferred_date: string | null
  preferred_time: string | null
  message: string | null
}

function formatStartTime(b: Booking) {
  if (b.event_time) {
    return new Date(b.event_time).toLocaleString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Prague',
    })
  }
  if (b.preferred_date) {
    const datePart = new Date(b.preferred_date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    return b.preferred_time ? `${datePart}, ${b.preferred_time} CET` : datePart
  }
  return '—'
}

function bookingNotes(b: Booking) {
  const text = b.notes?.trim() || b.message?.trim()
  return text || '—'
}

const WolfIcon = () => (
  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" opacity="0.3">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" />
    <polygon points="28,14 24,2 19,12" fill="#0047FF" />
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" />
    <circle cx="12" cy="17" r="2" fill="#F5F5F5" />
    <circle cx="20" cy="17" r="2" fill="#F5F5F5" />
  </svg>
)

export default function BookingsPageContent() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/bookings')
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Failed to load bookings (${res.status})`)
      }
      const data = await res.json()
      setBookings((data.bookings ?? []) as Booking[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return (
    <DashboardLayout navItems={adminNav} role="admin" userName="Admin" userInitial="A">
      <style>{`
        .bookings-table-wrap { display: block; }
        .bookings-cards { display: none; }
        @media (max-width: 767px) {
          .bookings-table-wrap { display: none; }
          .bookings-cards { display: flex; flex-direction: column; gap: 12px; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 4px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0f4ff', margin: '0 0 6px' }}>Bookings</h1>
          <p style={{ color: '#8892b0', fontSize: 14, margin: 0 }}>
            {loading ? 'Loading…' : `${bookings.length} Cal.com booking${bookings.length === 1 ? '' : 's'}`}
          </p>
        </div>

        <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '60px 32px', textAlign: 'center', color: '#8892b0' }}>Loading bookings…</div>
          ) : error ? (
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ color: '#f87171', marginBottom: 12, fontSize: 14 }}>{error}</div>
              <button
                type="button"
                onClick={fetchBookings}
                style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Retry
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ padding: '80px 32px', textAlign: 'center', color: '#8892b0' }}>
              <WolfIcon />
              <div style={{ marginTop: 16, fontSize: 16, fontWeight: 700, color: '#f0f4ff', marginBottom: 8 }}>No bookings yet</div>
              <div style={{ fontSize: 14 }}>Cal.com bookings will appear here automatically.</div>
            </div>
          ) : (
            <>
              <div className="bookings-table-wrap" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                      {['Name', 'Email', 'Start time', 'Notes'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '14px 16px',
                            textAlign: 'left',
                            color: '#8892b0',
                            fontWeight: 700,
                            fontSize: 11,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            whiteSpace: h === 'Start time' ? 'nowrap' : undefined,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid #0a1428' : 'none' }}>
                        <td style={{ padding: '14px 16px', color: '#f0f4ff', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {b.name}
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <a href={`mailto:${b.email}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>
                            {b.email}
                          </a>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#c8d3f0', whiteSpace: 'nowrap', fontSize: 13 }}>
                          {formatStartTime(b)}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#8892b0', fontSize: 13, maxWidth: 360, lineHeight: 1.5 }}>
                          {bookingNotes(b)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bookings-cards" style={{ padding: 16 }}>
                {bookings.map((b) => (
                  <article
                    key={b.id}
                    style={{ background: '#030712', border: '1px solid #0f172a', borderRadius: 12, padding: 16 }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 4 }}>{b.name}</div>
                    <a href={`mailto:${b.email}`} style={{ color: '#93c5fd', textDecoration: 'none', fontSize: 13, display: 'block', marginBottom: 10 }}>
                      {b.email}
                    </a>
                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, color: '#8892b0' }}>Start: </span>
                      {formatStartTime(b)}
                    </div>
                    <div style={{ fontSize: 13, color: '#c8d3f0', lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 600, color: '#8892b0', display: 'block', marginBottom: 4 }}>Notes</span>
                      {bookingNotes(b)}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
