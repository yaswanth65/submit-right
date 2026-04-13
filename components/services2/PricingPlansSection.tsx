import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionBadge } from "./SectionBadge";
import { pricingPlans } from "./service2Data";

export function PricingPlansSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          <SectionBadge label="LOREM IPSUM" />
          <h2 className="landing-section-title">Manuscript Formatting Plans to Meet Your Needs</h2>
          <p className="landing-section-description max-w-[620px]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 justify-center items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.badge}
              className="relative rounded-[14px] border p-6 sm:p-8 lg:p-[32px] flex flex-col gap-6 overflow-hidden"
              style={{ borderColor: plan.accent, backgroundColor: plan.background }}
            >
              <div
                className="absolute top-0 right-0 text-white text-[12px] font-semibold leading-[120%] px-3 lg:px-[14px] py-1.5 lg:py-2 rounded-bl-[24px] shadow-sm"
                style={{ backgroundColor: plan.accent }}
              >
                {plan.badge}
              </div>

              <div
                className="box-border flex items-center justify-center w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] rounded-full border flex-none"
                style={{ backgroundColor: plan.badge === "Affordable" ? "rgba(206,160,45,0.16)" : "#DEEFF7", borderColor: plan.accent }}
              >
                <svg className="w-[38px] h-[38px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: plan.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-[16px] sm:text-[18px] font-semibold leading-[120%]" style={{ color: plan.accent }}>
                  {plan.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] font-normal leading-[120%] text-[#78788D]">
                  {plan.description}
                </p>
              </div>

              <div className="h-px w-full opacity-50" style={{ backgroundColor: plan.accent }} />

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between gap-2 w-full text-[13px] sm:text-[14px] text-[#525866]">
                  <span>Get 6 services worth</span>
                  <span className="line-through text-[#171717]">{plan.strikePrice}</span>
                </div>
                <div className="flex items-end justify-between gap-2 w-full text-[13px] sm:text-[14px] text-[#525866]">
                  <span>For only:</span>
                  <span className="text-[20px] font-bold" style={{ color: plan.accent }}>
                    {plan.price}
                  </span>
                </div>
              </div>

              <Link
                href="#"
                className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] sm:text-[16px] font-medium text-white transition-colors"
                style={{ backgroundColor: plan.accent }}
              >
                {plan.buttonLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}