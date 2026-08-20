import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const bioText =
    "I'm a UI/UX designer and full-stack developer who helps businesses grow by designing intuitive interfaces and automating the everyday tasks that slow teams down. From first wireframe to deployed code, I build clean, functional products that make daily operations simpler. Let's build something that actually makes your workday easier.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. Top-Left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none select-none z-0">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <motion.img
            animate={{
              y: [0, -12, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Decorative Moon 3D"
            className="w-[120px] sm:w-[160px] md:w-[210px] drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
          />
        </FadeIn>
      </div>

      {/* 2. Top-Right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none select-none z-0">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <motion.img
            animate={{
              y: [0, 14, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Decorative Lego 3D"
            className="w-[120px] sm:w-[160px] md:w-[210px] drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
          />
        </FadeIn>
      </div>

      {/* 3. Bottom-Left: 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none select-none z-0">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <motion.img
            animate={{
              y: [0, 10, 0],
              rotate: [0, -4, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="Decorative 3D element"
            className="w-[100px] sm:w-[140px] md:w-[180px] drop-shadow-2xl opacity-85 hover:opacity-100 transition-opacity"
          />
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none z-0">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <motion.img
            animate={{
              y: [0, -12, 0],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="Decorative 3D shapes"
            className="w-[130px] sm:w-[170px] md:w-[220px] drop-shadow-2xl opacity-85 hover:opacity-100 transition-opacity"
          />
        </FadeIn>
      </div>

      {/* Center Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] select-none">
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading & text */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Character-by-character scroll animated paragraph */}
        <AnimatedText text={bioText} />

        {/* Gap between text & contact button */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact Button Wrapped in FadeIn */}
        <div id="contact" className="w-full flex justify-center">
          <FadeIn delay={0.5} y={20} duration={0.7}>
            <ContactButton
              href="#contact"
              onClick={(e?: React.MouseEvent) => {
                if (e) e.preventDefault();
                onOpenContact();
              }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
