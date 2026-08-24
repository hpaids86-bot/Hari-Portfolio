import { motion } from 'framer-motion';

const techIcons = [
  { name: 'Python', icon: '🐍', x: -30, y: -20 },
  { name: 'React', icon: '⚛️', x: 20, y: -60 },
  { name: 'AWS', icon: '☁️', x: 60, y: 30 },
  { name: 'Git', icon: '🔀', x: -50, y: 70 },
  { name: 'AI', icon: '🧠', x: 50, y: -30 },
  { name: 'Database', icon: '🗄️', x: -60, y: 20 },
];

const profileInfo = [
  { label: 'Location', value: 'Tamil Nadu, India', icon: '📍' },
  { label: 'Degree', value: 'B.Tech AI & Data Science', icon: '🎓' },
  { label: 'Expected Graduation', value: '2027', icon: '📅' },
  { label: 'Availability', value: 'Open to Internships', icon: '✅' },
];

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex justify-center lg:justify-end"
    >
      {/* Ambient glow behind everything */}
      <div
        className="absolute w-[400px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200, 169, 119, 0.25), rgba(232, 221, 207, 0.15), transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Main Image Container */}
        <motion.div
          className="relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glowing border frame around the image */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.15), rgba(200, 169, 119, 0.2), rgba(0, 0, 0, 0.05))',
              padding: '1px',
            }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#EFE8DD]">
              {/* Profile Image */}
              <div className="relative aspect-[3/4] max-h-[480px] overflow-hidden">
                <img
                  src="/profile.png"
                  alt="Hariprasath R — AI Engineer & Full Stack Developer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  style={{
                    filter: 'contrast(1.02) brightness(0.98)',
                  }}
                />

                {/* Gradient overlay at bottom for text readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #EFE8DD 0%, rgba(239, 232, 221, 0.95) 15%, rgba(239, 232, 221, 0.3) 40%, transparent 60%)',
                  }}
                />

                {/* Subtle top edge gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(200, 169, 119, 0.08) 0%, transparent 30%)',
                  }}
                />

                {/* Floating tech icons overlaid on image */}
                {techIcons.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="absolute z-20"
                    style={{
                      right: `${20 + (index % 3) * 25}%`,
                      top: `${10 + (index % 2) * 15 + index * 5}%`,
                    }}
                    animate={{
                      y: [0, -8, 0],
                      x: [0, index % 2 === 0 ? 5 : -5, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    }}
                    title={tech.name}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-default"
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {tech.icon}
                    </div>
                  </motion.div>
                ))}

                {/* Name & title overlay on the image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl font-bold font-display text-[#111111] mb-1 tracking-tight">
                    HARIPRASATH R
                  </h3>
                  <p className="text-sm text-[#5B5B5B] font-medium mb-4">
                    AI Engineer & Full Stack Developer
                  </p>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                    </span>
                    <span className="text-xs text-emerald-700 font-medium">
                      Available for opportunities
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info Section below image */}
              <div className="p-5 space-y-3">
                {profileInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  >
                    <span
                      className="text-sm flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
                      style={{
                        background: 'rgba(200, 169, 119, 0.12)',
                        border: '1px solid rgba(200, 169, 119, 0.2)',
                      }}
                    >
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[#9B9B9B] font-medium leading-none mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[13px] text-[#3B3B3B] font-medium truncate">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute -top-1 -left-1 w-6 h-6 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#111111]/30 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#111111]/30 to-transparent" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#C8A977]/30 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#C8A977]/30 to-transparent" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#C8A977]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-[#C8A977]/20 to-transparent" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#111111]/20 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#111111]/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
