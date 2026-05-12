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

export default function About() {
  return (
    <VoidReveal>
      <Scene />
      <main className="mt-32 px-8 md:px-margin-desktop pb-section-gap max-w-[1440px] mx-auto relative z-10">
        <section className="max-w-7xl mx-auto pt-stack-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-stack-sm mb-12"
          >
            <h2 className="font-headline-xl text-headline-xl md:text-headline-xl text-headline-lg-mobile">ABOUT ME</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-4 sticky top-32">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 relative glass-card"
              >
                <img
                  alt="Portrait of a digital architect"
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 scale-110"
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhnwiR9G1c5Y28BHPWAkVtGVJSC0P2XiuMgS-UkmAUhWTw4yDZ5hXU9w57Frl10DzYBMeHdlJJABoL6Ec08XPm-K7ZfmSU33S7iX39pap1MarwbIWU0_qdBwJMaez4gI5aHNcbe1WJ352aHelzGHwlqYmjOEOElu2sHcKe73gZJttZevvcDirotuQC1jppcQK3FTCee7NE3g7POvhKUKZH0FNPQURsyVlityafebaoBX4s6ogou-4ccgb0sEWJ3biGyLDIisCe_9g"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="mt-stack-md"
              >
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  A synthesis of technical precision and creative vision, dedicated to building the next generation of intelligent digital systems.
                </p>
              </motion.div>
            </div>

            <div className="md:col-span-8 flex flex-col gap-gutter">
              {[
                {
                  title: "The Foundation",
                  content: "\"My technical journey is rooted in a rigorous academic foundation at Fr. C. Rodrigues Institute of Technology, maintaining an 8.71 CGPA in Information Technology. I didn't just study Data Structures, DBMS, and Networks—I learned how to optimize them. Certified by Google in AI and Microsoft as a Power BI Data Analyst, I built my core skill set on the principle that scalable software requires an uncompromising understanding of both low-level architecture and high-level data intelligence.\"",
                  border: "border-white/10"
                },
                {
                  title: "The Catalyst",
                  content: "\"Innovation isn't just theory; it's what happens when you bridge the gap between machine learning and human interaction. During my internship at Interacto AI, I integrated core ML features into active pipelines. I pushed these boundaries further by engineering an ASL Image Recognition Chatbot—a real-time, multi-language translation engine powered by a custom CNN and MediaPipe, transforming complex computer vision models into accessible, lightning-fast user experiences.\"",
                  border: "border-l-4 border-l-primary/50"
                },
                {
                  title: "The Execution",
                  content: "\"I don't just write code; I ship production-ready products. I architected the backend for Aakash-Enterprises using Express 5 and PostgreSQL, automating complex data pipelines that drove a 15% boost in sales efficiency. On the frontend, I launched PacPay—a gamified financial PWA built with Next.js and integrated with Gemini AI. From database schemas to edge deployments, my focus remains constant: delivering scalable, resilient software that drives measurable business impact.\"",
                  border: "border-white/10"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className={`glass-card p-10 rounded-xl ${item.border}`}
                >
                  <h3 className="font-headline-md text-headline-md mb-6 uppercase tracking-tight">{item.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-section-gap max-w-7xl mx-auto">
          <div className="mb-16 border-b border-white/10 pb-8">
            <h2 className="font-headline-md text-headline-md uppercase tracking-widest">Core Pillars</h2>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {[
              { icon: 'code', title: 'Full-Stack Dev', desc: 'From React frontends to Express backends — end-to-end product delivery.' },
              { icon: 'psychology', title: 'AI/ML Integration', desc: 'TensorFlow, Gemini AI, computer vision — intelligent features in production.' },
              { icon: 'groups', title: 'Agile Leadership', desc: 'Scrum Master at ONJI — standups, sprints, and shipping on schedule.' },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-white/[0.02] flex flex-col items-start gap-stack-md transition-all duration-300 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                </div>
                <h4 className="font-headline-md text-[24px] uppercase">{pillar.title}</h4>
                <p className="font-body-md text-on-surface-variant">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </VoidReveal>
  );
}
