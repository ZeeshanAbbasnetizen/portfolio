import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface LiveProjectButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  label = 'Live Project',
  className = '',
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(215, 226, 234, 0.12)' }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm md:text-base transition-colors duration-200 no-underline cursor-pointer ${className}`}
    >
      <span>{label}</span>
      <ExternalLink size={16} className="opacity-80" />
    </motion.a>
  );
};
