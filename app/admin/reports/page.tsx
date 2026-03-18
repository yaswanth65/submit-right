"use client";

import React from "react";
import { RevenueChart } from "@/components/RevenueChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Search, Filter, Download } from "lucide-react";

export default function ReportsScreen() {
  const barData = [
    { name: 'Editing', Orders: 70, Revenue: 45 },
    { name: 'Proofreading', Orders: 80, Revenue: 55 },
    { name: 'Rewriting', Orders: 30, Revenue: 58 },
    { name: 'Formatting', Orders: 25, Revenue: 15 },
  ];

  const editors = [
    { name: "Dr. Sarah Williams", email: "example@gmail.com", docs: 12, delivery: 94, revision: 12, assignments: 12, img: "https://i.pravatar.cc/150?u=1" },
    { name: "Prof. James Anderson", email: "example@gmail.com", docs: 8, delivery: 74, revision: 38, assignments: 8, img: "https://i.pravatar.cc/150?u=2" },
    { name: "Dr. Maria Rodriguez", email: "example@gmail.com", docs: 15, delivery: 64, revision: 42, assignments: 15, img: "https://i.pravatar.cc/150?u=3" },
    { name: "Dr. Robert Chen", email: "example@gmail.com", docs: 10, delivery: 85, revision: 13, assignments: 10, img: "https://i.pravatar.cc/150?u=4" },
    { name: "Prof. Emily Thompson", email: "example@gmail.com", docs: 14, delivery: 76, revision: 26, assignments: 14, img: "https://i.pravatar.cc/150?u=5" },
    { name: "Dr. Michael Brown", email: "example@gmail.com", docs: 6, delivery: 91, revision: 14, assignments: 6, img: "https://i.pravatar.cc/150?u=6" },
  ];

  return (
    <div className="space-y-6 w-full font-dm-sans animate-in fade-in duration-700 pb-10">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <div className="text-[20px] font-bold text-[#171717] mb-[2px]">Reports</div>
          <p className="text-[14px] text-[#525866]">Platform performance and operational insights.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-[#EAECF0] rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#00A0E3] bg-white transition-all shadow-sm cursor-pointer hover:border-[#EAECF0]">
            <option>Last 30 Days</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-[#00A0E3] hover:bg-[#0090D1] text-[#FFFFFF] rounded-[8px] text-[13px] font-semibold transition-transform transform hover:-translate-y-0.5 active:scale-95 shadow-sm group">
            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            Export Data
          </button>
        </div>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] flex flex-wrap items-stretch shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex w-full flex-wrap lg:flex-nowrap items-stretch">
          {[
            { label: "Total Documents Submitted", val: "247" },
            { label: "Documents Completed", val: "189", color: "text-[#10B981]" },
            { label: "Average Turnaround Time", val: "3.2 days" },
            { label: "Overdue Rate", val: "5.7%", color: "text-[#FA7319]" },
          ].map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx !== 0 && (
                <div className="flex items-center block">
                  <div className="h-[60%] w-[1px] bg-[#EAECF0] mx-2 self-center rounded" />
                </div>
              )}
              <div className="flex-1 min-w-[200px] p-6 group cursor-pointer hover:bg-[#F9FAFB] transition-colors rounded-[12px]">
                <div className="text-[13px] font-medium text-[#525866] mb-1.5 group-hover:text-[#171717] transition-colors">{stat.label}</div>
                <div className={`text-[24px] font-bold leading-none ${stat.color || "text-[#171717]"} group-hover:scale-105 origin-left transition-transform duration-300`}>
                  {stat.val}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm group hover:shadow-md transition-shadow duration-300 min-h-[440px]">
        <div className="flex justify-between items-center mb-6">
          <div className="text-[16px] font-bold text-[#171717]">Revenue Analytics</div>
        </div>
        <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />
        <div className="flex items-center space-x-12 mb-6">
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Total Revenue (Last 30 Days)</div>
            <div className="text-[18px] font-bold text-[#171717]">$77,700</div>
          </div>
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Average Order Value</div>
            <div className="text-[18px] font-bold text-[#171717]">$315</div>
          </div>
        </div>
        <div className="w-full h-[300px]">
          <RevenueChart />
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm group hover:shadow-md transition-shadow duration-300 min-h-[440px]">
        <div className="flex justify-between items-center mb-6">
          <div className="text-[16px] font-bold text-[#171717]">Revenue Analytics</div>
        </div>
        <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />
        <div className="flex items-center space-x-12 mb-6">
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Total Orders</div>
            <div className="text-[18px] font-bold text-[#171717]">216</div>
          </div>
          <div>
            <div className="text-[13px] text-[#525866] font-medium mb-1">Total Revenue</div>
            <div className="text-[18px] font-bold text-[#171717]">$77,700</div>
          </div>
        </div>
        <div className="w-full h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }} dy={10} />
              <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => val === 0 ? "0" : val} label={{ value: 'Orders', angle: -90, position: 'insideLeft', fill: '#525866', fontSize: 12, fontWeight: 500, offset: 0 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => val === 0 ? "0" : `${val}k`} label={{ value: 'Revenue', angle: 90, position: 'insideRight', fill: '#525866', fontSize: 12, fontWeight: 500, offset: 0 }} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px', fontWeight: 500 }} />
              <Bar yAxisId="left" dataKey="Orders" fill="#00A0E3" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
              <Bar yAxisId="right" dataKey="Revenue" fill="#10B981" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center items-center space-x-6 mt-4">
          <div className="flex items-center text-[12px] font-medium text-[#525866] group-hover:text-[#171717] transition-colors"><span className="w-3 h-3 rounded-sm bg-[#00A0E3] mr-2"></span>Orders</div>
          <div className="flex items-center text-[12px] font-medium text-[#525866] group-hover:text-[#171717] transition-colors"><span className="w-3 h-3 rounded-sm bg-[#10B981] mr-2"></span>Revenue</div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="p-6 pb-2">
          <div className="text-[16px] font-bold text-[#171717]">Editor Performance Overview</div>
          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />
        </div>
        <div className="p-4 border-b border-[#EAECF0] flex justify-between items-center bg-[#F9FAFB]">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-all bg-white"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-[#EAECF0] bg-white text-[#171717] rounded-[8px] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors hover:border-[#EAECF0]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Document Name</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Completed Docs.</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">On-Time Deliver</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Revision Rate</th>
                <th className="py-3 px-6 text-[12px] font-semibold text-[#525866] uppercase tracking-wider">Active Assignments</th>
              </tr>
            </thead>
            <tbody>
              {editors.map((editor, i) => (
                <tr key={i} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-200 group/row">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img src={editor.img} alt={editor.name} className="w-8 h-8 rounded-full border border-[#EAECF0] group-hover/row:scale-110 transition-transform duration-300" />
                      <div>
                        <div className="text-[13px] font-bold text-[#171717]">{editor.name}</div>
                        <div className="text-[12px] text-[#525866]">{editor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-medium text-[#171717]">{editor.docs}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center w-[120px]">
                      <div className="h-1.5 w-full bg-[#EAECF0] rounded-full overflow-hidden mr-3">
                        <div 
                           className={`h-full rounded-full transition-all duration-1000 ease-out origin-left ${editor.delivery > 80 ? 'bg-[#10B981]' : editor.delivery > 70 ? 'bg-[#FA7319]' : 'bg-[#FB3748]'}`}
                           style={{ width: `${editor.delivery}%` }}
                        ></div>
                      </div>
                      <span className="text-[13px] font-medium text-[#525866] min-w-[30px]">{editor.delivery}%</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 text-[13px] font-semibold ${editor.revision > 30 ? 'text-[#FA7319]' : editor.revision > 40 ? 'text-[#FB3748]' : 'text-[#171717]'}`}>
                    {editor.revision}%
                  </td>
                  <td className="py-4 px-6 text-[13px] font-medium text-[#171717]">{editor.assignments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}