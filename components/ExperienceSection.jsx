import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from './TiltCard';

const experiences = [
  {
    timeline: 'February 2024 – March 2024',
    company: 'Emglitz Technologies',
    role: 'Internet of Things (IoT) Intern',
    status: 'Internship Completed',
    description: 'Worked on Internet of Things concepts, embedded systems, and microcontroller-based applications. Collaborated with teammates on practical hardware integration projects while improving troubleshooting, teamwork, and analytical thinking. Gained valuable exposure to real-world IoT development workflows and project execution.',
    responsibilities: [
      'Worked with embedded systems',
      'Learned IoT architecture',
      'Hardware integration',
      'Sensor-based applications',
      'Team collaboration',
      'Technical troubleshooting'
    ],
    skills: ['Embedded Systems', 'IoT', 'Microcontrollers', 'Problem Solving', 'Hardware Integration', 'Teamwork'],
    techUsed: ['Arduino', 'Embedded Systems', 'Sensors', 'C/C++', 'IoT Concepts'],
    badge: 'Successfully completed IoT Internship',
    icon: '🔌'
  },
  {
    timeline: 'June 2025 – July 2025',
    company: 'LITZ Technologies',
    role: 'Cloud Computing Intern',
    status: 'Internship Completed',
    description: 'Worked with cloud computing concepts, virtualization, cloud storage, and cloud service models. Learned how scalable cloud-based applications are designed and managed while understanding modern infrastructure, security fundamentals, and deployment strategies.',
    responsibilities: [
      'Cloud deployment concepts',
      'Virtualization',
      'Storage solutions',
      'Infrastructure learning',
      'Cloud security basics',
      'Service model understanding'
    ],
    skills: ['AWS', 'Cloud Computing', 'Virtualization', 'Storage', 'IaaS', 'PaaS', 'SaaS', 'Cloud Security'],
    techUsed: ['AWS', 'Virtualization', 'Cloud Storage', 'IaaS', 'PaaS', 'SaaS', 'Security Fundamentals'],
    badge: 'Completed Cloud Computing Internship',
    icon: '☁️'
  }
];

const roadmap = [
  { title: 'Student', icon: '👨‍🎓' },
  { title: 'IoT Intern', icon: '🔌' },
  { title: 'Cloud Intern', icon: '☁️' },
  { title: 'Full Stack Dev', icon: '💻' },
  { title: 'Cloud Engineer', icon: '⚙️' },
  { title: 'AI Engineer', icon: '🧠' }
];

const highlights = [
  { icon: '🏢', label: 'Companies', value: '2 Internships' },
  { icon: '⏳', label: 'Experience', value: '2 Professional Internships' },
  { icon: '☁️', label: 'Specialization', value: 'Cloud & IoT' },
  { icon: '🚀', label: 'Career Goal', value: 'Cloud / Full Stack' }
];

const learnings = [
  { icon: '🧩', title: 'Problem Solving' },
  { icon: '☁️', title: 'Cloud Technologies' },
  { icon: '🌐', title: 'Networking Basics' },
  { icon: '💻', title: 'Software Development' },
  { icon: '🤝', title: 'Team Collaboration' },
  { icon: '⚡', title: 'Continuous Learning' }
];

const TimelineItem = ({ data, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between group w-full mb-20 last:mb-0 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      
      {/* Timeline Node */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 z-20 transition-all duration-500 group-hover:scale-110">
        <div className="absolute inset-0 bg-[#F8F5F0] rounded-full border border-black/10 group-hover:border-[#C8A977] shadow-luxury group-hover:shadow-luxury-hover transition-all duration-300" />
        <div className="absolute inset-2 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[2px]" />
        <span className="relative z-10 text-2xl">{data.icon}</span>
      </div>

      {/* Horizontal connector line */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-[calc(50%-3rem)] bg-gradient-to-r ${isLeft ? 'right-[50%] from-transparent to-primary/50' : 'left-[50%] from-primary/50 to-transparent'} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Spacer */}
      <div className="hidden md:block md:w-[calc(50%-4rem)]" />

      {/* Card Content */}
      <motion.div 
        className="w-full pl-[70px] md:pl-0 md:w-[calc(50%-4rem)]"
        initial={{ opacity: 0, x: isLeft ? 50 : -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
      >
        <TiltCard className="p-6 md:p-8 border border-black/[0.08] group-hover:border-[#C8A977]/40 group-hover:shadow-luxury-hover bg-white/40">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="glass-badge bg-primary/10 border-primary/20 text-primary px-3 py-1 text-xs font-semibold">
              {data.timeline}
            </span>
            <span className="text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {data.status}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold font-display text-[#111111] mb-1 tracking-tight">{data.role}</h3>
          <h4 className="text-base md:text-lg text-primary font-medium mb-4 flex items-center gap-2">
            <span>🏢</span> {data.company}
          </h4>
          
          <p className="text-sm md:text-[15px] text-[#5B5B5B] leading-relaxed mb-6">
            {data.description}
          </p>

          {/* Tech Used */}
          <div className="mb-6">
            <h5 className="text-[10px] uppercase tracking-widest text-[#9B9B9B] font-semibold mb-3">Tech Used</h5>
            <div className="flex flex-wrap gap-2">
              {data.techUsed.map(tech => (
                <span key={tech} className="text-[11px] font-medium py-1 px-2.5 rounded-lg bg-black/5 border border-black/10 text-[#111111] cursor-default transition-colors hover:bg-black/10">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-[#9B9B9B] font-semibold mb-3">Key Responsibilities</h5>
              <ul className="space-y-2">
                {data.responsibilities.map((resp, i) => (
                  <li key={i} className="text-xs text-[#5B5B5B] flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-[#9B9B9B] font-semibold mb-3">Skills Gained</h5>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] py-1 px-2 rounded-md bg-black/5 border border-black/8 text-[#5B5B5B]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <span className="text-sm">🏆</span>
            </div>
            <span className="text-xs font-medium text-emerald-400/90">{data.badge}</span>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
};

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative min-h-screen py-24 bg-[#F8F5F0] overflow-hidden" aria-label="Professional Experience">
      
      {/* Animated Background Mesh & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EFE8DD] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#C8A977]/5 blur-[120px]" />
        <div className="absolute inset-0 animated-grid opacity-[0.35]" />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass-badge bg-primary/10 border-primary/20 text-primary mb-6">
            <span className="text-base">💼</span>
            <span>Professional Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
            Internships & <span className="text-gradient-primary">Professional Journey</span>
          </h2>
          <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed">
            Hands-on experience gained through internships, practical learning, collaboration, and real-world software development projects that strengthened my technical and professional skills.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto mb-32">
          
          {/* Continuous Glowing Line */}
          <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-black/10 rounded-full">
            <motion.div 
              className="absolute top-0 w-full rounded-full bg-gradient-to-b from-[#111111] via-[#5B5B5B] to-[#C8A977] shadow-luxury"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="relative z-10 flex flex-col pt-10 pb-10">
            {experiences.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        </div>

        {/* Career Growth Roadmap */}
        <motion.div 
          className="mb-32 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#9B9B9B] font-bold mb-2">Career Growth</h3>
            <h4 className="text-2xl md:text-3xl font-display font-bold text-[#111111]">Journey to AI Engineer</h4>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-black/10 -translate-y-1/2">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#111111] via-[#5B5B5B] to-[#C8A977]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            
            {/* Vertical Line for Mobile */}
            <div className="block md:hidden absolute left-1/2 top-0 h-full w-[2px] bg-black/10 -translate-x-1/2">
              <motion.div 
                className="w-full bg-gradient-to-b from-[#111111] via-[#5B5B5B] to-[#C8A977]"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {roadmap.map((step, index) => (
              <motion.div 
                key={index}
                className="relative z-10 flex flex-col items-center gap-3 bg-[#F8F5F0] p-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring" }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 border border-black/10 flex items-center justify-center text-xl md:text-2xl shadow-luxury hover:border-[#111111] hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#5B5B5B] text-center max-w-[100px]">
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Highlights Statistics */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {highlights.map((stat, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <TiltCard className="text-center p-6 border-black/8 hover:border-black/20 glass-card h-full flex flex-col justify-center">
                <div className="text-3xl mb-4">{stat.icon}</div>
                <div className="text-lg md:text-xl font-bold font-display text-[#111111] mb-1">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-widest text-[#9B9B9B] font-semibold">{stat.label}</div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* What I Learned */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-2">What I Learned</h3>
            <div className="h-1 w-12 bg-[#111111] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {learnings.map((learning, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-[20px] p-5 flex flex-col items-center justify-center text-center gap-3 border border-black/8 hover:border-[#C8A977]/50 hover:bg-white/80 transition-all cursor-default"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-2xl">{learning.icon}</span>
                <span className="text-xs md:text-sm font-semibold text-[#111111]">{learning.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
