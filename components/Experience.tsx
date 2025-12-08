import React, { useState } from 'react';
import { EXPERIENCE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

export const Experience: React.FC = () => {
    const [selectedId, setSelectedId] = useState(EXPERIENCE[0].id);
    const selectedJob = EXPERIENCE.find(e => e.id === selectedId) || EXPERIENCE[0];

    return (
        <div className="max-w-6xl mx-auto px-4 relative">
             {/* Section Header */}
             <div className="mb-16 flex items-end gap-6 border-b border-white/20 pb-4">
                <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold">TIMELINE</h2>
                    <p className="font-mono text-sm text-cyan-300 mt-2">// PROFESSIONAL_TRAJECTORY_LOG</p>
                </div>
                {/* Decorative circuit lines */}
                <div className="flex-1 h-px bg-white/20 relative hidden md:block">
                     <div className="absolute right-0 bottom-0 w-2 h-2 bg-white/50" />
                     <div className="absolute right-4 bottom-0 w-px h-4 bg-white/20" />
                     <div className="absolute right-8 bottom-0 w-px h-6 bg-white/20" />
                </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* Timeline Column (Left) */}
                <div className="w-full lg:w-1/3 relative">
                    {/* Vertical schematic line */}
                    <div className="absolute left-[19px] top-2 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/20 to-transparent border-l border-dashed border-white/30" />

                    <div className="space-y-12 relative z-10">
                        {EXPERIENCE.map((exp) => (
                            <div
                                key={exp.id}
                                onClick={() => setSelectedId(exp.id)}
                                className="group relative pl-12 cursor-pointer"
                            >
                                {/* Node */}
                                <div 
                                    className={`absolute left-[13px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10
                                    ${selectedId === exp.id 
                                        ? 'bg-cyan-300 border-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.6)] scale-110' 
                                        : 'bg-blueprint-bg border-white/40 group-hover:border-white'}`} 
                                >
                                    {selectedId === exp.id && (
                                        <motion.div 
                                            layoutId="active-glow"
                                            className="absolute -inset-2 rounded-full border border-cyan-300/30 animate-ping" 
                                        />
                                    )}
                                </div>
                                
                                {/* Connector Line (Horizontal) when active */}
                                <div className={`absolute left-[26px] top-3 h-px bg-cyan-300/50 transition-all duration-300 ${selectedId === exp.id ? 'w-8 opacity-100' : 'w-0 opacity-0'}`} />

                                <div className={`transition-all duration-300 ${selectedId === exp.id ? 'translate-x-4 opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                                    <h3 className={`font-display text-xl font-bold leading-none mb-1 ${selectedId === exp.id ? 'text-white' : 'text-white/80'}`}>
                                        {exp.company}
                                    </h3>
                                    <p className="font-mono text-xs text-cyan-200 tracking-wider mb-1">{exp.period}</p>
                                    <p className="font-sans text-sm text-white/60">{exp.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail Panel (Right) */}
                <div className="flex-1 min-h-[450px] relative">
                    {/* Connector visual from left to right (Desktop only) */}
                    <svg className="absolute -left-16 top-8 w-16 h-full pointer-events-none hidden lg:block overflow-visible stroke-cyan-300/30 fill-none">
                         <path d="M 0 0 L 30 0 L 60 20" strokeDasharray="4 2" />
                         <circle cx="60" cy="20" r="2" fill="cyan" />
                    </svg>

                    <AnimatePresence mode="wait">
                         <motion.div
                            key={selectedJob.id}
                            initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="relative h-full border border-white/20 bg-blue-900/10 backdrop-blur-sm p-6 md:p-8 overflow-hidden"
                         >
                            {/* Background Grid for the Card */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                            
                            {/* Decorative Tape */}
                            <div className="absolute -right-8 top-8 rotate-45 bg-yellow-300/10 border border-yellow-300/40 text-yellow-300 text-[10px] font-mono px-12 py-1 shadow-sm">
                                CLASSIFIED
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/60" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/60" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/60" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/60" />

                            {/* Header Info */}
                            <div className="flex items-start justify-between mb-8 border-b border-dashed border-white/20 pb-6 relative">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Terminal className="w-4 h-4 text-cyan-300" />
                                        <span className="font-mono text-xs text-cyan-300">EXEC_ROLE: {selectedJob.id.toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{selectedJob.role}</h3>
                                    <div className="font-hand text-xl text-white/60">@ {selectedJob.company}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="relative mb-8">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10" />
                                <ul className="space-y-4 pl-6">
                                    {selectedJob.description.map((item, idx) => (
                                        <li key={idx} className="text-white/80 font-light leading-relaxed relative">
                                            <span className="absolute -left-6 top-2.5 w-1.5 h-1.5 bg-cyan-300/50 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech Stack Footer */}
                            <div className="mt-auto">
                                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-white/40 uppercase tracking-widest">
                                    <Cpu className="w-3 h-3" />
                                    Technology Matrix
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedJob.technologies.map(tech => (
                                        <span 
                                            key={tech} 
                                            className="text-xs font-mono border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors px-3 py-1.5 rounded-sm text-cyan-100"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                         </motion.div>
                    </AnimatePresence>
                </div>
             </div>
        </div>
    );
};