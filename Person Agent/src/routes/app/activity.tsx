import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Activity as ActivityIcon, Clock } from 'lucide-react'

export const Route = createFileRoute('/app/activity' as any)({
  component: ActivityPage,
})

function ActivityPage() {
  const { activities } = useDataContext()

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <span>APPLICATION AUDIT TIMELINE</span>
          <span>·</span>
          <span>{activities.length} EVENTS RECORDED</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5 flex items-center gap-2">
          <ActivityIcon className="size-6" /> System Activity Log
        </h1>
      </div>

      {/* TIMELINE LIST */}
      <div className="border border-border bg-card divide-y divide-border font-mono text-xs">
        {activities.map(act => (
          <div key={act.id} className="p-3.5 flex items-start justify-between gap-4 hover:bg-accent/30 transition-colors">
            <div className="flex items-start gap-3">
              <span className="border border-border px-1.5 py-0.5 bg-muted text-[10px] uppercase font-bold shrink-0 mt-0.5">
                {act.type}
              </span>
              <div>
                <p className="font-bold text-foreground">{act.action}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">{act.details}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0 font-bold">
              <Clock className="size-3" /> {act.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
