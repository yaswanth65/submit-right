update app_settings
set support_email = 'support@submitright.com',
    default_timezone = 'Asia/Kolkata',
    default_currency = 'INR',
    updated_at = now();

insert into app_settings (id, support_email, default_timezone, default_currency, updated_at)
select
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'support@submitright.com',
  'Asia/Kolkata',
  'INR',
  now()
where not exists (select 1 from app_settings);

insert into profiles (
  id,
  auth_user_id,
  role,
  full_name,
  email,
  mobile_number,
  country,
  state,
  years_of_experience,
  primary_language,
  primary_expertise,
  language_pairs,
  account_status,
  is_deleted,
  created_at,
  updated_at
)
values
  (
    'aaaaaaaa-1111-1111-1111-111111111111',
    null,
    'admin',
    'Aarav Sharma',
    'admin@submitright.com',
    '+91 90000 00001',
    'India',
    'Maharashtra',
    9,
    'English',
    'Platform Administration',
    array['English-Hindi'],
    'active',
    false,
    now(),
    now()
  ),
  (
    'eeeeeeee-2222-2222-2222-222222222222',
    null,
    'editor',
    'Priya Nair',
    'editor@submitright.com',
    '+91 90000 00002',
    'India',
    'Kerala',
    7,
    'English',
    'Editing',
    array['English-Hindi', 'English-Tamil'],
    'active',
    false,
    now(),
    now()
  ),
  (
    'cccccccc-3333-3333-3333-333333333333',
    null,
    'client',
    'John Doe',
    'client@submitright.com',
    '+91 90000 00003',
    'India',
    'Delhi',
    null,
    'English',
    'Research Writing',
    array['English-Hindi'],
    'active',
    false,
    now(),
    now()
  ),
  (
    'cccccccc-4444-4444-4444-444444444444',
    null,
    'client',
    'Sarah Johnson',
    'sarah.johnson@example.com',
    '+91 90000 00004',
    'India',
    'Karnataka',
    null,
    'English',
    'Publication Support',
    array['English-Hindi'],
    'active',
    false,
    now(),
    now()
  )
on conflict (id) do update
set auth_user_id = excluded.auth_user_id,
    role = excluded.role,
    full_name = excluded.full_name,
    email = excluded.email,
    mobile_number = excluded.mobile_number,
    country = excluded.country,
    state = excluded.state,
    years_of_experience = excluded.years_of_experience,
    primary_language = excluded.primary_language,
    primary_expertise = excluded.primary_expertise,
    language_pairs = excluded.language_pairs,
    account_status = excluded.account_status,
    is_deleted = excluded.is_deleted,
    updated_at = excluded.updated_at;

insert into services (
  slug,
  title,
  description,
  image_url,
  category,
  kind,
  domain_type,
  rate_per_word,
  base_price,
  is_best,
  is_active,
  sort_order,
  updated_at
)
values
  ('editing-domain', 'Editing', 'Editing domain for document refinement workflows', null, 'best', 'domain', 'Editing', 0.00, null, true, true, 1, now()),
  ('proofreading-domain', 'Proofreading', 'Proofreading domain for language-level quality checks', null, 'other', 'domain', 'Proofreading', 0.00, null, false, true, 2, now()),
  ('translation-domain', 'Translation', 'Translation domain for multilingual content support', null, 'other', 'domain', 'Translation', 0.00, null, false, true, 3, now()),
  ('publication-support-domain', 'Publication Support', 'Publication support domain for journal-ready services', null, 'publication_support_packages', 'domain', 'Publication Support', 0.00, null, false, true, 4, now()),
  ('editing-basic', 'Basic Editing', 'Grammar and clarity improvements', null, 'best', 'service', 'Editing', 2.50, null, true, true, 10, now()),
  ('advanced-editing', 'Advanced Editing', 'Structure, tone, and clarity improvements', null, 'best', 'service', 'Editing', 3.25, null, false, true, 11, now()),
  ('proofreading-basic', 'Basic Proofreading', 'Spelling, grammar, and punctuation correction', null, 'other', 'service', 'Proofreading', 1.85, null, false, true, 12, now()),
  ('translation-en-es', 'Translation EN -> ES', 'Professional English to Spanish translation', null, 'other', 'service', 'Translation', 4.20, null, false, true, 13, now()),
  ('essential-support', 'Essential Support', 'Publication-ready support bundle', null, 'publication_support_packages', 'package', 'Editing', 0.00, 25800.00, false, true, 20, now()),
  ('advanced-support', 'Advanced Support', 'Expanded support bundle with added review steps', null, 'publication_support_packages', 'package', 'Editing', 0.00, 35800.00, false, true, 21, now()),
  ('comprehensive-support', 'Comprehensive Support', 'Premium bundle with the widest coverage', null, 'publication_support_packages', 'package', 'Editing', 0.00, 45800.00, false, true, 22, now()),
  ('plagiarism-check', 'Plagiarism Check', 'Similarity screening with report', null, 'other', 'service', 'Publication Support', 1.25, null, false, true, 30, now())
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    image_url = excluded.image_url,
    category = excluded.category,
    kind = excluded.kind,
    domain_type = excluded.domain_type,
    rate_per_word = excluded.rate_per_word,
    base_price = excluded.base_price,
    is_best = excluded.is_best,
    is_active = excluded.is_active,
    sort_order = excluded.sort_order,
    updated_at = excluded.updated_at;

update editor_availability
set availability_status = 'available',
    maximum_active_assignments = 4,
    maximum_word_count_per_day = 6000,
    admin_notes = 'Seeded availability for demo editor',
    updated_at = now()
where editor_id = 'eeeeeeee-2222-2222-2222-222222222222';

insert into editor_availability (
  editor_id,
  availability_status,
  maximum_active_assignments,
  maximum_word_count_per_day,
  admin_notes,
  updated_at
)
select
  'eeeeeeee-2222-2222-2222-222222222222',
  'available',
  4,
  6000,
  'Seeded availability for demo editor',
  now()
where not exists (
  select 1 from editor_availability where editor_id = 'eeeeeeee-2222-2222-2222-222222222222'
);

insert into documents (
  id,
  client_id,
  assigned_editor_id,
  document_title,
  academic_field,
  document_type,
  short_description,
  service_id,
  uploaded_file_name,
  uploaded_file_url,
  uploaded_file_path,
  latest_editor_file_name,
  latest_editor_file_url,
  latest_editor_file_path,
  word_count,
  rate_per_word,
  estimated_total,
  status,
  revision_requested,
  revision_count,
  payment_status,
  deadline_at,
  submitted_at,
  completed_at,
  last_activity_at,
  draft_expires_at,
  created_at,
  updated_at
)
values
  (
    'd1111111-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    'eeeeeeee-2222-2222-2222-222222222222',
    'Thesis Chapter 3 - Methodology',
    'Computer Science',
    'Thesis',
    'Need editing and structured feedback for the methodology chapter.',
    (select id from services where slug = 'editing-basic' limit 1),
    'thesis-chapter-3.docx',
    'https://example.com/files/thesis-chapter-3.docx',
    'clients/cccccccc-3333-3333-3333-333333333333/d1111111-1111-1111-1111-111111111111/client/thesis-chapter-3.docx',
    'thesis-chapter-3-edited.docx',
    'https://example.com/files/thesis-chapter-3-edited.docx',
    'editors/eeeeeeee-2222-2222-2222-222222222222/d1111111-1111-1111-1111-111111111111/editor/thesis-chapter-3-edited.docx',
    2400,
    2.5000,
    6000.00,
    'payment_needed',
    false,
    0,
    'pending',
    now() + interval '2 days',
    now() - interval '2 days',
    null,
    now() - interval '1 hour',
    null,
    now() - interval '3 days',
    now() - interval '1 hour'
  ),
  (
    'd2222222-2222-2222-2222-222222222222',
    'cccccccc-4444-4444-4444-444444444444',
    'eeeeeeee-2222-2222-2222-222222222222',
    'Publication Ready Package',
    'Biology',
    'Research Package',
    'Need a bundled publication support package with faster delivery.',
    (select id from services where slug = 'essential-support' limit 1),
    'publication-ready-package.pdf',
    'https://example.com/files/publication-ready-package.pdf',
    'clients/cccccccc-4444-4444-4444-444444444444/d2222222-2222-2222-2222-222222222222/client/publication-ready-package.pdf',
    'publication-ready-package-final.pdf',
    'https://example.com/files/publication-ready-package-final.pdf',
    'editors/eeeeeeee-2222-2222-2222-222222222222/d2222222-2222-2222-2222-222222222222/editor/publication-ready-package-final.pdf',
    12000,
    0.0000,
    25800.00,
    'completed',
    false,
    0,
    'paid',
    now() - interval '1 day',
    now() - interval '5 days',
    now() - interval '1 day',
    now() - interval '1 day',
    null,
    now() - interval '8 days',
    now() - interval '1 day'
  ),
  (
    'd3333333-3333-3333-3333-333333333333',
    'cccccccc-3333-3333-3333-333333333333',
    null,
    'Translation: Abstract Review',
    'Literature',
    'Article',
    'Client wants a translation-oriented domain review before submission.',
    (select id from services where slug = 'translation-en-es' limit 1),
    'abstract-review.docx',
    'https://example.com/files/abstract-review.docx',
    'clients/cccccccc-3333-3333-3333-333333333333/d3333333-3333-3333-3333-333333333333/client/abstract-review.docx',
    null,
    null,
    null,
    1800,
    4.2000,
    7560.00,
    'submitted',
    false,
    0,
    'pending',
    now() + interval '4 days',
    now() - interval '1 day',
    null,
    now() - interval '1 day',
    null,
    now() - interval '2 days',
    now() - interval '1 day'
  )
on conflict (id) do update
set client_id = excluded.client_id,
    assigned_editor_id = excluded.assigned_editor_id,
    document_title = excluded.document_title,
    academic_field = excluded.academic_field,
    document_type = excluded.document_type,
    short_description = excluded.short_description,
    service_id = excluded.service_id,
    uploaded_file_name = excluded.uploaded_file_name,
    uploaded_file_url = excluded.uploaded_file_url,
    uploaded_file_path = excluded.uploaded_file_path,
    latest_editor_file_name = excluded.latest_editor_file_name,
    latest_editor_file_url = excluded.latest_editor_file_url,
    latest_editor_file_path = excluded.latest_editor_file_path,
    word_count = excluded.word_count,
    rate_per_word = excluded.rate_per_word,
    estimated_total = excluded.estimated_total,
    status = excluded.status,
    revision_requested = excluded.revision_requested,
    revision_count = excluded.revision_count,
    payment_status = excluded.payment_status,
    deadline_at = excluded.deadline_at,
    submitted_at = excluded.submitted_at,
    completed_at = excluded.completed_at,
    last_activity_at = excluded.last_activity_at,
    draft_expires_at = excluded.draft_expires_at,
    updated_at = excluded.updated_at;

insert into file_versions (
  id,
  document_id,
  uploaded_by_profile_id,
  version_type,
  file_name,
  file_url,
  file_path,
  file_size_bytes,
  created_at
)
values
  (
    'f1111111-1111-1111-1111-111111111111',
    'd1111111-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    'client_file',
    'thesis-chapter-3.docx',
    'https://example.com/files/thesis-chapter-3.docx',
    'clients/cccccccc-3333-3333-3333-333333333333/d1111111-1111-1111-1111-111111111111/client/thesis-chapter-3.docx',
    845120,
    now() - interval '3 days'
  ),
  (
    'f2222222-2222-2222-2222-222222222222',
    'd2222222-2222-2222-2222-222222222222',
    'cccccccc-4444-4444-4444-444444444444',
    'client_file',
    'publication-ready-package.pdf',
    'https://example.com/files/publication-ready-package.pdf',
    'clients/cccccccc-4444-4444-4444-444444444444/d2222222-2222-2222-2222-222222222222/client/publication-ready-package.pdf',
    1245120,
    now() - interval '8 days'
  )
on conflict (id) do update
set document_id = excluded.document_id,
    uploaded_by_profile_id = excluded.uploaded_by_profile_id,
    version_type = excluded.version_type,
    file_name = excluded.file_name,
    file_url = excluded.file_url,
    file_path = excluded.file_path,
    file_size_bytes = excluded.file_size_bytes,
    created_at = excluded.created_at;

insert into messages (
  id,
  document_id,
  sender_id,
  receiver_id,
  message,
  read_at,
  created_at
)
values
  (
    'b1111111-1111-1111-1111-111111111111',
    'd1111111-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    'eeeeeeee-2222-2222-2222-222222222222',
    'Please focus on grammar and structure in the methodology chapter.',
    null,
    now() - interval '2 days'
  ),
  (
    'b2222222-2222-2222-2222-222222222222',
    'd1111111-1111-1111-1111-111111111111',
    'eeeeeeee-2222-2222-2222-222222222222',
    'cccccccc-3333-3333-3333-333333333333',
    'I have started the review and will update you once the first pass is complete.',
    now() - interval '1 day',
    now() - interval '1 day'
  )
on conflict (id) do update
set document_id = excluded.document_id,
    sender_id = excluded.sender_id,
    receiver_id = excluded.receiver_id,
    message = excluded.message,
    read_at = excluded.read_at,
    created_at = excluded.created_at;

insert into notifications (
  id,
  user_id,
  document_id,
  type,
  title,
  body,
  is_read,
  created_at
)
values
  (
    'c1111111-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    'd1111111-1111-1111-1111-111111111111',
    'document_update',
    'Document submitted',
    'Thesis Chapter 3 - Methodology has been submitted successfully.',
    false,
    now() - interval '2 days'
  ),
  (
    'c2222222-2222-2222-2222-222222222222',
    'cccccccc-3333-3333-3333-333333333333',
    'd1111111-1111-1111-1111-111111111111',
    'payment',
    'Payment needed',
    'Your edited file is ready for checkout.',
    false,
    now() - interval '1 day'
  )
on conflict (id) do update
set user_id = excluded.user_id,
    document_id = excluded.document_id,
    type = excluded.type,
    title = excluded.title,
    body = excluded.body,
    is_read = excluded.is_read,
    created_at = excluded.created_at;

insert into support_tickets (
  id,
  created_by,
  subject,
  category,
  status,
  message,
  resolved_by,
  resolved_at,
  created_at,
  updated_at
)
values
  (
    'd4111111-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    'Need urgent support',
    'Document',
    'open',
    'Please check the assignment progress on my submitted file.',
    null,
    null,
    now() - interval '1 day',
    now() - interval '1 day'
  )
on conflict (id) do update
set created_by = excluded.created_by,
    subject = excluded.subject,
    category = excluded.category,
    status = excluded.status,
    message = excluded.message,
    resolved_by = excluded.resolved_by,
    resolved_at = excluded.resolved_at,
    updated_at = excluded.updated_at;

insert into ticket_responses (
  id,
  ticket_id,
  author_id,
  message,
  created_at
)
values
  (
    'd5111111-1111-1111-1111-111111111111',
    'd4111111-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'We have received your request and are checking the document status.',
    now() - interval '12 hours'
  )
on conflict (id) do update
set ticket_id = excluded.ticket_id,
    author_id = excluded.author_id,
    message = excluded.message,
    created_at = excluded.created_at;

insert into payment_transactions (
  id,
  document_id,
  client_id,
  invoice_number,
  razorpay_order_id,
  razorpay_payment_id,
  payment_reference_number,
  gateway_status,
  payment_method,
  currency,
  amount,
  status,
  breakdown,
  event_timeline,
  processing_time_ms,
  paid_at,
  created_at,
  updated_at
)
values
  (
    'e1111111-1111-1111-1111-111111111111',
    'd2222222-2222-2222-2222-222222222222',
    'cccccccc-4444-4444-4444-444444444444',
    'INV-2026-001',
    'order_demo_001',
    'pay_demo_001',
    'REF-DEMO-001',
    'captured',
    'upi',
    'INR',
    25800.00,
    'paid',
    '{"subtotal":25800,"discount":0,"tax":0,"total":25800}'::jsonb,
    '[{"status":"created","at":"2026-04-01T10:00:00.000Z"},{"status":"paid","at":"2026-04-01T10:01:00.000Z"}]'::jsonb,
    4200,
    now() - interval '1 day',
    now() - interval '1 day',
    now() - interval '1 day'
  )
on conflict (id) do update
set document_id = excluded.document_id,
    client_id = excluded.client_id,
    invoice_number = excluded.invoice_number,
    razorpay_order_id = excluded.razorpay_order_id,
    razorpay_payment_id = excluded.razorpay_payment_id,
    payment_reference_number = excluded.payment_reference_number,
    gateway_status = excluded.gateway_status,
    payment_method = excluded.payment_method,
    currency = excluded.currency,
    amount = excluded.amount,
    status = excluded.status,
    breakdown = excluded.breakdown,
    event_timeline = excluded.event_timeline,
    processing_time_ms = excluded.processing_time_ms,
    paid_at = excluded.paid_at,
    updated_at = excluded.updated_at;

insert into discount_campaigns (
  id,
  coupon_code,
  coupon_name,
  coupon_type,
  apply_to,
  target_item_id,
  discount_value,
  sale_price,
  buy_quantity,
  get_quantity,
  start_date,
  end_date,
  limit_total_uses,
  limit_per_customer,
  current_usage_count,
  is_active,
  description,
  created_by,
  updated_by,
  created_at,
  updated_at
)
values
  (
    'dc111111-1111-1111-1111-111111111111',
    'SUMMER15',
    'Summer Promotion',
    'discount',
    'all_services',
    null,
    15.00,
    null,
    null,
    null,
    now() - interval '1 day',
    now() + interval '30 days',
    100,
    1,
    0,
    true,
    'Seasonal discount for all service items',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    now() - interval '1 day',
    now() - interval '1 day'
  ),
  (
    'dc222222-2222-2222-2222-222222222222',
    'PACKSAVE25',
    'Package Saver',
    'sale_price',
    'specific_package',
    (select id from services where slug = 'essential-support' limit 1),
    null,
    21999.00,
    null,
    null,
    now() - interval '1 day',
    now() + interval '20 days',
    50,
    1,
    0,
    true,
    'Reduced price for the Essential Support package',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    now() - interval '1 day',
    now() - interval '1 day'
  ),
  (
    'dc333333-3333-3333-3333-333333333333',
    'B3G1EDIT',
    'Editing BOGO',
    'buy_x_get_y',
    'specific_service',
    (select id from services where slug = 'editing-basic' limit 1),
    null,
    null,
    3,
    1,
    now() - interval '1 day',
    now() + interval '45 days',
    20,
    1,
    0,
    true,
    'Buy 3 editing services and get 1 extra at no charge',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    now() - interval '1 day',
    now() - interval '1 day'
  )
on conflict (id) do update
set coupon_code = excluded.coupon_code,
    coupon_name = excluded.coupon_name,
    coupon_type = excluded.coupon_type,
    apply_to = excluded.apply_to,
    target_item_id = excluded.target_item_id,
    discount_value = excluded.discount_value,
    sale_price = excluded.sale_price,
    buy_quantity = excluded.buy_quantity,
    get_quantity = excluded.get_quantity,
    start_date = excluded.start_date,
    end_date = excluded.end_date,
    limit_total_uses = excluded.limit_total_uses,
    limit_per_customer = excluded.limit_per_customer,
    current_usage_count = excluded.current_usage_count,
    is_active = excluded.is_active,
    description = excluded.description,
    created_by = excluded.created_by,
    updated_by = excluded.updated_by,
    updated_at = excluded.updated_at;

insert into discount_redemptions (
  id,
  discount_campaign_id,
  document_id,
  client_id,
  discount_amount,
  redeemed_at
)
values
  (
    'd6111111-1111-1111-1111-111111111111',
    'dc111111-1111-1111-1111-111111111111',
    'd1111111-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    900.00,
    now() - interval '1 day'
  )
on conflict (id) do update
set discount_campaign_id = excluded.discount_campaign_id,
    document_id = excluded.document_id,
    client_id = excluded.client_id,
    discount_amount = excluded.discount_amount,
    redeemed_at = excluded.redeemed_at;

insert into audit_logs (
  id,
  actor_id,
  target_user_id,
  document_id,
  action,
  notes,
  payload,
  created_at
)
values
  (
    'a7111111-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'cccccccc-3333-3333-3333-333333333333',
    'd1111111-1111-1111-1111-111111111111',
    'catalog_seeded',
    'Seeded catalog, discounts, and demo workflow data',
    '{"source":"supabase/seed.sql"}'::jsonb,
    now()
  )
on conflict (id) do update
set actor_id = excluded.actor_id,
    target_user_id = excluded.target_user_id,
    document_id = excluded.document_id,
    action = excluded.action,
    notes = excluded.notes,
    payload = excluded.payload,
    created_at = excluded.created_at;
