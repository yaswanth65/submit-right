import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { catalogItemUpsertSchema } from "@/lib/validators";
import { getCatalogItemById, updateCatalogItem } from "@/lib/services/catalog-service";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    return ok(await getCatalogItemById(params.id));
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    const body = await parseJson(req, catalogItemUpsertSchema.partial());
    return ok(await updateCatalogItem(params.id, body));
  } catch (error) {
    return asResponse(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    return ok(
      await updateCatalogItem(params.id, {
        isActive: false
      })
    );
  } catch (error) {
    return asResponse(error);
  }
}
