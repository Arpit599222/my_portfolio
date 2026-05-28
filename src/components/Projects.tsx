import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Terminal, Code2, Server, ShieldAlert, Cpu, Monitor, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  image: string;
  github: string | null;
  demo: string | null;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ProjectsProps {}

const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PROJECTS: Project[] = [
  {
    id: 'sentianshive',
    title: 'SentiansHive',
    category: 'Advanced Data Intelligence',
    description: 'A premium data intelligence and networking platform. Integrates advanced analytics and seamless entity mapping for robust data clustering and interactive visualization.',
    features: [
      'Real-time data visualization and entity mapping',
      'Advanced clustering algorithms',
      'Scalable microservices architecture',
      'Role-based access control and secure networking'
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    image: '/projects/sentianshive.png',
    github: 'https://github.com/Arpit599222',
    demo: null,
    icon: Server
  },
  {
    id: 'supply-chain-fraud',
    title: 'Supply Chain Fraud Intelligence',
    category: 'Graph-Based Dashboard',
    description: 'An enterprise-grade system designed to detect and investigate anomalies within complex supply chains. Utilizes graph database logic to map entities and instantly flag highly suspicious network clusters.',
    features: [
      'Graph-based anomaly detection',
      'Intuitive node investigation UI',
      'Automated risk scoring pipelines',
      'Interactive geospatial supply chain mapping'
    ],
    tech: ['React', 'Neo4j', 'Python', 'FastAPI'],
    image: '/projects/supply_chain_fraud.png',
    github: 'https://github.com/Arpit599222/FullStack_Ninjas-Supply-Chain-Fraud-Intelligence',
    demo: null,
    icon: ShieldAlert
  },
  {
    id: 'flowpass',
    title: 'FlowPass',
    category: 'AI Crowd Navigation',
    description: 'An advanced platform leveraging AI to predict and manage crowd flow. Features interactive smart maps, real-time heatmaps, and dynamic pathfinding algorithms to optimize event navigation and alleviate bottlenecks.',
    features: [
      'Real-time density heatmaps',
      'AI-driven crowd flow predictions',
      'Dynamic routing and pathfinding algorithms',
      'Event management dashboard integration'
    ],
    tech: ['Next.js', 'Tailwind', 'TensorFlow', 'PostgreSQL'],
    image: '/projects/flowpass.png',
    github: 'https://github.com/Arpit599222/FlowPass',
    demo: 'https://flowpass-454334103104.asia-south2.run.app/',
    icon: Cpu
  },
  {
    id: 'movie-seat-booking',
    title: 'Movie Seat Booking App',
    category: 'Frontend Interface',
    description: 'A sleek, responsive frontend interface for selecting cinema seats, calculating totals, and simulating a seamless booking experience. Built to master DOM manipulation, component state, and modern UI/UX principles.',
    features: [
      'Interactive seating grid with selection states',
      'Dynamic pricing and total calculations',
      'Responsive mobile-friendly design',
      'Optimized component rendering'
    ],
    tech: ['HTML', 'CSS', 'Vanilla JS', 'DOM'],
    image: '/projects/movie_seat_booking.png',
    github: 'https://github.com/Arpit599222/movie-seat-booking',
    demo: null,
    icon: Monitor
  }
];

export default function Projects({}: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <>
      <section 
        style={{ backgroundColor: '#0a0a0c' }}
        className="scroll-mt-24 relative w-full px-6 py-20 sm:px-12 md:px-16 lg:px-24 border-t border-zinc-900 overflow-hidden"
        id="projects"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header & Global Buttons */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/10 border border-zinc-500/20 text-zinc-300 text-[10px] font-bold tracking-widest font-mono mb-4"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>03 // SHOWCASE</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
              >
                Engineering <span className="text-zinc-500">Excellence.</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 text-sm sm:text-base font-medium max-w-lg"
              >
                A curated selection of robust, scalable systems and modern interfaces built to solve complex problems.
              </motion.p>
            </div>

            <motion.a
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              href="https://github.com/Arpit599222"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-500/50 rounded-xl text-white font-bold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <GitHubIcon className="w-5 h-5 text-zinc-450 group-hover:text-zinc-300 transition-colors" />
              <span className="text-xs font-mono tracking-wider">EXPLORE GITHUB</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Compact Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROJECTS.map((project, idx) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative w-full bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:border-zinc-500/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                >
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-500/0 via-transparent to-zinc-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-zinc-950/80 backdrop-blur-md rounded-xl border border-zinc-800 flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 text-zinc-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <p className="text-zinc-300 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                        {project.category}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-zinc-200 transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {project.tech.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-350 text-[10px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cinematic Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop blur */}
            <motion.div 
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              style={{ backgroundColor: 'rgba(10, 10, 12, 0.8)' }}
              className="absolute inset-0"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 hover:bg-black border border-white/10 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Column */}
              <div className="w-full md:w-1/2 h-[220px] md:h-auto relative bg-zinc-900">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent md:hidden block" />
              </div>

              {/* Data Column */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[80vh] flex flex-col">
                <p className="text-zinc-300 font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
                  {selectedProject.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                  {selectedProject.title}
                </h3>
                
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-white text-xs font-bold font-mono tracking-wider mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-zinc-300" />
                    KEY FEATURES
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-white text-xs font-bold font-mono tracking-wider mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-300" />
                    TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-350 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-auto">
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs transition-colors"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

