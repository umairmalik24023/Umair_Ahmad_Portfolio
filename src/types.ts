export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  badge: string;
  color: string;
  accentHex: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export type SceneSection = 'hero' | 'skills' | 'projects' | 'experience' | 'contact';
