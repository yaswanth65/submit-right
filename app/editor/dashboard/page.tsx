"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FileText, FileEdit, CheckSquare, AlertTriangle, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { apiGet } from "@/lib/client-api";

type EditorDocument = {
  id: string;
  document_title?: string;
  status?: string;
  word_count?: number;
  deadline_at?: string;
  updated_at?: string;
};

type EditorDashboardPayload = {
  activeDocumentCount: number;
  activeDocuments: EditorDocument[];
  pendingRevisionCount: number;
  pendingRevisionDocuments: EditorDocument[];
  dueTodayCount: number;
  dueTodayDocuments: EditorDocument[];
  completedCount: number;
  completedDocuments: EditorDocument[];
  recentActivity: EditorDocument[];
  dueSoon: EditorDocument[];
  user?: {
    full_name?: string;
    email?: string;
  };
};

function formatDateTime(value?: string) {
  if (!value) {
    return "No deadline";
  }

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function mapStatusStyle(status?: string) {
  if (status === "completed") {
    return "text-[#1CB061] bg-[#E0F2E9] border-[#1CB061]";
  }

  if (status === "in_revision") {
    return "text-[#FA7319] bg-[#FFF4ED] border-[#FA7319]";
  }

  if (status === "submitted") {
    return "text-[#8B5CF6] bg-[#F3E8FF] border-[#8B5CF6]";
  }

  return "text-[#00A0E3] bg-[#E0F6FF] border-[#00A0E3]";
}

function mapStatusLabel(status?: string) {
  switch (status) {
    case "in_revision":
      return "Revision Requested";
    case "being_edited":
      return "In Progress";
    case "submitted":
      return "Waiting for Acceptance";
    case "completed":
      return "Completed";
    default:
      return "In Progress";
  }
}

function relativeTime(value?: string) {
  if (!value) {
    return "Recently";
  }

  const diffMinutes = Math.floor((Date.now() - new Date(value).getTime()) / 60000);
  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)} min ago`;
  }

  const hours = Math.floor(diffMinutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function EditorDashboard() {
  const [payload, setPayload] = useState<EditorDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<EditorDashboardPayload>("/api/editor/dashboard");
        if (active) {
          setPayload(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard.");
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

  const stats = useMemo(
    () => [
      {
        title: "Active Assignments",
        value: payload?.activeDocumentCount ?? 0,
        icon: FileText,
        iconColor: "text-[#00A0E3]",
        iconBg: "bg-[#E0F6FF]"
      },
      {
        title: "Pending Revisions",
        value: payload?.pendingRevisionCount ?? 0,
        icon: FileEdit,
        iconColor: "text-[#FA7319]",
        iconBg: "bg-[#FFF4ED]"
      },
      {
        title: "Due Today",
        value: payload?.dueTodayCount ?? 0,
        icon: FileEdit,
        iconColor: "text-[#FA7319]",
        iconBg: "bg-[#FFF4ED]"
      },
      {
        title: "Completed",
        value: payload?.completedCount ?? 0,
        icon: CheckSquare,
        iconColor: "text-[#1CB061]",
        iconBg: "bg-[#E0F2E9]"
      }
    ],
    [payload]
  );

  return (
    <div className=" animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 pb-3 border-b border-[#E7E7E9] bg-white flex flex-col justify-center">
        <div className="text-[22px] font-medium text-[#1C1C1D] leading-tight">Dashboard</div>
        <div className="text-[14px] text-[#78788D] mt-1.5">
          Overview of your assigned work{payload?.user?.full_name ? `, ${payload.user.full_name}` : ""}.
        </div>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-6 border-b border-[#E7E7E9] bg-white mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-[#FAFAFA] border border-[#E7E7E9] rounded-[14px] p-4 flex flex-col justify-between min-h-[113px]">
              <div className="flex items-center justify-between">
                <div className="text-[16px] text-[#78788D] font-normal">{stat.title}</div>
                <div className="w-[40px] h-[40px] rounded-[10px] bg-white border border-[#E7E7E9] flex items-center justify-center flex-shrink-0">
                  <stat.icon className={`w-5 h-5 ${stat.iconColor.replace('text-', 'fill-').replace('text-', '')}`} fill="currentColor" strokeWidth={0} />
                </div>
              </div>
              <div className="text-[24px] font-semibold text-[#1C1C1D] leading-none mt-3">{loading ? "..." : stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[18px] font-medium text-[#171717]">Assigned Documents</div>
            <Link href="/editor/assigned" className="text-[14px] font-medium text-[#00A0E3] hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-none table-fixed min-w-[640px] lg:min-w-0 border-separate" style={{ borderSpacing: '0 6px' }}>
              <thead>
                <tr className="bg-[#F5F7FA]">
                  <th className="py-2.5 px-3.5 text-[14px] font-medium text-[#171717] rounded-l-[6px]">Document Name</th>
                  <th className="py-2.5 px-3.5 text-[14px] font-medium text-[#171717]">Client</th>
                  <th className="py-2.5 px-3.5 text-[14px] font-medium text-[#171717]">Word Count</th>
                  <th className="py-2.5 px-3.5 text-[14px] font-medium text-[#171717]">Deadline</th>
                  <th className="py-2.5 px-3.5 text-[14px] font-medium text-[#171717] rounded-r-[6px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0] bg-white">
                {(payload?.activeDocuments ?? []).map((doc) => {
                  const dueSoon = doc.deadline_at ? new Date(doc.deadline_at).getTime() - Date.now() < 24 * 60 * 60 * 1000 : false;
                  return (
                    <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors h-[42px]">
                      <td className="py-2 px-3 border-b border-[#EAECF0] max-w-[260px]">
                        <div className="flex items-center space-x-2 cursor-pointer group">
                          <FileText className="w-[18px] h-[18px] text-[#525866]" />
                          <span className="text-[14px] font-normal text-[#525866] group-hover:underline truncate">
                              {doc.document_title || "Untitled Document"}
                            </span>
                          </div>
                      </td>
                      <td className="py-2 px-3 border-b border-[#EAECF0] text-[14px] font-normal text-[#525866]">Client</td>
                      <td className="py-2 px-3 border-b border-[#EAECF0] text-[14px] font-normal text-[#525866]">{doc.word_count || 0}</td>
                      <td className="py-2 px-3 border-b border-[#EAECF0] text-[14px] font-normal">
                        {dueSoon ? (
                          <div className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#E5A64C] bg-[#FEF9E7] text-[#E5A64C] text-[12px] font-medium whitespace-nowrap">
                            <Clock className="w-3.5 h-3.5 mr-1" strokeWidth={2} />
                            {formatDateTime(doc.deadline_at)}
                          </div>
                        ) : (
                          <span className="text-[#525866]">{formatDateTime(doc.deadline_at)}</span>
                        )}
                      </td>
                      <td className="py-2 px-3 border-b border-[#EAECF0]">
                        <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium border inline-block whitespace-nowrap ${mapStatusStyle(doc.status)}`}>
                          {mapStatusLabel(doc.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {!loading && (payload?.activeDocuments ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 px-3 text-center text-[14px] text-[#78788D]">
                      No assigned documents found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8 pl-0 lg:pl-6 border-l-0 lg:border-l border-[#E7E7E9]">
          <div>
            <div className="text-[16px] font-semibold text-[#1C1C1D] mb-4">Due Soon</div>
            <div className="space-y-3">
              {(payload?.dueSoon ?? []).slice(0, 3).map((item) => {
                const isUrgent = item.deadline_at
                  ? new Date(item.deadline_at).getTime() - Date.now() < 24 * 60 * 60 * 1000
                  : false;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-[8px] flex items-center justify-between cursor-pointer transition-transform hover:translate-x-1 ${
                      isUrgent ? "bg-[#FFEFF0]" : "bg-[#F5F7FA]"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-[36px] h-[36px] rounded-[6px] flex items-center justify-center flex-shrink-0 ${isUrgent ? "bg-[#FFB6BC]" : "bg-[#525866]/15"}`}>
                        <FileText className={`w-5 h-5 ${isUrgent ? "text-[#FB3748]" : "text-[#525866]"}`} strokeWidth={0} fill="currentColor" />
                      </div>
                      <div className="flex flex-col justify-center min-h-[36px]">
                        <div className="text-[14px] font-medium text-[#1C1C1D] mb-1">{item.document_title || "Untitled Document"}</div>
                        <div className="flex items-center text-[12px] text-[#78788D]">
                          <span>{mapStatusLabel(item.status)}</span>
                          <span className="mx-1.5 w-px h-[14px] bg-[#78788D]"></span>
                          <Clock className={`w-3.5 h-[14px] mr-1 flex-shrink-0 ${isUrgent ? "text-[#FB3748]" : "text-[#525866]"}`} strokeWidth={2} />
                          <span className={isUrgent ? "text-[#FB3748]" : ""}>{formatDateTime(item.deadline_at)}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-[18px] h-[18px] text-[#1C1C1D] flex-shrink-0" />
                  </div>
                );
              })}

              {!loading && (payload?.dueSoon ?? []).length === 0 ? (
                <p className="text-[13px] text-[#78788D]">No upcoming deadlines.</p>
              ) : null}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E7E9]">
            <div className="text-[16px] font-semibold text-[#1C1C1D] mb-4">Recent Activity</div>
            <div className="relative pl-[5px] space-y-6 before:absolute before:left-3 before:top-4 before:bottom-0 before:w-px md:before:translate-x-0 before:bg-[#EAECF0]">
              <div className="hidden" />
              {(payload?.recentActivity ?? []).slice(0, 5).map((activity) => (
                <div key={activity.id} className="relative z-10 flex items-start gap-2.5">
                  <div className="w-4 h-4 mt-[1px] bg-white border border-[#EAECF0] rounded-full flex items-center justify-center flex-shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "completed" ? "bg-[#22C55E]" : "bg-[#00A1E6]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 pt-0">
                    <div className="text-[14px] font-medium text-[#171717] leading-tight">
                      {activity.document_title || "Document activity"}
                    </div>
                    <div className="text-[12px] font-medium text-[#525866]">{relativeTime(activity.updated_at)}</div>
                  </div>
                </div>
              ))}

              {!loading && (payload?.recentActivity ?? []).length === 0 ? (
                <p className="text-[13px] text-[#78788D]">No recent activity yet.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
