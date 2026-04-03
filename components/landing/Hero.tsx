import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24" style={{ background: 'radial-gradient(circle at 35% 40%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 25%, rgba(255, 255, 255, 0.2) 45%, transparent 65%), linear-gradient(90deg, #F8FBFF 0%, #EEF5FB 40%, #E3EFF8 65%, #D6E8F5 100%)' }}>

      {/* ===== Background ===== */}

      {/* Blur shapes */}
      <div className="absolute top-[-100px] right-[10%] w-[500px] h-[400px] bg-[#00A0E3]/20 blur-[120px] rotate-[8deg] -z-10" />
      <div className="absolute top-[-80px] left-[-120px] w-[400px] h-[300px] bg-[#0078D4]/15 blur-[120px] rotate-[8deg] -z-10" />

      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ===== LEFT ===== */}
          <div className="max-w-[600px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
              <span className="w-2 h-2 bg-[#00A0E3] rounded-full" />
              <span className="text-sm font-medium text-[#00A0E3]">
                LOREM IPSUM DOLOR
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[54px] leading-[110%] font-medium text-[#1C1C1D] mb-6">
              Lorem ipsum dolor sit amet consectetur
            </h1>

            {/* Description */}
            <p className="text-[18px] text-[#78788D] leading-[140%] mb-8">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
              Elementum suscipit donec viverra posuere at lorem nullam.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mb-10">
              <Link
                href="#"
                className="px-7 py-3 rounded-full bg-[#00A0E3] text-white font-medium shadow hover:bg-[#028ac7]"
              >
                Create Account
              </Link>

              <Link
                href="#"
                className="px-7 py-3 rounded-full border border-[#00A0E3] text-[#00A0E3] font-medium hover:bg-[#EAF5FB]"
              >
                Log in
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF5FB]" />
                <div>
                  <p className="font-semibold">10,000+</p>
                  <p className="text-sm text-gray-500">Lorem ipsum</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF5FB]" />
                <div>
                  <p className="font-semibold">4.8/5</p>
                  <p className="text-sm text-gray-500">Lorem ipsum</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT ===== */}
          <div className="relative h-[500px]">

            {/* Card 1 (middle) */}
            <div className="absolute left-[60px] top-[120px] w-[260px] h-[220px] rounded-2xl shadow-lg overflow-hidden z-20 bg-white">
              <Image src="/card1.png" alt="card1" fill className="object-cover" />
            </div>

            {/* Card 2 (top) */}
            <div className="absolute right-[40px] top-[40px] w-[220px] h-[160px] rounded-2xl shadow-md overflow-hidden z-10 bg-white">
              <Image src="/card2.png" alt="card2" fill className="object-cover" />
            </div>

            {/* Card 3 (main bottom) */}
            <div className="absolute right-0 bottom-0 w-[300px] h-[240px] rounded-2xl shadow-xl overflow-hidden z-30 bg-white">
              <Image src="/card3.png" alt="card3" fill className="object-cover" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
