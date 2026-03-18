// // User layout.tsx (app/user/layout.tsx)
// import { Sidebar } from "@/app/user/components/UserSidebar";
// import { Navbar  } from "@/app/user/components/UserNavbar";

// export default function UserLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <Sidebar />
//       <div className="flex-1 ml-[260px] flex flex-col min-h-screen pt-[76px]">
//         <Navbar />
//         <main className="p-6 pb-12 flex-1 w-full max-w-[1440px] mx-auto bg-[#FFFFFF]">
//           {children}
//         </main>
//       </div>
//     </>
//   );
// }
// User layout.tsx (app/user/layout.tsx)
import { Sidebar } from "@/app/user/components/UserSidebar";
import { Navbar } from "@/app/user/components/UserNavbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen pt-[76px]">
        <Navbar />
        <main className="flex-1 w-full bg-[#FFFFFF]">
          {children}
        </main>
      </div>
    </>
  );
}