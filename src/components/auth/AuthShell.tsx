'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getPasswordStrength } from '@/lib/password-strength'

const ACCENT = '#0047FF'
const TEXT = '#f0f4ff'
const MUTED = '#8892b0'
const BORDER = '#1e2a45'
const INPUT_BG = '#0a1020'
const INPUT_BG_FOCUS = '#0d1528'
const ERROR = '#ef4444'

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

const DIFFERENTIATORS: Array<{ title: string; desc: string }> = [
  { title: 'Founder-led', desc: 'Direct access — no account managers, no hand-offs.' },
  { title: 'Trilingual', desc: 'We work in English, Czech & Mongolian (EN · CZ · MN).' },
  { title: 'Source code always yours', desc: 'You own everything we build. No lock-in.' },
  { title: '24-hour response', desc: 'Real humans reply within one business day.' },
]

function BrandPanel() {
  return (
    <div
      className="login-left-panel"
      style={{
        flex: 1,
        background: 'linear-gradient(135deg, #020818 0%, #030f2a 60%, #040d20 100%)',
        borderRight: '1px solid #0d1a35',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mesh / glow accents */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-8%', right: '-5%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(61,116,255,0.10) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 1 }}
      >
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 40 }}>
          <Image src="/digiwolf-icon-transparent.png" alt="Digi Wolf Agency" width={48} height={48} unoptimized style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT, letterSpacing: '-0.02em' }}>Digi Wolf</span>
        </Link>

        <h2 style={{ fontSize: 34, lineHeight: 1.15, fontWeight: 800, color: TEXT, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Digital weapons for businesses that refuse to blend in.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: MUTED, margin: '0 0 36px' }}>
          Founder-led web, AI automation and Czech company formation. Built for the long game — honest, fast and entirely yours.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: 6, marginTop: 1,
                  background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{d.title}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <BrandPanel />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px 24px',
          background: '#030712',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          {children}
        </motion.div>
      </div>
      <style>{`@keyframes dw-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <Link href="/" className="login-logo-mobile" style={{ display: 'none', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 24 }}>
          <Image src="/digiwolf-icon-transparent.png" alt="Digi Wolf Agency" width={36} height={36} unoptimized style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Digi Wolf</span>
        </Link>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TEXT, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{title}</h1>
        <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.5 }}>{subtitle}</p>
      </div>
      <style>{`@media (max-width: 768px) { .login-logo-mobile { display: inline-flex !important; } }`}</style>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Banners                                                             */
/* ------------------------------------------------------------------ */

type BannerTone = 'error' | 'success' | 'info'

export function Banner({ tone, children }: { tone: BannerTone; children: React.ReactNode }) {
  const palette: Record<BannerTone, { bg: string; border: string; color: string }> = {
    error: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#f87171' },
    success: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#4ade80' },
    info: { bg: 'rgba(0,71,255,0.1)', border: 'rgba(0,71,255,0.3)', color: '#93b4ff' },
  }
  const p = palette[tone]
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: p.color, lineHeight: 1.5 }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Fields                                                              */
/* ------------------------------------------------------------------ */

interface FieldProps {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  autoComplete?: string
  invalid?: boolean
  hint?: string
  rightSlot?: React.ReactNode
  /** Optional element rendered on the right side of the label row (e.g. "Forgot password?"). */
  labelAction?: React.ReactNode
}

const fieldWrap: React.CSSProperties = { marginBottom: 16 }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }

function inputStyle(focused: boolean, invalid?: boolean): React.CSSProperties {
  const borderColor = invalid ? ERROR : focused ? ACCENT : BORDER
  return {
    width: '100%',
    padding: '12px 16px',
    background: focused ? INPUT_BG_FOCUS : INPUT_BG,
    border: `1.5px solid ${borderColor}`,
    borderRadius: 10,
    color: TEXT,
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  }
}

export function AuthField({ label, type = 'text', value, onChange, placeholder, required, autoComplete, invalid, hint, rightSlot, labelAction }: FieldProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const hintId = hint ? `${id}-hint` : undefined
  return (
    <div style={fieldWrap}>
      {labelAction ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <label htmlFor={id} style={{ ...labelStyle, marginBottom: 0 }}>{label}</label>
          {labelAction}
        </div>
      ) : (
        <label htmlFor={id} style={labelStyle}>{label}</label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={invalid || undefined}
          aria-describedby={hintId}
          style={{ ...inputStyle(focused, invalid), paddingRight: rightSlot ? 46 : 16 }}
        />
        {rightSlot}
      </div>
      {hint && (
        <p id={hintId} style={{ margin: '6px 2px 0', fontSize: 12, color: invalid ? '#f87171' : MUTED, lineHeight: 1.4 }}>{hint}</p>
      )}
    </div>
  )
}

export function PasswordField(props: Omit<FieldProps, 'type' | 'rightSlot'> & { showStrength?: boolean }) {
  const [visible, setVisible] = useState(false)
  const { showStrength, value, ...rest } = props
  const strength = getPasswordStrength(value)
  const toggle = (
    <button
      type="button"
      onClick={() => setVisible((v) => !v)}
      aria-label={visible ? 'Hide password' : 'Show password'}
      style={{
        position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 8,
        color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'unset',
      }}
    >
      {visible ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
      )}
    </button>
  )
  return (
    <div>
      <AuthField {...rest} value={value} type={visible ? 'text' : 'password'} rightSlot={toggle} />
      {showStrength && value.length > 0 && (
        <div style={{ marginTop: -8, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            {[1, 2, 3, 4].map((seg) => (
              <span
                key={seg}
                style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: seg <= strength.score ? strength.color : BORDER,
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: strength.color, fontWeight: 600 }}>{strength.label}</span>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function SubmitButton({ loading, loadingLabel, children, disabled }: { loading?: boolean; loadingLabel?: string; children: React.ReactNode; disabled?: boolean }) {
  const isDisabled = loading || disabled
  return (
    <button
      type="submit"
      disabled={isDisabled}
      style={{
        width: '100%', padding: '14px',
        background: isDisabled ? '#1e2a45' : 'linear-gradient(135deg, #0047FF, #0066ff)',
        border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 700,
        cursor: isDisabled ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: isDisabled ? 'none' : '0 4px 24px rgba(0,71,255,0.3)',
      }}
    >
      {loading && <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'dw-spin 0.7s linear infinite', display: 'inline-block' }} />}
      {loading ? (loadingLabel ?? 'Please wait…') : children}
    </button>
  )
}

export function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
      <div style={{ flex: 1, height: 1, background: BORDER }} />
      <span style={{ fontSize: 12, color: '#64748b' }}>or</span>
      <div style={{ flex: 1, height: 1, background: BORDER }} />
    </div>
  )
}

export function GoogleButton({ onClick, label = 'Continue with Google' }: { onClick: () => void; label?: string }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%', padding: '12px', background: hover ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: `1.5px solid ${hover ? '#2c3a5c' : BORDER}`, borderRadius: 10, color: TEXT,
        fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 10, transition: 'all 0.2s',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
      {label}
    </button>
  )
}

export const authColors = { ACCENT, TEXT, MUTED, BORDER, INPUT_BG, INPUT_BG_FOCUS, ERROR }
