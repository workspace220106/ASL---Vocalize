import { create } from 'zustand';

export type TradingMode = 'quant' | 'neural';
export type AgentStatus = 'idle' | 'working' | 'done';

interface TradingState {
  mode: TradingMode;
  currentTicker: string;
  agentStatus: Record<string, AgentStatus>;
  sentiment: number;
  logs: string[];

  setMode: (mode: TradingMode) => void;
  setTicker: (ticker: string) => void;
  updateAgentStatus: (agentId: string, status: AgentStatus) => void;
  updateSentiment: (sentiment: number) => void;
  addLog: (log: string) => void;
}

export const useStore = create<TradingState>((set) => ({
  mode: 'quant',
  currentTicker: 'BTCUSDT',
  agentStatus: {},
  sentiment: 0,
  logs: [],

  setMode: (mode) => set({ mode }),
  setTicker: (ticker) => set({ currentTicker: ticker }),
  updateAgentStatus: (agentId, status) =>
    set((state) => ({
      agentStatus: { ...state.agentStatus, [agentId]: status }
    })),
  updateSentiment: (sentiment) => set({ sentiment }),
  addLog: (log) => set((state) => ({
    logs: [...state.logs, log]
  })),
}));
