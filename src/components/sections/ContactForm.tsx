'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-all duration-200 focus:border-orange-500/60 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-orange-500/20'

const labelClass = 'mb-1.5 block text-sm font-medium text-white/70'

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { message?: string }).message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setFormData(initialFormData)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  return (
    <section id="contact" className="bg-[#0d0d0d] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Badge variant="orange" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Start Your Project Today
            </h2>
            <p className="mx-auto max-w-xl text-lg text-white/50">
              Tell us about your project and we&apos;ll get back to you with a free consultation within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Left sidebar info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {[
                  {
                    title: 'Free Consultation',
                    desc: 'Every project starts with a no-obligation discovery call where we understand your goals.',
                  },
                  {
                    title: 'Quick Turnaround',
                    desc: 'We respond to all inquiries within 24 hours and send a detailed proposal within 3 business days.',
                  },
                  {
                    title: 'Multilingual Support',
                    desc: 'We communicate in Czech, English, and Mongolian — whichever works best for you.',
                  },
                  {
                    title: 'Transparent Pricing',
                    desc: 'No hidden fees. You receive a fully itemized quote before any work begins.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-semibold text-white">{title}</p>
                      <p className="text-sm text-white/50">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
                <p className="text-sm font-semibold text-orange-400">Prefer email?</p>
                <a
                  href="mailto:hello@digiwolf.agency"
                  className="mt-1 block text-sm text-white/60 transition-colors hover:text-orange-400"
                >
                  hello@digiwolf.agency
                </a>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              {status === 'success' ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/5 p-10 text-center">
                  <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                  <h3 className="mb-2 text-2xl font-bold text-white">Message Received!</h3>
                  <p className="mb-6 text-white/60">
                    Thank you for reaching out. We&apos;ll review your project details and get back to you within 24 hours with a tailored proposal.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium text-orange-400 underline underline-offset-2 hover:text-orange-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jan Novák"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jan@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className={labelClass}>
                        Company / Project Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Acme s.r.o."
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className={labelClass}>
                        Service Needed <span className="text-orange-500">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className={cn(inputClass, 'cursor-pointer')}
                      >
                        <option value="" disabled>
                          Select a service...
                        </option>
                        <option value="web-development">Web Development</option>
                        <option value="sro-formation">Czech SRO Formation</option>
                        <option value="ai-automation">AI Automation</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="sm:col-span-2">
                      <label htmlFor="budget" className={labelClass}>
                        Estimated Budget (CZK)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={cn(inputClass, 'cursor-pointer')}
                      >
                        <option value="">Select a budget range...</option>
                        <option value="under-25k">Under 25 000 CZK</option>
                        <option value="25k-50k">25 000 – 50 000 CZK</option>
                        <option value="50k-100k">50 000 – 100 000 CZK</option>
                        <option value="100k-plus">100 000+ CZK</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClass}>
                        Tell Us About Your Project <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Describe what you need, your timeline, and any specific requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        className={cn(inputClass, 'resize-none')}
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 p-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                      <p className="text-sm text-red-400">{errorMessage}</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={status === 'loading'}
                      className="w-full"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                      {status !== 'loading' && <Send className="h-4 w-4" />}
                    </Button>
                    <p className="mt-3 text-center text-xs text-white/30">
                      By submitting, you agree to our privacy policy. We never share your data.
                    </p>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
