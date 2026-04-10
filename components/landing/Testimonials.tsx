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
    <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-[#F0F0F0] shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#F3F9FC] overflow-hidden">
          <div className="w-full h-full bg-[#E5E5E5]" />
        </div>
        <div>
          <div className="text-[13px] sm:text-[14px] font-normal text-[#1C1C1D]">
            {t.name}
          </div>
          <div className="text-[12px] text-[#A0A0A0]">{t.role}</div>
        </div>
      </div>

      <p className="text-[12px] sm:text-[13px] text-[#65656D] leading-relaxed">
        {t.quote}
      </p>
    </div>
  );

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
            <span className="text-[14px]">❝</span>
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              REAL RESULTS
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
            Researchers Who Got Published Are Talking
          </h2>

          <p className="text-[13px] sm:text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Over 50,000 manuscripts edited and delivered. Here's what the researchers who trust Submit Right have to say.
          </p>
        </div>

        {/* Animated Columns */}
        <div className="hidden md:grid grid-cols-3 gap-6 max-w-6xl mx-auto">

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