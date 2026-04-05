 
// User layout.tsx (app/user/layout.tsx)
import { ResponsiveSidebar } from "@/app/user/components/ResponsiveSidebar";
import { Navbar } from "@/app/user/components/UserNavbar";
import { UserAuthGuard } from "@/app/user/components/UserAuthGuard";
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
    <UserAuthGuard>
      <>
        <ResponsiveSidebar />

 
      <div className="flex-1 w-full md:w-[calc(100%-260px)] main-content flex flex-col min-h-screen pt-[76px]">
 
        <Navbar />
        <main className="flex-1 w-full bg-[#FFFFFF] overflow-x-auto">
          {children}
        </main>
      </div>
    </>
    </UserAuthGuard>
  );
} 
 