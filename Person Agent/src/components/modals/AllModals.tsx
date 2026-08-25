import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDataContext } from '@/lib/context/data-context'
import type { TaskPriority, TaskStatus, ProjectPriority, ProjectStatus, ClientStatus } from '@/lib/types'
import { toast } from 'sonner'

export function TaskModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { taskRepo, projects, clients } = useDataContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('HIGH')
  const [status, setStatus] = useState<TaskStatus>('TODO')
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0])
  const [projectId, setProjectId] = useState('')
  const [clientId, setClientId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    taskRepo.create({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
      projectId: projectId || undefined,
      clientId: clientId || undefined,
    })
    toast.success('Task created')
    setTitle('')
    setDescription('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NEW TASK RECORD</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2 font-mono text-xs">
          <div className="space-y-1">
            <Label>Task Title *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Audit API authentication pipeline" required />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Operational context or acceptance criteria..."
              className="w-full h-20 border border-border bg-background p-2 font-mono text-xs focus-ring rounded-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Priority</Label>
              <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full h-9 border border-border bg-background px-2 font-mono text-xs rounded-none">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label>Due Date</Label>
              <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Link Project</Label>
              <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full h-9 border border-border bg-background px-2 font-mono text-xs rounded-none">
                <option value="">-- None --</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Link Client</Label>
              <select value={clientId} onChange={e => setClientId(e.target.value)} className="w-full h-9 border border-border bg-background px-2 font-mono text-xs rounded-none">
                <option value="">-- None --</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { projectRepo } = useDataContext()
  const [name, setName] = useState('')
  const [objective, setObjective] = useState('')
  const [owner, setOwner] = useState('Alex Morgan')
  const [priority, setPriority] = useState<ProjectPriority>('HIGH')
  const [status, setStatus] = useState<ProjectStatus>('ACTIVE')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    projectRepo.create({
      name: name.trim(),
      objective: objective.trim(),
      owner,
      priority,
      status,
      milestones: [],
    })
    toast.success('Project created')
    setName('')
    setObjective('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NEW PROJECT RECORD</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2 font-mono text-xs">
          <div className="space-y-1">
            <Label>Project Name *</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Distributed Core v2" required />
          </div>
          <div className="space-y-1">
            <Label>Objective *</Label>
            <textarea
              value={objective}
              onChange={e => setObjective(e.target.value)}
              placeholder="Key project outcome & deliverables..."
              className="w-full h-20 border border-border bg-background p-2 font-mono text-xs focus-ring rounded-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Owner</Label>
              <Input value={owner} onChange={e => setOwner(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Priority</Label>
              <select value={priority} onChange={e => setPriority(e.target.value as ProjectPriority)} className="w-full h-9 border border-border bg-background px-2 font-mono text-xs rounded-none">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ClientModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { clientRepo } = useDataContext()
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<ClientStatus>('ACTIVE')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!company.trim()) return
    clientRepo.create({
      name: name.trim() || 'Primary Contact',
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      status,
      lastContact: new Date().toISOString().split('T')[0],
      owner: 'Alex Morgan',
    })
    toast.success('Client account added')
    setCompany('')
    setName('')
    setEmail('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NEW CLIENT RECORD</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2 font-mono text-xs">
          <div className="space-y-1">
            <Label>Company Name *</Label>
            <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Apex Holdings Ltd" required />
          </div>
          <div className="space-y-1">
            <Label>Contact Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah Jenkins" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sarah@apex.com" />
            </div>
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-1111" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Create Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function MeetingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { meetingRepo, projects, clients } = useDataContext()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('11:00 AM')
  const [provider, setProvider] = useState<'ZOOM' | 'MEET' | 'TEAMS' | 'IN_PERSON'>('ZOOM')
  const [joinLink, setJoinLink] = useState('')
  const [participants, setParticipants] = useState('Alex Morgan, Client')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    meetingRepo.create({
      title: title.trim(),
      date,
      time,
      durationMinutes: 45,
      provider,
      joinLink: joinLink.trim() || undefined,
      participants: participants.split(',').map(s => s.trim()).filter(Boolean),
    })
    toast.success('Meeting scheduled')
    setTitle('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NEW MEETING RECORD</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2 font-mono text-xs">
          <div className="space-y-1">
            <Label>Meeting Title *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Q4 Executive Planning" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Time</Label>
              <Input value={time} onChange={e => setTime(e.target.value)} placeholder="11:00 AM" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Provider</Label>
              <select value={provider} onChange={e => setProvider(e.target.value as any)} className="w-full h-9 border border-border bg-background px-2 font-mono text-xs rounded-none">
                <option value="ZOOM">ZOOM</option>
                <option value="MEET">GOOGLE MEET</option>
                <option value="TEAMS">MICROSOFT TEAMS</option>
                <option value="IN_PERSON">IN PERSON</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label>Video Join Link</Label>
              <Input value={joinLink} onChange={e => setJoinLink(e.target.value)} placeholder="https://zoom.us/..." />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Schedule Meeting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
