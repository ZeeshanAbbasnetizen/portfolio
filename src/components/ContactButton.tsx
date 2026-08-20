import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  href = '#contact',
  onClick,
  className = '',
}) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest font-kanit text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 cursor-pointer outline outline-2 outline-white -outline-offset-[3px] select-none ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      Contact Me
    </motion.a>
  );
};
