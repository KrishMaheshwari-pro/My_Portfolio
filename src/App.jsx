import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import notfound from "./Pages/404";
import NotFoundPage from "./Pages/404";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Reveal from "./components/Reveal";
import useTilt from "./hooks/useTilt";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import GrainOverlay from "./components/GrainOverlay";
import StatsBand from "./components/StatsBand";
import CursorTrail from "./components/CursorTrail";

const LandingPage = ({ showWelcome, setShowWelcome, introPhase, onReplayIntro }) => {
  return (
    <>
      {/* Site is always mounted/painted underneath. The intro is just an overlay
          on top, so revealing it is a pure slide with nothing to build — no
          mount jank / "reload" flash mid-animation. */}
      <ScrollProgress />
      <GrainOverlay />
      <CursorTrail />
      <Navbar onReplayIntro={onReplayIntro} />
      <AnimatedBackground />
      <Home />
      <Reveal><About /></Reveal>
      <Reveal><StatsBand /></Reveal>
      <Reveal><Education /></Reveal>
      <Reveal><Experience /></Reveal>
      <Reveal><Portofolio /></Reveal>
      <Reveal><ContactPage /></Reveal>
      <footer>
        <center>
          <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
          <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
            © 2026{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Krish™
            </a>
            . All Rights Reserved.
          </span>
        </center>
      </footer>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen startPhase={introPhase} onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2026{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Krish™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [introPhase, setIntroPhase] = useState('text'); // first load shows text → video
  useTilt();

  // Navbar "replay" jumps straight to the video stage.
  const replayIntro = () => {
    setIntroPhase('video');
    setShowWelcome(true);
  };

  // Scroll handling for the intro:
  //  • while the intro shows  → scroll is fully locked
  //  • when it reveals the site → pin to the very top (Home) and swallow the
  //    leftover scroll momentum from the trigger gesture, so we land on Home and
  //    STOP. Only once the user stops and scrolls again does the page move down.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (showWelcome) {
      // Intro on screen — stay locked; the reveal branch releases it.
      return () => { document.body.style.overflow = prev; };
    }

    // Reveal phase: the page is already locked by overflow:hidden, so we do NOT
    // call scrollTo / preventDefault per wheel event — those force a synchronous
    // reflow (scrollTo) and block the scroll thread (non-passive preventDefault)
    // on EVERY event, which is exactly what made a mid-swipe reveal stutter.
    // Instead: pin once, keep the lock, and release shortly after the user's
    // gesture goes quiet — using cheap, passive listeners that only reset a timer.
    window.scrollTo(0, 0);
    let idle = setTimeout(release, 1000); // release after the slide settles
    function release() {
      document.body.style.overflow = prev || '';
      teardown();
    }
    const bump = () => {
      clearTimeout(idle);
      idle = setTimeout(release, 260); // hold the lock until scrolling quiets down
    };
    window.addEventListener('wheel', bump, { passive: true });
    window.addEventListener('touchmove', bump, { passive: true });
    function teardown() {
      clearTimeout(idle);
      window.removeEventListener('wheel', bump);
      window.removeEventListener('touchmove', bump);
    }
    return teardown;
  }, [showWelcome]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} introPhase={introPhase} onReplayIntro={replayIntro} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
         <Route path="*" element={<NotFoundPage />} /> {/* Ini route 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;