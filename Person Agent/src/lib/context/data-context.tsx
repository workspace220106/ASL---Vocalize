import React, { createContext, useContext, useEffect, useState } from 'react'
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
} from '../types'
import {
  TaskRepository,
  ProjectRepository,
  ClientRepository,
  MeetingRepository,
  DocumentRepository,
  ResearchRepository,
  FinanceRepository,
  OperationsRepository,
  ActivityRepository,
  subscribeToDataChanges,
  resetDataToSeed,
} from '../repositories'
import { ItemDetailDrawer, type DrawerItem } from '@/components/drawers/ItemDetailDrawer'

interface DataContextValue {
  tasks: Task[]
  projects: Project[]
  clients: Client[]
  meetings: Meeting[]
  documents: DocumentItem[]
  research: ResearchNote[]
  financePositions: FinancePortfolioPosition[]
  financeTransactions: FinanceTransaction[]
  financeWatchlist: FinanceWatchlistItem[]
  financeMarketNotes: FinanceMarketNote[]
  operationalProcesses: OperationalProcess[]
  operationalActions: OperationalAction[]
  activities: ActivityItem[]
  
  // Slide-over detail drawer state
  selectedItem: DrawerItem | null
  setSelectedItem: (item: DrawerItem | null) => void
  
  // Repositories
  taskRepo: typeof TaskRepository
  projectRepo: typeof ProjectRepository
  clientRepo: typeof ClientRepository
  meetingRepo: typeof MeetingRepository
  documentRepo: typeof DocumentRepository
  researchRepo: typeof ResearchRepository
  financeRepo: typeof FinanceRepository
  operationsRepo: typeof OperationsRepository
  activityRepo: typeof ActivityRepository
  
  resetData: () => void
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(0)
  const [selectedItem, setSelectedItem] = useState<DrawerItem | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      setVersion(v => v + 1)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const value: DataContextValue = {
    // Force re-read on version change
    tasks: TaskRepository.getAll(),
    projects: ProjectRepository.getAll(),
    clients: ClientRepository.getAll(),
    meetings: MeetingRepository.getAll(),
    documents: DocumentRepository.getAll(),
    research: ResearchRepository.getAll(),
    financePositions: FinanceRepository.getPositions(),
    financeTransactions: FinanceRepository.getTransactions(),
    financeWatchlist: FinanceRepository.getWatchlist(),
    financeMarketNotes: FinanceRepository.getMarketNotes(),
    operationalProcesses: OperationsRepository.getProcesses(),
    operationalActions: OperationsRepository.getActions(),
    activities: ActivityRepository.getAll(),
    
    selectedItem,
    setSelectedItem,
    
    taskRepo: TaskRepository,
    projectRepo: ProjectRepository,
    clientRepo: ClientRepository,
    meetingRepo: MeetingRepository,
    documentRepo: DocumentRepository,
    researchRepo: ResearchRepository,
    financeRepo: FinanceRepository,
    operationsRepo: OperationsRepository,
    activityRepo: ActivityRepository,
    
    resetData: resetDataToSeed,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
      <ItemDetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />
    </DataContext.Provider>
  )
}

export function useDataContext(): DataContextValue {
  const ctx = useContext(DataContext)
  if (!ctx) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return ctx
}
