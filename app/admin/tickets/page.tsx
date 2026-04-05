"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";

type TicketProfile =
  | {
      full_name?: string;
      email?: string;
    }
  | Array<{
      full_name?: string;
      email?: string;
    }>
  | null;

type AdminTicket = {
  id: string;
  subject?: string;
  category?: string;
  status?: string;
  message?: string;
  created_at?: string;
  updated_at?: string;
  resolved_at?: string | null;
  profiles?: TicketProfile;
};

function readProfile(profile?: TicketProfile) {
  if (!profile) {
    return { name: "Unknown User", email: "-" };
  }

  if (Array.isArray(profile)) {
    return {
      name: profile[0]?.full_name || "Unknown User",
      email: profile[0]?.email || "-"
    };
  }

  return {
    name: profile.full_name || "Unknown User",
    email: profile.email || "-"
  };
}

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function statusStyle(status?: string) {
  if (status === "resolved") {
    return "bg-[#E3F7EC] text-[#1CB061]";
  }

  if (status === "in_progress") {
    return "bg-[#FFF4ED] text-[#FA7319]";
  }

  return "bg-[#EFF6FF] text-[#3B82F6]";
}

function statusLabel(status?: string) {
  if (status === "resolved") return "Resolved";
  if (status === "in_progress") return "In Progress";
  return "Open";
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [resolveOpen, setResolveOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);
  const [resolutionMessage, setResolutionMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadTickets = async (status = statusFilter) => {
    try {
      setLoading(true);
      const query = status !== "all" ? `?status=${encodeURIComponent(status)}` : "";
      const data = await apiGet<AdminTicket[]>(`/api/admin/tickets${query}`);
      setTickets(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load support tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadTickets(statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return tickets;
    }

    return tickets.filter((ticket) => {
      const profile = readProfile(ticket.profiles);
      return (
        (ticket.subject || "").toLowerCase().includes(term) ||
        (ticket.category || "").toLowerCase().includes(term) ||
        profile.name.toLowerCase().includes(term) ||
        profile.email.toLowerCase().includes(term) ||
        ticket.id.toLowerCase().includes(term)
      );
    });
  }, [tickets, searchTerm]);

  const stats = useMemo(() => {
    const open = tickets.filter((ticket) => !ticket.status || ticket.status === "open").length;
    const inProgress = tickets.filter((ticket) => ticket.status === "in_progress").length;
    const resolved = tickets.filter((ticket) => ticket.status === "resolved").length;
    return { total: tickets.length, open, inProgress, resolved };
  }, [tickets]);

  const onResolve = async () => {
    if (!selectedTicket?.id || !resolutionMessage.trim() || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      const updated = await apiRequest<AdminTicket>("/api/admin/tickets/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          message: resolutionMessage.trim()
        })
      });

      setTickets((prev) => prev.map((ticket) => (ticket.id === updated.id ? { ...ticket, ...updated } : ticket)));
      setResolveOpen(false);
      setResolutionMessage("");
      setSelectedTicket(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve support ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="mt-2">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Support Tickets</div>
        <p className="text-[14px] text-[#525866] mt-1">Review client support requests and respond to resolve issues.</p>
      </div>

      <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm px-4 py-4">
        <div className="grid grid-cols-4">
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Total</div><div className="text-[26px] font-bold text-[#171717] mt-1">{loading ? "..." : stats.total}</div></div>
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Open</div><div className="text-[26px] font-bold text-[#3B82F6] mt-1">{loading ? "..." : stats.open}</div></div>
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">In Progress</div><div className="text-[26px] font-bold text-[#FA7319] mt-1">{loading ? "..." : stats.inProgress}</div></div>
          <div className="px-3"><div className="text-[13px] text-[#525866]">Resolved</div><div className="text-[26px] font-bold text-[#1CB061] mt-1">{loading ? "..." : stats.resolved}</div></div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div className="relative w-[280px] max-w-full">
            <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AAB5]" strokeWidth={2.25} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="h-[42px] w-full pl-10 pr-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>
          <div className="h-[42px] px-4 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#525866] font-semibold inline-flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors">
            <SlidersHorizontal className="w-[16px] h-[16px]" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent outline-none cursor-pointer">
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="min-w-[1100px] w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Ticket ID</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Subject</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Category</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Client</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Status</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Created</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {filteredRows.map((ticket) => {
                const profile = readProfile(ticket.profiles);
                return (
                  <tr key={ticket.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3 px-4 text-[13px] font-semibold text-[#171717]">{ticket.id.slice(0, 8)}...</td>
                    <td className="py-3 px-4 text-[14px] text-[#171717] font-medium">{ticket.subject || "-"}</td>
                    <td className="py-3 px-4 text-[13px] text-[#525866]">{ticket.category || "General"}</td>
                    <td className="py-3 px-4 text-[13px] text-[#525866]">
                      <div className="font-medium text-[#171717]">{profile.name}</div>
                      <div className="text-[12px] text-[#8A94A6]">{profile.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ${statusStyle(ticket.status)}`}>
                        {statusLabel(ticket.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[13px] text-[#525866]">{formatDate(ticket.created_at)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/tickets/${ticket.id}`} className="text-[#00A0E3] text-[13px] font-semibold hover:underline">
                          View
                        </Link>
                        {ticket.status !== "resolved" ? (
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setResolveOpen(true);
                            }}
                            className="inline-flex items-center gap-1 text-[#1CB061] text-[13px] font-semibold hover:underline"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Resolve
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 px-4 text-center text-[13px] text-[#78788D]">
                    No support tickets found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {resolveOpen && selectedTicket ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-dm-sans">
          <button
            type="button"
            aria-label="Close"
            onClick={() => {
              if (submitting) return;
              setResolveOpen(false);
              setSelectedTicket(null);
              setResolutionMessage("");
            }}
            className="absolute inset-0 bg-[#171717]/40"
          />

          <div className="relative z-10 bg-white w-[94%] max-w-[560px] rounded-[16px] border border-[#EAECF0] shadow-xl">
            <div className="px-6 py-5 border-b border-[#EAECF0]">
              <div className="text-[18px] font-bold text-[#171717]">Resolve Ticket</div>
              <p className="text-[13px] text-[#525866] mt-1">Add a response before marking this ticket as resolved.</p>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="rounded-[10px] border border-[#EAECF0] p-4 bg-[#F9FAFB]">
                <div className="text-[12px] text-[#8A94A6] mb-1">Subject</div>
                <div className="text-[14px] font-semibold text-[#171717]">{selectedTicket.subject || "No subject"}</div>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-[#171717] mb-2">Resolution message</div>
                <textarea
                  value={resolutionMessage}
                  onChange={(event) => setResolutionMessage(event.target.value.slice(0, 1200))}
                  placeholder="Write what was done to resolve the issue"
                  className="w-full min-h-[120px] rounded-[8px] border border-[#EAECF0] p-3 text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
                />
                <div className="text-right mt-1 text-[12px] text-[#8A94A6]">{resolutionMessage.length}/1200</div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#EAECF0] flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  if (submitting) return;
                  setResolveOpen(false);
                  setSelectedTicket(null);
                  setResolutionMessage("");
                }}
                className="h-[40px] px-4 rounded-[8px] border border-[#EAECF0] text-[13px] font-semibold text-[#525866]"
              >
                Cancel
              </button>
              <button
                onClick={onResolve}
                disabled={!resolutionMessage.trim() || submitting}
                className="h-[40px] px-4 rounded-[8px] bg-[#00A0E3] text-white text-[13px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Resolving..." : "Resolve Ticket"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
