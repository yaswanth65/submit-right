import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { listServices } from "@/lib/services/query-service";

export async function GET() {
  try {
    await requireRole("client");
    return ok(await listServices());
  } catch (error) {
    return asResponse(error);
  }
}
