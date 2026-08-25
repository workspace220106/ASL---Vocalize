import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings as SettingsIcon, RefreshCw, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { SettingsRepository } from '@/lib/repositories'

export const Route = createFileRoute('/app/settings' as any)({
  component: SettingsPage,
})

function SettingsPage() {
  const { resetData } = useDataContext()
  const [settings, setSettings] = useState(() => SettingsRepository.get())

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    SettingsRepository.update(settings)
    toast.success('Settings updated successfully')
  }

  return (
    <div className="space-y-6 font-sans max-w-3xl">
      {/* HEADER */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <span>WORKSPACE CONFIGURATION</span>
          <span>·</span>
          <span>NO AI ENGINE</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5 flex items-center gap-2">
          <SettingsIcon className="size-6" /> Executive Settings
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
        {/* ACCOUNT SETTINGS */}
        <div className="border border-border bg-card p-5 space-y-4">
          <h2 className="font-serif text-lg font-bold text-foreground uppercase border-b border-border pb-2">
            Account Profile
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Executive Name</Label>
              <Input
                value={settings.userName}
                onChange={e => setSettings({ ...settings, userName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Executive Email</Label>
              <Input
                type="email"
                value={settings.userEmail}
                onChange={e => setSettings({ ...settings, userEmail: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* SECURITY & DATA CONTROL */}
        <div className="border border-border bg-card p-5 space-y-4">
          <h2 className="font-serif text-lg font-bold text-foreground uppercase border-b border-border pb-2 flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-500" /> Data Isolation & Control
          </h2>
          <p className="text-muted-foreground">
            All AgentFlow records are stored locally in isolated localStorage repositories. Zero external server telemetry or AI processing is active.
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-border">
            <div>
              <p className="font-bold text-foreground">Reset Storage to Demo Seed Data</p>
              <p className="text-[11px] text-muted-foreground">Wipes local modifications and restores initial seed tasks and projects.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                resetData()
                toast.success('Workspace reset to initial seed data')
              }}
              className="gap-1.5 border-border hover:bg-destructive hover:text-destructive-foreground"
            >
              <RefreshCw className="size-3.5" /> Reset Data
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save Settings
        </Button>
      </form>
    </div>
  )
}
