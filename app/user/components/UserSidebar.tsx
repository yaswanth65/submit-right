"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  BarChart2,
  FileText,
  MessageSquare,
  AppWindow,
  Folder,
  Banknote,
  Bell,
  Headset,
  User,
  ChevronDown,
  ChevronUp,
  LucideIcon
} from "lucide-react";
import { apiGet } from "@/lib/client-api";

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  hasSub?: boolean;
  subItems?: SubItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

type CatalogNavItem = {
  id: string;
  slug: string;
  title: string;
};

type ClientCatalogResponse = {
  services: CatalogNavItem[];
  packages: CatalogNavItem[];
  domains: CatalogNavItem[];
};

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Services: true,
    Packages: true,
  });
  const [catalogData, setCatalogData] = useState<ClientCatalogResponse>({
    services: [],
    packages: [],
    domains: []
  });

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const data = await apiGet<ClientCatalogResponse>("/api/client/catalog");
        setCatalogData(data);
      } catch {
        setCatalogData({ services: [], packages: [], domains: [] });
      }
    };

    void loadCatalog();
  }, []);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const serviceSubItems: SubItem[] = catalogData.services.map((item) => ({
    name: item.title,
    href: `/user/services/${item.slug || item.id}`
  }));

  const packageSubItems: SubItem[] = catalogData.packages.map((item) => ({
    name: item.title,
    href: `/user/packages/${item.slug || item.id}`
  }));

  const sections: NavSection[] = [
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
          name: "Services",
          href: "#",
          icon: AppWindow,
          hasSub: true,
          subItems: serviceSubItems,
        },
        {
          name: "Packages",
          href: "#",
          icon: Folder,
          hasSub: true,
          subItems: packageSubItems,
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

  return (
    <aside className="w-[260px] bg-[#FAFAFB] h-screen flex flex-col fixed left-0 top-0 border-r border-[#E5E7EB] z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="px-6 pt-8 pb-4">
        <Link href="/">
          <img src="/logo.svg" alt="Submitright logo" className="h-[28px] w-auto" />
        </Link>
      </div>

      <nav className="flex-1 px-3 pb-8">
        {sections.map((section, idx) => (
          <div key={idx} className="mt-6 first:mt-2">
            <h3 className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#9CA3AF]">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.href !== "#" && pathname === item.href;
                const isOpen = openMenus[item.name];

                return (
                  <div key={item.name}>
                    {item.hasSub ? (
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-[14px] text-[#525866] hover:bg-[#F3F4F6] font-medium"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-[18px] h-[18px] text-[#6B7280]" strokeWidth={2} />
                          <span>{item.name}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-[14px] ${
                          isActive
                            ? "bg-[#F3F4F6] text-[#111827] font-semibold"
                            : "text-[#525866] font-medium hover:bg-[#F3F4F6] hover:text-[#111827]"
                        }`}
                      >
                        <item.icon
                          className={`w-[18px] h-[18px] ${
                            isActive ? "text-[#111827]" : "text-[#6B7280]"
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        <span>{item.name}</span>
                      </Link>
                    )}

                    {item.hasSub && isOpen && item.subItems && (
                      <div className="mt-1 ml-[21px] pl-4 border-l border-[#E5E7EB] flex flex-col space-y-1 mb-2 py-1">
                        {item.subItems.map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            href={sub.href}
                            className="flex items-center space-x-2 text-[13px] text-[#6B7280] hover:text-[#111827] transition-colors py-1.5"
                          >
                            <div className="w-1 h-1 bg-[#9CA3AF] rounded-full"></div>
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}  
