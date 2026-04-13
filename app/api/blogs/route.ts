import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { listBlogPosts } from "@/lib/services/blog-service";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") ?? undefined;
    return ok(
      await listBlogPosts({
        search,
        publishedOnly: true
      })
    );
  } catch (error) {
    return asResponse(error);
  }
}
