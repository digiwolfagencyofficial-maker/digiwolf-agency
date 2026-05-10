import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminDashboard() {
  const session = await auth()

  if ((session?.user as any)?.role !== 'admin') {
    redirect('/client')
  }

  // Fetch stats
  const [{ count: leadsCount }, { count: projectsCount }, { count: clientsCount }] =
    await Promise.all([
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('projects').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
    ])

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Admin Dashboard
      </h1>
      <p style={{ color: '#666', marginBottom: '2.5rem' }}>
        Manage all clients, projects, and leads.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { label: 'Total Clients', value: clientsCount ?? 0, color: '#0047FF' },
          { label: 'Active Projects', value: projectsCount ?? 0, color: '#00C48C' },
          { label: 'New Leads', value: leadsCount ?? 0, color: '#FFB800' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: '#111111',
              border: '1px solid #1E1E1E',
              borderRadius: 10,
              padding: '1.5rem',
            }}
          >
            <div style={{ color, fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {value}
            </div>
            <div style={{ color: '#666', fontSize: '0.85rem' }}>{label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {[
          { title: 'Manage Clients', href: '/admin/clients', desc: 'View and manage all client accounts' },
          { title: 'Projects', href: '/admin/projects', desc: 'Track all active and completed projects' },
          { title: 'Invoices', href: '/admin/invoices', desc: 'Create and manage invoices' },
          { title: 'Leads', href: '/admin/leads', desc: 'View incoming leads from contact form' },
        ].map(({ title, href, desc }) => (
          <a
            key={href}
            href={href}
            style={{
              display: 'block',
              background: '#111111',
              border: '1px solid #1E1E1E',
              borderRadius: 10,
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.2s',
            }}
          >
            <h3 style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>{desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
