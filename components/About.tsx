import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { CircledText } from './CircledText';
import resumePdf from '../assets/documents/dakshlohar-resume-latest.pdf';


export const About: React.FC = () => {
   const [showMicro, setShowMicro] = useState(false);
   const [showEmpathy, setShowEmpathy] = useState(false);

   return (
      <div className="max-w-4xl mx-auto relative px-6 md:px-0">
         <div className="text-center mb-20 relative">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-snug">
               Code is a conversation. <br />
               Design is the language.
            </h2>

            <p className="text-xl font-light leading-relaxed max-w-2xl mx-auto relative z-10">
               Exploring the intersection of <CircledText className="mx-1 group pt-1">
                  Problem splitter
               </CircledText> and thoughtful design to build experiences that feel intuitive, delightful, and trustworthy.
            </p>

         </div>

         <div className="space-y-16">
            <div className="group relative pl-8 border-l border-dashed border-white/30 hover:border-white transition-colors">
               <h3 className="text-2xl font-bold font-display mb-4 flex items-center gap-3">
                  The Blend: Design & Engineering
               </h3>
               <p className="text-blue-100/80 leading-relaxed font-sans">
                  I believe the most impactful digital experiences are born from a dual-minded approach. It's not just about writing clean, efficient code; it's about understanding the human on the other side of the screen. By blending the logical precision of engineering with the empathetic creativity of <span
                     className="relative cursor-pointer underline decoration-white/30 hover:decoration-white transition-all"
                     onClick={() => setShowEmpathy(!showEmpathy)}
                  >
                     design
                     {showEmpathy && (
                        <span className="bg-white/10 backdrop-blur-sm font-hand text-yellow-300 absolute top-6 left-1 rotate-[-2deg] whitespace-nowrap">
                           (and empathy)
                        </span>
                     )}
                  </span>, I create solutions that are not only powerful under the hood but also a joy to use.
               </p>
            </div>

            <div className="group relative pl-8 border-l border-dashed border-white/30 hover:border-white transition-colors">
               <div className="absolute -left-3 top-0 bg-blueprint-bg p-1 border border-white">
                  <svg className="w-4 h-4 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
               </div>
               <h3 className="text-2xl font-bold font-display mb-4">
                  Crafting Delight
               </h3>
               <p className="text-blue-100/80 leading-relaxed font-sans">
                  Delight isn't a feature; it's a feeling. It's found in the seamless <span
                     className="relative cursor-pointer underline decoration-white/30 hover:decoration-white transition-all"
                     onClick={() => setShowMicro(!showMicro)}
                  >
                     micro-interactions
                  </span>, the clarity of a well-structured layout, and the confidence a user feels when an application just works. My focus is on these details—the small moments that transform a functional tool into a memorable experience.
               </p>

               {showMicro && (
                  <div className="bg-white/20 backdrop-blur-sm absolute right-0 top-0 border border-white/40 p-2 text-xs font-mono rotate-2 animate-in fade-in zoom-in duration-200 shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
                     You don't have to rush. I won't.
                  </div>
               )}
            </div>

            <div className="group relative pl-8 border-l border-dashed border-white/30 hover:border-white transition-colors">
               <h3 className="text-2xl font-bold font-display mb-4">
                  Building Trust
               </h3>
               <p className="text-blue-100/80 leading-relaxed font-sans">
                  Trust is the foundation of any great product. It's earned through reliability, performance, and transparency. For me, this translates into writing scalable, maintainable code, prioritizing security, and building systems that are as robust as they are elegant.
               </p>
            </div>
         </div>

         <div className="mt-24 text-center border-t border-white/20 pt-16 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blueprint-bg px-4 text-sm font-mono text-white/50">SECTION 03 // END</div>

            <h3 className="text-3xl font-display mb-6">Ready to build something together?</h3>
            <p className="mb-8 text-blue-200">I'm always curious to learn about new challenges.</p>

            <a href="#contact" className="relative inline-block overflow-hidden px-8 py-3 bg-transparent border-2 border-white text-white font-bold font-mono uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all group">
               <span className="relative z-10">Let's Talk</span>
               <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>

            <a href={resumePdf} download="Daksh_Lohar_Resume.pdf" className="relative inline-block overflow-hidden px-8 py-3 bg-transparent border-2 border-white/50 text-white/80 font-bold font-mono uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all group ml-4">
               <span className="relative z-10">Download Resume</span>
               <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>

            <div className="flex justify-center gap-6 mt-12">
               {[
                  { Icon: Github, href: "https://github.com/dakshlohar1", label: "GitHub" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/daksh-lohar-7001a31b6/", label: "LinkedIn" },
                  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { Icon: Mail, href: "mailto:hello@dakshlohar.com", label: "Email" }
               ].map(({ Icon, href, label }) => (
                  <a
                     key={label}
                     href={href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-3 border border-white/30 rounded-full hover:bg-white hover:text-blue-900 hover:border-white transition-all duration-300 group relative"
                     aria-label={label}
                  >
                     <Icon className="w-5 h-5" />
                     <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-white text-blue-900 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {label}
                     </span>
                  </a>
               ))}
            </div>
         </div>
      </div>
   );
};
