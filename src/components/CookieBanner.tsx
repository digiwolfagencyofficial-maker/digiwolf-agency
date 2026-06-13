'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const linkStyle = { color: '#3d74ff', textDecoration: 'none' as const }

export default function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('dw-cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('dw-cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('dw-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t('ariaLabel')}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9000,
        background: '#040d1f',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '20px 24px',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        <p style={{ color: '#c8d3f0', fontSize: 14, lineHeight: 1.6, flex: 1, minWidth: 280, margin: 0 }}>
          {t.rich('message', {
            cookiePolicy: (chunks) => (
              <Link href="/cookies" style={linkStyle}>{chunks}</Link>
            ),
            privacyPolicy: (chunks) => (
              <Link href="/privacy" style={linkStyle}>{chunks}</Link>
            ),
          })}
        </p>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <button
            type="button"
            onClick={decline}
            style={{
              padding: '10px 20px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8,
              color: '#8892b0', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.color = '#f0f4ff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#8892b0' }}
          >
            {t('declineButton')}
          </button>
          <button
            type="button"
            onClick={accept}
            style={{
              padding: '10px 20px', background: '#0047FF',
              border: 'none', borderRadius: 8,
              color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,71,255,0.4)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,71,255,0.6)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,71,255,0.4)' }}
          >
            {t('acceptButton')}
          </button>
        </div>
      </div>
    </div>
  )
}
