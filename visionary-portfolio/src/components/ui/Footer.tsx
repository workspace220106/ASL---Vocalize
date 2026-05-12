"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg border-t border-white/10 bg-surface relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <div className="font-headline-md text-headline-md text-on-surface font-bold tracking-tighter mb-4">
              RAJIV AGARWAL
            </div>
            <p className="text-on-surface-variant mb-6">
              Software / IT Engineer based in Thane, focused on building high-performance technical infrastructure.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">mail</span>
                <a className="hover:text-primary transition-colors" href="mailto:workspace220106@gmail.com">workspace220106@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                <span>Mira Road (E), Thane – 401107</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8">
          <div className="font-label-caps text-[10px] text-on-surface-variant opacity-50">
            MADE WITH INTENT
          </div>
        </div>
      </div>
    </footer>
  );
}
