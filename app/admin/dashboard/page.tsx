import React from "react";
import { RevenueChart } from "@/components/RevenueChart";

export default function AdminDashboard() {
  const stats = [
    { title: "Active Documents", value: "124", highlight: "5%", isPos: true, suffix: "vs Last Month" },
    { title: "Pending Assignments", value: "42", highlight: "Stable", isPos: null, suffix: "" },
    { title: "Revision Requests", value: "15", highlight: "+0.2%", isPos: true, suffix: "vs Last Month" },
    { title: "Overdue Tasks", value: "08", highlight: "Critical", isPos: false, suffix: "" },
    { title: "Active Editors", value: "36", highlight: "+3%", isPos: true, suffix: "vs Last Month" },
    { title: "Revenue This Month", value: "$67,250", highlight: "+8%", isPos: true, suffix: "vs Last Month" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Dashboard</div>
          <p className="text-[14px] text-[#525866]">System overview and operational control.</p>
        </div>
      </div>

      {/* Top Stats Row - unified component with floating vertical dividers */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] flex flex-wrap items-stretch shadow-sm">
        <div className="flex w-full flex-wrap lg:flex-nowrap items-stretch">
          {stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx !== 0 && (
                <div className="flex items-center">
                  <div className="h-[60%] w-[1px] bg-[#EAECF0] mx-2 self-center rounded" />
                </div>
              )}
              <div className={`flex-1 min-w-[160px] flex flex-col justify-center p-6`}>
                <div className="text-[13px] font-medium text-[#525866] mb-1.5">{stat.title}</div>
                <div className={`text-[24px] font-bold leading-none mb-2 ${stat.title === 'Overdue Tasks' ? 'text-[#FB3748]' : 'text-[#171717]'}`}>
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1 whitespace-nowrap leading-none mt-auto">
                  <span className={`text-[12px] font-bold ${stat.isPos === true ? 'text-[#1CB061]' : stat.isPos === false ? 'text-[#FB3748]' : 'text-[#525866]'}`}>
                    {stat.highlight}
                  </span>
                  <span className="text-[12px] font-medium text-[#A0AAB5]">{stat.suffix}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Revenue Snapshot Card */}
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm flex flex-col min-h-[440px]">
          <div className="text-[16px] font-bold text-[#171717] ">Revenue Snapshot</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          <div className="flex items-center space-x-10 mb-6">
            <div>
              <div className="text-[13px] text-[#525866] font-semibold mb-1">This Month</div>
              <div className="text-[20px] font-bold text-[#171717]">$67,250</div>
            </div>
            <div className="w-[1px] h-10 bg-[#EAECF0]"></div>
            <div>
              <div className="text-[13px] text-[#525866] font-semibold mb-1">Pending Payouts</div>
              <div className="text-[16px] font-bold text-[#FA7319]">$12,340</div>
            </div>
            <div className="w-[1px] h-10 bg-[#EAECF0]"></div>
            <div>
              <div className="text-[13px] text-[#525866] font-semibold mb-1">Paid Payouts</div>
              <div className="text-[16px] font-bold text-[#10B981]">$54,910</div>
            </div>
          </div>
          <div className="flex-1 w-full border-t border-[#EAECF0] pt-6 min-h-[250px]">
             <RevenueChart />
          </div>
        </div>
        
        {/* Pending Actions Card */}
        <div className="lg:col-span-1 bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 flex flex-col min-h-[440px] shadow-sm">
          <div className="text-[16px] font-bold text-[#171717] ">Pending Actions</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
          <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 custom-scrollbar">
            {[
              { id: 1, action: "Assignment Acceptance Pending", context: "Research Paper - John Smith" },
              { id: 2, action: "Deadline Extension Requests", context: "Thesis Chapter 3 - Emily Davis" },
              { id: 3, action: "Payment Approval Required", context: "nvoice #4521 - Dr. Martinez" }
            ].map((item) => (
              <div key={item.id} className="p-4 border border-[#EAECF0] rounded-[10px] flex justify-between items-center bg-[#FFFFFF]">
                <div>
                  <div className="text-[13px] font-bold text-[#171717] tracking-tight">{item.action}</div>
                  <p className="text-[12px] text-[#525866] mt-1 font-medium">{item.context}</p>
                </div>
                <button className="bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] px-4 py-[7px] rounded-[6px] text-[13px] font-semibold transition-colors shadow-sm ml-2 shrink-0">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload Distribution Table */}
      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm mt-2">
        <div className="text-[16px] text-[#171717] font-bold ">Workload Distribution</div>
<div className="mx-auto w-[98%] h-px mt-4 mb-4  bg-[#EAECF0]" />
        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Editor Name</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Active Assignments</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Overdue Tasks</th>
                <th className="py-4 px-6 text-[13px] font-bold text-[#525866]">Availability Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-[#FFFFFF]">
              {[
                { name: "Dr. Sarah Williams", active: "8", overdue: "-", status: "Available", statusColor: "#1CB061", bg: "#E3F7EC" },
                { name: "Prof. James Anderson", active: "12", overdue: "2", status: "Busy", statusColor: "#FA7319", bg: "#FFF4ED" },
                { name: "Dr. Maria Rodriguez", active: "5", overdue: "-", status: "Available", statusColor: "#1CB061", bg: "#E3F7EC" },
                { name: "Dr. Robert Chen", active: "15", overdue: "1", status: "At Capacity", statusColor: "#FB3748", bg: "#FEF2F2" },
                { name: "Prof. Emily Thompson", active: "7", overdue: "-", status: "Available", statusColor: "#1CB061", bg: "#E3F7EC" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6 font-bold text-[14px] text-[#525866]">{row.name}</td>
                  <td className="py-4 px-6 font-medium text-[14px] text-[#525866]">{row.active}</td>
                  <td className={`py-4 px-6 font-bold text-[14px] ${row.overdue !== '-' ? 'text-[#FB3748]' : 'text-[#525866]'}`}>{row.overdue}</td>
                  <td className="py-4 px-6">
                    <span 
                      className="px-3 py-[5px] rounded-full text-[12px] font-bold inline-flex items-center justify-center min-w-[80px]"
                      style={{ color: row.statusColor, backgroundColor: row.bg }}
                    >
                      {row.status}
                    </span>
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
