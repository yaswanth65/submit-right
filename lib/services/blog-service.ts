import { fail } from "@/lib/http";
import { supabaseAdmin } from "@/lib/supabase";

export type BlogSectionRow = {
  heading: string;
  content: string;
  imageUrl?: string | null;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  author_name: string;
  cover_image_url: string | null;
  introduction: string;
  sections: BlogSectionRow[];
  conclusion: string | null;
  related_service_slugs: string[];
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  published_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  slug?: string | null;
  title: string;
  authorName?: string | null;
  coverImageUrl?: string | null;
  introduction: string;
  sections: BlogSectionRow[];
  conclusion?: string | null;
  relatedServiceSlugs?: string[];
  status?: "draft" | "published" | "archived";
  isFeatured?: boolean;
  publishedAt?: string | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toBlogCard(row: BlogPostRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    authorName: row.author_name,
    coverImageUrl: row.cover_image_url,
    introduction: row.introduction,
    sections: row.sections ?? [],
    conclusion: row.conclusion,
    relatedServiceSlugs: row.related_service_slugs ?? [],
    status: row.status,
    isFeatured: row.is_featured,
    publishedAt: row.published_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function listBlogPosts(input?: { search?: string; status?: "draft" | "published" | "archived"; publishedOnly?: boolean }) {
  let query = supabaseAdmin.from("blog_posts").select("*").order("published_at", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });

  if (input?.publishedOnly !== false) {
    query = query.eq("status", "published");
  } else if (input?.status) {
    query = query.eq("status", input.status);
  }

  if (input?.search) {
    const search = `%${input.search}%`;
    query = query.or(`title.ilike.${search},slug.ilike.${search},author_name.ilike.${search},introduction.ilike.${search}`);
  }

  const { data, error } = await query;
  if (error) {
    throw fail("Unable to load blog posts", 500, error);
  }

  const rows = (data ?? []) as BlogPostRow[];
  return {
    rows,
    cards: rows.map(toBlogCard)
  };
}

export async function getBlogPostById(id: string, publishedOnly = false) {
  let query = supabaseAdmin.from("blog_posts").select("*").eq("id", id);
  if (publishedOnly) query = query.eq("status", "published");
  const { data, error } = await query.single();

  if (error || !data) {
    throw fail("Blog post not found", 404, error);
  }

  return toBlogCard(data as BlogPostRow);
}

export async function createBlogPost(input: BlogPostInput, createdBy?: string) {
  const slug = input.slug ?? slugify(input.title);
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert({
      slug,
      title: input.title,
      author_name: input.authorName ?? "Admin",
      cover_image_url: input.coverImageUrl ?? null,
      introduction: input.introduction,
      sections: input.sections,
      conclusion: input.conclusion ?? null,
      related_service_slugs: input.relatedServiceSlugs ?? [],
      status: input.status ?? "draft",
      is_featured: input.isFeatured ?? false,
      published_at: input.publishedAt ?? null,
      created_by: createdBy ?? null,
      updated_by: createdBy ?? null
    })
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to create blog post", 500, error);
  }

  return toBlogCard(data as BlogPostRow);
}

export async function updateBlogPost(id: string, input: Partial<BlogPostInput>, updatedBy?: string) {
  const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (input.slug !== undefined) payload.slug = input.slug;
  if (input.title !== undefined) payload.title = input.title;
  if (input.authorName !== undefined) payload.author_name = input.authorName ?? "Admin";
  if (input.coverImageUrl !== undefined) payload.cover_image_url = input.coverImageUrl ?? null;
  if (input.introduction !== undefined) payload.introduction = input.introduction;
  if (input.sections !== undefined) payload.sections = input.sections;
  if (input.conclusion !== undefined) payload.conclusion = input.conclusion ?? null;
  if (input.relatedServiceSlugs !== undefined) payload.related_service_slugs = input.relatedServiceSlugs ?? [];
  if (input.status !== undefined) payload.status = input.status;
  if (input.isFeatured !== undefined) payload.is_featured = input.isFeatured;
  if (input.publishedAt !== undefined) payload.published_at = input.publishedAt ?? null;
  if (updatedBy !== undefined) payload.updated_by = updatedBy;

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to update blog post", 500, error);
  }

  return toBlogCard(data as BlogPostRow);
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
  if (error) {
    throw fail("Unable to delete blog post", 500, error);
  }
  return { deleted: true };
}
