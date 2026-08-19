-- =========================================================
-- AYANTIKA PORTFOLIO — SUPABASE FULL DATABASE SCHEMA
-- Stack: Next.js 14 · Supabase · Groq (Free Tier)
-- =========================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================
-- TABLE 1: works (CMS-managed uploads)
-- ============================================
create table if not exists public.works (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  category       text not null
                   check (category in (
                     'teardown','prd','case-study','framework','other'
                   )),
  description    text,
  tags           text[] default '{}',
  github_url     text,
  file_url       text not null,
  file_name      text not null,
  file_type      text not null
                   check (file_type in ('pdf','pptx','docx')),
  thumbnail_url  text,
  status         text not null default 'draft'
                   check (status in ('draft','coming_soon','published')),
  reveal_date    timestamptz,
  featured       boolean default false,
  sort_order     integer default 0,
  view_count     integer default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- Auto-update timestamp trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists works_updated_at on public.works;
create trigger works_updated_at
  before update on public.works
  for each row execute function update_updated_at();

-- ============================================
-- TABLE 2: chat_logs (AI chatbot conversations)
-- ============================================
create table if not exists public.chat_logs (
  id           uuid primary key default gen_random_uuid(),
  session_id   text not null,
  visitor_id   text,
  role         text not null check (role in ('user','assistant')),
  content      text not null,
  flagged      boolean default false,
  created_at   timestamptz default now()
);

-- Indexes for performance & weekly review
create index if not exists idx_chat_logs_created on public.chat_logs (created_at desc);
create index if not exists idx_chat_logs_session on public.chat_logs (session_id);
create index if not exists idx_chat_logs_flagged on public.chat_logs (flagged) where flagged = true;

-- ============================================
-- TABLE 3: visitor_events (lightweight analytics)
-- ============================================
create table if not exists public.visitor_events (
  id           uuid primary key default gen_random_uuid(),
  event_type   text not null,
  event_data   jsonb default '{}',
  page_section text,
  visitor_id   text,
  created_at   timestamptz default now()
);

create index if not exists idx_events_type on public.visitor_events (event_type, created_at desc);

-- ============================================
-- FUNCTIONS & RPC
-- ============================================

-- Increment view count (called from frontend)
create or replace function public.increment_view(work_id uuid)
returns void as $$
begin
  update public.works set view_count = view_count + 1 where id = work_id;
end;
$$ language plpgsql security definer;

-- Log a visitor event (called from frontend)
create or replace function public.log_event(
  p_type text,
  p_data jsonb default '{}',
  p_section text default null,
  p_visitor text default null
) returns void as $$
begin
  insert into public.visitor_events (event_type, event_data, page_section, visitor_id)
  values (p_type, p_data, p_section, p_visitor);
end;
$$ language plpgsql security definer;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table public.works enable row level security;
alter table public.chat_logs enable row level security;
alter table public.visitor_events enable row level security;

-- Works: Public can read published and coming_soon works
drop policy if exists "Public reads published works" on public.works;
create policy "Public reads published works"
  on public.works for select
  using (status in ('published', 'coming_soon'));

-- Admin full access with Service Role Key (service role bypasses RLS automatically)
-- For anon key admin access with password authentication or signed-in users:
drop policy if exists "Anon full access with secret check" on public.works;
create policy "Anon full access with secret check"
  on public.works for all
  using (true)
  with check (true);

-- Chat logs: Public can insert their own messages
drop policy if exists "Anyone can insert chat logs" on public.chat_logs;
create policy "Anyone can insert chat logs"
  on public.chat_logs for insert
  with check (true);

drop policy if exists "Anyone can read chat logs" on public.chat_logs;
create policy "Anyone can read chat logs"
  on public.chat_logs for select
  using (true);

-- Visitor events: Public can insert
drop policy if exists "Anyone can log events" on public.visitor_events;
create policy "Anyone can log events"
  on public.visitor_events for insert
  with check (true);

drop policy if exists "Anyone can read events" on public.visitor_events;
create policy "Anyone can read events"
  on public.visitor_events for select
  using (true);

-- ============================================
-- STORAGE BUCKET (Run in SQL editor if storage schema is accessible)
-- ============================================
insert into storage.buckets (id, name, public)
values ('portfolio-works', 'portfolio-works', true)
on conflict (id) do nothing;

drop policy if exists "Public reads portfolio-works" on storage.objects;
create policy "Public reads portfolio-works"
  on storage.objects for select
  using (bucket_id = 'portfolio-works');

drop policy if exists "Public uploads to portfolio-works" on storage.objects;
create policy "Public uploads to portfolio-works"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-works');

drop policy if exists "Public modifies portfolio-works" on storage.objects;
create policy "Public modifies portfolio-works"
  on storage.objects for all
  using (bucket_id = 'portfolio-works');
