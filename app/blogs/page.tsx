"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CTABanner } from "@/components/landing/CTABanner";

// Mock data matching the admin blog structure
const mockBlogs = [
  {
    id: "1",
    title: "How to Optimize Your Workflow for Maximum Productivity",
    author: "Sarah Jenkins",
    date: "Oct 12, 2026",
    coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    introduction: "Productivity isn't just about doing more, it's about doing the right things efficiently. In this post, we discuss the core philosophies behind a highly effective workflow.",
  },
  {
    id: "2",
    title: "Understanding the New Web Design Trends of 2026",
    author: "David Chen",
    date: "Oct 05, 2026",
    coverImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    introduction: "As we move further into the year, new aesthetics and interactive patterns are emerging. Here's a breakdown of what's currently dominating the web design space.",
  },
  {
    id: "3",
    title: "The Ultimate Guide to Project Management Tools",
    author: "Elena Rodriguez",
    date: "Sep 28, 2026",
    coverImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    introduction: "Choosing the right tools can make or break your team's synergy. We reviewed the top project management software to help you decide what fits your needs.",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative hero-svg-bg pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
            <span className="w-2 h-2 bg-[#00A0E3] rounded-full" />
            <span className="text-[13px] md:text-[14px] font-medium leading-[1.4] tracking-normal text-[#00A0E3]">
              RESOURCES & INSIGHTS
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[54px] leading-[1.15] md:leading-[1.1] font-semibold tracking-normal text-[#1C1C1D] mb-5 md:mb-6 max-w-[800px]">
            Our Latest Blog Stories
          </h1>

          {/* Description */}
          <p className="text-[16px] md:text-[18px] text-[#65656D] leading-[1.5] md:leading-[1.6] max-w-[650px]">
            Explore our curated insights, expert opinions, and the latest news about improving your workflow and building better products.
          </p>
        </div>
      </section>

      {/* Blogs Grid Main Section */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#FAFBFC] border-t border-[#F0F0F0]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogs.map((blog) => (
              <Link 
                href={`/blogs/${blog.id}`} 
                key={blog.id}
                className="group flex flex-col bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full h-[240px] bg-[#F3F4F6] overflow-hidden border-b border-[#E5E7EB]">
                  <Image 
                    src={blog.coverImageUrl} 
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[13px] text-[#65656D] mb-3">
                    <span className="font-medium text-[#1C1C1D]">{blog.author}</span>
                    <span className="w-1 h-1 rounded-full bg-[#DDE7ED]"></span>
                    <span>{blog.date}</span>
                  </div>
                  
                  <h3 className="text-[20px] font-semibold text-[#1C1C1D] leading-tight mb-3 group-hover:text-[#00A0E3] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[15px] text-[#65656D] leading-relaxed line-clamp-3 mb-6 flex-1">
                    {blog.introduction}
                  </p>

                  <div className="flex items-center gap-2 text-[#00A0E3] text-[14px] font-medium group-hover:gap-3 transition-all mt-auto pt-4 border-t border-[#F3F4F6]">
                    Read Full Article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <CTABanner variant="secondary" />
      </div>

      <Footer />
    </div>
  );
}
