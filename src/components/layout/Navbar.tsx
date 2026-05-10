'use client'

import { useEffect, useRef, useState } from 'react'

const WolfLogo = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
      closeMenu()
    }
  }

  return (
    <nav id="navbar" ref={navRef} className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <WolfLogo />
            DIGI WOLF
          </a>
          <ul className="nav-links">
            <li><a href="#services" onClick={e => handleAnchorClick(e, '#services')}>Services</a></li>
            <li><a href="#how" onClick={e => handleAnchorClick(e, '#how')}>Process</a></li>
            <li><a href="#cases" onClick={e => handleAnchorClick(e, '#cases')}>Work</a></li>
            <li><a href="#pricing" onClick={e => handleAnchorClick(e, '#pricing')}>Pricing</a></li>
            <li><a href="#faq" onClick={e => handleAnchorClick(e, '#faq')}>FAQ</a></li>
          </ul>
          <a
            href="https://calendly.com/digiwolf-agency-consultation/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta desktop-only"
          >
            Book a Call
          </a>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            id="hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        <a href="#services" onClick={e => handleAnchorClick(e, '#services')}>Services</a>
        <a href="#how" onClick={e => handleAnchorClick(e, '#how')}>Process</a>
        <a href="#cases" onClick={e => handleAnchorClick(e, '#cases')}>Work</a>
        <a href="#pricing" onClick={e => handleAnchorClick(e, '#pricing')}>Pricing</a>
        <a href="#faq" onClick={e => handleAnchorClick(e, '#faq')}>FAQ</a>
        <a
          href="https://calendly.com/digiwolf-agency-consultation/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          onClick={closeMenu}
        >
          Book a Call →
        </a>
      </div>
    </nav>
  )
}
