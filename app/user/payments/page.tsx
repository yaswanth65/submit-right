"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Search, FileText, Coins, CreditCard, Lock, File } from "lucide-react";
import { apiGet } from "@/lib/client-api";
import { MockCheckoutModal } from "@/components/MockCheckoutModal";

type PaymentDocument = {
  id: string;
  document_title?: string;
  status?: string;
  estimated_total?: number;
};

type Transaction = {
  id: string;
  invoice_number?: string;
  amount?: number;
  status?: string;
  created_at?: string;
};

type PaymentsPayload = {
  pendingPaymentDocuments: PaymentDocument[];
  transactionHistory: Transaction[];
  documentList: PaymentDocument[];
  transactionInvoices: Array<{ invoiceNumber?: string; amount?: number; status?: string }>;
};

function formatCurrency(value?: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value || 0);
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

function statusLabel(status?: string) {
  if (status === "payment_needed") {
    return "Pending";
  }

  if (status === "paid") {
    return "Paid";
  }

  if (status === "completed") {
    return "Completed";
  }

  if (status === "pending") {
    return "Pending";
  }

  return "In Progress";
}

function getStatusBadge(status?: string) {
  const label = statusLabel(status);

  if (label === "Paid" || label === "Completed") {
    return (
      <span className="bg-[#E6F8EC] text-[#00A859] border border-[#00A859]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
        {label}
      </span>
    );
  }

  if (label === "Pending") {
    return (
      <span className="bg-[#FEF0E6] text-[#F97316] border border-[#F97316]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
        {label}
      </span>
    );
  }

  return (
    <span className="bg-[#EFF6FF] text-[#3B82F6] border border-[#3B82F6]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
      {label}
    </span>
  );
}

export default function PaymentsAndFilesPage() {
  const [activeTab, setActiveTab] = useState("Documents & File Access");
  const [searchTerm, setSearchTerm] = useState("");
  const [payload, setPayload] = useState<PaymentsPayload>({
    pendingPaymentDocuments: [],
    transactionHistory: [],
    documentList: [],
    transactionInvoices: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<PaymentDocument | null>(null);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiGet<PaymentsPayload>("/api/client/payments");
      setPayload(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPayments();
  }, [loadPayments]);

  const pendingCheckoutDocument = selectedDocument ?? payload.pendingPaymentDocuments[0] ?? null;

  const openCheckout = (doc: PaymentDocument | null) => {
    if (!doc) {
      return;
    }
    setSelectedDocument(doc);
    setShowCheckoutModal(true);
  };

  const totalPendingAmount = useMemo(
    () => payload.pendingPaymentDocuments.reduce((sum, item) => sum + Number(item.estimated_total || 0), 0),
    [payload.pendingPaymentDocuments]
  );

  const docs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return payload.documentList.filter((item) => {
      if (!term) {
        return true;
      }

      return (item.document_title || "").toLowerCase().includes(term);
    });
  }, [payload.documentList, searchTerm]);

  const invoices = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return payload.transactionHistory.filter((item) => {
      if (!term) {
        return true;
      }

      return (item.invoice_number || "").toLowerCase().includes(term);
    });
  }, [payload.transactionHistory, searchTerm]);

  return (
    <div className="w-full font-dm-sans mx-auto flex flex-col min-h-[calc(100vh-76px)]">
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">Payments & Files</h1>
        <p className="text-[#78788D] text-[14px]">Complete payment to access your final documents.</p>
      </div>

      {error ? (
        <div className="mx-4 mt-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">
          {error}
        </div>
      ) : null}

      <div className="border-y border-[#EAECF0] bg-white overflow-hidden shadow-sm mb-8 shrink-0">
        <div className="p-4 mx-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="bg-[#FEF0E6] text-[#F97316] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Pending
            </span>
            <div className="flex flex-col mt-1">
              <span className="text-[22px] font-semibold text-[#171717] leading-none mb-1.5">{formatCurrency(totalPendingAmount)}</span>
              <span className="text-[#78788D] text-[14px] font-medium">Total Amount Due</span>
            </div>
          </div>

          <button
            onClick={() => openCheckout(payload.pendingPaymentDocuments[0] ?? null)}
            disabled={payload.pendingPaymentDocuments.length === 0}
            className="bg-[#F97316] hover:bg-[#EA580C] disabled:bg-[#FDBA74] text-white px-5 py-2.5 rounded-[8px] flex items-center gap-2 text-[14px] font-bold transition-colors shadow-sm disabled:cursor-not-allowed"
          >
            <CreditCard className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Checkout Pending
          </button>
        </div>

        <div className="px-6 py-4 border-t border-[#EAECF0] bg-[#FAFAFB] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-2 text-[14px]">
            <FileText className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
            <span className="text-[#78788D]">Pending Documents:</span>
            <span className="text-[#171717] font-bold">{payload.pendingPaymentDocuments.length}</span>
          </div>
          <div className="hidden sm:block w-[1px] h-[20px] bg-[#D1D5DB]"></div>
          <div className="flex items-center gap-2 text-[14px]">
            <Coins className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
            <span className="text-[#78788D]">Total Invoices:</span>
            <span className="text-[#171717] font-bold">{payload.transactionHistory.length}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mx-2 px-4 items-center gap-4 mb-6 shrink-0">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search..."
            className="w-full pl-[40px] pr-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
          />
        </div>

        <div className="flex p-1 bg-[#F5F7FA] rounded-[10px] w-full sm:w-auto">
          {["Documents & File Access", "Invoices & Receipts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-5 py-2 text-[13px] font-bold rounded-[6px] transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#00A0E3] text-white shadow-sm"
                  : "text-[#78788D] hover:text-[#171717] hover:bg-[#EAEFF4]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex mx-2 px-4 flex-col">
        {activeTab === "Documents & File Access" ? (
          <div className="rounded-[12px] bg-white overflow-hidden">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F4F8FA] border-b border-[#EAECF0]">
                    <th className="px-6 py-4 text-[14px] font-medium text-[#171717] w-[25%]">Document Name</th>
                    <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Status</th>
                    <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Payment Status</th>
                    <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Files</th>
                    <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Amount</th>
                    <th className="px-6 py-4 text-[14px] font-medium text-[#171717]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc, index) => {
                    const paymentPending = doc.status === "payment_needed";
                    return (
                      <tr
                        key={doc.id}
                        className={`hover:bg-[#F9FAFB] transition-colors ${index !== docs.length - 1 ? "border-b border-[#EAECF0]" : ""}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <File className="w-[18px] h-[18px] text-[#A0AAB5]" strokeWidth={2} />
                            <span className="text-[14px] font-medium text-[#525866] truncate">
                              {doc.document_title || "Untitled Document"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-6 py-4">{getStatusBadge(paymentPending ? "pending" : "paid")}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {paymentPending ? <Lock className="w-[16px] h-[16px] text-[#A0AAB5]" strokeWidth={2} /> : null}
                            <span className="text-[13px] text-[#78788D] italic">
                              {paymentPending ? "Locked until payment" : "Available"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[13px] font-medium text-[#525866]">{formatCurrency(doc.estimated_total)}</td>
                        <td className="px-6 py-4 text-[13px] font-bold">
                          {paymentPending ? (
                            <button
                              onClick={() => openCheckout(doc)}
                              className="text-[#F97316] hover:underline whitespace-nowrap"
                            >
                              Pay to Download
                            </button>
                          ) : (
                            <button className="text-[#00A0E3] hover:underline whitespace-nowrap">Download</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-[14px] text-[#78788D]">
                        Loading payments data...
                      </td>
                    </tr>
                  ) : null}

                  {!loading && docs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-[14px] text-[#78788D]">
                        No documents found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-[12px] bg-white overflow-hidden">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#F4F8FA] border-b border-[#EAECF0]">
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Invoice Number</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Amount</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Date</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Status</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr
                      key={invoice.id}
                      className={`hover:bg-[#F9FAFB] transition-colors ${
                        index !== invoices.length - 1 ? "border-b border-[#EAECF0]" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-[14px] font-medium text-[#525866]">{invoice.invoice_number || "-"}</td>
                      <td className="px-6 py-4 text-[14px] text-[#525866]">{formatCurrency(invoice.amount)}</td>
                      <td className="px-6 py-4 text-[14px] text-[#525866]">{formatDate(invoice.created_at)}</td>
                      <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                      <td className="px-6 py-4">
                        <button className="text-[#00A0E3] text-[13px] font-bold hover:underline whitespace-nowrap">
                          Download Receipt
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!loading && invoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-[14px] text-[#78788D]">
                        No invoices found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <MockCheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => {
          setShowCheckoutModal(false);
          setSelectedDocument(null);
        }}
        context={
          showCheckoutModal && pendingCheckoutDocument
            ? {
                documentId: pendingCheckoutDocument.id,
                documentTitle: pendingCheckoutDocument.document_title || "Selected Document",
                amount: Number(pendingCheckoutDocument.estimated_total || 0),
                requireUpfrontPayment: false
              }
            : null
        }
        onSuccess={async () => {
          await loadPayments();
        }}
      />
    </div>
  );
}
