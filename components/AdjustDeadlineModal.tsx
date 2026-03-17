"use client";

import React from "react";
import { X, AlertCircle } from "lucide-react";

interface AdjustDeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdjustDeadlineModal({ isOpen, onClose }: AdjustDeadlineModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/50 backdrop-blur-[2px] flex items-center justify-center p-4 font-dm-sans">
      <div className="bg-[#FFFFFF] w-full max-w-[600px] rounded-[16px] shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EAECF0] flex justify-between items-start relative shrink-0">
          <div>
            <div className="text-[18px] font-bold text-[#171717] mb-1">Adjust Deadline</div>
            <div className="text-[13px] text-[#525866]">Update the submission deadline for this document.</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors absolute top-6 right-6">
            <X className="w-5 h-5 text-[#A0AAB5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto w-full custom-scrollbar">
          {/* Info Message */}
          <div className="bg-[#F0F9FF] border border-[#00A0E3] rounded-[8px] p-3 flex items-center space-x-3 mb-6">
            <AlertCircle className="w-5 h-5 text-[#00A0E3]" />
            <span className="text-[13px] font-medium text-[#00A0E3]">The assigned editor will be notified of the new deadline.</span>
          </div>

          {/* Document Details */}
          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-4 mb-6">
            <div className="mb-4">
              <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Document Title</div>
              <div className="text-[13px] font-bold text-[#171717]">Case Study – Business Adminstration</div>
            </div>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Student</div>
                <div className="text-[13px] font-semibold text-[#171717]">Sarah Johnson</div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Assigned Editor</div>
                <div className="text-[13px] font-semibold text-[#171717]">Dr. Sarah Williams</div>
              </div>
              <div className="col-span-2 border-t border-[#EAECF0] pt-4 mt-2">
                <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Current Deadline</div>
                <div className="text-[13px] font-bold text-[#FB3748]">Feb 28, 2026</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[13px] font-medium text-[#171717] mb-2">New Deadline</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2026-03-15"
                  className="w-full h-[40px] px-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white text-[#525866]" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#171717] mb-2">Reason for Deadline Change</label>
              <select className="w-full h-[40px] px-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white appearance-none cursor-pointer">
                <option value="" disabled selected>Select a reason</option>
                <option value="1">Student requested extension</option>
                <option value="2">Editor asked for more time</option>
                <option value="3">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-medium text-[#171717] mb-2">Admin Notes</label>
            <textarea 
              className="w-full p-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] min-h-[100px] resize-none placeholder:text-[#A0AAB5]"
              placeholder="Add explanation for deadline adjustment."
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAECF0] bg-[#FDFDFD] flex items-center justify-between shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 border border-[#EAECF0] rounded-[8px] text-[13px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-[#00A0E3] hover:bg-[#0089C2] text-white rounded-[8px] text-[13px] font-bold transition-colors">
            Update Deadline
          </button>
        </div>

      </div>
    </div>
  );
}