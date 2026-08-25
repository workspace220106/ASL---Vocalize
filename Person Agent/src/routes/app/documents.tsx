import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/brutalist'
import { FileText, Plus, Search, Tag } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/app/documents' as any)({
  component: DocumentsPage,
})

function DocumentsPage() {
  const { documents, documentRepo, setSelectedItem } = useDataContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filename, setFilename] = useState('')
  const [fileType, setFileType] = useState('PDF')
  const [tagInput, setTagInput] = useState('Architecture')

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!filename.trim()) return
    documentRepo.create({
      filename: filename.trim(),
      fileType,
      sizeBytes: Math.floor(1000000 + Math.random() * 2000000),
      status: 'FINAL',
      tags: [tagInput],
    })
    toast.success('Document uploaded')
    setFilename('')
    setModalOpen(false)
  }

  const filtered = documents.filter(d =>
    d.filename.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>KNOWLEDGE ARCHIVE</span>
            <span>·</span>
            <span>{documents.length} FILES</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Documents Workspace
          </h1>
        </div>

        <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-3.5" /> Upload Document
        </Button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
        <Input
          placeholder="Search documents by title or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8 h-8 text-xs font-mono"
        />
      </div>

      {/* DOCUMENT TABLE */}
      <div className="border border-border bg-card overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="p-3">ID</th>
                <th className="p-3">FILENAME</th>
                <th className="p-3">TYPE</th>
                <th className="p-3">SIZE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">TAGS</th>
                <th className="p-3">UPLOAD DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(doc => (
                <tr
                  key={doc.id}
                  onClick={() => setSelectedItem({ type: 'DOCUMENT', data: doc })}
                  className="hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-bold text-muted-foreground">{doc.id}</td>
                  <td className="p-3 font-bold text-foreground flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground shrink-0" />
                    <span>{doc.filename}</span>
                  </td>
                  <td className="p-3">
                    <span className="border border-border px-1 bg-muted uppercase text-[10px]">
                      {doc.fileType}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{Math.round(doc.sizeBytes / 1024)} KB</td>
                  <td className="p-3">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {doc.tags.map(t => (
                        <span key={t} className="border border-border px-1 text-[9px] text-muted-foreground bg-background">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{doc.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>UPLOAD DOCUMENT RECORD</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4 pt-2 font-mono text-xs">
            <div className="space-y-1">
              <Label>Filename *</Label>
              <Input value={filename} onChange={e => setFilename(e.target.value)} placeholder="e.g. Q4_Strategy_Briefing.pdf" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>File Type</Label>
                <select value={fileType} onChange={e => setFileType(e.target.value)} className="w-full h-9 border border-border bg-background px-2 rounded-none">
                  <option value="PDF">PDF</option>
                  <option value="DOCX">DOCX</option>
                  <option value="SPREADSHEET">SPREADSHEET</option>
                  <option value="MARKDOWN">MARKDOWN</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Tag</Label>
                <Input value={tagInput} onChange={e => setTagInput(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit">Upload Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
