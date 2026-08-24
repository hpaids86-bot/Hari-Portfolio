import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TiltCard from './TiltCard';
import CountUpAnimation from './CountUpAnimation';

// --- DATA DEFINITIONS ---

const STATS = [
  { icon: '💻', label: 'Languages', value: '4+' },
  { icon: '⚙️', label: 'Frameworks', value: '5+' },
  { icon: '☁️', label: 'Cloud Platforms', value: 'AWS', isText: true },
  { icon: '🛠️', label: 'Development Tools', value: '10+' }
];

const CATEGORIES = [
  {
    title: 'Programming Languages',
    icon: '💻',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', desc: 'Primary language for AI, data analysis, and backend development.' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', desc: 'Object-oriented programming and application building.' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', desc: 'Dynamic web scripting and full-stack integration.' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', desc: 'Type-safe JavaScript for scalable frontend development.' }
    ]
  },
  {
    title: 'Frontend Development',
    icon: '🌐',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', desc: 'Semantic web structure and accessibility layout.' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', desc: 'Responsive page styling and visual interfaces.' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', desc: 'Component-based single page application frameworks.' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', desc: 'Utility-first CSS styling for rapid UI creation.' },
      { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', desc: 'Advanced animations and interactive layouts in React.' }
    ]
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', desc: 'High-performance Python backend API framework.' },
      { name: 'REST API', icon: '🌐', desc: 'Designing secure, stateless web APIs and integrations.', isEmoji: true },
      { name: 'Python Backend', icon: '🐍', desc: 'Developing structured, object-oriented server applications.', isEmoji: true }
    ]
  },
  {
    title: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', desc: 'Relational database schema design and SQL querying.' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', desc: 'Advanced relational database storage, indexes, and procedures.' }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', desc: 'Cloud architecture design, EC2, RDS, and S3.' },
      { name: 'Cloud Computing', icon: '☁️', desc: 'Deploying secure, highly-available remote infrastructure.', isEmoji: true },
      { name: 'Virtualization', icon: '🖥️', desc: 'Hosting isolated development systems and hypervisors.', isEmoji: true },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', desc: 'Distributed codebase version control system.' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', desc: 'Remote codebase collaboration and CI/CD actions.' },
      { name: 'Docker (Learning)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', desc: 'Containerizing services for consistent delivery.' }
    ]
  },
  {
    title: 'Artificial Intelligence',
    icon: '🤖',
    skills: [
      { name: 'Artificial Intelligence', icon: '🧠', desc: 'Studying neural networks, logic representation, and models.', isEmoji: true },
      { name: 'Machine Learning', icon: '🤖', desc: 'Implementing regression, classification, and clustering baselines.', isEmoji: true },
      { name: 'Natural Language Processing', icon: '💬', desc: 'Text clustering, TF-IDF representations, and topic models.', isEmoji: true },
      { name: 'Generative AI', icon: '✨', desc: 'Engineering conversational interfaces and multi-agent designs.', isEmoji: true },
      { name: 'Prompt Engineering', icon: '✍️', desc: 'Constructing context-rich instructions for large language models.', isEmoji: true }
    ]
  },
  {
    title: 'Development Tools',
    icon: '🛠️',
    skills: [
      { name: 'Visual Studio Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', desc: 'Primary IDE for full-stack, styling, and model design.' },
      { name: 'GitHub Desktop', icon: '💻', desc: 'Local repository version visualizer and branch management.', isEmoji: true },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', desc: 'Testing backend endpoint integrations and headers.' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', desc: 'Visual app mockups and structural UI design.' },
      { name: 'Windows Terminal', icon: '🐚', desc: 'Shell scripting, ssh connection, and git operations.', isEmoji: true }
    ]
  }
];

const WALL_ICONS = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', desc: 'Primary language for AI, data analysis, and backend development.' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', desc: 'Object-oriented programming and application building.' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', desc: 'Semantic web structure and accessibility layout.' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', desc: 'Responsive page styling and visual interfaces.' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', desc: 'Dynamic web scripting and full-stack integration.' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', desc: 'Type-safe JavaScript for scalable frontend development.' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', desc: 'Component-based single page application frameworks.' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', desc: 'Utility-first CSS styling for rapid UI creation.' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', desc: 'High-performance Python backend API framework.' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', desc: 'Relational database schema design and SQL querying.' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', desc: 'Advanced relational database storage, indexes, and procedures.' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', desc: 'Distributed codebase version control system.' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', desc: 'Remote codebase collaboration and CI/CD actions.' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', desc: 'Cloud architecture design, EC2, RDS, and S3.' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', desc: 'Containerizing services for consistent delivery.' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', desc: 'Primary IDE for full-stack, styling, and model design.' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', desc: 'Testing backend endpoint integrations and headers.' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', desc: 'Visual app mockups and structural UI design.' }
];

const ORBIT_ICONS = [
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    category: 'Programming Languages',
    desc: 'Primary programming language for building AI, data extraction, and backend scripts.',
    level: 'Advanced (2+ Years)',
    projects: ['EduPath AI Analyzer', 'Eco-Tree Impact Analyzer'],
    certifications: ['Advanced Python Essentials']
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    category: 'Frontend Development',
    desc: 'Component architecture framework for highly-interactive, responsive UI dashboards.',
    level: 'Intermediate (1+ Years)',
    projects: ['EduPath AI Analyzer', 'AI Console Resume', 'Developer Portfolio'],
    certifications: ['Meta Front-End Developer']
  },
  {
    name: 'FastAPI',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    category: 'Backend Development',
    desc: 'Python-based server API platform to expose machine learning clusters and text parser endpoints.',
    level: 'Intermediate (1+ Years)',
    projects: ['EduPath AI Analyzer'],
    certifications: []
  },
  {
    name: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    category: 'Cloud & DevOps',
    desc: 'Cloud environment management including EC2 instances, RDS tables, and automated S3 assets.',
    level: 'Learning & Deploying',
    projects: ['Cloud-deployed API structures'],
    certifications: ['AWS Cloud Practitioner (In Progress)']
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    category: 'Database',
    desc: 'Structured database engine to handle complex relational schemas and persistent project stats.',
    level: 'Intermediate',
    projects: ['EduPath AI Analyzer'],
    certifications: []
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    category: 'DevOps',
    desc: 'Container engines to package service models, backend servers, and web assets uniformly.',
    level: 'Familiar / Learning',
    projects: ['FastAPI containerization deployments'],
    certifications: []
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    category: 'Frontend Development',
    desc: 'Creating visual interface dynamics, terminal console parsing, and API interactions.',
    level: 'Intermediate (1.5+ Years)',
    projects: ['Eco-Tree Impact Analyzer', 'AI Console Resume', 'Developer Portfolio'],
    certifications: []
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    category: 'Cloud & DevOps',
    desc: 'Cloud control repository for CI/CD actions, version management, and open-source packages.',
    level: 'Advanced',
    projects: ['All Showcase Repositories'],
    certifications: []
  }
];

const CURRENTLY_LEARNING = [
  'AWS Cloud', 'Docker', 'System Design', 'Advanced React', 'Cloud Security', 'CI/CD', 'Microservices', 'Prompt Engineering'
];

export default function TechStackSection() {
  const [activeOrbitItem, setActiveOrbitItem] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const [angle, setAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const requestRef = useRef();

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  // Calculate coordinates for Orbit items tilted by 15 degrees
  // Parametric coordinates of rotated ellipse:
  // x = a * cos(t) * cos(phi) - b * sin(t) * sin(phi)
  // y = a * cos(t) * sin(phi) + b * sin(t) * cos(phi)
  const getOrbitPosition = (index, total) => {
    // Distribute angles uniformly
    const itemAngle = angle + (index * 2 * Math.PI) / total;

    // Define major and minor axes based on window sizing
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const a = isMobile ? 120 : 250; // horizontal radius
    const b = isMobile ? 45 : 90;   // vertical radius

    const cosT = Math.cos(itemAngle);
    const sinT = Math.sin(itemAngle);

    // 15 degrees tilt in radians
    const phi = (15 * Math.PI) / 180;

    const x = a * cosT * Math.cos(phi) - b * sinT * Math.sin(phi);
    const y = a * cosT * Math.sin(phi) + b * sinT * Math.cos(phi);
    const z = sinT; // depth mapping from -1 (back) to 1 (front)

    return { x, y, z };
  };

  // Rotation animation loop
  useEffect(() => {
    const animate = () => {
      if (isRotating) {
        setAngle((prev) => prev + 0.004); // Speed of rotation
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRotating]);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative w-full py-32 bg-[#F8F5F0] overflow-hidden"
      aria-label="Engineering Toolkit"
    >
      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#EFE8DD] opacity-30" />
        <div className="absolute inset-0 animated-grid opacity-[0.35]" />
        <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#E8DDCF]/40 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#C8A977]/5 blur-[120px] animate-float" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* ======================================================
            SECTION HEADER
            ====================================================== */}
        <div className="text-center mb-20">
          <div className="glass-badge text-[#111111]">
            ⚡ Technology Stack
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-gradient mb-6"
          >
            Engineering Toolkit
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base md:text-lg text-zinc-400 font-sans leading-relaxed"
          >
            A curated collection of technologies, frameworks, programming languages, cloud platforms, databases, and development tools I use to design, develop, and deploy modern software solutions.
          </motion.p>
        </div>

        {/* ======================================================
            INTERACTIVE 3D ORBIT SHOWCASE
            ====================================================== */}
        <div className="w-full flex flex-col items-center justify-center mb-28">
          <div className="text-center mb-6 z-20">
            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase border border-[#00E5FF]/20 px-3 py-1 bg-zinc-950/40 rounded-full select-none">
              Interactive 3D Tech Orbit
            </span>
            <p className="text-[11px] text-zinc-500 font-sans mt-2">Hover to inspect details • Click to view specific project credentials</p>
          </div>

          {/* Orbit Arena Container */}
          <div className="relative w-full max-w-4xl h-[340px] md:h-[450px] flex items-center justify-center select-none bg-radial-glow">
            
            {/* Ellipse Orbit Rings visual helper */}
            <div
              className="absolute rounded-full border border-zinc-800/40 pointer-events-none transform rotate-[15deg] w-[240px] h-[90px] md:w-[500px] md:h-[180px] -z-10"
              style={{
                boxShadow: '0 0 40px rgba(79,70,229,0.02)'
              }}
            />

            {/* Orbit Center Initials Node (HR) */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-zinc-950/80 border border-zinc-800 flex items-center justify-center z-10 shadow-2xl group cursor-none">
              {/* Outer pulsing gradients */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-secondary to-[#00E5FF] opacity-35 blur-md animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center relative z-10">
                <span className="text-xl md:text-2xl font-black font-display text-gradient tracking-wide">HR</span>
                <span className="text-[9px] font-mono text-zinc-500">ENGINEER</span>
              </div>
            </div>

            {/* Orbiting Tech Nodes */}
            {ORBIT_ICONS.map((item, idx) => {
              const { x, y, z } = getOrbitPosition(idx, ORBIT_ICONS.length);
              
              // depth mappings
              const scale = 0.85 + (z + 1) * 0.175; // scale from 0.85 to 1.2
              const opacity = 0.5 + (z + 1) * 0.25;  // opacity from 0.5 to 1.0
              const zIndex = Math.round((z + 1) * 10); // z-index from 0 to 20

              const isHovered = activeOrbitItem && activeOrbitItem.name === item.name;

              return (
                <div
                  key={item.name}
                  className="absolute cursor-pointer transition-shadow duration-300 rounded-2xl flex items-center justify-center p-2.5 md:p-4 border bg-zinc-950/80 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700 shadow-2xl group"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${isHovered ? scale * 1.15 : scale})`,
                    opacity: isHovered ? 1 : opacity,
                    zIndex: isHovered ? 50 : zIndex,
                    boxShadow: isHovered ? `0 0 25px rgba(79,70,229,0.3)` : 'none',
                    transition: 'transform 0.1s ease-out, opacity 0.2s ease-out, box-shadow 0.3s ease-out'
                  }}
                  onMouseEnter={() => {
                    setIsRotating(false);
                    setActiveOrbitItem(item);
                  }}
                  onMouseLeave={() => {
                    setIsRotating(true);
                    setActiveOrbitItem(null);
                  }}
                  onClick={() => setModalItem(item)}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 md:w-8 md:h-8 object-contain"
                  />

                  {/* Display floating name for items in the front */}
                  {z > 0.15 && (
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-850 px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}

          </div>

          {/* Interactive Details display card (based on orbit hover) */}
          <div className="w-full max-w-xl min-h-[92px] px-6 py-4 rounded-2xl border border-black/10 bg-white/65 backdrop-blur-md flex flex-col justify-center text-center shadow-luxury">
            {activeOrbitItem ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span className="text-sm font-extrabold text-[#111111] font-display">{activeOrbitItem.name}</span>
                  <span className="text-[10px] font-mono text-[#9B9B9B]">[{activeOrbitItem.category}]</span>
                </div>
                <p className="text-xs text-[#5B5B5B] font-sans leading-relaxed">{activeOrbitItem.desc}</p>
              </motion.div>
            ) : (
              <p className="text-xs text-[#9B9B9B] font-sans leading-relaxed">
                Hover over the orbiting technologies to explore their structural role. Click on an icon to examine specific projects and certifications.
              </p>
            )}
          </div>

        </div>

        {/* ======================================================
            TECHNOLOGY STATS GRID
            ====================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-5 border border-black/[0.08] bg-white/65 hover:bg-white/80 flex items-center gap-4 group shadow-luxury"
            >
              <div className="w-10 h-10 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center text-lg group-hover:scale-110 group-hover:shadow-luxury-hover transition-all duration-300">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-wider text-[#9B9B9B] uppercase">{stat.label}</p>
                <h4 className="text-xl font-black font-display text-[#111111] mt-0.5">
                  {stat.isText ? (
                    stat.value
                  ) : (
                    <CountUpAnimation target={parseInt(stat.value, 10)} suffix={stat.value.includes('+') ? '+' : ''} duration={1500} />
                  )}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================
            CATEGORIZED TOOLKIT GRID
            ====================================================== */}
        <div className="mb-28">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#111111] font-display">Categorized Capabilities</h3>
            <p className="text-sm text-[#5B5B5B] font-sans">Specialized systems grouped by platform architectural layer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <TiltCard
                key={idx}
                className="border border-black/[0.08] bg-white/65 p-6 flex flex-col justify-between h-full group shadow-luxury"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-black/[0.06] pb-3">
                    <span className="text-lg select-none">{cat.icon}</span>
                    <h4 className="text-base font-bold text-[#111111] font-display group-hover:text-[#C8A977] transition-colors duration-200">
                      {cat.title}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 group/skill relative">
                        {skill.isEmoji ? (
                          <div className="text-lg w-6 h-6 flex items-center justify-center select-none flex-shrink-0">
                            {skill.icon}
                          </div>
                        ) : (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6 object-contain flex-shrink-0"
                            style={{
                              filter: skill.name === 'SQL' ? 'invert(1) brightness(1.2)' : 'none'
                            }}
                          />
                        )}
                        <div>
                          <h5 className="text-xs font-bold text-[#111111] group-hover/skill:text-[#C8A977] transition-colors duration-200">
                            {skill.name}
                          </h5>
                          <p className="text-[11px] text-[#5B5B5B] font-sans leading-relaxed mt-0.5">
                            {skill.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* ======================================================
            TECHNOLOGY WALL (FLOATING WALL)
            ====================================================== */}
        <div className="mb-28">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#111111] font-display">Technology Wall</h3>
            <p className="text-sm text-[#5B5B5B] font-sans">Continuous floating showcase of engineering assets and utilities</p>
          </div>

          <div className="glass-card p-8 border border-black/[0.08] bg-white/65 relative overflow-visible shadow-luxury">
            {/* wall icons container */}
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {WALL_ICONS.map((wallItem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.9, y: 0 }}
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, idx % 2 === 0 ? 3 : -3, 0]
                  }}
                  transition={{
                    duration: 4 + (idx % 3),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.15
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                  className="relative cursor-pointer p-4 border border-black/[0.06] bg-white/70 hover:bg-[#EFE8DD] rounded-xl hover:border-[#C8A977] group shadow-luxury-card"
                >
                  <img
                    src={wallItem.icon}
                    alt={wallItem.name}
                    className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Wall Item Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3.5 px-3 py-2 bg-white border border-black/10 text-[11px] text-[#111111] rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-luxury flex flex-col gap-0.5 items-center">
                    <span className="font-bold text-[#111111]">{wallItem.name}</span>
                    <span className="text-[10px] text-[#5B5B5B] font-sans">{wallItem.desc}</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================
            CURRENTLY LEARNING SECTION
            ====================================================== */}
        <div>
          <TiltCard className="p-8 border border-black/[0.08] bg-white/65 relative overflow-hidden group shadow-luxury">
            {/* background soft glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C8A977]/5 blur-3xl pointer-events-none group-hover:bg-[#C8A977]/10 transition-colors duration-500" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#111111] font-display mb-2 flex items-center gap-2">
                  <span>📚</span> Currently Learning
                </h3>
                <p className="text-xs text-[#5B5B5B] font-sans max-w-md leading-relaxed">
                  Actively expanding skills in cloud orchestrations, microservices integration patterns, and deep advanced full stack structures.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-3 max-w-xl">
                {CURRENTLY_LEARNING.map((chip, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3.5 py-1.5 rounded-xl border border-black/[0.06] text-xs font-semibold text-[#5B5B5B] bg-white/70 hover:bg-[#EFE8DD] hover:text-[#111111] hover:border-[#C8A977]/40 hover:shadow-luxury transition-all duration-300 select-none cursor-default"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

      </div>

      {/* ======================================================
          INTERACTIVE SPECIFIC TECHNOLOGY MODAL
          ====================================================== */}
      <AnimatePresence>
        {modalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setModalItem(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#F8F5F0] border border-black/[0.08] rounded-3xl p-6 md:p-8 shadow-luxury z-10 overflow-hidden"
            >
              {/* Top background glow matching modal brand */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-[#5B5B5B] hover:text-[#111111] transition-colors duration-200 text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] cursor-none"
                onClick={() => setModalItem(null)}
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#EFE8DD] border border-black/[0.06] rounded-2xl shadow-luxury-card">
                  <img
                    src={modalItem.icon}
                    alt={modalItem.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#111111] font-display">{modalItem.name}</h4>
                  <span className="text-xs text-[#9B9B9B] font-mono">[{modalItem.category}]</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h5 className="text-[10px] font-mono tracking-wider text-[#9B9B9B] uppercase mb-1">Details</h5>
                  <p className="text-xs text-[#5B5B5B] font-sans leading-relaxed">{modalItem.desc}</p>
                </div>

                {/* Experience level */}
                <div>
                  <h5 className="text-[10px] font-mono tracking-wider text-[#9B9B9B] uppercase mb-1.5">Experience Level</h5>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 text-xs font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {modalItem.level}
                  </div>
                </div>

                {/* Showcase Projects */}
                <div>
                  <h5 className="text-[10px] font-mono tracking-wider text-[#9B9B9B] uppercase mb-2">Showcase Projects</h5>
                  {modalItem.projects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {modalItem.projects.map((proj, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded-lg border border-black/[0.06] bg-white/70 text-xs text-[#5B5B5B] font-medium font-sans shadow-luxury-card"
                        >
                          🚀 {proj}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#9B9B9B] font-sans italic">Core system utility integrated across repository packages.</p>
                  )}
                </div>

                {/* Related Certifications */}
                {modalItem.certifications.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-mono tracking-wider text-[#9B9B9B] uppercase mb-2">Related Certifications</h5>
                    <div className="space-y-2">
                      {modalItem.certifications.map((cert, cIdx) => (
                        <div key={cIdx} className="text-xs text-[#5B5B5B] font-sans flex items-center gap-2">
                          <span className="text-[#C8A977]">🏅</span>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] flex justify-end">
                <button
                  className="btn-primary px-4 py-2 text-xs"
                  onClick={() => setModalItem(null)}
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
