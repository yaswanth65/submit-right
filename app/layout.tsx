// // Global layout.tsx (app/layout.tsx)
// import type { Metadata } from "next";
// import { DM_Sans, Inter } from "next/font/google";
// import "./globals.css";

// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
// });

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Pixel-perfect tailwind dashboard",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${dmSans.variable} ${inter.variable} antialiased font-dm-sans bg-[#FFFFFF] text-[#171717] flex min-h-screen`}>
//         {children}
//       </body>
//     </html>
//   );
// }
// Global layout.tsx (app/layout.tsx)
import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}