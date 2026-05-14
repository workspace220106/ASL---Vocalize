import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { WarRoom } from '../warroom/WarRoom';
import { AgentArena } from '../arena/AgentArena';

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { mode, setMode } = useStore();

  return (
    <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden">
      {/* Mode Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-full p-1 gap-1 shadow-2xl">
          <button
            onClick={() => setMode('quant')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              mode === 'quant'
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            QUANT
          </button>
          <button
            onClick={() => setMode('neural')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              mode === 'neural'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            NEURAL
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'quant' ? (
          <motion.div
            key="quant-mode"
            initial={{ opacity: 0, x: -20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-screen"
          >
            <WarRoom />
          </motion.div>
        ) : (
          <motion.div
            key="neural-mode"
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full h-screen"
          >
            <AgentArena />
          </motion.div>
        )}
      </AnimatePresence>

      {mode !== 'quant' && children}
    </div>
  );
};
