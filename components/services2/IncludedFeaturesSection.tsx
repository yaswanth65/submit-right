import { Check } from "lucide-react";

import { SectionBadge } from "./SectionBadge";
import { includedFeatures } from "./service2Data";

export function IncludedFeaturesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F8F8]">
      <div className="landing-shell">
        <div className="text-center max-w-[720px] mx-auto mb-10 sm:mb-14">
          <SectionBadge label="LOREM IPSUM DOLOR" />
          <h2 className="landing-section-title">What is Included in the Service</h2>
          <p className="landing-section-description">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-x-12 lg:gap-y-12 w-full justify-items-center">
          {includedFeatures.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center gap-6 w-full max-w-[220px] sm:max-w-[281px] min-h-[140px] lg:h-[154px]">
              <div className="w-[56px] h-[56px] rounded-full bg-white border border-[#ECECEC] shadow-[0_7px_17px_-12px_rgba(28,28,29,0.1)] flex items-center justify-center">
                <Check className="w-4 h-4 text-[#1C1C1D]" strokeWidth={3} />
              </div>

              <div className="flex flex-col items-center gap-[10px] w-full max-w-[281px]">
                <h3 className="font-inter font-medium text-[18px] sm:text-[20px] leading-[110%] text-[#1C1C1D] w-full text-center">
                  {feature.title}
                </h3>
                <p className="font-inter font-normal text-[14px] leading-[120%] text-center text-[#78788D] w-full max-w-[274px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}