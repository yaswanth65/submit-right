import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { catalogItemUpsertSchema } from "@/lib/validators";
import { getCatalogItemById, updateCatalogItem } from "@/lib/services/catalog-service";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("admin");
    const { id } = await params;
    return ok(await getCatalogItemById(id));
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("admin");
    const { id } = await params;
    const body = await parseJson(req, catalogItemUpsertSchema.partial());
    return ok(await updateCatalogItem(id, body));
  } catch (error) {
    return asResponse(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("admin");
    const { id } = await params;
    return ok(
      await updateCatalogItem(id, {
        isActive: false
      })
    );
  } catch (error) {
    return asResponse(error);
  }
}
