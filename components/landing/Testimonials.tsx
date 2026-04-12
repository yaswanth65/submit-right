"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const testimonials = [
    { 
      name: "Dr. Priya Sharma", 
      role: "Publication-Ready Editing", 
      quote: "I had submitted to three journals and been rejected each time. After Submit Right's editing, my paper was accepted on the first attempt. The structural feedback alone was worth it.",
      col: 1 
    },
    { 
      name: "Sneha Patil", 
      role: "Language Clarity Editing", 
      quote: "I had a 48-hour deadline and was panicking. They delivered clean, precise editing within 24 hours. No shortcuts, no errors  exactly what I needed before submitting.",
      col: 1 
    },
    { 
      name: "Ahmed Al-Rashid", 
      role: "High-Impact Editing", 
      quote: "English is not my first language and I was worried my research wouldn't be taken seriously. Submit Right completely transformed my manuscript. My supervisor was genuinely surprised.",
      col: 2 
    },
    { 
      name: "Prof. James Okonkwo", 
      role: "Scientific Writing Package", 
      quote: "We use Submit Right for our entire research lab. The systematic review package is outstanding  PRISMA-compliant, structured, and publication-ready every single time.",
      col: 2 
    },
    { 
      name: "Dr. Liu Wei", 
      role: "Translation + Editing", 
      quote: "Fast, professional, and thorough. My paper went from translated draft to journal-ready in under a week. The real-time tracking gave me complete peace of mind throughout the process.",
      col: 3 
    },
    { 
      name: "Dr. Ayesha Noor", 
      role: "Thesis Excellence Editing", 
      quote: "Every revision request from my committee was handled during re-editing at no extra cost. The attention to detail was remarkable. My thesis defense went without a single language-related question.",
      col: 3 
    },
  ];

  // Split columns
  const col1 = testimonials.filter((t) => t.col === 1);
  const col2 = testimonials.filter((t) => t.col === 2);
  const col3 = testimonials.filter((t) => t.col === 3);

  const columns = [col1, col2, col3];

  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileRef = useRef<HTMLDivElement>(null);

  const [heights, setHeights] = useState([0, 0, 0]);
  const [mobileHeight, setMobileHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      const h = refs.map((r) => r.current?.offsetHeight || 0);
      setHeights(h);
      setMobileHeight(mobileRef.current?.offsetHeight || 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const Card = ({ t }: any) => (
    <div className="box-border flex flex-col items-start p-6 gap-5 lg:gap-[33px] w-[361px] max-w-full h-[178px] lg:w-[413.33px] lg:h-[200px] bg-white border border-[#ECECEC] rounded-[14px]">
      <div className="flex items-center gap-3 w-[313px] max-w-full h-[50px] lg:w-[365.33px]">
      <div className="w-[50px] h-[50px] rounded-full bg-[#F3F9FC] overflow-hidden shrink-0">
  <img
    src="/avatar.jpg" // Replace with your image path
    alt="Sarah Williams"
    className="w-full h-full object-cover"
  />
</div>
        <div className="flex flex-col items-start gap-2 flex-1 w-[251px] lg:w-[303.33px]">
          <div className="font-inter font-medium text-[16px] leading-[110%] text-[#1C1C1D]">
            {t.name}
          </div>
          <div className="font-inter font-normal text-[14px] leading-[120%] text-[#78788D] w-full">{t.role}</div>
        </div>
      </div>

      <p className="font-inter font-normal text-[14px] leading-[140%] text-[#78788D] w-[313px] max-w-full lg:w-[365.33px]">
        {t.quote}
      </p>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FAFAFA] overflow-hidden">
      <div className="landing-shell">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="landing-section-badge">
            <span className="text-[14px]">❝</span>
            <span className="landing-section-badge-text">
              REAL RESULTS
            </span>
          </div>

          <h2 className="landing-section-title">
            Researchers Who Got Published Are Talking
          </h2>

          <p className="landing-section-description">
            Over 50,000 manuscripts edited and delivered. Here's what the researchers who trust Submit Right have to say.
          </p>
        </div>

        {/* Animated Columns */}
        <div className="hidden md:grid grid-cols-3 gap-6 w-full">

          {columns.map((col, i) => {
            const h = heights[i] || 0;

            const isMiddle = i === 1;

            const yFrom = isMiddle ? 0 : -h;
            const yTo = isMiddle ? -h : 0;

            return (
              <div
                key={i}
                className={`relative h-[600px] overflow-hidden ${
                  isMiddle ? "md:-mt-8" : ""
                }`}
              >
                {/* Fade effect */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10" />

                <motion.div
                  animate={{ y: [yFrom, yTo] }}
                  transition={{
                    duration: isMiddle ? 90 : 80,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="flex flex-col gap-6"
                >
                  {/* Infinite loop trick */}
                  <div ref={refs[i]} className="flex flex-col gap-6">
                    {col.map((t, idx) => (
                      <Card key={idx} t={t} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-6">
                    {col.map((t, idx) => (
                      <Card key={`dup-${idx}`} t={t} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-6">
                    {col.map((t, idx) => (
                      <Card key={`dup2-${idx}`} t={t} />
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}

        </div>

        {/* Mobile (single-column infinite scroll) */}
        <div className="md:hidden max-w-[430px] mx-auto">
          <div className="relative h-[520px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10" />

            <motion.div
              animate={{ y: [0, -(mobileHeight || 1)] }}
              transition={{
                duration: 75,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <div ref={mobileRef} className="flex flex-col gap-4 sm:gap-6">
                {testimonials.map((t, i) => (
                  <Card key={`m-${i}`} t={t} />
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:gap-6">
                {testimonials.map((t, i) => (
                  <Card key={`m-dup-${i}`} t={t} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}