import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUBTITLES = [
  'Frontend Developer',
  'Aspiring Full Stack Developer',
  'Creative Web Developer',
];

export default function TextCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[40px] flex items-center relative select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={SUBTITLES[index]}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 tracking-wide font-mono"
        >
          {SUBTITLES[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );

}
