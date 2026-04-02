create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('client', 'editor', 'admin');
  end if;
  if not exists (select 1 from pg_type where typname = 'document_status') then
    create type document_status as enum ('draft', 'submitted', 'being_edited', 'payment_needed', 'completed', 'in_revision', 'cancelled');
  end if;
  if not exists (select 1 from pg_type where typname = 'notification_type') then
    create type notification_type as enum ('message', 'payment', 'document_update', 'system');
  end if;
  if not exists (select 1 from pg_type where typname = 'availability_status') then
    create type availability_status as enum ('available', 'busy', 'at_capacity', 'vacation');
  end if;
end$$;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  role user_role not null,
  full_name text not null,
  email text not null unique,
  mobile_number text,
  country text,
  state text,
  years_of_experience integer,
  primary_language text,
  primary_expertise text,
  language_pairs text[] default '{}',
  account_status text not null default 'active',
  is_deleted boolean not null default false,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  category text not null,
  rate_per_word numeric(10, 4) not null,
  is_best boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id),
  assigned_editor_id uuid references profiles(id),
  document_title text not null,
  academic_field text not null,
  document_type text not null,
  short_description text not null,
  service_id uuid references services(id),
  uploaded_file_name text,
  uploaded_file_url text,
  uploaded_file_path text,
  latest_editor_file_name text,
  latest_editor_file_url text,
  latest_editor_file_path text,
  word_count integer not null default 0,
  rate_per_word numeric(10, 4),
  estimated_total numeric(12, 2),
  status document_status not null default 'draft',
  revision_requested boolean not null default false,
  revision_count integer not null default 0,
  payment_status text not null default 'pending',
  deadline_at timestamptz,
  submitted_at timestamptz,
  completed_at timestamptz,
  last_activity_at timestamptz not null default now(),
  draft_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists file_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  uploaded_by_profile_id uuid not null references profiles(id),
  version_type text not null,
  file_name text not null,
  file_url text not null,
  file_path text not null,
  file_size_bytes bigint not null,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  receiver_id uuid not null references profiles(id),
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  document_id uuid references documents(id) on delete cascade,
  type notification_type not null,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references profiles(id),
  subject text not null,
  category text not null,
  status text not null default 'open',
  message text not null,
  resolved_by uuid references profiles(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ticket_responses (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references support_tickets(id) on delete cascade,
  author_id uuid not null references profiles(id),
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists payment_transactions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id),
  client_id uuid not null references profiles(id),
  invoice_number text not null unique,
  razorpay_order_id text,
  razorpay_payment_id text,
  payment_reference_number text,
  gateway_status text,
  payment_method text,
  currency text not null default 'INR',
  amount numeric(12, 2) not null,
  status text not null default 'pending',
  breakdown jsonb not null default '{}'::jsonb,
  event_timeline jsonb not null default '[]'::jsonb,
  processing_time_ms integer,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  target_user_id uuid references profiles(id),
  document_id uuid references documents(id),
  action text not null,
  notes text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists app_settings (
  id uuid primary key default gen_random_uuid(),
  support_email text not null,
  default_timezone text not null,
  default_currency text not null default 'INR',
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

create table if not exists editor_availability (
  id uuid primary key default gen_random_uuid(),
  editor_id uuid not null unique references profiles(id) on delete cascade,
  availability_status availability_status not null default 'available',
  maximum_active_assignments integer not null default 5,
  maximum_word_count_per_day integer,
  vacation_start_date timestamptz,
  vacation_end_date timestamptz,
  admin_notes text,
  updated_at timestamptz not null default now()
);

insert into app_settings (support_email, default_timezone, default_currency)
select 'support@submitright.com', 'Asia/Kolkata', 'INR'
where not exists (select 1 from app_settings);

insert into services (slug, title, description, category, rate_per_word, is_best)
values
  ('editing-basic', 'Basic Editing', 'Grammar and clarity improvements', 'best', 2.50, true),
  ('journal-formatting', 'Journal Formatting', 'Publication-ready formatting package', 'publication_support_packages', 3.20, false),
  ('plagiarism-check', 'Plagiarism Check', 'Similarity screening with report', 'other', 1.25, false)
on conflict (slug) do nothing;
