import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionBadge } from "./SectionBadge";
import { documentTypes } from "./service2Data";

export function DocumentTypesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Badge */}
          <div className="landing-section-badge">
            <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
            </svg>
            <span className="landing-section-badge-text">
              DOCUMENT TYPES
            </span>
          </div>

          <h2 className="landing-section-title">We Support Various Document Types</h2>

          <p className="landing-section-description">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Document Types Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-[980px] mx-auto mb-10 sm:mb-12">
          {documentTypes.map((type) => (
            <DocumentTypeChip key={type} label={type} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00A0E3] text-white text-[14px] sm:text-[16px] font-medium shadow-[0_8px_20px_rgba(0,160,227,0.22)] hover:bg-[#0189C2] transition-colors">
            Submit an Enquiry
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DocumentTypeChip({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0 h-[51px] w-fit px-5 py-4 bg-[#F8F8F8] border border-dashed border-[#ECECEC] rounded-[12px] shadow-none transition-colors hover:border-[#00A0E3]">
      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#1C1C1D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
      <span className="text-[16px] text-[#1C1C1D] font-normal leading-[1.2]">
        {label}
      </span>
    </div>
  );
}