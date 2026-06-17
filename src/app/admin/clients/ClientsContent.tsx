'use client';

export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AddClientForm from '@/components/admin/AddClientForm';
import {
  formatProjectStatus,
  formatProjectTimestamp,
  getStatusStyle,
} from '@/lib/project-display';

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

type ClientProject = {
  id: string;
  service_name: string;
  project_status: string;
  created_at: string;
};

type Client = {
  id: string;
  full_name: string | null;
  email: string;
  created_at: string;
  projects: ClientProject[];
};

type ServiceOption = { id: string; name: string; slug: string };

type ClientsPageProps = {
  initialServices?: ServiceOption[];
};

function displayName(client: Client) {
  return client.full_name?.trim() || client.email || 'Unnamed client';
}

function userInitial(client: Client) {
  const source = client.full_name?.trim() || client.email || '?';
  return source.charAt(0).toUpperCase();
}

function primaryProject(client: Client): ClientProject | null {
  return client.projects[0] ?? null;
}

const WolfIcon = () => (
  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" opacity="0.3">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" />
    <polygon points="28,14 24,2 19,12" fill="#0047FF" />
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" />
    <circle cx="12" cy="17" r="2" fill="#F5F5F5" />
    <circle cx="20" cy="17" r="2" fill="#F5F5F5" />
  </svg>
);

function StatusBadge({ status }: { status: string }) {
  const style = getStatusStyle(status);
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: 20,
        background: style.bg,
        color: style.color,
        whiteSpace: 'nowrap',
      }}
    >
      {formatProjectStatus(status)}
    </span>
  );
}

export function ClientsPageInner({ initialServices = [] }: ClientsPageProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/clients');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to load clients (${res.status})`);
      }
      const data = await res.json();
      setClients((data.clients ?? []) as Client[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filtered = clients.filter((client) => {
    const q = search.toLowerCase();
    const name = displayName(client).toLowerCase();
    const email = client.email.toLowerCase();
    const services = client.projects.map((p) => p.service_name.toLowerCase()).join(' ');
    return name.includes(q) || email.includes(q) || services.includes(q);
  });

  return (
    <DashboardLayout
      navItems={adminNav}
      role="admin"
      userName="Digi Wolf Admin"
      userInitial="D"
    >
      <style>{`
        .clients-table-wrap { display: block; }
        .clients-cards { display: none; }
        @media (max-width: 767px) {
          .clients-table-wrap { display: none; }
          .clients-cards { display: flex; flex-direction: column; gap: 12px; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#030712', color: '#F1F5F9', padding: '24px 16px 32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: 6 }}>
                CRM
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>
                Clients
              </h1>
              <p style={{ color: '#64748B', marginTop: 6, fontSize: 14, marginBottom: 0 }}>
                {loading ? 'Loading…' : `${clients.length} onboarded client${clients.length === 1 ? '' : 's'}`}
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: 14 }}>🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search clients…"
                  style={{ background: '#040d1f', border: '1px solid #1e293b', borderRadius: 10, padding: '10px 14px 10px 36px', color: '#F1F5F9', fontSize: 13, outline: 'none', width: 220 }}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowAddClient(true)}
                style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                + Add Client
              </button>
            </div>
          </div>

          <div style={{ background: '#040d1f', border: '1px solid #0d1a35', borderRadius: 16, overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '60px 32px', textAlign: 'center', color: '#8892b0' }}>Loading clients…</div>
            ) : error ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ color: '#f87171', marginBottom: 12, fontSize: 14 }}>{error}</div>
                <button
                  type="button"
                  onClick={fetchClients}
                  style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Retry
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '80px 32px', textAlign: 'center', color: '#8892b0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <WolfIcon />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f4ff', marginBottom: 8 }}>
                  {search ? `No clients match "${search}"` : 'No onboarded clients yet'}
                </div>
                <div style={{ fontSize: 14, marginBottom: search ? 0 : 20 }}>
                  {search ? 'Try a different search term.' : 'Add a client to send them a dashboard invite.'}
                </div>
                {!search && (
                  <button
                    type="button"
                    onClick={() => setShowAddClient(true)}
                    style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                  >
                    + Add Client
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="clients-table-wrap" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #0d1a35' }}>
                        {['Client', 'Email', 'Service', 'Status', 'Projects', 'Onboarded'].map((h) => (
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
                      {filtered.map((client, i) => {
                        const primary = primaryProject(client);
                        return (
                          <tr key={client.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #0a1428' : 'none' }}>
                            <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#0047FF22', border: '1px solid #0047FF44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#0047FF', flexShrink: 0 }}>
                                  {userInitial(client)}
                                </div>
                                <span style={{ color: '#f0f4ff', fontWeight: 600 }}>{displayName(client)}</span>
                              </div>
                            </td>
                            <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                              {client.email ? (
                                <a href={`mailto:${client.email}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>
                                  {client.email}
                                </a>
                              ) : (
                                <span style={{ color: '#64748B' }}>—</span>
                              )}
                            </td>
                            <td style={{ padding: '14px 16px', color: '#c8d3f0', whiteSpace: 'nowrap' }}>
                              {primary ? primary.service_name : '—'}
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              {primary ? <StatusBadge status={primary.project_status} /> : <span style={{ color: '#64748B' }}>—</span>}
                            </td>
                            <td style={{ padding: '14px 16px', color: '#E2E8F0', fontWeight: 600, textAlign: 'center' }}>
                              {client.projects.length}
                            </td>
                            <td style={{ padding: '14px 16px', color: '#8892b0', whiteSpace: 'nowrap', fontSize: 13 }}>
                              {formatProjectTimestamp(client.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="clients-cards" style={{ padding: 16 }}>
                  {filtered.map((client) => {
                    const primary = primaryProject(client);
                    return (
                      <article
                        key={client.id}
                        style={{ background: '#030712', border: '1px solid #0f172a', borderRadius: 12, padding: 16 }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#0047FF22', border: '1px solid #0047FF44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#0047FF', flexShrink: 0 }}>
                            {userInitial(client)}
                          </div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff' }}>{displayName(client)}</div>
                            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                              Onboarded {formatProjectTimestamp(client.created_at)}
                            </div>
                          </div>
                        </div>
                        {client.email && (
                          <a href={`mailto:${client.email}`} style={{ color: '#93c5fd', textDecoration: 'none', fontSize: 13, display: 'block', marginBottom: 12 }}>
                            {client.email}
                          </a>
                        )}
                        {primary ? (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 13, color: '#c8d3f0' }}>{primary.service_name}</span>
                            <StatusBadge status={primary.project_status} />
                          </div>
                        ) : (
                          <div style={{ fontSize: 13, color: '#64748B' }}>No projects yet</div>
                        )}
                        {client.projects.length > 1 && (
                          <div style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
                            +{client.projects.length - 1} more project{client.projects.length - 1 === 1 ? '' : 's'}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {showAddClient && (
          <AddClientForm
            onClose={() => setShowAddClient(false)}
            onSuccess={fetchClients}
            services={initialServices}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
