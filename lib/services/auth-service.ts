import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/email";
import { fail } from "@/lib/http";
import { supabaseAdmin, supabaseAnon } from "@/lib/supabase";
import { buildSessionToken } from "@/lib/auth";

export async function signupClient(input: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data: existing } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", input.email)
    .maybeSingle();

  if (existing) {
    throw fail("Email already registered", 409);
  }

  const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      full_name: input.fullName,
      role: "client"
    }
  });

  if (createError || !createdUser.user) {
    throw fail("Unable to create user", 500, createError);
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      auth_user_id: createdUser.user.id,
      role: "client",
      full_name: input.fullName,
      email: input.email
    })
    .select("*")
    .single();

  if (profileError || !profile) {
    throw fail("Unable to create profile", 500, profileError);
  }

  return {
    user: profile,
    token: buildSessionToken({
      userId: createdUser.user.id,
      email: input.email,
      role: "client",
      profileId: profile.id
    })
  };
}

export async function signinUser(input: { email: string; password: string }) {
  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email: input.email,
    password: input.password
  });

  if (error || !data.user) {
    throw fail("Invalid email or password", 401, error);
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("auth_user_id", data.user.id)
    .single();

  if (profileError || !profile) {
    throw fail("Profile not found", 404, profileError);
  }

  if (profile.account_status !== "active") {
    throw fail(`Account is ${profile.account_status}`, 403);
  }

  return {
    user: profile,
    token: buildSessionToken({
      userId: data.user.id,
      email: profile.email,
      role: profile.role,
      profileId: profile.id
    })
  };
}

export async function createPasswordReset(email: string) {
  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw fail("Unable to process request", 500, error);
  }

  if (!profile) {
    return { accepted: true };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error: insertError } = await supabaseAdmin.from("password_reset_tokens").insert({
    profile_id: profile.id,
    token_hash: tokenHash,
    expires_at: expiresAt
  });

  if (insertError) {
    throw fail("Unable to create reset token", 500, insertError);
  }

  const jwtToken = jwt.sign(
    { token: rawToken, profileId: profile.id, email: profile.email },
    env.PASSWORD_RESET_JWT_SECRET,
    { expiresIn: "10m" }
  );

  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${jwtToken}`;

  await sendEmail({
    to: profile.email,
    subject: "Reset your Submit Right password",
    html: `<p>Reset your password using this link. It expires in 10 minutes.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  });

  return { accepted: true };
}

export async function resetPassword(input: { token: string; newPassword: string }) {
  const payload = jwt.verify(input.token, env.PASSWORD_RESET_JWT_SECRET) as {
    token: string;
    profileId: string;
    email: string;
  };
  const tokenHash = crypto.createHash("sha256").update(payload.token).digest("hex");

  const { data: resetRow, error } = await supabaseAdmin
    .from("password_reset_tokens")
    .select("*")
    .eq("profile_id", payload.profileId)
    .eq("token_hash", tokenHash)
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !resetRow) {
    throw fail("Reset token is invalid or expired", 400, error);
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", payload.profileId)
    .single();

  if (profileError || !profile?.auth_user_id) {
    throw fail("Profile not found", 404, profileError);
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    profile.auth_user_id,
    { password: input.newPassword }
  );

  if (updateError) {
    throw fail("Unable to update password", 500, updateError);
  }

  await supabaseAdmin
    .from("password_reset_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", resetRow.id);

  return { success: true };
}

export async function deactivateAccount(input: {
  authUserId: string;
  profileId: string;
  email: string;
}) {
  await supabaseAdmin.from("profiles").update({
    account_status: "deactivated",
    is_deleted: true,
    deleted_at: new Date().toISOString(),
    email: `deleted+${input.profileId}@submitright.local`,
    full_name: "Deleted User"
  }).eq("id", input.profileId);

  await supabaseAdmin.auth.admin.deleteUser(input.authUserId);

  return { deactivated: true };
}
