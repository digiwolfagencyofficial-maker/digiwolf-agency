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

const adminNavItems = [
  { icon: '⬡', label: 'Dashboard', href: '/admin', active: true },
  { icon: '👥', label: 'Clients', href: '/admin/clients' },
  { icon: '📁', label: 'Projects', href: '/admin/projects' },
  { icon: '🧾', label: 'Invoices', href: '/admin/invoices' },
  { icon: '🎯', label: 'Leads', href: '/admin/leads', badge: 8 },
  { icon: '📊', label: 'Analytics', href: '/admin/analytics' },
  { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
]

const mockLeads = [
  { name: 'Eva Procházková', email: 'eva@startup.cz', service: 'Website Design', status: 'New', date: '10 May 2025' },
  { name: 'Petr Svoboda', email: 'petr@firma.com', service: 'SEO / Content', status: 'Contacted', date: '8 May 2025' },
  { name: 'Lucie Horáková', email: 'lucie@shop.cz', service: 'E-shop Dev', status: 'Qualified', date: '7 May 2025' },
  { name: 'Ondřej Blažek', email: 'ondrej@agency.eu', service: 'Branding', status: 'New', date: '6 May 2025' },
  { name: 'Markéta Veselá', email: 'marketa@techco.cz', service: 'Social Media', status: 'Contacted', date: '5 May 2025' },
]

const mockClients = [
  { name: 'TechStart Praha', contact: 'Martin Novák', project: 'E-shop Redesign', projectStatus: 'In Progress', invoiceStatus: 'Paid', since: 'Jan 2025' },
  { name: 'GreenLife s.r.o.', contact: 'Jana Horáková', project: 'SEO Strategy', projectStatus: 'Review', invoiceStatus: 'Pending', since: 'Feb 2025' },
  { name: 'AutoPro CZ', contact: 'Jakub Marek', project: 'Website Rebuild', projectStatus: 'In Progress', invoiceStatus: 'Paid', since: 'Mar 2025' },
  { name: 'CosmeticStore', contact: 'Petra Nováková', project: 'Social Media', projectStatus: 'Active', invoiceStatus: 'Overdue', since: 'Nov 2024' },
  { name: 'LegalPro Praha', contact: 'Tomáš Krejčí', project: 'Branding Kit', projectStatus: 'Completed', invoiceStatus: 'Paid', since: 'Dec 2024' },
]

const revenueData = [
  { month: 'Jan', value: 85000, max: 150000 },
  { month: 'Feb', value: 102000, max: 150000 },
  { month: 'Mar', value: 78000, max: 150000 },
  { month: 'Apr', value: 120000, max: 150000 },
  { month: 'May', value: 125000, max: 150000 },
]

function LeadStatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; dot: string }> = {
    'New': { bg: 'rgba(0,71,255,0.12)', color: '#4d80ff', dot: '#0047FF' },
    'Contacted': { bg: 'rgba(234,179,8,0.12)', color: '#eab308', dot: '#eab308' },
    'Qualified': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', dot: '#22c55e' },
  }
  const s = map[status] || { bg: 'rgba(136,146,176,0.12)', color: '#8892b0', dot: '#8892b0' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 12, fontWeight: 700,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  )
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Paid': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
    'Pending': { bg: 'rgba(234,179,8,0.12)', color: '#eab308' },
    'Overdue': { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  }
  const s = map[status] || { bg: 'rgba(136,146,176,0.12)', color: '#8892b0' }
  return (
    <span style={{
      padding: '3px 9px', borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 12, fontWeight: 700,
    }}>{status}</span>
  )
}

function ProjectStatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'In Progress': { bg: 'rgba(0,71,255,0.12)', color: '#4d80ff' },
    'Review': { bg: 'rgba(234,179,8,0.12)', color: '#eab308' },
    'Active': { bg: 'rgba(168,85,247,0.12)', color: '#a855f7' },
    'Completed': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  }
  const s = map[status] || { bg: 'rgba(136,146,176,0.12)', color: '#8892b0' }
  return (
    <span style={{
      padding: '3px 9px', borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 12, fontWeight: 700,
    }}>{status}</span>
  )
}

function QuickActionBtn({ icon, label, desc, color }: { icon: string; label: string; desc: string; color: string }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '16px 18px',
        background: hover ? `rgba(${color}, 0.12)` : '#060f22',
        border: `1px solid ${hover ? `rgba(${color}, 0.35)` : '#0d1a35'}`,
        borderRadius: 12, color: '#f0f4ff',
        cursor: 'pointer', transition: 'all 0.2s',
        textAlign: 'left', width: '100%',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 8px 20px rgba(${color}, 0.15)` : 'none',
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#8892b0' }}>{desc}</div>
    </button>
  )
}

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [hoveredNav, setHoveredNav] = useState('')

  const stats = [
    { label: 'Total Clients', value: '47', change: '+3 this month', icon: '👥', color: '#0047FF', bg: 'rgba(0,71,255,0.08)' },
    { label: 'Active Projects', value: '12', change: '4 due this week', icon: '📁', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
    { label: 'Revenue / Month', value: '125,000', suffix: 'CZK', change: '+18% vs last month', icon: '💰', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    { label: 'New Leads', value: '8', change: '3 this week', icon: '🎯', color: '#eab308', bg: 'rgba(234,179,8,0.08)' },
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
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid #0d1a35',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <WolfLogo size={30} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.3px' }}>DigiWolf</div>
            <div style={{
              fontSize: 10, color: '#fff', fontWeight: 700,
              background: '#0047FF', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.5px',
            }}>ADMIN</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {adminNavItems.map((item) => {
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
                  cursor: 'pointer', transition: 'all 0.15s',
                  width: '100%', textAlign: 'left',
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    background: '#ef4444', color: '#fff',
                    borderRadius: 10, fontSize: 11, fontWeight: 700,
                    padding: '1px 6px',
                  }}>{item.badge}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #0d1a35',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>A</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f4ff' }}>Admin User</div>
            <div style={{ fontSize: 12, color: '#8892b0' }}>Administrator</div>
          </div>
          <Link href="/login" style={{ fontSize: 16, color: '#8892b0', textDecoration: 'none' }} title="Sign out">→</Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, padding: '32px 36px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#8892b0', fontSize: 14 }}>
              Monday, 12 May 2025 — Good morning, here's your overview.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              padding: '9px 18px',
              background: 'transparent',
              border: '1px solid #1e2a45',
              borderRadius: 10, color: '#8892b0',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}>Export Report</button>
            <button style={{
              padding: '9px 18px',
              background: 'linear-gradient(135deg, #0047FF, #1a5cff)',
              border: 'none',
              borderRadius: 10, color: '#fff',
              cursor: 'pointer', fontSize: 13, fontWeight: 700,
            }}>+ Add Client</button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: '#040d1f',
              border: '1px solid #0d1a35',
              borderRadius: 14, padding: '20px 22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 11,
                  background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>{s.icon}</div>
              </div>
              <div style={{ marginBottom: 2 }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</span>
                {s.suffix && <span style={{ fontSize: 14, color: '#8892b0', marginLeft: 6 }}>{s.suffix}</span>}
              </div>
              <div style={{ fontSize: 13, color: '#8892b0', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#4d80ff', fontWeight: 600 }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Revenue chart + Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, marginBottom: 24 }}>

          {/* Revenue bar chart */}
          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Revenue Overview</h2>
                <p style={{ fontSize: 13, color: '#8892b0' }}>Jan – May 2025</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Monthly', 'Quarterly'].map((tab, i) => (
                  <button key={tab} style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: i === 0 ? 'rgba(0,71,255,0.15)' : 'transparent',
                    border: `1px solid ${i === 0 ? 'rgba(0,71,255,0.3)' : '#1e2a45'}`,
                    color: i === 0 ? '#4d80ff' : '#8892b0', cursor: 'pointer',
                  }}>{tab}</button>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 140, paddingBottom: 8, borderBottom: '1px solid #0d1a35' }}>
              {revenueData.map((d, i) => {
                const pct = (d.value / d.max) * 100
                const isLast = i === revenueData.length - 1
                return (
                  <div key={d.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{
                      fontSize: 11, color: isLast ? '#22c55e' : '#8892b0',
                      fontWeight: 700, marginBottom: 6,
                    }}>
                      {(d.value / 1000).toFixed(0)}k
                    </div>
                    <div style={{
                      width: '100%', height: `${pct}%`, minHeight: 8,
                      background: isLast
                        ? 'linear-gradient(to top, #22c55e, #4ade80)'
                        : 'linear-gradient(to top, #0047FF, #3d74ff)',
                      borderRadius: '6px 6px 0 0',
                      position: 'relative', cursor: 'pointer',
                      transition: 'opacity 0.2s',
                    }} />
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, paddingTop: 10 }}>
              {revenueData.map((d) => (
                <div key={d.month} style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#8892b0', fontWeight: 600 }}>
                  {d.month}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', gap: 24, marginTop: 20, paddingTop: 16, borderTop: '1px solid #0d1a35' }}>
              <div>
                <div style={{ fontSize: 11, color: '#8892b0', marginBottom: 2 }}>Total YTD</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff' }}>510,000 CZK</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#8892b0', marginBottom: 2 }}>Avg Monthly</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff' }}>102,000 CZK</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#8892b0', marginBottom: 2 }}>Best Month</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>125,000 CZK</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, padding: '24px 20px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <QuickActionBtn icon="👤" label="Add New Client" desc="Create client account & portal" color="0,71,255" />
              <QuickActionBtn icon="🧾" label="Create Invoice" desc="Generate & send invoice" color="34,197,94" />
              <QuickActionBtn icon="📊" label="View Analytics" desc="Traffic, leads & conversions" color="168,85,247" />
            </div>
          </div>
        </div>

        {/* Leads table */}
        <div style={{
          background: '#040d1f', border: '1px solid #0d1a35',
          borderRadius: 16, marginBottom: 24, overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Recent Leads</h2>
              <p style={{ fontSize: 13, color: '#8892b0' }}>8 new leads this month</p>
            </div>
            <Link href="/admin/leads" style={{ fontSize: 13, color: '#0047FF', textDecoration: 'none', fontWeight: 600 }}>
              Manage Leads →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                  {['Name', 'Email', 'Service Interest', 'Status', 'Created'].map((h) => (
                    <th key={h} style={{
                      padding: '12px 22px', textAlign: 'left',
                      fontSize: 12, fontWeight: 600, color: '#8892b0',
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>{h}</th>
                  ))}
                  <th style={{ padding: '12px 22px', width: 80 }} />
                </tr>
              </thead>
              <tbody>
                {mockLeads.map((lead, i) => (
                  <tr key={lead.email} style={{
                    borderBottom: i < mockLeads.length - 1 ? '1px solid #0a1628' : 'none',
                  }}>
                    <td style={{ padding: '14px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{lead.name[0]}</div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>{lead.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 22px', fontSize: 13, color: '#8892b0' }}>{lead.email}</td>
                    <td style={{ padding: '14px 22px', fontSize: 13, color: '#c8d0e0' }}>{lead.service}</td>
                    <td style={{ padding: '14px 22px' }}><LeadStatusBadge status={lead.status} /></td>
                    <td style={{ padding: '14px 22px', fontSize: 13, color: '#8892b0' }}>{lead.date}</td>
                    <td style={{ padding: '14px 22px' }}>
                      <button style={{
                        padding: '5px 12px',
                        background: 'rgba(0,71,255,0.1)',
                        border: '1px solid rgba(0,71,255,0.2)',
                        borderRadius: 8, color: '#4d80ff',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent clients table */}
        <div style={{
          background: '#040d1f', border: '1px solid #0d1a35',
          borderRadius: 16, overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #0d1a35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Active Clients</h2>
              <p style={{ fontSize: 13, color: '#8892b0' }}>47 total clients, 12 active projects</p>
            </div>
            <Link href="/admin/clients" style={{ fontSize: 13, color: '#0047FF', textDecoration: 'none', fontWeight: 600 }}>
              All Clients →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                  {['Client', 'Contact', 'Project', 'Project Status', 'Invoice', 'Since'].map((h) => (
                    <th key={h} style={{
                      padding: '12px 22px', textAlign: 'left',
                      fontSize: 12, fontWeight: 600, color: '#8892b0',
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>{h}</th>
                  ))}
                  <th style={{ padding: '12px 22px', width: 80 }} />
                </tr>
              </thead>
              <tbody>
                {mockClients.map((c, i) => (
                  <tr key={c.name} style={{
                    borderBottom: i < mockClients.length - 1 ? '1px solid #0a1628' : 'none',
                  }}>
                    <td style={{ padding: '14px 22px' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f4ff', marginBottom: 1 }}>{c.name}</div>
                    </td>
                    <td style={{ padding: '14px 22px', fontSize: 13, color: '#8892b0' }}>{c.contact}</td>
                    <td style={{ padding: '14px 22px', fontSize: 13, color: '#c8d0e0' }}>{c.project}</td>
                    <td style={{ padding: '14px 22px' }}><ProjectStatusBadge status={c.projectStatus} /></td>
                    <td style={{ padding: '14px 22px' }}><InvoiceStatusBadge status={c.invoiceStatus} /></td>
                    <td style={{ padding: '14px 22px', fontSize: 13, color: '#8892b0' }}>{c.since}</td>
                    <td style={{ padding: '14px 22px' }}>
                      <button style={{
                        padding: '5px 12px',
                        background: 'rgba(0,71,255,0.1)',
                        border: '1px solid rgba(0,71,255,0.2)',
                        borderRadius: 8, color: '#4d80ff',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}>Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
