import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { colors, mode } = useTheme();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const [isHovered, setIsHovered] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-8 right-8 z-[90] flex items-center justify-center pointer-events-none">
                    {/* Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: -10, scale: 1 }}
                                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                                className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-xs font-bold font-mono uppercase tracking-widest rounded-sm whitespace-nowrap"
                            >
                                Back to Top
                                {/* Tiny triangle pointer */}
                                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={scrollToTop}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative w-12 h-12 flex items-center justify-center pointer-events-auto group cursor-pointer"
                    >
                        {/* Drawing Circle Border */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="22"
                                stroke={mode === 'dark' ? colors.accentDark : colors.grid}
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ pathLength: 0, opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="backdrop-blur-sm fill-blueprint-bg fill-opacity-20"
                            />
                        </svg>

                        {/* Inner Content Container */}
                        <div className="relative w-full h-full flex items-center justify-center">

                            {/* Glowing Dot (Visible when NOT hovered) */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isHovered ? 0 : 1,
                                    opacity: isHovered ? 0 : 1
                                }}
                                transition={{ duration: 0.3 }}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                style={{
                                    boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
                                }}
                            />

                            {/* Arrow (Visible when Hovered) */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0, y: 5 }}
                                animate={{
                                    scale: isHovered ? 1 : 0,
                                    opacity: isHovered ? 1 : 0,
                                    y: isHovered ? 0 : 5
                                }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute"
                            >
                                <ArrowUp className="w-5 h-5 text-white" />
                            </motion.div>

                        </div>
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
};
