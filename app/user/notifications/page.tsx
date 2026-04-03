"use client";

import React, { useState } from "react";
import { 
  CheckCheck, 
  FileText, 
  Banknote, 
  CheckCircle2, 
  MessageSquare 
} from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All", 
    "Unread", 
    "Document Updates", 
    "Payments", 
    "Messages"
  ];

  const notifications = [
    {
      id: 1,
      title: "Revision uploaded for AI Research Paper",
      desc: "The editor has completed the requested revisions for section 3.2. Please review the track changes before final submission.",
      time: "2 hours ago",
      unread: true,
      icon: FileText,
      iconBg: "bg-[#E1F4FD]",
      iconColor: "text-[#00A0E3]",
    },
    {
      id: 2,
      title: "Revision uploaded for AI Research Paper",
      desc: "The editor has completed the requested revisions for section 3.2. Please review the track changes before final submission.",
      time: "2 hours ago",
      unread: true,
      icon: Banknote,
      iconBg: "bg-[#FEF0E6]",
      iconColor: "text-[#F97316]",
    },
    {
      id: 3,
      title: "Payment completed successfully",
      desc: "Your transaction #TRX-99218 for the proofreading service has been processed. A receipt has been sent to your email.",
      time: "Yesterday",
      unread: false,
      icon: CheckCircle2,
      iconBg: "bg-[#E6F8EC]",
      iconColor: "text-[#00A859]",
    },
    {
      id: 4,
      title: "New message from Editor Sarah",
      desc: '"Hi Alex, I\'ve finished the abstract review. Let me know if you want to clarify the methodology terminology."',
      time: "2 days ago",
      unread: false,
      icon: MessageSquare,
      iconBg: "bg-[#F5F7FA]",
      iconColor: "text-[#525866]",
    },
  ];

  return (
    <div className="w-full flex flex-col h-[calc(100vh-76px)]  font-dm-sans bg-white">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col border-b border-[#EAECF0] sm:flex-row sm:items-start justify-between gap-4 mb-4 shrink-0">
        {/* <div>
          <h1 className="text-[28px] font-bold text-[#171717] mb-1.5 tracking-tight">
            Notifications
          </h1>
          <p className="text-[#78788D] text-[15px]">
            Manage your document activity and platform updates.
          </p>
        </div> */}
        <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">
        Notifications
        </h1>
        <p className="text-[#78788D] text-[14px]">
        Manage your document activity and platform updates.
        </p>
      </div>
        <button className="flex items-center gap-2 py-8 px-4 text-[#00A0E3] hover:text-[#008bc5] transition-colors font-medium text-[15px] hover:underline mt-1 sm:mt-0">
          <CheckCheck className="w-[18px] h-[18px]" strokeWidth={2.5} />
          Mark all as read
        </button>
      </div>

      {/* --- TABS --- */}
      <div className="flex flex-wrap items-center px-4 gap-3 mb-8 shrink-0 border-b border-[#EAECF0] pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-[8px] text-[14px] font-bold transition-colors ${
              activeTab === tab
                ? "bg-[#00A0E3] text-white"
                : "bg-[#F5F7FA] text-[#78788D] hover:bg-[#EAEFF4] hover:text-[#171717]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- NOTIFICATIONS LIST --- */}
      <div className="flex flex-col gap-4 px-4 overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {notifications.map((notif) => (
    <div 
        key={notif.id} 
        className={`flex items-center gap-5 p-5 rounded-[16px] border transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
        notif.unread ? "border-[#00A0E3] bg-[#EFF9FF]" : "border-[#EAECF0] bg-white"
        }`}
    >
        {/* Icon */}
        <div className={`w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0 ${notif.iconBg}`}>
        <notif.icon className={`w-[24px] h-[24px] ${notif.iconColor}`} strokeWidth={2} />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Text */}
        <div className="flex flex-col flex-1 pr-4">
            <h3 className="text-[14px] font-medium text-[#171717] mb-1">
            {notif.title}
            </h3>
            <p className="text-[#78788D] text-[14px] leading-relaxed">
            {notif.desc}
            </p>
        </div>

        {/* Time & Unread Indicator */}
        <div className="flex flex-col items-end justify-between self-stretch shrink-0 min-w-[80px] py-0.5">
            <span className="text-[13px] text-[#A0AAB5] font-medium">
            {notif.time}
            </span>
            {notif.unread && (
            <div className="w-[6px] h-[6px] bg-[#00A0E3] rounded-full"></div>
        )}
      </div>

    </div>
  </div>
))}
      </div>

    </div>
  );
}