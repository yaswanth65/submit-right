import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { blogPostUpdateSchema } from "@/lib/validators";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/services/blog-service";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("admin");
    const { id } = await params;
    return ok(await getBlogPostById(id));
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, blogPostUpdateSchema);
    const { id } = await params;
    return ok(await updateBlogPost(id, body, admin.profileId));
  } catch (error) {
    return asResponse(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("admin");
    const { id } = await params;
    return ok(await deleteBlogPost(id));
  } catch (error) {
    return asResponse(error);
  }
}
