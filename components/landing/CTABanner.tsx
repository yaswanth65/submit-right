import Link from "next/link";

interface CTABannerProps {
  variant?: "primary" | "secondary";
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTABanner({
  variant = "primary",
  title = "Lorem ipsum dolor sit amet consectetur",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, amet, consectetur adipiscing elit",
  primaryButtonText = "Create Account",
  primaryButtonHref = "#",
  secondaryButtonText = "Log In",
  secondaryButtonHref = "#"
}: CTABannerProps) {
  if (variant === "secondary") {
    return (
      <section className="relative landing-shell z-20 -mt-6 sm:-mt-20 lg:-mt-28">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-5 sm:px-8 py-7 sm:py-7 lg:px-7 lg:py-12 border border-[#F3F4F6] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 translate-y-[8%] sm:translate-y-[18%]">
          
          {/* Text Content */}
          <div className="text-center md:text-left max-w-[520px]">
            <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-3">
              {title}
            </h2>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#65656D] leading-relaxed max-w-[420px]">
              {description}
            </p>
          </div>

          {/* Buttons - Always in One Line */}
          <div className="flex flex-row flex-nowrap items-center justify-center md:justify-end gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center justify-center px-5 py-3 bg-white border border-[#00A0E3] text-[#00A0E3] text-[13px] sm:text-[14px] font-medium rounded-full whitespace-nowrap hover:bg-[#F3F9FC] transition-colors"
            >
              {secondaryButtonText}
            </Link>
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center justify-center px-5 py-3 bg-[#00A0E3] text-white text-[13px] sm:text-[14px] font-medium rounded-full whitespace-nowrap hover:bg-[#0189C2] transition-colors"
            >
              {primaryButtonText}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-gradient-to-r from-[#0B8FCD] via-[#0A78B3] to-[#06547F] py-12 sm:py-16 lg:py-18">
      <div className="landing-shell">
        <div className="flex flex-col items-center text-center gap-5 lg:gap-6 max-w-[760px] mx-auto">
          
          {/* Title */}
          <h2 className="text-[26px] sm:text-[32px] font-medium text-white leading-[1.15] sm:leading-[1.1]">
            {title}
          </h2>

          {/* Description */}
          <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-white/85 leading-relaxed max-w-[520px]">
            {description}
          </p>

          {/* Buttons - Always in One Line */}
          <div className="flex flex-row flex-nowrap items-center justify-center gap-3 lg:gap-4 pt-2 w-full sm:w-auto">
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center justify-center px-6 lg:px-8 py-2.5 bg-white text-[#0A78B3] text-[13px] sm:text-[14px] font-medium rounded-full whitespace-nowrap hover:bg-[#F3F9FC] transition-colors"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center justify-center px-6 lg:px-8 py-2.5 bg-transparent border border-white/90 text-white text-[13px] sm:text-[14px] font-medium rounded-full whitespace-nowrap hover:bg-white/10 transition-colors"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}