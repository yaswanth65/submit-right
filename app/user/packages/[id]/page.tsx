// "use client";

// import React, { useState } from "react"; 
// import { 
//     Pencil, Check, ChevronRight, ChevronLeft, Image as ImageIcon,
//     GraduationCap, Briefcase, MessageSquare, ShieldCheck, 
//     Clock, CircleDollarSign, Package, Handshake, FileText,
//     Mail,
//     Minus,
//     Phone,
//     Plus
//   } from "lucide-react";
// const pageData = {
//   header: {
//     title: "Lorem ipsum dolor",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\nlabore et dolore magna aliqua. Ut enim ad minim veniam",
//   },
//   premiumServices: [
//     { id: "01", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
//     { id: "02", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
//     { id: "03", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
//     { id: "04", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
//     { id: "05", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
//     { id: "06", title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing." },
//   ],
//   pricingBox: {
//     badge: "You Save: $328",
//     title: "Lorem ipsum dolor",
//     desc: "Lorem ipsum dolor sit amet, consectetur\nadipiscing.",
//     features: [
//       "Lorem ipsum dolor",
//       "consectetur adipiscing",
//       "Lorem ipsum dolor sit amet",
//     ],
//     originalPrice: "$1240",
//     discountedPrice: "$912",
//   },
//   servicesAvailable: [
//     { 
//       id: 1, 
//       title: "Essential Support", 
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
//       value: "Value: $510", 
//       iconBg: "bg-[#FDEFD3]", 
//       iconColor: "text-[#C59432]" 
//     },
//     { 
//       id: 2, 
//       title: "Essential Support", 
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
//       value: "Value: $149", 
//       iconBg: "bg-[#FCEAEB]", 
//       iconColor: "text-[#D17A84]" 
//     },
//     { 
//       id: 3, 
//       title: "Essential Support", 
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
//       value: "Value: $80", 
//       iconBg: "bg-[#F0EBF9]", 
//       iconColor: "text-[#8E6FD6]" 
//     },
//     { 
//       id: 4, 
//       title: "Essential Support", 
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
//       value: "Value: $110", 
//       iconBg: "bg-[#E5F7EB]", 
//       iconColor: "text-[#58A771]" 
//     },
//     { 
//       id: 5, 
//       title: "Essential Support", 
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
//       value: "$0.17/word*", 
//       iconBg: "bg-[#E6F5F8]", 
//       iconColor: "text-[#53A2B3]" 
//     },
//     { 
//       id: 6, 
//       title: "Essential Support", 
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", 
//       value: "Value: $510", 
//       iconBg: "bg-[#FCECE1]", 
//       iconColor: "text-[#D1926D]" 
//     },
//   ]
// };

// const additionalPageData = {
//     belsFeatures: [
//       { id: 1, title: "PhDs, MDs", icon: GraduationCap },
//       { id: 2, title: "Engineers", icon: Briefcase },
//       { id: 3, title: "Journal Peer Reviewers", icon: MessageSquare },
//       { id: 4, title: "Subject Experts", icon: ShieldCheck },
//     ],
//     keyDetails: {
//       turnaround: { title: "Turnaround time", value: "3 Weeks" },
//       rate: { title: "Rate", value: "$912" },
//       packFeatures: { title: "Pack features", value: "Premium English Editing, Artwork Formatting, Plagiarism check, Journal Selection, Journal Submission, Resubmission support" },
//       benefits: { title: "Benefits", value: "For authors looking for submission-focused support for up to two journals" },
//       documentTypes: { title: "Document types", value: "Research papers" }
//     },
//     testimonials: [
//       {
//         id: 1,
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
//         author: "Rick Wright",
//         role: "Executive Engineer",
//         avatar: "https://i.pravatar.cc/150?u=1"
//       },
//       {
//         id: 2,
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
//         author: "Rick Wright",
//         role: "Executive Engineer",
//         avatar: "https://i.pravatar.cc/150?u=2"
//       },
//       {
//         id: 3,
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
//         author: "Rick Wright",
//         role: "Executive Engineer",
//         avatar: "https://i.pravatar.cc/150?u=3"
//       }
//     ]
//   };
//   const faqData = [
//     {
//       id: "01",
//       question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//       id: "02",
//       question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       id: "03",
//       question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       id: "04",
//       question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       id: "05",
//       question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       id: "06",
//       question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//   ];
  

// export default function ServicesPackComponent() {

//     const [openId, setOpenId] = useState<string | null>(null);
    
//       const toggleFaq = (id: string) => {
//         setOpenId(openId === id ? null : id);
//       };
//   return (
//     <div className="w-full font-dm-sans ">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
        
//         {/* --- LEFT COLUMN: Header & Bundle Box --- */}
//         <div className="lg:col-span-2 flex flex-col h-full">
//           <div className="mb-6">
//             <h1 className="text-[32px] font-bold text-[#171717] mb-2 tracking-tight">
//               {pageData.header.title}
//             </h1>
//             <p className="text-[#8A94A6] text-[15px] leading-relaxed max-w-[85%] whitespace-pre-line">
//               {pageData.header.description}
//             </p>
//           </div>

//           <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden flex-1 flex flex-col">
//             <div className="p-5 border-b border-[#EAECF0]">
//               <h2 className="text-[16px] font-bold text-[#171717]">
//                 6 premium services bundled in this pack:
//               </h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
//               {pageData.premiumServices.map((service, index) => (
//                 <div 
//                   key={service.id} 
//                   className={`flex items-start gap-3.5 p-6 
//                     ${index % 2 === 0 ? "md:border-r border-[#EAECF0]" : ""} 
//                     ${index < 4 ? "border-b border-[#EAECF0]" : ""}
//                     ${index === 4 && "border-b md:border-b-0 border-[#EAECF0]"}
//                   `}
//                 >
//                   <div className="w-[34px] h-[34px] rounded-[8px] bg-[#F5F7FA] border border-[#EAECF0] flex items-center justify-center shrink-0">
//                     <Pencil className="w-[15px] h-[15px] text-[#525866]" strokeWidth={2.5} />
//                   </div>
//                   <div>
//                     <h3 className="text-[14px] font-bold text-[#171717] mb-1">
//                       {service.id}. {service.title}
//                     </h3>
//                     <p className="text-[13px] text-[#A0AAB5] leading-relaxed">
//                       {service.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* --- RIGHT COLUMN: Pricing Box --- */}
//         <div className="lg:col-span-1 h-full">
//           <div className="relative bg-[#F8EED1] border border-[#EBE1C5] rounded-[16px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02)] h-full flex flex-col">
//             <div className="absolute top-0 right-0 bg-[#D4A347] text-white text-[12px] font-bold px-3 py-1.5 rounded-bl-[12px] rounded-tr-[16px]">
//               {pageData.pricingBox.badge}
//             </div>

//             <div className="p-8 flex-1 flex flex-col">
//               <h2 className="text-[20px] font-bold text-[#C59432] mb-2 mt-2">
//                 {pageData.pricingBox.title}
//               </h2>
//               <p className="text-[#8A94A6] text-[14px] mb-8 whitespace-pre-line leading-relaxed">
//                 {pageData.pricingBox.desc}
//               </p>

//               <div className="space-y-3.5 mb-10 flex-1">
//                 {pageData.pricingBox.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     <div className="w-[22px] h-[22px] rounded-full bg-[#D4A347] flex items-center justify-center shrink-0">
//                       <Check className="w-[12px] h-[12px] text-white" strokeWidth={3.5} />
//                     </div>
//                     <span className="text-[#171717] text-[14px] font-bold">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-auto">
//                 <div className="border-t border-[#E8D9B4] pt-6 mb-5">
//                   <div className="flex justify-between items-center mb-1.5">
//                     <span className="text-[#8A94A6] text-[14px] font-medium">Get 6 services worth</span>
//                     <span className="text-[#171717] text-[15px] font-bold line-through">{pageData.pricingBox.originalPrice}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-[#8A94A6] text-[14px] font-medium">For only:</span>
//                     <span className="text-[#C59432] text-[28px] font-bold tracking-tight">{pageData.pricingBox.discountedPrice}</span>
//                   </div>
//                 </div>

//                 <button className="w-full bg-[#171717] hover:bg-black text-white rounded-[8px] py-3 text-[15px] font-bold transition-colors">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* --- BOTTOM SECTION: Services Grid --- */}
//       <div>
//         <div className="mb-6">
//           <h2 className="text-[24px] font-bold text-[#171717] mb-1">
//             Services available in this pack
//           </h2>
//           <p className="text-[#8A94A6] text-[15px]">
//             Get basic publication support with this pack.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pageData.servicesAvailable.map((card) => (
//             <div 
//               key={card.id} 
//               className="bg-gray-100 border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}>
//                   <Pencil className="w-[18px] h-[18px]" strokeWidth={2.5} />
//                 </div>
//                 <div className="flex flex-col mt-1">
//                     <h3 className="text-[16px] font-bold text-[#171717]">{card.title}</h3>
//                 </div>
//               </div>
              
//               <p className="text-[#8A94A6] text-[13px] leading-relaxed flex-1 mb-6">
//                 {card.desc}
//               </p>

//               <div className="flex items-center justify-between border-t border-[#EAECF0] pt-5 mt-auto">
//                 <span className="text-[18px] font-bold text-[#171717]">{card.value}</span>
//                 <button className="flex items-center gap-1.5 px-4 py-2 border border-[#00A0E3] bg-white text-[#00A0E3] rounded-[8px] text-[13px] font-bold hover:bg-[#F0F8FC] transition-colors">
//                   View Details <ChevronRight className="w-[14px] h-[14px]" strokeWidth={2.5} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="bg-[#F4FAFD] border border-[#E4EEF5] rounded-[16px] p-6 flex flex-col md:flex-row items-center gap-8 mb-10 mt-12 ">
//         <div className="w-full md:w-[200px] h-[130px] bg-[#D1DCE5] rounded-[8px] flex shrink-0 items-center justify-center text-white overflow-hidden relative">
//            <ImageIcon className="w-16 h-16 text-[#A0AEBC] opacity-50" strokeWidth={1.5} />
//            {/* Replace this div with an actual <img> tag when you have the graphic */}
//         </div>
//         <div className="flex-1">
//           <h3 className="text-[18px] font-bold text-[#171717] mb-1.5">
//             We are looking forward to helping you get published
//           </h3>
//           <p className="text-[#8A94A6] text-[14px] mb-5">
//             Your orders will appear here once you submit an enquiry.
//           </p>
//           <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors">
//             Submit Enquiry
//           </button>
//         </div>
//       </div>

//       {/* --- BELS CERTIFIED SECTION --- */}
//       <div className="bg-gray-50 border border-[#EAECF0] rounded-[16px] p-6 mb-12">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//           <div className="max-w-[85%]">
//             <h3 className="text-[20px] font-bold text-[#171717] mb-2">
//               1 in 10 BELS-certified editors across the globe are associated with Editage
//             </h3>
//             <p className="text-[#8A94A6] text-[14px] leading-relaxed">
//               Our team includes PhDs, MDs, engineers, postgraduates, and journal peer reviewers who don't just have technical competency, but also a deep understanding of your subject.
//             </p>
//           </div>
//           <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors whitespace-nowrap">
//             Lorem ipsum
//           </button>
//         </div>

//         <div className="flex items-center flex-wrap gap-y-4">
//             {additionalPageData.belsFeatures.map((feature, idx) => (
//                 <div
//                 key={feature.id}
//                 className={`flex items-center gap-2 mr-4 ${
//                     idx !== additionalPageData.belsFeatures.length - 1
//                     ? "border-r border-[#EAECF0]"
//                     : ""
//                 }`}
//                 >
//                 <feature.icon
//                     className="w-[18px] h-[18px] text-[#8A94A6]"
//                     strokeWidth={2}
//                 />
//                 <span className="text-[14px] font-medium text-[#525866] whitespace-nowrap">
//                     {feature.title}
//                 </span>
//                 </div>
//             ))}
//             </div>
//       </div>

//       {/* --- KEY DETAILS SECTION --- */}
//       <div className="mb-10">
//         <h2 className="text-[20px] font-bold text-[#171717] mb-6">Key Details</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {/* Column 1 */}
//           <div className="flex flex-col gap-5">
//             <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
//               <div className="relative z-10">
//                 <h4 className="font-bold text-[#171717] text-[15px] mb-2">{additionalPageData.keyDetails.turnaround.title}</h4>
//                 <p className="text-[#525866] text-[14px]">{additionalPageData.keyDetails.turnaround.value}</p>
//               </div>
//               <Clock className="absolute -right-3 -top-1 w-[80px] h-[80px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
//             </div>
//             <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
//               <div className="relative z-10">
//                 <h4 className="font-bold text-[#171717] text-[15px] mb-2">{additionalPageData.keyDetails.rate.title}</h4>
//                 <p className="text-[#525866] text-[14px]">{additionalPageData.keyDetails.rate.value}</p>
//               </div>
//               <CircleDollarSign className="absolute -right-3 -bottom-3 w-[80px] h-[80px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
//             </div>
//           </div>

//           {/* Column 2 */}
//           <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
//             <div className="relative z-10">
//               <h4 className="font-bold text-[#171717] text-[15px] mb-3">{additionalPageData.keyDetails.packFeatures.title}</h4>
//               <p className="text-[#525866] text-[14px] leading-relaxed pr-6">{additionalPageData.keyDetails.packFeatures.value}</p>
//             </div>
//             <Package className="absolute -right-4 -top-4 w-[100px] h-[100px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
//           </div>

//           {/* Column 3 */}
//           <div className="flex flex-col gap-5">
//             <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
//               <div className="relative z-10">
//                 <h4 className="font-bold text-[#171717] text-[15px] mb-2">{additionalPageData.keyDetails.benefits.title}</h4>
//                 <p className="text-[#525866] text-[14px] leading-relaxed pr-4">{additionalPageData.keyDetails.benefits.value}</p>
//               </div>
//               <Handshake className="absolute -right-2 top-2 w-[70px] h-[70px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
//             </div>
//             <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
//               <div className="relative z-10">
//                 <h4 className="font-bold text-[#171717] text-[15px] mb-2">{additionalPageData.keyDetails.documentTypes.title}</h4>
//                 <p className="text-[#525866] text-[14px]">{additionalPageData.keyDetails.documentTypes.value}</p>
//               </div>
//               <FileText className="absolute -right-3 -bottom-3 w-[80px] h-[80px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- TESTIMONIALS SECTION --- */}
//       <div>
//         <h2 className="text-[20px] font-bold text-[#171717] mb-12">What our users say</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {additionalPageData.testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="relative pt-10 px-8 pb-8 bg-[#FAFAFB] border border-[#EAECF0] rounded-[16px] text-center shadow-sm">
//               <img 
//                 src={testimonial.avatar} 
//                 alt={testimonial.author} 
//                 className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-[4px] border-white object-cover shadow-sm"
//               />
//               <p className="text-[#8A94A6] text-[13px] leading-relaxed mb-6">
//                 {testimonial.text}
//               </p>
//               <div className="flex flex-col gap-0.5">
//                 <h4 className="text-[#00A0E3] font-bold text-[14px]">{testimonial.author}</h4>
//                 <span className="text-[#A0AAB5] text-[12px] font-medium">{testimonial.role}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slider Controls */}
//         <div className="flex justify-center gap-3 mt-8">
//           <button className="w-[32px] h-[32px] rounded border border-[#00A0E3] flex items-center justify-center text-[#00A0E3] hover:bg-[#F0F8FC] transition-colors">
//             <ChevronLeft className="w-5 h-5" strokeWidth={2} />
//           </button>
//           <button className="w-[32px] h-[32px] rounded border border-[#00A0E3] flex items-center justify-center text-[#00A0E3] hover:bg-[#F0F8FC] transition-colors">
//             <ChevronRight className="w-5 h-5" strokeWidth={2} />
//           </button>
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
  Pencil, Check, ChevronRight, ChevronLeft, Image as ImageIcon,
  GraduationCap, Briefcase, MessageSquare, ShieldCheck, 
  Clock, CircleDollarSign, Package, Handshake, FileText,
  Mail,
  Minus,
  Phone,
  Plus
} from "lucide-react";

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

const additionalPageData = {
  belsFeatures: [
    { id: 1, title: "PhDs, MDs", icon: GraduationCap },
    { id: 2, title: "Engineers", icon: Briefcase },
    { id: 3, title: "Journal Peer Reviewers", icon: MessageSquare },
    { id: 4, title: "Subject Experts", icon: ShieldCheck },
  ],
  keyDetails: {
    turnaround: { title: "Turnaround time", value: "3 Weeks" },
    rate: { title: "Rate", value: "$912" },
    packFeatures: { title: "Pack features", value: "Premium English Editing, Artwork Formatting, Plagiarism check, Journal Selection, Journal Submission, Resubmission support" },
    benefits: { title: "Benefits", value: "For authors looking for submission-focused support for up to two journals" },
    documentTypes: { title: "Document types", value: "Research papers" }
  },
  testimonials: [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      author: "Rick Wright",
      role: "Executive Engineer",
      avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      author: "Rick Wright",
      role: "Executive Engineer",
      avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      author: "Rick Wright",
      role: "Executive Engineer",
      avatar: "https://i.pravatar.cc/150?u=3"
    }
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

export default function ServicesPackComponent() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full font-dm-sans mx-auto px-6 lg:px-8 py-8">
      
      {/* --- HEADER & PRICING --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
        
        {/* --- LEFT COLUMN: Header & Bundle Box --- */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold text-[#171717] mb-2 tracking-tight">
              {pageData.header.title}
            </h1>
            <p className="text-[#8A94A6] text-[14px] leading-relaxed max-w-[85%] whitespace-pre-line">
              {pageData.header.description}
            </p>
          </div>

          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden flex-1 flex flex-col">
            <div className="p-5 border-b border-[#EAECF0]">
              <h2 className="text-[16px] font-semibold text-[#171717]">
                6 premium services bundled in this pack:
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
              {pageData.premiumServices.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`flex items-start gap-3.5 px-4 pt-6
                    ${index % 2 === 0 ? "md:border-r border-[#EAECF0]" : ""} 
                    ${index < 4 ? "border-b border-[#EAECF0]" : ""}
                    ${index === 4 && "border-b md:border-b-0 border-[#EAECF0]"}
                  `}
                >
                  <div className="w-[34px] h-[34px] rounded-[8px] bg-[#F5F7FA] border border-[#EAECF0] flex items-center justify-center shrink-0">
                    <Pencil className="w-[15px] h-[15px] text-[#525866]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#171717] mb-1">
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
        <div className="lg:col-span-1 h-full">
          <div className="relative bg-[#F4E9CD] border border-[#CEA02D] rounded-[16px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02)] h-full flex flex-col">
            <div className="absolute top-0 right-0 bg-[#CEA02D] text-white text-[12px] font-bold px-3 py-1.5 rounded-bl-[12px] rounded-tr-[16px]">
              {pageData.pricingBox.badge}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-[18px] font-bold text-[#C59432] mb-2 mt-2">
                {pageData.pricingBox.title}
              </h2>
              <p className="text-[#78788D] text-[14px] mb-8 whitespace-pre-line leading-relaxed">
                {pageData.pricingBox.desc}
              </p>

              <div className="space-y-3.5 mb-10 flex-1">
                {pageData.pricingBox.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-[22px] h-[22px] rounded-full bg-[#CEA02D] flex items-center justify-center shrink-0">
                      <Check className="w-[12px] h-[12px] text-white" strokeWidth={3.5} />
                    </div>
                    <span className="text-[#171717] text-[14px] font-bold">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="border-t border-[#E8D9B4] pt-6 mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#78788D] text-[14px] font-medium">Get 6 services worth</span>
                    <span className="text-[#171717] text-[15px] font-bold line-through">{pageData.pricingBox.originalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#78788D] text-[14px] font-medium">For only:</span>
                    <span className="text-[#CEA02D] text-[28px] font-bold tracking-tight">{pageData.pricingBox.discountedPrice}</span>
                  </div>
                </div>

                <button className="w-full bg-[#171717] hover:bg-black text-white rounded-[8px] py-3 text-[15px] font-bold transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- SERVICES GRID --- */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-[24px] font-bold text-[#171717] mb-1">
            Services available in this pack
          </h2>
          <p className="text-[#8A94A6] text-[15px]">
            Get basic publication support with this pack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.servicesAvailable.map((card) => (
            <div 
              key={card.id} 
              className="bg-[#FAFAFA] border border-[#EAECF0] rounded-[16px] p-4 shadow-sm flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}>
                  <Pencil className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col mt-1">
                    <h3 className="text-[16px] font-bold text-[#171717]">{card.title}</h3>
                </div>
              </div>
              
              <p className="text-[#78788D] text-[13px] leading-relaxed flex-1 mb-6">
                {card.desc}
              </p>

              <div className="flex items-center justify-between border-t border-[#EAECF0] pt-4 mt-auto">
                <span className="text-[18px] font-bold text-[#171717]">{card.value}</span>
                <button className="flex items-center gap-1.5 px-4 py-2 border border-[#00A0E3] bg-white text-[#00A0E3] rounded-[8px] text-[14px] font-bold hover:bg-[#F0F8FC] transition-colors">
                  View Details <ChevronRight className="w-[14px] h-[14px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ENQUIRY BANNER --- */}
      <div className="bg-[#F4FAFD] border border-[#E4EEF5] rounded-[16px] p-6 flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-full md:w-[200px] h-[130px] bg-[#D1DCE5] rounded-[8px] flex shrink-0 items-center justify-center text-white overflow-hidden relative">
           <ImageIcon className="w-16 h-16 text-[#A0AEBC] opacity-50" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] font-bold text-[#171717] mb-1.5">
            We are looking forward to helping you get published
          </h3>
          <p className="text-[#8A94A6] text-[14px] mb-5">
            Your orders will appear here once you submit an enquiry.
          </p>
          <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors">
            Submit Enquiry
          </button>
        </div>
      </div>

      {/* --- BELS CERTIFIED SECTION --- */}
      <div className="bg-gray-50 border border-[#EAECF0] rounded-[16px] p-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
          <div className="max-w-[85%]">
            <h3 className="text-[20px] font-semibold text-[#171717] mb-2">
              1 in 10 BELS-certified editors across the globe are associated with Editage
            </h3>
            <p className="text-[#8A94A6] text-[14px] leading-relaxed">
              Our team includes PhDs, MDs, engineers, postgraduates, and journal peer reviewers who don't just have technical competency, but also a deep understanding of your subject.
            </p>
          </div>
          <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors whitespace-nowrap">
            Lorem ipsum
          </button>
        </div>

        <div className="flex items-center flex-wrap gap-y-4 pt-6 border-t border-[#EAECF0]">
          {additionalPageData.belsFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              className={`flex items-center gap-2.5 mr-6 pr-6 ${
                  idx !== additionalPageData.belsFeatures.length - 1
                  ? "border-r border-[#EAECF0]"
                  : ""
              }`}
            >
              <feature.icon
                  className="w-[18px] h-[18px] text-[#8A94A6]"
                  strokeWidth={2.5}
              />
              <span className="text-[14px] font-bold text-[#525866] whitespace-nowrap">
                  {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- KEY DETAILS SECTION --- */}
      <div className="mb-16">
        <h2 className="text-[20px] font-bold text-[#171717] mb-6">Key Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
              <div className="relative z-10">
                <h4 className="font-bold text-[#1C1C1D] text-[18px] mb-2">{additionalPageData.keyDetails.turnaround.title}</h4>
                <p className="text-[#78788D] text-[16px]">{additionalPageData.keyDetails.turnaround.value}</p>
              </div>
              <Clock className="absolute -right-3 -top-1 w-[80px] h-[80px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
            </div>
            <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
              <div className="relative z-10">
                <h4 className="font-bold text-[#1C1C1D] text-[18px] mb-2">{additionalPageData.keyDetails.rate.title}</h4>
                <p className="text-[#78788D] text-[16px]">{additionalPageData.keyDetails.rate.value}</p>
              </div>
              <CircleDollarSign className="absolute -right-3 -bottom-3 w-[80px] h-[80px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
            </div>
          </div>

          {/* Column 2 */}
          <div className="relative overflow-hidden flex flex-col  justify-center items-center bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
            <div className="relative z-10">
              <h4 className="font-semibold text-[#1C1C1D] text-[18px] mb-3">{additionalPageData.keyDetails.packFeatures.title}</h4>
              <p className="text-[#78788D] text-[16px] leading-relaxed pr-6">{additionalPageData.keyDetails.packFeatures.value}</p>
            </div>
            <Package className="absolute -right-4 -top-4 w-[100px] h-[100px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
              <div className="relative z-10">
                <h4 className="font-bold text-[#1C1C1D] text-[18px] mb-2">{additionalPageData.keyDetails.benefits.title}</h4>
                <p className="text-[#78788D] text-[16px] leading-relaxed pr-4">{additionalPageData.keyDetails.benefits.value}</p>
              </div>
              <Handshake className="absolute -right-2 top-2 w-[70px] h-[70px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
            </div>
            <div className="relative overflow-hidden bg-[#F2F8FD] rounded-[12px] p-6 h-full border border-[#EBF3F9]">
              <div className="relative z-10">
                <h4 className="font-bold text-[#1C1C1D] text-[18px] mb-2">{additionalPageData.keyDetails.documentTypes.title}</h4>
                <p className="text-[#78788D] text-[16px]">{additionalPageData.keyDetails.documentTypes.value}</p>
              </div>
              <FileText className="absolute -right-3 -bottom-3 w-[80px] h-[80px] text-[#D0E6F7] opacity-60 z-0" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* --- TESTIMONIALS SECTION --- */}
      <div className="mb-12">
        <h2 className="text-[20px] font-bold text-[#171717] mb-4">What our users say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalPageData.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative pt-10 px-8 pb-8 bg-[#FAFAFB] border border-[#EAECF0] rounded-[16px] text-center shadow-sm mt-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.author} 
                className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-[4px] border-white object-cover shadow-sm"
              />
              <p className="text-[#78788D] text-[14px] leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-[#00A0E3] font-bold text-[14px]">{testimonial.author}</h4>
                <span className="text-[#78788D] text-[12px] font-medium">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center gap-3 mt-8">
          <button className="w-[32px] h-[32px] rounded border border-[#00A0E3] flex items-center justify-center text-[#00A0E3] hover:bg-[#F0F8FC] transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <button className="w-[32px] h-[32px] rounded border border-[#00A0E3] flex items-center justify-center text-[#00A0E3] hover:bg-[#F0F8FC] transition-colors">
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="mb-8">
        <h2 className="text-[20px] font-bold text-[#171717] mb-6">
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
                    <span className="text-[15px] text-[#78788D]">
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
          <h3 className="text-[18px] font-bold text-[#171717] mb-2">
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
              <span className="text-[14px] font-bold text-[#171717]">
                Call us at +1 (669) 272-1214
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#00A0E3] p-2.5 rounded-[8px] text-white">
                <Mail className="w-[18px] h-[18px]" strokeWidth={2} />
              </div>
              <span className="text-[14px] font-bold text-[#171717]">
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