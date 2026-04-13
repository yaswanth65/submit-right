import { SectionBadge } from "./SectionBadge";
import { serviceDetails } from "./service2Data";

export function ServiceDetailsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-14 items-start">
          <div className="max-w-[520px]">
            <SectionBadge label="LOREM IPSUM DOLOR" />
            <h2 className="mt-6 text-[28px] sm:text-[32px] font-medium leading-[1.15] text-[#1C1C1D] max-w-[430px]">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.55] text-[#78788D] max-w-[470px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {serviceDetails.map((item, index) => (
              <div key={item.title} className={`pb-4 sm:pb-5 ${index < serviceDetails.length - 1 ? "border-b border-[#EAECF0]" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[#00A0E3] shrink-0" />
                  <div>
                    <h3 className="text-[18px] sm:text-[20px] font-medium text-[#1C1C1D] leading-[1.15]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13px] sm:text-[14px] leading-[1.5] text-[#78788D] max-w-[720px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}