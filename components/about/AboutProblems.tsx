export function AboutProblems() {
  const problems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m14 13-3-3" />
          <path d="M19 14.5 14.5 19" />
          <path d="M21.5 12.5 19 10" />
          <path d="m5 16 3-3" />
          <path d="M7.5 18 10 15.5" />
          <path d="m14.5 19 3 3" />
          <path d="m19 14.5 3 3" />
          <path d="M2.5 21.5 5 19" />
          <path d="m3 9 7 7" />
          <path d="m10 5 4-4" />
          <path d="m15 10 4-4" />
        </svg>
      ), // gavel placeholder
      title: "Academic work judged unfairly",
      description: "Groundbreaking research is often rejected by top-tier journals not due to poor science, but due to nuanced linguistic barriers."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
      ), // eye-off placeholder
      title: "Editing process unclear",
      description: "Many services operate in black boxes, making it difficult for authors to track changes or understand the rationale behind edits."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="2" />
          <path d="M8 2v20" />
          <path d="M16 2v20" />
          <path d="M2 8h20" />
          <path d="M2 16h20" />
        </svg>
      ), // grid placeholder
      title: "Services lack transparency",
      description: "Hidden fees and automated rewriting tools have eroded trust in the professional academic editing ecosystem."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65656D" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-[12px] font-medium text-[#4B5563] tracking-widest uppercase">
              LOREM IPSUM
            </span>
          </div>
          <h2 className="text-[32px] lg:text-[36px] font-medium text-[#1C1C1D] leading-[1.2] mb-4">
            Academic Support Should Be Clear, Ethical, and Transparent
          </h2>
          <p className="text-[16px] text-[#65656D]">
            Academic Support Should Be Clear, Ethical, and Transparent
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, idx) => (
            <div 
              key={idx} 
              className="bg-[#F8FAFC] rounded-2xl p-8 lg:p-10 flex flex-col items-start border border-[#F1F5F9] transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-[18px] font-medium text-[#1C1C1D] mb-4">
                {problem.title}
              </h3>
              <p className="text-[15px] text-[#65656D] leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
