'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WolfLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7"/>
    <circle cx="16" cy="21.5" r="1.3" fill="#0A1050"/>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        transition: 'all 0.3s ease',
        ...(scrolled ? {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(3,7,18,0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        } : {
          background: 'transparent',
        })
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <WolfLogo size={36} />
            <span style={{ fontWeight: 700, fontSize: 18, color: '#f0f4ff', letterSpacing: '-0.02em' }}>
              Digi Wolf<span style={{ color: '#0047FF' }}>.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                color: '#8892b0', textDecoration: 'none', padding: '8px 16px',
                borderRadius: 8, fontSize: 14, fontWeight: 500,
                transition: 'color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#f0f4ff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#8892b0'; (e.target as HTMLElement).style.background = 'transparent'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/login" style={{
              color: '#8892b0', textDecoration: 'none', fontSize: 14, fontWeight: 500,
              padding: '8px 16px', borderRadius: 8, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              className="hidden-mobile"
            >
              Sign In
            </Link>
            <Link href="/contact" style={{
              background: '#0047FF', color: '#fff', textDecoration: 'none',
              padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(0,71,255,0.3)',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,71,255,0.5)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'none'; (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,71,255,0.3)'; }}
            >
              Get Started →
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
              className="show-mobile"
              aria-label="Menu"
            >
              <div style={{ width: 22, height: 2, background: '#f0f4ff', marginBottom: 5, borderRadius: 2 }}/>
              <div style={{ width: 16, height: 2, background: '#f0f4ff', marginBottom: 5, borderRadius: 2 }}/>
              <div style={{ width: 22, height: 2, background: '#f0f4ff', borderRadius: 2 }}/>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.98)',
          backdropFilter: 'blur(20px)', zIndex: 999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 24, right: 24,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', width: 44, height: 44, borderRadius: 10, fontSize: 20, cursor: 'pointer',
          }}>✕</button>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: '#f0f4ff', textDecoration: 'none', fontSize: 28, fontWeight: 700,
              letterSpacing: '-0.02em', transition: 'color 0.2s',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            background: '#0047FF', color: '#fff', textDecoration: 'none',
            padding: '16px 40px', borderRadius: 12, fontSize: 18, fontWeight: 700,
            marginTop: 16, boxShadow: '0 8px 30px rgba(0,71,255,0.5)',
          }}>
            Get Started →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
