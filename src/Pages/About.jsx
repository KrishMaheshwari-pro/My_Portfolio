import React, { useEffect, memo } from "react";
import { FileText, Code, Sparkles } from "lucide-react";
import Magnetic from "../components/Magnetic";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-3 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold shimmer-text"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2 lg:translate-x-4 lg:translate-y-11">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/Photo.jpg"
            alt="Profile"
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  useEffect(() => {
    const initAOS = () => AOS.init({ once: false });

    initAOS();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="bg-[#030014] py-4 text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="About">
      <Header />
      <div className="w-full mx-auto pt-2 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 lg:gap-12 items-center lg:items-start">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Hello, I'm</span>
              <span className="block mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300">Krish Maheshwari</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-lg text-gray-400 leading-relaxed pb-4 sm:pb-0" data-aos="fade-right" data-aos-duration="1500">
            I'm a B.Tech Computer Science and Engineering (Core) student and a full-stack developer with a solid foundation in programming, data structures, and software development. I build end-to-end web and app experiences, while my deeper interests lie in Machine Learning and Data Science. Driven by curiosity and a commitment to growth, I continuously expand my knowledge, master emerging technologies, and apply my skills to solve real-world problems with innovation and precision.            </p>

            {/* Quote */}
            <div className="tilt-card tilt-soft cursor-default [&_*]:cursor-default relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-[#6366f1]/30 rounded-2xl p-4 !my-4 backdrop-blur-md shadow-2xl overflow-hidden group" data-aos="fade-up" data-aos-duration="1700">
              <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
                <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
              </div>
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>
              <div className="absolute top-3 left-4 text-[#6366f1] opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 px-6">
                "Keeping up with tech trends so you don’t have to."
                <svg className="inline-block w-3 h-3 ml-1.5 align-top text-[#a855f7] opacity-40 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </blockquote>
            </div>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:!mt-5">
              <Magnetic className="w-full lg:w-auto">
                <a href="/Krish Maheshwari Resume.pdf" download="Krish Maheshwari Resume.pdf" className="block w-full lg:w-auto">
                  <button data-aos="fade-up" data-aos-duration="1000" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                  </button>
                </a>
              </Magnetic>
              <Magnetic className="w-full lg:w-auto">
                <a href="#Portofolio" className="block w-full lg:w-auto">
                  <button data-aos="fade-up" data-aos-duration="1000" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                  </button>
                </a>
              </Magnetic>
            </div>
          </div>
          <ProfileImage />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
