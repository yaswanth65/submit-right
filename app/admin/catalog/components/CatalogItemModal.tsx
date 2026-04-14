"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { apiGet, apiRequest } from "@/lib/client-api";
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

type CatalogOptionsResponse = {
  all: CatalogItemCard[];
  domains: CatalogItemCard[];
};

type CatalogListResponse = {
  items: CatalogItemCard[];
  raw: unknown[];
};

const fallbackCategoryOptions = ["best", "other", "publication_support_packages"];

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
    const basePriceTrimmed = value.basePrice?.trim();
    const rateTrimmed = value.ratePerWord?.trim();
    const basePrice = basePriceTrimmed ? Number(basePriceTrimmed) : null;
    const ratePerWord = rateTrimmed ? Number(rateTrimmed) : null;

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

    if (basePriceTrimmed && (basePrice == null || Number.isNaN(basePrice) || basePrice < 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["basePrice"],
        message: "Base price must be a non-negative number"
      });
    }

    if (rateTrimmed && (ratePerWord == null || Number.isNaN(ratePerWord) || ratePerWord < 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["ratePerWord"],
        message: "Rate per word must be a non-negative number"
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

    if (value.kind === "domain" && !value.domainType?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["domainType"],
        message: "Domain type is required for domains"
      });
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeOptionValue(value: string | null | undefined) {
  return value?.trim() ?? "";
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
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [availableDomainTypes, setAvailableDomainTypes] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>(fallbackCategoryOptions);

  useEffect(() => {
    if (!isOpen) return;
    setForm(toFormState(item, defaultKind));
    setError(null);
  }, [isOpen, item, defaultKind]);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    const loadCatalogOptions = async () => {
      setIsLoadingOptions(true);
      try {
        const data = await apiGet<CatalogOptionsResponse>("/api/admin/catalog/options");
        if (cancelled) return;

        const nextDomainTypes = new Set<string>();
        for (const domain of data.domains ?? []) {
          const fromDomainType = normalizeOptionValue(domain.domainType);
          const fromTitle = normalizeOptionValue(domain.title);
          if (fromDomainType) nextDomainTypes.add(fromDomainType);
          if (fromTitle) nextDomainTypes.add(fromTitle);
        }

        const nextCategories = new Set<string>(fallbackCategoryOptions);
        for (const catalogItem of data.all ?? []) {
          const category = normalizeOptionValue(catalogItem.category);
          if (category) nextCategories.add(category);
        }

        setAvailableDomainTypes(Array.from(nextDomainTypes).sort((a, b) => a.localeCompare(b)));
        setAvailableCategories(Array.from(nextCategories).sort((a, b) => a.localeCompare(b)));
      } catch {
        if (cancelled) return;
        setAvailableDomainTypes([]);
        setAvailableCategories(fallbackCategoryOptions);
      } finally {
        if (!cancelled) {
          setIsLoadingOptions(false);
        }
      }
    };

    void loadCatalogOptions();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const modalTitle = useMemo(() => {
    if (mode === "edit") return "Edit Catalog Item";
    const kindLabel = kindOptions.find((opt) => opt.value === form.kind)?.label ?? "Catalog Item";
    return `Add ${kindLabel}`;
  }, [form.kind, mode]);

  const domainTypeOptions = useMemo(() => {
    const options = new Set(availableDomainTypes);
    const current = normalizeOptionValue(form.domainType);
    if (current) options.add(current);
    return Array.from(options).sort((a, b) => a.localeCompare(b));
  }, [availableDomainTypes, form.domainType]);

  const categoryOptions = useMemo(() => {
    const options = new Set(availableCategories);
    const current = normalizeOptionValue(form.category);
    if (current) options.add(current);
    return Array.from(options).sort((a, b) => a.localeCompare(b));
  }, [availableCategories, form.category]);

  const isService = form.kind === "service";
  const isPackage = form.kind === "package";
  const isDomain = form.kind === "domain";

  async function ensureUniqueSlug(proposedSlug: string) {
    const query = new URLSearchParams();
    query.set("search", proposedSlug);

    const result = await apiGet<CatalogListResponse>(`/api/admin/catalog/items?${query.toString()}`);
    const hasConflict = (result.items ?? []).some(
      (existing) =>
        existing.slug.toLowerCase() === proposedSlug.toLowerCase() &&
        (mode === "create" || existing.id !== item?.id)
    );

    if (hasConflict) {
      throw new Error("Slug must be unique. Another catalog item already uses this slug.");
    }
  }

  function onKindChange(nextKind: CatalogItemKind) {
    setForm((prev) => ({
      ...prev,
      kind: nextKind,
      ratePerWord: nextKind === "service" ? prev.ratePerWord : "",
      basePrice: nextKind === "package" || nextKind === "domain" ? prev.basePrice : "",
      domainType: nextKind === "service" || nextKind === "domain" ? prev.domainType : ""
    }));
    setError(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = catalogFormSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form fields.");
      return;
    }

    const resolvedSlug = parsed.data.slug?.trim() ? parsed.data.slug.trim() : slugify(parsed.data.title);
    if (!resolvedSlug) {
      setError("Slug could not be generated. Please provide a valid title or slug.");
      return;
    }

    const normalizedCategory = parsed.data.category?.trim() ? parsed.data.category.trim() : null;
    const normalizedDomainType =
      parsed.data.kind === "service" || parsed.data.kind === "domain"
        ? parsed.data.domainType?.trim() || null
        : null;
    const normalizedRatePerWord =
      parsed.data.kind === "service" ? toNullableNumber(parsed.data.ratePerWord ?? "") : null;
    const normalizedBasePrice =
      parsed.data.kind === "service"
        ? null
        : parsed.data.kind === "domain"
          ? (toNullableNumber(parsed.data.basePrice ?? "") ?? 0)
          : toNullableNumber(parsed.data.basePrice ?? "");

    if (parsed.data.kind === "service" && normalizedRatePerWord == null) {
      setError("Rate per word is required for services.");
      return;
    }

    if (parsed.data.kind === "package" && normalizedBasePrice == null) {
      setError("Base price is required for packages.");
      return;
    }

    setIsSubmitting(true);
    try {
      await ensureUniqueSlug(resolvedSlug);

      const payload = {
        kind: parsed.data.kind,
        title: parsed.data.title,
        slug: resolvedSlug,
        description: parsed.data.description?.trim() ? parsed.data.description.trim() : null,
        imageUrl: parsed.data.imageUrl?.trim() ? parsed.data.imageUrl.trim() : null,
        category: normalizedCategory,
        domainType: normalizedDomainType,
        ratePerWord: normalizedRatePerWord,
        basePrice: normalizedBasePrice,
        sortOrder: parsed.data.sortOrder?.trim() ? Number(parsed.data.sortOrder) : undefined,
        isBest: parsed.data.isBest,
        isActive: parsed.data.isActive
      };

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
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]" title="Select what type of catalog item this is">
                Type
              </label>
              <select
                value={form.kind}
                disabled={mode === "edit"}
                onChange={(e) => onKindChange(e.target.value as CatalogItemKind)}
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
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]" title="Lower values appear earlier in lists">
                Sort Order
              </label>
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
              <label className="mb-1 block text-[14px] font-medium text-[#0E121B]" title="Used in URLs and must be unique">
                Slug (optional)
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                className={inputClassName}
                placeholder="auto-generated-if-empty"
              />
              <p className="mt-1 text-[12px] text-[#667085]">Leave empty to auto-generate from title. Slug must be unique.</p>
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

            {(isService || isDomain) && (
              <div>
                <label
                  className="mb-1 block text-[14px] font-medium text-[#0E121B]"
                  title="Standardized domain names improve filtering and grouping"
                >
                  Domain Type{isDomain ? " *" : " (optional)"}
                </label>
                <select
                  value={form.domainType}
                  onChange={(e) => setForm((prev) => ({ ...prev, domainType: e.target.value }))}
                  className={inputClassName}
                  disabled={isLoadingOptions}
                >
                  <option value="">{isDomain ? "Select domain type" : "None"}</option>
                  {domainTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label
                className="mb-1 block text-[14px] font-medium text-[#0E121B]"
                title="Use predefined categories for consistent reporting and filtering"
              >
                Category (optional)
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className={inputClassName}
                disabled={isLoadingOptions}
              >
                <option value="">Select category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {isService && (
              <div>
                <label className="mb-1 block text-[14px] font-medium text-[#0E121B]" title="Pricing for service items is charged per word">
                  Rate Per Word *
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#667085]">{"\u20B9"}</span>
                  <input
                    value={form.ratePerWord}
                    onChange={(e) => setForm((prev) => ({ ...prev, ratePerWord: e.target.value }))}
                    type="number"
                    min={0}
                    step="0.01"
                    className={`${inputClassName} pl-8`}
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}

            {(isPackage || isDomain) && (
              <div>
                <label className="mb-1 block text-[14px] font-medium text-[#0E121B]" title="Base price is required for packages and optional for domains">
                  Base Price {isPackage ? "*" : "(optional)"}
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#667085]">{"\u20B9"}</span>
                  <input
                    value={form.basePrice}
                    onChange={(e) => setForm((prev) => ({ ...prev, basePrice: e.target.value }))}
                    type="number"
                    min={0}
                    step="0.01"
                    className={`${inputClassName} pl-8`}
                    placeholder="0.00"
                  />
                </div>
                {isDomain ? <p className="mt-1 text-[12px] text-[#667085]">Defaults to 0.00 if left empty.</p> : null}
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

          {error ? <p className="mt-4 text-[13px] text-[#B42318]">{error}</p> : null}

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
