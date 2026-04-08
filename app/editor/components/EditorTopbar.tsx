"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  MessageSquare,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredAuthSession, signOutClient } from "@/lib/client-auth";
import { apiGet } from "@/lib/client-api";

type APINotificationItem = {
  id: string;
  title?: string;
  message?: string;
  created_at?: string;
  is_read?: boolean;
  type?: "document_update" | "payment" | "message";
};

type NotificationItem = {
  id: string | number;
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  icon: typeof FileText;
  iconBg: string;
  iconColor: string;
};

function getNotificationIcon(type?: string) {
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
  if (!value) return "Recently";
  const diffMinutes = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const hours = Math.floor(diffMinutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function EditorTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setNotificationsLoading(true);
      setNotificationsError(null);
      const data = await apiGet<APINotificationItem[]>("/api/editor/notifications");
      
      const transformed: NotificationItem[] = data.map((item) => {
        const { Icon, iconBg, iconColor } = getNotificationIcon(item.type);
        return {
          id: item.id,
          title: item.title || "Notification",
          subtitle: item.message || "",
          time: timeAgo(item.created_at),
          unread: !item.is_read,
          icon: Icon,
          iconBg,
          iconColor,
        };
      });

      setNotifications(transformed);
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Failed to load notifications");
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();
    const interval = setInterval(() => {
      void loadNotifications();
    }, 30000);
    return () => clearInterval(interval);
  }, [loadNotifications]);

  const session = getStoredAuthSession();
  const userName =
    typeof session?.user?.full_name === "string" && session.user.full_name.trim()
      ? session.user.full_name
      : "Editor";
  const userEmail =
    typeof session?.user?.email === "string" && session.user.email.trim()
      ? session.user.email
      : "editor@submitright.com";
  const userInitials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "E";

  const hasUnread = notifications.some((item) => item.unread);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const markAsRead = (id: string | number) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOutClient();
    router.replace("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let breadcrumb = (
    <>
      <LayoutDashboard className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
      <span className="text-[#525866]">Dashboard</span>
    </>
  );

  if (pathname === "/editor/completed") {
    breadcrumb = (
      <>
        <LayoutTemplate className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
        <span className="text-[#525866]">Completed Documents</span>
      </>
    );
  } else if (pathname.startsWith("/editor/assigned")) {
    breadcrumb = (
      <>
        <LayoutTemplate className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
        <span className="text-[#525866]">Assigned Documents</span>
      </>
    );
  } else if (pathname === "/editor/messages") {
    breadcrumb = (
      <>
        <LayoutTemplate className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
        <span className="text-[#525866]">Messages</span>
      </>
    );
  } else if (pathname === "/editor/profile") {
    breadcrumb = (
      <>
        <LayoutTemplate className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
        <span className="text-[#525866]">Profile & Settings</span>
      </>
    );
  } else if (pathname === "/editor/help") {
    breadcrumb = (
      <>
        <LayoutTemplate className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
        <span className="text-[#525866]">Help & Support</span>
      </>
    );
  } else if (pathname === "/editor/notifications") {
    breadcrumb = (
      <>
        <LayoutTemplate className="w-[18px] h-[18px] text-[#A0AAB5] mr-2" />
        <span className="text-[#525866]">Notifications</span>
      </>
    );
  }

  return (
    <header className="h-[76px] bg-[#FFFFFF] border-b border-[#EAECF0] flex items-center justify-between px-8 sticky top-0 z-10 font-dm-sans">
      <div className="flex items-center text-[13px] font-medium">{breadcrumb}</div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsProfileMenuOpen(false);
            }}
            className="w-[42px] h-[42px] border border-[#EAECF0] rounded-[10px] flex items-center justify-center text-[#525866] hover:bg-[#F9FAFB] relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
            {hasUnread ? (
              <span className="absolute top-[12px] right-[12px] w-[6px] h-[6px] bg-[#00A0E3] rounded-full border border-[1.5px] border-white box-content"></span>
            ) : null}
          </button>

          {isNotificationsOpen ? (
            <div className="absolute right-0 top-[52px] w-[360px] bg-white border border-[#EAECF0] rounded-[16px] shadow-[0_16px_32px_rgba(0,0,0,0.08)] overflow-hidden z-50">
              <div className="px-5 py-4 border-b border-[#EAECF0] flex items-center justify-between">
                <div className="text-[18px] leading-[24px] font-semibold text-[#171717]">Notifications</div>
                <button onClick={markAllAsRead} className="text-[13px] text-[#00A0E3] font-medium hover:underline" disabled={notificationsLoading || notifications.length === 0}>
                  Mark All as Read
                </button>
              </div>

              <div className="max-h-[360px] overflow-y-auto">
                {notificationsLoading ? (
                  <div className="px-5 py-8 text-center text-[13px] text-[#8A94A6]">Loading notifications...</div>
                ) : notificationsError ? (
                  <div className="px-5 py-8 text-center text-[12px] text-[#F43F5E]">{notificationsError}</div>
                ) : notifications.length === 0 ? (
                  <div className="px-5 py-8 text-center text-[13px] text-[#8A94A6]">No notifications</div>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className="w-full text-left px-5 py-3 border-b border-[#EAECF0] last:border-b-0 hover:bg-[#F9FAFB] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                          <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] leading-[20px] font-semibold text-[#171717]">{item.title}</div>
                          <div className="text-[13px] leading-[18px] text-[#8A94A6] mt-0.5">{item.subtitle}</div>
                        </div>
                        <div className="text-right shrink-0 min-w-[70px]">
                          <div className="text-[12px] leading-[16px] text-[#8A94A6]">{item.time}</div>
                          {item.unread ? <div className="w-[6px] h-[6px] rounded-full bg-[#00A0E3] mt-1.5 ml-auto"></div> : null}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <Link
                href="/editor/notifications"
                onClick={() => setIsNotificationsOpen(false)}
                className="block text-center px-5 py-3 border-t border-[#EAECF0] text-[13px] font-medium text-[#00A0E3] hover:bg-[#F9FAFB]"
              >
                {"View All Notifications ->"}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => {
              setIsProfileMenuOpen((prev) => !prev);
              setIsNotificationsOpen(false);
            }}
            className="w-[40px] h-[40px] rounded-full border border-[#EAECF0] cursor-pointer flex-shrink-0 bg-[#F0F7FB] text-[#0B74A5] text-[13px] font-semibold flex items-center justify-center"
            aria-label="Open profile menu"
          >
            {userInitials}
          </button>

          {isProfileMenuOpen ? (
            <div className="absolute right-0 top-[52px] w-[250px] bg-white border border-[#EAECF0] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50">
              <div className="px-4 pt-4 pb-3 border-b border-[#EAECF0]">
                <p className="text-[14px] font-semibold text-[#171717] leading-tight">{userName}</p>
                <p className="text-[12px] text-[#8A94A6] mt-1 truncate">{userEmail}</p>
              </div>

              <div className="py-1.5">
                <Link
                  href="/editor/profile"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="px-4 py-2.5 text-[13px] text-[#171717] hover:bg-[#F8FAFB] flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-[#8A94A6]" strokeWidth={2} />
                  Profile Settings
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full px-4 py-2.5 text-left text-[13px] text-[#B42318] hover:bg-[#FFF5F5] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <LogOut className="w-4 h-4" strokeWidth={2} />
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
