"use client";

import { useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { RestrictEditorModal } from "@/components/RestrictEditorModal";
import { SuspendEditorModal } from "@/components/SuspendEditorModal";
import { AdjustAvailabilityModal } from "@/components/AdjustAvailabilityModal";

export default function EditorProfile() {
  const [isRestrictModalOpen, setIsRestrictModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1140px] font-dm-sans">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/editors" className="text-[#A0AAB5] hover:text-[#525866] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F9FAFB]">
            <ArrowLeft strokeWidth={2.5} className="w-[18px] h-[18px]" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-[20px] font-bold text-[#171717]">Dr. Sarah Williams</div>
            <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold bg-[#E3F7EC] text-[#1CB061] tracking-wide inline-flex items-center">
              Active
            </span>
            <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold bg-[#E3F7EC] text-[#1CB061] tracking-wide inline-flex items-center">
              Available
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
          <button
            onClick={() => setIsAdjustModalOpen(true)}
            className="px-4 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] text-[13px] font-bold rounded-[8px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            Adjust Availability
          </button>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm">
        <div className="text-[16px] font-bold text-[#171717] mb-[20px]">Profile Overview</div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Editor Name</div>
            <div className="text-[14px] font-bold text-[#171717]">Dr. Sarah Williams</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Email</div>
            <div className="text-[14px] font-bold text-[#171717]">sarah.williams@editingpro.com</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Registration Date</div>
            <div className="text-[14px] font-bold text-[#171717]">Oct 15, 2025</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Primary Language</div>
            <div className="text-[14px] font-bold text-[#171717]">English (UK)</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Primary Expertise</div>
            <div className="text-[14px] font-bold text-[#171717]">Editing, Proofreading</div>
          </div>
          <div className="col-span-3">
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Languages Pair</div>
            <div className="text-[14px] font-bold text-[#171717]">English ↔ Spanish, English ↔ French, English ↔ German</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Avg. Turnaround Time</div>
                <div className="text-[14px] font-bold text-[#171717]">2.3 days</div>
              </div>
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Revision Request Rate</div>
                <div className="text-[14px] font-bold text-[#171717]">17%</div>
              </div>
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Late Submission Count</div>
                <div className="text-[14px] font-bold text-[#171717]">2</div>
              </div>
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Ass. Decline Rate</div>
                <div className="text-[14px] font-bold text-[#171717]">8%</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
            <div className="text-[16px] font-bold text-[#171717] mb-5">Current Workload</div>
            <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Document Name</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Student</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Service Type</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Deadline</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
                  {[
                    { name: "Case Study - ...", student: "Sarah Johnson", type: "Editing", deadline: "Feb 15, 2026", status: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" },
                    { name: "Research Pape...", student: "Michael Chen", type: "Proofreading", deadline: "Feb 18, 2026", status: "Revision Requested", style: "bg-[#FFF4ED] text-[#FA7319]" },
                    { name: "Thesis Chapte..", student: "Emma Wilson", type: "Proofreading", deadline: "Jan 20, 2026", status: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" },
                    { name: "Journal Article", student: "Mark Stevens", type: "Editing", deadline: "Jan 20, 2026", status: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-[14px] h-[14px] text-[#A0AAB5]" strokeWidth={2} />
                          <span className="font-medium text-[12px] text-[#171717]">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[12px] text-[#525866]">{row.student}</td>
                      <td className="py-3 px-4 text-[12px] text-[#525866]">{row.type}</td>
                      <td className="py-3 px-4 text-[12px] text-[#525866]">{row.deadline}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex ${row.style}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
          <div className="text-[16px] font-bold text-[#171717] mb-[20px]">Audit Trail</div>
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar relative pl-2">
            <div className="absolute left-[13px] top-4 bottom-8 w-[2px] bg-[#EAEFF4] z-0"></div>
            {[
              { id: 1, action: "Editor completed assignment: Economic Policy Analysis", by: "Dr. James Mitchell", date: "Feb 28, 2026 at 4:30 PM" },
              { id: 2, action: "Assignment accepted: Marketing Research Paper", by: "Dr. James Mitchell", date: "Feb 24, 2026 at 9:15 AM" },
              { id: 3, action: "Revision submitted for Data Analysis Report", by: "Dr. James Mitchell", date: "Feb 19, 2026 at 3:45 PM" },
              { id: 4, action: "Profile updated: Availability status changed to Busy", by: "Dr. James Mitchell", date: "Feb 18, 2026 at 11:00 AM" },
              { id: 5, action: "Assignment completed: Case Study Analysis", by: "Dr. James Mitchell", date: "Feb 15, 2026 at 2:20 PM" },
            ].map((item) => (
              <div key={item.id} className="relative flex items-start mb-6 last:mb-0 z-10">
                <div className="mt-1 flex-shrink-0 relative">
                  <div className="w-[14px] h-[14px] bg-[#00A0E3] rounded-full border-[3px] border-[#EBF8FD] box-content relative z-10 shadow-sm -ml-[calc(7px-2px)]"></div>
                </div>
                <div className="ml-5 flex-1 pt-[1px]">
                  <div className="text-[13px] font-bold text-[#171717] tracking-tight leading-tight">{item.action}</div>
                  <div className="text-[11px] text-[#A0AAB5] mt-1 font-medium italic">{item.by}</div>
                </div>
                <div className="text-[11px] text-[#525866] font-medium pt-[1px] ml-2 text-right flex-shrink-0">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[16px] text-[#171717] font-bold mb-5">Assignment History</div>
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Document Name</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Student</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Service Type</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Completion Date</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Revision</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {[
                { name: "Case Study - Business Adminst...", student: "Sarah Williams", type: "Editing", date: "Feb 28, 2026", revision: "-", status: "Completed", style: "bg-[#E3F7EC] text-[#1CB061]" },
                { name: "Research Paper - Climate Chan...", student: "James Anderson", type: "Proofreading", date: "Feb 24, 2026", revision: "2", status: "Revision Requested", style: "bg-[#FFF4ED] text-[#FA7319]" },
                { name: "Thesis Chapter 3 - Methodology", student: "Maria Rodriguez", type: "Editing", date: "Mar 02, 2026", revision: "-", status: "Completed", style: "bg-[#E3F7EC] text-[#1CB061]" },
                { name: "Journal Article", student: "Robert Chen", type: "Formatting", date: "Mar 05, 2026", revision: "1", status: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" },
                { name: "Dissertation Abstract", student: "Jennifer Lee", type: "Rewriting", date: "Mar 10, 2026", revision: "2", status: "Completed", style: "bg-[#E3F7EC] text-[#1CB061]" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-[14px] h-[14px] text-[#A0AAB5]" strokeWidth={2} />
                      <span className="font-medium text-[12px] text-[#171717]">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.student}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.type}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.date}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.revision}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex ${row.style}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[16px] text-[#171717] font-bold mb-5">Payout History</div>
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Document Name</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Editor Payout</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Platform Fee</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Payout Date</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {[
                { name: "Case Study - Business Administration", payout: "$125.00", fee: "$25.00", date: "Feb 28, 2026", status: "Paid", style: "bg-[#E3F7EC] text-[#1CB061]" },
                { name: "Research Paper - Climate Change", payout: "$80.00", fee: "$20.00", date: "Feb 24, 2026", status: "Failed", style: "bg-[#FEF2F2] text-[#FB3748]" },
                { name: "Thesis Chapter 3 - Methodology", payout: "$150.00", fee: "$30.00", date: "Mar 02, 2026", status: "Paid", style: "bg-[#E3F7EC] text-[#1CB061]" },
                { name: "Journal Article", payout: "$110.00", fee: "$22.00", date: "Mar 05, 2026", status: "Pending", style: "bg-[#FFF4ED] text-[#FA7319]" },
                { name: "Dissertation Abstract", payout: "$75.00", fee: "$15.00", date: "Mar 10, 2026", status: "Failed", style: "bg-[#FEF2F2] text-[#FB3748]" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-[14px] h-[14px] text-[#A0AAB5]" strokeWidth={2} />
                      <span className="font-medium text-[12px] text-[#171717]">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.payout}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.fee}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex ${row.style}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RestrictEditorModal isOpen={isRestrictModalOpen} onClose={() => setIsRestrictModalOpen(false)} />
      <SuspendEditorModal isOpen={isSuspendModalOpen} onClose={() => setIsSuspendModalOpen(false)} />
      <AdjustAvailabilityModal isOpen={isAdjustModalOpen} onClose={() => setIsAdjustModalOpen(false)} />
    </div>
  );
}
