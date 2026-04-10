export function AboutHero() {
  return (
    <section
      className="relative hero-svg-bg overflow-hidden min-h-0 sm:min-h-[calc(100vh-80px)]"
    >

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col items-center justify-center text-center pt-20 sm:pt-20 pb-16 sm:pb-24 h-auto sm:h-full relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,160,227,0.3)] bg-[#00A0E3]/10 mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[12px] sm:text-sm font-medium text-[#00A0E3]">
            About Submit Right
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[30px] sm:text-[44px] lg:text-[48px] leading-[1.12] sm:leading-[1.1] font-medium text-[#1C1C1D] mb-5 sm:mb-6 max-w-[800px]">
          Built for Researchers Who Refuse to Let Language Stand Between Their Work and the World
        </h1>

        {/* Description */}
        <div className="text-[14px] lg:text-[16px] text-[#65656D] leading-[140%] text-center flex flex-col gap-4 max-w-[800px]">
          <p>
            Submit Right is a professional academic services platform where researchers, doctoral students, and authors submit manuscripts and receive expert-level editing, translation, and publication support through a transparent, trackable, and fully secure workflow. We don't just edit papers.
          </p>
        </div>

      </div>
    </section>
  );
}