import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BlueprintGrid } from './components/BlueprintGrid';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Notes } from './components/Notes';
import { Experience } from './components/Experience';
import { CustomCursor } from './components/CustomCursor';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { BackToTop } from './components/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';

import profileImg from './assets/images/profile.png';
import { PROJECTS } from './constants';
import { Project } from './types';

const Preloader: React.FC = () => (
  <div className="fixed inset-0 z-[100] bg-blueprint-bg flex flex-col items-center justify-center text-white">
    <div className="relative w-16 h-16 mb-8">
      <div className="absolute inset-0 border-t-2 border-l-2 border-white rounded-full animate-spin" />
      <div className="absolute inset-2 border-r-2 border-b-2 border-blueprint-grid rounded-full animate-[spin_1.5s_linear_reverse_infinite]" />
    </div>
    <div className="font-mono text-sm tracking-[0.2em] relative">
      <span className="animate-pulse">INITIALIZING</span>
    </div>
    <div className="mt-2 text-xs text-white/40 font-mono">
      LOADING ASSETS...
    </div>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        profileImg,
        ...PROJECTS.map(p => p.imageUrl).filter(url => url) as string[]
      ];

      const imagePromises = imagesToLoad.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      });

      await Promise.all(imagePromises);
      // Add a small artificial delay for smooth transition
      setTimeout(() => setIsLoading(false), 800);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const isUnlocked = localStorage.getItem('blueprint-notes-unlocked') === 'true';
    if (isUnlocked) {
      setShowNotes(true);
    }
  }, []);

  const handleUnlockNotes = () => {
    setShowNotes(true);
    localStorage.setItem('blueprint-notes-unlocked', 'true');
    // Smooth scroll to notes after a brief delay for the reveal animation
    setTimeout(() => {
      document.getElementById('notes')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-blueprint-bg text-white font-mono selection:bg-white/30 selection:text-white relative overflow-x-hidden cursor-none">
        {isLoading && <Preloader />}

        {!isLoading && <CustomCursor />}

        {/* Floating Theme Switcher - Hidden when mobile menu or project modal is open */}
        {!isLoading && !isMobileMenuOpen && !selectedProject && (
          <>
            <ThemeSwitcher />
            <BackToTop />
          </>
        )}

        {/* Background Layer */}
        {!isLoading && <BlueprintGrid />}

        {/* Content Layer */}
        <div className={`relative z-10 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar showNotes={showNotes} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

          <main className="container mx-auto px-4 md:px-8 max-w-7xl">
            <section id="hero" className="min-h-screen flex flex-col justify-center py-20 snap-start">
              <Hero profileImg={profileImg} />
            </section>

            <section id="projects" className="min-h-screen flex flex-col border-t border-white/20 snap-start">
              <div className="my-auto py-24 w-full">
                <Projects selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
              </div>
            </section>

            <section id="experience" className="min-h-screen flex flex-col border-t border-white/20 snap-start">
              <div className="my-auto py-24 w-full">
                <Experience />
              </div>
            </section>

            <section id="about" className="min-h-screen flex flex-col border-t border-white/20 snap-start">
              <div className="my-auto py-24 w-full">
                <About />
              </div>
            </section>

            <section id="skills" className="min-h-screen flex flex-col border-t border-white/20 snap-start">
              <div className="my-auto py-24 w-full">
                <Skills />
              </div>
            </section>

            <section id="contact" className="min-h-screen flex flex-col border-t border-white/20 snap-start relative">
              <div className="my-auto py-24 w-full">
                <Contact />
              </div>

              <footer className="absolute bottom-4 left-0 right-0 text-center text-white/50 bg-blueprint-bg/80 backdrop-blur-sm py-2 pointer-events-none">
                <p className="text-sm font-mono">
                  REV A // SCALE 1:1 // © 2024 Blueprint Portfolio
                </p>
              </footer>

              {/* Easter Egg Trigger - Peeling Paper Effect */}
              {!showNotes && (
                <div
                  onClick={handleUnlockNotes}
                  className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden cursor-pointer group z-50 pointer-events-auto"
                  title="Something hidden..."
                >
                  {/* The 'Hole' / Void Text */}
                  <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold text-yellow-300 -rotate-45 mb-4 mr-3 font-mono tracking-widest">REVEAL</span>
                  </div>

                  {/* The Fold (Paper Back) */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-style-solid border-b-white border-l-transparent border-b-[40px] border-l-[40px] shadow-[-5px_-5px_15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group-hover:border-b-[100px] group-hover:border-l-[100px] group-hover:border-b-white/90">
                    {/* Optional texture on the 'back' of the paper */}
                    <div className="absolute top-4 right-4 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>
                  </div>
                </div>
              )}
            </section>

            {/* Hidden Notes Section */}
            {showNotes && (
              <section id="notes" className="min-h-screen flex flex-col border-t border-white/20 snap-start animate-in fade-in slide-in-from-bottom duration-1000">
                <div className="my-auto py-24 w-full">
                  <Notes />
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;