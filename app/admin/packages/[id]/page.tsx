"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { apiGet } from "@/lib/client-api";
import { CatalogItemModal, type CatalogItemCard } from "../../catalog/components/CatalogItemModal";

function formatCurrency(value: number | null) {
  if (value == null) return "-";
  return `INR ${value.toFixed(2)}`;
}

export default function PackageDetailsPage() {
  const params = useParams<{ id: string }>();
  const itemId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [item, setItem] = useState<CatalogItemCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Landing Page");
  const [activeSection, setActiveSection] = useState("Hero Section");

  const pageLayoutTabs = ["Landing Page", "Dashboard Page"];
  const sections = [
    "Hero Section",
    "Other Packages",
    "Packages Support",
    "What is Included",
    "Client Logos",
    "How It Helps",
    "Expert",
    "FAQs",
    "CTA Banner"
  ];

  const loadItem = useCallback(async () => {
    if (!itemId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiGet<CatalogItemCard>(`/api/admin/catalog/items/${itemId}`);
      setItem(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load package details");
    } finally {
      setIsLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const nameValue = item?.title ?? "-";
  const domainType = item?.domainType ?? item?.category ?? "-";
  const basePrice = formatCurrency(item?.basePrice ?? null);
  const status = item?.isActive ? "Active" : "Inactive";
  const imageUrl =
    item?.imageUrl ?? "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop";

  return (
    <div className="w-full font-dm-sans">
      <div className="mb-8 flex items-center gap-3">
        <Link href="/admin/packages" className="flex items-center justify-center rounded-md p-1.5 text-[#1C1C1D] hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="font-inter text-[24px] font-medium text-[#1C1C1D]">{isLoading ? "Loading..." : nameValue}</div>
      </div>

      <div className="mb-6 rounded-[12px] border border-[#EAECF0] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="font-inter text-[18px] font-bold text-[#1C1C1D]">Package Details</div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            disabled={!item || isLoading}
            className="flex items-center gap-1.5 text-[14px] font-medium text-[#00A0E3] transition-colors hover:text-[#008CC7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil className="h-[14px] w-[14px]" /> Edit
          </button>
        </div>

        {error ? (
          <div className="rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B42318]">{error}</div>
        ) : (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-[400px] shrink-0">
              <img src={imageUrl} alt={nameValue} className="h-[220px] w-full rounded-[8px] border border-[#EAECF0] object-cover shadow-sm" />
            </div>

            <div className="grid flex-1 grid-cols-1 items-start gap-y-6 md:grid-cols-2">
              <div>
                <p className="mb-1 text-[13px] text-[#78788D]">Package Name:</p>
                <p className="text-[15px] font-medium text-[#1C1C1D]">{nameValue}</p>
              </div>

              <div className="md:border-l md:border-[#EAECF0] md:pl-6">
                <p className="mb-1 text-[13px] text-[#78788D]">Domain Type:</p>
                <p className="text-[15px] font-medium text-[#1C1C1D]">{domainType}</p>
              </div>

              <div>
                <p className="mb-1 text-[13px] text-[#78788D]">Package Price:</p>
                <p className="text-[15px] font-medium text-[#1C1C1D]">{basePrice}</p>
              </div>

              <div className="md:border-l md:border-[#EAECF0] md:pl-6">
                <p className="mb-1 text-[13px] text-[#78788D]">Availability Status:</p>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium ${
                    item?.isActive ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF2F2] text-[#B42318]"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="h-fit w-full shrink-0 rounded-[12px] border border-[#EAECF0] bg-white p-5 shadow-sm lg:w-[320px]">
          <div className="mb-5 text-[16px] font-bold text-[#1C1C1D]">Page Layout</div>

          <div className="mb-6 flex rounded-[8px] border border-[#EAECF0] bg-[#F5F7FA] p-1">
            {pageLayoutTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-[6px] px-3 py-1.5 text-center text-[13px] font-medium transition-all ${
                  activeTab === tab ? "bg-[#00A0E3] text-white shadow-sm" : "text-[#78788D] hover:text-[#171717]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full rounded-[8px] px-4 py-3 text-left text-[14px] font-medium transition-all ${
                  activeSection === section
                    ? "border border-[#00A0E3] bg-[#F5FBFE] text-[#1C1C1D] shadow-sm"
                    : "border border-[#EAECF0] bg-white text-[#525866] hover:bg-[#F9FAFB]"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-[500px] flex-1 flex-col overflow-hidden rounded-[12px] border border-[#EAECF0] bg-white shadow-sm">
          <div className="border-b border-[#EAECF0] p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 font-inter text-[18px] font-bold text-[#1C1C1D]">{activeTab}</div>
                <p className="text-[14px] text-[#78788D]">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <button className="rounded-[8px] bg-[#00A0E3] px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#008CC7]">
                Save Changes
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#FAFAFA] p-6">
            <div className="mb-4 px-2 text-[16px] font-bold text-[#1C1C1D]">{activeSection}</div>
            <div className="m-2 flex min-h-[300px] items-center justify-center rounded-[12px] border border-dashed border-[#D0D5DD] bg-white shadow-sm">
              <span className="text-[14px] text-[#A0AAB5]">Empty placeholder for {activeSection} editor</span>
            </div>
          </div>
        </div>
      </div>

      <CatalogItemModal
        isOpen={isEditModalOpen && !!item}
        mode="edit"
        item={item}
        onClose={() => setIsEditModalOpen(false)}
        onSaved={loadItem}
      />
    </div>
  );
}
