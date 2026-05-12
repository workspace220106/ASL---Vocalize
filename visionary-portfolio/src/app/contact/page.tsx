"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Scene from '@/components/canvas/Scene';
import VoidReveal from '@/components/ui/VoidReveal';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function Contact() {
  return (
    <VoidReveal>
      <Scene />
      <main className="mt-32 px-8 md:px-margin-desktop pb-section-gap max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Command Cards (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-stack-md">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-label-caps text-label-caps text-on-surface-variant mb-4"
            >
              COMMAND CENTER
            </motion.h3>

            {[
              { label: 'NETWORK / 01', title: 'LINKEDIN', url: 'https://www.linkedin.com/in/rajiv-agarwal221/', icon: 'hub', sub: 'linkedin.com/in/rajiv-agarwal221/' },
              { label: 'SOURCE / 02', title: 'GITHUB', url: 'https://github.com/workspace220106', icon: 'code', sub: 'github.com/workspace220106' },
              { label: 'DIRECT / 03', title: 'EMAIL', url: 'mailto:workspace220106@gmail.com', icon: 'mail_outline', sub: 'workspace220106@gmail.com' },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="command-card glass-card p-8 group transition-all duration-300 flex justify-between items-center cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{link.label}</span>
                  <h4 className="font-headline-md text-headline-md text-primary" style={{ textShadow: 'rgba(192, 193, 255, 0.2) 0px 0px 10px' }}>
                    {link.title}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant opacity-60 font-mono mt-1">{link.sub}</span>
                </div>
                <span className="material-symbols-outlined text-primary text-4xl group-hover:text-white transition-colors duration-300">
                  {link.icon}
                </span>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-stack-lg p-8 border border-white/5 bg-surface-container-lowest"
            >
              <p className="font-body-md text-body-md text-on-surface-variant italic opacity-60">
                "Technology is best when it brings people together."
              </p>
            </motion.div>
          </div>

          {/* Contact Form (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 glass-card p-8 md:p-12"
          >
            <form className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3 group">
                  <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">
                    IDENTIFICATION / NAME
                  </label>
                  <input
                    className="bg-transparent border-0 border-b border-white/10 px-0 py-4 font-body-lg text-body-lg focus:ring-0 focus:border-primary transition-all placeholder:text-white/10 text-on-surface outline-none"
                    placeholder="Commander Name"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-3 group">
                  <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">
                    COMMUNICATION / EMAIL
                  </label>
                  <input
                    className="bg-transparent border-0 border-b border-white/10 px-0 py-4 font-body-lg text-body-lg focus:ring-0 focus:border-primary transition-all placeholder:text-white/10 text-on-surface outline-none"
                    placeholder="access@network.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 group">
                <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">
                  PROJECT VISION
                </label>
                <textarea
                  className="bg-transparent border-0 border-b border-white/10 px-0 py-4 font-body-lg text-body-lg focus:ring-0 focus:border-primary transition-all placeholder:text-white/10 text-on-surface resize-none outline-none"
                  placeholder="Describe the breakthrough..."
                  rows={4}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
                <button
                  className="w-full md:w-auto font-label-caps text-label-caps px-12 py-6 bg-primary-container/20 text-primary border border-primary/40 hover:bg-primary-container/30 hover:border-primary transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 group"
                  type="submit"
                >
                  INITIATE TRANSMISSION
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">send</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Visual Element */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-section-gap"
        >
          <div className="relative w-full h-[400px] overflow-hidden glass-card group">
            <img
              alt="Global connectivity grid"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform duration-1000"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyq7eYURA0_nK7qx1co4PGqO_ la la la"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h5 className="font-label-caps text-label-caps text-on-surface mb-2">CURRENT LOCATION</h5>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">location_on</span>
                <span className="font-body-md text-body-md uppercase tracking-widest">MUMBAI / INDIA</span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </VoidReveal>
  );
}
