'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

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
];

const leads = [
  { name: 'Petr Novak', email: 'petr@firma.cz', service: 'Web Dev', date: 'Today', status: 'New' },
  { name: 'Jana Horák', email: 'jana@shop.cz', service: 'SRO Formation', date: 'Yesterday', status: 'Contacted' },
  { name: 'Mike Chen', email: 'mike@startup.com', service: 'AI Automation', date: '2 days ago', status: 'Qualified' },
  { name: 'Sarah K', email: 'sarah@retail.cz', service: 'SEO', date: '3 days ago', status: 'New' },
  { name: 'Tom B', email: 'tom@brand.cz', service: 'Branding', date: '4 days ago', status: 'Won' },
];

const projects = [
  { name: 'E-commerce Redesign', client: 'Petr Novak', progress: 72, deadline: 'Jun 15' },
  { name: 'AI Chatbot Integration', client: 'Mike Chen', progress: 45, deadline: 'Jul 2' },
  { name: 'SEO Campaign Q2', client: 'Sarah K', progress: 88, deadline: 'May 31' },
  { name: 'Brand Identity', client: 'Tom B', progress: 30, deadline: 'Jul 20' },
  { name: 'SRO Legal Setup', client: 'Jana Horák', progress: 60, deadline: 'Jun 8' },
];

const activity = [
  { icon: '💬', text: 'New message from Petr Novak', time: '5 min ago' },
  { icon: '✅', text: 'Invoice #1042 marked as paid', time: '1 hour ago' },
  { icon: '🎯', text: 'New lead: Sarah K submitted inquiry', time: '2 hours ago' },
  { icon: '📋', text: 'Project "AI Chatbot" milestone reached', time: '4 hours ago' },
  { icon: '👥', text: 'Jana Horák added as new client', time: 'Yesterday' },
];

const chartBars = [
  { day: 'Mon', height: 55 },
  { day: 'Tue', height: 72 },
  { day: 'Wed', height: 60 },
  { day: 'Thu', height: 85 },
  { day: 'Fri', height: 95 },
  { day: 'Sat', height: 40 },
  { day: 'Sun', height: 30 },
];

const statusColors: Record<string, string> = {
  New: '#0047FF',
  Contacted: '#F59E0B',
  Qualified: '#8B5CF6',
  Won: '#10B981',
};

export function AdminOverviewPage() {
  const [hoveredLead, setHoveredLead] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <DashboardLayout navItems={adminNav}>
      <div style={{ minHeight: '100vh', background: '#030712', color: '#F1F5F9', padding: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: '6px' }}>Dashboard</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>Admin Overview</h1>
          <p style={{ color: '#64748B', marginTop: '6px', fontSize: '14px' }}>Sunday, 10 May 2026 — Good evening, Digi Wolf</p>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Revenue', value: '127,000 CZK', sub: '+18% this month', icon: '💰', trend: true },
            { label: 'Active Clients', value: '12', sub: '+2 new this month', icon: '👥', trend: true },
            { label: 'Open Projects', value: '8', sub: 'Across all clients', icon: '📋', trend: null },
            { label: 'New Leads', value: '5', sub: 'This week', icon: '🎯', trend: null },
          ].map((kpi, i) => (
            <div key={i} style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #0047FF, #3B82F6)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>{kpi.label}</span>
                <span style={{ fontSize: '20px' }}>{kpi.icon}</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: '8px' }}>{kpi.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {kpi.trend && <span style={{ background: '#052e16', color: '#10B981', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px' }}>↑</span>}
                <span style={{ fontSize: '12px', color: kpi.trend ? '#10B981' : '#64748B' }}>{kpi.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>Weekly Revenue</h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>May 4 – May 10, 2026</p>
            </div>
            <div style={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 14px', fontSize: '13px', color: '#94A3B8' }}>This Week</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', paddingBottom: '8px' }}>
            {chartBars.map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '100%',
                  height: `${bar.height}%`,
                  background: 'linear-gradient(180deg, #0047FF 0%, #1E3A8A 100%)',
                  borderRadius: '6px 6px 2px 2px',
                  position: 'relative',
                  transition: 'opacity 0.2s',
                  opacity: 0.85,
                }}>
                  <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#0047FF', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {Math.round(bar.height * 1.27)}k
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: 500 }}>{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid: Leads Table + Projects + Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: '20px' }}>

          {/* Recent Leads Table */}
          <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>Recent Leads</h2>
              <a href="/admin/leads" style={{ fontSize: '12px', color: '#0047FF', textDecoration: 'none' }}>View All →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
              {leads.map((lead, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredLead(i)}
                  onMouseLeave={() => setHoveredLead(null)}
                  style={{ background: hoveredLead === i ? '#071128' : '#040d1f', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'background 0.15s', cursor: 'pointer' }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0047FF22', border: '1px solid #0047FF44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#0047FF', flexShrink: 0 }}>
                    {lead.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.name}</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>{lead.email}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center', minWidth: '70px' }}>
                    <div style={{ color: '#94A3B8', fontWeight: 500 }}>{lead.service}</div>
                    <div>{lead.date}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', background: `${statusColors[lead.status]}22`, color: statusColors[lead.status] || '#64748B', border: `1px solid ${statusColors[lead.status]}44` }}>
                      {lead.status}
                    </span>
                    <button style={{ fontSize: '10px', background: '#0047FF', color: '#fff', border: 'none', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', fontWeight: 500 }}>
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>Active Projects</h2>
              <a href="/admin/projects" style={{ fontSize: '12px', color: '#0047FF', textDecoration: 'none' }}>View All →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ background: hoveredProject === i ? '#071128' : '#030b1a', borderRadius: '10px', padding: '16px', transition: 'background 0.15s', cursor: 'pointer', border: '1px solid #0f172a' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>{proj.name}</div>
                      <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{proj.client}</div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Due {proj.deadline}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#0f172a', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${proj.progress}%`, height: '100%', background: proj.progress >= 80 ? '#10B981' : proj.progress >= 50 ? '#0047FF' : '#F59E0B', borderRadius: '3px', transition: 'width 0.3s' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', minWidth: '32px', textAlign: 'right' }}>{proj.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 20px 0' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {activity.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: '20px', position: 'relative' }}>
                  {i < activity.length - 1 && (
                    <div style={{ position: 'absolute', left: '14px', top: '28px', bottom: '0', width: '1px', background: '#1e293b' }} />
                  )}
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0a1628', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0, zIndex: 1 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', color: '#CBD5E1', margin: '0 0 4px 0', lineHeight: '1.4' }}>{item.text}</p>
                    <span style={{ fontSize: '11px', color: '#475569' }}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
