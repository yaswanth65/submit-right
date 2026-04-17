import Image from "next/image";
import Link from "next/link";

export function ServiceHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 sm:pt-30 pb-14 sm:pb-16 lg:pb-0 min-h-[933px] lg:min-h-[600px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden lg:block absolute -left-[243px] top-[-281px] h-[1378px] w-[2726px]">
          <div className="absolute left-[-2.97%] right-[59.55%] top-[-3.41%] bottom-[55.33%] rotate-[8.12deg] rounded-full bg-[rgba(208,208,246,0.6)] blur-[139px]" />
          <div className="absolute left-[35.87%] right-[4.15%] top-[-1.09%] bottom-[51.38%] rotate-[8.12deg] rounded-full bg-[#D2E9F4] blur-[131px]" />
        </div>

        <div className="lg:hidden absolute left-0 top-[-64px] h-[438px] w-full">
          <div className="absolute left-[-48.73%] right-[26.17%] top-[-13.14%] bottom-[48.37%] rounded-full bg-[rgba(208,208,246,0.6)] blur-[64px] [transform:matrix(0.99,0.15,-0.13,0.99,0,0)]" />
          <div className="absolute left-[29.64%] right-[-88.25%] top-[-13.25%] bottom-[50.5%] rounded-full bg-[#D2E9F4] blur-[50px] [transform:matrix(0.99,0.15,-0.13,0.99,0,0)]" />
        </div>
      </div>

      <div className="landing-shell relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start items-center justify-between gap-10 lg:gap-12">
          <div className="w-full lg:w-[706px] flex flex-col items-center lg:items-start text-center lg:text-left gap-8 lg:gap-8 pt-2 sm:pt-4 lg:pt-[4px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[rgba(0,160,227,0.3)] bg-[rgba(0,160,227,0.08)] w-fit">
              <img src="/v1.svg" alt="icon" className="w-5 h-5 shrink-0" />
              <span className="font-inter text-[12px] sm:text-[14px] font-medium leading-[1.4] text-[#00A0E3] whitespace-nowrap uppercase tracking-[0.02em]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 w-full">
              <h1 className="max-w-[706px] font-inter text-[32px] min-[420px]:text-[36px] sm:text-[44px] lg:text-[54px] leading-[1.1] font-medium text-[#1C1C1D]">
                Language Clarity Editing
              </h1>

              <p className="max-w-[706px] font-inter text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.4] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
              </p>
            </div>

            <ul className="flex flex-col items-center lg:items-start gap-3 lg:gap-[14px] w-full max-w-[706px]">
              {[
                "Doctoral candidates polishing their final dissertation for defense.",
                "Faculty members preparing manuscripts for high-impact journals.",
                "ESL researchers ensuring their linguistic precision matches their scientific rigor.",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 lg:gap-2 w-full">
                  <img src="/tick.svg" alt="tick" className="mt-0.5 h-5 w-5 shrink-0 lg:h-6 lg:w-6" />
                  <span className="font-inter text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.2] lg:leading-[1.4] text-[#1C1C1D] max-w-[674px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/packages"
              className="inline-flex h-12 w-full sm:w-[152px] items-center justify-center rounded-full bg-[#00A0E3] px-3 text-[14px] sm:text-[16px] font-medium leading-[1.2] text-white transition-colors hover:bg-[#008cc2]"
            >
              Order Now
            </Link>
          </div>

          <div className="w-full lg:w-[730px] flex justify-center lg:justify-end pt-2 lg:pt-[4px]">
            <div className="relative w-full max-w-[361px] sm:max-w-[690px] lg:max-w-[730px] h-[395px] sm:h-[435px] rounded-[22px_22px_0_0] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.15)_77.14%,rgba(255,255,255,0)_100%)] p-3 sm:p-5">
                <Image
                  src="/services1/hero.png"
                  alt="Language Clarity Editing preview"
                  fill
                  priority
                  sizes="(max-width: 640px) 361px, (max-width: 1024px) 690px, 730px"
                  className="object-contain object-center"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}