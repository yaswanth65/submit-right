export function AboutProblems() {
  const problems = [
    {
      icon: "/about/Frame (7).svg",
      title: "Academic Expertise at Scale",
      description: "Our network spans 1,600+ subject areas. Every manuscript is matched to a qualified PhD or MD editor who understands your exact field, methodology, and publication landscape."
    },
    {
      icon: "/about/Frame (8).svg",
      title: "Industry-Compliant Standards",
      description: "Submit Right operates in full alignment with GDPR, DPDPB, and ISO-certified confidentiality protocols. So your research, your data, and your identity are protected at every stage of the process."
    },
    {
      icon: "/about/Frame (9).svg",
      title: "End-to-End Transparency",
      description: "From the moment you upload your document to the moment it lands back in your dashboard, every step is tracked, timestamped, and visible. No black boxes. No guesswork. No hidden fees."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
      <div className="landing-shell">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 sm:mb-16">
          <div className="landing-section-badge mb-6">
           <img src="/vector2.svg" alt="icon" className="w-4 h-4" />
            <span className="landing-section-badge-text">
              What We Stand For
            </span>
          </div>
          <h2 className="landing-section-title mb-4">
            A Platform Built on Expertise, Compliance, and Complete Transparency
          </h2>
          <p className="landing-section-description">
            Every service, every editor, and every process at Submit Right is held to the highest professional and ethical standards in academic publishing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {problems.map((problem, idx) => (
    <div
      key={idx}
      className="
        bg-[#F8F8F8]
        border border-[#ECECEC]
        rounded-2xl
        px-8 py-6
        flex flex-col items-start
        gap-6
        min-h-[240px] lg:min-h-[260px]
      "
    >
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center">
        <img src={problem.icon} alt={problem.title} className="w-9 h-9" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] sm:text-[20px] font-medium text-[#1C1C1D] leading-[110%]">
          {problem.title}
        </h3>
        <p className="text-[14px] text-[#78788D] leading-[120%]">
          {problem.description}
        </p>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
