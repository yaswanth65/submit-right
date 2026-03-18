import React from 'react';
import { Search, Send, FileText } from 'lucide-react';

export default function EditorMessages() {
  const conversations = [
    {
      id: 1,
      document: "Quantum Physics Review",
      client: "Dr. Ansh Mehta",
      service: "Journal Editing",
      lastMessage: "Ansh Mehta: I've updated the methodology section....",
      time: "1h ago",
      isActive: true,
    },
    {
      id: 2,
      document: "Journal Article - Biochemistry",
      client: "Dr. Yethindra Vityala",
      service: "Proof Reading",
      lastMessage: "You: Thanks for the quick turnaround!",
      time: "Yesterday",
      isActive: false,
    },
    {
      id: 3,
      document: "Conference Paper - ML",
      client: "Dr. Krishna Priya",
      service: "Translation",
      lastMessage: "Dr. Krishna Priya: The margins have been adjusted t...",
      time: "Oct 12",
      isActive: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Ansh Mehta",
      isMe: false,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      text: "Hello Alex! I've started reviewing your citations. I noticed a few discrepancies in the APA formatting of the 2022 references. I'll flag these for you.",
      time: "Yesterday, 4:15 PM"
    },
    {
      id: 2,
      sender: "Me",
      isMe: true,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      text: "Thank you, Sarah. I was unsure about the digital sources. Let me know if you need any original files.",
      time: "Today, 9:20 AM"
    },
    {
      id: 3,
      sender: "Dr. Ansh Mehta",
      isMe: false,
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      text: "Will do! The rest of the structure looks very solid so far.",
      time: "10 mins ago"
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] w-full font-dm-sans bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-8 py-5 border-b border-[#EAECF0] flex-shrink-0 bg-[#FFFFFF]">
        <h1 className="text-[20px] font-bold text-[#171717] mb-1">Messages</h1>
        <p className="text-[13px] text-[#525866]">Chat with your clients, review feedback, and manage document updates in one place.</p>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Conversation List */}
        <div className="w-[380px] flex-shrink-0 border-r border-[#EAECF0] flex flex-col bg-[#FFFFFF]">
          <div className="p-5 border-b border-[#EAECF0] flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[13px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {conversations.map((conv) => (
              <div 
                key={conv.id} 
                className={`p-4 rounded-[12px] cursor-pointer transition-colors ${
                  conv.isActive 
                    ? "bg-[#F0F9FF] border border-[#00A0E3]" 
                    : "bg-[#F9FAFB] border border-transparent hover:bg-[#F3F4F6]"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-[14px] font-bold ${conv.isActive ? "text-[#171717]" : "text-[#171717]"}`}>
                    {conv.document}
                  </h3>
                  <span className="text-[11px] text-[#A0AAB5]">{conv.time}</span>
                </div>
                <div className="text-[12px] text-[#00A0E3] mb-2 font-medium">
                  {conv.client} <span className="text-[#A0AAB5] mx-1">•</span> {conv.service}
                </div>
                <p className={`text-[13px] truncate ${conv.isActive ? "text-[#525866]" : "text-[#A0AAB5]"}`}>
                  {conv.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Active Chat */}
        <div className="flex-1 flex flex-col bg-[#FFFFFF]">
          
          {/* Chat Header */}
          <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#E0F6FF] text-[#00A0E3] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-[#171717] mb-0.5">Quantum Physics Review</h2>
                <div className="text-[13px] text-[#A0AAB5] font-medium">
                  Dr. Ansh Mehta <span className="mx-1.5">•</span> Journal Editing
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-[#F0F9FF] border border-[#BFDBFE] text-[#00A0E3] text-[13px] font-semibold rounded-full">
              Being Edited
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start max-w-[85%] ${msg.isMe ? "ml-auto flex-row-reverse" : ""}`}>
                <img 
                  src={msg.avatar} 
                  alt={msg.sender} 
                  className={`w-10 h-10 rounded-full flex-shrink-0 object-cover ${msg.isMe ? "ml-4" : "mr-4"}`}
                />
                <div className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                  {!msg.isMe && (
                    <span className="text-[13px] font-semibold text-[#00A0E3] mb-1 pl-1">
                      {msg.sender}
                    </span>
                  )}
                  <div className={`p-4 rounded-[12px] ${
                    msg.isMe 
                      ? "bg-[#00A0E3] text-white rounded-tr-none" 
                      : "bg-[#F9FAFB] text-[#171717] text-[14px] rounded-tl-none border border-[#EAECF0]"
                  }`}>
                    <p className={`text-[14px] leading-relaxed ${msg.isMe ? "text-white" : "text-[#171717]"}`}>
                      {msg.text}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#A0AAB5] mt-1.5 px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-5 border-t border-[#EAECF0] bg-[#FFFFFF]">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="w-full pl-4 pr-14 py-3.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
              />
              <button className="absolute right-3 p-2 bg-[#00A0E3] text-white rounded-[6px] hover:bg-[#008CC7] transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
