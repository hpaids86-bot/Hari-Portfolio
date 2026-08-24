import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

// --- CUSTOM SVG LOGO DEFINITIONS ---
const SVGS = {
  github: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  leetcode: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 00-.961.414l-9.84 9.87a1.375 1.375 0 000 1.956l5.03 5.05a1.375 1.375 0 001.956 0l9.84-9.87a1.375 1.375 0 000-1.956L14.48 1.48A1.373 1.373 0 0013.483 0zm.04 1.93l3.65 3.67-8.83 8.87-3.65-3.67 8.83-8.87zM5.56 12.44a1.375 1.375 0 000 1.956l2.36 2.37a1.375 1.375 0 001.956 0l2.36-2.37a1.375 1.375 0 000-1.956L9.87 10.07a1.375 1.375 0 00-1.956 0l-2.36 2.37z" />
    </svg>
  ),
  hackerrank: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.75 6.64h-3.41c-.48 0-.87-.39-.87-.87V2.36c0-.48-.39-.87-.87-.87h-2.53c-.48 0-.87.39-.87.87v3.41c0 .48-.39.87-.87.87h-2.68c-.48 0-.87-.39-.87-.87V2.36c0-.48-.39-.87-.87-.87H7.21c-.48 0-.87.39-.87.87v3.41c0 .48-.39.87-.87.87H1.25C.56 6.64 0 7.2 0 7.89v8.22c0 .69.56 1.25 1.25 1.25h3.41c.48 0 .87.39.87.87v3.41c0 .48.39.87.87.87H9.72c.48 0 .87-.39.87-.87v-3.41c0-.48.39-.87.87-.87h2.68c.48 0 .87.39.87.87v3.41c0 .48.39.87.87.87h2.53c.48 0 .87-.39.87-.87v-3.41c0-.48.39-.87.87-.87h3.41c.69 0 1.25-.56 1.25-1.25V7.89c0-.69-.56-1.25-1.25-1.25zM12 17.5v-11M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  envelope: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  ),
  mapPin: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  )
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Custom Canvas Confetti Burst Engine
  const fireConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#4F46E5', '#7C3AED', '#00E5FF', '#22C55E', '#FBBF24', '#EF4444'];
    const particles = [];

    // Spawn 100 particles shooting from the center bottom
    for (let i = 0; i < 110; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height + 15,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 16 - 12,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008
      });
    }

    let animId;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (active) {
        animId = requestAnimationFrame(update);
      } else {
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
      }
    };
    update();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate submission to API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      fireConfetti();
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success notification after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const [copyTimeoutId, setCopyTimeoutId] = useState(null);

  const handleCopyEmail = () => {
    console.log('handleCopyEmail: triggered');
    try {
      navigator.clipboard.writeText('hpaids86@gmail.com');
      console.log('handleCopyEmail: modern copy complete');
    } catch (err) {
      console.warn('handleCopyEmail: modern clipboard write failed, running fallback copy:', err);
      const textarea = document.createElement('textarea');
      textarea.value = 'hpaids86@gmail.com';
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        console.log('handleCopyEmail: fallback copy complete');
      } catch (e) {
        console.error('handleCopyEmail: fallback copy command failed:', e);
      }
      document.body.removeChild(textarea);
    }
    setCopyFeedback(true);
    console.log('handleCopyEmail: copyFeedback state updated to true');
    
    if (copyTimeoutId) {
      clearTimeout(copyTimeoutId);
    }

    const tId = setTimeout(() => {
      setCopyFeedback(false);
      console.log('handleCopyEmail: copyFeedback state reset to false');
    }, 3000);
    setCopyTimeoutId(tId);
  };

  const handleResumeAction = () => {
    fireConfetti();
    window.open('https://github.com/hpaids86-bot', '_blank');
  };

  const scrollToContactForm = () => {
    const formElement = document.getElementById('contact-form-anchor');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* ======================================================
          CONTACT SECTION CONTAINER
          ====================================================== */}
      <section
        id="contact"
        className="relative w-full py-32 bg-[#F8F5F0] overflow-hidden border-t border-black/[0.06]"
        aria-label="Contact Section"
      >
        {/* Background layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[#EFE8DD] opacity-30" />
          <div className="absolute inset-0 animated-grid opacity-[0.35]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#C8A977]/4 blur-[130px] animate-float-slow" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8DDCF]/40 blur-[120px] animate-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          {/* ======================================================
              SECTION HEADER
              ====================================================== */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-badge text-[#111111]"
            >
              📬 Let's Connect
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-gradient mb-6"
            >
              Let's Build Something Amazing Together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl mx-auto text-base md:text-lg text-zinc-400 font-sans leading-relaxed"
            >
              I'm actively seeking internship opportunities, freelance projects, and collaborations in Full Stack Development, Cloud Computing, and Artificial Intelligence. Feel free to reach out if you'd like to work together or simply have a conversation about technology.
            </motion.p>
          </div>

          <div id="contact-form-anchor" className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
            
            {/* ======================================================
                LEFT COLUMN: PREMIUM CONTACT FORM (60%)
                ====================================================== */}
            <div className="lg:col-span-6 h-full">
              <TiltCard className="p-8 md:p-10 border border-black/[0.08] bg-white/65 relative overflow-hidden group h-full shadow-luxury">
                
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A977]/30 to-transparent" />
                
                <h3 className="text-xl font-bold text-[#111111] font-display mb-8">Send a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="block py-3 px-0 w-full text-sm text-[#111111] bg-transparent border-0 border-b-2 border-black/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A977] peer transition-colors duration-200"
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-[#5B5B5B] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#111111]">
                      Full Name
                    </label>
                  </div>

                  {/* Email field */}
                  <div className="relative z-0 w-full group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="block py-3 px-0 w-full text-sm text-[#111111] bg-transparent border-0 border-b-2 border-black/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A977] peer transition-colors duration-200"
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-[#5B5B5B] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#111111]">
                      Email Address
                    </label>
                  </div>

                  {/* Subject field */}
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="block py-3 px-0 w-full text-sm text-[#111111] bg-transparent border-0 border-b-2 border-black/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A977] peer transition-colors duration-200"
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-[#5B5B5B] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#111111]">
                      Subject
                    </label>
                  </div>

                  {/* Message field */}
                  <div className="relative z-0 w-full group">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="block py-3 px-0 w-full text-sm text-[#111111] bg-transparent border-0 border-b-2 border-black/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A977] peer transition-colors duration-200 resize-none"
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-[#5B5B5B] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#111111]">
                      Message
                    </label>
                  </div>

                  {/* Submit buttons & Helper text */}
                  <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-zinc-500 font-sans italic self-start md:self-center">
                      * I usually respond within 24 hours.
                    </p>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto px-8 py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-none"
                    >
                      <span>
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message 🚀'
                        )}
                      </span>
                    </button>
                  </div>

                </form>

                {/* SUCCESS NOTIFICATION */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-2.5 shadow-lg select-none"
                    >
                      <span className="text-sm">✅</span>
                      <span>Your message has been sent successfully! Hariprasath will contact you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </TiltCard>
            </div>

            {/* ======================================================
                RIGHT COLUMN: PROFESSIONAL CONTACT CARD (40%)
                ====================================================== */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Bio Card */}
              <div className="glass-card p-6 border border-black/[0.08] bg-white/65 flex flex-col items-center text-center group shadow-luxury">
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-[#C8A977]/20 blur-md animate-pulse" />
                  <img
                    src="https://avatars.githubusercontent.com/u/244143796?v=4"
                    alt="Hariprasath R"
                    className="w-20 h-20 rounded-full border border-black/[0.08] object-cover relative z-10 shadow-luxury"
                  />
                </div>
                
                <h4 className="text-lg font-bold text-[#111111] font-display">HARIPRASATH R</h4>
                <p className="text-xs text-[#5B5B5B] font-sans mt-0.5">AI & Data Science Undergraduate</p>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-semibold text-[10px] mt-4 mb-4 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Open to Internship Opportunities
                </span>

                <p className="text-[11px] text-[#5B5B5B] font-sans leading-relaxed">
                  Passionate about building scalable Full Stack applications, exploring Cloud technologies, and solving real-world problems through Artificial Intelligence.
                </p>
              </div>

              {/* Direct Info Card */}
              <div className="glass-card p-5 border border-black/[0.08] bg-white/65 space-y-3.5 select-none shadow-luxury">
                {/* Email with copy */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-[#111111] flex-shrink-0">
                    {SVGS.envelope}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-[#9B9B9B]">Email Address</p>
                    <p className="text-xs font-semibold text-[#111111] truncate">hpaids86@gmail.com</p>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1.5 rounded-lg border border-black/10 bg-white/50 hover:bg-[#111111] hover:text-white text-[10px] font-semibold text-[#111111] transition-colors duration-200 flex-shrink-0 cursor-none"
                  >
                    {copyFeedback ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* Phone with call */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-[#111111] flex-shrink-0">
                    {SVGS.phone}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-[#9B9B9B]">Phone</p>
                    <p className="text-xs font-semibold text-[#111111] truncate">+91 9994263846</p>
                  </div>
                  <a
                    href="tel:+919994263846"
                    className="px-2.5 py-1.5 rounded-lg border border-black/10 bg-white/50 hover:bg-[#111111] hover:text-white text-[10px] font-semibold text-[#111111] transition-colors duration-200 flex-shrink-0 cursor-none"
                  >
                    Call Now
                  </a>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-[#111111] flex-shrink-0">
                    {SVGS.mapPin}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-[#9B9B9B]">Location</p>
                    <p className="text-xs font-semibold text-[#111111]">Tamil Nadu, India</p>
                  </div>
                </div>

                {/* Portfolio Website */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-[#111111] flex-shrink-0">
                    {SVGS.globe}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-[#9B9B9B]">Portfolio</p>
                    <p className="text-xs font-semibold text-[#111111]">hariprasath.dev</p>
                  </div>
                </div>
              </div>

              {/* Social Links & Resume Card */}
              <div className="glass-card p-5 border border-black/[0.08] bg-white/65 space-y-5 shadow-luxury">
                <div>
                  <h4 className="text-xs font-bold text-[#111111] font-display">Resume & Credentials</h4>
                  <p className="text-[9px] text-[#5B5B5B] font-sans mt-0.5">Download qualifications or follow online</p>
                </div>
                
                {/* Social Circle Buttons */}
                <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/hpaids86-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#5B5B5B] hover:text-[#111111] hover:bg-black/10 hover:border-black/20 transition-all duration-300 group/soc cursor-none relative"
                  >
                    {SVGS.github}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1.5 py-0.5 bg-[#111111] text-[9px] text-white rounded opacity-0 pointer-events-none group-hover/soc:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">GitHub</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/hari-prasath-r-b8ab12369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#5B5B5B] hover:text-[#111111] hover:bg-black/10 hover:border-black/20 transition-all duration-300 group/soc cursor-none relative"
                  >
                    {SVGS.linkedin}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1.5 py-0.5 bg-[#111111] text-[9px] text-white rounded opacity-0 pointer-events-none group-hover/soc:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">LinkedIn</span>
                  </a>

                  {/* LeetCode */}
                  <a
                    href="https://leetcode.com/u/h_a_r_i_03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#5B5B5B] hover:text-[#C8A977] hover:bg-black/10 hover:border-[#C8A977]/40 transition-all duration-300 group/soc cursor-none relative"
                  >
                    {SVGS.leetcode}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1.5 py-0.5 bg-[#111111] text-[9px] text-white rounded opacity-0 pointer-events-none group-hover/soc:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">LeetCode</span>
                  </a>

                  {/* HackerRank */}
                  <a
                    href="https://www.hackerrank.com/profile/hpaids86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#5B5B5B] hover:text-emerald-700 hover:bg-black/10 hover:border-emerald-500/40 transition-all duration-300 group/soc cursor-none relative"
                  >
                    {SVGS.hackerrank}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1.5 py-0.5 bg-[#111111] text-[9px] text-white rounded opacity-0 pointer-events-none group-hover/soc:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">HackerRank</span>
                  </a>

                  {/* Direct Email Link */}
                  <a
                    href="mailto:hpaids86@gmail.com"
                    className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#5B5B5B] hover:text-[#111111] hover:bg-black/10 hover:border-black/20 transition-all duration-300 group/soc cursor-none relative"
                  >
                    {SVGS.envelope}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1.5 py-0.5 bg-[#111111] text-[9px] text-white rounded opacity-0 pointer-events-none group-hover/soc:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Send Mail</span>
                  </a>
                </div>

                {/* View/Download Resume Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleResumeAction}
                    className="px-3 py-2 text-center rounded-lg border border-black/10 hover:border-black/20 text-xs font-semibold text-[#111111] bg-white/50 hover:bg-[#111111] hover:text-white transition-all duration-300 cursor-none"
                  >
                    📄 View Resume
                  </button>
                  <button
                    onClick={handleResumeAction}
                    className="px-3 py-2 text-center rounded-lg bg-[#111111] hover:bg-[#1F2937] text-xs font-semibold text-white transition-all duration-300 shadow-luxury cursor-none"
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>

              {/* Target Internship Positions */}
              <div className="glass-card p-5 border border-black/[0.08] bg-white/65 space-y-3 shadow-luxury">
                <h4 className="text-xs font-bold text-[#111111] font-display">Target Internship Positions</h4>
                <div className="space-y-2">
                  {[
                    'Software Engineering Internships',
                    'Cloud Engineer Internships',
                    'Full Stack Developer Internships',
                    'AI Engineer Internships'
                  ].map((pos, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-[#5B5B5B]">
                      <span className="text-emerald-600 font-bold select-none">•</span>
                      <span>{pos}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Card */}
              <div className="glass-card p-5 border border-black/[0.08] bg-white/65 italic relative overflow-hidden text-center select-none shadow-luxury">
                <div className="absolute top-2 left-2 text-[#9B9B9B] text-3xl font-serif">“</div>
                <p className="text-[11px] text-[#5B5B5B] leading-relaxed relative z-10 font-sans">
                  Technology is not just about writing code—it's about creating solutions that improve people's lives.
                </p>
                <p className="text-[10px] font-mono text-[#9B9B9B] mt-2 not-italic">— HARIPRASATH R</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================
          FULL-SCREEN ANIMATED CLOSING SECTION
          ====================================================== */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center py-24 px-4 bg-[#F8F5F0] overflow-hidden border-t border-black/[0.08] select-none">
        
        {/* Cosmic floating particle details */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C8A977]/5 blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#EFE8DD]/5 blur-[100px] animate-float" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-extrabold font-display text-[#9B9B9B] uppercase tracking-widest"
          >
            Thank You for Visiting
          </motion.h3>

          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-gradient"
          >
            Turning Ideas into Intelligent Solutions.
          </motion.h4>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm font-mono text-zinc-400 py-4"
          >
            <span>Always Learning.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 hidden md:inline" />
            <span>Always Building.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 hidden md:inline" />
            <span>Always Improving.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-zinc-500 font-sans text-sm md:text-base tracking-wide"
          >
            Let's Build the Future Together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="pt-6"
          >
            <button
              onClick={scrollToContactForm}
              className="btn-primary px-10 py-4 flex items-center justify-center gap-2 select-none group text-base font-extrabold shadow-luxury cursor-none"
            >
              <span>
                🚀 Hire Me
              </span>
            </button>
          </motion.div>
        </div>

      </section>

      {/* ======================================================
          PREMIUM PORTFOLIO FOOTER
          ====================================================== */}
      <footer className="w-full bg-[#EFE8DD] border-t border-black/[0.08] py-16 px-4 md:px-8 relative overflow-hidden select-none">
        
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-10">
          
          <div className="text-center">
            <h4 className="text-lg font-black font-display text-[#111111] tracking-wide uppercase">HARIPRASATH R</h4>
            <p className="text-xs text-[#5B5B5B] font-sans mt-1">AI Engineer | Full Stack Developer | Cloud Enthusiast</p>
          </div>

          {/* Quick links list */}
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 md:gap-x-10 text-xs font-medium font-sans text-[#5B5B5B]">
            <a href="#hero" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Home</a>
            <a href="#about" className="hover:text-[#111111] transition-colors duration-200 cursor-none">About</a>
            <a href="#education" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Education</a>
            <a href="#tech-stack" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Skills</a>
            <a href="#experience" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Experience</a>
            <a href="#projects" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Projects</a>
            <a href="#certifications" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Certifications</a>
            <a href="#achievements" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Achievements</a>
            <a href="#contact" className="hover:text-[#111111] transition-colors duration-200 cursor-none">Contact</a>
          </div>

          <div className="text-center text-[10px] text-[#9B9B9B] font-sans max-w-lg leading-relaxed pt-6 border-t border-black/[0.08] w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© 2026 HARIPRASATH R. All Rights Reserved.</p>
            <p>Built with ❤️ using React, Tailwind CSS, Framer Motion, and TypeScript.</p>
          </div>

        </div>

        {/* Floating Back to Top / Scroll Indicator */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4 }}
          className="fixed bottom-6 left-6 w-11 h-11 rounded-xl border border-black/10 bg-white/80 hover:bg-[#111111] text-[#111111] hover:text-white flex items-center justify-center shadow-luxury z-[9980] cursor-none"
        >
          ▲
        </motion.button>
      </footer>
    </div>
  );
}
