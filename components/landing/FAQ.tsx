"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  tag?: string;
  title?: string;
  description?: string;
}

export function FAQ({ items, tag = "FAQ", title = "Got Questions We've Got Answers", description = "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultFaqs = [
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

  const faqs = items || defaultFaqs;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="landing-section-badge">
             <div className="w-5 h-5 bg-[#1C1C1D] text-white rounded-full flex items-center justify-center font-normal text-[10px]">?</div>
            <span className="landing-section-badge-text">
              {tag}
            </span>
          </div>

          <h2 className="landing-section-title">
            {title}
          </h2>

          <p className="landing-section-description">
            {description}
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
                <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#ECECEC] text-[18px] sm:text-[20px] text-[#1C1C1D] group-hover:text-[#00A0E3] font-light">
                  {openIndex === idx ? (
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                    </svg>
                  )}
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
