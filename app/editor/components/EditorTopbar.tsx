"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2, FileText, LayoutDashboard, LayoutTemplate, MessageSquare, TriangleAlert } from "lucide-react";
import { usePathname } from "next/navigation";

export function EditorTopbar() {
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New document assigned",
      subtitle: "AI Ethics in Healthcare",
      time: "2 hours ago",
      unread: true,
      icon: FileText,
      iconBg: "bg-[#E1F4FD]",
      iconColor: "text-[#00A0E3]",
    },
    {
      id: 2,
      title: "Deadline approaching (24h)",
      subtitle: "Physics Review",
      time: "4 hours ago",
      unread: true,
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
      icon: FileText,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#D97706]",
    },
    {
      id: 4,
      title: "New message from Client Dr. Ansh Mehta",
      subtitle: '"Hi Alex, I\'ve finished the abstract review. Let me..."',
      time: "2 days ago",
      unread: false,
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
      icon: CheckCircle2,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#16A34A]",
    },
  ]);

  const hasUnread = notifications.some((item) => item.unread);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
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
      <div className="flex items-center text-[13px] font-medium">
        {breadcrumb}
      </div>

      <div className="flex items-center space-x-4" ref={notificationsRef}>
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
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
                <button onClick={markAllAsRead} className="text-[13px] text-[#00A0E3] font-medium hover:underline">Mark All as Read</button>
              </div>

              <div className="max-h-[360px] overflow-y-auto">
                {notifications.map((item) => (
                  <button key={item.id} onClick={() => markAsRead(item.id)} className="w-full text-left px-5 py-3 border-b border-[#EAECF0] last:border-b-0 hover:bg-[#F9FAFB] transition-colors">
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
                        {item.unread ? (
                          <div className="w-[6px] h-[6px] rounded-full bg-[#00A0E3] mt-1.5 ml-auto"></div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))}
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

        <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-[#EAECF0] cursor-pointer flex-shrink-0">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
