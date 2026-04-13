"use client";

import { useState } from "react";

import { SectionBadge } from "./SectionBadge";
import { faqItems } from "./service3Data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        <div className="mx-auto max-w-[780px] text-center mb-10 sm:mb-12">
          <SectionBadge label="FAQ" />
          <div className="mt-5 text-[28px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.1] text-[#1C1C1D]">
            Got Questions We&apos;ve Got Answers
          </div>
          <p className="mt-3 text-[14px] sm:text-[16px] text-[#78788D] leading-[1.5] max-w-[620px] mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        <div className="mx-auto max-w-[1040px] divide-y divide-[#EAECF0] border-t border-[#EAECF0]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-[14px] sm:text-[15px] font-medium leading-[1.5] text-[#1C1C1D] pr-3">
                    {item.question}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ECECEC] text-[#78788D]">
                    {isOpen ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </span>
                </button>

                {isOpen ? (
                  <div className="pt-4 pr-10">
                    <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[#78788D]">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
