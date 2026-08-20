import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { FadeIn } from './FadeIn';

interface Project {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: Project[] = [
  {
    number: '01',
    category: 'Personal Project',
    name: 'Prism',
    liveUrl: 'https://prism-chi-ruby.vercel.app/',
    col1Img1: 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/Prism/main/public/preview%20(1).webp',
    col1Img2: 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/Prism/main/public/preview%20(2).webp',
    col2Img: 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/Prism/main/public/preview.webp',
  },
  {
    number: '02',
    category: 'Client Project',
    name: 'Rose Palace GYM',
    liveUrl: 'https://rose-palace-gym.vercel.app/',
    col1Img1: 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/Rose-Palace-GYM/main/preview%20(3).webp',
    col1Img2: 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/Rose-Palace-GYM/main/preview%20(4).webp',
    col2Img: 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/Rose-Palace-GYM/main/preview%20(5).webp',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-20 sm:top-24 md:top-28 w-full flex items-center justify-center mb-16 sm:mb-24"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="w-full max-w-6xl bg-[#FFFFFF] text-[#0C0C0C] border-2 border-[rgba(12,12,12,0.12)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-5 sm:p-7 md:p-10 shadow-2xl transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
      >
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[rgba(12,12,12,0.12)]">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Project Number */}
            <span className="font-black text-4xl sm:text-5xl md:text-6xl text-[#0C0C0C] tracking-tighter">
              {project.number}
            </span>

            {/* Category & Project Name */}
            <div>
              <span className="block text-xs sm:text-sm uppercase tracking-widest text-[#0C0C0C]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-[#0C0C0C] tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Live Project Button */}
          <LiveProjectButton href={project.liveUrl} label="Live Project" variant="dark" />
        </div>

        {/* Bottom Two-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 pt-6 sm:pt-8">
          {/* Left Column (40% width / 4 cols) - 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            {/* Top Left Image */}
            <div className="w-full h-[clamp(130px,16vw,230px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden border border-[rgba(12,12,12,0.1)] bg-neutral-100 group">
              <img
                src={project.col1Img1}
                alt={`${project.name} Preview 1`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Bottom Left Image */}
            <div className="w-full h-[clamp(160px,22vw,340px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden border border-[rgba(12,12,12,0.1)] bg-neutral-100 group">
              <img
                src={project.col1Img2}
                alt={`${project.name} Preview 2`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width / 6 cols) - 1 Tall Image */}
          <div className="md:col-span-6 h-[clamp(280px,38vw,594px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden border border-[rgba(12,12,12,0.1)] bg-neutral-100 group">
            <img
              src={project.col2Img}
              alt={`${project.name} Preview Main`}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 select-none">
            Project
          </h2>
        </FadeIn>

        {/* Stacking Project Cards */}
        <div className="relative flex flex-col gap-12 sm:gap-20">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
