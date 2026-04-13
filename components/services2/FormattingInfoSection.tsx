import { SectionBadge } from "./SectionBadge";

export function FormattingInfoSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA]">
      <div className="landing-shell">
        <div className="max-w-[1100px] mx-auto text-center">
          <SectionBadge label="LOREM IPSUM DOLOR" />
          <h2 className="mt-6 text-[28px] sm:text-[32px] font-medium leading-[1.15] text-[#1C1C1D]">
            What is Manuscript Formatting?
          </h2>
          <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.65] text-[#78788D] max-w-[1080px] mx-auto">
            Manuscript formatting is the process of arranging your paper so it follows the journal&apos;s structural and visual rules. It covers headings, margins, citations, references, tables, figures, line spacing, and presentation details that help reviewers read your work without friction.
          </p>
        </div>
      </div>
    </section>
  );
}