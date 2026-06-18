import { useEffect } from "react";

// Global cursor-following effects via event delegation on document, so cards
// added later (lazy projects, tab switches) are covered with zero re-binding.
//   .tilt-card  -> gentle 3D tilt + cursor glow (compact, visual cards)
//   .glow-card  -> cursor glow + subtle lift + shine sweep, NO rotation
//                  (text-heavy cards like Experience/Education/Projects, so
//                   the content stays perfectly readable)
// Disabled for prefers-reduced-motion and touch (pointer: coarse) devices.
const MAX_TILT = 6; // degrees

export default function useTilt() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let active = null;

    const enter = (card) => {
      const isGlow = card.classList.contains("glow-card");
      card.style.willChange = "transform";
      card.style.transition = isGlow
        ? "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.3s ease"
        : "transform 0.1s ease-out, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease";
      card.classList.add("tilt-active");
    };
    const reset = (card) => {
      const isGlow = card.classList.contains("glow-card");
      card.style.transition = isGlow
        ? "transform 0.5s ease, box-shadow 0.4s ease, border-color 0.3s ease"
        : "transform 0.5s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease";
      card.style.transform = isGlow
        ? "translateY(0)"
        : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.willChange = "auto";
      card.classList.remove("tilt-active");
    };

    const onMove = (e) => {
      const card = e.target.closest?.(".tilt-card, .glow-card");
      if (!card) {
        if (active) {
          reset(active);
          active = null;
        }
        return;
      }
      if (card !== active) {
        if (active) reset(active);
        active = card;
        enter(card);
      }
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);

      if (card.classList.contains("glow-card")) {
        // text-heavy card: just a clean lift, no rotation
        card.style.transform = "translateY(-6px)";
      } else {
        const rx = (0.5 - py) * 2 * MAX_TILT;
        const ry = (px - 0.5) * 2 * MAX_TILT;
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(
          2
        )}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`;
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (active) reset(active);
    };
  }, []);
}
