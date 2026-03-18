"use client";

import React, { useState } from "react";
import { 
  Search, 
  FileText, 
  Coins, 
  CreditCard, 
  Lock, 
  ChevronLeft, 
  ChevronRight,
  File, 
  Check, 
  AlertCircle,      
  Download, 
  ArrowLeft, 
  RefreshCw,
} from "lucide-react";

export default function PaymentsAndFilesPage() {
  const [activeTab, setActiveTab] = useState("Documents & File Access");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentState, setPaymentState] = useState<"processing" | "success" | "failed">("processing");

  const handleMakePayment = () => {
    setIsPaymentModalOpen(true);
    setPaymentState("processing");

    // Simulate payment processing delay (1.5 seconds)
    setTimeout(() => {
      // Randomly resolve to success or failed for demonstration purposes
      setPaymentState(Math.random() > 0.5 ? "success" : "failed");
    }, 1500);
  };
  const handleRetryPayment = () => {
    setPaymentState("processing");
    setTimeout(() => {
      setPaymentState(Math.random() > 0.5 ? "success" : "failed");
    }, 1500);
  };

  const closeModal = () => {
    setIsPaymentModalOpen(false);
  };
  const documentData = [
    {
      id: 1,
      name: "AI Research Paper",
      service: "Journal Editing",
      status: "Completed",
      paymentStatus: "Pending",
      files: "Locked until payment",
      fileLocked: true,
      action: "Pay to Download",
    },
    {
      id: 2,
      name: "Thesis Chapter 3",
      service: "Academic Editing",
      status: "Completed",
      paymentStatus: "Paid",
      files: "Thesis_Final.pdf",
      fileLocked: false,
      action: "Download",
    },
    {
      id: 3,
      name: "Literature Review Draft",
      service: "Proofreading",
      status: "In Progress",
      paymentStatus: "Pending",
      files: "Not available yet",
      fileLocked: true,
      action: "-",
    },
  ];

  const invoiceData = [
    {
      id: "INV-2026-001",
      amount: "350",
      date: "Feb 15, 2026",
      status: "Paid",
    },
    {
      id: "INV-2026-002",
      amount: "425",
      date: "Feb 15, 2026",
      status: "Paid",
    },
    {
      id: "INV-2026-003",
      amount: "460",
      date: "Feb 15, 2026",
      status: "Paid",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
      case "Paid":
        return (
          <span className="bg-[#E6F8EC] text-[#00A859] border border-[#00A859]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {status}
          </span>
        );
      case "Pending":
        return (
          <span className="bg-[#FEF0E6] text-[#F97316] border border-[#F97316]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {status}
          </span>
        );
      case "In Progress":
        return (
          <span className="bg-[#EFF6FF] text-[#3B82F6] border border-[#3B82F6]/20 text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-dm-sans  mx-auto flex flex-col min-h-[calc(100vh-76px)]">
      
      {/* --- HEADER --- */}
      <div className=" px-4 py-2 shrink-0">
        <h1 className="text-[24px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Payments & Files
        </h1>
        <p className="text-[#8A94A6] text-[14px]">
          Complete payment to access your final documents.
        </p>
      </div>

      {/* <div className="w-full h-[1px] bg-[#EAECF0] mb-6 shrink-0"></div> */}

      {/* --- PAYMENT SUMMARY CARD --- */}
      <div className="border-y border-[#EAECF0] bg-white overflow-hidden shadow-sm mb-8 shrink-0">
        <div className="p-4 mx-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="bg-[#FEF0E6] text-[#F97316] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Pending
            </span>
            <div className="flex flex-col mt-1">
              <span className="text-[32px] font-medium text-[#171717] leading-none mb-1.5">
                ₹425.00
              </span>
              <span className="text-[#8A94A6] text-[13px] font-medium">
                Total Amount Due
              </span>
            </div>
          </div>

          <button onClick={handleMakePayment} className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-[8px] flex items-center gap-2 text-[14px] font-bold transition-colors shadow-sm">
            <CreditCard className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Make Payment
          </button>
          {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[500px] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            <div className="p-10 flex flex-col items-center">
              
              {/* === STATE: PROCESSING === */}
              {paymentState === "processing" && (
                <div className="flex flex-col items-center w-full text-center">
                  <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#E1F4FD] mb-6 shadow-[0_0_30px_10px_rgba(0,160,227,0.2)]">
                    <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-[#00A0E3]" fill="#00A0E3" color="white" />
                    </div>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#171717] mb-2">Processing Payment</h2>
                  <p className="text-[#8A94A6] text-[16px] mb-10 leading-relaxed max-w-[90%]">
                    Your payment is being processed. Please do not refresh or close this window.
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full mb-4 h-2 bg-[#EAECF0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00A0E3] w-[45%] rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                  </div>
                  <p className="text-[#8A94A6] text-[13px] font-medium tracking-wider mb-10 uppercase">
                    Securing Transaction
                  </p>
                  
                  <div className="w-full h-[1px] bg-[#EAECF0] mb-6"></div>
                  <p className="text-[#8A94A6] text-[15px]">Transaction Reference: TRX-2026-0001</p>
                </div>
              )}

              {/* === STATE: SUCCESS === */}
              {paymentState === "success" && (
                <div className="flex flex-col items-center w-full text-center animate-in fade-in duration-300">
                  <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#E6F8EC] mb-6 shadow-[0_0_30px_10px_rgba(0,168,89,0.2)]">
                    <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#00A859] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#171717] mb-2">Payment Successful</h2>
                  <p className="text-[#8A94A6] text-[16px] mb-8 leading-relaxed max-w-[95%]">
                    Your payment has been completed successfully and your documents are ready for download.
                  </p>

                  <div className="w-full border border-[#EAECF0] rounded-[16px] p-5 flex flex-col gap-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[#8A94A6] text-[15px]">Amount Paid</span>
                      <span className="text-[#171717] text-[18px] font-bold">₹425.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8A94A6] text-[15px]">Transaction ID</span>
                      <span className="text-[#171717] text-[15px] font-medium">SR-5920-X1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8A94A6] text-[15px]">Date</span>
                      <span className="text-[#171717] text-[15px] font-medium">Jan 22, 2026</span>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 mb-4">
                    <button className="flex-1 py-3.5 border border-[#EAECF0] rounded-[8px] text-[15px] font-bold text-[#171717] flex items-center justify-center gap-2 hover:bg-[#F9FAFB] transition-colors">
                      <FileText className="w-[18px] h-[18px]" strokeWidth={2.5} /> View Invoice
                    </button>
                    <button className="flex-1 py-3.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[8px] text-[15px] font-bold flex items-center justify-center gap-2 transition-colors">
                      <Download className="w-[18px] h-[18px]" strokeWidth={2.5} /> Download Final Files
                    </button>
                  </div>
                  <button 
                    onClick={closeModal} 
                    className="w-full py-3.5 border border-[#EAECF0] rounded-[8px] text-[15px] font-bold text-[#171717] flex items-center justify-center gap-2 hover:bg-[#F9FAFB] transition-colors"
                  >
                    <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={2.5} /> Back to Payments & Files
                  </button>
                </div>
              )}

              {/* === STATE: FAILED === */}
              {paymentState === "failed" && (
                <div className="flex flex-col items-center w-full text-center animate-in fade-in duration-300">
                  <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#FEE2E2] mb-6 shadow-[0_0_30px_10px_rgba(239,68,68,0.2)]">
                    <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#EF4444] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-[14px]">!</span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#171717] mb-2">Payment Failed</h2>
                  <p className="text-[#8A94A6] text-[16px] mb-1">
                    Your payment could not be processed.
                  </p>
                  <p className="text-[#8A94A6] text-[16px] mb-8">
                    Transaction ID: #SR-98231-PF
                  </p>

                  <div className="w-full border border-[#EAECF0] rounded-[16px] p-6 mb-8 bg-[#F9FAFB]">
                    <p className="text-[#525866] text-[15px] leading-relaxed">
                      Please check your payment details, ensure sufficient funds are available, or try a different card.
                    </p>
                  </div>

                  <div className="w-full flex gap-4">
                    <button 
                      onClick={closeModal} 
                      className="flex-1 py-3.5 border border-[#EAECF0] rounded-[8px] text-[15px] font-bold text-[#171717] flex items-center justify-center gap-2 hover:bg-[#F9FAFB] transition-colors"
                    >
                      <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={2.5} /> Back to Payments
                    </button>
                    <button 
                      onClick={handleRetryPayment}
                      className="flex-1 py-3.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[8px] text-[15px] font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <RefreshCw className="w-[18px] h-[18px]" strokeWidth={2.5} /> Retry Payment
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}
        </div>
        
        <div className="px-6 py-4 border-t border-[#EAECF0] bg-[#FAFAFB] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-2 text-[14px]">
            <FileText className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
            <span className="text-[#8A94A6]">Total Word Count:</span>
            <span className="text-[#171717] font-bold">4,250</span>
          </div>
          <div className="hidden sm:block w-[1px] h-[20px] bg-[#D1D5DB]"></div>
          <div className="flex items-center gap-2 text-[14px]">
            <Coins className="w-[18px] h-[18px] text-[#00A0E3]" strokeWidth={2} />
            <span className="text-[#8A94A6]">Rate Per Word:</span>
            <span className="text-[#171717] font-bold">₹0.10</span>
          </div>
        </div>
      </div>

      {/* --- CONTROLS: SEARCH & TABS --- */}
      <div className="flex flex-col sm:flex-row justify-between mx-2 px-4 items-center gap-4 mb-6 shrink-0">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
          <input 
            type="text" 
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
                  : "text-[#8A94A6] hover:text-[#171717] hover:bg-[#EAEFF4]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- TABLES SECTION --- */}
      <div className="flex-1 flex mx-2 px-4 flex-col">
        {activeTab === "Documents & File Access" && (
          <div className="border border-[#EAECF0] rounded-[12px] bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F4F8FA] border-b border-[#EAECF0]">
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717] w-[25%]">Document Name</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Service Type</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Status</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Payment Status</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717] w-[25%]">Files</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((doc, idx) => (
                    <tr 
                      key={doc.id} 
                      className={`hover:bg-[#F9FAFB] transition-colors ${
                        idx !== documentData.length - 1 ? 'border-b border-[#EAECF0]' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <File className="w-[18px] h-[18px] text-[#A0AAB5]" strokeWidth={2} />
                          <span className="text-[14px] font-medium text-[#525866] truncate">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-[#525866]">
                        {doc.service}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(doc.status)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(doc.paymentStatus)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {doc.fileLocked ? (
                            <>
                              {doc.files === "Locked until payment" && <Lock className="w-[16px] h-[16px] text-[#A0AAB5]" strokeWidth={2} />}
                              <span className="text-[13px] text-[#8A94A6] italic">{doc.files}</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-[16px] h-[16px] text-[#525866]" strokeWidth={2} />
                              <span className="text-[13px] text-[#525866] font-medium">{doc.files}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] font-bold">
                        {doc.action === "Pay to Download" && (
                          <button className="text-[#F97316] hover:underline whitespace-nowrap">Pay to Download</button>
                        )}
                        {doc.action === "Download" && (
                          <button className="text-[#00A0E3] hover:underline whitespace-nowrap">Download</button>
                        )}
                        {doc.action === "-" && (
                          <span className="text-[#A0AAB5]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Invoices & Receipts" && (
          <div className="border border-[#EAECF0] rounded-[12px] bg-white overflow-hidden shadow-sm">
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
                  {invoiceData.map((inv, idx) => (
                    <tr 
                      key={inv.id} 
                      className={`hover:bg-[#F9FAFB] transition-colors ${
                        idx !== invoiceData.length - 1 ? 'border-b border-[#EAECF0]' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-[14px] font-medium text-[#525866]">
                        {inv.id}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#525866]">
                        {inv.amount}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#525866]">
                        {inv.date}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(inv.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#00A0E3] text-[13px] font-bold hover:underline whitespace-nowrap">
                          Download Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PAGINATION --- */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8A94A6] text-[13px]">
            Showing <span className="font-bold text-[#171717]">3</span> of <span className="font-bold text-[#171717]">12</span> documents
          </p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#EAECF0] text-[#A0AAB5] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] bg-[#00A0E3] text-white text-[13px] font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#EAECF0] text-[#525866] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#EAECF0] text-[#525866] hover:bg-[#F9FAFB] transition-colors">
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}