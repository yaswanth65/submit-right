"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getStoredAuthSession, resolvePostLoginPath } from "@/lib/client-auth";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/user/dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const session = getStoredAuthSession();
    if (!session?.token) {
      setIsLoggedIn(false);
      setDashboardPath("/user/dashboard");
      return;
    }

    setIsLoggedIn(true);
    setDashboardPath(resolvePostLoginPath(session));
  }, []);

  const cta = useMemo(
    () => ({ isLoggedIn, dashboardPath }),
    [isLoggedIn, dashboardPath]
  );

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/packages", label: "Packages" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Legal Pages" },
  ];

  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top Announcemen Bar */}
     
      <header className="w-full sticky top-0 z-50 border-b border-[#E4EDF5]/70" style={{ background: "radial-gradient(circle at 35% 40%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 25%, rgba(255, 255, 255, 0.2) 45%, transparent 65%), linear-gradient(90deg, #F8FBFF 0%, #EEF5FB 40%, #E3EFF8 65%, #D6E8F5 100%)" }}>
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between h-[64px] md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Submit Right" className="h-7 md:h-8 w-auto" />
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
              <Link href="/services" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors flex items-center gap-1 py-4">
                Services
                <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>

              {/* Desktop Mega Menu */}
              <div className="absolute top-[100%] left-1/2 -translate-x-[30%] pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="w-[960px] lg:w-[1040px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 flex p-3 gap-6">
                  
                  {/* Left Blue Panel */}
                  <div className="w-[30%] shrink-0 bg-[#006080] rounded-[24px] p-8 flex flex-col justify-between text-white relative overflow-hidden">
                    {/* Optional subtle gradient overlay to match requested variation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#007096] to-[#004e6a] pointer-events-none" />
                    
                    <div className="relative z-10">
                      <h3 className="text-[26px] leading-[1.25] font-medium mb-4 pr-4 text-white">Lorem ipsum dolor<br />sit amet</h3>
                      <p className="text-[13px] text-white/80 leading-[1.6]">
                        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus Elementum suscipit donec viverra posuere
                      </p>
                    </div>
                    <Link href="/services" className="relative z-10 mt-8 bg-white text-[#006080] text-center font-medium py-3 rounded-full hover:bg-gray-50 transition-colors text-[14px]">
                      Gets Started
                    </Link>
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 py-8 pr-8 flex flex-col gap-10">
                    
                    {/* Top Row: 3 Columns */}
                    <div className="grid grid-cols-3 gap-6">
                      
                      <div className="space-y-4">
                        <h4 className="text-[#1C1C1D] font-medium text-[15px]">English Editing Services</h4>
                        <ul className="space-y-3">
                          <li><Link href="/services/language-clarity" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Language Clarity Editing</Link></li>
                          <li><Link href="/services/publication-ready" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Publication-Ready Editing</Link></li>
                          <li><Link href="/services/high-impact" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">High-Impact Editing</Link></li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[#1C1C1D] font-medium text-[15px]">Visual & Research Services</h4>
                        <ul className="space-y-3">
                          <li><Link href="/services/graphical-abstract" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Graphical Abstract Design</Link></li>
                          <li><Link href="/services/artwork-preparation" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Artwork Preparation</Link></li>
                          <li><Link href="/services/research-promotion" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Research Promotion</Link></li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[#1C1C1D] font-medium text-[15px]">Scientific Writing & Reviews</h4>
                        <ul className="space-y-3">
                          <li><Link href="/services/scientific-writing" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Scientific Writing Package</Link></li>
                          <li><Link href="/services/systematic-review" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Systematic Review Package</Link></li>
                          <li><Link href="/services/meta-analysis" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Meta-Analysis Package</Link></li>
                          <li><Link href="/services/full-review-writing" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Full Review + Writing</Link></li>
                        </ul>
                      </div>

                    </div>

                    {/* Bottom Row: Other Academic Services (Spans multiple columns) */}
                    <div>
                      <h4 className="text-[#1C1C1D] font-medium text-[15px] mb-4">Other Academic Services</h4>
                      <div className="grid grid-cols-3 gap-6">
                        <ul className="space-y-3">
                          <li><Link href="/services/thesis-excellence" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Thesis Excellence Editing</Link></li>
                          <li><Link href="/services/abstract-precision" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Abstract Precision Editing</Link></li>
                          <li><Link href="/services/conference-ready" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Conference-Ready Support</Link></li>
                          <li><Link href="/services/case-report" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Case Report Enhancement</Link></li>
                        </ul>
                        <ul className="space-y-3 col-span-2">
                          <li><Link href="/services/peer-review" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Pre-Submission Peer Review</Link></li>
                          <li><Link href="/services/literature-search" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Literature Search Support</Link></li>
                          <li><Link href="/services/plagiarism-check" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Plagiarism Check & Report</Link></li>
                          <li><Link href="/services/professional-proofreading" className="text-[#848B9B] text-[13px] hover:text-[#00A0E3] transition-colors block">Professional Proofreading</Link></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
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
            {cta.isLoggedIn ? (
              <Link
                href={cta.dashboardPath}
                className="inline-flex items-center justify-center px-6 py-2 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center px-6 py-2 border border-[#00A0E3] text-[#00A0E3] text-[14px] font-medium rounded-full hover:bg-[#EFF7FB] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-2 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[#65656D] rounded-lg hover:bg-white/70 transition-colors"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-[85vh] overflow-y-auto opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
          <nav className="grid gap-1 rounded-2xl border border-[#DDE8F2] bg-white/90 backdrop-blur p-2 shadow-[0_12px_30px_rgba(8,34,56,0.08)]">
            {navLinks.map((item) => {
              if (item.label === "Services") {
                return (
                  <div key={item.href} className="grid">
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="w-full flex items-center justify-between text-[14px] font-medium text-[#1C1C1D] px-3 py-2.5 rounded-xl hover:bg-[#F2F8FC] hover:text-[#00A0E3] transition-colors"
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-[#00A0E3]" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {/* Mobile Services Accordion */}
                    <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-[700px] mt-1" : "max-h-0"}`}>
                      <div className="pl-6 pr-2 py-2 flex flex-col gap-5 border-l-2 border-[#DDE8F2] ml-4 bg-[#F8FBFF] rounded-r-xl">
                        
                        <div>
                          <h4 className="text-[13px] font-medium text-[#1C1C1D] mb-2 uppercase tracking-wide">English Editing</h4>
                          <div className="flex flex-col gap-2">
                            <Link href="/services/language-clarity" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Language Clarity</Link>
                            <Link href="/services/publication-ready" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Publication-Ready</Link>
                            <Link href="/services/high-impact" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">High-Impact</Link>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[13px] font-medium text-[#1C1C1D] mb-2 uppercase tracking-wide">Academic</h4>
                          <div className="flex flex-col gap-2">
                            <Link href="/services/thesis-excellence" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Thesis Excellence</Link>
                            <Link href="/services/abstract-precision" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Abstract Precision</Link>
                            <Link href="/services/conference-ready" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Conference-Ready</Link>
                            <Link href="/services/case-report" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Case Report</Link>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[13px] font-medium text-[#1C1C1D] mb-2 uppercase tracking-wide">Visual & Research</h4>
                          <div className="flex flex-col gap-2">
                            <Link href="/services/graphical-abstract" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Graphical Abstract</Link>
                            <Link href="/services/artwork-preparation" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Artwork Preparation</Link>
                            <Link href="/services/research-promotion" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Research Promotion</Link>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[13px] font-medium text-[#1C1C1D] mb-2 uppercase tracking-wide">Scientific Writing</h4>
                          <div className="flex flex-col gap-2">
                            <Link href="/services/scientific-writing" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Scientific Writing Package</Link>
                            <Link href="/services/systematic-review" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Systematic Review Package</Link>
                            <Link href="/services/meta-analysis" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Meta-Analysis Package</Link>
                            <Link href="/services/full-review-writing" onClick={() => setIsMobileOpen(false)} className="text-[12px] text-[#78788D] hover:text-[#00A0E3]">Full Review + Writing</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-[14px] font-medium text-[#1C1C1D] px-3 py-2.5 rounded-xl hover:bg-[#F2F8FC] hover:text-[#00A0E3] transition-colors"
              >
                {item.label}
              </Link>
              );
            })}
          </nav>

          <div className="mt-3">
            {cta.isLoggedIn ? (
              <Link
                href={cta.dashboardPath}
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex w-full items-center justify-center px-6 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-[#00A0E3] text-[#00A0E3] text-[14px] font-medium rounded-full hover:bg-[#EFF7FB] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0189C2] transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
