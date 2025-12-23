import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Cpu, Code2, Layers, Database, ChevronLeft, ChevronRight } from 'lucide-react';

const schematicVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { type: "spring", duration: 1, bounce: 0 },
            opacity: { duration: 0.01 }
        }
    }
};

const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            when: "beforeChildren"
        }
    }
};

const cornerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", duration: 0.4 }
    }
};

const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.4,
            ease: "easeOut",
            when: "beforeChildren"
        }
    }
};

const SchematicWeb: React.FC = () => (
    <motion.svg
        viewBox="0 0 100 80"
        className="w-full h-full stroke-white fill-none stroke-[0.5]"
        variants={schematicVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        <motion.rect variants={drawVariants} x="5" y="5" width="90" height="70" rx="2" strokeWidth="1" />
        <motion.rect variants={drawVariants} x="5" y="5" width="90" height="10" strokeWidth="0.5" />
        <motion.circle variants={drawVariants} cx="10" cy="10" r="1.5" />
        <motion.circle variants={drawVariants} cx="15" cy="10" r="1.5" />
        <motion.circle variants={drawVariants} cx="20" cy="10" r="1.5" />

        <motion.line variants={drawVariants} x1="5" y1="30" x2="95" y2="30" strokeDasharray="2 2" />
        <motion.rect variants={drawVariants} x="15" y="40" width="20" height="20" />
        <motion.rect variants={drawVariants} x="40" y="40" width="20" height="20" />
        <motion.rect variants={drawVariants} x="65" y="40" width="20" height="20" />

        {/* Connection lines */}
        <motion.path variants={drawVariants} d="M 50 30 L 50 40 M 25 30 L 25 40 M 75 30 L 75 40" strokeDasharray="1 1" />
    </motion.svg>
);

const SchematicMobile: React.FC = () => (
    <motion.svg
        viewBox="0 0 100 80"
        className="w-full h-full stroke-white fill-none stroke-[0.5]"
        variants={schematicVariants}
    >
        <motion.rect variants={drawVariants} x="35" y="5" width="30" height="60" rx="4" strokeWidth="1" />
        <motion.line variants={drawVariants} x1="40" y1="10" x2="60" y2="10" />
        <motion.rect variants={drawVariants} x="38" y="15" width="24" height="35" strokeDasharray="2 1" />
        <motion.circle variants={drawVariants} cx="50" cy="58" r="2" />

        <motion.line variants={drawVariants} x1="65" y1="35" x2="90" y2="35" />
        <motion.text variants={drawVariants} x="92" y="37" fontSize="4" fontFamily="monospace" stroke="none" fill="white">VIEWPORT</motion.text>
    </motion.svg>
);

const SchematicBackend: React.FC = () => (
    <motion.svg
        viewBox="0 0 100 80"
        className="w-full h-full stroke-white fill-none stroke-[0.5]"
        variants={schematicVariants}
    >
        <motion.path variants={drawVariants} d="M10 20 C10 15 40 10 50 20 C60 10 90 15 90 20 L90 35 C90 40 60 45 50 35 C40 45 10 40 10 35 Z" />
        <motion.path variants={drawVariants} d="M10 25 C10 30 40 35 50 25" strokeDasharray="2 2" />
        <motion.path variants={drawVariants} d="M50 25 C60 35 90 30 90 25" strokeDasharray="2 2" />

        <motion.rect variants={drawVariants} x="20" y="50" width="15" height="20" />
        <motion.rect variants={drawVariants} x="42" y="50" width="15" height="20" />
        <motion.rect variants={drawVariants} x="65" y="50" width="15" height="20" />

        <motion.line variants={drawVariants} x1="50" y1="35" x2="50" y2="50" />
        <motion.line variants={drawVariants} x1="27" y1="35" x2="27" y2="50" />
        <motion.line variants={drawVariants} x1="72" y1="35" x2="72" y2="50" />
    </motion.svg>
);

const SchematicData: React.FC = () => (
    <motion.svg
        viewBox="0 0 100 80"
        className="w-full h-full stroke-white fill-none stroke-[0.5]"
        variants={schematicVariants}
    >
        <motion.line variants={drawVariants} x1="10" y1="70" x2="90" y2="70" strokeWidth="1" />
        <motion.line variants={drawVariants} x1="10" y1="70" x2="10" y2="10" strokeWidth="1" />

        <motion.polyline variants={drawVariants} points="10,60 30,50 50,20 70,40 90,15" strokeWidth="1" />
        <motion.circle variants={drawVariants} cx="30" cy="50" r="2" fill="white" />
        <motion.circle variants={drawVariants} cx="50" cy="20" r="2" fill="white" />
        <motion.circle variants={drawVariants} cx="70" cy="40" r="2" fill="white" />
        <motion.circle variants={drawVariants} cx="90" cy="15" r="2" fill="white" />

        <motion.line variants={drawVariants} x1="50" y1="20" x2="50" y2="70" strokeDasharray="1 2" />
    </motion.svg>
);

const ProjectCard: React.FC<{ project: Project; onSelect: (p: Project) => void }> = ({ project, onSelect }) => {
    let Visual = SchematicWeb;
    if (project.type === 'mobile') Visual = SchematicMobile;
    if (project.type === 'backend') Visual = SchematicBackend;
    if (project.type === 'data') Visual = SchematicData;

    return (
        <motion.div
            onClick={() => onSelect(project)}
            className="group relative bg-blue-900/20 backdrop-blur-sm p-1 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardContainerVariants}
        >
            {/* Animated Border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <motion.rect
                    variants={drawVariants}
                    x="0.5" y="0.5"
                    width="calc(100% - 1px)" height="calc(100% - 1px)"
                    className="fill-none stroke-white/40 group-hover:stroke-white transition-colors duration-300"
                    strokeWidth="1"
                />
            </svg>

            {/* Corner markings */}
            <motion.div variants={cornerVariants} className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
            <motion.div variants={cornerVariants} className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
            <motion.div variants={cornerVariants} className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
            <motion.div variants={cornerVariants} className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />

            <motion.div className="h-full flex flex-col" variants={contentVariants}>
                {/* Schematic Visual Area */}
                <div className="h-48 border-b border-white/20 p-4 relative overflow-hidden group-hover:bg-white/5 transition-colors">
                    {/* Grid overlay in visual area */}
                    <div className="absolute inset-0 bg-blueprint-grid opacity-20" />
                    <div className="relative z-10 w-full h-full p-4 transform transition-transform duration-700 ease-out group-hover:scale-110">
                        <Visual />
                    </div>
                    {/* Dimension lines */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-20 w-px border-l border-dashed border-white/30 flex items-center">
                        <span className="block -rotate-90 text-[8px] whitespace-nowrap ml-[-10px] text-white/50">1200px</span>
                    </div>
                </div>

                {/* Info Area */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-display font-bold uppercase tracking-wide group-hover:text-cyan-200 transition-colors">{project.title}</h3>
                            <span className="text-[10px] font-mono border border-white/30 px-1 rounded">{project.type.toUpperCase()}</span>
                        </div>
                        <p className="text-cyan-200 text-sm font-mono mb-4">{project.subtitle}</p>
                        <p className="text-white/80 text-sm leading-relaxed font-light font-sans line-clamp-3">{project.description}</p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-dashed border-white/20 flex justify-between items-center text-xs font-mono text-white/50">
                        <span>REF: {project.id.toUpperCase()}-001</span>
                        <span className="group-hover:text-white transition-colors cursor-pointer flex items-center gap-1 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                            ACCESS SCHEMATICS
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Choose icon based on type
    let TypeIcon = Code2;
    if (project.type === 'backend') TypeIcon = Database;
    if (project.type === 'mobile') TypeIcon = Cpu;
    if (project.type === 'data') TypeIcon = Layers;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="relative w-full max-w-4xl bg-[#f0f4f8] text-blue-900 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                style={{
                    backgroundImage: 'linear-gradient(#e5e9f0 1px, transparent 1px), linear-gradient(90deg, #e5e9f0 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 20px 50px -10px rgba(0,0,0,0.5)'
                }}
            >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] opacity-40 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 border border-blue-900/20 hover:bg-blue-900 hover:text-white transition-colors rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Strip / Tape */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/90 rotate-1 shadow-sm border border-yellow-200/50 flex items-center justify-center font-hand text-blue-800 z-20">
                    CONFIDENTIAL
                </div>

                {/* Left Side: Image / Visuals */}
                <div className="w-full md:w-5/12 h-64 md:h-auto bg-blue-100/50 relative border-b md:border-b-0 md:border-r border-blue-900/10 p-6 flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                        <div className="relative w-full h-full shadow-[0_0_15px_rgba(0,0,0,0.1)] rotate-2 border-4 border-white transform transition-transform hover:rotate-0 hover:scale-105 duration-500">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 ring-1 ring-black/5" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-900/5 border border-blue-900/10">
                            <TypeIcon className="w-24 h-24 text-blue-900/20" />
                        </div>
                    )}

                    {/* Technical details overlay on image section */}
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-blue-900/40">
                        FIG. 1.1<br />
                        RENDER_MODE: RAW
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col overflow-y-auto relative z-10">
                    <div className="mb-2 flex items-center gap-2 text-blue-500/80 font-mono text-xs uppercase tracking-widest">
                        <TypeIcon className="w-4 h-4" />
                        <span>Project Spec Sheet</span>
                    </div>

                    <h2 className="text-4xl font-display font-bold text-blue-900 mb-2">{project.title}</h2>
                    <h3 className="text-lg font-mono text-blue-600 mb-6 pb-4 border-b border-blue-900/10">{project.subtitle}</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wide text-blue-900/60 mb-2">Technical Description</h4>
                            <p className="font-serif text-lg leading-relaxed text-blue-900/80">
                                {project.description}
                            </p>
                        </div>

                        {project.technologies && (
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wide text-blue-900/60 mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-white border border-blue-900/10 rounded-full text-xs font-mono text-blue-700 shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-8 flex gap-4">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-900 text-white py-3 font-display uppercase tracking-widest text-sm hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                View Deployment <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <div className="text-center mb-16 relative">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    Code with Intent, <br />
                    Design with Soul.
                </h2>
                <p className="text-blue-200/70 max-w-xl mx-auto font-mono text-sm border-t border-b border-white/10 py-4">
                    A curated selection of projects blending design and engineering.
                    Scroll to explore my work where logic meets aesthetic.
                </p>

                {/* Decorative lines */}
                <div className="absolute top-1/2 left-0 w-[10%] h-px bg-white/30 hidden md:block" />
                <div className="absolute top-1/2 right-0 w-[10%] h-px bg-white/30 hidden md:block" />
            </div>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between items-center px-4 pointer-events-none z-10 hidden md:flex">
                <button
                    onClick={() => scroll('left')}
                    className="pointer-events-auto p-2 rounded-full bg-blue-950/50 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-blue-900 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="pointer-events-auto p-2 rounded-full bg-blue-950/50 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-blue-900 transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-8 px-4 md:px-12 pb-8 pt-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {PROJECTS.map(project => (
                    <div key={project.id} className="min-w-[85vw] md:min-w-[450px] snap-center">
                        <ProjectCard
                            project={project}
                            onSelect={setSelectedProject}
                        />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};