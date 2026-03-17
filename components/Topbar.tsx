"use client";

import { Search, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  
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
        <button className="w-[42px] h-[42px] border border-[#EAECF0] rounded-[10px] flex items-center justify-center text-[#525866] hover:bg-[#F9FAFB] relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors">
          <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
          <span className="absolute top-[12px] right-[12px] w-[6px] h-[6px] bg-[#171717] rounded-full border border-[1.5px] border-white box-content"></span>
        </button>
      </div>
    </header>
  );
}
