import { motion, Variants } from 'framer-motion';
import { Compass, MoveDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import resumePdf from '../assets/documents/resume.pdf';
import { useTheme } from '../contexts/ThemeContext';



const FloatingParticle: React.FC<{ delay: number }> = ({ delay }) => (
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
      left: `${Math.random() * 100}% `,
      top: `${Math.random() * 100}% `
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

interface HeroProps {
  profileImg: any;
}

export const Hero: React.FC<HeroProps> = ({ profileImg }) => {
  const { colors } = useTheme();
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
    <div className="relative w-full max-w-7xl mx-auto min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-0 py-12 lg:py-0 gap-12">

      {/* SVG Definitions */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 .4 0 0 0
                      0 1 .4 0 0
                      0 0 1 .4 0
                      1.5 1.5 1.5 0 -1"
              result="alpha-map"
            />
          </filter>

          <mask id="sketch-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            {/* Diagonal Scribble 1 */}
            <motion.path
              d="M0,0 L0.2,1 L0.4,0 L0.6,1 L0.8,0 L1,1"
              stroke="white"
              strokeWidth="0.4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            />
            {/* Horizontal Scribble */}
            <motion.path
              d="M0,0.1 L1,0.1 L0,0.3 L1,0.3 L0,0.5 L1,0.5 L0,0.7 L1,0.7 L0,0.9 L1,0.9"
              stroke="white"
              strokeWidth="0.25"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            />
            {/* Vertical Scribble */}
            <motion.path
              d="M0.1,0 L0.1,1 L0.3,0 L0.3,1 L0.5,0 L0.5,1 L0.7,0 L0.7,1 L0.9,0 L0.9,1"
              stroke="white"
              strokeWidth="0.25"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            />
          </mask>
        </defs>
      </svg>

      {/* Background Ambience Layer */}
      {mounted && (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
          {/* Shifting Gradient Blobs */}
          <motion.div
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -60, 60, 0],
              y: [0, 40, -40, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-300/10 rounded-full blur-[100px]"
          />

          {/* Floating Particles */}
          {[...Array(25)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}

          {/* Blueprint Crosshairs */}
          <Crosshair x="10%" y="20%" delay={0} />
          <Crosshair x="90%" y="10%" delay={2} />
          <Crosshair x="50%" y="90%" delay={4} />
        </div>
      )}

      {/* LEFT COLUMN: Portrait (Now Swapped to Right) - Hidden on Mobile, Visible on LG+ */}
      <div className="hidden lg:flex w-full lg:w-5/12 relative justify-center lg:justify-center order-2 lg:order-2 mt-12 lg:mt-0">
        <div className="relative w-72 h-72 md:w-[350px] md:h-[450px] lg:w-[550px] lg:h-[650px] group">
          {/* Decorative Compass behind portrait */}
          <div className="absolute -top-12 -right-12 opacity-30 animate-[spin_60s_linear_infinite]">
            <Compass className="w-32 h-32 stroke-white stroke-[0.5]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="w-full h-full relative z-10 overflow-hidden rounded-sm"
            style={{
              WebkitMask: 'url(#sketch-mask)',
              mask: 'url(#sketch-mask)',
              WebkitMaskImage: 'url(#sketch-mask)', // Fallback
              maskImage: 'url(#sketch-mask)'
            }}
          >
            {/* The Chalk Portrait */}
            <img
              src={profileImg}
              alt="Builder Portrait"
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                filter: 'url(#remove-black)',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            />
            {/* Subtle scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,99,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20"></div>
          </motion.div>

          {/* Framing Elements */}
          <div className="absolute -inset-4 border border-white/20 rounded-sm opacity-50" />
          <div className="absolute -inset-2 border-t border-b border-white/40 h-full w-full opacity-30 scale-x-110" />

          {/* Technical readout */}
          <div className="absolute -bottom-12 left-0 font-mono text-[10px] text-white/40 tracking-widest">
            <p>IMG_SRC: PROFILE_V1.0</p>
            <p>FILTER: CHALK_RENDER </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Content (Now Swapped to Left) */}
      <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-1 relative z-20">
        <div className="absolute -top-32 right-0 opacity-20 hidden lg:block">
          <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-white stroke-[0.5] fill-none animate-[spin_40s_linear_infinite]">
            <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
            <path d="M50 0 L50 100 M0 50 L100 50" />
          </svg>
        </div>

        {/* Mobile/Tablet Decorative Semi-Circle (Replaces Portrait interest) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 lg:hidden opacity-30 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_20s_linear_infinite]">
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Outer roughness */}
            <motion.path
              d="M 50, 200 C 50, 100 100, 50 200, 50 C 300, 50 350, 100 350, 200"
              stroke="url(#circleGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Inner loop */}
            <motion.path
              d="M 80, 200 C 80, 130 130, 80 200, 80 C 270, 80 320, 130 320, 200"
              stroke="white"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tighter relative z-10 leading-[0.9]"
        >
          <motion.span
            variants={textVariants}
            className="block text-transparent stroke-white"
            style={{ WebkitTextStroke: '1px white' }}
          >
            BUILDING
          </motion.span>

          <motion.span
            variants={textVariants}
            className="block text-white relative lg:left-12"
          >
            THOUGHTFUL
          </motion.span>

          <motion.span
            variants={textVariants}
            className="block text-transparent stroke-white"
            style={{ WebkitTextStroke: '1px white' }}
          >
            DIGITAL SPACES.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-xl text-lg md:text-xl font-light mb-12 leading-relaxed border-l-2 border-white/30 pl-6 relative z-10"
          style={{ color: colors.textPrimary }}
        >
          A full-stack engineer with a passion for blending <span className="font-hand text-2xl text-yellow-300 mx-1">design</span>, logic, and narrative into handcrafted user experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >

          <a href="#projects" className="px-6 py-3 bg-white/5 hover:bg-white/10 transition-colors duration-300 font-mono text-sm uppercase tracking-widest flex items-center gap-2 group">
            View Work
            <MoveDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href={resumePdf}
            download="Daksh_Lohar_Resume.pdf"
            className="relative inline-block overflow-hidden px-8 py-3 bg-transparent border-2 border-white/50 text-white/80 font-bold font-mono uppercase tracking-widest hover:bg-white transition-all group"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.dark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            <span className="relative z-10">Download Resume</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>


        </motion.div>
      </div>

    </div >
  );
};