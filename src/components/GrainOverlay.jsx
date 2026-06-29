import React from "react";

// Subtle film-grain texture over the whole site for a premium, "studio" feel.
// Static SVG noise (no animation) so it costs essentially nothing, and
// pointer-events-none so it never blocks clicks.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05]"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}
