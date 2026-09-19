import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Orbit, 
  Layers, 
  Menu, 
  X, 
  Sparkles,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  currentSection: string;
  wireframeMode: boolean;
  setWireframeMode: (v: boolean | ((prev: boolean) => boolean)) => void;
  freeCameraMode: boolean;
  setFreeCameraMode: (v: boolean | ((prev: boolean) => boolean)) => void;
  accentKey: 'cyan' | 'emerald' | 'amber' | 'violet';
  setAccentKey: (k: 'cyan' | 'emerald' | 'amber' | 'violet') => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  wireframeMode,
  setWireframeMode,
  freeCameraMode,
  setFreeCameraMode,
  accentKey,
  setAccentKey,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  const themes: { key: 'cyan' | 'emerald' | 'amber' | 'violet'; label: string; color: string }[] = [
    { key: 'cyan', label: 'Neon Cyan', color: '#06b6d4' },
    { key: 'emerald', label: 'Matrix Emerald', color: '#10b981' },
    { key: 'amber', label: 'Solar Amber', color: '#f59e0b' },
    { key: 'violet', label: 'Cyber Violet', color: '#8b5cf6' },
  ];

  return (
    <>
      {/* Accessibility Skip to Content */}
      <a
        href="#main-content"
        id="skip-to-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            id="nav-logo"
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
              <Code2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <div className="font-bold text-slate-100 tracking-tight text-base group-hover:text-cyan-400 transition-colors">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PERSONAL_INFO.role}</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Controls & Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* 3D Camera Free/Orbit Toggle */}
            <button
              onClick={() => setFreeCameraMode((prev) => !prev)}
              id="toggle-free-camera"
              title={freeCameraMode ? "Switch back to Scroll Cine-Track" : "Unlock 3D Free Camera Orbit"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                freeCameraMode
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>{freeCameraMode ? "Orbit 3D Active" : "Orbit 3D"}</span>
            </button>

            {/* Wireframe Shader Toggle */}
            <button
              onClick={() => setWireframeMode((prev) => !prev)}
              id="toggle-wireframe-shader"
              title="Toggle Mesh Wireframe Shader Mode"
              className={`p-2 rounded-lg border text-xs transition-all ${
                wireframeMode
                  ? 'bg-purple-500/20 border-purple-500/60 text-purple-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>

            {/* Theme / Shader Color Switcher */}
            <div className="flex items-center bg-slate-900/60 border border-slate-800/80 rounded-lg p-1 gap-1">
              {themes.map((t) => (
                <button
                  key={t.key}
                  id={`theme-btn-${t.key}`}
                  onClick={() => setAccentKey(t.key)}
                  title={t.label}
                  className={`w-5 h-5 rounded-full transition-all relative ${
                    accentKey === t.key
                      ? 'scale-110 ring-2 ring-white/50'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: t.color }}
                />
              ))}
            </div>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              id="nav-resume-btn"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs tracking-wide shadow-md shadow-cyan-950/40 hover:shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0e17] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-3 py-2 rounded-lg bg-slate-900 text-left text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Shader Theme</span>
              <div className="flex gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setAccentKey(t.key)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      accentKey === t.key ? 'scale-110 ring-2 ring-white/60' : 'opacity-60'
                    }`}
                    style={{ backgroundColor: t.color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setFreeCameraMode((p) => !p)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>{freeCameraMode ? 'Orbit Mode On' : '3D Orbit Mode'}</span>
              </button>
              <button
                onClick={() => setWireframeMode((p) => !p)}
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
