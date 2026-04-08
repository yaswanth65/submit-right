"use client";

export function QuoteCalculator() {
  return (
    <section className="py-16 lg:py-24 bg-[#F3F9FC]">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              LOREM IPSUM DOLOR
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[32px] lg:text-[32px] font-normal text-[#1C1C1D] leading-tight mb-4">
            Quote Calculator
          </h2>

          {/* Description */}
          <p className="text-[15px] text-[#65656D] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Calculator Content */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-[1040px] mx-auto">
          {/* Left Side - Form */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="space-y-7">
              {/* Input Words */}
              <div>
                <label className="block text-[13px] font-semibold text-[#1C1C1D] mb-2.5">
                  No.of Words Input
                </label>
                
                <div className="flex items-center justify-between h-[46px] px-4 border border-[#F0F0F0] rounded-xl mb-6 bg-[#FAFAFA]">
                  <span className="text-[15px] font-medium text-[#1C1C1D]">520</span>
                  <div className="flex flex-col gap-0.5 items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#1C1C1D] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    <svg className="w-3.5 h-3.5 text-[#1C1C1D] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" transform="rotate(180 12 12)" /></svg>
                  </div>
                </div>
                
                {/* Range Slider */}
                <div className="relative w-full h-2 bg-[#E1F3FB] rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-[#00A0E3] rounded-full" style={{ width: '30%' }}></div>
                  <div className="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#00A0E3] rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,160,227,0.3)] cursor-pointer"></div>
                </div>
              </div>

              {/* Document Type & Service grid */}
              <div className="grid grid-cols-2 gap-5">
                {/* Document Type */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#1C1C1D] mb-2.5">
                    Document Type
                  </label>
                  <div className="flex items-center justify-between h-[46px] px-4 border border-[#F0F0F0] rounded-xl cursor-pointer bg-[#FAFAFA]">
                    <span className="text-[14px] text-[#65656D]">Select</span>
                    <svg className="w-4 h-4 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#1C1C1D] mb-2.5">
                    Service
                  </label>
                  <div className="flex items-center justify-between h-[46px] px-4 border border-[#F0F0F0] rounded-xl cursor-pointer bg-[#FAFAFA]">
                    <span className="text-[14px] text-[#65656D]">Select</span>
                    <svg className="w-4 h-4 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-10">
              <div className="bg-[#008CC9] rounded-[16px] p-6 text-white shadow-[0_8px_20px_rgba(0,140,201,0.15)]">
                <div className="text-[13px] font-medium mb-1">Estimated Pricing</div>
                <div className="text-[32px] font-semibold tracking-tight">$160.00</div>
              </div>
              <div className="bg-[#01405B] rounded-[16px] p-6 text-white shadow-[0_8px_20px_rgba(1,64,91,0.15)]">
                <div className="text-[13px] font-medium mb-1">Estimated Time Period</div>
                <div className="text-[32px] font-semibold tracking-tight">5 days</div>
              </div>
            </div>
          </div>

          {/* Right Side - Chart */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col">
            <h3 className="text-[17px] font-semibold text-[#1C1C1D] mb-8">Lorem ipsum dolor</h3>

            {/* Chart Area */}
            <div className="relative flex-1 flex flex-col justify-end min-h-[300px]">
              <div className="absolute inset-0 flex">
                {/* Y Axis */}
                <div className="flex flex-col justify-between text-[12px] text-[#65656D] h-full pr-4 pb-[36px] w-[50px] text-right">
                  <span>$500</span>
                  <span>$400</span>
                  <span>$300</span>
                  <span>$200</span>
                  <span>$100</span>
                  <span>$0</span>
                </div>
                
                <div className="relative flex-1 h-[calc(100%-36px)]">
                  {/* Horizontal Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between z-0">
                     <div className="w-full h-px border-t border-dashed border-[#E5E5E5]"></div>
                     <div className="w-full h-px border-t border-dashed border-[#E5E5E5]"></div>
                     <div className="w-full h-px border-t border-dashed border-[#E5E5E5]"></div>
                     <div className="w-full h-px border-t border-dashed border-[#E5E5E5]"></div>
                     <div className="w-full h-px border-t border-dashed border-[#E5E5E5]"></div>
                     <div className="w-full h-px border-t border-[#E5E5E5]"></div>
                  </div>

                  {/* Line Chart SVG */}
                  <svg className="absolute inset-0 w-full h-full z-10 overflow-visible" viewBox="0 0 400 252" preserveAspectRatio="none">
                    <path
                      d="M 0,252 Q 150,210 230,130"
                      stroke="#00A0E3"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[12px] text-[#65656D] pl-[50px] relative z-20">
                <span className="w-10 text-center -ml-5 mt-2">2 days</span>
                <span className="w-10 text-center -ml-5 mt-2">4 days</span>
                <span className="w-10 text-center -ml-5 mt-2">6 days</span>
                <span className="w-10 text-center -ml-5 mt-2">8 days</span>
                <div className="w-10 text-center -ml-5 flex flex-col items-center mt-2 leading-tight">
                  <span>10</span>
                  <span>days</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
