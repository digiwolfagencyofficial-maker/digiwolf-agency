'use client'

export const dynamic = 'force-dynamic'

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

const monthlyLeads = [
  { month: 'Dec', leads: 3 },
  { month: 'Jan', leads: 5 },
  { month: 'Feb', leads: 4 },
  { month: 'Mar', leads: 8 },
  { month: 'Apr', leads: 6 },
  { month: 'May', leads: 9 },
]

const trafficSources = [
  { source: 'Organic Search', pct: 42, color: '#0047FF' },
  { source: 'Direct', pct: 28, color: '#22c55e' },
  { source: 'Referral', pct: 18, color: '#8b5cf6' },
  { source: 'Social Media', pct: 12, color: '#f59e0b' },
]

const topServices = [
  { service: 'Web Development', count: 8, revenue: '340,000 CZK', pct: 45 },
  { service: 'AI Automation', count: 4, revenue: '240,000 CZK', pct: 32 },
  { service: 'Czech S.R.O.', count: 5, revenue: '75,000 CZK', pct: 10 },
  { service: 'SEO & Growth', count: 3, revenue: '90,000 CZK', pct: 12 },
]

const kpis = [
  { label: 'Lead to Client Rate', value: '34%', trend: '+6% vs last quarter', trendUp: true },
  { label: 'Avg. Project Value', value: '67,500 CZK', trend: '+12% vs last quarter', trendUp: true },
  { label: 'Avg. Project Duration', value: '5.2 weeks', trend: '-0.4 weeks', trendUp: true },
  { label: 'Client Satisfaction', value: '4.9 / 5', trend: '+0.1 vs last quarter', trendUp: true },
]

const maxLeads = Math.max(...monthlyLeads.map(m => m.leads))

export function AdminAnalyticsPage() {
  return (
    <DashboardLayout navItems={adminNav}>
      <div>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>Insights</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>Analytics</h1>
          <p style={{ color: '#64748b', marginTop: 6, fontSize: 14 }}>Business performance — last 6 months</p>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {kpis.map(k => (
            <div key={k.label} style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #0047FF, #3b82f6)' }} />
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>{k.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#f8fafc', marginBottom: 6, letterSpacing: '-0.02em' }}>{k.value}</div>
              <div style={{ fontSize: 12, color: k.trendUp ? '#22c55e' : '#ef4444' }}>↑ {k.trend}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* Lead Chart */}
          <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', margin: '0 0 6px 0' }}>New Leads per Month</h2>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px 0' }}>Dec 2025 – May 2026</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
              {monthlyLeads.map(m => (
                <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: 11, color: '#0047FF', fontWeight: 600 }}>{m.leads}</div>
                  <div style={{ width: '100%', height: `${(m.leads / maxLeads) * 100}%`, background: 'linear-gradient(180deg, #0047FF 0%, #1e3a8a 100%)', borderRadius: '6px 6px 2px 2px', minHeight: 8 }} />
                  <span style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', margin: '0 0 6px 0' }}>Traffic Sources</h2>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px 0' }}>Where visitors come from</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {trafficSources.map(s => (
                <div key={s.source}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#c8d4f0' }}>{s.source}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', margin: '0 0 6px 0' }}>Revenue by Service</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px 0' }}>Top performing services this period</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {topServices.map((s, i) => (
              <div key={s.service} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 80px 120px', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: i < topServices.length - 1 ? '1px solid #0f172a' : 'none' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{s.service}</span>
                <div style={{ height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: '#0047FF', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>{s.count} projects</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', textAlign: 'right' }}>{s.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
