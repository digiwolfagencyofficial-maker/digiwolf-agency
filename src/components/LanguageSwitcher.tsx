'use client'

import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { localeLabels, locales, type Locale } from '@/i18n/routing'

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale
  const pathname = usePathname()

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 2 : 4,
        padding: compact ? 2 : 4,
        borderRadius: 10,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {locales.map((code) => {
        const active = code === locale
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            style={{
              padding: compact ? '4px 8px' : '6px 10px',
              borderRadius: 7,
              fontSize: compact ? 11 : 12,
              fontWeight: active ? 700 : 500,
              textDecoration: 'none',
              color: active ? '#fff' : '#8892b0',
              background: active ? '#0047FF' : 'transparent',
              transition: 'all 0.2s',
              letterSpacing: '0.04em',
            }}
          >
            {localeLabels[code]}
          </Link>
        )
      })}
    </div>
  )
}
