"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Mail, RefreshCw, Search, X } from "lucide-react";

type SubmissionStatus = "pending" | "resolved" | "closed";
type SubmissionFormType = "contact" | "post_publication_support";

type ContactSubmission = {
  id: string;
  formType: "contact";
  submittedAt: string;
  inquiryType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  message: string;
  status: SubmissionStatus;
};

type PublicationSubmission = {
  id: string;
  formType: "post_publication_support";
  submittedAt: string;
  inquiryType: string;
  fullName: string;
  email: string;
  phone: string;
  manuscriptTitle: string;
  journalName: string;
  supportNeeded: string;
  manuscriptStage: string;
  targetTimeline: string;
  message: string;
  status: SubmissionStatus;
};

type Submission = ContactSubmission | PublicationSubmission;

type ContactTemplate = "Acknowledgement" | "Need More Details" | "Escalated to Specialist";
type PublicationTemplate = "Submission Plan Shared" | "Reviewer Response Support" | "Journal Selection Guidance";

const contactRowsSeed: ContactSubmission[] = [
  {
    id: "contact-1",
    formType: "contact",
    submittedAt: "9/4/2026, 9:13:39 pm",
    inquiryType: "Technical Support",
    firstName: "Yaswanth",
    lastName: "Kancharla",
    email: "yaswanth.kancharla65@gmail.com",
    phone: "9059540117",
    institution: "VIT",
    message: "hello i need fixing",
    status: "pending",
  },
  {
    id: "contact-2",
    formType: "contact",
    submittedAt: "9/2/2026, 5:21:00 pm",
    inquiryType: "General Inquiry",
    firstName: "Asha",
    lastName: "R",
    email: "asha.research@email.com",
    phone: "9988776655",
    institution: "IIT Madras",
    message: "Need pricing details for journal formatting support.",
    status: "resolved",
  },
];

const publicationRowsSeed: PublicationSubmission[] = [
  {
    id: "pps-1",
    formType: "post_publication_support",
    submittedAt: "9/4/2026, 10:30:00 am",
    inquiryType: "Reviewer Response",
    fullName: "Srinivas Rao",
    email: "srinivas.rao@email.com",
    phone: "9440011223",
    manuscriptTitle: "Nanomaterials in Oncology",
    journalName: "Elsevier - Materials Today",
    supportNeeded: "Reviewer response drafting",
    manuscriptStage: "Major Revision",
    targetTimeline: "Within 7 days",
    message: "Need help drafting polite and precise point-by-point rebuttal.",
    status: "pending",
  },
  {
    id: "pps-2",
    formType: "post_publication_support",
    submittedAt: "9/1/2026, 8:15:00 pm",
    inquiryType: "Journal Selection",
    fullName: "Ritika Sharma",
    email: "ritika.sharma@email.com",
    phone: "9000055544",
    manuscriptTitle: "AI-assisted Clinical Triage",
    journalName: "Not selected",
    supportNeeded: "Journal shortlist and fit analysis",
    manuscriptStage: "Ready for submission",
    targetTimeline: "Within 3 days",
    message: "Need Q1/Q2 options with faster review cycle.",
    status: "closed",
  },
];

function statusBadge(status: SubmissionStatus) {
  if (status === "resolved") {
    return "bg-[#ECFDF3] text-[#027A48] border-[#A7F3D0]";
  }

  if (status === "closed") {
    return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
  }

  return "bg-[#FFF7ED] text-[#B45309] border-[#FDBA74]";
}

function statusLabel(status: SubmissionStatus) {
  if (status === "resolved") return "Resolved";
  if (status === "closed") return "Closed";
  return "Pending";
}

function SubmissionDetailsModal({
  submission,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) {
  const [contactTemplate, setContactTemplate] = useState<ContactTemplate>("Acknowledgement");
  const [publicationTemplate, setPublicationTemplate] = useState<PublicationTemplate>("Submission Plan Shared");
  const [markResolvedAfterSending, setMarkResolvedAfterSending] = useState(true);
  const [notes, setNotes] = useState("");

  if (!submission) return null;

  const isContact = submission.formType === "contact";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-dm-sans">
      <div className="absolute inset-0 bg-[#171717]/45" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-[900px] bg-white rounded-[16px] border border-[#EAECF0] shadow-[0_16px_40px_rgba(0,0,0,0.18)] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#EAECF0] flex items-start justify-between">
          <div>
            <div className="text-[28px] leading-none font-semibold text-[#171717] font-inter">
              {isContact ? "Contact Query Details" : "Post Publication Support Details"}
            </div>
            <div className="text-[16px] text-[#171717] mt-2">
              {isContact
                ? `${submission.firstName} ${submission.lastName} - ${submission.email}`
                : `${submission.fullName} - ${submission.email}`}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-[8px] border border-transparent hover:border-[#EAECF0] hover:bg-[#F9FAFB] inline-flex items-center justify-center text-[#525866]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[12px] border border-[#C7D2E5] px-4 py-3">
              <div className="text-[13px] uppercase tracking-wide text-[#334155]">Inquiry Type</div>
              <div className="text-[30px] leading-none font-semibold text-[#171717] mt-1">{submission.inquiryType}</div>
            </div>
            <div className="rounded-[12px] border border-[#C7D2E5] px-4 py-3">
              <div className="text-[13px] uppercase tracking-wide text-[#334155]">Submitted</div>
              <div className="text-[30px] leading-none font-semibold text-[#171717] mt-1">{submission.submittedAt}</div>
            </div>
          </div>

          {isContact ? (
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-[10px] border border-[#EAECF0] px-4 py-3">
                <div className="text-[13px] text-[#525866]">Phone</div>
                <div className="text-[14px] font-medium text-[#171717] mt-1">{submission.phone || "-"}</div>
              </div>
              <div className="rounded-[10px] border border-[#EAECF0] px-4 py-3 col-span-2">
                <div className="text-[13px] text-[#525866]">Institution</div>
                <div className="text-[14px] font-medium text-[#171717] mt-1">{submission.institution || "-"}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[10px] border border-[#EAECF0] px-4 py-3">
                <div className="text-[13px] text-[#525866]">Manuscript Stage</div>
                <div className="text-[14px] font-medium text-[#171717] mt-1">{submission.manuscriptStage}</div>
              </div>
              <div className="rounded-[10px] border border-[#EAECF0] px-4 py-3">
                <div className="text-[13px] text-[#525866]">Target Timeline</div>
                <div className="text-[14px] font-medium text-[#171717] mt-1">{submission.targetTimeline}</div>
              </div>
              <div className="rounded-[10px] border border-[#EAECF0] px-4 py-3 col-span-2">
                <div className="text-[13px] text-[#525866]">Manuscript</div>
                <div className="text-[14px] font-medium text-[#171717] mt-1">{submission.manuscriptTitle}</div>
                <div className="text-[13px] text-[#525866] mt-1">Journal: {submission.journalName}</div>
                <div className="text-[13px] text-[#525866] mt-1">Support Needed: {submission.supportNeeded}</div>
              </div>
            </div>
          )}

          <div className="rounded-[12px] border border-[#C7D2E5] px-4 py-3">
            <div className="text-[13px] uppercase tracking-wide text-[#334155]">Message</div>
            <div className="text-[16px] leading-relaxed font-medium text-[#171717] mt-2">{submission.message}</div>
          </div>

          <div>
            <div className="text-[28px] leading-none font-semibold text-[#171717] font-inter">Reply Through Mail</div>

            <div className="mt-3">
              <div className="text-[13px] font-medium text-[#171717] mb-1.5">Template</div>
              <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                <select
                  value={isContact ? contactTemplate : publicationTemplate}
                  onChange={(event) => {
                    if (isContact) {
                      setContactTemplate(event.target.value as ContactTemplate);
                    } else {
                      setPublicationTemplate(event.target.value as PublicationTemplate);
                    }
                  }}
                  className="h-[44px] rounded-[10px] border border-[#C7D2E5] px-4 text-[15px] font-medium text-[#171717] bg-white outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
                >
                  {isContact ? (
                    <>
                      <option>Acknowledgement</option>
                      <option>Need More Details</option>
                      <option>Escalated to Specialist</option>
                    </>
                  ) : (
                    <>
                      <option>Submission Plan Shared</option>
                      <option>Reviewer Response Support</option>
                      <option>Journal Selection Guidance</option>
                    </>
                  )}
                </select>

                <label className="inline-flex items-center gap-2 text-[15px] text-[#171717]">
                  <input
                    type="checkbox"
                    checked={markResolvedAfterSending}
                    onChange={(event) => setMarkResolvedAfterSending(event.target.checked)}
                    className="w-4 h-4 rounded border-[#CBD5E1]"
                  />
                  Mark as resolved after sending
                </label>
              </div>

              <div className="text-[14px] text-[#334155] mt-2">
                {isContact
                  ? "Confirms receipt and follow-up."
                  : "Sends a clear plan and next steps for publication support."}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[13px] font-medium text-[#171717] mb-1.5">Additional Notes</div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder={
                  isContact
                    ? "Add optional context before sending the template response"
                    : "Add publication-specific guidance before sending"
                }
                className="w-full min-h-[130px] rounded-[12px] border border-[#8FA6C9] px-4 py-3 text-[15px] leading-relaxed text-[#1E3354] placeholder-[#4A638A] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-[#EAECF0] flex justify-end items-center gap-3 bg-white">
          <button
            onClick={onClose}
            className="h-[42px] px-6 rounded-[12px] border border-[#8FA6C9] text-[15px] text-[#1E3354] hover:bg-[#F8FBFF]"
          >
            Close
          </button>
          <button className="h-[42px] px-6 rounded-[12px] bg-[#FF7A00] hover:bg-[#E86F00] text-white text-[15px] font-medium inline-flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFormSubmissionsPage() {
  const [selectedType, setSelectedType] = useState<SubmissionFormType>("contact");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiryFilter, setInquiryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [contactRows, setContactRows] = useState<ContactSubmission[]>(contactRowsSeed);
  const [publicationRows, setPublicationRows] = useState<PublicationSubmission[]>(publicationRowsSeed);

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const data = selectedType === "contact" ? contactRows : publicationRows;

  const inquiryOptions = useMemo(() => {
    const values = Array.from(new Set(data.map((item) => item.inquiryType)));
    return values;
  }, [data]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    const base = data.filter((item) => {
      const matchesSearch =
        !query ||
        (selectedType === "contact"
          ? `${item.firstName} ${item.lastName} ${item.email} ${item.phone} ${item.institution} ${item.message}`
              .toLowerCase()
              .includes(query)
          : `${item.fullName} ${item.email} ${item.phone} ${item.manuscriptTitle} ${item.journalName} ${item.message}`
              .toLowerCase()
              .includes(query));

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesInquiry = inquiryFilter === "all" || item.inquiryType === inquiryFilter;

      return matchesSearch && matchesStatus && matchesInquiry;
    });

    return [...base].sort((a, b) => {
      if (sortOrder === "oldest") {
        return a.submittedAt.localeCompare(b.submittedAt);
      }
      return b.submittedAt.localeCompare(a.submittedAt);
    });
  }, [data, inquiryFilter, search, selectedType, sortOrder, statusFilter]);

  const updateStatus = (id: string, status: SubmissionStatus) => {
    if (selectedType === "contact") {
      setContactRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
      return;
    }

    setPublicationRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setInquiryFilter("all");
    setSortOrder("newest");
  };

  return (
    <div className="w-full font-dm-sans">
      <div className="flex items-center text-[13px] text-[#A0AAB5] mb-6">
        <Link href="/admin/dashboard" className="hover:text-[#171717] transition-colors">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-[#171717] font-medium">Form Submissions</span>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-[24px] font-medium text-[#1C1C1D] mb-1 font-inter">Contact Queries</div>
          <p className="text-[14px] text-[#78788D]">Review and reply to all user-submitted requests from contact and post publication support forms.</p>
        </div>

        <button
          onClick={resetFilters}
          className="h-[40px] px-4 rounded-[10px] border border-[#EAECF0] bg-white text-[#171717] text-[14px] font-medium inline-flex items-center gap-2 hover:bg-[#F9FAFB]"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-[12px] border border-[#EAECF0] shadow-sm overflow-hidden">
        <div className="px-4 pt-4">
          <div className="inline-flex rounded-[10px] border border-[#EAECF0] p-1 bg-[#F8FAFC]">
            <button
              onClick={() => {
                setSelectedType("contact");
                setInquiryFilter("all");
              }}
              className={`h-[36px] px-4 rounded-[8px] text-[13px] font-medium transition-colors ${
                selectedType === "contact" ? "bg-white text-[#171717] shadow-sm" : "text-[#525866]"
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                setSelectedType("post_publication_support");
                setInquiryFilter("all");
              }}
              className={`h-[36px] px-4 rounded-[8px] text-[13px] font-medium transition-colors ${
                selectedType === "post_publication_support" ? "bg-white text-[#171717] shadow-sm" : "text-[#525866]"
              }`}
            >
              Post Publication Support
            </button>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 flex-wrap border-b border-[#EAECF0]">
          <div className="relative w-full max-w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
            <input
              type="text"
              placeholder="Search name, email, phone, institution..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full h-[40px] rounded-[8px] border border-[#EAECF0] pl-9 pr-3 text-[14px] text-[#171717] placeholder-[#A0AAB5] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-[40px] rounded-[8px] border border-[#EAECF0] px-3 text-[14px] text-[#171717] bg-white outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={inquiryFilter}
            onChange={(event) => setInquiryFilter(event.target.value)}
            className="h-[40px] rounded-[8px] border border-[#EAECF0] px-3 text-[14px] text-[#171717] bg-white outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
          >
            <option value="all">All Inquiry Types</option>
            {inquiryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="h-[40px] rounded-[8px] border border-[#EAECF0] px-3 text-[14px] text-[#171717] bg-white outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button className="h-[40px] px-4 rounded-[12px] border border-[#FDBA74] text-[#B45309] text-[14px] font-medium bg-[#FFF7ED]">
            Apply
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F3F6FA] border-b border-[#EAECF0]">
                <th className="px-5 py-3 text-[13px] font-bold text-[#171717]">Submitted</th>
                <th className="px-5 py-3 text-[13px] font-bold text-[#171717]">User</th>
                <th className="px-5 py-3 text-[13px] font-bold text-[#171717]">{selectedType === "contact" ? "Inquiry" : "Support Need"}</th>
                <th className="px-5 py-3 text-[13px] font-bold text-[#171717]">{selectedType === "contact" ? "Message" : "Manuscript"}</th>
                <th className="px-5 py-3 text-[13px] font-bold text-[#171717]">Status</th>
                <th className="px-5 py-3 text-[13px] font-bold text-[#171717]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[14px] text-[#A0AAB5]">
                    No submissions found for this filter.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                    <td className="px-5 py-4 text-[14px] leading-tight text-[#171717] whitespace-nowrap">{row.submittedAt}</td>
                    <td className="px-5 py-4 text-[14px] leading-tight text-[#171717]">
                      <div className="font-semibold text-[#171717]">
                        {row.formType === "contact" ? `${row.firstName} ${row.lastName}` : row.fullName}
                      </div>
                      <div className="text-[#525866]">{row.email}</div>
                      <div className="text-[#525866]">{row.phone}</div>
                      {row.formType === "contact" ? <div className="text-[#525866]">{row.institution}</div> : null}
                    </td>
                    <td className="px-5 py-4 text-[14px] leading-tight text-[#171717]">
                      {row.formType === "contact" ? row.inquiryType : row.supportNeeded}
                    </td>
                    <td className="px-5 py-4 text-[14px] leading-tight text-[#171717]">
                      {row.formType === "contact" ? row.message : row.manuscriptTitle}
                    </td>
                    <td className="px-5 py-4">
                      <div className={`inline-flex items-center px-3 py-0.5 rounded-[10px] border text-[12px] font-medium uppercase tracking-wide ${statusBadge(row.status)}`}>
                        {statusLabel(row.status)}
                      </div>
                      <div className="mt-2">
                        <select
                          value={row.status}
                          onChange={(event) => updateStatus(row.id, event.target.value as SubmissionStatus)}
                          className="h-[42px] min-w-[160px] rounded-[8px] border border-[#D9E1EC] px-3 text-[14px] text-[#171717] bg-white outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]"
                        >
                          <option value="pending">Pending</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedSubmission(row)}
                        className="h-[42px] px-4 rounded-[10px] border border-[#FDBA74] text-[#B45309] text-[14px] font-medium bg-[#FFF7ED] inline-flex items-center gap-2 hover:bg-[#FFEDD5]"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSubmission ? (
        <SubmissionDetailsModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      ) : null}
    </div>
  );
}
