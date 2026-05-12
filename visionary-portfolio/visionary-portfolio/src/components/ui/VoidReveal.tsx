"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoidReveal({ children }: { children: React.ReactNode }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (currentScrollY > 50) {
        setIsRevealed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* The Void Overlay */}
      <motion.div
        className="fixed inset-0 z-[100] bg-black pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isRevealed ? 0 : 1,
          scale: isRevealed ? 1.1 : 1
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Scroll Indicator in the Void */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em] mb-4">
              Enter the Vision
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Actual Content */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isRevealed ? 1 : 0,
          y: isRevealed ? 0 : 20
        }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Spacer to allow initial scrolling into the void */}
      {!isRevealed && <div className="h-screen w-full" />}
    </div>
  );
}
