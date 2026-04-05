"use client";

import React, { useEffect, useMemo, useState } from "react";
import { RevenueChart } from "@/components/RevenueChart";
import { apiGet } from "@/lib/client-api";

type AdminDocument = {
  id: string;
  document_title?: string;
  status?: string;
  deadline_at?: string;
  assigned_editor_id?: string | null;
};

type AdminEditor = {
  id: string;
  full_name?: string;
  availability_status?: string;
};

type AdminDashboardPayload = {
  activeDocuments: { totalCount: number; list: AdminDocument[] };
  pendingDocuments: { totalCount: number; list: AdminDocument[] };
  revisionRequests: { totalCount: number; list: AdminDocument[] };
  overdueTasks: { totalCount: number; list: AdminDocument[] };
  activeEditors: { totalCount: number; list: AdminEditor[] };
  revenueThisMonth: { totalCount: number };
  revenueSnapshot: {
    thisMonth: number;
    pendingPayouts: number;
    paidPayouts: number;
    graph: Array<{ month: number; revenue: number }>;
  };
  pendingAction: AdminDocument[];
  workloadDistribution: AdminEditor[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function currency(value?: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function availabilityLabel(status?: string) {
  if (status === "available") {
    return { label: "Available", color: "#1CB061", bg: "#E3F7EC" };
  }

  if (status === "busy") {
    return { label: "Busy", color: "#FA7319", bg: "#FFF4ED" };
  }

  if (status === "at_capacity") {
    return { label: "At Capacity", color: "#FB3748", bg: "#FEF2F2" };
  }

  if (status === "vacation") {
    return { label: "Vacation", color: "#8B5CF6", bg: "#F3E8FF" };
  }

  return { label: "Unknown", color: "#525866", bg: "#F5F7FA" };
}

export default function AdminDashboard() {
  const [payload, setPayload] = useState<AdminDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<AdminDashboardPayload>("/api/admin/dashboard");
        if (active) {
          setPayload(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load admin dashboard.");
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
      { title: "Active Documents", value: payload?.activeDocuments.totalCount ?? 0 },
      { title: "Pending Assignments", value: payload?.pendingDocuments.totalCount ?? 0 },
      { title: "Revision Requests", value: payload?.revisionRequests.totalCount ?? 0 },
      { title: "Overdue Tasks", value: payload?.overdueTasks.totalCount ?? 0, danger: true },
      { title: "Active Editors", value: payload?.activeEditors.totalCount ?? 0 },
      { title: "Revenue This Month", value: currency(payload?.revenueThisMonth.totalCount) }
    ],
    [payload]
  );

  const chartData = useMemo(
    () =>
      (payload?.revenueSnapshot.graph || []).map((entry) => ({
        name: MONTHS[Math.max(0, Math.min(11, entry.month - 1))],
        revenue: entry.revenue
      })),
    [payload]
  );

  const workloadRows = useMemo(() => {
    const docs = payload?.activeDocuments.list || [];
    const overdue = payload?.overdueTasks.list || [];

    return (payload?.workloadDistribution || []).map((editor) => {
      const activeAssignments = docs.filter((doc) => doc.assigned_editor_id === editor.id).length;
      const overdueTasks = overdue.filter((doc) => doc.assigned_editor_id === editor.id).length;
      return {
        id: editor.id,
        name: editor.full_name || "Editor",
        activeAssignments,
        overdueTasks,
        availability: availabilityLabel(editor.availability_status)
      };
    });
  }, [payload]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Dashboard</div>
          <p className="text-[14px] text-[#525866]">System overview and operational control.</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] flex flex-wrap items-stretch shadow-sm">
        <div className="flex w-full flex-wrap lg:flex-nowrap items-stretch">
          {stats.map((stat, idx) => (
            <React.Fragment key={stat.title}>
              {idx !== 0 ? (
                <div className="flex items-center">
                  <div className="h-[60%] w-[1px] bg-[#EAECF0] mx-2 self-center rounded" />
                </div>
              ) : null}
              <div className="flex-1 min-w-[160px] flex flex-col justify-center p-6">
                <div className="text-[13px] font-medium text-[#525866] mb-1.5">{stat.title}</div>
                <div className={`text-[24px] font-bold leading-none mb-2 ${stat.danger ? "text-[#FB3748]" : "text-[#171717]"}`}>
                  {loading ? "..." : stat.value}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm flex flex-col min-h-[440px]">
          <div className="text-[16px] font-bold text-[#171717]">Revenue Snapshot</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-4 bg-[#EAECF0]" />
          <div className="flex items-center space-x-10 mb-6">
            <div>
              <div className="text-[13px] text-[#525866] font-semibold mb-1">This Month</div>
              <div className="text-[20px] font-bold text-[#171717]">{currency(payload?.revenueSnapshot.thisMonth)}</div>
            </div>
            <div className="w-[1px] h-10 bg-[#EAECF0]"></div>
            <div>
              <div className="text-[13px] text-[#525866] font-semibold mb-1">Pending Payouts</div>
              <div className="text-[16px] font-bold text-[#FA7319]">{currency(payload?.revenueSnapshot.pendingPayouts)}</div>
            </div>
            <div className="w-[1px] h-10 bg-[#EAECF0]"></div>
            <div>
              <div className="text-[13px] text-[#525866] font-semibold mb-1">Paid Payouts</div>
              <div className="text-[16px] font-bold text-[#10B981]">{currency(payload?.revenueSnapshot.paidPayouts)}</div>
            </div>
          </div>
          <div className="flex-1 w-full border-t border-[#EAECF0] pt-6 min-h-[250px]">
            <RevenueChart data={chartData} />
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 flex flex-col min-h-[440px] shadow-sm">
          <div className="text-[16px] font-bold text-[#171717]">Pending Actions</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-4 bg-[#EAECF0]" />
          <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 custom-scrollbar">
            {(payload?.pendingAction || []).slice(0, 5).map((item) => (
              <div key={item.id} className="p-4 border border-[#EAECF0] rounded-[10px] flex justify-between items-center bg-[#FFFFFF]">
                <div>
                  <div className="text-[13px] font-bold text-[#171717] tracking-tight">Review Assignment</div>
                  <p className="text-[12px] text-[#525866] mt-1 font-medium">{item.document_title || "Untitled Document"}</p>
                </div>
                <button className="bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] px-4 py-[7px] rounded-[6px] text-[13px] font-semibold transition-colors shadow-sm ml-2 shrink-0">
                  Review
                </button>
              </div>
            ))}

            {!loading && (payload?.pendingAction || []).length === 0 ? (
              <p className="text-[13px] text-[#78788D]">No pending actions.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[16px] text-[#171717] font-bold">Workload Distribution</div>
        <div className="mx-auto w-[98%] h-px mt-4 mb-4 bg-[#EAECF0]" />
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Editor Name</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Active Assignments</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Overdue Tasks</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Availability Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {workloadRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6 font-bold text-[14px] text-[#525866]">{row.name}</td>
                  <td className="py-4 px-6 font-medium text-[14px] text-[#525866]">{row.activeAssignments}</td>
                  <td className={`py-4 px-6 font-bold text-[14px] ${row.overdueTasks > 0 ? "text-[#FB3748]" : "text-[#525866]"}`}>
                    {row.overdueTasks || "-"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className="px-3 py-[5px] rounded-full text-[12px] font-bold inline-flex items-center justify-center min-w-[80px]"
                      style={{ color: row.availability.color, backgroundColor: row.availability.bg }}
                    >
                      {row.availability.label}
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && workloadRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 px-6 text-center text-[13px] text-[#78788D]">
                    No workload data found.
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
