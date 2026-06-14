import Image from 'next/image'

interface BrandLogoProps {
  alt?: string
  iconSize?: number
  showWordmark?: boolean
  priority?: boolean
}

export default function BrandLogo({
  alt = 'Digi Wolf Agency',
  iconSize = 40,
  showWordmark = true,
  priority = false,
}: BrandLogoProps) {
  return (
    <>
      <Image
        src="/digiwolf-icon-transparent.png"
        alt={alt}
        width={iconSize}
        height={iconSize}
        priority={priority}
        style={{ objectFit: 'contain', flexShrink: 0 }}
      />
      {showWordmark && (
        <span
          style={{
            color: '#f0f4ff',
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          DIGIWOLF
        </span>
      )}
    </>
  )
}
