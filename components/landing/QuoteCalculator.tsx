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
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-[1000px] mx-auto">
          {/* Left Side - Form */}
          <div className="space-y-6">
            
            {/* Input Words */}
            <div className="bg-white rounded-xl p-6 border border-[#F0F0F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <label className="block text-[13px] font-medium text-[#65656D] mb-3">
                Input Words Input
              </label>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-[15px] font-medium text-[#1C1C1D]">520</div>
                <div className="flex flex-col gap-0.5">
                  <svg className="w-3 h-3 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  <svg className="w-3 h-3 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              
              {/* Range Slider */}
              <div className="relative w-full h-1.5 bg-[#F0F0F0] rounded-full mt-2">
                <div className="absolute top-0 left-0 h-full bg-[#00A0E3] rounded-full" style={{ width: '30%' }}></div>
                <div className="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#00A0E3] rounded-full border-2 border-white shadow-sm"></div>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Document Type */}
              <div className="flex-1 bg-white rounded-xl p-4 border border-[#F0F0F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <label className="block text-[11px] font-medium text-[#65656D] mb-2">
                  Document Type
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#1C1C1D]">Select</span>
                  <svg className="w-4 h-4 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Service */}
              <div className="flex-1 bg-white rounded-xl p-4 border border-[#F0F0F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <label className="block text-[11px] font-medium text-[#65656D] mb-2">
                  Service
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#1C1C1D]">Select</span>
                  <svg className="w-4 h-4 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#00A0E3] rounded-xl p-6 text-white shadow-[0_4px_20px_rgb(0,160,227,0.2)]">
                <div className="text-[12px] font-medium mb-1">Estimated Pricing</div>
                <div className="text-[28px] font-normal">$160.00</div>
              </div>
              <div className="bg-[#015375] rounded-xl p-6 text-white shadow-[0_4px_20px_rgb(1,83,117,0.2)]">
                <div className="text-[12px] font-medium mb-1">Estimated Time Period</div>
                <div className="text-[28px] font-normal">5 days</div>
              </div>
            </div>
          </div>

          {/* Right Side - Chart */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0F0F0]">
            <h3 className="text-[16px] font-normal text-[#1C1C1D] mb-6">Lorem ipsum dolor</h3>

            {/* Chart Area */}
            <div className="relative h-[240px] flex">
              {/* Y Axis */}
              <div className="flex flex-col justify-between text-[11px] text-[#A0A0A0] h-full pr-4 pb-6">
                <span>$500</span>
                <span>$400</span>
                <span>$300</span>
                <span>$200</span>
                <span>$100</span>
                <span>$0</span>
              </div>
              
              <div className="relative flex-1 border-l border-b border-[#F0F0F0] h-[calc(100%-24px)]">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                   <div className="w-full h-px bg-[#F5F5F5]"></div>
                   <div className="w-full h-px bg-[#F5F5F5]"></div>
                   <div className="w-full h-px bg-[#F5F5F5]"></div>
                   <div className="w-full h-px bg-[#F5F5F5]"></div>
                   <div className="w-full h-px bg-[#F5F5F5]"></div>
                </div>

                {/* Line Chart */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Ascending Line */}
                  <path
                    d="M 0,180 Q 100,160 200,110 T 400,30"
                    stroke="#00A0E3"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Drop Shadow / gradient can be added here if needed */}
                  <circle cx="200" cy="110" r="4" fill="#00A0E3" className="shadow-lg" />
                </svg>

                {/* X Axis Labels */}
                <div className="absolute -bottom-7 left-0 w-full flex justify-between text-[11px] text-[#A0A0A0]">
                  <span className="transform -translate-x-1/2">2 days</span>
                  <span className="transform -translate-x-1/2">4 days</span>
                  <span className="transform -translate-x-1/2">6 days</span>
                  <span className="transform -translate-x-1/2">8 days</span>
                  <span className="transform flex items-center gap-1.5 bg-white border border-[#E5E5E5] px-2 py-0.5 rounded shadow-sm text-[#1C1C1D] font-medium -translate-x-1/2 -mt-1"><div className="w-1.5 h-1.5 rounded-full bg-[#00A0E3]"></div>10 days</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
