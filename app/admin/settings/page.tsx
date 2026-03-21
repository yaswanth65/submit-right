import React from "react";

export default function SettingsScreen() {
  return (
    <div className="space-y-6 w-full font-dm-sans animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">System Settings</div>
          <p className="text-[14px] text-[#525866]">Configure platform rules and operational policies.</p>
        </div>
        <button className="bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] px-4 py-2 rounded-[8px] text-[13px] font-semibold transition-transform transform hover:scale-105 active:scale-95 shadow-sm">
          Save Changes
        </button>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm group hover:shadow-md transition-shadow duration-300">
        <div className="text-[16px] font-bold text-[#171717] ">General Platform Settings</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 group/field">
            <label className="text-[13px] font-medium text-[#171717] group-hover/field:text-[#00A0E3] transition-colors">Total Documents Submitted</label>
            <input 
              type="text" 
              defaultValue="SubmitRight" 
              className="w-full border border-[#EAECF0] rounded-[8px] px-3 py-2 text-[14px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>
          
          <div className="space-y-2 group/field">
            <label className="text-[13px] font-medium text-[#171717] group-hover/field:text-[#00A0E3] transition-colors">Support Email</label>
            <input 
              type="email" 
              defaultValue="support@submitright.com" 
              className="w-full border border-[#EAECF0] rounded-[8px] px-3 py-2 text-[14px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>
          
          <div className="space-y-2 group/field">
            <label className="text-[13px] font-medium text-[#171717] group-hover/field:text-[#00A0E3] transition-colors">Default Timezone</label>
            <select className="w-full border border-[#EAECF0] rounded-[8px] px-3 py-2 text-[14px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all appearance-none bg-white">
              <option>UTC (Coordinated Universal Time)</option>
            </select>
          </div>
          
          <div className="space-y-2 group/field">
            <label className="text-[13px] font-medium text-[#171717] group-hover/field:text-[#00A0E3] transition-colors">Default Currency</label>
            <select className="w-full border border-[#EAECF0] rounded-[8px] px-3 py-2 text-[14px] text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all appearance-none bg-white">
              <option>USD - US Dollar</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm group hover:shadow-md transition-shadow duration-300">
        <div className="text-[16px] font-bold text-[#171717] ">Notification Settings</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] rounded-[8px] transition-colors">
            <div>
              <div className="text-[14px] font-semibold text-[#171717]">Enable Email Notifications</div>
              <p className="text-[13px] text-[#525866] mt-0.5">Send email notifications for important platform events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A0E3]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] rounded-[8px] transition-colors">
            <div>
              <div className="text-[14px] font-semibold text-[#171717]">Enable In-App Notifications</div>
              <p className="text-[13px] text-[#525866] mt-0.5">Display notifications within the platform interface</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A0E3]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}