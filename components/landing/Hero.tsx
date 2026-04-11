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
      // Subtracting an estimated 80px for the navbar.
      className="relative hero-svg-bg w-full overflow-x-clip flex flex-col justify-center pt-[112px] sm:pt-[128px] lg:pt-[88px] pb-14 sm:pb-20 min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-65px)]" 
    >

      <div className="landing-shell relative z-10 flex-1 flex flex-col justify-center">
  <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-center w-full mt-3 lg:mt-8">
    
    {/* ===== LEFT (Static Content) ===== */}
    <div className="w-full relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
<img src="/v1.svg" alt="icon" className="w-4 h-4" />        <span className="text-[13px] md:text-[14px] font-medium leading-[1.4] tracking-normal text-[#00A0E3]">
          ACADEMIC EDITING & PUBLICATION SERVICES
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-[32px] sm:text-[38px] md:text-[54px] leading-[1.15] md:leading-[1.1] font-medium tracking-normal text-[#1C1C1D] mb-5 md:mb-6">
        Your Research Is Brilliant. Don't Let Poor English Bury It.
      </h1>

      {/* Description */}
      <p className="text-[16px] md:text-[18px] text-[#78788D] leading-[1.5] md:leading-[1.4] mb-8 md:mb-10 lg:pr-6">
        Submit Right is the platform where researchers upload manuscripts, get expert editing, and track every step from submission to delivery.
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-10 w-full sm:w-auto px-1 sm:px-0">
        <Link
          href="#"
          className="flex items-center justify-center sm:flex-none text-center px-2 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#00A0E3] text-white whitespace-nowrap text-[14px] sm:text-[16px] font-medium leading-[1.2] shadow-[0_8px_20px_rgba(0,160,227,0.25)] hover:shadow-[0_10px_25px_rgba(0,160,227,0.35)] hover:bg-[#028ac7] transition-all"
        >
          Get Instant Quote →
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center sm:flex-none text-center px-2 sm:px-10 py-3 sm:py-3.5 rounded-full border border-[#00A0E3] text-[#00A0E3] whitespace-nowrap text-[14px] sm:text-[16px] font-medium leading-[1.2] bg-white hover:bg-[#EAF5FB] transition-all"
        >
          Explore Services
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:gap-14 w-full mt-10 lg:w-auto">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#EAF5FB] flex items-center justify-center text-[#00A0E3]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[16px] text-[#1C1C1D]">50,000+</span>
            <span className="text-[14px] leading-[1.4] text-[#78788D]">Manuscripts Delivered</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#EAF5FB] flex items-center justify-center text-[#00A0E3]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[16px] text-[#1C1C1D]">4.9/5</span>
            <span className="text-[14px] leading-[1.4] text-[#78788D]">Researcher Satisfaction</span>
          </div>
        </div>
      </div>
    </div>

    {/* ===== RIGHT (Animated Carousel Content) ===== */}
    <div className="relative h-[300px] sm:h-[450px] lg:h-[650px] w-full flex items-center justify-center perspective-[1200px] mt-3 sm:mt-6 lg:mt-0">
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

      {/* Pagination Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50">
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
  const gaugeProgress = 84;

  return (
    <div className="relative w-full h-[390px] sm:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible">
      <div className="relative w-[340px] sm:w-[540px] lg:w-[600px] h-[390px] sm:h-[500px] transform scale-[0.9] sm:scale-[0.82] md:scale-[0.92] lg:scale-100 origin-center mt-4 sm:mt-0">
      {/* Top Right Card (Back, "124") */}
      <motion.div
        animate={{ y: [0, -6, 0], scale: [0.95, 0.96, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-2 sm:top-2 sm:right-0 w-[180px] sm:w-[230px] rounded-[22px] bg-[#EEF3F8] p-2 sm:p-[10px] shadow-[0_12px_35px_rgba(28,43,64,0.09),inset_0_1px_0_rgba(255,255,255,0.85)] z-10 border border-[#D4E0EA]"
      >
        <div className="rounded-[14px] bg-white px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border border-[#E4EBF2]">
          <p className="text-[13px] sm:text-[15px] font-semibold text-[#404040] mb-2 sm:mb-3.5">Editing Progress</p>
          <div className="text-[36px] sm:text-[43px] leading-none font-normal text-[#1C1C1D]">87</div>
              <div className="w-full h-[2px] bg-[#E9EEF4] my-2 sm:my-3" />

          <p className="text-[11px] sm:text-[13px] text-[#5E6673] leading-relaxed font-medium px-1 pb-1">
          Lorem ipsum dolor sit
        </p></div>
       
       
      </motion.div>

      {/* Middle Left Card (Semi-circle Gauge, middle) */}
  <motion.div
  animate={{ y: [0, 8, 0], scale: [1, 1.01, 1] }}
  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
  className="absolute top-[118px] sm:top-[70px] left-0 sm:-left-4 w-[180px] sm:w-[240px] rounded-[22px] bg-[#EEF3F8] p-2 sm:p-[10px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-20 border border-[#D4E0EA]"
>
  <div className="rounded-[14px] bg-white px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border border-[#E4EBF2]">
    <p className="text-[13px] sm:text-[15px] font-semibold text-[#1C1C1D] mb-4 sm:mb-5 text-center w-full">
      Lorem ipsum dolor
    </p>

    <div className="relative w-[130px] sm:w-[166px] h-[78px] sm:h-[96px] mx-auto mb-1 overflow-hidden">
  <svg viewBox="0 0 100 60" className="w-full h-full">
    {/* Background Arc */}
    <path
      d="M 10 55 A 40 40 0 0 1 90 55"
      fill="none"
      stroke="#C7D4DC"
      strokeWidth="6"
      strokeLinecap="butt"  // Sharp edges
      pathLength="100"
    />

    {/* Progress Arc */}
    <path
      d="M 10 55 A 40 40 0 0 1 90 55"
      fill="none"
      stroke="#1C8ED6"
      strokeWidth="6"
      strokeLinecap="butt"  // Sharp edges
      pathLength="100"
      strokeDasharray="84 100"
    />
  </svg>

  {/* Percentage Text */}
  <div className="absolute inset-0 flex flex-col items-center justify-end pb-[10px] sm:pb-[12px]">
    <span className="text-[26px] sm:text-[24px] leading-[1] font-medium mt-2 tracking-[-0.01em] text-[#1C1C1D]">
      84%
    </span>
    <span className="text-[10px] sm:text-[12px] text-[#8A94A6] font-medium mt-0.5">
      Lorem
    </span>
  </div>
</div>
    <div className="w-full h-[2px] bg-[#E9EEF4] my-2 sm:my-3" />

    
    <p className="text-[11px] sm:text-[13px] text-[#5E6673] font-medium leading-snug px-1 pb-1 text-center w-full">
    Lorem ipsum dolor sit amet consectetur
  </p>
  </div>
</motion.div>
      {/* Bottom Right Card (Progress Bar, Front Layer) */}
      <motion.div
        animate={{ y: [0, -10, 3], scale: [1.02, 1.04, 1.02] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute bottom-0 sm:bottom-4 right-12 sm:right-8 w-[240px] sm:w-[334px] rounded-[22px] bg-[#EEF3F8] p-2 sm:p-[10px] shadow-[0_25px_65px_rgba(28,43,64,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] z-30 border border-[#D4E0EA]"
      >
        <div className="rounded-[14px] bg-white px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border border-[#E4EBF2]">
          <div className="flex justify-between items-center mb-4 sm:mb-5">
            <div>
              <p className="text-[13px] sm:text-[15px] font-semibold text-[#1C1C1D] tracking-tight">Order #SR-2847</p>
              <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                <span className="text-[22px] sm:text-[28px] font-semibold text-[#1C1C1D] leading-none">124</span>
                <span className="text-[11px] sm:text-[13px] text-gray-500 font-semibold  font-sans">Words Reviewed</span>
              </div>
            </div>
          </div>

          {/* Updated Stacked Bar Chart */}
          <div className="flex flex-row items-start w-[282px] h-[23px] bg-[#FA7319] rounded-[6px] overflow-visible mb-3 sm:mb-4 mt-4 sm:mt-6 p-0 isolate">
            <div className="w-[180px] h-[23px] bg-[#1CB061] border-2 border-white rounded-[6px] -mx-[8px] z-10"></div>
            <div className="w-[77px] h-[23px] bg-[#F4C252] border-2 border-white rounded-[6px] z-0"></div>
          </div>

          <div className="flex justify-between text-[10px] sm:text-xs px-0.5 sm:px-1">
            <div className="text-center"><p className="text-[#22C55E] font-normal text-[12px] sm:text-[14px] mb-0.5 sm:mb-1">78%</p><p className="text-[#9CA3AF] text-[10px] sm:text-[12px] font-medium">Successful</p></div>
            <div className="text-center"><p className="text-[#FBBF24] font-normal text-[12px] sm:text-[14px] mb-0.5 sm:mb-1">15%</p><p className="text-[#9CA3AF] text-[10px] sm:text-[12px] font-medium">Pending</p></div>
            <div className="text-center"><p className="text-[#F97316] font-normal text-[12px] sm:text-[14px] mb-0.5 sm:mb-1">02%</p><p className="text-[#9CA3AF] text-[10px] sm:text-[12px] font-medium">Failed</p></div>
          </div>
              <div className="w-full h-[2px] bg-[#E9EEF4] my-2 sm:my-3" />

           <p className="text-[10px] sm:text-[12px] text-[#5E6673] text-center font-medium leading-relaxed px-2 sm:px-4 mt-3 pb-1">
          Publication-Ready Editing On Track for Delivery with experts 
        </p>
        </div>

       
      </motion.div>
      </div>
    </div>
  );
}


// Slide 2: Dynamic Highlight Cycle Sequence (Exact visual positioning)

function Slide2Right() {
  const data = [
    {
      title: "Editing",
      subtitle: "Manuscript & Language Editing",
      color: "bg-[#00A0E3]",
      iconBg: "bg-[#EAF5FB]",
      iconColor: "text-[#00A0E3]",
    },
    {
      title: "Proofreading",
      subtitle: "Error-Free Content Review",
      color: "bg-[#F59E0B]",
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#F59E0B]",
    },
    {
      title: "Formatting",
      subtitle: "Journal & Thesis Formatting",
      color: "bg-[#6EE7B7]",
      iconBg: "bg-[#ECFDF5]",
      iconColor: "text-[#10B981]",
    },
  ];

  const [rotation, setRotation] = useState(0);

  // Smooth clockwise rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % data.length);
    }, 1200); // Faster and smoother

    return () => clearInterval(interval);
  }, []);

  // Rotate array clockwise
  const items = data.map((_, index) => {
    return data[(index - rotation + data.length) % data.length];
  });

  return (
    <div className="relative w-full flex items-center justify-center py-6">
      <div className="relative w-full max-w-[760px] flex flex-col items-center gap-[20px]">
        {items.map((item, idx) => {
          const isActive = idx === 1; // Middle card highlighted

          return (
            <motion.div
              key={item.title}
              layout
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.94,
                opacity: isActive ? 1 : 0.85,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              className={`
                flex items-center bg-white border transition-all duration-300
                ${isActive
                  ? `
                    w-full 
                    2xl:w-[699px] 
                    h-[96px] 
                    p-4 
                    gap-[18px] 
                    rounded-[18px] 
                    border-[#00A0E3]/10
                    shadow-[0_20px_40px_rgba(0,0,0,0.06)]
                    z-20
                  `
                  : `
                    w-[92%] 
                    lg:w-[560px] 
                    h-[96px] 
                    p-4 
                    gap-4 
                    rounded-[16px] 
                    border-gray-200
                    shadow-[0_8px_20px_rgba(0,0,0,0.03)]
                    z-10
                  `
                }
              `}
            >
              {/* Colored Dot */}
              <div
                className={`w-[10px] h-[10px] rounded-full shrink-0 ${item.color} ${
                  isActive ? "scale-125" : "opacity-60"
                }`}
              />

              {/* Icon */}
              <div
                className={`flex items-center justify-center rounded-xl shrink-0
                  ${isActive ? "w-[52px] h-[52px]" : "w-[44px] h-[44px]"}
                  ${item.iconBg}`}
              >
                <svg
                  className={`${
                    isActive ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]"
                  } ${item.iconColor}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM13 3.5L18.5 9H13V3.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
                </svg>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3
                  className={`font-medium tracking-tight ${
                    isActive
                      ? "text-[16px] text-[#1C1C1D]"
                      : "text-[14px] text-[#1C1C1D]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`font-medium ${
                    isActive
                      ? "text-[14px] text-gray-400"
                      : "text-[12px] text-gray-400"
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>

              {/* Chevron */}
              <div className="w-[36px] h-[36px] rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm">
                <svg
                  className="w-[14px] h-[14px] text-[#4B5563]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


// Slide 3: Yellow background aligned right, Blue foreground aligned left
function Slide3Right() {
  return (
    <div className="relative w-full h-[390px] sm:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible">
      <div className="relative w-[340px] sm:w-[560px] lg:w-[620px] h-[390px] sm:h-[480px] mx-auto flex items-center justify-center transform scale-[0.94] sm:scale-[0.78] md:scale-[0.9] lg:scale-100 origin-center mt-4 sm:mt-0">
      {/* Background Yellow Card (Left) */}
      <motion.div
        animate={{ y: [0, -4, 0], scale: [0.96, 0.98, 0.96] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 sm:-left-6 top-0 sm:top-[30px] w-[210px] sm:w-[290px] bg-[#F6E9C8] border border-[#DEB860]/40 rounded-2xl p-4 sm:p-6 shadow-xl z-10"
      >
        
        <div className="absolute top-0 right-0 bg-[#D4A33B] text-white text-[10px] sm:text-[12px] font-normal px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-bl-[14px] sm:rounded-bl-[16px] rounded-tr-[14px] sm:rounded-tr-[16px]">
          You Save: $328
        </div>
        <h3 className="text-[#C18C28] font-normal text-[15px] sm:text-[17px] mb-1 sm:mb-1.5 tracking-tight border-b-0 pb-0 mt-3">Lorem ipsum dolor</h3>
        <p className="text-[11px] sm:text-[13px] text-[#A6781E] mb-4 sm:mb-6 leading-relaxed font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
        
        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-[13px] text-[#3E2B08] font-normal">
              <div className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] rounded-full bg-[#D4A33B] flex items-center justify-center shrink-0">
                <svg className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="truncate">Lorem ipsum dolor sit amet</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#D4A33B]/30 pt-3 sm:pt-4 mb-3 sm:mb-4">
          <div className="flex justify-between items-center text-[10px] sm:text-[12px] text-[#3E2B08] font-medium mb-1">
            <span>Get 6 services worth</span>
            <span className="font-normal line-through opacity-80">$1240</span>
          </div>
          <div className="flex justify-between items-end text-[#D4A33B]">
            <span className="text-[11px] sm:text-[13px] font-medium mb-0.5 sm:mb-1">For only:</span>
            <span className="font-extrabold text-[20px] sm:text-[24px] leading-none">$912</span>
          </div>
        </div>

        <button className="w-full py-2.5 sm:py-3 bg-[#111111] text-white rounded-lg text-[13px] sm:text-[14px] font-normal hover:bg-black shadow-md transition-all">
          Buy Now
        </button>
      </motion.div>

      {/* Foreground Blue Card (Right) */}
      <motion.div
        animate={{ y: [0, 8, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute right-0 sm:-right-2 bottom-1 sm:bottom-[10px] w-[230px] sm:w-[300px] bg-white border border-[#00A0E3]/70 rounded-2xl p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,160,227,0.15)] z-20"
      >
        <div className="absolute top-0 right-0 bg-[#00A0E3] text-white text-[10px] sm:text-[12px] font-normal px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-bl-[14px] sm:rounded-bl-[16px] rounded-tr-[14px] sm:rounded-tr-[16px]">
          You Save: $328
        </div>
        <h3 className="text-[#00A0E3] font-normal text-[15px] sm:text-[18px] mb-1 sm:mb-1.5 tracking-tight border-b-0 pb-0 mt-3">Lorem ipsum dolor</h3>
        <p className="text-[11px] sm:text-[13px] text-[#6B7280] mb-4 sm:mb-6 leading-relaxed font-medium tracking-wide">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
        
        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-[13px] text-[#1C1C1D] font-normal font-sans tracking-tight">
              <div className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] rounded-full bg-[#00A0E3] flex items-center justify-center shrink-0">
                <svg className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="truncate">Lorem ipsum dolor sit amet</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 pt-3 sm:pt-4 mb-3 sm:mb-4">
          <div className="flex justify-between items-center text-[10px] sm:text-[12px] text-gray-500 font-medium mb-1">
            <span>Get 6 services worth</span>
            <span className="font-normal line-through text-[#1C1C1D] opacity-80">$1240</span>
          </div>
          <div className="flex justify-between items-end text-[#00A0E3]">
            <span className="text-[11px] sm:text-[13px] font-medium mb-0.5 sm:mb-1">For only:</span>
            <span className="font-extrabold text-[22px] sm:text-[26px] leading-none">$912</span>
          </div>
        </div>

        <button className="w-full py-2.5 sm:py-3 bg-[#00A0E3] text-white rounded-lg text-[13px] sm:text-[14px] font-normal hover:bg-[#028ac7] shadow-md transition-all">
          Buy Now
        </button>
      </motion.div>
      </div>
    </div>
  );

}

