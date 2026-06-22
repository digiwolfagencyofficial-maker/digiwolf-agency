import Image from 'next/image'
import Link from 'next/link'

type LogoVariant = 'full' | 'mark'

interface LogoProps {
  variant?: LogoVariant
  priority?: boolean
  className?: string
}

const ASSETS: Record<LogoVariant, { src: string; width: number; height: number }> = {
  full: { src: '/digiwolf-lockup.png', width: 240, height: 40 },
  mark: { src: '/digiwolf-icon.png', width: 40, height: 40 },
}

export default function Logo({ variant = 'full', priority = true, className = '' }: LogoProps) {
  const asset = ASSETS[variant]

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`.trim()}>
      <Image
        src={asset.src}
        alt="Digi Wolf Agency"
        width={asset.width}
        height={asset.height}
        priority={priority}
        unoptimized
        className="h-10 w-auto object-contain"
      />
    </Link>
  )
}
