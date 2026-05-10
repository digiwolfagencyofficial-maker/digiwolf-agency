import { auth } from '@/lib/auth'

export default async function ClientDashboard() {
  const session = await auth()

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Welcome back, {session?.user?.name?.split(' ')[0] ?? 'Client'}
      </h1>
      <p style={{ color: '#666', marginBottom: '2.5rem' }}>
        Here&apos;s an overview of your projects and account.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { label: 'Active Projects', value: '—', color: '#0047FF' },
          { label: 'Pending Invoices', value: '—', color: '#FFB800' },
          { label: 'Messages', value: '—', color: '#00C48C' },
          { label: 'Files', value: '—', color: '#FF6B6B' },
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
            <div style={{ color, fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {value}
            </div>
            <div style={{ color: '#666', fontSize: '0.85rem' }}>{label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: '#111111',
          border: '1px solid #1E1E1E',
          borderRadius: 10,
          padding: '2rem',
          textAlign: 'center',
          color: '#444',
        }}
      >
        <p>Your project data will appear here once your account is fully set up.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
          Contact <a href="mailto:hello@digiwolf.agency" style={{ color: '#0047FF' }}>hello@digiwolf.agency</a> to get started.
        </p>
      </div>
    </div>
  )
}
