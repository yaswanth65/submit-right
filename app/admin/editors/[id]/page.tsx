"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiGet, apiRequest } from "@/lib/client-api";

type AvailabilityRow = {
  availability_status?: string;
  current_status?: string;
  maximum_active_assignments?: number;
};

type EditorProfile = {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  primary_language?: string;
  primary_expertise?: string;
  language_pairs?: string[];
  account_status?: string;
  editor_availability?: AvailabilityRow | AvailabilityRow[] | null;
};

type DocumentRow = {
  id: string;
  client_id?: string;
  document_title?: string;
  document_type?: string;
  word_count?: number;
  revision_requested?: boolean;
  revision_count?: number;
  payment_status?: string;
  status?: string;
  created_at?: string;
  submitted_at?: string | null;
  completed_at?: string | null;
  deadline_at?: string | null;
};

type PaymentDocRelation =
  | {
      document_title?: string;
    }
  | Array<{
      document_title?: string;
    }>
  | null;

type PaymentRow = {
  id: string;
  document_id?: string;
  amount?: number | string;
  status?: string;
  created_at?: string;
  paid_at?: string | null;
  breakdown?: Record<string, unknown> | null;
  documents?: PaymentDocRelation;
};

type AuditRow = {
  id: string;
  action?: string;
  notes?: string | null;
  created_at?: string;
};

type EditorDetailPayload = {
  profileOverview: EditorProfile;
  currentWorkload: DocumentRow[];
  paymentHistory: PaymentRow[];
  auditTrail: AuditRow[];
  documentHistory: DocumentRow[];
};

type ClientProfile = {
  id: string;
  full_name?: string;
};

const paidStatuses = new Set(["paid", "success", "captured", "completed"]);

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function normalizeAmount(value?: number | string) {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? num : 0;
}

function accountStatusLabel(status?: string) {
  if (status === "suspended") return "Suspended";
  if (status === "restricted") return "Restricted";
  return "Active";
}

function accountStatusClass(status?: string) {
  if (status === "suspended") return "bg-[#FEF2F2] text-[#FB3748]";
  if (status === "restricted") return "bg-[#FFF4ED] text-[#FA7319]";
  return "bg-[#E3F7EC] text-[#1CB061]";
}

function normalizeAvailabilityStatus(value?: string | null) {
  const status = (value || "").toLowerCase().trim();
  if (status === "available") return "available";
  if (status === "busy") return "busy";
  if (status === "at_capacity" || status === "at capacity") return "at_capacity";
  if (status === "vacation" || status === "vacation_mode") return "vacation";
  return "available";
}

function availabilityLabel(value?: string | null) {
  const status = normalizeAvailabilityStatus(value);
  if (status === "at_capacity") return "At Capacity";
  if (status === "vacation") return "Vacation";
  if (status === "busy") return "Busy";
  return "Available";
}

function availabilityClass(value?: string | null) {
  const status = normalizeAvailabilityStatus(value);
  if (status === "at_capacity") return "bg-[#FEF2F2] text-[#FB3748]";
  if (status === "vacation") return "bg-[#EBF8FD] text-[#3B82F6]";
  if (status === "busy") return "bg-[#FFF4ED] text-[#FA7319]";
  return "bg-[#E3F7EC] text-[#1CB061]";
}

function documentStatusLabel(status?: string) {
  if (status === "being_edited") return "In Progress";
  if (status === "in_revision") return "Revision Requested";
  if (status === "payment_needed") return "Payment Needed";
  if (status === "completed") return "Completed";
  if (status === "cancelled") return "Cancelled";
  if (status === "submitted") return "Submitted";
  return "Draft";
}

function documentStatusClass(status?: string) {
  if (status === "completed") return "bg-[#E3F7EC] text-[#1CB061]";
  if (status === "in_revision") return "bg-[#FFF4ED] text-[#FA7319]";
  if (status === "cancelled") return "bg-[#FEF2F2] text-[#FB3748]";
  if (status === "payment_needed") return "bg-[#FEF3C7] text-[#B45309]";
  return "bg-[#EBF8FD] text-[#00A0E3]";
}

function paymentStatusClass(status?: string) {
  const value = (status || "").toLowerCase();
  if (paidStatuses.has(value)) return "bg-[#E3F7EC] text-[#1CB061]";
  if (value === "failed") return "bg-[#FEF2F2] text-[#FB3748]";
  return "bg-[#FFF4ED] text-[#FA7319]";
}

function paymentStatusLabel(status?: string) {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function readDocumentTitle(relation?: PaymentDocRelation) {
  if (!relation) return "Document";
  if (Array.isArray(relation)) return relation[0]?.document_title || "Document";
  return relation.document_title || "Document";
}

function readAvailability(profile?: EditorProfile | null) {
  const relation = profile?.editor_availability;
  const source = Array.isArray(relation) ? relation[0] : relation;
  return {
    status: source?.availability_status || source?.current_status || "available",
    maxAssignments: source?.maximum_active_assignments ?? 5
  };
}

function readBreakdownValue(row: PaymentRow, keys: string[]) {
  const breakdown = row.breakdown;
  if (!breakdown || typeof breakdown !== "object") {
    return null;
  }

  for (const key of keys) {
    const value = breakdown[key];
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

export default function EditorProfile() {
  const params = useParams<{ id: string }>();
  const [payload, setPayload] = useState<EditorDetailPayload | null>(null);
  const [clientMap, setClientMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const editorId = params?.id;

  const loadData = useCallback(async () => {
    if (!editorId) return;

    setLoading(true);
    try {
      const [detailResult, clientsResult] = await Promise.allSettled([
        apiGet<EditorDetailPayload>(`/api/admin/editors/${editorId}`),
        apiGet<ClientProfile[]>("/api/admin/clients")
      ]);

      if (detailResult.status === "rejected") {
        throw detailResult.reason;
      }

      setPayload(detailResult.value);
      setError(null);

      if (clientsResult.status === "fulfilled") {
        const next: Record<string, string> = {};
        for (const client of clientsResult.value || []) {
          next[client.id] = client.full_name || "Student";
        }
        setClientMap(next);
      } else {
        setClientMap({});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load editor details.");
    } finally {
      setLoading(false);
    }
  }, [editorId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const profile = payload?.profileOverview;
  const availability = readAvailability(profile);

  const documents = useMemo(
    () => [...(payload?.documentHistory || [])].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")),
    [payload?.documentHistory]
  );
  const workload = useMemo(
    () => [...(payload?.currentWorkload || [])].sort((a, b) => (a.deadline_at || "").localeCompare(b.deadline_at || "")),
    [payload?.currentWorkload]
  );
  const audits = useMemo(
    () => [...(payload?.auditTrail || [])].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")),
    [payload?.auditTrail]
  );

  const documentIds = useMemo(() => new Set(documents.map((doc) => doc.id)), [documents]);
  const payments = useMemo(() => {
    const all = payload?.paymentHistory || [];
    const filtered = documentIds.size
      ? all.filter((row) => (row.document_id ? documentIds.has(row.document_id) : false))
      : [];
    return [...filtered].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  }, [payload?.paymentHistory, documentIds]);

  const totalDocs = documents.length;
  const completedDocs = documents.filter((doc) => doc.status === "completed");
  const revisionDocs = documents.filter((doc) => doc.revision_requested || Number(doc.revision_count || 0) > 0).length;
  const revisionRate = totalDocs > 0 ? (revisionDocs / totalDocs) * 100 : 0;
  const lateSubmissionCount = completedDocs.filter((doc) => {
    if (!doc.deadline_at || !doc.completed_at) return false;
    return new Date(doc.completed_at).getTime() > new Date(doc.deadline_at).getTime();
  }).length;
  const declineEvents = audits.filter((item) => (item.action || "").toLowerCase().includes("decline")).length;
  const declineRate = totalDocs > 0 ? (declineEvents / totalDocs) * 100 : 0;

  const averageTurnaroundDays = (() => {
    const durations = completedDocs
      .map((doc) => {
        if (!doc.submitted_at || !doc.completed_at) return null;
        const diffMs = new Date(doc.completed_at).getTime() - new Date(doc.submitted_at).getTime();
        if (Number.isNaN(diffMs) || diffMs < 0) return null;
        return diffMs / (1000 * 60 * 60 * 24);
      })
      .filter((value): value is number => value !== null);

    if (durations.length === 0) return null;
    return durations.reduce((sum, value) => sum + value, 0) / durations.length;
  })();

  const documentTitleMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const doc of documents) {
      map[doc.id] = doc.document_title || "Document";
    }
    return map;
  }, [documents]);

  const handleRestrictAccount = async () => {
    if (!editorId) return;

    const reason = window.prompt("Reason for restricting this editor:", "Quality review")?.trim();
    if (!reason) return;

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/editors/restrict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: editorId,
          restrictionType: "manual_restriction",
          restrictionDuration: "until_removed",
          reason,
          adminNotes: "Triggered from admin editor detail page"
        })
      });
      await loadData();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to restrict account.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuspendAccount = async () => {
    if (!editorId) return;

    const reason = window.prompt("Reason for suspending this editor:", "Account suspension")?.trim();
    if (!reason) return;

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/editors/suspend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: editorId,
          reason,
          adminNotes: "Triggered from admin editor detail page"
        })
      });
      await loadData();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to suspend account.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAdjustAvailability = async () => {
    if (!editorId) return;

    const currentStatus = normalizeAvailabilityStatus(availability.status);
    const nextStatusRaw = window
      .prompt("Set availability (available, busy, at_capacity, vacation):", currentStatus)
      ?.trim();

    if (!nextStatusRaw) return;

    const normalizedStatus = normalizeAvailabilityStatus(nextStatusRaw);
    const maxAssignmentsRaw = window
      .prompt("Maximum active assignments:", String(availability.maxAssignments ?? 5))
      ?.trim();

    let maximumActiveAssignments: number | undefined;
    if (maxAssignmentsRaw && maxAssignmentsRaw.length > 0) {
      const parsed = Number(maxAssignmentsRaw);
      if (!Number.isInteger(parsed) || parsed < 0) {
        setActionError("Maximum active assignments must be a non-negative whole number.");
        return;
      }
      maximumActiveAssignments = parsed;
    }

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest(`/api/admin/editors/availability?editorId=${editorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availabilityStatus: normalizedStatus,
          maximumActiveAssignments,
          adminNotes: "Updated from admin editor detail page"
        })
      });
      await loadData();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update availability.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/editors" className="text-[#A0AAB5] hover:text-[#525866] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F9FAFB]">
            <ArrowLeft strokeWidth={2.5} className="w-[18px] h-[18px]" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-[18px] font-bold text-[#171717]">{profile?.full_name || "Editor"}</div>
            <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide inline-flex items-center ${accountStatusClass(profile?.account_status)}`}>
              {accountStatusLabel(profile?.account_status)}
            </span>
            <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide inline-flex items-center ${availabilityClass(availability.status)}`}>
              {availabilityLabel(availability.status)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRestrictAccount}
            disabled={actionLoading || loading}
            className="px-4 py-2 border border-[#EAECF0] text-[#525866] text-[12px] font-bold rounded-[8px] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-60"
          >
            Restrict Account
          </button>
          <button
            onClick={handleSuspendAccount}
            disabled={actionLoading || loading}
            className="px-4 py-2 border border-[#FB3748] text-[#FB3748] text-[12px] font-bold rounded-[8px] hover:bg-[#FEF2F2] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-60"
          >
            Suspend Account
          </button>
          <button
            onClick={handleAdjustAvailability}
            disabled={actionLoading || loading}
            className="px-4 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] text-[12px] font-bold rounded-[8px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-60"
          >
            Adjust Availability
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}
      {actionError ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{actionError}</div>
      ) : null}

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm">
        <div className="text-[15px] font-bold text-[#171717] ">Profile Overview</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Editor Name</div>
            <div className="text-[13px] font-bold text-[#171717]">{profile?.full_name || "-"}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Email</div>
            <div className="text-[13px] font-bold text-[#171717]">{profile?.email || "-"}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Registration Date</div>
            <div className="text-[13px] font-bold text-[#171717]">{formatDate(profile?.created_at)}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Primary Language</div>
            <div className="text-[13px] font-bold text-[#171717]">{profile?.primary_language || "-"}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Primary Expertise</div>
            <div className="text-[13px] font-bold text-[#171717]">{profile?.primary_expertise || "-"}</div>
          </div>
          <div className="col-span-3">
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Languages Pair</div>
            <div className="text-[13px] font-bold text-[#171717]">{profile?.language_pairs?.length ? profile.language_pairs.join(", ") : "-"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Avg. Turnaround Time</div>
                <div className="text-[13px] font-bold text-[#171717]">
                  {averageTurnaroundDays === null ? "-" : `${averageTurnaroundDays.toFixed(1)} days`}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Revision Request Rate</div>
                <div className="text-[13px] font-bold text-[#171717]">{revisionRate.toFixed(0)}%</div>
              </div>
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Late Submission Count</div>
                <div className="text-[13px] font-bold text-[#171717]">{lateSubmissionCount}</div>
              </div>
              <div>
                <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Ass. Decline Rate</div>
                <div className="text-[13px] font-bold text-[#171717]">{declineRate.toFixed(0)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
            <div className="text-[15px] font-bold text-[#171717] ">Current Workload</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Document Name</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Student</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Service Type</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Deadline</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
                  {workload.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-[14px] h-[14px] text-[#A0AAB5]" strokeWidth={2} />
                          <span className="font-medium text-[12px] text-[#171717]">{row.document_title || "Document"}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[12px] text-[#525866]">{clientMap[row.client_id || ""] || "Student"}</td>
                      <td className="py-3 px-4 text-[12px] text-[#525866]">{row.document_type || "-"}</td>
                      <td className="py-3 px-4 text-[12px] text-[#525866]">{formatDate(row.deadline_at)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex ${paymentStatusClass(row.payment_status)}`}>
                          {paymentStatusLabel(row.payment_status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && workload.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 px-4 text-center text-[12px] text-[#78788D]">
                        No active workload.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
          <div className="text-[15px] font-bold text-[#171717] ">Audit Trail</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar relative pl-2">
            <div className="absolute left-[13px] top-4 bottom-8 w-[2px] bg-[#EAEFF4] z-0"></div>
            {audits.map((item) => (
              <div key={item.id} className="relative flex items-start mb-6 last:mb-0 z-10">
                <div className="mt-1 flex-shrink-0 relative">
                  <div className="w-[14px] h-[14px] bg-[#00A0E3] rounded-full border-[3px] border-[#EBF8FD] box-content relative z-10 shadow-sm -ml-[calc(7px-2px)]"></div>
                </div>
                <div className="ml-5 flex-1 pt-[1px]">
                  <div className="text-[12px] font-bold text-[#171717] tracking-tight leading-tight">{item.action || "Audit event"}</div>
                  <div className="text-[11px] text-[#A0AAB5] mt-1 font-medium italic">{item.notes || "No note provided"}</div>
                </div>
                <div className="text-[10px] text-[#525866] font-medium pt-[1px] ml-2 text-right flex-shrink-0">{formatDateTime(item.created_at)}</div>
              </div>
            ))}
            {!loading && audits.length === 0 ? (
              <p className="text-[12px] text-[#78788D]">No audit events found.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[15px] text-[#171717] font-bold ">Assignment History</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Document Name</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Student</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Service Type</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Completion Date</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Revision</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {documents.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-[14px] h-[14px] text-[#A0AAB5]" strokeWidth={2} />
                      <span className="font-medium text-[12px] text-[#171717]">{row.document_title || "Document"}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{clientMap[row.client_id || ""] || "Student"}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.document_type || "-"}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{formatDate(row.completed_at || row.created_at)}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{row.revision_count ?? 0}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex ${documentStatusClass(row.status)}`}>
                      {documentStatusLabel(row.status)}
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && documents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 px-4 text-center text-[12px] text-[#78788D]">
                    No assignment history found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[15px] text-[#171717] font-bold ">Payout History</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Document Name</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Editor Payout</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Platform Fee</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Payout Date</th>
                <th className="py-3 px-4 text-[12px] font-bold text-[#525866]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {payments.map((row) => {
                const payout = readBreakdownValue(row, ["editorPayout", "editor_payout", "payout_to_editor"]);
                const platformFee = readBreakdownValue(row, ["platformFee", "platform_fee", "fee"]);
                const title = row.document_id ? documentTitleMap[row.document_id] || readDocumentTitle(row.documents) : readDocumentTitle(row.documents);

                return (
                  <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-[14px] h-[14px] text-[#A0AAB5]" strokeWidth={2} />
                      <span className="font-medium text-[12px] text-[#171717]">{title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{payout === null ? formatCurrency(normalizeAmount(row.amount)) : formatCurrency(payout)}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{platformFee === null ? "-" : formatCurrency(platformFee)}</td>
                  <td className="py-3 px-4 text-[12px] text-[#525866]">{formatDate(row.paid_at || row.created_at)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex ${paymentStatusClass(row.status)}`}>
                      {paymentStatusLabel(row.status)}
                    </span>
                  </td>
                  </tr>
                );
              })}
              {!loading && payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-4 text-center text-[12px] text-[#78788D]">
                    No payout records found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
