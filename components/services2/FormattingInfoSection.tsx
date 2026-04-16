import { SectionBadge } from "./SectionBadge";

export function FormattingInfoSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA]">
      <div className="landing-shell">
        <div className="max-w-[1100px] mx-auto text-center">
     <div className="landing-section-badge">
     <img src="/grid.svg" alt="icon" className="w-4 h-4" />
      <span className="landing-section-badge-text"> FORMATTING</span>
    </div>
          <h2 className="mt-6 text-[28px] sm:text-[32px] font-medium leading-[1.15] text-[#1C1C1D]">
            What is Manuscript Formatting?
          </h2>
          <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.65] text-[#78788D] max-w-[1080px] mx-auto">
Manuscript formatting is the way in which the content of your research paper is presented. Formatting your manuscript according to journal guidelines involves using correct fonts, margins, page numbers, and headings/sub-headings for your sections. Research papers are expected to be formatted a certain way by journals and publishers. These guidelines are often journal-specific and can be found under the “Author Guidelines” section on the journal website. Papers that do not adhere to these standard guidelines are more likely to be rejected without review. So, make sure that all journal formatting guidelines are satisfied correctly before submitting your manuscript.          </p>
        </div>
      </div>
    </section>
  );
}