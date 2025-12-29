import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { CircledText } from './CircledText';


export const About: React.FC = () => {
   const { colors } = useTheme();
   const [showMicro, setShowMicro] = useState(false);
   const [showEmpathy, setShowEmpathy] = useState(false);

   return (
      <div className="max-w-4xl mx-auto relative px-6 md:px-0">
         <div className="text-center mb-20 relative">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-snug">
               Software Engineer & <br />
               AI Systems Architect
            </h2>

            <p className="text-xl font-light leading-relaxed max-w-3xl mx-auto relative z-10">
               Software Engineer with over <CircledText className="mx-1 group pt-1">5 years</CircledText> of experience building and scaling web and mobile applications, AI agents, and data-driven workflows.
            </p>

         </div>

         <div className="space-y-16">
            <div className="group relative pl-8 border-l border-dashed border-white/30 hover:border-white transition-colors">
               <div className="absolute -left-3 top-0 bg-blueprint-bg p-1 border border-white">
                  <svg className="w-4 h-4 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
               </div>
               <h3 className="text-2xl font-bold font-display mb-4 flex items-center gap-3">
                  Full Stack & AI Focused
               </h3>
               <p className="leading-relaxed font-sans" style={{ color: colors.textPrimary }}>
                  Strong background in frontend development, backend APIs, microservices architecture, and database systems (SQL, NoSQL, Vector). Experienced in Retrieval-Augmented Generation (RAG) pipelines, Generative AI integrations, CI/CD automation, and production infrastructure monitoring.
               </p>
            </div>

            <div className="group relative pl-8 border-l border-dashed border-white/30 hover:border-white transition-colors">
               <div className="absolute -left-3 top-0 bg-blueprint-bg p-1 border border-white">
                  <svg className="w-4 h-4 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
               </div>
               <h3 className="text-2xl font-bold font-display mb-4">
                  System Design & Performance
               </h3>
               <p className="leading-relaxed font-sans" style={{ color: colors.textPrimary }}>
                  Focused on system design, performance optimization, and reliable, scalable delivery. Whether it's architecting <span
                     className="relative cursor-pointer underline decoration-white/30 hover:decoration-white transition-all"
                     onClick={() => setShowMicro(!showMicro)}
                  >
                     microservices
                  </span> or fine-tuning AI models, I prioritize efficiency and robustness.
               </p>

               {showMicro && (
                  <div className="bg-white/20 backdrop-blur-sm absolute right-0 top-0 border border-white/40 p-2 text-xs font-mono rotate-2 animate-in fade-in zoom-in duration-200 shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
                     Scalable & Resilient.
                  </div>
               )}
            </div>
         </div>

      </div>
   );
};
