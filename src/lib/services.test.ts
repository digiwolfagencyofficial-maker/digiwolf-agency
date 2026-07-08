import { describe, expect, it } from 'vitest'
import { buildCheckoutUrl, formatCzk, getById } from './services'

describe('registered-address package', () => {
  it('reflects the current 4,900 CZK/yr price and updated Stripe Payment Link', () => {
    const pkg = getById('registered-address')!
    expect(pkg.priceCzk).toBe(4900)
    expect(pkg.stripeLink).toBe('https://buy.stripe.com/bJe6oI3Bw8Rc5Gt9xZ4c80b')
  })

  it('allows adjusting quantity between 1 and 3 years', () => {
    const pkg = getById('registered-address')!
    expect(pkg.quantityAdjustable).toBe(true)
    expect(pkg.minQuantity).toBe(1)
    expect(pkg.maxQuantity).toBe(3)
  })

  it('still appends client_reference_id without encoding quantity in the URL', () => {
    const pkg = getById('registered-address')!
    expect(buildCheckoutUrl(pkg, 'cs')).toBe(
      'https://buy.stripe.com/bJe6oI3Bw8Rc5Gt9xZ4c80b?client_reference_id=CZ'
    )
  })
})

describe('buildCheckoutUrl', () => {
  it('appends client_reference_id=EN for the en locale on a direct package', () => {
    const pkg = getById('website-starter')!
    expect(buildCheckoutUrl(pkg, 'en')).toBe(
      'https://buy.stripe.com/bJe28sgoi6J43ylbG74c804?client_reference_id=EN'
    )
  })

  it('appends client_reference_id=CZ for the cs locale on a direct package', () => {
    const pkg = getById('website-starter')!
    expect(buildCheckoutUrl(pkg, 'cs')).toBe(
      'https://buy.stripe.com/bJe28sgoi6J43ylbG74c804?client_reference_id=CZ'
    )
  })

  it('appends client_reference_id=MN for the mn locale on a direct package', () => {
    const pkg = getById('website-starter')!
    expect(buildCheckoutUrl(pkg, 'mn')).toBe(
      'https://buy.stripe.com/bJe28sgoi6J43ylbG74c804?client_reference_id=MN'
    )
  })

  it('returns /book?service=<slug> for a consult package, ignoring any stripeLink', () => {
    const pkg = getById('website-enterprise')!
    expect(buildCheckoutUrl(pkg, 'en')).toBe('/book?service=website-enterprise')
  })

  it('returns /book?service=<slug> for a consult package even when a stripeLink is present', () => {
    const pkg = getById('sro-complete')!
    expect(pkg.stripeLink).toBeTruthy()
    expect(buildCheckoutUrl(pkg, 'cs')).toBe('/book?service=sro-complete')
  })

  it('throws if a direct package is missing a stripeLink', () => {
    const brokenPkg = {
      id: 'broken',
      service: 'website',
      name: { en: 'x', cs: 'x', mn: 'x' },
      description: { en: 'x', cs: 'x', mn: 'x' },
      cadence: 'once',
      discountType: 'none',
      checkoutMode: 'direct',
    } as const
    expect(() => buildCheckoutUrl(brokenPkg, 'en')).toThrow()
  })
})

describe('formatCzk', () => {
  it('formats whole CZK amounts using cs-CZ currency formatting', () => {
    expect(formatCzk(19900)).toBe(new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(19900))
  })

  it('contains no decimal places', () => {
    expect(formatCzk(990)).not.toMatch(/[.,]\d{2}\b/)
  })

  it('formats zero without throwing', () => {
    expect(() => formatCzk(0)).not.toThrow()
  })
})
