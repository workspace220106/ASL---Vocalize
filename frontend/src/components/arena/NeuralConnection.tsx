import React from 'react';
import { motion } from 'framer-motion';
import { AgentStatus } from '../../store/useStore';

interface NeuralConnectionProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  status: AgentStatus;
}

export const NeuralConnection: React.FC<NeuralConnectionProps> = ({ start, end, status }) => {
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

  const flowDuration = status === 'working' ? 0.8 : 2.5;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="coloredBlur" />
          </feMerge>
        </filter>
      </defs>

      {/* Base Connection Line */}
      <line
        x1={start.x + 48}
        y1={start.y + 48}
        x2={end.x + 48}
        y2={end.y + 48}
        stroke="rgba(34, 211, 238, 0.15)"
        strokeWidth="1"
      />

      {/* Animated Data Flow */}
      <motion.line
        x1={start.x + 48}
        y1={start.y + 48}
        x2={end.x + 48}
        y2={end.y + 48}
        stroke="rgba(34, 211, 238, 0.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`20 ${length - 20}`}
        filter="url(#glow)"
        animate={{
          strokeDashoffset: [0, -length],
        }}
        transition={{
          duration: flowDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );
};
