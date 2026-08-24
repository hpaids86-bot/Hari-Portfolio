import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer" 
            onClick={onClose} 
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#F8F5F0] border border-black/[0.08] rounded-[32px] overflow-hidden flex flex-col shadow-luxury"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-black/[0.06] bg-[#F8F5F0]/85 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{project.badgeIcon}</span>
                <h2 className="text-xl md:text-2xl font-bold font-display text-[#111111]">{project.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#5B5B5B] hover:text-[#111111] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-12">
              
              {/* Overview & Problem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#111111] mb-3">📖 Project Overview</h3>
                  <p className="text-[#5B5B5B] leading-relaxed text-sm">{project.overview}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#C8A977] mb-3">🎯 Problem Statement</h3>
                  <p className="text-[#5B5B5B] leading-relaxed text-sm">{project.problem}</p>
                </div>
              </div>

              {/* Solution */}
              <div className="p-6 rounded-2xl bg-white/60 border border-black/[0.06] shadow-luxury-card">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32] mb-3">💡 The Solution</h3>
                <p className="text-[#5B5B5B] leading-relaxed text-sm">{project.solution}</p>
              </div>

              {/* Architecture Diagram (Placeholder) */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9B9B9B] mb-4">🏗️ System Architecture</h3>
                <div className="w-full aspect-video rounded-2xl bg-[#EFE8DD] border border-black/[0.06] flex items-center justify-center text-black/20">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    <span className="text-sm font-medium text-[#5B5B5B]">[Architecture Diagram]</span>
                  </div>
                </div>
              </div>

              {/* Key Features & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9B9B9B] mb-4">⚙️ Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#C8A977] mt-0.5">✔</span>
                        <span className="text-[#5B5B5B] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9B9B9B] mb-4">🛠️ Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white/60 border border-black/[0.06] rounded-xl text-xs font-medium text-[#5B5B5B] shadow-luxury-card">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges & Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02]">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-red-700 mb-3">🚧 Challenges Faced</h3>
                  <p className="text-[#5B5B5B] leading-relaxed text-sm">{project.challenges}</p>
                </div>
                <div className="p-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-3">📈 Results & Impact</h3>
                  <p className="text-[#5B5B5B] leading-relaxed text-sm">{project.results}</p>
                </div>
              </div>

              {/* Future Enhancements */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#C8A977] mb-3">🔮 Future Enhancements</h3>
                <p className="text-[#5B5B5B] leading-relaxed text-sm">{project.future}</p>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-black/[0.06] bg-[#EFE8DD] flex flex-wrap gap-4 items-center justify-end">
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-6 py-2.5 flex items-center gap-2"
              >
                <span>GitHub Repository</span>
              </a>
              <a 
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-6 py-2.5 flex items-center gap-2"
              >
                <span>Live Demo</span>
              </a>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
