import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { signinSchema } from "@/lib/validators";
import { signinUser } from "@/lib/services/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await parseJson(req, signinSchema);
    const result = await signinUser(body);
    return ok(result);
  } catch (error) {
    return asResponse(error);
  }
}
