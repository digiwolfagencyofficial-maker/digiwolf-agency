'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogClient() {
  const t = useTranslations('blog')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(0,71,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 560 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image src="/digiwolf-icon.png" alt="Digi Wolf Agency" width={48} height={48} style={{ objectFit: 'contain' }} />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
              borderRadius: 100, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)',
              fontSize: 12, fontWeight: 600, color: '#3d74ff', letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {t('badge')}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.1 }}>
            {t('title')}
          </h1>
          <p style={{ color: '#8892b0', fontSize: 18, lineHeight: 1.7, marginBottom: 48 }}>
            {t('subtitle')}
          </p>

          {!submitted ? (
            <form onSubmit={handleNotify} style={{ display: 'flex', gap: 12, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('form.placeholder')}
                required
                style={{
                  flex: 1, minWidth: 200, padding: '13px 16px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, color: '#f0f4ff', fontSize: 16, outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '13px 24px', background: '#0047FF', color: '#fff', border: 'none',
                  borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,71,255,0.4)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,71,255,0.6)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,71,255,0.4)' }}
              >
                {t('form.submit')}
              </button>
            </form>
          ) : (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(0,200,100,0.1)', border: '1px solid rgba(0,200,100,0.3)',
              borderRadius: 12, padding: '14px 24px', color: '#00c864', fontSize: 15, fontWeight: 600,
            }}>
              <span style={{ fontSize: 18 }}>✓</span>
              {t('form.success')}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
