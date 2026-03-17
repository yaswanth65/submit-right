"use client";

import { X, Info } from "lucide-react";

type AdjustAvailabilityModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const options = ["Available", "Busy", "Vacation Mode", "Unavailable"];

export function AdjustAvailabilityModal({ isOpen, onClose }: AdjustAvailabilityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#171717]/40 z-50 flex items-center justify-center font-dm-sans animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] w-full max-w-[640px] rounded-[16px] shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-[#EAECF0] flex items-start justify-between relative">
          <div>
            <div className="text-[18px] font-bold text-[#171717] mb-[2px]">Adjust Availability</div>
            <p className="text-[14px] text-[#525866]">Update this editor's current workload availability.</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#A0AAB5] hover:text-[#171717] transition-colors rounded-lg hover:bg-[#F9FAFB]">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[10px] p-4 flex items-start space-x-3">
            <Info className="w-[18px] h-[18px] text-[#2563EB] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div className="text-[13px] text-[#1D4ED8] font-medium leading-tight mt-0.5">
              This setting controls whether the editor can receive new assignments from the project marketplace or be manually assigned by administrators.
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-[#EAECF0] rounded-[10px] bg-[#F9FAFB]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#EAEFF4] overflow-hidden flex-shrink-0">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Dr. Sarah Williams" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[14px] font-bold text-[#171717] leading-tight truncate">Dr. Sarah Williams</span>
                <span className="text-[12px] text-[#525866] leading-tight truncate mt-0.5">eaxmple@gmail.com</span>
              </div>
            </div>
            <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold bg-[#E3F7EC] text-[#1CB061] tracking-wide inline-flex items-center">
              Active
            </span>
          </div>

          <div className="border border-[#EAECF0] rounded-[12px] p-5">
            <div className="text-[14px] font-bold text-[#171717] mb-[16px]">Availability Status</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {options.map((label, idx) => {
                const isSelected = idx === 0;
                return (
                  <button
                    key={label}
                    className={`h-[46px] rounded-[10px] border px-3 inline-flex items-center space-x-3 text-left transition-colors ${
                      isSelected ? "border-[#00A0E3] bg-[#F0F9FF]" : "border-[#EAECF0] bg-[#FFFFFF] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    <span className={`w-[18px] h-[18px] rounded-full border-2 inline-flex items-center justify-center ${isSelected ? "border-[#00A0E3]" : "border-[#D1D5DB]"}`}>
                      {isSelected ? <span className="w-[8px] h-[8px] rounded-full bg-[#00A0E3]"></span> : null}
                    </span>
                    <span className="text-[13px] text-[#525866] font-medium">{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-4">
              <div className="text-[13px] font-bold text-[#171717] mb-2">Maximum Active Assignments</div>
              <input
                defaultValue="10"
                className="w-full bg-[#FFFFFF] border border-[#EAECF0] text-[#171717] text-[13px] font-medium rounded-[8px] px-3.5 py-[10px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            <div>
              <div className="text-[13px] font-bold text-[#171717] mb-2">Admin Notes</div>
              <textarea
                placeholder="Add notes explaining this availability update."
                className="w-full bg-[#FFFFFF] border border-[#EAECF0] text-[#171717] text-[13px] font-medium rounded-[8px] px-3.5 py-3 focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-[100px] resize-y placeholder-[#A0AAB5]"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[#EAECF0] flex items-center justify-between bg-[#F9FAFB] rounded-b-[16px]">
          <button onClick={onClose} className="px-5 py-[9px] border border-[#EAECF0] text-[#525866] text-[13px] font-bold rounded-[8px] hover:bg-[#FFFFFF] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] bg-[#FFFFFF]">
            Cancel
          </button>
          <button className="px-5 py-[9px] bg-[#00A0E3] text-[#FFFFFF] text-[13px] font-bold rounded-[8px] hover:bg-[#0090D1] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            Update Availability
          </button>
        </div>
      </div>
    </div>
  );
}
