"use client";

import React from "react";
import { Pencil, Check, ChevronRight } from "lucide-react";

const pageData = {
  header: {
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\nlabore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  premiumServices: [
    { id: "01", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
    { id: "02", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
    { id: "03", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
    { id: "04", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
    { id: "05", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
    { id: "06", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
  ],
  pricingBox: {
    badge: "You Save: $328",
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet, consectetur\nadipiscing.",
    features: [
      "Lorem ipsum dolor",
      "consectetur adipiscing",
      "Lorem ipsum dolor sit amet",
    ],
    originalPrice: "$1240",
    discountedPrice: "$912",
  },
  servicesAvailable: [
    { 
      id: 1, 
      title: "Essential Support", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
      value: "Value: $510", 
      iconBg: "bg-[#FDEFD3]", 
      iconColor: "text-[#C59432]" 
    },
    { 
      id: 2, 
      title: "Essential Support", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
      value: "Value: $149", 
      iconBg: "bg-[#FCEAEB]", 
      iconColor: "text-[#D17A84]" 
    },
    { 
      id: 3, 
      title: "Essential Support", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
      value: "Value: $80", 
      iconBg: "bg-[#F0EBF9]", 
      iconColor: "text-[#8E6FD6]" 
    },
    { 
      id: 4, 
      title: "Essential Support", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
      value: "Value: $110", 
      iconBg: "bg-[#E5F7EB]", 
      iconColor: "text-[#58A771]" 
    },
    { 
      id: 5, 
      title: "Essential Support", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
      value: "$0.17/word*", 
      iconBg: "bg-[#E6F5F8]", 
      iconColor: "text-[#53A2B3]" 
    },
    { 
      id: 6, 
      title: "Essential Support", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
      value: "Value: $510", 
      iconBg: "bg-[#FCECE1]", 
      iconColor: "text-[#D1926D]" 
    },
  ]
};

export default function ServicesPackComponent() {
  return (
    <div className="w-full font-dm-sans max-w-[1200px] mx-auto pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* --- LEFT COLUMN: Header & Bundle Box --- */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="mb-6">
            <h1 className="text-[32px] font-bold text-[#171717] mb-2 tracking-tight">
              {pageData.header.title}
            </h1>
            <p className="text-[#8A94A6] text-[15px] leading-relaxed max-w-[85%] whitespace-pre-line">
              {pageData.header.description}
            </p>
          </div>

          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-5 border-b border-[#EAECF0]">
              <h2 className="text-[16px] font-bold text-[#171717]">
                6 premium services bundled in this pack:
              </h2>
            </div>
            
            <div className="grid grid-cols-2">
              {pageData.premiumServices.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`flex items-start gap-3.5 p-6 
                    ${index % 2 === 0 ? "border-r border-[#EAECF0]" : ""} 
                    ${index < 4 ? "border-b border-[#EAECF0]" : ""}
                  `}
                >
                  <div className="w-[34px] h-[34px] rounded-[8px] bg-[#F5F7FA] border border-[#EAECF0] flex items-center justify-center shrink-0">
                    <Pencil className="w-[15px] h-[15px] text-[#525866]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#171717] mb-1">
                      {service.id}. {service.title}
                    </h3>
                    <p className="text-[13px] text-[#A0AAB5] leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Pricing Box --- */}
        <div className="lg:col-span-1">
          <div className="relative bg-[#F4E9CD] border border-[#EBE1C5] rounded-[16px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <div className="absolute top-0 right-0 bg-[#CEA02D] text-white text-[12px] font-bold px-3 py-1.5 rounded-bl-[12px] rounded-tr-[16px]">
              {pageData.pricingBox.badge}
            </div>

            <div className="p-2">
              <h2 className="text-[20px] font-bold text-[#CEA02D] mb-1 mt-1">
                {pageData.pricingBox.title}
              </h2>
              <p className="text-[#8A94A6] text-[14px] mb-8 whitespace-pre-line leading-relaxed">
                {pageData.pricingBox.desc}
              </p>

              <div className="space-y-3.5 mb-10">
                {pageData.pricingBox.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-[22px] h-[22px] rounded-full bg-[#D4A347] flex items-center justify-center shrink-0">
                      <Check className="w-[12px] h-[12px] text-white" strokeWidth={3.5} />
                    </div>
                    <span className="text-[#171717] text-[14px] font-bold">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8D9B4] pt-6 mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#8A94A6] text-[14px] font-medium">Get 6 services worth</span>
                  <span className="text-[#171717] text-[15px] font-bold line-through">{pageData.pricingBox.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8A94A6] text-[14px] font-medium">For only:</span>
                  <span className="text-[#C59432] text-[28px] font-bold tracking-tight">{pageData.pricingBox.discountedPrice}</span>
                </div>
              </div>

              <button className="w-full bg-[#171717] hover:bg-black text-white rounded-[8px] py-3 text-[15px] font-bold transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- BOTTOM SECTION: Services Grid --- */}
      <div>
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-[#171717] mb-1">
            Services available in this pack
          </h2>
          <p className="text-[#8A94A6] text-[15px]">
            Get basic publication support with this pack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pageData.servicesAvailable.map((card) => (
            <div 
              key={card.id} 
              className="bg-gray-100 border border-[#EAECF0] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}>
                  <Pencil className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
                <h3 className="text-[15px] font-bold text-[#171717]">{card.title}</h3>
              </div>
              
              <p className="text-[#8A94A6] text-[13px] leading-relaxed flex-1 mb-6">
                {card.desc}
              </p>

              <div className="flex items-center justify-between border-t border-[#EAECF0] pt-5">
                <span className="text-[18px] font-bold text-[#171717]">{card.value}</span>
                <button className="flex items-center gap-1.5 px-4 py-2 border border-[#00A0E3] text-[#00A0E3] rounded-[8px] text-[13px] font-bold hover:bg-[#F0F8FC] transition-colors">
                  View Details <ChevronRight className="w-[14px] h-[14px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}