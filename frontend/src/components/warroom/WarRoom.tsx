import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '../shared/GlassPanel';
import { TradingChart } from './TradingChart';
import { useStore } from '../../store/useStore';
import { useWebSocket } from '../../hooks/useWebSocket';

export const WarRoom: React.FC = () => {
  const { currentTicker, sentiment, logs } = useStore();
  const { sendTicker } = useWebSocket();
  const [inputTicker, setInputTicker] = useState(currentTicker);

  const hudItems = [
    { label: 'P&L', value: '+$12,450.00', color: 'text-green-400' },
    { label: 'Account Health', value: '98.2%', color: 'text-blue-400' },
    { label: 'Agent Status', value: 'Active', color: 'text-purple-400' },
    { label: 'Market Sentiment', value: `${(sentiment * 100).toFixed(2)}%`, color: 'text-yellow-400' },
  ];

  const orderBookData = [
    { price: '66850.00', size: '0.12', type: 'ask', color: 'text-red-400' },
    { price: '66845.00', size: '0.45', type: 'ask', color: 'text-red-400' },
    { price: '66840.00', size: '1.20', type: 'ask', color: 'text-red-400' },
    { price: '66835.00', size: '0.05', type: 'bid', color: 'text-green-400' },
    { price: '66830.00', size: '0.88', type: 'bid', color: 'text-green-400' },
    { price: '66825.00', size: '2.10', type: 'bid', color: 'text-green-400' },
  ];

  const positions = [
    { symbol: 'BTCUSDT', size: '0.5 Lot', entry: '64200', pnl: '+$1,200', status: 'Long' },
    { symbol: 'ETHUSDT', size: '10 Lot', entry: '3450', pnl: '+$450', status: 'Long' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-mono">
      {/* Top HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {hudItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <GlassPanel className="flex flex-col items-center justify-center">
              <span className="text-xs uppercase text-slate-400 mb-1">{item.label}</span>
              <span className={`text-xl font-bold ${item.color}`}>{item.value}</span>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Center Chart Area */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
          <GlassPanel className="flex-1 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-lg">{currentTicker} / USDT</span>
            </div>
            <TradingChart />
          </GlassPanel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/3">
            {/* Live Order Book */}
            <GlassPanel className="overflow-auto">
              <h3 className="text-sm uppercase text-slate-400 mb-3 border-b border-white/10 pb-2">Live Order Book</h3>
              <div className="grid grid-cols-3 text-xs gap-y-1">
                <div className="text-slate-500">Price</div>
                <div className="text-slate-500 text-right">Size</div>
                <div className="text-slate-500 text-right">Type</div>
                {orderBookData.map((order, i) => (
                  <React.Fragment key={i}>
                    <div className="font-medium">{order.price}</div>
                    <div className="text-right">{order.size}</div>
                    <div className={`text-right ${order.color}`}>{order.type.toUpperCase()}</div>
                  </React.Fragment>
                ))}
              </div>
            </GlassPanel>

            {/* Position Manager */}
            <GlassPanel className="overflow-auto">
              <h3 className="text-sm uppercase text-slate-400 mb-3 border-b border-white/10 pb-2">Position Manager</h3>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-500">
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">Size</th>
                    <th className="pb-2">Entry</th>
                    <th className="pb-2 text-right">P&L</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="py-2 font-medium">{pos.symbol}</td>
                      <td className="py-2">{pos.size}</td>
                      <td className="py-2">{pos.entry}</td>
                      <td className="py-2 text-right text-green-400">{pos.pnl}</td>
                      <td className="py-2 text-right">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px]">
                          {pos.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassPanel>
          </div>
        </div>

        {/* Right Side Command Panel */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <GlassPanel className="flex flex-col gap-4">
            <h3 className="text-sm uppercase text-slate-400 mb-2">Command Center</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Asset Ticker</label>
                <input
                  type="text"
                  value={inputTicker}
                  onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Agent Strategy</label>
                <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors">
                  <option className="bg-slate-900">Arbitrage Alpha</option>
                  <option className="bg-slate-900">Neural Trend Follower</option>
                  <option className="bg-slate-900">Quant Mean Reversion</option>
                </select>
              </div>
              <button
                onClick={() => sendTicker(inputTicker)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors text-sm uppercase tracking-wider"
              >
                Execute Analysis
              </button>
            </div>
          </GlassPanel>

          <GlassPanel className="flex-1 overflow-hidden flex flex-col">
            <h3 className="text-sm uppercase text-slate-400 mb-2">Agent Neural Logs</h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-2">Waiting for neural signals...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="text-[10px] font-mono p-2 bg-white/5 rounded border-l-2 border-white/20">
                    <span className="text-slate-500 mr-2">{new Date().toLocaleTimeString()}</span>
                    <span className="text-slate-300">
                      {log}
                    </span>
                  </div>
                ))
              )}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};
