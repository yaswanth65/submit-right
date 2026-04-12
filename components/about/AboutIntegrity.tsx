export function AboutIntegrity() {
  const standards = [
    {
      num: "01",
      title: "Zero Plagiarism Tolerance",
      description: "We flag, report, and refuse to conceal any form of plagiarism detected during editing. Every eligible order is screened using iThenticate and we will never help a researcher pass off duplicated content as original work."
    },
    {
      num: "02",
      title: "No Ghostwriting Services",
      description: "Submit Right edits and improves your writing. We do not write your research for you. We will never author, ghostwrite, or fabricate sections of a manuscript. Academic work must represent the researcher's own intellectual contribution."
    },
    {
      num: "03",
      title: "Data Confidentiality Always",
      description: "Your manuscript, your data, and your personal information are yours. No editor, no admin, no third party has access beyond what the service strictly requires."
    },
    {
      num: "04",
      title: "Ethical Editorial Practice",
      description: "Our editors improve language, structure, and clarity. They never alter findings, misrepresent methodology, or change conclusions. The science stays exactly as the researcher intended. We enhance how it's communicated, never what it says."
    },
    {
      num: "05",
      title: "Honest Pricing, Always",
      description: "No hidden fees. The price you see in the Quote Calculator is the price you pay. We believe transparency in pricing is as important as transparency in research."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
      <div className="landing-shell">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-start">
          
    <div className="lg:sticky lg:top-24 text-left">
  <div className="landing-section-badge mb-6 mx-auto lg:mx-0">
    <img src="/vector2.svg" alt="icon" className="w-4 h-4" />
    <span className="landing-section-badge-text">
      Our Standards
    </span>
  </div>

  <h2 className="landing-section-title mb-5 sm:mb-6">
    We Do Not Support Plagiarism, Ghostwriting, or Academic Misconduct. Ever.
  </h2>

  <p className="landing-section-description text-left mx-0 max-w-none">
    Submit Right exists to improve and clarify research. Not to write it, fabricate it, or misrepresent it. Every service we provide is in full compliance with international academic integrity guidelines.
  </p>
</div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 sm:gap-12 pb-0 sm:pb-10">
            {standards.map((std, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#00A0E3]/20 transition-all duration-300 ease-in-out lg:sticky"
                style={{
                  top: `calc(120px + ${idx * 20}px)`,
                  zIndex: 10 + idx,
                }}
              >
                <div className="text-[13px] font-semibold text-[#00A0E3] tracking-wider uppercase mb-3">
                  STANDARD {std.num}
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-medium text-[#1C1C1D] mb-3">
                  {std.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#65656D] leading-relaxed">
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
