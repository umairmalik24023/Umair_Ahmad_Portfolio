import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, EXPERIENCES, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Curriculum Vitae • Umair Ahmad
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              id="resume-close-btn"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div id="printable-resume" className="p-8 sm:p-12 space-y-8 max-h-[80vh] overflow-y-auto bg-[#090d16] text-slate-200">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-cyan-400 font-semibold text-lg mt-0.5">
                {PERSONAL_INFO.role} • 2+ Years Experience
              </div>
              <p className="text-xs text-slate-400 max-w-xl mt-2 leading-relaxed">
                Specializing in scalable, high-throughput web applications with Python, Django, PostgreSQL, and JavaScript. Optimizing systems for efficiency and client satisfaction.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-purple-400" />
                <span>github.com/umairmalik24023</span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <span className="text-base font-bold text-white">
                      {exp.title}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {exp.company} • {exp.type}
                  </div>
                  <p className="text-xs text-slate-300">
                    {exp.description}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Production Projects */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Featured Software Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-white text-sm">
                      {proj.title}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {proj.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {proj.description}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400">
                    Tech: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Tools Summary */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Technical Skills & Tooling</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="font-semibold text-white">Languages:</span> Python, JavaScript (ES6+), SQL, HTML5, CSS3, Bootstrap
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="font-semibold text-white">Backend & APIs:</span> Django Framework, Django REST Framework, RESTful APIs, JWT Auth
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="font-semibold text-white">Databases:</span> PostgreSQL, Relational Schema Design, SQL Optimization, Query Tuning
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="font-semibold text-white">Frontend & Cloud:</span> React Basics, CSS-in-JS, Render, GitHub Actions, Git
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
