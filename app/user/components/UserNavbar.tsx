 
// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import { 
//   PanelLeft, 
//   ChevronRight, 
//   Plus, 
//   Bell,
//   FileText,
//   Banknote,
//   CheckCircle2,
//   MessageSquare,
//   ArrowRight
// } from "lucide-react";

// // Mock data for notifications matching the design
// const notificationsData = [
//   {
//     id: 1,
//     title: "Revision uploaded for AI Research Paper",
//     desc: "The editor has completed the requested revision...",
//     time: "2 hours ago",
//     unread: true,
//     icon: FileText,
//     iconBg: "bg-[#E1F4FD]",
//     iconColor: "text-[#00A0E3]",
//   },
//   {
//     id: 2,
//     title: "Payment required for Thesis Editing",
//     desc: "The final invoice for your doctoral thesis editing i...",
//     time: "4 hours ago",
//     unread: true,
//     icon: Banknote,
//     iconBg: "bg-[#FEF0E6]",
//     iconColor: "text-[#F97316]",
//   },
//   {
//     id: 3,
//     title: "Payment completed successfully",
//     desc: "Your transaction #TRX-99218 for the proofreading...",
//     time: "Yesterday",
//     unread: false,
//     icon: CheckCircle2,
//     iconBg: "bg-[#E6F8EC]",
//     iconColor: "text-[#00A859]",
//   },
//   {
//     id: 4,
//     title: "New message from Editor Sarah",
//     desc: '"Hi Alex, I\'ve finished the abstract review. Let me...',
//     time: "2 days ago",
//     unread: false,
//     icon: MessageSquare,
//     iconBg: "bg-[#F5F7FA]",
//     iconColor: "text-[#525866]",
//   },
// ];

// export function Navbar() {
//   const pathname = usePathname();
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const generateBreadcrumbs = () => {
//     if (!pathname || pathname === "/") {
//       return [{ name: "Home", href: "/" }];
//     }

//     const segments = pathname.split("/").filter((segment) => segment !== "");
//     const breadcrumbs = segments.map((segment, index) => {
//       const href = `/${segments.slice(0, index + 1).join("/")}`;
//       const name = segment
//         .replace(/-/g, " ")
//         .replace(/\b\w/g, (char) => char.toUpperCase());
//       return { name, href };
//     });

//     return breadcrumbs;
//   };

//   const breadcrumbs = generateBreadcrumbs();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsNotificationsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <header className="fixed top-0 right-0 left-[260px] h-[76px] bg-white border-b border-[#EAECF0] z-40 flex items-center justify-between px-8 font-dm-sans">
//       <div className="flex items-center space-x-5">
//         <button className="text-[#525866] hover:text-[#171717] transition-colors">
//           <PanelLeft className="w-6 h-6" strokeWidth={1.5} />
//         </button>
        
//         <div className="flex items-center space-x-2.5 text-[15px]">
//           {breadcrumbs.map((crumb, index) => {
//             const isLast = index === breadcrumbs.length - 1;
//             return (
//               <React.Fragment key={crumb.href}>
//                 <Link
//                   href={crumb.href}
//                   className={`${
//                     isLast
//                       ? "text-[#171717] font-bold"
//                       : "text-[#525866] hover:text-[#171717]"
//                   } transition-colors capitalize`}
//                 >
//                   {crumb.name}
//                 </Link>
//                 {!isLast && (
//                   <ChevronRight className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//         <Link
//         href={"/user/submit-document"}
//          className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-4 py-2.5 rounded-[8px] flex items-center space-x-2 text-[14px] font-medium transition-colors shadow-sm">
//           <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
//           <span>Submit Document</span>
//         </Link>

//         {/* Notifications Dropdown Container */}
//         <div className="relative" ref={dropdownRef}>
//           <button 
//             onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
//             className={`relative p-2.5 border rounded-[8px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
//               isNotificationsOpen 
//                 ? "border-[#00A0E3] bg-[#F4FAFD] text-[#00A0E3]" 
//                 : "border-[#EAECF0] text-[#525866] hover:bg-[#F5F7FA]"
//             }`}
//           >
//             <Bell className="w-[20px] h-[20px]" strokeWidth={1.5} />
//             <span className="absolute top-[9px] right-[10px] w-[6px] h-[6px] bg-[#00A0E3] rounded-full ring-2 ring-white"></span>
//           </button>

//           {/* Dropdown Panel */}
//           {isNotificationsOpen && (
//             <div className="absolute right-0 top-[calc(100%+12px)] w-[490px] bg-white border border-[#EAECF0] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 flex flex-col">
              
//               {/* Header */}
//               <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
//                 <h3 className="text-[16px] font-bold text-[#171717]">Notifications</h3>
//                 <button className="text-[#00A0E3] text-[13px] font-medium hover:underline">
//                   Mark All as Read
//                 </button>
//               </div>

//               {/* Notification List */}
//               <div className="flex flex-col divide-y divide-[#EAECF0] max-h-[420px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                 {notificationsData.map((notif) => (
//                   <div key={notif.id} className="p-2 flex items-start gap-3 hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
//                     <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 ${notif.iconBg}`}>
//                       <notif.icon className={`w-[20px] h-[20px] ${notif.iconColor}`} strokeWidth={2.5} />
//                     </div>
                    
//                     <div className="flex-1 flex flex-col pt-0.5">
//                       <div className="flex items-start justify-between gap-2 mb-1">
//                         <h4 className="text-[14px] font-medium text-[#171717] leading-tight group-hover:text-[#00A0E3] transition-colors pr-2">
//                           {notif.title}
//                         </h4>
//                         <span className="text-[12px] text-[#A0AAB5] shrink-0 whitespace-nowrap">
//                           {notif.time}
//                         </span>
//                       </div>
                      
//                       <div className="flex items-end justify-between gap-4">
//                         <p className="text-[#8A94A6] text-[13px] leading-relaxed line-clamp-1 pr-4">
//                           {notif.desc}
//                         </p>
//                         {notif.unread && (
//                           <div className="w-[6px] h-[6px] bg-[#00A0E3] rounded-full shrink-0 mb-1.5"></div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Footer */}
//               <div className="p-4 border-t border-[#EAECF0] bg-[#FAFAFB] text-center">
//                 <Link 
//                   href="/user/notifications"
//                   onClick={() => setIsNotificationsOpen(false)} 
//                   className="inline-flex items-center justify-center gap-1.5 text-[#00A0E3] text-[14px] font-bold hover:underline"
//                 >
//                   View All Notifications <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-[#EAECF0] cursor-pointer flex-shrink-0">
//           <img
//             src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
//             alt="User Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </header>
//   );
// }


 "use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useMemo, useRef, useSyncExternalStore, useCallback } from "react";
import {
  PanelLeft,
  ChevronRight,
  Plus,
  Bell,
  FileText,
  Banknote,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Home,
  BarChart2,
  AppWindow,
  Folder,
  Headset,
  User,
  ChevronDown,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { getStoredAuthSession, signOutClient } from "@/lib/client-auth";
import { apiGet, apiRequest } from "@/lib/client-api";

type NotificationType = "document_update" | "payment" | "message" | "system";

type NotificationRow = {
  id: string;
  title?: string | null;
  body?: string | null;
  created_at?: string | null;
  is_read?: boolean | null;
  type?: NotificationType;
};

type NotificationsPayload = {
  all: NotificationRow[];
};

function getNotificationVisual(type?: NotificationType) {
  if (type === "payment") {
    return {
      icon: Banknote,
      iconBg: "bg-[#FEF0E6]",
      iconColor: "text-[#F97316]"
    };
  }

  if (type === "message") {
    return {
      icon: MessageSquare,
      iconBg: "bg-[#F5F7FA]",
      iconColor: "text-[#525866]"
    };
  }

  if (type === "system") {
    return {
      icon: CheckCircle2,
      iconBg: "bg-[#E6F8EC]",
      iconColor: "text-[#00A859]"
    };
  }

  return {
    icon: FileText,
    iconBg: "bg-[#E1F4FD]",
    iconColor: "text-[#00A0E3]"
  };
}

function getRelativeTime(value?: string | null) {
  if (!value) return "Just now";
  const createdAt = new Date(value).getTime();
  if (Number.isNaN(createdAt)) return "Just now";

  const diff = Date.now() - createdAt;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "Just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  return `${Math.floor(diff / day)}d ago`;
}

// ─── Sidebar Nav Data ─────────────────────────────────────────────────────────
const navSections = [
  {
    title: "MAIN",
    items: [
      { name: "Home", href: "/user/dashboard", icon: Home },
      { name: "Overview", href: "/user/overview", icon: BarChart2 },
    ],
  },
  {
    title: "WORKFLOW",
    items: [
      { name: "My Documents", href: "/user/documents", icon: FileText },
      { name: "Messages", href: "/user/chat", icon: MessageSquare },
    ],
  },
  {
    title: "SERVICES",
    items: [
      {
        name: "Domains",
        href: "#",
        icon: AppWindow,
        hasSub: true,
        subItems: [
          { name: "Lorem ipsum", href: "/user/services/1" },
          { name: "Lorem ipsum", href: "/user/services/2" },
          { name: "Lorem ipsum", href: "/user/services/3" },
        ],
      },
      {
        name: "Packages",
        href: "#",
        icon: Folder,
        hasSub: true,
        subItems: [
          { name: "Lorem ipsum", href: "/user/packages/1" },
          { name: "Lorem ipsum", href: "/user/packages/2" },
          { name: "Lorem ipsum", href: "/user/packages/3" },
          { name: "Lorem ipsum", href: "/user/packages/4" },
          { name: "Lorem ipsum", href: "/user/packages/5" },
        ],
      },
    ],
  },
  {
    title: "MANAGE",
    items: [
      { name: "Payments", href: "/user/payments", icon: Banknote },
      { name: "Notifications", href: "/user/notifications", icon: Bell },
      { name: "Help", href: "/user/help", icon: Headset },
      { name: "Profile", href: "/user/profile", icon: User },
    ],
  },
];

// ─── Hook: detect mobile (< 1024px) using window.matchMedia ──────────────────
function useIsMobile(): boolean {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => window.matchMedia("(max-width: 1023px)").matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ─── Mobile Sidebar ───────────────────────────────────────────────────────────
function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});

  const toggleSub = (name: string) =>
    setOpenSubs((prev) => ({ ...prev, [name]: !prev[name] }));

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
 
          height: "100dvh",
 
          width: "280px",
          backgroundColor: "#fff",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 24px rgba(0,0,0,0.10)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Logo + Close */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 16px",
            borderBottom: "1px solid #EAECF0",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 18, color: "#171717" }}>
          <img src="/logo.svg" alt="Submitright logo" className="h-[28px] w-auto" />
          </span>
           
          <button
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "8px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#525866",
            }}
          >
            <X style={{ width: 20, height: 20 }} strokeWidth={1.8} />
          </button>
        </div>

        {/* Nav */}
        <nav
          style={{
 
 
            flex: "1 1 0",
            minHeight: 0, 
 
            overflowY: "auto",
            padding: "16px",
            scrollbarWidth: "none",
          }}
        >
          {navSections.map((section) => (
            <div key={section.title} style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#A0AAB5",
                  letterSpacing: "0.07em",
                  marginBottom: "6px",
                  padding: "0 8px",
                }}
              >
                {section.title}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const hasSub = "hasSub" in item && item.hasSub;
                  const isSubOpen = openSubs[item.name] ?? false;

                  return (
                    <li key={item.name} style={{ marginBottom: "2px" }}>
                      {hasSub ? (
                        <>
                          <button
                            onClick={() => toggleSub(item.name)}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px 12px",
                              borderRadius: "8px",
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              fontSize: 14,
                              color: "#525866",
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <Icon style={{ width: 18, height: 18 }} strokeWidth={1.8} />
                              {item.name}
                            </span>
                            <ChevronDown
                              style={{
                                width: 16,
                                height: 16,
                                transform: isSubOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s",
                              }}
                              strokeWidth={2}
                            />
                          </button>

                          {isSubOpen && (
                            <ul
                              style={{
                                listStyle: "none",
                                margin: "4px 0 0 42px",
                                padding: "0 0 0 12px",
                                borderLeft: "2px solid #EAECF0",
                              }}
                            >
                              {"subItems" in item &&
                                item.subItems?.map((sub) => (
                                  <li key={sub.href}>
                                    <Link
                                      href={sub.href}
                                      onClick={onClose}
                                      style={{
                                        display: "block",
                                        fontSize: 13,
                                        color: "#525866",
                                        padding: "6px 0",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "10px 12px",
                            borderRadius: "8px",
                            fontSize: 14,
                            textDecoration: "none",
                            color: isActive ? "#171717" : "#525866",
                            fontWeight: isActive ? 600 : 400,
                            background: isActive ? "#F5F7FA" : "transparent",
                          }}
                        >
                          <Icon style={{ width: 18, height: 18 }} strokeWidth={1.8} />
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setNotificationsLoading(true);
      setNotificationsError(null);
      const data = await apiGet<NotificationsPayload>("/api/client/notifications");
      setNotifications(Array.isArray(data.all) ? data.all : []);
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Failed to load notifications.");
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.is_read).length,
    [notifications]
  );

  const visibleNotifications = useMemo(
    () => notifications.slice(0, 8),
    [notifications]
  );

  const generateBreadcrumbs = () => {
    if (!pathname || pathname === "/") return [{ name: "Home", href: "/" }];
    const segments = pathname.split("/").filter((s) => s !== "");
    return segments.map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      name: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  };

  const breadcrumbs = generateBreadcrumbs();

  const { userName, userEmail } = useMemo(() => {
    const session = getStoredAuthSession();
    const safeName =
      typeof session?.user?.full_name === "string" && session.user.full_name.trim()
        ? session.user.full_name
        : "User";
    const safeEmail =
      typeof session?.user?.email === "string" && session.user.email.trim()
        ? session.user.email
        : "user@submitright.com";

    return {
      userName: safeName,
      userEmail: safeEmail,
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    void fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!isNotificationsOpen) return;
    void fetchNotifications();
  }, [isNotificationsOpen, fetchNotifications]);

  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOutClient();
    router.replace("/signin");
  };

  const handleMarkAllRead = async () => {
    const unreadIds = notifications.filter((item) => !item.is_read).map((item) => item.id);
    if (unreadIds.length === 0) return;

    try {
      await apiRequest<NotificationRow[]>("/api/client/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds: unreadIds })
      });

      setNotifications((prev) => prev.map((item) => ({ ...item, is_read: true })));
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Failed to mark notifications as read.");
    }
  };

  return (
    <>
     
      {/* MobileSidebar is only mounted when isMobile is confirmed true — 
          so it NEVER exists in the DOM on desktop */}
      {isMobile && (
        <MobileSidebar
          isOpen={isMobile ? isMobileSidebarOpen : false}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <header className="fixed top-0 right-0 left-[260px] h-[76px] bg-white border-b border-[#EAECF0] z-40 flex items-center justify-between px-8 font-dm-sans max-lg:left-0 max-lg:px-4">
        <div className="flex items-center space-x-5">
          <button
            onClick={() => {
              // Only triggers on mobile — isMobile guard prevents desktop action
              if (isMobile) setIsMobileSidebarOpen(true);
            }}
            className="text-[#525866] hover:text-[#171717] transition-colors"
          >
            <PanelLeft className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.href}>
                  <Link
                    href={crumb.href}
                    className={`${
                      isLast ? "text-[#171717] font-bold" : "text-[#525866] hover:text-[#171717]"
                    } transition-colors capitalize`}
                  >
                    {crumb.name}
                  </Link>
                  {!isLast && (
                    <ChevronRight className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/user/submit-document"
            className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-4 py-2.5 rounded-[8px] flex items-center space-x-2 text-[14px] font-medium transition-colors shadow-sm"
          >
            <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
            <span className="">Submit Document</span>
          </Link>

          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileMenuOpen(false);
              }}
              className={`relative p-2.5 border rounded-[8px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
                isNotificationsOpen
                  ? "border-[#00A0E3] bg-[#F4FAFD] text-[#00A0E3]"
                  : "border-[#EAECF0] text-[#525866] hover:bg-[#F5F7FA]"
              }`}
            >
              <Bell className="w-[20px] h-[20px]" strokeWidth={1.5} />
              {unreadCount > 0 ? (
                <span className="absolute top-[7px] right-[7px] min-w-[16px] h-[16px] px-1 rounded-full bg-[#00A0E3] text-white text-[10px] font-semibold leading-[16px] text-center ring-2 ring-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              ) : null}
            </button>
 
{/* Notifications */}
            {isNotificationsOpen && (
              <div className="absolute -right-14 sm:right-0 top-[calc(100%+12px)] w-[490px] bg-white border border-[#EAECF0] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 flex flex-col max-sm:w-[calc(100vw-32px)]">
 
                <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-[16px] font-bold text-[#171717]">Notifications</h3>
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    disabled={notificationsLoading || unreadCount === 0}
                    className="text-[#00A0E3] text-[13px] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark All as Read
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[#EAECF0] max-h-[420px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {notificationsLoading ? (
                    <p className="p-4 text-[13px] text-[#8A94A6]">Loading notifications...</p>
                  ) : null}

                  {!notificationsLoading && notificationsError ? (
                    <p className="p-4 text-[13px] text-[#B42318]">{notificationsError}</p>
                  ) : null}

                  {!notificationsLoading && !notificationsError && visibleNotifications.length === 0 ? (
                    <p className="p-4 text-[13px] text-[#8A94A6]">No notifications yet.</p>
                  ) : null}

                  {!notificationsLoading && !notificationsError
                    ? visibleNotifications.map((notif) => {
                        const visual = getNotificationVisual(notif.type);
                        const Icon = visual.icon;

                        return (
                          <div
                            key={notif.id}
                            className="p-2 flex items-start gap-3 hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                          >
                            <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 ${visual.iconBg}`}>
                              <Icon className={`w-[20px] h-[20px] ${visual.iconColor}`} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 flex flex-col pt-0.5">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-[14px] font-medium text-[#171717] leading-tight group-hover:text-[#00A0E3] transition-colors pr-2">
                                  {notif.title || "Notification"}
                                </h4>
                                <span className="text-[12px] text-[#A0AAB5] shrink-0 whitespace-nowrap">
                                  {getRelativeTime(notif.created_at)}
                                </span>
                              </div>
                              <div className="flex items-end justify-between gap-4">
                                <p className="text-[#8A94A6] text-[13px] leading-relaxed line-clamp-1 pr-4">
                                  {notif.body || "No additional details available."}
                                </p>
                                {!notif.is_read ? (
                                  <div className="w-[6px] h-[6px] bg-[#00A0E3] rounded-full shrink-0 mb-1.5" />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>

                <div className="p-4 border-t border-[#EAECF0] bg-[#FAFAFB] text-center">
                  <Link
                    href="/user/notifications"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 text-[#00A0E3] text-[14px] font-bold hover:underline"
                  >
                    View All Notifications <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setIsNotificationsOpen(false);
              }}
              className="w-[40px] h-[40px] rounded-full border border-[#EAECF0] cursor-pointer flex-shrink-0 bg-[#F0F7FB] text-[#0B74A5] text-[13px] font-semibold flex items-center justify-center"
              aria-label="Open profile menu"
            >
              {userInitials}
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-[250px] bg-white border border-[#EAECF0] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50">
                <div className="px-4 pt-4 pb-3 border-b border-[#EAECF0]">
                  <p className="text-[14px] font-semibold text-[#171717] leading-tight">{userName}</p>
                  <p className="text-[12px] text-[#8A94A6] mt-1 truncate">{userEmail}</p>
                </div>

                <div className="py-1.5">
                  <Link
                    href="/user/profile"
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
            )}
          </div>
        </div>
      </header>
    </>
  );
} 