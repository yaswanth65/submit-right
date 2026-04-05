"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  X,
  Download
} from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";

type RelProfile = { full_name?: string } | Array<{ full_name?: string }> | null;
type RelService = { title?: string } | Array<{ title?: string }> | null;

type EditorDocument = {
  id: string;
  document_title?: string;
  word_count?: number;
  deadline_at?: string;
  status?: string;
  created_at?: string;
  uploaded_file_name?: string;
  uploaded_file_url?: string;
  profiles?: RelProfile;
  services?: RelService;
};

function readProfileName(profile?: RelProfile) {
  if (!profile) return "Client";
  if (Array.isArray(profile)) return profile[0]?.full_name || "Client";
  return profile.full_name || "Client";
}

function readServiceName(service?: RelService) {
  if (!service) return "Service";
  if (Array.isArray(service)) return service[0]?.title || "Service";
  return service.title || "Service";
}

function formatDeadline(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatDate(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function statusMeta(status?: string, deadlineAt?: string) {
  const overdue = deadlineAt ? new Date(deadlineAt).getTime() < Date.now() && status !== "completed" : false;
  if (overdue) {
    return {
      deadlineColor: "text-red-500 bg-red-50 border-red-200",
      statusText: "Overdue",
      statusColor: "text-red-500 bg-red-50"
    };
  }

  if (status === "in_revision") {
    return {
      deadlineColor: "text-yellow-600 bg-yellow-50 border-yellow-200",
      statusText: "Revision Requested",
      statusColor: "text-orange-500 bg-orange-50"
    };
  }

  if (status === "completed") {
    return {
      deadlineColor: "text-gray-500",
      statusText: "Completed",
      statusColor: "text-green-500 bg-green-50"
    };
  }

  if (status === "submitted") {
    return {
      deadlineColor: "text-gray-500",
      statusText: "Waiting for Approval",
      statusColor: "text-purple-500 bg-purple-50"
    };
  }

  return {
    deadlineColor: "text-gray-500",
    statusText: "In Progress",
    statusColor: "text-blue-500 bg-blue-50"
  };
}

export default function AssignedPage() {
  const [selectedView, setSelectedView] = useState<"list" | "detail">("list");
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [documentsData, setDocumentsData] = useState<EditorDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [extensionDate, setExtensionDate] = useState("");
  const [extensionReason, setExtensionReason] = useState("");
  const [submittingExtension, setSubmittingExtension] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<EditorDocument[]>("/api/editor/documents");
        if (active) {
          setDocumentsData(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load assigned documents.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  const documents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const normalized = documentsData
      .map((doc) => {
        const meta = statusMeta(doc.status, doc.deadline_at);
        return {
          id: doc.id,
          name: doc.document_title || "Untitled Document",
          client: readProfileName(doc.profiles),
          type: readServiceName(doc.services),
          words: Number(doc.word_count || 0),
          deadline: formatDeadline(doc.deadline_at),
          deadlineColor: meta.deadlineColor,
          status: meta.statusText,
          statusColor: meta.statusColor
        };
      })
      .filter((doc) => {
        const matchesSearch = !term ? true : doc.name.toLowerCase().includes(term) || doc.client.toLowerCase().includes(term);
        const matchesStatus = statusFilter === "all" ? true : doc.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
      });

    return [...normalized].sort((a, b) => {
      if (sortOrder === "a_to_z") return a.name.localeCompare(b.name);
      if (sortOrder === "oldest") return a.deadline.localeCompare(b.deadline);
      return b.deadline.localeCompare(a.deadline);
    });
  }, [documentsData, searchTerm, statusFilter, sortOrder]);

  const selected = useMemo(() => {
    if (!selectedDocumentId) return null;
    return documentsData.find((doc) => doc.id === selectedDocumentId) || null;
  }, [selectedDocumentId, documentsData]);

  const selectedMeta = statusMeta(selected?.status, selected?.deadline_at);

  const submitExtension = async () => {
    if (!selected) return;

    try {
      setSubmittingExtension(true);
      setActionError(null);

      await apiRequest("/api/editor/documents/request-extension", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: selected.id,
          proposedNewDeadline: new Date(`${extensionDate}T00:00:00.000Z`).toISOString(),
          reason: extensionReason.trim()
        })
      });

      setShowExtensionModal(false);
      setExtensionDate("");
      setExtensionReason("");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to submit extension request.");
    } finally {
      setSubmittingExtension(false);
    }
  };

  if (selectedView === "list") {
    return (
      <div className="w-full animate-in fade-in duration-300">
        <div className="mb-8">
          <div className="text-[24px] font-bold text-[#171717] mb-1">Assigned Documents</div>
          <p className="text-[14px] text-[#525866]">Manage your active academic editing tasks and deadlines.</p>
        </div>

        {error ? <div className="mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div> : null}

        <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAECF0]">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by document name..."
                className="w-full pl-9 pr-4 py-2 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A0E3]/20 focus:border-[#00A0E3] transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="appearance-none pl-4 pr-10 py-2 text-[13px] font-medium border border-[#EAECF0] rounded-[8px] bg-white text-[#171717] focus:outline-none cursor-pointer">
                  <option value="all">All</option>
                  <option value="in progress">In Progress</option>
                  <option value="revision requested">Revision Requested</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
              </div>
              <div className="relative">
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="appearance-none pl-4 pr-10 py-2 text-[13px] font-medium border border-[#EAECF0] rounded-[8px] bg-white text-[#171717] focus:outline-none cursor-pointer">
                  <option value="latest">Latest updated</option>
                  <option value="oldest">Oldest</option>
                  <option value="a_to_z">A - Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] table-fixed min-w-[760px] lg:min-w-0">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#EAECF0] text-[#525866] font-medium">
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Service Type</th>
                  <th className="px-6 py-4">Word Count</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0]">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#171717]">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-[#A0AAB5]" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#525866]">{doc.client}</td>
                    <td className="px-6 py-4 text-[#525866]">{doc.type}</td>
                    <td className="px-6 py-4 text-[#525866]">{doc.words.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {doc.deadlineColor.includes("border") ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border whitespace-nowrap ${doc.deadlineColor}`}>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {doc.deadline}
                        </span>
                      ) : (
                        <span className="text-[#525866]">{doc.deadline}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${doc.statusColor}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedDocumentId(doc.id);
                          setSelectedView("detail");
                          setActionError(null);
                        }}
                        className="px-4 py-1.5 bg-[#00A0E3] hover:bg-[#008cc2] text-white rounded-[6px] text-[13px] font-medium transition-colors"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && documents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-[13px] text-[#78788D]">
                      No assigned documents found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex items-center justify-between border-t border-[#EAECF0] text-[13px] text-[#525866]">
            <div>
              Showing <span className="font-semibold text-[#171717]">{documents.length}</span> of <span className="font-semibold text-[#171717]">{documentsData.length}</span> documents
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] text-[#A0AAB5]"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#00A0E3] bg-[#00A0E3] text-white rounded-[6px] font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] text-[#171717] font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] text-[#525866]"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="w-full animate-in fade-in duration-300">
        <button onClick={() => setSelectedView("list")} className="flex items-center gap-2 text-[#00A0E3] hover:text-[#008cc2] font-medium text-[14px] self-start"><ArrowLeft className="w-4 h-4" /> Back</button>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col gap-4">
        <button onClick={() => setSelectedView("list")} className="flex items-center gap-2 text-[#00A0E3] hover:text-[#008cc2] font-medium text-[14px] self-start"><ArrowLeft className="w-4 h-4" /> Back</button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[24px] font-bold text-[#171717] mb-1">{selected.document_title || "Document"}</div>
            <p className="text-[14px] text-[#525866]">{readProfileName(selected.profiles)} - {readServiceName(selected.services)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-[13px] font-medium ${selectedMeta.statusColor}`}>{selectedMeta.statusText}</span>
            <button onClick={() => setShowExtensionModal(true)} className="flex items-center gap-2 px-4 py-2 border border-[#EAECF0] text-[#171717] font-medium text-[13px] hover:bg-[#F9FAFB] rounded-[8px] transition-colors"><Calendar className="w-4 h-4" /> Extend Deadline</button>
          </div>
        </div>
      </div>

      {actionError ? <div className="mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{actionError}</div> : null}

      <div className={`mb-6 rounded-[12px] p-4 flex items-center gap-3 text-[14px] font-medium ${selectedMeta.deadlineColor.includes("border") ? "bg-red-50/50 border border-red-100 text-red-500" : "bg-[#F9FAFB] border border-[#EAECF0] text-[#525866]"}`}><Clock className="w-4 h-4" />Deadline: {formatDeadline(selected.deadline_at)}</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm p-6">
            <div className="text-[16px] font-bold text-[#171717] mb-6">Assignment Overview</div>
            <div className="grid grid-cols-2 gap-y-6 mb-6">
              <div><div className="text-[13px] text-[#525866] mb-1">Word Count</div><div className="text-[14px] font-medium text-[#171717]">{Number(selected.word_count || 0).toLocaleString()} words</div></div>
              <div><div className="text-[13px] text-[#525866] mb-1">Service Type</div><div className="text-[14px] font-medium text-[#171717]">{readServiceName(selected.services)}</div></div>
              <div><div className="text-[13px] text-[#525866] mb-1">Submission Date</div><div className="text-[14px] font-medium text-[#171717]">{formatDate(selected.created_at)}</div></div>
              <div><div className="text-[13px] text-[#525866] mb-1">Document ID</div><div className="text-[14px] font-medium text-[#171717]">{selected.id}</div></div>
            </div>
            <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-4">
              <div className="text-[13px] font-medium text-[#171717] mb-1">Editor Actions</div>
              <p className="text-[13px] text-[#525866] leading-relaxed">Upload final revision and document messaging are handled in dedicated editor workflow pages. This screen is fully backed by live assignment data.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm p-6">
            <div className="text-[16px] font-bold text-[#171717] mb-4">Original File</div>
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-[6px] flex items-center justify-center"><FileText className="w-4 h-4" /></div>
                <div>
                  <div className="text-[13px] font-medium text-[#171717]">{selected.uploaded_file_name || "Client Document"}</div>
                  <div className="text-[12px] text-[#A0AAB5]">Source upload</div>
                </div>
              </div>
              {selected.uploaded_file_url ? <a href={selected.uploaded_file_url} target="_blank" rel="noreferrer" className="text-[#00A0E3] p-1.5 hover:bg-blue-50 rounded-md transition-colors"><Download className="w-4 h-4" /></a> : null}
            </div>
          </div>
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm p-6">
            <div className="text-[16px] font-bold text-[#171717] mb-2">Communication</div>
            <p className="text-[13px] text-[#525866]">Use the Messages tab for live conversation and update history linked to this document.</p>
          </div>
        </div>
      </div>

      {showExtensionModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
              <div>
                <div className="text-[18px] font-bold text-[#171717]">Request Deadline Extension</div>
                <p className="text-[13px] text-[#525866] mt-1">Submit a formal request to the administrator.</p>
              </div>
              <button onClick={() => setShowExtensionModal(false)} className="text-[#525866] hover:bg-[#F9FAFB] p-2 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#171717] mb-1.5">Proposed New Deadline</label>
                <input type="date" value={extensionDate} onChange={(e) => setExtensionDate(e.target.value)} className="w-full px-4 py-2.5 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:border-[#00A0E3] bg-white" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#171717] mb-1.5">Reason for Extension</label>
                <textarea value={extensionReason} onChange={(e) => setExtensionReason(e.target.value)} placeholder="Please provide a brief explanation for this request." className="w-full px-4 py-2.5 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:border-[#00A0E3] min-h-[100px] resize-none"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#EAECF0] flex items-center justify-between bg-[#F9FAFB]">
              <button onClick={() => setShowExtensionModal(false)} className="px-4 py-2 bg-white border border-[#EAECF0] text-[#171717] text-[14px] font-medium rounded-[8px] hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={submitExtension} disabled={submittingExtension || !extensionDate || !extensionReason.trim()} className="px-4 py-2 bg-[#00A0E3] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#008cc2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">{submittingExtension ? "Submitting..." : "Submit Request"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
