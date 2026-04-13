import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { getBlogPostById } from "@/lib/services/blog-service";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    return ok(await getBlogPostById(params.id, true));
  } catch (error) {
    return asResponse(error);
  }
}
