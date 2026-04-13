"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  X,
  Download,
  Send,
  History,
  Upload
} from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";

type RelProfile =
  | { id?: string; full_name?: string; email?: string }
  | Array<{ id?: string; full_name?: string; email?: string }>
  | null;
type RelService = { title?: string } | Array<{ title?: string }> | null;

type EditorDocument = {
  id: string;
  document_title?: string;
  short_description?: string;
  word_count?: number;
  deadline_at?: string;
  status?: string;
  revision_requested?: boolean;
  revision_count?: number;
  created_at?: string;
  submitted_at?: string | null;
  updated_at?: string;
  client_id?: string;
  assigned_editor_id?: string | null;
  latest_editor_file_name?: string;
  latest_editor_file_url?: string;
  uploaded_file_name?: string;
  uploaded_file_url?: string;
  profiles?: RelProfile;
  services?: RelService;
};

type MessagePerson = { full_name?: string } | Array<{ full_name?: string }> | null;

type DetailMessage = {
  id: string;
  sender_id?: string;
  receiver_id?: string;
  message?: string;
  created_at?: string;
  sender?: MessagePerson;
  receiver?: MessagePerson;
};

type VersionItem = {
  id: string;
  version_type?: string;
  file_name?: string;
  file_size_bytes?: number;
  file_url?: string;
  created_at?: string;
};

type SubmitRevisionResponse = {
  id: string;
  latest_editor_file_name?: string;
  latest_editor_file_url?: string;
  latest_editor_file_path?: string;
  status?: string;
};

type AssignedDetailPayload = {
  assignmentOverview: EditorDocument;
  originalFileDownloadLink?: string | null;
  messageList: DetailMessage[];
  versionHistory: VersionItem[];
};

function readProfileName(profile?: RelProfile) {
  if (!profile) return "Client";
  if (Array.isArray(profile)) return profile[0]?.full_name || "Client";
  return profile.full_name || "Client";
}

function readMessagePerson(person?: MessagePerson) {
  if (!person) return "User";
  if (Array.isArray(person)) return person[0]?.full_name || "User";
  return person.full_name || "User";
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

function formatDateTime(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatFileSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) return "-";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "U";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase();
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
  const [detailPayload, setDetailPayload] = useState<AssignedDetailPayload | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [stagedRevisionFile, setStagedRevisionFile] = useState<File | null>(null);
  const [submittingRevision, setSubmittingRevision] = useState(false);
  const [draggingRevision, setDraggingRevision] = useState(false);
  const revisionInputRef = useRef<HTMLInputElement | null>(null);

  const refreshDocuments = async () => {
    const data = await apiGet<EditorDocument[]>("/api/editor/documents");
    setDocumentsData(Array.isArray(data) ? data : []);
  };

  const reloadDetail = async (documentId: string) => {
    setDetailLoading(true);
    try {
      const data = await apiGet<AssignedDetailPayload>(`/api/editor/documents/${documentId}`);
      setDetailPayload(data);
      setActionError(null);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<EditorDocument[]>("/api/editor/documents");
        if (active) {
          setDocumentsData(Array.isArray(data) ? data : []);
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
    if (detailPayload?.assignmentOverview?.id === selectedDocumentId) {
      return detailPayload.assignmentOverview;
    }
    return documentsData.find((doc) => doc.id === selectedDocumentId) || null;
  }, [selectedDocumentId, documentsData, detailPayload]);

  const selectedMeta = statusMeta(selected?.status, selected?.deadline_at);

  useEffect(() => {
    if (selectedView !== "detail" || !selectedDocumentId) {
      return;
    }

    let active = true;
    const loadDetail = async () => {
      try {
        setDetailLoading(true);
        const data = await apiGet<AssignedDetailPayload>(`/api/editor/documents/${selectedDocumentId}`);
        if (!active) return;
        setDetailPayload(data);
        setStagedRevisionFile(null);
        setActionError(null);
      } catch (err) {
        if (!active) return;
        setActionError(err instanceof Error ? err.message : "Failed to load document detail.");
      } finally {
        if (active) {
          setDetailLoading(false);
        }
      }
    };

    void loadDetail();
    return () => {
      active = false;
    };
  }, [selectedView, selectedDocumentId]);

  const sendMessage = async () => {
    if (!selected || !selected.client_id || !messageText.trim() || sendingMessage) {
      return;
    }

    try {
      setSendingMessage(true);
      await apiRequest("/api/editor/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: selected.id,
          receiverId: selected.client_id,
          message: messageText.trim()
        })
      });

      await reloadDetail(selected.id);
      setMessageText("");
      setActionError(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSendingMessage(false);
    }
  };

  const pickRevisionFile = (file: File | null) => {
    if (!file) return;
    const allowed = /\.(doc|docx|pdf)$/i.test(file.name);
    if (!allowed) {
      setActionError("Only DOC, DOCX and PDF files are allowed.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setActionError("File is too large. Maximum size is 25MB.");
      return;
    }
    setActionError(null);
    setStagedRevisionFile(file);
  };

  const submitFinalRevision = async () => {
    if (!selected || !stagedRevisionFile || submittingRevision) {
      return;
    }

    try {
      setSubmittingRevision(true);
      setActionError(null);

      const formData = new FormData();
      formData.append("documentId", selected.id);
      formData.append("file", stagedRevisionFile);

      await apiRequest<SubmitRevisionResponse>("/api/editor/documents/submit", {
        method: "POST",
        body: formData
      });

      await Promise.all([reloadDetail(selected.id), refreshDocuments()]);
      setStagedRevisionFile(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to submit revision.");
    } finally {
      setSubmittingRevision(false);
    }
  };

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

  const messageRows = detailPayload?.messageList || [];
  const versionRows = detailPayload?.versionHistory || [];

  const latestClientFeedback = useMemo(() => {
    if (!selected) return null;

    const candidateRows = selected.client_id
      ? messageRows.filter((row) => row.sender_id === selected.client_id)
      : messageRows.filter((row) => row.sender_id !== selected.assigned_editor_id);

    if (!candidateRows.length) {
      return null;
    }

    return candidateRows[candidateRows.length - 1];
  }, [messageRows, selected]);

  const latestSubmittedVersion = versionRows[0] || null;
  const selectedClientName = readProfileName(selected?.profiles);

  if (selectedView === "list") {
    return (
      <div className="w-full font-dm-sans animate-in fade-in duration-300 space-y-6">
        <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white">
          <div className="text-[20px] font-bold text-[#171717] leading-tight">Assigned Documents</div>
          <p className="text-[14px] text-[#525866] mt-1">Manage your active academic editing tasks and deadlines.</p>
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
      <div className="w-full font-dm-sans animate-in fade-in duration-300">
        <button onClick={() => setSelectedView("list")} className="flex items-center gap-2 text-[#00A0E3] hover:text-[#008cc2] font-medium text-[14px] self-start"><ArrowLeft className="w-4 h-4" /> Back</button>
      </div>
    );
  }

  return (
    <div className="w-full font-dm-sans bg-white min-h-[calc(100vh-76px)] flex flex-col animate-in fade-in duration-300">
      <div className="shrink-0 border-b border-gray-100 px-4 py-4">
        <div className="mb-2 flex items-center gap-2 text-[12px] text-[#8A94A6]">
        <button onClick={() => setSelectedView("list")} className="hover:text-[#525866] transition-colors">Assigned</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="truncate text-[#525866]">{selected.document_title || "Document"}</span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">{selected.document_title || "Document"}</div>
            <p className="text-[#78788D] text-[14px]">{selectedClientName} - {readServiceName(selected.services)}</p>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <span className={`px-3 py-1.5 rounded-full text-[12px] font-medium ${selectedMeta.statusColor}`}>{selectedMeta.statusText}</span>
            <button
              onClick={() => setShowVersionModal(true)}
              className="flex items-center gap-1.5 h-[36px] px-3 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#00A0E3] hover:bg-[#F9FAFB] transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              Version History
            </button>
            <button
              onClick={() => setShowExtensionModal(true)}
              className="flex items-center gap-1.5 h-[36px] px-3 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Extend Deadline
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mx-2 mt-4">
        {actionError ? <div className="mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{actionError}</div> : null}

        {(selected.status === "in_revision" || selected.revision_requested) ? (
          <div className="mb-5 rounded-[8px] border border-[#F4DFB0] bg-[#FCF7E8] px-4 py-3 text-[13px] text-[#D48822] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>The client has requested additional changes.</span>
          </div>
        ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] rounded-[12px] border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden bg-white">
        <div className="xl:border-r border-[#EAECF0]">
          <div className="p-5 border-b border-[#EAECF0]">
            <div className="text-[22px] font-medium text-[#171717] mb-4">Assignment Overview</div>
            <div className="grid grid-cols-2 gap-y-5 gap-x-6">
              <div>
                <div className="text-[14px] text-[#8A94A6] mb-1">Word Count</div>
                <div className="text-[14px] font-medium text-[#171717]">{Number(selected.word_count || 0).toLocaleString()} words</div>
              </div>
              <div>
                <div className="text-[14px] text-[#8A94A6] mb-1">Service Type</div>
                <div className="text-[14px] font-medium text-[#171717]">{readServiceName(selected.services)}</div>
              </div>
              <div>
                <div className="text-[14px] text-[#8A94A6] mb-1">Submission Date</div>
                <div className="text-[14px] font-medium text-[#171717]">{formatDate(selected.created_at)}</div>
              </div>
              <div>
                <div className="text-[14px] text-[#8A94A6] mb-1">Deadline</div>
                <div className="text-[14px] font-medium text-[#171717]">{formatDeadline(selected.deadline_at)}</div>
              </div>
            </div>
            <div className="mt-5 rounded-[10px] border border-[#EAECF0] bg-[#F8F9FB] px-4 py-3">
              <div className="text-[13px] font-medium text-[#525866] mb-1">Special Instructions</div>
              <p className="text-[12px] text-[#8A94A6] italic leading-relaxed">
                {selected.short_description?.trim() || "No additional client instructions were provided for this assignment."}
              </p>
            </div>
          </div>

          <div className="p-5 border-b border-[#EAECF0]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[22px] font-medium text-[#171717]">Client Feedback</div>
              <div className="text-[13px] text-[#8A94A6]">{latestClientFeedback ? formatDateTime(latestClientFeedback.created_at) : "No updates yet"}</div>
            </div>
            <div className="rounded-[10px] border border-[#F1E2B8] bg-[#FCF7E8] px-4 py-3 text-[14px] text-[#525866] italic leading-relaxed">
              {latestClientFeedback?.message || "No explicit feedback from the client yet. Use the message panel to request clarification if needed."}
            </div>
          </div>

          <div className="p-5">
            <div className="text-[22px] font-medium text-[#171717] mb-3">Submit Final Revision</div>

            {stagedRevisionFile ? (
              <div className="mb-3 rounded-[8px] border border-[#CAECDD] bg-[#EAF8F1] px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-[8px] bg-[#D2F0E3] text-[#1BA566] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#171717] truncate">{stagedRevisionFile.name}</div>
                    <div className="text-[12px] text-[#6F7885]">{formatFileSize(stagedRevisionFile.size)}</div>
                  </div>
                </div>
                <button onClick={() => setStagedRevisionFile(null)} className="text-[12px] text-[#1BA566] hover:underline">Remove</button>
              </div>
            ) : (selected.latest_editor_file_name || latestSubmittedVersion?.file_name) ? (
              <div className="mb-3 rounded-[8px] border border-[#CAECDD] bg-[#EAF8F1] px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-[8px] bg-[#D2F0E3] text-[#1BA566] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#171717] truncate">{selected.latest_editor_file_name || latestSubmittedVersion?.file_name}</div>
                    <div className="text-[12px] text-[#6F7885]">
                      {latestSubmittedVersion?.file_size_bytes ? formatFileSize(latestSubmittedVersion.file_size_bytes) : "Latest submitted revision"}
                    </div>
                  </div>
                </div>
                {(selected.latest_editor_file_url || latestSubmittedVersion?.file_url) ? (
                  <a href={selected.latest_editor_file_url || latestSubmittedVersion?.file_url || "#"} target="_blank" rel="noreferrer" className="p-1.5 rounded-md text-[#1BA566] hover:bg-white transition-colors">
                    <Download className="w-4 h-4" />
                  </a>
                ) : null}
              </div>
            ) : null}

            <div
              onClick={() => revisionInputRef.current?.click()}
              onDrop={(event) => {
                event.preventDefault();
                setDraggingRevision(false);
                const file = event.dataTransfer.files?.[0] || null;
                pickRevisionFile(file);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDraggingRevision(true);
              }}
              onDragLeave={() => setDraggingRevision(false)}
              className={`mb-3 rounded-[10px] border border-dashed px-4 py-14 text-center transition-colors ${draggingRevision ? "border-[#00A0E3] bg-[#F2FAFE]" : "border-[#D8DCE2] bg-[#F8F9FB]"}`}
            >
              <div className="mx-auto mb-4 h-9 w-9 rounded-[8px] bg-white border border-[#EAECF0] text-[#6F7885] flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div className="text-[24px] font-medium text-[#171717]">Drag and drop your document here or click <button onClick={(event) => { event.stopPropagation(); revisionInputRef.current?.click(); }} className="text-[#00A0E3] hover:underline" type="button">browse files</button></div>
              <div className="mt-2 text-[13px] text-[#8A94A6]">Supported formats: DOC, DOCX, PDF Maximum file size: 25MB</div>
              <input
                ref={revisionInputRef}
                type="file"
                className="hidden"
                accept=".doc,.docx,.pdf"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  pickRevisionFile(file);
                  event.currentTarget.value = "";
                }}
              />
            </div>

            <button
              onClick={() => void submitFinalRevision()}
              disabled={!stagedRevisionFile || submittingRevision}
              className="w-full h-[42px] rounded-[8px] bg-[#00A0E3] hover:bg-[#008cc2] text-white text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submittingRevision ? "Submitting Revision..." : "Submit Revision"}
            </button>
          </div>
        </div>

        <div className="flex flex-col min-h-[760px]">
          <div className="p-5 border-b border-[#EAECF0]">
            <div className="text-[22px] font-medium text-[#171717] mb-3">Original File</div>
            <div className="rounded-[8px] border border-[#D5EAF5] bg-[#EDF7FC] px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-[8px] bg-[#DFF0F8] text-[#2791C7] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-medium text-[#171717] truncate">{selected.uploaded_file_name || "Original file"}</div>
                  <div className="text-[12px] text-[#6F7885]">Source upload</div>
                </div>
              </div>
              {detailPayload?.originalFileDownloadLink || selected.uploaded_file_url ? (
                <a href={detailPayload?.originalFileDownloadLink || selected.uploaded_file_url || "#"} target="_blank" rel="noreferrer" className="text-[#00A0E3] p-1.5 hover:bg-white rounded-md transition-colors shrink-0"><Download className="w-4 h-4" /></a>
              ) : null}
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            <div className="px-5 py-4 border-b border-[#EAECF0]">
              <div className="text-[22px] font-medium text-[#171717]">Messages</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {detailLoading ? <div className="text-[13px] text-[#8A94A6]">Loading conversation...</div> : null}
              {!detailLoading && messageRows.map((msg) => {
                const isOwn = selected.client_id ? msg.sender_id !== selected.client_id : msg.sender_id === selected.assigned_editor_id;
                const senderName = isOwn ? "You" : readMessagePerson(msg.sender);

                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
                    {!isOwn ? (
                      <div className="h-8 w-8 rounded-full bg-[#111827] text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                        {initials(senderName)}
                      </div>
                    ) : null}

                    <div className={`max-w-[82%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
                      <div className={`rounded-[10px] px-3 py-2 text-[14px] leading-relaxed ${isOwn ? "bg-[#00A0E3] text-white" : "bg-[#F8F9FB] border border-[#EAECF0] text-[#171717]"}`}>
                        {msg.message || "-"}
                      </div>
                      <div className="mt-1 text-[11px] text-[#8A94A6]">{formatDateTime(msg.created_at)}</div>
                    </div>

                    {isOwn ? (
                      <div className="h-8 w-8 rounded-full bg-[#C4C6CC] text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                        {initials("You")}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {!detailLoading && messageRows.length === 0 ? (
                <div className="text-[13px] text-[#8A94A6]">No chat messages yet for this document.</div>
              ) : null}
            </div>

            <div className="px-4 py-3 border-t border-[#EAECF0]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                  placeholder={selected.client_id ? "Type your message..." : "Client is not available for messaging."}
                  disabled={sendingMessage || !selected.client_id}
                  className="flex-1 h-[42px] border border-[#EAECF0] rounded-[8px] px-3 text-[13px] text-[#171717] focus:outline-none focus:border-[#00A0E3] disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
                />
                <button
                  onClick={() => void sendMessage()}
                  disabled={sendingMessage || !messageText.trim() || !selected.client_id}
                  className="h-[42px] w-[42px] rounded-[8px] bg-[#00A0E3] hover:bg-[#008cc2] text-white flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {showVersionModal ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-[14px] border border-[#EAECF0] bg-white shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EAECF0] flex items-center justify-between">
              <div>
                <div className="text-[17px] font-bold text-[#171717]">Version History</div>
                <p className="text-[12px] text-[#8A94A6] mt-0.5">Review every submitted file version for this document.</p>
              </div>
              <button onClick={() => setShowVersionModal(false)} className="p-2 rounded-full hover:bg-[#F9FAFB] text-[#525866]"><X className="w-4 h-4" /></button>
            </div>
            <div className="max-h-[460px] overflow-y-auto p-5 space-y-3">
              {versionRows.map((version, index) => (
                <div key={version.id} className="rounded-[10px] border border-[#EAECF0] px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#171717] truncate">{version.file_name || `Version ${index + 1}`}</div>
                    <div className="text-[12px] text-[#8A94A6] mt-0.5">
                      {(version.version_type || "version").replaceAll("_", " ")} - {formatDateTime(version.created_at)}
                    </div>
                  </div>
                  {version.file_url ? (
                    <a href={version.file_url} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-md text-[#00A0E3] hover:bg-[#F4FAFD] flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </a>
                  ) : (
                    <button disabled className="h-8 w-8 rounded-md text-[#A0AAB5] flex items-center justify-center shrink-0 cursor-not-allowed">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {!versionRows.length ? <div className="text-[13px] text-[#8A94A6]">No versions have been submitted yet.</div> : null}
            </div>
          </div>
        </div>
      ) : null}

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
