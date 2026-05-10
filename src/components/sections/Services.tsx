'use client'

import { motion } from 'framer-motion'
import { Code2, Building2, Brain, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    badge: 'Most Popular',
    price: 'From 25 000 CZK',
    description:
      'High-performance websites and web apps built with Next.js, React, and modern tooling. SEO-optimized, mobile-first, and blazing fast.',
    features: [
      'Custom design & development',
      'Next.js / React stack',
      'SEO optimization included',
      'Mobile-first responsive',
      'Performance-tuned delivery',
      'CMS integration available',
    ],
  },
  {
    icon: Building2,
    title: 'Czech SRO Formation',
    badge: 'Entrepreneur Special',
    price: 'From 15 000 CZK',
    description:
      'Full-service Czech S.R.O. (Ltd.) company formation for foreign entrepreneurs. We handle all paperwork, banking introductions, and compliance.',
    features: [
      'Complete S.R.O. registration',
      'Registered address (1 year)',
      'Bank account introduction',
      'Tax registration support',
      'Trilingual documentation',
      'Ongoing compliance advisory',
    ],
  },
  {
    icon: Brain,
    title: 'AI Automation',
    badge: 'Future-Ready',
    price: 'From 20 000 CZK',
    description:
      'Automate repetitive workflows, build AI chatbots, and integrate intelligent systems that save your team hundreds of hours per month.',
    features: [
      'Custom AI chatbot builds',
      'Workflow automation (n8n/Zapier)',
      'LLM API integrations',
      'Lead qualification bots',
      'Document processing AI',
      'Monthly performance reports',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export function Services() {
  return (
    <section id="services" className="bg-[#0a0a0a] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <Badge variant="orange" className="mb-4">
            What We Do
          </Badge>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Services Built for Growth
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Three core offerings designed to help you launch, grow, and scale your business in Europe.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-8 transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 cursor-pointer"
              >
                {/* Badge */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-colors group-hover:bg-orange-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="orange" className="text-xs">
                    {service.badge}
                  </Badge>
                </div>

                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="mb-1 text-lg font-semibold text-orange-500">{service.price}</p>
                <p className="mb-6 text-sm leading-relaxed text-white/55">{service.description}</p>

                <ul className="mb-8 flex-1 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-white/70">
                      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          className="h-2.5 w-2.5"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="mt-auto w-full group-hover:border-orange-500 group-hover:text-orange-400"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
