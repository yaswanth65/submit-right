import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionBadge } from "./SectionBadge";
import { documentTypes } from "./service2Data";

export function DocumentTypesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="text-center max-w-[760px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          <SectionBadge label="LOREM IPSUM DOLOR" />
          <h2 className="landing-section-title">We Support Various Document Types</h2>
          <p className="landing-section-description">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-[980px] mx-auto mb-8 sm:mb-10">
          {documentTypes.map((type) => (
            <span key={type} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E7E7E9] bg-[#FAFAFA] text-[13px] sm:text-[14px] text-[#65656D]">
              <span className="w-2 h-2 rounded-full bg-[#C8CBD0]" />
              {type}
            </span>
          ))}
        </div>

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