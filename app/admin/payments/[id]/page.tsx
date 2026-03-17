"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function PaymentDetailScreen() {
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id || "INV-2026-001";

  const auditTrail = [
    { action: "Document submitted by student", actor: "Sarah Johnson", time: "Feb 15, 2026 at 10:32 AM" },
    { action: "Document assigned to editor", actor: "System (Auto-Assignment)", time: "Feb 15, 2026 at 10:33 AM" },
    { action: "Editor accepted assignment", actor: "Dr. Sarah Williams", time: "Feb 15, 2026 at 3:18 PM" },
    { action: "Priority flag added", actor: "Admin John Davis", time: "Feb 16, 2026 at 9:15 AM" },
    { action: "Revision 1 uploaded", actor: "Dr. Sarah Williams", time: "Feb 18, 2026 at 2:45 PM" }
  ];

  return (
    <div className="space-y-6 max-w-[1140px] font-dm-sans animate-in fade-in duration-500 pb-10">
      
      {/* Header Region */}
      <div className="flex items-center justify-between mt-2 mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/payments" className="p-1.5 flex items-center justify-center bg-transparent border-none outline-none transition-colors hover:bg-[#F9FAFB] rounded-lg group">
            <ArrowLeft className="w-5 h-5 text-[#A0AAB5] group-hover:text-[#171717] transition-colors" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-[20px] font-bold text-[#171717]">{idStr}</div>
            <span className="bg-[#E0F2E9] text-[#1CB061] px-2.5 py-1 rounded-full text-[12px] font-semibold flex items-center h-fit">
              Paid
            </span>
          </div>
        </div>
        <button className="bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] px-4 py-2 rounded-[8px] text-[13px] font-semibold transition-transform transform hover:scale-105 active:scale-95 shadow-sm">
          Download Invoice
        </button>
      </div>

      {/* Transaction Overview */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm">
        <div className="text-[16px] font-bold text-[#171717] ">Transaction Overview</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4">
          <div>
             <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Document Name</div>
             <div className="text-[13px] text-[#171717] font-semibold">Case Study - Business Adminstration</div>
          </div>
          <div>
             <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Student Name</div>
             <div className="text-[13px] text-[#171717] font-semibold">Sarah Johnson</div>
          </div>
          <div>
             <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Service Type</div>
             <div className="text-[13px] text-[#171717] font-semibold">Editing</div>
          </div>
          <div>
             <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Transaction Amount</div>
             <div className="text-[13px] text-[#171717] font-semibold">$425.00</div>
          </div>
          <div>
             <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Transaction Date</div>
             <div className="text-[13px] text-[#171717] font-semibold">Mar 4, 2026 at 2:12 PM</div>
          </div>
          <div>
             <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Payment Method</div>
             <div className="text-[13px] text-[#171717] font-semibold">Visa •••• 4242</div>
          </div>
        </div>
      </div>

      {/* Middle Row: Timeline and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Event Timeline */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex flex-col">
          <div className="text-[16px] font-bold text-[#171717] ">Payment Event Timeline</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          
          {/* Horizontal Timeline */}
          <div className="relative mt-2 flex-grow overflow-x-auto custom-scrollbar pb-3">
            {/* Background Line */}
            <div className="absolute top-[14px] left-[20px] right-[20%] h-px bg-[#EAECF0] min-w-[500px]"></div>
            
            <div className="flex justify-between relative z-10 w-full min-w-[500px]">
              {[
                { title: "Payment Recorded", detail: "System", time: "Mar 4, 2026 at 2:15 PM" },
                { title: "Payment Confirmed", detail: "Stripe Gateway", time: "Mar 4, 2026 at 2:14 PM" },
                { title: "Payment Processing", detail: "Stripe Gateway", time: "Mar 4, 2026 at 2:13 PM" },
                { title: "Payment Initiated", detail: "Sarah Johnson", time: "Mar 4, 2026 at 2:12 PM" },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col flex-1 relative pr-4">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#00A0E3] flex items-center justify-center text-white mb-3 shadow-[0_0_0_4px_#FFFFFF]">
                    <CheckCircle2 className="w-4 h-4 text-[#FFFFFF]" />
                  </div>
                  <div className="text-[13px] font-bold text-[#171717] mb-1">{step.title}</div>
                  <div className="text-[12px] text-[#525866]">{step.detail}</div>
                  <div className="text-[12px] text-[#A0AAB5] mt-1">{step.time}</div>
                  
                  {idx < 3 && (
                     <div className="absolute top-[14px] left-[30px] w-[calc(100%-30px)] h-[2px] bg-[#00A0E3] -z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[16px] font-bold text-[#171717] ">Payment Breakdown</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] text-[#525866] font-medium">Editor Payout</span>
              <span className="text-[13px] text-[#171717] font-semibold">$340.00</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-[13px] text-[#525866] font-medium">Platform Fee</span>
              <span className="text-[13px] text-[#171717] font-semibold">$85.00</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-[#EAECF0]">
            <span className="text-[14px] text-[#171717] font-bold">Total Payment</span>
            <span className="text-[18px] text-[#00A0E3] font-bold">$425.00</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Financial Audit Trail and Transaction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Financial Audit Trail */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm flex flex-col h-full overflow-hidden">
           <div className="p-6 pb-2">
          <div className="text-[16px] font-bold text-[#171717]">Financial Audit Trail</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />
        </div>
           <div className="flex-1 overflow-x-auto relative">
             <table className="w-full text-left border-collapse min-w-[500px]">
               <thead>
                 <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                   <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Action</th>
                   <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Actor</th>
                   <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Timestamp</th>
                 </tr>
               </thead>
               <tbody>
                 {auditTrail.map((item, idx) => (
                   <tr key={idx} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                     <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.action}</td>
                     <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.actor}</td>
                     <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.time}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm h-full">
          <div className="text-[16px] font-bold text-[#171717] ">Transaction Details</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          
          <div className="space-y-5">
            <div>
              <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Payment Gateway ID</div>
              <div className="text-[13px] text-[#171717] font-semibold break-all">pi_3MtwBwLkdlwHu7ix2KOH8WJc</div>
            </div>
            
            <div>
              <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Gateway Status</div>
              <div className="text-[13px] text-[#171717] font-semibold">Succeeded</div>
            </div>
            
            <div>
              <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Currency</div>
              <div className="text-[13px] text-[#171717] font-semibold">USD</div>
            </div>
            
            <div>
              <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Processing Time</div>
              <div className="text-[13px] text-[#171717] font-semibold">2.3 seconds</div>
            </div>
            
            <div>
              <div className="text-[12px] text-[#A0AAB5] font-medium mb-1">Payment Reference Number</div>
              <div className="text-[13px] text-[#171717] font-semibold break-all">REF-2026-04278-SJ</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}