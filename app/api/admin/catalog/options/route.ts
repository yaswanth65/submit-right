import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { getCatalogOptions } from "@/lib/services/catalog-service";

export async function GET() {
  try {
    await requireRole("admin");
    return ok(await getCatalogOptions());
  } catch (error) {
    return asResponse(error);
  }
}
