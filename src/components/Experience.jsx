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
          {/* Altus Corp Experience */}
          <div className="group" data-aos="fade-up">
            <div className="glow-card p-6 rounded-2xl bg-[#0c0621] border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  {/* Company Logo */}
                  <a
                    href="https://altuscorp.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-lg p-0.5 overflow-hidden hover:scale-105 transition-transform"
                  >
                    <img src="/altus-corp.jpeg" alt="Altus Corp" className="max-w-full max-h-full object-contain" />
                  </a>

                  <div>
                    <h3 className="text-2xl font-bold text-purple-300">Full-Stack Developer Intern (App &amp; Web)</h3>
                    <p className="text-purple-300/90 font-medium">Altus Corp</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm text-right shrink-0 ml-3">Mumbai · June 2025 - Present</p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <a
                  href="https://altuscorp.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 transition-colors font-medium cursor-pointer"
                >
                  Ongoing
                </a>
                <a
                  href="https://altuscorp.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">
                Working as a Full-Stack Developer Intern at Altus Corp, where I worked on 3–4 websites and
                apps — some built for external clients and some in-house for the corp — alongside
                data-analytics dashboards and testing &amp; debugging work.
              </p>

              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Key Contributions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Built and shipped responsive, client-facing websites — including <a href="https://mananvasa.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline underline-offset-2">mananvasa.com</a>, <a href="https://productivity-shastra.vercel.app" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline underline-offset-2">productivity-shastra.vercel.app</a> and <a href="https://productivityshastra.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline underline-offset-2">productivityshastra.com</a> — each tailored to a distinct brand and audience.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Engineered modern, mobile-first interfaces with React, integrating Supabase and REST APIs for real-time data, authentication, and dynamic content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Developed cross-platform mobile applications, collaborating directly with clients to gather requirements, iterate on UI/UX, and ship polished, store-ready deliverables.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Built data-analytics dashboards that visualize key metrics and surface actionable insights for clients and internal teams.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Handled testing, debugging, and the full deployment lifecycle, ensuring reliable, production-ready releases delivered on time.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Full-Stack Developer", "React", "Supabase", "Analyst", "Testing & Debugging", "APIs"].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Finalyca Experience */}
          <div className="group" data-aos="fade-up">
            <div className="glow-card p-6 rounded-2xl bg-[#0c0621] border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                                     {/* Company Logo */}
                   <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-lg p-1 overflow-hidden">
                     <img
                       src="https://demo.finalyca.com/Images/finalyca2.png"
                       alt="Finalyca"
                       className="w-full h-full object-contain scale-110"
                     />
                   </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-green-400">Software Development Intern</h3>
                    <p className="text-green-300 font-medium">Finalyca</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm text-right shrink-0 ml-3">Mumbai · June 2025 - July 2025</p>
              </div>

              <div className="mb-4 flex items-center gap-2">
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
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Performed exploratory data analysis and prepared clean, analysis-ready datasets that fed downstream financial analytics.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Python</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Pandas</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Data Processing</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Excel Automation</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">ETL Pipelines</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">SQL</span>
              </div>
            </div>
          </div>

          {/* Miso Experience */}
          <div className="group" data-aos="fade-up">
            <div className="glow-card p-6 rounded-2xl bg-[#0c0621] border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                                     {/* Company Logo */}
                   <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-lg overflow-hidden">
                     <img
                       src="/miso-logo.png"
                       alt="Miso Creations"
                       className="w-full h-full object-cover scale-150"
                     />
                   </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white">Web Development Intern</h3>
                    <p className="text-blue-300 font-medium">Miso</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm text-right shrink-0 ml-3">Remote · August 2024 - October 2024</p>
              </div>

              <div className="mb-4 flex items-center gap-2">
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
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Built scalable, maintainable design systems at a fast-paced startup, aligning UI/UX closely with business goals.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Frontend Development</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">React</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Firebase</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Tailwind CSS</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">UI/UX</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Team Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
