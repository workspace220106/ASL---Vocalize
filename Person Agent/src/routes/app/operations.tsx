import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Briefcase, CheckSquare, ShieldAlert } from 'lucide-react'

export const Route = createFileRoute('/app/operations' as any)({
  component: OperationsPage,
})

function OperationsPage() {
  const { operationalProcesses, operationalActions } = useDataContext()

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <span>GOVERNANCE & SOPS</span>
          <span>·</span>
          <span>{operationalProcesses.length} ACTIVE PROCESSES</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5 flex items-center gap-2">
          <Briefcase className="size-6" /> Operations Workspace
        </h1>
      </div>

      {/* PROCESSES GRID */}
      <div className="space-y-4 font-mono text-xs">
        <h2 className="font-serif text-lg font-bold uppercase border-b border-border pb-2">
          Company Standard Operating Procedures (SOPs)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {operationalProcesses.map(proc => (
            <div key={proc.id} className="border border-border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-muted-foreground">{proc.id}</span>
                <span className="border border-border px-1.5 py-0.5 bg-muted font-bold text-[10px] uppercase">
                  {proc.status}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">{proc.title}</h3>
              <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                <span>CATEGORY: {proc.category}</span>
                <span>FREQUENCY: {proc.frequency}</span>
              </div>
              <p className="text-[11px] text-muted-foreground border-t border-border pt-2">
                OWNER: {proc.owner} · LAST RUN: {proc.lastRunDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PENDING OPERATIONAL ACTIONS */}
      <div className="space-y-4 font-mono text-xs">
        <h2 className="font-serif text-lg font-bold uppercase border-b border-border pb-2">
          Operational Governance Actions
        </h2>
        <div className="border border-border bg-card divide-y divide-border">
          {operationalActions.map(act => (
            <div key={act.id} className="p-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{act.title}</p>
                <p className="text-[10px] text-muted-foreground">ASSIGNEE: {act.assignee} · DUE: {act.dueDate}</p>
              </div>
              <span className="border border-border px-2 py-0.5 bg-muted font-bold uppercase text-[10px]">
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
