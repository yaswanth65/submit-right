import Link from "next/link";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";

const students = [
  { id: 1, name: "Sarah Johnson", date: "Feb 28, 2026", active: "2", completed: "12", spend: "$4,250", status: "Active", avatar: "https://i.pravatar.cc/100?u=student1" },
  { id: 2, name: "Michael Chen", date: "Feb 24, 2026", active: "1", completed: "8", spend: "$3,100", status: "Active", avatar: "https://i.pravatar.cc/100?u=student2" },
  { id: 3, name: "Emily Davis", date: "Mar 02, 2026", active: "3", completed: "24", spend: "$8,700", status: "Active", avatar: "https://i.pravatar.cc/100?u=student3" },
  { id: 4, name: "James Wilson", date: "Mar 05, 2026", active: "1", completed: "12", spend: "$850", status: "Restricted", avatar: "https://i.pravatar.cc/100?u=student4" },
  { id: 5, name: "Lisa Martinez", date: "Mar 10, 2026", active: "4", completed: "3", spend: "$12,400", status: "Active", avatar: "https://i.pravatar.cc/100?u=student5" },
  { id: 6, name: "David Brown", date: "Feb 23, 2026", active: "2", completed: "4", spend: "$1,950", status: "Suspended", avatar: "https://i.pravatar.cc/100?u=student6" },
  { id: 7, name: "Anna Garcia", date: "Mar 08, 2026", active: "6", completed: "9", spend: "$5,600", status: "Active", avatar: "https://i.pravatar.cc/100?u=student7" },
  { id: 8, name: "Tom Anderson", date: "Feb 26, 2026", active: "3", completed: "6", spend: "$7,200", status: "Active", avatar: "https://i.pravatar.cc/100?u=student8" },
];

function statusPill(status: string) {
  if (status === "Active") return "bg-[#E3F7EC] text-[#1CB061]";
  if (status === "Restricted") return "bg-[#FFF4ED] text-[#FA7319]";
  if (status === "Suspended") return "bg-[#FEF2F2] text-[#FB3748]";
  return "bg-[#F1F5F9] text-[#64748B]";
}

export default function StudentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1140px] font-dm-sans">
      <div className="mt-2">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Students</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage registered students and account activity.</p>
      </div>

      <div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-5 shadow-sm">
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
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">User Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Registration Date</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Active Docs.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Completed Docs.</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Total Spend</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Account Status</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/admin/students/${student.id}`} className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="text-[14px] font-bold text-[#171717] leading-tight">{student.name}</div>
                        <div className="text-[12px] text-[#525866] mt-1">eaxmple@gmail.com</div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">{student.date}</td>
                  <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">{student.active}</td>
                  <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">{student.completed}</td>
                  <td className="py-3 px-4 text-[14px] font-medium text-[#525866]">{student.spend}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-[4px] rounded-full text-[11px] font-bold inline-flex ${statusPill(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-[#171717] hover:bg-[#F3F4F6] rounded p-1.5 transition-colors">
                      <MoreVertical className="w-[18px] h-[18px]" />
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
