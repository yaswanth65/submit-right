import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { resetPasswordSchema } from "@/lib/validators";
import { resetPassword } from "@/lib/services/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await parseJson(req, resetPasswordSchema);
    const result = await resetPassword({
      token: body.token,
      newPassword: body.newPassword
    });
    return ok(result);
  } catch (error) {
    return asResponse(error);
  }
}
