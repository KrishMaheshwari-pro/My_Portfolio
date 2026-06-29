import React, { useEffect, useRef } from "react";

// Soft glowing comet that follows the cursor with a fading tail — rendered over
// the whole page (background + boxes) for a "live" feel. Pure transform updates
// on the compositor, so it adds no scroll/paint cost. Off for touch + reduced
// motion.
const COUNT = 12;

export default function CursorTrail() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = ref.current;
    if (!container) return;
    const dots = Array.from(container.children);
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const pts = dots.map(() => ({ x: cx, y: cy }));
    const mouse = { x: cx, y: cy };
    let shown = false;

    const show = (x, y) => {
      mouse.x = x;
      mouse.y = y;
      if (!shown) {
        shown = true;
        container.style.opacity = "1";
      }
    };
    const hide = () => {
      shown = false;
      container.style.opacity = "0";
    };

    const onMove = (e) => show(e.clientX, e.clientY);
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) show(t.clientX, t.clientY);
    };
    const onLeave = (e) => {
      if (!e.relatedTarget && !e.toElement) hide();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", hide, { passive: true });
    document.addEventListener("mouseout", onLeave);

    let raf;
    const loop = () => {
      // Head dot is pinned exactly to the cursor (no lag/gap), the rest chase
      // the dot ahead of them with a tight ease so the tail stays connected
      // even on fast flicks.
      pts[0].x = mouse.x;
      pts[0].y = mouse.y;
      dots[0].style.transform = `translate3d(${pts[0].x}px, ${pts[0].y}px, 0) translate(-50%, -50%)`;
      let lx = pts[0].x;
      let ly = pts[0].y;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        p.x += (lx - p.x) * 0.5;
        p.y += (ly - p.y) * 0.5;
        dots[i].style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        lx = p.x;
        ly = p.y;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", hide);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] opacity-0 transition-opacity duration-500"
    >
      {Array.from({ length: COUNT }).map((_, i) => {
        const t = i / COUNT;
        const size = 200 * (1 - t * 0.82); // head large, tail small
        const alpha = (1 - t) * 0.055; // faint glow, fades down the tail
        return (
          <span
            key={i}
            className="absolute top-0 left-0 rounded-full will-change-transform"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(199,186,255,${alpha.toFixed(
                3
              )}), rgba(168,85,247,${(alpha * 0.45).toFixed(
                3
              )}) 45%, transparent 70%)`,
            }}
          />
        );
      })}
    </div>
  );
}
