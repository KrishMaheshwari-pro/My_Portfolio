import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Intro clip. Swap this import to intro-old.mp4 to bring back the previous one;
// the old video stays parked in the same folder, just unused.
import introVideo from '../assets/videos/intro.mp4';

// Two-stage intro:
//   1) animated "Welcome To My Portfolio" text (the original splash)
//   2) the video, shown in a centered, properly-sized frame
// then the whole panel slides down like a curtain to reveal the site beneath.
//
// The <video> is mounted from the very start (hidden behind the text) so it
// PRELOADS during the splash and plays instantly when revealed — no black
// "loading" box / buffering gap between the text and the video.
const TEXT_MS = 4500;       // how long the text splash holds before the video
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
    className="absolute inset-0 z-10 flex items-center justify-center px-4"
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

const WelcomeScreen = ({ onLoadingComplete, startPhase = 'text' }) => {
  const [phase, setPhase] = useState(startPhase); // 'text' → 'video'
  const videoRef = useRef(null);
  const finished = useRef(false);

  // Drop the welcome flag. App's AnimatePresence then plays our slide-down
  // `exit` while the real site mounts beneath — a seamless reveal.
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    // Pause the video so the slide-down isn't fighting live video decode/paint.
    const v = videoRef.current;
    if (v) { try { v.pause(); } catch (_) {} }
    onLoadingComplete?.();
  };

  // Stage 1 → 2: hold the text splash, then reveal the video.
  useEffect(() => {
    if (phase !== 'text') return;
    AOS.init({ duration: 1000, once: false, mirror: false });
    const t = setTimeout(() => setPhase('video'), TEXT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // When the video stage begins, the element is already preloaded — start it
  // from the top so it plays instantly (no buffering box).
  useEffect(() => {
    if (phase !== 'video') return;
    const v = videoRef.current;
    if (v) {
      try { v.currentTime = 0; } catch (_) {}
      v.muted = false; // play with natural sound
      const p = v.play();
      if (p && p.catch) {
        p.catch(() => {
          // Browsers block sound-on autoplay until the visitor interacts with
          // the page — fall back to muted so the clip still plays (and slides)
          // instead of freezing on a blank frame.
          v.muted = true;
          const p2 = v.play();
          if (p2 && p2.catch) p2.catch(() => {});
        });
      }
    }
    const t = setTimeout(finish, VIDEO_MAX_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // During the video, a deliberate scroll/swipe DOWN throws the curtain open
  // early. Needs a proper push (not a twitch).
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

  // Only react to end/error once we're actually showing the video — the element
  // autoplays muted behind the text to warm the decoder, and a short clip could
  // otherwise "end" during the splash and dismiss the intro prematurely.
  const handleEnded = () => { if (phase === 'video') finish(); };
  const handleError = () => { if (phase === 'video') finish(); };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030014] overflow-hidden will-change-transform"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: ['0%', '-4%', '112%'], scale: [1, 1.02, 0.94] }}
      transition={{ duration: 0.95, ease: [0.7, 0, 0.2, 1], times: [0, 0.16, 1] }}
    >
      <BackgroundEffect />

      {/* Video layer — mounted from the start so it preloads during the text
          splash; only made visible/played once we hit the video stage. */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-500 ${
          phase === 'video' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-[94%] max-w-5xl">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl rounded-[2rem]" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/40 bg-black">
            {/* `muted` here only warms the decoder silently behind the text
                splash; the video-phase effect unmutes it for natural sound. */}
            <video
              ref={videoRef}
              src={introVideo}
              className="w-full h-auto block"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleEnded}
              onError={handleError}
            />
          </div>
        </div>
      </div>

      {/* Text splash on top during stage 1 */}
      <AnimatePresence>{phase === 'text' && <TextIntro key="text" />}</AnimatePresence>
    </motion.div>
  );
};

export default WelcomeScreen;
