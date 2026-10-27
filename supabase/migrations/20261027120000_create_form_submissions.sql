-- Contact form submissions. Public visitors may insert only; nobody can read,
-- change or delete rows through the public (anon) key.

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 20),
  email text not null check (char_length(email) between 3 and 254 and email like '%_@_%._%'),
  subject text not null check (
    subject in ('General enquiry', 'Product information', 'Where to buy', 'Partnership', 'Feedback')
  ),
  message text not null check (char_length(message) between 10 and 2000),
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam'))
);

create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);
create index if not exists form_submissions_status_idx on public.form_submissions (status);

alter table public.form_submissions enable row level security;

-- Anonymous visitors: insert new rows only, and only with the default status.
drop policy if exists "Public can submit the contact form" on public.form_submissions;
create policy "Public can submit the contact form"
  on public.form_submissions
  for insert
  to anon
  with check (status = 'new');

-- No select/update/delete policies exist, so those operations are denied by
-- default. Admin access will be added with the admin panel.

-- Belt and braces: remove table privileges the anon role does not need.
revoke all on public.form_submissions from anon;
grant insert (name, phone, email, subject, message) on public.form_submissions to anon;
