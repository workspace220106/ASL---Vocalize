import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { SquareProgress, StatusBadge, PriorityIndicator } from '@/components/ui/brutalist'
import { TaskModal, ProjectModal, ClientModal, MeetingModal } from '@/components/modals/AllModals'
import {
  CheckSquare,
  Plus,
  Calendar,
  Video,
  FolderKanban,
  Users,
  FileText,
  BookOpen,
  DollarSign,
  Briefcase,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/app/' as any)({
  component: DashboardHome,
})

function DashboardHome() {
  const { tasks, meetings, projects, clients, taskRepo, setSelectedItem } = useDataContext()

  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [meetingModalOpen, setMeetingModalOpen] = useState(false)

  const todayStr = new Date().toISOString().split('T')[0]

  // Focus metrics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'DONE').length
  const remainingTasks = totalTasks - completedTasks
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Filter tasks for Today
  const todayTasks = tasks.filter(t => t.dueDate === todayStr || t.priority === 'CRITICAL' || t.priority === 'HIGH')
  const upcomingMeetings = meetings.filter(m => m.date >= todayStr)

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>EXECUTIVE COMMAND CENTER</span>
            <span>·</span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Command Center
          </h1>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" onClick={() => setTaskModalOpen(true)} className="gap-1.5">
            <Plus className="size-3.5" /> Task
          </Button>
          <Button size="sm" variant="outline" onClick={() => setProjectModalOpen(true)} className="gap-1.5">
            <Plus className="size-3.5" /> Project
          </Button>
          <Button size="sm" variant="outline" onClick={() => setClientModalOpen(true)} className="gap-1.5">
            <Plus className="size-3.5" /> Client
          </Button>
          <Button size="sm" variant="outline" onClick={() => setMeetingModalOpen(true)} className="gap-1.5">
            <Plus className="size-3.5" /> Meeting
          </Button>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* FOCUS METRIC */}
        <div className="border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground uppercase">
            <span>COMPLETION RATE</span>
            <span className="font-bold text-foreground">{completionPct}%</span>
          </div>
          <div className="font-mono text-2xl font-bold text-foreground">
            {completedTasks} <span className="text-sm font-normal text-muted-foreground">/ {totalTasks} TASKS</span>
          </div>
          <SquareProgress value={completionPct} />
        </div>

        <div className="border border-border bg-card p-4 space-y-2 font-mono">
          <span className="text-xs text-muted-foreground uppercase block">REMAINING QUEUE</span>
          <div className="text-2xl font-bold text-foreground">{remainingTasks}</div>
          <p className="text-[11px] text-muted-foreground">Active execution items</p>
        </div>

        <div className="border border-border bg-card p-4 space-y-2 font-mono">
          <span className="text-xs text-muted-foreground uppercase block">ACTIVE PROJECTS</span>
          <div className="text-2xl font-bold text-foreground">{projects.filter(p => p.status === 'ACTIVE').length}</div>
          <p className="text-[11px] text-muted-foreground">In active development</p>
        </div>

        <div className="border border-border bg-card p-4 space-y-2 font-mono">
          <span className="text-xs text-muted-foreground uppercase block">SCHEDULED MEETINGS</span>
          <div className="text-2xl font-bold text-foreground">{upcomingMeetings.length}</div>
          <p className="text-[11px] text-muted-foreground">Upcoming sync sessions</p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: TODAY EXECUTION QUEUE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="font-serif text-lg font-bold tracking-tight uppercase">
              Today's Execution Queue ({todayTasks.length})
            </h2>
            <span className="text-xs font-mono text-muted-foreground">CLICK ROW TO INSPECT</span>
          </div>

          <div className="border border-border bg-card divide-y divide-border">
            {todayTasks.length === 0 ? (
              <p className="p-6 text-center font-mono text-xs text-muted-foreground">
                No priority tasks scheduled for today.
              </p>
            ) : (
              todayTasks.map(task => {
                const isDone = task.status === 'DONE'
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedItem({ type: 'TASK', data: task })}
                    className={`p-3 flex items-center justify-between gap-3 hover:bg-accent/50 cursor-pointer transition-colors group ${
                      isDone ? 'opacity-60 bg-muted/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          const next = isDone ? 'TODO' : 'DONE'
                          taskRepo.update(task.id, { status: next })
                          toast.success(next === 'DONE' ? 'Task completed' : 'Task reopened')
                        }}
                        className={`size-4 border flex items-center justify-center transition-colors ${
                          isDone
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        {isDone && <CheckSquare className="size-3" />}
                      </button>
                      <div className="min-w-0">
                        <p className={`font-mono text-xs font-semibold text-foreground truncate ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-[11px] text-muted-foreground truncate">{task.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <PriorityIndicator priority={task.priority} />
                      <StatusBadge status={task.status} />
                      <ArrowRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SCHEDULE & QUICK LAUNCHERS */}
        <div className="space-y-6">
          {/* SCHEDULE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="font-serif text-lg font-bold tracking-tight uppercase flex items-center gap-2">
                <Calendar className="size-4" /> Schedule
              </h2>
            </div>
            <div className="border border-border bg-card divide-y divide-border font-mono text-xs">
              {upcomingMeetings.length === 0 ? (
                <p className="p-4 text-center text-muted-foreground">No meetings scheduled today.</p>
              ) : (
                upcomingMeetings.map(mtg => (
                  <div
                    key={mtg.id}
                    onClick={() => setSelectedItem({ type: 'MEETING', data: mtg })}
                    className="p-3 space-y-1.5 hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span className="truncate">{mtg.title}</span>
                      <span className="text-[10px] border border-border px-1 bg-muted">{mtg.provider}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{mtg.time} ({mtg.durationMinutes}m)</span>
                      <span>{mtg.participants.length} Participants</span>
                    </div>
                    {mtg.joinLink && (
                      <a
                        href={mtg.joinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[10px] text-foreground font-bold hover:underline"
                      >
                        JOIN LINK <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* QUICK WORKSPACE LAUNCHERS */}
          <div className="space-y-3 font-mono text-xs">
            <h2 className="font-serif text-lg font-bold tracking-tight uppercase border-b border-border pb-2">
              Quick Launchers
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => setTaskModalOpen(true)} className="justify-start gap-2 h-9 text-[11px]">
                <CheckSquare className="size-3.5" /> Tasks
              </Button>
              <Button variant="outline" size="sm" onClick={() => setProjectModalOpen(true)} className="justify-start gap-2 h-9 text-[11px]">
                <FolderKanban className="size-3.5" /> Projects
              </Button>
              <Button variant="outline" size="sm" onClick={() => setClientModalOpen(true)} className="justify-start gap-2 h-9 text-[11px]">
                <Users className="size-3.5" /> Clients
              </Button>
              <Button variant="outline" size="sm" onClick={() => setMeetingModalOpen(true)} className="justify-start gap-2 h-9 text-[11px]">
                <Video className="size-3.5" /> Meetings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <TaskModal open={taskModalOpen} onOpenChange={setTaskModalOpen} />
      <ProjectModal open={projectModalOpen} onOpenChange={setProjectModalOpen} />
      <ClientModal open={clientModalOpen} onOpenChange={setClientModalOpen} />
      <MeetingModal open={meetingModalOpen} onOpenChange={setMeetingModalOpen} />
    </div>
  )
}
