"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Star, 
  StarHalf, 
  Users, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Image as ImageIcon,
  ThumbsDown,
  ThumbsUp,
  Minus,
  Plus
} from "lucide-react";

export default function ServiceDetailPage() {
  // State for accordion items
  const [openSections, setOpenSections] = useState({
    mathematics: true,
    economics: false,
    engineering: false,
    medicine: false,
    psychology: false
  });

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const otherServices = Array(4).fill({
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    domain: "Service Domain",
    rating: "4.5",
    reviews: "2,206",
    tag: "Lorem ipsum dolor",
    price: "$0.065"
  });

  const otherPackages = [
    {
      id: 1,
      theme: "gold",
      bg: "bg-[#F8EED1]",
      border: "border-[#EBE1C5]",
      badgeBg: "bg-[#D4A347]",
      titleColor: "text-[#C59432]",
      checkBg: "bg-[#D4A347]",
      buttonBg: "bg-[#171717] hover:bg-black",
      buttonText: "text-white",
      divider: "border-[#E8D9B4]"
    },
    {
      id: 2,
      theme: "blue",
      bg: "bg-[#F4FAFD]",
      border: "border-[#00A0E3]",
      badgeBg: "bg-[#00A0E3]",
      titleColor: "text-[#00A0E3]",
      checkBg: "bg-[#00A0E3]",
      buttonBg: "bg-[#00A0E3] hover:bg-[#008bc5]",
      buttonText: "text-white",
      divider: "border-[#BBE3F5]"
    }
  ];

  const faqData = [
    {
      id: "01",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "02",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "03",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "04",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "05",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "06",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="w-full font-dm-sans mx-auto pb-16 px-6 mt-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start relative">
        
        {/* --- LEFT COLUMN --- */}
        <div className="w-full lg:flex-1 flex flex-col gap-12">
          
          {/* Top Section */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border border-[#EAECF0] rounded-full p-1 pr-4 bg-white w-max mb-6">
              <span className="bg-[#171717] text-white text-[12px] font-bold px-3 py-1 rounded-full">
                New
              </span>
              <span className="text-[13px] text-[#525866] font-medium">
                Service tag
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="text-[28px] font-bold text-[#171717] mb-3 tracking-tight">
              Lorem ipsum dolor
            </h1>
            <p className="text-[#8A94A6] text-[15px] leading-relaxed max-w-[95%] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="border border-[#EAECF0] text-[#525866] text-[14px] px-4 py-1.5 rounded-full bg-white">
                Service Domain
              </span>
              <span className="border border-[#EAECF0] text-[#525866] text-[14px] px-4 py-1.5 rounded-full bg-white">
                Lorem ipsum dolor
              </span>
            </div>

            {/* Stats Box */}
            <div className="flex flex-col lg:flex-row border border-[#EAECF0] rounded-[12px] overflow-hidden bg-white mb-10">
              <div className="lg:w-[140px] bg-[#00A0E3] flex flex-col items-center justify-center text-white p-6 shrink-0">
                <CheckCircle2 className="w-6 h-6 mb-2 text-white" fill="white" stroke="#00A0E3" />
                <span className="text-[13px] font-bold text-center">Lorem ipsum</span>
              </div>
              
              <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-[#EAECF0] flex items-center">
                <p className="text-[#8A94A6] text-[14px] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              
              <div className="px-8 py-6 border-b lg:border-b-0 lg:border-r border-[#EAECF0] flex flex-col items-center justify-center shrink-0">
                <span className="text-[22px] font-bold text-[#171717] mb-1">4.4</span>
                <div className="flex gap-[2px] mb-2">
                  <Star className="w-4 h-4 fill-[#FF8B00] text-[#FF8B00]" />
                  <Star className="w-4 h-4 fill-[#FF8B00] text-[#FF8B00]" />
                  <Star className="w-4 h-4 fill-[#FF8B00] text-[#FF8B00]" />
                  <Star className="w-4 h-4 fill-[#FF8B00] text-[#FF8B00]" />
                  <StarHalf className="w-4 h-4 fill-[#FF8B00] text-[#FF8B00]" />
                </div>
                <span className="text-[#525866] text-[13px] underline cursor-pointer hover:text-[#171717] font-medium">
                  2,206 ratings
                </span>
              </div>
              
              <div className="px-8 py-6 flex flex-col items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#00A0E3] mb-2" />
                <span className="text-[20px] font-bold text-[#171717] mb-0.5">15,969</span>
                <span className="text-[#8A94A6] text-[13px]">learners</span>
              </div>
            </div>

            {/* Features Box */}
            <div className="border border-[#EAECF0] rounded-[12px] bg-white pt-6 pb-2 mb-10 overflow-hidden">
              <h3 className="text-[16px] font-bold text-[#171717] mb-4 px-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div 
                    key={item} 
                    className={`px-6 py-5 flex items-start gap-3.5 
                      ${index % 2 === 0 ? "md:border-r border-[#EAECF0]" : ""} 
                      ${index < 4 ? "border-b border-[#EAECF0]" : ""}
                    `}
                  >
                    <Check className="w-[18px] h-[18px] text-[#171717] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-[#8A94A6] text-[14px] leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Explore Related Services Placeholder */}
            <div>
              <h3 className="text-[18px] font-bold text-[#171717] mb-5">
                Explore Related Services
              </h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="border border-[#EAECF0] text-[#525866] text-[13px] px-4 py-1.5 rounded-full bg-[#F9FAFB] font-medium">
                  Service Domain
                </span>
                <span className="border border-[#EAECF0] text-[#525866] text-[13px] px-4 py-1.5 rounded-full bg-[#F9FAFB] font-medium">
                  Lorem ipsum dolor
                </span>
                <span className="border border-[#EAECF0] text-[#525866] text-[13px] px-4 py-1.5 rounded-full bg-[#F9FAFB] font-medium">
                  Lorem ipsum dolor
                </span>
                <span className="border border-[#EAECF0] text-[#525866] text-[13px] px-4 py-1.5 rounded-full bg-[#F9FAFB] font-medium">
                  Lorem ipsum dolor
                </span>
              </div>
            </div>
          </div>

          {/* SECTION: What You'll Be Getting in This Service */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-6">What You'll Be Getting in This Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Check className="w-[16px] h-[16px] text-[#A0AAB5] shrink-0" strokeWidth={2.5} />
                  <span className="text-[#8A94A6] text-[14px]">Lorem ipsum dolor</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Proofreading Plus Service Sample */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-6">Proofreading Plus Service Sample</h2>
            
            <div className="border border-[#EAECF0] rounded-[12px] bg-[#FAFAFB] overflow-hidden divide-y divide-[#EAECF0]">
              
              {/* Mathematics Accordion */}
              <div className="flex flex-col bg-white">
                <button 
                  onClick={() => toggleSection('mathematics')}
                  className="flex items-center gap-3 px-6 py-4 text-left w-full hover:bg-[#F9FAFB] transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-[#525866] shrink-0" strokeWidth={2} />
                  <span className="text-[15px] font-bold text-[#171717]">Mathematics</span>
                </button>
                {openSections.mathematics && (
                  <div className="px-6 py-5 pl-[46px] border-t border-[#EAECF0]">
                    <ul className="list-disc text-[#8A94A6] text-[14px] leading-relaxed space-y-4 marker:text-[#D1D5DB] ml-4">
                      <li className="pl-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</li>
                      <li className="pl-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Other Accordions */}
              {[
                { id: 'economics', label: 'Economics' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'medicine', label: 'Medicine' },
                { id: 'psychology', label: 'Psychology' }
              ].map((section) => (
                <div key={section.id} className="flex flex-col">
                  <button 
                    onClick={() => toggleSection(section.id as keyof typeof openSections)}
                    className="flex items-center gap-3 px-6 py-4 text-left w-full hover:bg-[#F9FAFB] transition-colors"
                  >
                    {openSections[section.id as keyof typeof openSections] ? (
                      <ChevronUp className="w-5 h-5 text-[#525866] shrink-0" strokeWidth={2} />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#525866] shrink-0" strokeWidth={2} />
                    )}
                    <span className="text-[15px] font-bold text-[#171717]">{section.label}</span>
                  </button>
                  {openSections[section.id as keyof typeof openSections] && (
                    <div className="px-6 py-5 pl-[46px] border-t border-[#EAECF0] bg-white">
                      <p className="text-[#8A94A6] text-[14px]">Content for {section.label} goes here.</p>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* SECTION: Service Examples */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-5">Service Examples</h2>
            <ul className="list-disc text-[#8A94A6] text-[14px] leading-relaxed space-y-4 marker:text-[#A0AAB5] ml-4">
              <li className="pl-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
              <li className="pl-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
            </ul>
          </div>

          {/* SECTION: Other Services */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-5">Other Services</h2>
            <div className="flex flex-col gap-4">
              {otherServices.map((service, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-[#EAECF0] rounded-[12px] bg-white gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#D1D5DB]">
                  <div className="w-[64px] h-[64px] bg-[#E8ECEF] rounded-[8px] flex items-center justify-center shrink-0">
                    <ImageIcon className="w-6 h-6 text-[#A0AAB5] opacity-60" strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-[15px] font-bold text-[#171717] leading-tight">
                      {service.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[#00A0E3] bg-[#F0F8FC] border border-[#BBE3F5] text-[12px] px-2.5 py-0.5 rounded-[4px] font-medium">
                        {service.domain}
                      </span>
                      <div className="flex items-center gap-1 text-[13px] text-[#525866] font-medium">
                        <Star className="w-3.5 h-3.5 fill-[#FF8B00] text-[#FF8B00]" />
                        <span>{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[13px] text-[#525866] font-medium">
                        <Users className="w-4 h-4 text-[#A0AAB5]" />
                        <span>{service.reviews}</span>
                      </div>
                      <span className="text-[#525866] bg-white border border-[#EAECF0] text-[12px] px-2.5 py-0.5 rounded-[4px] font-medium">
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  <div className="sm:border-l border-[#EAECF0] sm:pl-6 sm:ml-2 flex flex-col items-start sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0">
                    <span className="text-[12px] text-[#8A94A6] mb-0.5">From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-bold text-[#171717]">{service.price}</span>
                      <span className="text-[13px] text-[#8A94A6]">/word</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Other Packages */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-5">Other Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPackages.map((pkg) => (
                <div key={pkg.id} className={`relative ${pkg.bg} border ${pkg.border} rounded-[16px] overflow-hidden flex flex-col`}>
                  {/* Badge */}
                  <div className={`absolute top-0 right-0 ${pkg.badgeBg} text-white text-[12px] font-bold px-3 py-1.5 rounded-bl-[12px] rounded-tr-[16px]`}>
                    You Save: $328
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className={`text-[18px] font-bold ${pkg.titleColor} mb-2 mt-1`}>
                      Lorem ipsum dolor
                    </h3>
                    <p className="text-[#8A94A6] text-[13px] mb-6 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur<br/>adipiscing.
                    </p>

                    <div className="space-y-3 mb-8 flex-1">
                      {["Lorem ipsum dolor", "consectetur adipiscing", "Lorem ipsum dolor sit amet"].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-[20px] h-[20px] rounded-full ${pkg.checkBg} flex items-center justify-center shrink-0`}>
                            <Check className="w-[12px] h-[12px] text-white" strokeWidth={3.5} />
                          </div>
                          <span className="text-[#171717] text-[14px] font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className={`border-t ${pkg.divider} pt-5 mb-5`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[#8A94A6] text-[13px] font-medium">Get 6 services worth</span>
                          <span className="text-[#171717] text-[14px] font-bold line-through">$1240</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#8A94A6] text-[13px] font-medium">For only:</span>
                          <span className={`${pkg.titleColor} text-[24px] font-bold tracking-tight`}>$912</span>
                        </div>
                      </div>

                      <button className={`w-full ${pkg.buttonBg} ${pkg.buttonText} rounded-[8px] py-2.5 text-[14px] font-bold transition-colors`}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-6">Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              {[1, 2, 3, 4].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${idx < 2 ? 'border-b border-[#EAECF0] pb-6' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${item}`} 
                      alt="Reviewer" 
                      className="w-10 h-10 rounded-full object-cover shrink-0" 
                    />
                    <div>
                      <h4 className="text-[14px] font-bold text-[#171717] leading-tight">Rick Wright</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-[2px]">
                          <Star className="w-3.5 h-3.5 fill-[#FF8B00] text-[#FF8B00]" />
                          <Star className="w-3.5 h-3.5 fill-[#FF8B00] text-[#FF8B00]" />
                          <Star className="w-3.5 h-3.5 fill-[#FF8B00] text-[#FF8B00]" />
                          <Star className="w-3.5 h-3.5 fill-[#FF8B00] text-[#FF8B00]" />
                          <StarHalf className="w-3.5 h-3.5 fill-[#FF8B00] text-[#FF8B00]" />
                        </div>
                        <span className="text-[#8A94A6] text-[12px]">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[#8A94A6] text-[14px] leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  </p>
                  
                  <div className="flex items-center justify-end gap-3 text-[#00A0E3] mt-auto">
                    <span className="text-[13px] font-medium">Helpful?</span>
                    <ThumbsUp className="w-[16px] h-[16px] cursor-pointer hover:text-[#008bc5]" strokeWidth={2} />
                    <ThumbsDown className="w-[16px] h-[16px] cursor-pointer hover:text-[#008bc5]" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>

            <button className="px-4 py-2 border border-[#00A0E3] text-[#00A0E3] rounded-[6px] text-[13px] font-bold hover:bg-[#F0F8FC] transition-colors">
              Show All Reviews
            </button>
          </div>

          {/* SECTION: Other Domains */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-5 mt-6">Other Domains</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((domain) => (
                <div key={domain} className="border border-[#EAECF0] rounded-[12px] bg-white overflow-hidden flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#D1D5DB]">
                  {/* Image Placeholder */}
                  <div className="h-[140px] w-full relative bg-[#D0D6DC] overflow-hidden shrink-0">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <path d="M0,200 L0,120 C 60,90 120,180 200,120 C 280,60 340,90 400,140 L400,200 Z" fill="#E8ECEF" />
                      <circle cx="80" cy="80" r="16" fill="#E8ECEF" />
                    </svg>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-[15px] font-bold text-[#171717] mb-1.5 leading-tight">
                      Lorem ipsum dolor sit amet consectetur
                    </h3>
                    <p className="text-[#8A94A6] text-[13px] leading-relaxed mb-4 line-clamp-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, se...
                    </p>

                    <div className="flex items-center gap-2 mb-5 mt-auto">
                      <div className="flex items-center gap-1.5 border border-[#EAECF0] rounded-[6px] px-2 py-1 bg-white">
                        <Star className="w-3 h-3 fill-[#FF8B00] text-[#FF8B00]" />
                        <span className="text-[#FF8B00] text-[12px] font-bold">4.5</span>
                      </div>
                      <div className="flex items-center gap-1.5 border border-[#EAECF0] rounded-[6px] px-2 py-1 bg-white">
                        <Users className="w-3 h-3 text-[#A0AAB5]" strokeWidth={2.5} />
                        <span className="text-[#525866] text-[12px] font-medium">2,206</span>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-[#EAECF0] mb-4"></div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-bold text-[#171717]">$0.065</span>
                      <span className="text-[13px] text-[#8A94A6]">/word</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

         {/* SECTION: Frequently Asked Questions */}
         <div className="mt-4">
            <h2 className="text-[18px] font-bold text-[#171717] mb-5">
              Frequently Asked Questions
            </h2>
            
            <div className="border border-[#EAECF0] rounded-[12px] bg-white overflow-hidden divide-y divide-[#EAECF0]">
              {faqData.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="flex flex-col">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="flex items-center justify-between p-5 lg:px-6 w-full text-left transition-colors hover:bg-[#F9FAFB]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-bold text-[#171717] w-6 shrink-0">
                          {faq.id}
                        </span>
                        <span className="text-[15px] text-[#8A94A6]">
                          {faq.question}
                        </span>
                      </div>
                      {isOpen ? (
                        <Minus className="w-[18px] h-[18px] text-[#00A0E3] shrink-0 ml-4" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-[18px] h-[18px] text-[#00A0E3] shrink-0 ml-4" strokeWidth={2.5} />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 lg:px-6 pb-5 pl-[52px] lg:pl-[60px]">
                        <p className="text-[#525866] text-[14px] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div> {/* END OF LEFT COLUMN */}

        {/* --- RIGHT COLUMN (Sticky Card) --- */}
        <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-8">
          <div className="border border-[#EAECF0] rounded-[16px] overflow-hidden bg-white shadow-sm">
            
            {/* Image Placeholder */}
            <div className="h-[200px] w-full relative bg-[#D0D6DC] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M0,200 L0,120 C 60,90 120,180 200,120 C 280,60 340,90 400,140 L400,200 Z" fill="#F4F5F7" />
                <circle cx="80" cy="80" r="16" fill="#F4F5F7" />
              </svg>
            </div>

            <div className="p-6">
              {/* Pricing Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="text-[#8A94A6] text-[13px] mb-1">From</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[28px] font-bold text-[#171717]">$0.065</span>
                    <span className="text-[#8A94A6] text-[15px]">/word</span>
                  </div>
                </div>
                <span className="bg-[#E6F8EC] text-[#00A859] text-[12px] font-bold px-3 py-1.5 rounded-full mt-1">
                  Upto 30% off
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button className="w-full bg-[#00A0E3] hover:bg-[#008bc5] text-white py-3 rounded-[8px] text-[15px] font-medium transition-colors">
                  Submit Now
                </button>
                <button className="w-full bg-white border border-[#00A0E3] text-[#00A0E3] hover:bg-[#F0F8FC] py-3 rounded-[8px] text-[15px] font-medium transition-colors">
                  Place Order Now
                </button>
              </div>

              <div className="w-full h-[1px] bg-[#EAECF0] mb-6"></div>

              {/* Estimate Calculator */}
              <div className="flex flex-col">
                <span className="text-[#8A94A6] text-[13px] mb-1">
                  Estimated price based on word count
                </span>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-[18px] font-bold text-[#171717]">From $0.065</span>
                  <span className="text-[#8A94A6] text-[14px]">/word</span>
                </div>

                {/* Word Count Input */}
                <div className="relative mb-5">
                  <input 
                    type="text" 
                    placeholder="Enter no.of words" 
                    className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#8A94A6] focus:outline-none focus:border-[#00A0E3] transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    <ChevronUp className="w-3.5 h-3.5 text-[#525866] cursor-pointer hover:text-[#171717]" strokeWidth={3} />
                    <ChevronDown className="w-3.5 h-3.5 text-[#525866] cursor-pointer hover:text-[#171717]" strokeWidth={3} />
                  </div>
                </div>

                {/* Document Type Select */}
                <div className="flex flex-col mb-6">
                  <label className="text-[13px] font-bold text-[#171717] mb-2">
                    Document Type
                  </label>
                  <div className="relative">
                    <select className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#8A94A6] appearance-none focus:outline-none focus:border-[#00A0E3] bg-white transition-colors cursor-pointer">
                      <option>Select document type</option>
                      <option>Research Paper</option>
                      <option>Thesis</option>
                      <option>Essay</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
                  </div>
                </div>

                <button className="w-full bg-[#00A0E3] hover:bg-[#008bc5] text-white py-3 rounded-[8px] text-[15px] font-medium transition-colors">
                  Calculate
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* --- FOOTER --- */}
      <div className="border-t border-[#EAECF0] mt-16 pt-8 pb-4 flex justify-center w-full">
        <p className="text-[#A0AAB5] text-[13px] font-medium">
          Copyright 2026 Submit Right. All rights reserved.
        </p>
      </div>

    </div>
  );
}