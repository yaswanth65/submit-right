import { SectionBadge } from "./SectionBadge";
import { processSteps } from "./service3Data";

export function ProcessSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        {/* Header Section */}
        <div className="text-center max-w-[780px] mx-auto mb-14 sm:mb-16 lg:mb-[62px]">
<SectionBadge
  label="LOREM IPSUM"
  imgSrc="/vector2.svg"
  imgAlt="Document Icon"
/>          <div className="mt-6 text-[28px] sm:text-[32px] lg:text-[32px] font-medium leading-[1.1] text-[#1C1C1D]">
            Our 4-step Journal Selection Filter Process
          </div>
          <p className="mt-4 max-w-[676px] mx-auto text-[16px] sm:text-[18px] text-[#78788D] leading-[1.4]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
          </p>
        </div>

        {/* Process Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-[1280px] mx-auto">
          {processSteps.map((step, index) => (
            <div 
              key={step.number} 
              className={`flex flex-col relative py-6 lg:py-0
                ${/* Desktop Layout: Vertical borders and padding */ ''}
                ${index !== 0 ? 'lg:pl-[42px]' : ''}
                ${index !== 3 ? 'lg:pr-[42px] lg:border-r lg:border-[#ECECEC]' : ''}
                
                ${/* Mobile/Tablet Layout: Horizontal borders */ ''}
                ${index !== 3 ? 'border-b border-[#ECECEC] lg:border-b-0' : ''}
              `}
            >
              {/* Step Number & Accent Bar */}
              <div className="flex items-center gap-[9px] mb-6">
                <div 
                  className="w-[4px] h-[36px]" 
                  style={{ backgroundColor: step.accent }} 
                />
                <div className="text-[32px] font-light leading-[1.1] text-[#78788D]">
                  {step.number}.
                </div>
              </div>

              {/* Text Content */}
              <div className="text-[20px] font-medium leading-[1.1] text-[#1C1C1D] mb-2">
                {step.title}
              </div>
              <p className="text-[14px] leading-[1.2] text-[#78788D]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}