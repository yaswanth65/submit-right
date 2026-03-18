"use client";

import React from "react";
import Link from "next/link";
import { Search, Filter, MoreVertical, FileText } from "lucide-react";

export default function PaymentsScreen() {
  const stats = [
    { 
      title: "Total Revenue (This Month)", 
      value: "$67,250", 
      highlight: "12.5%", 
      isPos: true, 
      desc: "vs Last Month" 
    },
    { 
      title: "Pending Student Payments", 
      value: "$8,420", 
      valueColor: "text-[#FA7319]",
      desc: "14 transactions awaiting settlement" 
    },
    { 
      title: "Pending Editor Payouts", 
      value: "$12,340", 
      valueColor: "text-[#FA7319]",
      desc: "28 editors scheduled for payout" 
    },
  ];

  const studentPayments = [
    { id: "INV-2026-001", doc: "Case Study - Business...", student: "Sarah Johnson", service: "Editing", amount: "$425.00", deadline: "Feb 28, 2026", status: "Paid" },
    { id: "INV-2026-002", doc: "Research Paper - Clima...", student: "Michael Chen", service: "Proofreading", amount: "$380.00", deadline: "Feb 24, 2026", status: "Paid" },
    { id: "INV-2026-003", doc: "Thesis Chapter 3 - Met...", student: "Emily Davis", service: "Editing", amount: "$510.00", deadline: "Mar 02, 2026", status: "Paid" },
    { id: "INV-2026-004", doc: "Journal Article", student: "James Wilson", service: "Formatting", amount: "$220.00", deadline: "Mar 05, 2026", status: "Pending" },
    { id: "INV-2026-005", doc: "Dissertation Abstract", student: "Lisa Martinez", service: "Rewriting", amount: "$890.00", deadline: "Mar 10, 2026", status: "Paid" },
    { id: "INV-2026-006", doc: "Conference Paper - AI i...", student: "Albert Flores", service: "Proofreading", amount: "$340.00", deadline: "Feb 23, 2026", status: "Failed" },
  ];

  const editorPayouts = [
    { name: "Dr. Sarah Williams", email: "example@gmail.com", avatar: "https://i.pravatar.cc/150?u=1", docs: 12, amount: "$2840.00", method: "Bank Transfer", status: "Paid" },
    { name: "Prof. James Anderson", email: "example@gmail.com", avatar: "https://i.pravatar.cc/150?u=2", docs: 8, amount: "$1920.00", method: "PayPal", status: "Pending" },
    { name: "Dr. Maria Rodriguez", email: "example@gmail.com", avatar: "https://i.pravatar.cc/150?u=3", docs: 15, amount: "$3450.00", method: "Bank Transfer", status: "Paid" },
    { name: "Dr. Robert Chen", email: "example@gmail.com", avatar: "https://i.pravatar.cc/150?u=4", docs: 10, amount: "$2380.00", method: "Bank Transfer", status: "Paid" },
    { name: "Prof. Emily Thompson", email: "example@gmail.com", avatar: "https://i.pravatar.cc/150?u=5", docs: 14, amount: "$3220.00", method: "PayPal", status: "Pending" },
    { name: "Dr. Michael Brown", email: "example@gmail.com", avatar: "https://i.pravatar.cc/150?u=6", docs: 6, amount: "$1450.00", method: "PayPal", status: "On Hold" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    let classes = "";
    if (status === "Paid") classes = "bg-[#E0F2E9] text-[#1CB061]";
    else if (status === "Pending") classes = "bg-[#FFEFE5] text-[#FA7319]";
    else if (status === "Failed" || status === "On Hold") classes = "bg-[#FFEBEB] text-[#FB3748]";

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold ${classes}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 w-full font-dm-sans animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Payments</div>
          <p className="text-[14px] text-[#525866]">Manage platform revenue and payouts.</p>
        </div>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      {/* Top Stats Row */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] flex flex-wrap items-stretch shadow-sm">
        <div className="flex w-full flex-wrap lg:flex-nowrap items-stretch p-2">
          {stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx !== 0 && (
                <div className="flex items-center">
                  <div className="h-[60%] w-[1px] bg-[#EAECF0] mx-2 self-center rounded" />
                </div>
              )}
              <div className="flex-1 min-w-[200px] flex flex-col justify-center p-6">
                <div className="text-[13px] font-medium text-[#525866] mb-2">{stat.title}</div>
                <div className={`text-[24px] font-bold leading-none mb-2 ${stat.valueColor || 'text-[#171717]'}`}>
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1 whitespace-nowrap leading-none mt-auto">
                  {stat.highlight && (
                    <span className={`text-[12px] font-bold ${stat.isPos ? 'text-[#1CB061]' : 'text-[#FB3748]'}`}>
                      {stat.highlight}
                    </span>
                  )}
                  <span className="text-[12px] font-medium text-[#A0AAB5]">{stat.desc}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Student Payments Section */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
        <div className="p-6 pb-2">
          <div className="text-[16px] font-bold text-[#171717]">Student Payments</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />
        </div>
        <div className="p-4 flex justify-between items-center bg-[#FFFFFF]">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-[#EAECF0] text-[#171717] rounded-[8px] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar border-t border-[#EAECF0]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Invoice Number</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Document Name</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Student Name</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Service Type</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Amount Paid</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Deadline</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Payment Status</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentPayments.map((item, i) => (
                <tr key={item.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors group/row">
                  <td className="py-4 px-6 text-[13px] font-medium text-[#171717] whitespace-nowrap">
                    <Link href={`/admin/payments/${item.id}`} className="hover:text-[#00A0E3] hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-[13px] font-medium text-[#525866] whitespace-nowrap">
                      <FileText className="w-4 h-4 mr-2 text-[#A0AAB5]" />
                      {item.doc}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.student}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.service}</td>
                  <td className="py-4 px-6 text-[13px] text-[#171717] font-medium whitespace-nowrap">{item.amount}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{item.deadline}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <button className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1">
                      <MoreVertical className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Payouts Section */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
        <div className="p-6 pb-2">
          <div className="text-[16px] font-bold text-[#171717]">Editor Payouts</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />
        </div>
        <div className="p-4 flex justify-between items-center bg-[#FFFFFF]">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-[#EAECF0] text-[#171717] rounded-[8px] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar border-t border-[#EAECF0]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Editor Name</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Completed Docs.</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Pending Amount</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Payment Method</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] whitespace-nowrap">Ass. Status</th>
                <th className="py-3 px-6 text-[12px] font-medium text-[#525866] text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {editorPayouts.map((editor, i) => (
                <tr key={i} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors group/row">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img src={editor.avatar} alt={editor.name} className="w-8 h-8 rounded-full object-cover border border-[#EAECF0]" />
                      <div>
                        <div className="text-[13px] font-bold text-[#171717]">{editor.name}</div>
                        <div className="text-[12px] text-[#525866]">{editor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{editor.docs}</td>
                  <td className="py-4 px-6 text-[13px] text-[#171717] font-medium whitespace-nowrap">{editor.amount}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866] whitespace-nowrap">{editor.method}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <StatusBadge status={editor.status} />
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <button className="text-[#A0AAB5] hover:text-[#171717] transition-colors p-1">
                      <MoreVertical className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}