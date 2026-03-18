"use client";

import { useState } from "react";
import { ArrowLeft, FileText, FileSearch, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
// Importing modals from components later
import { RestrictAccountModal } from "@/components/RestrictAccountModal";
import { SuspendAccountModal } from "@/components/SuspendAccountModal";

export default function StudentProfile() {
  const [isRestrictModalOpen, setIsRestrictModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students" className="text-[#A0AAB5] hover:text-[#525866] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F9FAFB]">
            <ArrowLeft strokeWidth={2.5} className="w-[18px] h-[18px]" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-[20px] font-bold text-[#171717]">Sarah Johnson</div>
            <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold bg-[#E3F7EC] text-[#1CB061] tracking-wide inline-flex items-center">
              Active
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsRestrictModalOpen(true)}
            className="px-4 py-2 border border-[#EAECF0] text-[#525866] text-[13px] font-bold rounded-[8px] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            Restrict Account
          </button>
          <button 
            onClick={() => setIsSuspendModalOpen(true)}
            className="px-4 py-2 border border-[#FB3748] text-[#FB3748] text-[13px] font-bold rounded-[8px] hover:bg-[#FEF2F2] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            Suspend Account
          </button>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm">
        <div className="text-[16px] font-bold text-[#171717] ">Profile Overview</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Student Name</div>
            <div className="text-[14px] font-bold text-[#171717]">Sarah Johnson</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Email</div>
            <div className="text-[14px] font-bold text-[#171717]">sarah.johnson@university.edu</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Registration Date</div>
            <div className="text-[14px] font-bold text-[#171717]">Jan 5, 2026</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Total Documents Submitted</div>
            <div className="text-[14px] font-bold text-[#171717]">5</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Active Documents</div>
            <div className="text-[14px] font-bold text-[#171717]">2</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Completed Documents</div>
            <div className="text-[14px] font-bold text-[#171717]">3</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Total Spend</div>
            <div className="text-[14px] font-bold text-[#171717]">$2,425</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Average Order Value</div>
            <div className="text-[14px] font-bold text-[#171717]">$485.00</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Payment History Card */}
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm flex flex-col h-[400px]">
          <div className="text-[16px] font-bold text-[#171717] ">Payment History</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          <div className="overflow-y-auto pr-1 flex-1 custom-scrollbar -mx-2 px-2">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-[#FFFFFF] z-10">
                <tr className="border-b border-[#EAECF0]">
                  <th className="pb-3 px-2 text-[13px] font-bold text-[#525866]">Document Name</th>
                  <th className="pb-3 px-2 text-[13px] font-bold text-[#525866]">Amount Paid</th>
                  <th className="pb-3 px-2 text-[13px] font-bold text-[#525866]">Payment Date</th>
                  <th className="pb-3 px-2 text-[13px] font-bold text-[#525866]">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0] relative">
                {[
                  { id: 1, name: "Case Study - Business Admin...", amount: "$425.00", date: "Feb 15, 2026", status: "Pending", isPos: false },
                  { id: 2, name: "Research Paper - Climate C...", amount: "$380.00", date: "Feb 18, 2026", status: "Paid", isPos: true },
                  { id: 3, name: "Thesis Chapter 3 - Methodo...", amount: "$510.00", date: "Jan 20, 2026", status: "Pending", isPos: false },
                  { id: 4, name: "Journal Article", amount: "$220.00", date: "Feb 22, 2026", status: "Paid", isPos: true },
                  { id: 5, name: "Dissertation Abstract", amount: "$890.00", date: "Feb 23, 2026", status: "Paid", isPos: true },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2.5">
                        <FileText className="w-[15px] h-[15px] text-[#A0AAB5]" strokeWidth={2} />
                        <span className="font-bold text-[13px] text-[#171717]">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-medium text-[13px] text-[#525866]">{row.amount}</td>
                    <td className="py-4 px-2 font-medium text-[13px] text-[#525866]">{row.date}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold inline-flex items-center justify-center min-w-[70px] ${row.isPos ? 'bg-[#E3F7EC] text-[#1CB061] tracking-wide' : 'bg-[#FFF4ED] text-[#FA7319] tracking-wide'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Audit Trail Card */}
        <div className="lg:col-span-1 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 flex flex-col h-[400px] shadow-sm">
          <div className="text-[16px] font-bold text-[#171717] ">Audit Trail</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar relative pl-2">
             <div className="absolute left-[13px] top-4 bottom-8 w-[2px] bg-[#EAEFF4] z-0"></div>
            {[
              { id: 1, action: "Account registered", by: "Sarah Johnson", date: "Jan 5, 2026 at 2:15 PM" },
              { id: 2, action: "Email verified", by: "Sarah Johnson", date: "Jan 5, 2026 at 2:18 PM" },
              { id: 3, action: "First document submitted", by: "Sarah Johnson", date: "Jan 20, 2026 at 10:30 AM" },
              { id: 4, action: "Payment method added", by: "Sarah Johnson", date: "Jan 20, 2026 at 10:32 AM" },
              { id: 5, action: "Payment processed successfully", by: "System", date: "Jan 20, 2026 at 10:33 AM" },
            ].map((item, idx) => (
              <div key={item.id} className="relative flex items-start mb-6 last:mb-0 z-10">
                <div className="mt-1 flex-shrink-0 relative">
                  <div className="w-[14px] h-[14px] bg-[#00A0E3] rounded-full border-[3px] border-[#EBF8FD] box-content relative z-10 shadow-sm -ml-[calc(7px-2px)]"></div>
                </div>
                <div className="ml-5 flex-1 pt-[1px]">
                  <div className="text-[13px] font-bold text-[#171717] tracking-tight leading-tight">{item.action}</div>
                  <div className="text-[11px] text-[#A0AAB5] mt-1 font-medium italic">by {item.by}</div>
                </div>
                <div className="text-[11px] text-[#525866] font-medium pt-[1px] ml-2 text-right flex-shrink-0">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document History Table */}
      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[16px] text-[#171717] font-bold ">Document History</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Document Name</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Service Type</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Assigned Editor</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Word Count</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Revision</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Deadline</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {[
                { name: "Case Study - Business Adminstrati...", type: "Editing", editor: "Dr. Sarah Williams", words: "5,200", revision: "-", deadline: "Feb 28, 2026", status: "Completed", statusStyle: "bg-[#E3F7EC] text-[#1CB061]" },
                { name: "Research Paper - Climate Change", type: "Proofreading", editor: "Prof. James Anderson", words: "8,400", revision: "2", deadline: "Feb 24, 2026", status: "In Progress", statusStyle: "bg-[#EBF8FD] text-[#00A0E3]" },
                { name: "Thesis Chapter 3 - Methodology", type: "Editing", editor: "Dr. Maria Rodriguez", words: "3,800", revision: "-", deadline: "Mar 02, 2026", status: "Completed", statusStyle: "bg-[#E3F7EC] text-[#1CB061]" },
                { name: "Journal Article", type: "Formatting", editor: "Dr. Robert Chen", words: "2,100", revision: "1", deadline: "Mar 05, 2026", status: "Revision Requested", statusStyle: "bg-[#FFF4ED] text-[#FA7319]" },
                { name: "Dissertation Abstract", type: "Rewriting", editor: "Dr. Jennifer Lee", words: "12,000", revision: "2", deadline: "Mar 10, 2026", status: "In Progress", statusStyle: "bg-[#EBF8FD] text-[#00A0E3]" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-[15px] h-[15px] text-[#A0AAB5]" strokeWidth={2} />
                      <span className="font-bold text-[13px] text-[#171717]">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-[13px] text-[#525866]">{row.type}</td>
                  <td className="py-4 px-6 font-medium text-[13px] text-[#525866]">{row.editor}</td>
                  <td className="py-4 px-6 font-medium text-[13px] text-[#525866]">{row.words}</td>
                  <td className="py-4 px-6 font-medium text-[13px] text-[#525866]">{row.revision}</td>
                  <td className="py-4 px-6 font-medium text-[13px] text-[#525866]">{row.deadline}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide inline-flex items-center justify-center ${row.statusStyle}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RestrictAccountModal isOpen={isRestrictModalOpen} onClose={() => setIsRestrictModalOpen(false)} />
      <SuspendAccountModal isOpen={isSuspendModalOpen} onClose={() => setIsSuspendModalOpen(false)} />
    </div>
  );
}