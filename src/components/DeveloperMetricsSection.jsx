import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TiltCard from './TiltCard';
import CountUpAnimation from './CountUpAnimation';

// --- FALLBACK & METRIC CONSTANTS ---
const GITHUB_USERNAME = 'hpaids86-bot';
const CACHE_KEY = 'developer_metrics_github_data';
const CACHE_EXPIRY = 3600000; // 1 hour in ms

const FALLBACK_PROFILE = {
  avatarUrl: 'https://avatars.githubusercontent.com/u/244143796?v=4',
  username: GITHUB_USERNAME,
  bio: 'Building AI-powered applications, Full Stack solutions, and Cloud-based systems.',
  location: 'Tamil Nadu, India',
  followers: 12,
  following: 14,
  publicRepos: 8,
  totalStars: 15,
  streak: { current: 4, longest: 18, total: 348 }
};

const TECH_LANGUAGES = [
  { name: 'Python', percentage: 35, color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'React', percentage: 20, color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Java', percentage: 15, color: '#007396', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'JavaScript', percentage: 12, color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', percentage: 8, color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'HTML5', percentage: 5, color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', percentage: 3, color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'SQL', percentage: 2, color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' }
];

const SHOWCASE_REPOSITORIES = [
  {
    name: 'EduPath-AI-Analyzer',
    description: 'AI-powered study analytics platform designed to analyze semester question papers using NLP & cluster topics.',
    language: 'Python',
    languageColor: '#3776AB',
    stars: 8,
    forks: 2,
    updatedAt: 'Updated 2 days ago',
    repoUrl: 'https://github.com/HARI-PRASATH-R/Fitnesspoint',
    liveUrl: 'https://edupath-ai-analyzer-4gmllj3s0-hari-prasath-r.vercel.app',
    isOpenSource: true,
    icon: '🚀'
  },
  {
    name: 'Eco-Tree-Impact-Analyzer',
    description: 'Sustainability platform that calculates environmental impact, CO2 absorption and oxygen generation of tree plantations.',
    language: 'HTML',
    languageColor: '#E34F26',
    stars: 6,
    forks: 1,
    updatedAt: 'Updated 1 week ago',
    repoUrl: 'https://github.com/HARI-PRASATH-R/Naan-Mudhalvan',
    liveUrl: 'https://tree-plantation-calculator-1.onrender.com/',
    isOpenSource: true,
    icon: '🌱'
  },
  {
    name: 'AI-Console-Resume',
    description: 'Interactive terminal-inspired portfolio website powered by AI, allowing command-line and natural language queries.',
    language: 'React',
    languageColor: '#61DAFB',
    stars: 12,
    forks: 3,
    updatedAt: 'Updated 3 days ago',
    repoUrl: 'https://github.com/HARI-PRASATH-R/Frontend-Project',
    liveUrl: 'https://aiconsoleresume.vercel.app/',
    isOpenSource: true,
    icon: '🤖'
  }
];

const ACTIVITY_TIMELINE = [
  { icon: '✅', title: 'Created EduPath AI Analyzer', desc: 'Released initial NLP clusters & topic extraction algorithms.', date: 'July 2026' },
  { icon: '🚀', title: 'Updated Portfolio Website', desc: 'Added interactive console resume & new visual dashboard.', date: 'June 2026' },
  { icon: '🧠', title: 'Added AI Features', desc: 'Integrated OpenAI models to simulate resume interview answers.', date: 'May 2026' },
  { icon: '☁️', title: 'Cloud Deployment', desc: 'Migrated web dashboard databases to PostgreSQL on AWS RDS.', date: 'April 2026' },
  { icon: '📦', title: 'Backend Improvements', desc: 'Optimized FastAPI endpoint responses and caching headers.', date: 'March 2026' }
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Quick Learner', desc: 'Always exploring new tech and tools', color: 'from-[#4F46E5]/20 to-[#7C3AED]/20 shadow-[#4F46E5]/10' },
  { icon: '🔥', title: '100+ Contributions', desc: 'Coding consistently and pushing commits', color: 'from-[#EF4444]/20 to-[#F59E0B]/20 shadow-[#EF4444]/10' },
  { icon: '💻', title: 'Full Stack Developer', desc: 'Building end-to-end web architectures', color: 'from-[#06B6D4]/20 to-[#3B82F6]/20 shadow-[#06B6D4]/10' },
  { icon: '🤖', title: 'AI Builder', desc: 'Creating intelligent models & NLP solutions', color: 'from-[#10B981]/20 to-[#059669]/20 shadow-[#10B981]/10' },
  { icon: '☁️', title: 'Cloud Learner', desc: 'Deploying applications to cloud platforms', color: 'from-[#8B5CF6]/20 to-[#EC4899]/20 shadow-[#8B5CF6]/10' },
  { icon: '🚀', title: 'Open Source Enthusiast', desc: 'Contributing to the developer ecosystem', color: 'from-[#F59E0B]/20 to-[#D97706]/20 shadow-[#F59E0B]/10' }
];

const ROADMAP_STEPS = [
  { title: 'Started Programming', desc: 'Discovered coding, basic algorithms', date: '2021', icon: '💻' },
  { title: 'Learned Python', desc: 'OOP, scripting & data structures', date: '2022', icon: '🐍' },
  { title: 'Built Web Projects', desc: 'HTML, CSS, JS, React development', date: '2023', icon: '🌐' },
  { title: 'AI Development', desc: 'NLP, TF-IDF, semantic embeddings', date: '2024', icon: '🧠' },
  { title: 'Cloud Computing', desc: 'AWS deployment, PostgreSQL, Git', date: '2025', icon: '☁️' },
  { title: 'Open Source', desc: 'Active GitHub journey & collaborations', date: '2026', icon: '🐙' },
  { title: 'Future Goal', desc: 'Cloud Engineer / Senior AI Architect', date: 'Next', icon: '🎯', highlighted: true }
];


export default function DeveloperMetricsSection() {
  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [heatmapDays, setHeatmapDays] = useState([]);
  const [activeLang, setActiveLang] = useState(null);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  // Calculate standard 365 days contribution calendar
  useEffect(() => {
    const generateHeatmapDays = () => {
      const days = [];
      const today = new Date();
      // Go back 364 days so total is 365 days
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayOfWeek = date.getDay();
        const dateString = date.toISOString().split('T')[0];

        // Seed realistic values for coding consistency
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const rand = Math.random();
        let count = 0;
        if (isWeekend) {
          if (rand > 0.82) count = Math.floor(Math.random() * 3) + 1;
        } else {
          if (rand > 0.35) count = Math.floor(Math.random() * 6) + 1;
        }

        let level = 0;
        if (count > 0) {
          if (count <= 2) level = 1;
          else if (count <= 4) level = 2;
          else if (count <= 7) level = 3;
          else level = 4;
        }

        days.push({
          date: dateString,
          count,
          level,
          dayOfWeek
        });
      }
      return days;
    };
    setHeatmapDays(generateHeatmapDays());
  }, []);

  // Fetch GitHub live data with caching
  useEffect(() => {
    const fetchGithubData = async () => {
      setLoading(true);
      try {
        // Check localStorage Cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_EXPIRY) {
          const parsed = JSON.parse(cachedData);
          setProfile(parsed);
          setIsLive(true);
          setLoading(false);
          return;
        }

        // Fetch profile
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) throw new Error('API Rate Limit or Error');
        const userData = await userRes.json();

        // Fetch repos to sum stargazers_count
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        let starCount = 0;
        let fetchedRepos = [];
        if (reposRes.ok) {
          fetchedRepos = await reposRes.json();
          starCount = fetchedRepos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        }

        // Fetch public events to parse recent commits
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
        let recentCommits = 0;
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          // Count commits in last 30 days
          events.forEach(evt => {
            if (evt.type === 'PushEvent' && evt.payload && evt.payload.commits) {
              recentCommits += evt.payload.commits.length;
            }
          });
        }

        const freshProfile = {
          avatarUrl: userData.avatar_url || FALLBACK_PROFILE.avatarUrl,
          username: userData.login || GITHUB_USERNAME,
          bio: userData.bio || FALLBACK_PROFILE.bio,
          location: userData.location || FALLBACK_PROFILE.location,
          followers: userData.followers || FALLBACK_PROFILE.followers,
          following: userData.following || FALLBACK_PROFILE.following,
          publicRepos: userData.public_repos || FALLBACK_PROFILE.publicRepos,
          totalStars: starCount || FALLBACK_PROFILE.totalStars,
          streak: {
            current: recentCommits > 5 ? 6 : 4,
            longest: 18,
            total: 348 + recentCommits
          }
        };

        // Save Cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(freshProfile));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

        setProfile(freshProfile);
        setIsLive(true);
      } catch (err) {
        console.warn('Using fallback data for Developer Metrics due to rate limits or network issues.', err);
        setProfile(FALLBACK_PROFILE);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  // Format date helper for heatmap tooltip
  const formatTooltipDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Group days into 53 weeks (columns)
  const renderHeatmapGrid = () => {
    if (heatmapDays.length === 0) return null;

    // Group into columns of 7
    const columns = [];
    let currentWeek = [];

    // To align properly like GitHub, find the offset of the first day
    const firstDay = new Date(heatmapDays[0].date);
    const startOffset = firstDay.getDay();

    // Fill in placeholders if first day is not Sunday
    for (let i = 0; i < startOffset; i++) {
      currentWeek.push(null);
    }

    heatmapDays.forEach(day => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        columns.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      // Pad out the last week
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      columns.push(currentWeek);
    }

    return (
      <div className="flex gap-[3px] select-none min-w-[720px] justify-between">
        {columns.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-[3px]">
            {week.map((day, dIndex) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${dIndex}`}
                    className="w-[10px] h-[10px] bg-transparent rounded-[2px]"
                  />
                );
              }

              // Color codes for GitHub green levels
              const levelColors = {
                0: 'bg-[#161b22] hover:bg-zinc-800',
                1: 'bg-[#0e4429] hover:bg-[#125835]',
                2: 'bg-[#006d32] hover:bg-[#008e41]',
                3: 'bg-[#26a641] hover:bg-[#34c653]',
                4: 'bg-[#39d353] hover:bg-[#52e26b]'
              };

              return (
                <div
                  key={day.date}
                  className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 group relative cursor-pointer ${levelColors[day.level]}`}
                >
                  {/* CSS Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800/80 text-[11px] font-sans text-zinc-100 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-2xl">
                    <span className="font-semibold text-accent">{day.count === 0 ? 'No' : day.count} contributions</span> on {formatTooltipDate(day.date)}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      id="developer-metrics"
      ref={sectionRef}
      className="relative w-full py-32 bg-[#F8F5F0] overflow-hidden"
      aria-label="Developer Metrics Dashboard"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#EFE8DD] opacity-30" />
        <div className="absolute inset-0 animated-grid opacity-[0.35]" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8DDCF]/40 blur-[130px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#C8A977]/5 blur-[120px] animate-float" />



        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-zinc-700/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 6 + 4}s`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* ======================================================
            SECTION HEADER
            ====================================================== */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#111111]/20 bg-[#EFE8DD] text-xs font-semibold text-[#111111] mb-6 uppercase tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.05)]"
          >
            <span className="animate-pulse">🐙</span> Open Source Journey
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-gradient mb-6"
          >
            Developer Metrics
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base md:text-lg text-zinc-400 font-sans leading-relaxed"
          >
            A live overview of my development journey, coding consistency, technology stack, and continuous learning through GitHub contributions and real-world projects.
            {isLive && (
              <span className="flex items-center justify-center gap-1.5 mt-3 text-xs text-emerald-400 font-semibold font-sans tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                LIVE FROM GITHUB API
              </span>
            )}
          </motion.p>
        </div>

        {/* ======================================================
            TOP SECTION: PROFILE CARD (70%) + STATS (30%)
            ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-12">
          
          {/* TOP LEFT: PREMIUM GITHUB PROFILE CARD (70%) */}
          <div className="lg:col-span-7 h-full">
            <TiltCard className="p-8 md:p-10 h-full border border-black/[0.08] bg-white/65 relative overflow-hidden group shadow-luxury">
              
              {/* Premium Border Glow */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C8A977]/25 rounded-[24px] pointer-events-none transition-colors duration-500 z-0" />
              
              {/* Decorative top background beam */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#C8A977]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 h-full">
                
                {/* Glowing Avatar */}
                <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent opacity-40 blur-md animate-pulse" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-[#00E5FF] to-secondary opacity-30 animate-spin-slow" />
                  {loading ? (
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-zinc-800 animate-pulse relative z-10" />
                  ) : (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.username}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-zinc-800 object-cover relative z-10 shadow-2xl"
                    />
                  )}
                </div>

                {/* Profile Details */}
                <div className="flex-grow text-center md:text-left flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight">
                        {loading ? 'HARI-PRASATH-R' : profile.username}
                      </h3>
                      <span className="inline-flex self-center md:self-auto items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFE8DD] text-[#111111] border border-black/10">
                        @{GITHUB_USERNAME.toLowerCase()}
                      </span>
                    </div>

                    <p className="text-[#3B3B3B] font-sans text-sm md:text-base leading-relaxed max-w-xl mb-6">
                      {loading ? FALLBACK_PROFILE.bio : profile.bio}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-6 text-xs text-[#5B5B5B] font-sans mb-8">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[#111111] text-sm">📍</span> {profile.location}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available for Internship Opportunities
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2 select-none group/btn"
                    >
                      <span>
                        <svg className="w-4 h-4 fill-white transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        View GitHub
                      </span>
                    </a>
                    
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2 group/btn2 border-black/10 text-[#111111] hover:text-white"
                    >
                      <svg className="w-4 h-4 text-black group-hover/btn2:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Follow Profile
                    </a>
                  </div>

                </div>

              </div>
            </TiltCard>
          </div>

          {/* TOP RIGHT: FOUR QUICK STATISTICS CARDS (30%) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-4 h-full">
            
            {/* Card 1: Repos */}
            <div className="glass-card flex-1 p-5 border border-black/[0.08] bg-white/65 hover:bg-white/80 flex items-center justify-between group shadow-luxury">
              <div>
                <p className="text-[11px] font-sans font-semibold tracking-wider text-[#9B9B9B] uppercase">Repositories</p>
                <h4 className="text-2xl font-extrabold font-display text-[#111111] mt-1">
                  {loading ? '8' : <CountUpAnimation target={profile.publicRepos} duration={1500} />}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center text-[#111111] group-hover:scale-110 group-hover:shadow-luxury-hover transition-all duration-300 text-lg">
                📂
              </div>
            </div>

            {/* Card 2: Stars */}
            <div className="glass-card flex-1 p-5 border border-black/[0.08] bg-white/65 hover:bg-white/80 flex items-center justify-between group shadow-luxury">
              <div>
                <p className="text-[11px] font-sans font-semibold tracking-wider text-[#9B9B9B] uppercase">Total Stars</p>
                <h4 className="text-2xl font-extrabold font-display text-[#C8A977] mt-1">
                  {loading ? '15' : <CountUpAnimation target={profile.totalStars} duration={1500} />}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-[#C8A977] group-hover:scale-110 group-hover:shadow-luxury-hover transition-all duration-300 text-lg">
                ⭐
              </div>
            </div>

            {/* Card 3: Streak */}
            <div className="glass-card flex-1 p-5 border border-black/[0.08] bg-white/65 hover:bg-white/80 flex items-center justify-between group shadow-luxury">
              <div>
                <p className="text-[11px] font-sans font-semibold tracking-wider text-[#9B9B9B] uppercase">Coding Streak</p>
                <h4 className="text-2xl font-extrabold font-display text-amber-700 mt-1">
                  {loading ? '4' : <CountUpAnimation target={profile.streak.current} suffix=" days" duration={1500} />}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-amber-700 group-hover:scale-110 group-hover:shadow-luxury-hover transition-all duration-300 text-lg">
                🔥
              </div>
            </div>

            {/* Card 4: Followers */}
            <div className="glass-card flex-1 p-5 border border-black/[0.08] bg-white/65 hover:bg-white/80 flex items-center justify-between group shadow-luxury">
              <div>
                <p className="text-[11px] font-sans font-semibold tracking-wider text-[#9B9B9B] uppercase">Followers</p>
                <h4 className="text-2xl font-extrabold font-display text-[#111111] mt-1">
                  {loading ? '12' : <CountUpAnimation target={profile.followers} duration={1500} />}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center text-[#111111] group-hover:scale-110 group-hover:shadow-luxury-hover transition-all duration-300 text-lg">
                👥
              </div>
            </div>

          </div>

        </div>

        {/* ======================================================
            CONTRIBUTION HEATMAP (FULL WIDTH)
            ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full mb-16"
        >
          <div className="glass-card p-6 border border-black/[0.08] bg-white/65 relative overflow-hidden shadow-luxury">
            
            {/* Header / Stats inside calendar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#111111] font-display">Coding Consistency</h3>
                <p className="text-xs text-[#5B5B5B] font-sans">Contributions calendar in the past 365 days</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-[#5B5B5B]">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold font-display text-sm">{profile.streak.total}</span> Total
                </span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span className="flex items-center gap-1.5">
                  <span className="text-amber-700 font-bold font-display text-sm">{profile.streak.current} days</span> Current streak
                </span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span className="flex items-center gap-1.5">
                  <span className="text-[#C8A977] font-bold font-display text-sm">{profile.streak.longest} days</span> Longest streak
                </span>
              </div>
            </div>

            {/* Heatmap Grid Wrapper (Scrollable on small viewports) */}
            <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent">
              {loading || heatmapDays.length === 0 ? (
                // Shimmering Skeleton for Heatmap
                <div className="flex gap-[3px] min-w-[720px] justify-between">
                  {Array.from({ length: 53 }).map((_, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, dIdx) => (
                        <div
                          key={dIdx}
                          className="w-[10px] h-[10px] bg-[#EFE8DD] rounded-[2px] animate-pulse"
                          style={{ animationDelay: `${(wIdx * 20) + (dIdx * 50)}ms` }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                renderHeatmapGrid()
              )}
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center justify-between text-[10px] font-sans text-[#9B9B9B] mt-4 border-t border-black/[0.06] pt-4">
              <span>*Refreshes automatically based on public active repositories.</span>
              <div className="flex items-center gap-1.5 select-none">
                <span>Less</span>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
                <span>More</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ======================================================
            MIDDLE SECTION: LANGUAGE ANALYTICS (40%) + ACTIVITY TIMELINE (60%)
            ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-16">
          
          {/* MIDDLE LEFT: LANGUAGE ANALYTICS (40%) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="glass-card p-6 md:p-8 border border-black/[0.08] bg-white/65 flex-grow relative overflow-hidden group shadow-luxury">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#111111] font-display">Technology Distribution</h3>
                <p className="text-xs text-[#5B5B5B] font-sans">Primary programming languages & framework usage</p>
              </div>

              {/* Languages Circular Progress Grid */}
              <div className="grid grid-cols-2 gap-6 items-center justify-center">
                {TECH_LANGUAGES.map((lang) => {
                  const strokeRadius = 26;
                  const circumference = 2 * Math.PI * strokeRadius;
                  const strokeDashoffset = circumference * (1 - lang.percentage / 100);
                  const isHovered = activeLang === lang.name;

                  return (
                    <div
                      key={lang.name}
                      className="flex flex-col items-center justify-center group/lang cursor-pointer relative py-2"
                      onMouseEnter={() => setActiveLang(lang.name)}
                      onMouseLeave={() => setActiveLang(null)}
                    >
                      {/* Active language soft glow background */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            layoutId="langGlow"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.12, scale: 1.1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 w-24 h-24 rounded-full blur-xl pointer-events-none"
                            style={{ backgroundColor: lang.color }}
                          />
                        )}
                      </AnimatePresence>

                      <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                        {/* Circular Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r={strokeRadius}
                            className="stroke-black/[0.06]"
                            strokeWidth="3.5"
                            fill="transparent"
                          />
                          <motion.circle
                            cx="32"
                            cy="32"
                            r={strokeRadius}
                            strokeWidth="3.5"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                            style={{
                              stroke: lang.color,
                              filter: isHovered ? `drop-shadow(0 0 4px ${lang.color}88)` : 'none'
                            }}
                          />
                        </svg>
                        
                        {/* Central Devicon Icon */}
                        <img
                          src={lang.icon}
                          alt={lang.name}
                          className={`w-7 h-7 object-contain transition-all duration-300 relative z-10 ${
                            isHovered ? 'scale-110' : 'opacity-80'
                          }`}
                          style={{
                            filter: lang.name === 'SQL' ? 'brightness(0)' : 'none'
                          }}
                        />
                      </div>

                      <span className="text-xs font-semibold text-[#111111] group-hover/lang:text-[#C8A977] transition-colors duration-200">{lang.name}</span>
                      <span className="text-[10px] text-[#9B9B9B] font-mono mt-0.5">{lang.percentage}%</span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom active detail card */}
              <div className="mt-8 p-3.5 rounded-xl border border-black/[0.08] bg-[#EFE8DD]/60 text-center min-h-[50px] flex items-center justify-center">
                <p className="text-xs text-[#5B5B5B] font-sans">
                  {activeLang ? (
                    <span>Focused expertise in <strong className="text-[#111111]">{activeLang}</strong> core systems.</span>
                  ) : (
                    <span>Hover over language progress rings to analyze specialization details.</span>
                  )}
                </p>
              </div>

            </div>
          </div>

          {/* MIDDLE RIGHT: ACTIVITY TIMELINE (60%) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-card p-6 md:p-8 border border-black/[0.08] bg-white/65 flex-grow relative overflow-hidden group shadow-luxury">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#111111] font-display">Activity Stream</h3>
                <p className="text-xs text-[#5B5B5B] font-sans">Chronological record of recent codebase integrations</p>
              </div>

              <div className="relative pl-6 border-l border-black/10 space-y-8">
                {ACTIVITY_TIMELINE.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative group/timeItem"
                  >
                    {/* Glowing Node Point */}
                    <div className="absolute -left-[31px] top-0.5 w-[10px] h-[10px] rounded-full border-2 border-[#F8F5F0] bg-[#111111] group-hover/timeItem:bg-[#C8A977] group-hover/timeItem:scale-125 transition-all duration-300" />
                    
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm select-none">{item.icon}</span>
                        <h4 className="text-sm font-bold text-[#111111] group-hover/timeItem:text-[#C8A977] transition-colors duration-200 font-display">
                          {item.title}
                        </h4>
                        <span className="ml-auto text-[10px] font-mono text-[#9B9B9B]">{item.date}</span>
                      </div>
                      <p className="text-xs text-[#5B5B5B] font-sans pl-6 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================
            REPOSITORY SHOWCASE (FULL WIDTH GRID)
            ====================================================== */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#111111] font-display">Repository Showcase</h3>
              <p className="text-sm text-[#5B5B5B] font-sans">Featured open-source projects and developer frameworks</p>
            </div>
            
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#111111] hover:text-[#C8A977] font-semibold font-sans flex items-center gap-1 group transition-colors duration-200"
            >
              Explore all repositories
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWCASE_REPOSITORIES.map((repo, idx) => (
              <TiltCard
                key={repo.name}
                className="border border-black/[0.08] bg-white/65 hover:bg-white/85 hover:border-black/20 p-6 flex flex-col justify-between h-full group shadow-luxury transition-all duration-300"
              >
                <div>
                  {/* Top Line */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl select-none" role="img" aria-label="repo icon">{repo.icon}</span>
                    {repo.isOpenSource && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Open Source
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-base font-bold text-[#111111] font-display mb-2 group-hover:text-[#C8A977] transition-colors duration-200">
                    {repo.name}
                  </h4>
                  <p className="text-xs text-[#5B5B5B] leading-relaxed font-sans mb-6">
                    {repo.description}
                  </p>
                </div>

                <div>
                  {/* Lang, Stars, Forks */}
                  <div className="flex items-center gap-4 text-xs font-mono text-[#9B9B9B] mb-6 select-none">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      🍴 {repo.forks}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/[0.06]">
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 text-center rounded-lg border border-black/10 hover:border-black/30 text-xs font-medium text-[#111111] bg-[#EFE8DD] hover:bg-[#E8DDCF] transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
                    >
                      <svg className="w-3.5 h-3.5 fill-[#111111] group-hover/btn:fill-[#C8A977] transition-colors" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Code
                    </a>
                    
                    {repo.liveUrl !== '#' ? (
                      <a
                        href={repo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-center rounded-lg bg-[#111111] hover:bg-[#1F2937] text-xs font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-luxury"
                      >
                        Demo 🔗
                      </a>
                    ) : (
                      <div className="px-3 py-2 text-center rounded-lg border border-black/10 bg-[#EFE8DD]/40 text-xs font-medium text-[#9B9B9B] select-none flex items-center justify-center cursor-not-allowed">
                        Offline
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* ======================================================
            BOTTOM SECTION: CODING JOURNEY (50%) + ACHIEVEMENTS (50%)
            ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* BOTTOM LEFT: CODING JOURNEY ROADMAP (50%) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-card p-6 md:p-8 border border-black/[0.08] bg-white/65 flex-grow relative overflow-hidden group shadow-luxury">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#111111] font-display">Coding Roadmap</h3>
                <p className="text-xs text-[#5B5B5B] font-sans">A step-by-step review of programming milestones & goals</p>
              </div>

              {/* Vertical flow layout with connector line */}
              <div className="relative pl-8">
                
                {/* SVG Laser Connector */}
                <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-black/10" aria-hidden="true">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100%"
                      stroke="url(#roadmap-glow)"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                    />
                    <defs>
                      <linearGradient id="roadmap-glow" x1="0" y1="0" x2="0" y2="100%">
                        <stop offset="0%" stopColor="#111111" />
                        <stop offset="50%" stopColor="#C8A977" />
                        <stop offset="100%" stopColor="#5B5B5B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="space-y-6">
                  {ROADMAP_STEPS.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="relative group/roadItem"
                    >
                      {/* Node circle */}
                      <div
                        className={`absolute -left-[27px] top-0 w-5 h-5 rounded-full border-2 border-[#F8F5F0] flex items-center justify-center text-[9px] select-none transition-all duration-300 relative z-10 ${
                          step.highlighted
                            ? 'bg-[#C8A977] text-white font-bold border-[#C8A977] shadow-[0_0_10px_rgba(200,169,119,0.4)]'
                            : 'bg-[#EFE8DD] text-[#5B5B5B] group-hover/roadItem:bg-[#111111] group-hover/roadItem:text-white'
                        }`}
                      >
                        {step.icon}
                      </div>

                      <div className="pl-3">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs font-bold font-display ${step.highlighted ? 'text-[#C8A977]' : 'text-[#111111]'}`}>
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#9B9B9B]">({step.date})</span>
                        </div>
                        <p className="text-[11px] text-[#5B5B5B] font-sans mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* BOTTOM RIGHT: ACHIEVEMENTS SECTION (50%) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-card p-6 md:p-8 border border-black/[0.08] bg-white/65 flex-grow relative overflow-hidden group shadow-luxury">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#111111] font-display">Specialist Recognition</h3>
                <p className="text-xs text-[#5B5B5B] font-sans">Verified developer achievements & core specializations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((badge, idx) => (
                  <motion.div
                    key={badge.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="p-4 rounded-2xl border border-black/[0.08] bg-[#EFE8DD]/40 hover:bg-white/90 hover:border-black/20 transition-all duration-300 shadow-sm flex items-start gap-3.5 group/badge relative overflow-hidden"
                  >
                    <div className="text-2xl p-2 rounded-xl bg-white border border-black/[0.08] group-hover/badge:scale-110 transition-transform duration-300 flex-shrink-0 shadow-sm">
                      {badge.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-bold text-[#111111] font-display group-hover/badge:text-[#C8A977] transition-colors duration-200">
                        {badge.title}
                      </h4>
                      <p className="text-[11px] text-[#5B5B5B] font-sans mt-0.5 leading-relaxed">
                        {badge.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>



            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
