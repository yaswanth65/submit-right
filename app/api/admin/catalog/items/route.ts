import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { catalogItemUpsertSchema, catalogItemsQuerySchema } from "@/lib/validators";
import { createCatalogItem, listCatalogItems } from "@/lib/services/catalog-service";

export async function GET(req: NextRequest) {
  try {
    await requireRole("admin");
    const query = catalogItemsQuerySchema.parse({
      kind: req.nextUrl.searchParams.get("kind") ?? undefined,
      search: req.nextUrl.searchParams.get("search") ?? undefined
    });

    const items = await listCatalogItems({
      kind: query.kind,
      activeOnly: false,
      search: query.search
    });

    return ok({
      items: items.cards,
      raw: items.rows
    });
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("admin");
    const body = await parseJson(req, catalogItemUpsertSchema);
    return created(await createCatalogItem(body));
  } catch (error) {
    return asResponse(error);
  }
}
