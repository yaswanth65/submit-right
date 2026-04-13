import { SectionBadge } from "./SectionBadge";
import { processSteps } from "./service3Data";

export function ProcessSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="text-center max-w-[780px] mx-auto mb-10 sm:mb-12 lg:mb-14">
          <SectionBadge label="LOREM IPSUM DOLOR" />
          <div className="mt-5 text-[28px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.1] text-[#1C1C1D]">
            Our 4-step Journal Selection Filter Process
          </div>
          <p className="mt-3 max-w-[620px] mx-auto text-[14px] sm:text-[16px] text-[#78788D] leading-[1.5]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {processSteps.map((step) => (
            <div key={step.number} className="rounded-[18px] border border-[#EEF2F5] bg-white p-5 sm:p-6 shadow-[0_10px_24px_rgba(18,74,102,0.04)]">
              <div className="mb-4 h-[34px] w-[3px] rounded-full" style={{ backgroundColor: step.accent }} />
              <div className="text-[20px] sm:text-[24px] font-medium leading-[1.05] text-[#4E5762]">{step.number}.</div>
              <div className="mt-2 text-[18px] sm:text-[20px] font-medium leading-[1.15] text-[#1C1C1D]">{step.title}</div>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.55] text-[#78788D]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
