'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    q: 'How quickly do you respond to enquiries?',
    a: 'We guarantee a response within 4 business hours. Urgent projects or time-sensitive S.R.O. formations typically get a same-day reply — often within the hour.',
  },
  {
    q: 'Do you work with clients outside of Czech Republic?',
    a: 'Absolutely. We have dual offices in Prague and Ulaanbaatar and work remotely with clients across Europe, Asia, and the Americas. International enquiries are welcome.',
  },
  {
    q: 'What happens after I submit this form?',
    a: 'You\'ll receive an automatic confirmation, then a personalised response from our team within 4 hours. If your project is a good fit, we\'ll schedule a 30-minute strategy call within 24 hours.',
  },
];

const steps = [
  { num: '01', title: 'You send your brief', desc: 'Fill out the form with your project details and goals.' },
  { num: '02', title: 'We review & respond', desc: 'Within 4 business hours, you get a personal reply — not a bot.' },
  { num: '03', title: 'Strategy call booked', desc: 'A 30-min Zoom to align on scope, timeline, and budget.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: focusedField === name ? 'rgba(0,71,255,0.06)' : 'rgba(255,255,255,0.03)',
    border: focusedField === name ? '1px solid rgba(0,71,255,0.5)' : '1px solid rgba(136,146,176,0.2)',
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#f0f4ff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#8892b0',
    marginBottom: '8px',
    letterSpacing: '0.03em',
  };

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="grid-bg" style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,71,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <span className="badge" style={{ display: 'inline-block', background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.4)', color: '#60a5fa', padding: '6px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
            Get In Touch
          </span>
          <h1 className="fade-up" style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 24px', letterSpacing: '-0.03em' }}>
            Let&apos;s Build Something{' '}
            <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #0047FF, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Extraordinary
            </span>
          </h1>
          <p style={{ fontSize: '20px', color: '#8892b0', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Tell us about your project. We respond within 4 business hours — personally, not with a bot.
          </p>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section style={{ padding: '60px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'flex-start' }}>

          {/* LEFT COLUMN */}
          <div>
            {/* Contact Info */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 28px', letterSpacing: '-0.02em' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: '✉', label: 'Email', value: 'hello@digiwolf.agency', href: 'mailto:hello@digiwolf.agency' },
                  { icon: '📍', label: 'Prague Office', value: 'Wenceslas Square 12, Prague 1, 110 00' },
                  { icon: '📍', label: 'Ulaanbaatar Office', value: 'Sukhbaatar District, UB 14230, Mongolia' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: '14px', color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>{item.value}</a>
                        : <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>{item.value}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Promise */}
            <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.1), rgba(167,139,250,0.08))', border: '1px solid rgba(0,71,255,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '48px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>⚡</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 8px' }}>4-Hour Response Guarantee</h3>
              <p style={{ fontSize: '13px', color: '#8892b0', lineHeight: 1.6, margin: 0 }}>
                We guarantee a personal response to every enquiry within 4 business hours. No auto-replies, no chatbots — real humans who understand your project.
              </p>
            </div>

            {/* What Happens Next */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 24px', letterSpacing: '-0.01em' }}>What Happens Next</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {steps.map((step, i) => (
                  <div key={step.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: i < steps.length - 1 ? '24px' : '0', position: 'relative' }}>
                    {i < steps.length - 1 && (
                      <div style={{ position: 'absolute', left: '19px', top: '44px', width: '2px', height: 'calc(100% - 20px)', background: 'linear-gradient(180deg, rgba(0,71,255,0.4), transparent)' }} />
                    )}
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#60a5fa', flexShrink: 0, letterSpacing: '0.02em' }}>
                      {step.num}
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4ff', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '13px', color: '#8892b0', lineHeight: 1.5 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { name: 'LinkedIn', href: 'https://linkedin.com/company/digiwolf-agency', icon: 'in' },
                  { name: 'Instagram', href: 'https://instagram.com/digiwolf.agency', icon: '◎' },
                  { name: 'Twitter/X', href: 'https://twitter.com/digiwolfagency', icon: '𝕏' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 14px', color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,71,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#60a5fa'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#cbd5e1'; }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '14px' }}>{s.icon}</span> {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Contact Form */}
          <div>
            <div style={{ background: '#0a0f1e', border: '1px solid rgba(136,146,176,0.12)', borderRadius: '20px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,71,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0', position: 'relative' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Message Received!</h3>
                  <p style={{ fontSize: '16px', color: '#8892b0', lineHeight: 1.7, margin: '0 0 32px' }}>
                    Thank you for reaching out. Our team will review your brief and get back to you within 4 business hours with next steps.
                  </p>
                  <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
                    <div style={{ fontSize: '13px', color: '#8892b0', marginBottom: '4px' }}>Confirmation sent to</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#10b981' }}>{form.email || 'your email'}</div>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', budget: '', description: '' }); }}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8892b0', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 8px', letterSpacing: '-0.02em', position: 'relative' }}>Start Your Project</h2>
                  <p style={{ fontSize: '14px', color: '#8892b0', margin: '0 0 32px', position: 'relative' }}>Fill out the form below and we'll be in touch shortly.</p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                    {/* Name + Email row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Jan Novák"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          style={inputStyle('name')}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="jan@company.cz"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          style={inputStyle('email')}
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label style={labelStyle}>Company / Business Name</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Acme s.r.o."
                        value={form.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        style={inputStyle('company')}
                      />
                    </div>

                    {/* Service + Budget row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Service Interest *</label>
                        <select
                          name="service"
                          required
                          value={form.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('service')}
                          onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle('service'), appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="" disabled style={{ background: '#0a0f1e' }}>Select a service</option>
                          <option value="Agency Website" style={{ background: '#0a0f1e' }}>Agency Website</option>
                          <option value="S.R.O. Formation" style={{ background: '#0a0f1e' }}>S.R.O. Formation</option>
                          <option value="AI Automation" style={{ background: '#0a0f1e' }}>AI Automation</option>
                          <option value="SEO" style={{ background: '#0a0f1e' }}>SEO</option>
                          <option value="Branding" style={{ background: '#0a0f1e' }}>Branding</option>
                          <option value="Other" style={{ background: '#0a0f1e' }}>Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Budget Range *</label>
                        <select
                          name="budget"
                          required
                          value={form.budget}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('budget')}
                          onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="" disabled style={{ background: '#0a0f1e' }}>Select budget</option>
                          <option value="Under 15k CZK" style={{ background: '#0a0f1e' }}>Under 15k CZK</option>
                          <option value="15k-45k CZK" style={{ background: '#0a0f1e' }}>15k–45k CZK</option>
                          <option value="45k-100k CZK" style={{ background: '#0a0f1e' }}>45k–100k CZK</option>
                          <option value="100k+ CZK" style={{ background: '#0a0f1e' }}>100k+ CZK</option>
                          <option value="Monthly Retainer" style={{ background: '#0a0f1e' }}>Monthly Retainer</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label style={labelStyle}>Project Description *</label>
                      <textarea
                        name="description"
                        required
                        rows={5}
                        placeholder="Tell us about your project — what you need, your goals, your timeline, and any specific requirements..."
                        value={form.description}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('description')}
                        onBlur={() => setFocusedField(null)}
                        style={{ ...inputStyle('description'), resize: 'vertical', lineHeight: 1.6 }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={() => setHoveredBtn(true)}
                      onMouseLeave={() => setHoveredBtn(false)}
                      style={{
                        width: '100%',
                        background: loading ? 'rgba(0,71,255,0.5)' : hoveredBtn ? '#0038cc' : '#0047FF',
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
                        boxShadow: hoveredBtn && !loading ? '0 8px 30px rgba(0,71,255,0.35)' : '0 4px 16px rgba(0,71,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                      }}
                    >
                      {loading ? (
                        <>
                          <span style={{ display: 'inline-block', width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                          Sending your brief...
                        </>
                      ) : (
                        'Send My Project Brief →'
                      )}
                    </button>

                    <p style={{ fontSize: '12px', color: '#4b5563', textAlign: 'center', margin: 0 }}>
                      By submitting, you agree to our Privacy Policy. We never share your data.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.08), rgba(167,139,250,0.06))', border: '1px solid rgba(0,71,255,0.2)', borderRadius: '20px', padding: '48px', display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.3)', color: '#60a5fa', padding: '4px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Prefer to talk first?
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Book a Free 30-Min Strategy Call
            </h2>
            <p style={{ fontSize: '15px', color: '#8892b0', lineHeight: 1.7, margin: '0 0 24px' }}>
              Skip the back-and-forth. Pick a time that works for you and let's map out your project on a live call. No sales pitch — just honest advice.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {['Free consultation', '30 minutes', 'No commitment'].map((tag) => (
                <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8892b0' }}>
                  <span style={{ color: '#10b981', fontSize: '14px' }}>✓</span> {tag}
                </div>
              ))}
            </div>
            <a
              href="https://calendly.com/digiwolf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0047FF', color: '#fff', padding: '14px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0038cc'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0047FF'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              📅 Open Calendly
            </a>
          </div>
          <div style={{ width: '280px', flexShrink: 0, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4ff', marginBottom: '16px' }}>📅 Available Slots</div>
            {['Mon–Fri', 'Sat'].map((day, i) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ fontSize: '13px', color: '#8892b0' }}>{day}</span>
                <span style={{ fontSize: '13px', color: '#60a5fa', fontWeight: 600 }}>{i === 0 ? '9:00 – 18:00 CET' : '10:00 – 14:00 CET'}</span>
              </div>
            ))}
            <div style={{ marginTop: '16px', fontSize: '12px', color: '#4b5563' }}>Prague (CET) · Remote via Zoom</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '0 24px 120px', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#f0f4ff', margin: '0 0 8px', textAlign: 'center', letterSpacing: '-0.02em' }}>Quick Questions</h2>
        <p style={{ fontSize: '15px', color: '#8892b0', textAlign: 'center', margin: '0 0 40px' }}>Everything you need to know before reaching out.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredFaq(i)}
              onMouseLeave={() => setHoveredFaq(null)}
              style={{
                background: '#0a0f1e',
                border: hoveredFaq === i || openFaq === i ? '1px solid rgba(0,71,255,0.35)' : '1px solid rgba(136,146,176,0.12)',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px', textAlign: 'left' }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4ff', fontFamily: "'Inter', sans-serif" }}>{faq.q}</span>
                <span style={{ color: '#0047FF', fontSize: '20px', fontWeight: 700, flexShrink: 0, transition: 'transform 0.2s ease', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px' }}>
                  <div style={{ height: '1px', background: 'rgba(136,146,176,0.12)', marginBottom: '16px' }} />
                  <p style={{ fontSize: '14px', color: '#8892b0', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 1fr 1.6fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
