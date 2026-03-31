import { NextRequest } from "next/server";
import { created } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { signupSchema } from "@/lib/validators";
import { signupClient } from "@/lib/services/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await parseJson(req, signupSchema);
    const result = await signupClient({
      fullName: body.fullName,
      email: body.email,
      password: body.password
    });
    return created(result);
  } catch (error) {
    return asResponse(error);
  }
}
