export function WhatWeSolve() {
  const tags = [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum color sit",
    "Lorem ipsum dolor sit amet corsec",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor sit amet cor",
    "Lorem ipsum dolor amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sir amt",
    "Lorem ipsum dolor color sit amet",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet con",
    "Lorem ipsum dolor sit amet",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
             </svg>
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              EASY SOLUTIONS
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
            What Submit Right Solves
          </h2>

          <p className="text-[13px] sm:text-[15px] text-[#65656D] leading-[1.6] max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis ac sed felis liber cursus. 
            Elementum auctor sed nullam consectetur at lorem volutpat.
          </p>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-[#F0F0F0] rounded-xl hover:border-[#00A0E3] transition-colors cursor-pointer"
            >
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#1C1C1D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-[13px] sm:text-[14px] text-[#65656D] font-normal">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
