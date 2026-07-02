'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { Mail, Phone, MapPin, Zap, Check, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatContactFieldErrors } from '@/lib/contact-options'
import { COMPANY, companyFullAddress } from '@/lib/company'

type ContactOption = { id: string; value: string }
type ContactInfoItem = { id: string; label: string; value: string }
type Step = { id: string; title: string; desc: string }
type Social = { id: string; name: string }
type ScheduleSlot = { id: string; day: string; time: string }
type ScheduleTag = { id: string; label: string }

const SERVICE_API_VALUES: Record<string, string> = {
  webDevelopment: 'Web Development',
  sroFormation: 'Czech S.R.O. Formation',
  aiAutomation: 'AI Automation',
  websiteMaintenance: 'Website Maintenance',
}

const BUDGET_API_VALUES: Record<string, string> = {
  under15k: 'Under 15k CZK',
  '15to45k': '15k–45k CZK',
  '45to100k': '45k–100k CZK',
  over100k: '100k+ CZK',
  monthlyRetainer: 'Monthly Retainer',
}

const SERVICE_IDS = Object.keys(SERVICE_API_VALUES) as [string, ...string[]]
const BUDGET_IDS = Object.keys(BUDGET_API_VALUES) as [string, ...string[]]

const CONTACT_INFO_ICONS: Record<string, React.ReactNode> = {
  email: <Mail size={18} />,
  phone: <Phone size={18} />,
  office: <MapPin size={18} />,
}

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/JFqYT8pznvFcHpMr9'

const SOCIAL_HREFS: Record<string, string> = {
  facebook: 'https://www.facebook.com/digiwolf.agency',
}

const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'f',
}

function contactHref(id: string): string | undefined {
  if (id === 'email') return `mailto:${COMPANY.email}`
  if (id === 'phone') return `tel:${COMPANY.phone.replace(/\s/g, '')}`
  if (id === 'office') return GOOGLE_MAPS_URL
  return undefined
}

function contactValue(id: string): string {
  if (id === 'email') return COMPANY.email
  if (id === 'phone') return COMPANY.phone
  if (id === 'office') return companyFullAddress
  return ''
}

export default function ContactPage() {
  const t = useTranslations('contact')
  const tv = useTranslations('contact.validation')

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredBtn, setHoveredBtn] = useState(false)

  const services = useMemo(() => t.raw('services') as ContactOption[], [t])
  const budgets = useMemo(() => t.raw('budgets') as ContactOption[], [t])
  const steps = useMemo(() => t.raw('leftColumn.steps') as Step[], [t])
  const socials = useMemo(() => t.raw('leftColumn.socials') as Social[], [t])
  const contactInfoItems = useMemo(() => t.raw('leftColumn.contactInfo') as ContactInfoItem[], [t])
  const scheduleTags = useMemo(() => t.raw('scheduleSection.tags') as ScheduleTag[], [t])
  const scheduleSlots = useMemo(() => t.raw('scheduleSection.slots') as ScheduleSlot[], [t])

  const contactLeadSchema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, tv('name')),
        email: z.string().trim().email(tv('email')),
        company: z.string().trim().max(200, tv('company')).optional().or(z.literal('')),
        service: z.enum(SERVICE_IDS, { message: tv('service') }),
        budget: z.enum(BUDGET_IDS, { message: tv('budget') }),
        message: z
          .string()
          .trim()
          .min(10, tv('messageMin'))
          .max(5000, tv('messageMax')),
      }),
    [tv],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const parsed = contactLeadSchema.safeParse(form)
    if (!parsed.success) {
      setFieldErrors(formatContactFieldErrors(parsed.error))
      return
    }

    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company ?? '',
      service: SERVICE_API_VALUES[parsed.data.service],
      budget: BUDGET_API_VALUES[parsed.data.budget],
      message: parsed.data.message,
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSubmitted(true)
      } else if (res.status === 400 && data.fields) {
        setFieldErrors(data.fields as Record<string, string>)
        setError((data.error as string | undefined) ?? t('form.errors.highlighted'))
      } else {
        setError((data as { error?: string }).error ?? t('form.errors.generic'))
      }
    } catch {
      setError(t('form.errors.network'))
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: fieldErrors[name]
      ? 'rgba(239,68,68,0.06)'
      : focusedField === name
        ? 'rgba(59,130,246,0.06)'
        : 'rgba(255,255,255,0.03)',
    border: fieldErrors[name]
      ? '1px solid rgba(239,68,68,0.5)'
      : focusedField === name
        ? '1px solid rgba(59,130,246,0.5)'
        : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#f0f4ff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#8892b0',
    marginBottom: '8px',
    letterSpacing: '0.03em',
  }

  const fieldErrorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#fca5a5',
    marginTop: '6px',
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f4ff', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' as const, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)',
            color: '#93c5fd', padding: '6px 18px', borderRadius: '100px',
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            marginBottom: '24px',
          }}>
            {t('hero.badge')}
          </span>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.08,
            margin: '0 0 24px', letterSpacing: '-0.03em',
          }}>
            {t('hero.titleLine1')}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {t('hero.titleLine2')}
            </span>
          </h1>
          <p style={{ fontSize: '20px', color: '#8892b0', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section style={{ padding: '60px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'flex-start' }}>

          {/* LEFT COLUMN */}
          <div>
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 28px', letterSpacing: '-0.02em' }}>
                {t('leftColumn.contactInformationTitle')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {contactInfoItems.map((item) => {
                  const href = contactHref(item.id)
                  const value = contactValue(item.id)
                  return (
                    <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#93c5fd', flexShrink: 0,
                      }}>
                        {CONTACT_INFO_ICONS[item.id]}
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '4px' }}>
                          {item.label}
                        </div>
                        {href
                          ? (
                            <a
                              href={href}
                              target={item.id === 'office' ? '_blank' : undefined}
                              rel={item.id === 'office' ? 'noopener noreferrer' : undefined}
                              style={{ fontSize: '15px', color: '#93c5fd', textDecoration: 'none', fontWeight: 500 }}
                            >
                              {value}
                            </a>
                          )
                          : <div style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.5 }}>{value}</div>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '16px', padding: '24px', marginBottom: '48px',
            }}>
              <div style={{ marginBottom: '10px', color: '#f59e0b' }}><Zap size={28} /></div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 8px' }}>
                {t('leftColumn.responseGuarantee.title')}
              </h3>
              <p style={{ fontSize: '13px', color: '#8892b0', lineHeight: 1.6, margin: 0 }}>
                {t('leftColumn.responseGuarantee.desc')}
              </p>
            </div>

            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
                {t('leftColumn.whatHappensNextTitle')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {steps.map((step, i) => (
                  <div key={step.id} style={{
                    display: 'flex', gap: '16px', alignItems: 'flex-start',
                    paddingBottom: i < steps.length - 1 ? '24px' : '0',
                    position: 'relative' as const,
                  }}>
                    {i < steps.length - 1 && (
                      <div style={{
                        position: 'absolute', left: '21px', top: '44px',
                        width: '2px', height: 'calc(100% - 20px)',
                        background: 'linear-gradient(180deg, rgba(59,130,246,0.4), transparent)',
                      }} />
                    )}
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 800, color: '#93c5fd', flexShrink: 0,
                    }}>
                      {step.id}
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4ff', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '13px', color: '#8892b0', lineHeight: 1.5 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
                {t('leftColumn.followUs')}
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={SOCIAL_HREFS[s.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px', padding: '8px 14px',
                      color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'
                      ;(e.currentTarget as HTMLElement).style.color = '#93c5fd'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                      ;(e.currentTarget as HTMLElement).style.color = '#cbd5e1'
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '14px' }}>{SOCIAL_ICONS[s.id]}</span> {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Contact Form */}
          <div>
            <div style={{
              background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '40px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                borderRadius: '20px 20px 0 0',
              }} />

              {submitted ? (
                <div style={{ textAlign: 'center' as const, padding: '40px 0', position: 'relative' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px', color: '#10b981',
                  }}>
                    <Check size={28} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 12px' }}>
                    {t('form.success.title')}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#8892b0', lineHeight: 1.7, margin: '0 0 32px' }}>
                    {t('form.success.body')}
                  </p>
                  <div style={{
                    background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: '12px', padding: '20px', marginBottom: '32px',
                  }}>
                    <div style={{ fontSize: '13px', color: '#8892b0', marginBottom: '4px' }}>{t('form.success.confirmationLabel')}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#10b981' }}>{form.email || t('form.success.fallbackEmail')}</div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' })
                      setFieldErrors({})
                      setError('')
                    }}
                    style={{
                      background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                      color: '#8892b0', padding: '10px 24px', borderRadius: '8px',
                      cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {t('form.success.resetButton')}
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 28, padding: '16px 20px', background: 'rgba(0,71,255,0.08)', border: '1px solid rgba(0,71,255,0.25)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff', marginBottom: 2 }}>{t('form.callCta.title')}</div>
                      <div style={{ fontSize: 12, color: '#8892b0' }}>{t('form.callCta.subtitle')}</div>
                    </div>
                    <Link href="/book" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: '#0047FF', color: '#fff', textDecoration: 'none',
                      padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}>
                      {t('form.callCta.button')}
                    </Link>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 8px', position: 'relative' }}>
                    {t('form.title')}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#8892b0', margin: '0 0 32px', position: 'relative' }}>
                    {t('form.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                    <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>{t('form.fields.fullName')}</label>
                        <input
                          type="text"
                          name="name"
                          placeholder={t('form.placeholders.fullName')}
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          style={inputStyle('name')}
                          aria-invalid={!!fieldErrors.name}
                        />
                        {fieldErrors.name && <p style={fieldErrorStyle}>{fieldErrors.name}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>{t('form.fields.email')}</label>
                        <input
                          type="email"
                          name="email"
                          placeholder={t('form.placeholders.email')}
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          style={inputStyle('email')}
                          aria-invalid={!!fieldErrors.email}
                        />
                        {fieldErrors.email && <p style={fieldErrorStyle}>{fieldErrors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>{t('form.fields.company')}</label>
                      <input
                        type="text"
                        name="company"
                        placeholder={t('form.placeholders.company')}
                        value={form.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        style={inputStyle('company')}
                        aria-invalid={!!fieldErrors.company}
                      />
                      {fieldErrors.company && <p style={fieldErrorStyle}>{fieldErrors.company}</p>}
                    </div>

                    <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>{t('form.fields.service')}</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('service')}
                          onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle('service'), appearance: 'none', cursor: 'pointer' }}
                          aria-invalid={!!fieldErrors.service}
                        >
                          <option value="" disabled style={{ background: '#0f0f0f' }}>{t('form.placeholders.service')}</option>
                          {services.map((svc) => (
                            <option key={svc.id} value={svc.id} style={{ background: '#0f0f0f' }}>{svc.value}</option>
                          ))}
                        </select>
                        {fieldErrors.service && <p style={fieldErrorStyle}>{fieldErrors.service}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>{t('form.fields.budget')}</label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('budget')}
                          onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}
                          aria-invalid={!!fieldErrors.budget}
                        >
                          <option value="" disabled style={{ background: '#0f0f0f' }}>{t('form.placeholders.budget')}</option>
                          {budgets.map((b) => (
                            <option key={b.id} value={b.id} style={{ background: '#0f0f0f' }}>{b.value}</option>
                          ))}
                        </select>
                        {fieldErrors.budget && <p style={fieldErrorStyle}>{fieldErrors.budget}</p>}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>{t('form.fields.message')}</label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder={t('form.placeholders.message')}
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
                        aria-invalid={!!fieldErrors.message}
                      />
                      {fieldErrors.message && <p style={fieldErrorStyle}>{fieldErrors.message}</p>}
                    </div>

                    {error && (
                      <div style={{
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '10px', padding: '12px 16px',
                        fontSize: '14px', color: '#fca5a5',
                      }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={() => setHoveredBtn(true)}
                      onMouseLeave={() => setHoveredBtn(false)}
                      style={{
                        width: '100%',
                        background: loading ? 'rgba(59,130,246,0.5)' : hoveredBtn ? '#2563eb' : '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '-0.01em',
                        transition: 'all 0.2s ease',
                        transform: hoveredBtn && !loading ? 'translateY(-1px)' : 'translateY(0)',
                        boxShadow: hoveredBtn && !loading ? '0 8px 30px rgba(59,130,246,0.35)' : '0 4px 16px rgba(59,130,246,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                      }}
                    >
                      {loading ? (
                        <>
                          <span style={{
                            display: 'inline-block', width: '18px', height: '18px',
                            border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                            borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                          }} />
                          {t('form.submitLoading')}
                        </>
                      ) : (
                        t('form.submitIdle')
                      )}
                    </button>

                    <p style={{ fontSize: '12px', color: '#4b5563', textAlign: 'center' as const, margin: 0 }}>
                      {t('form.privacyNote')}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule CTA */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.06))',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '20px', padding: '48px',
          display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' as const,
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
              color: '#93c5fd', padding: '4px 14px', borderRadius: '100px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
              marginBottom: '16px',
            }}>
              {t('scheduleSection.badge')}
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 12px' }}>
              {t('scheduleSection.title')}
            </h2>
            <p style={{ fontSize: '15px', color: '#8892b0', lineHeight: 1.7, margin: '0 0 24px' }}>
              {t('scheduleSection.description')}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const, marginBottom: '24px' }}>
              {scheduleTags.map((tag) => (
                <div key={tag.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8892b0' }}>
                  <Check size={14} style={{ color: '#10b981' }} /> {tag.label}
                </div>
              ))}
            </div>
            <Link href="/book" style={{ color: '#3d74ff', fontWeight: 600 }}>{t('scheduleSection.cta')}</Link>
          </div>
          <div style={{
            width: '280px', flexShrink: 0,
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '24px', textAlign: 'center' as const,
          }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4ff', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Calendar size={14} /> {t('scheduleSection.slotsTitle')}
            </div>
            {scheduleSlots.map((slot, i) => (
              <div key={slot.id} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <span style={{ fontSize: '13px', color: '#8892b0' }}>{slot.day}</span>
                <span style={{ fontSize: '13px', color: '#93c5fd', fontWeight: 600 }}>{slot.time}</span>
              </div>
            ))}
            <div style={{ marginTop: '16px', fontSize: '12px', color: '#4b5563' }}>
              {t('scheduleSection.timezoneNote')}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
