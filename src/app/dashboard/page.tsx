'use client'

import { useState } from 'react'
import Link from 'next/link'

const WolfLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7"/>
    <circle cx="16" cy="21.5" r="1.3" fill="#0A1050"/>
  </svg>
)

const navItems = [
  { icon: '⬡', label: 'Overview', href: '/dashboard', active: true },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
]

const mockProjects = [
  {
    id: 1,
    name: 'DigiWolf E-shop Redesign',
    status: 'In Progress',
    progress: 65,
    startDate: '1 Apr 2025',
    deadline: '30 Jun 2025',
    manager: 'Tomáš K.',
  },
  {
    id: 2,
    name: 'SEO & Content Strategy',
    status: 'Review',
    progress: 88,
    startDate: '15 Mar 2025',
    deadline: '15 May 2025',
    manager: 'Jana M.',
  },
]

const mockInvoices = [
  { id: 'INV-2025-041', desc: 'Website Development — Phase 1', amount: '45,000 CZK', status: 'Paid', date: '1 Apr 2025' },
  { id: 'INV-2025-052', desc: 'SEO Monthly Retainer — April', amount: '12,000 CZK', status: 'Pending', date: '1 May 2025' },
]

const mockMessages = [
  { from: 'Tomáš Krejčí', avatar: 'T', time: '2 hours ago', preview: 'Hi! The new homepage mockups are ready for your review. Can you take a look before our call on Friday?', unread: true },
  { from: 'Jana Marková', avatar: 'J', time: 'Yesterday', preview: 'Great news — the Google rankings have improved significantly this month. Full report attached.', unread: false },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'In Progress': { bg: 'rgba(0,71,255,0.12)', color: '#4d80ff' },
    'Review': { bg: 'rgba(234,179,8,0.12)', color: '#eab308' },
    'Paid': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
    'Pending': { bg: 'rgba(234,179,8,0.12)', color: '#eab308' },
    'Completed': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  }
  const s = map[status] || { bg: 'rgba(136,146,176,0.12)', color: '#8892b0' }
  return (
    <span style={{
      padding: '4px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 12, fontWeight: 700,
    }}>{status}</span>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: '#0d1a35', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${value}%`, height: '100%',
          background: 'linear-gradient(90deg, #0047FF, #3d74ff)',
          borderRadius: 3, transition: 'width 0.5s ease',
        }} />
      </div>
      <span style={{ fontSize: 12, color: '#8892b0', width: 32, textAlign: 'right' }}>{value}%</span>
    </div>
  )
}

export default function ClientDashboard() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [hoveredNav, setHoveredNav] = useState('')
  const [bellHover, setBellHover] = useState(false)

  const stats = [
    { label: 'Active Projects', value: '2', icon: '📁', color: '#0047FF', bg: 'rgba(0,71,255,0.08)' },
    { label: 'Pending Invoices', value: '1', icon: '🧾', color: '#eab308', bg: 'rgba(234,179,8,0.08)' },
    { label: 'New Messages', value: '3', icon: '💬', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    { label: 'Next Milestone', value: 'May 30', icon: '📅', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
  ]

  const quickActions = [
    { label: 'Upload File', icon: '⬆️', color: '#0047FF' },
    { label: 'Send Message', icon: '💬', color: '#22c55e' },
    { label: 'Download Invoice', icon: '⬇️', color: '#eab308' },
  ]

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#030712', color: '#f0f4ff',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: '#040d1f',
        borderRight: '1px solid #0d1a35',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid #0d1a35',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <WolfLogo size={30} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.3px' }}>DigiWolf</div>
            <div style={{ fontSize: 11, color: '#8892b0' }}>Client Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = item.label === activeNav
            const isHovered = item.label === hoveredNav
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav('')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: isActive ? 'rgba(0,71,255,0.15)' : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: isActive ? '1px solid rgba(0,71,255,0.25)' : '1px solid transparent',
                  color: isActive ? '#4d80ff' : isHovered ? '#f0f4ff' : '#8892b0',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    background: '#0047FF', color: '#fff',
                    borderRadius: 10, fontSize: 11, fontWeight: 700,
                    padding: '1px 6px', minWidth: 18, textAlign: 'center',
                  }}>{item.badge}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User profile */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #0d1a35',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>M</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f4ff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Martin Novák
            </div>
            <div style={{ fontSize: 12, color: '#8892b0' }}>Client</div>
          </div>
          <Link href="/login" style={{ fontSize: 16, color: '#8892b0', textDecoration: 'none' }} title="Sign out">→</Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, padding: '32px 36px', minHeight: '100vh', maxWidth: 'calc(100vw - 240px)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' }}>
              Welcome back, Martin 👋
            </h1>
            <p style={{ color: '#8892b0', fontSize: 14 }}>
              Here's what's happening with your projects today.
            </p>
          </div>
          <button
            onMouseEnter={() => setBellHover(true)}
            onMouseLeave={() => setBellHover(false)}
            style={{
              position: 'relative', width: 44, height: 44, borderRadius: 12,
              background: bellHover ? 'rgba(0,71,255,0.1)' : '#040d1f',
              border: `1px solid ${bellHover ? 'rgba(0,71,255,0.3)' : '#0d1a35'}`,
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}
          >
            🔔
            <span style={{
              position: 'absolute', top: 8, right: 8,
              width: 8, height: 8, borderRadius: '50%',
              background: '#0047FF', border: '2px solid #030712',
            }} />
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: '#040d1f',
              border: '1px solid #0d1a35',
              borderRadius: 14, padding: '20px 22px',
              transition: 'border-color 0.2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>{s.icon}</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#8892b0' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects table */}
        <div style={{
          background: '#040d1f', border: '1px solid #0d1a35',
          borderRadius: 16, marginBottom: 24, overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>My Projects</h2>
            <Link href="/dashboard/projects" style={{ fontSize: 13, color: '#0047FF', textDecoration: 'none', fontWeight: 600 }}>
              View all →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                  {['Project', 'Status', 'Progress', 'Start', 'Deadline', 'Manager'].map((h) => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left',
                      fontSize: 12, fontWeight: 600, color: '#8892b0',
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockProjects.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < mockProjects.length - 1 ? '1px solid #0a1628' : 'none' }}>
                    <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>{p.name}</td>
                    <td style={{ padding: '16px 20px' }}><StatusBadge status={p.status} /></td>
                    <td style={{ padding: '16px 20px', minWidth: 140 }}><ProgressBar value={p.progress} /></td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#8892b0' }}>{p.startDate}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#8892b0' }}>{p.deadline}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#8892b0' }}>{p.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom row: Invoices + Messages + Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 24 }}>

          {/* Invoices */}
          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>Recent Invoices</h2>
              <Link href="/dashboard/invoices" style={{ fontSize: 12, color: '#0047FF', textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ padding: '8px 0' }}>
              {mockInvoices.map((inv, i) => (
                <div key={inv.id} style={{
                  padding: '14px 22px',
                  borderBottom: i < mockInvoices.length - 1 ? '1px solid #0a1628' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f4ff', marginBottom: 2 }}>{inv.id}</div>
                      <div style={{ fontSize: 12, color: '#8892b0' }}>{inv.desc}</div>
                    </div>
                    <StatusBadge status={inv.status} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff' }}>{inv.amount}</span>
                    <span style={{ fontSize: 12, color: '#8892b0' }}>{inv.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>Messages</h2>
              <Link href="/dashboard/messages" style={{ fontSize: 12, color: '#0047FF', textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ padding: '8px 0' }}>
              {mockMessages.map((msg, i) => (
                <div key={msg.from} style={{
                  padding: '14px 22px',
                  borderBottom: i < mockMessages.length - 1 ? '1px solid #0a1628' : 'none',
                  display: 'flex', gap: 12,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 700, color: '#fff',
                  }}>{msg.avatar}</div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff' }}>{msg.from}</span>
                      <span style={{ fontSize: 11, color: '#8892b0' }}>{msg.time}</span>
                    </div>
                    <p style={{
                      fontSize: 12, color: '#8892b0',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      margin: 0, lineHeight: 1.5,
                    }}>{msg.preview}</p>
                    {msg.unread && (
                      <div style={{
                        display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                        background: '#0047FF', marginTop: 4,
                      }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #0d1a35' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>Quick Actions</h2>
            </div>
            <div style={{ padding: '16px' }}>
              {quickActions.map((action) => (
                <QuickActionBtn key={action.label} action={action} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function QuickActionBtn({ action }: { action: { label: string; icon: string; color: string } }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%', padding: '12px 16px', marginBottom: 10,
        background: hover ? 'rgba(0,71,255,0.1)' : '#060f22',
        border: `1px solid ${hover ? 'rgba(0,71,255,0.3)' : '#0d1a35'}`,
        borderRadius: 10, color: '#f0f4ff',
        cursor: 'pointer', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 14, fontWeight: 600, textAlign: 'left',
        transform: hover ? 'translateX(2px)' : 'none',
      }}
    >
      <span style={{ fontSize: 18 }}>{action.icon}</span>
      {action.label}
    </button>
  )
}
