"use client";

import React, { useMemo, useState } from "react";
import { X, Search } from "lucide-react";

type EditorRow = {
  id: string;
  full_name?: string | null;
  email?: string | null;
};

type DocumentSummary = {
  id: string;
  title: string;
  studentName: string;
  serviceType: string;
  wordCount: number;
  deadlineText: string;
  assignedEditorId?: string | null;
};

interface AssignEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentSummary | null;
  editors: EditorRow[];
  onAssign: (input: { documentId: string; editorId: string; reason?: string }) => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
}

export function AssignEditorModal({
  isOpen,
  onClose,
  document,
  editors,
  onAssign,
  isSubmitting = false,
  error = null
}: AssignEditorModalProps) {
  const [query, setQuery] = useState("");
  const [selectedEditorId, setSelectedEditorId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const filteredEditors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return editors;
    return editors.filter((editor) => {
      const name = (editor.full_name || "").toLowerCase();
      const email = (editor.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [editors, query]);

  const handleAssign = async () => {
    if (!document || !selectedEditorId || isSubmitting) return;
    await onAssign({
      documentId: document.id,
      editorId: selectedEditorId,
      reason: reason.trim() || undefined
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-dm-sans">
      <div className="absolute inset-0 bg-[#171717]/40 backdrop-blur-[2px]" onClick={onClose}></div>

      <div className="bg-[#FFFFFF] w-full max-w-[500px] rounded-[16px] shadow-xl relative z-10 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
          <div className="text-[18px] font-bold text-[#171717]">Assign Editor</div>
          <button onClick={onClose} className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1 rounded-full hover:bg-[#F9FAFB]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="text-[14px] font-bold text-[#171717] mb-3">Document Details</div>
          <div className="bg-[#F9FAFB] rounded-[12px] p-4 border border-[#EAECF0] mb-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div className="col-span-2">
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Document Title</div>
                <div className="text-[14px] font-semibold text-[#171717]">{document?.title || "-"}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Student Name</div>
                <div className="text-[14px] font-semibold text-[#171717]">{document?.studentName || "-"}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Service Type</div>
                <div className="text-[14px] font-semibold text-[#171717]">{document?.serviceType || "-"}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Word Count</div>
                <div className="text-[14px] font-semibold text-[#171717]">{document?.wordCount?.toLocaleString() || 0} words</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#A0AAB5] mb-1">Deadline</div>
                <div className="text-[14px] font-semibold text-[#171717]">{document?.deadlineText || "-"}</div>
              </div>
            </div>
          </div>

          <div className="text-[14px] font-bold text-[#171717] mb-3">Available Editors ({filteredEditors.length})</div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {filteredEditors.map((editor) => {
              const isSelected = selectedEditorId === editor.id;
              const isCurrent = document?.assignedEditorId === editor.id;
              return (
                <button
                  type="button"
                  key={editor.id}
                  onClick={() => setSelectedEditorId(editor.id)}
                  className={`w-full text-left border rounded-[10px] p-4 transition-colors ${
                    isSelected ? "border-[#00A0E3] bg-[#F4FAFD]" : "border-[#EAECF0] bg-[#FFFFFF]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[14px] font-bold text-[#171717]">{editor.full_name || "Editor"}</div>
                      <div className="text-[12px] text-[#525866]">{editor.email || "-"}</div>
                    </div>
                    <div className="text-[12px] font-semibold text-[#00A0E3]">
                      {isCurrent ? "Current" : isSelected ? "Selected" : ""}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredEditors.length === 0 ? (
              <div className="border border-[#EAECF0] rounded-[10px] p-4 text-[13px] text-[#8A94A6]">No editors found.</div>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="text-[13px] font-bold text-[#171717] mb-2">Reason (optional)</div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value.slice(0, 500))}
              placeholder="Add reason for assignment/reassignment"
              className="w-full border border-[#EAECF0] rounded-[8px] p-3 text-[13px] text-[#171717] min-h-[90px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3]"
            />
          </div>

          {error ? (
            <div className="mt-3 text-[12px] text-[#B42318] bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] px-3 py-2">{error}</div>
          ) : null}
        </div>

        <div className="px-6 py-4 border-t border-[#EAECF0] flex justify-between items-center rounded-b-[16px] bg-[#FFFFFF]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-bold text-[#525866] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!document || !selectedEditorId || isSubmitting}
            className="px-5 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] rounded-[8px] text-[13px] font-bold transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Confirm Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
