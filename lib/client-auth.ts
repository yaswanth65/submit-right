export type AuthRole = "client" | "editor" | "admin" | string;

export interface StoredAuthUser {
  id?: string;
  profileId?: string;
  full_name?: string;
  email?: string;
  role?: AuthRole;
  [key: string]: unknown;
}

export interface AuthSession {
  token: string;
  user?: StoredAuthUser | null;
}

export interface SessionStorageOptions {
  rememberMe?: boolean;
}

const TOKEN_STORAGE_KEY = "submitright.auth.token";
const USER_STORAGE_KEY = "submitright.auth.user";
const TOKEN_COOKIE_NAME = "submitright_auth_token";
const REMEMBER_ME_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function isBrowser() {
  return typeof window !== "undefined";
}

function safeParseUser(raw: string | null): StoredAuthUser | undefined {
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as StoredAuthUser;
  } catch {
    return undefined;
  }
}

function decodeBase64Url(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  if (!isBrowser()) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payloadJson = decodeBase64Url(parts[1]);
    return JSON.parse(payloadJson) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getCookieToken() {
  if (!isBrowser()) {
    return undefined;
  }

  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.trim().split("=");
    if (name === TOKEN_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return undefined;
}

function setTokenCookie(token: string, rememberMe: boolean) {
  if (!isBrowser()) {
    return;
  }

  const maxAge = rememberMe ? `; Max-Age=${REMEMBER_ME_MAX_AGE_SECONDS}` : "";
  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${maxAge}`;
}

function clearTokenCookie() {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function setAuthSession(session: AuthSession, options: SessionStorageOptions = {}) {
  if (!isBrowser()) {
    return;
  }

  const rememberMe = Boolean(options.rememberMe);
  const serializedUser = session.user ? JSON.stringify(session.user) : "";

  if (rememberMe) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
    if (serializedUser) {
      window.localStorage.setItem(USER_STORAGE_KEY, serializedUser);
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    window.sessionStorage.removeItem(USER_STORAGE_KEY);
  } else {
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, session.token);
    if (serializedUser) {
      window.sessionStorage.setItem(USER_STORAGE_KEY, serializedUser);
    } else {
      window.sessionStorage.removeItem(USER_STORAGE_KEY);
    }
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }

  setTokenCookie(session.token, rememberMe);
}

export function getStoredToken() {
  if (!isBrowser()) {
    return undefined;
  }

  return (
    window.localStorage.getItem(TOKEN_STORAGE_KEY) ||
    window.sessionStorage.getItem(TOKEN_STORAGE_KEY) ||
    getCookieToken()
  ) ?? undefined;
}

export function getStoredUser() {
  if (!isBrowser()) {
    return undefined;
  }

  const fromLocal = safeParseUser(window.localStorage.getItem(USER_STORAGE_KEY));
  if (fromLocal) {
    return fromLocal;
  }

  return safeParseUser(window.sessionStorage.getItem(USER_STORAGE_KEY));
}

export function getStoredAuthSession(): AuthSession | null {
  const token = getStoredToken();
  if (!token) {
    return null;
  }

  const user = getStoredUser();
  return { token, user };
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USER_STORAGE_KEY);
  window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  window.sessionStorage.removeItem(USER_STORAGE_KEY);
  clearTokenCookie();
}

export function getSessionRole(session?: AuthSession | null): AuthRole | undefined {
  const resolvedSession = session ?? getStoredAuthSession();
  if (!resolvedSession) {
    return undefined;
  }

  const roleFromUser = resolvedSession.user?.role;
  if (typeof roleFromUser === "string" && roleFromUser.trim()) {
    return roleFromUser;
  }

  const payload = decodeJwtPayload(resolvedSession.token);
  const roleFromToken = payload?.role;
  return typeof roleFromToken === "string" && roleFromToken.trim()
    ? roleFromToken
    : undefined;
}

export function isTokenExpired(token: string) {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== "number") {
    return false;
  }

  return Date.now() >= exp * 1000;
}

export function resolveRoleHomePath(role?: AuthRole) {
  if (role === "admin") {
    return "/admin/dashboard";
  }

  if (role === "editor") {
    return "/editor/dashboard";
  }

  return "/user/dashboard";
}

export function resolvePostLoginPath(session?: AuthSession | null, fallbackPath = "/user/dashboard") {
  const role = getSessionRole(session);
  return role ? resolveRoleHomePath(role) : fallbackPath;
}

export function buildAuthHeaders(init?: HeadersInit) {
  const headers = new Headers(init);
  const token = getStoredToken();

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export async function signOutClient() {
  try {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // Ignore network failures and still clear local session.
  } finally {
    clearAuthSession();
  }
}
