import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

const educationData = [
  {
    year: '2023 – Present',
    title: 'Bachelor of Technology',
    degree: 'Artificial Intelligence & Data Science',
    institution: 'V.S.B College of Engineering Technical Campus',
    location: 'Coimbatore, Tamil Nadu',
    cgpa: '7.58 / 10',
    status: 'Currently Pursuing',
    description: "Currently pursuing my Bachelor's degree in Artificial Intelligence and Data Science with a strong focus on software engineering, full stack development, cloud computing, machine learning, database systems, and real-world application development. Throughout my academic journey, I have actively worked on projects, internships, hackathons, and continuously improved my technical and problem-solving skills.",
    courses: [
      'Artificial Intelligence', 'Machine Learning', 'Data Structures',
      'Database Management Systems', 'Cloud Computing', 'Operating Systems',
      'Computer Networks', 'Software Engineering', 'Web Development'
    ]
  },
  {
    year: '2022 – 2023',
    title: 'Higher Secondary Education',
    institution: 'Annai Matriculation Higher Secondary School',
    percentage: '78.6%',
    status: 'Completed',
    description: "Completed Higher Secondary Education with a strong academic foundation in Mathematics, Computer Science, and logical reasoning, which inspired my interest in technology and software development.",
    courses: ['Mathematics', 'Computer Science', 'Physics', 'Problem Solving']
  }
];

const stats = [
  { icon: '🎓', label: 'Degree', value: 'B.Tech AI & Data Science' },
  { icon: '📈', label: 'Current CGPA', value: '7.58 / 10' },
  { icon: '🏆', label: 'Academic Journey', value: '2023 – Present' },
  { icon: '📚', label: 'Focus Areas', value: 'AI • Cloud • Full Stack' },
];

import TiltCard from './TiltCard';

const TimelineItem = ({ data, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between group w-full mb-16 last:mb-0 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      
      {/* Timeline Node (Customized Zig-Zag/Diamond style) */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 z-20 transition-all duration-500 group-hover:scale-110">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-20 group-hover:opacity-100 blur-sm" />
        <div className="absolute inset-[2px] bg-[#F8F5F0] rounded-lg rotate-45 transition-transform duration-500 group-hover:rotate-90 border border-black/10 group-hover:border-[#C8A977] z-10" />
        <div className="relative z-20 text-accent group-hover:text-white transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isLeft ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            )}
          </svg>
        </div>
      </div>

      {/* Horizontal connector line for Zig-Zag effect (Desktop only) */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-[calc(50%-2rem)] bg-gradient-to-r ${isLeft ? 'right-[50%] from-transparent to-primary/50' : 'left-[50%] from-primary/50 to-transparent'} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-[calc(50%-3rem)]" />

      {/* Card Content */}
      <motion.div 
        className="w-full pl-[70px] md:pl-0 md:w-[calc(50%-3rem)]"
        initial={{ opacity: 0, x: isLeft ? 50 : -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
      >
        <TiltCard className="p-6 md:p-8 border border-black/[0.08] group-hover:border-[#C8A977]/50 group-hover:shadow-luxury-hover">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="glass-badge bg-black/[0.05] border-black/10 text-[#111111] px-3 py-1 text-xs">
              {data.year}
            </span>
            <span className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${data.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
              {data.status}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold font-display text-[#111111] mb-1 tracking-tight">{data.title}</h3>
          
          {data.degree && <h4 className="text-base md:text-lg text-[#111111] font-medium mb-2">{data.degree}</h4>}
          
          <div className="flex flex-col gap-1 mb-4 text-xs md:text-sm text-[#5B5B5B]">
            <div className="flex items-center gap-2">
              <span>🏫</span> <span>{data.institution}</span>
            </div>
            {data.location && (
              <div className="flex items-center gap-2">
                <span>📍</span> <span>{data.location}</span>
              </div>
            )}
            {data.cgpa && (
              <div className="flex items-center gap-2 text-primary font-semibold mt-1">
                <span>📈</span> <span>CGPA: {data.cgpa}</span>
              </div>
            )}
            {data.percentage && (
              <div className="flex items-center gap-2 text-primary font-semibold mt-1">
                <span>📈</span> <span>Percentage: {data.percentage}</span>
              </div>
            )}
          </div>

          <p className="text-sm md:text-[15px] text-[#5B5B5B] leading-relaxed mb-6">
            {data.description}
          </p>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-[#9B9B9B] font-semibold mb-3">
              {data.degree ? 'Relevant Coursework' : 'Highlight Subjects'}
            </h5>
            <div className="flex flex-wrap gap-2">
              {data.courses.map((course, i) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.05), duration: 0.3 }}
                  className="text-[11px] font-medium py-1.5 px-3 rounded-xl bg-black/[0.04] border border-black/[0.06] hover:bg-black/[0.08] hover:border-[#C8A977]/40 hover:text-[#111111] transition-all cursor-default text-[#5B5B5B]"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
};

export default function EducationSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="relative min-h-screen py-24 bg-[#F8F5F0] overflow-hidden" aria-label="Education Timeline">
      
      {/* Animated Background Mesh & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#C8A977]/5 blur-[120px]" />
        <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#EFE8DD] blur-[120px]" />
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
          <div className="inline-flex items-center justify-center gap-2 glass-badge bg-primary/10 border-primary/20 text-primary mb-6">
            <span className="text-base">🎓</span>
            <span>Academic Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
            Education & <span className="text-gradient-primary">Learning Path</span>
          </h2>
          <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed">
            My academic journey has provided a strong foundation in Artificial Intelligence, Data Science, Software Development, and problem-solving while continuously encouraging practical learning through projects and modern technologies.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto mb-24">
          
          {/* Continuous Glowing Line */}
          <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-black/10 rounded-full">
            <motion.div 
              className="absolute top-0 w-full rounded-full bg-gradient-to-b from-[#111111] via-[#5B5B5B] to-[#C8A977] shadow-luxury"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="relative z-10 flex flex-col pt-10 pb-10">
            {educationData.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Statistics */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="stat-card group cursor-default text-center p-6 border-black/8 hover:border-black/20"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-[11px] uppercase tracking-widest text-[#9B9B9B] font-semibold mb-2">{stat.label}</div>
              <div className="text-lg md:text-xl font-bold font-display text-[#111111]">{stat.value}</div>
              <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 mt-4" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
