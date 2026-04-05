"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, ArrowLeft } from "lucide-react";
import {
  clearAuthSession,
  getStoredAuthSession,
  isTokenExpired,
  resolvePostLoginPath,
} from "@/lib/client-auth";

type ForgotPasswordResponse = {
  success: boolean;
  data?: {
    accepted?: boolean;
  };
  error?: {
    message?: string;
  };
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as ForgotPasswordResponse;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? "Unable to process your request.");
      }

      setIsSent(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to process your request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-root {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #fff;
          font-family: sans-serif;
        }
        .auth-left {
          width: 544px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 40px 56px;
          overflow-y: auto;
        }
        .auth-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F0F7FB;
          overflow: hidden;
          height: 100vh;
        }
        .auth-right-text {
          flex-shrink: 0;
          padding: 60px 56px 28px 100px;
        }
        .auth-right-image-wrapper {
          flex: 1;
          min-height: 0;
          padding-left: 100px;
        }
        .auth-right-image-card {
          height: 100%;
          border-top: 3px solid black;
          border-left: 3px solid black;
          border-radius: 14px 0 0 0;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          background: #fff;
        }
        .auth-right-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
        }
        .auth-input:focus {
          border-color: #00A0E3 !important;
          box-shadow: 0 0 0 3px rgba(0,160,227,0.12);
        }
        .btn-primary {
          width: 100%;
          padding: 13px;
          background: #00A0E3;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: #0090CF; }
        .btn-primary[disabled] {
          background: #7FCEF1;
          cursor: not-allowed;
        }
        .btn-secondary {
          width: 100%;
          padding: 13px;
          background: #fff;
          border: 1px solid #EAECF0;
          border-radius: 8px;
          color: #171717;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          box-sizing: border-box;
        }
        .btn-secondary:hover { background: #F8FAFB; border-color: #C8D0DA; }

        @media (max-width: 1100px) {
          .auth-left { width: 420px; padding: 36px 40px; }
          .auth-right-text { padding: 48px 40px 24px 64px; }
          .auth-right-image-wrapper { padding-left: 64px; }
        }
        @media (max-width: 768px) {
          .auth-root { height: auto; min-height: 100vh; overflow: auto; }
          .auth-left { width: 100%; max-width: 520px; margin: 0 auto; padding: 36px 32px; overflow-y: visible; }
          .auth-right { display: none; }
        }
        @media (max-width: 480px) {
          .auth-left { padding: 28px 20px; }
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-left">
          <div style={{ marginBottom: "56px" }}>
            <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
              Forgot Password
            </h1>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6, maxWidth: "340px" }}>
              Enter your email address and we will send you a reset link.
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="auth-input"
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

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid #BAE0F5",
                background: "#EBF6FD",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#00A0E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                <Info width={15} height={15} color="#fff" strokeWidth={2.5} />
              </div>
              <p style={{ fontSize: "13px", color: "#525866", lineHeight: 1.6, margin: 0 }}>
                {isSent
                  ? "If an account exists, a reset link has been sent to your inbox. Please check your spam folder as well."
                  : "For security, we always return a successful response when requesting a reset link."}
              </p>
            </div>

            <button className="btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

            <Link href="/signin" className="btn-secondary">
              <ArrowLeft width={15} height={15} />
              Back to Login
            </Link>
          </form>
        </div>

        <div className="auth-right">
          <div className="auth-right-text">
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "12px", lineHeight: 1.2 }}>
              Lorem ipsum dolor sit
            </h2>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.7, maxWidth: "520px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
          <div className="auth-right-image-wrapper">
            <div className="auth-right-image-card">
              <img src="/images/signin.jpg" alt="Dashboard Preview" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
