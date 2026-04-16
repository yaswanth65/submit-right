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
                <img src="/serv2/image.png" alt="tick icon" width={20} height={20} />
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-medium leading-[1.15] text-[#1C1C1D] mb-2">
                {card.title}
              </h3>
              <p className="text-[14px] leading-[1.45] text-[#78788D]">
                {card.description}
              </p>
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}