import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div
      style={{
        background: '#0A0A0A',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: '#111111',
          borderRight: '1px solid #1E1E1E',
          padding: '1.5rem 1rem',
          flexShrink: 0,
        }}
      >
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
            🐺 Digi Wolf
          </span>
        </div>

        <nav>
          {[
            { href: '/client', label: 'Dashboard' },
            { href: '/client/projects', label: 'Projects' },
            { href: '/client/invoices', label: 'Invoices' },
            { href: '/client/files', label: 'Files' },
            { href: '/client/messages', label: 'Messages' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                display: 'block',
                padding: '0.6rem 0.75rem',
                borderRadius: 8,
                color: '#999',
                textDecoration: 'none',
                fontSize: '0.9rem',
                marginBottom: '0.25rem',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
