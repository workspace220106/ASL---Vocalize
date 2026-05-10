'use client';
import { motion } from 'framer-motion';
import { SiReact, SiNodedotjs, SiPython, SiTensorflow, SiPostgresql, SiThreedotjs, SiNextdotjs, SiFirebase } from 'react-icons/si';

const techs = [
  { icon: SiReact, color: '#61DAFB' },
  { icon: SiNodedotjs, color: '#339933' },
  { icon: SiPython, color: '#3776AB' },
  { icon: SiTensorflow, color: '#FF6F00' },
  { icon: SiPostgresql, color: '#336791' },
  { icon: SiThreedotjs, color: '#000000' },
  { icon: SiNextdotjs, color: '#000000' },
  { icon: SiFirebase, color: '#FFCA28' },
];

export const TechOrbit = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Orbit Rings */}
      <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute w-32 h-32 border border-indigo-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

      {/* Center Monogram */}
      <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-[0_0_20px_rgba(0,255,255,0.3)]">
        RA
      </div>

      {/* Rotating Tech Icons */}
      {techs.map(({ icon: Icon, color }, i) => {
        const angle = (i * Math.PI * 2) / techs.length;
        const radius = 96; // Half of 192px orbit

        return (
          <motion.div
            key={i}
            className="absolute p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white hover:text-cyan-400 hover:border-cyan-400 transition-all group cursor-pointer"
            initial={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }}
            animate={{
              rotate: 360,
              x: [Math.cos(angle) * radius, Math.cos(angle) * radius],
              y: [Math.sin(angle) * radius, Math.sin(angle) * radius],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              x: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <Icon size={20} style={{ color: 'inherit' }} />
          </motion.div>
        );
      })}
    </div>
  );
};
