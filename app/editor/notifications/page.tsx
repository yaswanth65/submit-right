"use client";

import React, { useMemo, useState } from "react";
import { CheckCheck, CheckCircle2, FileText, MessageSquare, TriangleAlert } from "lucide-react";

type NotificationType = "Document Updates" | "Payments" | "Messages";

type NotificationItem = {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  type: NotificationType;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
};

export default function EditorNotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "New document assigned",
      subtitle: "AI Ethics in Healthcare",
      time: "2 hours ago",
      unread: true,
      type: "Document Updates",
      icon: FileText,
      iconBg: "bg-[#E1F4FD]",
      iconColor: "text-[#00A0E3]",
    },
    {
      id: 2,
      title: "Deadline approaching (24h)",
      subtitle: "Physics Review",
      time: "2 hours ago",
      unread: true,
      type: "Document Updates",
      icon: TriangleAlert,
      iconBg: "bg-[#FEE2E2]",
      iconColor: "text-[#F43F5E]",
    },
    {
      id: 3,
      title: "Revision requested by client",
      subtitle: "Biology Thesis",
      time: "Yesterday",
      unread: false,
      type: "Document Updates",
      icon: FileText,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#D97706]",
    },
    {
      id: 4,
      title: "New message from Editor Sarah",
      subtitle: '"Hi Alex, I\'ve finished the abstract review. Let me know if you want to clarify the methodology terminology."',
      time: "Yesterday",
      unread: false,
      type: "Messages",
      icon: MessageSquare,
      iconBg: "bg-[#F3F4F6]",
      iconColor: "text-[#6B7280]",
    },
    {
      id: 5,
      title: "Your submission was approved",
      subtitle: "Quantum Computing",
      time: "2 days ago",
      unread: false,
      type: "Payments",
      icon: CheckCircle2,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#16A34A]",
    },
  ]);

  const tabs = ["All", "Unread", "Document Updates", "Payments", "Messages"];

  const filteredItems = useMemo(() => {
    if (activeTab === "All") {
      return items;
    }

    if (activeTab === "Unread") {
      return items.filter((item) => item.unread);
    }

    return items.filter((item) => item.type === activeTab);
  }, [activeTab, items]);

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  return (
    <div className="w-full font-dm-sans animate-in fade-in duration-300">
      <div className="mb-2">
        <div className="text-[24px] font-bold text-[#171717] mb-1">Notifications</div>
        <div className="text-[14px] text-[#525866]">Manage your document activity and platform updates.</div>
      </div>

      <div className="h-px w-full bg-[#EAECF0] my-4"></div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#00A0E3] text-white"
                  : "bg-[#F5F7FA] text-[#8A94A6] hover:bg-[#EAEFF4] hover:text-[#171717]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={markAllAsRead}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#00A0E3] hover:underline"
        >
          <CheckCheck className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-start justify-between gap-4 rounded-[14px] border p-4 transition-colors ${
              item.unread
                ? "bg-[#EFF9FF] border-[#00A0E3]"
                : "bg-white border-[#EAECF0] hover:bg-[#F9FAFB]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>

              <div>
                <div className="text-[16px] font-semibold text-[#171717] mb-1">{item.title}</div>
                <div className="text-[14px] text-[#8A94A6] leading-6">{item.subtitle}</div>
              </div>
            </div>

            <div className="text-right min-w-[88px] shrink-0">
              <div className="text-[13px] text-[#A0AAB5]">{item.time}</div>
              {item.unread ? <div className="w-2 h-2 rounded-full bg-[#00A0E3] mt-3 ml-auto"></div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}