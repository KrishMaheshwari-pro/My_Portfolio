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

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <ScrollProgress />
          <GrainOverlay />
          <CursorTrail />
          <Navbar />
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
        </>
      )}
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
  useTilt();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
         <Route path="*" element={<NotFoundPage />} /> {/* Ini route 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;