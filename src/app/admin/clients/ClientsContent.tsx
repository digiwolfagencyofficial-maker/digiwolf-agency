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
];

type Client = {
  id: number;
  initial: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  activeProjects: number;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  lastContact: string;
  location: string;
  since: string;
  projects: { name: string; status: string; value: number }[];
  invoices: { id: string; amount: number; status: string; date: string }[];
};

const clients: Client[] = [
  {
    id: 1,
    initial: 'P',
    name: 'Petr Novak',
    company: 'Firma.cz s.r.o.',
    email: 'petr@firma.cz',
    phone: '+420 777 111 222',
    activeProjects: 2,
    totalSpent: 245000,
    status: 'Active',
    lastContact: 'Today',
    location: 'Prague, CZ',
    since: 'Jan 2025',
    projects: [
      { name: 'E-commerce Redesign', status: 'In Progress', value: 85000 },
      { name: 'SEO Setup', status: 'Completed', value: 30000 },
    ],
    invoices: [
      { id: '#1041', amount: 85000, status: 'Paid', date: 'Apr 2026' },
      { id: '#1038', amount: 30000, status: 'Paid', date: 'Mar 2026' },
    ],
  },
  {
    id: 2,
    initial: 'J',
    name: 'Jana Horák',
    company: 'Shop Online s.r.o.',
    email: 'jana@shop.cz',
    phone: '+420 731 222 333',
    activeProjects: 1,
    totalSpent: 75000,
    status: 'Active',
    lastContact: 'Yesterday',
    location: 'Brno, CZ',
    since: 'Mar 2025',
    projects: [
      { name: 'SRO Legal Formation', status: 'In Progress', value: 15000 },
    ],
    invoices: [
      { id: '#1039', amount: 60000, status: 'Paid', date: 'Apr 2026' },
      { id: '#1042', amount: 15000, status: 'Pending', date: 'May 2026' },
    ],
  },
  {
    id: 3,
    initial: 'M',
    name: 'Mike Chen',
    company: 'Startup.com Inc.',
    email: 'mike@startup.com',
    phone: '+1 415 555 0101',
    activeProjects: 1,
    totalSpent: 320000,
    status: 'Active',
    lastContact: '2 days ago',
    location: 'San Francisco, US',
    since: 'Nov 2024',
    projects: [
      { name: 'AI Chatbot Integration', status: 'In Progress', value: 120000 },
    ],
    invoices: [
      { id: '#1035', amount: 200000, status: 'Paid', date: 'Feb 2026' },
      { id: '#1043', amount: 120000, status: 'Pending', date: 'May 2026' },
    ],
  },
  {
    id: 4,
    initial: 'S',
    name: 'Sarah K',
    company: 'Retail Praha a.s.',
    email: 'sarah@retail.cz',
    phone: '+420 603 445 556',
    activeProjects: 2,
    totalSpent: 98000,
    status: 'Active',
    lastContact: '3 days ago',
    location: 'Prague, CZ',
    since: 'Jun 2025',
    projects: [
      { name: 'SEO Campaign Q2', status: 'In Progress', value: 30000 },
      { name: 'Google Ads Setup', status: 'In Progress', value: 18000 },
    ],
    invoices: [
      { id: '#1036', amount: 50000, status: 'Paid', date: 'Mar 2026' },
      { id: '#1044', amount: 48000, status: 'Overdue', date: 'Apr 2026' },
    ],
  },
  {
    id: 5,
    initial: 'T',
    name: 'Tom B',
    company: 'Brand Studio Prague',
    email: 'tom@brand.cz',
    phone: '+420 728 001 002',
    activeProjects: 1,
    totalSpent: 155000,
    status: 'Active',
    lastContact: '4 days ago',
    location: 'Prague, CZ',
    since: 'Aug 2024',
    projects: [
      { name: 'Full Brand Identity', status: 'In Progress', value: 55000 },
    ],
    invoices: [
      { id: '#1030', amount: 100000, status: 'Paid', date: 'Jan 2026' },
      { id: '#1045', amount: 55000, status: 'Pending', date: 'May 2026' },
    ],
  },
  {
    id: 6,
    initial: 'E',
    name: 'Eva Kratka',
    company: 'KratkaTech s.r.o.',
    email: 'eva@kratkatech.cz',
    phone: '+420 776 334 445',
    activeProjects: 0,
    totalSpent: 40000,
    status: 'Inactive',
    lastContact: '3 weeks ago',
    location: 'Ostrava, CZ',
    since: 'Sep 2025',
    projects: [
      { name: 'Website Audit', status: 'Completed', value: 40000 },
    ],
    invoices: [
      { id: '#1028', amount: 40000, status: 'Paid', date: 'Dec 2025' },
    ],
  },
];

const invoiceStatusColor: Record<string, string> = {
  Paid: '#10B981',
  Pending: '#F59E0B',
  Overdue: '#EF4444',
};

const projectStatusColor: Record<string, string> = {
  'In Progress': '#0047FF',
  'Completed': '#10B981',
};

export function ClientsPageInner() {
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setMessageSent(true);
    setMessageText('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <DashboardLayout
      navItems={adminNav}
      role="admin"
      userName="Digi Wolf Admin"
      userInitial="D"
    >
      <div style={{ minHeight: '100vh', background: '#030712', color: '#F1F5F9', padding: '32px', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: '6px' }}>CRM</div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>Clients</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '14px' }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search clients..."
                style={{ background: '#040d1f', border: '1px solid #1e293b', borderRadius: '10px', padding: '10px 14px 10px 36px', color: '#F1F5F9', fontSize: '13px', outline: 'none', width: '220px' }}
              />
            </div>
            <button style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              + Add Client
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Clients', value: '12', icon: '👥', color: '#0047FF' },
            { label: 'Active Projects', value: '8', icon: '📋', color: '#8B5CF6' },
            { label: 'Monthly Revenue', value: '127k CZK', icon: '💰', color: '#10B981' },
            { label: 'Client Satisfaction', value: '98%', icon: '⭐', color: '#F59E0B' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${stat.color}18`, border: `1px solid ${stat.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 2fr 100px 130px 90px 120px 120px', gap: '0', padding: '12px 20px', borderBottom: '1px solid #0f172a', background: '#030b1a' }}>
            {['Client', 'Company', 'Email', 'Projects', 'Total Spent', 'Status', 'Last Contact', 'Actions'].map(col => (
              <div key={col} style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col}</div>
            ))}
          </div>

          {/* Table Rows */}
          {filtered.map((client) => (
            <div
              key={client.id}
              onMouseEnter={() => setHoveredRow(client.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => setSelectedClient(client)}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 2fr 100px 130px 90px 120px 120px',
                gap: '0',
                padding: '16px 20px',
                borderBottom: '1px solid #0f172a',
                background: hoveredRow === client.id ? '#071128' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s',
                alignItems: 'center',
              }}
            >
              {/* Avatar + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0047FF22', border: '1px solid #0047FF44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#0047FF', flexShrink: 0 }}>
                  {client.initial}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>{client.name}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>{client.location}</div>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: '#94A3B8' }}>{client.company}</div>
              <div style={{ fontSize: '13px', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#E2E8F0', textAlign: 'center' }}>{client.activeProjects}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>{client.totalSpent.toLocaleString()} CZK</div>

              {/* Status */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: client.status === 'Active' ? '#052e16' : '#1e1e2e', color: client.status === 'Active' ? '#10B981' : '#64748B', border: `1px solid ${client.status === 'Active' ? '#10B98144' : '#2d2d4e'}` }}>
                  {client.status}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: '#64748B' }}>{client.lastContact}</div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px' }} onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedClient(client)}
                  title="View"
                  style={{ width: '30px', height: '30px', background: '#0a1628', border: '1px solid #1e293b', borderRadius: '7px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >👁</button>
                <button
                  title="Edit"
                  style={{ width: '30px', height: '30px', background: '#0a1628', border: '1px solid #1e293b', borderRadius: '7px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >✏️</button>
                <button
                  title="Message"
                  style={{ width: '30px', height: '30px', background: '#0a1628', border: '1px solid #1e293b', borderRadius: '7px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >💬</button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
              No clients found for "{search}"
            </div>
          )}
        </div>

        {/* Slide-out Detail Panel */}
        {selectedClient && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setSelectedClient(null)}
              style={{ position: 'fixed', inset: 0, background: '#00000055', zIndex: 40 }}
            />

            {/* Panel */}
            <div style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '420px',
              background: '#040d1f',
              borderLeft: '1px solid #1e293b',
              zIndex: 50,
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '-8px 0 32px #00000066',
            }}>
              {/* Panel Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0047FF22', border: '1px solid #0047FF44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: '#0047FF' }}>
                    {selectedClient.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC' }}>{selectedClient.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{selectedClient.company}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} style={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: '8px', width: '32px', height: '32px', color: '#64748B', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>

              {/* Status Badge */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: selectedClient.status === 'Active' ? '#052e16' : '#1e1e2e', color: selectedClient.status === 'Active' ? '#10B981' : '#64748B', border: `1px solid ${selectedClient.status === 'Active' ? '#10B98144' : '#2d2d4e'}` }}>
                  {selectedClient.status}
                </span>
                <span style={{ fontSize: '12px', color: '#475569', marginLeft: '10px' }}>Client since {selectedClient.since}</span>
              </div>

              {/* Contact Details */}
              <div style={{ background: '#030712', borderRadius: '12px', padding: '18px', marginBottom: '20px', border: '1px solid #0f172a' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Contact Details</div>
                {[
                  ['📧', 'Email', selectedClient.email],
                  ['📞', 'Phone', selectedClient.phone],
                  ['📍', 'Location', selectedClient.location],
                  ['🕒', 'Last Contact', selectedClient.lastContact],
                ].map(([icon, label, value]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px' }}>{icon}</span>
                    <span style={{ fontSize: '12px', color: '#475569', width: '80px', flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: '13px', color: '#CBD5E1', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div style={{ background: '#030712', borderRadius: '12px', padding: '18px', marginBottom: '20px', border: '1px solid #0f172a' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Project History</div>
                {selectedClient.projects.map((proj, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', background: '#040d1f', borderRadius: '8px', border: '1px solid #0f172a' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#E2E8F0' }}>{proj.name}</div>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: projectStatusColor[proj.status] || '#64748B', marginTop: '2px', display: 'block' }}>{proj.status}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>{proj.value.toLocaleString()} CZK</div>
                  </div>
                ))}
              </div>

              {/* Invoices */}
              <div style={{ background: '#030712', borderRadius: '12px', padding: '18px', marginBottom: '20px', border: '1px solid #0f172a' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Invoice Summary</div>
                {selectedClient.invoices.map((inv, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '10px', background: '#040d1f', borderRadius: '8px', border: '1px solid #0f172a' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#E2E8F0' }}>{inv.id}</div>
                      <div style={{ fontSize: '11px', color: '#475569' }}>{inv.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>{inv.amount.toLocaleString()} CZK</div>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: invoiceStatusColor[inv.status] || '#64748B' }}>{inv.status}</span>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #0f172a' }}>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>Total Spent</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#10B981' }}>{selectedClient.totalSpent.toLocaleString()} CZK</span>
                </div>
              </div>

              {/* Quick Message */}
              <div style={{ background: '#030712', borderRadius: '12px', padding: '18px', border: '1px solid #0f172a' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Quick Message</div>
                {messageSent && (
                  <div style={{ background: '#052e16', border: '1px solid #10B98144', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', fontSize: '13px', color: '#10B981', fontWeight: 500 }}>
                    ✓ Message sent to {selectedClient.name}!
                  </div>
                )}
                <textarea
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder={`Write a message to ${selectedClient.name}...`}
                  rows={3}
                  style={{ width: '100%', background: '#040d1f', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#F1F5F9', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{ width: '100%', marginTop: '10px', background: '#0047FF', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Send Message 💬
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
