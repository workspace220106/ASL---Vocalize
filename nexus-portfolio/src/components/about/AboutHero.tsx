'use client';
import { TechOrbit } from './TechOrbit';
import { StoryCard } from './StoryCard';
import { StatsTicker } from './StatsTicker';

export const AboutHero = () => {
  return (
    <div className="relative w-full bg-black">
      <StatsTicker />
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Column: Sticky Hook */}
        <div className="lg:w-1/2 sticky top-0 h-screen flex flex-col justify-center p-8 lg:p-24 bg-black overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-6 tracking-tight">
              Architecting the bridge between <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-white">
                AI/ML innovation
              </span> <br />
              and scalable production software.
            </h1>
            <p className="text-gray-400 text-xl lg:text-2xl font-light mb-12 max-w-lg">
              B.E. Information Technology · Fr. C. Rodrigues Institute of Technology
            </p>
          </div>

          <div className="flex justify-center items-center mt-8">
            <TechOrbit />
          </div>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-transparent to-cyan-900/30 -z-10" />
        </div>

        {/* Right Column: Scrollable Narrative */}
        <div className="lg:w-1/2 p-8 lg:p-24 space-y-12 bg-gradient-to-b from-black via-[#050508] to-black">
          <StoryCard
            icon="🎓"
            title="The Foundation"
            content="Focused on high-performance computing and analytical rigor. I've built a strong academic core in DSA, DBMS, and Networks, complemented by professional certifications from Google AI and Microsoft Power BI."
            tags={["Data Structures", "DBMS", "Power BI", "Google AI"]}
          />
          <StoryCard
            icon="⚡"
            title="The Catalyst"
            content="Turning theoretical ML into real-time interactive experiences. From pioneering an ASL Image Recognition Chatbot with a CNN pipeline to integrating advanced ML features during my tenure at Interacto AI."
            tags={["TensorFlow", "OpenCV", "MediaPipe", "Flask"]}
          />
          <StoryCard
            icon="🚀"
            title="The Execution"
            content="Shipping production-grade applications that drive efficiency. Whether it's the Gemini-powered finance PWA 'PacPay' or optimizing data pipelines for Aakash-Enterprises, I build for scale and impact."
            tags={["Next.js", "Firebase", "PostgreSQL", "Express"]}
          />

          {/* Core Pillars Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <h4 className="text-white font-bold mb-1">Full-Stack Dev</h4>
              <p className="text-xs text-gray-500">End-to-end product delivery.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <h4 className="text-white font-bold mb-1">AI/ML Integration</h4>
              <p className="text-xs text-gray-500">Intelligent features in production.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <h4 className="text-white font-bold mb-1">Agile Leadership</h4>
              <p className la="text-xs text-gray-500">Scrum Master efficiency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
