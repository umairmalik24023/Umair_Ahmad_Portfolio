import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
  accentKey: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onContactClick,
  accentKey,
}) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Open to: {PERSONAL_INFO.openTo}</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hi, I’m <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">{PERSONAL_INFO.shortName}</span> — <br />
                <span className="text-slate-100">{PERSONAL_INFO.role}</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Experience & Skills Quick Highlights from Prompt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Experience</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  Over <strong className="text-white font-medium">2 years</strong> delivering innovative, reliable software in e-commerce, data analytics, and custom web applications.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Core Expertise</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  High-throughput web development, system architecture, <strong className="text-white font-medium">Python, Django, PostgreSQL, JavaScript, React</strong>, and Render.
                </p>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProjects}
                id="hero-see-projects-btn"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>See Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onContactClick}
                id="hero-get-in-touch-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-sm font-semibold transition-all backdrop-blur-sm hover:bg-slate-800/80 active:scale-[0.98]"
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {stat.helper}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Quantum Orb Visual Anchor & Shader HUD */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            {/* Floating Glassmorphic 3D Card HUD */}
            <div className="w-full max-w-sm p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl space-y-3 pointer-events-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">
                    Interactive 3D WebGL
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Custom Shaders
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Vertex Engine</span>
                  <span className="text-cyan-400">3D Simplex Displacement</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Fragment Layer</span>
                  <span className="text-teal-300">Fresnel + Chromatic Plasma</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Navigation</span>
                  <span className="text-purple-400">Smooth Scroll Waypoint Rig</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  Hover orb to energize
                </span>
                <span className="text-slate-400 font-mono">Scroll to travel</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
