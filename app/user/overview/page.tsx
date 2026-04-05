"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  FileText,
  Edit3,
  CheckSquare,
  Info,
  File
} from "lucide-react";
import { apiGet } from "@/lib/client-api";

type OverviewDocument = {
  id: string;
  document_title?: string;
  status?: string;
  updated_at?: string;
  created_at?: string;
};

type OverviewPayload = {
  pendingPaymentDocuments: OverviewDocument[];
  totalSubmittedDocumentsCount: number;
  totalSubmittedDocuments: OverviewDocument[];
  inProgressCount: number;
  completedCount: number;
  recentProgress: OverviewDocument[];
};

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
      <span className="bg-[#FFF7ED] text-[#EA580C] text-[12px] font-medium px-3 py-1 rounded-full">
        {label}
      </span>
    );
  }

  if (status === "being_edited" || status === "in_revision" || status === "submitted") {
    return (
      <span className="bg-[#EFF6FF] text-[#00A0E3] text-[12px] font-medium px-3 py-1 rounded-full">
        {label}
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="bg-[#ECFDF5] text-[#059669] text-[12px] font-medium px-3 py-1 rounded-full">
        {label}
      </span>
    );
  }

  return <span className="bg-[#F5F7FA] text-[#525866] text-[12px] font-medium px-3 py-1 rounded-full">{label}</span>;
}

function getAction(status?: string, id?: string) {
  if (status === "payment_needed") {
    return (
      <Link href="/user/payments" className="text-[#EA580C] font-semibold text-[13px] hover:underline">
        Pay Now
      </Link>
    );
  }

  if (status === "completed" && id) {
    return (
      <Link href={`/user/documents/${id}`} className="text-[#00A0E3] font-semibold text-[13px] hover:underline">
        View
      </Link>
    );
  }

  return <span className="text-[#A0AAB5]">-</span>;
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

function activityTitle(status?: string) {
  switch (status) {
    case "completed":
      return "Editing Completed";
    case "payment_needed":
      return "Payment Required";
    case "being_edited":
    case "in_revision":
      return "Editing In Progress";
    default:
      return "Document Updated";
  }
}

export default function OverviewPage() {
  const [data, setData] = useState<OverviewPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const response = await apiGet<OverviewPayload>("/api/client/overview");
        if (active) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load overview.");
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

  const activeDocuments = useMemo(() => (data?.totalSubmittedDocuments ?? []).slice(0, 7), [data]);
  const recentActivity = useMemo(() => (data?.recentProgress ?? []).slice(0, 6), [data]);
  const pendingPaymentDocument = data?.pendingPaymentDocuments?.[0];

  return (
    <div className="w-full font-dm-sans">
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">Overview</h1>
        <p className="text-[#78788D] text-[14px]">Track your submissions, payments, and editing progress.</p>
      </div>

      {error ? (
        <div className="mx-4 mt-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

      <div className="w-full min-w-0 flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full min-w-0 lg:flex-1 p-4 flex flex-col gap-6">
          <div className="bg-[rgb(249,244,230)] border border-[#CEA02D] rounded-[16px] overflow-hidden">
            <div className="p-4 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-[42px] h-[42px] rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-[20px] h-[20px] text-[#CEA02D]" strokeWidth={2.5} />
                </div>
                <div className="mt-0.5">
                  <h3 className="text-[18px] font-bold text-[#CEA02D] mb-1">Payment required to continue</h3>
                  <p className="text-[#78788D] text-[14px]">
                    {pendingPaymentDocument
                      ? "One or more documents need payment before final delivery."
                      : "No pending payments right now. You are all clear."}
                  </p>
                </div>
              </div>
              <Link
                href="/user/payments"
                className="flex items-center underline gap-2 text-[#D97706] font-bold text-[14px] hover:underline shrink-0 sm:mt-0 mt-2"
              >
                View Payments <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border-t border-[#FDE68A]/50 px-6 py-4 bg-[#FFFCF0]/50 flex gap-2">
              <span className="text-[#78788D] text-[14px]">Document:</span>
              <span className="text-[#171717] font-medium text-[14px]">
                {pendingPaymentDocument?.document_title || "No pending document"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAFAFA] border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-[#8A94A6] text-[14px] font-medium">Total Documents</span>
                <div className="w-8 h-8 rounded-lg bg-[#F0F6FF] flex items-center justify-center">
                  <FileText className="w-[16px] h-[16px] text-[#00A0E3]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[32px] font-bold text-[#171717] leading-none mt-2">
                {loading ? "..." : data?.totalSubmittedDocumentsCount ?? 0}
              </span>
            </div>

            <div className="bg-[#FAFAFA] border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-[#8A94A6] text-[14px] font-medium">In Progress</span>
                <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
                  <Edit3 className="w-[16px] h-[16px] text-[#EA580C]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[32px] font-bold text-[#171717] leading-none mt-2">
                {loading ? "..." : data?.inProgressCount ?? 0}
              </span>
            </div>

            <div className="bg-[#FAFAFA] border border-[#EAECF0] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-[#8A94A6] text-[14px] font-medium">Completed</span>
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center">
                  <CheckSquare className="w-[16px] h-[16px] text-[#059669]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[32px] font-bold text-[#171717] leading-none mt-2">
                {loading ? "..." : data?.completedCount ?? 0}
              </span>
            </div>
          </div>

          <div className="mt-2 min-w-0">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-[18px] font-bold text-[#171717]">Active Documents</h2>
              <Link href="/user/documents" className="text-[#00A0E3] text-[13px] font-bold hover:underline">
                View All
              </Link>
            </div>

            <div className="bg-white rounded-[16px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#EFF7FB] border-b border-[#EAECF0]">
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866] w-[28%]">Document Name</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Service Type</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Last Updated</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Status</th>
                      <th className="px-5 py-4 text-[13px] font-medium text-[#525866]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDocuments.map((doc, idx) => (
                      <tr
                        key={doc.id}
                        className={`hover:bg-[#F8FAFC] transition-colors ${
                          idx !== activeDocuments.length - 1 ? "border-b border-[#EAECF0]" : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <File className="w-4 h-4 text-[#A0AAB5]" strokeWidth={2} />
                            <span className="text-[14px] font-medium text-[#171717] truncate">
                              {doc.document_title || "Untitled Document"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[13px] text-[#525866]">General Service</td>
                        <td className="px-5 py-4 text-[13px] text-[#525866]">{formatDate(doc.updated_at || doc.created_at)}</td>
                        <td className="px-5 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-5 py-4">{getAction(doc.status, doc.id)}</td>
                      </tr>
                    ))}
                    {!loading && activeDocuments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-10 text-center text-[13px] text-[#78788D]">
                          No documents found.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 flex flex-col gap-8 lg:border-l p-4 lg:border-[#EAECF0]">
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full bg-[#00A0E3] text-white flex items-center justify-center">
                <Info className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <h2 className="text-[16px] font-bold text-[#171717]">What Happens Next</h2>
            </div>

            <div className="relative">
              <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-[#EAECF0] z-0"></div>

              <div className="relative z-10 flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#EAECF0] flex items-center justify-center text-[12px] font-bold text-[#171717] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717] mb-1">Document Review</h4>
                  <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                    Our academic experts verify your submission and select the best editor.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#EAECF0] flex items-center justify-center text-[12px] font-bold text-[#171717] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717] mb-1">Active Editing</h4>
                  <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                    Your document is being edited. You will be notified when changes are ready.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#EAECF0] flex items-center justify-center text-[12px] font-bold text-[#171717] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#171717] mb-1">Final Approval</h4>
                  <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                    Review the changes and download your final polished manuscript.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#EAECF0] hidden lg:block"></div>

          <div>
            <h2 className="text-[16px] font-bold text-[#171717] mb-6">Recent Activity</h2>

            <div className="relative">
              <div className="absolute left-[5px] top-2 bottom-4 w-[2px] bg-[#EAECF0] z-0"></div>

              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative z-10 flex items-start gap-4 mb-6">
                  <div className="relative mt-1 shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full ring-[4px] ring-white ${
                        activity.status === "completed"
                          ? "bg-[#059669]"
                          : activity.status === "payment_needed"
                          ? "bg-[#EA580C]"
                          : "bg-[#00A0E3]"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h4 className="text-[14px] font-bold text-[#171717] leading-tight">
                        {activityTitle(activity.status)}
                      </h4>
                      <span className="text-[12px] text-[#A0AAB5] shrink-0 font-medium">
                        {formatDate(activity.updated_at || activity.created_at)}
                      </span>
                    </div>
                    <p className="text-[#8A94A6] text-[13px] leading-relaxed">
                      {(activity.document_title || "A document")} was updated in your workflow.
                    </p>
                  </div>
                </div>
              ))}

              {!loading && recentActivity.length === 0 ? (
                <p className="text-[13px] text-[#8A94A6]">No recent activity found.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
