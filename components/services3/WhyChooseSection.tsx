import Link from "next/link";

import { SectionBadge } from "./SectionBadge";
import { whyChooseCards } from "./service3Data";

export function WhyChooseSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.08fr_0.58fr_0.9fr] lg:gap-6 items-start">
          <div className="max-w-[470px]">
            <SectionBadge label="LOREM IPSUM DOLOR" />
            <div className="mt-5 text-[28px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.12] text-[#1C1C1D] max-w-[420px]">
              Why Choose Us for Your Journal Selection Needs?
            </div>
            <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.6] text-[#78788D] max-w-[470px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#00A0E3] px-6 text-[14px] sm:text-[16px] font-medium text-white shadow-[0_8px_20px_rgba(0,160,227,0.22)] transition-colors hover:bg-[#0189C2]"
            >
              Submit an Enquiry
            </Link>
          </div>

          <div className="rounded-[18px] border border-[#EEF2F5] bg-[#FAFBFC] p-5 sm:p-6 shadow-[0_10px_24px_rgba(18,74,102,0.04)] lg:mt-[72px]">
            <div className="text-[18px] sm:text-[20px] font-medium leading-[1.15] text-[#1C1C1D]">
              Built in India. Trusted Globally.
            </div>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.55] text-[#78788D]">
              We support authors across different disciplines with a workflow that stays practical, responsive, and internationally focused.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {whyChooseCards.map((card) => (
              <div key={card.title} className="rounded-[18px] border border-[#EEF2F5] bg-[#FAFBFC] p-5 sm:p-6 shadow-[0_10px_24px_rgba(18,74,102,0.04)]">
                <div className="text-[18px] sm:text-[20px] font-medium leading-[1.15] text-[#1C1C1D]">
                  {card.title}
                </div>
                <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.55] text-[#78788D]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
