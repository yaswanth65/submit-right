"use client";

import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Clock, 
  AlertTriangle, 
  ArrowLeft,
  History,
  Calendar,
  UploadCloud,
  Send,
  Download,
  X
} from 'lucide-react';

export default function AssignedPage() {
  const [selectedView, setSelectedView] = useState<"list" | "detail">("list");
  const [showExtensionModal, setShowExtensionModal] = useState(false);

  // Table Data
  const documents = [
    { id: 1, name: "Case Study - Business Adminstration", client: "Dr. Ansh Mehta", type: "Academic Editing", words: "4,800", deadline: "Feb 20, 03:00 PM", deadlineColor: "text-red-500 bg-red-50 border-red-200", status: "In Progress", statusColor: "text-blue-500 bg-blue-50" },
    { id: 2, name: "Research Paper - Climate Change", client: "Dr. John Smith", type: "Translation (EN → ES)", words: "4,200", deadline: "Feb 20, 03:00 PM", deadlineColor: "text-red-500 bg-red-50 border-red-200", status: "In Progress", statusColor: "text-blue-500 bg-blue-50" },
    { id: 3, name: "Thesis Chapter 3 - Methodology", client: "Dr. Ansh Mehta", type: "Academic Editing", words: "7,800", deadline: "Feb 20, 03:00 PM", deadlineColor: "text-yellow-600 bg-yellow-50 border-yellow-200", status: "Revision Requested", statusColor: "text-orange-500 bg-orange-50" },
    { id: 4, name: "Journal Article", client: "Dr. Ansh Mehta", type: "Proof Reading", words: "6,500", deadline: "Feb 20, 03:00 PM", deadlineColor: "text-yellow-600 bg-yellow-50 border-yellow-200", status: "In Progress", statusColor: "text-blue-500 bg-blue-50" },
    { id: 5, name: "Dissertation Abstract", client: "Dr. Ansh Mehta", type: "Academic Editing", words: "2,100", deadline: "Feb 23, 02:00 PM", deadlineColor: "text-gray-500", status: "Waiting for Approval", statusColor: "text-purple-500 bg-purple-50" },
    { id: 6, name: "Conference Paper - AI in Healthcare", client: "Dr. Ansh Mehta", type: "Translation (EN → ES)", words: "5,300", deadline: "Feb 24, 02:00 PM", deadlineColor: "text-gray-500", status: "Completed", statusColor: "text-green-500 bg-green-50" },
    { id: 7, name: "Literature Review", client: "Dr. Ansh Mehta", type: "Translation (EN → ES)", words: "8,900", deadline: "Feb 25, 10:00 AM", deadlineColor: "text-gray-500", status: "In Progress", statusColor: "text-blue-500 bg-blue-50" },
    { id: 8, name: "Technical Report - Engineering", client: "Dr. Ansh Mehta", type: "Translation (EN → ES)", words: "8,900", deadline: "Feb 26, 04:30 PM", deadlineColor: "text-gray-500", status: "Revision Requested", statusColor: "text-orange-500 bg-orange-50" },
    { id: 9, name: "Book Chapter - History", client: "Dr. Ansh Mehta", type: "Translation (EN → ES)", words: "8,900", deadline: "Mar 2, 09:00 AM", deadlineColor: "text-gray-500", status: "Completed", statusColor: "text-green-500 bg-green-50" },
  ];

  if (selectedView === "list") {
    return (
      <div className="w-full animate-in fade-in duration-300">
        <div className="mb-8">
          <h1 className="text-[24px] font-bold text-[#171717] mb-1">Assigned Documents</h1>
          <p className="text-[14px] text-[#525866]">Manage your active academic editing tasks and deadlines.</p>
        </div>

        <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAECF0]">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
              <input 
                type="text" 
                placeholder="Search by document name..." 
                className="w-full pl-9 pr-4 py-2 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A0E3]/20 focus:border-[#00A0E3] transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none pl-4 pr-10 py-2 text-[13px] font-medium border border-[#EAECF0] rounded-[8px] bg-white text-[#171717] focus:outline-none cursor-pointer">
                  <option>All</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none pl-4 pr-10 py-2 text-[13px] font-medium border border-[#EAECF0] rounded-[8px] bg-white text-[#171717] focus:outline-none cursor-pointer">
                  <option>Latest updated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525866] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] table-fixed min-w-[760px] lg:min-w-0">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#EAECF0] text-[#525866] font-medium">
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Service Type</th>
                  <th className="px-6 py-4">Word Count</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0]">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#171717]">
                      <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#A0AAB5]" />
                      <span className="truncate">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#525866]">{doc.client}</td>
                    <td className="px-6 py-4 text-[#525866]">{doc.type}</td>
                    <td className="px-6 py-4 text-[#525866]">{doc.words}</td>
                    <td className="px-6 py-4">
                      {doc.deadlineColor.includes('border') ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border whitespace-nowrap ${doc.deadlineColor}`}>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {doc.deadline}
                        </span>
                      ) : (
                        <span className="text-[#525866]">{doc.deadline}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${doc.statusColor}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedView("detail")}
                        className="px-4 py-1.5 bg-[#00A0E3] hover:bg-[#008cc2] text-white rounded-[6px] text-[13px] font-medium transition-colors"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex items-center justify-between border-t border-[#EAECF0] text-[13px] text-[#525866]">
            <div>Showing <span className="font-semibold text-[#171717]">6</span> of <span className="font-semibold text-[#171717]">12</span> documents</div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] text-[#A0AAB5]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#00A0E3] bg-[#00A0E3] text-white rounded-[6px] font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] text-[#171717] font-medium">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] text-[#525866]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Details View
  return (
    <div className="w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4">
        <button 
          onClick={() => setSelectedView("list")}
          className="flex items-center gap-2 text-[#00A0E3] hover:text-[#008cc2] font-medium text-[14px] self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#171717] mb-1">Research Paper - Climate Change Analysis</h1>
            <p className="text-[14px] text-[#525866]">Dr. Maria Rodriguez - Journal Editing</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-500 rounded-full text-[13px] font-medium">
              In Progress
            </span>
            <button className="flex items-center gap-2 px-4 py-2 text-[#00A0E3] font-medium text-[13px] hover:bg-blue-50 rounded-[8px] transition-colors">
              <History className="w-4 h-4" /> Version History
            </button>
            <button 
              onClick={() => setShowExtensionModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#EAECF0] text-[#171717] font-medium text-[13px] hover:bg-[#F9FAFB] rounded-[8px] transition-colors"
            >
              <Calendar className="w-4 h-4" /> Extend Deadline
            </button>
          </div>
        </div>
      </div>

      {/* Deadline Alert */}
      <div className="mb-6 bg-red-50/50 border border-red-100 rounded-[12px] p-4 flex items-center gap-3 text-red-500 text-[14px] font-medium">
        <Clock className="w-4 h-4" />
        Deadline: February 21, 2026, 6:00 PM
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Overview Card */}
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm p-6">
            <h2 className="text-[16px] font-bold text-[#171717] mb-6">Assignment Overview</h2>
            
            <div className="grid grid-cols-2 gap-y-6 mb-6">
              <div>
                <div className="text-[13px] text-[#525866] mb-1">Word Count</div>
                <div className="text-[14px] font-medium text-[#171717]">4,200 words</div>
              </div>
              <div>
                <div className="text-[13px] text-[#525866] mb-1">Service Type</div>
                <div className="text-[14px] font-medium text-[#171717]">Journal Article</div>
              </div>
              <div>
                <div className="text-[13px] text-[#525866] mb-1">Submission Date</div>
                <div className="text-[14px] font-medium text-[#171717]">February 18, 2026</div>
              </div>
              <div>
                <div className="text-[13px] text-[#525866] mb-1">Deadline</div>
                <div className="text-[14px] font-medium text-[#171717]">February 21, 2026, 6:00 PM</div>
              </div>
            </div>

            <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-4">
              <div className="text-[13px] font-medium text-[#171717] mb-1">Special Instructions</div>
              <p className="text-[13px] text-[#525866] italic leading-relaxed">
                Please ensure all citations follow APA 7th edition guidelines and check for technical consistency in the results section. The author is particularly concerned about the transition between the methodology and results chapters.
              </p>
            </div>
          </div>

          {/* Submit Revision */}
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm p-6">
            <h2 className="text-[16px] font-bold text-[#171717] mb-4">Submit Final Revision</h2>
            
            <div className="border border-dashed border-[#EAECF0] bg-[#F9FAFB] rounded-[12px] p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer mb-4">
              <div className="w-10 h-10 bg-white shadow-sm border border-[#EAECF0] rounded-[8px] flex items-center justify-center mb-3">
                <UploadCloud className="w-5 h-5 text-[#525866]" />
              </div>
              <div className="text-[14px] font-medium text-[#171717] mb-1">
                Drag and drop your document here or click to <span className="text-[#00A0E3]">browse files</span>
              </div>
              <div className="text-[13px] text-[#525866]">
                Supported formats: DOC, DOCX, PDF. Maximum file size: 25MB
              </div>
            </div>

            <button className="w-full py-3 bg-[#00A0E3]/50 text-white font-medium rounded-[8px] text-[14px] cursor-not-allowed">
              Submit Revision
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Original File */}
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm p-6">
            <h2 className="text-[16px] font-bold text-[#171717] mb-4">Original File</h2>
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-[6px] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#171717]">AI_Research_Paper_Final.docx</div>
                  <div className="text-[12px] text-[#A0AAB5]">1.4 MB</div>
                </div>
              </div>
              <button className="text-[#00A0E3] p-1.5 hover:bg-blue-50 rounded-md transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white border border-[#EAECF0] rounded-[12px] shadow-sm flex flex-col h-[500px]">
            <div className="p-4 border-b border-[#EAECF0]">
              <h2 className="text-[16px] font-bold text-[#171717]">Messages</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* User message */}
              <div className="flex gap-3">
                <img src="https://i.pravatar.cc/150?u=student" alt="Avatar" className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                <div>
                  <div className="text-[13px] font-medium text-[#00A0E3] mb-1">Student Sarah</div>
                  <div className="bg-[#F9FAFB] border border-[#EAECF0] text-[#171717] text-[13px] p-3 rounded-b-[12px] rounded-tr-[12px]">
                    Hello Alex! I've started reviewing your citations. I noticed a few discrepancies in the APA formatting of the 2022 references. I'll flag these for you.
                  </div>
                  <div className="text-[11px] text-[#A0AAB5] mt-1">Yesterday, 4:15 PM</div>
                </div>
              </div>

              {/* My message */}
              <div className="flex justify-end gap-3 max-w-[90%] self-end">
                <div className="text-right">
                  <div className="bg-[#00A0E3] text-white text-[13px] p-3 rounded-t-[12px] rounded-bl-[12px] text-left">
                    Thank you, Sarah. I was unsure about the digital sources. Let me know if you need any original files.
                  </div>
                  <div className="text-[11px] text-[#A0AAB5] mt-1 text-right">Today, 9:20 AM</div>
                </div>
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="My Avatar" className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
              </div>

              {/* User message 2 */}
              <div className="flex gap-3">
                <img src="https://i.pravatar.cc/150?u=student" alt="Avatar" className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                <div>
                  <div className="text-[13px] font-medium text-[#00A0E3] mb-1">Student Sarah</div>
                  <div className="bg-[#F9FAFB] border border-[#EAECF0] text-[#171717] text-[13px] p-3 rounded-b-[12px] rounded-tr-[12px]">
                    Will do! The rest of the structure looks very solid so far.
                  </div>
                  <div className="text-[11px] text-[#A0AAB5] mt-1">10 mins ago</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#EAECF0]">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="w-full pl-4 pr-12 py-2.5 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:border-[#00A0E3]"
                />
                <button className="absolute right-2 w-8 h-8 bg-[#00A0E3] rounded-[6px] flex items-center justify-center text-white hover:bg-[#008cc2] transition-colors">
                  <Send className="w-4 h-4 -ml-0.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Extension Modal Overlay */}
      {showExtensionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-[#171717]">Request Deadline Extension</h3>
                <p className="text-[13px] text-[#525866] mt-1">Submit a formal request to the administrator.</p>
              </div>
              <button 
                onClick={() => setShowExtensionModal(false)}
                className="text-[#525866] hover:bg-[#F9FAFB] p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-4 flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EAECF0] flex items-center justify-center shadow-sm">
                  <Clock className="w-4 h-4 text-[#525866]" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#171717]">Current Deadline</div>
                  <div className="text-[13px] font-semibold text-[#171717] mt-0.5">Jan 24, 2026, 05:00 PM</div>
                  <div className="text-[12px] font-medium text-orange-500 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Time Remaining: 4 hours
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#171717] mb-1.5">Proposed New Deadline</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      className="w-full px-4 py-2.5 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:border-[#00A0E3] bg-white"
                      defaultValue="2026-03-01"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-[#171717] mb-1.5">Reason for Extension</label>
                  <textarea 
                    placeholder="Please provide a brief explanation for this request."
                    className="w-full px-4 py-2.5 text-[13px] border border-[#EAECF0] rounded-[8px] focus:outline-none focus:border-[#00A0E3] min-h-[100px] resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#EAECF0] flex items-center justify-between bg-[#F9FAFB]">
              <button 
                onClick={() => setShowExtensionModal(false)}
                className="px-4 py-2 bg-white border border-[#EAECF0] text-[#171717] text-[14px] font-medium rounded-[8px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowExtensionModal(false)}
                className="px-4 py-2 bg-[#00A0E3] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#008cc2] transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}