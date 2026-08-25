import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/brutalist'
import { ClientModal } from '@/components/modals/AllModals'
import { Users, Plus, Mail, Phone, Calendar } from 'lucide-react'

export const Route = createFileRoute('/app/clients' as any)({
  component: ClientsPage,
})

function ClientsPage() {
  const { clients, setSelectedItem } = useDataContext()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>RELATIONSHIP MANAGEMENT</span>
            <span>·</span>
            <span>{clients.length} ACCOUNTS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Client Directory
          </h1>
        </div>

        <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-3.5" /> Add Client
        </Button>
      </div>

      {/* CLIENTS TABLE */}
      <div className="border border-border bg-card overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="p-3">ID</th>
                <th className="p-3">COMPANY & CONTACT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">EMAIL / PHONE</th>
                <th className="p-3">LAST CONTACT</th>
                <th className="p-3">NEXT FOLLOW-UP</th>
                <th className="p-3">OWNER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map(client => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedItem({ type: 'CLIENT', data: client })}
                  className="hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-bold text-muted-foreground">{client.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-foreground">{client.company}</p>
                    <p className="text-[11px] text-muted-foreground">{client.name}</p>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={client.status} />
                  </td>
                  <td className="p-3 text-[11px] text-muted-foreground space-y-0.5">
                    <p className="flex items-center gap-1.5">
                      <Mail className="size-3" /> {client.email}
                    </p>
                    {client.phone && (
                      <p className="flex items-center gap-1.5">
                        <Phone className="size-3" /> {client.phone}
                      </p>
                    )}
                  </td>
                  <td className="p-3 text-muted-foreground">{client.lastContact}</td>
                  <td className="p-3 font-semibold text-foreground">{client.nextFollowUp || '—'}</td>
                  <td className="p-3 text-muted-foreground">{client.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClientModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
