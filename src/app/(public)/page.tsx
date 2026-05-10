import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { ContactForm } from '@/components/sections/ContactForm'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <ContactForm />
    </main>
  )
}
