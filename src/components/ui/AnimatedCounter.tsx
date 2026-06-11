'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isElementInView(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  return rect.top < vh - 80 && rect.bottom > 0 && rect.left < vw && rect.right > 0
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 1500,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const rafId = useRef<number | null>(null)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    if (prefersReducedMotion() || value === 0) {
      setCount(value)
      return
    }

    setCount(0)
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setCount(Math.round(eased * value))

      if (t < 1) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        setCount(value)
      }
    }

    rafId.current = requestAnimationFrame(tick)
  }, [duration, value])

  useLayoutEffect(() => {
    const node = ref.current
    if (!node || hasAnimated.current) return

    if (prefersReducedMotion()) return

    if (isElementInView(node)) {
      animate()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect()
          animate()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
