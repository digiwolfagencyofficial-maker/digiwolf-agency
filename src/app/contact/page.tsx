import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact — Start Your Project',
  description: 'Get in touch with Digi Wolf Agency. We respond within 4 business hours. Book a free 30-minute strategy call or send us your project brief.',
  openGraph: {
    title: 'Contact Digi Wolf Agency — Start Your Project',
    description: 'Tell us about your project. We respond within 4 business hours — personally, not with a bot.',
    url: 'https://digiwolf-agency.vercel.app/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
