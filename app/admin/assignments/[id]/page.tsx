"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Download, ExternalLink, Clock } from "lucide-react";
import CancelAssignmentModal from "@/components/CancelAssignmentModal";
import AdjustDeadlineModal from "@/components/AdjustDeadlineModal";
import ReassignEditorModal from "@/components/ReassignEditorModal";

export default function AssignmentDetailScreen() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isAdjustDeadlineModalOpen, setIsAdjustDeadlineModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const auditTrail = [
    { action: "Revision Submitted", actor: "Dr. James Mitchell", details: "First revision uploaded and sent to student", time: "Feb 15, 2026 at 10:32 AM" },
    { action: "Work Started", actor: "Dr. James Mitchell", details: "Editor marked assignment as in progress", time: "Feb 15, 2026 at 10:33 AM" },
    { action: "Assignment Accepted", actor: "Dr. James Mitchell", details: "Editor accepted the assignment", time: "Feb 15, 2026 at 3:18 PM" },
    { action: "Editor Assigned", actor: "Admin Sarah", details: "Assigned to Dr. James Mitchell based on specialization match", time: "Feb 16, 2026 at 9:15 AM" },
    { action: "Assignment Created", actor: "System", details: "Auto-generated from student document submission", time: "Feb 18, 2026 at 2:45 PM" }
  ];

  return (
    <div className="space-y-6 max-w-[1140px] font-dm-sans animate-in fade-in duration-500 pb-10">
      
      {/* Header Region */}
      <div className="flex items-center justify-between mt-2 mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/assignments" className="p-1.5 flex items-center justify-center bg-transparent border-none outline-none transition-colors hover:bg-[#F9FAFB] rounded-lg group">
            <ArrowLeft className="w-5 h-5 text-[#A0AAB5] group-hover:text-[#171717] transition-colors" />
          </Link>
          <div className="text-[20px] font-bold text-[#171717]">Assignment Detail</div>
        </div>
        <button 
          onClick={() => setIsCancelModalOpen(true)}
          className="border border-[#FB3748] text-[#FB3748] hover:bg-[#FB3748]/5 px-4 py-2 rounded-[8px] text-[13px] font-semibold transition-colors shadow-sm"
        >
          Cancel Assignment
        </button>
      </div>

      {/* Top Main Status Panel */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden auto-rows-min">
        {/* Upper Title Section */}
        <div className="p-6 border-b border-[#EAECF0] flex justify-between items-start lg:items-center flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-[50px] h-[50px] bg-[#EAF6FD] rounded-[10px] flex items-center justify-center border border-[#00A0E3]/10">
              <FileText className="w-6 h-6 text-[#00A0E3]" />
            </div>
            <div>
              <div className="text-[18px] font-bold text-[#171717] mb-2 leading-none">Case Study - Business Adminstration</div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#E0F2FE] text-[#00A0E3] px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide">In Progress</span>
                <span className="bg-[#E3F7EC] text-[#1CB061] px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide">Paid</span>
                <span className="bg-[#FFEFE5] text-[#FA7319] px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide">High Revision Count</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <button 
              onClick={() => setIsAdjustDeadlineModalOpen(true)}
              className="flex-1 lg:flex-none border border-[#EAECF0] hover:bg-[#F9FAFB] text-[#171717] px-4 py-2 rounded-[8px] text-[13px] font-bold transition-colors"
            >
              Adjust Deadline
            </button>
            <button 
              onClick={() => setIsReassignModalOpen(true)}
              className="flex-1 lg:flex-none border border-[#EAECF0] hover:bg-[#F9FAFB] text-[#171717] px-4 py-2 rounded-[8px] text-[13px] font-bold transition-colors"
            >
              Reassign Editor
            </button>
          </div>
        </div>

        {/* Lower Meta Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 p-6 bg-[#FDFDFD]">
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Student Name</div>
            <Link href="#" className="text-[14px] text-[#00A0E3] font-bold hover:underline inline-flex items-center">
              Sarah Johns... <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Assigned Editor</div>
            <Link href="#" className="text-[14px] text-[#00A0E3] font-bold hover:underline inline-flex items-center">
              Dr. Williams <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Service Type</div>
            <div className="text-[14px] text-[#171717] font-bold">Editing</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Word Count</div>
            <div className="text-[14px] text-[#171717] font-bold">5,200</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Submission Date</div>
            <div className="text-[14px] text-[#171717] font-bold">Feb 15, 2026</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Deadline</div>
            <div className="text-[14px] text-[#171717] font-bold">Feb 28, 2026</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1.5">Revision Count</div>
            <div className="text-[14px] text-[#171717] font-bold">3</div>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Status Timeline (Left) */}
        <div className="flex-[2] bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex flex-col h-full auto-rows-min">
          <div className="text-[16px] font-bold text-[#171717] ">Assignment Status Timeline</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          
          <div className="relative pl-4 overflow-y-auto custom-scrollbar flex-grow">
            {/* Vertical Line */}
            <div className="absolute top-[20px] bottom-[20px] left-[27px] w-[2px] bg-[#EAECF0]"></div>
            
            <div className="space-y-6">
              {[
                { title: "Assignment Created", sub: "System", time: "Mar 3, 2026 at 9:15 AM", description: "Auto-generated from student document submission", done: true },
                { title: "Editor Assigned", sub: "Admin Sarah", time: "Mar 3, 2026 at 10:30 AM", description: "Assigned to Dr. James Mitchell based on specialization match", done: true },
                { title: "Work Started", sub: "Dr. James Mitchell", time: "Mar 3, 2026 at 2:00 PM", description: "Editor marked assignment as in progress", done: true },
                { title: "Revision Submitted", sub: "Dr. James Mitchell", time: "Mar 5, 2026 at 10:30 AM", description: "First revision delivered to student", done: true },
                { title: "Final Delivery", sub: "Pending", time: "Expected: Mar 7, 2026", description: null, done: false },
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex">
                  {/* Status Circle */}
                  <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 shadow-[0_0_0_4px_#FFFFFF] ${step.done ? 'bg-[#00A0E3] z-20' : 'bg-[#F9FAFB] border-[2px] border-[#EAECF0] z-20'}`}>
                    {step.done && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFFFFF]" />}
                  </div>
                  
                  <div className="flex-1 pb-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <div className="text-[14px] font-bold text-[#171717]">{step.title}</div>
                      <div className="text-[12px] text-[#A0AAB5] font-medium">{step.time}</div>
                    </div>
                    <div className="text-[12px] text-[#525866] mb-2">{step.sub}</div>
                    
                    {step.description && (
                      <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-3 text-[13px] text-[#525866] font-medium">
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Deadline & Progress) */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Deadline Management */}
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm">
            <div className="text-[16px] font-bold text-[#171717] ">Deadline Management</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            
            <div className="bg-[#EEF8FC] border border-[#00A0E3]/20 rounded-[8px] p-4 flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-[#00A0E3] rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-[#525866] font-medium">Time Remaining</div>
                <div className="text-[14px] font-bold text-[#00A0E3]">2 days 4 hours</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#A0AAB5] font-medium">Original Deadline</span>
                <span className="text-[#171717] font-bold">Mar 7, 2026</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#A0AAB5] font-medium">Current Deadline</span>
                <span className="text-[#171717] font-bold">Mar 9, 2026</span>
              </div>
            </div>
          </div>

          {/* Editor Work Progress */}
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex-1">
            <div className="text-[16px] font-bold text-[#171717] ">Editor Work Progress</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#A0AAB5] font-medium">Current Status</span>
                <span className="text-[#171717] font-bold">Revision Submitted</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#A0AAB5] font-medium">Last Update</span>
                <span className="text-[#171717] font-bold">Mar 5, 2026 at 10:30 AM</span>
              </div>
            </div>
            
            <div>
              <div className="text-[13px] font-bold text-[#171717] mb-3">Latest Revision</div>
              <div className="border border-[#EAECF0] rounded-[8px] p-3 flex justify-between items-center bg-[#F9FAFB] hover:border-[#EAECF0] transition-colors cursor-pointer group">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-8 h-8 bg-[#EAF6FD] text-[#00A0E3] rounded-[6px] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate pr-2">
                    <div className="text-[13px] font-bold text-[#171717] truncate leading-tight mb-0.5">BusinessStrategyAnalysis_Rev1.docx</div>
                    <div className="text-[11px] text-[#A0AAB5] truncate">Uploaded Mar 5, 2026 at 10:30 AM</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#EAECF0] bg-white flex items-center justify-center flex-shrink-0 group-hover:border-[#00A0E3] group-hover:text-[#00A0E3] transition-colors">
                  <Download className="w-3.5 h-3.5 text-[#525866] group-hover:text-[#00A0E3] transition-colors" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Assignment Audit Trail */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
        <div className="p-6 pb-2">
          <div className="text-[16px] font-bold text-[#171717]">Assignment Audit Trail</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />
        </div>
        <div className="overflow-x-auto relative">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Action</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Actor</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866]">Details</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditTrail.map((item, idx) => (
                <tr key={idx} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.action}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.actor}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] truncate max-w-[300px]" title={item.details}>{item.details}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CancelAssignmentModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} />
      <AdjustDeadlineModal isOpen={isAdjustDeadlineModalOpen} onClose={() => setIsAdjustDeadlineModalOpen(false)} />
      <ReassignEditorModal isOpen={isReassignModalOpen} onClose={() => setIsReassignModalOpen(false)} />

    </div>
  );
}