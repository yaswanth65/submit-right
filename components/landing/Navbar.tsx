"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getStoredAuthSession, resolvePostLoginPath } from "@/lib/client-auth";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/user/dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        { href: "/blogs", label: "Blogs" },

  ];

  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Top Announcemen Bar */}
     
      <header className={`fixed  left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm border-b border-[#E4EDF5]/70" : ""}`}>
      <div className="landing-shell">
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
            <Link href="/blogs" className="text-[14px] font-medium text-[#1C1C1D] hover:text-[#00A0E3] transition-colors">
              Blogs
            </Link>
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

        {isMobileOpen && <div className="md:hidden fixed inset-0 top-[64px] bg-black/45 z-40" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} />}

        <div className={`md:hidden fixed top-[64px] right-0 z-50 h-[calc(100dvh-64px)] w-[min(86vw,420px)] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.16)] border-l border-[#EAECEF] transition-transform duration-300 ease-out overflow-y-auto ${isMobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}`}>
          <nav className="px-5 py-5">
            <div className="space-y-0">
              {navLinks.map((item) => {
                if (item.label === "Services") {
                  return (
                    <div key={item.href} className="py-4 border-b border-[#EEF2F6]">
                      <button
                        onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between text-left text-[18px] font-semibold text-[#1C1C1D]"
                      >
                        <span>Services</span>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isMobileServicesOpen ? "max-h-[1200px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                        <div className="rounded-[24px] bg-gradient-to-br from-[#0A8BC2] to-[#005F87] p-6 text-white">
                          <h3 className="text-[28px] leading-[1.1] font-medium tracking-[-0.02em] max-w-[250px]">
                            Lorem ipsum dolor sit amet
                          </h3>
                          <p className="mt-4 text-[15px] leading-[1.45] text-white/70 max-w-[250px]">
                            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus Elementum suscipit donec viverra posuere
                          </p>
                          <Link
                            href="/services"
                            onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }}
                            className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-white text-[18px] font-medium text-[#0A4361]"
                          >
                            Create Account
                          </Link>
                        </div>

                        <div className="mt-5 space-y-4">
                          <div>
                            <h4 className="text-[16px] font-medium text-[#1C1C1D] mb-2">English Editing Services</h4>
                            <div className="space-y-2 text-[16px] leading-[1.45] text-[#78788D]">
                              <Link href="/services/language-clarity" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Language Clarity Editing</Link>
                              <Link href="/services/publication-ready" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Publication-Ready Editing</Link>
                              <Link href="/services/high-impact" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">High-Impact Editing</Link>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[16px] font-medium text-[#1C1C1D] mb-2">Visual & Research Services</h4>
                            <div className="space-y-2 text-[16px] leading-[1.45] text-[#78788D]">
                              <Link href="/services/graphical-abstract" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Graphical Abstract Design</Link>
                              <Link href="/services/artwork-preparation" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Artwork Preparation</Link>
                              <Link href="/services/research-promotion" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Research Promotion</Link>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[16px] font-medium text-[#1C1C1D] mb-2">Scientific Writing & Reviews</h4>
                            <div className="space-y-2 text-[16px] leading-[1.45] text-[#78788D]">
                              <Link href="/services/scientific-writing" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Scientific Writing Package</Link>
                              <Link href="/services/systematic-review" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Systematic Review Package</Link>
                              <Link href="/services/meta-analysis" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Meta-Analysis Package</Link>
                              <Link href="/services/full-review-writing" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Full Review + Writing</Link>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[16px] font-medium text-[#1C1C1D] mb-2">Other Academic Services</h4>
                            <div className="space-y-2 text-[16px] leading-[1.45] text-[#78788D]">
                              <Link href="/services/thesis-excellence" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Thesis Excellence Editing</Link>
                              <Link href="/services/abstract-precision" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Abstract Precision Editing</Link>
                              <Link href="/services/conference-ready" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Conference-Ready Support</Link>
                              <Link href="/services/case-report" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Case Report Enhancement</Link>
                              <Link href="/services/peer-review" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Pre-Submission Peer Review</Link>
                              <Link href="/services/literature-search" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Literature Search Support</Link>
                              <Link href="/services/plagiarism-check" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Plagiarism Check & Report</Link>
                              <Link href="/services/professional-proofreading" onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }} className="block">Professional Proofreading</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.href} className="py-4 border-b border-[#EEF2F6] last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }}
                      className="block text-[18px] font-medium text-[#6F7078] hover:text-[#1C1C1D] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="px-5 pb-6 pt-2">
            {cta.isLoggedIn ? (
              <Link
                href={cta.dashboardPath}
                onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }}
                className="inline-flex w-full items-center justify-center h-12 rounded-full bg-[#00A0E3] text-white text-[14px] font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/signin"
                  onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }}
                  className="inline-flex items-center justify-center h-12 border border-[#00A0E3] text-[#00A0E3] text-[14px] font-medium rounded-full"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => { setIsMobileOpen(false); setIsMobileServicesOpen(false); }}
                  className="inline-flex items-center justify-center h-12 bg-[#00A0E3] text-white text-[14px] font-medium rounded-full"
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
