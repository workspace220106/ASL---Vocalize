"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-margin-desktop py-6 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <div className="w-4 h-4 bg-black rotate-45" />
          </div>
          <span className="font-label-caps text-label-caps text-on-surface tracking-widest">RAJIV AGARWAL</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-label-caps text-label-caps transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Toggle (Simplified) */}
      <div className="md:hidden pointer-events-auto">
        <button className="p-2 glass-card rounded-lg">
          <span className="material-symbols-outlined text-primary">menu</span>
        </button>
      </div>
    </nav>
  );
}
