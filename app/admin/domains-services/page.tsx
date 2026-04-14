"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { apiGet } from "@/lib/client-api";
import type { CatalogItemKind } from "@/lib/types";
import { CatalogItemModal, type CatalogItemCard } from "@/app/admin/catalog/components/CatalogItemModal";

type CatalogListResponse = {
  items: CatalogItemCard[];
  raw: unknown[];
};

type ModalState =
  | {
      kind: CatalogItemKind;
    }
  | null;

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function formatRate(item: CatalogItemCard) {
  if (item.kind === "service") {
    return `INR ${Number(item.ratePerWord ?? 0).toFixed(2)}/word`;
  }
  return `INR ${Number(item.basePrice ?? item.displayPrice ?? 0).toFixed(2)}`;
}

export default function DomainsAndServicesPage() {
  const [items, setItems] = useState<CatalogItemCard[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();
      if (search.trim()) {
        query.set("search", search.trim());
      }

      const queryString = query.toString();
      const data = await apiGet<CatalogListResponse>(
        `/api/admin/catalog/items${queryString ? `?${queryString}` : ""}`
      );

      setItems(data.items.filter((item) => item.kind === "service" || item.kind === "domain"));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load catalog");
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadItems();
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadItems]);

  const rows = useMemo(() => items, [items]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full font-dm-sans">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 py-3 border-b border-[#EAECF0] bg-white">
        <div className="text-[20px] font-bold text-[#171717] leading-tight">Domains & Services</div>
        <p className="text-[14px] text-[#525866] mt-1">Manage domain service catalog and rates.</p>
      </div>

      <div className="bg-[#FFFFFF] rounded-[12px] border border-[#EAECF0] p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="relative w-[280px] max-w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-[18px] w-[18px] text-[#A0AAB5]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[42px] w-full pl-10 pr-3 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setModalState({ kind: "service" })}
              className="h-[40px] rounded-[8px] border border-[#EAECF0] px-3 text-[13px] font-semibold text-[#171717] inline-flex items-center gap-2 hover:bg-[#F9FAFB]"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </button>
            <button
              onClick={() => setModalState({ kind: "package" })}
              className="h-[40px] rounded-[8px] border border-[#EAECF0] px-3 text-[13px] font-semibold text-[#171717] inline-flex items-center gap-2 hover:bg-[#F9FAFB]"
            >
              <Plus className="h-4 w-4" />
              Add Package
            </button>
            <button
              onClick={() => setModalState({ kind: "domain" })}
              className="h-[40px] rounded-[8px] bg-[#00A0E3] px-3 text-[13px] font-semibold text-white inline-flex items-center gap-2 hover:bg-[#008CC7]"
            >
              <Plus className="h-4 w-4" />
              Add Domain
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#EAECF0] rounded-[10px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Domain Type</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Services Name</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Word Count Rate or Base Rate</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Last Updated Date</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866]">Availability Status</th>
                <th className="py-3 px-4 text-[13px] font-bold text-[#525866] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-[13px] text-[#78788D]">
                    Loading catalog items...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-[13px] text-[#B42318]">
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-[13px] text-[#78788D]">
                    No services or domains found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                rows.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    <td className="py-3 px-4 text-[13px] font-medium text-[#525866]">
                      {item.domainType || item.category || (item.kind === "domain" ? "Domain" : "Service")}
                    </td>
                    <td className="py-3 px-4 text-[13px] text-[#525866]">{item.title}</td>
                    <td className="py-3 px-4 text-[13px] text-[#525866]">{formatRate(item)}</td>
                    <td className="py-3 px-4 text-[13px] text-[#525866]">{formatDate(item.updatedAt ?? item.createdAt)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                      item.isActive
                        ? "bg-[#ECFDF3] text-[#027A48]" 
                        : "bg-[#FEF3F2] text-[#B42318]"
                    }`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/domains-services/${item.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-[6px] border border-[#EAECF0] px-3 py-1.5 text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB]"
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

      <CatalogItemModal
        isOpen={!!modalState}
        mode="create"
        defaultKind={modalState?.kind}
        item={null}
        onClose={() => setModalState(null)}
        onSaved={loadItems}
      />
    </div>
  );
}
