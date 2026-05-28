import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import TextCycler from './TextCycler';

interface HeroProps {
  isScrolled: boolean;
}

export default function Hero({ isScrolled }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeScrolled = isMounted ? isScrolled : false;

  // Premium, ultra-fluid spring physics configuration for layout animations
  const morphTransition = {
    type: 'spring' as const,
    stiffness: 110,  // Lower stiffness for smooth, cinematic ease-in-out flight
    damping: 24,     // High damping to eliminate bounce/jiggles and maintain buttery elegance
    mass: 1.25       // Slightly heavier mass for organic momentum feel
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // Up-slide fade items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const, // Custom premium ease-out cast as const
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0c] px-4 py-20 sm:px-8 md:px-16 lg:px-24">
      {/* Clean Interactive Particles Backdrop */}
      <ParticlesBackground />

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Side: Minimalist Profile Avatar */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1"
        >
          {/* Subtle slow floating motion wrapper */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative group select-none"
          >
            {/* Elegant outer blur ring (highly subtle gray highlight) */}
            <div className="absolute -inset-1 bg-white/5 rounded-full opacity-40 blur-sm group-hover:opacity-75 transition duration-500 pointer-events-none" />

            {/* Invisible circular layout placeholder keeping Hero grid dimensions perfectly stable */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full relative pointer-events-none opacity-0 select-none">
              {/* Grid skeleton */}
            </div>

            {/* The active morphing avatar, rendered absolutely inside the container frame to animate elastically */}
            <AnimatePresence>
              {!activeScrolled && (
                <motion.div
                  layoutId="hero-avatar"
                  transition={morphTransition}
                  className="absolute inset-0 z-10 w-full h-full rounded-full p-[2px] bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
                    <img
                      src="/avatar.jpg"
                      alt="Developer Avatar"
                      className="w-full h-full object-cover scale-102 group-hover:scale-105 transition duration-500 ease-out grayscale group-hover:grayscale-0 pointer-events-none select-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimal Active Badge (Fades out when scrolled) */}
            <AnimatePresence>
              {!activeScrolled && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-zinc-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 flex items-center gap-2 shadow-md z-20"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-zinc-300 font-mono tracking-wider">
                    AVAILABLE
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Right Side: Copy & Buttons */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2 space-y-6 sm:space-y-8"
        >
          {/* Subtle work indicator tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-zinc-400 text-xs font-semibold tracking-widest font-mono select-none">
            <Sparkles className="w-3 h-3 text-zinc-500" />
            <span>PORTFOLIO 2026</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white select-none">
              Hi, I&apos;m{' '}
              <span className="relative inline-block min-w-[180px] sm:min-w-[260px] text-left">
                {/* Invisible static name keeping width/height perfectly stable */}
                <span className="opacity-0 font-black">Arpit Raj</span>
                
                {/* Active morphing name */}
                <AnimatePresence>
                  {!activeScrolled && (
                    <motion.span
                      layoutId="hero-name"
                      transition={morphTransition}
                      className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 font-black whitespace-nowrap block"
                    >
                      <span>Arpit Raj</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </h1>
            <TextCycler />
          </div>

          {/* Short professional description */}
          <p className="max-w-xl text-base sm:text-lg text-zinc-400 font-medium leading-relaxed">
            Architecting next-generation digital interfaces and high-performance web systems. Bridging minimal modern aesthetics with clean, optimized, and developer-friendly codebases.
          </p>

          {/* Minimalist Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* View Projects: clean flat white button */}
            <a href="#projects" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-bold rounded-xl text-sm transition duration-200 cursor-pointer font-mono tracking-wider shadow-sm group">
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition duration-200" />
            </a>

            {/* Contact Me: transparent thin outline button */}
            <a href="#contact" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-transparent text-zinc-300 hover:text-white font-bold text-sm transition duration-200 cursor-pointer font-mono tracking-wider">
              <Mail className="w-4 h-4" />
              <span>CONTACT ME</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent pointer-events-none" />
    </section>
  );
}
