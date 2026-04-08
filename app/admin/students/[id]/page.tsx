"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiGet, apiRequest } from "@/lib/client-api";

type StudentProfile = {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  account_status?: string;
};

type PaymentRow = {
  id: string;
  document_id?: string;
  amount?: number | string;
  status?: string;
  created_at?: string;
  paid_at?: string | null;
};

type AuditRow = {
  id: string;
  action?: string;
  notes?: string | null;
  created_at?: string;
};

type DocumentRow = {
  id: string;
  document_title?: string;
  document_type?: string;
  assigned_editor_id?: string | null;
  word_count?: number;
  revision_count?: number;
  deadline_at?: string;
  status?: string;
  created_at?: string;
};

type EditorProfile = {
  id: string;
  full_name?: string;
};

type StudentDetailPayload = {
  profileOverview: StudentProfile;
  paymentHistory: PaymentRow[];
  auditTrail: AuditRow[];
  documentHistory: DocumentRow[];
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

export default function StudentProfile() {
  const params = useParams<{ id: string }>();
  const [payload, setPayload] = useState<StudentDetailPayload | null>(null);
  const [editorMap, setEditorMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const studentId = params?.id;

  const loadData = useCallback(async () => {
    if (!studentId) return;

    setLoading(true);
    try {
      const [detailResult, editorResult] = await Promise.allSettled([
        apiGet<StudentDetailPayload>(`/api/admin/clients/${studentId}`),
        apiGet<EditorProfile[]>("/api/admin/editors")
      ]);

      if (detailResult.status === "rejected") {
        throw detailResult.reason;
      }

      setPayload(detailResult.value);
      setError(null);

      if (editorResult.status === "fulfilled") {
        const nextMap: Record<string, string> = {};
        for (const editor of editorResult.value || []) {
          nextMap[editor.id] = editor.full_name || "Editor";
        }
        setEditorMap(nextMap);
      } else {
        setEditorMap({});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load student details.");
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const profile = payload?.profileOverview;
  const documents = useMemo(
    () => [...(payload?.documentHistory || [])].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")),
    [payload?.documentHistory]
  );
  const payments = useMemo(
    () => [...(payload?.paymentHistory || [])].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")),
    [payload?.paymentHistory]
  );
  const audits = useMemo(
    () => [...(payload?.auditTrail || [])].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")),
    [payload?.auditTrail]
  );

  const documentMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const doc of documents) {
      map[doc.id] = doc.document_title || "Document";
    }
    return map;
  }, [documents]);

  const completedDocuments = documents.filter((doc) => doc.status === "completed").length;
  const activeDocuments = documents.filter((doc) => doc.status !== "completed" && doc.status !== "cancelled").length;
  const paidPayments = payments.filter((row) => paidStatuses.has((row.status || "").toLowerCase()));
  const totalSpend = paidPayments.reduce((sum, row) => sum + normalizeAmount(row.amount), 0);
  const averageOrderValue = paidPayments.length > 0 ? totalSpend / paidPayments.length : 0;

  const handleRestrictAccount = async () => {
    if (!studentId) return;

    const reason = window.prompt("Reason for restricting this account:", "Policy review")?.trim();
    if (!reason) return;

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/clients/restrict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: studentId,
          restrictionType: "manual_restriction",
          restrictionDuration: "until_removed",
          reason,
          adminNotes: "Triggered from admin student detail page"
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
    if (!studentId) return;

    const reason = window.prompt("Reason for suspending this account:", "Account suspension")?.trim();
    if (!reason) return;

    try {
      setActionLoading(true);
      setActionError(null);
      await apiRequest("/api/admin/clients/suspend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: studentId,
          reason,
          adminNotes: "Triggered from admin student detail page"
        })
      });
      await loadData();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to suspend account.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students" className="text-[#A0AAB5] hover:text-[#525866] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F9FAFB]">
            <ArrowLeft strokeWidth={2.5} className="w-[18px] h-[18px]" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-[18px] font-bold text-[#171717]">{profile?.full_name || "Student"}</div>
            <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold tracking-wide inline-flex items-center ${accountStatusClass(profile?.account_status)}`}>
              {accountStatusLabel(profile?.account_status)}
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
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Student Name</div>
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
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Total Documents Submitted</div>
            <div className="text-[13px] font-bold text-[#171717]">{documents.length}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Active Documents</div>
            <div className="text-[13px] font-bold text-[#171717]">{activeDocuments}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Completed Documents</div>
            <div className="text-[13px] font-bold text-[#171717]">{completedDocuments}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Total Spend</div>
            <div className="text-[13px] font-bold text-[#171717]">{formatCurrency(totalSpend)}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Average Order Value</div>
            <div className="text-[13px] font-bold text-[#171717]">{formatCurrency(averageOrderValue)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm flex flex-col h-[400px]">
          <div className="text-[15px] font-bold text-[#171717] ">Payment History</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          <div className="overflow-y-auto pr-1 flex-1 custom-scrollbar -mx-2 px-2">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-[#FFFFFF] z-10">
                <tr className="border-b border-[#EAECF0]">
                  <th className="pb-3 px-2 text-[12px] font-bold text-[#525866]">Document Name</th>
                  <th className="pb-3 px-2 text-[12px] font-bold text-[#525866]">Amount Paid</th>
                  <th className="pb-3 px-2 text-[12px] font-bold text-[#525866]">Payment Date</th>
                  <th className="pb-3 px-2 text-[12px] font-bold text-[#525866]">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0] relative">
                {payments.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2.5">
                        <FileText className="w-[15px] h-[15px] text-[#A0AAB5]" strokeWidth={2} />
                        <span className="font-bold text-[12px] text-[#171717]">{documentMap[row.document_id || ""] || "Document"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-medium text-[12px] text-[#525866]">{formatCurrency(normalizeAmount(row.amount))}</td>
                    <td className="py-4 px-2 font-medium text-[12px] text-[#525866]">{formatDate(row.paid_at || row.created_at)}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold inline-flex items-center justify-center min-w-[70px] tracking-wide ${paymentStatusClass(row.status)}`}>
                        {paymentStatusLabel(row.status)}
                      </span>
                    </td>
                  </tr>
                ))}
                {!loading && payments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 px-2 text-center text-[12px] text-[#78788D]">
                      No payments found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 flex flex-col h-[400px] shadow-sm">
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
                <div className="text-[10px] text-[#525866] font-medium pt-[1px] ml-2 text-right flex-shrink-0">
                  {formatDateTime(item.created_at)}
                </div>
              </div>
            ))}
            {!loading && audits.length === 0 ? (
              <p className="text-[12px] text-[#78788D]">No audit events found.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[15px] text-[#171717] font-bold ">Document History</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Document Name</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Service Type</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Assigned Editor</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Word Count</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Revision</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Deadline</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#525866]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {documents.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-[15px] h-[15px] text-[#A0AAB5]" strokeWidth={2} />
                      <span className="font-bold text-[12px] text-[#171717]">{row.document_title || "Document"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-[12px] text-[#525866]">{row.document_type || "-"}</td>
                  <td className="py-4 px-6 font-medium text-[12px] text-[#525866]">
                    {row.assigned_editor_id ? editorMap[row.assigned_editor_id] || "Assigned" : "Unassigned"}
                  </td>
                  <td className="py-4 px-6 font-medium text-[12px] text-[#525866]">{Number(row.word_count || 0).toLocaleString()}</td>
                  <td className="py-4 px-6 font-medium text-[12px] text-[#525866]">{row.revision_count ?? 0}</td>
                  <td className="py-4 px-6 font-medium text-[12px] text-[#525866]">{formatDate(row.deadline_at)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-[3px] rounded-full text-[10px] font-bold tracking-wide inline-flex items-center justify-center ${documentStatusClass(row.status)}`}>
                      {documentStatusLabel(row.status)}
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && documents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 px-4 text-center text-[12px] text-[#78788D]">
                    No documents found.
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