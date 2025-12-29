import React, { useEffect, useState } from 'react';

const LeftRuler: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrollY(window.scrollY);
      setWindowHeight(window.innerHeight);
      ticking = false;
    };

    const handleEvent = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Initial measure
    update();

    window.addEventListener('scroll', handleEvent, { passive: true });
    window.addEventListener('resize', handleEvent, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleEvent);
      window.removeEventListener('resize', handleEvent);
    };
  }, []);

  const step = 100;
  // Calculate the first tick value that is near the viewport top
  // We use floor to ensure we start drawing from just above the visible area if needed
  const startTick = Math.floor(scrollY / step) * step;
  // Draw enough ticks to cover the viewport height + buffer
  const endTick = startTick + windowHeight + step;

  const ticks = [];
  for (let val = startTick; val <= endTick; val += step) {
    if (val >= 0) ticks.push(val);
  }

  return (
    <div className="hidden md:block absolute top-0 left-0 h-full w-8 border-r border-white/20 overflow-hidden bg-blueprint-bg/20 backdrop-blur-[1px]">
      {ticks.map(val => {
        // Position relative to the viewport top
        const topPos = val - scrollY;
        return (
          <div
            key={val}
            className="absolute right-0 w-full flex items-center justify-end pr-1 text-[10px] font-mono text-white/50 -translate-y-1/2"
            style={{ top: `${topPos}px` }}
          >
            <span className="mr-1 opacity-70">{val}</span>
            <div className="w-1.5 h-px bg-white/50"></div>
          </div>
        );
      })}
    </div>
  );
};

export const BlueprintGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Main color background */}
      <div className="absolute inset-0 bg-blueprint-bg" />

      {/* Small Grid */}
      <div className="absolute inset-0 bg-blueprint-grid bg-[size:20px_20px] opacity-30" />

      {/* Large Grid */}
      <div className="absolute inset-0 bg-blueprint-grid-lg bg-[size:100px_100px] opacity-40" />

      {/* Vignette/Texture overlay to give paper feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blueprint-dark opacity-60" />

      {/* Top Ruler (Static horizontal) - Added pl-8 to avoid overlap with left ruler */}
      <div className="absolute top-0 left-0 w-full h-8 border-b border-white/20 flex justify-between px-4 items-end text-[10px] font-mono text-white/50 pl-4 md:pl-10">
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>400</span>
        <span>500</span>
        <span>600</span>
        <span>700</span>
        <span>800</span>
        <span className="hidden sm:inline">900</span>
        <span className="hidden md:inline">1000</span>
        <span className="hidden lg:inline">1100</span>
        <span className="hidden xl:inline">1200</span>
      </div>

      {/* Left Ruler (Dynamic vertical) */}
      <LeftRuler />
    </div>
  );
};
