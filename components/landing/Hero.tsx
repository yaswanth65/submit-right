"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [{ id: 1 }, { id: 2 }, { id: 3 }];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500); // Increased overall carousel animation speed
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section 
      // Subtracting an estimated 80px for the navbar. Adjust if your navbar height differs.
      className="relative hero-svg-bg overflow-hidden w-full flex flex-col justify-center pb-16" 
      style={{ 
        height: 'calc(100vh - 65px)'
      }}
    >

      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-6 items-center w-full mt-8">
          
          {/* ===== LEFT (Static Content) ===== */}
          <div className="max-w-[580px] relative z-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
              <span className="w-2 h-2 bg-[#00A0E3] rounded-full" />
              <span className="text-[13px] font-semibold tracking-wide text-[#00A0E3]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[52px] leading-[1.1] font-semibold text-[#1C1C1D] mb-6 tracking-tight">
              Lorem ipsum dolor sit amet consectetur
            </h1>

            {/* Description */}
            <p className="text-[17px] text-[#78788D] leading-[1.6] mb-10 pr-6">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
              Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mb-14">
              <Link
                href="#"
                className="px-8 py-3.5 rounded-full bg-[#00A0E3] text-white font-medium shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:shadow-[0_10px_25px_rgba(0,160,227,0.35)] hover:bg-[#028ac7] transition-all"
              >
                Create Account
              </Link>
              <Link
                href="#"
                className="px-10 py-3.5 rounded-full border border-[#00A0E3] text-[#00A0E3] font-medium bg-white hover:bg-[#EAF5FB] transition-all"
              >
                Log in
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-14">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF5FB] flex items-center justify-center text-[#00A0E3]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-[#1C1C1D]">10,000+</span>
                  <span className="text-[13px] text-[#78788D]">Lorem ipsum</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF5FB] flex items-center justify-center text-[#00A0E3]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-[#1C1C1D]">4.8/5</span>
                  <span className="text-[13px] text-[#78788D]">Lorem ipsum</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT (Animated Carousel Content) ===== */}
          <div className="relative h-[650px] w-full flex items-center justify-center perspective-[1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 flex items-center justify-center w-full h-full"
              >
                {currentSlide === 0 && <Slide1Right />}
                {currentSlide === 1 && <Slide2Right />}
                {currentSlide === 2 && <Slide3Right />}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      {/* Pagination Dots (Inside Hero section styling adjusted to match exactly) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              currentSlide === idx 
                ? "w-7 bg-[#00A0E3]" 
                : "w-1.5 bg-[#BCE4F7] hover:bg-[#00A0E3]/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Slide 1: Donut (Middle Left), Progress (Bottom Right), Text Stack (Top Right)
function Slide1Right() {
  return (
    <div className="relative w-full max-w-[540px] h-[500px]">
      {/* Top Right Card (Back, "124") */}
      <motion.div
        animate={{ y: [0, -6, 0], scale: [0.95, 0.96, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 right-0 bg-white rounded-[20px] shadow-[0_10px_35px_rgb(0,0,0,0.06)] p-6 w-[230px] z-10 border border-gray-50"
      >
        <p className="text-[15px] font-semibold text-[#404040] mb-4">Lorem ipsum dolor</p>
        <div className="text-[34px] font-bold text-[#1C1C1D] mb-4">124</div>
        <div className="w-full h-[1px] bg-gray-100 mb-4" />
        <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
          Lorem ipsum dolor sit
        </p>
      </motion.div>

      {/* Middle Left Card (Semi-circle Gauge, middle) */}
      <motion.div
        animate={{ y: [0, 8, 0], scale: [1, 1.01, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-[70px] -left-4 bg-white rounded-[20px] shadow-[0_20px_50px_rgb(0,0,0,0.08)] p-7 w-[240px] z-20 border border-gray-50"
      >
        <p className="text-[15px] font-semibold text-[#1C1C1D] mb-6">Lorem ipsum dolor</p>
        
        {/* Semi-circle Gauge */}
        <div className="relative w-[160px] h-[80px] mx-auto mb-4 overflow-hidden">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            {/* Background Arc */}
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#EAF5FB" strokeWidth="12" strokeLinecap="butt" />
            {/* Foreground Arc (84% of a half circle) */}
            {/* The full path length of arc is ~125.6. 84% is ~105.5 */}
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke="#00A0E3" 
              strokeWidth="12" 
              strokeLinecap="butt" 
              strokeDasharray="105.5 125.6" 
            />
          </svg>
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end pb-1">
            <span className="text-[24px] font-bold text-[#1C1C1D] leading-none mb-1">84%</span>
            <span className="text-[12px] text-gray-400 font-medium">Lorem</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100 mb-4" />
        <p className="text-[13px] text-gray-500 font-medium leading-snug">
          Lorem ipsum dolor sit amet consectetur
        </p>
      </motion.div>

      {/* Bottom Right Card (Progress Bar, Front Layer) */}
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1.02, 1.04, 1.02] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute bottom-4 right-0 bg-white rounded-[20px] shadow-[0_25px_65px_rgb(0,0,0,0.12)] p-7 w-[330px] z-30 border border-gray-50"
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-[15px] font-semibold text-[#1C1C1D] tracking-tight">Lorem ipsum dolor</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-[28px] font-bold text-[#1C1C1D] leading-none">124</span>
              <span className="text-[13px] text-gray-500 font-medium font-sans">Lorem</span>
            </div>
          </div>
        </div>

        {/* Updated Stacked Bar Chart */}
        <div className="flex w-full h-[12px] bg-white rounded-full overflow-hidden mb-4 mt-6 gap-[4px]">
          <div className="bg-[#22C55E] w-[78%] h-full rounded-full"></div>
          <div className="bg-[#FBBF24] w-[15%] h-full rounded-full"></div>
          <div className="bg-[#F97316] w-[7%] h-full rounded-full"></div>
        </div>

        <div className="flex justify-between text-xs mb-6 px-1">
          <div className="text-center"><p className="text-[#22C55E] font-bold text-[14px] mb-1">78%</p><p className="text-[#9CA3AF] text-[12px] font-medium">Successful</p></div>
          <div className="text-center"><p className="text-[#FBBF24] font-bold text-[14px] mb-1">15%</p><p className="text-[#9CA3AF] text-[12px] font-medium">Pending</p></div>
          <div className="text-center"><p className="text-[#F97316] font-bold text-[14px] mb-1">02%</p><p className="text-[#9CA3AF] text-[12px] font-medium">Failed</p></div>
        </div>

        <p className="text-[12px] text-[#6B7280] text-center pt-2 font-medium leading-relaxed px-4">
          Lorem ipsum dolor sit amet consectetur Sagittis habitant cursus.
        </p>
      </motion.div>
    </div>
  );
}

// Slide 2: Dynamic Highlight Cycle Sequence (Exact visual positioning)
function Slide2Right() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const idx = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 1800);
    return () => clearInterval(idx);
  }, []);

  const items = [
    { color: "bg-[#00A0E3]", iconBg: "bg-[#EAF5FB]", iconColor: "text-[#00A0E3]" },
    { color: "bg-[#F59E0B]", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#F59E0B]" },
    { color: "bg-[#6EE7B7]", iconBg: "bg-[#ECFDF5]", iconColor: "text-[#10B981]" }, // Using greenish teal as per screenshot
  ];

  return (
    <div className="relative w-full max-w-[480px] flex flex-col justify-center gap-6 z-10 mx-auto">
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div key={idx} className="flex items-center gap-6 relative">
            {/* External Dot */}
            <div className={`w-[10px] h-[10px] rounded-full shrink-0 ${item.color} transition-transform duration-300 ${isActive ? "scale-150" : "scale-100 opacity-60"}`} />
            
            {/* Card Content */}
            <motion.div
              layout
              animate={{
                width: isActive ? "108%" : "92%",
                scale: isActive ? 1.05 : 1,
                opacity: 1, // Full opacity on all as cards are clearly visible in screenshot
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} 
              className={`flex-1 flex items-center p-[18px] rounded-[18px] bg-white cursor-default origin-left transition-all ${
                isActive 
                  ? "shadow-[0_20px_40px_rgba(0,0,0,0.06)] z-20" 
                  : "shadow-[0_8px_20px_rgba(0,0,0,0.03)] z-10"
              }`}
            >
              {/* Box Icon */}
              <div className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center shrink-0 mr-5 transition-colors duration-300 ${item.iconBg}`}>
                <svg className={`w-[22px] h-[22px] ${item.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
                  {/* File icon rough shape */}
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM13 3.5L18.5 9H13V3.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
                </svg>
              </div>

              {/* Texts */}
              <div className="flex-1">
                <h3 className={`font-bold text-[15px] mb-0.5 tracking-tight ${isActive ? "text-[#1C1C1D]" : "text-[#1C1C1D]"}`}>
                  Editing
                </h3>
                <p className={`text-[13px] font-medium ${isActive ? "text-gray-400" : "text-gray-400"}`}>
                  Lorem ipsum dolor
                </p>
              </div>

              {/* Chevron Badge */}
              <div className="w-[36px] h-[36px] rounded-full border border-gray-100 flex items-center justify-center shrink-0 mr-1 bg-white shadow-sm">
                <svg className="w-[14px] h-[14px] text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// Slide 3: Yellow background aligned right, Blue foreground aligned left
function Slide3Right() {
  return (
    <div className="relative w-full max-w-[560px] h-[480px] mx-auto flex items-center justify-center">
      {/* Background Yellow Card (Left) */}
      <motion.div
        animate={{ y: [0, -4, 0], scale: [0.96, 0.98, 0.96] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-[30px] w-[290px] bg-[#F6E9C8] border border-[#DEB860]/40 rounded-2xl p-6 shadow-xl z-10"
      >
        <div className="absolute top-0 right-0 bg-[#D4A33B] text-white text-[12px] font-bold px-3 py-1.5 rounded-bl-[16px] rounded-tr-[16px]">
          You Save: $328
        </div>
        <h3 className="text-[#C18C28] font-bold text-[17px] mb-1.5 tracking-tight border-b-0 pb-0 mt-3">Lorem ipsum dolor</h3>
        <p className="text-[13px] text-[#A6781E] mb-6 leading-relaxed font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
        
        <ul className="space-y-3 mb-6">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-2.5 text-[13px] text-[#3E2B08] font-semibold">
              <div className="w-[18px] h-[18px] rounded-full bg-[#D4A33B] flex items-center justify-center shrink-0">
                <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="truncate">Lorem ipsum dolor sit amet</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#D4A33B]/30 pt-4 mb-4">
          <div className="flex justify-between items-center text-[12px] text-[#3E2B08] font-medium mb-1">
            <span>Get 6 services worth</span>
            <span className="font-bold line-through opacity-80">$1240</span>
          </div>
          <div className="flex justify-between items-end text-[#D4A33B]">
            <span className="text-[13px] font-medium mb-1">For only:</span>
            <span className="font-extrabold text-[24px] leading-none">$912</span>
          </div>
        </div>

        <button className="w-full py-3 bg-[#111111] text-white rounded-lg text-[14px] font-semibold hover:bg-black shadow-md transition-all">
          Buy Now
        </button>
      </motion.div>

      {/* Foreground Blue Card (Right) */}
      <motion.div
        animate={{ y: [0, 8, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute -right-2 bottom-[10px] w-[300px] bg-white border border-[#00A0E3]/70 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,160,227,0.15)] z-20"
      >
        <div className="absolute top-0 right-0 bg-[#00A0E3] text-white text-[12px] font-bold px-3 py-1.5 rounded-bl-[16px] rounded-tr-[16px]">
          You Save: $328
        </div>
        <h3 className="text-[#00A0E3] font-bold text-[18px] mb-1.5 tracking-tight border-b-0 pb-0 mt-3">Lorem ipsum dolor</h3>
        <p className="text-[13px] text-[#6B7280] mb-6 leading-relaxed font-medium tracking-wide">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
        
        <ul className="space-y-3 mb-6">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-2.5 text-[13px] text-[#1C1C1D] font-bold font-sans tracking-tight">
              <div className="w-[18px] h-[18px] rounded-full bg-[#00A0E3] flex items-center justify-center shrink-0">
                <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="truncate">Lorem ipsum dolor sit amet</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex justify-between items-center text-[12px] text-gray-500 font-medium mb-1">
            <span>Get 6 services worth</span>
            <span className="font-bold line-through text-[#1C1C1D] opacity-80">$1240</span>
          </div>
          <div className="flex justify-between items-end text-[#00A0E3]">
            <span className="text-[13px] font-medium mb-1">For only:</span>
            <span className="font-extrabold text-[26px] leading-none">$912</span>
          </div>
        </div>

        <button className="w-full py-3 bg-[#00A0E3] text-white rounded-lg text-[14px] font-semibold hover:bg-[#028ac7] shadow-md transition-all">
          Buy Now
        </button>
      </motion.div>
    </div>
  );
}
