"use client";

import { useState } from "react";
import Link from "next/link";

export function DomainsServices() {
  const tabs = ["Editing", "Proofreading", "Translation", "Support"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="min-h-0 lg:min-h-[calc(100vh-96px)] py-12 sm:py-16 lg:py-20 bg-white flex items-center">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Header Section */}
        <div className="text-center max-w-[720px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
             <svg className="w-3 h-3 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-[0.12em]">
              LOREM IPSUM DOLOR
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-3">
            Our Domains & Services
          </h2>

          {/* Description */}
          <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#65656D] leading-relaxed max-w-[560px] mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-14 overflow-hidden">
          <div className="inline-flex flex-nowrap items-center w-full max-w-[560px] overflow-x-auto custom-scrollbar rounded-full border border-[#E5E5E5] bg-[#F7F8FA] p-1.5 sm:p-1 gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)] snap-x snap-mandatory">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative shrink-0 snap-start flex-1 min-w-max sm:min-w-0 rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-medium transition-all duration-300 ease-out ${
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
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 sm:gap-10 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Left Content */}
          <div className="pr-0 lg:pr-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] rounded-md mb-5">
              <svg className="w-3.5 h-3.5 text-[#5E6472]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[11px] font-medium text-[#5E6472] tracking-wide">Start Today</span>
            </div>

            <h3 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4 max-w-none lg:max-w-[360px]">
              Lorem ipsum dolor sit amet consectetur
            </h3>

            <p className="text-[13px] sm:text-[14px] text-[#65656D] leading-relaxed mb-6 border-b border-[#F0F0F0] pb-6 max-w-none lg:max-w-[420px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
              Elementum suscipit donec viverra posuere at lorem nullam.
            </p>

            <ul className="space-y-3.5 mb-8 max-w-none lg:max-w-[420px]">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-[#1C1C1D] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1D] leading-[1.35]">
                    Lorem ipsum dolor sit amet consectetur
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full shadow-[0_4px_12px_rgba(0,160,227,0.18)] hover:bg-[#0189C2] transition-colors"
            >
              Submit Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative bg-[#FAFAFA] rounded-xl sm:rounded-2xl p-5 sm:p-8 aspect-[5/4] sm:aspect-[4/3] flex items-center justify-center overflow-hidden border border-[#F0F0F0] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="absolute inset-x-8 bottom-0 h-4/5 bg-white rounded-t-xl shadow-sm border border-[#E5E5E5] flex overflow-hidden">
              <div className="w-1/2 p-6 border-r border-[#F0F0F0]">
                {/* Fake lines */}
                <div className="w-3/4 h-2 bg-[#E5E5E5] rounded mb-4"></div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded mb-2"></div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded mb-2"></div>
                <div className="w-5/6 h-2 bg-[#F5F5F5] rounded"></div>
              </div>
              <div className="w-1/2 p-6">
                <div className="w-4/5 h-2 bg-[#E5E5E5] rounded mb-4"></div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded mb-2"></div>
                <div className="w-11/12 h-2 bg-[#F5F5F5] rounded"></div>
                
                {/* Pencil shape */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-32 bg-[#FF4B4B] rounded-sm rotate-[15deg]"></div>
              </div>
            </div>
            {/* Person silhouette */}
            <div className="absolute left-[22%] bottom-0 w-24 h-48 bg-[#00A0E3] rounded-t-full opacity-90 z-10 flex flex-col items-center">
               <div className="w-12 h-12 bg-[#FFD1B3] rounded-full -mt-6"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
