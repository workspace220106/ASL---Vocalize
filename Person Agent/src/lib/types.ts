export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'WAITING' | 'DONE' | 'ARCHIVED'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  projectId?: string
  clientId?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED'
export type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface Milestone {
  id: string
  title: string
  dueDate: string
  completed: boolean
}

export interface Project {
  id: string
  name: string
  objective: string
  description?: string
  owner: string
  status: ProjectStatus
  priority: ProjectPriority
  deadline?: string
  milestones: Milestone[]
  createdAt: string
  updatedAt: string
}

export type ClientStatus = 'LEAD' | 'ACTIVE' | 'WAITING' | 'INACTIVE' | 'COMPLETED'

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: ClientStatus
  lastContact: string
  nextFollowUp?: string
  owner: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  durationMinutes: number
  participants: string[]
  projectId?: string
  clientId?: string
  provider: 'ZOOM' | 'MEET' | 'TEAMS' | 'IN_PERSON'
  joinLink?: string
  notes?: string
  followUpDate?: string
  createdAt: string
  updatedAt: string
}

export type DocumentStatus = 'DRAFT' | 'REVIEW' | 'FINAL'

export interface DocumentItem {
  id: string
  filename: string
  fileType: string
  sizeBytes: number
  projectId?: string
  clientId?: string
  uploadDate: string
  status: DocumentStatus
  tags: string[]
}

export interface ResearchNote {
  id: string
  topic: string
  title: string
  notes: string
  sources: string[]
  references: string[]
  projectId?: string
  createdAt: string
  updatedAt: string
}

export interface FinancePortfolioPosition {
  id: string
  asset: string
  symbol: string
  allocationPct: number
  positionValueUSD: number
  change24hPct: number
}

export interface FinanceMarketNote {
  id: string
  title: string
  category: string
  sentiment: 'BULLISH' | 'NEUTRAL' | 'BEARISH'
  content: string
  date: string
}

export interface FinanceTransaction {
  id: string
  date: string
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BUY' | 'SELL'
  description: string
  amountUSD: number
  status: 'PENDING' | 'SETTLED'
}

export interface FinanceWatchlistItem {
  id: string
  symbol: string
  name: string
  targetPriceUSD: number
  currentPriceUSD: number
}

export interface OperationalProcess {
  id: string
  title: string
  category: string
  owner: string
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ON_DEMAND'
  status: 'OPTIMAL' | 'NEEDS_REVIEW' | 'BLOCKED'
  lastRunDate: string
}

export interface OperationalAction {
  id: string
  processId: string
  title: string
  assignee: string
  dueDate: string
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}

export interface ActivityItem {
  id: string
  time: string
  action: string
  details: string
  type: 'TASK' | 'PROJECT' | 'CLIENT' | 'MEETING' | 'DOCUMENT' | 'RESEARCH' | 'SYSTEM'
}

export interface AppSettings {
  userName: string
  userEmail: string
  appearance: 'DARK' | 'LIGHT' | 'SYSTEM'
  compactMode: boolean
  notificationsEnabled: boolean
}
