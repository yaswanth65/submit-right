"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <>
      {/* Top Announcement Bar */}
     
      <header className="w-full sticky top-0 z-50" style={{ background: 'radial-gradient(circle at 35% 40%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 25%, rgba(255, 255, 255, 0.2) 45%, transparent 65%), linear-gradient(90deg, #F8FBFF 0%, #EEF5FB 40%, #E3EFF8 65%, #D6E8F5 100%)' }}>
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Submit Right" className="h-8 w-auto" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            <Link href="/" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors">
              About
            </Link>
            <div className="relative group flex items-center cursor-pointer">
              <Link href="/services" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors flex items-center gap-1">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
            </div>
            <div className="relative group flex items-center cursor-pointer">
              <Link href="/packages" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors flex items-center gap-1">
                Packages
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
            </div>
            <Link href="/contact" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors">
              Contact
            </Link>
            <Link href="/privacy-policy" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors">
              Legal Pages
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/user/dashboard"
              className="inline-flex items-center justify-center px-6 py-2 border border-[#00A0E3] text-[#00A0E3] text-[14px] font-medium rounded-full hover:bg-[#EFF7FB] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/user/dashboard"
              className="inline-flex items-center justify-center px-6 py-2 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-[#65656D]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
