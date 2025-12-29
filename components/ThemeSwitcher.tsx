import React from 'react';
import { useTheme, THEME_COLORS, THEME_NAMES, ThemeColor } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const colors = THEME_COLORS[theme];
    const [isHovered, setIsHovered] = React.useState(false);

    const themes: ThemeColor[] = ['blue', 'red', 'purple', 'amber', 'green'];
    const currentIndex = themes.indexOf(theme);

    const size = 120; // Total height
    const radius = size / 2; // Radius of semi-circle
    const centerX = radius; // Center is now at radius distance from left
    const centerY = size / 2; // Vertical center

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
            <div className="relative" style={{ width: `${radius + 20}px`, height: `${size}px` }}>

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
                        stroke={colors.grid}
                        strokeWidth="3"
                        opacity="0.6"
                    />

                    {/* Filled center semi-circle - facing left */}
                    <motion.path
                        d={`M ${radius + 20} ${centerY - 30} A 30 30 0 0 0 ${radius + 20} ${centerY + 30}`}
                        fill={colors.grid}
                        stroke="white"
                        strokeWidth="3"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                        key={theme}
                        style={{
                            transformOrigin: `${radius + 20}px ${centerY}px`,
                            filter: `drop-shadow(0 0 10px ${colors.grid})`
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

                    const isActive = themeOption === theme

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
                                        backgroundColor: THEME_COLORS[themeOption].grid,
                                        boxShadow: isActive
                                            ? `0 0 20px ${THEME_COLORS[themeOption].grid}`
                                            : '0 2px 4px rgba(0,0,0,0.2)',
                                        border: `2px solid ${isActive ? 'white' : 'rgba(255,255,255,0.5)'}`
                                    }}
                                />

                                {/* Tooltip */}
                                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    <div
                                        className="px-3 py-1.5 rounded text-xs font-mono font-bold text-white shadow-lg"
                                        style={{ backgroundColor: colors.dark }}
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
                        backgroundColor: colors.grid,
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
                        style={{ backgroundColor: colors.grid, boxShadow: `0 0 8px ${colors.grid}` }}
                    />
                </motion.div>

                {/* Label */}
                <div className="absolute right-2 -bottom-6 text-right">
                    <div
                        className="text-[9px] font-mono tracking-widest opacity-70 font-bold"
                        style={{ color: colors.grid }}
                    >
                        THEME
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
