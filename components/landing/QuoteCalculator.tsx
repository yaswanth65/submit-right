"use client";

import { useState, useMemo } from "react";

export function QuoteCalculator() {
  const [words, setWords] = useState(520);
  const [documentType, setDocumentType] = useState("Essay");
  const [service, setService] = useState("Editing");

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
    const width = 400;
    const height = 240;

    return data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (point.price / maxPrice) * height;
        return `${index === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#F3F9FC]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full mb-5">
            <span className="text-[11px] uppercase tracking-wider">
              Instant Pricing
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1C1C1D]">
            Quote Calculator
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your word count and select your service to get an instant estimate.
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-transparent p-4 sm:p-6 rounded-[28px]">
          <div className="grid lg:grid-cols-2 gap-6">

            {/* LEFT PANEL */}
            <div className="bg-white rounded-[22px] p-6 flex flex-col justify-between shadow-[0_0_12px_rgba(28,28,29,0.05)]">
              <div className="space-y-6">
                
                {/* Word Input */}
                <div className="bg-[#F8F8F8] p-4 rounded-[14px] border border-[#ECECEC]">
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
                <div className="bg-[#F8F8F8] p-4 rounded-[14px] border border-[#ECECEC] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
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

                  <div>
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
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[#0189C2] text-white p-6 rounded-xl min-h-[150px] flex flex-col justify-between">
                  <p className="text-sm">Estimated Pricing</p>
                  <h3 className="text-2xl font-bold">
                    ${price.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-[#015375] text-white p-6 rounded-xl min-h-[150px] flex flex-col justify-between">
                  <p className="text-sm">Estimated Time Period</p>
                  <h3 className="text-2xl font-bold">
                    {days} days
                  </h3>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white rounded-[22px] p-4 sm:p-6 shadow-[0_0_12px_rgba(28,28,29,0.05)]">
              <h3 className="text-[18px] text-[#1C1C1D] font-semibold mb-6">
                Pricing Trend
              </h3>

              <div className="bg-[#F8F8F8] rounded-[14px] p-3 sm:p-6">
                <div className="relative h-[220px] sm:h-[260px]">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] sm:text-[12px] text-[#0E121B]">
                    <span>$500</span>
                    <span>$400</span>
                    <span>$300</span>
                    <span>$200</span>
                    <span>$100</span>
                    <span>$0</span>
                  </div>

                  {/* Chart */}
                  <svg
                    viewBox="0 0 400 240"
                    className="absolute left-7 sm:left-10 top-0 w-[calc(100%-28px)] sm:w-[calc(100%-40px)] h-full"
                    preserveAspectRatio="none"
                  >
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={(240 / 5) * i}
                        x2="400"
                        y2={(240 / 5) * i}
                        stroke="#ECECEC"
                        strokeDasharray="4 4"
                      />
                    ))}
                    <line
                      x1="0"
                      y1="240"
                      x2="400"
                      y2="240"
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
                <div className="flex justify-between text-[10px] sm:text-[12px] text-[#0E121B] mt-2 ml-[56px] sm:ml-[80px] [&>span]:whitespace-nowrap">
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