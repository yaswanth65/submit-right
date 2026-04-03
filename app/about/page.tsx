import { Navbar } from "@/components/landing/Navbar";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutProblems } from "@/components/about/AboutProblems";
import { AboutIntegrity } from "@/components/about/AboutIntegrity";
import { AboutMidBanner } from "@/components/about/AboutMidBanner";
import { AboutExperts } from "@/components/about/AboutExperts";
import { AboutAudience } from "@/components/about/AboutAudience";
import Testimonials from "@/components/landing/Testimonials";
import { CTABanner } from "@/components/landing/CTABanner";
import { FAQ } from "@/components/landing/FAQ";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white font-inter">
      <Navbar />
      <AboutHero />
      <AboutProblems />
      <AboutIntegrity />
      <AboutMidBanner />
      <AboutExperts />
      <AboutAudience />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
