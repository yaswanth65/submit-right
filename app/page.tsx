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
  const homeFaqs = [
    {
      question: "How does Submit Right work?",
      answer: "Upload your document, choose a service, get an instant price estimate, pay securely, and track your order live. An expert editor is assigned to your manuscript within hours of payment confirmation.",
    },
    {
      question: "How is my price calculated?",
      answer: "Your price is based on your word count and the service you select. Use the Quote Calculator on this page to get an instant estimate  no emails required, no surprises on checkout.",
    },
    {
      question: "Is my document safe?",
      answer: "Completely. All files are encrypted during upload and transfer, stored securely on ISO-compliant servers, and automatically deleted after 90 days. We are fully GDPR and DPDPB compliant.",
    },
    {
      question: "How fast can I get my document back?",
      answer: "Express orders can be returned in as little as 8 hours depending on word count and service type. Your estimated delivery time is shown clearly before you pay  so you always know what to expect.",
    },
    {
      question: "What if I'm not happy with the editing?",
      answer: "Every plan includes re-editing entitlement. Language Clarity includes 1 free re-edit within a year. Publication-Ready and High-Impact plans include unlimited re-editing for 365 days. If you're still unsatisfied, we offer a full refund.",
    },
    {
      question: "Will my editor understand my field?",
      answer: "Yes. Every manuscript is matched with editors who specialize in your subject area. Our network covers 1,600+ domains  including medicine, engineering, law, social sciences, and life sciences  all with PhD or MD qualifications.",
    },
    {
      question: "Can I communicate with my editor?",
      answer: "Yes. Submit Right includes a built-in secure messaging system. You can chat directly with your assigned editor, ask questions, upload revised files, and get clarifications  all within the platform, all stored securely.",
    },
    {
      question: "Do you handle journal submission?",
      answer: "Yes. Our Publication-Ready and High-Impact packages include journal selection, manuscript formatting to journal-specific guidelines, iThenticate plagiarism checks, cover letter writing, and reviewer response letter support.",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-white font-inter">
      <Navbar />
      <Hero />
      <TrustedLogos />
      <DomainsServices />
      {/* <CTABanner 
        variant="primary"
        title="Start Your Editing Journey Today"
        description="Transparent pricing. Expert editors. Fast turnaround. No surprises. Submit your manuscript now and get an instant quote."
        primaryButtonText="Get Instant Quote"
        primaryButtonHref="/quote-calculator"
        secondaryButtonText="View Services"
        secondaryButtonHref="/services"
      /> */}
      <WhyChoose />
      <ResearchStages />
    
      <QuoteCalculator />
      <WhatWeSolve />
      <Packages />
      <Steps />
      <Testimonials />
       <AboutMidBanner />
      <FAQ 
        items={homeFaqs}
        tag="FAQs"
        title="Questions Researchers Ask Before They Submit"
        description="Everything you need to know about submitting your manuscript, getting it edited, and tracking your order on Submit Right."
      />
      <Newsletter />
      <Footer />
    </main>
  );
}
