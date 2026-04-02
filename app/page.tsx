import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustedLogos } from "@/components/landing/TrustedLogos";
import { DomainsServices } from "@/components/landing/DomainsServices";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { ResearchStages } from "@/components/landing/ResearchStages";
import { CTABanner } from "@/components/landing/CTABanner";
import { QuoteCalculator } from "@/components/landing/QuoteCalculator";
import { WhatWeSolve } from "@/components/landing/WhatWeSolve";
import { Packages } from "@/components/landing/Packages";
import { Steps } from "@/components/landing/Steps";
import  Testimonials  from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";
import { AboutMidBanner } from "@/components/about/AboutMidBanner";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white font-inter">
      <Navbar />
      <Hero />
      <TrustedLogos />
      <DomainsServices />
      <WhyChoose />
      <ResearchStages />
      <AboutMidBanner />
      <QuoteCalculator />
      <WhatWeSolve />
      <Packages />
      <Steps />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
