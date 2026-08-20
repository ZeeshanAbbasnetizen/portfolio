import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, CheckCircle2, ArrowRight, Copy, Check } from 'lucide-react';
import { EMAIL_CONFIG } from '../config/email';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
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

export const PriceModal: React.FC<PriceModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [copied, setCopied] = useState(false);
  const emailAddress = EMAIL_CONFIG.recipientEmail;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlights = [
    {
      title: 'Custom Scoping',
      desc: 'Tailored specifically to your project requirements and timeline.',
    },
    {
      title: 'Transparent Pricing',
      desc: 'Clear fixed milestone or project-based rates with zero surprises.',
    },
    {
      title: 'End-to-End Delivery',
      desc: 'From intuitive UI/UX design to robust, production-ready code.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-kanit">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Rounded Rectangular Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[#0E0E0E] border border-[#262626] rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 text-[#D7E2EA] shadow-[0_20px_70px_rgba(0,0,0,0.9)] z-10 my-auto overflow-hidden"
          >
            {/* 1. Floating 3D Decorative Assets */}
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 pointer-events-none select-none z-0 opacity-40 sm:opacity-50">
              <motion.img
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -4, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
                alt=""
                className="w-24 sm:w-32 drop-shadow-xl"
              />
            </div>

            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 pointer-events-none select-none z-0 opacity-30 sm:opacity-40">
              <motion.img
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
                alt=""
                className="w-24 sm:w-32 drop-shadow-xl"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 pointer-events-none select-none z-0 opacity-30 sm:opacity-40">
              <motion.img
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
                alt=""
                className="w-28 sm:w-36 drop-shadow-xl"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2.5 rounded-full bg-[#1C1C1C] text-cream hover:bg-[#2A2A2A] hover:text-white transition-all cursor-pointer z-20 border border-[#2D2D2D]"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] text-[#B600A8] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles size={12} className="text-[#B600A8]" />
                <span>Pricing &amp; Rates</span>
              </div>

              {/* Main Heading */}
              <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-4 select-none">
                Custom Pricing
              </h3>

              {/* Main Prompt Text */}
              <p className="text-[#D7E2EA] font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-6">
                Every project has unique challenges, scope, and technical requirements. For an accurate quote and custom proposal,{' '}
                <strong className="font-semibold text-cream">please contact me with your project details</strong>.
              </p>

              {/* Feature / Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8 text-left">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#141414] border border-[#222222] hover:border-[#333333] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 size={16} className="text-[#B600A8] shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-cream uppercase tracking-wide">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#9FA8B0] font-light leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Signature CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full text-white font-medium uppercase tracking-widest font-kanit text-xs sm:text-sm px-8 py-3.5 sm:px-10 sm:py-4 cursor-pointer outline outline-2 outline-white -outline-offset-[3px] select-none transition-transform shadow-lg"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  }}
                >
                  <span>Contact Me For Details</span>
                  <ArrowRight size={16} />
                </motion.button>
                <a
                  href={EMAIL_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full text-black font-bold uppercase tracking-wider font-kanit text-xs sm:text-sm px-7 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#20bd5a] transition-colors no-underline cursor-pointer shadow-lg"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Direct Email quick action */}
              <div className="mt-6 pt-5 border-t border-[#1F1F1F] w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#808890]">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-cream/60" />
                  <span>Direct: <span className="text-cream font-medium">{emailAddress}</span></span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#282828] text-xs text-cream border border-[#2B2B2B] transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
