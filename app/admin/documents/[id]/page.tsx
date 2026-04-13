"use client";

import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, FileText, Download, Calendar, X } from "lucide-react";
import { useParams } from "next/navigation";
import { apiGet, apiRequest } from "@/lib/client-api";
import { AssignEditorModal } from "@/components/AssignEditorModal";

type DetailProfile = { full_name?: string; email?: string } | Array<{ full_name?: string; email?: string }> | null;
type DetailService = { title?: string } | Array<{ title?: string }> | null;

type DocumentDetail = {
  id: string;
  document_title?: string;
  status?: string;
  word_count?: number;
  created_at?: string;
  deadline_at?: string;
  revision_count?: number;
  assigned_editor_id?: string | null;
  profiles?: DetailProfile;
  services?: DetailService;
};

type MessageItem = {
  id: string;
  message?: string;
  created_at?: string;
  sender_id?: string;
};

type AuditItem = {
  id: string;
  action?: string;
  actor_name?: string;
  created_at?: string;
};

type VersionItem = {
  id: string;
  file_name?: string;
  file_size?: number;
  file_url?: string;
  created_at?: string;
};

type DetailPayload = {
  detail: DocumentDetail;
  communicationHistory: MessageItem[];
  systemAuditTrail: AuditItem[];
  fileVersionTimeline: VersionItem[];
};

type EditorRow = {
  id: string;
  full_name?: string | null;
  email?: string | null;
};

function readProfile(profile?: DetailProfile) {
  if (!profile) {
    return { name: "Student", email: "-" };
  }

  const value = Array.isArray(profile) ? profile[0] : profile;
  return {
    name: value?.full_name || "Student",
    email: value?.email || "-"
  };
}

function readService(service?: DetailService) {
  if (!service) {
    return "Service";
  }

  if (Array.isArray(service)) {
    return service[0]?.title || "Service";
  }

  return service.title || "Service";
}

function formatDate(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function formatDateTime(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function toLocalDateTimeInput(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

function formatBytes(size?: number) {
  if (!size || size <= 0) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function statusLabel(status?: string) {
  switch (status) {
    case "being_edited":
      return "In Progress";
    case "in_revision":
      return "Revision Requested";
    case "submitted":
      return "Submitted";
    case "completed":
      return "Completed";
    default:
      return "In Progress";
  }
}

function statusClass(status?: string) {
  if (status === "completed") return "bg-[#E3F7EC] text-[#1CB061]";
  if (status === "in_revision") return "bg-[#FFF4ED] text-[#FA7319]";
  if (status === "submitted") return "bg-[#EBF8FD] text-[#00A0E3]";
  return "bg-[#EBF8FD] text-[#00A0E3]";
}

export default function DocumentDetailsPage() {
  const [reassignOpen, setReassignOpen] = useState(false);
  const [deadlineModalOpen, setDeadlineModalOpen] = useState(false);
  const [deadlineValue, setDeadlineValue] = useState("");
  const [deadlineReason, setDeadlineReason] = useState("Admin update");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editors, setEditors] = useState<EditorRow[]>([]);
  const params = useParams<{ id: string }>();

  const [payload, setPayload] = useState<DetailPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!params?.id) {
        return;
      }

      try {
        setLoading(true);
        const [data, editorRows] = await Promise.all([
          apiGet<DetailPayload>(`/api/admin/documents/${params.id}`),
          apiGet<EditorRow[]>("/api/admin/editors")
        ]);
        if (active) {
          setPayload(data);
          setEditors(Array.isArray(editorRows) ? editorRows : []);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load document details.");
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
  }, [params?.id]);

  const profile = readProfile(payload?.detail?.profiles);

  const reloadDetail = async () => {
    if (!params?.id) return;
    setLoading(true);
    try {
      const data = await apiGet<DetailPayload>(`/api/admin/documents/${params.id}`);
      setPayload(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reload document details.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignOrReassign = async (input: { documentId: string; editorId: string; reason?: string }) => {
    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/documents/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: input.documentId,
          editorId: input.editorId,
          reason: input.reason || "Reassigned by admin"
        })
      });
      setReassignOpen(false);
      await reloadDetail();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to reassign editor.");
    } finally {
      setActionLoading(false);
    }
  };

  const openAdjustDeadlineModal = () => {
    setDeadlineValue(toLocalDateTimeInput(payload?.detail?.deadline_at));
    setDeadlineReason("Admin update");
    setActionError(null);
    setDeadlineModalOpen(true);
  };

  const handleAdjustDeadline = async () => {
    if (!deadlineValue) {
      setActionError("Please choose a new deadline date and time.");
      return;
    }

    const parsedDeadline = new Date(deadlineValue);
    if (Number.isNaN(parsedDeadline.getTime())) {
      setActionError("Invalid deadline value.");
      return;
    }

    const reason = deadlineReason.trim() || "Admin update";

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/documents/deadline", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: params.id,
          newDeadline: parsedDeadline.toISOString(),
          reason,
          adminNotes: "Updated from admin detail page"
        })
      });
      setDeadlineModalOpen(false);
      await reloadDetail();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to adjust deadline.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelDocument = async () => {
    const confirmed = window.confirm("Are you sure you want to cancel this document?");
    if (!confirmed) return;
    const reason = window.prompt("Cancellation reason:", "Cancelled by admin") || "Cancelled by admin";

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/documents/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: params.id,
          cancellationReason: reason,
          refundRequired: false,
          adminNotes: "Cancelled from admin detail page"
        })
      });
      await reloadDetail();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to cancel document.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500 w-full font-dm-sans pb-10">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center space-x-4">
          <Link href="/admin/documents" className="text-[#A0AAB5] hover:text-[#525866] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F9FAFB]"><ArrowLeft strokeWidth={2.5} className="w-[18px] h-[18px]" /></Link>
          <div className="text-[20px] font-bold text-[#171717]">Document Details</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCancelDocument} disabled={actionLoading} className="px-4 py-2 border border-[#FB3748] text-[#FB3748] text-[13px] font-bold rounded-[8px] hover:bg-[#FEF2F2] transition-colors disabled:opacity-60">Cancel Document</button>
          <button title="Force-complete API is not available yet" disabled className="px-4 py-2 bg-[#00A0E3] text-[#FFFFFF] text-[13px] font-bold rounded-[8px] transition-colors opacity-60 cursor-not-allowed">Force Complete</button>
        </div>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}
      {actionError ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{actionError}</div>
      ) : null}

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[8px] bg-[#EBF8FD] text-[#00A0E3] flex items-center justify-center"><FileText className="w-5 h-5" /></div>
          <div>
            <div className="text-[14px] font-bold text-[#171717]">{payload?.detail?.document_title || "Document"}</div>
            <div className="mt-1 flex gap-2">
              <span className={`px-2 py-[3px] rounded-full text-[10px] font-bold ${statusClass(payload?.detail?.status)}`}>{statusLabel(payload?.detail?.status)}</span>
              {Number(payload?.detail?.revision_count || 0) > 0 ? (
                <span className="px-2 py-[3px] rounded-full text-[10px] font-bold bg-[#FFF4ED] text-[#FA7319]">
                  Revision Count: {payload?.detail?.revision_count}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={openAdjustDeadlineModal} disabled={actionLoading} className="h-[34px] px-3.5 rounded-[8px] border border-[#EAECF0] text-[12px] font-semibold text-[#171717] hover:bg-[#F9FAFB] disabled:opacity-60">Adjust Deadline</button>
          <button onClick={() => setReassignOpen(true)} className="h-[34px] px-3.5 rounded-[8px] border border-[#EAECF0] text-[12px] font-semibold text-[#171717] hover:bg-[#F9FAFB]">Reassign Editor</button>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm">
        <div className="grid grid-cols-7 gap-4">
          <div><div className="text-[11px] text-[#A0AAB5]">Student Name</div><div className="text-[13px] font-bold text-[#00A0E3]">{profile.name}</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Assigned Editor</div><div className="text-[13px] font-bold text-[#00A0E3]">{payload?.detail?.assigned_editor_id ? "Assigned" : "Unassigned"}</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Service Type</div><div className="text-[13px] font-bold text-[#171717]">{readService(payload?.detail?.services)}</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Word Count</div><div className="text-[13px] font-bold text-[#171717]">{loading ? "..." : Number(payload?.detail?.word_count || 0).toLocaleString()}</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Submission Date</div><div className="text-[13px] font-bold text-[#171717]">{formatDate(payload?.detail?.created_at)}</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Deadline</div><div className="text-[13px] font-bold text-[#171717]">{formatDate(payload?.detail?.deadline_at)}</div></div>
          <div><div className="text-[11px] text-[#A0AAB5]">Revision Count</div><div className="text-[13px] font-bold text-[#171717]">{payload?.detail?.revision_count ?? 0}</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm h-[360px] flex flex-col">
            <div className="flex items-center justify-between "><div className="text-[16px] font-bold text-[#171717]">Communication History</div><span className="text-[10px] px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">Read Only</span></div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
              {(payload?.communicationHistory || []).map((msg) => (
                <div key={msg.id} className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[10px] p-3">
                  <div className="text-[12px] font-bold text-[#00A0E3]">
                    {msg.sender_id === payload?.detail?.assigned_editor_id ? "Editor" : profile.name}
                  </div>
                  <div className="text-[12px] text-[#171717] mt-1 leading-relaxed">{msg.message || "-"}</div>
                  <div className="text-[10px] text-[#A0AAB5] mt-1">{formatDateTime(msg.created_at)}</div>
                </div>
              ))}
              {!loading && (payload?.communicationHistory || []).length === 0 ? (
                <p className="text-[12px] text-[#8A94A6]">No communication history found.</p>
              ) : null}
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm">
            <div className="text-[16px] font-bold text-[#171717] ">System Audit Trail</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="overflow-x-auto border border-[#EAECF0] rounded-[8px]">
              <table className="min-w-[720px] w-full border-collapse">
                <thead><tr className="bg-[#F9FAFB] border-b border-[#EAECF0]"><th className="py-2 px-3 text-[11px] text-left text-[#525866]">Action</th><th className="py-2 px-3 text-[11px] text-left text-[#525866]">Actor</th><th className="py-2 px-3 text-[11px] text-left text-[#525866]">Timestamp</th></tr></thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {(payload?.systemAuditTrail || []).map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-3 text-[12px] text-[#525866]">{item.action || "Audit event"}</td>
                      <td className="py-3 px-3 text-[12px] text-[#525866]">{item.actor_name || "System"}</td>
                      <td className="py-3 px-3 text-[12px] text-[#525866]">{formatDateTime(item.created_at)}</td>
                    </tr>
                  ))}
                  {!loading && (payload?.systemAuditTrail || []).length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 px-3 text-[12px] text-[#8A94A6] text-center">No audit history found.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm">
            <div className="text-[16px] font-bold text-[#171717] ">Administrative Meta</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="space-y-3">
              <div className="flex justify-between text-[13px]"><span className="text-[#525866]">Platform Fee (15%)</span><span className="font-bold text-[#171717]">$82.50</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-[#525866]">Editor Payout</span><span className="font-bold text-[#171717]">$467.50</span></div>
              <div className="pt-2 border-t border-[#EAECF0] flex justify-between text-[14px]"><span className="text-[#525866]">Total Contract Value</span><span className="font-bold text-[#00A0E3]">$550.00</span></div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-4 shadow-sm h-[470px] flex flex-col">
            <div className="text-[16px] font-bold text-[#171717] ">File Version Timeline</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
              {(payload?.fileVersionTimeline || []).map((item, idx) => (
                <div key={item.id} className="border border-[#EAECF0] rounded-[10px] p-3">
                  <div className="flex justify-between"><div className="text-[12px] font-bold text-[#171717]">Version {idx + 1}</div><div className="text-[10px] text-[#525866]">{formatDate(item.created_at)}</div></div>
                  <div className="text-[10px] text-[#A0AAB5] mt-1">Uploaded file</div>
                  <div className="mt-2 bg-[#EBF8FD] border border-[#BFE7F9] rounded-[8px] p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#00A0E3]" /><div><div className="text-[11px] font-bold text-[#171717]">{item.file_name || "Version File"}</div><div className="text-[10px] text-[#525866]">{formatBytes(item.file_size)}</div></div></div>
                    {item.file_url ? (
                      <a href={item.file_url} target="_blank" rel="noreferrer" className="p-1 text-[#00A0E3] hover:bg-white rounded"><Download className="w-4 h-4" /></a>
                    ) : (
                      <button className="p-1 text-[#A0AAB5] rounded cursor-not-allowed"><Download className="w-4 h-4" /></button>
                    )}
                  </div>
                </div>
              ))}
              {!loading && (payload?.fileVersionTimeline || []).length === 0 ? (
                <p className="text-[12px] text-[#8A94A6]">No file versions found.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {deadlineModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[14px] border border-[#EAECF0] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#EAECF0] px-5 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00A0E3]" />
                <div className="text-[15px] font-bold text-[#171717]">Adjust Deadline</div>
              </div>
              <button
                onClick={() => {
                  if (!actionLoading) {
                    setDeadlineModalOpen(false);
                  }
                }}
                className="p-1.5 rounded-md text-[#525866] hover:bg-[#F9FAFB]"
                disabled={actionLoading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#171717] mb-1.5">New Deadline</label>
                <input
                  type="datetime-local"
                  value={deadlineValue}
                  onChange={(event) => setDeadlineValue(event.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#EAECF0] text-[13px] text-[#171717] focus:outline-none focus:border-[#00A0E3]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#171717] mb-1.5">Reason</label>
                <textarea
                  value={deadlineReason}
                  onChange={(event) => setDeadlineReason(event.target.value)}
                  className="w-full min-h-[92px] px-3 py-2 rounded-[8px] border border-[#EAECF0] text-[13px] text-[#171717] focus:outline-none focus:border-[#00A0E3] resize-none"
                  placeholder="Provide context for this deadline update"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-[#EAECF0] bg-[#F9FAFB] px-5 py-3">
              <button
                onClick={() => setDeadlineModalOpen(false)}
                disabled={actionLoading}
                className="h-[34px] px-3.5 rounded-[8px] border border-[#EAECF0] bg-white text-[12px] font-semibold text-[#171717] hover:bg-[#F9FAFB] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleAdjustDeadline}
                disabled={actionLoading || !deadlineValue}
                className="h-[34px] px-3.5 rounded-[8px] bg-[#00A0E3] text-[12px] font-semibold text-white hover:bg-[#008cc2] disabled:opacity-60"
              >
                {actionLoading ? "Updating..." : "Update Deadline"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AssignEditorModal
        isOpen={reassignOpen}
        onClose={() => {
          if (!actionLoading) {
            setReassignOpen(false);
            setActionError(null);
          }
        }}
        document={{
          id: payload?.detail?.id || params.id,
          title: payload?.detail?.document_title || "Document",
          studentName: profile.name,
          serviceType: readService(payload?.detail?.services),
          wordCount: Number(payload?.detail?.word_count || 0),
          deadlineText: formatDate(payload?.detail?.deadline_at),
          assignedEditorId: payload?.detail?.assigned_editor_id || null
        }}
        editors={editors}
        onAssign={handleAssignOrReassign}
        isSubmitting={actionLoading}
        error={actionError}
      />
    </div>
  );
}
