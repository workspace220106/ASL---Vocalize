import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { NeuralNode } from './NeuralNode';
import { NeuralConnection } from './NeuralConnection';
import { SentimentPendulum } from './SentimentPendulum';

const AGENTS = [
  { id: 'analyst', name: 'Analyst', x: 400, y: 300 },
  { id: 'bull', name: 'Bull Agent', x: 600, y: 200 },
  { id: 'bear', name: 'Bear Agent', x: 200, y: 200 },
  { id: 'risk', name: 'Risk Mgr', x: 400, y: 500 },
  { id: 'sentiment', name: 'Sent. Engine', x: 400, y: 100 },
];

const CONNECTIONS = [
  { from: 'sentiment', to: 'analyst' },
  { from: 'analyst', to: 'bull' },
  { from: 'analyst', to: 'bear' },
  { from: 'analyst', to: 'risk' },
  { from: 'risk', to: 'analyst' },
];

export const AgentArena: React.FC = () => {
  const { agentStatus, sentiment, mode } = useStore();

  if (mode !== 'neural') return null;

  const getAgentColor = () => {
    return sentiment > 0 ? 'rgba(34, 211, 238, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  };

  return (
    <motion.div
      initial={{ scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="relative w-full h-screen bg-obsidian overflow-hidden cursor-crosshair"
      style={{
        backgroundColor: '#020617', // Deep obsidian
      }}
    >
      {/* Dynamic Background Glow */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${getAgentColor()} 0%, transparent 70%)`
        }}
      />

      {/* Depth of Field Elements - Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          initial={{
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            opacity: Math.random()
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Connections Layer */}
      <div className="absolute inset-0">
        {CONNECTIONS.map(({ from, to }) => {
          const startNode = AGENTS.find(a => a.id === from)!;
          const endNode = AGENTS.find(a => a.id === to)!;
          return (
            <NeuralConnection
              key={`${from}-${to}`}
              start={{ x: startNode.x, y: startNode.y }}
              end={{ x: endNode.x, y: endNode.y }}
              status={agentStatus[from] || 'idle'}
            />
          );
        })}
      </div>

      {/* Nodes Layer */}
      <div className="absolute inset-0">
        {AGENTS.map(agent => (
          <NeuralNode
            key={agent.id}
            id={agent.id}
            name={agent.name}
            x={agent.x}
            y={agent.y}
            status={agentStatus[agent.id] || 'idle'}
          />
        ))}
      </div>

      {/* UI Overlay: Sentiment Pendulum */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <SentimentPendulum sentiment={sentiment} />
      </div>

      {/* Vignette for Cinematic Look */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </motion.div>
  );
};
