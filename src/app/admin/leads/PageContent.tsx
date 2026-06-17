'use client';

export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useState } from 'react';
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

type Lead = {
  id: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
};

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Prague',
  });
}

function truncate(text: string, max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function LeadPipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to load leads (${res.status})`);
      }
      const data = await res.json();
      setLeads((data.leads ?? []) as Lead[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <DashboardLayout navItems={adminNav}>
      <style>{`
        .leads-table-wrap { display: block; }
        .leads-cards { display: none; }
        @media (max-width: 767px) {
          .leads-table-wrap { display: none; }
          .leads-cards { display: flex; flex-direction: column; gap: 12px; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#030712', color: '#F1F5F9', padding: '24px 16px 32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>
              Contact form
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>
              Leads
            </h1>
            <p style={{ color: '#64748B', marginTop: 6, fontSize: 14, marginBottom: 0 }}>
              {loading ? 'Loading…' : `${leads.length} submission${leads.length === 1 ? '' : 's'}`}
            </p>
          </div>

          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '60px 32px', textAlign: 'center', color: '#8892b0' }}>Loading leads…</div>
            ) : error ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ color: '#f87171', marginBottom: 12, fontSize: 14 }}>{error}</div>
                <button
                  type="button"
                  onClick={fetchLeads}
                  style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Retry
                </button>
              </div>
            ) : leads.length === 0 ? (
              <div style={{ padding: '80px 32px', textAlign: 'center', color: '#8892b0' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f4ff', marginBottom: 8 }}>No contact form submissions yet</div>
                <div style={{ fontSize: 14 }}>Leads from the contact page will appear here.</div>
              </div>
            ) : (
              <>
                <div className="leads-table-wrap" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                        {['Name', 'Email', 'Message', 'Submitted'].map((h) => (
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
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead, i) => {
                        const msg = lead.message?.trim() || '—';
                        const isLong = msg.length > 120;
                        const isExpanded = expandedId === lead.id;
                        return (
                          <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #0a1428' : 'none' }}>
                            <td style={{ padding: '14px 16px', color: '#f0f4ff', fontWeight: 600, whiteSpace: 'nowrap' }}>
                              {lead.name}
                            </td>
                            <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                              <a href={`mailto:${lead.email}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>
                                {lead.email}
                              </a>
                            </td>
                            <td style={{ padding: '14px 16px', color: '#c8d3f0', maxWidth: 420 }}>
                              <span>{isExpanded || !isLong ? msg : truncate(msg)}</span>
                              {isLong && (
                                <button
                                  type="button"
                                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                                  style={{ marginLeft: 8, background: 'none', border: 'none', color: '#3d74ff', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: 0 }}
                                >
                                  {isExpanded ? 'Less' : 'More'}
                                </button>
                              )}
                            </td>
                            <td style={{ padding: '14px 16px', color: '#8892b0', whiteSpace: 'nowrap', fontSize: 13 }}>
                              {formatSubmittedAt(lead.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="leads-cards" style={{ padding: 16 }}>
                  {leads.map((lead) => {
                    const msg = lead.message?.trim() || '—';
                    const isLong = msg.length > 120;
                    const isExpanded = expandedId === lead.id;
                    return (
                      <article
                        key={lead.id}
                        style={{ background: '#030712', border: '1px solid #0f172a', borderRadius: 12, padding: 16 }}
                      >
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 4 }}>{lead.name}</div>
                        <a href={`mailto:${lead.email}`} style={{ color: '#93c5fd', textDecoration: 'none', fontSize: 13, display: 'block', marginBottom: 10 }}>
                          {lead.email}
                        </a>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 10 }}>{formatSubmittedAt(lead.created_at)}</div>
                        <div style={{ fontSize: 13, color: '#c8d3f0', lineHeight: 1.5 }}>
                          {isExpanded || !isLong ? msg : truncate(msg)}
                          {isLong && (
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                              style={{ display: 'block', marginTop: 6, background: 'none', border: 'none', color: '#3d74ff', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: 0 }}
                            >
                              {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
