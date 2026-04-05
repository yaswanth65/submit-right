import { buildAuthHeaders } from "@/lib/client-auth";

type ApiErrorBody = {
  message?: string;
};

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: ApiErrorBody;
};

export async function apiRequest<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    headers: buildAuthHeaders(init.headers)
  });

  const payload = (await response
    .json()
    .catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error?.message || `Request failed with status ${response.status}`);
  }

  return payload.data as T;
}

export function apiGet<T>(path: string, init: RequestInit = {}) {
  return apiRequest<T>(path, { ...init, method: "GET" });
}