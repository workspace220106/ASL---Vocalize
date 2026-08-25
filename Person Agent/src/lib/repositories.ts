import type {
  Task,
  Project,
  Client,
  Meeting,
  DocumentItem,
  ResearchNote,
  FinancePortfolioPosition,
  FinanceMarketNote,
  FinanceTransaction,
  FinanceWatchlistItem,
  OperationalProcess,
  OperationalAction,
  ActivityItem,
  AppSettings,
} from './types'

// Event listener mechanism for reactive state updates
type Listener = () => void
const listeners: Set<Listener> = new Set()

export function subscribeToDataChanges(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notifyChange() {
  listeners.forEach(fn => fn())
}

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(`agentflow_${key}`)
    return item ? JSON.parse(item) : defaultValue
  } catch (err) {
    console.error(`Failed to read ${key} from storage:`, err)
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`agentflow_${key}`, JSON.stringify(value))
    notifyChange()
  } catch (err) {
    console.error(`Failed to write ${key} to storage:`, err)
  }
}

const todayStr = new Date().toISOString().split('T')[0]

// ── INITIAL SEED DATA ──────────────────────────────────────────────────────────
const SEED_TASKS: Task[] = [
  {
    id: 'TSK-101',
    title: 'Review Q3 Executive Capital Allocation Plan',
    description: 'Finalize internal budget distribution across engineering and market expansion initiatives.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    dueDate: todayStr,
    projectId: 'PRJ-01',
    tags: ['Finance', 'Strategy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'TSK-102',
    title: 'Audit Decoupled Repository Pattern Interfaces',
    description: 'Verify storage isolation layer to ensure seamless transition to backend services.',
    status: 'TODO',
    priority: 'HIGH',
    dueDate: todayStr,
    projectId: 'PRJ-02',
    tags: ['Architecture', 'Refactoring'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'TSK-103',
    title: 'Prepare Client Briefing for Apex Holdings',
    description: 'Compile roadmap updates, contract terms, and operational deliverables.',
    status: 'TODO',
    priority: 'HIGH',
    dueDate: todayStr,
    clientId: 'CLT-01',
    tags: ['Client', 'Briefing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'TSK-104',
    title: 'Benchmark Zero-Copy IPC Transport Latency',
    description: 'Evaluate high-performance binary serialization performance over domain sockets.',
    status: 'DONE',
    priority: 'MEDIUM',
    dueDate: '2026-08-24',
    projectId: 'PRJ-02',
    tags: ['Research', 'Performance'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'TSK-105',
    title: 'Update Company Operational SOP Documentation',
    description: 'Document standard procedures for quarterly security access reviews.',
    status: 'WAITING',
    priority: 'LOW',
    dueDate: '2026-08-30',
    tags: ['Ops', 'Documentation'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const SEED_PROJECTS: Project[] = [
  {
    id: 'PRJ-01',
    name: 'AgentFlow Operating Dashboard v1.0',
    objective: 'Deliver an exceptionally clean, reliable, black-and-white executive command center with 0-radius components.',
    description: 'Core dashboard covering tasks, projects, clients, finance, documents, research, and operations.',
    owner: 'Alex Morgan',
    status: 'ACTIVE',
    priority: 'CRITICAL',
    deadline: '2026-09-15',
    milestones: [
      { id: 'M1', title: 'Decoupled Storage & Repositories', dueDate: '2026-08-25', completed: true },
      { id: 'M2', title: 'Brutalist Black/White Design System', dueDate: '2026-08-28', completed: true },
      { id: 'M3', title: 'Slide-Over Detail Drawers & Saved Views', dueDate: '2026-09-05', completed: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'PRJ-02',
    name: 'Distributed Low-Latency Engine Core',
    objective: 'Optimize data processing pipelines to achieve sub-millisecond execution benchmarks.',
    description: 'High-throughput event stream processing engine.',
    owner: 'David Chen',
    status: 'PLANNING',
    priority: 'HIGH',
    deadline: '2026-10-30',
    milestones: [
      { id: 'M1', title: 'Architecture Specification', dueDate: '2026-09-01', completed: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const SEED_CLIENTS: Client[] = [
  {
    id: 'CLT-01',
    name: 'Sarah Jenkins',
    company: 'Apex Holdings Group',
    email: 'sarah.j@apexholdings.io',
    phone: '+1 (555) 019-2834',
    status: 'ACTIVE',
    lastContact: '2026-08-20',
    nextFollowUp: todayStr,
    owner: 'Alex Morgan',
    notes: 'Key enterprise account. Focus on Q4 infrastructure contract expansion.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'CLT-02',
    name: 'Marcus Vance',
    company: 'Vance Capital Corp',
    email: 'mvance@vancecap.com',
    phone: '+1 (555) 014-9921',
    status: 'LEAD',
    lastContact: '2026-08-22',
    nextFollowUp: '2026-08-29',
    owner: 'Elena Rostova',
    notes: 'Interested in company operations & financial analysis workspace modules.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const SEED_MEETINGS: Meeting[] = [
  {
    id: 'MTG-01',
    title: 'Executive Operations & Planning Sync',
    date: todayStr,
    time: '10:00 AM',
    durationMinutes: 45,
    participants: ['Alex Morgan', 'David Chen', 'Elena Rostova'],
    projectId: 'PRJ-01',
    provider: 'ZOOM',
    joinLink: 'https://zoom.us/j/98237492837',
    notes: 'Review milestone progress, task execution queue, and infrastructure strategy.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'MTG-02',
    title: 'Apex Holdings Roadmapping Briefing',
    date: todayStr,
    time: '02:30 PM',
    durationMinutes: 60,
    participants: ['Alex Morgan', 'Sarah Jenkins'],
    clientId: 'CLT-01',
    provider: 'MEET',
    joinLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Present executive dashboard deliverables and Q4 roadmap.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const SEED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'DOC-01',
    filename: 'AgentFlow_Architecture_Spec_v1.pdf',
    fileType: 'PDF',
    sizeBytes: 2450000,
    projectId: 'PRJ-01',
    uploadDate: '2026-08-20',
    status: 'FINAL',
    tags: ['Architecture', 'Specification'],
  },
  {
    id: 'DOC-02',
    filename: 'Apex_Holdings_Enterprise_Agreement.pdf',
    fileType: 'PDF',
    sizeBytes: 1820000,
    clientId: 'CLT-01',
    uploadDate: '2026-08-22',
    status: 'REVIEW',
    tags: ['Legal', 'Contract'],
  },
]

const SEED_RESEARCH: ResearchNote[] = [
  {
    id: 'RES-01',
    topic: 'System Performance',
    title: 'Zero-Copy Data Transport & Binary Serialization Benchmarks',
    notes: 'Analysis of flatbuffer vs protobuf serialization overhead in high-frequency event streaming. Zero-copy IPC shows 4.2x latency reduction.',
    sources: ['https://arxiv.org/abs/2301.00000', 'https://github.com/google/flatbuffers'],
    references: ['DOC-01'],
    projectId: 'PRJ-02',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const SEED_FINANCE_POSITIONS: FinancePortfolioPosition[] = [
  { id: 'FIN-P1', asset: 'Treasury Bills (0-3 Month)', symbol: 'TBIL', allocationPct: 45.0, positionValueUSD: 450000, change24hPct: +0.02 },
  { id: 'FIN-P2', asset: 'S&P 500 Index Fund', symbol: 'VOO', allocationPct: 35.0, positionValueUSD: 350000, change24hPct: +0.65 },
  { id: 'FIN-P3', asset: 'Enterprise Cash Reserves', symbol: 'USD', allocationPct: 20.0, positionValueUSD: 200000, change24hPct: 0.00 },
]

const SEED_FINANCE_TRANSACTIONS: FinanceTransaction[] = [
  { id: 'TRX-101', date: '2026-08-24', type: 'DEPOSIT', description: 'Enterprise Capital Injection', amountUSD: 100000, status: 'SETTLED' },
  { id: 'TRX-102', date: '2026-08-22', type: 'BUY', description: 'TBIL Allocation Purchase', amountUSD: 50000, status: 'SETTLED' },
]

const SEED_FINANCE_WATCHLIST: FinanceWatchlistItem[] = [
  { id: 'WCH-01', symbol: 'NVDA', name: 'NVIDIA Corp', targetPriceUSD: 120.0, currentPriceUSD: 128.5 },
  { id: 'WCH-02', symbol: 'MSFT', name: 'Microsoft Corp', targetPriceUSD: 410.0, currentPriceUSD: 422.1 },
]

const SEED_FINANCE_NOTES: FinanceMarketNote[] = [
  { id: 'FMN-01', title: 'Q3 Federal Reserve Interest Rate Stance', category: 'Macroeconomics', sentiment: 'NEUTRAL', date: '2026-08-24', content: 'Yield curve stabilization expected across short-duration debt instruments.' },
]

const SEED_OPERATIONS_PROCESSES: OperationalProcess[] = [
  { id: 'OPS-P1', title: 'Weekly Executive Status Review', category: 'Governance', owner: 'Alex Morgan', frequency: 'WEEKLY', status: 'OPTIMAL', lastRunDate: '2026-08-24' },
  { id: 'OPS-P2', title: 'Quarterly Security Access Audit', category: 'Security', owner: 'David Chen', frequency: 'MONTHLY', status: 'NEEDS_REVIEW', lastRunDate: '2026-08-01' },
]

const SEED_OPERATIONS_ACTIONS: OperationalAction[] = [
  { id: 'ACT-01', processId: 'OPS-P2', title: 'Revoke inactive API tokens across production clusters', assignee: 'David Chen', dueDate: todayStr, status: 'PENDING' },
]

const SEED_ACTIVITIES: ActivityItem[] = [
  { id: 'ACT-101', time: '10:14 AM', action: 'Task Status Updated', details: 'Marked "Benchmark Zero-Copy IPC Transport" as DONE', type: 'TASK' },
  { id: 'MTG-102', time: '09:30 AM', action: 'Meeting Created', details: 'Scheduled "Apex Holdings Roadmapping Briefing" for 02:30 PM', type: 'MEETING' },
  { id: 'PRJ-103', time: 'Yesterday', action: 'Project Milestone Added', details: 'Added milestone "Decoupled Storage & Repositories" to PRJ-01', type: 'PROJECT' },
]

const DEFAULT_SETTINGS: AppSettings = {
  userName: 'Alex Morgan',
  userEmail: 'alex.morgan@agentflow.io',
  appearance: 'DARK',
  compactMode: false,
  notificationsEnabled: true,
}

// ── REPOSITORY EXPORTS ─────────────────────────────────────────────────────────

export const TaskRepository = {
  getAll(): Task[] {
    return getItem<Task[]>('tasks', SEED_TASKS)
  },
  getById(id: string): Task | undefined {
    return this.getAll().find(t => t.id === id)
  },
  create(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getAll()
    const newTask: Task = {
      ...data,
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setItem('tasks', [newTask, ...tasks])
    ActivityRepository.add('Task Created', `Created task "${newTask.title}"`, 'TASK')
    return newTask
  },
  update(id: string, updates: Partial<Task>): Task | undefined {
    const tasks = this.getAll()
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) return undefined
    const updated = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() }
    tasks[index] = updated
    setItem('tasks', [...tasks])
    if (updates.status) {
      ActivityRepository.add('Task Status Updated', `Updated "${updated.title}" status to ${updates.status}`, 'TASK')
    }
    return updated
  },
  delete(id: string): boolean {
    const tasks = this.getAll()
    const filtered = tasks.filter(t => t.id !== id)
    if (filtered.length === tasks.length) return false
    setItem('tasks', filtered)
    ActivityRepository.add('Task Deleted', `Deleted task ${id}`, 'TASK')
    return true
  },
}

export const ProjectRepository = {
  getAll(): Project[] {
    return getItem<Project[]>('projects', SEED_PROJECTS)
  },
  create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const items = this.getAll()
    const newItem: Project = {
      ...data,
      id: `PRJ-${String(items.length + 1).padStart(2, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setItem('projects', [newItem, ...items])
    ActivityRepository.add('Project Created', `Created project "${newItem.name}"`, 'PROJECT')
    return newItem
  },
  update(id: string, updates: Partial<Project>): Project | undefined {
    const items = this.getAll()
    const idx = items.findIndex(p => p.id === id)
    if (idx === -1) return undefined
    items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() }
    setItem('projects', [...items])
    return items[idx]
  },
  delete(id: string): boolean {
    const items = this.getAll()
    const filtered = items.filter(p => p.id !== id)
    if (filtered.length === items.length) return false
    setItem('projects', filtered)
    ActivityRepository.add('Project Deleted', `Deleted project ${id}`, 'PROJECT')
    return true
  },
}

export const ClientRepository = {
  getAll(): Client[] {
    return getItem<Client[]>('clients', SEED_CLIENTS)
  },
  create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
    const items = this.getAll()
    const newItem: Client = {
      ...data,
      id: `CLT-${String(items.length + 1).padStart(2, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setItem('clients', [newItem, ...items])
    ActivityRepository.add('Client Added', `Added client "${newItem.name}" (${newItem.company})`, 'CLIENT')
    return newItem
  },
  delete(id: string): boolean {
    const items = this.getAll()
    const filtered = items.filter(c => c.id !== id)
    if (filtered.length === items.length) return false
    setItem('clients', filtered)
    return true
  },
}

export const MeetingRepository = {
  getAll(): Meeting[] {
    return getItem<Meeting[]>('meetings', SEED_MEETINGS)
  },
  create(data: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>): Meeting {
    const items = this.getAll()
    const newItem: Meeting = {
      ...data,
      id: `MTG-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setItem('meetings', [newItem, ...items])
    ActivityRepository.add('Meeting Scheduled', `Scheduled "${newItem.title}" at ${newItem.time}`, 'MEETING')
    return newItem
  },
  delete(id: string): boolean {
    const items = this.getAll()
    const filtered = items.filter(m => m.id !== id)
    if (filtered.length === items.length) return false
    setItem('meetings', filtered)
    return true
  },
}

export const DocumentRepository = {
  getAll(): DocumentItem[] {
    return getItem<DocumentItem[]>('documents', SEED_DOCUMENTS)
  },
  create(data: Omit<DocumentItem, 'id' | 'uploadDate'>): DocumentItem {
    const items = this.getAll()
    const newItem: DocumentItem = {
      ...data,
      id: `DOC-${String(items.length + 1).padStart(2, '0')}`,
      uploadDate: todayStr,
    }
    setItem('documents', [newItem, ...items])
    ActivityRepository.add('Document Uploaded', `Uploaded "${newItem.filename}"`, 'DOCUMENT')
    return newItem
  },
  delete(id: string): boolean {
    const items = this.getAll()
    const filtered = items.filter(d => d.id !== id)
    if (filtered.length === items.length) return false
    setItem('documents', filtered)
    return true
  },
}

export const ResearchRepository = {
  getAll(): ResearchNote[] {
    return getItem<ResearchNote[]>('research', SEED_RESEARCH)
  },
  create(data: Omit<ResearchNote, 'id' | 'createdAt' | 'updatedAt'>): ResearchNote {
    const items = this.getAll()
    const newItem: ResearchNote = {
      ...data,
      id: `RES-${String(items.length + 1).padStart(2, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setItem('research', [newItem, ...items])
    ActivityRepository.add('Research Saved', `Saved research note "${newItem.title}"`, 'RESEARCH')
    return newItem
  },
  delete(id: string): boolean {
    const items = this.getAll()
    const filtered = items.filter(r => r.id !== id)
    if (filtered.length === items.length) return false
    setItem('research', filtered)
    return true
  },
}

export const FinanceRepository = {
  getPositions(): FinancePortfolioPosition[] {
    return getItem<FinancePortfolioPosition[]>('finance_positions', SEED_FINANCE_POSITIONS)
  },
  getTransactions(): FinanceTransaction[] {
    return getItem<FinanceTransaction[]>('finance_transactions', SEED_FINANCE_TRANSACTIONS)
  },
  getWatchlist(): FinanceWatchlistItem[] {
    return getItem<FinanceWatchlistItem[]>('finance_watchlist', SEED_FINANCE_WATCHLIST)
  },
  getMarketNotes(): FinanceMarketNote[] {
    return getItem<FinanceMarketNote[]>('finance_notes', SEED_FINANCE_NOTES)
  },
}

export const OperationsRepository = {
  getProcesses(): OperationalProcess[] {
    return getItem<OperationalProcess[]>('ops_processes', SEED_OPERATIONS_PROCESSES)
  },
  getActions(): OperationalAction[] {
    return getItem<OperationalAction[]>('ops_actions', SEED_OPERATIONS_ACTIONS)
  },
}

export const ActivityRepository = {
  getAll(): ActivityItem[] {
    return getItem<ActivityItem[]>('activities', SEED_ACTIVITIES)
  },
  add(action: string, details: string, type: ActivityItem['type']): void {
    const items = this.getAll()
    const newItem: ActivityItem = {
      id: `ACT-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action,
      details,
      type,
    }
    setItem('activities', [newItem, ...items])
  },
}

export const SettingsRepository = {
  get(): AppSettings {
    return getItem<AppSettings>('settings', DEFAULT_SETTINGS)
  },
  update(updates: Partial<AppSettings>): AppSettings {
    const current = this.get()
    const updated = { ...current, ...updates }
    setItem('settings', updated)
    return updated
  },
}

export function resetDataToSeed() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('agentflow_tasks')
  localStorage.removeItem('agentflow_projects')
  localStorage.removeItem('agentflow_clients')
  localStorage.removeItem('agentflow_meetings')
  localStorage.removeItem('agentflow_documents')
  localStorage.removeItem('agentflow_research')
  localStorage.removeItem('agentflow_finance_positions')
  localStorage.removeItem('agentflow_finance_transactions')
  localStorage.removeItem('agentflow_finance_watchlist')
  localStorage.removeItem('agentflow_finance_notes')
  localStorage.removeItem('agentflow_ops_processes')
  localStorage.removeItem('agentflow_ops_actions')
  localStorage.removeItem('agentflow_activities')
  localStorage.removeItem('agentflow_settings')
  notifyChange()
}
