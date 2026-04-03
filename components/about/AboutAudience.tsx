export function AboutAudience() {
  const isFor = [
    "Doctoral candidates polishing their final dissertation for defense.",
    "Faculty members preparing manuscripts for high-impact journals.",
    "ESL researchers ensuring their linguistic precision matches their scientific rigor."
  ];

  const isNotFor = [
    "Students looking for someone to \"write\" their essays or homework.",
    "Researchers seeking to artificially inflate their data or findings.",
    "Any request involving ghostwriting or circumventing ethical declarations."
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65656D" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[12px] font-medium text-[#4B5563] tracking-widest uppercase">
              LOREM IPSUM DOLOR
            </span>
          </div>
          
          <h2 className="text-[32px] lg:text-[36px] font-medium text-[#1C1C1D] leading-[1.2] mb-4 max-w-[700px]">
            Designed For Researchers Who Want Legitimate Academic Support
          </h2>
          
          <p className="text-[16px] text-[#65656D] leading-relaxed max-w-[600px]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* IS FOR */}
          <div className="bg-[#FAF9F8] rounded-2xl p-8 lg:p-10 border border-[#F3F4F6]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-[18px] font-medium text-[#1C1C1D]">
                SubmitRight is for
              </h3>
            </div>
            <ul className="space-y-5">
              {isFor.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-[15px] text-[#65656D] leading-relaxed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IS NOT FOR */}
          <div className="bg-[#FAF9F8] rounded-2xl p-8 lg:p-10 border border-[#F3F4F6]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-[18px] font-medium text-[#1C1C1D]">
                SubmitRight is not for
              </h3>
            </div>
            <ul className="space-y-5">
              {isNotFor.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-[15px] text-[#65656D] leading-relaxed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
