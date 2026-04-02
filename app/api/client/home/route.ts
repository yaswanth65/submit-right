import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { getClientHome } from "@/lib/services/query-service";

export async function GET() {
  try {
    const user = await requireRole("client");
    return ok(await getClientHome(user.profileId));
  } catch (error) {
    return asResponse(error);
  }
}
