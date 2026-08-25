import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    let baseStyles = 'inline-flex items-center justify-center font-mono uppercase tracking-wider text-xs font-bold transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-none'
    
    let variantStyles = ''
    if (variant === 'default') variantStyles = 'bg-primary text-primary-foreground hover:bg-primary/90'
    else if (variant === 'outline') variantStyles = 'border border-border bg-background hover:bg-accent text-foreground'
    else if (variant === 'ghost') variantStyles = 'hover:bg-accent text-foreground'
    else if (variant === 'destructive') variantStyles = 'bg-destructive text-destructive-foreground hover:bg-destructive/90'

    let sizeStyles = ''
    if (size === 'default') sizeStyles = 'h-9 px-4 py-2'
    else if (size === 'sm') sizeStyles = 'h-7 px-3 text-[11px]'
    else if (size === 'lg') sizeStyles = 'h-11 px-6 text-sm'
    else if (size === 'icon') sizeStyles = 'h-8 w-8'

    return (
      <Comp
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
