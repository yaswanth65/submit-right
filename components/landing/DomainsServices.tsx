"use client";

import { useState } from "react";
import Link from "next/link";

export function DomainsServices() {
  const tabs = ["Editing", "Proofreading", "Translation", "Support"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const content = {
    Editing: {
      title: "Get Your Paper Submission-Ready",
      description: "Poor grammar and unclear sentences can get great research rejected. Our PhD-qualified editors fix language, structure, tone, and flow  so your paper speaks for itself in front of reviewers.",
      bullets: [
        "Grammar, spelling, and tone corrected throughout",
        "Argument structure and clarity improved",
        "Free editing certificate with every order"
      ],
      cta: "Get Editing Quote "
    },
    Proofreading: {
      title: "Catch Every Error Before the Deadline",
      description: "A single typo in the wrong place undermines months of research. Our proofreaders do a meticulous final sweep  ensuring your manuscript is spotless before it leaves your hands.",
      bullets: [
        "Line-by-line spelling and punctuation review",
        "Formatting and citation consistency checked",
        "Turnaround as fast as 24 hours"
      ],
      cta: "Start Proofreading →"
    },
    Translation: {
      title: "Your Research Voice. Perfect English.",
      description: "Non-native researchers deserve the same shot at top journals. Our translators don't just convert words  they preserve your academic tone, methodology, and subject-specific terminology.",
      bullets: [
        "Language to English with academic tone preserved",
        "Subject-matter expert translators assigned",
        "Post-translation formatting maintained"
      ],
      cta: "Get Translation Quote →"
    },
    Support: {
      title: "From Manuscript to Accepted Paper",
      description: "Most rejections are avoidable. We handle target journal selection, submission formatting, plagiarism checks, and reviewer response letters  giving your research the best possible chance.",
      bullets: [
        "Journal selection and formatting to their exact specs",
        "iThenticate plagiarism check included",
        "Reviewer response and cover letter support"
      ],
      cta: "Start Publication Support "
    }
  };

  const currentContent = content[activeTab as keyof typeof content];

  return (
    <section className="min-h-0 lg:min-h-[calc(100vh-96px)] py-12 sm:py-16 lg:py-20 bg-white flex items-center">
      <div className="landing-shell">
        
        {/* Header Section */}
        <div className="text-center max-w-[720px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          {/* Badge */}
          <div className="landing-section-badge">
<img src="/vector2.svg" alt="icon" className="w-4 h-4" />               
            <span className="landing-section-badge-text">
              CORE SERVICE DOMAINS
            </span>
          </div>

          {/* Heading */}
          <h2 className="landing-section-title">
            Every Step of Your Academic Journey. Covered.
          </h2>

          {/* Description */}
          <p className="landing-section-description max-w-[560px]">
            From fixing language errors to getting your paper accepted  Submit Right handles every stage with expert-led services, real-time tracking, and zero hidden fees.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 sm:mb-12  lg:mb-14 overflow-hidden">
          <div className="inline-flex flex-nowrap items-center  w-full max-w-[560px] max-sm:max-w-[360px] overflow-x-auto custom-scrollbar rounded-full border border-[#E5E5E5] bg-[#F7F8FA]   py-1 sm:py-1 gap-0.5 sm:gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)] snap-x snap-mandatory">
            <div className="w-4 sm:w-0 shrink-0" />
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative shrink-0 snap-start flex-1 min-w-max sm:min-w-0 rounded-full px-4 sm:px-5 py-2 sm:py-1.5 text-[12px] sm:text-[14px] font-medium transition-all duration-300 ease-out ${
                    isActive
                      ? "bg-[#00A0E3] text-white shadow-[0_6px_14px_rgba(0,160,227,0.2)]"
                      : "text-[#7B8190] hover:text-[#1C1C1D]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 sm:gap-10 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="pr-0 lg:pr-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] rounded-md mb-5">
             <img src="/f1.svg" alt="icon" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-[#5E6472] tracking-wide">Start Today</span>
            </div>

            <h3 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
              {currentContent.title}
            </h3>

            <p className="text-[13px] sm:text-[14px] text-[#65656D] leading-relaxed mb-6  pb-6">
              {currentContent.description}
            </p>

            <ul className="space-y-3.5 mb-8">
              {currentContent.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <img src="/tick.svg" alt="icon" className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1D] leading-[1.35]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full shadow-[0_4px_12px_rgba(0,160,227,0.18)] hover:bg-[#0189C2] transition-colors"
            >
              {currentContent.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative bg-[#FAFAFA] rounded-xl sm:rounded-2xl p-5 sm:p-8 aspect-[5/4] sm:aspect-[4/3] flex items-center justify-center overflow-hidden border border-[#F0F0F0] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
<img src="/domain.png" alt="icon" className="w-full h-auto max-w-[900px] object-contain" />              
          </div>
        </div>

      </div>
    </section>
  );
}
