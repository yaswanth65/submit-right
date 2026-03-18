// Admin layout.tsx (app/admin/layout.tsx)
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen ">
        <Topbar />
        <main className="p-8 pb-12 flex-1 w-full  bg-[#FFFFFF]">
          {children}
        </main>
      </div>
    </>
  );
}