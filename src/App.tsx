import { useState, useEffect, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

const Certificates = lazy(() => import('./components/Certificates'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolled beyond 120 pixels
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#0a0a0c]">
      <Navbar isScrolled={isScrolled} />
      <Hero isScrolled={isScrolled} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-sm">LOADING SYSTEMS...</div>}>
        <Certificates />
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
    </main>
  );
}
