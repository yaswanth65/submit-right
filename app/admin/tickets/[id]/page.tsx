"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
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

function formatDateTime(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
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

export default function AdminTicketDetailPage() {
  const params = useParams<{ id: string }>();
  const ticketId = params?.id;

  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [resolutionMessage, setResolutionMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resolutionPreview, setResolutionPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketId) return;

    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<AdminTicket[]>("/api/admin/tickets");
        if (active) {
          setTickets(data || []);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load support ticket.");
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
  }, [ticketId]);

  const ticket = useMemo(() => tickets.find((item) => item.id === ticketId), [tickets, ticketId]);
  const profile = readProfile(ticket?.profiles);

  const onResolve = async () => {
    if (!ticket?.id || !resolutionMessage.trim() || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      const updated = await apiRequest<AdminTicket>("/api/admin/tickets/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: ticket.id, message: resolutionMessage.trim() })
      });

      setTickets((prev) => prev.map((row) => (row.id === updated.id ? { ...row, ...updated } : row)));
      setResolutionPreview(resolutionMessage.trim());
      setResolutionMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve support ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-[14px] text-[#525866] font-dm-sans">Loading ticket...</div>;
  }

  if (!ticket) {
    return (
      <div className="space-y-4 font-dm-sans">
        <div className="text-[20px] font-bold text-[#171717]">Ticket not found</div>
        <Link href="/admin/tickets" className="inline-flex items-center gap-2 text-[#00A0E3] font-semibold text-[14px] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[20px] font-bold text-[#171717] leading-tight">Ticket Details</div>
          <p className="text-[14px] text-[#525866] mt-1">Review and resolve this support request.</p>
        </div>
        <Link href="/admin/tickets" className="inline-flex items-center gap-2 h-[40px] px-4 rounded-[8px] border border-[#EAECF0] text-[13px] font-semibold text-[#525866] hover:bg-[#F9FAFB]">
          <ArrowLeft className="w-4 h-4" /> Back to Tickets
        </Link>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[12px] border border-[#EAECF0] bg-white p-6 space-y-5">
          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Subject</div>
            <div className="text-[18px] font-bold text-[#171717]">{ticket.subject || "No subject"}</div>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Original Message</div>
            <div className="rounded-[10px] border border-[#EAECF0] bg-[#F9FAFB] p-4 text-[14px] text-[#171717] leading-relaxed whitespace-pre-wrap">
              {ticket.message || "No message available in this payload."}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-semibold text-[#171717] mb-2">Resolution Comment</div>
            <textarea
              value={resolutionMessage}
              onChange={(event) => setResolutionMessage(event.target.value.slice(0, 1200))}
              placeholder="Write response for the user and mark as resolved"
              disabled={ticket.status === "resolved"}
              className="w-full min-h-[140px] rounded-[8px] border border-[#EAECF0] p-3 text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
            />
            <div className="text-right mt-1 text-[12px] text-[#8A94A6]">{resolutionMessage.length}/1200</div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onResolve}
              disabled={ticket.status === "resolved" || !resolutionMessage.trim() || submitting}
              className="inline-flex items-center gap-2 h-[40px] px-4 rounded-[8px] bg-[#00A0E3] text-white text-[13px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              {submitting ? "Resolving..." : ticket.status === "resolved" ? "Already Resolved" : "Resolve Ticket"}
            </button>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#EAECF0] bg-white p-6 space-y-4">
          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Ticket ID</div>
            <div className="text-[14px] font-semibold text-[#171717] break-all">{ticket.id}</div>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Category</div>
            <div className="text-[14px] font-semibold text-[#171717]">{ticket.category || "General"}</div>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Status</div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ${statusStyle(ticket.status)}`}>
              {statusLabel(ticket.status)}
            </span>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Client Name</div>
            <div className="text-[14px] font-semibold text-[#171717]">{profile.name}</div>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Client Email</div>
            <div className="text-[14px] text-[#525866]">{profile.email}</div>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Created At</div>
            <div className="text-[14px] text-[#525866]">{formatDateTime(ticket.created_at)}</div>
          </div>

          <div>
            <div className="text-[12px] text-[#8A94A6] mb-1">Resolved At</div>
            <div className="text-[14px] text-[#525866]">{formatDateTime(ticket.resolved_at)}</div>
          </div>
        </div>
      </div>

      {resolutionPreview ? (
        <div className="rounded-[10px] border border-[#DCFCE7] bg-[#F0FDF4] px-4 py-3 text-[13px] text-[#166534]">
          Resolution note sent: {resolutionPreview}
        </div>
      ) : null}
    </div>
  );
}
