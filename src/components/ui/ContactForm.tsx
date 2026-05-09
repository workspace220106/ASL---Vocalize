import React from 'react';

export const ContactForm: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 transition-opacity duration-500">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="mb-6 text-3xl font-bold text-white tracking-tight">
          Let's <span className="text-[#00F0FF]">Connect</span>
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Message</label>
            <textarea
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-lg bg-[#00F0FF] text-black font-bold hover:bg-[#00d8e6] transition-all transform hover:scale-95 active:scale-90 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            SEND INQUIRY
          </button>
        </form>
      </div>
    </div>
  );
};
