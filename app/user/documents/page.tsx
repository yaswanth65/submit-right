"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, FileText } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type ServiceShape = { title?: string } | Array<{ title?: string }> | null;

type DocumentItem = {
  id: string;
  document_title?: string;
  status?: string;
  updated_at?: string;
  services?: ServiceShape;
};

type DocumentsPayload = {
  totalSubmittedDocumentsCount: number;
  documents: DocumentItem[];
};

function getServiceTitle(services: ServiceShape | undefined) {
  if (!services) {
    return "General Service";
  }

  if (Array.isArray(services)) {
    return services[0]?.title || "General Service";
  }

  return services.title || "General Service";
}

function toStatusLabel(status?: string) {
  switch (status) {
    case "payment_needed":
      return "Payment Needed";
    case "being_edited":
      return "Being Edited";
    case "in_revision":
      return "In Revision";
    case "completed":
      return "Completed";
    case "submitted":
      return "Submitted";
    default:
      return "Draft";
  }
}

function getStatusBadge(status?: string) {
  const label = toStatusLabel(status);

  if (status === "payment_needed") {
    return (
      <span className="inline-flex items-center justify-center h-[24px] px-2 bg-[#FFF3EB] border border-[#FFE0CC] text-[#FA7319] text-[12px] font-medium rounded-full whitespace-nowrap">
        {label}
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="inline-flex items-center justify-center h-[24px] px-2 bg-[#E3F7EC] border border-[#B8EBCF] text-[#1CB061] text-[12px] font-medium rounded-full whitespace-nowrap">
        {label}
      </span>
    );
  }

  if (status === "being_edited" || status === "in_revision" || status === "submitted") {
    return (
      <span className="inline-flex items-center justify-center h-[24px] px-2 bg-[#EFF6FF] border border-[#C7DFFF] text-[#2563EB] text-[12px] font-medium rounded-full whitespace-nowrap">
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center h-[24px] px-2 bg-[#F5F7FA] border border-[#E5E7EB] text-[#525866] text-[12px] font-medium rounded-full whitespace-nowrap">
      {label}
    </span>
  );
}

function formatDate(date?: string) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

export default function MyDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [payload, setPayload] = useState<DocumentsPayload>({ totalSubmittedDocumentsCount: 0, documents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      }
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }
      params.set("sort", sort);

      try {
        setLoading(true);
        const data = await apiGet<DocumentsPayload>(`/api/client/documents?${params.toString()}`);
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
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchTerm, statusFilter, sort]);

  const documents = useMemo(() => payload.documents, [payload.documents]);

  return (
    <div className="w-full font-dm-sans mx-auto flex flex-col min-h-[calc(100vh-76px)]">
      <div className="my-4 shrink-0 border-b pb-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">My Documents</h1>
        <p className="text-[#78788D] text-[14px]">Track, review, and manage your submissions</p>
      </div>

      {error ? (
        <div className="mx-6 mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row px-4 mx-2 justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div className="relative w-full sm:w-[360px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by document name..."
            className="w-full pl-[40px] pr-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-[180px]">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full border border-[#EAECF0] rounded-[8px] pl-4 pr-10 py-2.5 text-[14px] text-[#171717] appearance-none focus:outline-none focus:border-[#00A0E3] bg-white transition-colors cursor-pointer outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="being_edited">Being Edited</option>
              <option value="in_revision">In Revision</option>
              <option value="payment_needed">Payment Needed</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-[180px]">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full border border-[#EAECF0] rounded-[8px] pl-4 pr-10 py-2.5 text-[14px] text-[#171717] appearance-none focus:outline-none focus:border-[#00A0E3] bg-white transition-colors cursor-pointer outline-none"
            >
              <option value="latest">Latest Updated</option>
              <option value="oldest">Oldest Updated</option>
              <option value="a_to_z">A - Z</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex px-4 mx-2 flex-col">
        <div className="rounded-[12px] bg-white overflow-hidden pb-4">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-left min-w-[900px] border-separate" style={{ borderSpacing: "0" }}>
              <thead>
                <tr>
                  <th className="px-6 h-[34px] text-[14px] font-medium text-[#171717] bg-[#EFF7FB] rounded-tl-[6px] rounded-bl-[6px] whitespace-nowrap w-[30%]">Document Name</th>
                  <th className="px-6 h-[34px] text-[14px] font-medium text-[#171717] bg-[#EFF7FB] whitespace-nowrap">Service Type</th>
                  <th className="px-6 h-[34px] text-[14px] font-medium text-[#171717] bg-[#EFF7FB] whitespace-nowrap">Last Updated</th>
                  <th className="px-6 h-[34px] text-[14px] font-medium text-[#171717] bg-[#EFF7FB] whitespace-nowrap">Status</th>
                  <th className="px-6 h-[34px] text-[14px] font-medium text-[#171717] bg-[#EFF7FB] rounded-tr-[6px] rounded-br-[6px] whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, idx) => (
                  <tr key={doc.id} className="h-[42px] hover:bg-[#F9FAFB] transition-colors">
                    <td className={`px-6 py-2 ${idx !== documents.length - 1 ? "border-b border-[#E7E7E9]" : ""}`}>
                      <Link href={`/user/documents/${doc.id}`} className="flex items-center gap-3 group">
                        <FileText className="w-[18px] h-[18px] text-[#525866] group-hover:text-[#00A0E3] transition-colors" strokeWidth={2} />
                        <span className="text-[14px] font-normal text-[#525866] group-hover:text-[#171717] group-hover:underline truncate transition-colors">
                          {doc.document_title || "Untitled Document"}
                        </span>
                      </Link>
                    </td>
                    <td className={`px-6 py-2 text-[14px] font-normal text-[#525866] ${idx !== documents.length - 1 ? "border-b border-[#E7E7E9]" : ""}`}>
                      {getServiceTitle(doc.services)}
                    </td>
                    <td className={`px-6 py-2 text-[14px] font-normal text-[#525866] whitespace-nowrap ${idx !== documents.length - 1 ? "border-b border-[#E7E7E9]" : ""}`}>
                      {formatDate(doc.updated_at)}
                    </td>
                    <td className={`px-6 py-2 ${idx !== documents.length - 1 ? "border-b border-[#E7E7E9]" : ""}`}>
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className={`px-6 py-2 ${idx !== documents.length - 1 ? "border-b border-[#E7E7E9]" : ""}`}>
                      {doc.status === "payment_needed" ? (
                        <Link href="/user/payments" className="text-[#FA7319] font-semibold text-[14px] hover:underline whitespace-nowrap underline">
                          Pay Now
                        </Link>
                      ) : doc.status === "completed" ? (
                        <Link href={`/user/documents/${doc.id}`} className="text-[#00A0E3] font-semibold text-[14px] hover:underline whitespace-nowrap underline">
                          Download
                        </Link>
                      ) : (
                        <span className="text-[#525866] text-[14px] whitespace-nowrap">-</span>
                      )}
                    </td>
                  </tr>
                ))}

                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-[14px] text-[#78788D] border-b border-[#E7E7E9]">
                      Loading documents...
                    </td>
                  </tr>
                ) : null}

                {!loading && documents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-[14px] text-[#78788D] border-b border-[#E7E7E9]">
                      No documents found for the current filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <p className="text-[#8A94A6] text-[14px]">
            Showing <span className="font-bold text-[#171717]">{documents.length}</span> of{" "}
            <span className="font-bold text-[#171717]">{payload.totalSubmittedDocumentsCount}</span> documents
          </p>
        </div>
      </div>
    </div>
  );
}
