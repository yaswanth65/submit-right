# API Integration Plan and Execution Report

## 1) API Inventory (Analysis)

### Auth Module
- POST /api/auth/signup
- POST /api/auth/signin
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- POST /api/auth/deactivate
- POST /api/auth/signout

### Shared Profile Module
- GET /api/profile
- PATCH /api/profile

### Client Module
- GET /api/client/home
- GET /api/client/overview
- GET /api/client/documents
- POST /api/client/documents
- POST /api/client/documents/upload
- POST /api/client/documents/submit
- POST /api/client/documents/service
- GET /api/client/notifications
- POST /api/client/notifications/read
- GET /api/client/messages
- POST /api/client/messages
- GET /api/client/payments
- POST /api/client/payments/create-order
- GET /api/client/tickets
- POST /api/client/tickets

### Editor Module
- GET /api/editor/dashboard
- GET /api/editor/documents
- GET /api/editor/documents/[id]
- POST /api/editor/documents/submit
- POST /api/editor/documents/request-extension
- GET /api/editor/completed
- GET /api/editor/notifications
- GET /api/editor/messages
- POST /api/editor/messages
- GET /api/editor/availability
- PATCH /api/editor/availability
- POST /api/editor/delete-account

### Admin Module
- GET /api/admin/dashboard
- GET /api/admin/clients
- GET /api/admin/clients/[id]
- POST /api/admin/clients/restrict
- POST /api/admin/clients/suspend
- GET /api/admin/editors
- GET /api/admin/editors/[id]
- POST /api/admin/editors/restrict
- POST /api/admin/editors/suspend
- PATCH /api/admin/editors/availability
- GET /api/admin/settings
- PATCH /api/admin/settings
- GET /api/admin/reports
- GET /api/admin/payments
- GET /api/admin/payments/[id]
- GET /api/admin/documents
- GET /api/admin/documents/[id]
- POST /api/admin/documents/assign
- PATCH /api/admin/documents/deadline
- POST /api/admin/documents/cancel
- GET /api/admin/tickets
- POST /api/admin/tickets/resolve

### Payments/System Module
- POST /api/payments/webhook
- POST /api/system/cleanup-drafts

---

## 2) Integration Strategy (Phase-Wise)

## Phase 1 - Low Risk, Read-Only GET Integration (Completed)
Goal:
- Connect high-traffic screens to safe GET APIs only.
- Keep write operations untouched.
- Ensure role-safe reads with existing JWT flow.

Implemented:
- Shared client API helper for authenticated reads:
  - lib/client-api.ts
- User screens:
  - app/user/overview/page.tsx -> GET /api/client/overview
  - app/user/documents/page.tsx -> GET /api/client/documents (search/status/sort)
  - app/user/notifications/page.tsx -> GET /api/client/notifications
  - app/user/payments/page.tsx -> GET /api/client/payments
- Editor screens:
  - app/editor/dashboard/page.tsx -> GET /api/editor/dashboard
  - app/editor/notifications/page.tsx -> GET /api/editor/notifications
- Admin screens:
  - app/admin/dashboard/page.tsx -> GET /api/admin/dashboard
- Shared component enhancement:
  - components/RevenueChart.tsx now accepts optional API data prop.

Validation:
- API smoke tests: 32/32 pass.
- Lint status: repository has pre-existing lint issues unrelated to this phase; changed phase-1 files compile cleanly.

---

## Phase 2 - Read Expansion (In Progress, Non-Payment)
Goal:
- Integrate remaining dashboard/list/detail GET endpoints for complete read coverage.

Completed in this phase:
- Admin:
  - /api/admin/reports -> app/admin/reports/page.tsx
  - /api/admin/documents -> app/admin/documents/page.tsx
  - /api/admin/documents/[id] -> app/admin/documents/[id]/page.tsx
  - /api/admin/clients -> app/admin/students/page.tsx
  - /api/admin/editors -> app/admin/editors/page.tsx
- Editor:
  - /api/editor/completed -> app/editor/completed/page.tsx
  - /api/editor/documents -> app/editor/assigned/page.tsx
  - /api/editor/messages -> app/editor/messages/page.tsx (read-only thread/conversation view)
  - /api/editor/availability -> app/editor/availability/page.tsx (read-only availability rendering)
- Client:
  - /api/client/messages -> app/user/chat/page.tsx (thread list metadata)
  - /api/client/tickets -> app/user/help/page.tsx

Planned endpoints/pages:
- Admin:
  - /api/admin/clients/[id], /api/admin/editors/[id]
- Editor:
  - /api/editor/documents/[id]
- Client:
  - /api/client/home

Manual follow-up needed (no API/schema changes were made):
- Full chat history UI requires a read endpoint that returns message timeline by conversation/document.
- Current GET /api/client/messages returns thread metadata only, so chat view is intentionally read-only.
- Admin student/editor list screens currently show placeholders for activity/spend/performance columns because those aggregates are not returned by current list endpoints.
- Editor assigned page detail pane is still static; list is now live from GET /api/editor/documents.
- Editor messages page uses current GET payload (receiver-side messages); full two-way conversation experience requires conversation metadata and sender/receiver profile expansion from backend read endpoint.
- Editor availability page is intentionally read-only in this phase; mutation wiring is deferred to write phase.
- Admin client/editor detail pages were not integrated in this pass because they include payment-centric sections and were skipped to honor the "no payment-related changes" constraint.

Exit criteria:
- All list/detail views use live API data.
- No page-level hardcoded operational data remains for covered routes.

---

## Phase 3 - Medium Risk Writes
Goal:
- Integrate controlled user-initiated POST/PATCH flows with optimistic-safe UX.

Planned writes:
- Client:
  - POST /api/client/notifications/read
  - POST /api/client/tickets
  - POST /api/client/messages
- Editor:
  - PATCH /api/editor/availability
  - POST /api/editor/messages
  - POST /api/editor/documents/request-extension
- Shared:
  - PATCH /api/profile

Guardrails:
- Strict validation before submit.
- Submit-state locking and retry-safe UX.
- Standardized error normalization from API error payload.

Exit criteria:
- Mutations wired with success/error toasts and refetch sync.
- No duplicate submissions.

---

## Phase 4 - High Risk Business Writes
Goal:
- Integrate core business transitions that change assignments, deadlines, and document lifecycle.

Planned writes:
- Client:
  - POST /api/client/documents
  - POST /api/client/documents/service
  - POST /api/client/documents/upload
  - POST /api/client/documents/submit
- Admin:
  - POST /api/admin/documents/assign
  - PATCH /api/admin/documents/deadline
  - POST /api/admin/documents/cancel
  - POST /api/admin/clients/restrict, /suspend
  - POST /api/admin/editors/restrict, /suspend
  - PATCH /api/admin/editors/availability
  - POST /api/admin/tickets/resolve

Guardrails:
- Confirm modals with explicit action intent.
- Idempotency keys where applicable.
- Audit log cross-check after critical actions.

Exit criteria:
- Assignment/deadline/cancellation flows fully functional from UI.
- RBAC tested for positive and negative paths.

---

## Phase 5 - Financial + System Operations
Goal:
- Complete payment and system-maintenance integration.

Planned:
- POST /api/client/payments/create-order
- POST /api/payments/webhook (server-side verification flow)
- POST /api/system/cleanup-drafts (ops/cron only)

Guardrails:
- Signature validation for webhook.
- Payment state reconciliation and retry handling.
- Separate operational runbook for cleanup endpoint.

Exit criteria:
- End-to-end payment lifecycle verified.
- Operational job documented and monitored.

---

## 3) What Was Integrated in This Execution

- Read-only API integration completed for 7 role-critical pages.
- Shared authenticated API helper introduced.
- Revenue chart made API-driven for admin dashboard.
- No seeding and no schema modifications.
- Existing API smoke suite re-run successfully (32 pass, 0 fail).
- Additional non-payment read integrations completed:
  - app/admin/reports/page.tsx
  - app/admin/documents/page.tsx
  - app/admin/documents/[id]/page.tsx
  - app/admin/students/page.tsx
  - app/admin/editors/page.tsx
  - app/editor/completed/page.tsx
  - app/editor/assigned/page.tsx
  - app/editor/messages/page.tsx
  - app/editor/availability/page.tsx
  - app/user/chat/page.tsx (thread list metadata only)
  - app/user/help/page.tsx

---

## 4) Recommended Next Execution Order

1. Phase 2 complete remaining non-payment read coverage first (documents detail and role detail pages).
2. Complete remaining non-payment read pages (admin/editor detail screens and /api/client/home).
3. Keep payments untouched unless explicitly requested.
4. Phase 3 safe writes (notifications/tickets/messages/profile).
5. Phase 4 high-impact workflows (document lifecycle/admin operations).
