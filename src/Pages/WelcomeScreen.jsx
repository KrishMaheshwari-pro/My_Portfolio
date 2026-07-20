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
const TEXT_MS = 2900;       // text splash: lets the fall-in finish + a short beat
const VIDEO_MAX_MS = 14000; // safety net so a stalled video never traps anyone

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    let dir = 1; // 1 = typing, -1 = erasing
    let timer;
    const step = () => {
      setDisplayText(text.slice(0, i));
      if (dir === 1) {
        if (i === text.length) { dir = -1; timer = setTimeout(step, 1600); return; } // hold full name
        i++;
        timer = setTimeout(step, 120);
      } else {
        if (i === 0) { dir = 1; timer = setTimeout(step, 500); return; } // brief pause, then retype
        i--;
        timer = setTimeout(step, 55);
      }
    };
    step();
    return () => clearTimeout(timer);
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
          <div key={index} data-aos="fade-down" data-aos-duration="1250" data-aos-delay={index * 200}>
            <IconButton Icon={Icon} />
          </div>
        ))}
      </div>

      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
          <div className="mb-2 sm:mb-4">
            <span data-aos="fade-right" data-aos-duration="1250" data-aos-delay="300" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">Welcome</span>{' '}
            <span data-aos="fade-right" data-aos-duration="1250" data-aos-delay="450" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">To</span>{' '}
            <span data-aos="fade-right" data-aos-duration="1250" data-aos-delay="600" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">My</span>
          </div>
          <div>
            <span data-aos="fade-up" data-aos-duration="1250" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>{' '}
            <span data-aos="fade-up" data-aos-duration="1250" data-aos-delay="950" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Website</span>
          </div>
        </h1>
      </div>

      <div className="text-center" data-aos="fade-up" data-aos-duration="1250" data-aos-delay="1150">
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
  const [leaving, setLeaving] = useState(false);  // true once the reveal starts
  const videoRef = useRef(null);
  const finished = useRef(false);
  const tapped = useRef(false);   // the visitor's tap = the browser's audio unlock
  const animDone = useRef(false); // the intro animation has finished

  // Drop the welcome flag. App's AnimatePresence then plays our slide `exit`
  // while the real site mounts beneath — a seamless reveal.
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    // Pause the video AND drop the heavy blurred layers so the slide is a pure,
    // GPU-cheap transform — no live decode, no blur re-compositing mid-swipe.
    const v = videoRef.current;
    if (v) { try { v.pause(); } catch (_) {} }
    setLeaving(true);
    onLoadingComplete?.();
  };

  // Stage 1 → 2: hold the text splash, then reveal the video.
  useEffect(() => {
    if (phase !== 'text') return;
    // Per-element data-aos-duration drives the slow fall-in; init is just a
    // baseline (the intro elements override it explicitly so nothing else can
    // reset them to the fast default).
    AOS.init({ duration: 1250, once: false, mirror: false });
    // Warm the decoder muted behind the splash so the clip is instant on reveal
    // (no black box). It's unmuted the moment the video stage begins.
    const v = videoRef.current;
    if (v) { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); }

    // Advance to the video only once BOTH have happened: the animation is done
    // AND the visitor has tapped. The tap is what unlocks browser audio, so the
    // video always plays with sound (sticky user activation persists).
    const advance = () => {
      if (tapped.current && animDone.current) setPhase('video');
    };
    const onTap = () => {
      if (tapped.current) return;
      tapped.current = true;
      advance();
    };
    const t = setTimeout(() => {
      animDone.current = true;
      advance();
    }, TEXT_MS);

    const opts = { passive: true };
    window.addEventListener('pointerdown', onTap, opts);
    window.addEventListener('keydown', onTap, opts);
    window.addEventListener('touchstart', onTap, opts);
    return () => {
      clearTimeout(t);
      window.removeEventListener('pointerdown', onTap);
      window.removeEventListener('keydown', onTap);
      window.removeEventListener('touchstart', onTap);
    };
  }, [phase]);

  // When the video stage begins, the element is already preloaded — start it
  // from the top so it plays instantly (no buffering box).
  useEffect(() => {
    if (phase !== 'video') return;
    const v = videoRef.current;
    if (v) {
      try { v.currentTime = 0; } catch (_) {}
      v.muted = false; // play LOUD by default
      v.volume = 1;
      const p = v.play();
      if (p && p.catch) {
        p.catch(() => {
          // If the browser blocks sound-on autoplay (a brand-new visitor with
          // no prior interaction), fall back to muted so the clip still plays
          // instead of freezing.
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

  // Bring sound up the instant the visitor does ANYTHING (click / tap / key /
  // scroll) during the video. Browsers block sound-on autoplay for gesture-less
  // first loads, so this is what makes it audible for anyone not already
  // "engaged". Scoped to the video stage so a click during the text splash
  // never unmutes the hidden warm-up behind it.
  useEffect(() => {
    if (phase !== 'video') return;
    const unlock = () => {
      const v = videoRef.current;
      if (!v || finished.current) return;
      v.muted = false;
      v.volume = 1;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    const opts = { passive: true };
    const evts = ['pointerdown', 'keydown', 'touchstart', 'touchend', 'wheel'];
    evts.forEach((ev) => window.addEventListener(ev, unlock, opts));
    return () => evts.forEach((ev) => window.removeEventListener(ev, unlock));
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
      exit={{ y: '-110%' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {!leaving && <BackgroundEffect />}

      {/* Video layer — mounted from the start so it preloads during the text
          splash; only made visible/played once we hit the video stage. */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-500 ${
          phase === 'video' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-[94%] max-w-5xl">
          {!leaving && (
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl rounded-[2rem]" />
          )}
          <div className={`relative rounded-2xl overflow-hidden border border-white/10 bg-black ${leaving ? '' : 'shadow-2xl shadow-purple-900/40'}`}>
            {/* Muting is controlled imperatively (warm-up muted, then unmuted)
                so React never re-asserts a static muted attribute. */}
            <video
              ref={videoRef}
              src={introVideo}
              className="w-full h-auto block"
              autoPlay
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
