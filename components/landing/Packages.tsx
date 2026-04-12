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
  
  const col1 = [
    { ok: true, text: "Full Correction" },
    { ok: false, text: "" },
    { ok: false, text: "" },
    { ok: true, text: "1 Free Re-Edit (1 Year)" },
    { ok: false, text: "" },
    { ok: false, text: "" },
    { ok: true, text: "Single Expert" },
    { ok: false, text: "" },
    { ok: true, text: "Available" }
  ];

  const col2 = [
    { ok: true, text: "Full Correction" },
    { ok: true, text: "Structure + Terminology" },
    { ok: true, text: "iThenticate Included" },
    { ok: true, text: "Unlimited (365 Days)" },
    { ok: false, text: "" },
    { ok: true, text: "Cover + Reviewer Letter" },
    { ok: true, text: "Dual-Expert Review" },
    { ok: false, text: "" },
    { ok: true, text: "Available" }
  ];

  const col3 = [
    { ok: true, text: "Full Correction" },
    { ok: true, text: "Substantive Scientific Edit" },
    { ok: true, text: "Unlimited Checks" },
    { ok: true, text: "Unlimited Priority (365 Days)" },
    { ok: true, text: "2 Rounds Included" },
    { ok: true, text: "Full Letter Support" },
    { ok: true, text: "Four-Expert Team" },
    { ok: true, text: "Full Integrity Report" },
    { ok: true, text: "Priority Handling" }
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
        <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-[#F0F0F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-x-auto flex flex-row relative snap-x snap-mandatory custom-scrollbar">
          
          {/* Main Labels Column */}
          <div className="w-[160px] sm:w-[25%] lg:w-[25%] shrink-0 p-3 sm:p-6 lg:p-8 bg-white border-r border-[#F0F0F0]">
            {rowLabels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 h-[42px] mb-3">
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#1C1C1D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[11px] sm:text-[13px] lg:text-[14px] text-[#1C1C1D] font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Package 1 (Blue Highlight) */}
          <div className="w-[50vw] sm:w-[25%] lg:w-[25%] shrink-0 bg-[#E8F6FC] p-3 sm:p-6 lg:p-8 relative snap-center border-r sm:border-r-0 border-[#F0F0F0]">
            <h3 className="text-[13px] sm:text-[16px] lg:text-[18px] font-semibold text-black mb-3 sm:mb-6 lg:mb-8 whitespace-nowrap text-center sm:text-left">Language Clarity</h3>
            {col1.map((item, idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 min-h-[42px] mb-3">
                {item.ok ? (
                  <div className="w-5 h-5 flex flex-shrink-0 items-center justify-center">
                    <img src="/doubletick.svg" alt="icon" className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#65656D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {item.text && <span className={`text-[11px] sm:text-[13px] lg:text-[14px] font-medium ${item.ok ? 'text-[#1C1C1D]' : 'text-gray-400'}`}>{item.text}</span>}
              </div>
            ))}
            <div className="mt-8 pt-2">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 bg-[#00A0E3] text-white text-[12px] sm:text-[13px] lg:text-[15px] font-medium rounded-full hover:bg-[#0189C2] shadow-[0_4px_12px_rgba(0,160,227,0.25)] transition-all"
              >
                Buy Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Package 2 */}
          <div className="w-[50vw] sm:w-[25%] lg:w-[25%] shrink-0 p-3 sm:p-6 lg:p-8 border-r sm:border-l border-[#F0F0F0] bg-white snap-center">
            <h3 className="text-[13px] sm:text-[16px] lg:text-[18px] font-semibold text-black mb-3 sm:mb-6 lg:mb-8 whitespace-nowrap text-center sm:text-left">Publication-Ready</h3>
            {col2.map((item, idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 min-h-[42px] mb-3">
                {item.ok ? (
                  <div className="w-5 h-5 flex flex-shrink-0 items-center justify-center">
                    <img src="/doubletick.svg" alt="icon" className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#65656D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {item.text && <span className={`text-[11px] sm:text-[13px] lg:text-[14px] font-medium ${item.ok ? 'text-[#1C1C1D]' : 'text-gray-400'}`}>{item.text}</span>}
              </div>
            ))}
            <div className="mt-8 pt-2">
               <Link
                href="#"
                className="hidden sm:inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 bg-[#F8F8F8] text-[#1C1C1D] text-[12px] sm:text-[13px] lg:text-[15px] font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Choose Plan
              </Link>
            </div>
          </div>

          {/* Package 3 */}
          <div className="w-[50vw] sm:w-[25%] lg:w-[25%] shrink-0 p-3 sm:p-6 lg:p-8 sm:border-l border-[#F0F0F0] bg-white snap-center">
            <h3 className="text-[13px] sm:text-[16px] lg:text-[18px] font-semibold text-black mb-3 sm:mb-6 lg:mb-8 whitespace-nowrap text-center sm:text-left">High-Impact</h3>
            {col3.map((item, idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 min-h-[42px] mb-3">
                {item.ok ? (
                  <div className="w-5 h-5 flex flex-shrink-0 items-center justify-center">
                    <img src="/doubletick.svg" alt="icon" className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#65656D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {item.text && <span className={`text-[11px] sm:text-[13px] lg:text-[14px] font-medium ${item.ok ? 'text-[#1C1C1D]' : 'text-gray-400'}`}>{item.text}</span>}
              </div>
            ))}
            <div className="mt-8 pt-2">
               <Link
                href="#"
                className="hidden sm:inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 bg-[#F8F8F8] text-[#1C1C1D] text-[12px] sm:text-[13px] lg:text-[15px] font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Choose Plan
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
