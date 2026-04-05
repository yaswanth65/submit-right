"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter, MoreVertical, FileText, UserPlus } from "lucide-react";
import { AssignEditorModal } from "@/components/AssignEditorModal";
import { apiGet, apiRequest } from "@/lib/client-api";

type DocumentRow = {
  id: string;
  document_title?: string;
  word_count?: number;
  deadline_at?: string;
  assigned_editor_id?: string | null;
  status?: string;
  profiles?: { full_name?: string } | Array<{ full_name?: string }> | null;
  services?: { title?: string } | Array<{ title?: string }> | null;
};

type DocumentsPayload = {
  list: DocumentRow[];
};

type EditorRow = {
  id: string;
  full_name?: string | null;
  email?: string | null;
};

function formatDate(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function readName(profile?: { full_name?: string } | Array<{ full_name?: string }> | null) {
  if (!profile) return "Student";
  if (Array.isArray(profile)) return profile[0]?.full_name || "Student";
  return profile.full_name || "Student";
}

function readService(service?: { title?: string } | Array<{ title?: string }> | null) {
  if (!service) return "Service";
  if (Array.isArray(service)) return service[0]?.title || "Service";
  return service.title || "Service";
}

function statusMeta(status?: string, deadlineAt?: string, assignedEditorId?: string | null) {
  const overdue = !!deadlineAt && new Date(deadlineAt).getTime() < Date.now() && status !== "completed";
  if (overdue) return { label: "Overdue", className: "bg-[#FFEBEB] text-[#FB3748]" };
  if (!assignedEditorId) return { label: "Unassigned", className: "bg-[#FFEFE5] text-[#FA7319]" };
  return { label: "Assigned", className: "bg-[#E0F2E9] text-[#1CB061]" };
}

export default function AssignmentsScreen() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [editors, setEditors] = useState<EditorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);

  const reload = async () => {
    try {
      setLoading(true);
      setError(null);
      const [docs, eds] = await Promise.all([
        apiGet<DocumentsPayload>("/api/admin/documents"),
        apiGet<EditorRow[]>("/api/admin/editors")
      ]);
      setDocuments(docs.list || []);
      setEditors(Array.isArray(eds) ? eds : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((row) => {
      const title = (row.document_title || "").toLowerCase();
      const student = readName(row.profiles).toLowerCase();
      const service = readService(row.services).toLowerCase();
      return title.includes(q) || student.includes(q) || service.includes(q);
    });
  }, [documents, search]);

  const selectedDocument = useMemo(
    () => documents.find((row) => row.id === selectedDocumentId) || null,
    [documents, selectedDocumentId]
  );

  const selectedDocumentSummary = selectedDocument
    ? {
        id: selectedDocument.id,
        title: selectedDocument.document_title || "Document",
        studentName: readName(selectedDocument.profiles),
        serviceType: readService(selectedDocument.services),
        wordCount: Number(selectedDocument.word_count || 0),
        deadlineText: formatDate(selectedDocument.deadline_at),
        assignedEditorId: selectedDocument.assigned_editor_id
      }
    : null;

  const handleAssign = async (input: { documentId: string; editorId: string; reason?: string }) => {
    try {
      setIsAssigning(true);
      setAssignError(null);
      await apiRequest("/api/admin/documents/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: input.documentId,
          editorId: input.editorId,
          reason: input.reason || "Assigned by admin"
        })
      });
      setIsAssignModalOpen(false);
      setSelectedDocumentId(null);
      await reload();
    } catch (err) {
      setAssignError(err instanceof Error ? err.message : "Failed to assign editor.");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="space-y-6 w-full font-dm-sans animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Assignments</div>
          <p className="text-[14px] text-[#525866]">Assign and manage editor workload.</p>
        </div>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-4 flex justify-between items-center border-b border-[#EAECF0]">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-[#EAECF0] text-[#171717] rounded-[8px] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-medium  whitespace-nowrap">Document Name</th>
                <th className="py-3 px-6 text-[12px] font-medium whitespace-nowrap">Student Name</th>
                <th className="py-3 px-6 text-[12px] font-medium  whitespace-nowrap">Service Type</th>
                <th className="py-3 px-6 text-[12px] font-medium whitespace-nowrap">Word Count</th>
                <th className="py-3 px-6 text-[12px] font-medium whitespace-nowrap">Deadline</th>
                <th className="py-3 px-6 text-[12px] font-medium  whitespace-nowrap">Assigned Editor</th>
                <th className="py-3 px-6 text-[12px] font-medium  whitespace-nowrap">Ass. Status</th>
                <th className="py-3 px-6 text-[12px] font-medium  text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((item) => (
                <tr key={item.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors group/row">
                  <td className="py-4 px-6 text-[13px] font-medium text-[#525866] whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-[#A0AAB5]" />
                      <Link href={`/admin/documents/${item.id}`} className="hover:text-[#00A0E3] hover:underline">
                        {item.document_title || "Document"}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{readName(item.profiles)}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{readService(item.services)}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{Number(item.word_count || 0).toLocaleString()}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{formatDate(item.deadline_at)}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.assigned_editor_id ? "Assigned" : "-"}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {(() => {
                      const meta = statusMeta(item.status, item.deadline_at, item.assigned_editor_id);
                      return (
                        <span className={`${meta.className} px-2.5 py-1 rounded-full text-[12px] font-semibold inline-flex items-center`}>
                          {meta.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap flex justify-center items-center h-full min-h-[52px]">
                    {!item.assigned_editor_id ? (
                      <button 
                        onClick={() => {
                          setSelectedDocumentId(item.id);
                          setIsAssignModalOpen(true);
                          setAssignError(null);
                        }}
                        className="bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] p-1.5 rounded-[6px] transition-colors flex items-center justify-center shadow-sm"
                        title="Assign Editor"
                      >
                        <UserPlus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                      </button>
                    ) : (
                      <button className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1.5">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[13px] text-[#8A94A6]">No assignments found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {error ? <div className="text-[13px] text-[#B42318]">{error}</div> : null}

      <AssignEditorModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          if (!isAssigning) {
            setIsAssignModalOpen(false);
            setSelectedDocumentId(null);
            setAssignError(null);
          }
        }}
        document={selectedDocumentSummary}
        editors={editors}
        onAssign={handleAssign}
        isSubmitting={isAssigning}
        error={assignError}
      />
    </div>
  );
}