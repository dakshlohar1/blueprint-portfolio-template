import { Project, Skill, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Vybee',
    subtitle: 'AI Coding MCP Tool',
    type: 'backend',
    description: 'An AI MCP tool that provides rich and most relevant code base context with indexing and relational chunk database. Features semantic chunking and git work-tree based invalidation.',
    technologies: ['Typescript', 'Neo4j', 'OpenAI', 'Tree-sitter'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    title: 'SourceGround',
    subtitle: 'The Open-Source NotebookLM 2025',
    type: 'web',
    description: 'A source chatting AI platform allowing users to talk to PDFs, Markdowns, and links. Features source summarization and multiple notebook support.',
    technologies: ['React', 'LangChain', 'Python FastAPI', 'Qdrant'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    title: 'PDF Editor',
    subtitle: 'Advanced Web PDF Editor',
    type: 'web',
    description: 'A comprehensive web PDF editor allowing shape embedding, text annotation with PostScript, and canvas drawing directly on PDF previews.',
    technologies: ['ReactJS', 'Fabric.js', 'PostScript', 'PDF.js'],
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    title: 'Fizvizz',
    subtitle: 'Networking & Knowledge Sharing App',
    type: 'mobile',
    description: 'Cross-platform app for professional connections and knowledge exchange. Features contact card digitization and scalable file management.',
    technologies: ['React Native', 'NestJS', 'PostgreSQL', 'Kafka'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p5',
    title: 'Checksigma',
    subtitle: 'Auditing & Automation Tool',
    type: 'web',
    description: 'Modular auditing workflows and dashboards for industry-specific deployments. Streamlined audit workflows reducing paperwork significantly.',
    technologies: ['React', 'NestJS', 'Python', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { id: 's1', name: 'React', category: 'frontend', iconName: 'Atom' },
  { id: 's2', name: 'Next.js', category: 'frontend', iconName: 'Zap' },
  { id: 's3', name: 'TypeScript', category: 'frontend', iconName: 'FileCode' },
  { id: 's4', name: 'TailwindCSS', category: 'frontend', iconName: 'Palette' },
  { id: 's5', name: 'React Native', category: 'frontend', iconName: 'Smartphone' },

  // Backend & AI (Grouped under backend as it fits logic)
  { id: 's6', name: 'Node.js', category: 'backend', iconName: 'Server' },
  { id: 's7', name: 'NestJS', category: 'backend', iconName: 'Layers' },
  { id: 's8', name: 'Python', category: 'backend', iconName: 'Terminal' },
  { id: 's9', name: 'LangChain', category: 'backend', iconName: 'Brain' }, // Using Brain icon if available or fallback
  { id: 's10', name: 'RAG Pipelines', category: 'backend', iconName: 'Network' },
  { id: 's11', name: 'PostgreSQL', category: 'backend', iconName: 'Database' },
  { id: 's12', name: 'Vector DBs', category: 'backend', iconName: 'Database' }, // ChromaDB, Qdrant

  // Tooling
  { id: 's13', name: 'Docker', category: 'tooling', iconName: 'Container' },
  { id: 's14', name: 'Kubernetes', category: 'tooling', iconName: 'Ship' },
  { id: 's15', name: 'GitHub Actions', category: 'tooling', iconName: 'GitBranch' },
  { id: 's16', name: 'AWS', category: 'tooling', iconName: 'Cloud' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Software Engineer',
    company: 'Wisflux Pvt. Ltd.',
    period: 'Feb 2022 — Present',
    description: [
      'Led end-to-end development of enterprise web applications using React, NestJS microservices, and Python servers.',
      'Implemented automated on-the-fly infrastructure creation CI pipeline using ARC (action-runner-controllers).',
      'Contributed AI/automation features including vllm fine-tuning and creating an AI MCP server.'
    ],
    technologies: ['React', 'NestJS', 'Python', 'Kubernetes', 'AI/LLM']
  },
  {
    id: 'exp2',
    role: 'Full Stack Developer',
    company: 'Hivado Pvt. Ltd.',
    period: 'July 2021 — Jan 2022',
    description: [
      'Developed a real-time video calling and assignment solution from scratch using WebRTC and NATs.io.',
      'Designed and implemented the whole UI and Realtime chatting system.',
      'Managed application containerization and introduced layering in Docker files.'
    ],
    technologies: ['WebRTC', 'NATs.io', 'Docker', 'React']
  },
  {
    id: 'edu1',
    role: 'Bachelor of Technology',
    company: 'Poornima Institute',
    period: '2019 — 2023',
    description: [
      'Computer Science and Engineering (CGPA: 8.35)',
      'Participated in Smart India Hackathon (2022).',
      'Team member for Library Management System project and Aeromodelling club.'
    ],
    technologies: ['Computer Science']
  },
  {
    id: 'edu2',
    role: 'Senior Secondary',
    company: 'Govt. Senior Secondary School',
    period: '2019',
    description: [
      'Rajasthan Board of Secondary Education (R.B.S.E)',
      'Percentage: 82%'
    ],
    technologies: ['Physics', 'Maths']
  }
];