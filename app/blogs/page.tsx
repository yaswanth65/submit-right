"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Newsletter } from "@/components/landing/Newsletter";
import { apiGet } from "@/lib/client-api";

type BlogCard = {
  id: string;
  title: string;
  authorName?: string | null;
  coverImageUrl?: string | null;
  introduction: string;
  publishedAt?: string | null;
  createdAt?: string;
};

type PublicBlogsResponse = {
  rows: unknown[];
  cards: BlogCard[];
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiGet<PublicBlogsResponse>("/api/blogs");
        if (cancelled) return;
        setBlogs(data.cards ?? []);
      } catch (loadError) {
        if (cancelled) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load blogs");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative hero-svg-bg pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="landing-shell relative z-10 flex flex-col items-center text-center">
          
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
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAFBFC] border-t border-[#F0F0F0]">
        <div className="landing-shell">
          {isLoading ? <div className="text-center text-[15px] text-[#65656D] py-12">Loading blogs...</div> : null}

          {!isLoading && error ? <div className="text-center text-[15px] text-[#B42318] py-12">{error}</div> : null}

          {!isLoading && !error && blogs.length === 0 ? (
            <div className="text-center text-[15px] text-[#65656D] py-12">No blog posts are available right now.</div>
          ) : null}

          {!isLoading && !error && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  href={`/blogs/${blog.id}`}
                  key={blog.id}
                  className="group flex flex-col bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-full h-[240px] bg-[#F3F4F6] overflow-hidden border-b border-[#E5E7EB]">
                    {blog.coverImageUrl ? (
                      <Image
                        src={blog.coverImageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[13px] font-medium text-[#98A2B3]">No Cover Image</div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[13px] text-[#65656D] mb-3">
                      <span className="font-medium text-[#1C1C1D]">{blog.authorName || "Submit Right"}</span>
                      <span className="w-1 h-1 rounded-full bg-[#DDE7ED]"></span>
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>

                    <h3 className="text-[20px] font-semibold text-[#1C1C1D] leading-tight mb-3 group-hover:text-[#00A0E3] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-[15px] text-[#65656D] leading-relaxed line-clamp-3 mb-6 flex-1">{blog.introduction}</p>

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
          ) : null}
        </div>
      </section>

               <Newsletter />


      <Footer />
    </div>
  );
}
