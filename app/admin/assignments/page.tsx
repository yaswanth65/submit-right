"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, MoreVertical, FileText, UserPlus } from "lucide-react";
import { AssignEditorModal } from "@/components/AssignEditorModal";

export default function AssignmentsScreen() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const assignments = [
    { id: "1", doc: "Case Study - Business Adminst...", student: "Sarah Johnson", service: "Editing", words: "5,200", deadline: "Feb 28, 2026", editor: "Dr. Williams", status: "Assigned" },
    { id: "2", doc: "Research Paper - Climate Chan...", student: "Michael Chen", service: "Proofreading", words: "8,400", deadline: "Feb 24, 2026", editor: "-", status: "Unassigned" },
    { id: "3", doc: "Thesis Chapter 3 - Methodology", student: "Emily Davis", service: "Editing", words: "3,800", deadline: "Mar 02, 2026", editor: "Dr. Chen", status: "Assigned" },
    { id: "4", doc: "Journal Article", student: "James Wilson", service: "Formatting", words: "2,100", deadline: "Mar 05, 2026", editor: "-", status: "Unassigned" },
    { id: "5", doc: "Dissertation Abstract", student: "Lisa Martinez", service: "Rewriting", words: "12,000", deadline: "Mar 10, 2026", editor: "Prof. Thompson", status: "Assigned" },
    { id: "6", doc: "Conference Paper - AI in Health...", student: "Albert Flores", service: "Proofreading", words: "4,500", deadline: "Feb 23, 2026", editor: "Dr. Williams", status: "Overdue" },
    { id: "7", doc: "Literature Review", student: "Jennifer Lee", service: "Editing", words: "6,700", deadline: "Mar 08, 2026", editor: "Dr. Brown", status: "Assigned" },
    { id: "8", doc: "Technical Report - Engineering", student: "Wade Warren", service: "Editing", words: "5,100", deadline: "Feb 26, 2026", editor: "Dr. Rodriguez", status: "Assigned" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "Assigned") {
      return <span className="bg-[#E0F2E9] text-[#1CB061] px-2.5 py-1 rounded-full text-[12px] font-semibold inline-flex items-center">Assigned</span>;
    }
    if (status === "Unassigned") {
      return <span className="bg-[#FFEFE5] text-[#FA7319] px-2.5 py-1 rounded-full text-[12px] font-semibold inline-flex items-center">Unassigned</span>;
    }
    if (status === "Overdue") {
      return <span className="bg-[#FFEBEB] text-[#FB3748] px-2.5 py-1 rounded-full text-[12px] font-semibold inline-flex items-center">Overdue</span>;
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-[1140px] font-dm-sans animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Assignments</div>
          <p className="text-[14px] text-[#525866]">Assign and manage editor workload.</p>
        </div>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-4 flex justify-between items-center border-b border-[#EAECF0]">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-[#EAECF0] text-[#171717] rounded-[8px] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Document Name</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Student Name</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Service Type</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Word Count</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Deadline</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Assigned Editor</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Ass. Status</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item, i) => (
                <tr key={i} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors group/row">
                  <td className="py-4 px-6 text-[13px] font-medium text-[#525866] whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-[#A0AAB5]" />
                      <Link href={`/admin/assignments/${item.id}`} className="hover:text-[#00A0E3] hover:underline">
                        {item.doc}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.student}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.service}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.words}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.deadline}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.editor}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap flex justify-center items-center h-full min-h-[52px]">
                    {item.status === "Unassigned" ? (
                      <button 
                        onClick={() => setIsAssignModalOpen(true)}
                        className="bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] p-1.5 rounded-[6px] transition-colors flex items-center justify-center shadow-sm"
                        title="Assign Editor"
                      >
                        <UserPlus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                      </button>
                    ) : (
                      <button className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1.5">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AssignEditorModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />
    </div>
  );
}