"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const testimonials = [
    { name: "Sarah Williams", role: "Editing", col: 1 },
    { name: "Sarah Williams", role: "Editing", col: 1 },
    { name: "Sarah Williams", role: "Editing", col: 2 },
    { name: "Sarah Williams", role: "Editing", col: 2 },
    { name: "Sarah Williams", role: "Editing", col: 3 },
    { name: "Sarah Williams", role: "Editing", col: 3 },
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

  const [heights, setHeights] = useState([0, 0, 0]);

  useEffect(() => {
    const measure = () => {
      const h = refs.map((r) => r.current?.offsetHeight || 0);
      setHeights(h);
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
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
        Elementum suscipit donec viverra posuere at lorem nullam.
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
              TESTIMONIALS
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
            Customer Real Experiences That Inspire Everybody
          </h2>

          <p className="text-[13px] sm:text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant
            cursus. Elementum suscipit donec viverra posuere at lorem nullam.
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

        {/* Mobile (simple scroll) */}
        <div className="md:hidden space-y-4 sm:space-y-6">
          {testimonials.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}