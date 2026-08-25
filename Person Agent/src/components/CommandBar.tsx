import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRouter } from '@tanstack/react-router'
import {
  CheckSquare,
  FolderKanban,
  Users,
  Calendar,
  Video,
  FileText,
  BookOpen,
  DollarSign,
  Briefcase,
  Activity,
  Settings,
  Search,
} from 'lucide-react'

export function CommandBar({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  const commands = [
    { label: 'Go to Command Center (Home)', route: '/app/', icon: CheckSquare, category: 'NAVIGATE' },
    { label: 'Go to Tasks Workspace', route: '/app/tasks', icon: CheckSquare, category: 'NAVIGATE' },
    { label: 'Go to Projects Workspace', route: '/app/projects', icon: FolderKanban, category: 'NAVIGATE' },
    { label: 'Go to Clients Directory', route: '/app/clients', icon: Users, category: 'NAVIGATE' },
    { label: 'Go to Meetings & Video Calls', route: '/app/meetings', icon: Video, category: 'NAVIGATE' },
    { label: 'Go to Calendar Schedule', route: '/app/calendar', icon: Calendar, category: 'NAVIGATE' },
    { label: 'Go to Documents Library', route: '/app/documents', icon: FileText, category: 'NAVIGATE' },
    { label: 'Go to Research Workspace', route: '/app/research', icon: BookOpen, category: 'NAVIGATE' },
    { label: 'Go to Finance Workspace', route: '/app/finance', icon: DollarSign, category: 'NAVIGATE' },
    { label: 'Go to Operations Workspace', route: '/app/operations', icon: Briefcase, category: 'NAVIGATE' },
    { label: 'Go to Activity Log', route: '/app/activity', icon: Activity, category: 'NAVIGATE' },
    { label: 'Go to Settings', route: '/app/settings', icon: Settings, category: 'NAVIGATE' },
  ]

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden border border-border bg-background shadow-2xl rounded-none">
        <div className="flex items-center border-b border-border px-3 py-2 bg-muted/20">
          <Search className="size-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Type a command or search workspace..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-8 font-mono text-sm bg-transparent"
            autoFocus
          />
          <span className="text-[10px] font-mono border border-border px-1.5 py-0.5 text-muted-foreground bg-background">
            ESC
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <p className="p-4 font-mono text-xs text-muted-foreground text-center">
              No matching commands found.
            </p>
          ) : (
            filtered.map(cmd => {
              const Icon = cmd.icon
              return (
                <button
                  key={cmd.route}
                  onClick={() => {
                    router.navigate({ to: cmd.route } as any)
                    onOpenChange(false)
                    setQuery('')
                  }}
                  className="w-full flex items-center justify-between p-2 text-left font-mono text-xs hover:bg-accent hover:text-foreground border border-transparent hover:border-border transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="font-semibold text-foreground">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest border border-border px-1">
                    {cmd.category}
                  </span>
                </button>
              )
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
