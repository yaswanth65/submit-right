import { ok } from "@/lib/http";

export async function POST() {
  return ok({
    signedOut: true,
    message: "Client should delete the local bearer token for this device/session."
  });
}
