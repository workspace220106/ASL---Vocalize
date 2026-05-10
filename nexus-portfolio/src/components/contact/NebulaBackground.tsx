'use client';
import React from 'react';

export const NebulaBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050508]">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-900/30 rounded-full blur-[120px] animate-nebula" />
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px] animate-nebula" />
  </div>
);
