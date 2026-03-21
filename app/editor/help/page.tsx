"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function EditorHelp() {
  const [activeTab, setActiveTab] = useState('Review Submission Process');

  const tabs = [
    "Review Submission Process",
    "Editing & Revisions",
    "Files & Downloads",
    "Account & Security",
    "General Policies"
  ];

  return (
    <div className="w-full font-dm-sans animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-[#171717] mb-1">Help & Support</h1>
        <p className="text-[14px] text-[#525866]">Find answers or contact our support team.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar: Guidelines Index */}
        <div className="w-full md:w-[320px] flex-shrink-0 bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-5 shadow-sm h-fit">
          <h2 className="text-[16px] font-bold text-[#171717] mb-4">Guidelines Index</h2>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
            />
          </div>

          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-[8px] text-[13px] font-medium transition-colors ${
                  activeTab === tab 
                    ? "bg-[#F0F9FF] text-[#171717] border border-[#00A0E3]" 
                    : "bg-[#F9FAFB] text-[#525866] border border-transparent hover:bg-[#F3F4F6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area: FAQs */}
        <div className="flex-1 bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm p-8">
          
          <div className="space-y-8">
            
            <div>
              <h3 className="text-[15px] font-bold text-[#171717] mb-3">How do I submit a document to client after working on it?</h3>
              <p className="text-[14px] text-[#525866] leading-relaxed">
                To submit a document, navigate to the Dashboard and click 'New Submission'. Upload your document, select your desired service level, and complete the checkout process. You'll receive a confirmation email once your submission is received.
              </p>
            </div>
            
            <div className="h-px bg-[#EAECF0] w-full" />

            <div>
              <h3 className="text-[15px] font-bold text-[#171717] mb-3">What file formats are accepted?</h3>
              <p className="text-[14px] text-[#525866] leading-relaxed">
                We accept Word documents (.doc, .docx), PDF files (.pdf), LaTeX files (.tex), and plain text files (.txt). For best results, we recommend submitting in Word format.
              </p>
            </div>
            
            <div className="h-px bg-[#EAECF0] w-full" />

            <div>
              <h3 className="text-[15px] font-bold text-[#171717] mb-3">How long does the editing process take?</h3>
              <p className="text-[14px] text-[#525866] leading-relaxed">
                Standard editing typically takes 3-5 business days. Express service (24-48 hours) and rush service (12-24 hours) are available for an additional fee.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
