"use client";

import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getStoredAuthSession, signOutClient } from "@/lib/client-auth";

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
        <button className="w-[42px] h-[42px] border border-[#EAECF0] rounded-[10px] flex items-center justify-center text-[#525866] hover:bg-[#F9FAFB] relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors">
          <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
          <span className="absolute top-[12px] right-[12px] w-[6px] h-[6px] bg-[#171717] rounded-full border border-[1.5px] border-white box-content"></span>
        </button>

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
