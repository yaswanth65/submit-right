"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CTABanner } from "@/components/landing/CTABanner";
import { apiGet } from "@/lib/client-api";

type BlogPost = {
  id: string;
  title: string;
  authorName?: string | null;
  coverImageUrl?: string | null;
  introduction: string;
  sections: Array<{
    heading: string;
    content: string;
    imageUrl?: string | null;
  }>;
  conclusion?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function BlogPostPage() {
  const params = useParams<{ id: string | string[] }>();
  const blogId = useMemo(() => {
    if (!params?.id) return "";
    return Array.isArray(params.id) ? params.id[0] : params.id;
  }, [params]);

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogId) {
      setError("Invalid blog id");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadBlog = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiGet<BlogPost>(`/api/blogs/${encodeURIComponent(blogId)}`);
        if (cancelled) return;
        setBlog(data);
      } catch (loadError) {
        if (cancelled) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load blog post");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadBlog();

    return () => {
      cancelled = true;
    };
  }, [blogId]);

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

          {isLoading ? <div className="text-[15px] text-[#65656D]">Loading post...</div> : null}
          {!isLoading && error ? <div className="text-[15px] text-[#B42318]">{error}</div> : null}

          {!isLoading && !error && blog ? (
            <>
              <div className="flex items-center gap-3 text-[14px] text-[#65656D] mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EAF5FB] text-[#00A0E3] flex items-center justify-center font-bold text-[10px]">
                    {(blog.authorName || "S").charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-[#1C1C1D]">{blog.authorName || "Submit Right"}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-[#DDE7ED]"></span>
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>

              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] font-semibold text-[#1C1C1D] mb-6">{blog.title}</h1>
            </>
          ) : null}

        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="landing-shell max-w-[900px]">
          {!isLoading && !error && blog ? (
            <>
              {blog.coverImageUrl ? (
                <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-[20px] overflow-hidden mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E5E7EB]">
                  <Image src={blog.coverImageUrl} alt={blog.title} fill className="object-cover" priority />
                </div>
              ) : null}

              <div className="prose prose-lg max-w-none text-[#4B5563] mb-12">
                <p className="text-[18px] sm:text-[20px] leading-[1.7] font-medium text-[#1C1C1D]">{blog.introduction}</p>
              </div>

              <div className="space-y-12">
                {(blog.sections || []).map((section, idx) => (
                  <div key={`${section.heading}-${idx}`}>
                    <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#1C1C1D] mb-5">{section.heading}</h2>
                    <p className="text-[16px] sm:text-[18px] leading-[1.7] text-[#4B5563] mb-6 whitespace-pre-wrap">{section.content}</p>
                    {section.imageUrl ? (
                      <div className="relative w-full h-[300px] sm:h-[400px] rounded-[16px] overflow-hidden border border-[#E5E7EB] mt-6">
                        <Image src={section.imageUrl} alt={section.heading} fill className="object-cover" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {blog.conclusion ? (
                <div className="mt-12 pt-10 border-t border-[#F0F0F0]">
                  <h3 className="text-[20px] font-semibold text-[#1C1C1D] mb-4">Conclusion</h3>
                  <p className="text-[16px] sm:text-[18px] leading-[1.7] text-[#4B5563]">{blog.conclusion}</p>
                </div>
              ) : null}
            </>
          ) : null}

        </div>
      </section>

      <div className="relative z-20">
        <CTABanner variant="secondary" />
      </div>

      <Footer />
    </div>
  );
}
