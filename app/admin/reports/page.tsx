"use client";

import React, { useEffect, useMemo, useState } from "react";
import { RevenueChart } from "@/components/RevenueChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Search, Filter, Download } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type ReportPayload = {
  filter: string;
  totalDocumentsSubmitted: number;
  documentsCompleted: number;
  averageTurnaroundTime: number;
  overdueRate: number;
  revenueAnalyticsLine: Array<{
    month: number;
    totalRevenue: number;
    averageOrderValue: number;
  }>;
  revenueAnalyticsBar: {
    totalOrders: number;
    totalRevenue: number;
  };
  editorPerformanceOverview: Array<{
    editorName: string;
    completedDocs: number;
    onTimeDeliver: number;
    revisionRate: number;
    activeAssignments: number;
  }>;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount || 0);
}

export default function ReportsScreen() {
  const [timeFilter, setTimeFilter] = useState("30days");
  const [searchTerm, setSearchTerm] = useState("");
  const [payload, setPayload] = useState<ReportPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<ReportPayload>(`/api/admin/reports?filter=${encodeURIComponent(timeFilter)}`);
        if (active) {
          setPayload(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load reports.");
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
  }, [timeFilter]);

  const revenueLineData = useMemo(
    () =>
      (payload?.revenueAnalyticsLine ?? []).map((item) => ({
        name: MONTHS[Math.max(0, Math.min(11, item.month - 1))],
        revenue: item.totalRevenue
      })),
    [payload]
  );

  const performanceRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const rows = payload?.editorPerformanceOverview ?? [];
    if (!term) {
      return rows;
    }

    return rows.filter((editor) => (editor.editorName || "").toLowerCase().includes(term));
  }, [payload, searchTerm]);

  const editorBarData = useMemo(
    () =>
      (payload?.editorPerformanceOverview ?? []).slice(0, 8).map((row) => ({
        name: row.editorName?.split(" ").slice(0, 2).join(" ") || "Editor",
        Completed: row.completedDocs,
        Active: row.activeAssignments
      })),
    [payload]
  );

  return (
    <div className="space-y-6 w-full font-dm-sans animate-in fade-in duration-700 pb-10">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Reports</div>
          <p className="text-[14px] text-[#525866]">Platform performance and operational insights.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeFilter}
            onChange={(event) => setTimeFilter(event.target.value)}
            className="border border-[#EAECF0] rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#00A0E3] bg-white transition-all shadow-sm cursor-pointer hover:border-[#EAECF0]"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] rounded-[8px] text-[13px] font-semibold transition-transform transform hover:-translate-y-0.5 active:scale-95 shadow-sm group">
            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            Export Data
          </button>
        </div>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] flex flex-wrap items-stretch shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex w-full flex-wrap lg:flex-nowrap items-stretch">
          {[
            { label: "Total Documents Submitted", val: payload?.totalDocumentsSubmitted ?? 0 },
            { label: "Documents Completed", val: payload?.documentsCompleted ?? 0, color: "text-[#10B981]" },
            { label: "Average Turnaround Time", val: `${payload?.averageTurnaroundTime ?? 0} days` },
            { label: "Overdue Rate", val: `${payload?.overdueRate ?? 0}%`, color: "text-[#FA7319]" },
          ].map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx !== 0 && (
                <div className="flex items-center block">
                  <div className="h-[60%] w-[1px] bg-[#EAECF0] mx-2 self-center rounded" />
                </div>
              )}
              <div className="flex-1 min-w-[200px] p-6 group cursor-pointer hover:bg-[#F9FAFB] transition-colors rounded-[12px]">
                <div className="text-[13px] font-medium text-[#525866] mb-1.5 group-hover:text-[#171717] transition-colors">{stat.label}</div>
                <div className={`text-[24px] font-bold leading-none ${stat.color || "text-[#171717]"} group-hover:scale-105 origin-left transition-transform duration-300`}>
                  {loading ? "..." : stat.val}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm group hover:shadow-md transition-shadow duration-300 min-h-[440px]">
        <div className="flex justify-between items-center mb-6">
          <div className="text-[16px] font-bold text-[#171717]">Revenue Analytics</div>
        </div>
        <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />
        <div className="flex items-center space-x-12 mb-6">
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Total Revenue (Last 30 Days)</div>
            <div className="text-[18px] font-bold text-[#171717]">{formatCurrency(payload?.revenueAnalyticsBar.totalRevenue || 0)}</div>
          </div>
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Average Order Value</div>
            <div className="text-[18px] font-bold text-[#171717]">
              {formatCurrency(
                payload?.revenueAnalyticsBar.totalOrders
                  ? (payload.revenueAnalyticsBar.totalRevenue || 0) / payload.revenueAnalyticsBar.totalOrders
                  : 0
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-[300px]">
          <RevenueChart data={revenueLineData} />
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm group hover:shadow-md transition-shadow duration-300 min-h-[440px]">
        <div className="flex justify-between items-center mb-6">
          <div className="text-[16px] font-bold text-[#171717]">Revenue Analytics</div>
        </div>
        <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />
        <div className="flex items-center space-x-12 mb-6">
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Total Orders</div>
            <div className="text-[18px] font-bold text-[#171717]">{payload?.revenueAnalyticsBar.totalOrders ?? 0}</div>
          </div>
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Total Revenue</div>
            <div className="text-[18px] font-bold text-[#171717]">{formatCurrency(payload?.revenueAnalyticsBar.totalRevenue || 0)}</div>
          </div>
        </div>
        <div className="w-full h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={editorBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }} dy={10} />
              <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => val === 0 ? "0" : val} label={{ value: 'Completed', angle: -90, position: 'insideLeft', fill: '#525866', fontSize: 12, fontWeight: 500, offset: 0 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => val === 0 ? "0" : val} label={{ value: 'Active', angle: 90, position: 'insideRight', fill: '#525866', fontSize: 12, fontWeight: 500, offset: 0 }} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px', fontWeight: 500 }} />
              <Bar yAxisId="left" dataKey="Completed" fill="#00A0E3" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
              <Bar yAxisId="right" dataKey="Active" fill="#10B981" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center items-center space-x-6 mt-4">
          <div className="flex items-center text-[12px] font-medium text-[#525866] group-hover:text-[#171717] transition-colors"><span className="w-3 h-3 rounded-sm bg-[#00A0E3] mr-2"></span>Completed</div>
          <div className="flex items-center text-[12px] font-medium text-[#525866] group-hover:text-[#171717] transition-colors"><span className="w-3 h-3 rounded-sm bg-[#10B981] mr-2"></span>Active</div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="p-6 pb-2">
          <div className="text-[16px] font-bold text-[#171717]">Editor Performance Overview</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />
        </div>
        <div className="p-4 border-b border-[#EAECF0] flex justify-between items-center bg-[#F9FAFB]">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all bg-white"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-[#EAECF0] bg-white text-[#171717] rounded-[8px] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors hover:border-[#EAECF0]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Document Name</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Completed Docs.</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">On-Time Deliver</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Revision Rate</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Active Assignments</th>
              </tr>
            </thead>
            <tbody>
              {performanceRows.map((editor, i) => (
                <tr key={`${editor.editorName}-${i}`} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-200 group/row">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full border border-[#EAECF0] bg-[#F0F7FB] text-[#0B74A5] text-[11px] font-bold flex items-center justify-center group-hover/row:scale-110 transition-transform duration-300">
                        {(editor.editorName || "E")
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0]?.toUpperCase())
                          .join("")}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#171717]">{editor.editorName || "Editor"}</div>
                        <div className="text-[12px] text-[#525866]">editor@submitright.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-medium text-[#171717]">{editor.completedDocs}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center w-[120px]">
                      <div className="h-1.5 w-full bg-[#EAECF0] rounded-full overflow-hidden mr-3">
                        <div 
                           className={`h-full rounded-full transition-all duration-1000 ease-out origin-left ${editor.onTimeDeliver > 80 ? 'bg-[#10B981]' : editor.onTimeDeliver > 70 ? 'bg-[#FA7319]' : 'bg-[#FB3748]'}`}
                           style={{ width: `${editor.onTimeDeliver}%` }}
                        ></div>
                      </div>
                      <span className="text-[13px] font-medium text-[#525866] min-w-[30px]">{editor.onTimeDeliver}%</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 text-[13px] font-semibold ${editor.revisionRate > 30 ? 'text-[#FA7319]' : editor.revisionRate > 40 ? 'text-[#FB3748]' : 'text-[#171717]'}`}>
                    {editor.revisionRate}%
                  </td>
                  <td className="py-4 px-6 text-[13px] font-medium text-[#171717]">{editor.activeAssignments}</td>
                </tr>
              ))}
              {!loading && performanceRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-6 text-center text-[13px] text-[#78788D]">
                    No editor performance data found.
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