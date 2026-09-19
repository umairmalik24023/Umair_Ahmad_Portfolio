import React from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Check, 
  Sparkles, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  Smartphone,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  accentKey: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  accentKey,
}) => {
  return (
    <section id="projects" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3 h-3" />
            <span>Selected Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Production-Ready Deployments
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Performance-focused, production-ready projects with measurable outcomes. Click a card to view live demo or inspect system architecture.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROJECTS.map((project, idx) => {
            const isMobileApp = project.id === 'mobile-inventory-shop';
            const isEcommerce = project.id === 'clothing-ecommerce-store';

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 hover:-translate-y-1.5"
              >
                {/* Visual Header / Mockup Banner */}
                <div className="relative h-48 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800/90 border-b border-slate-800 p-5 flex flex-col justify-between overflow-hidden">
                  {/* Subtle Background Circuit Pattern */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Top Bar with Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-800/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                      {project.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      {isMobileApp ? <Smartphone className="w-4 h-4" /> : isEcommerce ? <ShoppingBag className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Mock UI Device / Metric Frame */}
                  <div className="relative z-10 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-lg space-y-1.5 transform transition-transform group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Status: Verified</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-200 truncate">
                      {project.tagline}
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-800/80 text-slate-200 border border-slate-700/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="pt-1 space-y-1.5">
                      {project.metrics.slice(0, 2).map((metric, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Buttons from prompt: Code & Live */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-code-${project.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>

                    <button
                      onClick={() => onSelectProject(project)}
                      id={`project-live-${project.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-950/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
