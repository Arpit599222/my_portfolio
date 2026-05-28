import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeScrolled = isMounted ? isScrolled : false;
  // Navigation trigger links
  const navLinks = [
    { label: '01 // JOURNEY', href: '#certificates' },
    { label: '02 // CAPABILITIES', href: '#tech-stack' },
    { label: '03 // SHOWCASE', href: '#projects' },
    { label: '04 // CONTACT', href: '#contact' }
  ];

  // Premium, ultra-fluid spring physics configuration for layout animations
  const morphTransition = {
    type: 'spring' as const,
    stiffness: 110,  // Lower stiffness for smooth, cinematic ease-in-out flight
    damping: 24,     // High damping to eliminate bounce/jiggles and maintain buttery elegance
    mass: 1.25       // Slightly heavier mass for organic momentum feel
  };

  return (
    <AnimatePresence>
      {activeScrolled && (
        <motion.nav
          initial={{ y: -80, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: -80, opacity: 0, x: '-50%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-1/2 z-50 w-[90%] max-w-5xl bg-zinc-950/70 border border-zinc-900/60 backdrop-blur-md rounded-2xl px-5 py-2.5 flex items-center justify-between shadow-2xl select-none"
        >
          {/* Left Brand Identity: Shrunken profile avatar & name morphing elastically from Hero */}
          <div className="flex items-center gap-3">
            {/* Morphing Avatar image frame */}
            <motion.div
              layoutId="hero-avatar"
              transition={morphTransition}
              className="relative w-8 h-8 rounded-full border border-white/10 flex-shrink-0 overflow-hidden"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
                <img
                  src="/avatar.jpg"
                  alt="Arpit Raj Profile"
                  className="w-full h-full object-cover grayscale-0"
                />
              </div>
            </motion.div>

            {/* Brand Name with Emerald Pulse Indicator */}
            <div className="flex items-center gap-2">
              {/* Morphing Name letters */}
              <motion.span
                layoutId="hero-name"
                transition={morphTransition}
                className="text-white text-xs font-bold font-mono tracking-widest uppercase block select-none"
              >
                <span>Arpit Raj</span>
              </motion.span>

              {/* Active indicator dot placed outside of layoutId to ensure perfect text morphing */}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            </div>
          </div>

          {/* Right Menu Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[9px] sm:text-[10px] font-bold font-mono text-zinc-400 hover:text-white transition duration-200 tracking-widest cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
