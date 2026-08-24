import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const skillsData = [
  {
    icon: '🐍',
    title: 'Programming Languages',
    description: 'Strong programming foundation for solving complex problems and building efficient software applications.',
    technologies: ['Python', 'Java']
  },
  {
    icon: '🌐',
    title: 'Frontend Development',
    description: 'Building modern, responsive, and interactive user interfaces.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    description: 'Developing scalable APIs and backend systems for modern web applications.',
    technologies: ['FastAPI', 'REST API', 'Python Backend']
  },
  {
    icon: '🗄️',
    title: 'Database',
    description: 'Designing and managing relational databases for efficient data storage.',
    technologies: ['MySQL', 'PostgreSQL']
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Learning and implementing cloud technologies for scalable application deployment.',
    technologies: ['AWS', 'Cloud Computing', 'Virtualization', 'Git', 'GitHub']
  },
  {
    icon: '🧠',
    title: 'AI & Development Tools',
    description: 'Using AI techniques and modern developer tools to build intelligent applications.',
    technologies: ['Artificial Intelligence', 'Machine Learning Basics', 'NLP', 'VS Code', 'GitHub']
  }
];

const coreStrengths = [
  { icon: '🧩', title: 'Problem Solving' },
  { icon: '🤝', title: 'Team Collaboration' },
  { icon: '💡', title: 'Continuous Learning' },
  { icon: '🚀', title: 'Real-Time Projects' },
  { icon: '📢', title: 'Communication' },
  { icon: '🎯', title: 'Leadership' },
];

const currentlyExploring = [
  'AWS Cloud', 'Docker', 'System Design', 'Advanced React', 'Full Stack Architecture', 'Prompt Engineering', 'Cloud Security'
];



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-screen py-24 bg-[#F8F5F0] overflow-hidden" aria-label="Skills and Technologies">
      
      {/* Animated Background Mesh & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#EFE8DD] blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#C8A977]/8 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 animated-grid opacity-[0.35]" />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass-badge bg-primary/10 border-primary/20 text-primary mb-6">
            <span className="text-base">💻</span>
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
            Skills & <span className="text-gradient-primary">Technologies</span>
          </h2>
          <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed">
            A collection of programming languages, frameworks, cloud platforms, databases, and development tools I use to build scalable, efficient, and real-world software solutions.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillsData.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <TiltCard className="h-full p-8 border border-black/8 hover:border-black/20 group hover:shadow-luxury-hover glass-card flex flex-col">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-black/5 border border-black/10 mb-6 group-hover:bg-black/10 group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl filter drop-shadow-sm">{skill.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-[#111111] mb-3 tracking-tight">{skill.title}</h3>
                <p className="text-[15px] text-[#5B5B5B] leading-relaxed mb-6 flex-grow">{skill.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skill.technologies.map(tech => (
                    <span key={tech} className="text-[11px] font-medium py-1.5 px-3 rounded-xl bg-black/5 border border-black/8 text-[#5B5B5B] group-hover:border-black/20 transition-colors duration-300 cursor-default hover:text-[#111111] hover:bg-black/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Strengths */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-2">Core Strengths</h3>
            <div className="h-1 w-12 bg-[#111111] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreStrengths.map((strength, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-[20px] p-5 flex flex-col items-center justify-center text-center gap-3 border border-black/8 hover:border-[#C8A977]/50 hover:bg-white/80 transition-all cursor-default"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-2xl">{strength.icon}</span>
                <span className="text-xs md:text-sm font-semibold text-[#111111]">{strength.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently Exploring Marquee */}
        <div className="mb-24 relative">
          <div className="text-center mb-10">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#9B9B9B] font-bold mb-2">Currently Exploring</h3>
          </div>
          
          <div className="relative flex overflow-x-hidden w-full group">
            {/* Gradient masks for fading edges */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 z-10 bg-gradient-to-r from-[#F8F5F0] to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 z-10 bg-gradient-to-l from-[#F8F5F0] to-transparent pointer-events-none" />
            
            <motion.div 
              className="flex space-x-4 whitespace-nowrap px-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {/* Duplicate array for seamless infinite scroll */}
              {[...currentlyExploring, ...currentlyExploring].map((tech, idx) => (
                <div 
                  key={idx} 
                  className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full border border-black/8 text-[#5B5B5B] hover:text-[#111111] hover:border-black/20 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium">{tech}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>



      </div>
    </section>
  );
}
