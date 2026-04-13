import { SectionBadge } from "./SectionBadge";
import { whyChooseCards } from "./service2Data";

export function WhyChooseSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F3F9FC]">
      <div className="landing-shell">
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-12 lg:mb-14">
          <SectionBadge label="LOREM IPSUM DOLOR" />
          <h2 className="landing-section-title">Why Choose Submit Right for Manuscript Formatting</h2>
          <p className="landing-section-description">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyChooseCards.map((card, index) => (
            <div key={card.title} className="rounded-[16px] border border-[#D8ECF7] bg-white p-5 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.02)]">
              <div className="w-9 h-9 rounded-[10px] bg-[#DEEFF7] border border-[#BFE2F6] flex items-center justify-center mb-4">
                <svg className="w-4.5 h-4.5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V7l7-4z" />
                </svg>
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-medium leading-[1.15] text-[#1C1C1D] mb-2">
                {card.title}
              </h3>
              <p className="text-[14px] leading-[1.45] text-[#78788D]">
                {card.description}
              </p>
              <div className="mt-4 text-[12px] font-medium text-[#00A0E3] uppercase tracking-wide">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}