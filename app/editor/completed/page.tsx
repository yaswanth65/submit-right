"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { FileText, CheckSquare, Star, TrendingUp, Search, Filter, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { apiGet } from '@/lib/client-api';

type CompletedDocument = {
  id: string;
  document_title?: string;
  completed_at?: string;
  word_count?: number;
  status?: string;
};

type CompletedPayload = {
  totalCompletedCount: number;
  completedThisMonthCount: number;
  averageTurnaroundTimeInDays: number;
  revisionRatePercent: number;
  documents: CompletedDocument[];
};

function formatDate(value?: string) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
}

export default function CompletedDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [payload, setPayload] = useState<CompletedPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<CompletedPayload>('/api/editor/completed');
        if (active) {
          setPayload(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load completed documents.');
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

  const totalWords = useMemo(
    () => (payload?.documents ?? []).reduce((sum, item) => sum + Number(item.word_count || 0), 0),
    [payload]
  );

  const completedDocs = useMemo(() => {
    const docs = payload?.documents ?? [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return docs;
    }

    return docs.filter((doc) => (doc.document_title || '').toLowerCase().includes(term));
  }, [payload, searchTerm]);

  const stats = [
    { title: 'Total Completed', value: payload?.totalCompletedCount ?? 0, icon: CheckSquare, iconColor: 'text-[#1CB061]', iconBg: 'bg-[#E0F2E9]' },
    { title: 'This Month', value: payload?.completedThisMonthCount ?? 0, icon: CheckSquare, iconColor: 'text-[#1CB061]', iconBg: 'bg-[#E0F2E9]' },
    { title: 'Avg. Turnaround', value: `${payload?.averageTurnaroundTimeInDays ?? 0} days`, icon: Star, iconColor: 'text-[#FBBF24]', iconBg: 'bg-[#FEF3C7]' },
    { title: 'Total Words', value: `${Math.round(totalWords / 1000)}K`, icon: TrendingUp, iconColor: 'text-[#00A0E3]', iconBg: 'bg-[#E0F6FF]' },
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
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      
      {/* Header */}
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Completed Documents</div>
        <div className="text-[14px] text-[#525866] mt-1">View and manage all your completed work.</div>
      </div>

      {error ? (
        <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] p-6 shadow-sm flex items-start justify-between">
            <div>
              <div className="text-[14px] text-[#525866] font-medium mb-3">{stat.title}</div>
              <div className="text-[32px] font-bold text-[#171717] leading-none">{loading ? '...' : stat.value}</div>
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
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
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Completed Date</th>
                <th className="py-3.5 px-6 text-[13px] font-semibold text-[#525866]">Word Count</th>
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
                      <span className="text-[13px] font-medium text-[#171717] group-hover:underline">{doc.document_title || 'Untitled Document'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[#525866]">{formatDate(doc.completed_at)}</td>
                  <td className="py-4 px-6 text-[13px] text-[#525866]">{doc.word_count || 0}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#1CB061] text-[#1CB061] bg-[#E0F2E9] bg-opacity-30 inline-block">
                      {doc.status === 'completed' ? 'Completed' : 'Done'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/editor/assigned?doc=${doc.id}`} className="inline-flex items-center space-x-1 text-[#00A0E3] hover:underline text-[13px] font-medium">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && completedDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-6 text-center text-[13px] text-[#78788D]">
                    No completed documents found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-[#EAECF0] flex items-center justify-between text-[13px] text-[#525866] bg-[#FFFFFF]">
          <div>Showing {completedDocs.length} of {payload?.totalCompletedCount ?? 0} results</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-[#EAECF0] rounded-[6px] hover:bg-[#F9FAFB] transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
