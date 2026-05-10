'use client'
import Link from 'next/link'

const WolfSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
  </svg>
)

const statCard = (label: string, value: string, sub: string, color = '#0047FF') => (
  <div style={{ background: '#111218', borderRadius: 14, border: '1px solid rgba(96,165,250,0.15)', padding: '24px' }}>
    <div style={{ fontSize: 13, color: '#C0C8D8', marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 900, color, marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 12, color: '#C0C8D8' }}>{sub}</div>
  </div>
)

export default function DashboardPage() {
  const projects = [
    { name: 'Agency Website Redesign', status: 'In Progress', progress: 65, due: 'Jun 15' },
    { name: 'AI Lead Capture Setup', status: 'Review', progress: 90, due: 'Jun 8' },
  ]
  const messages = [
    { from: 'Digi Wolf Team', msg: 'Your homepage mockup is ready for review.', time: '2h ago' },
    { from: 'Digi Wolf Team', msg: 'Invoice #DW-2025-001 has been sent.', time: '1d ago' },
    { from: 'Digi Wolf Team', msg: 'Project kickoff call confirmed for Monday.', time: '3d ago' },
  ]
  const statusColor: Record<string, string> = { 'In Progress': '#0047FF', 'Review': '#FEBC2E', 'Complete': '#28C840', 'Paused': '#C0C8D8' }
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '16px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: '#080808', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '0.06em' }}><WolfSVG/> DIGI WOLF</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 14, color: '#C0C8D8' }}>Client Portal</span>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #0047FF, #3d74ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>C</div>
          </div>
        </div>
      </nav>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Welcome back 👋</h1>
          <p style={{ color: '#C0C8D8' }}>Here's what's happening with your projects.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
          {statCard('Active Projects', '2', 'Currently in progress', '#0047FF')}
          {statCard('Pending Invoices', '1', 'Due within 7 days', '#FEBC2E')}
          {statCard('Unread Messages', '3', 'From Digi Wolf team', '#28C840')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div style={{ background: '#111218', borderRadius: 16, border: '1px solid rgba(96,165,250,0.15)', padding: '28px' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Your Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {projects.map((p, i) => (
                <div key={i} style={{ background: '#0D0D18', borderRadius: 12, padding: '18px', border: '1px solid rgba(96,165,250,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: statusColor[p.status] || '#C0C8D8', background: `${statusColor[p.status]}18`, border: `1px solid ${statusColor[p.status]}30`, borderRadius: 100, padding: '3px 10px' }}>{p.status}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 100, height: 6, marginBottom: 8 }}>
                    <div style={{ background: '#0047FF', borderRadius: 100, height: 6, width: `${p.progress}%`, transition: 'width 0.5s ease' }}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#C0C8D8' }}>
                    <span>{p.progress}% complete</span><span>Due {p.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#111218', borderRadius: 16, border: '1px solid rgba(96,165,250,0.15)', padding: '28px' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Recent Messages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14, borderBottom: i < messages.length - 1 ? '1px solid rgba(96,165,250,0.08)' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #0047FF, #3d74ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>DW</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{m.from}</div>
                    <div style={{ fontSize: 13, color: '#C0C8D8', lineHeight: 1.5 }}>{m.msg}</div>
                    <div style={{ fontSize: 11, color: '#C0C8D8', opacity: 0.6, marginTop: 4 }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 24 }}>
          {[['📋 View All Projects','/dashboard'],['💰 View Invoices','/dashboard'],['📁 File Manager','/dashboard']].map(([label, href]) => (
            <Link key={label} href={href} style={{ background: '#111218', borderRadius: 12, border: '1px solid rgba(96,165,250,0.15)', padding: '18px 20px', fontSize: 14, fontWeight: 600, color: '#F5F5F5', display: 'block', textAlign: 'center', transition: 'border-color 0.2s' }}>{label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
