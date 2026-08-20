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
} from 'lucide-react';
import { EMAIL_CONFIG } from '../config/email';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'fallback' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const emailAddress = EMAIL_CONFIG.recipientEmail;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subjectText = `${EMAIL_CONFIG.subjectPrefix} ${formState.name || 'Client'}`;
  const emailBody = `Hi Zeeshan,\n\n${formState.message}\n\n---\nFrom: ${formState.name}\nEmail: ${formState.email}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    emailAddress
  )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`;

  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const accessKey = EMAIL_CONFIG.web3FormsAccessKey;
    const hasValidKey =
      accessKey &&
      accessKey.trim() !== '' &&
      accessKey !== 'YOUR_ACCESS_KEY_HERE';

    if (!hasValidKey) {
      // If no Web3Forms access key is configured yet, launch Gmail Web or Mailto fallback
      setIsSubmitting(false);
      setSubmitStatus('fallback');
      // Also automatically open Gmail web in a new tab for seamless user experience
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: subjectText,
          from_name: formState.name,
          reply_to: formState.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setStatusMessage('Your message has been sent directly to Zeeshan inbox!');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('fallback');
        setStatusMessage(data.message || 'Could not send directly. Please use Gmail Web.');
      }
    } catch (err) {
      setSubmitStatus('fallback');
      setStatusMessage('Network error. Please click below to send via Gmail.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus('idle');
    setStatusMessage('');
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
                Have a project in mind, need custom UI/UX design, or want to build a full-stack product? Let's discuss!
              </p>
            </div>

            {/* Direct Email Card (Interactive click-to-email & copy) */}
            <div className="bg-[#1C1C1C] border border-[#2C2C2C] hover:border-[#7621B0]/50 transition-colors rounded-2xl p-4 flex items-center justify-between mb-6 group">
              <a
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 overflow-hidden no-underline flex-1"
                title="Send email via Gmail Web"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div className="truncate">
                  <div className="text-xs text-[#808890] uppercase font-medium">
                    Direct Email (Click to Open Gmail)
                  </div>
                  <div className="text-sm sm:text-base text-cream font-semibold truncate group-hover:text-purple-300 transition-colors">
                    {emailAddress}
                  </div>
                </div>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#353535] text-xs text-cream transition-colors cursor-pointer shrink-0 ml-2"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Contact Form States */}
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 text-center bg-[#1A1A1A] rounded-2xl border border-green-500/30"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center mb-3">
                  <Check size={28} />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-cream font-kanit">
                  Message Sent Directly to Inbox!
                </h4>
                <p className="text-sm text-[#9FA8B0] mt-2 mb-6">
                  Thank you! Your email was delivered to <strong className="text-cream">{emailAddress}</strong>. I will reply to you as soon as possible.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-[#282828] hover:bg-[#333333] text-cream text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : submitStatus === 'fallback' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 text-center bg-[#1A1A1A] rounded-2xl border border-purple-500/30"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center mb-3">
                  <ExternalLink size={24} />
                </div>
                <h4 className="text-lg font-bold text-cream font-kanit">
                  Ready to Send via Email
                </h4>
                <p className="text-xs sm:text-sm text-[#9FA8B0] mt-1 mb-4">
                  {statusMessage || 'Click below to send your prepared inquiry directly to Zeeshan:'}
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors no-underline"
                  >
                    <span>Open in Gmail</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#282828] hover:bg-[#333333] text-cream text-xs font-semibold uppercase tracking-wider transition-colors no-underline"
                  >
                    <span>Default Mail App</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-transparent border border-[#333333] hover:border-[#555555] text-[#9FA8B0] hover:text-cream text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Edit Form
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-3.5 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-cream text-xs font-semibold uppercase tracking-wider transition-colors no-underline gap-1.5"
                    title="Compose directly in Gmail web interface"
                  >
                    <span>Gmail Web</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-[#262626] flex items-center justify-between text-xs text-[#808890]">
              <span>Follow / Connect:</span>
              <div className="flex items-center gap-4">
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
