"use client";

import React from "react";
import Link from "next/link";

export default function HelpSupportPage() {
  const helpCards = [
    {
      id: 1,
      title: "Lorem ipsum",
      desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      id: 2,
      title: "Lorem ipsum",
      desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      id: 3,
      title: "Lorem ipsum",
      desc: "amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
  ];

  const supportTickets = [
    {
      id: "MS-8821",
      subject: "Climate Change Impact in Sub-Saharan Africa",
      category: "Technical Support",
      status: "In Progress",
      date: "Oct 28, 2025",
    },
    {
      id: "MS-8821",
      subject: "Climate Change Impact in Sub-Saharan Africa",
      category: "Financial",
      status: "Closed",
      date: "Oct 28, 2025",
    },
    {
      id: "MS-8821",
      subject: "Climate Change Impact in Sub-Saharan Africa",
      category: "Account",
      status: "Open",
      date: "Oct 28, 2025",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="bg-[#FFF0E6] text-[#F97316] text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            In Progress
          </span>
        );
      case "Closed":
        return (
          <span className="bg-[#E6F8EC] text-[#00A859] text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            Closed
          </span>
        );
      case "Open":
        return (
          <span className="bg-[#EFF6FF] text-[#3B82F6] text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap border border-[#DBEAFE]">
            Open
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-dm-sans  mx-auto ">
      
      {/* --- PAGE HEADER --- */}
      {/* <div className="mb-6 border-y border-[#EAECF0] px-4 pb-3">
        <h1 className="text-[28px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Help & Support
        </h1>
        <p className="text-[#78788D] text-[15px]">
          Manage your document activity and platform updates.
        </p>
      </div> */}
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">
        Help & Support
        </h1>
        <p className="text-[#78788D] text-[14px]">
        Manage your document activity and platform updates.
        </p>
      </div>
      {/* --- HELP CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 my-6">
        {helpCards.map((card) => (
          <div 
            key={card.id} 
            className="border border-[#EAECF0] rounded-[16px] bg-white overflow-hidden flex flex-col shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Dark Placeholder Image Area */}
            <div className="h-[180px] w-full bg-[#1C1C1E] shrink-0"></div>
            
            {/* Card Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[16px] font-bold text-[#171717] mb-2">
                {card.title}
              </h3>
              <p className="text-[#78788D] text-[14px] leading-relaxed mb-6 flex-1">
                {card.desc}
              </p>
              
              <button className="w-full py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- RECENT SUPPORT TICKETS --- */}
      <div className=" px-6 " >
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-[#171717] mb-1">
            Recent Support Tickets
          </h2>
          <p className="text-[#78788D] text-[14px]">
            amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </div>

        <div className=" rounded-[12px] bg-white overflow-hidden  mb-8 ">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#EFF7FB] border-b border-[#EAECF0]">
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Ticket ID</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Subject</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Category</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Status</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Date</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#171717]">Action</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((ticket, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-[#F9FAFB] transition-colors ${
                      idx !== supportTickets.length - 1 ? 'border-b border-[#EAECF0]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-[14px] text-[#525866] font-medium whitespace-nowrap">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#525866]">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#525866] whitespace-nowrap">
                      {ticket.category}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(ticket.status)}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#525866] whitespace-nowrap">
                      {ticket.date}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href="#" 
                        className="text-[#00A0E3] text-[14px] font-bold hover:underline"
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

    </div>
  );
}   