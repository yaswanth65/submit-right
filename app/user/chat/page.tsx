"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, FileText, Send, ArrowLeft } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";
import { getStoredAuthSession } from "@/lib/client-auth";
import { formatDateTime } from "@/lib/utils";

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

type RelProfile =
  | {
      id?: string;
      full_name?: string;
      email?: string;
    }
  | Array<{
      id?: string;
      full_name?: string;
      email?: string;
    }>
  | null;

type MessageRow = {
  id: string;
  sender_id?: string;
  receiver_id?: string;
  message?: string;
  created_at?: string;
  sender?: RelProfile;
  receiver?: RelProfile;
};

type DetailPayload = {
  detail: {
    id: string;
    document_title?: string;
    status?: string;
    assigned_editor_id?: string | null;
    assignedEditor?: RelProfile;
    client?: RelProfile;
  };
  messageList: MessageRow[];
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

function readProfile(profile?: RelProfile) {
  if (!profile) {
    return { id: "", name: "Unknown", email: "" };
  }

  if (Array.isArray(profile)) {
    return {
      id: profile[0]?.id || "",
      name: profile[0]?.full_name || "Unknown",
      email: profile[0]?.email || ""
    };
  }

  return {
    id: profile.id || "",
    name: profile.full_name || "Unknown",
    email: profile.email || ""
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
  const [activeMessages, setActiveMessages] = useState<MessageRow[]>([]);
  const [activeDetail, setActiveDetail] = useState<DetailPayload["detail"] | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const profileId = useMemo(() => {
    const session = getStoredAuthSession();
    return typeof session?.user?.profileId === "string" ? session.user.profileId : "";
  }, []);

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

  useEffect(() => {
    const resolvedActiveId = activeId || filteredThreads[0]?.id || null;
    if (!resolvedActiveId) {
      setActiveMessages([]);
      setActiveDetail(null);
      return;
    }

    let active = true;
    const loadConversation = async () => {
      try {
        const detail = await apiGet<DetailPayload>(`/api/client/documents?documentId=${encodeURIComponent(resolvedActiveId)}`);
        if (!active) return;
        setActiveMessages(detail.messageList || []);
        setActiveDetail(detail.detail || null);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load conversation.");
      }
    };

    void loadConversation();
    return () => {
      active = false;
    };
  }, [activeId, filteredThreads]);

  const activeThread = useMemo(() => {
    const source = filteredThreads.find((item) => item.id === activeId) || filteredThreads[0] || null;
    if (!source && activeDetail) {
      return {
        id: activeDetail.id,
        document_title: activeDetail.document_title,
        assigned_editor_id: activeDetail.assigned_editor_id,
        status: activeDetail.status,
        profiles: activeDetail.assignedEditor
      } as MessageThread;
    }
    return source;
  }, [filteredThreads, activeId, activeDetail]);

  const activeEditor = readEditor(activeThread?.profiles);

  const activeEditorId = useMemo(() => {
    const fromThread = activeThread?.assigned_editor_id;
    if (fromThread) return fromThread;
    return readProfile(activeDetail?.assignedEditor).id;
  }, [activeThread?.assigned_editor_id, activeDetail?.assignedEditor]);

  const activeClientId = useMemo(() => readProfile(activeDetail?.client).id, [activeDetail?.client]);

  const canSend = Boolean(activeThread?.id && activeEditorId) && activeThread?.status !== "payment_needed";

  const sendMessage = async () => {
    if (!activeThread?.id || !activeEditorId || !messageText.trim() || sending) {
      return;
    }

    try {
      setSending(true);
      const created = await apiRequest<MessageRow>("/api/client/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: activeThread.id,
          receiverId: activeEditorId,
          message: messageText.trim()
        })
      });

      setActiveMessages((prev) => [
        ...prev,
        {
          ...created,
          sender: activeDetail?.client,
          receiver: activeDetail?.assignedEditor
        }
      ]);
      setMessageText("");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const activeStatus = statusLabel(activeThread?.status);

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
        <div className={`w-full lg:w-[380px] border-r border-[#EAECF0] shrink-0 flex-col ${activeId ? 'hidden lg:flex' : 'flex'}`}>
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
        <div className={`flex-1 flex-col min-w-0 ${!activeId ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Chat Header */}
          <div className="h-[96px] px-4 lg:px-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 lg:gap-4">
              <button 
                onClick={() => setActiveId(null)} 
                className="lg:hidden p-2 -ml-2 text-[#8A94A6] hover:text-[#171717]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] bg-[#EAF6FB] rounded-[12px] flex items-center justify-center shrink-0">
                <FileText className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#00A0E3]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#171717] mb-0.5 lg:mb-1">{activeThread?.document_title || "No thread selected"}</h3>
                <p className="text-[13px] lg:text-[14px] text-[#8A94A6] font-medium">Editor: {activeEditor.name}</p>
              </div>
            </div>
            <span className="bg-[#EFF6FF] text-[#00A0E3] text-[12px] lg:text-[14px] font-bold px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-[#DBEAFE]">
              {activeStatus}
            </span>
          </div>
          

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 flex flex-col bg-white">
            {activeMessages.map((message) => {
              const sender = readProfile(message.sender);
              const mine =
                (Boolean(activeEditorId) && message.sender_id !== activeEditorId) ||
                (Boolean(profileId) && message.sender_id === profileId) ||
                (Boolean(activeClientId) && message.sender_id === activeClientId);
              return (
                <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] lg:max-w-[75%] flex flex-col ${mine ? "items-end" : "items-start"}`}>
                    <span className={`text-[12px] mb-1 ${mine ? "text-[#00A0E3]" : "text-[#525866]"}`}>
                      {mine ? "You" : sender.name}
                    </span>
                    <div
                      className={`p-4 text-[14px] leading-relaxed rounded-[14px] ${
                        mine
                          ? "bg-[#00A0E3] text-white rounded-tr-[4px]"
                          : "bg-[#F8FAFC] border border-[#EAECF0] text-[#171717] rounded-tl-[4px]"
                      }`}
                    >
                      {message.message || ""}
                    </div>
                    <span className="text-[11px] text-[#A0AAB5] mt-1">
                      {formatDateTime(message.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}

            {activeThread && activeMessages.length === 0 ? (
              <div className="max-w-[85%] lg:max-w-[75%] border border-[#EAECF0] bg-[#F9FAFB] rounded-[16px] p-4 text-[14px] text-[#525866] leading-relaxed">
                No messages yet for this document. Start the conversation with your editor.
              </div>
            ) : null}

            {!activeThread ? (
              <p className="text-[14px] text-[#8A94A6]">No assigned documents are currently available for messaging.</p>
            ) : null}
          </div>

          {/* Chat Input */}
          <div className="px-6 lg:px-8 py-5 border-t border-[#EAECF0] shrink-0 bg-white">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={messageText}
                onChange={(event) => setMessageText(event.target.value.slice(0, 5000))}
                disabled={!canSend || sending}
                placeholder="Type your message..." 
                className="flex-1 border border-[#EAECF0] rounded-[8px] px-5 py-3.5 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
              />
              <button
                disabled={!canSend || sending || !messageText.trim()}
                onClick={() => void sendMessage()}
                className="w-[50px] h-[50px] bg-[#00A0E3] disabled:bg-[#A0AAB5] rounded-[8px] flex items-center justify-center shrink-0 transition-colors shadow-sm disabled:cursor-not-allowed"
              >
                <Send className="w-[20px] h-[20px] text-white ml-0.5" strokeWidth={2.5} />
              </button>
            </div>
            {!canSend && activeThread ? (
              <p className="text-[12px] text-[#A0AAB5] mt-2">Messaging is disabled for this phase.</p>
            ) : null}
          </div>
          
        </div>

      </div>
    </div>
  );
}