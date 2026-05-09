import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../constants/projects';

interface ProjectHUDProps {
  project: Project | null;
}

export const ProjectHUD: React.FC<ProjectHUDProps> = ({ project }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed right-0 top-0 h-screen w-[450px] z-50 p-6 flex flex-col gap-6"
        >
          <div
            className="h-full w-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 flex flex-col gap-8 shadow-2xl overflow-y-auto custom-scrollbar"
            style={{
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Bento Header */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  {project.title}
                </h1>
                <div className="flex items-center gap-2 text-cyan-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Active Project Projection</span>
                </div>
              </div>
            </div>

            {/* Case Study Section */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                  Micro Case Study
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-red-400 text-xs font-bold uppercase">The Problem</span>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Identifying the core friction points in current industry standards to uncover latent user needs.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-green-400 text-xs font-bold uppercase">The Solution</span>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Role & Interaction */}
            <div className="mt-auto grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold">Lead Role</h3>
                  <p className="text-white font-medium">Architect & Developer</p>
                </div>
                <a
                  href={project.mockupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-cyan-400 transition-colors"
                >
                  View Mockup
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
