"use client";

import { X, AlertCircle } from "lucide-react";

type Props = { isOpen: boolean; onClose: () => void };

export function ForceCompleteDocumentModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#171717]/40 z-50 flex items-center justify-center font-dm-sans animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] w-full max-w-[640px] rounded-[16px] shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-[#EAECF0] flex items-start justify-between relative">
          <div>
            <div className="text-[18px] font-bold text-[#171717] mb-[2px]">Force Complete Document</div>
            <p className="text-[14px] text-[#525866]">Manually mark this document as completed.</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#A0AAB5] hover:text-[#171717] transition-colors rounded-lg hover:bg-[#F9FAFB]">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5">
          <div className="bg-[#FFF8F3] border border-[#F6C280] rounded-[10px] p-4 flex items-start space-x-3">
            <AlertCircle className="w-[18px] h-[18px] text-[#FA7319] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div className="text-[13px] text-[#C25A13] font-medium leading-tight mt-0.5">Forcing completion will close this document even if editing work is unfinished.</div>
          </div>

          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[10px] p-4 grid grid-cols-2 gap-4">
            <div className="col-span-2"><div className="text-[12px] text-[#A0AAB5]">Document Title</div><div className="text-[28px] font-bold text-[#171717]">Case Study - Business Administration</div></div>
            <div><div className="text-[12px] text-[#A0AAB5]">Student</div><div className="text-[14px] font-bold text-[#171717]">Sarah Johnson</div></div>
            <div><div className="text-[12px] text-[#A0AAB5]">Assigned Editor</div><div className="text-[14px] font-bold text-[#171717]">Dr. Sarah Williams</div></div>
            <div><div className="text-[12px] text-[#A0AAB5]">Current Status</div><div className="text-[14px] font-bold text-[#00A0E3]">In Progress</div></div>
          </div>

          <div className="border border-[#EAECF0] rounded-[12px] p-4">
            <div className="text-[13px] font-bold text-[#171717] mb-2">Completion Reason</div>
            <select className="w-full bg-[#FFFFFF] border border-[#EAECF0] text-[#171717] text-[13px] font-medium rounded-[8px] px-3.5 py-[10px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3]">
              <option>Select a reason</option>
            </select>
            <div className="text-[13px] font-bold text-[#171717] mb-2 mt-4">Admin Notes</div>
            <textarea placeholder="Add notes explaining why the document is being forced complete." className="w-full bg-[#FFFFFF] border border-[#EAECF0] text-[#171717] text-[13px] font-medium rounded-[8px] px-3.5 py-3 min-h-[110px] resize-y placeholder-[#A0AAB5]"></textarea>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer group pt-1">
            <div className="w-[18px] h-[18px] rounded-[4px] border border-[#EAECF0] bg-white"></div>
            <span className="text-[13px] text-[#525866] font-medium">I confirm this document should be marked as completed.</span>
          </label>
        </div>

        <div className="p-6 border-t border-[#EAECF0] flex items-center justify-between bg-[#F9FAFB] rounded-b-[16px]">
          <button onClick={onClose} className="px-5 py-[9px] border border-[#EAECF0] text-[#525866] text-[13px] font-bold rounded-[8px] hover:bg-[#FFFFFF] transition-colors bg-[#FFFFFF]">Cancel</button>
          <button className="px-5 py-[9px] bg-[#00A0E3] text-[#FFFFFF] text-[13px] font-bold rounded-[8px] hover:bg-[#0090D1] transition-colors">Force Complete</button>
        </div>
      </div>
    </div>
  );
}
