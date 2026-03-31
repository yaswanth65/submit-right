import { NextRequest } from "next/server";
import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { uploadClientDocument } from "@/lib/services/document-service";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const formData = await req.formData();
    const documentId = String(formData.get("documentId") ?? "");
    const file = formData.get("file");

    if (!documentId || !(file instanceof File)) {
      return fail("documentId and file are required");
    }

    return ok(
      await uploadClientDocument({
        documentId,
        clientId: user.profileId,
        file
      })
    );
  } catch (error) {
    return asResponse(error);
  }
}
