import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Testimonials } from '@/components/sections/Testimonials'
import { AIHighlight } from '@/components/sections/AIHighlight'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <CaseStudies />
      <Testimonials />
      <AIHighlight />
      <Pricing />
      <FAQ />
      <CTA />
      <ScrollToTop />
    </main>
  )
}
