import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 origin-left shadow-[0_0_10px_rgba(56,189,248,0.6)]"
        style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      />
    </div>
  );
};
