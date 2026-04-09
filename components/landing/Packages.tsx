import Link from "next/link";

export function Packages() {
  const rowLabels = Array(8).fill("Lorem ipsum dolor sit amet");
  
  const col1 = [true, true, true, true, true, true, true, true];
  const col2 = [true, true, false, true, false, true, false, true];
  const col3 = [true, false, true, false, true, false, true, false];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#F3F9FC]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
             </svg>
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              LOREM IPSUM
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
            Our Packages
          </h2>
          <p className="text-[13px] sm:text-[15px] text-[#65656D] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Packages Table Container */}
        <div className="max-w-[1000px] mx-auto bg-white rounded-xl sm:rounded-2xl border border-[#F0F0F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-x-auto flex flex-row relative snap-x snap-mandatory custom-scrollbar">
          
          {/* Main Labels Column (Hidden on mobile to avoid misalignment, we'll show labels inline on mobile) */}
          <div className="hidden sm:block w-[240px] shrink-0 p-8 pt-[84px] sticky left-0 z-20 bg-white border-r border-[#F0F0F0]">
            {rowLabels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 h-[42px] mb-3">
                <svg className="w-4 h-4 text-[#A0A0A0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[13px] text-[#1C1C1D]">{label}</span>
              </div>
            ))}
          </div>

          {/* Package 1 (Blue Highlight) */}
          <div className="w-[85vw] sm:w-[240px] sm:flex-1 shrink-0 bg-[#E8F6FC] p-6 sm:p-8 relative snap-center border-r sm:border-r-0 border-[#F0F0F0]">
            <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#1C1C1D] mb-6 sm:mb-8 whitespace-nowrap text-center sm:text-left">Premium Package</h3>
            {col1.map((val, idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 h-[42px] mb-3">
                <div className="w-5 h-5 rounded-full bg-[#00A0E3]/10 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#00A0E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[14px] text-[#1C1C1D] sm:hidden font-medium">{rowLabels[idx]}</span>
              </div>
            ))}
            <div className="mt-8 pt-2">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 bg-[#00A0E3] text-white text-[14px] sm:text-[15px] font-medium rounded-full hover:bg-[#0189C2] shadow-[0_4px_12px_rgba(0,160,227,0.25)] transition-all"
              >
                Buy Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Package 2 */}
          <div className="w-[85vw] sm:w-[240px] sm:flex-1 shrink-0 p-6 sm:p-8 border-r sm:border-l border-[#F0F0F0] bg-white snap-center">
            <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#65656D] mb-6 sm:mb-8 whitespace-nowrap text-center sm:text-left">Standard Package</h3>
            {col2.map((val, idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 h-[42px] mb-3">
                {val ? (
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#65656D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#D0D0D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <span className={`text-[14px] sm:hidden font-medium ${val ? 'text-[#1C1C1D]' : 'text-gray-400'}`}>{rowLabels[idx]}</span>
              </div>
            ))}
            <div className="mt-8 pt-2">
               <Link
                href="#"
                className="hidden sm:inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 bg-[#F8F8F8] text-[#1C1C1D] text-[14px] sm:text-[15px] font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Choose Plan
              </Link>
            </div>
          </div>

          {/* Package 3 */}
          <div className="w-[85vw] sm:w-[240px] sm:flex-1 shrink-0 p-6 sm:p-8 sm:border-l border-[#F0F0F0] bg-white snap-center">
            <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#65656D] mb-6 sm:mb-8 whitespace-nowrap text-center sm:text-left">Basic Package</h3>
            {col3.map((val, idx) => (
              <div key={idx} className="flex items-center justify-start gap-3 h-[42px] mb-3">
                {val ? (
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#65656D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#D0D0D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <span className={`text-[14px] sm:hidden font-medium ${val ? 'text-[#1C1C1D]' : 'text-gray-400'}`}>{rowLabels[idx]}</span>
              </div>
            ))}
            <div className="mt-8 pt-2">
               <Link
                href="#"
                className="hidden sm:inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 bg-[#F8F8F8] text-[#1C1C1D] text-[14px] sm:text-[15px] font-medium rounded-full hover:bg-gray-200 transition-colors"
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
