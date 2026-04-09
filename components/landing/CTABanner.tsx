import Link from "next/link";

interface CTABannerProps {
  variant?: "primary" | "secondary";
}

export function CTABanner({ variant = "primary" }: CTABannerProps) {
  if (variant === "secondary") {
    return (
      <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 z-20 -mt-6 sm:-mt-20 lg:-mt-28">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-5 sm:px-8 py-7 sm:py-10 lg:px-12 lg:py-12 border border-[#F3F4F6] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 translate-y-[8%] sm:translate-y-[18%]">
          <div className="text-center md:text-left max-w-[520px]">
            <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-3">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#65656D] leading-relaxed max-w-[420px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor, amet, consectetur adipiscing elit
            </p>
          </div>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-row w-full sm:w-auto items-center justify-center md:justify-end gap-3 sm:gap-4 shrink-0">
            <Link
              href="#"
              className="inline-flex w-full items-center justify-center px-2 py-3 bg-white border border-[#00A0E3] text-[#00A0E3] text-[13px] sm:text-[14px] font-medium rounded-full hover:bg-[#F3F9FC] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="#"
              className="inline-flex w-full items-center justify-center px-2 py-3 bg-[#00A0E3] text-white text-[13px] sm:text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-gradient-to-r from-[#0B8FCD] via-[#0A78B3] to-[#06547F] py-12 sm:py-16 lg:py-18">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col items-center text-center gap-5 lg:gap-6 max-w-[760px] mx-auto">
          <h2 className="text-[26px] sm:text-[32px] font-medium text-white leading-[1.15] sm:leading-[1.1]">
            Lorem ipsum dolor sit amet consectetur
          </h2>
          <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-white/85 leading-relaxed max-w-[520px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor, amet, consectetur adipiscing elit
          </p>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-row items-center justify-center w-full sm:w-auto gap-3 lg:gap-4 pt-2">
            <Link
              href="#"
              className="inline-flex w-full items-center justify-center px-1 sm:px-6 lg:px-8 py-2.5 bg-white text-[#0A78B3] text-[13px] sm:text-[14px] font-medium rounded-full hover:bg-[#F3F9FC] transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="#"
              className="inline-flex w-full items-center justify-center px-1 sm:px-6 lg:px-8 py-2.5 bg-transparent border border-white/90 text-white text-[13px] sm:text-[14px] font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
