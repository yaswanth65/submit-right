"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import {
  clearAuthSession,
  getStoredAuthSession,
  isTokenExpired,
  resolvePostLoginPath,
  resolveRoleHomePath,
  setAuthSession,
} from "@/lib/client-auth";

type SignupResponse = {
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

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
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

    if (!agreementChecked) {
      setErrorMessage("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const payload = (await response.json()) as SignupResponse;

      if (!response.ok || !payload.success || !payload.data?.token) {
        throw new Error(payload.error?.message ?? "Unable to create account. Please try again.");
      }

      setAuthSession(
        {
          token: payload.data.token,
          user: payload.data.user,
        },
        { rememberMe: true }
      );

      router.replace(resolveRedirectPath(payload.data.user?.role));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to create account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-root {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #fff;
          font-family: sans-serif;
        }

        .signup-left {
          width: 544px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 40px 56px;
          overflow-y: auto;
        }

        .signup-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F0F7FB;
          overflow: hidden;
          height: 100vh;
        }

        .signup-right-text {
          flex-shrink: 0;
          padding: 60px 56px 28px 100px;
        }

        .signup-right-image-wrapper {
          flex: 1;
          min-height: 0;
          padding-left: 100px;
        }

        .signup-right-image-card {
          height: 100%;
          border-top: 3px solid black;
          border-left: 3px solid black;
          border-radius: 14px 0 0 0;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          background: #fff;
        }

        .signup-right-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
        }

        @media (max-width: 1100px) {
          .signup-left {
            width: 420px;
            padding: 36px 40px;
          }
          .signup-right-text {
            padding: 48px 40px 24px 64px;
          }
          .signup-right-image-wrapper {
            padding-left: 64px;
          }
        }

        @media (max-width: 768px) {
          .signup-root {
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .signup-left {
            width: 100%;
            max-width: 520px;
            margin: 0 auto;
            padding: 36px 32px;
            overflow-y: visible;
          }
          .signup-right {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .signup-left {
            padding: 28px 20px;
          }
        }

        .signup-input:focus {
          border-color: #00A0E3 !important;
          box-shadow: 0 0 0 3px rgba(0,160,227,0.12);
        }
      `}</style>

      <div className="signup-root">
        <div className="signup-left">
          <div style={{ marginBottom: "48px" }}>
            <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
              Create Account
            </h1>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6 }}>
              Sign up to submit and manage your documents.
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="signup-input"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #EAECF0",
                  fontSize: "14px",
                  color: "#171717",
                  outline: "none",
                  background: "#fff",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="signup-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #EAECF0",
                  fontSize: "14px",
                  color: "#171717",
                  outline: "none",
                  background: "#fff",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="signup-input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                    fontSize: "14px",
                    color: "#171717",
                    outline: "none",
                    background: "#fff",
                    boxSizing: "border-box",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#B0BAC8",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  {showPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "-4px" }}>
              {[
                { label: "Minimum 8 characters", met: hasMinLength },
                { label: "At least one uppercase letter", met: hasUppercase },
                { label: "At least one number", met: hasNumber },
              ].map(({ label, met }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle2
                    width={15}
                    height={15}
                    strokeWidth={2}
                    style={{ color: met ? "#00A0E3" : "#C0C7D0", flexShrink: 0 }}
                  />
                  <span style={{ fontSize: "12px", color: met ? "#525866" : "#8A94A6" }}>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  className="signup-input"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                    fontSize: "14px",
                    color: "#171717",
                    outline: "none",
                    background: "#fff",
                    boxSizing: "border-box",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#B0BAC8",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  {showConfirmPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
              <input
                type="checkbox"
                id="agreement"
                checked={agreementChecked}
                onChange={(event) => setAgreementChecked(event.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  marginTop: "2px",
                  flexShrink: 0,
                  accentColor: "#00A0E3",
                  cursor: "pointer",
                }}
              />
              <label htmlFor="agreement" style={{ fontSize: "13px", color: "#171717", cursor: "pointer", lineHeight: 1.6 }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "#00A0E3", fontWeight: 500, textDecoration: "none" }}>
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy-policy" style={{ color: "#00A0E3", fontWeight: 500, textDecoration: "none" }}>
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreementChecked || isSubmitting}
              style={{
                width: "100%",
                padding: "13px",
                background: !agreementChecked || isSubmitting ? "#7FCEF1" : "#00A0E3",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 600,
                fontSize: "14px",
                cursor: !agreementChecked || isSubmitting ? "not-allowed" : "pointer",
                marginTop: "4px",
                transition: "background 0.15s",
              }}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={{ marginTop: "auto", paddingTop: "32px", textAlign: "center", fontSize: "13px", color: "#8A94A6" }}>
            Already have an account?{" "}
            <Link href="/signin" style={{ color: "#00A0E3", fontWeight: 600, textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </div>

        <div className="signup-right">
          <div className="signup-right-text">
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "12px", lineHeight: 1.2 }}>
              Lorem ipsum dolor sit
            </h2>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.7, maxWidth: "520px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>

          <div className="signup-right-image-wrapper">
            <div className="signup-right-image-card">
              <img src="/images/signin.jpg" alt="Dashboard Preview" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SignUpFallback() {
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
      Loading sign up...
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <SignUpContent />
    </Suspense>
  );
}
