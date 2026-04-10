"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { TrustedLogos } from "@/components/landing/TrustedLogos";
import { CTABanner } from "@/components/landing/CTABanner";
import { FAQ } from "@/components/landing/FAQ";

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#1C1C1D]">
      <Navbar />
      <section className="relative overflow-hidden pt-12 lg:pt-24 pb-20 lg:pb-32 bg-[linear-gradient(180deg,#CFE7F7_0%,#EAF5FC_52%,#FFFFFF_100%)]">
        {/* 1. Hero Section */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 mt-16 lg:mt-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div className="max-w-[560px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
                <span className="w-2 h-2 bg-[#00A0E3] rounded-full" />
                <span className="text-[12px] md:text-[13px] font-medium uppercase tracking-wider text-[#00A0E3]">
                  LOREM IPSUM DOLOR
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[48px] font-medium leading-[1.15] text-[#1C1C1D] mb-4">
                Essential Support
              </h1>
              <p className="text-[15px] sm:text-[16px] text-[#65656D] mb-8">
                Basic submission guidance, 1 free re-edit (6 months)
              </p>

              <ul className="space-y-3 mb-10">
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
                    <span className="text-[14px] sm:text-[15px] text-[#1C1C1D] font-medium leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>

              <button className="px-8 py-3.5 bg-[#00A0E3] text-white text-[15px] font-medium rounded-full shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:bg-[#0189C2] transition-colors">
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-6">
            <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-wider text-[#1C1C1D]">
              LOREM IPSUM
            </span>
          </div>

          <h2 className="text-[30px] sm:text-[36px] font-medium text-[#1C1C1D] mb-4">
            Manuscript Formatting Plans to Meet Your Needs
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#65656D] mb-16">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full text-left">
            
            {/* Affordable Card (Yellow) */}
            <div className="flex-1 rounded-[24px] bg-[#FFFBF2] border border-[#F2E4BE] p-8 sm:p-10 relative flex flex-col pt-12 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-8 bg-[#D4A33B] text-white text-[12px] font-medium py-1.5 px-4 rounded-b-xl shadow-sm">
                Affordable
              </div>

              <div className="w-[50px] h-[50px] rounded-full bg-[#FCEFCE] border border-[#F6DE9F] flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-[#D4A33B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h3 className="text-[20px] font-medium text-[#C18C28] mb-3">Lorem ipsum dolor</h3>
              <p className="text-[13px] text-[#C18C28]/80 leading-relaxed min-h-[100px]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor viverra senectus eget enim purus enim congue.
              </p>

              <div className="mt-8 pt-6 border-t border-[#F2E4BE]">
                <div className="flex justify-between items-center text-[#C18C28] text-[13px] font-medium mb-1">
                  <span>Get 6 services worth</span>
                  <span className="line-through opacity-80">$1240</span>
                </div>
                <div className="flex justify-between items-end text-[#C18C28]">
                  <span className="text-[14px]">For only:</span>
                  <span className="text-[28px] font-bold leading-none">$912</span>
                </div>
              </div>

              <button className="mt-8 w-full py-4 bg-[#1C1C1D] text-white text-[15px] font-medium rounded-full hover:bg-black transition-colors shadow">
                Buy Now
              </button>
            </div>

            {/* Popular Card (Blue) */}
            <div className="flex-1 rounded-[24px] bg-white border border-[#00A0E3]/30 shadow-[0_20px_50px_rgba(0,160,227,0.06)] p-8 sm:p-10 relative flex flex-col pt-12 hover:shadow-[0_20px_50px_rgba(0,160,227,0.12)] transition-all duration-300">
               <div className="absolute top-0 right-8 bg-[#00A0E3] text-white text-[12px] font-medium py-1.5 px-5 rounded-b-xl shadow-sm">
                Popular
              </div>

              <div className="w-[50px] h-[50px] rounded-full bg-[#EAF5FB] border border-[#D4EBF8] flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M11 8v4l3 3" />
                </svg>
              </div>

              <h3 className="text-[20px] font-medium text-[#00A0E3] mb-3">Lorem ipsum dolor</h3>
              <p className="text-[13px] text-[#65656D] leading-relaxed min-h-[100px]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor viverra senectus eget enim purus enim congue.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center text-gray-500 text-[13px] font-medium mb-1">
                  <span>Get 6 services worth</span>
                  <span className="line-through text-[#1C1C1D] opacity-80">$1240</span>
                </div>
                <div className="flex justify-between items-end text-[#00A0E3]">
                  <span className="text-[14px] text-[#1C1C1D]">For only:</span>
                  <span className="text-[28px] font-bold leading-none">$912</span>
                </div>
              </div>

              <button className="mt-8 w-full py-4 bg-[#00A0E3] text-white text-[15px] font-medium rounded-full shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:bg-[#0189C2] transition-colors">
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Examples Section */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-6">
            <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-wider text-[#1C1C1D]">
              LOREM IPSUM DOLOR
            </span>
          </div>

          <h2 className="text-[30px] sm:text-[36px] font-medium text-[#1C1C1D] mb-4">
            Essential Support Examples by Submit Right
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#65656D] mb-10 max-w-[600px] mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>

          <div className="inline-flex bg-white rounded-full p-1 border border-gray-200 mb-12 shadow-sm">
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

          <div className="w-full mx-auto h-[350px] sm:h-[450px] bg-[#D4DCE2] rounded-[32px] overflow-hidden mb-12 flex items-center justify-center relative">
            {/* SVG Placeholder for Image */}
            <svg className="absolute inset-0 w-full h-full text-[#B5C2CD]" preserveAspectRatio="none" viewBox="0 0 1000 450" fill="currentColor">
              <path d="M0,450 L1000,450 L1000,0 L0,0 Z M0,450 L350,150 L600,350 L850,200 L1000,450 Z" opacity="0.3"></path>
              <circle cx="350" cy="150" r="40" fill="white" opacity="0.8"></circle>
            </svg>
          </div>

          <button className="px-8 py-3.5 bg-[#00A0E3] text-white text-[15px] font-medium rounded-full shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:bg-[#0189C2] transition-colors">
            Order Now
          </button>
        </div>
      </section>

      {/* 4. Included Features */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 text-center">
            
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-6">
            <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-wider text-[#1C1C1D]">
              LOREM IPSUM DOLOR
            </span>
          </div>

          <h2 className="text-[30px] sm:text-[36px] font-medium text-[#1C1C1D] mb-4">
            What is Included in the Service
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#65656D] mb-16 max-w-[600px] mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 w-full">
             {[
               { title: "Scientific Expertise", desc: "Expertise in specialized scientific illustration." },
               { title: "Journal Customization", desc: "Abstracts as per your target journal's requirements." },
               { title: "Multiple Formats", desc: "Output in all major formats: jpg, pdf, png, tiff." },
               { title: "Satisfaction Guarantee", desc: "Complete customer satisfaction guaranteed." },
               { title: "Copyright Retention", desc: "You retain full copyright of your graphical abstract." }
             ].map((item, idx) => (
                <div key={idx} className="w-full bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 mx-auto bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
                    <svg className="w-5 h-5 text-[#1C1C1D]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-[#1C1C1D] text-[15px] mb-2">{item.title}</h4>
                  <p className="text-[13px] text-[#78788D] leading-relaxed">{item.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Trusted Logos */}
      <TrustedLogos />

      {/* 6. How does it help */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-6">
              <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[11px] md:text-[12px] font-medium uppercase tracking-wider text-[#1C1C1D]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            <h2 className="text-[30px] sm:text-[36px] font-medium text-[#1C1C1D] mb-4">
              How does a essential support help my article?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#65656D] max-w-[600px] mx-auto">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {Array(4).fill(0).map((_, i) => (
               <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white hover:border-[#00A0E3]/30 hover:shadow-lg transition-all text-left">
                  <h4 className="font-medium text-[#1C1C1D] text-[15px] mb-3">Lorem ipsum dolor sit</h4>
                  <p className="text-[13px] text-[#78788D] leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
                  </p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Turnaround & Deliverables Grid */}
      <section className="py-20 bg-[#F8F9FA] border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-center">
            
            <div className="max-w-[400px]">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md mb-6 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-[11px] font-medium text-[#1C1C1D] tracking-wider uppercase">EXPERT NETWORK</span>
               </div>
               
               <h2 className="text-[32px] sm:text-[40px] font-medium text-[#1C1C1D] leading-[1.1] mb-5">
                 Lorem ipsum dolor sit amet consectetur.
               </h2>
               <p className="text-[15px] text-[#65656D] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
               </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
               {/* 1 */}
               <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF5FB] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="font-medium text-[#1C1C1D] text-[16px] mb-2">Turnaround time</h4>
                  <p className="text-[13px] text-[#65656D] leading-relaxed">Delivery in 4-5 days for first draft from order confirmation.</p>
               </div>
               {/* 2 */}
               <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF5FB] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="font-medium text-[#1C1C1D] text-[16px] mb-2">Rate</h4>
                  <p className="text-[13px] text-[#65656D] leading-relaxed">$12,500 for 2D graphical abstract and $21,500 for 3D graphical abstract</p>
               </div>
               {/* 3 */}
               <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF5FB] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h4 className="font-medium text-[#1C1C1D] text-[16px] mb-2">Deliverables</h4>
                  <p className="text-[13px] text-[#65656D] leading-relaxed">2D or 3D graphical abstract file, Explanatory letter, Development materials (For 3D)</p>
               </div>
               {/* 4 */}
               <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EAF5FB] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#00A0E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h4 className="font-medium text-[#1C1C1D] text-[16px] mb-2">Document types</h4>
                  <p className="text-[13px] text-[#65656D] leading-relaxed">Research articles, case studies, thesis, abstracts, books, grant proposals, patent documents, etc.</p>
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
    </div>
  );
}