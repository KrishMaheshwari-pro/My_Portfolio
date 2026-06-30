import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User, Volume2, VolumeX } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Two-stage intro:
//   1) animated "Welcome To My Portfolio" text (the original splash)
//   2) the video, shown in a centered, properly-sized frame (NOT full-screen —
//      a contained video stays crisp/HD instead of being upscaled into blur)
// then the whole panel slides down like a curtain to reveal the site beneath.
const TEXT_MS = 4500;     // how long the text splash holds before the video
const VIDEO_MAX_MS = 14000; // safety net so a stalled video never traps anyone

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [text]);
  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

// ── Stage 1: animated text splash ────────────────────────────────────────────
const TextIntro = () => (
  <motion.div
    key="text"
    className="relative min-h-screen w-full flex items-center justify-center px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
  >
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
        {[Code2, User, Github].map((Icon, index) => (
          <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
            <IconButton Icon={Icon} />
          </div>
        ))}
      </div>

      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
          <div className="mb-2 sm:mb-4">
            <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">Welcome</span>{' '}
            <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">To</span>{' '}
            <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">My</span>
          </div>
          <div>
            <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>{' '}
            <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Website</span>
          </div>
        </h1>
      </div>

      <div className="text-center" data-aos="fade-up" data-aos-delay="1200">
        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md" />
          <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <TypewriterEffect text="Krish Maheshwari" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ── Stage 2: framed video ────────────────────────────────────────────────────
const VideoIntro = ({ onDone }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      key="video"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="relative w-[94%] max-w-5xl">
        {/* themed glow behind the frame */}
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl rounded-[2rem]" />

        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/40 bg-black">
          <video
            ref={videoRef}
            src="/intro.mp4"
            className="w-full h-auto block"
            autoPlay
            muted={muted}
            playsInline
            preload="auto"
            onEnded={onDone}
            onError={onDone}
          />

          {/* mute / unmute, tucked in the corner of the frame */}
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 hover:bg-black/60 hover:scale-105 transition-all duration-300"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const WelcomeScreen = ({ onLoadingComplete, startPhase = 'text' }) => {
  const [phase, setPhase] = useState(startPhase); // 'text' → 'video'
  const finished = useRef(false);

  // Lock page scroll for the entire intro; restore it on reveal.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Drop the welcome flag. App's AnimatePresence then plays our slide-down
  // `exit` while the real site mounts beneath — a seamless reveal.
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onLoadingComplete?.();
  };

  // Stage 1 → 2: hold the text splash, then reveal the video.
  useEffect(() => {
    if (phase !== 'text') return;
    AOS.init({ duration: 1000, once: false, mirror: false });
    const t = setTimeout(() => setPhase('video'), TEXT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Safety net for the video stage.
  useEffect(() => {
    if (phase !== 'video') return;
    const t = setTimeout(finish, VIDEO_MAX_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // During the video, a deliberate scroll/swipe DOWN throws the curtain open
  // early. Needs a proper push (not a twitch): accumulate wheel delta on
  // laptops (2-finger / mouse-wheel down) and require a real swipe on touch.
  useEffect(() => {
    if (phase !== 'video') return;
    let accum = 0;
    let startY = null;

    const onWheel = (e) => {
      if (e.deltaY > 0) {
        accum += e.deltaY;
        if (accum > 110) finish();
      } else {
        accum = 0;
      }
    };
    const onTouchStart = (e) => { startY = e.touches[0]?.clientY ?? null; };
    const onTouchMove = (e) => {
      if (startY == null) return;
      if (e.touches[0].clientY - startY > 90) finish(); // swiped down
    };
    const onTouchEnd = () => { startY = null; };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030014] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        y: ['0%', '-5%', '115%'],
        scale: [1, 1.03, 0.9],
        borderRadius: ['0px', '0px', '48px'],
      }}
      transition={{ duration: 1.05, ease: [0.7, 0, 0.2, 1], times: [0, 0.18, 1] }}
    >
      <BackgroundEffect />
      <AnimatePresence mode="wait">
        {phase === 'text' ? <TextIntro key="text" /> : <VideoIntro key="video" onDone={finish} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default WelcomeScreen;
