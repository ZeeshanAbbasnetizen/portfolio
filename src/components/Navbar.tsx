import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onOpenContact: () => void;
  onOpenPrice: () => void;
}

const LOGO_LETTERS = ['Z', 'E', 'E', 'S', 'H', 'A', 'N'];

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenPrice }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navBarRef = useRef<HTMLElement>(null);
  const logoContainerRef = useRef<HTMLAnchorElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navLinksRef = useRef<HTMLElement>(null);

  // Lock body scroll when mobile drawer is open
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
    { label: 'ABOUT', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'PRICE', href: '#services', isPrice: true },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact', isContact: true },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[0]
  ) => {
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
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setDrawerOpen(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet layout (>= 640px)
      mm.add('(min-width: 640px)', () => {
        const letters = letterRefs.current.filter(Boolean);
        const linksEl = navLinksRef.current;
        const navbarEl = navBarRef.current;
        const logoEl = logoContainerRef.current;

        if (!linksEl || !navbarEl || letters.length === 0) return;

        // Dynamic function to compute distance required to move links to horizontal center
        const getDeltaX = () => {
          const currentX = (gsap.getProperty(linksEl, 'x') as number) || 0;
          const navRect = navbarEl.getBoundingClientRect();
          const linksRect = linksEl.getBoundingClientRect();

          // Base center without transform
          const linksBaseCenter = linksRect.left - currentX + linksRect.width / 2;
          const targetCenter = navRect.left + navRect.width / 2;

          return targetCenter - linksBaseCenter;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1, // Smooth scrub with easing
            invalidateOnRefresh: true,
            onEnter: () => {
              navbarEl.classList.add('navbar--scrolled');
            },
            onLeaveBack: () => {
              navbarEl.classList.remove('navbar--scrolled');
            },
            onUpdate: (self) => {
              // Ensure smooth class toggling during scrub near hero boundary
              if (self.progress >= 0.88) {
                navbarEl.classList.add('navbar--scrolled');
              } else if (self.direction === -1 && self.progress < 0.88) {
                navbarEl.classList.remove('navbar--scrolled');
              }
            },
          },
        });

        // 1. Staggered letter-by-letter dissolve
        const letterDuration = 0.45;
        const staggerStep = (1.0 - letterDuration) / Math.max(1, letters.length - 1);

        tl.to(
          letters,
          {
            opacity: 0,
            scale: 0.6,
            y: -12,
            filter: 'blur(4px)',
            stagger: staggerStep,
            duration: letterDuration,
            ease: 'power2.out',
          },
          0
        );

        // Hide logo wrapper from pointer events when fully scrolled
        tl.to(
          logoEl,
          {
            autoAlpha: 0,
            duration: 0.08,
          },
          0.92
        );

        // 2. Links horizontal centering animation synced to complete at progress = 1
        tl.to(
          linksEl,
          {
            x: () => getDeltaX(),
            duration: 1.0,
            ease: 'power2.out',
          },
          0
        );
      });

      // Mobile layout (< 640px)
      mm.add('(max-width: 639px)', () => {
        const navbarEl = navBarRef.current;
        if (!navbarEl) return;

        ScrollTrigger.create({
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          onEnter: () => navbarEl.classList.add('navbar--scrolled'),
          onLeaveBack: () => navbarEl.classList.remove('navbar--scrolled'),
          onUpdate: (self) => {
            if (self.progress >= 0.85) {
              navbarEl.classList.add('navbar--scrolled');
            } else if (self.direction === -1 && self.progress < 0.85) {
              navbarEl.classList.remove('navbar--scrolled');
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={navBarRef}
        className="navbar-container fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 sm:px-10 py-5 sm:py-7 font-kanit text-cream select-none pointer-events-auto"
      >
        {/* Left: Brand / Logo with split letters */}
        <a
          href="#hero"
          ref={logoContainerRef}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="ZEESHAN - Back to top"
          className="font-kanit text-xl sm:text-2xl lg:text-[1.65rem] font-black uppercase tracking-wider text-cream hover:opacity-80 transition-opacity no-underline flex items-center cursor-pointer"
        >
          {LOGO_LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="inline-block transform-gpu will-change-transform will-change-opacity"
            >
              {letter}
            </span>
          ))}
        </a>

        {/* Right: Desktop Nav Links */}
        <nav
          ref={navLinksRef}
          className="hidden sm:flex items-center gap-7 md:gap-10 lg:gap-14 font-kanit"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="font-kanit text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.14em] text-[#D7E2EA] hover:text-white transition-colors duration-200 no-underline cursor-pointer relative py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button (sm:hidden) */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label={drawerOpen ? 'Close Menu' : 'Open Menu'}
          className="sm:hidden relative z-50 flex flex-col justify-center items-center h-10 w-10 gap-1.5 focus:outline-none cursor-pointer"
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

      {/* Mobile Drawer (sm:hidden, z-50) */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition-all duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#121212] px-8 py-10 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl border-l border-neutral-800 font-kanit ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Icon */}
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
                  className={`font-kanit text-2xl font-black uppercase tracking-wider text-cream hover:text-purple-300 transition-all duration-500 no-underline cursor-pointer ${
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
            <p className="font-black text-cream uppercase mb-1">ZEESHAN</p>
            <p className="font-light">UI/UX &amp; Full Stack Developer</p>
          </div>
        </div>
      </div>
    </>
  );
};
