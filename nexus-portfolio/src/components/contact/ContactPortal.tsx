'use client';
import React, { useState } from 'react';
import { CommandCard } from './CommandCard';
import { NebulaBackground } from './NebulaBackground';
import { motion } from 'framer-motion';

export const ContactPortal = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <section className="relative min-h-screen py-24 px-6 lg:px-24 overflow-hidden bg-black">
      <NebulaBackground />

      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          The next breakthrough <br className="hidden lg:block" /> starts with a conversation.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto"
        >
          Whether it's an AI/ML integration, a complex full-stack engineering challenge, or a visionary idea — let's build it together.
        </motion.p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Available for internships & collaborations
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10">
        {/* Command Center */}
        <div className="space-y-4">
          <h3 className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-6">Direct Access</h3>
          <CommandCard command="open github" value="github.com/workspace220106" />
          <CommandCard command="open linkedin" value="linkedin.com/in/rajiv-agarwal-108b5a309" />
          <CommandCard command="mailto" value="workspace220106@gmail.com" />
          <CommandCard command="download resume" value="Rajiv_Agarwal_Resume.pdf" />
        </div>

        {/* Intake Form */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <input
                required
                className="w-full p-3 bg-transparent border-b border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition-all"
                placeholder="Your Name"
              />
            </div>
            <div className="group relative">
              <input
                required
                type="email"
                className="w-full p-3 bg-transparent border-b border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition-all"
                placeholder="Email Address"
              />
            </div>
            <div className="group relative">
              <textarea
                required
                className="w-full p-3 bg-transparent border-b border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition-all h-32 resize-none"
                placeholder="Describe your vision..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}
              whileTap={{ scale: 0.98 }}
              disabled={formStatus !== 'idle'}
              className={`w-full py-4 font-bold rounded-lg transition-all ${
                formStatus === 'success'
                ? 'bg-green-500 text-black'
                : 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,255,255,0.3)]'
              }`}
            >
              {formStatus === 'idle' && 'Initiate Collaboration'}
              {formStatus === 'sending' && 'Establishing Connection...'}
              {formStatus === 'success' && 'Connection Established! ✓'}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};
