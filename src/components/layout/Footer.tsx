import Link from 'next/link'
import { Mail, Phone, Globe, ExternalLink, AtSign, Share2, Code2 } from 'lucide-react'

const services = [
  { label: 'Web Development', href: '#services' },
  { label: 'Czech SRO Formation', href: '#services' },
  { label: 'AI Automation', href: '#services' },
  { label: 'SEO Optimization', href: '#services' },
  { label: 'UI/UX Design', href: '#services' },
]

const company = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Get Free Audit', href: '#contact' },
]

const socialLinks = [
  { icon: ExternalLink, href: 'https://linkedin.com/company/digiwolf-agency', label: 'LinkedIn' },
  { icon: AtSign, href: 'https://twitter.com/digiwolfagency', label: 'Twitter / X' },
  { icon: Share2, href: 'https://instagram.com/digiwolfagency', label: 'Instagram' },
  { icon: Code2, href: 'https://github.com/digiwolf-agency', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-orange-500">
                DIGI<span className="text-white"> WOLF</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              We build high-performance digital products and help entrepreneurs establish their business in the Czech Republic.
            </p>
            <p className="mt-3 text-sm font-semibold text-orange-500">We Build. You Grow.</p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-all hover:border-orange-500/50 hover:text-orange-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-orange-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-orange-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@digiwolf.agency"
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-orange-400"
                >
                  <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  hello@digiwolf.agency
                </a>
              </li>
              <li>
                <a
                  href="tel:+420123456789"
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-orange-400"
                >
                  <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  +420 123 456 789
                </a>
              </li>
              <li>
                <a
                  href="https://digiwolf.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-orange-400"
                >
                  <Globe className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  digiwolf.agency
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
              <p className="text-xs text-white/50">
                Based in Prague, Czech Republic.
                Serving clients across Europe, Mongolia, and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 sm:flex-row">
          <p className="text-xs text-white/30">
            © 2025 Digi Wolf Agency s.r.o. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/30 transition-colors hover:text-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 transition-colors hover:text-white/60">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
