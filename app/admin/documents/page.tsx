import Link from "next/link";
import { Search, SlidersHorizontal, MoreVertical, FileText } from "lucide-react";

const rows = [
  { id: 1, name: "Case Study - Business...", student: "Sarah Johnson", editor: "Dr. Williams", type: "Editing", words: "5,200", deadline: "Feb 28, 2026", status: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" },
  { id: 2, name: "Research Paper - Clima...", student: "Michael Chen", editor: "Prof. Anderson", type: "Proofreading", words: "8,400", deadline: "Feb 24, 2026", status: "Overdue", style: "bg-[#FEF2F2] text-[#FB3748]" },
  { id: 3, name: "Thesis Chapter 3 - Met...", student: "Emily Davis", editor: "Dr. Rodriguez", type: "Editing", words: "3,800", deadline: "Mar 02, 2026", status: "Revision Shared", style: "bg-[#EBF8FD] text-[#00A0E3]" },
  { id: 4, name: "Journal Article", student: "James Wilson", editor: "Unassigned", type: "Formatting", words: "2,100", deadline: "Mar 05, 2026", status: "Submitted", style: "bg-[#F3E8FF] text-[#9333EA]" },
  { id: 5, name: "Dissertation Abstract", student: "Lisa Martinez", editor: "Dr. Chen", type: "Rewriting", words: "12,000", deadline: "Mar 10, 2026", status: "In Progress", style: "bg-[#EBF8FD] text-[#00A0E3]" },
  { id: 6, name: "Conference Paper - AI i...", student: "Lisa Martinez", editor: "Prof. Thompson", type: "Proofreading", words: "4,500", deadline: "Feb 23, 2026", status: "Overdue", style: "bg-[#FEF2F2] text-[#FB3748]" },
  { id: 7, name: "Literature Review", student: "Lisa Martinez", editor: "Dr. Williams", type: "Editing", words: "6,700", deadline: "Mar 08, 2026", status: "Revision Requested", style: "bg-[#FFF4ED] text-[#FA7319]" },
  { id: 8, name: "Technical Report - Engi...", student: "Lisa Martinez", editor: "Dr. Brown", type: "Editing", words: "5,100", deadline: "Feb 26, 2026", status: "Completed", style: "bg-[#E3F7EC] text-[#1CB061]" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="mt-2">
        <div className="text-[30px] font-bold text-[#171717] leading-tight">Documents</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage and monitor all platform documents.</p>
      </div>

  <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      <div className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm px-4 py-4">
        <div className="grid grid-cols-4">
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Total Active</div><div className="text-[26px] font-bold text-[#171717] mt-1">124</div></div>
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Overdue Tasks</div><div className="text-[26px] font-bold text-[#FB3748] mt-1">8</div></div>
          <div className="px-3 border-r border-[#EAECF0]"><div className="text-[13px] text-[#525866]">Pending Revisions</div><div className="text-[26px] font-bold text-[#171717] mt-1">42</div></div>
          <div className="px-3"><div className="text-[13px] text-[#525866]">Avg. Time</div><div className="text-[26px] font-bold text-[#171717] mt-1">2.4 Days</div></div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[280px]">
            <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AAB5]" strokeWidth={2.25} />
            <input placeholder="Search" className="h-[42px] w-full pl-10 pr-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]" />
          </div>
          <button className="h-[42px] px-4 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#525866] font-semibold inline-flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors">
            <SlidersHorizontal className="w-[16px] h-[16px]" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="min-w-[1200px] w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Document Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Student Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Assigned Editor</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Service Type</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Word Count</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Deadline</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability Status</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/admin/documents/${row.id}`} className="flex items-center space-x-2.5">
                      <FileText className="w-[14px] h-[14px] text-[#525866]" strokeWidth={2.5} />
                      <span className="font-medium text-[13px] text-[#525866]">{row.name}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{row.student}</td>
                  <td className={`py-3 px-4 text-[13px] ${row.editor === "Unassigned" ? "text-[#FB3748] font-bold" : "text-[#525866]"}`}>{row.editor}</td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{row.type}</td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{row.words}</td>
                  <td className="py-3 px-4 text-[13px] text-[#525866]">{row.deadline}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-[3px] rounded-full text-[11px] font-bold inline-flex ${row.style}`}>{row.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-[#171717] hover:bg-[#F3F4F6] rounded p-1.5 transition-colors"><MoreVertical className="w-[18px] h-[18px]" /></button>
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
