"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { ServiceHero } from "../../../components/services/ServiceHero";
import { PostPublication } from "../../../components/services/PostPublication";
import { ServiceWhyChoose } from "../../../components/services/ServiceWhyChoose";
import { ServiceContact } from "../../../components/services/ServiceContact";
import { Newsletter } from "@/components/landing/Newsletter";

export default function ServicePage() {
  const serviceFaqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetu.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-white font-inter">
      <Navbar />
      <ServiceHero />
      <PostPublication />
      <ServiceWhyChoose />
      <ServiceContact />
      <div className="bg-white">
        <FAQ 
          items={serviceFaqs}
          tag="FAQ"
          title="Got Questions We've Got Answers"
          description="Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. Elementum suscipit donec viverra posuere at lorem nullam."
        />
      </div>
      <Newsletter />

      <Footer />
    </main>
  );
}