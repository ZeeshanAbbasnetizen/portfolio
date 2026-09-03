import React from 'react';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';

interface HeroSectionProps {
  onOpenContact?: () => void;
  onOpenPrice?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section
      id="hero"
      className="relative h-[100dvh] w-full overflow-hidden bg-black font-kanit text-cream select-none"
    >
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

      {/* 5. Footer Information (z-30) */}
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
    </section>
  );
};
