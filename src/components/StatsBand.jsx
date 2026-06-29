import React, { useEffect, useRef, useState } from "react";

// Edit these freely — labels/values are easy to tweak.
const STATS = [
  { value: 3, suffix: "", label: "Internships" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 9.2, suffix: "", label: "CGPA", decimals: 1 },
  { value: 12, suffix: "+", label: "Technologies" },
];

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function Counter({ value, suffix = "", decimals = 0, run, duration = 1600 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, duration]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#030014] px-[5%] sm:px-[5%] lg:px-[10%] py-6" id="Stats">
      <div
        ref={ref}
        className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="tilt-card text-center p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              <Counter
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals || 0}
                run={run}
              />
            </div>
            <div className="mt-2 text-sm sm:text-base text-gray-400 font-medium">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
