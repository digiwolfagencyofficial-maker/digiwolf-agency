import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean
  glowColor?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverGlow = false, glowColor = 'orange', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-white/10 bg-[#111111] p-6 transition-all duration-300',
          hoverGlow && glowColor === 'orange' &&
            'hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-0.5',
          hoverGlow && glowColor === 'white' &&
            'hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-bold text-white', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('text-white/70', className)} {...props}>
      {children}
    </div>
  )
)
CardBody.displayName = 'CardBody'

export default Card
