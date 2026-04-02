import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { submitDocument } from "@/lib/services/document-service";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const { documentId } = (await req.json()) as { documentId: string };
    return ok(await submitDocument({ documentId, clientId: user.profileId }));
  } catch (error) {
    return asResponse(error);
  }
}
