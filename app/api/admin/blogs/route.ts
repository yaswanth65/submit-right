import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { blogPostSchema, blogPostsQuerySchema } from "@/lib/validators";
import { createBlogPost, listBlogPosts } from "@/lib/services/blog-service";

export async function GET(req: NextRequest) {
  try {
    await requireRole("admin");
    const query = blogPostsQuerySchema.parse({
      search: req.nextUrl.searchParams.get("search") ?? undefined,
      status: req.nextUrl.searchParams.get("status") ?? undefined
    });

    const posts = await listBlogPosts({
      search: query.search,
      status: query.status,
      publishedOnly: false
    });

    return ok({
      items: posts.cards,
      raw: posts.rows
    });
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, blogPostSchema);
    return created(await createBlogPost(body, admin.profileId));
  } catch (error) {
    return asResponse(error);
  }
}
