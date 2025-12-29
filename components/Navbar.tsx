import React, { useState, useEffect } from 'react';
import { Menu, DraftingCompass, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';


interface NavbarProps {
  showNotes?: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ showNotes = false, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll Spy Logic to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'experience', 'about', 'skills', 'contact', ...(showNotes ? ['notes'] : [])];

      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is roughly in the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
            current = section;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showNotes]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Tooling' },
    ...(showNotes ? [{ id: 'notes', label: 'Notes', isSpecial: true }] : [])
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 b backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-2 relative z-50">
          <DraftingCompass className="w-6 h-6 text-white" />
          <span className="text-lg font-bold font-display tracking-widest">DAKSH LOHAR</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wider">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors hover:underline decoration-dashed underline-offset-4 ${item.isSpecial
                ? 'text-yellow-300 hover:text-yellow-200 animate-pulse font-bold'
                : ''
                } ${activeSection === item.id ? 'underline' : ''}`}
              style={!item.isSpecial ? {
                color: activeSection === item.id ? colors.textPrimary : 'white',
              } : {}}
              onMouseEnter={(e) => !item.isSpecial && (e.currentTarget.style.color = colors.textPrimary)}
              onMouseLeave={(e) => !item.isSpecial && activeSection !== item.id && (e.currentTarget.style.color = 'white')}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4 relative z-50">
          <div className="flex justify-center gap-6 ">
            {[
              { Icon: Github, href: "https://github.com/dakshlohar1", label: "GitHub" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/daksh-lohar-7001a31b6", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:dakshlohar4@outlook.com", label: "Email" }
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/30 rounded-full hover:bg-white hover:border-white transition-all duration-300 group relative"
                style={{
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = colors.dark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                aria-label={label}
              >
                <Icon className="w-3 h-3" />
                <span
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs font-mono bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                  style={{ color: colors.dark }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:block px-4 py-2 border border-white text-sm font-bold hover:bg-white transition-all shadow-blueprint active:translate-y-1 active:shadow-none"
            style={{
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = colors.dark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            GET IN TOUCH
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1 active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#f0f4f8] z-[70] shadow-2xl md:hidden flex flex-col border-l border-white/50"
              style={{
                // White blueprint aesthetic: subtle gray grid
                backgroundImage: 'linear-gradient(#e5e9f0 1px, transparent 1px), linear-gradient(90deg, #e5e9f0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white/60 backdrop-blur-sm relative">
                <div>
                  <span className="block text-slate-900 font-bold font-display tracking-widest text-lg">NAVIGATION</span>
                  <span className="text-[10px] font-mono text-slate-400">SECURE LINK // {activeSection.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Items List */}
              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
                {/* Map regular nav items */}
                {navItems.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative group flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${activeSection === item.id
                      ? 'bg-white shadow-md translate-x-2'
                      : 'bg-white/40 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    style={activeSection === item.id ? {
                      borderColor: colors.grid
                    } : {}}
                  >
                    <div className="flex items-center gap-3">
                      {/* Active Dot indicator */}
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${activeSection === item.id ? 'animate-pulse' : 'bg-slate-300'}`}
                        style={activeSection === item.id ? { backgroundColor: colors.grid } : {}}
                      />

                      <span
                        className={`font-mono text-lg tracking-wide ${activeSection === item.id ? 'font-bold' : 'text-slate-600'} ${item.isSpecial ? 'text-yellow-600' : ''}`}
                        style={activeSection === item.id && !item.isSpecial ? { color: colors.dark } : {}}
                      >
                        {item.label}
                      </span>
                    </div>

                    {activeSection === item.id && <ChevronRight className="w-4 h-4" style={{ color: colors.grid }} />}
                  </a>
                ))}

                {/* Mobile Contact Link (added explicitly) */}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mt-4 relative group flex items-center justify-between p-4 rounded-lg border transition-all duration-200 text-white ${activeSection === 'contact'
                    ? 'shadow-lg translate-x-2'
                    : 'hover:opacity-90'
                    }`}
                  style={{
                    backgroundColor: activeSection === 'contact' ? colors.grid : colors.dark,
                    borderColor: activeSection === 'contact' ? colors.grid : colors.dark
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activeSection === 'contact' ? 'bg-white animate-pulse' : 'bg-white/50'
                      }`} />
                    <span className="font-mono text-lg font-bold tracking-wide">
                      GET IN TOUCH
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-80" />
                </a>
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 relative overflow-hidden">
                <div className="absolute right-[-10px] bottom-[-10px] opacity-10 pointer-events-none">
                  <DraftingCompass className="w-24 h-24 text-slate-900" />
                </div>
                <div className="text-[10px] font-mono text-slate-400 mb-1">SYSTEM ID</div>
                <div className="font-display font-bold text-slate-700">BP-PORTFOLIO-V1</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};