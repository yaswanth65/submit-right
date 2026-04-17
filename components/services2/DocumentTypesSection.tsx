import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionBadge } from "./SectionBadge";
import { documentTypes } from "./service2Data";

export function DocumentTypesSection() {
  const mobileRows = [
    documentTypes.slice(0, 3),
    documentTypes.slice(3, 6),
    documentTypes.slice(6, 9),
    documentTypes.slice(9, 12),
  ];

  const desktopRows = [
    documentTypes.slice(0, 4),
    documentTypes.slice(4, 8),
    documentTypes.slice(8, 12),
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Badge */}
          <div className="landing-section-badge">
           <img src="/grid.svg" alt="icon" className="w-4 h-4" />   
            <span className="landing-section-badge-text">
              DOCUMENT TYPES
            </span>
          </div>

          <h2 className="landing-section-title">We Support Various Document Types</h2>

          <p className="landing-section-description">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:flex flex-col gap-4 w-full max-w-[1200px] mx-auto mb-10 sm:mb-12">
          {desktopRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center gap-4 w-full flex-nowrap">
              {row.map((type, idx) => (
                <DocumentTypeChip key={`${rowIndex}-${idx}-${type}`} label={type} variant="desktop" />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Marquee Rows */}
        <div className="lg:hidden flex flex-col gap-3 sm:gap-4 w-full mb-10 sm:mb-12">
          {mobileRows.map((row, rowIndex) => {
            const isReverse = rowIndex % 2 === 1;
            const duration = 20 + rowIndex * 2;
            const repeatedRow = [...row, ...row];

            return (
              <div key={rowIndex} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                  className={`flex w-max items-center gap-2.5 sm:gap-3 ${isReverse ? "animate-marquee-right" : "animate-marquee-left"}`}
                  style={{ animationDuration: `${duration}s` }}
                >
                  {repeatedRow.map((type, idx) => (
                    <DocumentTypeChip key={`${rowIndex}-${idx}-${type}`} label={type} mobile />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="#" className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00A0E3] text-white text-[14px] sm:text-[16px] font-medium shadow-[0_8px_20px_rgba(0,160,227,0.22)] hover:bg-[#0189C2] transition-colors">
            Submit an Enquiry
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .animate-marquee-left {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .animate-marquee-right {
          animation-name: marquee-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
}

function DocumentTypeChip({ label, mobile = false, variant = "mobile" }: { label: string; mobile?: boolean; variant?: "mobile" | "desktop" }) {
  const isDesktop = variant === "desktop";

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap transition-colors hover:border-[#00A0E3] ${
        isDesktop
          ? "h-[51px] w-fit px-5 py-4 bg-[#F8F8F8] border border-dashed border-[#ECECEC] rounded-[12px] shadow-none"
          : "px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-[#F0F0F0] rounded-xl shadow-[0_1px_0_rgba(255,255,255,0.8)]"
      }`}
    >
      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#1C1C1D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
      <span className={isDesktop ? "text-[16px] text-[#1C1C1D] font-normal leading-[1.2] truncate" : "text-[12px] sm:text-[14px] text-[#65656D] font-normal leading-[1.3]"}>
        {label}
      </span>
    </div>
  );
}