import React from 'react'
import { cn } from '@/lib/utils'
import type { TaskPriority } from '@/lib/types'

export function SquareProgress({ value, className }: { value: number; className?: string }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('h-2.5 border border-border bg-muted/40 relative overflow-hidden rounded-none', className)}>
      <div
        className="h-full bg-foreground transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const s = status.toUpperCase()
  let variant = 'border-border text-foreground bg-background'

  if (['DONE', 'ACTIVE', 'COMPLETED', 'FINAL', 'RESOLVED'].includes(s)) {
    variant = 'border-border bg-foreground text-background font-bold'
  } else if (['IN_PROGRESS', 'REVIEW', 'PENDING', 'LEAD'].includes(s)) {
    variant = 'border-border bg-muted text-foreground font-semibold'
  } else if (['BLOCKED', 'CRITICAL', 'DEPRECATED'].includes(s)) {
    variant = 'border-border bg-destructive text-destructive-foreground font-bold'
  } else if (['WAITING', 'ON_HOLD', 'INACTIVE'].includes(s)) {
    variant = 'border-border text-muted-foreground bg-muted/30'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded-none leading-none select-none transition-colors duration-150',
        variant,
        className
      )}
    >
      {status.replace('_', ' ')}
    </span>
  )
}

export function PriorityIndicator({ priority }: { priority: TaskPriority | string }) {
  let color = 'text-muted-foreground'
  if (priority === 'CRITICAL') color = 'text-foreground font-bold underline'
  else if (priority === 'HIGH') color = 'text-foreground font-semibold'
  else if (priority === 'MEDIUM') color = 'text-foreground'

  return (
    <span className={cn('text-xs font-mono uppercase tracking-wider select-none', color)}>
      [{priority}]
    </span>
  )
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border border-dashed border-border my-4 bg-background/50 animate-fade-in rounded-none", className)}>
      <p className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
