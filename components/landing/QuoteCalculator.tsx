"use client";

import { useState, useMemo } from "react";

export function QuoteCalculator() {
  const [words, setWords] = useState(520);
  const [documentType, setDocumentType] = useState("Essay");
  const [service, setService] = useState("Editing");
  const chartWidth = 470;
  const chartHeight = 358;

  // Pricing configuration
  const pricingConfig: Record<string, number> = {
    Editing: 0.02,
    Proofreading: 0.015,
    Writing: 0.04,
  };

  const documentMultiplier: Record<string, number> = {
    Essay: 1,
    "Research Paper": 1.2,
    Report: 1.1,
    Dissertation: 1.4,
  };

  // Calculate price and time
  const { price, days, chartData } = useMemo(() => {
    const baseRate = pricingConfig[service] || 0.02;
    const multiplier = documentMultiplier[documentType] || 1;

    const calculatedPrice = words * baseRate * multiplier;
    const calculatedDays = Math.max(1, Math.ceil(words / 1000 * 5));

    // Generate chart data
    const data = [2, 4, 6, 8, 10].map((day) => ({
      day,
      price: Math.min(
        calculatedPrice * (day / calculatedDays),
        calculatedPrice
      ),
    }));

    return {
      price: calculatedPrice,
      days: calculatedDays,
      chartData: data,
    };
  }, [words, documentType, service]);

  // SVG Path Generator
  const generatePath = (data: any[]) => {
    const maxPrice = Math.max(...data.map((d) => d.price), 1);

    return data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = chartHeight - (point.price / maxPrice) * chartHeight;
        return `${index === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F3F9FC]">
      <div className="landing-shell">

        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-12">
          <div className="landing-section-badge">
              <img src="/grid.svg" alt="icon" className="w-4 h-4" />
            <span className="landing-section-badge-text">
              Instant Pricing
            </span>
          </div>
          <h2 className="landing-section-title">
            Quote Calculator
          </h2>
          <p className="landing-section-description mt-2">
            Enter your word count and select your service to get an instant estimate.
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-transparent rounded-[28px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 lg:h-[538px]">

            {/* LEFT PANEL */}
            <div className="bg-white rounded-[20px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between shadow-[0_0_12px_rgba(28,28,29,0.05)] lg:h-full">
              <div className="flex flex-col gap-4">
                
                {/* Word Input */}
                <div className="bg-[#F8F8F8] p-4 rounded-[14px] border border-[#ECECEC] lg:h-[119px] lg:justify-center lg:flex lg:flex-col">
                  <label className="block text-[14px] font-medium mb-2 text-[#0E121B]">
                    No. of Words Input
                  </label>
                  <input
                    type="number"
                    value={words}
                    onChange={(e) => setWords(Number(e.target.value))}
                    className="w-full h-[40px] px-4 border border-[#E7E7E9] text-[#171717] text-[14px] rounded-lg bg-white focus:outline-none focus:border-[#00A0E3]"
                  />
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={words}
                    onChange={(e) => setWords(Number(e.target.value))}
                    className="w-full mt-4 h-2 bg-[#E2F1F8] rounded-lg appearance-none cursor-pointer accent-[#00A0E3]"
                  />
                </div>

                {/* Dropdowns */}
                <div className="bg-[#F8F8F8] p-4 rounded-[14px] border border-[#ECECEC] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:h-[89px] lg:items-center">
                  <div className="lg:h-[61px]">
                    <label className="block text-[14px] font-medium mb-2 text-[#0E121B]">
                      Document Type
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full h-[40px] px-4 border border-[#E7E7E9] text-[#78788D] text-[14px] rounded-lg bg-white focus:outline-none focus:border-[#00A0E3]"
                    >
                      <option>Essay</option>
                      <option>Research Paper</option>
                      <option>Report</option>
                      <option>Dissertation</option>
                    </select>
                  </div>

                  <div className="lg:h-[61px]">
                    <label className="block text-[14px] font-medium mb-2 text-[#0E121B]">
                      Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-[40px] px-4 border border-[#E7E7E9] text-[#78788D] text-[14px] rounded-lg bg-white focus:outline-none focus:border-[#00A0E3]"
                    >
                      <option>Editing</option>
                      <option>Proofreading</option>
                      <option>Writing</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:h-[242px]">
                <div className="flex h-full min-h-[150px] flex-col rounded-[12px] bg-[#0189C2] p-4 text-white lg:min-h-0 lg:p-4">
                  <p className="text-[16px] font-medium leading-[140%]">
                    Estimated Pricing
                  </p>
                  <h3 className="mt-2 text-[26px] font-semibold leading-[120%]">
                    ${price.toFixed(2)}
                  </h3>
                </div>
                <div className="mt-2 flex h-full min-h-[150px] flex-col rounded-[12px] bg-[#015375] p-4 text-white sm:mt-0 lg:min-h-0 lg:p-4">
                  <p className="text-[16px] font-medium leading-[140%]">
                    Estimated Time Period
                  </p>
                  <h3 className="mt-2 text-[26px] font-semibold leading-[120%]">
                    {days} days
                  </h3>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white rounded-[20px] p-4 sm:p-6 lg:p-7 shadow-[0_0_12px_rgba(28,28,29,0.05)] lg:h-full">
              <h3 className="text-[18px] font-semibold text-[#1C1C1D] lg:mb-7">
                Pricing Trend
              </h3>

              <div className="mt-4 flex flex-col rounded-[14px] bg-[#F8F8F8] p-4 sm:p-6 lg:mt-0 lg:p-6">
                <div className="relative h-[220px] sm:h-[260px] lg:h-[358px]">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-[10px] text-[#0E121B] sm:text-[12px]">
                    <span>$500</span>
                    <span>$400</span>
                    <span>$300</span>
                    <span>$200</span>
                    <span>$100</span>
                    <span>$0</span>
                  </div>

                  {/* Chart */}
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="absolute left-7 top-0 h-full w-[calc(100%-28px)] sm:left-10 sm:w-[calc(100%-40px)]"
                    preserveAspectRatio="none"
                  >
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={(chartHeight / 5) * i}
                        x2={chartWidth}
                        y2={(chartHeight / 5) * i}
                        stroke="#ECECEC"
                        strokeDasharray="4 4"
                      />
                    ))}
                    <line
                      x1="0"
                      y1={chartHeight}
                      x2={chartWidth}
                      y2={chartHeight}
                      stroke="#ECECEC"
                    />

                    {/* Line Path */}
                    <path
                      d={generatePath(chartData)}
                      fill="none"
                      stroke="#00A0E3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="mt-2 flex justify-between pr-1 text-[9px] text-[#0E121B] min-[420px]:text-[10px] sm:text-[12px] lg:mt-3 ml-[46px] sm:ml-[80px] [&>span]:whitespace-nowrap">
                  {[2, 4, 6, 8, 10].map((d) => (
                    <span key={d}>{d} days</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}