import Link from "next/link";

export function Footer() {
  const footerLinks = {
    "Lorem ipsum": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
    "Lorem ipsum 2": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
    "Lorem ipsum 3": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
    "Lorem ipsum 4": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
  };

  return (
    <footer className="bg-[#1C1C1D] pt-16 sm:pt-24 pb-6 mt-[-2px] relative z-10">
      <div className="landing-shell pt-8 sm:pt-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 pb-8 sm:pb-10 border-b border-[#3A3A3A]">
          {/* Logo Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <img src="/logo.svg" alt="Submit Right" className="h-8 color-white w-auto mb-4" />
            <p className="text-[13px] text-[#A0A0A0] leading-[1.6] mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="text-[13px] text-[#A0A0A0] space-y-0.5 mb-4">
              <p>contact@submitright.com</p>
              <p>(555) 123-4567</p>
            </div>
            
            {/* Social Icons - Now in logo column */}
            <div className="flex items-center gap-2.5">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center text-white hover:bg-[#00A0E3] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center text-white hover:bg-[#00A0E3] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center text-white hover:bg-[#00A0E3] transition-colors">
                <svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <div key={idx}>
              <h4 className="text-[14px] font-normal text-white mb-3">{title}</h4>
              <ul className="space-y-1.5">
                {links.map((link, lidx) => (
                  <li key={lidx}>
                    <Link 
                      href="#" 
                      className="text-[13px] text-[#A0A0A0] hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-center pt-5 sm:pt-6 gap-3 text-center">
          <p className="text-[12px] text-[#A0A0A0]">
            © 2025 SUBMIT RIGHT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
