"use client";

import React from "react";
import { X, Search } from "lucide-react";

interface ReassignEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReassignEditorModal({ isOpen, onClose }: ReassignEditorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/50 backdrop-blur-[2px] flex items-center justify-center p-4 font-dm-sans">
      <div className="bg-[#FFFFFF] w-full max-w-[600px] rounded-[16px] shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EAECF0] flex justify-between items-start relative shrink-0">
          <div>
            <div className="text-[18px] font-bold text-[#171717] mb-1">Reassign Editor</div>
            <div className="text-[13px] text-[#525866]">Assign a new editor to this document.</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors absolute top-6 right-6">
            <X className="w-5 h-5 text-[#A0AAB5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          
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

          {/* Editor Selection */}
          <div className="mb-6">
            <div className="text-[14px] font-bold text-[#171717] mb-3">Editor Selection</div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
              <input
                type="text"
                placeholder="Search editor..."
                className="w-full h-[40px] pl-10 pr-4 border border-[#EAECF0] rounded-[8px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] placeholder:text-[#A0AAB5]"
              />
            </div>

            {/* List */}
            <div className="space-y-3">
              {/* Item 1 - Current */}
              <div className="border border-[#00A0E3] bg-[#F0F9FF]/20 rounded-[8px] p-4 shadow-sm relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00A0E3] rounded-l-[8px]"></div>
                <div className="flex justify-between items-center mb-4 pl-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#EAECF0] overflow-hidden flex-shrink-0">
                      <img src="https://ui-avatars.com/api/?name=SW&background=EAECF0&color=171717" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#171717]">Dr. Sarah Williams</div>
                      <div className="text-[12px] text-[#A0AAB5]">example@gmail.com</div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 border border-[#00A0E3] text-[#00A0E3] text-[13px] font-bold rounded-[6px] hover:bg-[#F0F9FF] transition-colors">
                    Unassign
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-[#00A0E3]/10 pt-3 pl-1">
                 <div>
                    <div className="text-[11px] text-[#525866] mb-0.5">Active Assignments</div>
                    <div className="text-[13px] font-bold text-[#171717]">8</div>
                 </div>
                 <div>
                    <div className="text-[11px] text-[#525866] mb-0.5">On-Time Delivery</div>
                    <div className="text-[13px] font-bold text-[#171717]">94%</div>
                 </div>
                 <div>
                    <div className="text-[11px] text-[#525866] mb-0.5">Revision Rate</div>
                    <div className="text-[13px] font-bold text-[#171717]">12%</div>
                 </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="border border-[#EAECF0] rounded-[8px] p-4 hover:border-[#EAECF0] transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#EAECF0] overflow-hidden flex-shrink-0">
                      <img src="https://ui-avatars.com/api/?name=DK&background=EAECF0&color=171717" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#171717]">Prof. David Kumar</div>
                      <div className="text-[12px] text-[#A0AAB5]">example@gmail.com</div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-[#00A0E3] hover:bg-[#0089C2] text-white text-[13px] font-bold rounded-[6px] transition-colors shadow-sm">
                    Assign
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-[#EAECF0] pt-3">
                 <div>
                    <div className="text-[11px] text-[#525866] mb-0.5">Active Assignments</div>
                    <div className="text-[13px] font-bold text-[#171717]">5</div>
                 </div>
                 <div>
                    <div className="text-[11px] text-[#525866] mb-0.5">On-Time Delivery</div>
                    <div className="text-[13px] font-bold text-[#171717]">96%</div>
                 </div>
                 <div>
                    <div className="text-[11px] text-[#525866] mb-0.5">Revision Rate</div>
                    <div className="text-[13px] font-bold text-[#171717]">10%</div>
                 </div>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="border border-[#EAECF0] rounded-[8px] p-5">
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#171717] mb-2">Reason for Reassignment</label>
              <select className="w-full h-[40px] px-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white appearance-none cursor-pointer">
                <option value="" disabled selected>Select a reason</option>
                <option value="1">Editor requested reassignment</option>
                <option value="2">Missed deadlines</option>
                <option value="3">Quality issues</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-[#171717] mb-2">Admin Notes</label>
              <textarea 
                className="w-full p-3 border border-[#EAECF0] rounded-[6px] text-[13px] text-[#171717] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] min-h-[100px] resize-none placeholder:text-[#A0AAB5]"
                placeholder="Provide additional notes regarding reassignment."
              ></textarea>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAECF0] bg-[#FDFDFD] flex items-center justify-between shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 border border-[#EAECF0] rounded-[8px] text-[13px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-[#00A0E3] hover:bg-[#0089C2] text-white rounded-[8px] text-[13px] font-bold transition-colors">
            Assign New Editor
          </button>
        </div>

      </div>
    </div>
  );
}