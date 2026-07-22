import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * CountUpAnimation - Animates a number counting up when visible
 */
export default function CountUpAnimation({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const numericTarget = parseInt(target, 10);
      if (isNaN(numericTarget)) {
        // If target isn't a number, just set it
        return;
      }

      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(easedProgress * numericTarget);
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, target, duration]);

  const numericTarget = parseInt(target, 10);
  const isNumeric = !isNaN(numericTarget);

  return (
    <span ref={ref}>
      {isNumeric ? `${prefix}${count}${suffix}` : target}
    </span>
  );
}
