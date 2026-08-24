import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const certifications = [
  {
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.983 17.514a3.393 3.393 0 0 1-1.047-1.127l1.011-.532a2.22 2.22 0 0 0 .685.736c.307.185.66.275 1.059.275.69 0 1.2-.218 1.2-.647 0-.256-.17-.44-.509-.556l-.888-.303c-1.002-.338-1.503-.9-1.503-1.684 0-.589.263-1.066.786-1.433.525-.367 1.189-.551 1.99-.551.644 0 1.233.117 1.769.349l-.499.882a2.802 2.802 0 0 0-1.27-.29c-.744 0-1.116.241-1.116.723 0 .262.19.467.57.614l.829.31c1.065.393 1.597.942 1.597 1.648 0 .614-.263 1.114-.789 1.5-.525.385-1.218.578-2.079.578-.694.004-1.294-.16-1.796-.492zM6.924 17.84l-1.01-3.69-.974 3.69H3.633L1.5 11.272h1.29l1.455 5.253 1.144-5.253h1.077l1.109 5.253 1.488-5.253h1.246l-2.083 6.568H6.924zm14.28.16h-1.242L22.5 11.272h1.5l-2.796 6.728zM17.478 10.3c.725.109 1.459-.447 1.611-1.222a1.274 1.274 0 0 0-.22-.988c-.628-.847-1.921-1.064-2.846-.479-.926.586-1.135 1.753-.46 2.56.452.54 1.189.722 1.915.129z" />
      </svg>
    ),
    title: 'AWS Cloud Practitioner Essentials',
    provider: 'Amazon Web Services',
    description: 'Built a strong foundation in cloud computing concepts, AWS core services, cloud architecture, security, pricing models, and best practices.',
    skills: ['AWS', 'Cloud Computing', 'Cloud Security', 'Cloud Architecture', 'Pricing', 'Deployment'],
    url: 'https://drive.google.com/file/d/1toNA3rA5J1hQD55-as6W1jEC7YSz6di9/view?usp=drive_link'
  },
  {
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.615 16.5H2.308V7.5h2.307v9zm5.308 0h-4v-9h4a1.888 1.888 0 0 1 1.76 1.137l.423.863H15L13.846 7.5h-1.5L10.5 10.613l-1.846-3.113h-4v9h4V13.5h1.846v3zm6.692 0h-2.308v-9h2.308a2.533 2.533 0 0 1 1.83 1.114 2.872 2.872 0 0 1 .478 1.636V11a2.868 2.868 0 0 1-1.63 2.607A2.88 2.88 0 0 1 18.923 16.5h-2.308zm.923-3h1.385v-1.5h-1.385v1.5zm0-3h1.385V9h-1.385v1.5z" />
      </svg>
    ),
    title: 'Build an AI Agent',
    provider: 'IBM SkillsBuild',
    description: 'Learned the fundamentals of Large Language Models, prompt engineering, responsible AI, and how Generative AI transforms modern software development.',
    skills: ['AI Ethics', 'OpenAI Concepts'],
    url: 'https://www.credly.com/badges/1922e922-dd2a-4350-a6ea-b46ceb4ab1de/public_url'
  },
  {
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.615 16.5H2.308V7.5h2.307v9zm5.308 0h-4v-9h4a1.888 1.888 0 0 1 1.76 1.137l.423.863H15L13.846 7.5h-1.5L10.5 10.613l-1.846-3.113h-4v9h4V13.5h1.846v3zm6.692 0h-2.308v-9h2.308a2.533 2.533 0 0 1 1.83 1.114 2.872 2.872 0 0 1 .478 1.636V11a2.868 2.868 0 0 1-1.63 2.607A2.88 2.88 0 0 1 18.923 16.5h-2.308zm.923-3h1.385v-1.5h-1.385v1.5zm0-3h1.385V9h-1.385v1.5z" />
      </svg>
    ),
    title: 'AI Fundamentals: Foundations for Understanding AI',
    provider: 'IBM SkillsBuild',
    description: 'Developed a solid understanding of Artificial Intelligence concepts, Machine Learning basics, data-driven decision making, and practical AI applications.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Data Analytics', 'Neural Networks', 'AI Concepts'],
    url: 'https://www.credly.com/badges/c01481ae-f281-4011-8eba-bbcec490d320/public_url'
  },
  {
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.615 16.5H2.308V7.5h2.307v9zm5.308 0h-4v-9h4a1.888 1.888 0 0 1 1.76 1.137l.423.863H15L13.846 7.5h-1.5L10.5 10.613l-1.846-3.113h-4v9h4V13.5h1.846v3zm6.692 0h-2.308v-9h2.308a2.533 2.533 0 0 1 1.83 1.114 2.872 2.872 0 0 1 .478 1.636V11a2.868 2.868 0 0 1-1.63 2.607A2.88 2.88 0 0 1 18.923 16.5h-2.308zm.923-3h1.385v-1.5h-1.385v1.5zm0-3h1.385V9h-1.385v1.5z" />
      </svg>
    ),
    title: 'Generative AI  Using LLMs',
    provider: 'IBM SkillsBuild',
    description: 'Learned user-centered design principles, collaborative problem-solving, design thinking methodologies, and innovation frameworks for building better digital products.',
    skills: ['Design Thinking', 'User Experience', 'Problem Solving', 'Innovation', 'Collaboration'],
    url: 'https://www.credly.com/badges/fed6b540-4418-443d-9152-4ddb4fd24289/public_url'
  }
];

const highlights = [
  { icon: '🏅', label: 'Certifications', value: '4+' },
  { icon: '☁️', label: 'Cloud Focus', value: 'AWS' },
  { icon: '🤖', label: 'AI Learning', value: 'IBM SkillsBuild' },
  { icon: '📚', label: 'Learning Mindset', value: 'Continuous Learning' }
];

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

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative min-h-screen py-24 bg-[#F8F5F0] overflow-hidden" aria-label="Professional Certifications">

      {/* Animated Background Mesh & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[45%] h-[45%] rounded-full bg-[#EFE8DD] blur-[130px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-[#C8A977]/6 blur-[130px] animate-pulse" style={{ animationDelay: '1.5s' }} />
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
          <div className="inline-flex items-center gap-2 glass-badge bg-primary/10 border-primary/20 text-primary mb-6">
            <span className="text-base">🏆</span>
            <span>Certifications</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-6">
            Professional Certifications <br className="hidden md:block" />
            <span className="text-[#9B9B9B] font-light">&</span> <span className="text-gradient-primary">Continuous Learning</span>
          </h2>
          <p className="text-base md:text-lg text-[#5B5B5B] leading-relaxed max-w-3xl mx-auto">
            I continuously enhance my technical knowledge through industry-recognized certifications in Cloud Computing, Artificial Intelligence, and Generative AI to stay current with modern technologies and best practices.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <TiltCard className="h-full p-8 border border-black/8 hover:border-black/20 group hover:shadow-luxury-hover glass-card flex flex-col relative overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A977]/10 rounded-full blur-3xl group-hover:bg-[#C8A977]/20 transition-all duration-500" />

                {/* Card Header */}
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center text-[#111111] group-hover:scale-110 group-hover:bg-black/10 transition-all duration-500 shadow-luxury">
                    {cert.logo}
                  </div>

                  {/* Verified Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold shadow-luxury transition-all">
                    <span>Verified</span>
                    <span className="text-[10px] group-hover:rotate-12 transition-transform duration-300">✅</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold font-display text-[#111111] mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-sm font-medium text-[#9B9B9B] uppercase tracking-widest mb-4">
                    {cert.provider}
                  </div>
                  <p className="text-[15px] text-[#5B5B5B] leading-relaxed mb-8 flex-grow">
                    {cert.description}
                  </p>

                  {/* Skills Learned */}
                  <div className="mb-8">
                    <h5 className="text-[10px] uppercase tracking-widest text-[#9B9B9B] font-semibold mb-3">Skills Validated</h5>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map(skill => (
                        <span key={skill} className="text-[11px] font-medium py-1.5 px-3 rounded-xl bg-black/5 border border-black/8 text-[#5B5B5B] group-hover:border-black/20 transition-colors duration-300 cursor-default hover:text-[#111111] hover:bg-black/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Credential Button */}
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#111111] hover:bg-[#1F2937] text-white font-semibold text-sm transition-all duration-300 group/btn shadow-luxury"
                  >
                    <span>View Official Credential</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Summary Statistics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {highlights.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <TiltCard className="text-center p-8 border-black/8 hover:border-black/20 glass-card h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold font-display text-[#111111] mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-[11px] uppercase tracking-widest text-[#9B9B9B] font-semibold">{stat.label}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
