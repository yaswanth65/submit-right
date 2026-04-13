"use client";

import React, { useMemo, useState, useEffect } from "react";
import { CheckCheck, CheckCircle2, FileText, MessageSquare, TriangleAlert } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type NotificationType = "document_update" | "payment" | "message";

type NotificationItem = {
  id: string;
  title?: string;
  message?: string;
  created_at?: string;
  is_read?: boolean;
  type?: NotificationType;
};

function getIcon(type?: NotificationType) {
  if (type === "message") {
    return { Icon: MessageSquare, iconBg: "bg-[#F3F4F6]", iconColor: "text-[#6B7280]" };
  }

  if (type === "payment") {
    return { Icon: CheckCircle2, iconBg: "bg-[#DCFCE7]", iconColor: "text-[#16A34A]" };
  }

  if (type === "document_update") {
    return { Icon: FileText, iconBg: "bg-[#E1F4FD]", iconColor: "text-[#00A0E3]" };
  }

  return { Icon: TriangleAlert, iconBg: "bg-[#FEE2E2]", iconColor: "text-[#F43F5E]" };
}

function timeAgo(value?: string) {
  if (!value) {
    return "-";
  }

  const diffMinutes = Math.floor((Date.now() - new Date(value).getTime()) / 60000);
  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)} min ago`;
  }

  const hours = Math.floor(diffMinutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function EditorNotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<NotificationItem[]>("/api/editor/notifications");
        if (active) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load notifications.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const tabs = ["All", "Unread", "Document Updates", "Payments", "Messages"];

  const filteredItems = useMemo(() => {
    if (activeTab === "All") {
      return items;
    }

    if (activeTab === "Unread") {
      return items.filter((item) => !item.is_read);
    }

    if (activeTab === "Document Updates") {
      return items.filter((item) => item.type === "document_update");
    }

    if (activeTab === "Payments") {
      return items.filter((item) => item.type === "payment");
    }

    return items.filter((item) => item.type === "message");
  }, [activeTab, items]);

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, is_read: true })));
  };

  return (
    <div className="w-full font-dm-sans animate-in fade-in duration-300 space-y-6">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Notifications</div>
        <div className="text-[14px] text-[#525866] mt-1">Manage your document activity and platform updates.</div>
      </div>

      {error ? (
        <div className="mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

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
        {filteredItems.map((item) => {
          const { Icon, iconBg, iconColor } = getIcon(item.type);
          const unread = !item.is_read;

          return (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 rounded-[14px] border p-4 transition-colors ${
                unread ? "bg-[#EFF9FF] border-[#00A0E3]" : "bg-white border-[#EAECF0] hover:bg-[#F9FAFB]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>

                <div>
                  <div className="text-[16px] font-semibold text-[#171717] mb-1">{item.title || "Notification"}</div>
                  <div className="text-[14px] text-[#8A94A6] leading-6">{item.message || "No details available."}</div>
                </div>
              </div>

              <div className="text-right min-w-[88px] shrink-0">
                <div className="text-[13px] text-[#A0AAB5]">{timeAgo(item.created_at)}</div>
                {unread ? <div className="w-2 h-2 rounded-full bg-[#00A0E3] mt-3 ml-auto"></div> : null}
              </div>
            </div>
          );
        })}

        {loading ? <p className="text-[14px] text-[#78788D]">Loading notifications...</p> : null}
        {!loading && filteredItems.length === 0 ? (
          <p className="text-[14px] text-[#78788D]">No notifications found for this tab.</p>
        ) : null}
      </div>
    </div>
  );
}
