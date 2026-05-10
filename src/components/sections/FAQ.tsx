'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How long does a typical web project take?',
    answer:
      'Most projects are delivered within 4–8 weeks from the time we receive all content and design approvals. A standard 5-page Starter website typically takes 4 weeks, while a Growth-tier build with CMS and e-commerce runs 6–8 weeks. Enterprise projects are scoped individually. We always provide a detailed timeline in your project proposal.',
  },
  {
    question: 'What are your payment terms?',
    answer:
      'We work on a milestone-based payment schedule: 40% upon project kick-off, 40% upon design approval before development begins, and the remaining 20% upon final delivery before launch. For Enterprise clients, we offer monthly retainer arrangements. All invoices are issued in CZK with a 14-day payment window.',
  },
  {
    question: 'How many revisions are included?',
    answer:
      'Starter packages include two full rounds of revisions at the design stage. Growth packages include unlimited revisions during the build phase — we work until you are 100% satisfied. Enterprise clients receive continuous iteration as part of the ongoing engagement. We track feedback through a shared project management board so nothing falls through the cracks.',
  },
  {
    question: 'How does the Czech S.R.O. formation process work for foreign nationals?',
    answer:
      'We manage the entire process remotely where possible. Here is the typical flow: (1) We prepare all required documents and translate them into Czech. (2) You sign documents via a notary in your country or during a visit to Prague. (3) We submit the application to the Czech Commercial Register. (4) We assist with VAT registration and bank account opening through our banking partners. The full process takes 3–4 weeks once documents are signed. You do not need to relocate to the Czech Republic.',
  },
  {
    question: 'Can you build trilingual or multilingual websites?',
    answer:
      'Absolutely — multilingual sites are one of our specialties. We commonly build sites in Czech, English, and Mongolian for our diaspora clients, but we can support any language combination. We use next-intl for robust internationalization (i18n), handle right-to-left (RTL) layouts when needed, and can integrate with a CMS so you can manage translations yourself after handover. All multilingual projects include a content management guide.',
  },
  {
    question: 'Do you offer ongoing maintenance and support after launch?',
    answer:
      'Yes. All packages include a post-launch support period (1 month for Starter, 3 months for Growth). After that, we offer monthly maintenance retainers starting from 4 900 CZK/month, which cover security patches, CMS updates, performance monitoring, uptime alerts, and up to 2 hours of small change requests per month. Enterprise clients can negotiate custom SLA agreements with guaranteed response times.',
  },
]

interface AccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  index: number
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={cn(
        'rounded-xl border transition-all duration-300',
        isOpen ? 'border-orange-500/40 bg-orange-500/5' : 'border-white/10 bg-[#111111] hover:border-white/20'
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className={cn('text-base font-semibold', isOpen ? 'text-orange-400' : 'text-white')}>
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 text-white/40 transition-transform duration-300',
            isOpen && 'rotate-180 text-orange-500'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-[#0a0a0a] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="orange" className="mb-4">
            FAQ
          </Badge>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Common Questions
          </h2>
          <p className="text-lg text-white/50">
            Everything you need to know before getting started with us.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/40">
          Still have questions?{' '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-orange-400 underline underline-offset-2 hover:text-orange-300"
          >
            Reach out directly
          </button>{' '}
          — we reply within 24 hours.
        </p>
      </div>
    </section>
  )
}

export default FAQ
