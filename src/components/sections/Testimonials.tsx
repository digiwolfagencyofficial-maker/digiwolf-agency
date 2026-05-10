'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const testimonials = [
  {
    name: 'Jan Novák',
    role: 'Founder',
    company: 'Prague Startup',
    country: 'Czech Republic',
    stars: 5,
    quote:
      "Digi Wolf transformed our online presence completely. In just six weeks they rebuilt our website from scratch — it now loads in under 1.5 seconds and our lead generation jumped 180% in the first month. The team communicates clearly, hits every deadline, and genuinely cares about results. Couldn't recommend them more.",
    initials: 'JN',
  },
  {
    name: 'Enkhjargal Gantulga',
    role: 'Managing Director',
    company: 'MN Export Ltd',
    country: 'Mongolia',
    stars: 5,
    quote:
      'I was overwhelmed by the complexity of forming a Czech S.R.O. as a Mongolian entrepreneur. Digi Wolf handled everything — registration, bank introductions, tax setup — and even built our B2B website in Mongolian, Czech, and English. They turned a daunting 4-month process into 3 clean weeks. Exceptional service.',
    initials: 'EG',
  },
  {
    name: 'Martin Svoboda',
    role: 'CTO',
    company: 'TechFlow CZ',
    country: 'Czech Republic',
    stars: 5,
    quote:
      'We hired Digi Wolf to automate our client onboarding workflows using AI. The result exceeded all expectations — our team saves roughly 40 hours per week, client response time dropped from 3 days to 4 hours, and the system catches data errors we were missing manually. ROI was clear within the first billing cycle.',
    initials: 'MS',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#0d0d0d] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="orange" className="mb-4">
            Client Stories
          </Badge>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Real Results, Real People
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/50">
            Don&apos;t take our word for it — hear from entrepreneurs who trusted us with their digital growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-8 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-orange-500/30" />

              {/* Stars */}
              <div className="mb-4 flex items-center gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-white/65 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.role}, {t.company}
                    <span className="mx-1 text-white/20">·</span>
                    {t.country}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
