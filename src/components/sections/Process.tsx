'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start with a deep-dive consultation to understand your business goals, target audience, competitive landscape, and technical requirements. No cookie-cutter solutions — every project begins with listening.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our designers craft pixel-perfect wireframes and high-fidelity mockups tailored to your brand. You review, give feedback, and we refine until every screen is exactly right before a single line of code is written.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Our engineers bring your vision to life using modern, scalable technology. We follow agile sprints with weekly check-ins, so you always know where your project stands and can provide input at every stage.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'After thorough QA testing across devices and browsers, we deploy your project to production. We handle DNS, SSL, performance optimization, and provide a handover session so your team is fully confident on day one.',
  },
]

export function Process() {
  return (
    <section id="process" className="bg-[#0d0d0d] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="orange" className="mb-4">
            How We Work
          </Badge>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Our Proven Process
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/50">
            Four focused phases that take your project from idea to live product — on time, every time.
          </p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Horizontal connector line (desktop only) */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative flex flex-col"
              >
                {/* Step number circle */}
                <div className="relative z-10 mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-orange-500/40 bg-[#0a0a0a] text-sm font-black text-orange-500 shadow-lg shadow-orange-500/10">
                  {step.number}
                </div>

                {/* Vertical connector line (mobile only) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[26px] top-[52px] h-[calc(100%+2rem)] w-px bg-orange-500/20 lg:hidden" />
                )}

                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8 text-center"
        >
          <p className="text-sm text-white/60">
            Average delivery time:{' '}
            <span className="font-semibold text-orange-400">4–8 weeks</span> for web projects,{' '}
            <span className="font-semibold text-orange-400">3–4 weeks</span> for S.R.O. formation.
            Rush timelines available upon request.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
