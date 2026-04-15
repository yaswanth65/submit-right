#!/usr/bin/env node

const DEFAULT_USERS = [
  {
    role: "admin",
    fullName: "Submit Right Admin",
    email: process.env.SMOKE_ADMIN_EMAIL || "admin@submitright.com",
    password: process.env.SMOKE_ADMIN_PASSWORD || "MeAdmin/SubRight@321"
  },
  {
    role: "editor",
    fullName: "Aarav Kulkarni",
    email: process.env.SMOKE_EDITOR_EMAIL || "editor1@submitright.com",
    password: process.env.SMOKE_EDITOR_PASSWORD || "Editor@12345"
  },
  {
    role: "client",
    fullName: "Priya Patel",
    email: process.env.SMOKE_CLIENT_EMAIL || "student1@submitright.com",
    password: process.env.SMOKE_CLIENT_PASSWORD || "Student@12345"
  }
];

const BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const START_TIME = Date.now();

const results = [];
const tokensByRole = {};

function safeJsonParse(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

function toUrl(path) {
  const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function runCase({
  name,
  method,
  path,
  token,
  body,
  expectedStatus,
  expectSuccess,
  timeoutMs = 20000,
}) {
  const url = toUrl(path);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const headers = { Accept: "application/json" };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const result = {
    name,
    method,
    path,
    expectedStatus,
    expectSuccess,
    passed: false,
    status: null,
    success: null,
    durationMs: 0,
    error: null,
  };

  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const rawText = await response.text();
    const payload = safeJsonParse(rawText);
    const successFlag = payload && typeof payload.success === "boolean" ? payload.success : null;

    result.status = response.status;
    result.success = successFlag;

    const statusOk = expectedStatus ? response.status === expectedStatus : response.ok;
    const successOk =
      typeof expectSuccess === "boolean"
        ? successFlag === expectSuccess
        : response.ok;

    result.passed = statusOk && successOk;

    if (!result.passed) {
      result.error = {
        message: `Unexpected response for ${method} ${path}`,
        responseBody: payload ?? rawText,
      };
    }

    result.payload = payload ?? rawText;
  } catch (error) {
    result.error = {
      message: error instanceof Error ? error.message : "Unknown request failure",
    };
  } finally {
    clearTimeout(timeout);
    result.durationMs = Date.now() - startedAt;
    results.push(result);
  }

  const statusLabel = result.status === null ? "ERR" : String(result.status);
  const mark = result.passed ? "PASS" : "FAIL";
  console.log(`[${mark}] ${name} -> ${statusLabel} (${result.durationMs}ms)`);

  return result;
}

async function signin(role, email, password) {
  const signinResult = await runCase({
    name: `Auth sign-in (${role})`,
    method: "POST",
    path: "/api/auth/signin",
    body: { email, password },
    expectedStatus: 200,
    expectSuccess: true,
  });

  const token = signinResult.payload?.data?.token;
  if (signinResult.passed && typeof token === "string" && token.length > 0) {
    tokensByRole[role] = token;
  }

  return signinResult;
}

async function run() {
  console.log(`Base URL: ${BASE_URL}`);
  console.log("Running non-seeding API smoke tests...\n");

  await runCase({
    name: "Unauthorized profile without token",
    method: "GET",
    path: "/api/profile",
    expectedStatus: 401,
    expectSuccess: false,
  });

  for (const user of DEFAULT_USERS) {
    await signin(user.role, user.email, user.password);
  }

  await runCase({
    name: "Auth signout endpoint",
    method: "POST",
    path: "/api/auth/signout",
    expectedStatus: 200,
    expectSuccess: true,
  });

  await runCase({
    name: "Forgot password endpoint",
    method: "POST",
    path: "/api/auth/forgot-password",
    body: { email: DEFAULT_USERS.find((u) => u.role === "client")?.email || "student1@submitright.com" },
    expectedStatus: 200,
    expectSuccess: true,
  });

  await runCase({
    name: "Reset password invalid token",
    method: "POST",
    path: "/api/auth/reset-password",
    body: {
      token: "invalid-token",
      newPassword: "TestPass@12345",
      confirmPassword: "TestPass@12345",
    },
    expectedStatus: 400,
    expectSuccess: false,
  });

  if (tokensByRole.client) {
    await runCase({
      name: "Client profile",
      method: "GET",
      path: "/api/profile",
      token: tokensByRole.client,
      expectedStatus: 200,
      expectSuccess: true,
    });

    for (const [name, path] of [
      ["Client home", "/api/client/home"],
      ["Client overview", "/api/client/overview"],
      ["Client documents", "/api/client/documents"],
      ["Client messages", "/api/client/messages"],
      ["Client notifications", "/api/client/notifications"],
      ["Client payments", "/api/client/payments"],
      ["Client tickets", "/api/client/tickets"],
    ]) {
      await runCase({
        name,
        method: "GET",
        path,
        token: tokensByRole.client,
        expectedStatus: 200,
        expectSuccess: true,
      });
    }

    await runCase({
      name: "Client create draft document",
      method: "POST",
      path: "/api/client/documents",
      token: tokensByRole.client,
      expectedStatus: 201,
      expectSuccess: true,
      body: {
        documentTitle: `Smoke Test Draft ${new Date().toISOString()}`,
        academicField: "Computer Science",
        documentType: "Research Paper",
        shortDescription: "Automated smoke test for draft creation endpoint."
      }
    });
  }

  if (tokensByRole.editor) {
    await runCase({
      name: "Editor profile",
      method: "GET",
      path: "/api/profile",
      token: tokensByRole.editor,
      expectedStatus: 200,
      expectSuccess: true,
    });

    for (const [name, path] of [
      ["Editor dashboard", "/api/editor/dashboard"],
      ["Editor documents", "/api/editor/documents"],
      ["Editor completed", "/api/editor/completed"],
      ["Editor notifications", "/api/editor/notifications"],
      ["Editor messages", "/api/editor/messages"],
      ["Editor availability", "/api/editor/availability"],
    ]) {
      await runCase({
        name,
        method: "GET",
        path,
        token: tokensByRole.editor,
        expectedStatus: 200,
        expectSuccess: true,
      });
    }
  }

  if (tokensByRole.admin) {
    await runCase({
      name: "Admin profile",
      method: "GET",
      path: "/api/profile",
      token: tokensByRole.admin,
      expectedStatus: 200,
      expectSuccess: true,
    });

    for (const [name, path] of [
      ["Admin dashboard", "/api/admin/dashboard"],
      ["Admin clients", "/api/admin/clients"],
      ["Admin editors", "/api/admin/editors"],
      ["Admin settings", "/api/admin/settings"],
      ["Admin reports", "/api/admin/reports"],
      ["Admin payments", "/api/admin/payments"],
      ["Admin documents", "/api/admin/documents"],
      ["Admin tickets", "/api/admin/tickets"],
    ]) {
      await runCase({
        name,
        method: "GET",
        path,
        token: tokensByRole.admin,
        expectedStatus: 200,
        expectSuccess: true,
      });
    }
  }

  if (tokensByRole.client) {
    await runCase({
      name: "Role guard: client hitting admin endpoint",
      method: "GET",
      path: "/api/admin/dashboard",
      token: tokensByRole.client,
      expectedStatus: 403,
      expectSuccess: false,
    });
  }

  if (tokensByRole.editor) {
    await runCase({
      name: "Role guard: editor hitting client endpoint",
      method: "GET",
      path: "/api/client/home",
      token: tokensByRole.editor,
      expectedStatus: 403,
      expectSuccess: false,
    });
  }

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;
  const totalMs = Date.now() - START_TIME;

  console.log("\n--- API Smoke Test Summary ---");
  console.log(`Total: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Duration: ${totalMs}ms`);

  if (failed > 0) {
    console.log("\nFailed cases:");
    for (const item of results.filter((r) => !r.passed)) {
      console.log(`- ${item.name} [${item.method} ${item.path}]`);
      if (item.error?.message) {
        console.log(`  Reason: ${item.error.message}`);
      }
      if (item.error?.responseBody) {
        const text = JSON.stringify(item.error.responseBody);
        console.log(`  Body: ${text.slice(0, 450)}${text.length > 450 ? "..." : ""}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  process.exitCode = 0;
}

run().catch((error) => {
  console.error("API smoke test runner crashed:", error);
  process.exitCode = 1;
});
