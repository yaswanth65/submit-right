import Link from "next/link";

export function AboutMidBanner() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white relative">
      <div className="landing-shell">
        
        <div className="relative bg-gradient-to-r from-[#0B8FCD] via-[#0A78B3] to-[#06547F] rounded-2xl sm:rounded-[32px] p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 overflow-hidden shadow-xl">
          
          {/* Decorative Arrow (SVGs can be complex, we'll try to simulate with SVG) */}
          <div className="hidden lg:block absolute left-[50%] top-[60%] w-[180px] h-[60px] opacity-70">
             <svg viewBox="0 0 180 60" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
               <path d="M0,50 Q80,50 150,10" />
               <polyline points="140,5 155,5 160,20" />
             </svg>
          </div>

          <div className="text-center lg:text-left max-w-[540px] relative z-10">
            <h2 className="text-[26px] sm:text-[22px] lg:text-[30px] font-medium text-white leading-[1.15] sm:leading-[1.1] mb-4">
              Research That Changed the World Started with a Manuscript Just Like Yours
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-white/85 leading-relaxed">
              Every paper we edit represents months. Sometimes years. Of someone's life work. We take that seriously. Let our experts make sure your research gets the reception it deserves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-row items-center gap-3 sm:gap-4 relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/user/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-white text-[#1C1C1D] text-[15px] font-normal rounded-full hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Get Instant Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/user/dashboard"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:text-white/80 transition-colors"
            >
              Explore Our Services
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
