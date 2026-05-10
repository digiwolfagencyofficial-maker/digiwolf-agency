'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-orange-500 py-20 lg:py-28">
      {/* Decorative elements */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-600/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-400/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Rocket className="h-4 w-4" />
            Ready When You Are
          </div>

          <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Build Your<br />Digital Empire?
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-orange-50/80">
            Join 30+ entrepreneurs who trusted Digi Wolf Agency to launch their digital presence, form their Czech company, and automate their operations. Your competition isn&apos;t waiting — neither should you.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-xl shadow-black/20 transition-all duration-200 hover:bg-orange-50 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="mailto:hello@digiwolf.agency"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              hello@digiwolf.agency
            </a>
          </div>

          <p className="mt-8 text-sm text-orange-50/60">
            Free consultation · No commitment · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
