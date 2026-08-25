import { createFileRoute } from '@tanstack/react-router'
import { useDataContext } from '@/lib/context/data-context'
import { DollarSign, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/app/finance' as any)({
  component: FinancePage,
})

function FinancePage() {
  const { financePositions, financeTransactions, financeWatchlist, financeMarketNotes } = useDataContext()

  const totalPortfolioUSD = financePositions.reduce((acc, p) => acc + p.positionValueUSD, 0)

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <span>BUSINESS & CAPITAL OPERATIONS</span>
          <span>·</span>
          <span>PORTFOLIO VALUE: ${totalPortfolioUSD.toLocaleString()}</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mt-0.5 flex items-center gap-2">
          <DollarSign className="size-6" /> Finance Workspace
        </h1>
      </div>

      {/* PORTFOLIO POSITIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {financePositions.map(pos => (
          <div key={pos.id} className="border border-border bg-card p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{pos.symbol}</span>
              <span className="font-bold text-foreground">{pos.allocationPct}%</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground">{pos.asset}</h3>
            <div className="text-xl font-bold text-foreground">
              ${pos.positionValueUSD.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-500 font-bold">
              +{pos.change24hPct}% (24h yield)
            </p>
          </div>
        ))}
      </div>

      {/* TWO-COLUMN TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* TRANSACTIONS */}
        <div className="space-y-3">
          <h2 className="font-serif text-lg font-bold uppercase border-b border-border pb-2">
            Recent Capital Transactions
          </h2>
          <div className="border border-border bg-card divide-y divide-border">
            {financeTransactions.map(trx => (
              <div key={trx.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{trx.description}</p>
                  <p className="text-[10px] text-muted-foreground">{trx.date} · {trx.type}</p>
                </div>
                <span className="font-bold text-foreground">${trx.amountUSD.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WATCHLIST */}
        <div className="space-y-3">
          <h2 className="font-serif text-lg font-bold uppercase border-b border-border pb-2">
            Asset Watchlist & Targets
          </h2>
          <div className="border border-border bg-card divide-y divide-border">
            {financeWatchlist.map(item => (
              <div key={item.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{item.symbol} — {item.name}</p>
                  <p className="text-[10px] text-muted-foreground">Target: ${item.targetPriceUSD}</p>
                </div>
                <span className="font-bold text-foreground">${item.currentPriceUSD}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
