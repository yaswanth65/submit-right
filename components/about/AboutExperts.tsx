export function AboutExperts() {
  const experts = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Language Editors",
      description: "PhD-qualified experts who correct grammar, tone, clarity, and flow. While preserving the researcher's academic voice throughout."
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
      title: "Academic Translators",
      description: "Specialists in translating research from native languages into publication-standard English. With domain knowledge that ensures terminology accuracy."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Subject-Matter Experts",
      description: "Field-specific reviewers across 1,600+ disciplines who evaluate scientific accuracy, methodological consistency, and domain-specific terminology before delivery."
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      ),
      title: "QA Reviewers",
      description: "Senior-level quality assurance professionals who independently verify every manuscript before it leaves the platform. Ensuring it meets both language and journal-readiness standards."
    }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F3F9FC] relative">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-start">
          
          {/* Cards Container - Two Column Layout */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6 sm:gap-12 flex-1">
              {/* Card 1 - Editors */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-5 sm:p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
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
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-5 sm:p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
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
            <div className="flex flex-col gap-6 sm:gap-12 flex-1 pt-0 sm:pt-12">
              {/* Card 2 - Translators */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-5 sm:p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
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

              {/* Car 4 - QA */}
              <div className="bg-white border border-[#F3F4F6] rounded-2xl p-5 sm:p-6 w-full shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
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
            <div className="text-center lg:text-left">
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] mb-6 mx-auto lg:mx-0">
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#65656D"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    <span className="text-[12px] font-medium text-[#4B5563] tracking-widest uppercase">
      Our Expert Network
    </span>
  </div>
</div>
            
          <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] font-medium text-[#1C1C1D] leading-[1.2] mb-5 sm:mb-6 text-center lg:text-left">
  The Specialists Behind Every Manuscript We Deliver
</h2>
            
            <div className="flex flex-col gap-4 sm:gap-5 text-[14px] sm:text-[16px] text-[#65656D] leading-relaxed lg:max-w-[90%]">
              <p>
                Submit Right's quality doesn't come from software. It comes from a hand-selected, subject-verified network of academic professionals. Each assigned to manuscripts based on expertise, not availability.
              </p>
              <p>
                Every editor goes through a multi-step vetting process that includes qualification verification, subject-area testing, sample editing evaluation, and compliance training. Editors are only assigned to manuscripts within their verified subject domain. No editor on Submit Right handles work outside their area of expertise.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}