import { Project, Skill, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'E-Commerce Core',
    subtitle: 'Next-gen web application platform',
    type: 'web',
    description: 'A scalable frontend architecture utilizing React Server Components and edge caching strategies to deliver sub-second load times for millions of users.',
    technologies: ['React', 'Next.js', 'Redis', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    title: 'Design System',
    subtitle: 'Mobile-first component library',
    type: 'mobile',
    description: 'Unified visual language implementation ensuring consistency across iOS, Android, and Web platforms. Includes automated regression testing and documentation generation.',
    technologies: ['TypeScript', 'Storybook', 'Figma API', 'React Native'],
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    title: 'API Gateway',
    subtitle: 'Microservices orchestration',
    type: 'backend',
    description: 'High-throughput GraphQL federation layer handling 50k+ rps with <20ms latency. Implemented custom rate limiting and observability middleware.',
    technologies: ['Apollo Federation', 'Node.js', 'Go', 'Kubernetes'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    title: 'Data Viz Suite',
    subtitle: 'Interactive analytics dashboard',
    type: 'data',
    description: 'D3.js powered visualization engine for real-time financial market data streams. Optimized for canvas rendering to handle thousands of data points smoothly.',
    technologies: ['D3.js', 'WebGL', 'WebSockets', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const SKILLS: Skill[] = [
  { id: 's1', name: 'React', category: 'frontend', iconName: 'Atom' },
  { id: 's2', name: 'TypeScript', category: 'frontend', iconName: 'FileCode' },
  { id: 's3', name: 'Node.js', category: 'backend', iconName: 'Server' },
  { id: 's4', name: 'Python', category: 'backend', iconName: 'Terminal' },
  { id: 's5', name: 'Docker', category: 'tooling', iconName: 'Container' },
  { id: 's6', name: 'AWS', category: 'tooling', iconName: 'Cloud' },
  { id: 's7', name: 'Figma', category: 'design', iconName: 'PenTool' },
  { id: 's8', name: 'Postgres', category: 'backend', iconName: 'Database' },
  { id: 's9', name: 'Next.js', category: 'frontend', iconName: 'Zap' },
  { id: 's10', name: 'Go', category: 'backend', iconName: 'Box' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Senior Staff Engineer',
    company: 'Nexus Dynamics',
    period: '2022 — PRESENT',
    description: [
      'Architected a distributed event-streaming platform handling 5TB+ daily data ingestion.',
      'Mentored a squad of 8 engineers, establishing RFC processes and code review standards.',
      'Reduced cloud infrastructure costs by 35% through container optimization and spot instance orchestration.'
    ],
    technologies: ['Rust', 'Kafka', 'Kubernetes', 'Terraform']
  },
  {
    id: 'exp2',
    role: 'Lead Full Stack Developer',
    company: 'Blueprint IO',
    period: '2019 — 2022',
    description: [
      'Spearheaded the migration from a monolithic Rails app to a microservices architecture using Go and Node.js.',
      'Designed and implemented a proprietary design system used across 4 different product lines.',
      'Improved core web vitals (LCP/CLS) significantly, boosting SEO rankings and user retention.'
    ],
    technologies: ['React', 'TypeScript', 'Go', 'GraphQL']
  },
  {
    id: 'exp3',
    role: 'Frontend Engineer',
    company: 'Pixel Forge',
    period: '2017 — 2019',
    description: [
      'Developed high-performance WebGL visualizations for automotive configurators.',
      'Collaborated closely with design teams to implement complex animations and micro-interactions.',
      'Built progressive web apps (PWA) with offline capabilities for field agents.'
    ],
    technologies: ['Three.js', 'Vue', 'WebGL', 'Firebase']
  }
];