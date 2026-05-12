'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${isOpen ? 'rgba(0,71,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '22px 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 16, textAlign: 'left',
              }}
              aria-expanded={isOpen}
            >
              <span style={{ color: '#f0f4ff', fontWeight: 600, fontSize: 16, lineHeight: 1.4 }}>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ flexShrink: 0, color: '#3d74ff', display: 'flex' }}
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 28px 24px', color: '#8892b0', lineHeight: 1.8, fontSize: 15 }}>
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
