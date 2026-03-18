"use client";

import React, { useState } from "react";
import { 
  FileText, 
  CreditCard, 
  Check, 
  Info, 
  Download, 
  Send, 
  Flag,
  RotateCw,
  Lock,
  ChevronRight,
  X
} from "lucide-react";

export default function DocumentDetailsSlugPage() {
  // 1. Data provided by user
  const documents = [
    { 
      id: "ai-research-paper", 
      name: "AI Research Paper", 
      service: "Journal Editing", 
      date: "Oct 24, 2025", 
      status: "Payment Needed", 
      action: "Pay Now" 
    },
    { 
      id: "thesis-chapter-3", 
      name: "Thesis Chapter 3", 
      service: "Academic Editing", 
      date: "Oct 23, 2025", 
      status: "Being Edited", 
      action: "-" 
    },
    { 
      id: "literature-review-draft", 
      name: "Literature Review Draft", 
      service: "Proofreading", 
      date: "Oct 21, 2025", 
      status: "Completed", 
      action: "Download" 
    },
    { 
      id: "methodology-section", 
      name: "Methodology Section", 
      service: "Journal Editing", 
      date: "Oct 19, 2025", 
      status: "Completed", 
      action: "Download" 
    },
    { 
      id: "ai-research-paper-final", 
      name: "AI Research Paper", 
      service: "Final Proofread", 
      date: "Dec 20, 2025", 
      status: "Payment Needed", 
      action: "Pay Now" 
    },
    { 
      id: "thesis-chapter-1", 
      name: "Thesis Chapter 1", 
      service: "Academic Editing", 
      date: "Oct 23, 2025", 
      status: "Being Edited", 
      action: "-" 
    },
  ];

  // 2. Simulate taking the slug from the URL
  // "ai-research-paper" -> Payment State
  // "thesis-chapter-3" -> Review State
  const currentSlug = "thesis-chapter-3"; 
  
  // Find the specific document
  const document = documents.find(doc => doc.id === currentSlug) || documents[0];

  // 3. Determine Initial Layout State based strictly on Document Data
  // State can be: "payment", "review", or "in-revision" (after submitting the review modal)
  const [pageState, setPageState] = useState<"payment" | "review" | "in-revision">(
    document.status === "Payment Needed" ? "payment" : "review"
  );

  // 4. Modal States
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<"approve" | "request" | null>(null);

  const handleSubmitDecision = () => {
    if (reviewDecision) {
      setIsReviewModalOpen(false);
      setPageState("in-revision");
    }
  };

  return (
    <div className="w-full font-dm-sans bg-[#F9FAFB] min-h-[calc(100vh-76px)]  flex flex-col">
      
      {/* --- PAGE HEADER --- */}
      <div className=" mx-auto w-full bg-white border-b border-gray-100 px-4 mx-2 py-2  ">
 

        <h1 className="text-[24px] lg:text-[28px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Document Details
        </h1>
        <p className="text-[#8A94A6] text-[14px]">
          {document.name} — <span className="text-[#A0AAB5]">{document.service}</span>
        </p>
      </div>

      {/* --- MAIN CARD (Strict Gray-100 Borders, No outer gap/padding issues) --- */}
      <div className=" px-4 mx-2 mx-auto w-full bg-white border border-gray-100  shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden">
        
        {/* === SECTION 1: BANNER === */}
        {pageState === "review" && (
          <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] bg-[#F4EBFF] rounded-[12px] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#A855F7]" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-[18px] font-bold text-[#171717] leading-tight">Review Changes</h2>
                  <span className="bg-[#F4EBFF] text-[#A855F7] text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap tracking-wide">
                    Revision Shared
                  </span>
                </div>
                <p className="text-[#8A94A6] text-[14px] leading-tight">
                  Please review the revised document before proceeding
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-5 py-2.5 rounded-[8px] flex items-center gap-2 text-[14px] font-bold transition-colors shrink-0 shadow-sm"
            >
              <Check className="w-[18px] h-[18px]" strokeWidth={2.5} />
              Review Changes
            </button>
          </div>
        )}

        {pageState === "in-revision" && (
          <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] bg-[#E1F4FD] rounded-[12px] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#00A0E3]" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-[18px] font-bold text-[#171717] leading-tight">Review Changes</h2>
                <p className="text-[#8A94A6] text-[14px] leading-tight">
                  Your document is request for changes.
                </p>
              </div>
            </div>
            <span className="bg-[#EFF6FF] text-[#3B82F6] text-[13px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
              In Revision
            </span>
          </div>
        )}

        {pageState === "payment" && (
          <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] bg-[#FFF0E6] rounded-[12px] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#F97316]" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-[18px] font-bold text-[#171717] leading-tight">Completed - Awaiting Payment</h2>
                <p className="text-[#8A94A6] text-[14px] leading-tight">
                  Your document is ready. Complete payment to download final files.
                </p>
              </div>
            </div>
            <span className="bg-[#FFF0E6] text-[#F97316] text-[12px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
              Payment Needed
            </span>
          </div>
        )}

        {/* === SECTION 2: ALERT STRIP (Hidden in 'in-revision' state) === */}
        {pageState !== "in-revision" && (
          <div className={`px-6 py-3 border-b border-gray-100 flex items-center gap-2 text-[13px] ${
            pageState === "review" ? "bg-[#FDF5FA] text-[#A855F7]" : "bg-[#FFF9F5] text-[#F97316]"
          }`}>
            <Info className="w-4 h-4 shrink-0" strokeWidth={2.5} />
            <span className="font-medium">
              <span className="font-bold">Action required:</span> {pageState === "review" ? "Please review the revised document and approve or request changes." : "Complete payment to access your final document."}
            </span>
          </div>
        )}

        {/* === SECTION 3: PAYMENT DETAILS (Payment State Only) === */}
        {pageState === "payment" && (
          <div className="flex flex-col border-b border-gray-100">
            <div className="px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col items-start gap-2">
                <span className="bg-[#FFF0E6] text-[#F97316] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Pending
                </span>
                <div className="flex flex-col mt-1">
                  <span className="text-[32px] font-bold text-[#171717] leading-none mb-1.5">
                    ₹425.00
                  </span>
                  <span className="text-[#8A94A6] text-[13px] font-medium">
                    Total Amount Due
                  </span>
                </div>
              </div>
              <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-[8px] flex items-center gap-2 text-[15px] font-bold transition-colors shadow-sm">
                <CreditCard className="w-[18px] h-[18px]" strokeWidth={2.5} />
                Make Payment
              </button>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-[#FAFAFB] flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-2 text-[14px]">
                <FileText className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
                <span className="text-[#8A94A6]">Total Word Count:</span>
                <span className="text-[#171717] font-bold">4,250</span>
              </div>
              <div className="hidden sm:block w-[1px] h-[16px] bg-[#D1D5DB]"></div>
              <div className="flex items-center gap-2 text-[14px]">
                <FileText className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
                <span className="text-[#8A94A6]">Rate Per Word:</span>
                <span className="text-[#171717] font-bold">₹0.10</span>
              </div>
            </div>
          </div>
        )}

        {/* === SECTION 4: MAIN 2-COLUMN LAYOUT === */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* --- LEFT COLUMN: TIMELINE & FILES --- */}
          <div className="w-full lg:w-[380px] border-r border-gray-100 lg:border-b-0 border-b p-6 flex flex-col gap-10">
            
            {/* Timeline */}
            <div>
              <h3 className="text-[15px] font-bold text-[#171717] mb-6">Document Timeline</h3>
              <div className="flex flex-col relative">
                <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-gray-100 z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#171717] leading-tight mb-0.5">Submitted</span>
                    <span className="text-[#8A94A6] text-[12px]">Sept 10, 2023, 10:45 AM</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#171717] leading-tight mb-0.5">Assigned to Editor</span>
                    <span className="text-[#8A94A6] text-[12px]">Sept 11, 2023, 02:30 PM</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#171717] leading-tight mb-0.5">In Progress</span>
                    <span className="text-[#8A94A6] text-[12px]">Started on Sept 15, 2023</span>
                  </div>
                </div>

                {/* Step 4 (Conditional based on state) */}
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  {pageState === "review" || pageState === "in-revision" ? (
                    <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white border border-[#D1D5DB] flex items-center justify-center shrink-0 mt-0.5">
                      <Flag className="w-3 h-3 text-[#A0AAB5]" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={`text-[14px] font-bold leading-tight mb-0.5 ${pageState === "review" || pageState === "in-revision" ? "text-[#171717]" : "text-[#525866]"}`}>
                      Completed & Delivered
                    </span>
                    <span className="text-[#8A94A6] text-[12px]">
                      {pageState === "review" || pageState === "in-revision" ? "Sept 20, 2023, 02:30 PM" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative z-10 flex items-start gap-4">
                  {pageState === "in-revision" ? (
                    <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white border border-[#D1D5DB] flex items-center justify-center shrink-0 mt-0.5">
                      <RotateCw className="w-3 h-3 text-[#A0AAB5]" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={`text-[14px] font-bold leading-tight mb-0.5 ${pageState === "in-revision" ? "text-[#171717]" : "text-[#525866]"}`}>
                      Revision Shared
                    </span>
                    <span className={`text-[12px] ${pageState === "in-revision" ? "text-[#8A94A6]" : "text-[#A0AAB5]"}`}>
                      {pageState === "in-revision" ? "Sept 21, 2023, 02:30 PM" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Original File */}
            <div>
              <h3 className="text-[15px] font-bold text-[#171717] mb-4">Original File</h3>
              <div className="border border-gray-100 bg-[#F4FAFD] rounded-[8px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#E1F4FD] rounded-[8px] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#00A0E3]" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#171717] truncate max-w-[180px]">
                      AI_Research_Paper_Final.docx
                    </span>
                    <span className="text-[12px] text-[#8A94A6]">1.4 MB</span>
                  </div>
                </div>
                <button className="text-[#00A0E3] hover:text-[#008bc5] transition-colors p-1">
                  <Download className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* File Versions */}
            <div>
              <h3 className="text-[15px] font-bold text-[#171717] mb-4">File Versions</h3>
              
              {/* Version 1 */}
              {(pageState === "review" || pageState === "in-revision") ? (
                <div className={`border border-gray-100 bg-[#E6F8EC]/40 rounded-[8px] p-4 flex items-center justify-between ${pageState === "in-revision" ? "mb-3" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#E6F8EC] rounded-[8px] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#00A859]" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#171717] truncate max-w-[150px]">
                        Editor_Draft_V1.docx
                      </span>
                      <span className="text-[12px] text-[#8A94A6]">1.4 MB</span>
                    </div>
                  </div>
                  {pageState === "review" ? (
                    <button 
                      onClick={() => setIsReviewModalOpen(true)}
                      className="flex items-center gap-1.5 text-[#00A859] hover:underline text-[13px] font-bold"
                    >
                      Review <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button className="text-[#00A859] hover:text-[#008bc5] transition-colors p-1">
                      <Download className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="border border-gray-100 bg-[#FAFAFB] rounded-[8px] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white border border-gray-100 rounded-[8px] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#171717] truncate max-w-[140px]">
                        Editor_Draft_V1.docx
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Lock className="w-3 h-3 text-[#A0AAB5]" strokeWidth={2} />
                        <span className="text-[11px] text-[#8A94A6] italic">Locked until payment</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-[#F97316] text-[13px] font-bold hover:underline whitespace-nowrap">
                    Pay to Download
                  </button>
                </div>
              )}

              {/* Version 2 (Only in 'in-revision' state) */}
              {pageState === "in-revision" && (
                <div className="border border-gray-100 bg-[#FAFAFB] rounded-[8px] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white border border-gray-100 rounded-[8px] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#171717] truncate max-w-[140px]">
                        Editor_Draft_V2.docx
                      </span>
                      <span className="text-[11px] text-[#8A94A6] italic mt-0.5">In Progress...</span>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
                </div>
              )}
            </div>

          </div>

          {/* --- RIGHT COLUMN: MESSAGES --- */}
          <div className="flex-1 flex flex-col bg-white min-w-0">
            
            {/* Header */}
            <div className="h-[52px] px-6 border-b border-gray-100 flex items-center shrink-0">
              <h3 className="text-[15px] font-bold text-[#171717]">Messages</h3>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 flex flex-col bg-white">
              
              {/* Message 1 (Editor) */}
              <div className="flex gap-4 max-w-[85%] self-start">
                <img 
                  src="https://i.pravatar.cc/150?u=sarah" 
                  alt="Editor Sarah" 
                  className="w-[36px] h-[36px] rounded-full shrink-0 object-cover border border-gray-100" 
                />
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-bold text-[#00A0E3] mb-1.5 ml-1">
                    Editor Sarah
                  </span>
                  <div className="p-4 text-[14px] leading-relaxed bg-[#F8FAFC] border border-gray-100 text-[#171717] rounded-b-[16px] rounded-tr-[16px]">
                    Hello Alex! I've started reviewing your citations. I noticed a few discrepancies in the APA formatting of the 2022 references. I'll flag these for you.
                  </div>
                  <span className="text-[12px] text-[#A0AAB5] mt-1.5 font-medium ml-1">
                    Yesterday, 4:15 PM
                  </span>
                </div>
              </div>

              {/* Message 2 (User) */}
              <div className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
                <img 
                  src="https://i.pravatar.cc/150?u=user" 
                  alt="You" 
                  className="w-[36px] h-[36px] rounded-full shrink-0 object-cover border border-gray-100" 
                />
                <div className="flex flex-col items-end">
                  <div className="p-4 text-[14px] leading-relaxed bg-[#00A0E3] text-white rounded-b-[16px] rounded-tl-[16px]">
                    Thank you, Sarah. I was unsure about the digital sources. Let me know if you need any original files.
                  </div>
                  <span className="text-[12px] text-[#A0AAB5] mt-1.5 font-medium mr-1">
                    Today, 9:20 AM
                  </span>
                </div>
              </div>

              {/* Message 3 (Editor) */}
              <div className="flex gap-4 max-w-[85%] self-start">
                <img 
                  src="https://i.pravatar.cc/150?u=sarah" 
                  alt="Editor Sarah" 
                  className="w-[36px] h-[36px] rounded-full shrink-0 object-cover border border-gray-100" 
                />
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-bold text-[#00A0E3] mb-1.5 ml-1">
                    Editor Sarah
                  </span>
                  <div className="p-4 text-[14px] leading-relaxed bg-[#F8FAFC] border border-gray-100 text-[#171717] rounded-b-[16px] rounded-tr-[16px]">
                    Will do! The rest of the structure looks very solid so far.
                  </div>
                  <span className="text-[12px] text-[#A0AAB5] mt-1.5 font-medium ml-1">
                    10 mins ago
                  </span>
                </div>
              </div>

            </div>

            {/* Chat Input */}
            <div className="px-6 py-5 border-t border-gray-100 shrink-0 bg-white">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 border border-gray-100 rounded-[8px] px-5 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors shadow-sm"
                />
                <button className="w-[46px] h-[46px] bg-[#00A0E3] rounded-[8px] flex items-center justify-center shrink-0 hover:bg-[#008bc5] transition-colors shadow-sm">
                  <Send className="w-[18px] h-[18px] text-white ml-0.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* --- REVIEW CHANGES MODAL --- */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[500px] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-[18px] font-bold text-[#171717]">Review Changes</h2>
              <button onClick={() => setIsReviewModalOpen(false)} className="p-1 text-[#8A94A6] hover:text-[#171717] transition-colors">
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              
              {/* Document Preview */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[15px] font-bold text-[#171717]">Document Preview</h3>
                <div className="bg-[#F8FAFC] rounded-[12px] p-4 flex flex-col gap-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[40px] h-[40px] bg-[#E1F4FD] rounded-[8px] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#00A0E3]" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#171717]">Editor_Draft_V1.docx</span>
                        <span className="text-[12px] text-[#8A94A6]">1.4 MB</span>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-[#00A0E3]" strokeWidth={2.5} />
                  </div>
                  <div className="flex items-start gap-2 text-[14px] text-[#525866]">
                    <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[1px]">•</span>
                    <span>Review the editor's changes and provide your feedback.</span>
                  </div>
                </div>
              </div>

              {/* Radio Options */}
              <div className="flex flex-col gap-3">
                
                {/* Approve Changes */}
                <div 
                  onClick={() => setReviewDecision("approve")}
                  className={`cursor-pointer rounded-[12px] p-4 border flex items-start gap-3 transition-colors ${
                    reviewDecision === 'approve' ? 'border-[#00A0E3] bg-[#F4FAFD]' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    reviewDecision === 'approve' ? 'border-[#00A0E3]' : 'border-gray-300'
                  }`}>
                    {reviewDecision === 'approve' && <div className="w-2.5 h-2.5 bg-[#00A0E3] rounded-full"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#171717] mb-0.5">Approve Changes</span>
                    <span className="text-[14px] text-[#8A94A6]">I'm satisfied with the revisions and ready to proceed.</span>
                  </div>
                </div>

                {/* Request Changes */}
                <div 
                  onClick={() => setReviewDecision("request")}
                  className={`cursor-pointer rounded-[12px] p-4 border flex items-start gap-3 transition-colors ${
                    reviewDecision === 'request' ? 'border-[#00A0E3] bg-[#F4FAFD]' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    reviewDecision === 'request' ? 'border-[#00A0E3]' : 'border-gray-300'
                  }`}>
                    {reviewDecision === 'request' && <div className="w-2.5 h-2.5 bg-[#00A0E3] rounded-full"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#171717] mb-0.5">Request Changes</span>
                    <span className="text-[14px] text-[#8A94A6]">I would like to request additional revisions.</span>
                  </div>
                </div>

              </div>

              {/* Textarea (Conditional) */}
              {reviewDecision === "request" && (
                <div className="flex flex-col gap-2 animate-in fade-in duration-200">
                  <label className="text-[14px] font-medium text-[#171717]">Describe the changes you'd like to see</label>
                  <textarea 
                    className="w-full border border-gray-200 rounded-[8px] p-3 text-[14px] text-[#171717] min-h-[100px] resize-y focus:outline-none focus:border-[#00A0E3] placeholder:text-[#A0AAB5] transition-colors" 
                    placeholder="Please provide specific details about the changes you'd like..."
                  ></textarea>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between rounded-b-[16px] bg-white">
              <button 
                onClick={() => setIsReviewModalOpen(false)} 
                className="px-5 py-2.5 border border-gray-200 rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitDecision}
                disabled={!reviewDecision}
                className="px-5 py-2.5 bg-[#00A0E3] text-white rounded-[8px] text-[14px] font-bold hover:bg-[#008bc5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Decision
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}