'use client';

import { useState } from 'react';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';
import Image from 'next/image';

const steps = [
  { id: 1, title: 'Write Your Document' },
  { id: 2, title: 'Get Expert Editing' },
  { id: 3, title: 'Find Top Journals' },
  { id: 4, title: 'Journal Desk Review' },
  { id: 5, title: 'Revise and Resubmit' },
  { id: 6, title: 'Create Visuals' },
];

export function ResearchStages() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white max-sm:[&_p]:text-[12px] max-sm:[&_p]:leading-[1.45]">
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Badge */}
          <div className="landing-section-badge">
            <img src="/q.svg" alt="icon" className="w-4 h-4" />
            <span className="landing-section-badge-text">
              Lorem Ipsum Dolor
            </span>
          </div>

          <h2 className="landing-section-title">
            Solutions for Every Stage of Your Research
          </h2>

          <p className="landing-section-description">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
            <br className="hidden sm:block" />
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-8 mb-5 sm:mb-8 items-stretch">
          {/* Sidebar Steps */}
          <div className="lg:col-span-1 flex lg:flex-col max-sm:gap-3 sm:gap-2.5 lg:gap-3 overflow-x-auto snap-x lg:overflow-visible lg:snap-none pb-2 lg:pb-0 custom-scrollbar max-sm:items-start">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex-none text-left max-sm:box-border max-sm:w-[130px] max-sm:h-[79px] max-sm:p-3 sm:p-3.5 lg:p-4 max-sm:rounded-[10px] sm:rounded-xl max-sm:border transition-all duration-200 snap-center max-sm:min-w-[130px] sm:min-w-[200px] lg:min-w-0 ${
                  activeStep === step.id
                    ? 'max-sm:bg-[#F3F9FC] max-sm:border-[#00A0E3] sm:border-[#00A0E3] sm:bg-[#F8FCFF] sm:shadow-sm'
                    : 'max-sm:bg-white max-sm:border-[#ECECEC] sm:border-[#ECECEC] sm:bg-white sm:hover:border-[#00A0E3]/50'
                }`}
              >
                <div
                  className={`text-[12px] sm:text-xs font-medium leading-[110%] mb-2 ${
                    activeStep === step.id ? 'text-[#1C1C1D]' : 'text-[#78788D]'
                  }`}
                >
                  STEP {step.id}
                </div>
                <div
                  className={`text-[14px] sm:text-[15px] font-medium leading-[120%] max-sm:max-w-[106px] ${
                    activeStep === step.id ? 'text-[#00A0E3]' : 'text-[#1C1C1D]'
                  }`}
                >
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 min-h-0 h-full">
            {activeStep === 1 && <Step1Content />}
            {activeStep === 2 && <Step2Content />}
            {activeStep === 3 && <Step3Content />}
            {activeStep === 4 && <Step4Content />}
            {activeStep === 5 && <Step5Content />}
            {activeStep === 6 && <Step6Content />}
          </div>
        </div>

        {/* Bottom Steps (7 & 8) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          <Step7Content />
          <Step8Content />
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Step Components Below
// -------------------------------------------------------------

function Step1Content() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-[#F8F8F8] rounded-[14px] p-6 border border-[#ECECEC] flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <div className="text-[14px] font-medium text-[#00A0E3] uppercase tracking-wider leading-[110%]">Our Tool</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00A0E3] rounded-full flex items-center justify-center text-white font-normal text-xs">B</div>
            <span className="text-[24px] font-medium text-[#1C1C1D] leading-[110%]">Logoispsum</span>
          </div>
        </div>
        <h3 className="text-[24px] font-medium text-[#1C1C1D] mb-2 leading-[110%]">Beentu AI Writing</h3>
        <p className="text-[#78788D] text-[15px] font-normal mb-4 max-w-2xl leading-[120%]">
          Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
          Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
          tincidunt enim nascetur sed.
        </p>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-5 h-[46px] mt-5 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#F8F8F8] rounded-[14px] p-6 border border-[#ECECEC] flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <div className="text-[14px] font-medium text-[#00A0E3] uppercase tracking-wider leading-[110%]">Our Tool</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00A0E3] rounded-full flex items-center justify-center text-white font-normal text-xs">S</div>
            <span className="text-[24px] font-medium text-[#1C1C1D] leading-[110%]">Logoispsum</span>
          </div>
        </div>
        <h3 className="text-[18px] font-medium text-[#1C1C1D] mb-2 leading-[110%]">Submit Right Service</h3>
        <p className="text-[#78788D] text-[15px] font-normal mb-4 max-w-2xl leading-[120%]">
          Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
          Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
          tincidunt enim nascetur sed.
        </p>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-5 h-[46px] mt-5 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Step2Content() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {[1, 2].map((i) => (
        <div key={i} className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col h-full overflow-hidden">
          <h3 className="text-lg font-normal text-[#1C1C1D] mb-1">Lorem ipsum dolor sit</h3>
          <p className="text-[#65656D] text-xs mb-4 pb-4 border-b border-gray-200 border-b">
            amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
          
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 border-b">
            <div>
              <div className="text-xs text-[#65656D]">Starts from</div>
              <div className="text-xl font-normal text-[#1C1C1D]">
                $0.0425 <span className="text-xs text-[#65656D] font-normal">/per word</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 bg-[#00A0E3] text-white px-4 py-3 rounded-full text-xs font-medium hover:bg-[#0088CC] whitespace-nowrap">
              Submit Enquiry <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 mb-4 pb-4 border-b border-gray-200 border-b">
            {['Lorem ipsum consectetur adipiscing', 'sed do eiusmod tempor', 'amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit'].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-[#65656D]">
                <Check className="w-3.5 h-3.5 text-gray-400 shrink-0" /> <span className="truncate">{feat}</span>
              </div>
            ))}
            <a href="#" className="inline-block text-xs font-medium text-[#00A0E3] hover:underline mt-1">Learn more</a>
          </div>

          <div className="mt-auto">
            <h4 className="text-xs font-normal text-[#1C1C1D] mb-2">Lorem ipsum dolor sit</h4>
            <ul className="space-y-1.5 text-xs text-[#65656D]">
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">Lorem ipsum consectetur adipiscing</li>
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">sed do eiusmod tempor</li>
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">amet, consectetur adipiscing elit.</li>
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">Lorem ipsum dolor sit</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function Step3Content() {
  return (
    <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
      <div className="inline-flex items-center justify-center text-[#00A0E3] font-normal mb-3 self-start">
        <HomeIcon className="w-5 h-5 mr-1" /> Beentu <ArrowRight className="w-4 h-4 ml-1" />
      </div>
      <p className="text-[#1C1C1D] font-medium leading-relaxed mb-6 max-w-3xl text-sm">
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
        Elementum suscipit donec viverra posuere at lorem nullam.
      </p>
      
      {/* Placeholder for dashboard image - using a div that visually resembles a dashboard UI skeleton */}
        {/* Placeholder for dashboard screenshot */}
        <img src="/d.png" alt="icon" className="w-full h-full object-cover" />
      
    </div>
  );
}

  function Step4Content() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-full">
        {/* Top Left */}
          <div className="box-border flex h-full flex-col items-start justify-between gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
                Lorem ipsum dolor
              </h3>
              <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
                Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
                tincidunt enim nascetur sed.
              </p>
            </div>
            <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
              <span className="text-center">Explore Now</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-white" />
            </button>
          </div>
        {/* Top Right */}
          <div className="box-border flex h-full flex-col items-start justify-between gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
                Lorem ipsum dolor
              </h3>
              <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
                Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
                tincidunt enim nascetur sed.
              </p>
            </div>
            <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
              <span className="text-center">Explore Now</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-white" />
            </button>
          </div>
        {/* Bottom Left */}
          <div className="box-border flex h-full flex-col items-start justify-between gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
                Lorem ipsum dolor
              </h3>
              <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
                Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
                tincidunt enim nascetur sed.
              </p>
            </div>
            <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
              <span className="text-center">Explore Now</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-white" />
            </button>
          </div>
        {/* Bottom Right */}
          <div className="box-border flex h-full flex-col items-start justify-between gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
                Lorem ipsum dolor
              </h3>
              <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
                Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
                Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
                tincidunt enim nascetur sed.
              </p>
            </div>
            <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
              <span className="text-center">Explore Now</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-white" />
            </button>
          </div>
      </div>
    );
  }

function Step5Content() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top Card */}
      <div className="box-border flex h-full flex-col items-start justify-between gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
            Lorem ipsum dolor
          </h3>
          <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
            Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
            tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor
            viverra senectus eget enim purus enim congue.
          </p>
        </div>
        <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
          <span className="text-center">Explore Now</span>
          <ArrowRight className="h-5 w-5 shrink-0 text-white" />
        </button>
      </div>
      
      {/* Bottom Card */}
      <div className="box-border flex h-full flex-col items-start justify-between gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
            Lorem ipsum dolor
          </h3>
          <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
            Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
            tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor
            viverra senectus eget enim purus enim congue.
          </p>
        </div>
        <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
          <span className="text-center">Explore Now</span>
          <ArrowRight className="h-5 w-5 shrink-0 text-white" />
        </button>
      </div>
    </div>
  );
}

function Step6Content() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="box-border flex h-full min-h-[538px] flex-col items-start gap-[18px] rounded-[14px] border border-[#ECECEC] bg-[#F8F8F8] p-6"
        >
          <div className="flex w-full flex-col items-start gap-3 self-stretch">
            <h3 className="text-[24px] font-medium leading-[110%] text-[#1C1C1D]">
              Lorem ipsum dolor
            </h3>
            <p className="text-[16px] font-normal leading-[120%] text-[#78788D]">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
              Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi
              tincidunt enim nascetur sed.
            </p>
          </div>

          <div className="h-px w-full bg-[#E7E7E9]" />

          <div className="flex w-full flex-1 flex-col items-start gap-3 self-stretch">
            {[
              'Lorem ipsum consectetur adipiscing',
              'sed do eiusmod tempor',
              'amet, consectetur adipiscing elit.',
              'Lorem ipsum dolor sit',
            ].map((feat, idx) => (
              <div key={idx} className="flex w-full items-center gap-1.5">
                <Check className="h-[18px] w-[18px] shrink-0 text-[#78788D]" />
                <span className="text-[16px] font-normal leading-[120%] text-[#78788D]">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <button className="inline-flex h-12 w-[162px] items-center justify-center gap-1.5 rounded-full bg-[#00A0E3] px-3 text-[16px] font-medium leading-[120%] text-white transition-colors hover:bg-[#0088CC]">
            <span className="text-center">Explore Now</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}

function Step7Content() {
  return (
    <div className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 flex flex-col h-full">
      <div className="text-xs font-normal text-[#00A0E3] uppercase tracking-wider mb-2">STEP 7</div>
      <h3 className="text-2xl font-normal text-[#1C1C1D] mb-3">Publication Support</h3>
      <p className="text-[#65656D] text-sm mb-8 max-w-md">
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
        Elementum suscipit donec viverra posuere at lorem nullam.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        {/* Yellow Card */}
        <div className="rounded-[14px] border border-[#CEA02D] bg-[#F4E9CD] p-6 relative overflow-hidden flex flex-col">
  
  {/* Badge */}
  <div className="absolute top-0 right-0 bg-[#CEA02D] text-white text-xs font-semibold px-4 py-1.5 rounded-bl-[24px]">
    You Save: $328
  </div>

  {/* Title & Description */}
  <h4 className="text-[18px] font-semibold text-[#CEA02D] leading-[120%]">
    Lorem ipsum dolor
  </h4>
  <p className="text-[14px] font-normal text-[#78788D] leading-[120%] mb-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing.
  </p>

  {/* Features */}
  <div className="space-y-2.5 mb-6">
    {[
      "Lorem ipsum dolor",
      "consectetur adipiscing",
      "Lorem ipsum dolor sit amet",
    ].map((feat, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 text-[14px] text-[#1C1C1D] font-medium leading-[120%]"
      >
        <div className="w-[18px] h-[18px] rounded-full bg-[#CEA02D] text-white flex items-center justify-center shrink-0">
          <Check className="w-3 h-3" />
        </div>
        {feat}
      </div>
    ))}
  </div>

  {/* Pricing & CTA */}
  <div className="mt-auto">
    <div className="flex items-end justify-between border-t border-[#CEA02D]/50 pt-4 mb-4">
      <div className="text-[14px] text-[#525866] leading-[120%]">
        Get 8 services worth<br />
        For only:
      </div>

      <div className="text-right">
        <div className="text-[14px] text-[#171717] line-through font-medium">
          $1240
        </div>
        <div className="text-[20px] font-bold text-[#CEA02D]">
          $912
        </div>
      </div>
    </div>

    {/* Button */}
    <button className="w-full bg-[#0A0A0A] text-white py-[6px] rounded-full text-[14px] font-medium hover:bg-black transition-colors">
      Buy Now
    </button>
  </div>
</div>

        {/* Blue Card */}
    <div className="rounded-[14px] border border-[#00A0E3] bg-[#EFF7FB] p-6 relative overflow-hidden flex flex-col">
  
  {/* Badge */}
  <div className="absolute top-0 right-0 bg-[#00A0E3] text-white text-[12px] font-semibold px-[14px] py-[6px] rounded-bl-[24px]">
    You Save: $328
  </div>

  {/* Title & Description */}
  <h4 className="text-[18px] font-semibold text-[#00A0E3] leading-[120%]">
    Lorem ipsum dolor
  </h4>
  <p className="text-[14px] font-normal text-[#78788D] leading-[120%] mb-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing.
  </p>

  {/* Features */}
  <div className="space-y-[10px] mb-6">
    {[
      "Lorem ipsum dolor",
      "consectetur adipiscing",
      "Lorem ipsum dolor sit amet",
    ].map((feat, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 text-[14px] text-[#1C1C1D] font-medium leading-[120%]"
      >
        <div className="w-[18px] h-[18px] rounded-full bg-[#00A0E3] text-white flex items-center justify-center shrink-0">
          <Check className="w-3 h-3" />
        </div>
        {feat}
      </div>
    ))}
  </div>

  {/* Pricing Section */}
  <div className="mt-auto">
    <div className="flex items-end justify-between border-t border-[#00A0E3]/50 pt-4 mb-4">
      <div className="text-[14px] text-[#525866] leading-[120%]">
        Get 8 services worth<br />
        For only:
      </div>

      <div className="text-right">
        <div className="text-[14px] text-[#171717] line-through font-medium">
          $1240
        </div>
        <div className="text-[20px] font-bold text-[#00A0E3]">
          $912
        </div>
      </div>
    </div>

    {/* Button */}
    <button className="w-full bg-[#00A0E3] text-white py-[6px] rounded-full text-[14px] font-medium hover:bg-[#0088CC] transition-colors">
      Buy Now
    </button>
  </div>
</div>
      </div>
    </div>
  );
}

function Step8Content() {
  return (
    <div className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 flex flex-col h-full">
      <div className="text-xs font-normal text-[#00A0E3] uppercase tracking-wider mb-2">STEP 8</div>
      <h3 className="text-2xl font-normal text-[#1C1C1D] mb-3">Post Publication</h3>
      <p className="text-[#65656D] text-sm mb-8 max-w-md">
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
        Elementum suscipit donec viverra posuere at lorem nullam.
      </p>

      <form className="space-y-4 mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">First Name</label>
            <input type="text" placeholder="First name" className="w-full border border-[#E7E7E9] rounded-lg bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#00A0E3]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">Last Name</label>
            <input type="text" placeholder="Last name" className="w-full border border-[#E7E7E9] rounded-lg bg-white   px-3 py-2 text-sm focus:outline-none focus:border-[#00A0E3]" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">Email</label>
          <input type="email" placeholder="Enter your email" className="w-full border border-[#E7E7E9] rounded-lg bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#00A0E3]" />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">Message</label>
          <textarea rows={3} placeholder="Type your message" className="w-full border border-[#E7E7E9] rounded-lg bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#00A0E3]"></textarea>
        </div>

        <button type="button" className="w-full bg-[#00A0E3] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors mt-2">
          Submit Message
        </button>
      </form>
    </div>
  );
}

function HomeIcon(props: any) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}
