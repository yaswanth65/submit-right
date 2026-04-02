export function AboutExperts() {
  const experts = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Editors",
      description: "Native-speaking PhDs with 10+ years experience."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      ),
      title: "Translators",
      description: "Specialists in technical nomenclature translation."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Subject Experts",
      description: "Domain-specific reviewers for STEM and Humanities."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      ),
      title: "QA",
      description: "Rigorous multi-stage quality assurance protocol."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F3F9FC] relative">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Cards Container - Two Column Layout */}
          <div className="flex gap-8 w-full">
            
            {/* Left Column */}
            <div className="flex flex-col gap-12 flex-1">
              {/* Card 1 - Editors */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#F3F9FC] rounded-lg flex items-center justify-center mb-5">
                  {experts[0].icon}
                </div>
                <h3 className="text-[16px] font-medium text-[#1C1C1D] mb-2">
                  {experts[0].title}
                </h3>
                <p className="text-[14px] text-[#65656D] leading-relaxed">
                  {experts[0].description}
                </p>
              </div>

              {/* Card 3 - Subject Experts */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#F3F9FC] rounded-lg flex items-center justify-center mb-5">
                  {experts[2].icon}
                </div>
                <h3 className="text-[16px] font-medium text-[#1C1C1D] mb-2">
                  {experts[2].title}
                </h3>
                <p className="text-[14px] text-[#65656D] leading-relaxed">
                  {experts[2].description}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-12 flex-1 pt-12">
              {/* Card 2 - Translators */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#F3F9FC] rounded-lg flex items-center justify-center mb-5">
                  {experts[1].icon}
                </div>
                <h3 className="text-[16px] font-medium text-[#1C1C1D] mb-2">
                  {experts[1].title}
                </h3>
                <p className="text-[14px] text-[#65656D] leading-relaxed">
                  {experts[1].description}
                </p>
              </div>

              {/* Card 4 - QA */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#F3F9FC] rounded-lg flex items-center justify-center mb-5">
                  {experts[3].icon}
                </div>
                <h3 className="text-[16px] font-medium text-[#1C1C1D] mb-2">
                  {experts[3].title}
                </h3>
                <p className="text-[14px] text-[#65656D] leading-relaxed">
                  {experts[3].description}
                </p>
              </div>
            </div>

          </div>

          {/* Right Content (UNCHANGED) */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65656D" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-[12px] font-medium text-[#4B5563] tracking-widest uppercase">
                EXPERT NETWORK
              </span>
            </div>
            
            <h2 className="text-[32px] lg:text-[40px] font-medium text-[#1C1C1D] leading-[1.2] mb-6">
              Our Work Is Completed By Qualified Academic Specialists
            </h2>
            
            <div className="flex flex-col gap-5 text-[16px] text-[#65656D] leading-relaxed lg:max-w-[90%]">
              <p>
                Every manuscript is assigned to a specialist with a background in your specific field of study. We don't believe in "generalist" editing.
              </p>
              <p>
                Note: All editors undergo continuous peer evaluation and must maintain a 98%+ satisfaction rating to remain in our network.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}