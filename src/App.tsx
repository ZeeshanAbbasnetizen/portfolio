import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-kanit overflow-x-clip selection:bg-purple-600 selection:text-white">
      {/* 1. Hero Section (Pixel-faithful Black/Cream Editorial) */}
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. Main Body Content (Dark Kanit-based flow) */}
      <main className="relative z-10">
        {/* About Section */}
        <AboutSection onOpenContact={() => setIsContactOpen(true)} />

        {/* Services Section (White card layer) */}
        <ServicesSection />

        {/* Projects Section (Dark stacking cards overlapping services) */}
        <ProjectsSection />
      </main>

      {/* Footer */}
      <footer className="relative bg-[#080808] border-t border-[#1C1C1C] px-6 sm:px-10 py-12 text-[#9FA8B0] text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="font-black text-cream text-lg tracking-wider font-kanit uppercase">ZEESHAN</span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span>© {new Date().getFullYear()} Zeeshan. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ZeeshanAbbasnetizen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9FA8B0] hover:text-cream transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/zeeshan-abbas-b7b9393b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9FA8B0] hover:text-cream transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-[#9FA8B0] hover:text-cream transition-colors cursor-pointer"
              aria-label="Contact Email"
            >
              <Mail size={20} />
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#181818] hover:bg-[#252525] text-cream transition-colors cursor-pointer ml-2 border border-neutral-800"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
