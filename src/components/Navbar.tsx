'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const WolfSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(96,165,250,0.15)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <WolfSVG size={32} />
          <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.08em', color: '#F5F5F5' }}>DIGI WOLF</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {[
            { label: 'Services', href: '/services' },
            { label: 'Process', href: '/#process' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'FAQ', href: '/#faq' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ color: '#C0C8D8', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C0C8D8')}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              background: '#0047FF',
              color: '#F5F5F5',
              padding: '10px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#3d74ff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0047FF')}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#F5F5F5', cursor: 'pointer', display: 'none', padding: '8px' }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: '#111218',
          borderTop: '1px solid rgba(96,165,250,0.15)',
          padding: '16px 24px 24px',
        }} className="flex md:hidden flex-col gap-4">
          {[
            { label: 'Services', href: '/services' },
            { label: 'Process', href: '/#process' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'FAQ', href: '/#faq' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: '#C0C8D8', fontSize: '15px', fontWeight: 500, padding: '8px 0' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              background: '#0047FF',
              color: '#F5F5F5',
              padding: '12px 22px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 600,
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
