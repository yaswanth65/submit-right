"use client";

import React from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  FileText 
} from "lucide-react";

export default function MyDocumentsPage() {
  // Mock data for the documents list
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Payment Needed":
        return (
          <span className="bg-[#FEF0E6] text-[#F97316] border border-[#F97316]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            Payment Needed
          </span>
        );
      case "Being Edited":
        return (
          <span className="bg-[#EFF6FF] text-[#3B82F6] border border-[#3B82F6]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            Being Edited
          </span>
        );
      case "Completed":
        return (
          <span className="bg-[#E6F8EC] text-[#00A859] border border-[#00A859]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getActionLink = (action: string, docId: string) => {
    switch (action) {
      case "Pay Now":
        return (
          <Link href={`/documents/${docId}/pay`} className="text-[#F97316] font-bold text-[14px] hover:underline whitespace-nowrap">
            Pay Now
          </Link>
        );
      case "Download":
        return (
          <Link href={`/documents/${docId}/download`} className="text-[#00A0E3] font-bold text-[14px] hover:underline whitespace-nowrap">
            Download
          </Link>
        );
      default:
        return <span className="text-[#A0AAB5]">-</span>;
    }
  };

  return (
    <div className="w-full font-dm-sans  mx-auto flex flex-col min-h-[calc(100vh-76px)]">
      
      {/* --- PAGE HEADER --- */}
      <div className="my-4 shrink-0 border-b pb-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">
          My Documents
        </h1>
        <p className="text-[#78788D] text-[14px]">
          Track, review, and manage your submissions
        </p>
      </div>

      {/* --- TOOLBAR: SEARCH & FILTERS --- */}
      <div className="flex flex-col sm:flex-row px-4 mx-2 justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-[360px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
          <input 
            type="text" 
            placeholder="Search by document name..." 
            className="w-full pl-[40px] pr-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Filter 1 */}
          <div className="relative w-full sm:w-[140px]">
            <select className="w-full border border-[#EAECF0] rounded-[8px] pl-4 pr-10 py-2.5 text-[14px] text-[#171717] appearance-none focus:outline-none focus:border-[#00A0E3] bg-white transition-colors cursor-pointer outline-none">
              <option>All</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
          </div>

          {/* Filter 2 */}
          <div className="relative w-full sm:w-[160px]">
            <select className="w-full border border-[#EAECF0] rounded-[8px] pl-4 pr-10 py-2.5 text-[14px] text-[#171717] appearance-none focus:outline-none focus:border-[#00A0E3] bg-white transition-colors cursor-pointer outline-none">
              <option>Latest updated</option>
              <option>Oldest</option>
              <option>A - Z</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
          </div>
        </div>

      </div>

      {/* --- DOCUMENTS TABLE --- */}
      <div className="flex-1 flex px-4 mx-2 flex-col">
  <div className="rounded-[12px] bg-white overflow-hidden">
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <table className="w-full text-left min-w-[900px]">
        <thead>
          <tr className="bg-[#F4F8FA] border-b border-[#EAECF0]">
            <th className="px-6 py-4 text-[14px] font-medium text-[#171717] w-[30%]">Document Name</th>
            <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Service Type</th>
            <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Last Updated</th>
            <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Status</th>
            <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, idx) => (
            <tr 
              key={idx} 
              className={`hover:bg-[#F9FAFB] transition-colors border-b border-[#EAECF0]`}
            >
              <td className="px-6 py-5">
                <Link href={`/user/documents/${doc.id}`} className="flex items-center gap-3 group">
                  <FileText className="w-[18px] h-[18px] text-[#A0AAB5] group-hover:text-[#00A0E3] transition-colors" strokeWidth={2} />
                  <span className="text-[14px] font-medium text-[#525866] group-hover:text-[#171717] group-hover:underline truncate transition-colors">
                    {doc.name}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-5 text-[14px] text-[#525866]">
                {doc.service}
              </td>
              <td className="px-6 py-5 text-[14px] text-[#525866] whitespace-nowrap">
                {doc.date}
              </td>
              <td className="px-6 py-5">
                {getStatusBadge(doc.status)}
              </td>
              <td className="px-6 py-5">
                {getActionLink(doc.action, doc.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* --- PAGINATION --- */}
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
    <p className="text-[#8A94A6] text-[14px]">
      Showing <span className="font-bold text-[#171717]">6</span> of <span className="font-bold text-[#171717]">12</span> documents
    </p>
    <div className="flex items-center gap-2">
      <button className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-[#EAECF0] text-[#A0AAB5] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50">
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
      </button>
      <button className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-[#00A0E3] text-white text-[14px] font-bold">
        1
      </button>
      <button className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-[#EAECF0] text-[#525866] text-[14px] font-medium hover:bg-[#F9FAFB] transition-colors">
        2
      </button>
      <button className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-[#EAECF0] text-[#525866] hover:bg-[#F9FAFB] transition-colors">
        <ChevronRight className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  </div>
</div>
    </div>
  );
}