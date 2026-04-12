"use client";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { CTABanner } from "@/components/landing/CTABanner";
import { Newsletter } from "@/components/landing/Newsletter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative hero-svg-bg pt-24 sm:pt-28 pb-20 lg:pt-32 lg:pb-32 border-b border-[#F3F4F6] overflow-hidden">

        <div className="landing-shell relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            {/* Left Content */}
            <div className="flex-1 max-w-[500px]">
              <div className="text-[#00A0E3] text-[13px] font-bold tracking-wider uppercase mb-4">
                CURRENT AS OF 22 JAN 2025
              </div>
              <h1 className="text-[40px] lg:text-[48px] font-semibold text-[#1C1C1D] leading-tight mb-8">
                Privacy Policy
              </h1>

              {/* Search Bar */}
              <div className="relative max-w-[320px]">
                <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search"
                  className="w-full h-[46px] pl-10 pr-4 bg-white rounded-lg text-[14px] text-[#1C1C1D] focus:outline-none focus:ring-2 focus:ring-[#00A0E3]/20 shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="flex-1 max-w-[400px]">
              <p className="text-[15px] text-[#65656D] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor. amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 flex items-center justify-center">
  <div className="landing-shell">
    <div className="max-w-[1000px] mx-auto space-y-12">
            {/* 1 */}
            <div className="space-y-6">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">1. Lorem ipsum dolor sit amet consectetur</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum.</p>
                <p>Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor viverra senectus eget enim purus enim congue. Venenatis sed amet quis tortor pharetra risus sem. Malesuada eget dictum vitae enim sit dignissim varius nibh enim. In condimentum at sit malesuada porta quam rhoncus sapien. Dui orci convallis quam in scelerisque libero amet.</p>
                <p>Eu neque sagittis in gravida elementum. Semper tempor viverra senectus eget enim purus enim congue. Venenatis sed amet quis tortor pharetra risus sem. Malesuada eget dictum vitae enim sit dignissim varius nibh enim.</p>
              </div>
            </div>

            {/* 2 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">2. Lorem ipsum dolor</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor viverra senectus eget enim purus enim congue. Venenatis sed amet quis tortor pharetra risus sem. Malesuada eget dictum vitae enim sit dignissim varius nibh enim. In condimentum at sit malesuada porta quam rhoncus sapien. Dui orci convallis quam in scelerisque libero amet. Lobortis et viverra enim ipsum faucibus. Dictum semper eget nunc sed. Mattis id in turpis maecenas penatibus adipiscing volutpat. Sed sed ullamcorper mattis in gravida maecenas. Non mi donec justo nec. Dignissim fames enim feugiat sed risus a ut. Porttitor quam faucibus sit metus vitae maecenas eget nunc. Dis molestie sed arcu quis dui porttitor fermentum. Nibh imperdiet at pharetra tortor nullam ullamcorper. Commodo vel nulla donec amet nibh lectus amet donec massa.</p>
                <p>Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor viverra senectus eget enim purus enim congue. Venenatis sed amet quis tortor pharetra risus sem. Malesuada eget dictum</p>
                <p>Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi tincidunt enim nascetur sed.</p>
              </div>
            </div>

            {/* 3 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">3. Ut enim ad minim veniam</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>

            {/* 4 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">4. Nemo enim ipsam voluptatem</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
              </div>
            </div>

            {/* 5 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">5. Et harum quidem rerum facilis est et expedita distinctio</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
                <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
              </div>
            </div>

            {/* 6 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">6. Quis autem vel eum iure reprehenderit</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>In ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>

            {/* 7 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">7. Sed ut perspiciatis unde omnis</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              </div>
            </div>

            {/* 8 */}
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-[#1C1C1D]">8. At vero eos et accusamus et iusto</h2>
              <div className="space-y-4 text-[15px] text-[#65656D] leading-relaxed">
                <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                <p>Et harum quidem rerum facilis est et expedita distinctio.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

           <Newsletter />
     

      <Footer />
    </div>
  );
}