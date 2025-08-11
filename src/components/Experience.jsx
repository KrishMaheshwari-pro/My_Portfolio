import React from 'react';
import { ExternalLink } from 'lucide-react';

const Experience = () => {
  return (
    <div className="bg-[#030014] py-8 px-[5%] sm:px-[5%] lg:px-[10%]" id="Experience">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {/* Finalyca Experience */}
          <div className="group" data-aos="fade-up">
            <div className="p-6 rounded-2xl bg-[#0c0621] border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                                     {/* Company Logo */}
                   <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg p-1">
                     <img 
                       src="https://demo.finalyca.com/Images/finalyca2.png" 
                       alt="Finalyca" 
                       className="w-full h-full object-contain"
                     />
                   </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-green-400">Software Development Intern</h3>
                    <p className="text-green-300 font-medium">Finalyca</p>
                    <p className="text-gray-400 text-sm">Current Position</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <a 
                    href="https://finalyca.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors font-medium cursor-pointer"
                  >
                    Completed
                  </a>
                  <a 
                    href="https://finalyca.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-400 text-sm">June 2025 - July 2025</p>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Currently working as a Software Development Intern at Finalyca, a client-server company that provides comprehensive financial data and analytics solutions.
              </p>
              
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Key Contributions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Developed a smart Excel parser using Python pandas framework that automates data extraction and processing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Built automated data transformation pipelines that convert Excel files into structured formats for analysis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Implemented error handling and validation systems to ensure data integrity during processing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Collaborated with the development team to optimize data workflows and improve processing efficiency.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Python</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Pandas</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Data Processing</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Excel Automation</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Office</span>
              </div>
            </div>
          </div>

          {/* Miso Experience */}
          <div className="group" data-aos="fade-up">
            <div className="p-6 rounded-2xl bg-[#0c0621] border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                                     {/* Company Logo */}
                   <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg p-1">
                     <img 
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxnKdbkhSLHLfb_WOY_yMM1Ohuv-0Lz0J7A&s" 
                       alt="Miso" 
                       className="w-full h-full object-contain"
                     />
                   </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white">Web Development Intern</h3>
                    <p className="text-blue-300 font-medium">Miso</p>
                    <p className="text-gray-400 text-sm">Previous Experience</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <a 
                    href="https://miso-underdev-rm2s.vercel.app/?fbclid=PAQ0xDSwK6aqNleHRuA2FlbQIxMQABp0tdRXCH7eAXbUkOp1rEYOK6NXV7UE2FwctrJE3gsDoEM39KwRzMY-27NMSY_aem_8BbfBUVT36DUYPNXIt6RqQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
                  >
                    Completed
                  </a>
                  <a 
                    href="https://miso-underdev-rm2s.vercel.app/?fbclid=PAQ0xDSwK6aqNleHRuA2FlbQIxMQABp0tdRXCH7eAXbUkOp1rEYOK6NXV7UE2FwctrJE3gsDoEM39KwRzMY-27NMSY_aem_8BbfBUVT36DUYPNXIt6RqQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-400 text-sm">August 2024 - October 2024</p>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Worked as a Frontend Developer at Miso, an innovative startup focused on creating customizable gifts and personalized showpieces for customers.
              </p>
              
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Key Contributions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Developed responsive web interfaces using modern frontend technologies and best practices.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Implemented Firebase integration for real-time data management and user authentication.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Styled applications using Tailwind CSS framework for consistent and maintainable design systems.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Collaborated with cross-functional team members to deliver high-quality web solutions on schedule.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Frontend Development</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Firebase</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Tailwind CSS</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Team Collaboration</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Remote</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
