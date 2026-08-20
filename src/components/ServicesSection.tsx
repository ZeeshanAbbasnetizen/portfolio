import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

export const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      number: '01',
      name: 'UI/UX Design',
      description:
        'Crafting intuitive, user-centered interfaces that balance aesthetics with usability — from wireframes to polished, production-ready designs.',
    },
    {
      number: '02',
      name: 'Frontend Development',
      description:
        'Building fast, responsive, pixel-perfect interfaces using modern frameworks like React and Tailwind CSS.',
    },
    {
      number: '03',
      name: 'Backend & APIs',
      description:
        'Designing robust server-side architecture, databases, and APIs that power reliable, scalable applications.',
    },
    {
      number: '04',
      name: 'Workflow Automation',
      description:
        'Automating repetitive daily tasks and business processes so teams can focus on what actually matters.',
    },
    {
      number: '05',
      name: 'Deployment & DevOps',
      description:
        'Shipping and maintaining production-ready applications with clean CI/CD pipelines and reliable hosting.',
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 select-none">
            Services
          </h2>
        </FadeIn>

        {/* 5 Services List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={25}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-4 md:gap-12 transition-colors duration-200 hover:bg-neutral-50/70 px-2 sm:px-4 rounded-xl"
              >
                {/* Number */}
                <div className="font-black text-[clamp(3rem,10vw,140px)] leading-none text-[#0C0C0C] shrink-0 tracking-tighter opacity-90 group-hover:opacity-100 transition-opacity">
                  {service.number}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] mb-2 tracking-wide group-hover:text-black transition-colors">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60 group-hover:opacity-80 transition-opacity">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
