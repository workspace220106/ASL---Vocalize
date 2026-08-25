import { useState } from 'react'
import { AppSidebarShell } from '@/components/AppSidebarShell'
import { CommandBar } from '@/components/CommandBar'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Search, Sun, Moon } from 'lucide-react'

export function Shell({ children }: { children: React.ReactNode }) {
  const [commandBarOpen, setCommandBarOpen] = useState(false)
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('light')
  })

  const toggleTheme = () => {
    const next = !isLightMode
    setIsLightMode(next)
    if (next) {
      document.documentElement.classList.add('light')
      localStorage.setItem('agentflow_theme', 'light')
      toast.info('Theme set to Light Executive Mode')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('agentflow_theme', 'dark')
      toast.info('Theme set to Obsidian Dark Mode')
    }
  }

  return (
    <AppSidebarShell>
      {/* HEADER BAR */}
      <header className="h-12 border-b border-border bg-background px-4 flex items-center justify-between shrink-0 font-mono text-xs select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-foreground">
              OBSIDIAN CONSOLE · SYSTEM READY
            </span>
          </div>
          <span className="hidden sm:inline-block text-muted-foreground">|</span>
          <span className="hidden sm:inline-block text-[11px] text-muted-foreground uppercase">
            LOCAL STORAGE ISOLATION LAYER
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* THEME TOGGLE */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="h-7 px-2 border-border gap-1.5 text-[10px] uppercase font-bold"
            title="Toggle theme mode"
          >
            {isLightMode ? <Sun className="size-3 text-amber-500" /> : <Moon className="size-3 text-zinc-300" />}
            <span>{isLightMode ? 'LIGHT' : 'DARK'}</span>
          </Button>

          {/* CMD+K TRIGGER */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandBarOpen(true)}
            className="h-7 px-2 border-border text-muted-foreground hover:text-foreground gap-2 text-[10px] uppercase font-bold"
          >
            <Search className="size-3" />
            <span className="hidden md:inline">SEARCH COMMANDS</span>
            <kbd className="border border-border px-1 text-[9px] bg-muted">⌘K</kbd>
          </Button>
        </div>
      </header>

      {/* PAGE BODY */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>

      {/* GLOBAL COMMAND PALETTE */}
      <CommandBar open={commandBarOpen} onOpenChange={setCommandBarOpen} />

      {/* TOASTER */}
      <Toaster position="bottom-right" theme="dark" toastOptions={{ className: 'rounded-none border border-border font-mono text-xs bg-background text-foreground' }} />
    </AppSidebarShell>
  )
}
