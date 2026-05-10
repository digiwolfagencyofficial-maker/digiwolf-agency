'use client'

import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div
      id="scrollTop"
      role="button"
      tabIndex={0}
      aria-label="Back to top"
      className={visible ? 'visible' : ''}
      onClick={handleClick}
      onKeyDown={e => { if (e.key === 'Enter') handleClick() }}
    >
      ↑
    </div>
  )
}
