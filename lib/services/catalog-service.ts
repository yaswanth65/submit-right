import { fail } from "@/lib/http";
import { supabaseAdmin } from "@/lib/supabase";
import type { CatalogItemKind } from "@/lib/types";

export type CatalogItemRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  kind: CatalogItemKind;
  category: string | null;
  domain_type: string | null;
  rate_per_word: number | null;
  base_price: number | null;
  page_sections: string[] | null;
  is_best: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
};

export type CatalogItemUpsertInput = {
  slug?: string | null;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  kind: CatalogItemKind;
  category?: string | null;
  domainType?: string | null;
  basePrice?: number | null;
  ratePerWord?: number | null;
  pageSections?: string[] | null;
  isBest?: boolean;
  isActive?: boolean;
  sortOrder?: number;
};

function resolveCatalogDisplayPrice(item: CatalogItemRow) {
  if (item.kind === "package") {
    return item.base_price ?? item.rate_per_word ?? 0;
  }

  if (item.base_price != null && item.base_price > 0) {
    return item.base_price;
  }

  return item.rate_per_word ?? 0;
}

function buildCatalogCard(item: CatalogItemRow) {
  const displayPrice = resolveCatalogDisplayPrice(item);
  const priceLabel =
    item.kind === "service"
      ? `INR ${Number(displayPrice).toFixed(2)}/word`
      : `INR ${Number(displayPrice).toFixed(2)}`;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    imageUrl: item.image_url,
    kind: item.kind,
    category: item.category,
    domainType: item.domain_type,
    ratePerWord: item.rate_per_word,
    basePrice: item.base_price,
    pageSections: item.page_sections ?? [],
    isBest: item.is_best,
    isActive: item.is_active,
    sortOrder: item.sort_order,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    displayPrice,
    priceLabel
  };
}

export async function listCatalogItems(input?: { kind?: CatalogItemKind; activeOnly?: boolean; search?: string }) {
  let query = supabaseAdmin
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (input?.activeOnly !== false) {
    query = query.eq("is_active", true);
  }

  if (input?.kind) {
    query = query.eq("kind", input.kind);
  }

  if (input?.search) {
    const search = `%${input.search}%`;
    query = query.or(`title.ilike.${search},slug.ilike.${search},category.ilike.${search},domain_type.ilike.${search}`);
  }

  const { data, error } = await query;

  if (error) {
    throw fail("Unable to load catalog items", 500, error);
  }

  const rows = (data ?? []) as CatalogItemRow[];

  return {
    rows,
    cards: rows.map(buildCatalogCard)
  };
}

export async function getCatalogOptions() {
  const { rows, cards } = await listCatalogItems({ activeOnly: true });

  return {
    all: cards,
    services: cards.filter((item) => item.kind === "service"),
    packages: cards.filter((item) => item.kind === "package"),
    domains: cards.filter((item) => item.kind === "domain"),
    applyTo: [
      { value: "all_services", label: "All Services" },
      { value: "all_packages", label: "All Packages" },
      { value: "all_domains", label: "All Domains" },
      { value: "specific_service", label: "Specific Service" },
      { value: "specific_package", label: "Specific Package" },
      { value: "specific_domain", label: "Specific Domain" }
    ],
    rows
  };
}

export function groupCatalogItems(cards: ReturnType<typeof buildCatalogCard>[]) {
  return {
    all: cards,
    services: cards.filter((item) => item.kind === "service"),
    packages: cards.filter((item) => item.kind === "package"),
    domains: cards.filter((item) => item.kind === "domain"),
    best: cards.filter((item) => item.isBest),
    publicationSupportPackages: cards.filter(
      (item) => item.kind === "package" || item.category === "publication_support_packages"
    ),
    other: cards.filter((item) => item.kind === "service" && item.category === "other"),
    servicePages: cards
      .filter((item) => item.kind !== "domain")
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        href: `/user/${item.kind}s/${item.slug}`,
        title: item.title,
        description: item.description,
        kind: item.kind,
        price: item.priceLabel,
        imageUrl: item.imageUrl,
        pageSections: item.pageSections
      }))
  };
}

export async function createCatalogItem(input: CatalogItemUpsertInput) {
  const slug = input.slug ?? input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const payload = {
    slug,
    title: input.title,
    description: input.description ?? null,
    image_url: input.imageUrl ?? null,
    kind: input.kind,
    category: input.category ?? null,
    domain_type: input.domainType ?? null,
    base_price: input.basePrice ?? null,
    rate_per_word: input.ratePerWord ?? 0,
    page_sections: input.pageSections ?? [],
    is_best: input.isBest ?? false,
    is_active: input.isActive ?? true,
    sort_order: input.sortOrder ?? 0
  };

  const { data, error } = await supabaseAdmin.from("services").insert(payload).select("*").single();

  if (error || !data) {
    throw fail("Unable to create catalog item", 500, error);
  }

  return buildCatalogCard(data as CatalogItemRow);
}

export async function updateCatalogItem(
  itemId: string,
  input: Partial<CatalogItemUpsertInput>
) {
  const payload: Record<string, unknown> = {};

  if (input.slug !== undefined) payload.slug = input.slug;
  if (input.title !== undefined) payload.title = input.title;
  if (input.description !== undefined) payload.description = input.description ?? null;
  if (input.imageUrl !== undefined) payload.image_url = input.imageUrl ?? null;
  if (input.kind !== undefined) payload.kind = input.kind;
  if (input.category !== undefined) payload.category = input.category ?? null;
  if (input.domainType !== undefined) payload.domain_type = input.domainType ?? null;
  if (input.basePrice !== undefined) payload.base_price = input.basePrice ?? null;
  if (input.ratePerWord !== undefined) payload.rate_per_word = input.ratePerWord ?? null;
  if (input.pageSections !== undefined) payload.page_sections = input.pageSections ?? [];
  if (input.isBest !== undefined) payload.is_best = input.isBest;
  if (input.isActive !== undefined) payload.is_active = input.isActive;
  if (input.sortOrder !== undefined) payload.sort_order = input.sortOrder;
  payload.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("services")
    .update(payload)
    .eq("id", itemId)
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to update catalog item", 500, error);
  }

  return buildCatalogCard(data as CatalogItemRow);
}

export async function getCatalogItemById(itemId: string) {
  const { data, error } = await supabaseAdmin.from("services").select("*").eq("id", itemId).single();

  if (error || !data) {
    throw fail("Catalog item not found", 404, error);
  }

  return buildCatalogCard(data as CatalogItemRow);
}
