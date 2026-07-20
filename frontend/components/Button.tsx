import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, ...props }, ref) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-300 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
      secondary: 'bg-accent text-white hover:bg-blue-400 shadow-md hover:shadow-lg',
      outline: 'border border-primary text-primary hover:bg-primary/5',
      ghost: 'text-primary hover:bg-primary/5',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <span className="animate-spin">⏳</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
