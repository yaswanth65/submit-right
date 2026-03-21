"use client";

import { X, AlertTriangle } from "lucide-react";

type Props = { isOpen: boolean; onClose: () => void };

export function CancelDocumentModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#171717]/40 z-50 flex items-center justify-center font-dm-sans animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] w-full max-w-[640px] rounded-[16px] shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-[#EAECF0] flex items-start justify-between relative">
          <div>
            <div className="text-[18px] font-bold text-[#171717] mb-[2px]">Cancel Document</div>
            <p className="text-[14px] text-[#525866]">Cancelling this document will stop all editing work.</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#A0AAB5] hover:text-[#171717] transition-colors rounded-lg hover:bg-[#F9FAFB]"><X className="w-5 h-5" strokeWidth={2.5} /></button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5">
          <div className="bg-[#FEF2F2] border border-[#FB3748] rounded-[10px] p-4 flex items-start space-x-3">
            <AlertTriangle className="w-[18px] h-[18px] text-[#FB3748] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div className="text-[13px] text-[#FB3748] font-medium leading-tight mt-0.5"><span className="font-bold">This action cannot be undone.</span><br />The document will be marked as cancelled permanently and notifying the editor.</div>
          </div>

          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[10px] p-4 grid grid-cols-2 gap-4">
            <div className="col-span-2"><div className="text-[12px] text-[#A0AAB5]">Document Title</div><div className="text-[28px] font-bold text-[#171717]">Case Study - Business Administration</div></div>
            <div><div className="text-[12px] text-[#A0AAB5]">Student</div><div className="text-[14px] font-bold text-[#171717]">Sarah Johnson</div></div>
            <div><div className="text-[12px] text-[#A0AAB5]">Assigned Editor</div><div className="text-[14px] font-bold text-[#171717]">Dr. Sarah Williams</div></div>
          </div>

          <div className="border border-[#EAECF0] rounded-[12px] p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[13px] font-bold text-[#171717] mb-2">Cancellation Reason</div>
                <select className="w-full bg-[#FFFFFF] border border-[#EAECF0] text-[#171717] text-[13px] font-medium rounded-[8px] px-3.5 py-[10px]"><option>Select a reason</option></select>
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#171717] mb-2">Refund Required?</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-[42px] rounded-[8px] border border-[#00A0E3] bg-[#EFF6FF] text-[#00A0E3] text-[13px] font-bold">Yes</button>
                  <button className="h-[42px] rounded-[8px] border border-[#EAECF0] bg-[#FFFFFF] text-[#525866] text-[13px] font-bold">No</button>
                </div>
              </div>
            </div>
            <div className="text-[13px] font-bold text-[#171717] mb-2 mt-4">Admin Notes</div>
            <textarea placeholder="Provide additional information for cancellation..." className="w-full bg-[#FFFFFF] border border-[#EAECF0] text-[#171717] text-[13px] font-medium rounded-[8px] px-3.5 py-3 min-h-[110px] resize-y placeholder-[#A0AAB5]"></textarea>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer group pt-1">
            <div className="w-[18px] h-[18px] rounded-[4px] border border-[#EAECF0] bg-white"></div>
            <span className="text-[13px] text-[#525866] font-medium">I understand this document will be cancelled and cannot be restored.</span>
          </label>
        </div>

        <div className="p-6 border-t border-[#EAECF0] flex items-center justify-between bg-[#F9FAFB] rounded-b-[16px]">
          <button onClick={onClose} className="px-5 py-[9px] border border-[#EAECF0] text-[#525866] text-[13px] font-bold rounded-[8px] hover:bg-[#FFFFFF] transition-colors bg-[#FFFFFF]">Cancel</button>
          <button className="px-5 py-[9px] bg-[#FB3748] text-[#FFFFFF] text-[13px] font-bold rounded-[8px] hover:bg-[#DC2626] transition-colors">Confirm Cancellation</button>
        </div>
      </div>
    </div>
  );
}
