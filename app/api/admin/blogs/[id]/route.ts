import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { blogPostUpdateSchema } from "@/lib/validators";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/services/blog-service";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    return ok(await getBlogPostById(params.id));
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, blogPostUpdateSchema);
    return ok(await updateBlogPost(params.id, body, admin.profileId));
  } catch (error) {
    return asResponse(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    return ok(await deleteBlogPost(params.id));
  } catch (error) {
    return asResponse(error);
  }
}
