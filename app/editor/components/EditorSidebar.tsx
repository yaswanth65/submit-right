"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  CheckCircle, 
  Calendar, 
  MessageSquare,
  Bell,
  HelpCircle,
  User
} from 'lucide-react';

export function EditorSidebar() {
  const pathname = usePathname();

  const mainItems = [
    { label: 'Dashboard', href: '/editor/dashboard', icon: Home },
    { label: 'Assigned', href: '/editor/assigned', icon: FileText },
    { label: 'Completed', href: '/editor/completed', icon: CheckCircle },
    { label: 'Availability', href: '/editor/availability', icon: Calendar },
    { label: 'Messages', href: '/editor/messages', icon: MessageSquare },
  ];

  const supportItems = [
    { label: 'Notifications', href: '/editor/notifications', icon: Bell },
    { label: 'Help', href: '/editor/help', icon: HelpCircle },
    { label: 'Profile', href: '/editor/profile', icon: User },
  ];

  return (
    <div className="fixed top-0 left-0 w-[260px] h-screen bg-white border-r border-[#EAECF0] flex flex-col z-50">
      <div className="h-[76px] px-6 flex items-center justify-between border-b border-[#EAECF0]">
        <Link href="/editor/dashboard" className="flex items-center">
          <img src="/logo.svg" alt="Submitright logo" className="h-[32px] w-auto" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto w-full py-6 flex flex-col gap-6 px-4">
        
        <div>
          <div className="text-xs font-semibold text-[#525866] mb-3 px-3 uppercase tracking-wider">
            Main
          </div>
          <nav className="flex flex-col gap-1 w-full text-[14px]">
            {mainItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-[#F9FAFB] text-[#171717] font-semibold' 
                      : 'text-[#525866] hover:bg-[#F9FAFB] hover:text-[#171717]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-[#00A0E3]' : 'text-[#525866]'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="text-xs font-semibold text-[#525866] mb-3 px-3 uppercase tracking-wider">
            Manage
          </div>
          <nav className="flex flex-col gap-1 w-full text-[14px]">
            {supportItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-[#F9FAFB] text-[#171717] font-semibold' 
                      : 'text-[#525866] hover:bg-[#F9FAFB] hover:text-[#171717]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-[#00A0E3]' : 'text-[#525866]'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

      </div>
    </div>
  );
}
