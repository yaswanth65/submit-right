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
    <div className="space-y-8 animate-in fade-in duration-500 w-full font-dm-sans">
      <div>
        <div className="text-[24px] font-bold text-[#171717] mb-1">Dashboard</div>
        <div className="text-[14px] text-[#525866]">
          Overview of your assigned work{payload?.user?.full_name ? `, ${payload.user.full_name}` : ""}.
        </div>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex items-start justify-between">
            <div>
              <div className="text-[14px] text-[#525866] font-medium mb-3">{stat.title}</div>
              <div className="text-[32px] font-bold text-[#171717] leading-none">{loading ? "..." : stat.value}</div>
            </div>
            <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0 ${stat.iconBg} ${stat.iconColor}`}>
              <stat.icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#171717]">Assigned Documents</h2>
            <Link href="/editor/assigned" className="text-[14px] font-semibold text-[#00A0E3] hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[640px] lg:min-w-0">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Document Name</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Client</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Word Count</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Deadline</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {(payload?.activeDocuments ?? []).map((doc) => {
                    const dueSoon = doc.deadline_at ? new Date(doc.deadline_at).getTime() - Date.now() < 24 * 60 * 60 * 1000 : false;
                    return (
                      <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-4 px-6 max-w-[260px]">
                          <div className="flex items-center space-x-3 cursor-pointer group">
                            <FileText className="w-4 h-4 text-[#A0AAB5] group-hover:text-[#525866] transition-colors" />
                            <span className="text-[13px] font-medium text-[#171717] group-hover:underline truncate">
                              {doc.document_title || "Untitled Document"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[13px] text-[#525866]">Client</td>
                        <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.word_count || 0}</td>
                        <td className="py-4 px-6 text-[13px]">
                          {dueSoon ? (
                            <div className="inline-flex items-center px-2 py-1 rounded-[6px] border border-[#FA7319] bg-[#FFF4ED] text-[#FA7319] whitespace-nowrap">
                              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                              {formatDateTime(doc.deadline_at)}
                            </div>
                          ) : (
                            <span className="text-[#525866]">{formatDateTime(doc.deadline_at)}</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block whitespace-nowrap ${mapStatusStyle(doc.status)}`}>
                            {mapStatusLabel(doc.status)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {!loading && (payload?.activeDocuments ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 px-6 text-center text-[13px] text-[#78788D]">
                        No assigned documents found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-4">Due Soon</h2>
            <div className="space-y-4">
              {(payload?.dueSoon ?? []).slice(0, 3).map((item) => {
                const isUrgent = item.deadline_at
                  ? new Date(item.deadline_at).getTime() - Date.now() < 24 * 60 * 60 * 1000
                  : false;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-[12px] flex items-center justify-between cursor-pointer border shadow-sm transition-transform hover:translate-x-1 ${
                      isUrgent ? "bg-[#FEF2F2] border-[#FECACA]" : "bg-[#FFFFFF] border-[#EAECF0]"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 ${isUrgent ? "text-[#EF4444]" : "text-[#A0AAB5]"}`}>
                        <FileText className="w-5 h-5" fill="currentColor" strokeWidth={0} />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#171717] mb-1">{item.document_title || "Untitled Document"}</div>
                        <div className="flex items-center text-[11px] text-[#525866]">
                          <span>{mapStatusLabel(item.status)}</span>
                          <span className="mx-1.5 text-[#D1D5DB]">|</span>
                          <Clock className={`w-3.5 h-3.5 mr-1 ${isUrgent ? "text-[#EF4444]" : "text-[#A0AAB5]"}`} />
                          <span className={isUrgent ? "text-[#EF4444] font-medium" : ""}>{formatDateTime(item.deadline_at)}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A0AAB5] flex-shrink-0" />
                  </div>
                );
              })}

              {!loading && (payload?.dueSoon ?? []).length === 0 ? (
                <p className="text-[13px] text-[#78788D]">No upcoming deadlines.</p>
              ) : null}
            </div>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-4">Recent Activity</h2>
            <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-[19px] before:w-px md:before:mx-auto md:before:translate-x-0 before:h-full before:bg-[#EAECF0]">
              <div className="absolute top-2 bottom-2 left-[3.5px] w-px bg-[#EAECF0]" />
              {(payload?.recentActivity ?? []).slice(0, 5).map((activity) => (
                <div key={activity.id} className="relative z-10 flex items-start">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 outline outline-[4px] outline-white ${
                      activity.status === "completed" ? "bg-[#1CB061]" : "bg-[#00A0E3]"
                    }`}
                  />
                  <div className="ml-4">
                    <div className="text-[13px] font-semibold text-[#171717] leading-relaxed">
                      {activity.document_title || "Document activity"}
                    </div>
                    <div className="text-[11px] text-[#A0AAB5] mt-0.5">{relativeTime(activity.updated_at)}</div>
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
