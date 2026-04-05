"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Clock3, CreditCard, Download, FileText, Lock, Send } from "lucide-react";
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

type DetailDocument = {
  id: string;
  document_title?: string;
  status?: string;
  payment_status?: string;
  submitted_at?: string | null;
  assigned_editor_id?: string | null;
  completed_at?: string | null;
  updated_at?: string;
  service?: { title?: string } | Array<{ title?: string }> | null;
  assignedEditor?: RelProfile;
  client?: RelProfile;
};

type PaymentSummary = {
  status?: string;
  totalAmountDue?: number | null;
  ratePerWord?: number | null;
  wordCount?: number | null;
  canMakePayment?: boolean;
  canDownloadFinalFile?: boolean;
};

type FileLink = {
  fileName?: string | null;
  fileUrl?: string | null;
  filePath?: string | null;
  isLockedUntilPayment?: boolean;
};

type TimelineStep = {
  key: string;
  label: string;
  status: "completed" | "active" | "pending";
  timestamp?: string | null;
};

type MessageRow = {
  id: string;
  sender_id?: string;
  receiver_id?: string;
  message?: string;
  created_at?: string;
  sender?: RelProfile;
  receiver?: RelProfile;
};

type VersionRow = {
  id: string;
  version_type?: string;
  file_name?: string;
  file_url?: string;
  created_at?: string;
  uploadedBy?: RelProfile;
};

type DocumentDetailPayload = {
  detail: DetailDocument;
  paymentSummary: PaymentSummary;
  originalFile: FileLink | null;
  latestEditorFile: FileLink | null;
  documentTimeline: TimelineStep[];
  messageList: MessageRow[];
  versionHistory: VersionRow[];
  paymentHistory: Array<Record<string, unknown>>;
};

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

function readService(service?: DetailDocument["service"]) {
  if (!service) return "Service not selected";
  if (Array.isArray(service)) return service[0]?.title || "Service not selected";
  return service.title || "Service not selected";
}

function formatDateTime(value?: string | null) {
  if (!value) return "Pending";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatCurrency(value?: number | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value ?? 0));
}

function toScenario(detail: DetailDocument | null, payment: PaymentSummary | null) {
  if (!detail) {
    return {
      badge: "Loading",
      title: "Preparing document",
      description: "We are loading your latest document details.",
      tone: "neutral"
    };
  }

  if (detail.status === "payment_needed") {
    return {
      badge: "Payment Needed",
      title: "Final draft ready for payment",
      description: "Your editor has submitted the final file. Complete payment to unlock the latest version.",
      tone: "warning"
    };
  }

  if (detail.status === "completed" && payment?.canDownloadFinalFile) {
    return {
      badge: "Completed",
      title: "Final file is available",
      description: "Your document has completed editing. You can download the final file and review version history.",
      tone: "success"
    };
  }

  if (detail.status === "in_revision") {
    return {
      badge: "In Revision",
      title: "Revision cycle in progress",
      description: "Revision updates are underway. Continue chatting with the editor for clarifications.",
      tone: "info"
    };
  }

  if (detail.assigned_editor_id) {
    return {
      badge: "Assigned",
      title: "Editor assigned and working",
      description: "Your document is assigned to an editor. Use the chat panel for document-specific communication.",
      tone: "info"
    };
  }

  if (detail.status === "submitted") {
    return {
      badge: "Submitted",
      title: "Awaiting editor assignment",
      description: "Your submission has been received. Our team is matching your document with an editor.",
      tone: "neutral"
    };
  }

  return {
    badge: "Draft",
    title: "Draft is not submitted",
    description: "This document is still in draft state. Submit it to start editing workflow.",
    tone: "neutral"
  };
}

export default function DocumentDetailsPage() {
  const params = useParams<{ id: string }>();
  const documentId = params?.id;

  const [payload, setPayload] = useState<DocumentDetailPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);

  const sessionProfileId = useMemo(() => {
    const session = getStoredAuthSession();
    return typeof session?.user?.profileId === "string" ? session.user.profileId : "";
  }, []);

  const loadDetail = useCallback(async () => {
    if (!documentId) return;

    try {
      setLoading(true);
      const data = await apiGet<DocumentDetailPayload>(`/api/client/documents?documentId=${encodeURIComponent(documentId)}`);
      setPayload(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load document details.");
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  const detail = payload?.detail ?? null;
  const paymentSummary = payload?.paymentSummary ?? null;
  const scenario = toScenario(detail, paymentSummary);

  const editor = readProfile(detail?.assignedEditor);
  const client = readProfile(detail?.client);

  const receiverId = detail?.assigned_editor_id || editor.id || "";
  const canMessage = Boolean(receiverId) && detail?.status !== "payment_needed";

  const sendMessage = async () => {
    if (!documentId || !canMessage || !messageText.trim() || sending) {
      return;
    }

    try {
      setSending(true);
      const created = await apiRequest<MessageRow>("/api/client/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          receiverId,
          message: messageText.trim()
        })
      });

      setPayload((prev) => {
        if (!prev) return prev;
        const nextMessage: MessageRow = {
          ...created,
          sender: prev.detail.client,
          receiver: prev.detail.assignedEditor
        };
        return { ...prev, messageList: [...prev.messageList, nextMessage] };
      });
      setMessageText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full font-dm-sans p-6 text-[14px] text-[#525866]">
        Loading document details...
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="w-full font-dm-sans p-6 text-[14px] text-[#525866]">
        Document not found.
      </div>
    );
  }

  return (
    <div className="w-full font-dm-sans bg-white min-h-[calc(100vh-76px)] flex flex-col">
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <div className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">Document Details</div>
        <p className="text-[#78788D] text-[14px]">
          {detail.document_title || "Untitled Document"} - {readService(detail.service)}
        </p>
      </div>

      {error ? (
        <div className="mx-4 mt-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

      <div className="px-4 mx-2 mt-4 bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-[12px] overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#EAF6FB] flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-[#00A0E3]" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[18px] font-bold text-[#171717] leading-tight">{scenario.title}</div>
              <p className="text-[#8A94A6] text-[14px] mt-1">{scenario.description}</p>
            </div>
          </div>
          <span
            className={`text-[12px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${
              scenario.tone === "warning"
                ? "bg-[#FFF0E6] text-[#F97316]"
                : scenario.tone === "success"
                  ? "bg-[#E6F8EC] text-[#00A859]"
                  : scenario.tone === "info"
                    ? "bg-[#EFF6FF] text-[#3B82F6]"
                    : "bg-[#F4F5F7] text-[#525866]"
            }`}
          >
            {scenario.badge}
          </span>
        </div>

        {detail.status === "payment_needed" ? (
          <div className="px-6 py-4 border-b border-gray-100 bg-[#FFFBF8] flex flex-wrap items-center gap-5">
            <div className="text-[14px] text-[#171717]">
              Amount Due: <span className="font-bold">{formatCurrency(paymentSummary?.totalAmountDue)}</span>
            </div>
            <div className="text-[14px] text-[#171717]">
              Word Count: <span className="font-bold">{Number(paymentSummary?.wordCount ?? 0).toLocaleString()}</span>
            </div>
            <div className="text-[14px] text-[#171717]">
              Rate/Word: <span className="font-bold">{formatCurrency(paymentSummary?.ratePerWord)}</span>
            </div>
            <Link
              href="/user/payments"
              className="ml-auto bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-[8px] text-[13px] font-semibold inline-flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Make Payment
            </Link>
          </div>
        ) : null}

        <div className="flex flex-col lg:flex-row min-h-[640px]">
          <div className="w-full lg:w-[390px] border-r border-gray-100 lg:border-b-0 border-b p-6 flex flex-col gap-8">
            <div>
              <div className="text-[15px] font-bold text-[#171717] mb-5">Document Timeline</div>
              <div className="relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-[#EAECF0]" />
                <div className="space-y-5">
                  {(payload?.documentTimeline || []).map((step) => (
                    <div key={step.key} className="relative z-10 flex items-start gap-4">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          step.status === "completed"
                            ? "bg-[#00A859]"
                            : step.status === "active"
                              ? "bg-[#3B82F6]"
                              : "bg-white border border-[#D1D5DB]"
                        }`}
                      >
                        {step.status === "pending" ? (
                          <Clock3 className="w-3.5 h-3.5 text-[#A0AAB5]" strokeWidth={2.5} />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-bold text-[#171717] leading-tight">{step.label}</div>
                        <div className="text-[12px] text-[#8A94A6] mt-0.5">{formatDateTime(step.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[15px] font-bold text-[#171717] mb-3">Files</div>

              <div className="space-y-3">
                <div className="border border-[#EAECF0] bg-[#F4FAFD] rounded-[8px] p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[12px] text-[#8A94A6] mb-0.5">Original File</div>
                    <div className="text-[13px] font-semibold text-[#171717] truncate">
                      {payload?.originalFile?.fileName || "No original file uploaded"}
                    </div>
                  </div>
                  {payload?.originalFile?.fileUrl ? (
                    <a
                      href={payload.originalFile.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00A0E3] hover:text-[#008BC5] p-1"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>

                <div className="border border-[#EAECF0] bg-[#FAFAFB] rounded-[8px] p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[12px] text-[#8A94A6] mb-0.5">Latest Editor File</div>
                    <div className="text-[13px] font-semibold text-[#171717] truncate">
                      {payload?.latestEditorFile?.fileName || "No editor submission yet"}
                    </div>
                    {payload?.latestEditorFile?.isLockedUntilPayment ? (
                      <div className="mt-1 text-[11px] text-[#A0AAB5] inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked until payment
                      </div>
                    ) : null}
                  </div>
                  {payload?.latestEditorFile?.fileUrl && !payload.latestEditorFile.isLockedUntilPayment ? (
                    <a
                      href={payload.latestEditorFile.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00A0E3] hover:text-[#008BC5] p-1"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[15px] font-bold text-[#171717] mb-3">Version History</div>
              <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {(payload?.versionHistory || []).slice(0, 8).map((version) => (
                  <div key={version.id} className="border border-[#EAECF0] rounded-[8px] px-3 py-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px] text-[#171717] font-medium truncate">{version.file_name || "Version"}</div>
                      <div className="text-[11px] text-[#8A94A6]">
                        {(version.version_type || "version").replaceAll("_", " ")} - {formatDateTime(version.created_at)}
                      </div>
                    </div>
                    {version.file_url ? (
                      <a href={version.file_url} target="_blank" rel="noreferrer" className="text-[#00A0E3] text-[12px] font-semibold hover:underline">
                        Open
                      </a>
                    ) : null}
                  </div>
                ))}
                {!payload?.versionHistory?.length ? (
                  <div className="text-[13px] text-[#8A94A6]">No versions available yet.</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col bg-white">
            <div className="h-[64px] px-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-[15px] font-bold text-[#171717]">Document Chat</div>
                <div className="text-[12px] text-[#8A94A6]">{editor.name !== "Unknown" ? `Editor: ${editor.name}` : "Editor not assigned yet"}</div>
              </div>
              <div className="text-[12px] text-[#8A94A6]">Client: {client.name}</div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white">
              {(payload?.messageList || []).map((msg) => {
                const from = readProfile(msg.sender);
                const mine =
                  (Boolean(receiverId) && msg.sender_id !== receiverId) ||
                  (Boolean(sessionProfileId) && msg.sender_id === sessionProfileId) ||
                  (Boolean(client.id) && msg.sender_id === client.id);
                return (
                  <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                      <div className={`text-[12px] mb-1 ${mine ? "text-[#008BC5]" : "text-[#525866]"}`}>{mine ? "You" : from.name}</div>
                      <div
                        className={`rounded-[12px] px-4 py-3 text-[14px] leading-relaxed ${
                          mine
                            ? "bg-[#00A0E3] text-white rounded-tr-[4px]"
                            : "bg-[#F8FAFC] text-[#171717] border border-[#EAECF0] rounded-tl-[4px]"
                        }`}
                      >
                        {msg.message || ""}
                      </div>
                      <div className="text-[11px] text-[#A0AAB5] mt-1">{formatDateTime(msg.created_at)}</div>
                    </div>
                  </div>
                );
              })}

              {!payload?.messageList?.length ? (
                <div className="text-[13px] text-[#8A94A6]">
                  {canMessage
                    ? "No messages yet. Start the conversation with your editor."
                    : "Messaging is available after editor assignment and before payment lock."}
                </div>
              ) : null}
            </div>

            <div className="px-6 py-5 border-t border-gray-100 shrink-0 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value.slice(0, 5000))}
                  disabled={!canMessage || sending}
                  placeholder={canMessage ? "Type your message..." : "Messaging unavailable for this phase"}
                  className="flex-1 border border-gray-100 rounded-[8px] px-5 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors shadow-sm disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                />
                <button
                  onClick={() => void sendMessage()}
                  disabled={!canMessage || sending || !messageText.trim()}
                  className="w-[46px] h-[46px] bg-[#00A0E3] rounded-[8px] flex items-center justify-center shrink-0 hover:bg-[#008bc5] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-[18px] h-[18px] text-white ml-0.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}