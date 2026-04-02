import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { fail } from "@/lib/http";

export async function parseJson<T>(req: NextRequest, schema?: ZodSchema<T>) {
  const body = await req.json();
  return schema ? schema.parse(body) : body;
}

export function asResponse(error: unknown) {
  if (error instanceof NextResponse) {
    return error;
  }

  if (error instanceof Error) {
    return fail(error.message, 400);
  }

  return fail("Unexpected server error", 500, error);
}
