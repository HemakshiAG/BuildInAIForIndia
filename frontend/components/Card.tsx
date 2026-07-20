import React from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean
  interactive?: boolean
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ glass = true, interactive = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl p-6 transition-all duration-300',
          glass
            ? 'glass hover:shadow-glass-hover'
            : 'bg-white border border-border shadow-card hover:shadow-card-hover',
          interactive && 'cursor-pointer hover:scale-105',
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
