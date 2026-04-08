"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type ClientProfile = {
  id: string;
  full_name?: string;
  email?: string;
  created_at?: string;
  avatar_url?: string;
  account_status?: string;
};

type StudentDetailPayload = {
  paymentHistory: Array<{
    amount?: number | string;
    status?: string;
  }>;
  documentHistory: Array<{
    status?: string;
  }>;
};

type StudentMetrics = {
  activeDocs: number;
  completedDocs: number;
  totalSpend: number;
};

const paidStatuses = new Set(["paid", "success", "captured", "completed"]);

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

function resolveStatus(profile: ClientProfile) {
  if (profile.account_status === "suspended") {
    return "Suspended";
  }

  if (profile.account_status === "restricted") {
    return "Restricted";
  }

  return "Active";
}

function statusPill(status: string) {
  if (status === "Active") return "bg-[#E3F7EC] text-[#1CB061]";
  if (status === "Restricted") return "bg-[#FFF4ED] text-[#FA7319]";
  if (status === "Suspended") return "bg-[#FEF2F2] text-[#FB3748]";
  return "bg-[#F1F5F9] text-[#64748B]";
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<ClientProfile[]>([]);
  const [metricsById, setMetricsById] = useState<Record<string, StudentMetrics>>({});
  const [loading, setLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    []
  );

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const query = searchTerm.trim()
          ? `/api/admin/clients?search=${encodeURIComponent(searchTerm.trim())}`
          : "/api/admin/clients";
        const data = await apiGet<ClientProfile[]>(query);

        if (active) {
          setProfiles(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load students.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    let active = true;

    const loadMetrics = async () => {
      if (profiles.length === 0) {
        setMetricsById({});
        return;
      }

      try {
        setMetricsLoading(true);
        const settled = await Promise.allSettled(
          profiles.map(async (profile) => {
            const detail = await apiGet<StudentDetailPayload>(`/api/admin/clients/${profile.id}`);
            const documents = Array.isArray(detail.documentHistory) ? detail.documentHistory : [];
            const payments = Array.isArray(detail.paymentHistory) ? detail.paymentHistory : [];

            const completedDocs = documents.filter((doc) => doc.status === "completed").length;
            const activeDocs = documents.filter((doc) => doc.status !== "completed" && doc.status !== "cancelled").length;
            const totalSpend = payments.reduce((sum, row) => {
              const status = (row.status || "").toLowerCase();
              if (!paidStatuses.has(status)) {
                return sum;
              }
              const amount = Number(row.amount ?? 0);
              return Number.isFinite(amount) ? sum + amount : sum;
            }, 0);

            return [
              profile.id,
              {
                activeDocs,
                completedDocs,
                totalSpend
              }
            ] as const;
          })
        );

        if (!active) {
          return;
        }

        const next: Record<string, StudentMetrics> = {};
        for (const result of settled) {
          if (result.status === "fulfilled") {
            const [id, metrics] = result.value;
            next[id] = metrics;
          }
        }
        setMetricsById(next);
      } finally {
        if (active) {
          setMetricsLoading(false);
        }
      }
    };

    void loadMetrics();

    return () => {
      active = false;
    };
  }, [profiles]);

  const students = useMemo(() => profiles, [profiles]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="mt-2">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Students</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage registered students and account activity.</p>
      </div>

      <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[280px]">
            <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AAB5]" strokeWidth={2.25} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="h-[42px] w-full pl-10 pr-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>
          <button className="h-[42px] px-4 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#525866] font-semibold inline-flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors">
            <SlidersHorizontal className="w-[16px] h-[16px]" />
            Filter
          </button>
        </div>

        <div className="border border-[#EAECF0] rounded-[10px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">User Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Registration Date</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Active Docs.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Completed Docs.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Total Spend</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Account Status</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/admin/students/${student.id}`} className="flex items-center gap-3">
                      <img src={student.avatar_url || `https://i.pravatar.cc/100?u=${student.id}`} alt={student.full_name || "Student"} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="text-[13px] font-bold text-[#171717] leading-tight">{student.full_name || "Student"}</div>
                        <div className="text-[11px] text-[#525866] mt-1">{student.email || "-"}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-[13px] font-medium text-[#525866]">{formatDate(student.created_at)}</td>
                  <td className="py-3 px-4 text-[13px] font-medium text-[#525866]">
                    {metricsLoading && !metricsById[student.id] ? "..." : (metricsById[student.id]?.activeDocs ?? 0)}
                  </td>
                  <td className="py-3 px-4 text-[13px] font-medium text-[#525866]">
                    {metricsLoading && !metricsById[student.id] ? "..." : (metricsById[student.id]?.completedDocs ?? 0)}
                  </td>
                  <td className="py-3 px-4 text-[13px] font-medium text-[#525866]">
                    {metricsLoading && !metricsById[student.id]
                      ? "..."
                      : currencyFormatter.format(metricsById[student.id]?.totalSpend ?? 0)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-[4px] rounded-full text-[11px] font-bold inline-flex ${statusPill(resolveStatus(student))}`}>
                      {resolveStatus(student)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/admin/students/${student.id}`}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#00A0E3] hover:text-[#0090D1]"
                    >
                      View
                      <ChevronRight className="w-[14px] h-[14px]" />
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 px-4 text-center text-[13px] text-[#78788D]">
                    No students found.
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
