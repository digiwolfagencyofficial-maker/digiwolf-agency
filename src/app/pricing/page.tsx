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

const cal = 'https://calendly.com/digiwolf-agency-consultation/30min'

export default function PricingPage() {
  const plans = [
    { tier: 'Starter', price: '15,000', sub: 'CZK', desc: 'Perfect for solo founders and small businesses who need a professional online presence fast.', features: ['Up to 5-page custom website','Mobile-responsive design','Basic on-page SEO setup','Contact form & Google Maps','3 months free minor edits','Google Analytics setup'], btn: 'Get Started →', primary: false },
    { tier: 'Growth', price: '35,000', sub: 'CZK', desc: 'For growing businesses that need a powerful site or web app with more pages and integrations.', features: ['Everything in Starter','Up to 15 pages or web app MVP','CMS integration (headless or WordPress)','Analytics & conversion tracking','AI chatbot or lead capture automation','Priority support & 6-month maintenance'], btn: 'Book Your Call →', primary: true, popular: true },
    { tier: 'Studio', price: 'Custom', sub: '', desc: 'For complex projects, mobile apps, full S.R.O. packages, or ongoing retainer partnerships.', features: ['Full-stack web or mobile app','Czech S.R.O. formation bundle','Dedicated project manager','AI automation & custom integrations','Ongoing maintenance retainer','White-glove strategy sessions'], btn: 'Talk to Us →', primary: false },
  ]
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '0.06em' }}><WolfSVG/> DIGI WOLF</Link>
          <Link href={cal} target="_blank" style={{ background: '#0047FF', color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Book a Call</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-flex', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d74ff', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>Transparent Pricing</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, marginBottom: 16 }}>Simple, <span style={{ color: '#0047FF' }}>Honest Pricing</span></h1>
          <p style={{ fontSize: 17, color: '#C0C8D8', maxWidth: 520, margin: '0 auto' }}>No hidden fees. No surprises. Choose a package that fits your goals and budget — or let's build something custom.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 64 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ background: '#111218', borderRadius: 14, border: p.primary ? '1px solid #0047FF' : '1px solid rgba(96,165,250,0.15)', padding: '32px 28px', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: p.primary ? '0 0 40px rgba(0,71,255,0.2)' : 'none' }}>
              {p.popular && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#0047FF', color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, whiteSpace: 'nowrap' }}>⭐ Most Popular</div>}
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0047FF', marginBottom: 12 }}>{p.tier}</div>
              <div style={{ fontSize: p.price === 'Custom' ? 32 : 40, fontWeight: 900, marginBottom: 4 }}>{p.price} {p.sub && <span style={{ fontSize: 16, fontWeight: 400 }}>{p.sub}</span>}</div>
              <p style={{ fontSize: 14, color: '#C0C8D8', marginBottom: 28 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {p.features.map(f => <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#C0C8D8', alignItems: 'flex-start' }}><span style={{ color: '#0047FF', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>)}
              </ul>
              <Link href={cal} target="_blank" style={{ display: 'block', textAlign: 'center', padding: 13, borderRadius: 10, fontWeight: 700, fontSize: 14, background: p.primary ? '#0047FF' : 'transparent', color: p.primary ? '#fff' : '#F5F5F5', border: p.primary ? 'none' : '1px solid rgba(96,165,250,0.2)', boxShadow: p.primary ? '0 0 24px rgba(0,71,255,0.35)' : 'none' }}>{p.btn}</Link>
            </div>
          ))}
        </div>
        <div style={{ background: '#111218', borderRadius: 16, border: '1px solid rgba(96,165,250,0.15)', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Need a custom quote?</h3>
          <p style={{ fontSize: 15, color: '#C0C8D8', marginBottom: 20 }}>Every project is unique. Book a free consultation and we'll build a tailored proposal for you.</p>
          <Link href={cal} target="_blank" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: '#0047FF', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700 }}>📅 Book Free Consultation</Link>
        </div>
      </div>
    </div>
  )
}
