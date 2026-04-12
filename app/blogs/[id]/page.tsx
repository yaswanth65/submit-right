"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CTABanner } from "@/components/landing/CTABanner";

// Mock detailed blog matching the `BlogPost` / `BlogDraft` from admin
const mockBlogPost = {
  id: "1",
  title: "How to Optimize Your Workflow for Maximum Productivity",
  author: "Sarah Jenkins",
  date: "Oct 12, 2026",
  coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  introduction: "Productivity isn't just about doing more, it's about doing the right things efficiently. In this post, we discuss the core philosophies behind a highly effective workflow and how to implement them in your daily routine.",
  sections: [
    {
      heading: "Identify Your Core Priorities",
      content: "Before you can optimize your workflow, you need to understand what actually matters. Often, we get bogged down by busywork—tasks that feel productive but don't actually move the needle. Start by identifying your top 3 goals for the week. Once aligned, structure your daily to-do list so that these priority items are tackled first, ideally when your energy levels are at their peak.",
      imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      heading: "Automate the Repetitive Tasks",
      content: "Technology is your best friend when it comes to workflow optimization. If you find yourself doing the same task more than three times a week, there's a strong chance it can be automated. Use tools like Zapier, Make, or custom scripts to handle data entry, email filtering, and meeting scheduling. The time saved here can be reinvested into deep, creative work.",
      imageUrl: ""
    },
    {
      heading: "Establish Functional Boundaries",
      content: "One of the quickest ways to ruin a good workflow is context switching. Every time you pause to check a notification or message, it takes an average of 23 minutes to return to a state of flow. Block out specific times for checking emails and messages, and turn off non-essential notifications while engaging in deep work.",
      imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  conclusion: "Workflow optimization is an ongoing process of refinement. Start with these three strategies: prioritizing deeply, automating ruthlessly, and protecting your focus. You'll quickly find that you're achieving more with significantly less stress."
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative hero-svg-bg pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="landing-shell max-w-[900px] relative z-10">
          
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#65656D] hover:text-[#00A0E3] transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>

          <div className="flex items-center gap-3 text-[14px] text-[#65656D] mb-5">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-[#EAF5FB] text-[#00A0E3] flex items-center justify-center font-bold text-[10px]">
                 {mockBlogPost.author.charAt(0)}
               </div>
               <span className="font-semibold text-[#1C1C1D]">{mockBlogPost.author}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-[#DDE7ED]"></span>
            <span>{mockBlogPost.date}</span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] font-semibold text-[#1C1C1D] mb-6">
            {mockBlogPost.title}
          </h1>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="landing-shell max-w-[900px]">
          
          {/* Cover Image */}
          {mockBlogPost.coverImageUrl && (
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-[20px] overflow-hidden mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E5E7EB]">
              <Image 
                src={mockBlogPost.coverImageUrl}
                alt={mockBlogPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Introduction */}
          <div className="prose prose-lg max-w-none text-[#4B5563] mb-12">
            <p className="text-[18px] sm:text-[20px] leading-[1.7] font-medium text-[#1C1C1D]">
              {mockBlogPost.introduction}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {mockBlogPost.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#1C1C1D] mb-5">
                  {section.heading}
                </h2>
                <p className="text-[16px] sm:text-[18px] leading-[1.7] text-[#4B5563] mb-6 whitespace-pre-wrap">
                  {section.content}
                </p>
                {section.imageUrl && (
                  <div className="relative w-full h-[300px] sm:h-[400px] rounded-[16px] overflow-hidden border border-[#E5E7EB] mt-6">
                    <Image 
                      src={section.imageUrl} 
                      alt={section.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          {mockBlogPost.conclusion && (
            <div className="mt-12 pt-10 border-t border-[#F0F0F0]">
              <h3 className="text-[20px] font-semibold text-[#1C1C1D] mb-4">Conclusion</h3>
              <p className="text-[16px] sm:text-[18px] leading-[1.7] text-[#4B5563]">
                {mockBlogPost.conclusion}
              </p>
            </div>
          )}

        </div>
      </section>

      <div className="relative z-20">
        <CTABanner variant="secondary" />
      </div>

      <Footer />
    </div>
  );
}
