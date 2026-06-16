'use client'

import { useEffect } from 'react'
import { htmlLang, type Locale } from '@/i18n/routing'

export default function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale as Locale] ?? locale
  }, [locale])

  return null
}
