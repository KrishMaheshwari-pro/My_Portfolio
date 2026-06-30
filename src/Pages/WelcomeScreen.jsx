import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronsDown } from 'lucide-react';

// Cinematic video intro. Plays fullscreen, then the whole panel slides down
// like a curtain to reveal the site mounted beneath it. Muted by default so it
// autoplays reliably everywhere (mobile + Safari block sound autoplay); user can
// unmute. A Skip button and a safety timer guarantee no one ever gets stuck.
const MAX_INTRO_MS = 12000;

const WelcomeScreen = ({ onLoadingComplete }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const finished = useRef(false);

  // Tell App to drop the welcome flag. AnimatePresence then plays our `exit`
  // (the slide-down curtain) while the real site mounts beneath us — a seamless
  // reveal. Guard so the safety timer + onEnded can't fire it twice.
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onLoadingComplete?.();
  };

  // Safety net: never trap the visitor if the video stalls or fails to load.
  useEffect(() => {
    const t = setTimeout(() => finish(), MAX_INTRO_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
    >
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted={muted}
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />

      {/* Soft vignette so the controls read on any frame */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Mute / unmute */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 hover:bg-white/20 hover:scale-105 transition-all duration-300"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Skip */}
      <button
        onClick={finish}
        className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-10 group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm font-medium text-white/90 hover:bg-white/20 hover:scale-105 transition-all duration-300"
      >
        Skip Intro
        <ChevronsDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
      </button>
    </motion.div>
  );
};

export default WelcomeScreen;
