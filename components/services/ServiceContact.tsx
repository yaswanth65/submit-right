"use client";

import { Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export function ServiceContact() {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20">
      <div className="landing-shell flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-[62px] text-center">
        <div className="flex w-full max-w-[676px] flex-col items-center gap-6">
          <div className="landing-section-badge mb-0 h-[30px] w-fit px-3 sm:h-8 sm:px-3.5">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="8" cy="8" r="8" fill="#00A0E3" />
              <path d="M4 8L7 11L12 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="landing-section-badge-text whitespace-nowrap">
              LOREM IPSUM
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <h2 className="font-inter text-[28px] sm:text-[32px] font-medium leading-[1.1] text-[#1C1C1D] max-w-[609px]">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className="font-inter text-[14px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.4] text-[#78788D] max-w-[676px]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1280px] overflow-hidden rounded-[20px] border border-[#00A0E3] bg-[#F3F9FC]">
          <div className="flex flex-col lg:flex-row lg:items-stretch divide-y divide-[#00A0E3] lg:divide-y-0 lg:divide-x lg:divide-[#00A0E3]">
            <div className="flex h-auto min-h-[188px] w-full flex-col justify-between gap-6 bg-[#00A0E3] px-4 py-4 text-left text-white sm:px-6 sm:py-6 lg:min-h-[238px] lg:w-[378px] lg:px-6 lg:py-6">
              <div className="flex flex-col gap-3 max-w-[330px]">
                <h3 className="font-inter text-[18px] sm:text-[20px] font-semibold leading-[1.2] text-white max-w-[330px]">
                  Lorem ipsum dolor sit amet consectetur
                </h3>
                <p className="font-inter text-[14px] font-normal leading-[1.2] text-white max-w-[330px]">
                  Round-the-clock support, responses within an hour.
                </p>
              </div>

              <Link
                href="/packages"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-3 text-[14px] sm:text-[16px] font-medium leading-[1.2] text-[#00A0E3] transition-colors hover:bg-[#F6FBFE]"
              >
                Order Now
              </Link>
            </div>

            <div className="flex h-auto min-h-[158px] w-full flex-col items-center justify-center gap-5 bg-[#F3F9FC] px-4 py-6 text-center sm:px-5 sm:py-6 lg:min-h-[238px] lg:w-[300px] lg:px-6 lg:py-6">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DEEFF7] sm:h-[62px] sm:w-[62px]">
                <Phone className="h-5 w-5 text-[#00A0E3] sm:h-7 sm:w-7" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-center gap-2 max-w-[235px]">
                <p className="font-inter text-[14px] leading-[1.2] text-[#78788D]">
                  Call us on during business hours on
                </p>
                <p className="font-inter text-[14px] sm:text-[16px] font-semibold leading-[1.2] text-[#1C1C1D]">
                  + (669) 272-1214
                </p>
              </div>
            </div>

            <div className="flex h-auto min-h-[158px] w-full flex-col items-center justify-center gap-5 bg-[#F3F9FC] px-4 py-6 text-center sm:px-5 sm:py-6 lg:min-h-[238px] lg:w-[300px] lg:px-6 lg:py-6">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DEEFF7] sm:h-[62px] sm:w-[62px]">
                <Mail className="h-5 w-5 text-[#00A0E3] sm:h-7 sm:w-7" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-center gap-2 max-w-[235px]">
                <p className="font-inter text-[14px] leading-[1.2] text-[#78788D]">
                  Send in your queries to
                </p>
                <p className="font-inter text-[14px] sm:text-[16px] font-semibold leading-[1.2] text-[#1C1C1D]">
                  request@submit.com
                </p>
              </div>
            </div>

            <div className="flex h-auto min-h-[148px] w-full flex-col items-center justify-center gap-5 bg-[#F3F9FC] px-4 py-6 text-center sm:px-5 sm:py-6 lg:min-h-[238px] lg:w-[300px] lg:px-6 lg:py-6">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DEEFF7] sm:h-[62px] sm:w-[62px]">
                <MessageSquare className="h-5 w-5 text-[#00A0E3] sm:h-7 sm:w-7" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-center gap-2 max-w-[185px]">
                <p className="font-inter text-[14px] leading-[1.2] text-[#78788D]">
                  Chat with a client manager for instant answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}