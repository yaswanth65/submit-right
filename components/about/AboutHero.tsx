import { User } from "lucide-react"; // assuming lucide-react is installed, if not we'll use SVG

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 25%, rgba(255, 255, 255, 0.2) 45%, transparent 65%), linear-gradient(180deg, #F8FBFF 0%, #EEF5FB 40%, #E3EFF8 65%, #FFFFFF 100%)' }}>

      {/* Blur shapes */}
      <div className="absolute top-[-100px] right-[10%] w-[500px] h-[400px] bg-[#00A0E3]/10 blur-[120px] rotate-[8deg] -z-10" />
      <div className="absolute top-[-80px] left-[10%] w-[400px] h-[300px] bg-[#0078D4]/10 blur-[120px] -z-10" />

      <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-10 flex flex-col items-center justify-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,160,227,0.3)] bg-[#00A0E3]/10 mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-sm font-medium text-[#00A0E3]">
            About SubmitRight
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[44px] lg:text-[48px] leading-[1.1] font-medium text-[#1C1C1D] mb-6 max-w-[800px]">
          Academic Editing With Clarity, Ethics, and Accountability
        </h1>

        {/* Description */}
        <div className="text-[16px] lg:text-[18px] text-[#65656D] leading-relaxed flex flex-col gap-4 max-w-[800px]">
          <p>
            We believe that the dissemination of knowledge should be unhindered by language barriers or structural inconsistencies. Our mission is to refine the presentation of your research while preserving the absolute integrity of your original voice.
          </p>
          <p>
            Through a transparent, expert-led process, we provide the rigorous editorial oversight required for elite international journals without ever compromising ethical standards.
          </p>
        </div>

      </div>
    </section>
  );
}
