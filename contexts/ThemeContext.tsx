import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeColor = 'blue' | 'red' | 'purple' | 'amber' | 'green';

export interface ThemeColors {
    bg: string;
    dark: string;
    grid: string;
    textPrimary: string;
    textSecondary: string;
}

export const THEME_COLORS: Record<ThemeColor, ThemeColors> = {
    blue: {
        bg: '#004ecb',
        dark: '#003399',
        grid: '#3b82f6',
        textPrimary: '#e0f2fe',  // Light blue for primary text
        textSecondary: '#93c5fd', // Medium blue for secondary text
    },
    red: {
        bg: '#b91c1c',
        dark: '#7f1d1d',
        grid: '#ef4444',
        textPrimary: '#fee2e2',  // Light red/pink for primary text
        textSecondary: '#fca5a5', // Medium red for secondary text
    },
    purple: {
        bg: '#6b21a8',
        dark: '#581c87',
        grid: '#a78bfa',
        textPrimary: '#f3e8ff',  // Light purple for primary text
        textSecondary: '#d8b4fe', // Medium purple for secondary text
    },
    amber: {
        bg: '#b45309',
        dark: '#92400e',
        grid: '#fbbf24',
        textPrimary: '#fef3c7',  // Light amber for primary text
        textSecondary: '#fde68a', // Medium amber for secondary text
    },
    green: {
        bg: '#065f46',
        dark: '#064e3b',
        grid: '#34d399',
        textPrimary: '#d1fae5',  // Light green for primary text
        textSecondary: '#6ee7b7', // Medium green for secondary text
    },
};

export const THEME_NAMES: Record<ThemeColor, string> = {
    blue: 'Classic Blue',
    red: 'Red Blueprint',
    purple: 'Purple Blueprint',
    amber: 'Amber Blueprint',
    green: 'Green Blueprint',
};

interface ThemeContextType {
    theme: ThemeColor;
    setTheme: (theme: ThemeColor) => void;
    colors: ThemeColors;
    isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeColor>(() => {
        // Load theme from localStorage or default to blue
        const savedTheme = localStorage.getItem('blueprint-theme');
        return (savedTheme as ThemeColor) || 'blue';
    });

    const [isTransitioning, setIsTransitioning] = useState(false);

    const colors = THEME_COLORS[theme];

    const setTheme = (newTheme: ThemeColor) => {
        if (newTheme === theme) return; // Don't transition if same theme

        // Start blink transition
        setIsTransitioning(true);

        // Quick fade out
        setTimeout(() => {
            setThemeState(newTheme);
            localStorage.setItem('blueprint-theme', newTheme);
        }, 150); // Change theme at the middle of the blink

        // Fade back in
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300); // Total transition duration
    };

    // Apply theme colors to CSS variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--blueprint-bg', colors.bg);
        root.style.setProperty('--blueprint-dark', colors.dark);
        root.style.setProperty('--blueprint-grid', colors.grid);
    }, [colors]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, colors, isTransitioning }}>
            {children}

            {/* Eye-blink overlay - fades to black during theme transition */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: '#000000',
                    opacity: isTransitioning ? 1 : 0,
                    transition: 'opacity 150ms ease-in-out',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            />
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
