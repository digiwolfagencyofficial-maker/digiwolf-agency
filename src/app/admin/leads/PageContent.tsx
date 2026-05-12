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

type Lead = {
  id: number;
  name: string;
  company: string;
  service: string;
  value: number;
  daysInStage: number;
  email: string;
  phone: string;
};

type Column = {
  id: string;
  label: string;
  color: string;
  bg: string;
  leads: Lead[];
};

const initialColumns: Column[] = [
  {
    id: 'new',
    label: 'New',
    color: '#0047FF',
    bg: '#0047FF18',
    leads: [
      { id: 1, name: 'Petr Novak', company: 'Firma.cz s.r.o.', service: 'Web Development', value: 85000, daysInStage: 1, email: 'petr@firma.cz', phone: '+420 777 111 222' },
      { id: 2, name: 'Sarah K', company: 'Retail Praha', service: 'SEO Campaign', value: 30000, daysInStage: 3, email: 'sarah@retail.cz', phone: '+420 603 445 556' },
      { id: 3, name: 'Ondrej Blaha', company: 'BlahaTech', service: 'App Design', value: 60000, daysInStage: 2, email: 'ondrej@blahatech.cz', phone: '+420 724 887 990' },
    ],
  },
  {
    id: 'contacted',
    label: 'Contacted',
    color: '#F59E0B',
    bg: '#F59E0B18',
    leads: [
      { id: 4, name: 'Jana Horák', company: 'Shop Online', service: 'SRO Formation', value: 15000, daysInStage: 2, email: 'jana@shop.cz', phone: '+420 731 222 333' },
      { id: 5, name: 'Lukas Mares', company: 'Mares Group', service: 'Branding', value: 45000, daysInStage: 5, email: 'lukas@maresgroup.eu', phone: '+420 608 123 456' },
    ],
  },
  {
    id: 'qualified',
    label: 'Qualified',
    color: '#8B5CF6',
    bg: '#8B5CF618',
    leads: [
      { id: 6, name: 'Mike Chen', company: 'Startup.com', service: 'AI Automation', value: 120000, daysInStage: 4, email: 'mike@startup.com', phone: '+1 415 555 0101' },
      { id: 7, name: 'Eva Kratka', company: 'KratkaTech s.r.o.', service: 'E-commerce Setup', value: 75000, daysInStage: 6, email: 'eva@kratkatech.cz', phone: '+420 776 334 445' },
    ],
  },
  {
    id: 'proposal',
    label: 'Proposal',
    color: '#F97316',
    bg: '#F9731618',
    leads: [
      { id: 8, name: 'Martin Vlcek', company: 'Vlcek Holdings', service: 'Web + SEO Bundle', value: 95000, daysInStage: 8, email: 'martin@vlcek.cz', phone: '+420 602 889 001' },
      { id: 9, name: 'Tereza Benes', company: 'BenesPR', service: 'Social Media', value: 25000, daysInStage: 3, email: 'tereza@benespr.cz', phone: '+420 739 557 778' },
    ],
  },
  {
    id: 'won',
    label: 'Won',
    color: '#10B981',
    bg: '#10B98118',
    leads: [
      { id: 10, name: 'Tom B', company: 'Brand Studio', service: 'Branding Package', value: 55000, daysInStage: 10, email: 'tom@brand.cz', phone: '+420 728 001 002' },
      { id: 11, name: 'Alena Novotna', company: 'Novotna Real', service: 'Landing Page', value: 40000, daysInStage: 7, email: 'alena@novotnareal.cz', phone: '+420 605 221 334' },
    ],
  },
];

const lostLeads: Lead[] = [
  { id: 12, name: 'Pavel Ruzicka', company: 'OldTech', service: 'App Development', value: 200000, daysInStage: 30, email: 'pavel@oldtech.cz', phone: '+420 601 000 111' },
  { id: 13, name: 'Ivana Horakova', company: 'SmallBiz', service: 'Logo Design', value: 8000, daysInStage: 14, email: 'ivana@smallbiz.cz', phone: '+420 777 999 888' },
];

export function LeadPipelinePage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [lostExpanded, setLostExpanded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewLead, setViewLead] = useState<Lead | null>(null);

  const moveForward = (leadId: number, currentColId: string) => {
    const colOrder = ['new', 'contacted', 'qualified', 'proposal', 'won'];
    const currentIdx = colOrder.indexOf(currentColId);
    if (currentIdx === colOrder.length - 1) return;
    const nextColId = colOrder[currentIdx + 1];

    setColumns(prev => {
      const lead = prev.find(c => c.id === currentColId)?.leads.find(l => l.id === leadId);
      if (!lead) return prev;
      return prev.map(col => {
        if (col.id === currentColId) return { ...col, leads: col.leads.filter(l => l.id !== leadId) };
        if (col.id === nextColId) return { ...col, leads: [...col.leads, { ...lead, daysInStage: 0 }] };
        return col;
      });
    });
  };

  return (
    <DashboardLayout
      navItems={adminNav}
      role="admin"
      userName="Digi Wolf Admin"
      userInitial="D"
    >
      <div style={{ minHeight: '100vh', background: '#030712', color: '#F1F5F9', padding: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: '6px' }}>CRM</div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>Lead Pipeline</h1>
            <p style={{ color: '#64748B', marginTop: '6px', fontSize: '14px' }}>
              {columns.reduce((acc, col) => acc + col.leads.length, 0)} active leads &bull; {columns.reduce((acc, col) => acc + col.leads.reduce((s, l) => s + l.value, 0), 0).toLocaleString()} CZK total pipeline
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 22px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            + Add Lead
          </button>
        </div>

        {/* Kanban Board */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
          {columns.map(col => {
            const colTotal = col.leads.reduce((s, l) => s + l.value, 0);
            return (
              <div key={col.id} style={{ minWidth: '220px' }}>
                {/* Column Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: col.color }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#E2E8F0' }}>{col.label}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: col.bg, color: col.color, border: `1px solid ${col.color}33`, borderRadius: '20px', padding: '1px 8px' }}>{col.leads.length}</span>
                  </div>
                </div>

                {/* Column Total */}
                <div style={{ fontSize: '11px', color: '#475569', marginBottom: '12px', padding: '0 2px' }}>
                  {colTotal.toLocaleString()} CZK
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.leads.map(lead => (
                    <div
                      key={lead.id}
                      onMouseEnter={() => setHoveredCard(lead.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: '#040d1f',
                        border: `1px solid ${hoveredCard === lead.id ? col.color + '66' : '#0f172a'}`,
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        transform: hoveredCard === lead.id ? 'translateY(-3px)' : 'translateY(0)',
                        transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                        boxShadow: hoveredCard === lead.id ? `0 8px 24px ${col.color}22` : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: col.bg, border: `1px solid ${col.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: col.color }}>
                          {lead.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: '10px', color: '#475569' }}>{lead.daysInStage}d</span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9', marginBottom: '2px' }}>{lead.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>{lead.company}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '10px', background: '#0a1628', borderRadius: '6px', padding: '4px 8px', display: 'inline-block' }}>{lead.service}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: col.color, marginBottom: '12px' }}>{lead.value.toLocaleString()} CZK</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); moveForward(lead.id, col.id); }}
                          style={{ flex: 1, fontSize: '10px', fontWeight: 600, background: col.bg, color: col.color, border: `1px solid ${col.color}44`, borderRadius: '6px', padding: '5px 6px', cursor: 'pointer' }}
                        >
                          Move →
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setViewLead(lead); }}
                          style={{ flex: 1, fontSize: '10px', fontWeight: 600, background: '#0a1628', color: '#94A3B8', border: '1px solid #1e293b', borderRadius: '6px', padding: '5px 6px', cursor: 'pointer' }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lost Leads Section */}
        <div style={{ marginTop: '32px', background: '#040d1f', border: '1px solid #0f172a', borderRadius: '14px', overflow: 'hidden' }}>
          <button
            onClick={() => setLostExpanded(!lostExpanded)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>❌</span>
              Lost Leads
              <span style={{ fontSize: '11px', background: '#1e293b', color: '#64748B', borderRadius: '20px', padding: '2px 8px' }}>{lostLeads.length}</span>
            </div>
            <span style={{ transform: lostExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', fontSize: '12px' }}>▼</span>
          </button>
          {lostExpanded && (
            <div style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lostLeads.map(lead => (
                <div key={lead.id} style={{ background: '#030712', border: '1px solid #0f172a', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>{lead.name} — {lead.company}</div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{lead.service} · {lead.value.toLocaleString()} CZK</div>
                  </div>
                  <button style={{ fontSize: '11px', background: '#0a1628', color: '#94A3B8', border: '1px solid #1e293b', borderRadius: '6px', padding: '5px 12px', cursor: 'pointer' }}>
                    Reopen
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Lead Modal */}
        {viewLead && (
          <div style={{ position: 'fixed', inset: 0, background: '#00000088', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewLead(null)}>
            <div style={{ background: '#040d1f', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', minWidth: '400px', maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>{viewLead.name}</h2>
                <button onClick={() => setViewLead(null)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '18px' }}>✕</button>
              </div>
              {[
                ['Company', viewLead.company],
                ['Email', viewLead.email],
                ['Phone', viewLead.phone],
                ['Service', viewLead.service],
                ['Estimated Value', `${viewLead.value.toLocaleString()} CZK`],
                ['Days in Stage', `${viewLead.daysInStage} days`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #0f172a' }}>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>{k}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#E2E8F0' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Lead Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: '#00000088', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAddModal(false)}>
            <div style={{ background: '#040d1f', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', minWidth: '400px', maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>Add New Lead</h2>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '18px' }}>✕</button>
              </div>
              {['Full Name', 'Company', 'Email', 'Phone', 'Service Interested In', 'Estimated Value (CZK)'].map(field => (
                <div key={field} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '6px', fontWeight: 500 }}>{field}</label>
                  <input
                    placeholder={field}
                    style={{ width: '100%', background: '#030712', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px', color: '#F1F5F9', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <button style={{ width: '100%', marginTop: '8px', background: '#0047FF', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Add to Pipeline
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
