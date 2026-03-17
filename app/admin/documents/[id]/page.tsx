"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { ForceCompleteDocumentModal } from "@/components/ForceCompleteDocumentModal";
import { CancelDocumentModal } from "@/components/CancelDocumentModal";
import ReassignEditorModal from "@/components/ReassignEditorModal";
import AdjustDeadlineModal from "@/components/AdjustDeadlineModal";

export default function DocumentDetailsPage() {
  const [forceOpen, setForceOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);
  const [deadlineOpen, setDeadlineOpen] = useState(false);

  return (
    <div className="space-y-5 animate-in fade-in duration-500 max-w-[1140px] font-dm-sans pb-10">
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          <Link href="/admin/documents" className="text-[#A0AAB5] hover:text-[#525866] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F9FAFB]"><ArrowLeft strokeWidth={2.5} className="w-[18px] h-[18px]" /></Link>
          <div className="text-[20px] font-bold text-[#171717]">Document Details</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCancelOpen(true)} className="px-4 py-2 border border-[#FB3748] text-[#FB3748] text-[13px] font-bold rounded-[8px] hover:bg-[#FEF2F2] transition-colors">Cancel Document</button>
          <button onClick={() => setForceOpen(true)} className="px-4 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] text-[13px] font-bold rounded-[8px] transition-colors">Force Complete</button>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[8px] bg-[#EBF8FD] text-[#00A0E3] flex items-center justify-center"><FileText className="w-5 h-5" /></div>
          <div>
            <div className="text-[14px] font-bold text-[#171717]">Case Study - Business Administration</div>
            <div className="mt-1 flex gap-2">
              <span className="px-2 py-[3px] rounded-full text-[10px] font-bold bg-[#EBF8FD] text-[#00A0E3]">In Progress</span>
              <span className="px-2 py-[3px] rounded-full text-[10px] font-bold bg-[#E3F7EC] text-[#1CB061]">Paid</span>
              <span className="px-2 py-[3px] rounded-full text-[10px] font-bold bg-[#FFF4ED] text-[#FA7319]">High Revision Count</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDeadlineOpen(true)} className="h-[34px] px-3.5 rounded-[8px] border border-[#EAECF0] text-[12px] font-semibold text-[#171717] hover:bg-[#F9FAFB]">Adjust Deadline</button>
          <button onClick={() => setReassignOpen(true)} className="h-[34px] px-3.5 rounded-[8px] border border-[#EAECF0] text-[12px] font-semibold text-[#171717] hover:bg-[#F9FAFB]">Reassign Editor</button>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm">
        <div className="grid grid-cols-7 gap-4">
          <div><div className="text-[11px] text-[#A0AAB5]">Student Name</div><div className="text-[13px] font-bold text-[#00A0E3]">Sarah Johns..</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Assigned Editor</div><div className="text-[13px] font-bold text-[#00A0E3]">Dr. Sarah Wil..</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Service Type</div><div className="text-[13px] font-bold text-[#171717]">Editing</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Word Count</div><div className="text-[13px] font-bold text-[#171717]">5,200</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Submission Date</div><div className="text-[13px] font-bold text-[#171717]">Feb 15, 2026</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Deadline</div><div className="text-[13px] font-bold text-[#171717]">Feb 28, 2026</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Revision Count</div><div className="text-[13px] font-bold text-[#171717]">3</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm h-[360px] flex flex-col">
            <div className="flex items-center justify-between "><div className="text-[16px] font-bold text-[#171717]">Communication History</div><span className="text-[10px] px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">Read Only</span></div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
              {["Please pay special attention to the methodology section in Chapter 3. I\u2019m worried about the statistical validity.","Understood, Sarah. I will cross-reference the data sets with your conclusions in that section.","Thank you. Also, when can I expect the first draft of the revisions?","I can submit Revision 1 by tomorrow evening and the full set by Friday."].map((msg, idx) => (
                <div key={idx} className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[10px] p-3">
                  <div className="text-[12px] font-bold text-[#00A0E3]">{idx % 2 === 0 ? "Student Sarah" : "Editor Dr. Williams"}</div>
                  <div className="text-[12px] text-[#171717] mt-1 leading-relaxed">{msg}</div>
                  <div className="text-[10px] text-[#A0AAB5] mt-1">Yesterday, 4:{10 + idx} PM</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm">
            <div className="text-[16px] font-bold text-[#171717] ">System Audit Trail</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="overflow-x-auto border border-[#EAECF0] rounded-[8px]">
              <table className="min-w-[720px] w-full border-collapse">
                <thead><tr className="bg-[#F9FAFB] border-b border-[#EAECF0]"><th className="py-2 px-3 text-[11px] text-left text-[#525866]">Action</th><th className="py-2 px-3 text-[11px] text-left text-[#525866]">Actor</th><th className="py-2 px-3 text-[11px] text-left text-[#525866]">Timestamp</th></tr></thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {["Document submitted by student","Document assigned to editor","Editor accepted assignment","Priority flag added","Revision 1 uploaded"].map((a, i) => (
                    <tr key={a}><td className="py-3 px-3 text-[12px] text-[#525866]">{a}</td><td className="py-3 px-3 text-[12px] text-[#525866]">{["Sarah Johnson","System (Auto-Assignment)","Dr. Sarah Williams","Admin John Davis","Dr. Sarah Williams"][i]}</td><td className="py-3 px-3 text-[12px] text-[#525866]">Feb {15 + i}, 2026 at {10 + i}:3{i} AM</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm">
            <div className="text-[16px] font-bold text-[#171717] ">Administrative Meta</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="space-y-3">
              <div className="flex justify-between text-[13px]"><span className="text-[#525866]">Platform Fee (15%)</span><span className="font-bold text-[#171717]">$82.50</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-[#525866]">Editor Payout</span><span className="font-bold text-[#171717]">$467.50</span></div>
              <div className="pt-2 border-t border-[#EAECF0] flex justify-between text-[14px]"><span className="text-[#525866]">Total Contract Value</span><span className="font-bold text-[#00A0E3]">$550.00</span></div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm h-[470px] flex flex-col">
            <div className="text-[16px] font-bold text-[#171717] ">File Version Timeline</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
              {["Revision 3 (Latest)","Revision 2","Revision 1","Original Upload","Client File"].map((label, idx) => (
                <div key={label} className="border border-[#EAECF0] rounded-[10px] p-3">
                  <div className="flex justify-between"><div className="text-[12px] font-bold text-[#171717]">{label}</div><div className="text-[10px] text-[#525866]">Jan {23 - idx}, 2026</div></div>
                  <div className="text-[10px] text-[#A0AAB5] mt-1">Uploaded by {idx === 4 ? "Student Sarah" : "Editor Dr. Williams"}</div>
                  <div className="mt-2 bg-[#EBF8FD] border border-[#BFE7F9] rounded-[8px] p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#00A0E3]" /><div><div className="text-[11px] font-bold text-[#171717]">{idx === 4 ? "Case Study - Business Adminst..." : `Editor_Draft_V${idx + 1} (Revision).docx`}</div><div className="text-[10px] text-[#525866]">14 MB</div></div></div>
                    <button className="p-1 text-[#00A0E3] hover:bg-white rounded"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ForceCompleteDocumentModal isOpen={forceOpen} onClose={() => setForceOpen(false)} />
      <CancelDocumentModal isOpen={cancelOpen} onClose={() => setCancelOpen(false)} />
      <ReassignEditorModal isOpen={reassignOpen} onClose={() => setReassignOpen(false)} />
      <AdjustDeadlineModal isOpen={deadlineOpen} onClose={() => setDeadlineOpen(false)} />
    </div>
  );
}
