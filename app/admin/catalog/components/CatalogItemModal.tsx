"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { apiRequest } from "@/lib/client-api";
import type { CatalogItemKind } from "@/lib/types";

export type CatalogItemCard = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  kind: CatalogItemKind;
  category: string | null;
  domainType: string | null;
  ratePerWord: number | null;
  basePrice: number | null;
  isBest: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string | null;
  displayPrice: number;
  priceLabel: string;
};

type CatalogItemModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  defaultKind?: CatalogItemKind;
  item?: CatalogItemCard | null;
  onClose: () => void;
  onSaved: () => Promise<void> | void;
};

type CatalogFormState = {
  kind: CatalogItemKind;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  domainType: string;
  ratePerWord: string;
  basePrice: string;
  sortOrder: string;
  isBest: boolean;
  isActive: boolean;
};

const kindOptions: Array<{ value: CatalogItemKind; label: string }> = [
  { value: "service", label: "Service" },
  { value: "package", label: "Package" },
  { value: "domain", label: "Domain" }
];

const catalogFormSchema = z
  .object({
    kind: z.enum(["service", "package", "domain"]),
    title: z.string().trim().min(2, "Title must be at least 2 characters").max(160, "Title is too long"),
    slug: z.string().trim().max(120, "Slug is too long").optional().or(z.literal("")),
    description: z.string().max(2000, "Description is too long").optional(),
    imageUrl: z.string().trim().optional(),
    category: z.string().trim().max(120, "Category is too long").optional(),
    domainType: z.string().trim().max(120, "Domain type is too long").optional(),
    ratePerWord: z.string().trim().optional(),
    basePrice: z.string().trim().optional(),
    sortOrder: z.string().trim().optional(),
    isBest: z.boolean(),
    isActive: z.boolean()
  })
  .superRefine((value, ctx) => {
    const basePrice = value.basePrice ? Number(value.basePrice) : null;
    const ratePerWord = value.ratePerWord ? Number(value.ratePerWord) : null;

    if (value.imageUrl && !z.string().url().safeParse(value.imageUrl).success) {
      ctx.addIssue({
        code: "custom",
        path: ["imageUrl"],
        message: "Image URL must be a valid URL"
      });
    }

    if (value.sortOrder && (!Number.isInteger(Number(value.sortOrder)) || Number(value.sortOrder) < 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["sortOrder"],
        message: "Sort order must be a non-negative integer"
      });
    }

    if (value.kind === "service") {
      if (ratePerWord == null || Number.isNaN(ratePerWord) || ratePerWord < 0) {
        ctx.addIssue({
          code: "custom",
          path: ["ratePerWord"],
          message: "Rate per word is required for services"
        });
      }
    }

    if (value.kind === "package") {
      if (basePrice == null || Number.isNaN(basePrice) || basePrice < 0) {
        ctx.addIssue({
          code: "custom",
          path: ["basePrice"],
          message: "Base price is required for packages"
        });
      }
    }

    if (value.kind === "domain") {
      if (!value.domainType?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["domainType"],
          message: "Domain type is required for domains"
        });
      }

      if (basePrice == null || Number.isNaN(basePrice) || basePrice < 0) {
        ctx.addIssue({
          code: "custom",
          path: ["basePrice"],
          message: "Base price is required for domains"
        });
      }
    }
  });

function toFormState(item: CatalogItemCard | null | undefined, defaultKind?: CatalogItemKind): CatalogFormState {
  return {
    kind: item?.kind ?? defaultKind ?? "service",
    title: item?.title ?? "",
    slug: item?.slug ?? "",
    description: item?.description ?? "",
    imageUrl: item?.imageUrl ?? "",
    category: item?.category ?? "",
    domainType: item?.domainType ?? "",
    ratePerWord: item?.ratePerWord != null ? String(item.ratePerWord) : "",
    basePrice: item?.basePrice != null ? String(item.basePrice) : "",
    sortOrder: item?.sortOrder != null ? String(item.sortOrder) : "0",
    isBest: item?.isBest ?? false,
    isActive: item?.isActive ?? true
  };
}

function toNullableNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

export function CatalogItemModal({
  isOpen,
  mode,
  defaultKind,
  item,
  onClose,
  onSaved
}: CatalogItemModalProps) {
  const [form, setForm] = useState<CatalogFormState>(toFormState(item, defaultKind));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setForm(toFormState(item, defaultKind));
    setError(null);
  }, [isOpen, item, defaultKind]);

  const modalTitle = useMemo(() => {
    if (mode === "edit") return "Edit Catalog Item";
    const kindLabel = kindOptions.find((opt) => opt.value === form.kind)?.label ?? "Catalog Item";
    return `Add ${kindLabel}`;
  }, [form.kind, mode]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = catalogFormSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form fields.");
      return;
    }

    const payload = {
      kind: parsed.data.kind,
      title: parsed.data.title,
      slug: parsed.data.slug?.trim() ? parsed.data.slug.trim() : undefined,
      description: parsed.data.description?.trim() ? parsed.data.description.trim() : null,
      imageUrl: parsed.data.imageUrl?.trim() ? parsed.data.imageUrl.trim() : null,
      category: parsed.data.category?.trim() ? parsed.data.category.trim() : null,
      domainType: parsed.data.domainType?.trim() ? parsed.data.domainType.trim() : null,
      ratePerWord: toNullableNumber(parsed.data.ratePerWord ?? ""),
      basePrice: toNullableNumber(parsed.data.basePrice ?? ""),
      sortOrder: parsed.data.sortOrder?.trim() ? Number(parsed.data.sortOrder) : undefined,
      isBest: parsed.data.isBest,
      isActive: parsed.data.isActive
    };

    setIsSubmitting(true);
    try {
      const path = mode === "create" ? "/api/admin/catalog/items" : `/api/admin/catalog/items/${item?.id}`;
      await apiRequest(path, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      await onSaved();
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save catalog item");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  const inputClassName =
    "h-[40px] w-full rounded-[8px] border border-[#EAECF0] px-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3]";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171717]/60 p-4">
      <div className="w-full max-w-[720px] rounded-[14px] border border-[#EAECF0] bg-white shadow-xl">
        <div className="flex h-[60px] items-center justify-between border-b border-[#EAECF0] px-4 sm:px-6">
          <div className="text-[18px] font-medium text-[#171717]">{modalTitle}</div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#525866] hover:bg-[#F5F7FA]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Type</label>
              <select
                value={form.kind}
                disabled={mode === "edit"}
                onChange={(e) => setForm((prev) => ({ ...prev, kind: e.target.value as CatalogItemKind }))}
                className={`${inputClassName} ${mode === "edit" ? "bg-[#F9FAFB] text-[#7A808A]" : "bg-white"}`}
              >
                {kindOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Sort Order</label>
              <input
                value={form.sortOrder}
                onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
                type="number"
                min={0}
                className={inputClassName}
                placeholder="0"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className={inputClassName}
                placeholder="Enter title"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Slug (optional)</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                className={inputClassName}
                placeholder="auto-generated-if-empty"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Image URL (optional)</label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className={inputClassName}
                placeholder="https://..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Description (optional)</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[84px] w-full rounded-[8px] border border-[#EAECF0] px-3 py-2 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3]"
                placeholder="Enter description"
              />
            </div>

            {(form.kind === "service" || form.kind === "domain") && (
              <div>
                <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">
                  Domain Type{form.kind === "domain" ? " *" : " (optional)"}
                </label>
                <input
                  value={form.domainType}
                  onChange={(e) => setForm((prev) => ({ ...prev, domainType: e.target.value }))}
                  className={inputClassName}
                  placeholder="Editing, Translation, Medical..."
                />
              </div>
            )}

            {(form.kind === "service" || form.kind === "package") && (
              <div>
                <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Category (optional)</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className={inputClassName}
                  placeholder="Category"
                />
              </div>
            )}

            {form.kind === "service" && (
              <div>
                <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Rate Per Word *</label>
                <input
                  value={form.ratePerWord}
                  onChange={(e) => setForm((prev) => ({ ...prev, ratePerWord: e.target.value }))}
                  type="number"
                  min={0}
                  step="0.01"
                  className={inputClassName}
                  placeholder="0.00"
                />
              </div>
            )}

            {(form.kind === "package" || form.kind === "domain") && (
              <div>
                <label className="mb-1 block text-[14px] font-medium text-[#0E121B]">Base Price *</label>
                <input
                  value={form.basePrice}
                  onChange={(e) => setForm((prev) => ({ ...prev, basePrice: e.target.value }))}
                  type="number"
                  min={0}
                  step="0.01"
                  className={inputClassName}
                  placeholder="0.00"
                />
              </div>
            )}

            <label className="inline-flex items-center gap-2 text-[14px] text-[#171717]">
              <input
                type="checkbox"
                checked={form.isBest}
                onChange={(e) => setForm((prev) => ({ ...prev, isBest: e.target.checked }))}
              />
              Mark as best item
            </label>

            <label className="inline-flex items-center gap-2 text-[14px] text-[#171717]">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              Active
            </label>
          </div>

          {error && <p className="mt-4 text-[13px] text-[#B42318]">{error}</p>}

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#EAECF0] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] rounded-[8px] border border-[#EAECF0] px-4 text-[14px] font-medium text-[#525866]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[40px] rounded-[8px] bg-[#00A0E3] px-4 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
