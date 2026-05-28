import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  X, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  FileText
} from 'lucide-react';

// Detailed Interface for Certificate
interface Certificate {
  id: string;
  title: string;
  type: string; // e.g. "Certificate of Completion", "Certificate of Excellence", "Participant"
  issuer: string;
  date: string;
  skillsVerified: string[];
  description: string;
  image?: string; // Image path. Omitted for Core Java
  verificationUrl: string;
}

// Category Interface representing a Milestone
interface Category {
  id: string;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  certificates: Certificate[];
}

const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend Development',
    description: 'Mastering interactive user interfaces, web standards, dynamic layouts, and modern component reactivity to construct clean, performant, and developer-friendly systems.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Next.js'],
    certificates: [
      {
        id: 'fe-completion',
        title: 'Web Development | Front End',
        type: 'Certificate of Completion',
        issuer: 'Coding Ninjas',
        date: 'July 2025',
        skillsVerified: ['React.js Development', 'Redux State Architecture', 'ES6+ Core JavaScript', 'Responsive Grid Interfaces', 'REST API Integration', 'DOM Lifecycle Mastery'],
        description: 'Awarded for successfully fulfilling all advanced core modules and structural web implementations of the Front End engineering syllabus.',
        image: '/cert-frontend.jpg',
        verificationUrl: '#',
      },
      {
        id: 'fe-excellence',
        title: 'Web Development | Front End',
        type: 'Certificate of Excellence',
        issuer: 'Coding Ninjas',
        date: 'July 2025',
        skillsVerified: ['Advanced Frontend Architecture', 'Code Refactoring & Optimizations', 'Component Hierarchy Design', 'High-Performance Layout Pipelines'],
        description: 'Awarded in recognition of outstanding performance, maintaining a superior standard, and achieving perfect scores across advanced system capstones.',
        image: '/Excellence_cert-frontend.jpg',
        verificationUrl: '#',
      },
      {
        id: 'html-gate',
        title: 'HTML Certificate',
        type: 'Certificate of Competency',
        issuer: 'Knowledge Gate',
        date: 'May 2025',
        skillsVerified: ['Semantic Markup', 'SEO Metadata Basics', 'Web Accessibility (a11y)', 'HTML5 Media Elements', 'Forms & Inputs Validation'],
        description: 'Rigorous validation of structural web development capabilities, ensuring standard compliance, proper semantic hierarchies, and accessible DOM architecture.',
        image: '/cert-html.jpg',
        verificationUrl: '#',
      },
      {
        id: 'css-gate',
        title: 'CSS Certificate',
        type: 'Certificate of Competency',
        issuer: 'Knowledge Gate',
        date: 'June 2025',
        skillsVerified: ['CSS Grid & Flexbox', 'Transitions & Keyframe Animations', 'Custom Styling Properties', 'Fluid Responsive Typography', 'Bento Layout Systems'],
        description: 'Comprehensive styling mastery covering complex layout systems, modern CSS variables, fluid responsive break-points, and high-performance smooth animations.',
        image: '/cert-css.jpg',
        verificationUrl: '#',
      }
    ]
  },
  {
    id: 'ai-tech',
    number: '02',
    title: 'AI & Modern Tech',
    description: 'Harnessing generative artificial intelligence models, semantic prompt architectures, vector pipelines, and rapid collaborative prototyping to construct next-generation digital applications.',
    techStack: ['Generative AI', 'LLM APIs', 'Prompt Engineering', 'Vector Database', 'Python', 'Node.js'],
    certificates: [
      {
        id: 'ai-completion',
        title: 'Web Development | Generative AI',
        type: 'Certificate of Completion',
        issuer: 'Coding Ninjas',
        date: 'December 2025',
        skillsVerified: ['LLM APIs Integration', 'Vector Embeddings', 'RAG Architectures', 'Prompt Templates', 'Autonomous Agentic logic'],
        description: 'Awarded for completing the structural and integration methodologies of Generative AI nodes inside full-stack applications.',
        image: '/cert-genai.jpg',
        verificationUrl: '#',
      },
      {
        id: 'ai-excellence',
        title: 'Web Development | Generative AI',
        type: 'Certificate of Excellence',
        issuer: 'Coding Ninjas',
        date: 'December 2025',
        skillsVerified: ['Advanced RAG Design', 'Semantic Cache Optimization', 'Multi-Agent Autonomous Workflows', 'Model Tokens Cost Optimization'],
        description: 'Awarded for achieving distinguished excellence and flawless final project deployment, integrating autonomous agent systems and semantic search indexing.',
        image: '/exellence_cert-genai.jpg',
        verificationUrl: '#',
      },
      {
        id: 'ai-bootcamp',
        title: 'Build with AI Bootcamp',
        type: 'Participant Certificate',
        issuer: 'Hack2Skill',
        date: 'March 2026',
        skillsVerified: ['AI Model Integration', 'Rapid SaaS Prototyping', 'Model Fine-tuning Basics', 'Multimodal LLM Applications', 'API Orchestration under Constraint'],
        description: 'Intense collaborative boot camp focused on building practical, production-ready AI tools, solving real-world challenges through rapid prototyping and deep learning models.',
        image: '/cert-bootcamp.jpg',
        verificationUrl: '#',
      }
    ]
  },
  {
    id: 'programming',
    number: '03',
    title: 'Programming & Logic',
    description: 'Establishing strong foundational logic, algorithmic paradigms, object-oriented concepts, and robust architecture patterns to construct scalable enterprise-level software systems.',
    techStack: ['Java', 'Object-Oriented Design', 'Algorithms', 'Data Structures', 'Threading Basics', 'Software Design Patterns'],
    certificates: [
      {
        id: 'java-core',
        title: 'Core Java Certificate',
        type: 'Certificate of Proficiency',
        issuer: 'Coding Ninjas',
        date: 'April 2026',
        skillsVerified: ['OOP Principles & Inheritance', 'Java Collections Framework', 'Multithreading & Concurrency', 'Exceptions Safety & Handling', 'Memory Allocations & Garbage Collection', 'File I/O Streams'],
        description: 'Rigorous training covering core logical syntax, standard data structures, concurrency controls, multi-threading safety, object inheritance hierarchies, and memory layouts.',
        image: '/cert-java.jpg',
        verificationUrl: '#',
      }
    ]
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const localCanvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  // Reset modal image load state and lock body scroll when modal is active
  useEffect(() => {
    setModalImageLoaded(false);
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  // Self-contained subtle ambient dust animation for background depth
  useEffect(() => {
    if (!localCanvasRef.current) return;
    const canvas = localCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Distribute local ambient particles
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.5 + Math.random() * 1.5,
        speedY: -(0.05 + Math.random() * 0.15), // Slow upward drift
        opacity: 0.1 + Math.random() * 0.35,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(228, 228, 231, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Slow float
        p.y += p.speedY;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="certificates" className="scroll-mt-24 relative w-full bg-[#0a0a0c] px-4 py-24 sm:px-8 md:px-16 lg:px-24 border-t border-zinc-900 select-none z-20 overflow-hidden">
      {/* Self-contained ambient starlight canvas */}
      <canvas
        ref={localCanvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full opacity-60"
      />

      {/* Grid Mesh Background Decor */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" 
        style={{
          maskImage: 'radial-gradient(ellipse_at_center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse_at_center, black, transparent 80%)'
        }}
      />

      {/* Sleek radial vignette background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-zinc-400 text-[10px] font-bold tracking-widest font-mono select-none"
          >
            <Award className="w-3.5 h-3.5 text-zinc-500" />
            <span>JOURNEY WORKSPACE & MILESTONES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans"
          >
            Learning Progress & Credentials
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base leading-relaxed font-medium"
          >
            An interactive showcase structured as an engineering roadmap, mapping core foundations, AI capabilities, and algorithmic architectures that solidify a developer's trajectory.
          </motion.p>
        </div>

        {/* Timeline Journey Container */}
        <div className="relative space-y-16 lg:space-y-24 pt-8">
          
          {/* SVG Connector Pathway (Skill Growth Path) - Shifted completely to the left */}
          <div className="absolute left-8 lg:left-12 top-16 bottom-16 w-[1.5px] pointer-events-none hidden md:block">
            {/* Background Muted Track Line */}
            <div className="w-full h-full bg-zinc-800/60 border-l border-zinc-800/80 border-dashed" />
            
            {/* Animated Flowing Starlight Pulse */}
            <div 
              className="absolute w-[3px] h-32 bg-gradient-to-b from-transparent via-zinc-400 to-transparent left-[-1px] rounded-full animate-flow-pulse"
              style={{
                animationDuration: '6s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear'
              }}
            />
          </div>

          {/* Categories / Milestones Iteration */}
          {CATEGORIES.map((category, catIdx) => {
            return (
              <div 
                key={category.id} 
                className="relative flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start pl-8 md:pl-16 lg:pl-24"
              >
                {/* Visual Connector Milestone Node - Shifted completely to the left */}
                <div 
                  className="absolute left-8 lg:left-12 translate-x-[-50%] top-6 w-8 h-8 rounded-full border border-zinc-800 bg-[#0a0a0c] flex items-center justify-center z-15 shadow-xl hidden md:flex"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-pulse" />
                </div>

                {/* Left Side: Category Card Info Glass Container */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="col-span-12 lg:col-span-4 flex flex-col space-y-6 w-full"
                >
                  <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 space-y-5 select-none relative group hover:border-zinc-800 transition duration-300">
                    
                    {/* Top Tag Metadata */}
                    <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 flex items-center gap-1.5">
                        <span className="text-zinc-400 font-black">{category.number}</span> 
                        <span className="text-zinc-600">//</span> 
                        <span>MILESTONE FOUNDRY</span>
                      </span>
                      
                      {category.id === 'frontend' && <Code className="w-4 h-4 text-zinc-450" />}
                      {category.id === 'ai-tech' && <Cpu className="w-4 h-4 text-zinc-450" />}
                      {category.id === 'programming' && <Terminal className="w-4 h-4 text-zinc-450" />}
                    </div>

                    {/* Headline */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-zinc-200 transition duration-200">
                        {category.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                        {category.description}
                      </p>
                    </div>

                    {/* Tech Stack Chip Grid */}
                    <div className="space-y-3 pt-2">
                      <span className="block text-[9px] font-bold font-mono text-zinc-500 tracking-wider">
                        UTILITIES AND TECHNOLOGIES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {category.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wide rounded-md bg-zinc-950/60 text-zinc-400 border border-zinc-850 hover:border-zinc-800 transition duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill growth connection path text indicator */}
                    {catIdx < CATEGORIES.length - 1 && (
                      <div className="flex items-center gap-2 text-[10px] font-bold font-mono text-zinc-500 pt-2 tracking-wider">
                        <span>NEXT MILESTONE</span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-650" />
                        <span className="text-zinc-400 uppercase">
                          {CATEGORIES[catIdx + 1].title.split(' ')[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Right Side: Certificates Grid */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="col-span-12 lg:col-span-8 flex flex-col space-y-4 w-full"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {category.certificates.map((cert) => {
                      const hasImage = !!cert.image;

                      return (
                        <div
                          key={cert.id}
                          onClick={() => setSelectedCert(cert)}
                          className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md p-5 cursor-pointer hover:border-zinc-500/50 hover:bg-zinc-900/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] select-none"
                        >
                          <div className="space-y-4">
                            
                            {/* Certificate Image Frame / Technical Mockup */}
                            {hasImage ? (
                              <div className="relative w-full h-36 overflow-hidden rounded-lg bg-zinc-950/60 border border-zinc-850/80 flex items-center justify-center">
                                {/* Elegant shimmer skeleton loading placeholder */}
                                {!loadedImages[cert.id] && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 bg-[length:200%_100%] animate-shimmer" />
                                )}
                                
                                {/* Monochromatic Grayscale Image with smooth fade-in */}
                                <div className={`absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-102 group-hover:scale-105 ${
                                  loadedImages[cert.id] ? 'opacity-100' : 'opacity-0'
                                }`}>
                                  <img
                                    src={cert.image!}
                                    alt={cert.title}
                                    className="object-cover absolute inset-0 w-full h-full"
                                    onLoad={() => setLoadedImages(prev => ({ ...prev, [cert.id]: true }))}
                                  />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent opacity-85 pointer-events-none" />
                                
                                {/* Overlay award badge on default */}
                                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 text-zinc-400 group-hover:text-white transition duration-300 z-10">
                                  <Award className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            ) : (
                              /* Core Java Premium Mockup Placeholder Card */
                              <div className="relative w-full h-36 overflow-hidden rounded-lg bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-850/80 flex flex-col justify-between p-3 select-none">
                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:10px_10px]" />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                                
                                <div className="flex items-center justify-between z-10">
                                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono tracking-widest bg-zinc-850 border border-zinc-800 text-zinc-500">
                                    CORE SYSTEM
                                  </span>
                                  <Award className="w-3.5 h-3.5 text-zinc-650 group-hover:text-zinc-400 transition duration-300" />
                                </div>

                                <div className="space-y-0.5 z-10">
                                  <div className="text-[10px] font-black text-zinc-400 tracking-wide uppercase font-mono">
                                    CORE JAVA SPECIALIST
                                  </div>
                                  <div className="text-[8px] font-bold text-zinc-600 font-mono tracking-wider">
                                    VERIFICATION READY // LOCK STATE
                                  </div>
                                </div>

                                <div className="flex items-center justify-between text-[7px] font-bold font-mono text-zinc-500 z-10 border-t border-zinc-850 pt-2">
                                  <span>CREDENTIAL RECORD</span>
                                  <span className="text-zinc-600 font-black">IMAGE ADDED LATER</span>
                                </div>
                              </div>
                            )}

                            {/* Details Info */}
                            <div className="space-y-2">
                              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition duration-300" />
                                {cert.issuer}
                              </span>
                              
                              <h4 className="text-base font-extrabold text-white leading-snug group-hover:text-zinc-200 transition duration-200">
                                {cert.title}
                              </h4>
                              
                              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                {cert.description}
                              </p>
                            </div>
                          </div>

                          {/* Date and CTA */}
                          <div className="pt-4 mt-4 border-t border-zinc-850/80 flex items-center justify-end text-[10px] font-bold font-mono tracking-wider">
                            <span className="text-zinc-400 group-hover:text-white flex items-center gap-1 transition duration-200">
                              <span>PREVIEW</span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition duration-200" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Verification overlay modal preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 350 } }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-[#0d0d10] border border-zinc-800/80 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/80 border border-zinc-850/80 text-zinc-400 hover:text-white hover:border-zinc-700 transition duration-200 shadow focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[400px]">
                
                {/* Left Panel: Scaled Image Visual / Blueprint Card */}
                <div className="relative lg:col-span-7 h-64 sm:h-80 lg:h-auto bg-zinc-950 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-850/80 p-4 select-none">
                  {selectedCert.image ? (
                    <div className="relative w-full h-full min-h-[180px]">
                      {/* Full-screen Modal Image Shimmer Loader */}
                      {!modalImageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 bg-[length:200%_100%] animate-shimmer" />
                      )}
                      
                      <div className={`w-full h-full transition-opacity duration-500 ${
                        modalImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <img
                          src={selectedCert.image}
                          alt={selectedCert.title}
                          className="object-contain w-full h-full"
                          onLoad={() => setModalImageLoaded(true)}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Core Java Large Scale Blueprint Preview */
                    <div className="relative w-full max-w-md h-full min-h-[240px] rounded-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-dashed border-zinc-800/80 flex flex-col justify-between p-6">
                      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400">
                          SYSTEM VERIFIED RECORD
                        </span>
                        <ShieldCheck className="w-5 h-5 text-zinc-500" />
                      </div>

                      <div className="space-y-4 py-6">
                        <div className="space-y-1">
                          <span className="block text-[8px] font-bold font-mono text-zinc-500 tracking-wider">
                            CERTIFICATE TITLE
                          </span>
                          <h4 className="text-xl font-extrabold tracking-wide text-white font-mono uppercase">
                            {selectedCert.title}
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[8px] font-bold font-mono text-zinc-500 tracking-wider">
                              VERIFICATION ID
                            </span>
                            <span className="text-xs font-semibold text-zinc-400 font-mono">
                              CR-JV-{selectedCert.id.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold font-mono text-zinc-500 tracking-wider">
                              HOLDER NAME
                            </span>
                            <span className="text-xs font-semibold text-zinc-400 font-mono">
                              ARPIT RAJ
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex flex-col space-y-1 text-[8px] font-bold font-mono text-zinc-500">
                        <span className="text-[10px] text-zinc-400">STATUS: LOCKED VERIFIED</span>
                        <span>CERTIFICATE COPY IMAGE WILL BE MANUALLY UPLOADED LATER</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Panel: Detail Deck */}
                <div className="p-5 sm:p-6 lg:col-span-5 flex flex-col justify-between bg-zinc-900/10">
                  <div className="space-y-4">
                    
                    {/* Badge and Title */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-zinc-400 tracking-widest uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                        <span>ISSUED BY {selectedCert.issuer}</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                        {selectedCert.title}
                      </h3>
                      
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold font-mono tracking-wider rounded bg-zinc-950 text-zinc-400 border border-zinc-850">
                        {selectedCert.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-1.5 pt-4 border-t border-zinc-850/80">
                      <span className="block text-[8px] font-bold font-mono text-zinc-500 tracking-wider uppercase">
                        CREDENTIAL SYLLABUS
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-450 leading-relaxed font-medium">
                        {selectedCert.description}
                      </p>
                    </div>

                    {/* Verified capabilities list */}
                    <div className="space-y-2">
                      <span className="block text-[8px] font-bold font-mono text-zinc-500 tracking-wider uppercase">
                        VERIFIED CAPABILITIES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skillsVerified.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850/60 text-zinc-300 text-[10px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Verification CTA Button */}
                  <div className="pt-4 mt-4 border-t border-zinc-850/80">
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-zinc-200 hover:bg-white text-zinc-950 font-bold rounded-xl text-xs font-mono tracking-wider transition duration-200 shadow"
                    >
                      <FileText className="w-4 h-4" />
                      <span>VERIFY CREDENTIAL</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
