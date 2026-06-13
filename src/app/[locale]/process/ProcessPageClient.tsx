'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function ProcessPageClient() {
  const t = useTranslations('process')
  const steps = t.raw('steps') as { id: string; title: string; subtitle: string; desc: string; deliverables: { id: string; label: string }[]; cta?: string }[]
  const faqs = t.raw('faq.items') as { id: string; q: string; a: string }[]
  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />
      <main style={{ padding: '120px 24px' }}>
        <h1>{t('hero.titleLine1')} {t('hero.titleLine2')}</h1>
        <p>{t('hero.subtitle')}</p>
        {steps.map((s) => <section key={s.id} style={{ marginBottom: 32 }}><h2>{s.title}</h2><p>{s.desc}</p>{s.cta && <Link href="/book">{s.cta}</Link>}</section>)}
        <h2>{t('faq.title')}</h2>
        {faqs.map((f) => <details key={f.id}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        <Link href="/book">{t('cta.title')}</Link>
      </main>
      <Footer />
    </div>
  )
}
