import Link from "next/link";

export function Footer() {
  const footerColumns = [
    {
      title: "Lorem ipsum",
      links: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    },
    {
      title: "Lorem ipsum 2",
      links: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    },
    {
      title: "Lorem ipsum 3",
      links: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    },
    {
      title: "Lorem ipsum 4",
      links: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    }
  ];

  return (
    <footer className="bg-[#1C1C1D]  relative z-10">
      <div className="landing-shell">
        {/* Main Footer Container - Figma: flex column, gap 78px, padding-top 200px, padding-bottom 34px */}
        <div className="flex flex-col gap-[78px] py-20 lg:py-[200px] lg:pb-[34px]">
          
          {/* Top Section - Links Grid - Figma: flex row, gap 48px, width 1320px */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-[48px] w-full">
            
            {/* Logo Column - Figma: width 391px */}
            <div className="w-full lg:w-[391px] flex-shrink-0">
              {/* Logo - Figma: 199x44 */}
              <div className="h-11 mb-6">
                <img src="/footer/l.svg" alt="Submit Right" className="h-full w-auto" />
              </div>

              {/* Description - Figma: 16px, 400 weight, line-height 140% */}
              <p className="text-[16px] font-normal text-white leading-[140%] mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              {/* Contact Info */}
              <div className="text-[16px] font-normal text-white leading-[140%] space-y-1 mb-6">
                <p>contact@submitright.com</p>
                <p>(555) 123-4567</p>
              </div>

              {/* Social Icons - Figma: 24x24 each, gap 18px */}
              <div className="flex items-center gap-[18px]">
                <Link href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src="/footer/Frame (3).svg" alt="Facebook" className="w-full h-full" />
                </Link>
                <Link href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src="/footer/Frame (4).svg" alt="LinkedIn" className="w-full h-full" />
                </Link>
                <Link href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src="/footer/Frame (5).svg" alt="Instagram" className="w-full h-full" />
                </Link>
              </div>
            </div>

            {/* Links Columns Grid - responsive: 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-[48px] flex-1">
              {footerColumns.map((column, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  {/* Column Title - Figma: 18px, 500 weight, white */}
                  <h4 className="text-[18px] font-medium text-white leading-[120%]">
                    {column.title}
                  </h4>

                  {/* Links - Figma: gap 12px between items, 16px font, 400 weight, #78788D */}
                  <ul className="flex flex-col gap-3 lg:gap-3">
                    {column.links.map((link, lidx) => (
                      <li key={lidx}>
                        <Link
                          href="#"
                          className="text-[16px] font-normal text-[#78788D] leading-[140%] hover:text-white transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section - Divider & Copyright - Figma: gap 34px */}
          <div className="flex flex-col gap-[34px]">
            {/* Divider - Figma: #D9D9D9 opacity 20% */}
            <div className="h-px w-full bg-[#D9D9D9] opacity-20" />

            {/* Copyright - Figma: 16px, 400 weight, #78788D, centered */}
            <p className="text-[16px] font-normal text-[#78788D] leading-[140%] text-center">
              © 2025 SUBMIT RIGHT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
