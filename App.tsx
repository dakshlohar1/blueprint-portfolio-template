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

const App: React.FC = () => {
  const [showNotes, setShowNotes] = useState(false);

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
    <div className="min-h-screen bg-blueprint-bg text-white font-mono selection:bg-white/30 selection:text-white relative overflow-x-hidden cursor-none">
      <CustomCursor />
      
      {/* Background Layer */}
      <BlueprintGrid />
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar showNotes={showNotes} />
        
        <main className="container mx-auto px-4 md:px-8 max-w-7xl">
          <section id="hero" className="min-h-screen flex flex-col justify-center py-20 snap-start">
            <Hero />
          </section>

          <section id="projects" className="min-h-screen flex flex-col border-t border-white/20 snap-start">
            <div className="my-auto py-24 w-full">
              <Projects />
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
  );
};

export default App;