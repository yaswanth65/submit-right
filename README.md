# Submit Right Backend

Backend-first Next.js API scaffold for a document submission platform with:

- `Next.js` App Router API handlers
- `Supabase` for auth, database, and storage
- `Razorpay` for payment order creation and webhook settlement
- role-based flows for `client`, `editor`, and `admin`

## What is included

- Client auth APIs: signup, signin, forgot password, reset password, signout, deactivate
- Client APIs: home, overview, documents, submit flow, messages, payments, notifications, tickets, profile
- Editor APIs: dashboard, documents, document detail, extension request, submission upload, completed docs, notifications, messages, availability, delete account
- Admin APIs: dashboard, clients, editors, restrictions, suspensions, availability updates, settings, reports, payments, documents, ticket resolution
- Payment webhook for Razorpay `payment.captured`
- Supabase SQL schema for users, documents, file versions, tickets, messages, notifications, settings, payments, availability, audit logs

## Project structure

- `app/api/...` route handlers
- `lib/...` shared auth, env, files, validation, Razorpay, Supabase helpers
- `lib/services/...` business logic
- `supabase/schema.sql` database schema and starter services

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env file:

```bash
cp .env.example .env.local
```

3. Fill these values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `PASSWORD_RESET_JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_APP_URL`

4. Run `supabase/schema.sql` in your Supabase SQL editor.

5. Create a public or signed storage bucket matching `SUPABASE_STORAGE_BUCKET`.

6. Start the app:

```bash
npm run dev
```

## Auth model

- Client signup is allowed through `POST /api/auth/signup`
- Editor and admin accounts should be created by your internal team in Supabase Auth and then inserted into `profiles`
- Session auth uses a backend-issued bearer token returned from signin/signup
- Password reset tokens expire after 10 minutes

## Main API map

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/signout`
- `DELETE /api/auth/deactivate`

### Shared

- `GET /api/profile`
- `PATCH /api/profile`

### Client

- `GET /api/client/home`
- `GET /api/client/overview`
- `GET /api/client/documents`
- `GET /api/client/documents/:documentId`
- `POST /api/client/documents`
- `POST /api/client/documents/upload` multipart: `documentId`, `file`
- `POST /api/client/documents/service`
- `POST /api/client/documents/submit`
- `GET /api/client/messages`
- `POST /api/client/messages`
- `GET /api/client/payments`
- `POST /api/client/payments/create-order`
- `GET /api/client/notifications`
- `POST /api/client/notifications/read`
- `GET /api/client/tickets`
- `POST /api/client/tickets`

### Editor

- `GET /api/editor/dashboard`
- `GET /api/editor/documents`
- `GET /api/editor/documents/:id`
- `POST /api/editor/documents/submit` multipart: `documentId`, `file`
- `POST /api/editor/documents/request-extension`
- `GET /api/editor/completed`
- `GET /api/editor/notifications`
- `GET /api/editor/messages`
- `POST /api/editor/messages`
- `GET /api/editor/availability`
- `PATCH /api/editor/availability`
- `DELETE /api/editor/delete-account`

### Admin

- `GET /api/admin/dashboard`
- `GET /api/admin/clients`
- `GET /api/admin/clients/:id`
- `POST /api/admin/clients/restrict`
- `POST /api/admin/clients/suspend`
- `GET /api/admin/editors`
- `GET /api/admin/editors/:id`
- `POST /api/admin/editors/restrict`
- `POST /api/admin/editors/suspend`
- `PATCH /api/admin/editors/availability?editorId=...`
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`
- `GET /api/admin/reports`
- `GET /api/admin/payments`
- `GET /api/admin/payments/:id`
- `GET /api/admin/documents`
- `GET /api/admin/documents/:id`
- `POST /api/admin/documents/assign`
- `PATCH /api/admin/documents/deadline`
- `POST /api/admin/documents/cancel`
- `GET /api/admin/tickets`
- `POST /api/admin/tickets/resolve`

### System

- `POST /api/payments/webhook`
- `POST /api/system/cleanup-drafts`

## Notes

- `documents` and `assignments` are modeled as one record, as requested. Assignment state lives directly on the `documents` table through `assigned_editor_id`, `status`, and `deadline_at`.
- Draft submissions expire after 2 hours. Run `POST /api/system/cleanup-drafts` from a cron job.
- DOC, DOCX, and PDF uploads are supported up to 25 MB.
- Word count is stored as a number only. Extracted text is not persisted.
- The email sender is a placeholder in `lib/email.ts`. Replace it with Resend, SMTP, or another provider before production.
- Some analytics fields currently return `0` placeholders where exact business rules were not fully specified, such as turnaround averages and revision percentages.

## Recommended next steps

1. Connect your existing frontend to these route paths.
2. Replace `lib/email.ts` with your real email provider.
3. Add Supabase Row Level Security policies if you want direct frontend-to-Supabase reads later.
4. Add automated tests around auth, upload parsing, and payment settlement.
