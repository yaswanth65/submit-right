import Link from "next/link";

export function AboutMidBanner() {
  return (
    <section className="py-12 lg:py-16 bg-white relative">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        
        <div className="relative bg-gradient-to-r from-[#0B8FCD] via-[#0A78B3] to-[#06547F] rounded-[32px] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-xl">
          
          {/* Decorative Arrow (SVGs can be complex, we'll try to simulate with SVG) */}
          <div className="hidden lg:block absolute left-[50%] top-[60%] w-[180px] h-[60px] opacity-70">
             <svg viewBox="0 0 180 60" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
               <path d="M0,50 Q80,50 150,10" />
               <polyline points="140,5 155,5 160,20" />
             </svg>
          </div>

          <div className="text-center lg:text-left max-w-[540px] relative z-10">
            <h2 className="text-[32px] lg:text-[40px] font-medium text-white leading-[1.1] mb-4">
              Lorem ipsum dolor sit amet
            </h2>
            <p className="text-[15px] lg:text-[16px] text-white/85 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
              Elementum suscipit donec viverra posuere.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
            <Link
              href="/user/dashboard"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1C1C1D] text-[15px] font-semibold rounded-full hover:bg-gray-50 transition-colors w-full"
            >
              Gets Started
            </Link>
            <Link
              href="/user/dashboard"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:text-white/80 transition-colors"
            >
              Submit Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
