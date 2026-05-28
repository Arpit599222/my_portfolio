import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Database, Code2, ShieldAlert, Sparkles, CheckCircle2, Circle } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'data' | 'foundations';
  brandColor: string;
  logoUrl: string;
  description: string;
}

// Ensure interface fits validation rule (ending in 'Props')
export interface SkillsProps {}

const SKILLS_DATA: Skill[] = [
  {
    id: 'react',
    name: 'React Ecosystem',
    category: 'frontend',
    brandColor: '#61dafb',
    logoUrl: '/3d/React-icon.svg.png',
    description: 'Component lifecycle architectures, custom hooks, reactive state trees, and high-performance virtual DOM diffing.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'foundations',
    brandColor: '#3178c6',
    logoUrl: '/3d/typescript-programming-language-3d-icon-transparent-background-free-png.png',
    description: 'Strict typing contracts, generic utilities, mapped types, intersection shapes, and static compile-time validations.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'foundations',
    brandColor: '#f7df1e',
    logoUrl: '/3d/javascript-logo-javascript-icon-transparent-free-png.png',
    description: 'ES6+ asynchronous execution loops, closures, lexical scopes, event bubbling, and robust functional data transformations.'
  },
  {
    id: 'html5',
    name: 'HTML5 Semantic Web',
    category: 'foundations',
    brandColor: '#e34f26',
    logoUrl: '/3d/html5_23329.png',
    description: 'Semantic markup hierarchies, absolute DOM structure accessibility, SEO meta integrations, and valid markup layouts.'
  },
  {
    id: 'css3',
    name: 'CSS3 fluid Design',
    category: 'foundations',
    brandColor: '#1572b6',
    logoUrl: '/3d/CSS3_logo.svg.png',
    description: 'Advanced typography layouts utilizing CSS Grid, Flexbox alignment, custom variables, animation keyframes, and fluid layouts.'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap Layouts',
    category: 'frontend',
    brandColor: '#7952b3',
    logoUrl: '/3d/Bootstrap_logo.svg.png',
    description: 'Grid systems customization, fast responsive utility spacing layouts, and rapid framework component prototyping.'
  },
  {
    id: 'jquery',
    name: 'jQuery Core DOM',
    category: 'frontend',
    brandColor: '#0769ad',
    logoUrl: '/3d/jquery_vertical_logo_icon_169489.png',
    description: 'Simplified DOM traversals, lightweight animation cycles, event listener bindings, and legacy platform compatibility overrides.'
  },
  {
    id: 'git',
    name: 'Git Versioning',
    category: 'foundations',
    brandColor: '#f05032',
    logoUrl: '/3d/Git_icon.svg.png',
    description: 'Distributed version branch control setups, merge conflict resolutions, commit checkpoints, and terminal shell actions.'
  },
  {
    id: 'github',
    name: 'GitHub Hosting',
    category: 'foundations',
    brandColor: '#3f3f46',
    logoUrl: '/3d/github.png',
    description: 'Secure cloud repository synchronization, pull requests pipelines, collaborative actions, and documentation management.'
  },
  {
    id: 'java',
    name: 'Java Programming',
    category: 'foundations',
    brandColor: '#e76f00',
    logoUrl: '/3d/java-logo-1.png',
    description: 'Object-oriented programming structures, JVM memory models, multithreaded systems, and strong backend logic designs.'
  },
  {
    id: 'neo4j',
    name: 'Neo4j Graph DB',
    category: 'data',
    brandColor: '#008cc1',
    logoUrl: '/3d/neo4j.png',
    description: 'Relational data mapping schemas, Cypher querying patterns, heavy node relationship connections, and fast traversal queries.'
  },
  {
    id: 'snowflake',
    name: 'Snowflake Analytics',
    category: 'data',
    brandColor: '#29b5e8',
    logoUrl: '/3d/snow.png',
    description: 'Scalable data warehouse pipeline orchestration, fast SQL analytical queries, and bulk dataset warehouse migrations.'
  }
];

export default function Skills({}: SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'data' | 'foundations'>('all');

  // 3D holographic tilt states
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isInspectorHovered, setIsInspectorHovered] = useState(false);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Rotation mapping (up to 20 degrees tilt)
    const rotX = -(y / (rect.height / 2)) * 20;
    const rotY = (x / (rect.width / 2)) * 20;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setIsInspectorHovered(true);

    // Track dynamic background glow spotlight
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowStyle({
      background: `radial-gradient(circle 220px at ${pctX}% ${pctY}%, ${selectedSkill.brandColor}18, transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsInspectorHovered(false);
    setGlowStyle({});
  };

  const filteredSkills = SKILLS_DATA.filter(skill => {
    if (activeTab === 'all') return true;
    return skill.category === activeTab;
  });

  return (
    <section 
      className="scroll-mt-24 relative w-full bg-[#0a0a0c] px-6 py-20 sm:px-12 md:px-16 lg:px-24 border-t border-zinc-900 overflow-hidden"
      id="tech-stack"
    >
      {/* Decorative Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" 
        style={{
          maskImage: 'radial-gradient(ellipse_at_center, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse_at_center, black, transparent 75%)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/10 border border-zinc-500/20 text-zinc-300 text-[10px] font-bold tracking-widest font-mono mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // CAPABILITIES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            Core Tech <span className="text-zinc-500">Capabilities.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl font-medium"
          >
            A high-fidelity developer matrix. Filter by category, and select any system node to inspect detailed operational metrics.
          </motion.p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Skill Categories & Grid (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'frontend', 'data', 'foundations'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider font-mono uppercase transition-all duration-300 border ${
                    activeTab === tab
                      ? 'bg-zinc-100/10 border-zinc-500/40 text-zinc-300'
                      : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
                  }`}
                >
                  {tab === 'all' ? 'All Systems' : tab}
                </button>
              ))}
            </div>

            {/* Systems Grid Container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill.id === skill.id;
                  return (
                    <motion.button
                      layout
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedSkill(skill)}
                      style={{
                        borderColor: isSelected ? `${skill.brandColor}44` : ''
                      }}
                      className={`flex flex-col items-center justify-center p-5 rounded-xl border bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-300 gap-3 text-center group cursor-pointer relative ${
                        isSelected 
                          ? 'bg-zinc-900/80 shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
                          : 'border-zinc-800/60'
                      }`}
                    >
                      {/* Brand Colored Radial Glow on Hover/Active */}
                      <div 
                        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none blur-md`}
                        style={{ backgroundColor: skill.brandColor }}
                      />

                      {/* Icon */}
                      <motion.div 
                        animate={isSelected ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-950/50 p-2 border border-zinc-800 group-hover:border-zinc-700/50"
                      >
                        <img 
                          src={skill.logoUrl} 
                          alt={skill.name} 
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </motion.div>

                      {/* Skill Name */}
                      <span className={`text-[11px] font-bold font-mono tracking-wide ${
                        isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}>
                        {skill.name}
                      </span>

                      {/* Status indicator line */}
                      <div 
                        className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-t-full transition-transform duration-300 origin-center ${
                          isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                        }`}
                        style={{ backgroundColor: skill.brandColor }}
                      />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: High-Fidelity Details Inspector (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-stretch">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                perspective: '1000px',
                borderColor: isInspectorHovered ? `${selectedSkill.brandColor}33` : ''
              }}
              className="h-full flex flex-col bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden transition-all duration-350 select-none"
            >
              
              {/* Dynamic spotlight hover glow background */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={glowStyle}
              />
              
              {/* Base ambient colored corner glow */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 transition-colors duration-500"
                style={{ backgroundColor: selectedSkill.brandColor }}
              />

              {/* Inspector Header */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 mb-6 z-10">
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] font-bold tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-zinc-300" />
                  <span>3D PROJECTION ENGINE // ACTIVE</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" />
                </div>
              </div>

              {/* Inspector 3D Canvas Area */}
              <div 
                className="flex-1 flex flex-col items-center justify-center text-center z-10 py-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    style={{ 
                      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                      transformStyle: 'preserve-3d',
                      transition: isInspectorHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="flex flex-col items-center w-full relative"
                  >
                    {/* Giant 3D Holographic Logo Box (Floating in Z-axis!) */}
                    <div 
                      className="w-40 h-40 sm:w-48 sm:h-48 mb-8 rounded-3xl flex items-center justify-center bg-zinc-900/10 border border-zinc-800/40 p-6 shadow-2xl relative"
                      style={{
                        transform: 'translateZ(60px)',
                        transformStyle: 'preserve-3d',
                        boxShadow: `0 20px 40px -15px ${selectedSkill.brandColor}44`,
                        borderColor: isInspectorHovered ? `${selectedSkill.brandColor}44` : ''
                      }}
                    >
                      {/* Floating holographic logo */}
                      <img 
                        src={selectedSkill.logoUrl} 
                        alt={selectedSkill.name} 
                        style={{ transform: 'translateZ(20px)' }}
                        className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      />

                      {/* Backdrop glow plate */}
                      <div 
                        className="absolute inset-0 rounded-3xl blur-xl opacity-20 pointer-events-none"
                        style={{ 
                          backgroundColor: selectedSkill.brandColor,
                          transform: 'translateZ(-10px)'
                        }}
                      />
                    </div>

                    {/* Meta category details tag floating at slightly lower Z-axis */}
                    <span 
                      style={{ 
                        color: selectedSkill.brandColor,
                        borderColor: `${selectedSkill.brandColor}33`,
                        backgroundColor: `${selectedSkill.brandColor}11`,
                        transform: 'translateZ(30px)'
                      }}
                      className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest font-mono uppercase mb-4 border shadow-sm"
                    >
                      {selectedSkill.category}
                    </span>

                    {/* Holographic glowing title floating in Z-axis */}
                    <h4 
                      style={{ transform: 'translateZ(45px)' }}
                      className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono"
                    >
                      {selectedSkill.name}
                    </h4>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Decorative Scanline HUD text at bottom */}
              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-700 tracking-wider pt-4 border-t border-zinc-900 z-10 shrink-0 select-none">
                <span>SYSTEM MATRIX VERSION 2.4.0</span>
                <span>METRICS: OPTIMAL</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

