import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { fail } from "@/lib/http";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase";
import type { UserRole } from "@/lib/types";

type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  profileId: string;
};

export async function getAuthUser(): Promise<AuthUser> {
  const authHeader = (await headers()).get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw fail("Missing bearer token", 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = jwt.verify(token, env.APP_JWT_SECRET) as {
    sub: string;
    email: string;
    role: UserRole;
    profileId: string;
  };

  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
    profileId: payload.profileId
  };
}

export async function requireRole(allowed: UserRole | UserRole[]) {
  const user = await getAuthUser();
  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];

  if (!allowedRoles.includes(user.role)) {
    throw fail("Forbidden", 403);
  }

  return user;
}

export function buildSessionToken(input: {
  userId: string;
  email: string;
  role: UserRole;
  profileId: string;
}) {
  return jwt.sign(
    {
      sub: input.userId,
      email: input.email,
      role: input.role,
      profileId: input.profileId
    },
    env.APP_JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function resolveProfileByAuthUserId(authUserId: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();

  if (error || !data) {
    throw fail("User profile not found", 404, error);
  }

  return data;
}
