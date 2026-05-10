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

export default function CaseStudiesPage() {
  const cases = [
    { tag: '🇲🇳 Company Formation + Website', title: 'MongolBiz.cz', client: 'Bat-Erdene Munkh', duration: '3 weeks', year: '2025', result: 'Czech S.R.O. registered, bilingual site live in 3 weeks', desc: 'A Mongolian entrepreneur expanding into Central Europe needed two things: a legally registered Czech company and a professional website. We handled the full Czech S.R.O. registration process in English, built a bilingual Czech/English corporate website with SEO, and set up professional email infrastructure — all delivered in under 3 weeks.', outcomes: ['+220% web traffic in 60 days','S.R.O. registered in 11 days','Bilingual SEO from day one','Full email & hosting setup'], pills: ['S.R.O. Formation','Next.js','Supabase','Bilingual','3 weeks'] },
    { tag: '🇨🇿 Full-Stack Web App', title: 'TechStart Prague', client: 'Jakub Novotný', duration: '6 weeks', year: '2025', result: 'SaaS MVP live with auth, billing, and real-time dashboard', desc: 'An early-stage Czech SaaS startup needed to go from idea to live product in 6 weeks. We built a full-stack platform with user authentication, subscription billing via Stripe, a real-time dashboard, REST API, and admin panel. Delivered on time with 0 critical bugs at launch.', outcomes: ['Launched on time, 0 critical bugs','First 50 paying users in week 2','Stripe billing fully integrated','Admin dashboard + analytics'], pills: ['Next.js','Supabase','Stripe','TypeScript','6 weeks'] },
  ]
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '0.06em' }}><WolfSVG/> DIGI WOLF</Link>
          <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ background: '#0047FF', color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Book a Call</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-flex', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d74ff', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>Case Studies</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, marginBottom: 16 }}>Real Projects, <span style={{ color: '#0047FF' }}>Real Results</span></h1>
          <p style={{ fontSize: 17, color: '#C0C8D8', maxWidth: 560, margin: '0 auto' }}>From Mongolian entrepreneurs entering the Czech market to tech startups launching SaaS platforms.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {cases.map((c, i) => (
            <div key={i} style={{ background: '#111218', borderRadius: 20, border: '1px solid rgba(96,165,250,0.15)', overflow: 'hidden' }}>
              <div style={{ padding: '36px 40px', borderBottom: '1px solid rgba(96,165,250,0.1)' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#0047FF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'block' }}>{c.tag}</span>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{c.title}</h2>
                    <p style={{ fontSize: 15, color: '#C0C8D8', marginBottom: 20, lineHeight: 1.7 }}>{c.desc}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {c.pills.map(p => <span key={p} style={{ fontSize: 12, color: '#C0C8D8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 100, padding: '4px 14px' }}>{p}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 180 }}>
                    {[['Client',c.client],['Duration',c.duration],['Year',c.year]].map(([k,v]) => (
                      <div key={k} style={{ background: '#0D0D18', borderRadius: 10, padding: '12px 16px' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#3d74ff', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                        <div style={{ fontSize: 14, color: '#F5F5F5', fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 40px', background: 'rgba(0,71,255,0.04)' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#3d74ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Key Outcomes</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                  {c.outcomes.map(o => <div key={o} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: '#C0C8D8' }}><span style={{ color: '#0047FF', fontWeight: 700 }}>✓</span>{o}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, textAlign: 'center', background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.05) 100%)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 20, padding: '48px 32px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Want results like these?</h2>
          <p style={{ color: '#C0C8D8', marginBottom: 24 }}>Book a free 30-minute call and let's talk about your project.</p>
          <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: '#0047FF', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, boxShadow: '0 0 24px rgba(0,71,255,0.35)' }}>📅 Book Free Consultation →</Link>
        </div>
      </div>
    </div>
  )
}
