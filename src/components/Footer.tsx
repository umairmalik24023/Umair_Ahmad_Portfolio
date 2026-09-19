import React from 'react';
import { ArrowUp, Code2, Heart, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#06080e] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-white text-base tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                • {PERSONAL_INFO.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              © 2026 Umair Malik · Privacy · Sitemap
            </p>
          </div>

          {/* Center 3D Engine & Tech Stack Notice */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Crafted with Three.js • React Three Fiber • GLSL Shaders</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            id="footer-back-to-top-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>

        </div>
      </div>
    </footer>
  );
};
