"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Search, Send, FileText } from 'lucide-react';
import { apiGet } from '@/lib/client-api';

type EditorMessage = {
  id: string;
  document_id?: string;
  sender_id?: string;
  receiver_id?: string;
  message?: string;
  created_at?: string;
};

type EditorDocument = {
  id: string;
  document_title?: string;
  status?: string;
  services?: { title?: string } | Array<{ title?: string }> | null;
  profiles?: { full_name?: string; email?: string } | Array<{ full_name?: string; email?: string }> | null;
};

function readService(services?: EditorDocument['services']) {
  if (!services) return 'Service';
  if (Array.isArray(services)) return services[0]?.title || 'Service';
  return services.title || 'Service';
}

function readProfile(profile?: EditorDocument['profiles']) {
  if (!profile) return { name: 'Client', email: '' };
  const value = Array.isArray(profile) ? profile[0] : profile;
  return {
    name: value?.full_name || 'Client',
    email: value?.email || ''
  };
}

function formatRelative(date?: string) {
  if (!date) return '-';
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatDateTime(date?: string) {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function statusLabel(status?: string) {
  switch (status) {
    case 'being_edited':
      return 'Being Edited';
    case 'in_revision':
      return 'In Revision';
    case 'submitted':
      return 'Submitted';
    case 'completed':
      return 'Completed';
    default:
      return 'In Progress';
  }
}

export default function EditorMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<EditorMessage[]>([]);
  const [documents, setDocuments] = useState<EditorDocument[]>([]);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const [messageData, documentData] = await Promise.all([
          apiGet<EditorMessage[]>('/api/editor/messages'),
          apiGet<EditorDocument[]>('/api/editor/documents')
        ]);

        if (active) {
          setMessages(messageData);
          setDocuments(documentData);
          const firstDocId =
            messageData.find((item) => item.document_id)?.document_id ||
            documentData[0]?.id ||
            null;
          setActiveDocumentId(firstDocId);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load messages.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const documentMap = useMemo(() => {
    const map = new Map<string, EditorDocument>();
    for (const doc of documents) {
      map.set(doc.id, doc);
    }
    return map;
  }, [documents]);

  const conversations = useMemo(() => {
    const grouped = new Map<string, EditorMessage[]>();
    for (const item of messages) {
      const key = item.document_id || 'unknown';
      const list = grouped.get(key) || [];
      list.push(item);
      grouped.set(key, list);
    }

    const rows = Array.from(grouped.entries()).map(([documentId, list]) => {
      const doc = documentMap.get(documentId);
      const last = list[list.length - 1];
      const profile = readProfile(doc?.profiles);
      return {
        documentId,
        document: doc?.document_title || `Document ${documentId.slice(0, 8)}`,
        client: profile.name,
        service: readService(doc?.services),
        status: statusLabel(doc?.status),
        lastMessage: last?.message || 'No message',
        time: formatRelative(last?.created_at),
        lastCreatedAt: last?.created_at ? new Date(last.created_at).getTime() : 0
      };
    });

    const sorted = rows.sort((a, b) => b.lastCreatedAt - a.lastCreatedAt);
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sorted;
    return sorted.filter(
      (row) =>
        row.document.toLowerCase().includes(term) ||
        row.client.toLowerCase().includes(term) ||
        row.lastMessage.toLowerCase().includes(term)
    );
  }, [messages, documentMap, searchTerm]);

  const activeConversation = useMemo(
    () => conversations.find((row) => row.documentId === activeDocumentId) || conversations[0] || null,
    [conversations, activeDocumentId]
  );

  const activeMessages = useMemo(() => {
    if (!activeConversation) return [];
    return messages
      .filter((item) => (item.document_id || 'unknown') === activeConversation.documentId)
      .sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
  }, [messages, activeConversation]);

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] w-full font-dm-sans bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-8 py-5 border-b border-[#EAECF0] flex-shrink-0 bg-[#FFFFFF]">
        <h1 className="text-[20px] font-bold text-[#171717] mb-1">Messages</h1>
        <p className="text-[13px] text-[#525866]">Chat with your clients, review feedback, and manage document updates in one place.</p>
      </div>

      {error ? (
        <div className="mx-5 mt-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      {/* Main Content Split */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Conversation List */}
        <div className="w-[380px] flex-shrink-0 border-r border-[#EAECF0] flex flex-col bg-[#FFFFFF]">
          <div className="p-5 border-b border-[#EAECF0] flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5]" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[13px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {conversations.map((conv) => (
              <div 
                key={conv.documentId}
                onClick={() => setActiveDocumentId(conv.documentId)}
                className={`p-4 rounded-[12px] cursor-pointer transition-colors ${
                  activeConversation?.documentId === conv.documentId
                    ? "bg-[#F0F9FF] border border-[#00A0E3]" 
                    : "bg-[#F9FAFB] border border-transparent hover:bg-[#F3F4F6]"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[14px] font-bold text-[#171717]">
                    {conv.document}
                  </h3>
                  <span className="text-[11px] text-[#A0AAB5]">{conv.time}</span>
                </div>
                <div className="text-[12px] text-[#00A0E3] mb-2 font-medium">
                  {conv.client} <span className="text-[#A0AAB5] mx-1">•</span> {conv.service}
                </div>
                <p className={`text-[13px] truncate ${activeConversation?.documentId === conv.documentId ? "text-[#525866]" : "text-[#A0AAB5]"}`}>
                  {conv.lastMessage}
                </p>
              </div>
            ))}
            {!loading && conversations.length === 0 ? (
              <p className="text-[13px] text-[#8A94A6] px-2 py-2">No conversations found.</p>
            ) : null}
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
                <h2 className="text-[18px] font-bold text-[#171717] mb-0.5">{activeConversation?.document || 'No conversation selected'}</h2>
                <div className="text-[13px] text-[#A0AAB5] font-medium">
                  {activeConversation?.client || 'Client'} <span className="mx-1.5">•</span> {activeConversation?.service || 'Service'}
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-[#F0F9FF] border border-[#BFDBFE] text-[#00A0E3] text-[13px] font-semibold rounded-full">
              {activeConversation?.status || 'In Progress'}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeMessages.map((msg) => (
              <div key={msg.id} className="flex items-start max-w-[85%]">
                <img 
                  src="https://i.pravatar.cc/150?u=editor-message"
                  alt="Sender"
                  className="w-10 h-10 rounded-full flex-shrink-0 object-cover mr-4"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-semibold text-[#00A0E3] mb-1 pl-1">Client</span>
                  <div className={`p-4 rounded-[12px] ${
                    "bg-[#F9FAFB] text-[#171717] text-[14px] rounded-tl-none border border-[#EAECF0]"
                  }`}>
                    <p className="text-[14px] leading-relaxed text-[#171717]">
                      {msg.message || 'No content'}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#A0AAB5] mt-1.5 px-1">
                    {formatDateTime(msg.created_at)}
                  </span>
                </div>
              </div>
            ))}
            {!loading && activeMessages.length === 0 ? (
              <p className="text-[13px] text-[#8A94A6]">No messages found for this document.</p>
            ) : null}
          </div>

          {/* Message Input */}
          <div className="p-5 border-t border-[#EAECF0] bg-[#FFFFFF]">
            <div className="relative flex items-center">
              <input 
                type="text" 
                disabled
                placeholder="Type your message..." 
                className="w-full pl-4 pr-14 py-3.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all disabled:bg-[#F9FAFB] disabled:text-[#A0AAB5]"
              />
              <button disabled className="absolute right-3 p-2 bg-[#A0AAB5] text-white rounded-[6px] transition-colors cursor-not-allowed">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
