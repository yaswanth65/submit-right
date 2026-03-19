// "use client";

// import React from "react";
// import { Check } from "lucide-react";
// import { FileText, User, ThumbsUp } from "lucide-react";
// import  { useState } from "react";
// import { Plus, Minus, Phone, Mail } from "lucide-react";
// const dashboardData = {
//   services: [
//     { id: 1, title: "Enhanced Personal\nBranding" },
//     { id: 2, title: "Streamlined Research\nSupport" },
//     { id: 3, title: "Efficient Editorial\nWorkflows" },
//     { id: 4, title: "Global Content\nVisibility" },
//     { id: 5, title: "Academic\nTranslation" },
//     { id: 6, title: "Scientific\nWriting" },
//   ],
//   packages: [
//     {
//       id: 1,
//       title: "Essential Support",
//       features: [
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//       ],
//       buttonText: "Lorem ipsum",
//     },
//     {
//       id: 2,
//       title: "Essential Support",
//       features: [
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//       ],
//       buttonText: "Lorem ipsum",
//     },
//     {
//       id: 3,
//       title: "Essential Support",
//       features: [
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//       ],
//       buttonText: "Lorem ipsum",
//     },
//     {
//       id: 4,
//       title: "Essential Support",
//       features: [
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//         "Lorem ipsum dolor",
//       ],
//       buttonText: "Lorem ipsum",
//     },
//   ],
//   trustedLogos: [
//     { id: 1, src: "/images/logo1.svg", alt: "Logoipsum 1" },
//     { id: 2, src: "/images/logo2.svg", alt: "Logoipsum 2" },
//     { id: 3, src: "/images/logo3.svg", alt: "Logoipsum 3" },
//     { id: 4, src: "/images/logo4.svg", alt: "Logoipsum 4" },
//     { id: 5, src: "/images/logo5.svg", alt: "Logoipsum 5" },
//     { id: 6, src: "/images/logo6.svg", alt: "Logoipsum 6" },
//   ],
//   pricingCards: [
//     {
//       id: 1,
//       title: "Lorem ipsum dolor sit",
//       description: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       price: "$0.0425",
//       unit: "/per word",
//       buttonText: "Submit Enquiry",
//       features: [
//         "Lorem ipsum consectetur adipiscing",
//         "sed do eiusmod tempor",
//         "amet, consectetur adipiscing elit.",
//         "Lorem ipsum dolor sit",
//       ],
//       linkText: "Learn more",
//     },
//     {
//       id: 2,
//       title: "Lorem ipsum dolor sit",
//       description: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       price: "$0.0425",
//       unit: "/per word",
//       buttonText: "Submit Enquiry",
//       features: [
//         "Lorem ipsum consectetur adipiscing",
//         "sed do eiusmod tempor",
//         "amet, consectetur adipiscing elit.",
//         "Lorem ipsum dolor sit",
//       ],
//       linkText: "Learn more",
//     },
//     {
//       id: 3,
//       title: "Lorem ipsum dolor sit",
//       description: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       price: "$0.0425",
//       unit: "/per word",
//       buttonText: "Submit Enquiry",
//       features: [
//         "Lorem ipsum consectetur adipiscing",
//         "sed do eiusmod tempor",
//         "amet, consectetur adipiscing elit.",
//         "Lorem ipsum dolor sit",
//       ],
//       linkText: "Learn more",
//     },
//   ],
// };

// const additionalData = {
//   exploreCards: [
//     { id: 1, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#E0E8FF]", logo: "/images/logo2.svg" },
//     { id: 2, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#D1FCE3]", logo: "/images/logo2.svg"  },
//     { id: 3, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#FCE0EB]", logo: "/images/logo2.svg" },
//     { id: 4, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#FCEFDB]", logo: "/images/logo2.svg" },
//   ],
//   stats: [
//     { id: 1, text: "10B+ Words Perfected", icon: FileText },
//     { id: 2, text: "5M+ Satisfied Users", icon: User },
//     { id: 3, text: "99.8% Satisfaction Rating", icon: ThumbsUp },
//   ],
//   reasons: [
//     { id: 1, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
//     { id: 2, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
//     { id: 3, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
//     { id: 4, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
//   ]
// };

// const faqData = [
//   {
//     id: "01",
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//     answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     id: "02",
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//     answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: "03",
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//     answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: "04",
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//     answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: "05",
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//     answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: "06",
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//     answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
// ];

// export default function DashboardComponent() {
//   const [openId, setOpenId] = useState<string | null>(null);

//   const toggleFaq = (id: string) => {
//     setOpenId(openId === id ? null : id);
//   };
//   return (
//     <div className="w-full font-dm-sans">
//       <div className="inline-flex items-center gap-3 border border-[#EAECF0] rounded-full p-1 pr-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-max">
//         <span className="bg-[#171717] text-white text-[12px] font-bold px-3 py-1 rounded-full">
//           New
//         </span>
//         <span className="text-[14px] text-[#525866] font-medium">
//           Introducing the Submit Right
//         </span>
//       </div>

//       <div className="mt-6 mb-8">
//         <p className="text-[#A0AAB5] text-[14px] font-medium mb-1">
//           My Workspace
//         </p>
//         <h1 className="text-[32px] font-bold text-[#171717] tracking-tight">
//           Good Evening, John Doe
//         </h1>
//       </div>

//       <div className="grid grid-cols-6 gap-6 mb-12">
//         {dashboardData.services.map((service) => (
//           <div key={service.id} className="flex flex-col items-center gap-4">
//             <div className="w-full aspect-[4/5] bg-[#F5F7FA] rounded-[16px]"></div>
//             <p className="text-center text-[14px] font-bold text-[#171717] whitespace-pre-line leading-tight">
//               {service.title}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="mb-16">
//         <h2 className="text-[24px] font-bold text-[#171717] mb-6">
//           Publication Support Packages
//         </h2>
        
//         <div className="grid grid-cols-2 gap-6">
//           {dashboardData.packages.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="bg-[#F5F7FA] rounded-[24px] p-8 flex flex-col justify-end min-h-[280px]"
//             >
//               <div>
//                 <h3 className="text-[16px] font-bold text-[#171717] mb-4">
//                   {pkg.title}
//                 </h3>
//                 <div className="flex items-end justify-between">
//                   <div className="grid grid-cols-2 gap-x-8 gap-y-2">
//                     {pkg.features.map((feature, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center gap-2 text-[#525866] text-[14px]"
//                       >
//                         <div className="w-[4px] h-[4px] bg-[#A0AAB5] rounded-full"></div>
//                         {feature}
//                       </div>
//                     ))}
//                   </div>
//                   <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold transition-colors">
//                     {pkg.buttonText}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mb-16 relative">
//   <h2 className="text-[20px] font-bold text-[#171717] mb-8">
//     Trusted by 1600+ journals, universities and societies
//   </h2>

//   <div className="relative flex items-center justify-between overflow-hidden">
    
//     {/* LEFT FADE */}
//     <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10" />

//     {/* RIGHT FADE */}
//     <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />

//     {/* LOGOS */}
//     <div className="flex items-center justify-between w-full">
//       {dashboardData.trustedLogos.map((logo) => (
//         <img 
//           key={logo.id} 
//           src={logo.src} 
//           alt={logo.alt} 
//           className="h-[24px] w-auto object-contain"
//         />
//       ))}
//     </div>

//   </div>
// </div>

//       <div className="mb-12">
//         <h2 className="text-[24px] font-bold text-[#171717] mb-6">
//           Lorem ipsum dolor sit amet
//         </h2>
//         <div className="grid grid-cols-3 gap-6">
//           {dashboardData.pricingCards.map((card) => (
//             <div 
//               key={card.id} 
//               className="bg-white border border-[#EAECF0] rounded-[16px] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col"
//             >
//               <h3 className="text-[18px] font-bold text-[#171717] mb-2">
//                 {card.title}
//               </h3>
//               <p className="text-[#8A94A6] text-[14px] leading-relaxed mb-8">
//                 {card.description}
//               </p>

//               <div className="flex items-end justify-between mb-6">
//                 <div className="flex flex-col">
//                   <span className="text-[13px] text-[#A0AAB5] mb-1">Starts from</span>
//                   <div>
//                     <span className="text-[22px] font-bold text-[#171717]">{card.price}</span>
//                     <span className="text-[13px] text-[#A0AAB5] ml-1">{card.unit}</span>
//                   </div>
//                 </div>
//                 <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors">
//                   {card.buttonText}
//                 </button>
//               </div>

//               <div className="w-full h-[1px] bg-[#EAECF0] mb-6"></div>

//               <div className="flex flex-col gap-3.5 mb-8 flex-1">
//                 {card.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-start gap-2.5">
//                     <Check className="w-[16px] h-[16px] text-[#A0AAB5] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
//                     <span className="text-[#525866] text-[14px]">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <a href="#" className="text-[#00A0E3] text-[14px] font-bold hover:underline inline-block mt-auto w-max">
//                 {card.linkText}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div className="mb-12">
//         <h2 className="text-[20px] font-bold text-[#171717] mb-6">
//           Lorem ipsum dolor sit amet
//         </h2>
//         <div className="grid grid-cols-4 gap-6">
//           {additionalData.exploreCards.map((card) => (
//             <div key={card.id} className="border border-[#EAECF0] rounded-[12px] overflow-hidden bg-white flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
//               <div className={`h-[160px] w-full ${card.bgColor}`}></div>
//               <div className="p-5 flex-1 flex flex-col">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-[15px] font-bold text-[#171717]">{card.title}</h3>
//                   <img src={card.logo} alt="Logoipsum" className="h-[20px] object-contain" />
//                 </div>
//                 <p className="text-[#8A94A6] text-[13px] leading-relaxed mb-6 flex-1">
//                   {card.desc}
//                 </p>
//                 <button className="w-full py-2 border border-[#00A0E3] text-[#00A0E3] rounded-[8px] text-[13px] font-bold hover:bg-[#F0F8FC] transition-colors">
//                   Explore
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- YOUR ORDERS SECTION --- */}
//       <div className="mb-12">
//         <h2 className="text-[20px] font-bold text-[#171717] mb-6">
//           Your Orders
//         </h2>
//         <div className="bg-[#F0F7FB] border border-[#E4EEF5] rounded-[16px] p-8">
//           <h3 className="text-[16px] font-bold text-[#171717] mb-1">
//             We are looking forward to helping you get published
//           </h3>
//           <p className="text-[#8A94A6] text-[14px] mb-6">
//             Your orders will appear here once you submit an enquiry.
//           </p>
//           <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors mb-10">
//             Submit Enquiry
//           </button>

//           <div className="flex items-center gap-8">
//             {additionalData.stats.map((stat) => (
//               <div key={stat.id} className="flex items-center gap-2.5">
//                 <stat.icon className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
//                 <span className="text-[14px] font-bold text-[#171717]">{stat.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- WHY CHOOSE SUBMIT RIGHT SECTION --- */}
//       <div className="mb-12">
//         <h2 className="text-[20px] font-bold text-[#171717] mb-6">
//           Why Choose Submit Right
//         </h2>
//         <div className="grid grid-cols-4 border border-[#EAECF0] rounded-[16px] bg-white divide-x divide-[#EAECF0] overflow-hidden">
//           {additionalData.reasons.map((reason) => (
//             <div key={reason.id} className="p-8 flex flex-col">
//               <div className="w-[72px] h-[72px] rounded-full bg-[#F5F7FA] mb-6 flex-shrink-0"></div>
//               <h3 className="text-[16px] font-bold text-[#171717] mb-2">
//                 {reason.title}
//               </h3>
//               <p className="text-[#8A94A6] text-[14px] leading-relaxed">
//                 {reason.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mb-12">
//         <h2 className="text-[20px] font-bold text-[#171717] mb-6">
//           Frequently Asked Questions
//         </h2>
        
//         <div className="border border-[#EAECF0] rounded-[16px] bg-white overflow-hidden divide-y divide-[#EAECF0]">
//           {faqData.map((faq) => {
//             const isOpen = openId === faq.id;
//             return (
//               <div key={faq.id} className="flex flex-col">
//                 <button
//                   onClick={() => toggleFaq(faq.id)}
//                   className="flex items-center justify-between p-5 w-full text-left transition-colors hover:bg-[#F9FAFB]"
//                 >
//                   <div className="flex items-center gap-4">
//                     <span className="text-[16px] font-bold text-[#171717]">
//                       {faq.id}
//                     </span>
//                     <span className="text-[15px] text-[#8A94A6]">
//                       {faq.question}
//                     </span>
//                   </div>
//                   {isOpen ? (
//                     <Minus className="w-[20px] h-[20px] text-[#00A0E3] flex-shrink-0" strokeWidth={2} />
//                   ) : (
//                     <Plus className="w-[20px] h-[20px] text-[#00A0E3] flex-shrink-0" strokeWidth={2} />
//                   )}
//                 </button>
//                 {isOpen && (
//                   <div className="px-5 pb-5 pl-[46px]">
//                     <p className="text-[#525866] text-[14px] leading-relaxed">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- CONTACT SUPPORT SECTION --- */}
//       <div className="mb-8">
//         <div className="bg-[#F0F8FC] border border-[#E0F0F9] rounded-[16px] p-8">
//           <h3 className="text-[18px] font-bold text-[#171717] mb-2">
//             Have more questions for us?
//           </h3>
//           <p className="text-[#8A94A6] text-[15px] mb-8">
//             Our specialists are always happy to help. Contact us during standard business hours or email us 24/7, and we'll get back to you.
//           </p>
          
//           <div className="flex items-center gap-8">
//             <div className="flex items-center gap-3">
//               <div className="bg-[#00A0E3] p-2.5 rounded-[8px] text-white">
//                 <Phone className="w-[18px] h-[18px]" strokeWidth={2} />
//               </div>
//               <span className="text-[14px] font-bold text-[#171717]">
//                 Call us at +1 (669) 272-1214
//               </span>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <div className="bg-[#00A0E3] p-2.5 rounded-[8px] text-white">
//                 <Mail className="w-[18px] h-[18px]" strokeWidth={2} />
//               </div>
//               <span className="text-[14px] font-bold text-[#171717]">
//                 Email us at request@editage.com
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- FOOTER --- */}
//       <div className="border-t border-[#EAECF0] pt-6 flex justify-center">
//         <p className="text-[#A0AAB5] text-[13px]">
//           Copyright 2026 Submit Right. All rights reserved.
//         </p>
//       </div>
     
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { 
  Check, 
  FileText, 
  User, 
  ThumbsUp, 
  Plus, 
  Minus, 
  Phone, 
  Mail 
} from "lucide-react";

const dashboardData = {
  services: [
    { id: 1, title: "Enhanced Personal\nBranding" },
    { id: 2, title: "Streamlined Research\nSupport" },
    { id: 3, title: "Efficient Editorial\nWorkflows" },
    { id: 4, title: "Global Content\nVisibility" },
    { id: 5, title: "Academic\nTranslation" },
    { id: 6, title: "Scientific\nWriting" },
  ],
  packages: [
    {
      id: 1,
      title: "Essential Support",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
      ],
      buttonText: "Lorem ipsum",
    },
    {
      id: 2,
      title: "Essential Support",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
      ],
      buttonText: "Lorem ipsum",
    },
    {
      id: 3,
      title: "Essential Support",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
      ],
      buttonText: "Lorem ipsum",
    },
    {
      id: 4,
      title: "Essential Support",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor",
      ],
      buttonText: "Lorem ipsum",
    },
  ],
  trustedLogos: [
    { id: 1, src: "/images/logo1.svg", alt: "Logoipsum 1" },
    { id: 2, src: "/images/logo2.svg", alt: "Logoipsum 2" },
    { id: 3, src: "/images/logo3.svg", alt: "Logoipsum 3" },
    { id: 4, src: "/images/logo4.svg", alt: "Logoipsum 4" },
    { id: 5, src: "/images/logo5.svg", alt: "Logoipsum 5" },
    { id: 6, src: "/images/logo6.svg", alt: "Logoipsum 6" },
  ],
  pricingCards: [
    {
      id: 1,
      title: "Lorem ipsum dolor sit",
      description: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      price: "$0.0425",
      unit: "/per word",
      buttonText: "Submit Enquiry",
      features: [
        "Lorem ipsum consectetur adipiscing",
        "sed do eiusmod tempor",
        "amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit",
      ],
      linkText: "Learn more",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit",
      description: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      price: "$0.0425",
      unit: "/per word",
      buttonText: "Submit Enquiry",
      features: [
        "Lorem ipsum consectetur adipiscing",
        "sed do eiusmod tempor",
        "amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit",
      ],
      linkText: "Learn more",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit",
      description: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      price: "$0.0425",
      unit: "/per word",
      buttonText: "Submit Enquiry",
      features: [
        "Lorem ipsum consectetur adipiscing",
        "sed do eiusmod tempor",
        "amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit",
      ],
      linkText: "Learn more",
    },
  ],
};

const additionalData = {
  exploreCards: [
    { id: 1, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#E0E8FF]", logo: "/images/logo2.svg" },
    { id: 2, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#D1FCE3]", logo: "/images/logo2.svg"  },
    { id: 3, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#FCE0EB]", logo: "/images/logo2.svg" },
    { id: 4, title: "Lorem ipsum", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.", bgColor: "bg-[#FCEFDB]", logo: "/images/logo2.svg" },
  ],
  stats: [
    { id: 1, text: "10B+ Words Perfected", icon: FileText },
    { id: 2, text: "5M+ Satisfied Users", icon: User },
    { id: 3, text: "99.8% Satisfaction Rating", icon: ThumbsUp },
  ],
  reasons: [
    { id: 1, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
    { id: 2, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
    { id: 3, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
    { id: 4, title: "Lorem ipsum dolor sit", desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor." },
  ]
};

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

export default function DashboardComponent() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full  ] font-dm-sans  mx-auto px-6 lg:px-8 py-8">
      
      <div className="inline-flex items-center gap-3 border border-[#EAECF0] rounded-full p-1 pr-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-max">
        <span className="bg-[#171717] text-white text-[12px] font-bold px-3 py-1 rounded-full">
          New
        </span>
        <span className="text-[14px] text-[#525866] font-medium">
          Introducing the Submit Right
        </span>
      </div>

      <div className="mt-6 mb-8">
        <p className="text-[#A0AAB5] text-[14px] font-medium mb-1">
          My Workspace
        </p>
        <h1 className="text-[32px] font-medium text-[#171717] tracking-tight">
          Good Evening, John Doe
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        {dashboardData.services.map((service) => (
          <div key={service.id} className="flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-[#F5F7FA] rounded-[16px]"></div>
            <p className="text-center text-[14px] font-semibold text-[#171717] whitespace-pre-line leading-tight">
              {service.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-[24px] font-semibold text-[#171717] mb-6">
          Publication Support Packages
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardData.packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#F5F7FA] rounded-[24px] p-8 flex flex-col justify-end min-h-[280px]"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-[#171717] mb-4">
                  {pkg.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[#525866] text-[14px]"
                      >
                        <div className="w-[4px] h-[4px] bg-[#A0AAB5] rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold transition-colors shrink-0">
                    {pkg.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 relative w-full overflow-hidden">
        <h2 className="text-[20px] font-semibold text-[#171717] mb-8">
          Trusted by 1600+ journals, universities and societies
        </h2>

        {/* Internal Style for Marquee Animation */}
        <style>{`
          @keyframes slide {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-slide {
            animation: slide 25s linear infinite;
          }
          /* Optional: Pause the animation when the user hovers over the logos */
          .group:hover .animate-slide {
            animation-play-state: paused;
          }
        `}</style>

        {/* Strict overflow-hidden and w-full wrapper */}
        <div className="relative flex overflow-hidden w-full group">
          
          {/* LEFT FADE */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />

          {/* First Set of Logos */}
          <div className="flex shrink-0 min-w-full items-center justify-around gap-12 px-6 animate-slide">
            {dashboardData.trustedLogos.map((logo) => (
              <img 
                key={`logo-1-${logo.id}`} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-[24px] w-auto object-contain shrink-0"
              />
            ))}
          </div>

          {/* Second Set of Logos (Duplicated for seamless infinite loop) */}
          <div className="flex shrink-0 min-w-full items-center justify-around gap-12 px-6 animate-slide" aria-hidden="true">
            {dashboardData.trustedLogos.map((logo) => (
              <img 
                key={`logo-2-${logo.id}`} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-[24px] w-auto object-contain shrink-0"
              />
            ))}
          </div>

        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-[24px] font-semibold text-[#171717] mb-6">
          Lorem ipsum dolor sit amet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.pricingCards.map((card) => (
            <div 
              key={card.id} 
              className="bg-white border border-[#EAECF0] rounded-[16px] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col"
            >
              <h3 className="text-[18px] font-semibold text-[#171717] mb-2">
                {card.title}
              </h3>
              <p className="text-[#8A94A6] text-[14px] leading-relaxed mb-8">
                {card.description}
              </p>

              <div className="flex items-end justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#A0AAB5] mb-1">Starts from</span>
                  <div>
                    <span className="text-[22px] font-semibold text-[#171717]">{card.price}</span>
                    <span className="text-[13px] text-[#A0AAB5] ml-1">{card.unit}</span>
                  </div>
                </div>
                <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors">
                  {card.buttonText}
                </button>
              </div>

              <div className="w-full h-[1px] bg-[#EAECF0] mb-6"></div>

              <div className="flex flex-col gap-3.5 mb-8 flex-1">
                {card.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="w-[16px] h-[16px] text-[#A0AAB5] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-[#525866] text-[14px]">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="#" className="text-[#00A0E3] text-[14px] font-semibold hover:underline inline-block mt-auto w-max">
                {card.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-[20px] font-semibold text-[#171717] mb-6">
          Lorem ipsum dolor sit amet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalData.exploreCards.map((card) => (
            <div key={card.id} className="border border-[#EAECF0] rounded-[12px] overflow-hidden bg-white flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className={`h-[160px] w-full ${card.bgColor}`}></div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[15px] font-semibold text-[#171717]">{card.title}</h3>
                  <img src={card.logo} alt="Logoipsum" className="h-[20px] object-contain" />
                </div>
                <p className="text-[#8A94A6] text-[13px] leading-relaxed mb-6 flex-1">
                  {card.desc}
                </p>
                <button className="w-full py-2 border border-[#00A0E3] text-[#00A0E3] rounded-[8px] text-[13px] font-bold hover:bg-[#F0F8FC] transition-colors">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- YOUR ORDERS SECTION --- */}
      <div className="mb-12">
        <h2 className="text-[20px] font-semibold text-[#171717] mb-6">
          Your Orders
        </h2>
        <div className="bg-[#F0F7FB] border border-[#E4EEF5] rounded-[16px] p-8">
          <h3 className="text-[16px] font-semibold text-[#171717] mb-1">
            We are looking forward to helping you get published
          </h3>
          <p className="text-[#8A94A6] text-[14px] mb-6">
            Your orders will appear here once you submit an enquiry.
          </p>
          <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors mb-10">
            Submit Enquiry
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {additionalData.stats.map((stat) => (
              <div key={stat.id} className="flex items-center gap-2.5">
                <stat.icon className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
                <span className="text-[14px] font-semibold text-[#171717]">{stat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- WHY CHOOSE SUBMIT RIGHT SECTION --- */}
      <div className="mb-12">
        <h2 className="text-[20px] font-semibold text-[#171717] mb-6">
          Why Choose Submit Right
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#EAECF0] rounded-[16px] bg-white lg:divide-x divide-y lg:divide-y-0 divide-[#EAECF0] overflow-hidden">
          {additionalData.reasons.map((reason) => (
            <div key={reason.id} className="p-8 flex flex-col">
              <div className="w-[72px] h-[72px] rounded-full bg-[#F5F7FA] mb-6 flex-shrink-0"></div>
              <h3 className="text-[16px] font-semibold text-[#171717] mb-2">
                {reason.title}
              </h3>
              <p className="text-[#8A94A6] text-[14px] leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-[20px] font-semibold text-[#171717] mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="border border-[#EAECF0] rounded-[16px] bg-white overflow-hidden divide-y divide-[#EAECF0]">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="flex flex-col">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex items-center justify-between p-5 w-full text-left transition-colors hover:bg-[#F9FAFB]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[16px] font-bold text-[#171717]">
                      {faq.id}
                    </span>
                    <span className="text-[15px] text-[#8A94A6]">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <Minus className="w-[20px] h-[20px] text-[#00A0E3] flex-shrink-0" strokeWidth={2} />
                  ) : (
                    <Plus className="w-[20px] h-[20px] text-[#00A0E3] flex-shrink-0" strokeWidth={2} />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-[46px]">
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

      {/* --- CONTACT SUPPORT SECTION --- */}
      <div className="mb-8">
        <div className="bg-[#F0F8FC] border border-[#E0F0F9] rounded-[16px] p-8">
          <h3 className="text-[18px] font-semibold text-[#171717] mb-2">
            Have more questions for us?
          </h3>
          <p className="text-[#8A94A6] text-[15px] mb-8">
            Our specialists are always happy to help. Contact us during standard business hours or email us 24/7, and we'll get back to you.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#00A0E3] p-2.5 rounded-[8px] text-white">
                <Phone className="w-[18px] h-[18px]" strokeWidth={2} />
              </div>
              <span className="text-[14px] font-semibold text-[#171717]">
                Call us at +1 (669) 272-1214
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#00A0E3] p-2.5 rounded-[8px] text-white">
                <Mail className="w-[18px] h-[18px]" strokeWidth={2} />
              </div>
              <span className="text-[14px] font-semibold text-[#171717]">
                Email us at request@editage.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="border-t border-[#EAECF0] pt-6 pb-4 flex justify-center">
        <p className="text-[#A0AAB5] text-[13px]">
          Copyright 2026 Submit Right. All rights reserved.
        </p>
      </div>
     
    </div>
  );
}