"use client";

import { Search, Bell, FileText, AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getStoredAuthSession, signOutClient } from "@/lib/client-auth";
import { apiGet } from "@/lib/client-api";

type AdminDocument = {
  id: string;
  document_title?: string;
  status?: string;
  deadline_at?: string;
  updated_at?: string;
};

type AdminDashboardPayload = {
  pendingAction: AdminDocument[];
  overdueTasks: { list: AdminDocument[] };
  revisionRequests: { list: AdminDocument[] };
};

type AdminNotificationItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  time: string;
  icon: typeof FileText;
  iconBg: string;
  iconColor: string;
};

function relativeTime(value?: string) {
  if (!value) return "Recently";
  const diffMinutes = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const hours = Math.floor(diffMinutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotificationItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const session = getStoredAuthSession();
  const userName =
    typeof session?.user?.full_name === "string" && session.user.full_name.trim()
      ? session.user.full_name
      : "Admin";
  const userEmail =
    typeof session?.user?.email === "string" && session.user.email.trim()
      ? session.user.email
      : "admin@submitright.com";
  const userInitials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A";

  const loadNotifications = async () => {
    try {
      setNotificationsLoading(true);
      setNotificationsError(null);

      const data = await apiGet<AdminDashboardPayload>("/api/admin/dashboard");
      const items: AdminNotificationItem[] = [];

      (data.overdueTasks?.list || []).slice(0, 4).forEach((doc) => {
        items.push({
          id: `overdue-${doc.id}`,
          title: "Overdue document",
          subtitle: doc.document_title || "Untitled document",
          href: `/admin/documents/${doc.id}`,
          time: relativeTime(doc.deadline_at || doc.updated_at),
          icon: AlertTriangle,
          iconBg: "bg-[#FEE2E2]",
          iconColor: "text-[#EF4444]"
        });
      });

      (data.pendingAction || []).slice(0, 4).forEach((doc) => {
        items.push({
          id: `pending-${doc.id}`,
          title: "Pending assignment",
          subtitle: doc.document_title || "Untitled document",
          href: `/admin/documents/${doc.id}`,
          time: relativeTime(doc.updated_at),
          icon: FileText,
          iconBg: "bg-[#E1F4FD]",
          iconColor: "text-[#00A0E3]"
        });
      });

      (data.revisionRequests?.list || []).slice(0, 4).forEach((doc) => {
        if (items.some((item) => item.href.endsWith(doc.id))) return;
        items.push({
          id: `revision-${doc.id}`,
          title: "Revision requested",
          subtitle: doc.document_title || "Untitled document",
          href: `/admin/documents/${doc.id}`,
          time: relativeTime(doc.updated_at),
          icon: RefreshCw,
          iconBg: "bg-[#FFF4ED]",
          iconColor: "text-[#FA7319]"
        });
      });

      setNotifications(items.slice(0, 8));
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Failed to load notifications.");
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    void loadNotifications();
  }, []);

  useEffect(() => {
    if (!isNotificationsOpen) return;
    void loadNotifications();
  }, [isNotificationsOpen]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOutClient();
    router.replace("/signin");
  };
  
  let breadcrumb = (
    <>
      <span className="text-[#525866]">Home</span>
      <span className="text-[#A0AAB5]">&gt;</span>
      <span className="text-[#171717] font-semibold">Dashboard</span>
    </>
  );

  if (pathname === "/admin/students") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Students</span>
      </>
    );
  }

  if (pathname.startsWith('/admin/students/') && pathname !== "/admin/students") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#525866]">Students</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Sarah Johnson</span>
      </>
    );
  }

  if (pathname === "/admin/editors") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Editors</span>
      </>
    );
  }

  if (pathname.startsWith("/admin/editors/") && pathname !== "/admin/editors") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#525866]">Editors</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Dr. Sarah Williams</span>
      </>
    );
  }

  if (pathname === "/admin/documents") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Documents</span>
      </>
    );
  }

  if (pathname.startsWith("/admin/documents/") && pathname !== "/admin/documents") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#525866]">Documents</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Document Details</span>
      </>
    );
  }

  if (pathname === "/admin/payments") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Payments</span>
      </>
    );
  }

  if (pathname.startsWith("/admin/payments/") && pathname !== "/admin/payments") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#525866]">Payments</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">INV-2026-001</span>
      </>
    );
  }

  if (pathname === "/admin/tickets") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Tickets</span>
      </>
    );
  }

  if (pathname.startsWith("/admin/tickets/") && pathname !== "/admin/tickets") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#525866]">Tickets</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Ticket Details</span>
      </>
    );
  }

  if (pathname === "/admin/profile") {
    breadcrumb = (
      <>
        <span className="text-[#525866]">Home</span>
        <span className="text-[#A0AAB5]">&gt;</span>
        <span className="text-[#171717] font-semibold">Profile</span>
      </>
    );
  }

  return (
    <header className="h-[76px] bg-[#FFFFFF] border-b border-[#EAECF0] flex items-center justify-between px-8 sticky top-0 z-10 font-dm-sans">
      <div className="flex items-center space-x-2 text-[12px]">
        {breadcrumb}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AAB5]" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-9 pr-4 py-[9px] bg-[#FFFFFF] border border-[#EAECF0] rounded-lg text-[13px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] w-[260px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all"
          />
        </div>
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsProfileMenuOpen(false);
            }}
            className={`w-[42px] h-[42px] border rounded-[10px] flex items-center justify-center relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors ${
              isNotificationsOpen
                ? "border-[#00A0E3] bg-[#F4FAFD] text-[#00A0E3]"
                : "border-[#EAECF0] text-[#525866] hover:bg-[#F9FAFB]"
            }`}
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
            {notifications.length > 0 ? (
              <span className="absolute top-[8px] right-[8px] min-w-[16px] h-[16px] px-1 rounded-full bg-[#00A0E3] text-white text-[10px] font-semibold leading-[16px] text-center ring-2 ring-white">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            ) : null}
          </button>

          {isNotificationsOpen ? (
            <div className="absolute right-0 top-[52px] w-[380px] bg-white border border-[#EAECF0] rounded-[16px] shadow-[0_16px_32px_rgba(0,0,0,0.08)] overflow-hidden z-50">
              <div className="px-5 py-4 border-b border-[#EAECF0] flex items-center justify-between">
                <div className="text-[16px] font-semibold text-[#171717]">Notifications</div>
                <span className="text-[12px] text-[#8A94A6]">Admin Feed</span>
              </div>

              <div className="max-h-[360px] overflow-y-auto">
                {notificationsLoading ? (
                  <p className="px-5 py-4 text-[13px] text-[#8A94A6]">Loading notifications...</p>
                ) : null}

                {!notificationsLoading && notificationsError ? (
                  <p className="px-5 py-4 text-[13px] text-[#B42318]">{notificationsError}</p>
                ) : null}

                {!notificationsLoading && !notificationsError && notifications.length === 0 ? (
                  <p className="px-5 py-4 text-[13px] text-[#8A94A6]">No notifications available.</p>
                ) : null}

                {!notificationsLoading && !notificationsError
                  ? notifications.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block px-5 py-3 border-b border-[#EAECF0] last:border-b-0 hover:bg-[#F9FAFB] transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                            <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] font-semibold text-[#171717]">{item.title}</div>
                            <div className="text-[12px] text-[#8A94A6] mt-0.5">{item.subtitle}</div>
                          </div>
                          <div className="text-[11px] text-[#8A94A6] shrink-0">{item.time}</div>
                        </div>
                      </Link>
                    ))
                  : null}
              </div>

              <Link
                href="/admin/documents"
                onClick={() => setIsNotificationsOpen(false)}
                className="block text-center px-5 py-3 border-t border-[#EAECF0] text-[13px] font-medium text-[#00A0E3] hover:bg-[#F9FAFB]"
              >
                View Documents
              </Link>
            </div>
          ) : null}
        </div>

        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
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
                  href="/admin/profile"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-2.5 text-[13px] text-[#171717] hover:bg-[#F8FAFB]"
                >
                  Profile Settings
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full px-4 py-2.5 text-left text-[13px] text-[#B42318] hover:bg-[#FFF5F5] disabled:opacity-60 disabled:cursor-not-allowed"
                >
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
