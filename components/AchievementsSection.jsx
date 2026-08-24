import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';

// --- DATA DEFINITIONS ---

const achievements = [
  {
    icon: '🏆',
    title: 'International Hackathon Finalist',
    status: 'Finalist',
    organization: 'Eclearnix',
    venue: 'KPR College of Engineering',
    project: 'Eco-Tree Impact Analyzer',
    description: 'Selected as a finalist in an international-level hackathon after presenting the Eco-Tree Impact Analyzer. Collaborated with a team to design a sustainability-focused web application that demonstrates environmental impact through carbon reduction analytics and tree plantation insights.',
    highlights: [
      'International-Level Competition',
      'Finalist Recognition',
      'Team Collaboration',
      'Innovation',
      'Real-World Problem Solving'
    ],
    badge: 'Innovation & Sustainability',
    badgeColor: 'text-[#FBBF24] border-[#FBBF24]/30 bg-[#FBBF24]/10'
  },
  {
    icon: '🎤',
    title: 'Chief Coordinator',
    status: 'Leadership',
    organization: 'Department of AI & Data Science',
    venue: 'V.S.B College of Engineering Technical Campus',
    project: 'Talkathon',
    description: 'Served as the Chief Coordinator for Talkathon, leading event planning, coordinating teams, managing logistics, and ensuring smooth execution. This experience strengthened my leadership, communication, teamwork, and organizational skills.',
    highlights: [
      'Team Coordination',
      'Event Planning',
      'Leadership',
      'Public Speaking',
      'Decision Making'
    ],
    badge: 'Leadership Excellence',
    badgeColor: 'text-primary border-primary/30 bg-primary/10'
  }
];

const coreStrengths = [
  { icon: '👑', title: 'Leadership', desc: 'Leading teams with responsibility and confidence.' },
  { icon: '🤝', title: 'Team Management', desc: 'Working collaboratively to achieve common goals.' },
  { icon: '🎤', title: 'Public Speaking', desc: 'Communicating ideas clearly and confidently.' },
  { icon: '🧩', title: 'Problem Solving', desc: 'Analyzing challenges and developing practical solutions.' },
  { icon: '🚀', title: 'Continuous Learning', desc: 'Always exploring new technologies and improving skills.' }
];

const timelineSteps = [
  { year: '2024', title: 'International Hackathon Finalist', lineColor: 'bg-blue-600' },
  { year: '2025', title: 'Chief Coordinator – Talkathon', lineColor: 'bg-cyan-500' },
  { year: 'Present', title: 'Building AI & Full Stack Projects', lineColor: 'bg-indigo-600' },
  { year: 'Future Goal', title: 'Cloud Engineer / Full Stack Developer', lineColor: '' }
];

const stats = [
  { icon: '🏆', value: '2+', label: 'Achievements' },
  { icon: '👨‍💼', value: '1', label: 'Leadership Roles' },
  { icon: '🎯', value: 'International Finalist', label: 'Hackathons' },
  { icon: '💡', value: 'Innovation & Growth', label: 'Focus' }
];

const beyondResume = [
  { icon: '💡', title: 'Problem Solver', desc: 'I enjoy solving challenging real-world problems.' },
  { icon: '☁️', title: 'Cloud Enthusiast', desc: 'Passionate about scalable cloud technologies.' },
  { icon: '💻', title: 'Full Stack Builder', desc: 'Building modern web applications from frontend to backend.' },
  { icon: '🤖', title: 'AI Explorer', desc: 'Interested in applying AI to practical use cases.' },
  { icon: '🌱', title: 'Lifelong Learner', desc: 'Continuously learning new tools and technologies.' }
];

// --- VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function AchievementsSection() {

  return (
    <section id="achievements" className="relative w-full py-32 bg-[#F8F5F0] overflow-hidden" aria-label="Achievements and Leadership">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#EFE8DD] blur-[130px] animate-pulse" />
        <div className="absolute bottom-[30%] left-[10%] w-[35%] h-[35%] rounded-full bg-[#C8A977]/6 blur-[130px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 animated-grid opacity-[0.35]" />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass-badge bg-[#FBBF24]/10 border-[#FBBF24]/20 text-[#FBBF24] mb-6">
            <span className="text-base">🏆</span>
            <span>Achievements</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
            Milestones, Leadership <br className="hidden md:block" />
            <span className="text-[#9B9B9B] font-light">&</span> <span className="text-gradient-primary">Recognition</span>
          </h2>
          <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed max-w-3xl mx-auto">
            Beyond academics, I actively participate in hackathons, technical events, and leadership opportunities that strengthen my teamwork, communication, and problem-solving abilities while preparing me for real-world engineering challenges.
          </p>
        </motion.div>

        {/* Large Achievement Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-24">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard className="h-full flex flex-col p-8 md:p-10 border border-black/8 glass-card hover:border-black/20 transition-all duration-500 rounded-[24px] relative overflow-hidden group shadow-luxury hover:shadow-luxury-hover">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A977]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 flex-shrink-0 shadow-luxury">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111111] mb-2 leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full border border-black/10 text-[#111111] text-[10px] font-bold tracking-widest uppercase bg-black/5">
                          {item.status}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-black/10 bg-black/5 text-[#5B5B5B] text-[10px] font-bold tracking-widest uppercase">
                          {item.project}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col space-y-6">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#9B9B9B] uppercase tracking-widest">{item.organization}</p>
                    <p className="text-xs font-medium text-[#5B5B5B]">{item.venue}</p>
                  </div>
                  
                  <p className="text-[15px] text-[#5B5B5B] leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  
                  <div className="pt-2">
                    <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#9B9B9B] mb-3">Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 group/item">
                          <span className="text-[#111111] mt-[2px] group-hover/item:scale-125 transition-transform">✔</span>
                          <span className="text-sm text-[#5B5B5B] group-hover/item:text-[#111111] transition-colors">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="mt-8 pt-6 border-t border-black/8 relative z-10">
                  <div className={`inline-flex px-4 py-2 rounded-xl border ${item.badgeColor} text-xs font-semibold tracking-wide shadow-luxury`}>
                    {item.badge}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Core Strengths Grid */}
        <div className="mb-32">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-[#9B9B9B] mb-10">Core Strengths</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {coreStrengths.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <TiltCard className="p-6 border border-black/8 glass-card rounded-2xl h-full flex flex-col items-center text-center group transition-all duration-300">
                  <div className="text-3xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">{item.icon}</div>
                  <h4 className="text-[#111111] font-bold mb-2">{item.title}</h4>
                  <p className="text-xs text-[#5B5B5B] leading-relaxed">{item.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievement Timeline */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111111] mb-4">Milestone Journey</h3>
            <p className="text-[#5B5B5B]">Tracking progress and setting future goals.</p>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mt-8">
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex-1 relative flex flex-col items-center">
                  
                  {/* Connecting Line Segment (Desktop) */}
                  {i < timelineSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] right-[-40%] h-1 bg-black/10 z-0 rounded-full overflow-hidden">
                      <motion.div 
                        className={`absolute top-0 left-0 bottom-0 ${step.lineColor}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.4 + 0.3 }}
                      />
                    </div>
                  )}

                  {/* Connecting Line Segment (Mobile) */}
                  {i < timelineSteps.length - 1 && (
                    <div className="md:hidden absolute top-20 left-1/2 -ml-[2px] w-1 h-12 bg-black/10 z-0 rounded-full overflow-hidden">
                      <motion.div 
                        className={`absolute top-0 left-0 right-0 ${step.lineColor}`}
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.4 + 0.3 }}
                      />
                    </div>
                  )}

                  {/* Year Box */}
                  <motion.div 
                    className="relative z-10 w-20 h-20 rounded-[1.25rem] bg-white/80 border border-black/10 flex flex-col items-center justify-center mb-6 shadow-luxury hover:border-[#111111] transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: i * 0.4 }}
                  >
                    <span className="text-[13px] font-bold text-[#111111] tracking-wider">{step.year}</span>
                  </motion.div>
                  
                  {/* Title Text */}
                  <motion.span 
                    className="text-[13px] font-medium text-[#5B5B5B] text-center max-w-[140px]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.4 + 0.2 }}
                  >
                    {step.title}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-40"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <TiltCard className="p-8 border-black/8 glass-card hover:border-black/20 rounded-2xl flex flex-col items-center text-center group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-bold font-display text-[#111111] mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#9B9B9B]">{stat.label}</div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ------------------------------------------- */}
        {/* BEYOND THE RESUME SECTION                   */}
        {/* ------------------------------------------- */}

        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
            Beyond the <span className="text-gradient-primary">Resume</span>
          </h2>
          <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed max-w-2xl mx-auto">
            A quick look at my personality, interests, and what drives me as an engineer.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {beyondResume.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <TiltCard className="p-6 border border-black/[0.08] glass-card hover:border-[#C8A977]/40 rounded-[24px] h-full flex flex-col justify-center relative overflow-hidden group shadow-luxury">
                <div className="relative z-10">
                  <div className="text-2xl mb-4 group-hover:scale-125 origin-left transition-transform duration-500">{item.icon}</div>
                  <h4 className="text-[#111111] font-bold mb-2 tracking-wide">{item.title}</h4>
                  <p className="text-xs text-[#5B5B5B] leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
