"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Link2, Plus, RefreshCw, Search, X } from "lucide-react";

type BlogSection = {
  heading: string;
  content: string;
  imageUrl: string;
};

type BlogPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  coverImageUrl: string;
  introduction: string;
  sections: BlogSection[];
  conclusion: string;
};

type BlogDraft = {
  title: string;
  coverImageUrl: string;
  introduction: string;
  sections: BlogSection[];
  conclusion: string;
};

const inputClassName =
  "w-full h-[40px] rounded-[8px] border border-[#EAECF0] bg-white px-3 text-[14px] text-[#171717] placeholder-[#A0AAB5] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]";

const textareaClassName =
  "w-full rounded-[8px] border border-[#EAECF0] bg-white px-3 py-2.5 text-[14px] text-[#171717] placeholder-[#A0AAB5] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] resize-y";

function createEmptySection(): BlogSection {
  return {
    heading: "",
    content: "",
    imageUrl: "",
  };
}

function createInitialDraft(): BlogDraft {
  return {
    title: "",
    coverImageUrl: "",
    introduction: "",
    sections: [createEmptySection()],
    conclusion: "",
  };
}

function NewBlogModal({
  isOpen,
  draft,
  setDraft,
  onClose,
  onPublish,
}: {
  isOpen: boolean;
  draft: BlogDraft;
  setDraft: React.Dispatch<React.SetStateAction<BlogDraft>>;
  onClose: () => void;
  onPublish: () => void;
}) {
  if (!isOpen) return null;

  const canPublish = draft.title.trim().length > 0 && draft.introduction.trim().length > 0;

  const addSection = () => {
    setDraft((prev) => {
      if (prev.sections.length >= 3) return prev;
      return { ...prev, sections: [...prev.sections, createEmptySection()] };
    });
  };

  const removeSection = (index: number) => {
    setDraft((prev) => {
      if (prev.sections.length <= 1) return prev;
      return {
        ...prev,
        sections: prev.sections.filter((_, idx) => idx !== index),
      };
    });
  };

  const updateSection = (index: number, patch: Partial<BlogSection>) => {
    setDraft((prev) => ({
      ...prev,
      sections: prev.sections.map((section, idx) => {
        if (idx !== index) return section;
        return { ...section, ...patch };
      }),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-dm-sans">
      <div className="absolute inset-0 bg-[#171717]/45" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-[860px] bg-white border border-[#EAECF0] rounded-[16px] shadow-[0_14px_40px_rgba(0,0,0,0.18)] overflow-hidden">
        <div className="h-[58px] px-5 border-b border-[#EAECF0] flex items-center justify-between bg-white">
          <div className="text-[20px] font-semibold text-[#171717] font-inter">New Blog Post</div>
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-[8px] border border-transparent hover:border-[#EAECF0] hover:bg-[#F9FAFB] text-[#525866] inline-flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 max-h-[74vh] overflow-y-auto custom-scrollbar space-y-4">
          <div>
            <div className="text-[13px] font-bold text-[#171717] mb-2">Blog Title *</div>
            <input
              className={inputClassName}
              placeholder="Enter blog title"
              value={draft.title}
              onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
            />
          </div>

          <div>
            <div className="text-[13px] font-bold text-[#171717] mb-2">Cover Image URL</div>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-[#A0AAB5]" />
              <input
                className={`${inputClassName} pl-9`}
                placeholder="https://example.com/image.jpg"
                value={draft.coverImageUrl}
                onChange={(event) => setDraft((prev) => ({ ...prev, coverImageUrl: event.target.value }))}
              />
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold text-[#171717] mb-2">Introduction *</div>
            <textarea
              className={`${textareaClassName} min-h-[96px]`}
              placeholder="Write a compelling introduction..."
              value={draft.introduction}
              onChange={(event) => setDraft((prev) => ({ ...prev, introduction: event.target.value }))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[13px] font-bold text-[#171717]">Sections (up to 3)</div>
              <button
                onClick={addSection}
                disabled={draft.sections.length >= 3}
                className="h-[32px] px-3 rounded-[8px] border border-[#EAECF0] bg-white text-[#525866] text-[13px] font-medium inline-flex items-center gap-1.5 hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {draft.sections.map((section, index) => (
                <div key={index} className="rounded-[10px] border border-[#EAECF0] bg-[#FAFBFC] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[13px] font-bold text-[#171717]">Section {index + 1}</div>
                    {draft.sections.length > 1 ? (
                      <button
                        onClick={() => removeSection(index)}
                        className="h-[26px] px-2.5 rounded-[7px] border border-[#FECACA] text-[#DC2626] text-[12px] font-medium hover:bg-[#FEF2F2]"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>

                  <div className="space-y-2.5">
                    <input
                      className={inputClassName}
                      placeholder="Section heading..."
                      value={section.heading}
                      onChange={(event) => updateSection(index, { heading: event.target.value })}
                    />
                    <textarea
                      className={`${textareaClassName} min-h-[84px]`}
                      placeholder="Section content..."
                      value={section.content}
                      onChange={(event) => updateSection(index, { content: event.target.value })}
                    />
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-[#A0AAB5]" />
                      <input
                        className={`${inputClassName} pl-9`}
                        placeholder="Optional image URL"
                        value={section.imageUrl}
                        onChange={(event) => updateSection(index, { imageUrl: event.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold text-[#171717] mb-2">Conclusion</div>
            <textarea
              className={`${textareaClassName} min-h-[84px]`}
              placeholder="Summarize key points..."
              value={draft.conclusion}
              onChange={(event) => setDraft((prev) => ({ ...prev, conclusion: event.target.value }))}
            />
          </div>
        </div>

        <div className="h-[64px] px-5 border-t border-[#EAECF0] bg-white flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="h-[38px] px-5 rounded-[8px] border border-[#EAECF0] bg-white text-[#525866] text-[14px] font-medium hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
          <button
            onClick={onPublish}
            disabled={!canPublish}
            className="h-[38px] px-5 rounded-[8px] bg-[#00A0E3] hover:bg-[#008CC7] text-white text-[14px] font-semibold inline-flex items-center gap-2 shadow-sm disabled:opacity-55 disabled:cursor-not-allowed"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogsPage() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draft, setDraft] = useState<BlogDraft>(createInitialDraft());

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posts;

    return posts.filter((post) => {
      const text = `${post.title} ${post.author}`.toLowerCase();
      return text.includes(query);
    });
  }, [posts, search]);

  const openModal = () => {
    setDraft(createInitialDraft());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const publishPost = () => {
    const now = new Date();
    const nextPost: BlogPost = {
      id: `${Date.now()}`,
      title: draft.title.trim(),
      author: "Admin",
      date: now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      coverImageUrl: draft.coverImageUrl.trim(),
      introduction: draft.introduction.trim(),
      sections: draft.sections.map((section) => ({
        heading: section.heading.trim(),
        content: section.content.trim(),
        imageUrl: section.imageUrl.trim(),
      })),
      conclusion: draft.conclusion.trim(),
    };

    if (!nextPost.title || !nextPost.introduction) return;

    setPosts((prev) => [nextPost, ...prev]);
    setIsModalOpen(false);
    setDraft(createInitialDraft());
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white flex items-start justify-between gap-4">
        <div>
          <div className="text-[20px] font-bold text-[#171717] leading-tight">Blogs</div>
          <p className="text-[14px] text-[#525866] mt-1">Create, edit, and manage blog posts for the public site.</p>
        </div>

        <button
          onClick={openModal}
          className="h-[40px] px-4 rounded-[8px] bg-[#00A0E3] hover:bg-[#008CC7] text-white text-[14px] font-medium inline-flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </button>
      </div>

      <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#EAECF0]">
          <div className="flex items-center gap-2.5 w-full">
            <div className="relative w-full max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="block w-full pl-9 pr-3 py-[9px] border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-colors"
              />
            </div>

            <button
              onClick={() => setSearch("")}
              className="h-[36px] px-3 rounded-[8px] border border-[#EAECF0] bg-white text-[#525866] text-[13px] font-medium inline-flex items-center gap-1.5 hover:bg-[#F9FAFB]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[13px] text-[#A0AAB5]">
                    No blogs yet. Click New Blog Post to create one.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-medium text-[#1C1C1D]">{post.title}</td>
                    <td className="px-6 py-4 text-[14px] text-[#525866]">{post.author}</td>
                    <td className="px-6 py-4 text-[14px] text-[#525866]">{post.date}</td>
                    <td className="px-6 py-4 text-[14px] text-[#525866]">Static</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewBlogModal
        isOpen={isModalOpen}
        draft={draft}
        setDraft={setDraft}
        onClose={closeModal}
        onPublish={publishPost}
      />
    </div>
  );
}
