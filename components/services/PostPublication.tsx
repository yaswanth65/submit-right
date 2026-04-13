"use client";

import Image from "next/image";
import { Check, Clock } from "lucide-react";

export function PostPublication() {
  return (
    <section className="py-20 sm:py-[80px] bg-white relative overflow-hidden">
      <div className="landing-shell flex flex-col items-center text-center gap-10 sm:gap-[62px]">
        <div className="flex flex-col items-center gap-6 w-full max-w-[676px]">
          <div className="landing-section-badge mb-0 h-[30px] sm:h-[32px] px-3 sm:px-3.5">
            <img src="/q.svg" alt="icon" className="w-4 h-4" />
            <span className="landing-section-badge-text whitespace-nowrap">
              LOREM IPSUM
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <h2 className="font-inter text-[28px] sm:text-[32px] font-medium leading-[1.1] text-[#1C1C1D] max-w-[609px]">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className="font-inter text-[14px] sm:text-[18px] font-normal leading-[1.4] text-[#78788D] max-w-[676px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-[1280px] flex-col gap-8 sm:gap-10">
          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-[42px]">
            <div className="relative w-full lg:w-[620px] h-[220px] sm:h-[280px] rounded-[20px_20px_0_0] bg-[#F3F9FC] border-b-4 border-[#00A0E3] isolate overflow-hidden px-4 sm:px-7 pt-4 sm:pt-12 pb-0">
              <div className="absolute left-1 sm:left-6 top-4 sm:top-11 h-[28px] w-[46px] rounded-[4px] bg-[#DAEDF6] opacity-80" />
              <div className="absolute right-3 sm:right-[28px] top-[-10px] sm:top-[13px] h-[28px] w-[46px] rounded-[4px] bg-[#DAEDF6] opacity-80" />
              <div className="absolute left-1 sm:left-4 bottom-4 sm:bottom-[20px] h-[16px] w-[26px] rounded-[4px] bg-[#DAEDF6] opacity-80" />
              <div className="absolute right-[-16px] sm:right-[-30px] bottom-4 sm:bottom-5 h-[36px] w-[60px] rounded-[4px] bg-[#DAEDF6] opacity-80" />

              <div className="relative z-10 mx-auto flex h-full w-full max-w-[500px] items-end justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_0_27.1px_rgba(0,160,227,0.12)]">
                <Image
                  src="/services1/pp.png"
                  alt="Post publication preview"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 620px, 500px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="w-full lg:w-[618px] flex flex-col items-start gap-6 sm:gap-6 pt-0 lg:pt-1 text-left">
              <div className="inline-flex h-10 items-center rounded-full border border-[#00A0E3] bg-white px-3 pr-4">
                <div className="flex h-10 w-10 -ml-3 items-center justify-center rounded-full border border-[#00A0E3] bg-[#DEEFF7]">
                  <Clock size={14} className="text-[#00A0E3]" />
                </div>
                <span className="pl-2 font-inter text-[12px] sm:text-[14px] font-medium leading-[1.2] text-[#00A0E3] whitespace-nowrap">
                  FAST DELIVERY
                </span>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-[618px]">
                <h3 className="font-inter text-[20px] sm:text-[24px] font-medium leading-[1.1] text-[#1C1C1D]">
                  Post Publication
                </h3>
                <div className="flex flex-col gap-3">
                  <p className="font-inter text-[14px] sm:text-[16px] font-normal leading-[1.2] text-[#78788D] max-w-[618px]">
                    Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
                  </p>
                  <p className="font-inter text-[14px] sm:text-[16px] font-normal leading-[1.2] text-[#78788D] max-w-[618px]">
                    Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam.
                  </p>
                </div>
              </div>

              <button className="inline-flex h-12 w-[152px] items-center justify-center rounded-full bg-[#00A0E3] px-3 text-[14px] sm:text-[16px] font-medium leading-[1.2] text-white transition-colors hover:bg-[#008cc2]">
                Order Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[52px]">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#ECECEC] bg-[rgba(255,255,255,0.64)] shadow-[0_7px_17px_-12px_rgba(28,28,29,0.1)]">
                  <Check size={16} className="text-[#1C1C1D]" strokeWidth={3} />
                </div>
                <h4 className="font-inter text-[14px] sm:text-[16px] lg:text-[20px] font-medium leading-[1.2] text-[#1C1C1D] max-w-[281px]">
                  Lorem ipsum dolor sit amet consectetur
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}