"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { CTABanner } from "@/components/landing/CTABanner";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceContact } from "@/components/services/ServiceContact";

import { serviceFaqs } from "@/components/services2/service2Data";
import { PricingPlansSection } from "@/components/services2/PricingPlansSection";
import { IncludedFeaturesSection } from "@/components/services2/IncludedFeaturesSection";
import { DocumentTypesSection } from "@/components/services2/DocumentTypesSection";
import { WhyChooseSection } from "@/components/services2/WhyChooseSection";
import { ServiceDetailsSection } from "@/components/services2/ServiceDetailsSection";
import { FormattingInfoSection } from "@/components/services2/FormattingInfoSection";

export default function ServiceTwoPage() {
  return (
    <main className="min-h-screen w-full bg-white font-inter text-[#1C1C1D]">
      <Navbar />
      <ServiceHero />
      <PricingPlansSection />
      <IncludedFeaturesSection />
      <DocumentTypesSection />
      <WhyChooseSection />
      <ServiceDetailsSection />
      <FormattingInfoSection />
      <ServiceContact />
      <FAQ
        items={serviceFaqs}
        tag="FAQ"
        title="Got Questions We've Got Answers"
        description="Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam."
      />
      <CTABanner variant="secondary" />
      <Footer />
    </main>
  );
}
