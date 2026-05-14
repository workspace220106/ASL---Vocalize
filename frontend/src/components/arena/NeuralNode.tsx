import React from 'react';
import { motion } from 'framer-motion';
import { AgentStatus } from '../../store/useStore';

interface NeuralNodeProps {
  id: string;
  name: string;
  status: AgentStatus;
  x: number;
  y: number;
}

const statusColors = {
  idle: 'rgba(34, 211, 238, 0.5)', // cyan-400
  working: 'rgba(168, 85, 247, 0.8)', // purple-500
  done: 'rgba(34, 197, 94, 0.7)', // green-500
};

const statusGlows = {
  idle: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
  working: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]',
  done: 'shadow-[0_0_25px_rgba(34,197,94,0.5)]',
};

export const NeuralNode: React.FC<NeuralNodeProps> = ({ name, status, x, y }) => {
  return (
    <motion.div
      style={{
        left: x,
        top: y,
        position: 'absolute',
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`
        w-24 h-24 rounded-full flex items-center justify-center
        text-xs font-bold text-white uppercase tracking-widest
        border-2 transition-colors duration-500
        ${statusGlows[status]}
        bg-obsidian/80 backdrop-blur-sm
      `}
      style={{
        borderColor: statusColors[status],
        boxShadow: `0 0 15px ${statusColors[status]}`,
      }}
    >
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-center px-2"
      >
        {name}
      </motion.div>
    </motion.div>
  );
};
