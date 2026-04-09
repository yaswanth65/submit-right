"use client";

import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 mb-4">
             <div className="w-5 h-5 bg-[#1C1C1D] text-white rounded-full flex items-center justify-center font-normal text-[10px]">?</div>
            <span className="text-[12px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              FAQ
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
            Got Questions We've Got Answers
          </h2>

          <p className="text-[13px] sm:text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-[#F0F0F0] last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between py-5 sm:py-6 text-left hover:text-[#00A0E3] transition-colors group"
              >
                <span className="text-[14px] sm:text-[15px] font-medium text-[#1C1C1D] group-hover:text-[#00A0E3] pr-4 sm:pr-6 leading-relaxed">
                  {faq.question}
                </span>
                <span className="text-[18px] sm:text-[20px] text-[#1C1C1D] group-hover:text-[#00A0E3] font-light">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="pb-5 sm:pb-6 pr-2 sm:pr-10">
                  <p className="text-[13px] sm:text-[14px] text-[#65656D] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
