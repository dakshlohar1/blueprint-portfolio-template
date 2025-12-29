import React from 'react';
import { useTheme, THEME_COLORS, THEME_NAMES, ThemeColor } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme, mode, toggleMode } = useTheme();
    const colors = THEME_COLORS[theme];
    const [isHovered, setIsHovered] = React.useState(false);

    const themes: ThemeColor[] = ['blue', 'red', 'purple', 'amber', 'green'];
    const currentIndex = themes.indexOf(theme);

    const size = 120; // Total height
    const radius = size / 2; // Radius of semi-circle
    const centerX = radius; // Center is now at radius distance from left
    const centerY = size / 2; // Vertical center

    // Get current mode colors
    const currentBg = mode === 'light' ? colors.bg : colors.bgDark;
    const currentGrid = mode === 'light' ? colors.grid : colors.accentDark;

    return (
        <motion.div
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                x: isHovered ? 0 : radius + 15,
                opacity: isHovered ? 1 : 0.2
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
        >
            <div className="relative" style={{ width: `${radius + 20}px`, height: `${size + 40}px` }}>

                {/* SVG Semi-Circle */}
                <svg
                    width={radius + 20}
                    height={size}
                    className="absolute right-0 top-0"
                    style={{ overflow: 'visible' }}
                >
                    {/* Outer semi-circle border - facing left */}
                    <path
                        d={`M ${radius} 0 A ${radius} ${radius} 0 0 0 ${radius} ${size}`}
                        fill="none"
                        stroke={currentGrid}
                        strokeWidth="3"
                        opacity="0.6"
                    />

                    {/* Filled center semi-circle - facing left */}
                    <motion.path
                        d={`M ${radius + 20} ${centerY - 30} A 30 30 0 0 0 ${radius + 20} ${centerY + 30}`}
                        fill={currentGrid}
                        stroke="white"
                        strokeWidth="3"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                        key={theme + mode}
                        style={{
                            transformOrigin: `${radius + 20}px ${centerY}px`,
                            filter: `drop-shadow(0 0 10px ${currentGrid})`
                        }}
                    />
                </svg>

                {/* Theme Option Circles Along Arc */}
                {themes.map((themeOption, index) => {
                    // Position along the arc
                    const totalThemes = themes.length;
                    const angleStep = Math.PI / (totalThemes - 1);
                    const angle = -Math.PI / 2 + (index * angleStep);

                    // Calculate position - now x goes to the left (negative) from center
                    const x = centerX - Math.cos(angle) * (radius); // Subtract to go left
                    const y = centerY + Math.sin(angle) * (radius);

                    const isActive = themeOption === theme;
                    const optionColor = mode === 'light' ? THEME_COLORS[themeOption].grid : THEME_COLORS[themeOption].accentDark;

                    return (
                        <div
                            key={themeOption}
                            className="absolute"
                            style={{
                                left: `${x}px`,
                                top: `${y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <motion.button
                                onClick={() => setTheme(themeOption)}
                                className="relative group"
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.85 }}
                            >
                                <div
                                    className={`w-7 h-7 rounded-full transition-all duration-300 ${isActive ? 'ring-2 ring-white ring-offset-2' : ''
                                        }`}
                                    style={{
                                        backgroundColor: optionColor,
                                        boxShadow: isActive
                                            ? `0 0 20px ${optionColor}`
                                            : '0 2px 4px rgba(0,0,0,0.2)',
                                        border: `2px solid ${isActive ? 'white' : 'rgba(255,255,255,0.5)'}`
                                    }}
                                />

                                {/* Tooltip */}
                                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    <div
                                        className="px-3 py-1.5 rounded text-xs font-mono font-bold text-white shadow-lg"
                                        style={{ backgroundColor: mode === 'light' ? colors.dark : colors.surfaceDark }}
                                    >
                                        {THEME_NAMES[themeOption]}
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    );
                })}

                {/* Active Indicator Line */}
                <motion.div
                    className="absolute"
                    style={{
                        right: '0px',
                        top: `${centerY}px`,
                        width: `${radius - 20}px`,
                        height: '2px',
                        transformOrigin: 'right center',
                        backgroundColor: currentGrid,
                        opacity: 0.8
                    }}
                    animate={{
                        rotate: 90 - (currentIndex / (themes.length - 1)) * 180
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                    }}
                >
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentGrid, boxShadow: `0 0 8px ${currentGrid}` }}
                    />
                </motion.div>

                {/* Dark/Light Mode Toggle Button */}
                <motion.button
                    onClick={toggleMode}
                    className="absolute right-2 group"
                    style={{ top: `${size + 5}px` }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                            backgroundColor: currentGrid,
                            boxShadow: `0 0 15px ${currentGrid}`,
                            border: '2px solid white'
                        }}
                    >
                        {mode === 'light' ? (
                            // Sun icon
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="12" y1="21" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="1" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="21" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            // Moon icon
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </div>

                    {/* Tooltip for mode toggle */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        <div
                            className="px-3 py-1.5 rounded text-xs font-mono font-bold text-white shadow-lg"
                            style={{ backgroundColor: mode === 'light' ? colors.dark : colors.surfaceDark }}
                        >
                            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </div>
                    </div>
                </motion.button>

                {/* Label */}
                <div className="absolute right-2 text-right" style={{ top: `${size + 40}px` }}>
                    <div
                        className="text-[9px] font-mono tracking-widest opacity-70 font-bold"
                        style={{ color: currentGrid }}
                    >
                        THEME
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
