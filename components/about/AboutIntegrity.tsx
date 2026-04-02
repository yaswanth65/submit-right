export function AboutIntegrity() {
  const standards = [
    {
      num: "01",
      title: "No Plagiarism",
      description: "We do not write content from scratch. We only edit what the researcher has authored."
    },
    {
      num: "02",
      title: "Author's Voice",
      description: "Our goal is to refine, not replace. The scientific logic and findings remain the author's alone."
    },
    {
      num: "03",
      title: "Journal Compliant",
      description: "Our editing practices align with the submission requirements of Nature, Lancet, and Cell groups."
    },
    {
      num: "04",
      title: "QA Checks",
      description: "A secondary senior editor reviews every document to ensure no ethical boundaries were crossed."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* Left Column */}
          <div className="sticky top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65656D" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[12px] font-medium text-[#4B5563] tracking-widest uppercase">
                ACADEMIC INTEGRITY
              </span>
            </div>
            
            <h2 className="text-[32px] lg:text-[40px] font-medium text-[#1C1C1D] leading-[1.2] mb-6">
              We Do Not Support Plagiarism, Ghostwriting, or Misconduct
            </h2>
            
            <p className="text-[16px] text-[#65656D] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
              Elementum suscipit donec viverra posuere at lorem nullam.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 pb-10">
            {standards.map((std, idx) => (
              <div 
                key={idx}
                className="sticky bg-white rounded-2xl p-8 border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#00A0E3]/20 transition-all duration-300 ease-in-out"
                style={{
                  top: `calc(120px + ${idx * 20}px)`,
                  zIndex: 10 + idx,
                }}
              >
                <div className="text-[13px] font-semibold text-[#00A0E3] tracking-wider uppercase mb-3">
                  STANDARD {std.num}
                </div>
                <h3 className="text-[20px] font-medium text-[#1C1C1D] mb-3">
                  {std.title}
                </h3>
                <p className="text-[15px] text-[#65656D] leading-relaxed">
                  {std.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
