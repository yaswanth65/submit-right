import Link from "next/link";

import { SectionBadge } from "./SectionBadge";

export function StatsSection() {
  return (
    <section className="bg-[#EAF6FB] py-12 sm:py-16 lg:py-18">
      <div className="landing-shell">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <SectionBadge label="LOREM IPSUM DOLOR" tone="blue" />
          <div className="mt-6 text-[28px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.1] text-[#1C1C1D]">
            34,576+ Journals in Our Database
          </div>
          <p className="mt-4 max-w-[760px] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.55] text-[#78788D]">
            Expert-backed recommendations tailored to your field and goals, by specialists with peer-review and publication experience.
          </p>
          <Link
            href="#"
            className="mt-6 flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#00A0E3] px-6 text-[14px] sm:text-[16px] font-medium text-white shadow-[0_8px_20px_rgba(0,160,227,0.22)] transition-colors hover:bg-[#0189C2]"
          >
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
}
