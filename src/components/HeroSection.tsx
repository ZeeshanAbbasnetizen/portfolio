import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPrice: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenPrice }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Price', href: '#services', isPrice: true },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact', isContact: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: (typeof navItems)[0]) => {
    if (item.isPrice) {
      e.preventDefault();
      onOpenPrice();
      setDrawerOpen(false);
      return;
    }
    if (item.isContact) {
      e.preventDefault();
      onOpenContact();
      setDrawerOpen(false);
      return;
    }
    setDrawerOpen(false);
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black font-kanit text-cream select-none">
      {/* 1. Background Image (Full-bleed, z-0) */}
      <img
        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center anim-fade-in pointer-events-none"
      />

      {/* Subtle depth vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

      {/* 2. Big Scrolling Name Track (z-10) positioned directly behind the head in both mobile & desktop */}
      <div
        className="absolute inset-x-0 top-[30vh] sm:top-[16vh] md:top-[18vh] lg:top-[16vh] z-10 overflow-hidden anim-fade-up pointer-events-none"
        style={{ animationDelay: '500ms' }}
      >
        <div className="marquee-track flex w-max whitespace-nowrap font-kanit text-[clamp(4.5rem,14vw,8rem)] sm:text-[clamp(6.5rem,20vh,14rem)] md:text-[clamp(8.5rem,25vh,18rem)] leading-none text-cream font-black tracking-tight opacity-85">
          <span className="pr-[10vw] sm:pr-[14vw]">Hi,&nbsp;&nbsp;I am Zeeshan</span>
          <span className="pr-[10vw] sm:pr-[14vw]">Hi,&nbsp;&nbsp;I am Zeeshan</span>
          <span className="pr-[10vw] sm:pr-[14vw]">Hi,&nbsp;&nbsp;I am Zeeshan</span>
          <span className="pr-[10vw] sm:pr-[14vw]">Hi,&nbsp;&nbsp;I am Zeeshan</span>
        </div>
      </div>

      {/* 3. Hero Portrait: Grounded at bottom (z-20), avatar scales fluidly with screen size */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-[clamp(250px,72vw,560px)] pointer-events-auto flex items-end justify-center">
        <FadeIn delay={0.6} y={30} duration={0.8} className="w-full flex items-end justify-center">
          <Magnet
            padding={150}
            strength={2.5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex items-end justify-center"
          >
            <img
              src="/assets/hero-portrait-clean.png"
              alt="Zeeshan 3D Avatar Portrait"
              className="w-full h-auto max-h-[62vh] xs:max-h-[65vh] sm:max-h-[78vh] md:max-h-[82vh] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] filter brightness-[1.02] cursor-pointer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/portrait-cutout.png';
              }}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Horizontal Cream Rule (z-25) */}
      <div
        className="absolute inset-x-5 sm:inset-x-10 bottom-[4.2rem] xs:bottom-[4.6rem] sm:bottom-28 z-25 h-[1.5px] sm:h-0.5 bg-cream/90 anim-line pointer-events-none"
        style={{ animationDelay: '1200ms' }}
      />

      {/* 5. Header (z-30) */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-8 font-kanit">
        {/* Brand / Logo */}
        <a
          href="#"
          className="font-kanit text-lg sm:text-2xl font-black uppercase tracking-wider text-cream hover:opacity-80 transition-opacity anim-fade-up no-underline"
          style={{ animationDelay: '800ms' }}
        >
          Zeeshan
        </a>

        {/* Desktop Navbar (4 links) */}
        <nav className="hidden sm:flex items-center gap-8 md:gap-12 lg:gap-16">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="font-kanit text-sm md:text-lg lg:text-[1.4rem] font-bold uppercase tracking-wider text-cream hover:opacity-70 transition-opacity duration-200 anim-fade-up no-underline cursor-pointer"
              style={{ animationDelay: `${1000 + i * 80}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button (sm:hidden, z-50) */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label={drawerOpen ? 'Close Menu' : 'Open Menu'}
          className="sm:hidden relative z-50 flex flex-col justify-center items-center h-10 w-10 gap-1.5 focus:outline-none anim-fade-up cursor-pointer"
          style={{ animationDelay: '900ms' }}
        >
          <span
            className={`block h-0.5 w-6 bg-cream rounded transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              drawerOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream rounded transition-all duration-300 ${
              drawerOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream rounded transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              drawerOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      {/* 6. Footer Information (z-30) */}
      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-5 pb-3 xs:pb-4 sm:px-10 sm:pb-8 text-[11px] xs:text-xs sm:text-sm leading-tight xs:leading-normal font-kanit text-cream">
        {/* Left Column */}
        <div className="flex flex-col anim-fade-up" style={{ animationDelay: '1400ms' }}>
          <span className="font-semibold uppercase tracking-wide">UI/UX Designer</span>
          <span className="font-semibold uppercase tracking-wide">Full Stack Developer</span>
          <span className="opacity-75 font-light text-[10px] xs:text-xs hidden xs:inline mt-0.5">
            Turning ideas into products.
          </span>
        </div>

        {/* Right Column */}
        <div className="flex flex-col text-right anim-fade-up" style={{ animationDelay: '1550ms' }}>
          <span className="font-semibold uppercase tracking-wide">Open to opportunities</span>
          <span className="opacity-75 font-light text-[10px] xs:text-xs hidden xs:inline mt-0.5">
            Let's build something great.
          </span>
        </div>
      </footer>

      {/* 7. Mobile Drawer (sm:hidden, z-50) */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition-all duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#121212] px-8 py-10 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl border-l border-neutral-800 font-kanit ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Icon inside Drawer */}
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close drawer"
            className="absolute right-6 top-6 text-cream hover:opacity-70 transition-transform duration-300 cursor-pointer"
            style={{
              transform: drawerOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              opacity: drawerOpen ? 1 : 0,
              transitionDelay: '250ms',
            }}
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          {/* Drawer Content */}
          <div className="pt-12">
            {/* Site Index Label */}
            <div
              className={`text-xs uppercase tracking-[0.2em] text-[#B600A8] mb-8 font-bold transition-all duration-500 ${
                drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Navigation Menu
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-kanit text-3xl font-black uppercase tracking-wider text-cream hover:text-purple-300 transition-all duration-500 no-underline cursor-pointer ${
                    drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${250 + i * 70}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer bottom info */}
          <div className="pt-6 border-t border-neutral-800 text-xs text-cream/60">
            <p className="font-black text-cream uppercase mb-1">Zeeshan</p>
            <p className="font-light">UI/UX &amp; Full Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};
