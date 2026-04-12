export function AboutAudience() {
  const isFor = [
    "Researchers and Authors Seeking Expert Editing. If you've written your research and need a qualified expert to improve its language, structure, and publication-readiness.",
    "Non-Native English Speakers Submitting to International Journals. If English isn't your first language and you need your manuscript to meet the language standards of top-tier journals. Our editors preserve your voice while elevating your English.",
    "PhD Students and Academics Under Submission Deadlines. If you're working against a conference, journal, or thesis submission deadline and need fast, professional, trackable editing support. Submit Right was designed for this exact moment."
  ];

  const isNotFor = [
    "Anyone Seeking Ghostwriting or Full Paper Writing Services. Submit Right does not write research on behalf of clients. If you are looking for someone to write your paper, thesis, or assignment for you, this is not that platform.",
    "Students Looking to Submit AI-Generated or Plagiarised Work. We screen all manuscripts for plagiarism and will not process, edit, or support any work intended to misrepresent AI-generated content as original research. Academic integrity is non-negotiable here.",
    "Anyone Who Wants to Alter Research Findings Through Editing. Our editors improve how your research is communicated. Not what it says. If you want an editor to change your conclusions, manipulate your data presentation, or misrepresent your findings, Submit Right is not the right platform."
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
      <div className="landing-shell">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="landing-section-badge mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65656D" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="landing-section-badge-text">
              Right Fit
            </span>
          </div>
          
          <h2 className="landing-section-title mb-4 max-w-[700px]">
            Submit Right Is Built for Serious Researchers. And We Mean That.
          </h2>
          
          <p className="landing-section-description max-w-[600px]">
            We built Submit Right for a specific kind of person. Someone who takes their research seriously and wants professional support to communicate it better.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* IS FOR */}
          <div className="bg-[#FAF9F8] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F3F4F6]">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-medium text-[#1C1C1D]">
                SubmitRight is for
              </h3>
            </div>
            <ul className="space-y-4 sm:space-y-5">
              {isFor.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-[14px] sm:text-[15px] text-[#65656D] leading-relaxed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IS NOT FOR */}
          <div className="bg-[#FAF9F8] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F3F4F6]">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-medium text-[#1C1C1D]">
                SubmitRight is not for
              </h3>
            </div>
            <ul className="space-y-4 sm:space-y-5">
              {isNotFor.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-[14px] sm:text-[15px] text-[#65656D] leading-relaxed">
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
