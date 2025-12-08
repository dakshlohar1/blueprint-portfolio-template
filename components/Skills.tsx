import React, { useState } from 'react';
import { SKILLS } from '../constants';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-display font-bold border-b-2 border-dashed border-white/30 pb-2 px-8 mb-4">
          Skills & Tooling
        </h2>
        <div className="flex items-center gap-2 bg-blue-900/50 border border-white/30 rounded-full px-4 py-1 text-xs font-mono animate-pulse">
           <Icons.Hand className="w-3 h-3" />
           Try dragging things around to see what happens.
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto p-8 border border-white/20 bg-blue-900/10 relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />

        {SKILLS.map((skill, i) => {
          // Dynamic Icon component
          const IconComponent = (Icons as any)[skill.iconName] || Icons.Code;

          return (
            <motion.div
              key={skill.id}
              drag
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
              whileHover={{ scale: 1.1, rotate: 2, zIndex: 10 }}
              whileDrag={{ scale: 1.2, zIndex: 20, cursor: 'grabbing' }}
              className="aspect-square bg-white relative shadow-lg cursor-grab group select-none"
              style={{ rotate: Math.random() * 4 - 2 }}
            >
               {/* Tape effect */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-sm rotate-1 border-l border-r border-white/10" style={{ clipPath: 'polygon(0% 10%, 5% 0%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0% 90%)' }}></div>

               {/* Sticker Content */}
               <div className="absolute inset-2 border border-blue-100 flex flex-col items-center justify-center p-2">
                   <div className="absolute top-1 right-1 text-[8px] text-blue-900/40 font-mono">CHIP-{i+1}</div>
                   
                   <IconComponent strokeWidth={1.5} className="w-10 h-10 text-blue-900 mb-3" />
                   
                   <span className="text-blue-900 font-bold font-display text-sm uppercase tracking-tight">{skill.name}</span>
                   
                   {/* Blueprint lines inside sticker */}
                   <div className="absolute bottom-2 left-2 right-2 h-px bg-blue-200" />
                   <div className="absolute bottom-1 right-2 text-[6px] text-blue-400 font-mono">{skill.category.toUpperCase()}</div>
               </div>
            </motion.div>
          );
        })}

        {/* The 'Docker' / Broken one from example - styling specifically if it's docker or just adding a decorative one */}
        <div className="absolute right-4 bottom-4 w-32 hidden lg:block">
            <p className="font-hand text-white text-sm rotate-[-5deg] text-center">
                Engineering is just fixing invisible things.
            </p>
            <svg className="w-full h-8 stroke-white fill-none stroke-2 mt-2" viewBox="0 0 100 20">
                <path d="M0 10 Q 50 20 90 5" markerEnd="url(#arrowhead)" />
            </svg>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6 text-xs font-mono text-white/60">
         <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white/20 border border-white/50" /> Frontend
         </span>
         <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white/20 border border-white/50" /> Backend
         </span>
         <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white/20 border border-white/50" /> Tooling
         </span>
      </div>
    </div>
  );
};
