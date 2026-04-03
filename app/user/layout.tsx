 
// User layout.tsx (app/user/layout.tsx)
import { Sidebar } from "@/app/user/components/UserSidebar";
import { Navbar } from "@/app/user/components/UserNavbar";
import type { Viewport } from 'next'
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Optional: prevents auto-zooming on inputs in iOS
  userScalable: false, // Optional: strictly locks zoom
}
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <style>{`
        .sidebar-wrapper {
          display: none;
        }

        .main-content {
          margin-left: 0;
        }

        @media (min-width: 768px) {
          .sidebar-wrapper {
            display: block;
          }

          .main-content {
            margin-left: 260px;
          }
        }
      `}</style>

    <div className="sidebar-wrapper" >
      <Sidebar /></div>
 
      <div className="flex-1 w-full max-w-[100vw] overflow-x-hidden main-content flex flex-col min-h-screen pt-[76px]">
 
        <Navbar />
        <main className="flex-1 w-full bg-[#FFFFFF]">
          {children}
        </main>
      </div>
    </>
  );
} 
 