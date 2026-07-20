import React from "react";

// Gen-Z "peel sticker" — an emoji die-cut, or an emoji/dot + label on a white
// chip, tilted with a soft drop shadow and a gentle idle wobble. Authored
// in-house (emoji + CSS) so it's licence-clean, a few KB, and razor-sharp at
// any size. Positioning comes from `className`; the wobble/pop transform lives
// on an inner node so the two never fight.
const SIZES = {
  sm: { chip: "px-2 py-1", emoji: "text-sm", label: "text-[10px]" },
  md: { chip: "px-2.5 py-1.5", emoji: "text-lg", label: "text-[11px]" },
  lg: { chip: "px-3 py-2", emoji: "text-2xl", label: "text-xs" },
};

const Sticker = ({
  emoji,
  label,
  dot = false,
  rotate = -8,
  delay = 0,
  size = "md",
  className = "",
}) => {
  const s = SIZES[size] || SIZES.md;
  const anim = { "--rot": `${rotate}deg`, "--delay": `${delay}ms` };
  const emojiOnly = emoji && !label && !dot;

  return (
    <div className={`pointer-events-none select-none absolute z-30 ${className}`}>
      {emojiOnly ? (
        <span
          className={`sticker inline-block leading-none ${s.emoji}`}
          style={{
            ...anim,
            // white die-cut outline hugging the glyph + soft drop shadow
            textShadow:
              "2px 0 0 #fff,-2px 0 0 #fff,0 2px 0 #fff,0 -2px 0 #fff,2px 2px 0 #fff,-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,0 10px 14px rgba(0,0,0,.45)",
          }}
        >
          {emoji}
        </span>
      ) : (
        <div
          className={`sticker flex items-center gap-1.5 rounded-full bg-white border-[3px] border-white shadow-[0_8px_20px_-4px_rgba(0,0,0,.55)] ${s.chip}`}
          style={anim}
        >
          {dot && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
          )}
          {emoji && !dot && <span className={`leading-none ${s.emoji}`}>{emoji}</span>}
          {label && (
            <span className={`font-extrabold tracking-tight text-neutral-900 whitespace-nowrap ${s.label}`}>
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Sticker;
