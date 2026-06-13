import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'mn', 'cs'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  mn: 'MN',
  cs: 'CZ',
}

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  mn: 'mn',
  cs: 'cs',
}

export const openGraphLocale: Record<Locale, string> = {
  en: 'en_US',
  mn: 'mn_MN',
  cs: 'cs_CZ',
}
