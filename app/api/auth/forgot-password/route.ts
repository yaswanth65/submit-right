import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { forgotPasswordSchema } from "@/lib/validators";
import { createPasswordReset } from "@/lib/services/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await parseJson(req, forgotPasswordSchema);
    const result = await createPasswordReset(body.email);
    return ok(result);
  } catch (error) {
    return asResponse(error);
  }
}
