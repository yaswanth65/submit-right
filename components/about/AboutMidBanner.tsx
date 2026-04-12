import Link from "next/link";
import Image from "next/image";

export function AboutMidBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10">
        <div className="relative isolate overflow-hidden rounded-[20px] bg-gradient-to-r from-[#0089C2] to-[#005375] px-4 py-8 sm:px-8 sm:py-10 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-[68px] lg:py-[68px]">

          {/* Left Content */}
          <div className="z-10 flex max-w-[930px] flex-col items-start gap-[14px] lg:flex-1">
            <div className="max-w-[700px] font-inter text-[28px] font-medium leading-[110%] text-white sm:text-[32px]">
              Research Changed the World Started
              <br />
              with a Manuscript Just Like Yours
            </div>

            <p className="max-w-[616px] font-inter text-[14px] leading-[140%] text-[#A0C1CF] sm:text-[16px] lg:text-[18px]">
              Every paper we edit represents months. Sometimes years. Of
              someone's life work. We take that seriously. Let our experts make
              sure your research gets the reception it deserves.
            </p>
          </div>

          {/* Right CTA Section */}
          <div className="z-10 mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:max-w-[297px] lg:mt-0 lg:w-[190px] lg:max-w-none">
            
            {/* Primary Button */}
            <Link
              href="/user/dashboard"
              className="flex h-[42px] w-full items-center justify-center gap-[6px] rounded-full bg-white px-3 text-[14px] font-medium text-[#003D57] shadow-md transition hover:shadow-lg sm:h-[48px] sm:text-[16px] lg:w-[190px]"
            >
              Get Instant Quote
              <svg
                className="hidden sm:block"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Secondary Link */}
            <Link
              href="/services"
              className="flex h-[42px] w-full items-center justify-center gap-[6px] rounded-full px-3 text-[14px] font-medium text-white transition hover:bg-white/8 sm:h-[48px] sm:text-[16px] lg:w-[190px]"
            >
              Explore Our Services
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Decorative Arrow */}
          <Image
            src="/arrow.svg"
            alt="Decorative Arrow"
            width={325}
            height={82}
            className="pointer-events-none absolute hidden opacity-80 lg:block"
            style={{
              left: "653px",
              top: "113px",
              transform: "rotate(2.78deg)",
            }}
          />
        </div>
      </div>
    </section>
  );
}