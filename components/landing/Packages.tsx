import Link from "next/link";

export function Packages() {
  const rowLabels = [
    "Grammar & Language Editing",
    "Structural & Scientific Editing",
    "Plagiarism Check",
    "Re-Editing Entitlement",
    "Pre-Submission Peer Review",
    "Cover Letter + Reviewer Support",
    "Editorial Team Size",
    "Submission-Readiness Report",
    "Express Delivery Option"
  ];

  const packageColumns = [
    {
      title: "Language Clarity",
      highlighted: true,
      rows: [
        { ok: true, text: "Full Correction" },
        { ok: false, text: "" },
        { ok: false, text: "" },
        { ok: true, text: "1 Free Re-Edit (1 Year)" },
        { ok: false, text: "" },
        { ok: false, text: "" },
        { ok: true, text: "Single Expert" },
        { ok: false, text: "" },
        { ok: true, text: "Available" },
      ],
      button: {
        label: "Buy Now",
        icon: true,
        variant: "primary" as const,
      },
    },
    {
      title: "Publication-Ready",
      highlighted: false,
      rows: [
        { ok: true, text: "Full Correction" },
        { ok: true, text: "Structure + Terminology" },
        { ok: true, text: "iThenticate Included" },
        { ok: true, text: "Unlimited (365 Days)" },
        { ok: false, text: "" },
        { ok: true, text: "Cover + Reviewer Letter" },
        { ok: true, text: "Dual-Expert Review" },
        { ok: false, text: "" },
        { ok: true, text: "Available" },
      ],
      button: {
        label: "Choose Plan",
        variant: "secondary" as const,
      },
    },
    {
      title: "High-Impact",
      highlighted: false,
      rows: [
        { ok: true, text: "Full Correction" },
        { ok: true, text: "Substantive Scientific Edit" },
        { ok: true, text: "Unlimited Checks" },
        { ok: true, text: "Unlimited Priority (365 Days)" },
        { ok: true, text: "2 Rounds Included" },
        { ok: true, text: "Full Letter Support" },
        { ok: true, text: "Four-Expert Team" },
        { ok: true, text: "Full Integrity Report" },
        { ok: true, text: "Priority Handling" },
      ],
      button: {
        label: "Choose Plan",
        variant: "secondary" as const,
      },
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F3F9FC]">
      <div className="landing-shell">
        
        {/* Header Section */}
        <div className="text-center max-w-[720px] mx-auto mb-10 sm:mb-16">
          {/* Badge */}
          <div className="landing-section-badge">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
             </svg>
            <span className="landing-section-badge-text">
              SERVICE PACKAGES
            </span>
          </div>

          <h2 className="landing-section-title">
            Simple Plans. Serious Publication Results.
          </h2>
          <p className="landing-section-description">
            Every plan includes expert editing, real-time order tracking, and secure file handling. Pick the level of support your research stage needs.
          </p>
        </div>

        {/* Packages Table Container */}
        <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div className="w-max min-w-full mx-auto bg-white rounded-[32px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-row relative snap-x snap-mandatory h-[754px] box-border">
          <div className="w-[25%] lg:w-[360px] h-full shrink-0 flex flex-col bg-white border-r border-[#ECECEC] box-border rounded-l-[32px]">
            <div className="flex items-center px-[20px] py-[16px] h-[84px] box-border">
              <span className="w-[158px] text-[22px] font-medium leading-[110%] text-[#1C1C1D] opacity-0">
                Package Features
              </span>
            </div>

            {rowLabels.map((label, idx) => (
              <div
                key={idx}
                className="flex items-center px-[20px] py-[16px] gap-[10px] h-[64px] box-border border-b border-[#ECECEC]"
              >
                <svg className="w-[18px] h-[18px] shrink-0 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="w-[208px] text-[15px] font-medium leading-[120%] text-[#1C1C1D]">
                  {label}
                </span>
              </div>
            ))}

            <div className="h-[94px] border-b border-[#ECECEC]" />
          </div>

          {packageColumns.map((column, colIdx) => (
            <div
              key={column.title}
              className={`flex-1 h-full shrink-0 flex flex-col box-border ${
                column.highlighted ? "bg-[#DAEDF6] border-l border-r border-[#BFE6F6]" : "bg-white border-r border-[#ECECEC]"
              } ${colIdx === packageColumns.length - 1 ? "rounded-r-[32px]" : ""}`}
            >
              <div className="flex items-center px-[20px] py-[16px] gap-[10px] h-[84px] box-border border-b border-[#ECECEC]">
                <span className={`w-full whitespace-nowrap text-[18px] leading-[110%] ${column.highlighted ? "font-medium text-[#1C1C1D]" : "font-normal text-[#78788D]"}`}>
                  {column.title}
                </span>
              </div>

              {column.rows.map((item, idx) => (
                <div
                  key={`${column.title}-${idx}`}
                  className={`flex items-center px-[20px] py-[16px] gap-[10px] h-[64px] box-border ${
                    column.highlighted ? "border-b border-[#BFE6F6]" : "border-b border-[#ECECEC]"
                  }`}
                >
                  {item.ok ? (
                    <div className="w-[18px] h-[18px] shrink-0 flex items-center justify-center">
                      <img src="/doubletick.svg" alt="icon" className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#65656D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}

                  {item.text ? (
                    <span className={`w-[180px] text-[14px] leading-[120%] ${item.ok ? "font-normal text-[#1C1C1D]" : "font-normal text-[#78788D]"}`}>
                      {item.text}
                    </span>
                  ) : (
                    <span className="w-[180px] text-[14px] leading-[120%] opacity-0">Empty</span>
                  )}
                </div>
              ))}

              <div className="h-[94px] px-[20px] py-[16px] box-border flex items-center border-b border-[#ECECEC]">
                {column.button ? (
                  column.button.variant === "primary" ? (
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center gap-[6px] w-[162px] h-[48px] bg-[#00A0E3] text-white text-[16px] font-medium rounded-full hover:bg-[#0189C2] shadow-[0_4px_12px_rgba(0,160,227,0.25)] transition-all"
                    >
                      {column.button.label}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href="#"
                      className="hidden sm:inline-flex items-center justify-center gap-2 w-full h-[48px] bg-[#F8F8F8] text-[#1C1C1D] text-[15px] font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {column.button.label}
                    </Link>
                  )
                ) : null}
              </div>
            </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}
