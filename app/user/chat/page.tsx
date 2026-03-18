"use client";

import React from "react";
import { Search, FileText, Send } from "lucide-react";

export default function MessagesPage() {
  const threads = [
    {
      id: 1,
      title: "Economics Thesis",
      type: "Journal Editing",
      snippet: "Editor: I've updated the methodology section. Pleas...",
      time: "1h ago",
      active: true,
    },
    {
      id: 2,
      title: "History Essay Final",
      type: "Proofreading",
      snippet: "You: Thanks for the quick turnaround!",
      time: "Yesterday",
      active: false,
    },
    {
      id: 3,
      title: "Sociology Report",
      type: "Translation",
      snippet: "Editor: The margins have been adjusted to MLA...",
      time: "Oct 12",
      active: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "editor",
      name: "Editor Sarah",
      avatar: "https://i.pravatar.cc/150?u=sarah2",
      text: "Hello Alex! I've started reviewing your citations. I noticed a few discrepancies in the APA formatting of the 2022 references. I'll flag these for you.",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: 2,
      sender: "user",
      name: "You",
      avatar: "https://i.pravatar.cc/150?u=alex2",
      text: "Thank you, Sarah. I was unsure about the digital sources. Let me know if you need any original files.",
      time: "Today, 9:20 AM",
    },
    {
      id: 3,
      sender: "editor",
      name: "Editor Sarah",
      avatar: "https://i.pravatar.cc/150?u=sarah2",
      text: "Will do! The rest of the structure looks very solid so far.",
      time: "10 mins ago",
    },
  ];

  return (
    <div className="w-full h-[calc(100vh-76px)] flex flex-col font-dm-sans bg-white">
      
      {/* --- PAGE HEADER --- */}
      <div className="px-6 lg:px-8 py-3 border-b border-[#EAECF0] shrink-0">
        <h1 className="text-[28px] font-bold text-[#171717] mb-1.5 tracking-tight">
          Messages
        </h1>
        <p className="text-[#8A94A6] text-[15px]">
          Chat with your editor, review feedback, and manage document updates in one place.
        </p>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        
        {/* LEFT SIDEBAR: Threads */}
        <div className="w-full lg:w-[380px] border-r border-[#EAECF0] flex flex-col shrink-0">
          <div className="p-6 lg:p-8 lg:pb-5 border-b lg:border-none border-[#EAECF0]">
            <h2 className="text-[20px] font-bold text-[#171717] mb-5">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A0AAB5]" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-[40px] pr-4 py-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 lg:px-8 pb-8 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {threads.map((thread) => (
              <div 
                key={thread.id}
                className={`p-4 rounded-[12px] border cursor-pointer transition-all duration-200 ${
                  thread.active 
                    ? "border-[#00A0E3] bg-[#F4FAFD] shadow-[0_2px_8px_rgba(0,160,227,0.12)]" 
                    : "border-[#EAECF0] bg-white hover:border-[#A0AAB5] hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[15px] font-bold text-[#171717] truncate pr-2">
                    {thread.title}
                  </h4>
                  <span className="text-[12px] text-[#A0AAB5] shrink-0 mt-0.5 font-medium">
                    {thread.time}
                  </span>
                </div>
                <p className="text-[#00A0E3] text-[13px] font-medium mb-2">
                  {thread.type}
                </p>
                <p className="text-[#8A94A6] text-[13px] truncate">
                  {thread.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT AREA: Active Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Chat Header */}
          <div className="h-[96px] px-6 lg:px-8 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] bg-[#EAF6FB] rounded-[12px] flex items-center justify-center shrink-0">
                <FileText className="w-[24px] h-[24px] text-[#00A0E3]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#171717] mb-1">{threads[0].title}</h3>
                <p className="text-[14px] text-[#8A94A6] font-medium">Service: {threads[0].type}</p>
              </div>
            </div>
            <span className="bg-[#EFF6FF] text-[#00A0E3] text-[14px] font-bold px-4 py-2 rounded-full border border-[#DBEAFE]">
              Being Edited
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 flex flex-col bg-white">
            {messages.map((msg) => {
              const isEditor = msg.sender === "editor";
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-4 max-w-[85%] lg:max-w-[75%] ${isEditor ? "self-start" : "self-end flex-row-reverse"}`}
                >
                  <img 
                    src={msg.avatar} 
                    alt={msg.name} 
                    className="w-[36px] h-[36px] rounded-full shrink-0 object-cover mt-1 border border-[#EAECF0]" 
                  />
                  <div className={`flex flex-col ${isEditor ? "items-start" : "items-end"}`}>
                    {isEditor && (
                      <span className="text-[14px] font-bold text-[#00A0E3] mb-2 ml-1">
                        {msg.name}
                      </span>
                    )}
                    
                    <div 
                      className={`p-4 text-[14px] leading-relaxed shadow-sm ${
                        isEditor 
                          ? "bg-[#F9FAFB] border border-[#EAECF0] text-[#171717] rounded-b-[16px] rounded-tr-[16px]" 
                          : "bg-[#00A0E3] text-white rounded-b-[16px] rounded-tl-[16px]"
                      }`}
                    >
                      {msg.text}
                    </div>
                    
                    <span className={`text-[12px] text-[#A0AAB5] mt-2 font-medium ${isEditor ? "ml-1" : "mr-1"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <div className="px-6 lg:px-8 py-5 border-t border-[#EAECF0] shrink-0 bg-white">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 border border-[#EAECF0] rounded-[8px] px-5 py-3.5 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] transition-colors"
              />
              <button className="w-[50px] h-[50px] bg-[#00A0E3] rounded-[8px] flex items-center justify-center shrink-0 hover:bg-[#008bc5] transition-colors shadow-sm">
                <Send className="w-[20px] h-[20px] text-white ml-0.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}