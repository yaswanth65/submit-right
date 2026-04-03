"use client";

import React, { useState } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";

export default function ProfileSettingsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="w-full font-dm-sans mx-auto px-4 py-4 relative">
      
      {/* --- HEADER --- */}
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#171717] mb-1.5 tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-[#78788D] text-[12px]">
          Manage your profile and workspace information
        </p>
      </div>

      {/* --- SETTINGS LIST --- */}
      <div className="flex flex-col border-t border-[#EAECF0]">
        
        {/* Row: Avatar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Your Avatar</h3>
            <p className="text-[#78788D] text-[14px]">Recommended: Square image, at least 400x400px.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
              Change Photo
            </button>
            <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
              Change Photo
            </button>
          </div>
        </div>

        {/* Row: Full Name */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Full Name</h3>
            <p className="text-[#78788D] text-[14px]">Pradhyumn Dhondi</p>
          </div>
          <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Update Full Name
          </button>
        </div>

        {/* Row: Email Address */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">E-Mail Address</h3>
            <p className="text-[#78788D] text-[14px]">pradhyumdhondi@gmail.com</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
              Change Password
            </button>
            <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
              Change E-Mail
            </button>
          </div>
        </div>

        {/* Row: Mobile Number */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Mobile Number (Optional)</h3>
            <p className="text-[#78788D] text-[14px]">+91 123456789</p>
          </div>
          <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Add Mobile Number
          </button>
        </div>

        {/* Row: Country, State */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Country, State (Optional)</h3>
            <p className="text-[#78788D] text-[14px]">India, Telangana</p>
          </div>
          <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Update Country, State
          </button>
        </div>

        {/* Row: 2FA */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Two-Factor Authentication</h3>
            <p className="text-[#78788D] text-[14px]">Disabled</p>
          </div>
          <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Add Two-Factor Authentication
          </button>
        </div>

        {/* Row: Current Password */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Current Password</h3>
            <p className="text-[#78788D] text-[14px] tracking-widest">****************</p>
          </div>
          <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Reset Password
          </button>
        </div>

        {/* Row: Sign Out */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-medium text-[#171717] mb-1">Sign Out</h3>
            <p className="text-[#78788D] text-[14px]">Sign out of this device and session. You will need to sign in again on this device.</p>
          </div>
          <button className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors">
            Sign Out
          </button>
        </div>

        {/* Row: Deactivate Account */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0]">
          <div>
            <h3 className="text-[15px] font-bold text-[#EF4444] mb-1">Deactivate Account</h3>
            <p className="text-[#78788D] text-[14px] max-w-[600px]">
              Permanently delete your account across all devices. You will no longer be able to create an Submit Right account with this gmail.
            </p>
          </div>
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 border border-[#FECACA] text-[#EF4444] rounded-[8px] text-[13px] font-bold hover:bg-[#FEF2F2] transition-colors whitespace-nowrap"
          >
            Delete Account
          </button>
        </div>

      </div>

      {/* --- DELETE ACCOUNT MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[520px] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-4 pt-6 pb-4 flex items-start justify-between">
              <div>
                <h2 className="text-[18px] font-medium text-[#171717] mb-1">Delete Account</h2>
                <p className="text-[#78788D] text-[14px]">Please review the consequences of this action carefully.</p>
              </div>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
              <div className="h-px bg-gray-100 mb-4" ></div>
            <div className="px-4 pb-6 flex flex-col gap-5">
              
              {/* Warning Alert */}
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] p-4 flex gap-3">
                <AlertTriangle className="w-[18px] h-[18px] text-[#EF4444] shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="text-[#EF4444] text-[14px] leading-relaxed font-medium">
                  Deleting your account is permanent and cannot be undone. All your data will be purged from our servers.
                </p>
              </div>

              {/* Information Box */}
              <div className="bg-[#F8FAFC] rounded-[12px] p-5">
                <h3 className="text-[18px] font-semibold text-[#171717] mb-3">Password Requirements</h3>
                <ul className="space-y-2.5 text-[#525866] text-[14px] list-disc pl-5 marker:text-[#A0AAB5]">
                  <li className="pl-1">All uploaded academic documents, research papers, and drafts.</li>
                  <li className="pl-1">Payment and billing history, including active subscription data.</li>
                  <li className="pl-1">Correspondence with editors.</li>
                </ul>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#171717]">
                  Enter Your Password to Confirm Identity
                </label>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="bg-[#F8FAFC] rounded-[12px] p-4 flex items-start gap-3 mt-1">
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    type="checkbox" 
                    className="w-[18px] h-[18px] border-[#EAECF0] rounded-[4px] text-[#00A0E3] focus:ring-[#00A0E3] cursor-pointer"
                  />
                </div>
                <label className="text-[#171717] text-[14px] leading-relaxed cursor-pointer">
                  I understand that this action is permanent and my data cannot be recovered.
                </label>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-5 border-t border-[#EAECF0] flex items-center justify-between bg-white rounded-b-[16px]">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-[#FF4D4F] hover:bg-[#ef4444] text-white rounded-[8px] text-[14px] font-bold transition-colors flex items-center gap-2">
                <Trash2 className="w-[16px] h-[16px]" strokeWidth={2.5} />
                Deactivate Account
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}