import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { documentListQuerySchema, submitDocumentStep1Schema } from "@/lib/validators";
import { createDraftDocument } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const query = documentListQuerySchema.parse({
      search: req.nextUrl.searchParams.get("search") ?? undefined,
      status: req.nextUrl.searchParams.get("status") ?? undefined,
      sort: req.nextUrl.searchParams.get("sort") ?? undefined
    });

    let builder = supabaseAdmin
      .from("documents")
      .select("*, services(*)")
      .eq("client_id", user.profileId);

    if (query.search) builder = builder.ilike("document_title", `%${query.search}%`);
    if (query.status) builder = builder.eq("status", query.status);

    if (query.sort === "oldest") {
      builder = builder.order("updated_at", { ascending: true });
    } else if (query.sort === "a_to_z") {
      builder = builder.order("document_title", { ascending: true });
    } else {
      builder = builder.order("updated_at", { ascending: false });
    }

    const { data } = await builder;
    return ok({
      totalSubmittedDocumentsCount: data?.length ?? 0,
      documents: data ?? []
    });
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, submitDocumentStep1Schema);
    const draft = await createDraftDocument({
      clientId: user.profileId,
      documentTitle: body.documentTitle,
      academicField: body.academicField,
      documentType: body.documentType,
      shortDescription: body.shortDescription
    });
    return created(draft);
  } catch (error) {
    return asResponse(error);
  }
}
