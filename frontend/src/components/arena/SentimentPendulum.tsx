import React from 'react';
import { motion } from 'framer-motion';

interface SentimentPendulumProps {
  sentiment: number; // -1 to 1
}

export const SentimentPendulum: React.FC<SentimentPendulumProps> = ({ sentiment }) => {
  // sentiment -1 (Bearish) -> -90deg (or 180)
  // sentiment 0 (Neutral) -> 0deg (center)
  // sentiment 1 (Bullish) -> 90deg
  // Let's use 0 as center, range -90 to 90.
  const rotation = sentiment * 90;

  const getColor = () => {
    if (sentiment < -0.2) return 'rgba(239, 68, 68, 0.8)'; // Red-500
    if (sentiment > 0.2) return 'rgba(34, 211, 238, 0.8)'; // Cyan-400
    return 'rgba(209, 213, 219, 0.8)'; // Gray-300
  };

  return (
    <div className="relative w-64 h-32 overflow-hidden">
      <svg width="256" height="128" viewBox="0 0 256 128" className="absolute bottom-0 left-0">
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Gauge Arc */}
        <path
          d="M 32 110 A 96 96 0 0 1 224 110"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Active Arc based on sentiment */}
        <motion.path
          d="M 32 110 A 96 96 0 0 1 224 110"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#neon-glow)"
          animate={{
            strokeDasharray: `${(sentiment + 1) * 50}% 100%`, // Approximation
            strokeDashoffset: sentiment < 0 ? 0 : 0, // Simplify
          }}
          // A better way for the arc would be to use a different path or a clip-path.
          // For a simple cinematic effect, we'll just animate the color and the needle.
          transition={{ duration: 0.5 }}
        />

        {/* Pivot Point */}
        <circle cx="128" cy="110" r="6" fill="#fff" filter="url(#neon-glow)" />

        {/* Needle */}
        <motion.line
          x1="128"
          y1="110"
          x2="128"
          y2="30"
          stroke={getColor()}
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#neon-glow)"
          animate={{ rotate: rotation }}
          style={{
            originX: '128px',
            originY: '110px',
            transformOrigin: '128px 110px'
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        />
      </svg>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
        Sentiment Gauge
      </div>
    </div>
  );
};
