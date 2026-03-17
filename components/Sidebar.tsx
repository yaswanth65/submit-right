"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UserCog, FileText, ClipboardList, CreditCard, MonitorCog, Type, MessageSquare, BarChart2, Settings, LogOut, ArrowLeftFromLine } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Editors", href: "/admin/editors", icon: UserCog },
    { name: "Documents", href: "#", icon: FileText },
    { name: "Assignments", href: "#", icon: ClipboardList },
    { name: "Payments", href: "#", icon: CreditCard },
    { name: "CMS", href: "#", icon: MonitorCog },
    { name: "Blogs", href: "#", icon: Type },
    { name: "Form Submissions", href: "#", icon: MessageSquare },
    { name: "Reports", href: "#", icon: BarChart2 },
    { name: "Settings", href: "#", icon: Settings },
  ];

  return (
    <aside className="w-[260px] bg-[#F5F7FA] h-screen flex flex-col border-r border-[#EAECF0] fixed left-0 top-0 text-[#525866] font-dm-sans z-20">
      <div className="h-[76px] px-6 flex items-center justify-between border-b border-[#EAECF0]">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <span className="font-bold text-[22px] text-[#171717] tracking-tight italic flex items-center">
            Submit<span className="text-[#00A0E3] font-light">right</span>
            <span className="text-[#00A0E3] ml-1 text-lg leading-none">»</span>
          </span>
        </div>
        <button className="text-[#A0AAB5] hover:text-[#525866] transition-colors bg-white border border-[#EAECF0] rounded p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <ArrowLeftFromLine className="w-[14px] h-[14px]" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          (() => {
            const isActive = item.href !== "#" && pathname.startsWith(item.href);
            return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-[10px] rounded-[8px] transition-colors text-[14px] ${
              isActive 
                ? "bg-[#FFFFFF] text-[#00A0E3] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.02)]" 
                : "text-[#525866] font-medium hover:bg-[#EAEFF4] hover:text-[#171717]"
            }`}
          >
            <item.icon strokeWidth={isActive ? 2.5 : 2} className={`w-[18px] h-[18px] ${isActive ? "text-[#00A0E3]" : "text-[#525866]"}`} />
            <span>{item.name}</span>
          </Link>
            );
          })()
        ))}
      </nav>

      <div className="p-5 border-t border-[#EAECF0] mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#EAEFF4] overflow-hidden flex-shrink-0">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="John Doe" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[14px] font-bold text-[#171717] leading-tight truncate">John Doe</span>
              <span className="text-[12px] text-[#525866] leading-tight truncate mt-0.5">eaxmple@gmail.com</span>
            </div>
          </div>
          <button className="text-[#FB3748] hover:bg-[#FEF2F2] p-2 rounded-lg transition-colors flex-shrink-0 border border-transparent hover:border-[#FB3748]/20">
            <LogOut className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}
