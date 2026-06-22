'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(3,7,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Logo variant="full" priority className="nav-logo-full" />
          <Logo variant="mark" priority className="nav-logo-mark" />

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
            {navLinks.filter(l => l.href !== '/').map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link key={link.href} href={link.href} style={{
                  padding: '8px 14px', borderRadius: 8,
                  fontSize: 14, fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#f0f4ff' : '#94a3b8',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#f0f4ff' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-desktop">
            <Link href="/login" style={{
              fontSize: 14, fontWeight: 600, color: '#94a3b8', textDecoration: 'none',
              padding: '8px 14px', borderRadius: 8, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f0f4ff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
            >
              Sign In
            </Link>
            <Link href="/book" style={{
              background: '#0047FF', color: '#fff', textDecoration: 'none',
              padding: '10px 22px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,71,255,0.35)', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 8px 30px rgba(0,71,255,0.5)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 4px 20px rgba(0,71,255,0.35)' }}
            >
              Get Started →
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="nav-mobile"
            style={{
              width: 44, height: 44, borderRadius: 10,
              background: menuOpen ? 'rgba(0,71,255,0.15)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', color: '#f0f4ff',
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 998,
              background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', paddingTop: 80,
            }}
          >
            {/* Close button top-right */}
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              style={{
                position: 'absolute', top: 16, right: 24,
                width: 44, height: 44, borderRadius: 10,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f0f4ff',
              }}
            >
              <X size={24} />
            </button>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href} onClick={closeMenu} style={{
                    padding: '16px 20px', borderRadius: 12, textDecoration: 'none',
                    fontSize: 18, fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#f0f4ff' : '#94a3b8',
                    background: isActive ? 'rgba(0,71,255,0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(0,71,255,0.2)' : '1px solid transparent',
                    minHeight: 52, display: 'flex', alignItems: 'center',
                    transition: 'all 0.2s',
                  }}>
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* CTAs at bottom */}
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.07)', paddingBottom: 48 }}>
              <Link href="/login" onClick={closeMenu} style={{
                padding: '14px', borderRadius: 12, textDecoration: 'none',
                fontSize: 16, fontWeight: 600, color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center',
              }}>
                Sign In
              </Link>
              <Link href="/book" onClick={closeMenu} style={{
                padding: '16px', borderRadius: 12, textDecoration: 'none',
                fontSize: 16, fontWeight: 700, color: '#fff',
                background: '#0047FF', textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,71,255,0.4)',
              }}>
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }
        .nav-logo-full { display: inline-flex !important; }
        .nav-logo-mark { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
          .nav-logo-full { display: none !important; }
          .nav-logo-mark { display: inline-flex !important; }
        }
      `}</style>
    </>
  )
}
