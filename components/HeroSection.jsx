import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import TypingAnimation from './TypingAnimation';
import ProfileCard from './ProfileCard';
import CountUpAnimation from './CountUpAnimation';

const techStack = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
];

const stats = [
  { value: '2', suffix: '+', label: 'Internships' },
  { value: '4', suffix: '', label: 'Major Projects' },
  { value: '6', suffix: '+', label: 'Certifications' },
  { value: null, label: 'Hackathon Finalist', isText: true },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F8F5F0]"
      aria-label="Hero Section"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center min-h-screen py-24 lg:py-0">

          {/* LEFT SIDE */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Availability Badge */}
            <motion.div variants={fadeUp}>
              <div className="glass-badge">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#5B5B5B]">Available for Internships 2027</span>
              </div>
            </motion.div>

            {/* Name Heading */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold tracking-tight leading-[1.05] flex flex-wrap items-center">
                {"HARIPRASATH".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="text-5xl md:text-6xl xl:text-7xl text-[#111111] inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.2 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }
                      }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}

                <span className="text-5xl md:text-6xl xl:text-7xl mx-2 md:mx-3">&nbsp;</span>

                <motion.span
                  className="text-5xl md:text-6xl xl:text-7xl text-gradient-gold inline-block"
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 40 },
                    visible: {
                      opacity: 1, scale: 1, y: 0,
                      transition: { type: "spring", stiffness: 100, delay: 0.2 + 11 * 0.05 }
                    }
                  }}
                >
                  R
                </motion.span>
              </h1>
            </div>

            {/* Dynamic Typing Subtitle */}
            <motion.div variants={fadeUp}>
              <TypingAnimation />
            </motion.div>

            {/* Value Proposition */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-[#5B5B5B] font-medium leading-relaxed max-w-xl"
            >
              Building AI-powered applications that transform complex problems into simple, scalable solutions.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-[15px] text-[#9B9B9B] leading-relaxed max-w-lg"
            >
              I'm a B.Tech Artificial Intelligence &amp; Data Science student passionate about
              Full Stack Development, Artificial Intelligence, Cloud Computing, and building
              practical software products that create real impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <button
                className="btn-primary"
                id="btn-view-projects"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>
                  View My Projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <a
                href="https://drive.google.com/uc?export=download&id=18EKp5GWVu29Bok18o-2PKaKPifjSzpD_"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-block"
                id="btn-download-resume"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </span>
              </a>
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div variants={fadeUp} className="pt-4">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B] font-medium mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-5">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="group flex items-center justify-center cursor-default"
                    title={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.18, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                        style={{
                          filter: (tech.name === 'GitHub') ? 'brightness(0)' :
                                  (tech.name === 'AWS') ? 'brightness(0)' : 'none'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <ProfileCard />
          </div>
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12 pb-24 lg:pb-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-card group"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {stat.isText ? (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🏆</span>
                    <span className="text-sm font-semibold text-[#111111]">{stat.label}</span>
                  </div>
                  <div className="h-0.5 w-8 rounded-full bg-[#C8A977] opacity-60 group-hover:w-12 group-hover:opacity-90 transition-all duration-500" />
                </div>
              ) : (
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-display text-[#111111] mb-1 tracking-tight">
                    <CountUpAnimation target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs md:text-sm text-[#9B9B9B] font-medium">{stat.label}</p>
                  <div className="h-0.5 w-8 rounded-full bg-[#C8A977] opacity-50 group-hover:w-12 group-hover:opacity-80 transition-all duration-500 mt-3" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
    </section>
  );
}
