"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, MoreVertical, FileText } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type RelName = { full_name?: string } | Array<{ full_name?: string }> | null;
type RelService = { title?: string } | Array<{ title?: string }> | null;

type AdminDocument = {
  id: string;
  document_title?: string;
  status?: string;
  word_count?: number;
  deadline_at?: string;
  assigned_editor_id?: string | null;
  profiles?: RelName;
  services?: RelService;
};

type DocumentsPayload = {
  totalActive: number;
  overdueTasks: number;
  pendingRevisions: number;
  avgTime: number;
  list: AdminDocument[];
};

function readName(rel: RelName | undefined) {
  if (!rel) {
    return "Unknown";
  }

  if (Array.isArray(rel)) {
    return rel[0]?.full_name || "Unknown";
  }

  return rel.full_name || "Unknown";
}

function readService(rel: RelService | undefined) {
  if (!rel) {
    return "General";
  }

  if (Array.isArray(rel)) {
    return rel[0]?.title || "General";
  }

  return rel.title || "General";
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function statusMeta(status?: string, deadlineAt?: string) {
  const isOverdue = deadlineAt ? new Date(deadlineAt).getTime() < Date.now() && status !== "completed" : false;
  if (isOverdue) {
    return { label: "Overdue", style: "bg-[#FEF2F2] text-[#FB3748]" };
  }

  if (status === "completed") {
    return { label: "Completed", style: "bg-[#E3F7EC] text-[#1CB061]" };
  }

  if (status === "in_revision") {
    return { label: "Revision Requested", style: "bg-[#FFF4ED] text-[#FA7319]" };
  }

  if (status === "submitted") {
    return { label: "Submitted", style: "bg-[#F3E8FF] text-[#9333EA]" };
  }

  if (status === "payment_needed") {
    return { label: "Payment Needed", style: "bg-[#FFF4ED] text-[#FA7319]" };
  }

  return { label: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" };
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payload, setPayload] = useState<DocumentsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<DocumentsPayload>("/api/admin/documents");
        if (active) {
          setPayload(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load documents.");
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

  const rows = useMemo(() => {
    const docs = payload?.list || [];
    return docs.filter((row) => {
      const term = searchTerm.trim().toLowerCase();
      const state = statusMeta(row.status, row.deadline_at).label.toLowerCase();
      const matchesSearch = !term
        ? true
        : (row.document_title || "").toLowerCase().includes(term) || readName(row.profiles).toLowerCase().includes(term);
      const matchesFilter = statusFilter === "all" ? true : state === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [payload, searchTerm, statusFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="mt-2">
        <div className="text-[30px] font-bold text-[#171717] leading-tight">Documents</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage and monitor all platform documents.</p>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm px-4 py-4">
        <div className="grid grid-cols-4">
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Total Active</div><div className="text-[26px] font-bold text-[#171717] mt-1">{loading ? "..." : payload?.totalActive ?? 0}</div></div>
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Overdue Tasks</div><div className="text-[26px] font-bold text-[#FB3748] mt-1">{loading ? "..." : payload?.overdueTasks ?? 0}</div></div>
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Pending Revisions</div><div className="text-[26px] font-bold text-[#171717] mt-1">{loading ? "..." : payload?.pendingRevisions ?? 0}</div></div>
          <div className="px-3"><div className="text-[13px] text-[#525866]">Avg. Time</div><div className="text-[26px] font-bold text-[#171717] mt-1">{loading ? "..." : `${payload?.avgTime ?? 0} Days`}</div></div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[280px]">
            <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AAB5]" strokeWidth={2.25} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="h-[42px] w-full pl-10 pr-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>
          <div className="h-[42px] px-4 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#525866] font-semibold inline-flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors">
            <SlidersHorizontal className="w-[16px] h-[16px]" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent outline-none cursor-pointer">
              <option value="all">All</option>
              <option value="in progress">In Progress</option>
              <option value="overdue">Overdue</option>
              <option value="revision requested">Revision Requested</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="min-w-[1200px] w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Document Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Student Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Assigned Editor</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Service Type</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Word Count</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Deadline</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability Status</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/admin/documents/${row.id}`} className="flex items-center space-x-2.5">
                      <FileText className="w-[14px] h-[14px] text-[#525866]" strokeWidth={2.5} />
                      <span className="font-medium text-[13px] text-[#525866]">{row.document_title || "Untitled Document"}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{readName(row.profiles)}</td>
                  <td className={`py-3 px-4 text-[13px] ${row.assigned_editor_id ? "text-[#525866]" : "text-[#FB3748] font-bold"}`}>{row.assigned_editor_id ? "Assigned" : "Unassigned"}</td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{readService(row.services)}</td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{row.word_count || 0}</td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{formatDate(row.deadline_at)}</td>
                  <td className="py-3 px-4">
                    {(() => {
                      const status = statusMeta(row.status, row.deadline_at);
                      return <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold inline-flex ${status.style}`}>{status.label}</span>;
                    })()}
                  </td>
                  <td className="py-3 px-4">
                    <Link href={`/admin/documents/${row.id}`} className="text-[#171717] hover:bg-[#F3F4F6] rounded p-1.5 transition-colors inline-flex"><MoreVertical className="w-[18px] h-[18px]" /></Link>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 px-4 text-center text-[13px] text-[#78788D]">
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
