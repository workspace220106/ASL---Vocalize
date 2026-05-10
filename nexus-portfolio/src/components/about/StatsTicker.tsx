'use client';
import { motion } from 'framer-motion';

const stats = ["JEE 92.2%ile", "CGPA 8.71", "3 Production Apps", "4 Internships", "MHTCET 93.67%ile"];

export const StatsTicker = () => (
  <div className="w-full py-2 border-b border-cyan-500/30 bg-black/50 backdrop-blur-sm overflow-hidden">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...stats, ...stats].map((stat, i) => (
        <span key={i} className="mx-8 text-xs font-mono uppercase tracking-widest text-cyan-400/80">
          {stat}
        </span>
      ))}
    </motion.div>
  </div>
);
