import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const roles = [
  'AI Engineer',
  'Full Stack Developer',
  'Cloud Computing Enthusiast',
  'Problem Solver',
];

export default function TypingAnimation() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentRole = roles[currentRoleIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentRole.length) {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      } else {
        // Pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayedText, isDeleting, isPaused, currentRole, currentRoleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="flex items-center gap-1"
    >
      <span className="text-lg md:text-xl font-medium text-gradient-primary font-display">
        {displayedText}
      </span>
      <span
        className="inline-block w-[2px] h-6 md:h-7 bg-primary animate-typing-cursor ml-0.5"
        aria-hidden="true"
      />
    </motion.div>
  );
}
