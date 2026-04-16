import { useState, useEffect, useRef } from "react";
import { SectionBadge } from "./SectionBadge";
import { serviceDetails } from "./service2Data";

export function ServiceDetailsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        // Triggers when the item hits the middle-top portion of the viewport
        rootMargin: "-30% 0px -50% 0px", 
        threshold: 0,
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-14 items-start">
          <div className="max-w-130">
            <SectionBadge label="LOREM IPSUM DOLOR" />
            <h2 className="mt-6 max-w-107.5 text-[28px] font-medium leading-[1.15] text-[#1C1C1D] sm:text-[32px]">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p className="mt-4 max-w-117.5 text-[14px] leading-[1.55] text-[#78788D] sm:text-[16px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
            </p>
          </div>

          <div className="relative ml-2 space-y-8 sm:space-y-10 py-1">
            {/* Timeline Vertical Line */}
            <div className="pointer-events-none absolute left-1.25 top-2 bottom-0 w-0.5 bg-[linear-gradient(180deg,#00A0E3_0%,#9CE0FA_30%,#9CE0FA_100%)]" />
            
            {serviceDetails.map((item, index) => (
              <div 
                key={item.title} 
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className="relative pl-8"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 top-1.5 h-3 w-3 rounded-full z-10 transition-colors duration-300 ease-in-out ${
                    activeIndex === index ? "bg-[#00A0E3]" : "bg-[#E6E8EB]"
                  }`}
                />
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-medium text-[#1C1C1D] leading-[1.15]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-180 text-[13px] leading-normal text-[#78788D] sm:text-[14px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}