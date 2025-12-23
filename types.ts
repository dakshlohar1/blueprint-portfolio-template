export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: 'mobile' | 'web' | 'backend' | 'data';
  description: string;
  technologies?: string[];
  imageUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tooling' | 'design';
  iconName: string; // Mapping to Lucide icon name or custom string
}

export interface Note {
  id: string;
  content: string;
  pinned: boolean;
  position: { x: number; y: number };
  rotation: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}