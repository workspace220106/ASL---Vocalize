import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityIndicator, SquareProgress } from '@/components/ui/brutalist'
import { ProjectModal } from '@/components/modals/AllModals'
import { FolderKanban, Plus, CheckCircle2, Circle } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/app/projects' as any)({
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projects, projectRepo, setSelectedItem, tasks } = useDataContext()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>PORTFOLIO EXECUTION</span>
            <span>·</span>
            <span>{projects.length} TOTAL PROJECTS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Project Management
          </h1>
        </div>

        <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-3.5" /> Create Project
        </Button>
      </div>

      {/* PROJECT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => {
          const projectTasks = tasks.filter(t => t.projectId === project.id)
          const completedCount = projectTasks.filter(t => t.status === 'DONE').length
          const totalCount = projectTasks.length
          const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

          return (
            <div
              key={project.id}
              onClick={() => setSelectedItem({ type: 'PROJECT', data: project })}
              className="border border-border bg-card p-5 space-y-4 hover:border-foreground/80 cursor-pointer transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-muted-foreground text-xs">{project.id}</span>
                    <StatusBadge status={project.status} />
                  </div>
                  <PriorityIndicator priority={project.priority} />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-foreground group-hover:underline">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-1 line-clamp-2">
                    {project.objective}
                  </p>
                </div>

                {/* MILESTONES */}
                {project.milestones.length > 0 && (
                  <div className="border-t border-border pt-3 space-y-1.5 font-mono text-xs">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">KEY MILESTONES</span>
                    {project.milestones.map(m => (
                      <div key={m.id} className="flex items-center justify-between text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {m.completed ? (
                            <CheckCircle2 className="size-3.5 text-foreground" />
                          ) : (
                            <Circle className="size-3.5 text-muted-foreground" />
                          )}
                          <span className={m.completed ? 'line-through' : 'text-foreground font-medium'}>
                            {m.title}
                          </span>
                        </div>
                        <span className="text-[10px]">{m.dueDate}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER PROGRESS */}
              <div className="border-t border-border pt-3 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>TASK COMPLETION ({completedCount}/{totalCount})</span>
                  <span className="font-bold text-foreground">{pct}%</span>
                </div>
                <SquareProgress value={pct} />
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span>OWNER: {project.owner}</span>
                  <span>DEADLINE: {project.deadline || 'ONGOING'}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ProjectModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
