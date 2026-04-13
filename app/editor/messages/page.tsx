"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Send, FileText } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";
import { getStoredAuthSession } from "@/lib/client-auth";

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

type EditorMessage = {
  id: string;
  document_id?: string;
  sender_id?: string;
  receiver_id?: string;
  message?: string;
  created_at?: string;
  sender?: RelProfile;
  receiver?: RelProfile;
};

type EditorDocument = {
  id: string;
  client_id?: string;
  document_title?: string;
  status?: string;
  services?: { title?: string } | Array<{ title?: string }> | null;
  profiles?: { full_name?: string; email?: string } | Array<{ full_name?: string; email?: string }> | null;
};

type DetailPayload = {
  assignmentOverview: EditorDocument;
  messageList: EditorMessage[];
};

function readService(services?: EditorDocument["services"]) {
  if (!services) return "Service";
  if (Array.isArray(services)) return services[0]?.title || "Service";
  return services.title || "Service";
}

function readProfile(profile?: EditorDocument["profiles"] | RelProfile) {
  if (!profile) return { id: "", name: "Client", email: "" };
  const value = Array.isArray(profile) ? profile[0] : profile;
  const valueWithId = value as { id?: string; full_name?: string; email?: string } | undefined;
  return {
    id: valueWithId?.id || "",
    name: value?.full_name || "Client",
    email: value?.email || ""
  };
}

function formatRelative(date?: string) {
  if (!date) return "-";
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatDateTime(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
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

export default function EditorMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<EditorDocument[]>([]);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<EditorMessage[]>([]);
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

    const loadDocuments = async () => {
      try {
        setLoading(true);
        const documentData = await apiGet<EditorDocument[]>("/api/editor/documents");

        if (active) {
          setDocuments(documentData || []);
          setActiveDocumentId((documentData || [])[0]?.id ?? null);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load messages.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadDocuments();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!activeDocumentId) {
      setActiveMessages([]);
      return;
    }

    let active = true;
    const loadThread = async () => {
      try {
        const detail = await apiGet<DetailPayload>(`/api/editor/documents/${encodeURIComponent(activeDocumentId)}`);
        if (!active) return;
        setActiveMessages(detail.messageList || []);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load conversation.");
      }
    };

    void loadThread();
    return () => {
      active = false;
    };
  }, [activeDocumentId]);

  const filteredDocs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return documents;

    return documents.filter((doc) => {
      const client = readProfile(doc.profiles);
      return (
        (doc.document_title || "").toLowerCase().includes(term) ||
        client.name.toLowerCase().includes(term) ||
        readService(doc.services).toLowerCase().includes(term)
      );
    });
  }, [documents, searchTerm]);

  const activeDocument = useMemo(
    () => filteredDocs.find((doc) => doc.id === activeDocumentId) || filteredDocs[0] || null,
    [filteredDocs, activeDocumentId]
  );

  const lastMessageByDoc = useMemo(() => {
    const map = new Map<string, EditorMessage>();
    for (const message of activeMessages) {
      if (!message.document_id) continue;
      map.set(message.document_id, message);
    }
    return map;
  }, [activeMessages]);

  const canSend = Boolean(activeDocument?.id && activeDocument.client_id) && activeDocument?.status !== "payment_needed";

  const sendMessage = async () => {
    if (!activeDocument?.id || !activeDocument.client_id || !messageText.trim() || sending) {
      return;
    }

    try {
      setSending(true);
      const created = await apiRequest<EditorMessage>("/api/editor/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: activeDocument.id,
          receiverId: activeDocument.client_id,
          message: messageText.trim()
        })
      });

      const detail = await apiGet<DetailPayload>(`/api/editor/documents/${encodeURIComponent(activeDocument.id)}`);
      setActiveMessages(detail.messageList || [created]);
      setMessageText("");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const activeClient = readProfile(activeDocument?.profiles);

  return (
    <div className="space-y-6 w-full font-dm-sans animate-in fade-in duration-300">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Messages</div>
        <p className="text-[14px] text-[#525866] mt-1">Chat with your clients and keep communication linked to each document.</p>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="flex flex-col min-h-[calc(100vh-250px)] w-full bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
        <div className="flex flex-1 min-h-0 overflow-hidden flex-col lg:flex-row">
          <div className="w-full lg:w-[360px] lg:min-w-[360px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#EAECF0] flex flex-col bg-[#FFFFFF]">
            <div className="p-5 border-b border-[#EAECF0] flex-shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[14px] font-semibold text-[#171717]">Conversations</div>
                <div className="text-[12px] text-[#8A94A6]">{filteredDocs.length}</div>
              </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search documents or clients..."
                className="w-full h-[40px] pl-9 pr-4 border border-[#EAECF0] rounded-[8px] text-[13px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
            {filteredDocs.map((doc) => {
              const client = readProfile(doc.profiles);
              const last = lastMessageByDoc.get(doc.id);
              const isActive = (activeDocument?.id || activeDocumentId) === doc.id;

              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveDocumentId(doc.id)}
                  className={`w-full text-left p-4 rounded-[12px] transition-colors ${
                    isActive
                      ? "bg-[#F0F9FF] border border-[#00A0E3]"
                      : "bg-[#F9FAFB] border border-transparent hover:bg-[#F3F4F6]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[14px] font-bold text-[#171717] truncate pr-2">
                      {doc.document_title || `Document ${doc.id.slice(0, 8)}`}
                    </div>
                    <span className="text-[11px] text-[#A0AAB5]">{formatRelative(last?.created_at)}</span>
                  </div>
                  <div className="text-[12px] text-[#00A0E3] mb-2 font-medium">
                    {client.name} <span className="text-[#A0AAB5] mx-1">-</span> {readService(doc.services)}
                  </div>
                  <p className={`text-[13px] truncate ${isActive ? "text-[#525866]" : "text-[#A0AAB5]"}`}>
                    {last?.message || "No messages yet"}
                  </p>
                </button>
              );
            })}
            {!loading && filteredDocs.length === 0 ? (
              <p className="text-[13px] text-[#8A94A6] px-2 py-2">No conversations found.</p>
            ) : null}
          </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col bg-[#FFFFFF]">
          <div className="px-6 py-4 border-b border-[#EAECF0] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#E0F6FF] text-[#00A0E3] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[18px] font-bold text-[#171717] mb-0.5">{activeDocument?.document_title || "No conversation selected"}</div>
                <div className="text-[13px] text-[#A0AAB5] font-medium">
                  {activeClient.name || "Client"} <span className="mx-1.5">-</span> {readService(activeDocument?.services)}
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-[#F0F9FF] border border-[#BFDBFE] text-[#00A0E3] text-[13px] font-semibold rounded-full">
              {statusLabel(activeDocument?.status)}
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
            {activeMessages.map((msg) => {
              const sender = readProfile(msg.sender);
              const mine =
                (Boolean(activeDocument?.client_id) && msg.sender_id !== activeDocument.client_id) ||
                (Boolean(profileId) && msg.sender_id === profileId);

              return (
                <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] flex flex-col ${mine ? "items-end" : "items-start"}`}>
                    <span className={`text-[12px] mb-1 px-1 ${mine ? "text-[#00A0E3]" : "text-[#525866]"}`}>
                      {mine ? "You" : sender.name}
                    </span>
                    <div
                      className={`p-4 rounded-[12px] text-[14px] ${
                        mine
                          ? "bg-[#00A0E3] text-white rounded-tr-[4px]"
                          : "bg-[#F9FAFB] border border-[#EAECF0] text-[#171717] rounded-tl-[4px]"
                      }`}
                    >
                      <p className="text-[14px] leading-relaxed">{msg.message || ""}</p>
                    </div>
                    <span className="text-[11px] text-[#A0AAB5] mt-1.5 px-1">{formatDateTime(msg.created_at)}</span>
                  </div>
                </div>
              );
            })}

            {!loading && activeDocument && activeMessages.length === 0 ? (
              <p className="text-[13px] text-[#8A94A6]">No messages found for this document.</p>
            ) : null}
          </div>

          <div className="p-5 border-t border-[#EAECF0] bg-[#FFFFFF]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value.slice(0, 5000))}
                disabled={!canSend || sending}
                placeholder={canSend ? "Type your message..." : "Messaging unavailable for this document"}
                className="w-full pl-4 pr-14 py-3.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
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
                className="absolute right-3 p-2 bg-[#00A0E3] disabled:bg-[#A0AAB5] text-white rounded-[6px] transition-colors disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
