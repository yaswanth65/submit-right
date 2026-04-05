"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearAuthSession,
  getSessionRole,
  getStoredAuthSession,
  isTokenExpired,
  resolveRoleHomePath,
} from "@/lib/client-auth";

export function UserAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const authStatus = useMemo(() => {
    const session = getStoredAuthSession();

    if (!session?.token) {
      return {
        isAllowed: false,
        redirectPath: `/signin?redirect=${encodeURIComponent(pathname)}`,
        shouldClearSession: false,
      };
    }

    if (isTokenExpired(session.token)) {
      return {
        isAllowed: false,
        redirectPath: `/signin?redirect=${encodeURIComponent(pathname)}`,
        shouldClearSession: true,
      };
    }

    const role = getSessionRole(session);
    if (role && role !== "client") {
      return {
        isAllowed: false,
        redirectPath: resolveRoleHomePath(role),
        shouldClearSession: false,
      };
    }

    return {
      isAllowed: true,
      redirectPath: null,
      shouldClearSession: false,
    };
  }, [pathname]);

  useEffect(() => {
    if (authStatus.shouldClearSession) {
      clearAuthSession();
    }

    if (!authStatus.isAllowed && authStatus.redirectPath) {
      router.replace(authStatus.redirectPath);
    }
  }, [authStatus, router]);

  if (!authStatus.isAllowed) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center text-[#525866] text-sm">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}
