import Link from "next/link";

export function Newsletter() {
  return (
    <section className="relative z-20 bg-transparent pt-4 sm:pt-6 lg:pt-8 -mb-6 sm:-mb-16 lg:-mb-24">
      <div className="landing-shell">
        <div className="bg-white rounded-[20px] p-6 sm:p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-[42px] shadow-[0px_-6px_24px_-4px_rgba(16,24,40,0.06),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
          
          <div className="text-center lg:text-left flex-1">
            <h2 className="text-[24px] sm:text-[28px] font-medium text-[#1C1C1D] leading-[1.1] mb-[18px]">
              Stay Updated on Publishing Trends
            </h2>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#78788D] leading-[1.4]">
              Get tips, research insights, and exclusive updates on academic publishing delivered to your inbox every week.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full sm:w-auto lg:w-auto">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-3 py-2.5 border border-[#00A0E3] text-[#00A0E3] text-[14px] font-medium rounded-full hover:bg-[#F3F9FC] transition-colors w-full sm:w-auto"
            >
              Explore
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-3 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors w-full sm:w-auto"
            >
              Subscribe Now
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
