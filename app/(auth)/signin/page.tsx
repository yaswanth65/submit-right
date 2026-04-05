"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {
  clearAuthSession,
  getStoredAuthSession,
  isTokenExpired,
  resolvePostLoginPath,
  resolveRoleHomePath,
  setAuthSession,
} from "@/lib/client-auth";

type SigninResponse = {
  success: boolean;
  data?: {
    token: string;
    user?: {
      role?: string;
      [key: string]: unknown;
    };
  };
  error?: {
    message?: string;
  };
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectParam = useMemo(() => searchParams.get("redirect"), [searchParams]);

  const resolveRedirectPath = (role?: string) => {
    const roleHome = resolveRoleHomePath(role);
    if (!redirectParam || !redirectParam.startsWith("/")) {
      return roleHome;
    }

    if (role === "admin" && redirectParam.startsWith("/admin")) {
      return redirectParam;
    }

    if (role === "editor" && redirectParam.startsWith("/editor")) {
      return redirectParam;
    }

    if (role !== "admin" && role !== "editor" && redirectParam.startsWith("/user")) {
      return redirectParam;
    }

    return roleHome;
  };

  useEffect(() => {
    const existingSession = getStoredAuthSession();
    if (!existingSession?.token) {
      return;
    }

    if (isTokenExpired(existingSession.token)) {
      clearAuthSession();
      return;
    }

    router.replace(resolvePostLoginPath(existingSession));
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const payload = (await response.json()) as SigninResponse;

      if (!response.ok || !payload.success || !payload.data?.token) {
        throw new Error(payload.error?.message ?? "Unable to sign in. Please try again.");
      }

      setAuthSession(
        {
          token: payload.data.token,
          user: payload.data.user,
        },
        { rememberMe }
      );

      router.replace(resolveRedirectPath(payload.data.user?.role));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .login-root {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #fff;
          font-family: sans-serif;
        }

        /* LEFT COLUMN */
        .login-left {
          width: 544px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 40px 56px;
          overflow-y: auto;
        }

        /* RIGHT COLUMN */
        .login-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F0F7FB;
          overflow: hidden;
          height: 100vh;
        }

        .login-right-text {
          flex-shrink: 0;
          padding: 60px 56px 28px 100px;
        }

        .login-right-image-wrapper {
          flex: 1;
          min-height: 0;
          padding-left: 100px;
        }

        .login-right-image-card {
          height: 100%;
          border-top: 3px solid black;
          border-left: 3px solid black;
          border-radius: 14px 0 0 0;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          background: #fff;
        }

        .login-right-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
        }

        /* ── TABLET: 768px–1100px ── */
        @media (max-width: 1100px) {
          .login-left {
            width: 420px;
            padding: 36px 40px;
          }
          .login-right-text {
            padding: 48px 40px 24px 64px;
          }
          .login-right-image-wrapper {
            padding-left: 64px;
          }
        }

        /* ── SMALL TABLET: hide right panel ── */
        @media (max-width: 768px) {
          .login-root {
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .login-left {
            width: 100%;
            max-width: 520px;
            margin: 0 auto;
            padding: 36px 32px;
            overflow-y: visible;
          }
          .login-right {
            display: none;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 480px) {
          .login-left {
            padding: 28px 20px;
          }
        }

        .login-input:focus {
          border-color: #00A0E3 !important;
          box-shadow: 0 0 0 3px rgba(0,160,227,0.12);
        }
      `}</style>

      <div className="login-root">

        {/* ===================== LEFT: FORM ===================== */}
        <div className="login-left">

          {/* Logo */}
          <div style={{ marginBottom: "56px" }}>
            <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6 }}>
              Sign in to access your documents.
            </p>
          </div>

          {errorMessage ? (
            <div
              style={{
                marginBottom: "14px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #FFD0D5",
                background: "#FFF4F6",
                color: "#B42318",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {errorMessage}
            </div>
          ) : null}

          {/* Fields */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="login-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                style={{
                  padding: "12px 16px", borderRadius: "8px", border: "1px solid #EAECF0",
                  fontSize: "14px", color: "#171717", outline: "none", background: "#fff",
                  transition: "border-color 0.15s, box-shadow 0.15s", width: "100%", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="login-input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  style={{
                    width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px",
                    border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none",
                    background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#B0BAC8",
                    display: "flex", alignItems: "center", padding: 0,
                  }}
                >
                  {showPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#00A0E3", cursor: "pointer" }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: "13px", color: "#171717", cursor: "pointer" }}>
                  Remember Me
                </label>
              </div>
              <Link
                href="/forgot-password"
                style={{ fontSize: "13px", color: "#8A94A6", textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%", padding: "13px",
                background: isSubmitting ? "#7FCEF1" : "#00A0E3",
                border: "none", borderRadius: "8px", color: "#fff",
                fontWeight: 600, fontSize: "14px",
                cursor: isSubmitting ? "not-allowed" : "pointer", marginTop: "4px",
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "#0090CF";
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "#00A0E3";
                }
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Sign Up link */}
          <div style={{ marginTop: "auto", paddingTop: "32px", textAlign: "center", fontSize: "13px", color: "#8A94A6" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#00A0E3", fontWeight: 600, textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>

        </div>

        {/* ===================== RIGHT: PANEL ===================== */}
        <div className="login-right">

          {/* Text block */}
          <div className="login-right-text">
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "12px", lineHeight: 1.2 }}>
              Lorem ipsum dolor sit
            </h2>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.7, maxWidth: "520px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>

          {/* Image block */}
          <div className="login-right-image-wrapper">
            <div className="login-right-image-card">
              <img src="/images/signin.jpg" alt="Dashboard Preview" />
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

function LoginFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "#525866",
        fontSize: "14px",
      }}
    >
      Loading sign in...
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}