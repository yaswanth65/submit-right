"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

const servicesData = [
  { id: "1", type: "Editing", name: "Improve grammar and clarity", rate: "₹0.20", date: "Feb 28, 2026", status: "Active" },
  { id: "2", type: "Editing", name: "Structure refinement", rate: "₹0.20", date: "-", status: "Unactive" },
  { id: "3", type: "Translation", name: "Convert to academic English", rate: "₹0.20", date: "Feb 28, 2026", status: "Active" },
  { id: "4", type: "Proofreading", name: "Improve grammar and clarity", rate: "₹0.20", date: "Feb 28, 2026", status: "Active" },
  { id: "5", type: "Proofreading", name: "Structure refinement", rate: "₹0.20", date: "-", status: "Active" },
  { id: "6", type: "Proofreading", name: "Academic tone correction", rate: "₹0.20", date: "Feb 28, 2026", status: "Unactive" },
  { id: "7", type: "Publication Support", name: "Journal selection guidance", rate: "₹0.20", date: "-", status: "Unactive" },
  { id: "8", type: "Publication Support", name: "Formatting compliance", rate: "₹0.20", date: "Feb 28, 2026", status: "Active" },
];

export default function DomainsAndServicesPage() {
  const router = useRouter();

  return (
    <div className="w-full font-dm-sans">
      <div className="flex items-center text-[13px] text-[#A0AAB5] mb-6">
        <Link href="/admin/dashboard" className="hover:text-[#171717] transition-colors">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-[#171717] font-medium">Domains & Services</span>
      </div>

      <div className="mb-6">
        <h1 className="text-[24px] font-medium text-[#1C1C1D] mb-1 font-inter">Domains & Services</h1>
        <p className="text-[14px] text-[#78788D]">Lorem ipsum dolor sit amet consectetur.</p>
      </div>

      <div className="bg-white rounded-[12px] border border-[#EAECF0] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#EAECF0]">
          <div className="relative w-full max-w-[360px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-[18px] w-[18px] text-[#A0AAB5]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full pl-9 pr-3 py-[9px] border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-colors"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-[9px] border border-[#EAECF0] rounded-[8px] text-[14px] font-medium text-[#525866] hover:bg-[#F9FAFB] transition-colors shadow-sm bg-white">
            <Filter className="h-[16px] w-[16px]" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Domain Type</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Services Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Word Count Rate</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Last Updated Date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider">Availability Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {servicesData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#1C1C1D]">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#525866]">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#525866]">{item.rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#525866]">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                      item.status === "Active" 
                        ? "bg-[#ECFDF3] text-[#027A48]" 
                        : "bg-[#FEF3F2] text-[#B42318]"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link
                      href={`/admin/domains-services/${item.id}`}
                      className="inline-flex items-center justify-center px-4 py-1.5 border border-transparent rounded-[6px] shadow-sm text-[13px] font-medium text-white bg-[#00A0E3] hover:bg-[#008CC7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A0E3] transition-colors"
                    >
                      View
                    </Link>
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
