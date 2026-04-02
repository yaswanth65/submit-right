import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { getAuthUser } from "@/lib/auth";
import { deactivateAccount } from "@/lib/services/auth-service";

export async function DELETE(_req: NextRequest) {
  try {
    const user = await getAuthUser();
    const result = await deactivateAccount({
      authUserId: user.id,
      profileId: user.profileId,
      email: user.email
    });
    return ok(result);
  } catch (error) {
    return asResponse(error);
  }
}
