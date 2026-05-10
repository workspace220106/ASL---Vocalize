'use client';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

export const CommandCard = ({ command, value }: { command: string; value: string }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    // Success feedback could be added here via a toast
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}
      onClick={copyToClipboard}
      className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center cursor-pointer group hover:bg-white/10 transition-all"
    >
      <span className="font-mono text-gray-300 text-sm">
        <span className="text-cyan-400 mr-2">$</span> {command}
      </span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 font-mono hidden sm:inline">{value}</span>
        <Copy size={14} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
      </div>
    </motion.div>
  );
};
