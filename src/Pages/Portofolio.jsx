import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase"; 

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks tetap sama
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "c.svg", language: "C" },
  { icon: "c++.svg", language: "C++" },
  { icon: "python.svg", language: "Python" },
  { icon: "go.svg", language: "GO" },
  { icon: "MongoDB.svg", language: "MongoDB" },
  { icon: "expresss.svg", language: "Express" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "sql.svg", language: "SQL" },
  { icon: "ms excel.svg", language: "Excel" },
  { icon: "cloud AWS.svg", language: "Cloud AWS" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Mengambil data dari Supabase secara paralel
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: true }),
        supabase.from("certificates").select("*").order('id', { ascending: true }), 
      ]);

      // Error handling untuk setiap request
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      // Supabase mengembalikan data dalam properti 'data'
      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage (fungsionalitas ini tetap dipertahankan)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);



  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="bg-[#030014] py-8 px-[5%] sm:px-[5%] lg:px-[10%] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                {/* Project 1 */}
                <div
                  data-aos="fade-up-right"
                  data-aos-duration="1000"
                  className="h-full"
                >
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 h-full">
                    <h3 className="text-white font-bold text-lg mb-3">
                      Diamond-Analysis-Project
                    </h3>
                    <ul className="text-gray-400 text-sm mb-4 space-y-1">
                      <li>• Comprehensive analysis to understand factors influencing diamond prices</li>
                      <li>• Involved data cleaning, exploratory data analysis, and data visualization</li>
                      <li>• Correlation analysis between diamond prices and features like carat weight, cut, color, and clarity</li>
                    </ul>
                    <div className="flex gap-3 mt-auto">
                      <a
                        href="https://github.com/yourusername/diamond-analysis-project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Source Code
                      </a>
                      <a
                        href="https://diamond-analysis-demo.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  className="h-full"
                >
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 h-full">
                    <h3 className="text-white font-bold text-lg mb-3">
                    Multiple Excel Scraper
                    </h3>
                    <ul className="text-gray-400 text-sm mb-4 space-y-1">
                    <li>• A Python code that automates extracting data from multiple Excel files together</li>
                      <li>• Automates extraction from hundreds of Excel files at once and removes irrelevant data</li>
                      <li>• Ensures consistency by handling inconsistent headers, skipped data, and duplicates</li>
                    </ul>
                    <div className="flex gap-3 mt-auto">
                      <a
                        href="https://github.com/KrishMaheshwari-pro/Excel_Scraper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 3 */}
                <div
                  data-aos="fade-up-left"
                  data-aos-duration="1000"
                  className="h-full"
                >
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 h-full">
                    <h3 className="text-white font-bold text-lg mb-3">
                      E-Casino Suite
                    </h3>
                    <ul className="text-gray-400 text-sm mb-4 space-y-1">
                      <li>• A JavaScript powered platform that brings classic casino games like Blackjack, Roulette and Spinning Wheel</li>
                      <li>• Implements core game mechanics with random odds</li>
                      <li>• Offers an interactive, browser-based experience with engaging visuals and smooth gameplay</li>
                    </ul>
                    <div className="flex gap-3 mt-auto">
                      <a
                        href="https://github.com/KrishMaheshwari-pro/CASINO"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Source Code
                      </a>
                      <a
                        href="https://krishmaheshwari-pro.github.io/CASINO/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 4 */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="1100"
                  className="h-full"
                >
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 h-full">
                    <h3 className="text-white font-bold text-lg mb-3">
                      Online Sudoko Game
                    </h3>
                    <ul className="text-gray-400 text-sm mb-4 space-y-1">
                      <li>• A web-based Sudoku game built using HTML, CSS, and JavaScript</li>
                      <li>• Includes features like puzzle validation, conflict highlighting, and auto-solving </li>
                      <li>• Lets players generate new puzzles, reset grids, and practice logical skills</li>
                    </ul>
                    <div className="flex gap-3 mt-auto">
                      <a
                        href="https://github.com/KrishMaheshwari-pro/sudoko_game"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Source Code
                      </a>
                      <a
                        href="https://krishmaheshwari-pro.github.io/sudoko_game/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>

                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

                     <TabPanel value={value} index={1} dir={theme.direction}>
             <div className="container mx-auto flex justify-center items-center overflow-hidden">
               <div className="grid grid-cols-1 gap-4 w-full">
                 {/* Certificate 1 */}
                 <div
                   data-aos="fade-up-right"
                   data-aos-duration="1000"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block w-full"
                       style={{ display: "block", width: "100%" }}
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 1
                         window.open("https://www.hackerrank.com/certificates/iframe/1ee525e14c2f", "_blank");
                         console.log(`Certificate 1 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                       Software Development Intern Role
                       </h3>
                       <p className="text-gray-400 text-sm">
                         HackerRank
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 2 */}
                 <div
                   data-aos="fade-up"
                   data-aos-duration="1200"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 2
                         window.open("https://drive.google.com/file/d/1LvcrGA4snsU9jbOBYStlVY2AgkmBCtIb/view", "_blank");
                         console.log(`Certificate 2 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                         Data Structures and Algorithms in C/C++
                       </h3>
                       <p className="text-gray-400 text-sm">
                         Pregrad
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 3 */}
                 <div
                   data-aos="fade-up-left"
                   data-aos-duration="1000"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 3
                         window.open("https://www.codechef.com/certificates/public/ee24b81", "_blank");
                         console.log(`Certificate 3 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                         Advanced Data Structures and Algorithms
                       </h3>
                       <p className="text-gray-400 text-sm">
                         CodeChef
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 4 */}
                 <div
                   data-aos="fade-up"
                   data-aos-duration="1100"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 4
                         window.open("https://drive.google.com/file/d/1jIGvh71FFNhM1CqbnFKQ24FMN_y80dAl/view", "_blank");
                         console.log(`Certificate 4 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                       Design and Analysis of Algorithms
                       </h3>
                       <p className="text-gray-400 text-sm">
                         NPTEL
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 5 */}
                 <div
                   data-aos="fade-up-right"
                   data-aos-duration="1000"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 5
                         window.open("https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_mzE27mRgqZNTEPnnu_1754659569771_completion_certificate.pdf ", "_blank");
                         console.log(`Certificate 5 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                       Solutions Architecture Job Simulation
                       </h3>
                       <p className="text-gray-400 text-sm">
                         Amazon AWS
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 6 */}
                 <div
                   data-aos="fade-up"
                   data-aos-duration="1200"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 6
                         window.open("https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_mzE27mRgqZNTEPnnu_1754660196487_completion_certificate.pdf", "_blank");
                         console.log(`Certificate 6 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                       Data Analytics Job Simulation
                       </h3>
                       <p className="text-gray-400 text-sm">
                        Delloite
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 7 */}
                 <div
                   data-aos="fade-up-left"
                   data-aos-duration="1000"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 7
                         window.open("https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_mzE27mRgqZNTEPnnu_1754659892073_completion_certificate.pdf", "_blank");
                         console.log(`Certificate 7 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                         Software Engineering Job Simulation
                       </h3>
                       <p className="text-gray-400 text-sm">
                         JP Morgan
                       </p>
                     </a>
                   </div>
                 </div>

                 {/* Certificate 8 */}
                 {/* <div
                   data-aos="fade-up"
                   data-aos-duration="1100"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 8
                         console.log(`Certificate 8 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                         GitHub Foundations 8
                       </h3>
                       <p className="text-gray-400 text-sm">
                         GitHub
                       </p>
                     </a>
                   </div>
                 </div> */}

                 {/* Certificate 9 */}
                 {/* <div
                   data-aos="fade-up-right"
                   data-aos-duration="1000"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 9
                         console.log(`Certificate 9 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                         GitHub Foundations 9
                       </h3>
                       <p className="text-gray-400 text-sm">
                         GitHub
                       </p>
                     </a>
                   </div>
                 </div> */}

                 {/* Certificate 10 */}
                 {/* <div
                   data-aos="fade-up"
                   data-aos-duration="1200"
                 >
                   <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600">
                     <a 
                       href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block"
                       onClick={(e) => {
                         e.preventDefault();
                         // TODO: Add your URL here for Certificate 10
                         console.log(`Certificate 10 clicked`);
                       }}
                     >
                       <h3 className="text-white font-bold text-lg mb-3 hover:text-blue-400 transition-colors">
                         GitHub Foundations 10
                       </h3>
                       <p className="text-gray-400 text-sm">
                         GitHub
                       </p>
                     </a>
                   </div>
                 </div> */}
               </div>
             </div>
           </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}