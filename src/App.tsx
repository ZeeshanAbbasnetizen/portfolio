import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { PriceModal } from './components/PriceModal';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { EMAIL_CONFIG } from './config/email';

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.472 14.382C17.152 14.222 15.586 13.454 15.293 13.347C15 13.24 14.787 13.187 14.574 13.507C14.36 13.827 13.748 14.547 13.561 14.76C13.375 14.974 13.188 15 12.868 14.84C12.548 14.68 11.517 14.342 10.293 13.251C9.341 12.403 8.698 11.354 8.511 11.034C8.325 10.714 8.491 10.541 8.652 10.381C8.796 10.237 8.972 10.007 9.132 9.82C9.292 9.633 9.345 9.5 9.452 9.287C9.559 9.073 9.505 8.887 9.425 8.727C9.345 8.567 8.705 7.02 8.439 6.38C8.179 5.757 7.915 5.842 7.719 5.832C7.532 5.823 7.319 5.821 7.106 5.821C6.892 5.821 6.546 5.901 6.253 6.221C5.959 6.541 5.133 7.314 5.133 8.887C5.133 10.46 6.28 11.98 6.44 12.193C6.6 12.407 8.694 15.639 11.905 17.025C12.669 17.355 13.266 17.552 13.731 17.7C14.499 17.944 15.197 17.91 15.751 17.827C16.369 17.735 17.653 17.05 17.92 16.297C18.187 15.544 18.187 14.904 18.107 14.77C18.027 14.637 17.813 14.544 17.472 14.382Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12C2 13.819 2.486 15.525 3.332 17L2.052 21.673C1.984 21.921 2.059 22.185 2.247 22.361C2.435 22.537 2.705 22.593 2.949 22.507L7.433 20.932C8.829 21.621 10.373 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C10.598 20 9.278 19.638 8.131 19.004L7.842 18.843L4.996 19.839L5.808 16.877L5.626 16.574C4.604 14.869 4 12.502 4 12Z"
      fill="currentColor"
    />
  </svg>
);

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-kanit overflow-x-clip selection:bg-purple-600 selection:text-white">
      {/* 1. Hero Section (Pixel-faithful Black/Cream Editorial) */}
      <HeroSection
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPrice={() => setIsPriceOpen(true)}
      />

      {/* 2. Main Body Content (Dark Kanit-based flow) */}
      <main className="relative z-10">
        {/* About Section */}
        <AboutSection onOpenContact={() => setIsContactOpen(true)} />

        {/* Tech Stack Section */}
        <TechStackSection />

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

          <div className="flex items-center gap-5">
            <a
              href={EMAIL_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9FA8B0] hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp Contact"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
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

      {/* Interactive Modals */}
      <PriceModal
        isOpen={isPriceOpen}
        onClose={() => setIsPriceOpen(false)}
        onOpenContact={() => {
          setIsPriceOpen(false);
          setIsContactOpen(true);
        }}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
