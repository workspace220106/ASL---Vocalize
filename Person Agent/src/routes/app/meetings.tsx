import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { MeetingModal } from '@/components/modals/AllModals'
import { Video, Plus, ExternalLink, Calendar, Users } from 'lucide-react'

export const Route = createFileRoute('/app/meetings' as any)({
  component: MeetingsPage,
})

function MeetingsPage() {
  const { meetings, setSelectedItem } = useDataContext()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>SYNC & COLLABORATION</span>
            <span>·</span>
            <span>{meetings.length} SCHEDULED SESSIONS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Meetings Workspace
          </h1>
        </div>

        <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-3.5" /> Schedule Meeting
        </Button>
      </div>

      {/* MEETINGS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meetings.map(meeting => (
          <div
            key={meeting.id}
            onClick={() => setSelectedItem({ type: 'MEETING', data: meeting })}
            className="border border-border bg-card p-4 space-y-3 hover:border-foreground/80 cursor-pointer transition-colors font-mono text-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-muted-foreground">{meeting.id}</span>
                <span className="border border-border px-1.5 py-0.5 bg-muted text-[10px] uppercase font-bold">
                  {meeting.provider}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">{meeting.title}</h3>
              <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" /> {meeting.date} @ {meeting.time}
                </span>
                <span>({meeting.durationMinutes} mins)</span>
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                <Users className="size-3" /> {meeting.participants.join(', ')}
              </p>
            </div>

            {meeting.joinLink && (
              <a
                href={meeting.joinLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 border border-border p-2 bg-foreground text-background font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors"
              >
                JOIN SESSION <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      <MeetingModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
