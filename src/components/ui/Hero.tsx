import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeroProps {
  onEnterNexus?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterNexus }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Motion values for the magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (range -50 to 50 approx)
    mouseX.set((e.clientX - centerX) * 0.3);
    mouseY.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center text-center px-4">
      {/* Typography Layer */}
      <div className="z-10 flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-none max-w-5xl"
        >
          CRAFTING DIGITAL <br />
          <span className="italic font-light opacity-90">EXPERIENCES</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-400 text-lg md:text-xl font-light tracking-widest uppercase"
        >
          Rajiv Agarwal | 2nd Year IT Student | Hackathon Winner | AI Agent Architect
        </motion.p>

        {/* Magnetic Portal Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onEnterNexus}
            style={{ x, y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-colors duration-300",
              "hover:bg-zinc-200 active:bg-white"
            )}
          >
            <span className="relative z-10 pointer-events-none tracking-tighter">
              ENTER THE NEXUS
            </span>
            {/* Subtle inner glow/gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </motion.div>
      </div>

      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-radial-gradient from-zinc-900/20 to-transparent blur-3xl" />
      </div>
    </section>
  );
};
