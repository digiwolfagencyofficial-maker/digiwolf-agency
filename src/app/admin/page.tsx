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

export default function AdminPage() {
  const leads = [
    { name: 'Ankhbayar T.', email: 'ankhbayar@mail.mn', service: 'Czech S.R.O. Formation', status: 'New', budget: '12,000 CZK' },
    { name: 'Martin Kovář', email: 'martin@kovarsro.cz', service: 'Agency Website', status: 'Contacted', budget: '20,000 CZK' },
    { name: 'Elena Müller', email: 'elena@flowlab.de', service: 'AI Automation', status: 'Qualified', budget: '35,000+ CZK' },
    { name: 'Bilguun S.', email: 'bilguun@startup.mn', service: 'Full-Stack Web App', status: 'Proposal', budget: 'Custom' },
    { name: 'Tomáš Novák', email: 'tomas@webproj.cz', service: 'SEO & Growth', status: 'New', budget: '8,000 CZK' },
    { name: 'Sara Kim', email: 'sara@kimdesign.eu', service: 'Brand Identity', status: 'Won', budget: '15,000 CZK' },
    { name: 'Lukas Baier', email: 'lukas@baier.at', service: 'Maintenance Plan', status: 'Won', budget: '3,000 CZK/mo' },
    { name: 'Zorigoo B.', email: 'zorigoo@mongol.cz', service: 'Czech S.R.O. Formation', status: 'New', budget: '12,000 CZK' },
  ]
  const statusColor: Record<string, string> = { 'New': '#3d74ff', 'Contacted': '#FEBC2E', 'Qualified': '#a855f7', 'Proposal': '#f97316', 'Won': '#28C840', 'Lost': '#C0C8D8' }
  const stats = [['47', 'Total Clients', '#0047FF'],['12', 'Active Projects', '#28C840'],['8', 'New Leads', '#FEBC2E'],['450,000', 'Revenue (CZK)', '#a855f7']]
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '16px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: '#080808', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <WolfSVG/>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>DIGI WOLF</div>
              <div style={{ fontSize: 11, color: '#C0C8D8', marginTop: -2 }}>Admin Dashboard</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" style={{ fontSize: 13, color: '#C0C8D8', padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(96,165,250,0.15)' }}>View Site</Link>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #0047FF, #3d74ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>A</div>
          </div>
        </div>
      </nav>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Admin Dashboard</h1>
          <p style={{ color: '#C0C8D8', fontSize: 14 }}>Digi Wolf Agency s.r.o. — Internal overview</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
          {stats.map(([val, label, color]) => (
            <div key={label} style={{ background: '#111218', borderRadius: 14, border: '1px solid rgba(96,165,250,0.15)', padding: '24px' }}>
              <div style={{ fontSize: 13, color: '#C0C8D8', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: color as string }}>{label.includes('Revenue') ? `${val} CZK` : val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111218', borderRadius: 16, border: '1px solid rgba(96,165,250,0.15)', padding: '28px', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Leads Inbox</h3>
            <span style={{ background: 'rgba(0,71,255,0.12)', color: '#3d74ff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid rgba(0,71,255,0.25)' }}>{leads.filter(l => l.status === 'New').length} new</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(96,165,250,0.1)' }}>
                  {['Name','Email','Service','Budget','Status','Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 600, color: '#C0C8D8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(96,165,250,0.06)' }}>
                    <td style={{ padding: '14px 12px', fontSize: 14, fontWeight: 600 }}>{l.name}</td>
                    <td style={{ padding: '14px 12px', fontSize: 14, color: '#C0C8D8' }}>{l.email}</td>
                    <td style={{ padding: '14px 12px', fontSize: 14, color: '#C0C8D8' }}>{l.service}</td>
                    <td style={{ padding: '14px 12px', fontSize: 14, color: '#C0C8D8' }}>{l.budget}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: statusColor[l.status], background: `${statusColor[l.status]}18`, border: `1px solid ${statusColor[l.status]}30`, borderRadius: 100, padding: '3px 10px' }}>{l.status}</span>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <button style={{ background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#3d74ff', cursor: 'pointer' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {['📋 Projects','💰 Invoices','👥 Clients','📊 Analytics'].map(label => (
            <div key={label} style={{ background: '#111218', borderRadius: 12, border: '1px solid rgba(96,165,250,0.15)', padding: '20px', textAlign: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
