export function WhatWeSolve() {
  const tags = [
    "Grammar Errors",
    "Language Barriers",
    "Journal Rejections",
    "Missed Deadlines",
    "Plagiarism Risk",
    "Poor Formatting",
    "Wrong Journal Selection",
    "Editor Communication",
    "No Progress Visibility",
    "Unclear Pricing",
    "Revision Delays",
    "Weak Argument Structure",
    "Thesis Formatting",
    "Citation Errors",
    "File Security Concerns",
    "Translation Accuracy",
    "Vague Abstracts",
    "Reviewer Responses",
    "Scientific Accuracy",
  ];

  const mobileRows = [
    tags.slice(0, 4),
    tags.slice(4, 8),
    tags.slice(8, 12),
    tags.slice(12, 16),
    tags.slice(16, 19),
  ];

  const desktopRows = [
    [
      { label: tags[0], width: 314 },
      { label: tags[1], width: 254 },
      { label: tags[2], width: 357 },
      { label: tags[3], width: 227 },
    ],
    [
      { label: tags[4], width: 248 },
      { label: tags[5], width: 264 },
      { label: tags[6], width: 274 },
      { label: tags[7], width: 312 },
    ],
    [
      { label: tags[8], width: 270 },
      { label: tags[9], width: 250 },
      { label: tags[10], width: 274 },
      { label: tags[11], width: 312 },
    ],
    [
      { label: tags[12], width: 296 },
      { label: tags[13], width: 232 },
      { label: tags[14], width: 310 },
      { label: tags[15], width: 312 },
    ],
    [
      { label: tags[16], width: 312 },
      { label: tags[17], width: 310 },
      { label: tags[18], width: 300 },
    ],
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14 max-w-[676px] mx-auto">
          {/* Badge */}
          <div className="landing-section-badge">
            <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="landing-section-badge-text">
              PROBLEMS WE SOLVE
            </span>
          </div>

          <h2 className="landing-section-title">
            One Platform. Every Academic Headache Solved.
          </h2>

          <p className="landing-section-description">
            Language barriers. Journal rejections. Missed deadlines. Unclear pricing. If it&apos;s slowing down your research, Submit Right has already solved it.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:flex flex-col gap-4 w-full max-w-[1200px] mx-auto">
          {desktopRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center gap-4 w-full flex-nowrap">
              {row.map((tag, idx) => (
                <ProblemChip key={`${rowIndex}-${idx}-${tag.label}`} label={tag.label} variant="desktop" width={tag.width} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Marquee Rows */}
        <div className="lg:hidden flex flex-col gap-3 sm:gap-4 w-full">
          {mobileRows.map((row, rowIndex) => {
            const isReverse = rowIndex % 2 === 1;
            const duration = 24 + rowIndex * 2;
            const repeatedRow = [...row, ...row];

            return (
              <div key={rowIndex} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                  className={`flex w-max items-center gap-2.5 sm:gap-3 ${isReverse ? "animate-marquee-right" : "animate-marquee-left"}`}
                  style={{ animationDuration: `${duration}s` }}
                >
                  {repeatedRow.map((tag, idx) => (
                    <ProblemChip key={`${rowIndex}-${idx}-${tag}`} label={tag} mobile />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .animate-marquee-left {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .animate-marquee-right {
          animation-name: marquee-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
}

function ProblemChip({ label, mobile = false, variant = "mobile", width }: { label: string; mobile?: boolean; variant?: "mobile" | "desktop"; width?: number }) {
  const isDesktop = variant === "desktop";

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap transition-colors hover:border-[#00A0E3] ${
        isDesktop
          ? "h-[51px] px-5 py-4 bg-[#F8F8F8] border border-dashed border-[#ECECEC] rounded-[12px] shadow-none"
          : "px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-[#F0F0F0] rounded-xl shadow-[0_1px_0_rgba(255,255,255,0.8)]"
      }`}
      style={isDesktop && width ? { width: `${width}px` } : undefined}
    >
      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#1C1C1D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
      <span className={isDesktop ? "text-[16px] text-[#1C1C1D] font-normal leading-[1.2] truncate" : "text-[12px] sm:text-[14px] text-[#65656D] font-normal leading-[1.3]"}>
        {label}
      </span>
    </div>
  );
}
