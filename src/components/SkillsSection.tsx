import React, { useState } from 'react';
import { 
  Terminal, 
  Database, 
  Layout, 
  Cloud, 
  CheckCircle2, 
  Zap, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsSectionProps {
  accentKey: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ accentKey }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [liveBenchmarkActive, setLiveBenchmarkActive] = useState<boolean>(false);
  const [benchmarkMetrics, setBenchmarkMetrics] = useState({
    standardLatency: 285,
    optimizedLatency: 48,
    queriesReduced: '14 queries ➔ 1 query',
    throughputGain: '+490%'
  });

  const categoryIcons = [
    <Terminal className="w-4 h-4 text-cyan-400" />,
    <Database className="w-4 h-4 text-emerald-400" />,
    <Layout className="w-4 h-4 text-amber-400" />,
    <Cloud className="w-4 h-4 text-purple-400" />
  ];

  return (
    <section id="skills" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Skills & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technologies I Use Daily
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Technologies I use daily — production-ready and well-tested. Engineered for rock-solid reliability, low latency, and scalable architectural foundations.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              id={`skill-cat-${idx}`}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === idx
                  ? 'bg-slate-800 text-white border border-cyan-500/50 shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {categoryIcons[idx]}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Skill Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  {categoryIcons[activeCategory]}
                  <span>{SKILL_CATEGORIES[activeCategory].title}</span>
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {SKILL_CATEGORIES[activeCategory].description}
                </p>
              </div>

              <div className="space-y-4">
                {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`p-4 rounded-xl border transition-all ${
                      skill.highlight
                        ? 'bg-slate-800/70 border-cyan-500/30 shadow-sm'
                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-base">
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Core Focus
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Performance Tuning & Architecture Benchmarker */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider">
                    Django Optimization Simulator
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Production Tuning
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                As an Associate Software Engineer specializing in Django, I focus on query efficiency, eager loading, and indexing to unlock massive throughput improvements.
              </p>

              {/* Comparison Visualizer */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Default Unoptimized Query (N+1)</span>
                    <span className="text-rose-400">{benchmarkMetrics.standardLatency} ms</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500/70 rounded-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Umair’s Tuned Query (select_related + index)</span>
                    <span className="text-emerald-400 font-bold">{benchmarkMetrics.optimizedLatency} ms</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[15%]" />
                  </div>
                </div>
              </div>

              {/* Live Interactive Benchmark Trigger */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Simulate Traffic Load:</span>
                  <span className="text-cyan-400 font-mono font-bold">1,000 req/sec</span>
                </div>
                <button
                  onClick={() => {
                    setLiveBenchmarkActive(true);
                    setTimeout(() => setLiveBenchmarkActive(false), 800);
                  }}
                  id="run-benchmark-btn"
                  className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-xs font-mono text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className={`w-3.5 h-3.5 ${liveBenchmarkActive ? 'text-amber-400 animate-spin' : 'text-cyan-400'}`} />
                  <span>{liveBenchmarkActive ? 'Calculating Latency Profile...' : 'Run Query Benchmarks'}</span>
                </button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Database Roundtrips</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">14 ➔ 1 Query</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Throughput Gain</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-1">+490%</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
