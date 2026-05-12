'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, Scale, Bot, Phone, Check, Calendar, Clock, ChevronLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const SERVICES = [
  { id: 'website', label: 'Website', desc: 'High-converting Next.js website', icon: <Globe size={28} />, color: '#0047FF' },
  { id: 'sro', label: 'S.R.O. Formation', desc: 'Czech company registration', icon: <Scale size={28} />, color: '#00c864' },
  { id: 'ai', label: 'AI Automation', desc: 'Custom AI workflows & chatbots', icon: <Bot size={28} />, color: '#7c3aed' },
  { id: 'general', label: 'Discovery Call', desc: 'Not sure yet? Let\'s talk.', icon: <Phone size={28} />, color: '#f59e0b' },
]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

function getNext14Weekdays(): Date[] {
  const days: Date[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1) // start from tomorrow
  while (days.length < 14) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

const STEP_LABELS = ['Service', 'Date', 'Time', 'Details', 'Confirmed']

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>(TIME_SLOTS)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [error, setError] = useState('')

  const days = getNext14Weekdays()

  useEffect(() => {
    if (!selectedDate) return
    setLoadingSlots(true)
    setSelectedTime('')
    fetch(`/api/book?date=${formatDate(selectedDate)}`)
      .then(r => r.json())
      .then(data => setAvailableSlots(data.available || TIME_SLOTS))
      .catch(() => setAvailableSlots(TIME_SLOTS))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate])

  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError('Name and email are required.'); return }
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
          preferred_date: formatDate(selectedDate!),
          preferred_time: selectedTime,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setBookingId(data.id)
      setStep(5)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const canGoBack = step > 1 && step < 5

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <section style={{ padding: '120px 24px 80px', maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.4)',
            color: '#93c5fd', padding: '6px 18px', borderRadius: '100px',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            Free 30-Min Call
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Book a{' '}
            <span style={{ background: 'linear-gradient(135deg, #0047FF, #3d74ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Discovery Call
            </span>
          </h1>
          <p style={{ color: '#8892b0', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            No sales pitch — just honest advice about your project. Pick a slot below.
          </p>
        </div>

        {/* Step indicator */}
        {step < 5 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
            {STEP_LABELS.slice(0, 4).map((label, i) => {
              const num = i + 1
              const done = step > num
              const active = step === num
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    opacity: done || active ? 1 : 0.4,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: done ? '#0047FF' : active ? 'rgba(0,71,255,0.2)' : 'rgba(255,255,255,0.05)',
                      border: active ? '2px solid #0047FF' : done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: done ? '#fff' : active ? '#3d74ff' : '#8892b0',
                      flexShrink: 0,
                    }}>
                      {done ? <Check size={12} /> : num}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#f0f4ff' : '#8892b0', whiteSpace: 'nowrap' }}>{label}</span>
                  </div>
                  {i < 3 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
                </div>
              )
            })}
          </div>
        )}

        {/* Card */}
        <div style={{
          background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '40px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #0047FF, #3d74ff)' }} />

          {/* Back button */}
          {canGoBack && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                background: 'none', border: 'none', color: '#8892b0', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500,
                marginBottom: 28, padding: 0, fontFamily: "'Inter', sans-serif",
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setService(s.id); setStep(2) }}
                    style={{
                      background: service === s.id ? `${s.color}18` : 'rgba(255,255,255,0.03)',
                      border: service === s.id ? `1.5px solid ${s.color}` : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16, padding: '28px 20px', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1.5px solid ${s.color}` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = service === s.id ? `1.5px solid ${s.color}` : '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div style={{ color: s.color, marginBottom: 14 }}>{s.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', marginBottom: 6 }}>{s.label}</div>
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
              <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 28px' }}>Weekdays only · Next 14 business days · Prague (CET)</p>
              <div className="date-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                {days.map((d) => {
                  const iso = formatDate(d)
                  const active = selectedDate && formatDate(selectedDate) === iso
                  return (
                    <button
                      key={iso}
                      onClick={() => { setSelectedDate(d); setStep(3) }}
                      style={{
                        background: active ? 'rgba(0,71,255,0.2)' : 'rgba(255,255,255,0.03)',
                        border: active ? '1.5px solid #0047FF' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12, padding: '12px 6px', cursor: 'pointer',
                        color: active ? '#f0f4ff' : '#c8d3f0', fontFamily: "'Inter', sans-serif",
                        textAlign: 'center', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,71,255,0.5)' }}
                      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#8892b0', letterSpacing: '0.05em', marginBottom: 4 }}>
                        {d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{d.getDate()}</div>
                      <div style={{ fontSize: 10, color: '#8892b0' }}>{d.toLocaleDateString('en-GB', { month: 'short' })}</div>
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
                <div style={{ color: '#8892b0', padding: '32px 0', textAlign: 'center' }}>Loading available slots…</div>
              ) : availableSlots.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <p style={{ color: '#8892b0', marginBottom: 16 }}>No slots available on this date.</p>
                  <button onClick={() => setStep(2)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#f0f4ff', padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    Choose another date
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
                          background: active ? 'rgba(0,71,255,0.2)' : avail ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                          border: active ? '1.5px solid #0047FF' : avail ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.04)',
                          borderRadius: 12, padding: '16px', cursor: avail ? 'pointer' : 'not-allowed',
                          color: active ? '#f0f4ff' : avail ? '#c8d3f0' : '#4b5563',
                          fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif",
                          transition: 'all 0.15s',
                          textDecoration: avail ? 'none' : 'line-through',
                        }}
                        onMouseEnter={e => { if (avail && !active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,71,255,0.5)' }}
                        onMouseLeave={e => { if (avail && !active) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                      >
                        {t} CET
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
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>Your details</h2>
              <p style={{ color: '#8892b0', fontSize: 14, margin: '0 0 28px' }}>
                {selectedDate ? formatDateDisplay(selectedDate) : ''} at {selectedTime} CET
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#8892b0', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Jan Novák"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#8892b0', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jan@company.cz"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#8892b0', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Company (optional)</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Acme s.r.o."
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#8892b0', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>What do you want to discuss? (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={4}
                    placeholder="Brief description of your project or questions…"
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
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
                  padding: '16px', fontSize: 16, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
                  fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 8px 30px rgba(0,71,255,0.4)',
                }}
              >
                {submitting ? 'Booking…' : 'Confirm Booking →'}
              </button>
              <p style={{ textAlign: 'center', fontSize: 12, color: '#4b5563', marginTop: 12 }}>
                By booking you agree to our{' '}
                <Link href="/privacy" style={{ color: '#8892b0', textDecoration: 'underline' }}>Privacy Policy</Link>.
                We&apos;ll send a confirmation to your email.
              </p>
            </div>
          )}

          {/* STEP 5: Confirmation */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(0,200,100,0.15)', border: '2px solid rgba(0,200,100,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', color: '#00c864',
              }}>
                <Check size={32} />
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>Booking Confirmed!</h2>
              <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 28px' }}>
                We&apos;ll see you on{' '}
                <strong style={{ color: '#f0f4ff' }}>{selectedDate ? formatDateDisplay(selectedDate) : ''}</strong>{' '}
                at <strong style={{ color: '#f0f4ff' }}>{selectedTime} CET</strong>.
                A confirmation has been sent to{' '}
                <strong style={{ color: '#f0f4ff' }}>{form.email}</strong>.
              </p>

              {bookingId && (
                <div style={{
                  background: 'rgba(0,71,255,0.08)', border: '1px solid rgba(0,71,255,0.2)',
                  borderRadius: 12, padding: '16px 24px', display: 'inline-block', marginBottom: 28,
                }}>
                  <div style={{ fontSize: 12, color: '#8892b0', marginBottom: 4 }}>Booking reference</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#3d74ff', fontFamily: 'monospace' }}>
                    #{bookingId.slice(0, 8).toUpperCase()}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/" style={{
                  background: '#0047FF', color: '#fff', textDecoration: 'none',
                  padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                }}>
                  Back to Home
                </Link>
                <Link href="/contact" style={{
                  color: '#f0f4ff', textDecoration: 'none',
                  padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15,
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .date-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .date-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '13px 16px',
  color: '#f0f4ff',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'Inter', sans-serif",
  transition: 'border-color 0.2s',
}
