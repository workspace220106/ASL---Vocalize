'use client';
import { motion } from 'framer-motion';

export const StoryCard = ({ icon, title, content, tags }: { icon: string; title: string; content: string; tags: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 transform origin-left">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-400 mb-6 leading-relaxed text-lg font-light group-hover:text-gray-300 transition-colors">
      {content}
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="px-3 py-1 text-[10px] font-mono rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);
