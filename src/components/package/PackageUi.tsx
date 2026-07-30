'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Zap } from 'lucide-react'
import { FOUNDING_OFFER_ACTIVE } from '@/config/founding-offer'
import {
  formatCzk,
  buildCheckoutUrl,
  getAnchorPriceCzk,
  type ServicePackage,
  type Locale as ServiceLocale,
} from '@/lib/services'

type PackageUiT = (key: string, values?: Record<string, string | number>) => string

export function packagePrimaryPriceText(pkg: ServicePackage, t: PackageUiT): string {
  if (pkg.priceCzk === undefined) return t('customTalk')
  const suffix = pkg.cadence === 'monthly' ? t('perMonth') : pkg.cadence === 'yearly' ? t('perYear') : ''
  return `${formatCzk(pkg.priceCzk)}${suffix}`
}

function RegisteredAddressNote({ pkg, t }: { pkg: ServicePackage; t: PackageUiT }) {
  if (pkg.id !== 'registered-address') return null
  return (
    <div style={{ marginTop: 6, fontSize: 12, color: '#5a6478' }}>{t('registeredAddressNote')}</div>
  )
}

export function PackagePriceBlock({ pkg, size = 'lg' }: { pkg: ServicePackage; size?: 'lg' | 'md' | 'sm' }) {
  const t = useTranslations('packageUi') as unknown as PackageUiT
  const mainSize = size === 'lg' ? 36 : size === 'md' ? 28 : 22

  if (pkg.priceCzk === undefined) {
    return (
      <span style={{ fontSize: mainSize, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>
        {t('customTalk')}
      </span>
    )
  }

  if (pkg.recurringCzk != null) {
    return (
      <div>
        <div>
          <span style={{ fontSize: mainSize, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>
            {formatCzk(pkg.priceCzk)}
          </span>
          <span style={{ fontSize: 14, color: '#8892b0', marginLeft: 6 }}>{t('setupLabel')}</span>
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: '#8892b0' }}>
          + {formatCzk(pkg.recurringCzk)}
          {t('perMonth')}
        </div>
        {pkg.dueTodayCzk != null && (
          <div style={{ marginTop: 6, fontSize: 13, color: '#5a6478' }}>
            {t('dueToday', { amount: formatCzk(pkg.dueTodayCzk) })}
          </div>
        )}
        <RegisteredAddressNote pkg={pkg} t={t} />
      </div>
    )
  }

  const anchor = getAnchorPriceCzk(pkg)
  const suffix = pkg.cadence === 'monthly' ? t('perMonth') : pkg.cadence === 'yearly' ? t('perYear') : ''

  return (
    <div>
      <span style={{ fontSize: mainSize, fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.03em' }}>
        {formatCzk(pkg.priceCzk)}
      </span>
      {suffix && <span style={{ fontSize: 14, color: '#8892b0', marginLeft: 6 }}>{suffix}</span>}
      {anchor != null && (
        <span style={{ fontSize: 13, color: '#5a6478', textDecoration: 'line-through', marginLeft: 10 }}>
          {formatCzk(anchor)}
          {suffix}
        </span>
      )}
      <RegisteredAddressNote pkg={pkg} t={t} />
    </div>
  )
}

export function PackageCtaButton({
  pkg,
  featured,
  block = true,
  accentColor,
}: {
  pkg: ServicePackage
  featured?: boolean
  block?: boolean
  accentColor?: string
}) {
  const t = useTranslations('packageUi') as unknown as PackageUiT
  const locale = useLocale() as ServiceLocale
  const href = buildCheckoutUrl(pkg, locale)
  const label = pkg.checkoutMode === 'direct' ? t('buyNow') : t('bookCall')
  const accent = accentColor ?? '#0047FF'
  const style: React.CSSProperties = {
    display: block ? 'block' : 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    padding: '13px',
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    background: featured ? accent : 'transparent',
    color: featured ? '#fff' : '#f0f4ff',
    border: featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
    boxShadow: featured ? `0 8px 30px ${accent}66` : 'none',
  }

  if (pkg.checkoutMode === 'direct') {
    return (
      <a href={href} style={style}>
        {label} →
      </a>
    )
  }

  return (
    <Link href={href} style={style}>
      {label} →
    </Link>
  )
}

export function FoundingOfferBadge() {
  const t = useTranslations('packageUi') as unknown as PackageUiT
  return <FoundingBadge text={t('foundingBadge')} />
}

export function PackageFoundingBadge({ pkg }: { pkg: ServicePackage }) {
  if (!FOUNDING_OFFER_ACTIVE || pkg.priceCzk === undefined) return null
  return (
    <div style={{ marginBottom: 12 }}>
      <FoundingOfferBadge />
    </div>
  )
}

function FoundingBadge({ text }: { text: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'linear-gradient(135deg, rgba(255,180,0,0.15), rgba(255,120,0,0.1))',
        border: '1px solid rgba(255,180,0,0.4)',
        borderRadius: 100,
        padding: '5px 12px',
        fontSize: 11,
        fontWeight: 700,
        color: '#ffc340',
        letterSpacing: '0.02em',
      }}
    >
      <Zap size={10} fill="#ffc340" />
      {text}
    </div>
  )
}

export function FeaturedPackageBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        background: '#0047FF',
        color: '#fff',
        fontSize: 10,
        fontWeight: 800,
        padding: '4px 12px',
        borderRadius: 100,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  )
}
