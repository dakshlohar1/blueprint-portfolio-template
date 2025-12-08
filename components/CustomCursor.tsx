import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring config for that smooth "proper velocity" feel
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Main Pointer (Exact Position) - The "Ink" tip */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Trailing Lens (Spring Physics) - The "Magnifier" */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center border border-white/60 rounded-full"
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          // Use backdrop filters to create the "magnification" or "glass" effect
          backdropFilter: "brightness(1.2) contrast(1.1) blur(0.5px)",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Decorative Compass/Scope Markings */}
        <div className="absolute top-0 w-[1px] h-2 bg-white/40" />
        <div className="absolute bottom-0 w-[1px] h-2 bg-white/40" />
        <div className="absolute left-0 h-[1px] w-2 bg-white/40" />
        <div className="absolute right-0 h-[1px] w-2 bg-white/40" />

        {/* Subtle inner ring */}
        <div className="absolute inset-1 border border-dashed border-white/20 rounded-full opacity-50 animate-[spin_10s_linear_infinite]" />
      </motion.div>
    </>
  );
};