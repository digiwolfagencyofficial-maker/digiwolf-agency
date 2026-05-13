'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Scale, Bot, Phone, Check, Calendar, Clock, ChevronLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const SERVICES = [
  {
    id: 'general',
    label: 'Discovery Call',
    price: 'Free · 30 min',
    desc: "Not sure where to start? Let's talk.",
    icon: <Phone size={28} />,
    color: '#f59e0b',
  },
  {
    id: 'website',
    label: 'Website Project',
    price: 'from 45,000 CZK',
    desc: 'Agency-level site in 3–6 weeks',
    icon: <Globe size={28} />,
    color: '#0047FF',
  },
  {
    id: 'sro',
    label: 'Czech S.R.O. Formation',
    price: 'from 25,000 CZK',
    desc: 'Full company setup, we handle everything',
    icon: <Scale size={28} />,
    color: '#00c864',
  },
  {
    id: 'ai',
    label: 'AI Automation',
    price: 'from 20,000 CZK',
    desc: 'Custom workflows that save 20+ hrs/week',
    icon: <Bot size={28} />,
    color: '#8b5cf6',
  },
]

const SERVICE_MAP: Record<string, string> = {
  general: 'general',
  website: 'website',
  sro: 'sro',
  ai: 'ai',
  app: 'website',
  discovery: 'general',
}

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatISODate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function getCalendarDays(): { date: Date; disabled: boolean }[] {
  const days: { date: Date; disabled: boolean }[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() + 1)

  // Find Monday of that week
  const dow = start.getDay()
  const mondayOffset = dow === 0 ? -6 : 1 - dow
  const calStart = new Date(start)
  calStart.setDate(calStart.getDate() + mondayOffset)

  // Show 21 days from tomorrow = need enough weeks
  // We show from calStart (Monday) for enough rows to cover 21 weekdays
  // Actually spec says "next 21 days as 7-col grid" — show 21 calendar days from tomorrow, weekends greyed
  const end = new Date(today)
  end.setDate(end.getDate() + 22)

  // Find Monday of the week containing tomorrow
  const cur = new Date(calStart)
  while (cur < end || cur.getDay() !== 1) {
    const isWeekend = cur.getDay() === 0 || cur.getDay() === 6
    const isPast = cur < start
    days.push({ date: new Date(cur), disabled: isWeekend || isPast })
    cur.setDate(cur.getDate() + 1)
    if (cur.getDay() === 1 && cur >= end) break
  }
  return days
}

function buildGCalUrl(service: string, date: Date, time: string, name: string, email: string): string {
  const [h, m] = time.split(':').map(Number)
  const startDate = new Date(date)
  startDate.setHours(h, m, 0, 0)
  const endDate = new Date(startDate)
  endDate.setMinutes(endDate.getMinutes() + 30)
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const svc = SERVICES.find(s => s.id === service)
  const title = encodeURIComponent(`${svc?.label || 'Booking'} — Digi Wolf Agency`)
  const details = encodeURIComponent(`Booking with Digi Wolf Agency\nClient: ${name}\nEmail: ${email}`)
  return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${fmt(startDate)}/${fmt(endDate)}&details=${details}`
}

const STEP_LABELS = ['Service', 'Date', 'Time', 'Details', 'Confirmed']

function BookWizard() {
  const searchParams = useSearchParams()
  const paramService = searchParams.get('service')

  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>(TIME_SLOTS)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [error, setError] = useState('')

  const calDays = getCalendarDays()

  // Handle ?service= param — pre-select and jump to step 2
  useEffect(() => {
    if (paramService) {
      const mapped = SERVICE_MAP[paramService.toLowerCase()]
      if (mapped) {
        setService(mapped)
        setStep(2)
      }
    }
  }, [paramService])

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) return
    setLoadingSlots(true)
    setSelectedTime('')
    fetch(`/api/book?date=${formatISODate(selectedDate)}`)
      .then(r => r.json())
      .then(data => setAvailableSlots(data.available || TIME_SLOTS))
      .catch(() => setAvailableSlots(TIME_SLOTS))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate])

  const handleSubmit = async () => {
    if (!form.name) { setError('Full name is required.'); return }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('A valid email is required.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || null,
          service,
          message: form.message || null,
          preferred_date: formatISODate(selectedDate!),
          preferred_time: selectedTime,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setBookingId(data.id || '')
      setBookingRef(data.ref || (data.id ? data.id.slice(0, 8).toUpperCase() : ''))
      setStep(5)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const selectedService = SERVICES.find(s => s.id === service)
  const canGoBack = step > 1 && step < 5

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <section style={{ padding: '120px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.4)',
            color: '#93c5fd', padding: '6px 18px', borderRadius: '100px',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            Book a Meeting
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            {step === 5 ? 'Booking Confirmed!' : (
              <>Schedule a{' '}
                <span style={{ background: 'linear-gradient(135deg, #0047FF, #3d74ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Session
                </span>
              </>
            )}
          </h1>
          {step < 5 && (
            <p style={{ color: '#8892b0', fontSize: 17, lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>
              No sales pitch — just honest advice about your project. Pick a slot below.
            </p>
          )}
        </div>

        {/* Progress bar */}
        {step < 5 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              {STEP_LABELS.slice(0, 4).map((label, i) => {
                const num = i + 1
                const done = step > num
                const active = step === num
                return (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: done ? '#0047FF' : active ? 'rgba(0,71,255,0.2)' : 'rgba(255,255,255,0.06)',
                      border: active ? '2px solid #0047FF' : done ? 'none' : '1px solid rgba(255,255,255,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: done ? '#fff' : active ? '#3d74ff' : '#4b5563',
                      marginBottom: 6, flexShrink: 0, transition: 'all 0.3s',
                    }}>
                      {done ? <Check size={14} /> : num}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? '#93c5fd' : done ? '#8892b0' : '#374151', whiteSpace: 'nowrap' }}>{label}</span>
                  </div>
                )
              })}
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${((step - 1) / 3) * 100}%`, background: 'linear-gradient(90deg, #0047FF, #3d74ff)', borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        )}

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: '40px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #0047FF, #3d74ff)' }} />

            {/* Back button */}
            {canGoBack && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  background: 'none', border: 'none', color: '#8892b0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500,
                  marginBottom: 28, padding: 0, fontFamily: 'inherit',
                }}
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}

            {/* STEP 1: Choose service */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>What can we help with?</h2>
                <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 28px' }}>Choose the service you&apos;re interested in.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setService(s.id); setStep(2) }}
                      style={{
                        background: service === s.id ? `${s.color}18` : 'rgba(255,255,255,0.03)',
                        border: service === s.id ? `1.5px solid ${s.color}` : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 16, padding: '28px 20px', cursor: 'pointer',
                        textAlign: 'left', transition: 'all 0.2s', fontFamily: 'inherit',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1.5px solid ${s.color}`; (e.currentTarget as HTMLElement).style.background = `${s.color}12` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = service === s.id ? `1.5px solid ${s.color}` : '1px solid rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = service === s.id ? `${s.color}18` : 'rgba(255,255,255,0.03)' }}
                    >
                      <div style={{ color: s.color, marginBottom: 14 }}>{s.icon}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 6 }}>{s.price}</div>
                      <div style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.5 }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Pick date */}
            {step === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Calendar size={20} color="#3d74ff" />
                  <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Pick a date</h2>
                </div>
                <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 28px' }}>
                  {selectedService ? <><strong style={{ color: selectedService.color }}>{selectedService.label}</strong> · </> : ''}Weekdays only · Prague (CET)
                </p>

                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6 }}>
                  {DAY_HEADERS.map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: d === 'Sat' || d === 'Sun' ? '#374151' : '#4b5563', letterSpacing: '0.06em', padding: '4px 0' }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="cal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                  {calDays.map((day, idx) => {
                    const iso = formatISODate(day.date)
                    const active = selectedDate && formatISODate(selectedDate) === iso
                    const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6
                    return (
                      <button
                        key={idx}
                        disabled={day.disabled}
                        onClick={() => { setSelectedDate(day.date); setStep(3) }}
                        style={{
                          background: active ? 'rgba(0,71,255,0.25)' : day.disabled ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.04)',
                          border: active ? '1.5px solid #0047FF' : day.disabled ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 10, padding: '10px 4px', cursor: day.disabled ? 'default' : 'pointer',
                          color: active ? '#f0f4ff' : day.disabled ? (isWeekend ? '#1f2937' : '#374151') : '#c8d3f0',
                          fontFamily: 'inherit', textAlign: 'center', transition: 'all 0.15s',
                          opacity: day.disabled ? (isWeekend ? 0.3 : 0.4) : 1,
                        }}
                        onMouseEnter={e => { if (!day.disabled && !active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,71,255,0.5)' }}
                        onMouseLeave={e => { if (!day.disabled && !active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                      >
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 2, color: 'inherit', opacity: 0.7 }}>
                          {day.date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800 }}>{day.date.getDate()}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Pick time */}
            {step === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Clock size={20} color="#3d74ff" />
                  <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Pick a time</h2>
                </div>
                <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 8px' }}>
                  {selectedDate ? formatDateDisplay(selectedDate) : ''} · Prague (CET)
                </p>
                {loadingSlots ? (
                  <div style={{ color: '#8892b0', padding: '40px 0', textAlign: 'center' }}>Loading available slots…</div>
                ) : availableSlots.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p style={{ color: '#8892b0', marginBottom: 16 }}>No available slots — pick another date</p>
                    <button onClick={() => setStep(2)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#f0f4ff', padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>
                      Choose another date →
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
                    {TIME_SLOTS.map((t) => {
                      const avail = availableSlots.includes(t)
                      const active = selectedTime === t
                      return (
                        <button
                          key={t}
                          disabled={!avail}
                          onClick={() => { setSelectedTime(t); setStep(4) }}
                          style={{
                            background: active ? 'rgba(0,71,255,0.2)' : avail ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                            border: active ? '1.5px solid #0047FF' : avail ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 12, padding: '18px', cursor: avail ? 'pointer' : 'not-allowed',
                            color: active ? '#f0f4ff' : avail ? '#c8d3f0' : '#374151',
                            fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
                            transition: 'all 0.15s',
                            opacity: avail ? 1 : 0.4,
                          }}
                          onMouseEnter={e => { if (avail && !active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,71,255,0.5)' }}
                          onMouseLeave={e => { if (avail && !active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                        >
                          <div>{formatTime(t)}</div>
                          <div style={{ fontSize: 11, fontWeight: 500, color: avail ? '#4b5563' : '#1f2937', marginTop: 4 }}>
                            {avail ? 'Available' : 'Taken'}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Enter details */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>Your details</h2>
                <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 28px' }}>
                  {selectedDate ? formatDateDisplay(selectedDate) : ''} at {selectedTime ? formatTime(selectedTime) : ''} CET
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jan Novák"
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = '#0047FF'}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jan@company.cz"
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = '#0047FF'}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Company (optional)</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      placeholder="Acme s.r.o."
                      style={inputStyle}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = '#0047FF'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={4}
                      placeholder="Brief description of your project or questions…"
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = '#0047FF'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#fca5a5', marginTop: 16 }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    width: '100%', marginTop: 24,
                    background: submitting ? 'rgba(0,71,255,0.5)' : '#0047FF',
                    color: '#fff', border: 'none', borderRadius: 12,
                    padding: '16px', fontSize: 16, fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: submitting ? 'none' : '0 8px 30px rgba(0,71,255,0.4)',
                  }}
                >
                  {submitting ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Booking…
                    </>
                  ) : 'Confirm Booking →'}
                </button>
                <p style={{ textAlign: 'center', fontSize: 12, color: '#374151', marginTop: 12 }}>
                  By booking you agree to our{' '}
                  <Link href="/privacy" style={{ color: '#8892b0', textDecoration: 'underline' }}>Privacy Policy</Link>.
                  We&apos;ll send a confirmation to your email.
                </p>
              </div>
            )}

            {/* STEP 5: Confirmed */}
            {step === 5 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(0,200,100,0.15)', border: '2px solid rgba(0,200,100,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 28px', color: '#00c864',
                  }}
                >
                  <Check size={36} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  {bookingRef && (
                    <div style={{
                      background: 'rgba(0,71,255,0.08)', border: '1px solid rgba(0,71,255,0.2)',
                      borderRadius: 12, padding: '16px 28px', display: 'inline-block', marginBottom: 28,
                    }}>
                      <div style={{ fontSize: 11, color: '#8892b0', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Booking Reference</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#3d74ff', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                        #{bookingRef}
                      </div>
                    </div>
                  )}

                  {/* Summary card */}
                  <div style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, padding: '24px', marginBottom: 28, textAlign: 'left',
                  }}>
                    {[
                      { label: 'Service', value: selectedService?.label || service },
                      { label: 'Date', value: selectedDate ? formatDateDisplay(selectedDate) : '' },
                      { label: 'Time', value: selectedTime ? `${formatTime(selectedTime)} (Prague CET)` : '' },
                      { label: 'Email', value: form.email },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 13, color: '#8892b0', fontWeight: 600 }}>{row.label}</span>
                        <span style={{ fontSize: 14, color: '#f0f4ff', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {selectedDate && selectedTime && (
                      <a
                        href={buildGCalUrl(service, selectedDate, selectedTime, form.name, form.email)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'rgba(0,71,255,0.15)', color: '#3d74ff',
                          border: '1px solid rgba(0,71,255,0.3)',
                          textDecoration: 'none', padding: '12px 24px', borderRadius: 10,
                          fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
                        }}
                      >
                        <Calendar size={16} /> Add to Google Calendar
                      </a>
                    )}
                    <Link href="/" style={{
                      background: '#0047FF', color: '#fff', textDecoration: 'none',
                      padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                      boxShadow: '0 4px 20px rgba(0,71,255,0.4)',
                    }}>
                      Back to Home →
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .cal-grid { grid-template-columns: repeat(7, 1fr) !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, color: '#8892b0',
  marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '13px 16px',
  color: '#f0f4ff', fontSize: 15, outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

export default function BookPage() {
  return (
    <Suspense fallback={<div style={{ background: '#030712', minHeight: '100vh' }} />}>
      <BookWizard />
    </Suspense>
  )
}
