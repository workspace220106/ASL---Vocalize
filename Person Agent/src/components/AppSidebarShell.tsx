import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import {
  CheckSquare,
  FolderKanban,
  Users,
  Video,
  Calendar,
  FileText,
  BookOpen,
  DollarSign,
  Briefcase,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Menu,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function AppSidebarShell({ children }: { children: React.ReactNode }) {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const { tasks, projects, clients, meetings, documents } = useDataContext()

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('agentflow_sidebar_collapsed') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('agentflow_sidebar_collapsed', String(collapsed))
  }, [collapsed])

  const pendingTasksCount = tasks.filter(t => t.status !== 'DONE').length
  const activeProjectsCount = projects.filter(p => p.status === 'ACTIVE').length

  const navGroups = [
    {
      title: 'COMMAND',
      items: [
        { label: 'Command Center', path: '/app', icon: CheckSquare, badge: pendingTasksCount ? `${pendingTasksCount}` : undefined },
        { label: 'Tasks', path: '/app/tasks', icon: CheckSquare, badge: `${tasks.length}` },
        { label: 'Projects', path: '/app/projects', icon: FolderKanban, badge: `${activeProjectsCount}` },
      ],
    },
    {
      title: 'WORK',
      items: [
        { label: 'Clients', path: '/app/clients', icon: Users, badge: `${clients.length}` },
        { label: 'Meetings', path: '/app/meetings', icon: Video, badge: `${meetings.length}` },
        { label: 'Calendar', path: '/app/calendar', icon: Calendar },
      ],
    },
    {
      title: 'KNOWLEDGE',
      items: [
        { label: 'Documents', path: '/app/documents', icon: FileText, badge: `${documents.length}` },
        { label: 'Research', path: '/app/research', icon: BookOpen },
      ],
    },
    {
      title: 'BUSINESS',
      items: [
        { label: 'Finance', path: '/app/finance', icon: DollarSign },
        { label: 'Operations', path: '/app/operations', icon: Briefcase },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Activity Log', path: '/app/activity', icon: Activity },
        { label: 'Settings', path: '/app/settings', icon: Settings },
      ],
    },
  ]

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <aside className="h-full flex flex-col justify-between font-mono text-xs select-none">
      <div className="space-y-4">
        {/* BRAND HEADER */}
        <div className="flex items-center justify-between border-b border-border p-3">
          <Link to={"/app" as any} className="flex items-center gap-2 font-bold tracking-wider text-foreground">
            <div className="size-6 bg-foreground text-background flex items-center justify-center font-serif text-sm font-black rounded-none">
              A
            </div>
            {(!collapsed || isMobile) && (
              <span className="font-serif text-base tracking-tight font-black uppercase text-foreground">
                AGENTFLOW
              </span>
            )}
          </Link>
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-6 w-6 border border-border rounded-none p-0 text-muted-foreground hover:text-foreground"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
            </Button>
          )}
        </div>

        {/* NAVIGATION GROUPS */}
        <div className="space-y-4 px-2">
          {navGroups.map(group => (
            <div key={group.title} className="space-y-1">
              {(!collapsed || isMobile) && (
                <span className="text-[10px] text-muted-foreground font-bold tracking-widest px-2 block uppercase">
                  {group.title}
                </span>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon
                  const isActive = currentPath === item.path || (item.path !== '/app' && currentPath.startsWith(item.path))
                  return (
                    <Link
                      key={item.path}
                      to={item.path as any}
                      className={`flex items-center justify-between px-2 py-1.5 border transition-colors group ${
                        isActive
                          ? 'border-foreground bg-foreground text-background font-bold'
                          : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground'
                      }`}
                      title={collapsed && !isMobile ? item.label : undefined}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <Icon className={`size-4 shrink-0 ${isActive ? 'text-background' : 'group-hover:text-foreground'}`} />
                        {(!collapsed || isMobile) && (
                          <span className="truncate tracking-wide">{item.label}</span>
                        )}
                      </div>
                      {(!collapsed || isMobile) && item.badge && (
                        <span
                          className={`text-[9px] px-1 py-0.2 border leading-none font-bold ${
                            isActive
                              ? 'border-background text-background bg-foreground'
                              : 'border-border text-muted-foreground bg-muted'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* USER FOOTER */}
      <div className="border-t border-border p-3 space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="size-7 bg-muted border border-border flex items-center justify-center font-bold text-foreground font-serif">
            AM
          </div>
          {(!collapsed || isMobile) && (
            <div className="overflow-hidden leading-tight">
              <p className="font-bold text-foreground truncate text-xs">Alex Morgan</p>
              <p className="text-[10px] text-muted-foreground truncate">Executive Workspace</p>
            </div>
          )}
        </div>
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground border-t border-border/50 pt-2 font-mono">
            <Shield className="size-3 text-emerald-500" />
            <span>SECURITY LEVEL 5 · ZERO AI</span>
          </div>
        )}
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen flex bg-background text-foreground antialiased selection:bg-foreground selection:text-background font-sans">
      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden md:block border-r border-border bg-background transition-all duration-200 shrink-0 ${
          collapsed ? 'w-12' : 'w-60'
        }`}
      >
        <SidebarContent />
      </div>

      {/* MOBILE SHEET NAVIGATION */}
      <div className="md:hidden fixed top-3 left-3 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border rounded-none">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r border-border bg-background">
            <SidebarContent isMobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  )
}
