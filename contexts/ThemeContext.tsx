import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeColor = 'blue' | 'red' | 'purple' | 'amber' | 'green';
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
    bg: string;
    dark: string;
    grid: string;
    textPrimary: string;
    textSecondary: string;
    // Dark mode variants
    bgDark: string;
    surfaceDark: string;
    accentDark: string;
}

export const THEME_COLORS: Record<ThemeColor, ThemeColors> = {
    blue: {
        // Light mode colors
        bg: '#004ecb',
        dark: '#003399',
        grid: '#3b82f6',
        textPrimary: '#e0f2fe',
        textSecondary: '#93c5fd',
        // Dark mode colors
        bgDark: '#0a0a0a',
        surfaceDark: '#1a1a2e',
        accentDark: '#3b82f6',
    },
    red: {
        // Light mode colors
        bg: '#b91c1c',
        dark: '#7f1d1d',
        grid: '#ef4444',
        textPrimary: '#fee2e2',
        textSecondary: '#fca5a5',
        // Dark mode colors
        bgDark: '#0a0a0a',
        surfaceDark: '#2a1a1a',
        accentDark: '#ef4444',
    },
    purple: {
        // Light mode colors
        bg: '#6b21a8',
        dark: '#581c87',
        grid: '#a78bfa',
        textPrimary: '#f3e8ff',
        textSecondary: '#d8b4fe',
        // Dark mode colors
        bgDark: '#0a0a0a',
        surfaceDark: '#1a1a2a',
        accentDark: '#a78bfa',
    },
    amber: {
        // Light mode colors
        bg: '#b45309',
        dark: '#92400e',
        grid: '#fbbf24',
        textPrimary: '#fef3c7',
        textSecondary: '#fde68a',
        // Dark mode colors
        bgDark: '#0a0a0a',
        surfaceDark: '#2a2a1a',
        accentDark: '#fbbf24',
    },
    green: {
        // Light mode colors
        bg: '#065f46',
        dark: '#064e3b',
        grid: '#34d399',
        textPrimary: '#d1fae5',
        textSecondary: '#6ee7b7',
        // Dark mode colors
        bgDark: '#0a0a0a',
        surfaceDark: '#1a2a1a',
        accentDark: '#34d399',
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
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
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

    const [mode, setModeState] = useState<ThemeMode>(() => {
        // Load mode from localStorage or default to light
        const savedMode = localStorage.getItem('blueprint-mode');
        return (savedMode as ThemeMode) || 'light';
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

    const setMode = (newMode: ThemeMode) => {
        if (newMode === mode) return;

        // Start blink transition
        setIsTransitioning(true);

        // Quick fade out
        setTimeout(() => {
            setModeState(newMode);
            localStorage.setItem('blueprint-mode', newMode);
        }, 150);

        // Fade back in
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    };

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    // Apply theme colors to CSS variables based on mode
    useEffect(() => {
        const root = document.documentElement;

        if (mode === 'light') {
            root.style.setProperty('--blueprint-bg', colors.bg);
            root.style.setProperty('--blueprint-dark', colors.dark);
            root.style.setProperty('--blueprint-grid', colors.grid);
        } else {
            // Dark mode uses dark backgrounds with accent colors
            root.style.setProperty('--blueprint-bg', colors.bgDark);
            root.style.setProperty('--blueprint-dark', colors.surfaceDark);
            root.style.setProperty('--blueprint-grid', colors.accentDark);
        }
    }, [colors, mode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, toggleMode, colors, isTransitioning }}>
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
