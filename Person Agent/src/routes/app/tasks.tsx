import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge, PriorityIndicator } from '@/components/ui/brutalist'
import { TaskModal } from '@/components/modals/AllModals'
import { CheckSquare, Plus, Search, Filter } from 'lucide-react'
import { toast } from 'sonner'
import type { TaskStatus, TaskPriority } from '@/lib/types'

export const Route = createFileRoute('/app/tasks' as any)({
  component: TasksPage,
})

function TasksPage() {
  const { tasks, taskRepo, setSelectedItem, projects, clients } = useDataContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [savedView, setSavedView] = useState<'ALL' | 'PENDING' | 'CRITICAL' | 'TODAY'>('ALL')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const todayStr = new Date().toISOString().split('T')[0]

  const filteredTasks = tasks.filter(t => {
    // Saved views filter
    if (savedView === 'PENDING' && t.status === 'DONE') return false
    if (savedView === 'CRITICAL' && t.priority !== 'CRITICAL') return false
    if (savedView === 'TODAY' && t.dueDate !== todayStr) return false

    // Status dropdown filter
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
      )
    }
    return true
  })

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>WORK MANAGEMENT</span>
            <span>·</span>
            <span>{tasks.length} TOTAL TASKS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Tasks Workspace
          </h1>
        </div>

        <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-3.5" /> Create Task
        </Button>
      </div>

      {/* SAVED VIEWS & FILTERS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        {/* SAVED VIEW PILLS */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSavedView('ALL')}
            className={`px-3 py-1 border text-xs font-bold uppercase transition-colors cursor-pointer rounded-none ${
              savedView === 'ALL' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setSavedView('PENDING')}
            className={`px-3 py-1 border text-xs font-bold uppercase transition-colors cursor-pointer rounded-none ${
              savedView === 'PENDING' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            Pending Execution ({tasks.filter(t => t.status !== 'DONE').length})
          </button>
          <button
            onClick={() => setSavedView('CRITICAL')}
            className={`px-3 py-1 border text-xs font-bold uppercase transition-colors cursor-pointer rounded-none ${
              savedView === 'CRITICAL' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            Critical Priority ({tasks.filter(t => t.priority === 'CRITICAL').length})
          </button>
          <button
            onClick={() => setSavedView('TODAY')}
            className={`px-3 py-1 border text-xs font-bold uppercase transition-colors cursor-pointer rounded-none ${
              savedView === 'TODAY' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            Due Today ({tasks.filter(t => t.dueDate === todayStr).length})
          </button>
        </div>

        {/* SEARCH & STATUS DROPDOWN */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs font-mono"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="h-8 border border-border bg-background px-2 font-mono text-xs focus-ring rounded-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="WAITING">WAITING</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      </div>

      {/* TASK TABLE */}
      <div className="border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="p-3 w-8"></th>
                <th className="p-3">ID</th>
                <th className="p-3">TASK TITLE & DESCRIPTION</th>
                <th className="p-3">PRIORITY</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">DUE DATE</th>
                <th className="p-3">LINKED ENTITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No matching tasks found.
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => {
                  const isDone = task.status === 'DONE'
                  const linkedProj = projects.find(p => p.id === task.projectId)
                  const linkedClient = clients.find(c => c.id === task.clientId)
                  return (
                    <tr
                      key={task.id}
                      onClick={() => setSelectedItem({ type: 'TASK', data: task })}
                      className={`hover:bg-accent/50 cursor-pointer transition-colors ${
                        isDone ? 'opacity-60 bg-muted/10' : ''
                      }`}
                    >
                      <td className="p-3" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            const next = isDone ? 'TODO' : 'DONE'
                            taskRepo.update(task.id, { status: next })
                            toast.success(next === 'DONE' ? 'Task completed' : 'Task reopened')
                          }}
                          className={`size-4 border flex items-center justify-center transition-colors ${
                            isDone ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
                          }`}
                        >
                          {isDone && <CheckSquare className="size-3" />}
                        </button>
                      </td>
                      <td className="p-3 font-bold text-muted-foreground text-[11px]">{task.id}</td>
                      <td className="p-3">
                        <p className={`font-semibold text-foreground ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-[11px] text-muted-foreground truncate max-w-md">{task.description}</p>
                        )}
                      </td>
                      <td className="p-3">
                        <PriorityIndicator priority={task.priority} />
                      </td>
                      <td className="p-3">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="p-3 text-muted-foreground">{task.dueDate || 'No Date'}</td>
                      <td className="p-3 text-[11px] text-muted-foreground">
                        {linkedProj?.name || linkedClient?.company || '—'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TaskModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
