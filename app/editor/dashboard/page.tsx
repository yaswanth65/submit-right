import React from 'react';
import { FileText, FileEdit, CheckSquare, AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function EditorDashboard() {
  const stats = [
    { title: "Active Assignments", value: "12", icon: FileText, iconColor: "text-[#00A0E3]", iconBg: "bg-[#E0F6FF]" },
    { title: "Pending Revisions", value: "3", icon: FileEdit, iconColor: "text-[#FA7319]", iconBg: "bg-[#FFF4ED]" },
    { title: "Due Today", value: "3", icon: FileEdit, iconColor: "text-[#FA7319]", iconBg: "bg-[#FFF4ED]" },
    { title: "Completed", value: "12", icon: CheckSquare, iconColor: "text-[#1CB061]", iconBg: "bg-[#E0F2E9]" },
  ];

  const assignedDocs = [
    { id: 1, name: "Case Study - Business...", client: "Dr. Ansh Mehta", words: "4,800", deadline: "Feb 20, 03:00 PM", isUrgent: true, status: "In Progress", statusColor: "text-[#00A0E3] bg-[#E0F6FF] border-[#00A0E3]" },
    { id: 2, name: "Research Paper - Cli...", client: "Dr. John Smith", words: "4,200", deadline: "Feb 20, 03:00 PM", isUrgent: true, status: "In Progress", statusColor: "text-[#00A0E3] bg-[#E0F6FF] border-[#00A0E3]" },
    { id: 3, name: "Thesis Chapter 3 - M...", client: "Dr. Ansh Mehta", words: "7,800", deadline: "Feb 20, 03:00 PM", isWarning: true, status: "Revision Requested", statusColor: "text-[#FA7319] bg-[#FFF4ED] border-[#FA7319]" },
    { id: 4, name: "Journal Article", client: "Dr. Ansh Mehta", words: "6,500", deadline: "Feb 20, 03:00 PM", isWarning: true, status: "In Progress", statusColor: "text-[#00A0E3] bg-[#E0F6FF] border-[#00A0E3]" },
    { id: 5, name: "Dissertation Abstract", client: "Dr. Ansh Mehta", words: "2,100", deadline: "Feb 23, 02:00 PM", status: "Waiting for Approval", statusColor: "text-[#8B5CF6] bg-[#F3E8FF] border-[#8B5CF6]" },
    { id: 6, name: "Conference Paper - A...", client: "Dr. Ansh Mehta", words: "5,300", deadline: "Feb 24, 02:00 PM", status: "Completed", statusColor: "text-[#1CB061] bg-[#E0F2E9] border-[#1CB061]" },
    { id: 7, name: "Literature Review", client: "Dr. Ansh Mehta", words: "8,900", deadline: "Feb 25, 10:00 AM", status: "In Progress", statusColor: "text-[#00A0E3] bg-[#E0F6FF] border-[#00A0E3]" },
    { id: 8, name: "Technical Report - En...", client: "Dr. Ansh Mehta", words: "8,900", deadline: "Feb 26, 04:30 PM", status: "Revision Requested", statusColor: "text-[#FA7319] bg-[#FFF4ED] border-[#FA7319]" },
    { id: 9, name: "Conference Paper - A...", client: "Dr. Ansh Mehta", words: "5,300", deadline: "Feb 24, 02:00 PM", status: "Completed", statusColor: "text-[#1CB061] bg-[#E0F2E9] border-[#1CB061]" },
  ];

  const dueSoon = [
    { title: "Research Paper - Climate Change Analy...", service: "Translation (EN -> ES)", time: "Today, 6:00 PM", isUrgent: true },
    { title: "Thesis Chapter 3 - Methodology", service: "Academic Editing", time: "Today, 11:59 PM", isUrgent: true },
    { title: "Journal Article - Medical Sciences", service: "Proofreading", time: "Tomorrow, 9:00 AM", isUrgent: false },
  ];

  const recentActivity = [
    { title: "You were assigned a new document.", time: "2 minutes ago", dotColor: "bg-[#00A0E3]" },
    { title: "Client requested revision on \"Research Paper - Climat...", time: "1 hour ago", dotColor: "bg-[#1CB061]" },
    { title: "Document marked as completed: \"Thesis Introductio...", time: "3 hours ago", dotColor: "bg-[#E5E7EB]" },
    { title: "New message from Dr. Maria Rodriguez.", time: "5 hours ago", dotColor: "bg-[#00A0E3]" },
    { title: "Document Uploaded", time: "Yesterday", dotColor: "bg-[#00A0E3]" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full font-dm-sans">
      
      {/* Header */}
      <div>
        <div className="text-[24px] font-bold text-[#171717] mb-1">Dashboard</div>
        <div className="text-[14px] text-[#525866]">Overview of your assigned work.</div>
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

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Assigned Documents */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#171717]">Assigned Documents</h2>
            <Link href="#" className="text-[14px] font-semibold text-[#00A0E3] hover:underline">View All</Link>
          </div>
          
          <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[640px] lg:min-w-0">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Document Name</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Client</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Word Count</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Deadline</th>
                    <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {assignedDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-4 px-6 max-w-[260px]">
                        <div className="flex items-center space-x-3 cursor-pointer group">
                          <FileText className="w-4 h-4 text-[#A0AAB5] group-hover:text-[#525866] transition-colors" />
                          <span className="text-[13px] font-medium text-[#171717] group-hover:underline truncate">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.client}</td>
                      <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.words}</td>
                      <td className="py-4 px-6 text-[13px]">
                        {doc.isUrgent ? (
                          <div className="inline-flex items-center px-2 py-1 rounded-[6px] border border-[#FA7319] bg-[#FFF4ED] text-[#FA7319] whitespace-nowrap">
                            {doc.id <= 2 && <AlertTriangle className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />}
                            {doc.deadline}
                          </div>
                        ) : doc.isWarning ? (
                          <div className="inline-flex items-center px-2 py-1 rounded-[6px] border border-[#FBBF24] bg-white text-[#FBBF24] whitespace-nowrap">
                            {doc.deadline}
                          </div>
                        ) : (
                          <span className="text-[#525866]">{doc.deadline}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block whitespace-nowrap ${doc.statusColor.replace('bg-', 'bg-opacity-20 bg-')}`}>
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Due Soon & Recent Activity */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Due Soon */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-4">Due Soon</h2>
            <div className="space-y-4">
              {dueSoon.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-[12px] flex items-center justify-between cursor-pointer border shadow-sm transition-transform hover:translate-x-1 ${item.isUrgent ? 'bg-[#FEF2F2] border-[#FECACA]' : 'bg-[#FFFFFF] border-[#EAECF0]'}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5 ${item.isUrgent ? 'text-[#EF4444]' : 'text-[#A0AAB5]'}`}>
                      <FileText className="w-5 h-5" fill="currentColor" strokeWidth={0} />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#171717] mb-1">{item.title}</div>
                      <div className="flex items-center text-[11px] text-[#525866]">
                        <span>{item.service}</span>
                        <span className="mx-1.5 text-[#D1D5DB]">|</span>
                        <Clock className={`w-3.5 h-3.5 mr-1 ${item.isUrgent ? 'text-[#EF4444]' : 'text-[#A0AAB5]'}`} />
                        <span className={item.isUrgent ? 'text-[#EF4444] font-medium' : ''}>{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#A0AAB5] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-[18px] font-bold text-[#171717] mb-4">Recent Activity</h2>
            <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-[19px] before:w-px md:before:mx-auto md:before:translate-x-0 before:h-full before:bg-[#EAECF0]">
              <div className="absolute top-2 bottom-2 left-[3.5px] w-px bg-[#EAECF0]" />
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="relative z-10 flex items-start">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 outline outline-[4px] outline-white ${activity.dotColor}`} />
                  <div className="ml-4">
                    <div className="text-[13px] font-semibold text-[#171717] leading-relaxed">{activity.title}</div>
                    <div className="text-[11px] text-[#A0AAB5] mt-0.5">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
