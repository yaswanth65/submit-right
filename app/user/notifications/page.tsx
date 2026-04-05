"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, FileText, Banknote, CheckCircle2, MessageSquare } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";

type NotificationType = "document_update" | "payment" | "message";

type NotificationRow = {
  id: string;
  title?: string;
  body?: string;
  type?: NotificationType;
  is_read?: boolean;
  created_at?: string;
  document_id?: string;
};

type NotificationsPayload = {
  all: NotificationRow[];
  unread: NotificationRow[];
  documentUpdates: NotificationRow[];
  payments: NotificationRow[];
  messages: NotificationRow[];
};

function getIcon(type?: NotificationType) {
  if (type === "payment") {
    return { Icon: Banknote, iconBg: "bg-[#FEF0E6]", iconColor: "text-[#F97316]" };
  }

  if (type === "message") {
    return { Icon: MessageSquare, iconBg: "bg-[#F5F7FA]", iconColor: "text-[#525866]" };
  }

  if (type === "document_update") {
    return { Icon: FileText, iconBg: "bg-[#E1F4FD]", iconColor: "text-[#00A0E3]" };
  }

  return { Icon: CheckCircle2, iconBg: "bg-[#E6F8EC]", iconColor: "text-[#00A859]" };
}

function formatRelative(date?: string) {
  if (!date) {
    return "-";
  }

  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) {
    return `${Math.max(minutes, 1)} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [payload, setPayload] = useState<NotificationsPayload>({
    all: [],
    unread: [],
    documentUpdates: [],
    payments: [],
    messages: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<NotificationsPayload>("/api/client/notifications");
        if (active) {
          setPayload(data);
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

  const notifications = useMemo(() => {
    if (activeTab === "Unread") {
      return payload.unread;
    }

    if (activeTab === "Document Updates") {
      return payload.documentUpdates;
    }

    if (activeTab === "Payments") {
      return payload.payments;
    }

    if (activeTab === "Messages") {
      return payload.messages;
    }

    return payload.all;
  }, [activeTab, payload]);

  const resolveNotificationTarget = (notif: NotificationRow) => {
    const searchable = `${notif.title || ""} ${notif.body || ""}`.toLowerCase();

    if (searchable.includes("ticket") || searchable.includes("support")) {
      return "/user/help";
    }

    if (notif.type === "payment") {
      return "/user/payments";
    }

    if (notif.type === "message") {
      return "/user/chat";
    }

    if (notif.document_id) {
      return `/user/documents/${notif.document_id}`;
    }

    if (notif.type === "document_update") {
      return "/user/documents";
    }

    return "/user/notifications";
  };

  const markAllAsRead = async () => {
    const unreadIds = payload.all.filter((item) => !item.is_read).map((item) => item.id);
    if (unreadIds.length === 0) {
      return;
    }

    try {
      await apiRequest<NotificationRow[]>("/api/client/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds: unreadIds })
      });

      setPayload((previous) => {
        const all = previous.all.map((item) => ({ ...item, is_read: true }));
        return {
          all,
          unread: [],
          documentUpdates: all.filter((item) => item.type === "document_update"),
          payments: all.filter((item) => item.type === "payment"),
          messages: all.filter((item) => item.type === "message")
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark notifications as read.");
    }
  };

  const openNotification = async (notif: NotificationRow) => {
    try {
      if (!notif.is_read) {
        await apiRequest<NotificationRow[]>("/api/client/notifications/read", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationIds: [notif.id] })
        });

        setPayload((previous) => {
          const all = previous.all.map((item) =>
            item.id === notif.id ? { ...item, is_read: true } : item
          );
          return {
            all,
            unread: all.filter((item) => !item.is_read),
            documentUpdates: all.filter((item) => item.type === "document_update"),
            payments: all.filter((item) => item.type === "payment"),
            messages: all.filter((item) => item.type === "message")
          };
        });
      }
    } catch {
      // Ignore read failures and continue with navigation.
    } finally {
      router.push(resolveNotificationTarget(notif));
    }
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-76px)] font-dm-sans bg-white">
      <div className="flex flex-col border-b border-[#EAECF0] sm:flex-row sm:items-start justify-between gap-4 mb-4 shrink-0">
        <div className="shrink-0 border-b py-4 border-gray-100 px-4">
          <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">Notifications</h1>
          <p className="text-[#78788D] text-[14px]">Manage your document activity and platform updates.</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 py-8 px-4 text-[#00A0E3] hover:text-[#008bc5] transition-colors font-medium text-[15px] hover:underline mt-1 sm:mt-0"
        >
          <CheckCheck className="w-[18px] h-[18px]" strokeWidth={2.5} />
          Mark all as read
        </button>
      </div>

      {error ? (
        <div className="mx-4 mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

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

      <div className="flex flex-col gap-4 px-4 overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {notifications.map((notif) => {
          const { Icon, iconBg, iconColor } = getIcon(notif.type);
          const unread = !notif.is_read;

          return (
            <button
              key={notif.id}
              type="button"
              onClick={() => void openNotification(notif)}
              className={`flex items-center gap-5 p-5 rounded-[16px] border transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
                unread ? "border-[#00A0E3] bg-[#EFF9FF]" : "border-[#EAECF0] bg-white"
              }`}
            >
              <div className={`w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon className={`w-[24px] h-[24px] ${iconColor}`} strokeWidth={2} />
              </div>

              <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col flex-1 pr-4">
                  <h3 className="text-[14px] font-medium text-[#171717] mb-1">{notif.title || "Notification"}</h3>
                  <p className="text-[#78788D] text-[14px] leading-relaxed">{notif.body || "No details available."}</p>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch shrink-0 min-w-[80px] py-0.5">
                  <span className="text-[13px] text-[#A0AAB5] font-medium">{formatRelative(notif.created_at)}</span>
                  {unread ? <div className="w-[6px] h-[6px] bg-[#00A0E3] rounded-full"></div> : null}
                </div>
              </div>
            </button>
          );
        })}

        {loading ? <p className="text-[14px] text-[#78788D]">Loading notifications...</p> : null}
        {!loading && notifications.length === 0 ? (
          <p className="text-[14px] text-[#78788D]">No notifications found for this tab.</p>
        ) : null}
      </div>
    </div>
  );
}
