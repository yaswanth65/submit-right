import { Navbar } from "@/components/landing/Navbar";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutProblems } from "@/components/about/AboutProblems";
import { AboutIntegrity } from "@/components/about/AboutIntegrity";
import { AboutMidBanner } from "@/components/about/AboutMidBanner";
import { AboutExperts } from "@/components/about/AboutExperts";
import { AboutAudience } from "@/components/about/AboutAudience";
import { TeamSection } from "@/components/about/TeamSection";
import Testimonials from "@/components/landing/Testimonials";
import { CTABanner } from "@/components/landing/CTABanner";
import { FAQ } from "@/components/landing/FAQ";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

const aboutFAQs = [
  {
    question: "What exactly is Submit Right?",
    answer: "Submit Right is a professional academic services platform. Not a freelancing marketplace and not a generic editing tool. It's a structured, workflow-driven platform where researchers upload manuscripts and receive expert editing, translation, or publication support through a secure, tracked, and fully accountable process. Think of it as your dedicated academic services partner. With a full team behind every order."
  },
  {
    question: "Who owns and operates Submit Right?",
    answer: "Submit Right is operated by a team of academic professionals and platform specialists with over 20 years of combined experience in research editing and publication support. The platform was built to solve a very specific problem: serious researchers having no reliable, transparent, professional-grade editing service they could trust entirely."
  },
  {
    question: "How do you select the editors on the platform?",
    answer: "Every editor goes through a multi-step vetting process that includes qualification verification, subject-area testing, sample editing evaluation, and compliance training. Editors are only assigned to manuscripts within their verified subject domain. No editor on Submit Right handles work outside their area of expertise."
  },
  {
    question: "Does Submit Right support or allow ghostwriting?",
    answer: "No. Categorically. Submit Right does not offer, facilitate, or condone ghostwriting in any form. Our services improve and clarify research written by the researcher. If a service request involves writing original academic content on behalf of a client, we decline it. This is a firm, non-negotiable platform policy."
  },
  {
    question: "How does Submit Right handle my data and files?",
    answer: "Your files are encrypted end-to-end during upload, transfer, and storage. They are stored on ISO-certified compliant servers and permanently deleted from our systems after 90 days. We are fully GDPR and DPDPB compliant. Your manuscript, your identity, and your institutional affiliation are never shared with any third party."
  },
  {
    question: "What is your refund and revision policy?",
    answer: "Every plan includes built-in re-editing entitlement. 1 free re-edit for Language Clarity, and unlimited re-editing for 365 days on Publication-Ready and High-Impact plans. If you are genuinely unsatisfied after re-editing has been completed, Submit Right offers a 100% satisfaction refund. Refund requests are reviewed by our team and processed within 5–7 business days."
  },
  {
    question: "What payment methods does Submit Right accept?",
    answer: "Submit Right supports secure payments via Razorpay and Stripe. Covering UPI, credit/debit cards, net banking, and international card payments. All transactions are encrypted, and invoices are automatically generated and available for download from your dashboard immediately after payment."
  },
  {
    question: "Can institutions and universities partner with Submit Right?",
    answer: "Yes. Submit Right offers institutional partnership arrangements for universities, research departments, funding bodies, and publishing houses. Institutional partners receive a branded submission portal, centralised billing and reporting, and dedicated account management. Contact us directly to discuss a partnership arrangement suited to your institution's needs."
  }
];

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
      <TeamSection />
      <Testimonials />
      <CTABanner 
        title="You've Done the Research. We'll Make Sure the World Can Read It."
        description="Upload your manuscript today. Get a transparent instant quote. And let our network of PhD-qualified editors make your research publication-ready while you track every step live from your dashboard."
        primaryButtonText="Submit Manuscript"
        primaryButtonHref="/user/dashboard"
        secondaryButtonText="View Packages"
        secondaryButtonHref="/packages"
      />
      <FAQ 
        items={aboutFAQs}
        tag="About Submit Right"
        title="Everything You Want to Know About the Platform Behind the Editing"
        description="These are the most common questions researchers ask about Submit Right as a company. Our standards, how we operate, who we are, and how payments and refunds work."
      />
      <Newsletter />
      <Footer />
    </main>
  );
}
