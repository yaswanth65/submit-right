"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type AvailabilityItem = {
  current_status?: string;
  status?: string;
};

type EditorProfile = {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  is_restricted?: boolean;
  is_suspended?: boolean;
  restricted_at?: string | null;
  suspended_at?: string | null;
  editor_availability?: AvailabilityItem | AvailabilityItem[] | null;
};

function toneForRate(rate: number) {
  if (rate >= 85) return "#1CB061";
  if (rate >= 70) return "#FA7319";
  return "#FB3748";
}

function pillClass(value: string) {
  if (value === "Available" || value === "Active") return "bg-[#E3F7EC] text-[#1CB061]";
  if (value === "Vacation Mode") return "bg-[#EBF8FD] text-[#3B82F6]";
  if (value === "Unavailable" || value === "Suspended") return "bg-[#FEF2F2] text-[#FB3748]";
  if (value === "Restricted") return "bg-[#FFF4ED] text-[#FA7319]";
  return "bg-[#F1F5F9] text-[#64748B]";
}

function resolveAccountStatus(editor: EditorProfile) {
  if (editor.is_suspended || editor.suspended_at) {
    return "Suspended";
  }

  if (editor.is_restricted || editor.restricted_at) {
    return "Restricted";
  }

  return "Active";
}

function resolveAvailability(editor: EditorProfile) {
  const source = Array.isArray(editor.editor_availability)
    ? editor.editor_availability[0]
    : editor.editor_availability;
  const status = source?.current_status || source?.status || "available";

  if (status === "at_capacity") {
    return "Unavailable";
  }

  if (status === "vacation") {
    return "Vacation Mode";
  }

  if (status === "busy") {
    return "Unavailable";
  }

  return "Available";
}

export default function EditorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<EditorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const query = searchTerm.trim()
          ? `/api/admin/editors?search=${encodeURIComponent(searchTerm.trim())}`
          : "/api/admin/editors";
        const data = await apiGet<EditorProfile[]>(query);

        if (active) {
          setProfiles(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load editors.");
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

  const editors = useMemo(() => profiles, [profiles]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Editors</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage editor performance and workload distribution.</p>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
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
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Editor Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Active Ass.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Completed Docs.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Overdue Tasks</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">On-Time Deliver</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Revision</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {editors.map((editor) => {
                const rateColor = toneForRate(0);
                const availability = resolveAvailability(editor);
                const status = resolveAccountStatus(editor);
                return (
                  <tr key={editor.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3 px-4">
                      <Link href={`/admin/editors/${editor.id}`} className="flex items-center gap-3">
                        <img src={editor.avatar_url || `https://i.pravatar.cc/100?u=${editor.id}`} alt={editor.full_name || "Editor"} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="text-[14px] font-bold text-[#171717] leading-tight">{editor.full_name || "Editor"}</div>
                          <div className="text-[12px] text-[#525866] mt-1">{editor.email || "-"}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">-</td>
                    <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">-</td>
                    <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">-</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[74px] h-[8px] rounded-full bg-[#EAEFF4] overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `0%`, backgroundColor: rateColor }}></div>
                        </div>
                        <span className="text-[14px] font-medium" style={{ color: rateColor }}>-</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-[4px] rounded-full text-[11px] font-bold inline-flex ${pillClass(availability)}`}>
                        {availability}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">
                      -
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-[4px] rounded-full text-[11px] font-bold inline-flex ${pillClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-[#171717] hover:bg-[#F3F4F6] rounded p-1.5 transition-colors">
                        <MoreVertical className="w-[20px] h-[20px]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!loading && editors.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 px-4 text-center text-[13px] text-[#78788D]">
                    No editors found.
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
