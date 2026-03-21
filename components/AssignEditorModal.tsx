"use client";

import React, { useState } from "react";
import { X, Search } from "lucide-react";

interface AssignEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssignEditorModal({ isOpen, onClose }: AssignEditorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-dm-sans">
      <div className="absolute inset-0 bg-[#171717]/40 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="bg-[#FFFFFF] w-full max-w-[500px] rounded-[16px] shadow-xl relative z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
          <div className="text-[18px] font-bold text-[#171717]">Assign Editor</div>
          <button onClick={onClose} className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1 rounded-full hover:bg-[#F9FAFB]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="text-[14px] font-bold text-[#171717] mb-3">Document Details</div>
          <div className="bg-[#F9FAFB] rounded-[12px] p-4 border border-[#EAECF0] mb-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div className="col-span-2">
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Document Title</div>
                <div className="text-[14px] font-semibold text-[#171717]">Business Ethics Case Study</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Student Name</div>
                <div className="text-[14px] font-semibold text-[#171717]">James Wilson</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Service Type</div>
                <div className="text-[14px] font-semibold text-[#171717]">Proofreading</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Word Count</div>
                <div className="text-[14px] font-semibold text-[#171717]">2,100 words</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Deadline</div>
                <div className="text-[14px] font-semibold text-[#171717]">Mar 05, 2026</div>
              </div>
            </div>
          </div>

          <div className="text-[14px] font-bold text-[#171717] mb-3">Available Editors (20)</div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {/* Assigned Editor */}
            <div className="border-[1.5px] border-[#00A0E3] rounded-[10px] p-4 relative overflow-hidden bg-[#FFFFFF] shadow-sm">
              <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#00A0E3]"></div>
              <div className="flex items-center justify-between mb-4 pl-1">
                <div className="flex items-center space-x-3">
                  <img src="https://i.pravatar.cc/150?u=1" alt="Editor" className="w-10 h-10 rounded-full border border-[#EAECF0]" />
                  <div>
                    <div className="text-[14px] font-bold text-[#171717]">Dr. Sarah Williams</div>
                    <div className="text-[12px] text-[#525866]">eaxmple@gmail.com</div>
                  </div>
                </div>
                <button className="text-[12px] font-bold text-[#00A0E3] border border-[#00A0E3] px-3 py-1.5 rounded-[6px] hover:bg-[#00A0E3]/5 transition-colors">
                  Unassign
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-[#EAECF0] pt-3 px-1">
                <div>
                  <div className="text-[11px] font-medium text-[#A0AAB5] mb-0.5">Active Assignments</div>
                  <div className="text-[14px] font-bold text-[#171717]">8</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#A0AAB5] mb-0.5">On-Time Delivery</div>
                  <div className="text-[14px] font-bold text-[#171717]">94%</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#A0AAB5] mb-0.5">Revision Rate</div>
                  <div className="text-[14px] font-bold text-[#171717]">12%</div>
                </div>
              </div>
            </div>

            {/* Unassigned Editor */}
            <div className="border border-[#EAECF0] rounded-[10px] p-4 bg-[#FFFFFF] hover:border-[#EAECF0] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src="https://i.pravatar.cc/150?u=2" alt="Editor" className="w-10 h-10 rounded-full border border-[#EAECF0]" />
                  <div>
                    <div className="text-[14px] font-bold text-[#171717]">Prof. David Kumar</div>
                    <div className="text-[12px] text-[#525866]">eaxmple@gmail.com</div>
                  </div>
                </div>
                <button className="text-[12px] font-bold text-[#FFFFFF] bg-[#00A0E3] hover:bg-[#0090D1] px-5 py-1.5 rounded-[6px] transition-colors shadow-sm">
                  Assign
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-[#EAECF0] pt-3">
                <div>
                  <div className="text-[11px] font-medium text-[#A0AAB5] mb-0.5">Active Assignments</div>
                  <div className="text-[14px] font-bold text-[#171717]">5</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#A0AAB5] mb-0.5">On-Time Delivery</div>
                  <div className="text-[14px] font-bold text-[#171717]">96%</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#A0AAB5] mb-0.5">Revision Rate</div>
                  <div className="text-[14px] font-bold text-[#171717]">10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#EAECF0] flex justify-between items-center rounded-b-[16px] bg-[#FFFFFF]">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-bold text-[#525866] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] rounded-[8px] text-[13px] font-bold transition-colors shadow-sm">
            Confirm Assignment
          </button>
        </div>

      </div>
    </div>
  );
}