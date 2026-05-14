import React from 'react';
import { useStore } from '../../store/useStore';
import { WarRoom } from '../warroom/WarRoom';

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { mode, setMode } = useStore();

  return (
    <div className="relative min-h-screen w-full">
      {/* Mode Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-full p-1 gap-1">
          <button
            onClick={() => setMode('quant')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'quant'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
            }`}
          >
            QUANT
          </button>
          <button
            onClick={() => setMode('neural')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'neural'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
            }`}
          >
            NEURAL
          </button>
        </div>
      </div>

      {mode === 'quant' ? (
        <WarRoom />
      ) : (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Neural Interface
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              The Neural interface is currently in hibernation. Switch back to Quant mode to access the War Room command center.
            </p>
            <button
              onClick={() => setMode('quant')}
              className="mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all"
            >
              Enter War Room
            </button>
          </div>
        </div>
      )}

      {/* If we had other content for neural mode, we'd render it here via children */}
      {mode !== 'quant' && children}
    </div>
  );
};
