import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CTABanner } from "@/components/landing/CTABanner";

import { Service3Hero } from "@/components/services3/Service3Hero";
import { ProcessSection } from "@/components/services3/ProcessSection";
import { RecommendationSection } from "@/components/services3/RecommendationSection";
import { WhyChooseSection } from "@/components/services3/WhyChooseSection";
import { StatsSection } from "@/components/services3/StatsSection";
import { FAQSection } from "@/components/services3/FaqSection";

export default function ServiceThreePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white font-inter text-[#1C1C1D]">
      <Navbar />
      <Service3Hero />
      <ProcessSection />
      <RecommendationSection />
      <WhyChooseSection />
      <StatsSection />
      <FAQSection />
      <CTABanner variant="secondary" />
      <Footer />
    </main>
  );
}
