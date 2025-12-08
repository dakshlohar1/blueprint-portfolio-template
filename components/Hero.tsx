import React, { useEffect, useState } from 'react';
import { MoveDown, Compass } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: -100, 
      opacity: [0, 0.8, 0], // Increased opacity for visibility
    }}
    transition={{
      duration: Math.random() * 5 + 10,
      repeat: Infinity,
      delay: delay,
      ease: "linear"
    }}
    className="absolute w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]" // Increased size and opacity
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  />
);

const Crosshair = ({ x, y, delay }: { x: string, y: string, delay: number }) => (
    <motion.div
        className="absolute w-8 h-8 text-white/40 pointer-events-none" // Increased opacity
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0], scale: 1, rotate: 90 }}
        transition={{
            duration: 5,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
    >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-current" />
        <div className="absolute inset-0 border border-current rounded-full opacity-50 scale-50" />
    </motion.div>
);

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number]
      }
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto text-center flex flex-col items-center py-12 md:py-20">
      
      {/* Background Ambience Layer */}
      {mounted && (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
            {/* Shifting Gradient Blobs - Increased Opacity & Size */}
            <motion.div 
                animate={{ 
                    x: [0, 50, -50, 0], 
                    y: [0, -30, 30, 0],
                    opacity: [0.2, 0.4, 0.2] // More visible
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[120px]"
            />
            <motion.div 
                animate={{ 
                    x: [0, -60, 60, 0], 
                    y: [0, 40, -40, 0],
                    opacity: [0.2, 0.3, 0.2] // More visible
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-[100px]"
            />

            {/* Floating Particles */}
            {[...Array(25)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.2} />
            ))}

            {/* Blueprint Crosshairs */}
            <Crosshair x="10%" y="20%" delay={0} />
            <Crosshair x="90%" y="10%" delay={2} />
            <Crosshair x="20%" y="80%" delay={4} />
            <Crosshair x="80%" y="70%" delay={1} />
            <Crosshair x="50%" y="95%" delay={3} />
            
            {/* The Big Swoosh Curve */}
            <div className="absolute top-[-100px] left-[-100px] right-[-100px] bottom-[-100px] flex items-center justify-center">
                <svg className="w-full h-full max-w-6xl opacity-50" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <motion.path 
                        d="M 200 100 C 100 300 50 600 250 700 C 550 800 900 650 900 350 C 900 150 700 50 500 100 C 350 140 300 200 300 200"
                        stroke="white" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="10 10" // Slight dashed line for schematic feel
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    />
                </svg>
            </div>
        </div>
      )}

      {/* Decorative Compass (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-20 -right-4 md:right-0 opacity-60" // Increased visibility
      >
        <div className="animate-[spin_120s_linear_infinite]">
          <svg width="150" height="150" viewBox="0 0 100 100" className="stroke-white stroke-[0.5] fill-none">
            <circle cx="50" cy="50" r="45" strokeDasharray="4 2" />
            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" />
            <text x="50" y="20" fontSize="8" fill="white" textAnchor="middle" fontFamily="monospace">N</text>
            <text x="80" y="52" fontSize="8" fill="white" textAnchor="middle" fontFamily="monospace">E</text>
            <text x="50" y="85" fontSize="8" fill="white" textAnchor="middle" fontFamily="monospace">S</text>
            <text x="20" y="52" fontSize="8" fill="white" textAnchor="middle" fontFamily="monospace">W</text>
          </svg>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mb-8 font-mono text-cyan-300 text-sm tracking-[0.2em] uppercase border-b border-cyan-300/30 pb-2 inline-block relative z-10"
      >
        Technical Portfolio
      </motion.div>

      <motion.h1 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tighter relative z-10 leading-[0.85] flex flex-col items-center"
      >
        <motion.span 
            variants={textVariants} 
            className="block text-transparent stroke-white" 
            style={{ WebkitTextStroke: '1px white' }} // Thinner stroke for outline
        >
            BUILDING
        </motion.span>
        
        <motion.span 
            variants={textVariants} 
            className="block text-white relative scale-110 origin-center my-2" // Solid white, slightly larger
        >
           THOUGHTFUL
        </motion.span>
        
        <motion.span 
            variants={textVariants} 
            className="block text-transparent stroke-white" 
            style={{ WebkitTextStroke: '1px white' }} // Thinner stroke
        >
            DIGITAL SPACES.
        </motion.span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="max-w-2xl text-lg md:text-xl font-light text-blue-100 mb-12 leading-relaxed border-l-2 border-white/30 pl-6 text-left mx-auto md:mx-0 relative z-10 bg-blue-900/10 backdrop-blur-[2px] p-4 rounded-r-lg" // Added slight bg for readability
      >
        A full-stack engineer with a passion for blending <span className="font-hand text-2xl text-yellow-300 relative top-1">design</span>, logic, and narrative into handcrafted user experiences.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="mt-8 flex flex-col items-center gap-2 animate-pulse relative z-10"
      >
        <span className="text-[10px] uppercase border px-2 py-0.5 border-white/30">Scroll to Initiate</span>
        <MoveDown className="w-5 h-5" />
      </motion.div>
    </div>
  );
};