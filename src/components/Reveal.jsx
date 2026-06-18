import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Cinematic section reveal: fades + slides its children in as they scroll into
// view. Respects prefers-reduced-motion (renders instantly, no transform).
export default function Reveal({
  children,
  y = 48,
  delay = 0,
  duration = 0.8,
  className = "",
  amount = 0.15,
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
