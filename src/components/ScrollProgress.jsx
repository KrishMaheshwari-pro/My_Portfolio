import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Slim gradient bar at the very top of the page that fills with scroll progress.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] shadow-[0_0_12px_rgba(168,85,247,0.6)]"
      aria-hidden="true"
    />
  );
}
