"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface CancelAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CancelAssignmentModal({ isOpen, onClose }: CancelAssignmentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/50 backdrop-blur-[2px] flex items-center justify-center p-4 font-dm-sans">
      <div className="bg-[#FFFFFF] w-full max-w-[600px] rounded-[16px] shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EAECF0] flex justify-between items-start relative">
          <div>
            <div className="text-[18px] font-bold text-[#171717] mb-1">Cancel Assignment</div>
            <div className="text-[13px] text-[#525866]">Cancelling will stop the editor's work on this assignment.</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors absolute top-6 right-6">
            <X className="w-5 h-5 text-[#A0AAB5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto w-full custom-scrollbar">
          {/* Warning Message */}
          <div className="bg-[#FFF0F0] border border-[#FB3748] rounded-[8px] p-3 flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-[#FB3748]" />
            <span className="text-[13px] font-medium text-[#FB3748]">This will cancel the assignment and notify the editor.</span>
          </div>

          {/* Document Details */}
          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-4 mb-6">
            <div className="mb-4">
              <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Document Title</div>
              <div className="text-[13px] font-bold text-[#171717]">Case Study – Business Adminstration</div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Student</div>
                <div className="text-[13px] font-semibold text-[#171717]">Sarah Johnson</div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#A0AAB5] mb-1">Assigned Editor</div>
                <div className="text-[13px] font-semibold text-[#171717]">Dr. Sarah Williams</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border border-[#EAECF0] rounded-[8px] p-5">
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#171717] mb-2">Cancellation Reason</label>
              <select className="w-full h-[40px] px-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white appearance-none cursor-pointer">
                <option value="" disabled selected>Select duration</option>
                <option value="1">Student requested cancellation</option>
                <option value="2">Editor unavailable</option>
                <option value="3">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-[#171717] mb-2">Admin Notes</label>
              <textarea 
                className="w-full p-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] min-h-[100px] resize-none placeholder:text-[#A0AAB5]"
                placeholder="Add notes for internal records..."
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-3 pl-1">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-[16px] h-[16px] border-[#EAECF0] rounded-[4px] text-[#00A0E3] focus:ring-0 checked:bg-[#00A0E3] cursor-pointer" />
              <span className="text-[14px] text-[#525866] font-medium">I confirm cancellation of this assignment.</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAECF0] bg-[#FDFDFD] flex items-center justify-between shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 border border-[#EAECF0] rounded-[8px] text-[13px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-[#FB3748] hover:bg-[#E03140] text-white rounded-[8px] text-[13px] font-bold transition-colors">
            Confirm Cancellation
          </button>
        </div>

      </div>
    </div>
  );
}