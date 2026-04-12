"use client";

import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { TrustedLogos } from "@/components/landing/TrustedLogos";
import { CTABanner } from "@/components/landing/CTABanner";
import { FAQ } from "@/components/landing/FAQ";

export default function PackagesPage() {
  return (
    <main className="min-h-screen w-full bg-white font-inter text-[#1C1C1D]">
      <Navbar />
      <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-[linear-gradient(180deg,#CFE7F7_0%,#EAF5FC_52%,#FFFFFF_100%)]">
        {/* 1. Hero Section */}
        <div className="landing-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            
            <div className="max-w-[580px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
                <img src="/v1.svg" alt="icon" className="w-4 h-4" />
                <span className="text-[12px] md:text-[13px] font-medium uppercase tracking-wider text-[#00A0E3]">
                  LOREM IPSUM DOLOR
                </span>
              </div>

              <h1 className="text-[30px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.1] text-[#1C1C1D] mb-4">
                Essential Support
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[1.45] text-[#65656D] mb-8 sm:mb-10">
                Basic submission guidance, 1 free re-edit (6 months)
              </p>

              <ul className="space-y-3 mb-8 sm:mb-10">
                {[
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  "Lorem ipsum dolor sit amet, consectetur.",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-[16px] h-[16px] rounded-full bg-[#1C1C1D] flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[14px] sm:text-[15px] text-[#1C1C1D] font-medium leading-[1.45]">{text}</span>
                  </li>
                ))}
              </ul>

              <button className="h-[46px] px-8 bg-[#00A0E3] text-white text-[15px] font-medium rounded-full shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:bg-[#0189C2] transition-colors">
                Order Now
              </button>
            </div>

            <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center lg:justify-end w-full perspective-[1000px] [filter:saturate(1.12)_contrast(1.06)]">
              {/* Illustrated Stack of Papers */}
               <div className="relative w-full max-w-[500px] h-[340px]">
                {/* Back Right Document */}
                <div className="absolute right-0 top-[40px] w-[320px] h-[240px] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-[#D7E7F3] p-6 z-10 transform translate-x-4 rotate-[4deg]">
                  <div className="flex gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#E4EFF7] rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="w-full h-3 bg-[#E4EFF7] rounded-full"></div>
                      <div className="w-2/3 h-3 bg-[#E4EFF7] rounded-full"></div>
                      <div className="w-4/5 h-3 bg-[#E4EFF7] rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-2.5 bg-[#E4EFF7] rounded-full"></div>
                    <div className="w-full h-2.5 bg-[#E4EFF7] rounded-full"></div>
                    <div className="w-3/4 h-2.5 bg-[#E4EFF7] rounded-full"></div>
                  </div>
                </div>

                {/* Back Left Document */}
                <div className="absolute left-[30px] top-[60px] w-[320px] h-[240px] bg-white text-left rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-[#D7E7F3] p-6 z-20 transform -translate-x-6 -rotate-[4deg]">
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 space-y-3">
                      <div className="w-full h-3 bg-[#E4EFF7] rounded-full"></div>
                      <div className="w-2/3 h-3 bg-[#E4EFF7] rounded-full"></div>
                      <div className="w-4/5 h-3 bg-[#E4EFF7] rounded-full"></div>
                    </div>
                    <div className="w-16 h-16 bg-[#E4EFF7] rounded-lg"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-2.5 bg-[#E4EFF7] rounded-full"></div>
                    <div className="w-full h-2.5 bg-[#E4EFF7] rounded-full"></div>
                    <div className="w-1/2 h-2.5 bg-[#E4EFF7] rounded-full"></div>
                  </div>
                </div>

                {/* Front Main Document */}
                <div className="absolute left-1/2 top-[10px] -translate-x-1/2 w-[280px] h-[340px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#D7E7F3] p-7 z-30 flex flex-col">
                  {/* Blue Bookmark */}
                  <div className="absolute top-0 left-6 w-[36px] h-[52px] bg-[#00A0E3] rounded-b-md shadow-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full mt-[-10px]"></div>
                    <div className="absolute bottom-[-1px] border-l-[18px] border-r-[18px] border-b-[14px] border-l-transparent border-r-transparent border-b-white"></div>
                  </div>

                  <div className="flex gap-4 mt-6 mb-6">
                     <div className="w-[84px] h-[72px] bg-[#DCEBF6] rounded-xl flex items-center justify-center shrink-0"></div>
                     <div className="flex-1 space-y-3 mt-1">
                      <div className="w-full h-[10px] bg-[#DCEBF6] rounded-full"></div>
                      <div className="w-full h-[10px] bg-[#DCEBF6] rounded-full"></div>
                      <div className="w-2/3 h-[10px] bg-[#DCEBF6] rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3.5 flex-1">
                    <div className="w-full h-[8px] bg-[#DCEBF6] rounded-full"></div>
                    <div className="w-full h-[8px] bg-[#DCEBF6] rounded-full"></div>
                    <div className="w-[90%] h-[8px] bg-[#DCEBF6] rounded-full"></div>
                    <div className="w-full h-[8px] bg-[#DCEBF6] rounded-full"></div>
                    <div className="w-[80%] h-[8px] bg-[#DCEBF6] rounded-full"></div>
                    <div className="w-full h-[8px] bg-[#DCEBF6] rounded-full mt-6"></div>
                    <div className="w-[70%] h-[8px] bg-[#DCEBF6] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Packages Pricing Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="landing-shell">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-auto">
            {/* Header Container - Centered, responsive max-width */}
            <div className="flex flex-col items-center text-center max-w-full sm:max-w-[700px] md:max-w-[750px] mb-8 sm:mb-10 lg:mb-12">
              
              {/* Section Badge */}
              <div className="landing-section-badge mb-4 sm:mb-5 lg:mb-6">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="landing-section-badge-text text-[11px] sm:text-[12px]">
                  LOREM IPSUM
                </span>
              </div>

              {/* Section Heading */}
              <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.1] text-[#1C1C1D] mb-3 sm:mb-4 tracking-[-0.01em]">
                Manuscript Formatting Plans to Meet Your Needs
              </h2>

              {/* Section Description */}
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.4] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
              </p>
            </div>

            {/* Pricing Cards Grid - Responsive layout */}
            <div className="w-full flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-6 lg:gap-10 justify-center items-stretch max-w-full">
              
              {/* Affordable Card (Yellow) - Frame 1351649697 */}
              <div className="w-full sm:w-full md:w-[calc(50%-20px)] lg:w-[440px] box-border rounded-[14px] border border-[#CEA02D] bg-[#F4E9CD] p-6 sm:p-8 lg:p-[32px] lg:pb-[24px] relative flex flex-col gap-6 lg:gap-6 overflow-hidden hover:shadow-[0_20px_50px_rgba(206,160,45,0.15)] transition-all duration-300 lg:h-[440px]">
                {/* "Affordable" Badge - Top Right */}
                <div className="absolute top-0 right-0 bg-[#CEA02D] text-white text-[12px] font-semibold leading-[120%] px-3 lg:px-[14px] py-1.5 lg:py-2 rounded-bl-[24px] shadow-sm z-10">
                  Affordable
                </div>

                {/* Icon - 70x70 circle */}
                <div className="box-border flex flex-row items-center justify-center p-4 gap-[10px] w-[60px] sm:w-[70px] lg:w-[70px] h-[60px] sm:h-[70px] lg:h-[70px] rounded-full bg-[rgba(206,160,45,0.16)] border border-[#CEA02D] flex-none z-0">
                  <div className="w-[38px] lg:w-[38px] h-[38px] lg:h-[38px] flex items-center justify-center">
                    <svg className="w-full h-full text-[#CEA02D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col items-start gap-1.5 lg:gap-[6px] flex-grow z-1">
                  {/* Title */}
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[18px] font-semibold leading-[120%] text-[#CEA02D]">
                    Lorem ipsum dolor
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] lg:text-[14px] font-normal leading-[120%] text-[#78788D]">
                    Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-[#CEA02D] opacity-50 z-2"></div>

                {/* Pricing Container */}
                <div className="flex flex-col items-start gap-3.5 lg:gap-[14px] z-3">
                  {/* Row 1: Service Count and Original Price */}
                  <div className="flex flex-row items-center justify-between gap-1.5 w-full">
                    <span className="text-[13px] lg:text-[14px] font-normal leading-[120%] text-[#525866]">
                      Get 6 services worth
                    </span>
                    <span className="text-[13px] lg:text-[14px] font-medium leading-[120%] text-[#171717] line-through">
                      $1240
                    </span>
                  </div>

                  {/* Row 2: "For only:" and Price */}
                  <div className="flex flex-row items-end justify-between gap-1.5 w-full">
                    <span className="text-[13px] lg:text-[14px] font-normal leading-[120%] text-[#525866]">
                      For only:
                    </span>
                    <span className="text-[20px] lg:text-[20px] font-bold leading-[120%] text-[#CEA02D]">
                      $912
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="flex flex-row items-center justify-center px-2.5 lg:px-[11px] py-[6px] lg:py-[6px] gap-2.5 lg:gap-[10px] h-12 lg:h-12 w-full rounded-full bg-[#0A0A0A] text-white text-[14px] lg:text-[16px] font-medium leading-[120%] hover:bg-[#1C1C1D] transition-colors shadow-sm z-3 self-stretch flex-none order-3 mt-auto lg:mt-auto">
                  Buy Now
                </button>
              </div>

              {/* Popular Card (Blue) - Frame 1351649698 */}
              <div className="w-full sm:w-full md:w-[calc(50%-20px)] lg:w-[440px] box-border rounded-[14px] border border-[#00A0E3] bg-[#EFF7FB] p-6 sm:p-8 lg:p-[32px] lg:pb-[24px] relative flex flex-col gap-6 lg:gap-6 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,160,227,0.15)] transition-all duration-300 lg:h-[440px]">
                {/* "Popular" Badge - Top Right */}
                <div className="absolute top-0 right-0 bg-[#00A0E3] text-white text-[12px] font-semibold leading-[120%] px-3.5 lg:px-[14px] py-1.5 lg:py-2 rounded-bl-[24px] shadow-sm z-10">
                  Popular
                </div>

                {/* Icon - 70x70 circle */}
                <div className="box-border flex flex-row items-center justify-center p-4 gap-[10px] w-[60px] sm:w-[70px] lg:w-[70px] h-[60px] sm:h-[70px] lg:h-[70px] rounded-full bg-[#DEEFF7] border border-[#00A0E3] flex-none z-0">
                  <div className="w-[38px] lg:w-[38px] h-[38px] lg:h-[38px] flex items-center justify-center">
                    <svg className="w-full h-full text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M11 8v4l3 3" />
                    </svg>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col items-start gap-1.5 lg:gap-[6px] flex-grow z-1">
                  {/* Title */}
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[18px] font-semibold leading-[120%] text-[#00A0E3]">
                    Lorem ipsum dolor
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] lg:text-[14px] font-normal leading-[120%] text-[#78788D]">
                    Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-[#00A0E3] opacity-50 z-2"></div>

                {/* Pricing Container */}
                <div className="flex flex-col items-start gap-3.5 lg:gap-[14px] z-3">
                  {/* Row 1: Service Count and Original Price */}
                  <div className="flex flex-row items-center justify-between gap-1.5 w-full">
                    <span className="text-[13px] lg:text-[14px] font-normal leading-[120%] text-[#525866]">
                      Get 6 services worth
                    </span>
                    <span className="text-[13px] lg:text-[14px] font-medium leading-[120%] text-[#171717] line-through">
                      $1240
                    </span>
                  </div>

                  {/* Row 2: "For only:" and Price */}
                  <div className="flex flex-row items-end justify-between gap-1.5 w-full">
                    <span className="text-[13px] lg:text-[14px] font-normal leading-[120%] text-[#525866]">
                      For only:
                    </span>
                    <span className="text-[20px] lg:text-[20px] font-bold leading-[120%] text-[#00A0E3]">
                      $912
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="flex flex-row items-center justify-center px-2.5 lg:px-[11px] py-[6px] lg:py-[6px] gap-2.5 lg:gap-[10px] h-12 lg:h-12 w-full rounded-full bg-[#00A0E3] text-white text-[14px] lg:text-[16px] font-medium leading-[120%] hover:bg-[#0189C2] transition-colors shadow-[0_8px_20px_rgba(0,160,227,0.25)] z-3 self-stretch flex-none order-1 mt-auto lg:mt-auto">
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Examples Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA]">
        <div className="landing-shell text-center">
          
          <div className="landing-section-badge mb-6">
            <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="landing-section-badge-text">
              LOREM IPSUM DOLOR
            </span>
          </div>

          <h2 className="landing-section-title mb-4">
            Essential Support Examples by Submit Right
          </h2>
          <p className="landing-section-description mb-8 sm:mb-10 max-w-[600px] mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>

          <div className="inline-flex bg-white rounded-full p-1 border border-gray-200 mb-10 sm:mb-12 shadow-sm">
            <button className="px-6 py-2.5 rounded-full bg-[#00A0E3] text-white text-[14px] font-medium shadow-sm transition">
              Lorem ipsum
            </button>
            <button className="px-6 py-2.5 rounded-full bg-transparent text-[#65656D] hover:bg-gray-50 text-[14px] font-medium transition">
              Lorem ipsum
            </button>
            <button className="px-6 py-2.5 rounded-full bg-transparent text-[#65656D] hover:bg-gray-50 text-[14px] font-medium transition">
              Lorem ipsum
            </button>
          </div>

          <div className="w-full mx-auto h-[350px] sm:h-[550px] bg-[#D4DCE2] rounded-[32px] overflow-hidden mb-12 flex items-center justify-center relative">
            {/* SVG Placeholder for Image */}
            <svg className="absolute inset-0 w-full h-full text-[#B5C2CD]" preserveAspectRatio="none" viewBox="0 0 1000 450" fill="currentColor">
              <path d="M0,450 L1000,450 L1000,0 L0,0 Z M0,450 L350,150 L600,350 L850,200 L1000,450 Z" opacity="0.3"></path>
              <circle cx="350" cy="150" r="40" fill="white" opacity="0.8"></circle>
            </svg>
          </div>

          <button className="h-[46px] px-8 bg-[#00A0E3] text-white text-[15px] font-medium rounded-full shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:bg-[#0189C2] transition-colors">
            Order Now
          </button>
        </div>
      </section>

      {/* 4. Included Features - "What is Included in the Service" */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="landing-shell">
          {/* Container centering */}
          <div className="relative z-10 flex flex-col items-center justify-center">
          
          {/* Header Section - centered, responsive max-width */}
          <div className="flex flex-col items-center text-center max-w-full sm:max-w-[700px] lg:max-w-[676px] gap-5 sm:gap-6 mb-10 sm:mb-14 lg:mb-12">
            
            {/* Section Badge */}
            <div className="landing-section-badge">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="landing-section-badge-text text-[11px] sm:text-[12px]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            {/* Title and Description Wrapper */}
            <div className="flex flex-col items-center gap-3 sm:gap-3 lg:gap-[12px]">
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium leading-[1.1] text-[#1C1C1D] tracking-[-0.01em]">
                What is Included in the Service
              </h2>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.4] text-[#78788D] max-w-[600px]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
              </p>
            </div>
          </div>

          {/* Features Grid - Two rows layout */}
          <div className="w-full flex flex-col gap-6 sm:gap-8 lg:gap-[42px] items-center">
            
            {/* First Row - 3 Cards */}
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-[42px] justify-center flex-wrap lg:flex-nowrap">
              {[
                { title: "Scientific Expertise", desc: "Expertise in specialized scientific illustration." },
                { title: "Journal Customization", desc: "Abstracts as per your target journal's requirements." },
                { title: "Multiple Formats", desc: "Output in all major formats: jpg, pdf, png, tiff." }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="w-full sm:w-[calc(50%-8px)] lg:w-[320px] relative box-border flex flex-col items-start pt-[48px] sm:pt-[48px] lg:pt-[48px] px-6 sm:px-[24px] pb-6 sm:pb-[24px] gap-4 sm:gap-[18px] lg:gap-[18px] rounded-[16px] border border-[#ECECEC] bg-[#F8F8F8] h-auto sm:h-[136px] lg:h-[136px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-shadow"
                >
                  {/* Circular Icon - Absolute positioned at top */}
                  <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 w-14 h-14 sm:w-14 sm:h-14 lg:w-14 lg:h-14 rounded-full bg-white border border-[#ECECEC] shadow-[0_7px_17px_-12px_rgba(28,28,29,0.1)] flex items-center justify-center z-10 flex-none">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <svg className="w-full h-full text-[#1C1C1D]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col items-center text-center gap-2 sm:gap-[8px] lg:gap-[8px] w-full z-0">
                    <h3 className="text-[18px] sm:text-[20px] lg:text-[20px] font-medium leading-[1.1] text-[#1C1C1D]">
                      {item.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] lg:text-[14px] font-normal leading-[1.2] text-[#78788D]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - 2 Cards */}
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-[42px] justify-center flex-wrap lg:flex-nowrap lg:max-w-[682px]">
              {[
                { title: "Satisfaction Guarantee", desc: "Complete customer satisfaction guaranteed." },
                { title: "Copyright Retention", desc: "You retain full copyright of your graphical abstract." }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="w-full sm:w-[calc(50%-8px)] lg:w-[320px] relative box-border flex flex-col items-start pt-[48px] sm:pt-[48px] lg:pt-[48px] px-6 sm:px-[24px] pb-6 sm:pb-[24px] gap-4 sm:gap-[18px] lg:gap-[18px] rounded-[16px] border border-[#ECECEC] bg-[#F8F8F8] h-auto sm:h-[136px] lg:h-[136px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-shadow"
                >
                  {/* Circular Icon - Absolute positioned at top */}
                  <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 w-14 h-14 sm:w-14 sm:h-14 lg:w-14 lg:h-14 rounded-full bg-white border border-[#ECECEC] shadow-[0_7px_17px_-12px_rgba(28,28,29,0.1)] flex items-center justify-center z-10 flex-none">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <svg className="w-full h-full text-[#1C1C1D]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col items-center text-center gap-2 sm:gap-[8px] lg:gap-[8px] w-full z-0">
                    <h3 className="text-[18px] sm:text-[20px] lg:text-[20px] font-medium leading-[1.1] text-[#1C1C1D]">
                      {item.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] lg:text-[14px] font-normal leading-[1.2] text-[#78788D]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 5. Trusted Logos */}
      <TrustedLogos />

      {/* 6. How does it help section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="landing-shell">
          {/* Container centering */}
          <div className="relative z-10 flex flex-col items-center justify-center">
          
          {/* Header Section - centered */}
          <div className="flex flex-col items-center text-center max-w-full sm:max-w-[700px] lg:max-w-[704px] gap-5 sm:gap-6 mb-10 sm:mb-14 lg:mb-16">
            
            {/* Section Badge */}
            <div className="landing-section-badge">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="landing-section-badge-text text-[11px] sm:text-[12px]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            {/* Title and Description Wrapper */}
            <div className="flex flex-col items-center gap-3 sm:gap-3 lg:gap-[12px]">
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium leading-[1.1] text-[#1C1C1D] tracking-[-0.01em]">
                How does a essential support help my article?
              </h2>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.4] text-[#78788D] max-w-[600px]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
              </p>
            </div>
          </div>

          {/* Items Container - Desktop: horizontal, Mobile: vertical with dividers */}
          <div className="w-full flex flex-col lg:flex-row border border-[#E7E7E9] rounded-[14px] lg:h-[167px] max-w-full lg:max-w-[1280px] overflow-hidden">
            {[
              { title: "Lorem ipsum dolor sit", desc: "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam." },
              { title: "Lorem ipsum dolor sit", desc: "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam." },
              { title: "Lorem ipsum dolor sit", desc: "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam." },
              { title: "Lorem ipsum dolor sit", desc: "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam." }
            ].map((item, idx, arr) => (
              <div 
                key={idx}
                className={`flex flex-1 flex-col justify-end items-start p-6 sm:p-6 lg:p-8 gap-3 sm:gap-[12px] lg:gap-4 lg:h-full
                  ${idx < arr.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-[#E7E7E9]' : ''}
                `}
              >
                {/* Item Title */}
                <h3 className="text-[16px] font-semibold leading-[120%] text-[#1C1C1D]">
                  {item.title}
                </h3>
                
                {/* Item Description */}
                <p className="text-[14px] font-normal leading-[120%] text-[#78788D]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* 7. Expert Network - Turnaround & Deliverables */}
      <section className="relative bg-[#F3F9FC] overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        <div className="landing-shell">
          {/* Desktop Layout: flex row with responsive gap and padding */}
          <div className="flex flex-col lg:flex-row justify-center items-flex-start gap-8 sm:gap-12 lg:gap-[62px]">
            
            {/* Left Content - 580px */}
            <div className="w-full lg:w-[580px] flex flex-col justify-center items-start gap-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#ECECEC] rounded-full shadow-[0px_0px_12px_rgba(28,28,29,0.1)]">
                <svg className="w-5 h-5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4a6 6 0 016-6h6a6 6 0 016 6v4m-13.5-13a3 3 0 110-6 3 3 0 010 6zM9 21v-5.5a3 3 0 016 0V21m9.75-9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <span className="text-[14px] font-medium text-[#1C1C1D] leading-[20px]">EXPERT NETWORK</span>
              </div>

              {/* Title */}
              <h2 className="text-[28px] sm:text-[32px] lg:text-[32px] font-medium leading-[120%] text-[#1C1C1D]">
                Lorem ipsum dolor sit amet consectetur.
              </h2>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] lg:text-[18px] font-normal leading-[140%] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
              </p>
            </div>

            {/* Right Content - Cards Grid (2 cols x 2 rows) */}
            <div className="w-full lg:w-auto flex flex-col gap-5 lg:gap-[20px]">
              
              {/* Row 1 */}
              <div className="flex flex-col sm:flex-row gap-5 lg:gap-[20px]">
                {/* Card 1: Turnaround time */}
                <div className="w-full sm:w-[309px] flex flex-col items-flex-start gap-[18px] p-6 lg:p-[24px] bg-white border border-[#ECECEC] rounded-[16px]">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-[27px] bg-[rgba(0,160,227,0.08)]">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col items-flex-start gap-2">
                    <h4 className="text-[20px] font-medium leading-[110%] text-[#1C1C1D]">Turnaround time</h4>
                    <p className="text-[14px] font-normal leading-[120%] text-[#78788D]">Delivery in 4-5 days for first draft from order confirmation.</p>
                  </div>
                </div>

                {/* Card 2: Rate */}
                <div className="w-full sm:w-[309px] flex flex-col items-flex-start gap-[18px] p-6 lg:p-[24px] bg-white border border-[#ECECEC] rounded-[16px]">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-[27px] bg-[rgba(0,160,227,0.08)]">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col items-flex-start gap-2">
                    <h4 className="text-[20px] font-medium leading-[110%] text-[#1C1C1D]">Rate</h4>
                    <p className="text-[14px] font-normal leading-[120%] text-[#78788D]">$12,500 for 2D graphical abstract and $21,500 for 3D graphical abstract</p>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col sm:flex-row gap-5 lg:gap-[20px]">
                {/* Card 3: Deliverables */}
                <div className="w-full sm:w-[309px] flex flex-col items-flex-start gap-[18px] p-6 lg:p-[24px] bg-white border border-[#ECECEC] rounded-[16px]">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-[27px] bg-[rgba(0,160,227,0.08)]">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col items-flex-start gap-2">
                    <h4 className="text-[20px] font-medium leading-[110%] text-[#1C1C1D]">Deliverables</h4>
                    <p className="text-[14px] font-normal leading-[120%] text-[#78788D]">2D or 3D graphical abstract file, Explanatory letter, Development materials (for 3D)</p>
                  </div>
                </div>

                {/* Card 4: Document types */}
                <div className="w-full sm:w-[309px] flex flex-col items-flex-start gap-[18px] p-6 lg:p-[24px] bg-white border border-[#ECECEC] rounded-[16px]">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-[27px] bg-[rgba(0,160,227,0.08)]">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col items-flex-start gap-2">
                    <h4 className="text-[20px] font-medium leading-[110%] text-[#1C1C1D]">Document types</h4>
                    <p className="text-[14px] font-normal leading-[120%] text-[#78788D]">Research articles, case studies, thesis, abstracts, books, grant proposals, patent documents, etc.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <FAQ />

      {/* 9. Bottom Banner CTA */}
      <CTABanner variant="secondary" />

      <Footer />
    </main>
  );
}