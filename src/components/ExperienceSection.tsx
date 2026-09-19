import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceSectionProps {
  accentKey: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ accentKey }) => {
  return (
    <section id="experience" className="relative py-28 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3 h-3" />
            <span>Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Delivering high-reliability software, scalable full-stack web applications, and backend throughput improvements.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/60 before:via-blue-500/40 before:to-slate-800">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={exp.id}
                id={`experience-item-${exp.id}`}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 group`}
              >
                {/* Central Timeline Milestone Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 p-6 sm:p-7 rounded-2xl bg-slate-900/85 border border-slate-800 group-hover:border-cyan-500/40 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  
                  {/* Top Meta info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.type}
                    </span>
                  </div>

                  {/* Role and Company */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.title}
                  </h3>
                  <div className="text-sm font-medium text-slate-300 mt-0.5">
                    {exp.company}
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-4 space-y-2">
                    {exp.achievements.map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Empty spacer for alignment on opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
