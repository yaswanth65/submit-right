import Link from "next/link";

export function Service3Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F4FBFF_0%,#FFFFFF_56%,#FFFFFF_100%)] pt-24 sm:pt-28 pb-14 sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-18%] top-[-10%] h-[380px] w-[380px] rounded-full bg-[#DCEFFB] blur-[100px] opacity-90" />
        <div className="absolute right-[-8%] top-[14%] h-[260px] w-[260px] rounded-full bg-[#EAF6FB] blur-[90px] opacity-85" />
      </div>

      <div className="landing-shell relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="max-w-[640px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BFE2F6] bg-[#EAF6FB] px-3 py-1.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#00A0E3]">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zm0 3h10M7 13h10M7 17h6" />
                </svg>
              </span>
              <span className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.08em] text-[#00A0E3]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            <div className="max-w-[560px] text-[34px] leading-[1.05] font-medium tracking-[-0.03em] text-[#1C1C1D] sm:text-[48px] lg:text-[60px]">
              Lorem ipsum dolor sit amet consectetur
            </div>

            <p className="mt-5 max-w-[560px] text-[14px] leading-[1.6] text-[#78788D] sm:text-[16px] lg:text-[18px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Semper interdum varius sed quis mi augue ornare.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#00A0E3] px-6 text-[14px] sm:text-[16px] font-medium text-white shadow-[0_8px_20px_rgba(0,160,227,0.22)] transition-colors hover:bg-[#0189C2]"
              >
                Order Now
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px] sm:max-w-[560px] lg:max-w-[560px]">
            <div className="relative h-[300px] sm:h-[360px] lg:h-[390px]">
              <div className="absolute left-[6%] top-[26%] h-[70px] w-[150px] rounded-[16px] border border-[#DCEBF6] bg-white shadow-[0_18px_40px_rgba(18,91,127,0.08)]">
                <div className="p-3">
                  <div className="mb-2 h-3 w-20 rounded-full bg-[#EAF6FB]" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[88%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[70%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[92%] rounded-full bg-[#EFF3F7]" />
                  </div>
                </div>
              </div>

              <div className="absolute right-[5%] top-[26%] h-[70px] w-[150px] rounded-[16px] border border-[#DCEBF6] bg-white shadow-[0_18px_40px_rgba(18,91,127,0.08)]">
                <div className="p-3">
                  <div className="mb-2 h-3 w-20 rounded-full bg-[#EAF6FB]" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[88%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[70%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[92%] rounded-full bg-[#EFF3F7]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 top-0 h-[200px] w-[190px] -translate-x-1/2 rounded-[18px] border border-[#D8EAF5] bg-white shadow-[0_30px_60px_rgba(14,74,102,0.09)] sm:h-[230px] sm:w-[224px]">
                <div className="p-4 sm:p-5">
                  <div className="mb-4 h-3 w-[72%] rounded-full bg-[#D9EEF8]" />
                  <div className="mb-2 h-1.5 w-full rounded-full bg-[#EFF3F7]" />
                  <div className="mb-2 h-1.5 w-[96%] rounded-full bg-[#EFF3F7]" />
                  <div className="mb-2 h-1.5 w-[92%] rounded-full bg-[#EFF3F7]" />
                  <div className="mb-2 h-1.5 w-[88%] rounded-full bg-[#EFF3F7]" />
                  <div className="mt-5 h-[72px] rounded-[14px] bg-[linear-gradient(180deg,#EAF6FB_0%,#DDF0FA_100%)]" />
                </div>
              </div>

              <div className="absolute left-1/2 bottom-[1%] h-[98px] w-[248px] -translate-x-1/2 rounded-[18px] border border-[#D8EAF5] bg-white shadow-[0_20px_50px_rgba(14,74,102,0.08)] sm:h-[106px] sm:w-[286px]">
                <div className="p-4 sm:p-5">
                  <div className="mb-3 h-2.5 w-24 rounded-full bg-[#D9EEF8]" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[92%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[74%] rounded-full bg-[#EFF3F7]" />
                  </div>
                </div>
              </div>

              <div className="absolute right-[9%] bottom-[8%] h-[118px] w-[132px] rounded-[16px] border border-[#D8EAF5] bg-white shadow-[0_16px_36px_rgba(14,74,102,0.08)]">
                <div className="p-3">
                  <div className="mb-2 h-2.5 w-20 rounded-full bg-[#EAF6FB]" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[90%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[82%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[92%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[68%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[74%] rounded-full bg-[#EFF3F7]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-[11%] bottom-[10%] h-[118px] w-[132px] rounded-[16px] border border-[#D8EAF5] bg-white shadow-[0_16px_36px_rgba(14,74,102,0.08)]">
                <div className="p-3">
                  <div className="mb-2 h-2.5 w-20 rounded-full bg-[#EAF6FB]" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[90%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[82%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[92%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[68%] rounded-full bg-[#EFF3F7]" />
                    <div className="h-1.5 w-[74%] rounded-full bg-[#EFF3F7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
