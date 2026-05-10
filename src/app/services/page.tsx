'use client'
import Link from 'next/link'
import { useState } from 'react'

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

const card = { background: '#111218', borderRadius: 14, border: '1px solid rgba(96,165,250,0.15)', padding: '32px 28px' }

export default function ServicesPage() {
  const services = [
    { icon: '🌐', title: 'Agency Websites', price: 'from 15,000 CZK', features: ['Up to 5-page custom design','Mobile-first responsive','Basic on-page SEO','Contact form & maps','3 months free edits','Google Analytics setup'] },
    { icon: '⚖️', title: 'Czech S.R.O. Formation', price: 'from 12,000 CZK', features: ['Full document preparation','Czech Business Register filing','Notarisation guidance','English translation of all docs','Registered address (1st year)','Post-registration support'] },
    { icon: '🤖', title: 'AI Automation', price: 'from 20,000 CZK', features: ['Lead capture automation','Client onboarding workflows','CRM integrations','Automated reporting','Email & Slack triggers','Custom AI chatbot'] },
    { icon: '📈', title: 'SEO & Growth', price: 'from 8,000 CZK', features: ['Technical SEO audit','Keyword research','On-page optimisation','Monthly reporting','Backlink strategy','Competitor analysis'] },
    { icon: '🎨', title: 'Brand Identity', price: 'from 10,000 CZK', features: ['Logo design (3 concepts)','Color system & typography','Brand guidelines PDF','Social media kit','Business card design','Email signature'] },
    { icon: '🔧', title: 'Maintenance Plans', price: 'from 3,000 CZK/mo', features: ['Monthly CMS updates','Daily automated backups','Uptime monitoring','1hr/mo content edits','SSL management','Priority support queue'] },
  ]
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F5' }}>
      <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(96,165,250,0.15)', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17, color: '#F5F5F5', letterSpacing: '0.06em' }}><WolfSVG/> DIGI WOLF</Link>
          <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ background: '#0047FF', color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Book a Call</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3d74ff', background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>What We Do</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, marginBottom: 16 }}>Services Built for <span style={{ color: '#0047FF' }}>Growth</span></h1>
          <p style={{ fontSize: 17, color: '#C0C8D8', maxWidth: 560, margin: '0 auto' }}>From your first website to full digital infrastructure — we handle every layer of your online presence.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {services.map((s, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3d74ff', marginBottom: 20 }}>{s.price}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {s.features.map(f => <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#C0C8D8' }}><span style={{ color: '#0047FF', fontWeight: 700 }}>✓</span>{f}</li>)}
              </ul>
              <Link href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, background: '#0047FF', color: '#fff', fontWeight: 700, fontSize: 14 }}>Get Started →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
