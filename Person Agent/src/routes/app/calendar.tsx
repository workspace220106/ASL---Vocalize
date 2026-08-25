import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Calendar as CalendarIcon } from 'lucide-react'

export const Route = createFileRoute('/app/calendar' as any)({
  component: CalendarPage,
})

function CalendarPage() {
  const { meetings, tasks } = useDataContext()
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <span>SCHEDULE WORKSPACE</span>
          <span>·</span>
          <span>AUGUST 2026</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5 flex items-center gap-2">
          <CalendarIcon className="size-6" /> Executive Calendar
        </h1>
      </div>

      {/* CALENDAR GRID */}
      <div className="border border-border bg-card font-mono text-xs overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border bg-muted/30 text-center font-bold text-[10px] uppercase py-2">
          {days.map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-border min-h-[400px]">
          {Array.from({ length: 31 }, (_, i) => {
            const dayNum = i + 1
            const dateStr = `2026-08-${String(dayNum).padStart(2, '0')}`
            const dayMeetings = meetings.filter(m => m.date === dateStr)
            const dayTasks = tasks.filter(t => t.dueDate === dateStr)

            return (
              <div key={dayNum} className="p-2 space-y-1.5 hover:bg-accent/20 transition-colors">
                <div className="font-bold text-foreground text-xs">{dayNum}</div>
                {dayMeetings.map(m => (
                  <div key={m.id} className="p-1 border border-border bg-background text-[9px] font-semibold truncate">
                    📹 {m.time} {m.title}
                  </div>
                ))}
                {dayTasks.map(t => (
                  <div key={t.id} className="p-1 border border-border bg-muted text-[9px] truncate text-muted-foreground">
                    ✓ {t.title}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
