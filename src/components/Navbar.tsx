'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
          background: 'rgba(10,10,10,0.90)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        } : {
          background: 'transparent',
        })
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/digiwolf-icon.png" alt="Digi Wolf Agency" width={44} height={44} priority style={{ objectFit: 'contain' }} />
            <span style={{ marginLeft: 10, color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>DIGIWOLF</span>
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
              background: '#3b82f6', color: '#fff', textDecoration: 'none',
              padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(59,130,246,0.5)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'none'; (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(59,130,246,0.3)'; }}
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
          position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)', zIndex: 999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 24, right: 24,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', width: 44, height: 44, borderRadius: 10, fontSize: 20, cursor: 'pointer',
          }}>✕</button>
          <Image src="/digiwolf-logo.svg" alt="Digi Wolf Agency" width={140} height={56} />
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: '#f0f4ff', textDecoration: 'none', fontSize: 28, fontWeight: 700,
              letterSpacing: '-0.02em', transition: 'color 0.2s',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            background: '#3b82f6', color: '#fff', textDecoration: 'none',
            padding: '16px 40px', borderRadius: 12, fontSize: 18, fontWeight: 700,
            marginTop: 16, boxShadow: '0 8px 30px rgba(59,130,246,0.5)',
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
