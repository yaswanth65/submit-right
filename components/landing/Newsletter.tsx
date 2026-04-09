import Link from "next/link";

export function Newsletter() {
  return (
    <section className="relative z-20 bg-transparent pt-4 sm:pt-6 lg:pt-8 -mb-6 sm:-mb-16 lg:-mb-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="bg-white border border-[#E5E5E5] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
          
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-2">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#65656D] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor, consectetur adipiscing elit
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="#"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-2.5 border border-[#00A0E3] text-[#00A0E3] text-[14px] font-medium rounded-full hover:bg-[#F3F9FC] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="#"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
            >
              Create Account
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
