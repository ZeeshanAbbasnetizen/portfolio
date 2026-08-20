import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Github,
  Linkedin,
  Send,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { EMAIL_CONFIG } from '../config/email';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'activation_required' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const emailAddress = EMAIL_CONFIG.recipientEmail;
  const whatsappNumber = EMAIL_CONFIG.whatsappDisplay;
  const whatsappUrl = EMAIL_CONFIG.whatsappUrl;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(EMAIL_CONFIG.whatsappNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const subjectText = `${EMAIL_CONFIG.subjectPrefix} ${formState.name || 'Client'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Direct Background POST to FormSubmit (No drafts, no mail apps, direct to inbox)
      const response = await fetch(EMAIL_CONFIG.formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: subjectText,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setSubmitStatus('activation_required');
      } else {
        if (response.ok) {
          setSubmitStatus('success');
          setFormState({ name: '', email: '', message: '' });
        } else {
          setSubmitStatus('error');
          setErrorMessage(data.message || 'Unable to send message directly at this moment.');
        }
      }
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage('Network connection error. Please try again or reach out via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-[#141414] border border-[#2A2A2A] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 text-[#D7E2EA] shadow-2xl z-10 my-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#202020] text-cream hover:bg-[#303030] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold font-kanit">
                Get In Touch
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-cream uppercase mt-1 font-kanit">
                Let's Connect
              </h3>
              <p className="text-sm sm:text-base text-[#9FA8B0] font-light mt-2">
                Have a project in mind, need custom UI/UX design, or want to build a full-stack product? Reach out directly!
              </p>
            </div>

            {/* Direct Quick Contact Options: WhatsApp & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* WhatsApp Quick Card */}
              <div className="bg-[#121E17] border border-[#1F3D2C] hover:border-[#25D366]/60 transition-colors rounded-2xl p-3.5 flex items-center justify-between group">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 overflow-hidden flex-1 no-underline text-inherit"
                  title="Chat on WhatsApp"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shrink-0 text-[#25D366] group-hover:scale-105 transition-transform">
                    <WhatsAppIcon size={18} />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-[#4ADE80] uppercase font-bold tracking-wider">
                      WhatsApp Chat
                    </div>
                    <div className="text-xs sm:text-sm text-cream font-semibold truncate group-hover:text-[#4ADE80] transition-colors">
                      {whatsappNumber}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-1 shrink-0 ml-1.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#1F3D2C] hover:bg-[#25D366] hover:text-black text-[#4ADE80] text-xs transition-colors cursor-pointer"
                    title="Open WhatsApp chat"
                  >
                    <ExternalLink size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="p-1.5 rounded-lg bg-[#1C2C22] hover:bg-[#283E30] text-xs text-cream transition-colors cursor-pointer"
                    title="Copy WhatsApp number"
                  >
                    {copiedPhone ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              {/* Direct Email Card */}
              <div className="bg-[#1C1724] border border-[#35254A] hover:border-[#7621B0]/60 transition-colors rounded-2xl p-3.5 flex items-center justify-between group">
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center gap-2.5 overflow-hidden flex-1 no-underline text-inherit"
                  title="Send Email"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">
                      Direct Email
                    </div>
                    <div className="text-xs sm:text-sm text-cream font-semibold truncate group-hover:text-purple-300 transition-colors">
                      {emailAddress}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-[#271E36] hover:bg-[#382B4E] text-xs text-cream transition-colors cursor-pointer shrink-0 ml-1.5"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Success State */}
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 text-center bg-[#1A1A1A] rounded-2xl border border-green-500/40"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center mb-3">
                  <Check size={28} />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-cream font-kanit">
                  Message Sent Directly to Inbox!
                </h4>
                <p className="text-sm text-[#9FA8B0] mt-2 mb-6">
                  Thank you! Your message has been sent directly to <strong className="text-cream">{emailAddress}</strong>. I will reply to you as soon as possible.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-[#282828] hover:bg-[#333333] text-cream text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider transition-colors no-underline"
                  >
                    <WhatsAppIcon size={15} />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#202020] hover:bg-[#2A2A2A] text-cream text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : submitStatus === 'activation_required' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 text-center bg-[#1A1A1A] rounded-2xl border border-amber-500/40"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
                  <Mail size={24} />
                </div>
                <h4 className="text-lg font-bold text-cream font-kanit">
                  One-Time Activation Email Sent!
                </h4>
                <p className="text-xs sm:text-sm text-[#9FA8B0] mt-2 mb-4 leading-relaxed">
                  FormSubmit sent a 1-click confirmation link to <strong className="text-cream">{emailAddress}</strong>. Once you click "Activate Form" in that email, all future submissions will arrive directly in your inbox with 100% background delivery!
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-[#282828] hover:bg-[#333333] text-cream text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    OK, Got It
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider transition-colors no-underline"
                  >
                    <WhatsAppIcon size={15} />
                    <span>WhatsApp Me</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs text-red-300">
                    <AlertCircle size={16} className="shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#7621B0] rounded-xl px-4 py-3 text-sm text-cream placeholder-[#606870] outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#7621B0] rounded-xl px-4 py-3 text-sm text-cream placeholder-[#606870] outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell me about your project or inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#7621B0] rounded-xl px-4 py-3 text-sm text-cream placeholder-[#606870] outline-none transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white uppercase tracking-wider text-sm transition-all duration-300 shadow-lg cursor-pointer font-kanit disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 12px rgba(182, 0, 168, 0.3)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Directly...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Social Links & WhatsApp */}
            <div className="mt-6 pt-6 border-t border-[#262626] flex items-center justify-between text-xs text-[#808890]">
              <span>Quick Connect:</span>
              <div className="flex items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#4ADE80] hover:text-[#25D366] transition-colors font-medium"
                  title="WhatsApp"
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://github.com/ZeeshanAbbasnetizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cream/80 hover:text-cream transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/zeeshan-abbas-b7b9393b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cream/80 hover:text-cream transition-colors"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
