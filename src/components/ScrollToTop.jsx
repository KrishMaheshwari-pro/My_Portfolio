import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Glassy floating button that appears after scrolling down and smoothly
// returns to the top using native smooth scroll.
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={toTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-purple-400/40 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
