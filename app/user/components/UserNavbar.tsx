// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import React from "react";
// import { PanelLeft, ChevronRight, Plus, Bell } from "lucide-react";

// export function Navbar() {
//   const pathname = usePathname();

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

//   return (
//     <header className="fixed top-0 right-0 left-[260px] h-[76px] bg-white border-b border-[#EAECF0] z-30 flex items-center justify-between px-8">
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
//                       ? "text-[#171717] font-medium"
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
//         <button className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-4 py-2.5 rounded-[8px] flex items-center space-x-2 text-[14px] font-medium transition-colors shadow-sm">
//           <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
//           <span>Submit Document</span>
//         </button>

//         <button className="relative p-2.5 border border-[#EAECF0] rounded-[8px] text-[#525866] hover:bg-[#F5F7FA] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
//           <Bell className="w-[20px] h-[20px]" strokeWidth={1.5} />
//           <span className="absolute top-[9px] right-[10px] w-[6px] h-[6px] bg-[#00A0E3] rounded-full ring-2 ring-white"></span>
//         </button>

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

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { 
  PanelLeft, 
  ChevronRight, 
  Plus, 
  Bell,
  FileText,
  Banknote,
  CheckCircle2,
  MessageSquare,
  ArrowRight
} from "lucide-react";

// Mock data for notifications matching the design
const notificationsData = [
  {
    id: 1,
    title: "Revision uploaded for AI Research Paper",
    desc: "The editor has completed the requested revision...",
    time: "2 hours ago",
    unread: true,
    icon: FileText,
    iconBg: "bg-[#E1F4FD]",
    iconColor: "text-[#00A0E3]",
  },
  {
    id: 2,
    title: "Payment required for Thesis Editing",
    desc: "The final invoice for your doctoral thesis editing i...",
    time: "4 hours ago",
    unread: true,
    icon: Banknote,
    iconBg: "bg-[#FEF0E6]",
    iconColor: "text-[#F97316]",
  },
  {
    id: 3,
    title: "Payment completed successfully",
    desc: "Your transaction #TRX-99218 for the proofreading...",
    time: "Yesterday",
    unread: false,
    icon: CheckCircle2,
    iconBg: "bg-[#E6F8EC]",
    iconColor: "text-[#00A859]",
  },
  {
    id: 4,
    title: "New message from Editor Sarah",
    desc: '"Hi Alex, I\'ve finished the abstract review. Let me...',
    time: "2 days ago",
    unread: false,
    icon: MessageSquare,
    iconBg: "bg-[#F5F7FA]",
    iconColor: "text-[#525866]",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateBreadcrumbs = () => {
    if (!pathname || pathname === "/") {
      return [{ name: "Home", href: "/" }];
    }

    const segments = pathname.split("/").filter((segment) => segment !== "");
    const breadcrumbs = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const name = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return { name, href };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-[260px] h-[76px] bg-white border-b border-[#EAECF0] z-40 flex items-center justify-between px-8 font-dm-sans">
      <div className="flex items-center space-x-5">
        <button className="text-[#525866] hover:text-[#171717] transition-colors">
          <PanelLeft className="w-6 h-6" strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center space-x-2.5 text-[15px]">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.href}>
                <Link
                  href={crumb.href}
                  className={`${
                    isLast
                      ? "text-[#171717] font-bold"
                      : "text-[#525866] hover:text-[#171717]"
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
        href={"/user/submit-document"}
         className="bg-[#00A0E3] hover:bg-[#008bc5] text-white px-4 py-2.5 rounded-[8px] flex items-center space-x-2 text-[14px] font-medium transition-colors shadow-sm">
          <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
          <span>Submit Document</span>
        </Link>

        {/* Notifications Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2.5 border rounded-[8px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
              isNotificationsOpen 
                ? "border-[#00A0E3] bg-[#F4FAFD] text-[#00A0E3]" 
                : "border-[#EAECF0] text-[#525866] hover:bg-[#F5F7FA]"
            }`}
          >
            <Bell className="w-[20px] h-[20px]" strokeWidth={1.5} />
            <span className="absolute top-[9px] right-[10px] w-[6px] h-[6px] bg-[#00A0E3] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Dropdown Panel */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-[490px] bg-white border border-[#EAECF0] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 flex flex-col">
              
              {/* Header */}
              <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-[#171717]">Notifications</h3>
                <button className="text-[#00A0E3] text-[13px] font-medium hover:underline">
                  Mark All as Read
                </button>
              </div>

              {/* Notification List */}
              <div className="flex flex-col divide-y divide-[#EAECF0] max-h-[420px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {notificationsData.map((notif) => (
                  <div key={notif.id} className="p-2 flex items-start gap-3 hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
                    <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                      <notif.icon className={`w-[20px] h-[20px] ${notif.iconColor}`} strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex-1 flex flex-col pt-0.5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-[14px] font-medium text-[#171717] leading-tight group-hover:text-[#00A0E3] transition-colors pr-2">
                          {notif.title}
                        </h4>
                        <span className="text-[12px] text-[#A0AAB5] shrink-0 whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      
                      <div className="flex items-end justify-between gap-4">
                        <p className="text-[#8A94A6] text-[13px] leading-relaxed line-clamp-1 pr-4">
                          {notif.desc}
                        </p>
                        {notif.unread && (
                          <div className="w-[6px] h-[6px] bg-[#00A0E3] rounded-full shrink-0 mb-1.5"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
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