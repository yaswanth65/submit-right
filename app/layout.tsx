import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google"; // Requested by user
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Pixel-perfect tailwind dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} antialiased font-dm-sans bg-[#FFFFFF] text-[#171717] flex min-h-screen`}>
        <Sidebar />
        <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
          <Topbar />
          <main className="p-8 pb-12 flex-1 w-full max-w-[1440px] mx-auto bg-[#FFFFFF]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
