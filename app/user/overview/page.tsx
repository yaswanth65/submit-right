"use client";

import React from "react";
import { 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  Edit3, 
  CheckSquare, 
  Info,
  File
} from "lucide-react";

export default function OverviewPage() {
  const activeDocuments = [
    {
      id: 1,
      name: "AI Research Paper",
      type: "Journal Editing",
      date: "Oct 24, 2025",
      status: "Payment Needed",
      action: "Pay Now",
    },
    {
      id: 2,
      name: "Thesis Chapter 3",
      type: "Academic Editing",
      date: "Oct 23, 2025",
      status: "Being Edited",
      action: "-",
    },
    {
      id: 3,
      name: "Literature Review Dr...",
      type: "Proofreading",
      date: "Oct 21, 2025",
      status: "Completed",
      action: "Download",
    },
    {
      id: 4,
      name: "Methodology Section",
      type: "Journal Editing",
      date: "Oct 19, 2025",
      status: "Completed",
      action: "Download",
    },
    {
      id: 5,
      name: "AI Research Paper",
      type: "Final Proofread",
      date: "Dec 20, 2025",
      status: "Payment Needed",
      action: "Pay Now",
    },
    {
      id: 6,
      name: "Thesis Chapter 1",
      type: "Academic Editing",
      date: "Oct 23, 2025",
      status: "Being Edited",
      action: "-",
    },
    {
      id: 7,
      name: "Methodology Section",
      type: "Journal Editing",
      date: "Oct 19, 2025",
      status: "Completed",
      action: "Download",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Document Uploaded",
      desc: "'AI Research Paper' was submitted for review.",
      time: "Today",
      color: "bg-[#00A0E3]",
    },
    {
      id: 2,
      title: "Editing Completed",
      desc: "'Thesis_Final_Draft.v4' is now available for download.",
      time: "Yesterday",
      color: "bg-[#059669]",
    },
    {
      id: 3,
      title: "Support Ticket Closed",
      desc: "Issue #4521 regarding billing has been resolved.",
      time: "3 Days Ago",
      color: "bg-[#D1D5DB]",
    },
    {
      id: 4,
      title: "Document Uploaded",
      desc: "'AI Research Paper' was submitted for review.",
      time: "4 Days Ago",
      color: "bg-[#00A0E3]",
    },
    {
      id: 5,
      title: "Document Uploaded",
      desc: "'AI Research Paper' was submitted for review.",
      time: "5 Days Ago",
      color: "bg-[#00A0E3]",
    },
    {
      id: 6,
      title: "Support Ticket Closed",
      desc: "Issue #4521 regarding billing has been resolved.",
      time: "3 Days Ago",
      color: "bg-[#D1D5DB]",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Payment Needed":
        return (
          <span className="bg-[#FFF7ED] text-[#EA580C] text-[12px] font-medium px-3 py-1 rounded-full">
            Payment Needed
          </span>
        );
      case "Being Edited":
        return (
          <span className="bg-[#EFF6FF] text-[#00A0E3] text-[12px] font-medium px-3 py-1 rounded-full">
            Being Edited
          </span>
        );
      case "Completed":
        return (
          <span className="bg-[#ECFDF5] text-[#059669] text-[12px] font-medium px-3 py-1 rounded-full">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "Pay Now":
        return <button className="text-[#EA580C] font-semibold text-[13px] hover:underline">Pay Now</button>;
      case "Download":
        return <button className="text-[#00A0E3] font-semibold text-[13px] hover:underline">Download</button>;
      default:
        return <span className="text-[#A0AAB5]">-</span>;
    }
  };

  return (
    <div className="w-full font-dm-sans px-6 lg:px-8 py-4">

      {/* --- HEADER --- */}
      <div className="mb-4 border-b border-gray-200 ">
        <h1 className="text-[24px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Overview
        </h1>
        <p className="text-[#8A94A6] text-[15px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- LEFT COLUMN --- */}
        <div className="w-full lg:flex-1 flex flex-col gap-6">
          
          {/* Payment Alert Box */}
          <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-[16px] overflow-hidden">
            <div className="p-6 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-[42px] h-[42px] rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-[20px] h-[20px] text-[#D97706]" strokeWidth={2.5} />
                </div>
                <div className="mt-0.5">
                  <h3 className="text-[16px] font-bold text-[#B45309] mb-1">
                    Payment required to continue
                  </h3>
                  <p className="text-[#8A94A6] text-[14px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#D97706] font-bold text-[14px] hover:underline shrink-0 sm:mt-0 mt-2">
                Pay Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="border-t border-[#FDE68A]/50 px-6 py-4 bg-[#FFFCF0]/50 flex gap-2">
              <span className="text-[#8A94A6] text-[14px]">Document:</span>
              <span className="text-[#171717] font-medium text-[14px]">AI Research Paper</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAFAFA]  border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-[#8A94A6] text-[14px] font-medium">Total Documents</span>
                <div className="w-8 h-8 rounded-lg bg-[#F0F6FF] flex items-center justify-center">
                  <FileText className="w-[16px] h-[16px] text-[#00A0E3]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[32px] font-bold text-[#171717] leading-none mt-2">12</span>
            </div>

            <div className="bg-[#FAFAFA] border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-[#8A94A6] text-[14px] font-medium">In Progress</span>
                <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
                  <Edit3 className="w-[16px] h-[16px] text-[#EA580C]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[32px] font-bold text-[#171717] leading-none mt-2">3</span>
            </div>

            <div className="bg-[#FAFAFA]  border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-[#8A94A6] text-[14px] font-medium">Completed</span>
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center">
                  <CheckSquare className="w-[16px] h-[16px] text-[#059669]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[32px] font-bold text-[#171717] leading-none mt-2">12</span>
            </div>
          </div>

          {/* Active Documents Table */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-[18px] font-bold text-[#171717]">Active Documents</h2>
              <button className="text-[#00A0E3] text-[13px] font-bold hover:underline">View All</button>
            </div>
            
            <div className="border border-[#EAECF0] bg-white rounded-[16px] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#EFF7FB] border-b border-[#EAECF0]">
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866] w-[28%]">Document Name</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Service Type</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Last Updated</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Status</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDocuments.map((doc, idx) => (
                      <tr 
                        key={doc.id} 
                        className={`hover:bg-[#F8FAFC] transition-colors ${idx !== activeDocuments.length - 1 ? 'border-b border-[#EAECF0]' : ''}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <File className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
                            <span className="text-[14px] font-medium text-[#171717] truncate">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[13px] text-[#525866]">{doc.type}</td>
                        <td className="px-5 py-4 text-[13px] text-[#525866]">{doc.date}</td>
                        <td className="px-5 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-5 py-4">{getActionText(doc.action)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 flex flex-col gap-8 lg:border-l lg:border-[#EAECF0] lg:pl-8">
          
          {/* What Happens Next Section */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full bg-[#00A0E3] text-white flex items-center justify-center">
                <Info className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <h2 className="text-[16px] font-bold text-[#171717]">What Happens Next</h2>
            </div>
            
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-[#EAECF0] z-0"></div>

              <div className="relative z-10 flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#EAECF0] flex items-center justify-center text-[12px] font-bold text-[#171717] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717] mb-1">Document Review</h4>
                  <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                    Our academic experts verify your submission and select the best editor.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#EAECF0] flex items-center justify-center text-[12px] font-bold text-[#171717] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717] mb-1">Active Editing</h4>
                  <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                    Your document is being edited. You will be notified when changes are ready.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#EAECF0] flex items-center justify-center text-[12px] font-bold text-[#171717] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717] mb-1">Final Approval</h4>
                  <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                    Review the changes and download your final polished manuscript.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#EAECF0] hidden lg:block"></div>

          {/* Recent Activity Section */}
          <div>
            <h2 className="text-[16px] font-bold text-[#171717] mb-6">Recent Activity</h2>
            
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[5px] top-2 bottom-4 w-[2px] bg-[#EAECF0] z-0"></div>

              {recentActivity.map((activity, idx) => (
                <div key={activity.id} className="relative z-10 flex items-start gap-4 mb-6">
                  <div className="relative mt-1 shrink-0">
                    <div className={`w-3 h-3 rounded-full ${activity.color} ring-[4px] ring-white`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h4 className="text-[14px] font-bold text-[#171717] leading-tight">
                        {activity.title}
                      </h4>
                      <span className="text-[12px] text-[#A0AAB5] shrink-0 font-medium">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                      {activity.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}