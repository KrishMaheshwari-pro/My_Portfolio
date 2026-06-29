import React, { useRef } from "react";

// Wraps any element and makes it subtly lean toward the cursor, then snap back
// on leave. Disabled on touch / coarse pointers (no hover there anyway).
export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
