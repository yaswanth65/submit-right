import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { serviceSelectionSchema } from "@/lib/validators";
import { selectDocumentService } from "@/lib/services/document-service";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, serviceSelectionSchema);
    return ok(
      await selectDocumentService({
        documentId: body.documentId,
        clientId: user.profileId,
        serviceId: body.serviceId
      })
    );
  } catch (error) {
    return asResponse(error);
  }
}
