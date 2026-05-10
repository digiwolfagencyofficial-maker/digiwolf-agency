'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface PricingTier {
  name: string
  price: string
  priceNote?: string
  description: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '25 000 CZK',
    priceNote: 'one-time',
    description: 'Perfect for small businesses and entrepreneurs launching their first professional web presence.',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'SEO basics included',
      'Contact form setup',
      'Google Analytics integration',
      'SSL certificate & hosting setup',
      '1 month post-launch support',
      '2 rounds of revisions',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '55 000 CZK',
    priceNote: 'one-time',
    description: 'Ideal for growing businesses that need a content-rich site with e-commerce and marketing tools.',
    features: [
      'Up to 10 pages',
      'CMS integration (Sanity / Strapi)',
      'E-commerce functionality',
      'Advanced SEO setup',
      'Performance optimization',
      'Email marketing integration',
      'Multi-language support',
      '3 months post-launch support',
      'Unlimited revisions during build',
      'Priority response time',
    ],
    cta: 'Start Growing',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'tailored quote',
    description: 'Full-stack digital infrastructure for established businesses with complex technical requirements.',
    features: [
      'Unlimited pages',
      'Full-stack custom development',
      'AI automation integrations',
      'Dedicated project manager',
      'Custom API development',
      'Advanced security & compliance',
      'SLA with guaranteed uptime',
      'Priority 24/7 support',
      'Quarterly strategy reviews',
      'White-label options available',
    ],
    cta: 'Talk to Us',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#0a0a0a] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="orange" className="mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Simple, Honest Pricing
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/50">
            No hidden fees. No surprise invoices. Pick the tier that fits your project and grow from there.
          </p>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8 transition-all duration-300',
                tier.featured
                  ? 'border-orange-500 bg-orange-500/5 shadow-2xl shadow-orange-500/15 scale-[1.02]'
                  : 'border-white/10 bg-[#111111] hover:border-white/20'
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-orange-500/30">
                    <Zap className="h-3 w-3 fill-current" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    'mb-1 text-lg font-bold',
                    tier.featured ? 'text-orange-400' : 'text-white/70'
                  )}
                >
                  {tier.name}
                </h3>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white sm:text-4xl">{tier.price}</span>
                  {tier.priceNote && (
                    <span className="text-sm text-white/40">{tier.priceNote}</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-white/55">{tier.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <Check
                      className={cn(
                        'mt-0.5 h-4 w-4 flex-shrink-0',
                        tier.featured ? 'text-orange-500' : 'text-orange-500/70'
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.featured ? 'primary' : 'secondary'}
                className="w-full"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/40">
          All prices listed in Czech Koruna (CZK) and exclude VAT. Custom payment schedules available for Growth and Enterprise tiers.
        </p>
      </div>
    </section>
  )
}

export default Pricing
