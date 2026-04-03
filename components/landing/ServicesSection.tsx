import Link from "next/link";
import { Check } from "lucide-react";

export function ServicesSection() {
  const features = [
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#F3F9FC]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="max-w-[480px]">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-[#E2F1F8] rounded-full mb-4">
              <span className="text-[11px] font-medium text-[#015375] uppercase tracking-wide">
                Lorem Ipsum
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[28px] lg:text-[34px] font-medium text-[#1C1C1D] leading-[1.15] mb-4">
              Lorem ipsum dolor sit amet consectetur
            </h2>

            {/* Description */}
            <p className="text-[15px] text-[#78788D] leading-[1.6] mb-5">
              Lorem ipsum dolor sit amet consectetur. Sagittis ac sed felis liber cursus. 
              Elementum auctor.
            </p>

            {/* Features List */}
            <ul className="space-y-2.5 mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#00A0E3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-[#78788D]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href="#"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Right Content - Illustration Placeholder */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Replace with: <img src="/images/services-illustration.png" alt="Services" className="w-full max-w-[420px]" /> */}
            <div className="w-full max-w-[420px] h-[300px] bg-[#E8F4F8] rounded-2xl flex items-center justify-center border border-[#D0E8F5]">
              <div className="text-center text-[#78788D]">
                <svg className="w-16 h-16 mx-auto mb-3 text-[#00A0E3] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[13px]">Illustration Placeholder</p>
                <p className="text-[11px] mt-1 text-[#A0A0A0]">services-illustration.png</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
