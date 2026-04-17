"use client";

import Image from "next/image";

export function ServiceWhyChoose() {
  return (
    <section className="bg-[#F8F8F8] py-10 sm:py-16 lg:py-20">
      <div className="landing-shell flex flex-col justify-center gap-8 sm:gap-10 lg:gap-[62px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-[62px]">
          <div className="flex w-full max-w-[651px] flex-col gap-6 sm:gap-6">
            <div className="landing-section-badge mb-0 h-8 w-fit px-3">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="8" cy="8" r="8" fill="#00A0E3" />
                <path d="M4 8L7 11L12 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="landing-section-badge-text whitespace-nowrap">
                LOREM IPSUM
              </span>
            </div>

            <div className="flex flex-col gap-3 max-w-[608px]">
              <h2 className="font-inter text-[28px] sm:text-[32px] font-medium leading-[1.1] text-[#1C1C1D] text-center lg:text-left max-w-[415px] lg:max-w-none">
                Why Choose Submit Right?
              </h2>
              <p className="font-inter text-[14px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.4] text-[#78788D] text-center lg:text-left max-w-[608px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis eu vel habitant cursus.
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-[567px] grid-cols-3 gap-3 sm:gap-6 lg:gap-0 lg:flex lg:items-start lg:justify-between">
            <div className="flex flex-col items-center gap-2 text-center w-full lg:w-[146px]">
              <span className="font-inter text-[20px] sm:text-[24px] font-semibold leading-[1.1] text-[#00A0E3]">2M+</span>
              <span className="font-inter text-[14px] sm:text-[16px] font-normal leading-[1.4] text-[#1C1C1D]">Manuscripts Edited</span>
            </div>
            <div className="hidden lg:block h-[58px] w-px bg-[linear-gradient(180deg,rgba(0,160,227,0)_0%,#00A0E3_50%,rgba(0,160,227,0)_100%)]" />
            <div className="flex flex-col items-center gap-2 text-center w-full lg:w-[159px]">
              <span className="font-inter text-[20px] sm:text-[24px] font-semibold leading-[1.1] text-[#00A0E3]">3000+</span>
              <span className="font-inter text-[14px] sm:text-[16px] font-normal leading-[1.4] text-[#1C1C1D]">Subject Area Experts</span>
            </div>
            <div className="hidden lg:block h-[58px] w-px bg-[linear-gradient(180deg,rgba(0,160,227,0)_0%,#00A0E3_50%,rgba(0,160,227,0)_100%)]" />
            <div className="flex flex-col items-center gap-2 text-center w-full lg:w-[132px] lg:self-start">
              <span className="font-inter text-[20px] sm:text-[24px] font-semibold leading-[1.1] text-[#00A0E3]">2 Million+</span>
              <span className="font-inter text-[14px] sm:text-[16px] font-normal leading-[1.4] text-[#1C1C1D]">Papers Enhanced</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start">
          <div className="flex w-full flex-col gap-3 sm:gap-4 lg:w-[716px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="box-border flex h-auto min-h-[138px] flex-col gap-5 rounded-[16px] border border-[#ECECEC] bg-white p-4 lg:h-[188px] lg:w-[346px] lg:p-6 lg:px-8 lg:py-6">
                <Image src="/serv2/24.png" alt="24x7 support icon" width={36} height={36} className="h-6 w-6" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-inter text-[18px] lg:text-[20px] font-medium leading-[1.1] text-[#1C1C1D]">
                    24x7 Support Available
                  </h3>
                  <p className="font-inter text-[14px] font-normal leading-[1.2] text-[#78788D]">
                    Round-the-clock support, responses within an hour.
                  </p>
                </div>
              </div>

              <div className="box-border flex h-auto min-h-[138px] flex-col gap-5 rounded-[16px] border border-[#ECECEC] bg-white p-4 lg:h-[188px] lg:w-[346px] lg:p-6 lg:px-8 lg:py-6">
                <Image src="/serv2/mon.png" alt="money back icon" width={16} height={16} className="h-6 w-6" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-inter text-[18px] lg:text-[20px] font-medium leading-[1.1] text-[#1C1C1D]">
                    100% Money Back Guarantee
                  </h3>
                  <p className="font-inter text-[14px] font-normal leading-[1.2] text-[#78788D]">
                    If you are not satisfied with our quality, we will refund your entire editing fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="box-border flex h-auto min-h-[138px] flex-col gap-5 rounded-[16px] border border-[#ECECEC] bg-white p-4 lg:h-[171px] lg:w-full lg:px-8 lg:py-6">
              <Image src="/serv2/ima.png" alt="security icon" width={36} height={36} className="h-6 w-6" />
              <div className="flex flex-col gap-2">
                <h3 className="font-inter text-[18px] lg:text-[20px] font-medium leading-[1.1] text-[#1C1C1D]">
                  Certified Data Security Standards
                </h3>
                <p className="font-inter text-[14px] font-normal leading-[1.2] text-[#78788D] max-w-[652px]">
                  We use ISO/IEC 27001:2022 certified security systems.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[256px] w-full overflow-hidden rounded-[20px] lg:h-[383px] lg:w-[540px] lg:rounded-[24px]">
            <Image
              src="/images/signin.jpg"
              alt="Office workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}