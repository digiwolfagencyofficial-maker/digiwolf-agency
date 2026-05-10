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

export default function AboutPage() {
  const values = [
    { icon: '⚡', title: 'Speed Without Compromise', desc: 'We use AI to move faster — never to cut corners. Every project ships fast and ships right.' },
    { icon: '🤝', title: 'Client-First Always', desc: 'We treat your business like our own. Clear communication, honest timelines, real results.' },
    { icon: '🌍', title: 'Built for International Clients', desc: 'We specialise in serving entrepreneurs navigating the Czech market from abroad. No language barrier.' },
    { icon: '🔬', title: 'Technical Excellence', desc: 'We use modern stacks — Next.js, Supabase, Tailwind — and stay ahead of the curve with AI tooling.' },
  ]
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '0.06em' }}><WolfSVG/> DIGI WOLF</Link>
          <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ background: '#0047FF', color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Book a Call</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d74ff', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>About Us</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, marginBottom: 20 }}>Prague-based. <span style={{ color: '#0047FF' }}>Globally minded.</span></h1>
          <p style={{ fontSize: 17, color: '#C0C8D8', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>Digi Wolf Agency s.r.o. is a digital agency founded in Prague, specialising in helping entrepreneurs — especially those from Mongolia and Central/Eastern Europe — establish their digital presence in the Czech Republic and beyond.</p>
        </div>
        <div style={{ background: '#111218', borderRadius: 20, border: '1px solid rgba(96,165,250,0.15)', padding: '48px', marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🐺</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Our Story</h2>
          <p style={{ fontSize: 16, color: '#C0C8D8', lineHeight: 1.75, maxWidth: 600, margin: '0 auto' }}>We started Digi Wolf because we saw a real gap: international entrepreneurs coming to Prague were struggling with language barriers, bureaucratic complexity, and overpriced agencies. We built a solution — fast, English-first, AI-powered digital services at honest Central European prices. Today we serve clients from Mongolia to Germany, from solo founders to growing startups.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 64 }}>
          {values.map((v, i) => (
            <div key={i} style={{ background: '#111218', borderRadius: 14, border: '1px solid rgba(96,165,250,0.15)', padding: '28px 24px' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{v.title}</div>
              <p style={{ fontSize: 14, color: '#C0C8D8', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'center', marginBottom: 64 }}>
          {[['47+','Clients Served'],['98%','Satisfaction Rate'],['3+','Years Experience']].map(([num, label]) => (
            <div key={num} style={{ background: '#111218', borderRadius: 14, border: '1px solid rgba(96,165,250,0.15)', padding: '32px 20px' }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#0047FF', marginBottom: 8 }}>{num}</div>
              <div style={{ fontSize: 14, color: '#C0C8D8' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(0,71,255,0.12) 0%, rgba(0,71,255,0.05) 100%)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 20, padding: '48px 32px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to work with us?</h2>
          <p style={{ fontSize: 16, color: '#C0C8D8', marginBottom: 28 }}>Book a free 30-minute strategy call and let's talk about your project.</p>
          <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0047FF', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, boxShadow: '0 0 28px rgba(0,71,255,0.35)' }}>📅 Book Free Consultation →</Link>
        </div>
      </div>
    </div>
  )
}
