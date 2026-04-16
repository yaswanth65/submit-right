import Image from "next/image";
import Link from "next/link";

export function Service3Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F4FBFF_0%,#FFFFFF_56%,#FFFFFF_100%)] pt-24 sm:pt-28 pb-14 sm:pb-16 lg:pb-20">
      {/* Decorative Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-18%] top-[-10%] h-95 w-95 rounded-full bg-[#DCEFFB] blur-[100px] opacity-90" />
        <div className="absolute right-[-8%] top-[14%] h-65 w-65 rounded-full bg-[#EAF6FB] blur-[90px] opacity-85" />
      </div>

      <div className="landing-shell relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          
          {/* Left Content */}
          <div className="max-w-160">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BFE2F6] bg-[#EAF6FB] px-3 py-1.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#00A0E3]">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zm0 3h10M7 13h10M7 17h6" />
                </svg>
              </span>
              <span className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.08em] text-[#00A0E3]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            <h1 className="max-w-140 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-[#1C1C1D] sm:text-[48px] lg:text-[60px]">
              Lorem ipsum dolor sit amet consectetur
            </h1>

            <p className="mt-5 max-w-140 text-[14px] leading-[1.6] text-[#78788D] sm:text-[16px] lg:text-[18px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
              Elementum suscipit donec viverra posuere at lorem nullam.
            </p>

            <div className="mt-7 w-full">
              <Link
                href="#"
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#00A0E3] px-6 text-[14px] sm:text-[16px] font-medium text-white shadow-[0_8px_20px_rgba(0,160,227,0.22)] transition-colors hover:bg-[#0189C2] sm:w-auto"
              >
                Order Now
              </Link>
            </div>
          </div>

          {/* Right Visual Area with 3 Placeholders */}
          <div className="relative mx-auto h-87.5 w-full max-w-125 lg:h-100">
            
            {/* 1. Main Background Document (Centered) */}
            <div className="absolute left-1/2 top-0 h-80 w-60 -translate-x-1/2 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl lg:h-95 lg:w-70">
               {/* Content for Main Doc */}
              <Image src="/serv3/hcenter.png" alt="" fill className="object-cover" priority />

            </div>

            {/* 2. Left Floating Card */}
            <div className="absolute left-0 top-[35%] z-20 h-35 w-40 overflow-hidden rounded-xl border border-blue-100 bg-white/90 backdrop-blur-sm shadow-lg  lg:h-40 lg:w-45">
               {/* Content for Left Card */}
              <Image src="/serv3/hleft.png" alt="" fill className="object-cover" />
            </div>

            {/* 3. Right Floating Card */}
            <div className="absolute right-0 top-[35%] z-20 h-35 w-40 overflow-hidden rounded-xl border border-blue-100 bg-white/90 backdrop-blur-sm shadow-lg lg:right-[5%] lg:h-40 lg:w-45">
               {/* Content for Right Card */}
              <Image src="/serv3/hright.png" alt="" fill className="object-cover" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}