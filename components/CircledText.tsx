import React from 'react';

interface CircledTextProps {
    children: React.ReactNode;
    className?: string;
    lineColor?: string;
}

export const CircledText: React.FC<CircledTextProps> = ({
    children,
    className = "",
    lineColor = "rgba(255,255,255,0.5)"
}) => {
    return (
        <span className={`relative inline-block decoration-clone ${className}`}>
            {/* The Text */}
            <span className="relative z-10">{children}</span>

            {/* The Circle SVG */}
            <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[150%] pointer-events-none overflow-visible"
                viewBox="0 0 120 60"
                preserveAspectRatio="none"
            >
                {/* 
            Path creates a rough oval/circle shape. 
            Using a path similar to the original but designed to stretch well.
         */}
                <path
                    d="M 10 30 Q 10 5 60 5 Q 110 5 110 30 Q 110 55 60 55 Q 10 55 10 30"
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-80"
                />
            </svg>
        </span>
    );
};
