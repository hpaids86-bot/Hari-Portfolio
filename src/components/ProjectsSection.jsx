import { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import ProjectModal from './ProjectModal';

// --- DATA DEFINITIONS ---

const projects = [
  {
    id: 1,
    title: 'EduPath AI Analyzer',
    badgeIcon: '🚀',
    badgeText: 'Flagship Project',
    category: 'AI + Full Stack + Education',
    imagePlaceholder: 'EduPath Dashboard Interface',
    overview: "EduPath AI Analyzer is an AI-powered study analytics platform designed to help students prepare smarter for semester examinations. The platform analyzes previous years' question papers using Natural Language Processing techniques and identifies important topics based on frequency, marks distribution, and recency.",
    problem: "Students often struggle to identify which topics carry the most weight in semester exams, leading to inefficient studying and poor time management.",
    solution: "By utilizing NLP and TF-IDF, EduPath scans years of past papers, clusters the data, and outputs a highly accurate prediction of topic importance, generating personalized study strategies.",
    features: [
      'AI Topic Ranking',
      'Previous Question Paper Analysis',
      'Semester Planner',
      'Pass Strategy Mode',
      'AI Study Dashboard',
      'Topic Importance Prediction',
      'Progress Tracking'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'PostgreSQL', 'TF-IDF', 'NLP', 'Sentence Embeddings'],
    challenges: "Handling messy OCR data from scanned PDF question papers and normalizing technical terminology so the NLP model could accurately cluster topics.",
    results: "Reduced average student preparation time by 40% while increasing their confidence in covering high-yield topics.",
    future: "Integrating a fine-tuned LLM to auto-generate mock exams based on the highest probability topics.",
    githubLink: 'https://github.com/HARI-PRASATH-R/Fitnesspoint',
    liveLink: 'https://edupath-ai-analyzer-4gmllj3s0-hari-prasath-r.vercel.app',
    metrics: ['AI Powered', 'Full Stack', 'Responsive', 'Cloud Ready']
  },
  {
    id: 2,
    title: 'Eco-Tree Impact Analyzer',
    badgeIcon: '🌱',
    badgeText: 'Sustainability Project',
    category: 'Environmental Analytics',
    imagePlaceholder: 'Sustainability Dashboard',
    overview: "Eco-Tree Impact Analyzer is a web-based sustainability platform that calculates the environmental impact of tree plantation activities. It estimates carbon dioxide absorption, oxygen generation, and long-term environmental benefits, helping users visualize how their contribution positively impacts the planet.",
    problem: "People and organizations plant trees but lack tangible, data-driven feedback on the actual environmental impact (like CO2 offset) of their efforts.",
    solution: "A dashboard that takes tree species, age, and location inputs to calculate and visualize real-time ecological benefits using established environmental algorithms.",
    features: [
      'Carbon Reduction Calculator',
      'CO₂ Analytics',
      'Environmental Dashboard',
      'Tree Growth Estimation',
      'Sustainability Reports',
      'Interactive Charts'
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'MySQL', 'Charts.js', 'Analytics API'],
    challenges: "Sourcing accurate environmental datasets across different tree species and standardizing the growth-to-carbon-offset algorithms.",
    results: "Successfully adopted by local NGOs to generate impact reports for their corporate sponsors, increasing funding transparency.",
    future: "Adding satellite imagery integration to verify tree growth and automate reporting.",
    githubLink: 'https://github.com/HARI-PRASATH-R/Naan-Mudhalvan',
    liveLink: 'https://tree-plantation-calculator-1.onrender.com/',
    metrics: ['Environmental', 'Analytics', 'Responsive', 'Interactive']
  },
  {
    id: 3,
    title: 'AI Console Resume',
    badgeIcon: '🤖',
    badgeText: 'Interactive Experience',
    category: 'AI + Frontend Innovation',
    imagePlaceholder: 'Terminal/Console Interface',
    overview: "A highly interactive, terminal-inspired portfolio website powered by AI. It allows users and recruiters to interact with my professional experience through a command-line interface, blending nostalgic developer aesthetics with modern conversational AI.",
    problem: "Traditional static resumes can be monotonous to read and fail to showcase a developer's creativity, technical proficiency, and personality in an engaging way.",
    solution: "Developed an interactive web-based console where users can type commands (like 'ls', 'cat experience.txt') or ask natural language questions to an integrated AI assistant to learn about my skills and projects.",
    features: [
      'Interactive Command Line Interface',
      'AI Assistant Integration',
      'Custom Terminal Commands',
      'Dynamic Response Parsing',
      'Retro Developer Aesthetic',
      'Easter Eggs & Hidden Commands'
    ],
    techStack: ['React', 'Tailwind CSS', 'Vercel', 'JavaScript', 'AI APIs'],
    challenges: "Simulating an authentic terminal experience in the browser while ensuring it remains fully accessible and intuitive for non-technical recruiters.",
    results: "Significantly increased average visitor session duration and received highly positive feedback from engineering managers for creativity.",
    future: "Expanding the AI's context window to handle deep technical questions about my specific code repositories.",
    githubLink: 'https://github.com/HARI-PRASATH-R/Frontend-Project',
    liveLink: 'https://aiconsoleresume.vercel.app/',
    metrics: ['Interactive', 'AI Powered', 'Creative', 'Frontend']
  }
];

const highlights = [
  { icon: '💻', value: '2+', label: 'Projects Built' },
  { icon: '🧠', value: '1', label: 'AI Projects' },
  { icon: '🌱', value: '1', label: 'Sustainability Projects' },
  { icon: '⚡', value: '15+', label: 'Technologies Used' }
];

const processSteps = [
  { icon: '💡', title: 'Research' },
  { icon: '📐', title: 'Planning' },
  { icon: '🎨', title: 'UI Design' },
  { icon: '💻', title: 'Development' },
  { icon: '🧪', title: 'Testing' },
  { icon: '☁️', title: 'Deployment' },
  { icon: '🚀', title: 'Improvement' }
];

const techShowcase = ['Python', 'Java', 'React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'MySQL', 'AWS', 'Git', 'GitHub', 'Tailwind CSS'];

// --- COMPONENTS ---

const ProjectCard = ({ project, index, onOpenModal }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center w-full mb-32 group`}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2">
        <TiltCard className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-white/10 bg-white/5 group-hover:border-primary/40 transition-colors duration-500 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          
          {/* Conditional rendering for Project 3 Dashboard UI */}
          {project.id === 3 ? (
            <div className="w-full h-full bg-[#F8F5F0] p-6 md:p-8 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700 ease-out">
              <div className="w-full max-w-sm bg-white/80 rounded-2xl p-6 border border-black/8 shadow-luxury relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A977]/10 rounded-full blur-3xl" />
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#9B9B9B] uppercase mb-1">AI Match Score</div>
                    <div className="text-[#111111] font-serif text-sm">Hari → AI Engineer Role</div>
                  </div>
                  <div className="px-3 py-1 rounded-full border border-black/10 text-[#111111] text-[10px] font-semibold bg-black/5">
                    Strong match
                  </div>
                </div>

                {/* Circular Score */}
                <div className="flex justify-center mb-8 relative z-10">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.06)" strokeWidth="8" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="#111111" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="45" strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-serif text-[#111111] font-bold">82</span>
                      <span className="text-[9px] text-[#9B9B9B] tracking-widest font-semibold uppercase">Out of 100</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4 relative z-10">
                  {[
                    { label: 'Keyword match', score: '88%', width: '88%' },
                    { label: 'Impact framing', score: '76%', width: '76%' },
                    { label: 'Structure fit', score: '91%', width: '91%' },
                    { label: 'Seniority signal', score: '68%', width: '68%' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center text-xs">
                      <span className="w-28 text-[#5B5B5B]">{stat.label}</span>
                      <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden mx-3">
                        <div className="h-full bg-[#111111] rounded-full" style={{ width: stat.width }} />
                      </div>
                      <span className="w-8 text-right text-[#9B9B9B]">{stat.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : project.id === 1 ? (
            <div className="w-full h-full bg-[#F8F5F0] p-6 md:p-8 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700 ease-out">
              <div className="w-full max-w-sm bg-white/80 rounded-2xl p-6 border border-black/8 shadow-luxury relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A977]/10 rounded-full blur-3xl" />
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#9B9B9B] uppercase mb-1">Study Analytics</div>
                    <div className="text-[#111111] font-medium text-sm">Exam Readiness</div>
                  </div>
                  <div className="px-3 py-1 rounded-full border border-black/10 text-[#111111] text-[10px] font-semibold bg-black/5">
                    High Probability
                  </div>
                </div>

                {/* Main Stat */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-bold text-[#111111]">94%</span>
                    <span className="text-emerald-700 text-sm font-medium mb-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      12%
                    </span>
                  </div>
                  <div className="text-xs text-[#9B9B9B]">Predicted Exam Coverage</div>
                </div>

                {/* Topic Breakdown Bars */}
                <div className="space-y-4 relative z-10">
                  {[
                    { label: 'Data Structures', weight: 'High', color: 'bg-[#111111]', width: '85%' },
                    { label: 'Algorithms', weight: 'High', color: 'bg-[#5B5B5B]', width: '70%' },
                    { label: 'Operating Systems', weight: 'Medium', color: 'bg-[#C8A977]', width: '45%' },
                    { label: 'Computer Networks', weight: 'Low', color: 'bg-[#9B9B9B]', width: '25%' },
                  ].map((topic, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#111111]">{topic.label}</span>
                        <span className="text-[#9B9B9B]">{topic.weight}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                        <div className={`h-full ${topic.color} rounded-full`} style={{ width: topic.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#EFE8DD] text-black/15 p-8 text-center group-hover:scale-105 transition-transform duration-700 ease-out">
              <svg className="w-20 h-20 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-medium tracking-wide uppercase">[{project.imagePlaceholder}]</span>
            </div>
          )}
        </TiltCard>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-black/10 text-xs font-semibold text-[#111111] group-hover:border-[#C8A977]/30 transition-colors">
          <span>{project.badgeIcon}</span>
          <span className="bg-gradient-to-r from-[#111111] to-[#C8A977] bg-clip-text text-transparent">{project.badgeText}</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-[#111111] tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-sm uppercase tracking-widest text-[#9B9B9B] font-semibold">
          {project.category}
        </p>

        <p className="text-[#5B5B5B] leading-relaxed text-[15px] md:text-base">
          {project.overview.substring(0, 180)}...
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.metrics.map(metric => (
            <span key={metric} className="px-3 py-1 rounded-md bg-white/60 border border-black/[0.06] text-[#5B5B5B] text-xs font-medium shadow-luxury-card">
              {metric}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-6 w-full sm:w-auto">
          <button 
            onClick={() => onOpenModal(project)}
            className="btn-primary w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2"
          >
            <span>View Case Study</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <a 
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto flex-1 sm:flex-none"
          >
            Live Demo
          </a>
          
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto flex-1 sm:flex-none"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="relative min-h-screen py-32 bg-[#F8F5F0] overflow-hidden" aria-label="Featured Projects">
        
        {/* Animated Background Mesh & Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#EFE8DD] blur-[140px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#C8A977]/5 blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 animated-grid opacity-[0.35]" />
        </div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
          
          {/* Section Header */}
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-badge text-[#111111]">
              🚀 Featured Projects
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
              Projects That Solve <br className="hidden md:block" />
              <span className="text-gradient-gold">Real-World Problems</span>
            </h2>
            <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed max-w-3xl mx-auto">
              A collection of AI-powered and full-stack software applications that demonstrate my ability to solve practical problems using modern technologies, cloud computing, and intelligent systems.
            </p>
          </motion.div>

          {/* Project Highlights (Stats) */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {highlights.map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/65 border border-black/[0.08] text-center hover:bg-white/85 transition-colors shadow-luxury">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-[#111111] mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-[#9B9B9B]">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Alternating Project Cards */}
          <div className="mb-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>

          {/* Development Process Roadmap */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111111] mb-4">My Development Process</h3>
              <p className="text-[#5B5B5B]">From ideation to continuous deployment.</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto px-4">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mt-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex-1 relative flex flex-col items-center">
                    
                    {/* Connecting Line Segment */}
                    {i < processSteps.length - 1 && (
                       <div className="hidden md:block absolute top-7 left-[60%] right-[-40%] h-[1.5px] bg-[#C8A977]/30 z-0" />
                    )}

                    {/* Icon Box */}
                    <motion.div 
                      className="relative z-10 w-14 h-14 rounded-full bg-white border border-black/10 flex flex-col items-center justify-center mb-4 shadow-luxury hover:border-[#C8A977] hover:bg-[#EFE8DD] transition-all cursor-default group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                    >
                      <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </motion.div>
                    
                    {/* Title Text */}
                    <motion.span 
                      className="text-[11px] font-bold text-[#5B5B5B] uppercase tracking-widest text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      {step.title}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack Showcase (Marquee) */}
          <div className="text-center mb-10 overflow-hidden relative pb-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9B9B9B] mb-8 relative z-20">Technologies Powering These Projects</h3>
            
            {/* Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8F5F0] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8F5F0] to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[...techShowcase, ...techShowcase].map((tech, i) => (
                <div 
                  key={i}
                  className="px-6 py-3 rounded-2xl bg-white/60 border border-black/[0.08] text-[#5B5B5B] text-sm font-medium hover:bg-black/5 hover:text-[#111111] hover:border-black/20 transition-all cursor-default flex-shrink-0 shadow-luxury-card"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* Case Study Modal Overlay */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
