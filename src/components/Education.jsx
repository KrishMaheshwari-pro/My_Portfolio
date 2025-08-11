import React from 'react';

const Education = () => {
  return (
    <div className="bg-[#030014] py-8 px-[5%] sm:px-[5%] lg:px-[10%]" id="Education">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </div>

        <div className="space-y-6">
              {/* Manipal University */}
              <div className="group" data-aos="fade-up">
                <div className="p-6 rounded-2xl bg-[#0c0621] border border-blue-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-2xl font-bold text-white/90">Manipal University Jaipur</div>
                    <time className="inline-flex items-center justify-center text-xs font-semibold uppercase w-24 h-6 text-blue-400 bg-blue-400/10 rounded-full">
                      2023 - 2027
                    </time>
                  </div>
                  <div className="text-blue-400 font-medium">Computer Science Engineering</div>
                  <div className="mt-3 inline-flex flex-wrap gap-2">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm bg-[#12082f] border border-blue-500/20 text-blue-400">
                      Bachelors of Technology
                    </div>
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm bg-[#12082f] border border-blue-500/20 text-blue-400">
                      Current Student, 9 CGPA
                    </div>
                  </div>
                  <div className="mt-2 text-white/50 ml-1">Jaipur</div>
                </div>
              </div>

              {/* KC College */}
              <div className="group" data-aos="fade-up">
                <div className="p-6 rounded-2xl bg-[#0c0621] border border-green-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-2xl font-bold text-white/90">KC College</div>
                    <time className="inline-flex items-center justify-center text-xs font-semibold uppercase w-24 h-6 text-green-400 bg-green-400/10 rounded-full">
                      2021 - 2023
                    </time>
                  </div>
                  <div className="text-green-400 font-medium">Junior College</div>
                  <div className="mt-3 inline-flex flex-wrap gap-2">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm bg-[#12082f] border border-green-500/20 text-green-400">
                      HSC
                    </div>
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm bg-[#12082f] border border-green-500/20 text-green-400">
                      Science Stream
                    </div>
                  </div>
                  <div className="mt-2 text-white/50 ml-1">Mumbai</div>
                </div>
              </div>

              {/* Gopi Birla Memorial School */}
              <div className="group" data-aos="fade-up">
                <div className="p-6 rounded-2xl bg-[#0c0621] border border-purple-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-2xl font-bold text-white/90">Gopi Birla Memorial School</div>
                    <time className="inline-flex items-center justify-center text-xs font-semibold w-24 h-6 text-purple-400 bg-purple-400/10 rounded-full">
                      upto 2021
                    </time>
                  </div>
                  <div className="text-purple-400 font-medium">Schooling (till 10ᵗʰ std)</div>
                  <div className="mt-3 inline-flex flex-wrap gap-2">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm bg-[#12082f] border border-purple-500/20 text-purple-400">
                      CBSE
                    </div>
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm bg-[#12082f] border border-purple-500/20 text-purple-400">
                      94.2%
                    </div>
                  </div>
                  <div className="mt-2 text-white/50 ml-1">Mumbai</div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Education;
