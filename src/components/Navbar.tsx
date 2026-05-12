'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        transition: 'all 0.3s ease',
        ...(scrolled ? {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(3,7,18,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        } : {
          background: 'transparent',
        })
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Image src="/digiwolf-icon.png" alt="Digi Wolf Agency" width={40} height={40} priority style={{ objectFit: 'contain' }} />
            <span style={{ color: '#f0f4ff', fontWeight: 800, fontSize: 17, letterSpacing: '0.05em' }}>DIGIWOLF</span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
            {navLinks.filter(l => l.href !== '/').map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link key={link.href} href={link.href} style={{
                  color: isActive ? '#f0f4ff' : '#8892b0',
                  background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  textDecoration: 'none', padding: '8px 16px',
                  borderRadius: 8, fontSize: 14, fontWeight: isActive ? 700 : 500,
                  transition: 'color 0.2s, background 0.2s',
                }}
                  onMouseEnter={e => { if (!isActive) { (e.target as HTMLElement).style.color = '#f0f4ff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)' } }}
                  onMouseLeave={e => { if (!isActive) { (e.target as HTMLElement).style.color = '#8892b0'; (e.target as HTMLElement).style.background = 'transparent' } }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/login" style={{
              color: '#8892b0', textDecoration: 'none', fontSize: 14, fontWeight: 500,
              padding: '8px 16px', borderRadius: 8, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f4ff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}
              className="nav-desktop"
            >
              Sign In
            </Link>
            <Link href="/contact" style={{
              background: '#0047FF', color: '#fff', textDecoration: 'none',
              padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(0,71,255,0.35)',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,71,255,0.5)' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'none'; (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,71,255,0.35)' }}
            >
              Get Started →
            </Link>

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
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', paddingTop: 80,
            }}
          >
            {/* Close button */}
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
                    fontSize: 20, fontWeight: isActive ? 700 : 500,
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
              <Link href="/contact" onClick={closeMenu} style={{
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
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
