import Link from "next/link";

export function Packages() {
  const rowLabels = Array(8).fill("Lorem ipsum dolor sit amet");
  
  const col1 = [true, true, true, true, true, true, true, true];
  const col2 = [true, true, false, true, false, true, false, true];
  const col3 = [true, false, true, false, true, false, true, false];

  return (
    <section className="py-16 lg:py-24 bg-[#F3F9FC]">
      <div className="w-full max-w-[1280px] mx-auto  px-6 lg:px-10 xl:px-14">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
             </svg>
            <span className="text-[11px] font-semibold text-[#1C1C1D] uppercase tracking-wider">
              LOREM IPSUM
            </span>
          </div>

          <h2 className="text-[32px] font-medium text-[#1C1C1D] leading-[1.1] mb-4">
            Our Packages
          </h2>
          <p className="text-[15px] text-[#65656D] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Packages Table Container */}
        <div className="max-w-[1000px] mx-auto bg-white rounded-2xl border border-[#F0F0F0] shadow-sm overflow-hidden flex flex-col md:flex-row relative">
          
          {/* Main Labels Column */}
          <div className="flex-1 p-8 pt-[76px] hidden md:block">
            {rowLabels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 h-10 mb-2">
                <svg className="w-4 h-4 text-[#A0A0A0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[13px] text-[#1C1C1D]">{label}</span>
              </div>
            ))}
          </div>

          {/* Package 1 (Blue Highlight) */}
          <div className="flex-1 bg-[#E8F6FC] p-8 pt-8 relative">
            <h3 className="text-[16px] font-semibold text-[#1C1C1D] mb-6">Package Name</h3>
            {col1.map((val, idx) => (
              <div key={idx} className="flex items-center gap-3 h-10 mb-2">
                <svg className="w-4 h-4 text-[#00A0E3] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[13px] text-[#1C1C1D]">{rowLabels[idx]}</span>
              </div>
            ))}
            <div className="mt-6 pt-2">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
              >
                Submit Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Package 2 */}
          <div className="flex-1 p-8 pt-8 border-l border-[#F0F0F0] bg-white">
            <h3 className="text-[16px] font-semibold text-[#65656D] mb-6">Package Name</h3>
            {col2.map((val, idx) => (
              <div key={idx} className="flex items-center gap-3 h-10 mb-2">
                {val ? (
                  <>
                    <svg className="w-4 h-4 text-[#A0A0A0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-[#65656D]">{rowLabels[idx]}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#D0D0D0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </>
                )}
              </div>
            ))}
            <div className="mt-6 pt-2"></div>
          </div>

          {/* Package 3 */}
          <div className="flex-1 p-8 pt-8 border-l border-[#F0F0F0] bg-white hidden md:block">
            <h3 className="text-[16px] font-semibold text-[#65656D] mb-6">Package Name</h3>
            {col3.map((val, idx) => (
              <div key={idx} className="flex items-center gap-3 h-10 mb-2">
                {val ? (
                  <>
                    <svg className="w-4 h-4 text-[#A0A0A0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-[#65656D]">{rowLabels[idx]}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#D0D0D0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </>
                )}
              </div>
            ))}
            <div className="mt-6 pt-2"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
