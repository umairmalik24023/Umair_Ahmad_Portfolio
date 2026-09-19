import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThreeScene } from './components/canvas/ThreeScene';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Project, SceneSection } from './types';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<SceneSection>('hero');
  const [wireframeMode, setWireframeMode] = useState(false);
  const [freeCameraMode, setFreeCameraMode] = useState(false);
  const [accentKey, setAccentKey] = useState<'cyan' | 'emerald' | 'amber' | 'violet'>('cyan');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Map theme key to exact hex color for Three.js shaders and lighting
  const accentColor = useMemo(() => {
    switch (accentKey) {
      case 'emerald':
        return '#10b981';
      case 'amber':
        return '#f59e0b';
      case 'violet':
        return '#8b5cf6';
      case 'cyan':
      default:
        return '#06b6d4';
    }
  }, [accentKey]);

  // Track smooth scroll progress and section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(1, Math.max(0, currentScroll / totalHeight)) : 0;
          setScrollProgress(progress);

          // Determine current active section for navigation
          const sections: SceneSection[] = ['hero', 'skills', 'projects', 'experience', 'contact'];
          const viewportMid = window.innerHeight * 0.4;

          for (const secId of sections) {
            const el = document.getElementById(secId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
                setCurrentSection(secId);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreProjects = useCallback(() => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleContactClick = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handle3DSelectProject = useCallback((id: string) => {
    import('./data/portfolioData').then(({ PROJECTS }) => {
      const match = PROJECTS.find((p) => p.id === id);
      if (match) setSelectedProject(match);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 3D WebGL Canvas Layer with Custom Shaders & Smooth Scroll Choreography */}
      <ThreeScene
        scrollProgress={scrollProgress}
        currentSection={currentSection}
        accentColor={accentColor}
        wireframeMode={wireframeMode}
        freeCameraMode={freeCameraMode}
        activeProjectId={selectedProject?.id}
        onSelectProject={handle3DSelectProject}
      />

      {/* Top Fixed Header with 3D and Navigation Controls */}
      <Navbar
        currentSection={currentSection}
        wireframeMode={wireframeMode}
        setWireframeMode={setWireframeMode}
        freeCameraMode={freeCameraMode}
        setFreeCameraMode={setFreeCameraMode}
        accentKey={accentKey}
        setAccentKey={setAccentKey}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content Sections (Layered cleanly above 3D Canvas) */}
      <main id="main-content" className="relative z-10">
        
        {/* Hero Section */}
        <HeroSection
          onExploreProjects={handleExploreProjects}
          onContactClick={handleContactClick}
          accentKey={accentKey}
        />

        {/* Skills & Tools Section */}
        <SkillsSection accentKey={accentKey} />

        {/* Selected Projects Section */}
        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          accentKey={accentKey}
        />

        {/* Experience Section */}
        <ExperienceSection accentKey={accentKey} />

        {/* Contact & Quick Message Section */}
        <ContactSection accentKey={accentKey} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Details & Live Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable / Interactive Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  );
}
