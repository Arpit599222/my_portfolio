import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Define types for form fields
interface FormState {
  name: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lenient form validation to ensure easy and successful testing
  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!form.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setErrorMessage('');

    // Fetch credentials from Vite env
    const serviceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY;

    const emailParams = {
      from_name: form.name,
      subject: form.subject,
      message: form.message,
      timestamp: new Date().toLocaleString(),
    };

    if (serviceId && templateId && publicKey && 
        serviceId !== 'YOUR_EMAILJS_SERVICE_ID_HERE' && 
        templateId !== 'YOUR_EMAILJS_TEMPLATE_ID_HERE' && 
        publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE') {
      // Real EmailJS Integration
      try {
        await emailjs.send(serviceId, templateId, emailParams, publicKey);
        setStatus('success');
        setForm({ name: '', subject: '', message: '' });
      } catch (err: any) {
        console.error('EmailJS Error:', err);
        setStatus('error');
        setErrorMessage(err?.text || 'Failed to transmit message over the matrix. Please try again.');
      }
    } else {
      // Simulated Mock Mode (Runs automatically when placeholder credentials are used)
      console.log('%c[EmailJS Demo Mode Active]', 'color: #3b82f6; font-weight: bold;');
      console.log('To activate real email deliveries, update your .env file with valid credentials.');
      console.log('Captured Payload:', emailParams);

      setTimeout(() => {
        setStatus('success');
        setForm({ name: '', subject: '', message: '' });
      }, 1500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const isDemoMode = !((import.meta as any).env?.VITE_EMAILJS_SERVICE_ID) || 
    (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID === 'YOUR_EMAILJS_SERVICE_ID_HERE';

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative w-full bg-[#0a0a0c] px-6 pt-20 pb-24 border-t border-zinc-900 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Tightened horizontal wrapper for reduced overall width footprint */}
      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {/* Section Header with reduced bottom margins */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/10 border border-zinc-500/20 text-zinc-300 text-[10px] font-bold tracking-widest font-mono mb-3"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>04 // OUTREACH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3"
          >
            Initiate <span className="text-zinc-500">Connection.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-xs sm:text-sm max-w-lg font-medium"
          >
            Ready to design the future or collaborate on complex digital architectures? Use the communication matrix below.
          </motion.p>
        </div>

        {/* 3D Entering & Floating Cards Grid with tightened gap settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* CARD 1: CONTACT INFO CARD (Settles on LEFT, enters from BELOW) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 70,
              mass: 1.2,
            }}
            className="flex flex-col col-span-1 lg:col-span-5 w-full order-1 lg:order-none"
          >
            {/* Reduced card paddings for tighter look */}
            <div
              className="w-full bg-[#0d0d10] border border-zinc-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl select-none"
            >
              {/* Static background glow */}
              <div className="absolute -top-24 -right-24 w-40 h-40 rounded-full bg-zinc-100/10 blur-[80px] pointer-events-none" />

              <div>
                <h3 className="text-lg font-bold font-mono tracking-wider text-white uppercase mb-1">
                  Direct Nodes
                </h3>
                <p className="text-zinc-500 text-[10px] font-mono mb-6 uppercase">
                  Active connection endpoints
                </p>

                {/* Info Links with tightened inner spacing */}
                <div className="space-y-4">
                  {/* Gmail Node */}
                  <a
                    href="mailto:arpitraj0610@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-500/30 hover:bg-zinc-900/60 transition-all duration-300 group/link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-455 transition-colors">
                      <Mail className="w-4 h-4 text-zinc-400 group-hover/link:text-zinc-300" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-bold font-mono tracking-wider text-zinc-500 uppercase">
                        Email Network
                      </span>
                      <span className="text-xs font-semibold text-zinc-300 group-hover/link:text-white transition-colors break-all">
                        arpitraj0610@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn Node */}
                  <a
                    href="https://www.linkedin.com/in/arpitrajcse/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-500/30 hover:bg-zinc-900/60 transition-all duration-300 group/link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-455 transition-colors">
                      <LinkedInIcon className="w-4 h-4 text-zinc-400 group-hover/link:text-zinc-300" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-bold font-mono tracking-wider text-zinc-500 uppercase">
                        LinkedIn Core
                      </span>
                      <span className="text-xs font-semibold text-zinc-300 group-hover/link:text-white transition-colors">
                        arpitrajcse
                      </span>
                    </div>
                  </a>

                  {/* Phone Node */}
                  <a
                    href="tel:+917668132584"
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-500/30 hover:bg-zinc-900/60 transition-all duration-300 group/link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-455 transition-colors">
                      <Phone className="w-4 h-4 text-zinc-400 group-hover/link:text-zinc-300" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-bold font-mono tracking-wider text-zinc-500 uppercase">
                        Vocal Channel
                      </span>
                      <span className="text-xs font-semibold text-zinc-300 group-hover/link:text-white transition-colors">
                        +91 7668132584
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* GitHub Button & Scan HUD at Bottom */}
              <div
                className="mt-8 pt-4 border-t border-zinc-900/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <a
                  href="https://github.com/Arpit599222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-500/40 text-zinc-300 hover:text-white text-[10px] font-bold font-mono tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  VISIT DEVELOPER HUB
                </a>
                <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase self-center sm:self-auto select-none">
                  SECURE SYSTEM
                </span>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: CONTACT FORM CARD (Settles on RIGHT, enters from BELOW) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 70,
              mass: 1.2,
              delay: 0.1
            }}
            className="flex flex-col col-span-1 lg:col-span-7 w-full order-2 lg:order-none"
          >
            {/* Reduced card paddings for tighter look */}
            <div
              className="w-full max-w-2xl mx-auto lg:max-w-none bg-[#0d0d10] border border-zinc-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl"
            >
              {/* Static background glow */}
              <div className="absolute -bottom-24 -left-24 w-40 h-40 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-5">
                  <div>
                    <h3 className="text-lg font-bold font-mono tracking-wider text-white uppercase">
                      Transmission Box
                    </h3>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase mt-0.5">
                      Direct message vector
                    </p>
                  </div>
                  {isDemoMode && (
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold font-mono tracking-widest bg-zinc-100/10 border border-zinc-500/20 text-zinc-300 select-none uppercase animate-pulse">
                      Simulated Matrix
                    </span>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    /* SUCCESS SCREEN */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-10 flex flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                      >
                        <CheckCircle2 className="w-7 h-7" />
                      </motion.div>

                      <h4 className="text-lg font-black font-mono tracking-wide text-white uppercase mb-2">
                        TRANSMISSION SECURED
                      </h4>
                      <p className="text-zinc-400 text-xs max-w-sm font-medium leading-relaxed mb-5">
                        Thank you for reaching out! The payload has been routed. Check your inbox; an auto-receipt should land in your sector momentarily.
                      </p>

                      <button
                        onClick={() => setStatus('idle')}
                        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-500/40 text-zinc-300 hover:text-white text-[10px] font-bold font-mono tracking-wider transition duration-300 cursor-pointer"
                      >
                        SEND ANOTHER SIGNAL
                      </button>
                    </motion.div>
                  ) : (
                    /* FORM SCREEN with tightened vertical elements (space-y-4) */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      noValidate
                    >
                      {status === 'error' && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-rose-400 text-xs font-semibold">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold uppercase tracking-wider mb-0.5">TRANSMISSION ERROR</p>
                            <p className="text-zinc-400 font-medium font-sans leading-relaxed">{errorMessage}</p>
                          </div>
                        </div>
                      )}

                      {/* Name Group */}
                      <div className="text-left">
                        <label className="block text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-1.5">
                          Name Signature
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          placeholder="Alex Mercer"
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/30 border text-zinc-150 text-sm font-sans focus:outline-none focus:bg-zinc-900/60 focus:ring-1 focus:ring-zinc-500/30 transition-all placeholder-zinc-700 ${errors.name ? 'border-rose-500/40 focus:border-rose-500' : 'border-zinc-900 focus:border-zinc-500/50'
                            }`}
                          disabled={status === 'loading'}
                        />
                        {errors.name && (
                          <p className="mt-1 text-[9px] font-bold font-mono text-rose-500/80 uppercase">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div className="text-left">
                        <label className="block text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-1.5">
                          Message Topic
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleInputChange}
                          placeholder="Project Integration Proposal"
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/30 border text-zinc-150 text-sm font-sans focus:outline-none focus:bg-zinc-900/60 focus:ring-1 focus:ring-zinc-500/30 transition-all placeholder-zinc-700 ${errors.subject ? 'border-rose-500/40 focus:border-rose-500' : 'border-zinc-900 focus:border-zinc-500/50'
                            }`}
                          disabled={status === 'loading'}
                        />
                        {errors.subject && (
                          <p className="mt-1 text-[9px] font-bold font-mono text-rose-500/80 uppercase">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message Content with tight rows={3} setting */}
                      <div className="text-left">
                        <label className="block text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-1.5">
                          Payload Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Type your message detail structure here..."
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/30 border text-zinc-150 text-sm font-sans focus:outline-none focus:bg-zinc-900/60 focus:ring-1 focus:ring-zinc-500/30 transition-all placeholder-zinc-700 resize-none ${errors.message ? 'border-rose-500/40 focus:border-rose-500' : 'border-zinc-900 focus:border-zinc-500/50'
                            }`}
                          disabled={status === 'loading'}
                        />
                        {errors.message && (
                          <p className="mt-1 text-[9px] font-bold font-mono text-rose-500/80 uppercase">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1 flex justify-start">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className={`w-full sm:w-auto min-w-[160px] relative overflow-hidden group/btn flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-[10px] font-bold font-mono tracking-wider transition-all duration-300 border select-none cursor-pointer ${status === 'loading'
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed'
                              : 'bg-white hover:bg-zinc-200 border-white text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-[0.98]'
                            }`}
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-500" />
                              TRANSMITTING...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                              SEND MESSAGE
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimalist Footer */}
      <div className="absolute bottom-6 left-0 w-full text-center z-10">
        <p className="text-[10px] sm:text-xs font-mono text-zinc-600 font-semibold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} All rights reserved by Arpit Raj &bull; Developed in 2026
        </p>
      </div>
    </section>
  );
}

