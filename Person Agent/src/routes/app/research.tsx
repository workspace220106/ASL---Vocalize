import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/app/research' as any)({
  component: ResearchPage,
})

function ResearchPage() {
  const { research, researchRepo, setSelectedItem } = useDataContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [topic, setTopic] = useState('Architecture')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [source, setSource] = useState('https://arxiv.org')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    researchRepo.create({
      topic: topic.trim(),
      title: title.trim(),
      notes: notes.trim(),
      sources: [source.trim()].filter(Boolean),
      references: [],
    })
    toast.success('Research note saved')
    setTitle('')
    setNotes('')
    setModalOpen(false)
  }

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>KNOWLEDGE EXPLORATION</span>
            <span>·</span>
            <span>{research.length} RESEARCH TOPICS</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Research Workspace
          </h1>
        </div>

        <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-3.5" /> Create Note
        </Button>
      </div>

      {/* RESEARCH CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {research.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem({ type: 'RESEARCH', data: item })}
            className="border border-border bg-card p-5 space-y-3 hover:border-foreground/80 cursor-pointer transition-colors font-mono text-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-muted-foreground">{item.id}</span>
                <span className="border border-border px-1.5 py-0.5 bg-muted text-[10px] uppercase font-bold">
                  {item.topic}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {item.notes}
              </p>
            </div>

            {item.sources.length > 0 && (
              <div className="border-t border-border pt-3 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">SOURCES</span>
                {item.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-foreground font-bold hover:underline truncate max-w-full"
                  >
                    {src} <ExternalLink className="size-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NEW RESEARCH NOTE</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 pt-2 font-mono text-xs">
            <div className="space-y-1">
              <Label>Topic</Label>
              <Input value={topic} onChange={e => setTopic(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Title *</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Distributed Consensus Algorithms" required />
            </div>
            <div className="space-y-1">
              <Label>Notes & Findings</Label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Key findings, benchmarks, architecture takeaways..."
                className="w-full h-24 border border-border bg-background p-2 font-mono text-xs focus-ring rounded-none"
              />
            </div>
            <div className="space-y-1">
              <Label>Primary Source URL</Label>
              <Input value={source} onChange={e => setSource(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit">Save Note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
