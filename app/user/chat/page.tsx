"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, FileText, Send } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type EditorProfile = {
  id?: string;
  full_name?: string;
  email?: string;
};

type MessageThread = {
  id: string;
  document_title?: string;
  assigned_editor_id?: string | null;
  profiles?: EditorProfile | EditorProfile[] | null;
  status?: string;
};

function readEditor(profile?: EditorProfile | EditorProfile[] | null) {
  if (!profile) {
    return { name: "Editor", email: "" };
  }

  const resolved = Array.isArray(profile) ? profile[0] : profile;
  return {
    name: resolved?.full_name || "Editor",
    email: resolved?.email || ""
  };
}

function statusLabel(status?: string) {
  switch (status) {
    case "being_edited":
      return "Being Edited";
    case "in_revision":
      return "In Revision";
    case "submitted":
      return "Submitted";
    case "completed":
      return "Completed";
    default:
      return "In Progress";
  }
}

export default function MessagesPage() {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<MessageThread[]>("/api/client/messages");
        if (active) {
          setThreads(data);
          setActiveId(data[0]?.id ?? null);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load message threads.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const filteredThreads = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return threads;
    }

    return threads.filter((item) => {
      const editor = readEditor(item.profiles);
      return (item.document_title || "").toLowerCase().includes(term) || editor.name.toLowerCase().includes(term);
    });
  }, [threads, searchTerm]);

  const activeThread = useMemo(
    () => filteredThreads.find((item) => item.id === activeId) || filteredThreads[0] || null,
    [filteredThreads, activeId]
  );

  const activeEditor = readEditor(activeThread?.profiles);

  return (
    <div className="w-full h-[calc(100vh-76px)] flex flex-col font-dm-sans bg-white">
      
      {/* --- PAGE HEADER --- */}
      {/* <div className="px-6 lg:px-8 py-3 border-b border-[#EAECF0] shrink-0">
        <h1 className="text-[28px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Messages
        </h1>
        <p className="text-[#8A94A6] text-[15px]">
          Chat with your editor, review feedback, and manage document updates in one place.
        </p>
      </div> */}
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">
        Messages
        </h1>
        <p className="text-[#78788D] text-[14px]">
        Chat with your editor, review feedback, and manage document updates in one place.
        </p>
      </div>

      {error ? (
        <div className="mx-4 mt-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

      {/* --- MAIN INTERFACE --- */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        
        {/* LEFT SIDEBAR: Threads */}
        <div className="w-full lg:w-[380px] border-r border-[#EAECF0] flex flex-col shrink-0">
          <div className="p-4 px-5 lg:pb-5 border-b lg:border-none border-[#EAECF0]">
            <h2 className="text-[20px] font-semibold text-[#171717] mb-5">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search..." 
                className="w-full pl-[40px] pr-4 py-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredThreads.map((thread) => {
              const editor = readEditor(thread.profiles);
              const isActive = activeThread?.id === thread.id;
              return (
              <div 
                key={thread.id}
                onClick={() => setActiveId(thread.id)}
                className={`p-3 rounded-[12px] border cursor-pointer transition-all duration-200 ${
                  isActive 
                    ? "border-[#00A0E3] bg-[#F4FAFD] shadow-[0_2px_8px_rgba(0,160,227,0.12)]" 
                    : "border-[#EAECF0] bg-white hover:border-[#A0AAB5] hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[14px] font-medium text-[#171717] truncate pr-2">
                    {thread.document_title || "Untitled Document"}
                  </h4>
                  <span className="text-[12px] text-[#A0AAB5] shrink-0 mt-0.5 font-medium">
                    {statusLabel(thread.status)}
                  </span>
                </div>
                <p className="text-[#00A0E3] text-[12px] font-medium mb-2">
                  {editor.name}
                </p>
                <p className="text-[#8A94A6] text-[14px] truncate">
                  {editor.email || "Assigned editor"}
                </p>
              </div>
            );
            })}
            {!loading && filteredThreads.length === 0 ? (
              <p className="text-[14px] text-[#8A94A6]">No active threads found.</p>
            ) : null}
          </div>
        </div>

        {/* RIGHT AREA: Active Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Chat Header */}
          <div className="h-[96px] px-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] bg-[#EAF6FB] rounded-[12px] flex items-center justify-center shrink-0">
                <FileText className="w-[24px] h-[24px] text-[#00A0E3]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold  text-[#171717] mb-1">{activeThread?.document_title || "No thread selected"}</h3>
                <p className="text-[14px] text-[#8A94A6] font-medium">Editor: {activeEditor.name}</p>
              </div>
            </div>
            <span className="bg-[#EFF6FF] text-[#00A0E3] text-[14px] font-bold px-4 py-2 rounded-full border border-[#DBEAFE]">
              {statusLabel(activeThread?.status)}
            </span>
          </div>
          

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 flex flex-col bg-white">
            {activeThread ? (
              <div className="max-w-[85%] lg:max-w-[75%] border border-[#EAECF0] bg-[#F9FAFB] rounded-[16px] p-4 text-[14px] text-[#525866] leading-relaxed">
                Live thread listing is connected. Message history requires a dedicated read endpoint per document conversation.
              </div>
            ) : (
              <p className="text-[14px] text-[#8A94A6]">No assigned documents are currently available for messaging.</p>
            )}
          </div>

          {/* Chat Input */}
          <div className="px-6 lg:px-8 py-5 border-t border-[#EAECF0] shrink-0 bg-white">
            <div className="flex gap-3">
              <input 
                type="text" 
                disabled
                placeholder="Type your message..." 
                className="flex-1 border border-[#EAECF0] rounded-[8px] px-5 py-3.5 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
              />
              <button disabled className="w-[50px] h-[50px] bg-[#A0AAB5] rounded-[8px] flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-not-allowed">
                <Send className="w-[20px] h-[20px] text-white ml-0.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}