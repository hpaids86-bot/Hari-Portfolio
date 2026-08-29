import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => (
  <div className={`glass-card ${className}`}>{children}</div>
);

const ProfileInfoCard = () => {
  const quickInfo = [
    { label: 'College', value: 'V.S.B College of Engineering Technical Campus', icon: '🎓' },
    { label: 'CGPA', value: '7.58 / 10', icon: '📊' },
    { label: 'Location', value: 'Tamil Nadu, India', icon: '📍' },
    { label: 'Career Goal', value: 'Cloud Engineer • Full Stack Developer', icon: '🎯' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      {/* Profile Header Card */}
      <GlassCard className="flex flex-col items-center text-center p-6 space-y-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#C8A977]/10 blur-[40px] rounded-full pointer-events-none" />
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-black/[0.08] shadow-luxury mb-2">
          <img src="/profile.png" alt="Hariprasath R" className="w-full h-full object-cover object-top" />
        </div>
        <div className="space-y-1 relative z-10">
          <h2 className="text-2xl font-bold font-display tracking-tight text-[#111111]">HARIPRASATH R</h2>
          <p className="text-sm text-[#5B5B5B] font-medium">AI &amp; Data Science Undergraduate</p>
        </div>
      </GlassCard>

      {/* Status Badge */}
      <GlassCard className="flex items-center gap-2 justify-center p-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm text-[#5B5B5B]">Open to Internship Opportunities</span>
      </GlassCard>

      {/* Quick Info */}
      <div className="grid grid-cols-1 gap-3">
        {quickInfo.map((info, i) => (
          <GlassCard key={i} className="flex items-center gap-3 p-4">
            <span className="text-lg">{info.icon}</span>
            <div className="flex flex-col">
              <span className="text-xs uppercase text-[#9B9B9B] font-medium tracking-wider">{info.label}</span>
              <span className="text-sm font-medium text-[#3B3B3B]">{info.value}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <a 
          href="https://drive.google.com/file/d/18EKp5GWVu29Bok18o-2PKaKPifjSzpD_/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary flex items-center gap-2"
        >
          <span>View Resume</span>
        </a>
        <a 
          href="https://drive.google.com/uc?export=download&id=18EKp5GWVu29Bok18o-2PKaKPifjSzpD_" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2"
        >
          <span>Download</span>
        </a>
      </div>
    </motion.div>
  );
};

const HighlightCard = ({ text }) => (
  <GlassCard className="flex items-center gap-3 p-4">
    <span className="text-[#C8A977] font-bold">✓</span>
    <span className="text-sm font-medium text-[#3B3B3B]">{text}</span>
  </GlassCard>
);

export default function AboutMeSection() {
  const techStack = ['Python', 'Java', 'React', 'FastAPI', 'PostgreSQL', 'AWS Cloud', 'Git & GitHub', 'Responsive Web Development'];
  const highlights = ['Problem Solving', 'Real-Time Projects', 'AI Development', 'Cloud Computing', 'Full Stack Development', 'Team Collaboration'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="about-me" className="relative min-h-screen py-24 bg-[#F8F5F0] overflow-hidden" aria-label="About Me Section">
      <div className="absolute inset-0 animated-grid opacity-[0.35]" />
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">

          {/* LEFT — 40% */}
          <div className="lg:col-span-2">
            <ProfileInfoCard />
          </div>

          {/* RIGHT — 60% */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Section Badge */}
            <motion.div variants={fadeUp}>
              <span className="glass-badge text-[#C8A977]">👤 About Me</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl xl:text-6xl font-display font-extrabold text-[#111111] leading-tight">
              Passionate About Building<br />
              <span className="text-gradient-gold">Intelligent Solutions</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-[#5B5B5B] leading-relaxed max-w-2xl">
              I am HARIPRASATH R, a B.Tech Artificial Intelligence &amp; Data Science undergraduate with a CGPA of 7.58.
              I enjoy solving real‑world problems through software development and continuously improving my technical skills.
              My interests include AI, Full Stack Development, Cloud Computing, and designing scalable applications that create meaningful impact.
            </motion.p>

            <motion.p variants={fadeUp} className="text-sm text-[#9B9B9B] leading-relaxed max-w-2xl">
              My long‑term goal is to become a skilled Cloud Engineer or Full Stack Developer, contributing to innovative products and
              continuously learning emerging technologies. I believe every project is an opportunity to learn and build solutions that
              are both efficient and user‑focused.
            </motion.p>

            {/* Highlights */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((text, i) => (
                <HighlightCard key={i} text={text} />
              ))}
            </motion.div>

            {/* Marquee */}
            <motion.div variants={fadeUp} className="pt-2 overflow-hidden relative pb-2">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B] font-medium mb-4">Currently Focused On</p>
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F8F5F0] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F8F5F0] to-transparent z-10 pointer-events-none" />
              <motion.div
                className="flex gap-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <span key={`${tech}-${i}`} className="tech-pill">{tech}</span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
