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
  if not exists (select 1 from pg_type where typname = 'catalog_item_kind') then
    create type catalog_item_kind as enum ('service', 'package', 'domain');
  end if;
  if not exists (select 1 from pg_type where typname = 'discount_campaign_type') then
    create type discount_campaign_type as enum ('discount', 'rupee_discount', 'sale_price', 'buy_x_get_y');
  end if;
  if exists (select 1 from pg_type where typname = 'discount_campaign_type') then
    alter type discount_campaign_type add value if not exists 'rupee_discount';
  end if;
  if not exists (select 1 from pg_type where typname = 'discount_apply_to') then
    create type discount_apply_to as enum (
      'all_services',
      'all_packages',
      'all_domains',
      'specific_service',
      'specific_package',
      'specific_domain'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'blog_status') then
    create type blog_status as enum ('draft', 'published', 'archived');
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
  kind catalog_item_kind not null default 'service',
  domain_type text,
  rate_per_word numeric(10, 4) not null,
  base_price numeric(12, 2),
  page_sections jsonb not null default '[]'::jsonb,
  is_best boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists services
  add column if not exists kind catalog_item_kind not null default 'service';

alter table if exists services
  add column if not exists domain_type text;

alter table if exists services
  add column if not exists base_price numeric(12, 2);

alter table if exists services
  add column if not exists page_sections jsonb not null default '[]'::jsonb;

alter table if exists services
  add column if not exists sort_order integer not null default 0;

alter table if exists services
  add column if not exists updated_at timestamptz not null default now();

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

create table if not exists discount_campaigns (
  id uuid primary key default gen_random_uuid(),
  coupon_code text not null unique,
  coupon_name text not null,
  coupon_type discount_campaign_type not null,
  apply_to discount_apply_to not null,
  target_item_id uuid references services(id),
  discount_value numeric(12, 2),
  sale_price numeric(12, 2),
  buy_quantity integer,
  get_quantity integer,
  start_date timestamptz not null,
  end_date timestamptz,
  limit_total_uses integer,
  limit_per_customer integer,
  current_usage_count integer not null default 0,
  is_active boolean not null default true,
  description text,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists discount_redemptions (
  id uuid primary key default gen_random_uuid(),
  discount_campaign_id uuid not null references discount_campaigns(id) on delete cascade,
  document_id uuid not null references documents(id) on delete cascade,
  client_id uuid not null references profiles(id) on delete cascade,
  discount_amount numeric(12, 2) not null default 0,
  redeemed_at timestamptz not null default now(),
  unique (discount_campaign_id, document_id)
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  author_name text not null,
  cover_image_url text,
  introduction text not null,
  sections jsonb not null default '[]'::jsonb,
  conclusion text,
  related_service_slugs text[] not null default '{}',
  status blog_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
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

insert into services (slug, title, description, category, kind, domain_type, rate_per_word, base_price, is_best, sort_order)
values
  ('editing-domain', 'Editing', 'Editing domain for document refinement workflows', 'best', 'domain', 'Editing', 0.00, null, true, 1),
  ('proofreading-domain', 'Proofreading', 'Proofreading domain for language-level quality checks', 'other', 'domain', 'Proofreading', 0.00, null, false, 2),
  ('translation-domain', 'Translation', 'Translation domain for multilingual content support', 'other', 'domain', 'Translation', 0.00, null, false, 3),
  ('publication-support-domain', 'Publication Support', 'Publication support domain for journal-ready services', 'publication_support_packages', 'domain', 'Publication Support', 0.00, null, false, 4),
  ('editing-basic', 'Basic Editing', 'Grammar and clarity improvements', 'best', 'service', 'Editing', 2.50, null, true, 10),
  ('advanced-editing', 'Advanced Editing', 'Structure, tone, and clarity improvements', 'best', 'service', 'Editing', 3.25, null, false, 11),
  ('proofreading-basic', 'Basic Proofreading', 'Spelling, grammar, and punctuation correction', 'other', 'service', 'Proofreading', 1.85, null, false, 12),
  ('translation-en-es', 'Translation EN -> ES', 'Professional English to Spanish translation', 'other', 'service', 'Translation', 4.20, null, false, 13),
  ('essential-support', 'Essential Support', 'Publication-ready support bundle', 'publication_support_packages', 'package', 'Editing', 0.00, 25800.00, false, 20),
  ('advanced-support', 'Advanced Support', 'Expanded support bundle with added review steps', 'publication_support_packages', 'package', 'Editing', 0.00, 35800.00, false, 21),
  ('comprehensive-support', 'Comprehensive Support', 'Premium bundle with the widest coverage', 'publication_support_packages', 'package', 'Editing', 0.00, 45800.00, false, 22),
  ('plagiarism-check', 'Plagiarism Check', 'Similarity screening with report', 'other', 'service', 'Publication Support', 1.25, null, false, 30)
on conflict (slug) do nothing;

update services set kind = 'domain', domain_type = 'Editing', rate_per_word = 0.00, base_price = null, sort_order = 1 where slug = 'editing-domain';
update services set kind = 'domain', domain_type = 'Proofreading', rate_per_word = 0.00, base_price = null, sort_order = 2 where slug = 'proofreading-domain';
update services set kind = 'domain', domain_type = 'Translation', rate_per_word = 0.00, base_price = null, sort_order = 3 where slug = 'translation-domain';
update services set kind = 'domain', domain_type = 'Publication Support', rate_per_word = 0.00, base_price = null, sort_order = 4 where slug = 'publication-support-domain';
update services set kind = 'service', domain_type = 'Editing', rate_per_word = 2.50, base_price = null, sort_order = 10 where slug = 'editing-basic';
update services set kind = 'service', domain_type = 'Editing', rate_per_word = 3.25, base_price = null, sort_order = 11 where slug = 'advanced-editing';
update services set kind = 'service', domain_type = 'Proofreading', rate_per_word = 1.85, base_price = null, sort_order = 12 where slug = 'proofreading-basic';
update services set kind = 'service', domain_type = 'Translation', rate_per_word = 4.20, base_price = null, sort_order = 13 where slug = 'translation-en-es';
update services set kind = 'package', domain_type = 'Editing', rate_per_word = 0.00, base_price = 25800.00, sort_order = 20 where slug = 'essential-support';
update services set kind = 'package', domain_type = 'Editing', rate_per_word = 0.00, base_price = 35800.00, sort_order = 21 where slug = 'advanced-support';
update services set kind = 'package', domain_type = 'Editing', rate_per_word = 0.00, base_price = 45800.00, sort_order = 22 where slug = 'comprehensive-support';
update services set kind = 'service', domain_type = 'Publication Support', rate_per_word = 1.25, base_price = null, sort_order = 30 where slug = 'plagiarism-check';
