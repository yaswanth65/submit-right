import React from 'react';
import { FileText, CheckSquare, Star, TrendingUp, Search, Filter, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function CompletedDocuments() {
  const stats = [
    { title: "Total Completed", value: "145", icon: CheckSquare, iconColor: "text-[#1CB061]", iconBg: "bg-[#E0F2E9]" },
    { title: "This Month", value: "12", icon: CheckSquare, iconColor: "text-[#1CB061]", iconBg: "bg-[#E0F2E9]" },
    { title: "Avg. Rating", value: "4.8/5", icon: Star, iconColor: "text-[#FBBF24]", iconBg: "bg-[#FEF3C7]" },
    { title: "Total Words", value: "254K", icon: TrendingUp, iconColor: "text-[#00A0E3]", iconBg: "bg-[#E0F6FF]" },
  ];

  const completedDocs = [
    { id: 1, name: "Thesis Chapter 3 - M...", client: "Dr. Sarah Jenkins", date: "Feb 18, 2024", words: "7,800", rating: 5, status: "Completed" },
    { id: 2, name: "Research Paper - Cli...", client: "Prof. Michael Chang", date: "Feb 15, 2024", words: "4,200", rating: 4, status: "Completed" },
    { id: 3, name: "Dissertation Abstract", client: "Dr. Emily Chen", date: "Feb 12, 2024", words: "2,100", rating: 5, status: "Completed" },
    { id: 4, name: "Journal Article", client: "Dr. Robert Wilson", date: "Feb 10, 2024", words: "6,500", rating: 4, status: "Completed" },
    { id: 5, name: "Conference Paper - A...", client: "Dr. Lisa Kumar", date: "Feb 08, 2024", words: "5,300", rating: 5, status: "Completed" },
    { id: 6, name: "Literature Review", client: "Prof. David Miller", date: "Feb 05, 2024", words: "8,900", rating: 5, status: "Completed" },
    { id: 7, name: "Technical Report - En...", client: "Dr. Sarah Jenkins", date: "Feb 01, 2024", words: "12,400", rating: 4, status: "Completed" },
    { id: 8, name: "Grant Proposal", client: "Dr. Amanda Foster", date: "Jan 28, 2024", words: "3,500", rating: 5, status: "Completed" },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${i < rating ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-[#EAECF0] fill-[#EAECF0]'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full font-dm-sans">
      
      {/* Header */}
      <div>
        <div className="text-[24px] font-bold text-[#171717] mb-1">Completed Documents</div>
        <div className="text-[14px] text-[#525866]">View and manage all your completed work.</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex items-start justify-between">
            <div>
              <div className="text-[14px] text-[#525866] font-medium mb-3">{stat.title}</div>
              <div className="text-[32px] font-bold text-[#171717] leading-none">{stat.value}</div>
            </div>
            <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0 ${stat.iconBg} ${stat.iconColor}`}>
              <stat.icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] overflow-hidden shadow-sm">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-[#EAECF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF]">
          
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full pl-9 pr-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#525866] hover:bg-[#F9FAFB] transition-colors bg-[#FFFFFF]">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#525866] hover:bg-[#F9FAFB] transition-colors bg-[#FFFFFF]">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Document Name</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Client</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Completed Date</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Word Count</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Rating</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Status</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {completedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors bg-[#FFFFFF]">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3 cursor-pointer group">
                      <FileText className="w-4 h-4 text-[#A0AAB5] group-hover:text-[#525866] transition-colors" />
                      <span className="text-[13px] font-medium text-[#171717] group-hover:underline">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.client}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.date}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.words}</td>
                  <td className="py-4 px-6">
                    {renderStars(doc.rating)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#1CB061] text-[#1CB061] bg-[#E0F2E9] bg-opacity-30 inline-block">
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href="#" className="inline-flex items-center space-x-1 text-[#00A0E3] hover:underline text-[13px] font-medium">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-[#EAECF0] flex items-center justify-between text-[13px] text-[#525866] bg-[#FFFFFF]">
          <div>Showing 1 to 8 of 145 results</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
