import Link from "next/link";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";

const editors = [
  { id: 1, name: "Dr. Sarah Williams", ass: "8", completed: "423", overdue: "-", onTime: 94, availability: "Available", revision: "12%", status: "Active", avatar: "https://i.pravatar.cc/100?u=editor1" },
  { id: 2, name: "Prof. James Anderson", ass: "15", completed: "738", overdue: "4", onTime: 74, availability: "Available", revision: "38%", status: "Active", avatar: "https://i.pravatar.cc/100?u=editor2" },
  { id: 3, name: "Dr. Maria Rodriguez", ass: "5", completed: "357", overdue: "-", onTime: 96, availability: "Available", revision: "10%", status: "Active", avatar: "https://i.pravatar.cc/100?u=editor3" },
  { id: 4, name: "Dr. Robert Chen", ass: "2", completed: "536", overdue: "3", onTime: 88, availability: "Available", revision: "18%", status: "Available", avatar: "https://i.pravatar.cc/100?u=editor4" },
  { id: 5, name: "Prof. Emily Thompson", ass: "12", completed: "447", overdue: "1", onTime: 91, availability: "Vacation Mode", revision: "14%", status: "Active", avatar: "https://i.pravatar.cc/100?u=editor5" },
  { id: 6, name: "Dr. Michael Brown", ass: "-", completed: "196", overdue: "-", onTime: 64, availability: "Available", revision: "42%", status: "Restricted", avatar: "https://i.pravatar.cc/100?u=editor6" },
  { id: 7, name: "Dr. Jennifer Lee", ass: "10", completed: "130", overdue: "-", onTime: 85, availability: "Available", revision: "13%", status: "Active", avatar: "https://i.pravatar.cc/100?u=editor7" },
  { id: 8, name: "Prof. David Kumar", ass: "7", completed: "453", overdue: "6", onTime: 76, availability: "Unavailable", revision: "26%", status: "Suspended", avatar: "https://i.pravatar.cc/100?u=editor8" },
  { id: 9, name: "Dr. Rachel Foster", ass: "2", completed: "994", overdue: "5", onTime: 61, availability: "Available", revision: "45%", status: "Available", avatar: "https://i.pravatar.cc/100?u=editor9" },
  { id: 10, name: "Prof. Mark Stevens", ass: "3", completed: "703", overdue: "-", onTime: 95, availability: "Available", revision: "16%", status: "Available", avatar: "https://i.pravatar.cc/100?u=editor10" },
];

function toneForRate(rate: number) {
  if (rate >= 85) return "#1CB061";
  if (rate >= 70) return "#FA7319";
  return "#FB3748";
}

function pillClass(value: string) {
  if (value === "Available" || value === "Active") return "bg-[#E3F7EC] text-[#1CB061]";
  if (value === "Vacation Mode") return "bg-[#EBF8FD] text-[#3B82F6]";
  if (value === "Unavailable" || value === "Suspended") return "bg-[#FEF2F2] text-[#FB3748]";
  if (value === "Restricted") return "bg-[#FFF4ED] text-[#FA7319]";
  return "bg-[#F1F5F9] text-[#64748B]";
}

export default function EditorsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1140px] font-dm-sans">
      <div className="mt-2 pb-3 border-b border-[#EAECF0]">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Editors</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage editor performance and workload distribution.</p>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[280px]">
            <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AAB5]" strokeWidth={2.25} />
            <input
              placeholder="Search"
              className="h-[42px] w-full pl-10 pr-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>
          <button className="h-[42px] px-4 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#525866] font-semibold inline-flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors">
            <SlidersHorizontal className="w-[16px] h-[16px]" />
            Filter
          </button>
        </div>

        <div className="border border-[#EAECF0] rounded-[10px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Editor Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Active Ass.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Completed Docs.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Overdue Tasks</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">On-Time Deliver</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Revision</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {editors.map((editor) => {
                const rateColor = toneForRate(editor.onTime);
                return (
                  <tr key={editor.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3 px-4">
                      <Link href={`/admin/editors/${editor.id}`} className="flex items-center gap-3">
                        <img src={editor.avatar} alt={editor.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="text-[14px] font-bold text-[#171717] leading-tight">{editor.name}</div>
                          <div className="text-[12px] text-[#525866] mt-1">eaxmple@gmail.com</div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">{editor.ass}</td>
                    <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">{editor.completed}</td>
                    <td className={`py-3 px-4 text-[14px] font-medium ${editor.overdue === "-" ? "text-[#525866]" : "text-[#FB3748]"}`}>{editor.overdue}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[74px] h-[8px] rounded-full bg-[#EAEFF4] overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${editor.onTime}%`, backgroundColor: rateColor }}></div>
                        </div>
                        <span className="text-[14px] font-medium" style={{ color: rateColor }}>{editor.onTime}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-[4px] rounded-full text-[11px] font-bold inline-flex ${pillClass(editor.availability)}`}>
                        {editor.availability}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-[14px] font-medium ${Number.parseInt(editor.revision, 10) >= 25 ? "text-[#FB3748]" : "text-[#525866]"}`}>
                      {editor.revision}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-[4px] rounded-full text-[11px] font-bold inline-flex ${pillClass(editor.status)}`}>
                        {editor.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-[#171717] hover:bg-[#F3F4F6] rounded p-1.5 transition-colors">
                        <MoreVertical className="w-[20px] h-[20px]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
