import { Drawer } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityIndicator } from '@/components/ui/brutalist'
import { useDataContext } from '@/lib/context/data-context'
import type { Task, Project, Client, Meeting, DocumentItem, ResearchNote, TaskStatus } from '@/lib/types'
import { CheckSquare, ExternalLink, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export type DrawerItem =
  | { type: 'TASK'; data: Task }
  | { type: 'PROJECT'; data: Project }
  | { type: 'CLIENT'; data: Client }
  | { type: 'MEETING'; data: Meeting }
  | { type: 'DOCUMENT'; data: DocumentItem }
  | { type: 'RESEARCH'; data: ResearchNote }

export function ItemDetailDrawer({
  item,
  onClose,
}: {
  item: DrawerItem | null
  onClose: () => void
}) {
  const { taskRepo, projectRepo, clientRepo, meetingRepo, documentRepo, researchRepo, projects, clients } = useDataContext()

  if (!item) return null

  const isTask = item.type === 'TASK'
  const isProject = item.type === 'PROJECT'
  const isClient = item.type === 'CLIENT'
  const isMeeting = item.type === 'MEETING'
  const isDocument = item.type === 'DOCUMENT'
  const isResearch = item.type === 'RESEARCH'

  return (
    <Drawer open={!!item} onOpenChange={open => !open && onClose()}>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="border-b border-border pb-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 border border-border bg-muted">
              {item.type} OBJECT
            </span>
            {'status' in item.data && <StatusBadge status={item.data.status} />}
            {'priority' in item.data && <PriorityIndicator priority={item.data.priority} />}
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {'title' in item.data
              ? item.data.title
              : 'name' in item.data
              ? item.data.name
              : 'filename' in item.data
              ? item.data.filename
              : ''}
          </h2>
        </div>

        {/* TASK DETAILS */}
        {isTask && (
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">DESCRIPTION</span>
              <p className="font-sans text-sm p-3 border border-border bg-muted/20">
                {item.data.description || 'No description provided.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="border border-border p-2 bg-background">
                <span className="text-[10px] text-muted-foreground uppercase block">DUE DATE</span>
                <span className="font-bold">{item.data.dueDate || 'No deadline'}</span>
              </div>
              <div className="border border-border p-2 bg-background">
                <span className="text-[10px] text-muted-foreground uppercase block">STATUS</span>
                <select
                  value={item.data.status}
                  onChange={e => {
                    taskRepo.update(item.data.id, { status: e.target.value as TaskStatus })
                    toast.success('Task status updated')
                  }}
                  className="w-full bg-transparent font-bold border-none p-0 focus:outline-none cursor-pointer"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="BLOCKED">BLOCKED</option>
                  <option value="WAITING">WAITING</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
            </div>

            {item.data.projectId && (
              <div className="border border-border p-3 bg-background">
                <span className="text-[10px] text-muted-foreground uppercase block">LINKED PROJECT</span>
                <span className="font-bold">{projects.find(p => p.id === item.data.projectId)?.name || item.data.projectId}</span>
              </div>
            )}

            {item.data.clientId && (
              <div className="border border-border p-3 bg-background">
                <span className="text-[10px] text-muted-foreground uppercase block">LINKED CLIENT</span>
                <span className="font-bold">{clients.find(c => c.id === item.data.clientId)?.company || item.data.clientId}</span>
              </div>
            )}
          </div>
        )}

        {/* PROJECT DETAILS */}
        {isProject && (
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">OBJECTIVE</span>
              <p className="font-sans text-sm p-3 border border-border bg-muted/20">{item.data.objective}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">OWNER</span>
                <span className="font-bold">{item.data.owner}</span>
              </div>
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">DEADLINE</span>
                <span className="font-bold">{item.data.deadline || 'Ongoing'}</span>
              </div>
            </div>
          </div>
        )}

        {/* CLIENT DETAILS */}
        {isClient && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">COMPANY</span>
                <span className="font-bold">{item.data.company}</span>
              </div>
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">CONTACT NAME</span>
                <span className="font-bold">{item.data.name}</span>
              </div>
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">EMAIL</span>
                <span className="font-bold">{item.data.email}</span>
              </div>
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">PHONE</span>
                <span className="font-bold">{item.data.phone}</span>
              </div>
            </div>
            {item.data.notes && (
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">ACCOUNT NOTES</span>
                <p className="font-sans text-sm p-3 border border-border bg-muted/20">{item.data.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* MEETING DETAILS */}
        {isMeeting && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">DATE & TIME</span>
                <span className="font-bold">{item.data.date} @ {item.data.time}</span>
              </div>
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">PROVIDER</span>
                <span className="font-bold">{item.data.provider}</span>
              </div>
            </div>
            <div className="border border-border p-2">
              <span className="text-[10px] text-muted-foreground uppercase block">PARTICIPANTS</span>
              <span className="font-bold">{item.data.participants.join(', ')}</span>
            </div>
            {item.data.joinLink && (
              <a
                href={item.data.joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border p-2.5 bg-foreground text-background font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors"
              >
                JOIN MEETING NOW <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        )}

        {/* DOCUMENT DETAILS */}
        {isDocument && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">FILE TYPE</span>
                <span className="font-bold">{item.data.fileType}</span>
              </div>
              <div className="border border-border p-2">
                <span className="text-[10px] text-muted-foreground uppercase block">FILE SIZE</span>
                <span className="font-bold">{Math.round(item.data.sizeBytes / 1024)} KB</span>
              </div>
            </div>
            <div className="border border-border p-2">
              <span className="text-[10px] text-muted-foreground uppercase block">UPLOAD DATE</span>
              <span className="font-bold">{item.data.uploadDate}</span>
            </div>
          </div>
        )}

        {/* RESEARCH DETAILS */}
        {isResearch && (
          <div className="space-y-4 font-mono text-xs">
            <div className="border border-border p-2">
              <span className="text-[10px] text-muted-foreground uppercase block">TOPIC</span>
              <span className="font-bold">{item.data.topic}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">RESEARCH NOTES</span>
              <p className="font-sans text-sm p-3 border border-border bg-muted/20">{item.data.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-6 border-t border-border flex items-center justify-between font-mono text-xs">
        {isTask && (
          <Button
            size="sm"
            className="rounded-none uppercase gap-1.5 bg-foreground text-background hover:bg-foreground/90"
            onClick={() => {
              const nextStatus = item.data.status === 'DONE' ? 'TODO' : 'DONE'
              taskRepo.update(item.data.id, { status: nextStatus })
              toast.success(nextStatus === 'DONE' ? 'Task completed' : 'Task reopened')
              onClose()
            }}
          >
            <CheckSquare className="size-3.5" />
            {item.data.status === 'DONE' ? 'Reopen Task' : 'Complete Task'}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          className="rounded-none uppercase gap-1.5 border-border hover:bg-destructive hover:text-destructive-foreground ml-auto"
          onClick={() => {
            if (isTask) taskRepo.delete(item.data.id)
            else if (isProject) projectRepo.delete(item.data.id)
            else if (isClient) clientRepo.delete(item.data.id)
            else if (isMeeting) meetingRepo.delete(item.data.id)
            else if (isDocument) documentRepo.delete(item.data.id)
            else if (isResearch) researchRepo.delete(item.data.id)
            toast.success('Object deleted')
            onClose()
          }}
        >
          <Trash2 className="size-3.5" /> Delete
        </Button>
      </div>
    </Drawer>
  )
}
