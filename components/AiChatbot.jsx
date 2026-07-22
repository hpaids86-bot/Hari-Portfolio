import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- HARIPRASATH RESUME KNOWLEDGE DATA ---
const BOT_KNOWLEDGE = {
  projects: "Hariprasath has built several high-yield projects. His flagship is **EduPath AI Analyzer**, an AI study analytics platform scanning past exams with NLP & TF-IDF to predict semester exam topics. He also built **Eco-Tree Impact Analyzer** (a sustainability web platform adopted by local NGOs to calculate CO2 offsets) and **AI Console Resume** (an interactive command-line portfolio assistant).",
  skills: "His engineering capabilities include:\n- **Programming**: Python, Java, JavaScript, TypeScript\n- **Frontend**: React, Tailwind CSS, Framer Motion, HTML5, CSS3\n- **Backend & Cloud**: FastAPI, REST APIs, PostgreSQL, MySQL, AWS (EC2, S3, RDS), Git, GitHub, Docker (Learning)\n- **Artificial Intelligence**: Machine Learning basics, Natural Language Processing (text clustering, sentence embeddings), Generative AI, and Prompt Engineering.",
  education: "He is pursuing a **B.Tech in Artificial Intelligence & Data Science** at **V.S.B College of Engineering Technical Campus** (expected graduation: 2027), currently maintaining a strong **CGPA of 7.58**.",
  experience: "His key leadership and achievements include:\n- **Chief Coordinator** for 'Talkathon' (Department of AI & Data Science), managing team logistics and event execution.\n- **International Hackathon Finalist** (Eclearnix at KPR College of Engineering) with the Eco-Tree impact project.\n- Active developer with **100+ GitHub contributions**.",
  availability: "Yes! Hariprasath is **🟢 Available for Internship Opportunities** starting immediately in AI, Cloud, or Full-Stack developer roles. You can reach out directly via the **Contact Form** at the bottom of the page or email him at **hpaids86@gmail.com**.",
  contact: "You can reach Hariprasath via email at **hpaids86@gmail.com** or connect with him on GitHub at **github.com/hpaids86-bot**. Feel free to use the Contact Form at the bottom of this page!",
  greetings: "Hello! I am Hariprasath's AI Resume Assistant. Ask me anything about his B.Tech studies, projects (like EduPath AI), skills, or internship availability!"
};

const PROMPT_CHIPS = [
  { label: '🚀 Top Projects', query: 'projects' },
  { label: '💻 Skills', query: 'skills' },
  { label: '🎓 College', query: 'education' },
  { label: '🟢 Internship Status', query: 'availability' }
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm Hariprasath's AI Resume Assistant. I am trained on his resume, projects, and skills. Ask me anything about his qualifications!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const getBotResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('project') || q.includes('build') || q.includes('edupath') || q.includes('eco-tree') || q.includes('resume')) {
      return BOT_KNOWLEDGE.projects;
    } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('react') || q.includes('fastapi') || q.includes('aws') || q.includes('postgres') || q.includes('language')) {
      return BOT_KNOWLEDGE.skills;
    } else if (q.includes('education') || q.includes('college') || q.includes('gpa') || q.includes('study') || q.includes('vsb') || q.includes('cgpa')) {
      return BOT_KNOWLEDGE.education;
    } else if (q.includes('experience') || q.includes('work') || q.includes('hackathon') || q.includes('finalist') || q.includes('coordinator') || q.includes('talkathon') || q.includes('leadership')) {
      return BOT_KNOWLEDGE.experience;
    } else if (q.includes('availability') || q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('open')) {
      return BOT_KNOWLEDGE.availability;
    } else if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('gmail') || q.includes('github')) {
      return BOT_KNOWLEDGE.contact;
    } else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings') || q.includes('help')) {
      return BOT_KNOWLEDGE.greetings;
    }
    
    return "That's an interesting question! I am trained on Hariprasath's credentials. You can ask me about his B.Tech studies, projects (like EduPath AI), skills, or internship availability!";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const responseText = getBotResponse(text);
      const botMsgId = Date.now() + 1;
      
      setMessages(prev => [...prev, { id: botMsgId, sender: 'ai', text: '' }]);
      
      let index = 0;
      const interval = setInterval(() => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMsgId) {
            return { ...msg, text: responseText.slice(0, index + 1) };
          }
          return msg;
        }));
        index += 3;
        if (index >= responseText.length) {
          clearInterval(interval);
        }
      }, 15);
    }, 850);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#111111] rounded-full flex items-center justify-center cursor-pointer shadow-luxury z-[9990] hover:scale-110 transition-all duration-300 select-none group border border-black/[0.08]"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl text-[#F8F5F0] group-hover:scale-110 transition-transform duration-300">
          {isOpen ? '✕' : '🤖'}
        </span>
      </motion.div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 left-4 md:left-auto md:right-6 w-auto md:w-[380px] h-[480px] md:h-[500px] border border-black/[0.08] bg-white/95 backdrop-blur-xl rounded-3xl flex flex-col z-[9990] shadow-luxury overflow-hidden font-sans select-none"
          >
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-[#111111] via-[#C8A977] to-[#111111]" />

            {/* Chat Header */}
            <div className="px-5 py-4 border-b border-black/[0.06] bg-[#F8F5F0]/50 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#C8A977]/10 border border-[#C8A977]/20 flex items-center justify-center text-lg shadow-[0_4px_12px_rgba(200,169,119,0.15)]">
                  🤖
                </div>
                {/* Active Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#111111] font-display">HR Resume Agent</h4>
                <p className="text-[10px] text-[#5B5B5B] font-sans">Active AI Assistant • Instant Response</p>
              </div>
              <button
                className="ml-auto w-7 h-7 rounded-lg border border-black/[0.06] hover:bg-black/[0.04] text-[#5B5B5B] hover:text-[#111111] transition-colors duration-200 text-xs flex items-center justify-center cursor-none"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-sans shadow-luxury-card ${
                      msg.sender === 'user'
                        ? 'bg-[#111111] text-white rounded-tr-none'
                        : 'bg-[#EFE8DD] border border-black/[0.06] text-[#111111] rounded-tl-none'
                    }`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Bot Typing Loader */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#EFE8DD] border border-black/[0.06] rounded-2xl rounded-tl-none px-4 py-3.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#5B5B5B] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-[#5B5B5B] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-[#5B5B5B] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Chips (Quick Prompts) */}
            <div className="px-4 py-2 border-t border-black/[0.06] bg-[#F8F5F0]/20 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
              {PROMPT_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.query)}
                  className="px-3 py-1.5 rounded-xl border border-black/[0.06] bg-white/60 hover:bg-[#EFE8DD] text-[10px] font-semibold text-[#5B5B5B] hover:text-[#111111] transition-all duration-300 cursor-none"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Submission */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 border-t border-black/[0.06] bg-[#F8F5F0]/50 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects, college..."
                className="flex-grow bg-white/70 border border-black/[0.06] rounded-xl px-4 py-2.5 text-xs text-[#111111] placeholder-[#9B9B9B] focus:outline-none focus:border-[#C8A977]/50 transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#111111] hover:bg-[#1F2937] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-luxury cursor-none"
              >
                ➔
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
