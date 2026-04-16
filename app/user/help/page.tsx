"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";

type SupportTicket = {
  id: string;
  subject?: string;
  category?: string;
  status?: string;
  message?: string;
  updated_at?: string;
  resolved_at?: string | null;
  created_at?: string;
};

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

function statusLabel(status?: string) {
  if (status === "in_progress") {
    return "In Progress";
  }

  if (status === "resolved") {
    return "Resolved";
  }

  if (status === "closed") {
    return "Resolved";
  }

  return "Open";
}

export default function HelpSupportPage() {
  const helpCards = [
    {
      id: 1,
      title: "Lorem ipsum",
      desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      id: 2,
      title: "Lorem ipsum",
      desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      id: 3,
      title: "Lorem ipsum",
      desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
  ];

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"all" | "open" | "in_progress" | "resolved">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<SupportTicket[]>("/api/client/tickets");
        if (active) {
          setSupportTickets(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load support tickets.");
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

  const filteredTickets = useMemo(() => {
    if (activeTab === "all") {
      return supportTickets;
    }

    if (activeTab === "resolved") {
      return supportTickets.filter((ticket) => ticket.status === "resolved" || ticket.status === "closed");
    }

    return supportTickets.filter((ticket) => (ticket.status || "open") === activeTab);
  }, [activeTab, supportTickets]);

  const stats = useMemo(() => {
    const open = supportTickets.filter((ticket) => !ticket.status || ticket.status === "open").length;
    const inProgress = supportTickets.filter((ticket) => ticket.status === "in_progress").length;
    const resolved = supportTickets.filter((ticket) => ticket.status === "resolved" || ticket.status === "closed").length;
    return { total: supportTickets.length, open, inProgress, resolved };
  }, [supportTickets]);

  const closeCreateModal = () => {
    if (submitting) {
      return;
    }
    setCreateOpen(false);
    setSubject("");
    setCategory("general");
    setMessage("");
  };

  const submitTicket = async () => {
    if (!subject.trim() || !message.trim() || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      const created = await apiRequest<SupportTicket>("/api/client/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          category,
          message: message.trim()
        })
      });

      setSupportTickets((prev) => [created, ...prev]);
      closeCreateModal();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create support ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="bg-[#FFF0E6] text-[#F97316] text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            In Progress
          </span>
        );
      case "Resolved":
        return (
          <span className="bg-[#E6F8EC] text-[#00A859] text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            Resolved
          </span>
        );
      case "Open":
        return (
          <span className="bg-[#EFF6FF] text-[#3B82F6] text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap border border-[#DBEAFE]">
            Open
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-dm-sans  mx-auto ">
      
      {/* --- PAGE HEADER --- */}
      {/* <div className="mb-6 border-y border-[#EAECF0] px-4 pb-3">
        <h1 className="text-[28px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Help & Support
        </h1>
        <p className="text-[#78788D] text-[15px]">
          Manage your document activity and platform updates.
        </p>
      </div> */}
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <div className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">Help & Support</div>
        <p className="text-[#78788D] text-[14px]">
        Manage your document activity and platform updates.
        </p>
      </div>

      {error ? (
        <div className="mx-4 mt-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

   
      {/* --- RECENT SUPPORT TICKETS --- */}
      <div className=" px-6 " >
        <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[18px] font-semibold text-[#171717] mb-1">Support Tickets</div>
            <p className="text-[#78788D] text-[14px]">Create and track your open, in-progress, and resolved requests.</p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="h-[40px] px-4 rounded-[8px] bg-[#00A0E3] hover:bg-[#008FCC] text-white text-[13px] font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm px-4 py-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0">
            <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Total</div><div className="text-[24px] font-bold text-[#171717] mt-1">{loading ? "..." : stats.total}</div></div>
            <div className="px-3 md:border-r md:border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Open</div><div className="text-[24px] font-bold text-[#3B82F6] mt-1">{loading ? "..." : stats.open}</div></div>
            <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">In Progress</div><div className="text-[24px] font-bold text-[#FA7319] mt-1">{loading ? "..." : stats.inProgress}</div></div>
            <div className="px-3"><div className="text-[13px] text-[#525866]">Resolved</div><div className="text-[24px] font-bold text-[#1CB061] mt-1">{loading ? "..." : stats.resolved}</div></div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 flex-wrap">
          {["all", "open", "in_progress", "resolved"].map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === "all" ? "All" : tab === "in_progress" ? "In Progress" : tab === "resolved" ? "Resolved" : "Open";

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`h-[34px] px-3 rounded-[8px] text-[12px] font-semibold border transition-colors ${
                  isActive
                    ? "bg-[#00A0E3] border-[#00A0E3] text-white"
                    : "bg-white border-[#EAECF0] text-[#525866] hover:bg-[#F8FAFC]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className=" rounded-[12px] bg-white overflow-hidden  mb-8 ">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#EFF7FB] border-b border-[#EAECF0]">
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Ticket ID</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Subject</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Category</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Status</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Date</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket, idx) => (
                  <tr 
                    key={ticket.id} 
                    className={`hover:bg-[#F9FAFB] transition-colors ${
                      idx !== filteredTickets.length - 1 ? 'border-b border-[#EAECF0]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-[14px] text-[#525866] font-medium whitespace-nowrap">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#525866]">
                      {ticket.subject || "No subject"}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#525866] whitespace-nowrap">
                      {ticket.category || "General"}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(statusLabel(ticket.status))}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#525866] whitespace-nowrap">
                      {formatDate(ticket.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setViewOpen(true);
                        }}
                        className="text-[#00A0E3] text-[14px] font-bold hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-[14px] text-[#78788D]">
                      No support tickets found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {createOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-dm-sans">
          <button type="button" aria-label="Close" onClick={closeCreateModal} className="absolute inset-0 bg-[#171717]/40" />
          <div className="relative z-10 bg-white w-[94%] max-w-[580px] rounded-[16px] border border-[#EAECF0] shadow-xl">
            <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
              <div>
                <div className="text-[18px] font-bold text-[#171717]">Submit New Ticket</div>
                <p className="text-[13px] text-[#525866] mt-1">Share your issue and our team will review it.</p>
              </div>
              <button onClick={closeCreateModal} className="p-1 text-[#A0AAB5] hover:text-[#171717]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 lg:px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <div className="text-[13px] font-semibold text-[#171717] mb-2">Subject</div>
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value.slice(0, 120))}
                  placeholder="Enter ticket subject"
                  className="h-[42px] w-full border border-[#EAECF0] rounded-[8px] px-3 text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
                />
              </div>

              <div>
                <div className="text-[13px] font-semibold text-[#171717] mb-2">Category</div>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-[42px] w-full border border-[#EAECF0] rounded-[8px] px-3 text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
                >
                  <option value="general">General</option>
                  <option value="payment">Payment</option>
                  <option value="document">Document</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-[#171717] mb-2">Message</div>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value.slice(0, 2000))}
                  placeholder="Explain your issue with useful details"
                  className="w-full min-h-[140px] border border-[#EAECF0] rounded-[8px] p-3 text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
                />
                <div className="text-right mt-1 text-[12px] text-[#8A94A6]">{message.length}/2000</div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#EAECF0] flex justify-end gap-3">
              <button onClick={closeCreateModal} className="h-[40px] px-4 rounded-[8px] border border-[#EAECF0] text-[13px] font-semibold text-[#525866]">
                Cancel
              </button>
              <button
                onClick={submitTicket}
                disabled={!subject.trim() || !message.trim() || submitting}
                className="h-[40px] px-4 rounded-[8px] bg-[#00A0E3] text-white text-[13px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {viewOpen && selectedTicket ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-dm-sans">
          <button
            type="button"
            aria-label="Close"
            onClick={() => {
              setViewOpen(false);
              setSelectedTicket(null);
            }}
            className="absolute inset-0 bg-[#171717]/40"
          />

          <div className="relative z-10 bg-white w-[94%] max-w-[620px] rounded-[16px] border border-[#EAECF0] shadow-xl">
            <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
              <div>
                <div className="text-[18px] font-bold text-[#171717]">Ticket Details</div>
                <p className="text-[13px] text-[#525866] mt-1">View submission details and latest status.</p>
              </div>
              <button
                onClick={() => {
                  setViewOpen(false);
                  setSelectedTicket(null);
                }}
                className="p-1 text-[#A0AAB5] hover:text-[#171717]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 lg:px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-[10px] border border-[#EAECF0] p-3 bg-[#F9FAFB]">
                  <div className="text-[11px] text-[#8A94A6] mb-1">Ticket ID</div>
                  <div className="text-[13px] font-semibold text-[#171717] break-all">{selectedTicket.id}</div>
                </div>
                <div className="rounded-[10px] border border-[#EAECF0] p-3 bg-[#F9FAFB]">
                  <div className="text-[11px] text-[#8A94A6] mb-1">Status</div>
                  <div>{getStatusBadge(statusLabel(selectedTicket.status))}</div>
                </div>
              </div>

              <div>
                <div className="text-[12px] text-[#8A94A6] mb-1">Subject</div>
                <div className="text-[14px] font-semibold text-[#171717]">{selectedTicket.subject || "No subject"}</div>
              </div>

              <div>
                <div className="text-[12px] text-[#8A94A6] mb-1">Category</div>
                <div className="text-[14px] text-[#525866]">{selectedTicket.category || "General"}</div>
              </div>

              <div>
                <div className="text-[12px] text-[#8A94A6] mb-1">Submitted Message</div>
                <div className="rounded-[10px] border border-[#EAECF0] p-3 text-[14px] text-[#171717] whitespace-pre-wrap bg-[#F9FAFB]">
                  {selectedTicket.message || "This ticket was created earlier and the original message is not included in the current list payload."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] text-[#8A94A6] mb-1">Created</div>
                  <div className="text-[13px] text-[#525866]">{formatDate(selectedTicket.created_at)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#8A94A6] mb-1">Resolved</div>
                  <div className="text-[13px] text-[#525866]">{formatDate(selectedTicket.resolved_at)}</div>
                </div>
              </div>

              <div className="rounded-[10px] border border-[#FFF4ED] bg-[#FFF9F5] p-3 text-[13px] text-[#9A3412]">
                Resolved admin comments are not included in the current client tickets API payload.
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}   