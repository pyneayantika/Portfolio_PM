# System Architecture — Ayantika's Portfolio

> **Codename:** "The Signal, not the Noise"
> **Version:** 1.0 — August 2026
> **Stack:** Next.js 14 (App Router) · Supabase · Vercel · Groq API (free tier)
> **Budget:** ₹0 — every service on free tier

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Design System & Visual Identity](#2-design-system--visual-identity)
3. [Project Structure](#3-project-structure)
4. [Database Schema (Supabase)](#4-database-schema-supabase)
5. [Storage Architecture](#5-storage-architecture)
6. [Frontend — Section-by-Section](#6-frontend--section-by-section)
7. [Backend — API Routes](#7-backend--api-routes)
8. [Ask Ayantika — AI Chatbot](#8-ask-ayantika--ai-chatbot)
9. [Admin CMS Panel](#9-admin-cms-panel)
10. [Analytics & Moderation](#10-analytics--moderation)
11. [Deployment & Environment](#11-deployment--environment)
12. [Free Tier Budget Map](#12-free-tier-budget-map)
13. [Implementation Phases](#13-implementation-phases)

---

## 1. Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                         VISITOR (Browser)                              │
│                                                                        │
│  ┌─────────┐ ┌────────────┐ ┌──────────┐ ┌───────────┐ ┌───────────┐ │
│  │  Hero   │ │  Roadmap   │ │ Projects │ │Product Lab│ │ ESG Edge  │ │
│  └────┬────┘ └─────┬──────┘ └────┬─────┘ └─────┬─────┘ └─────┬─────┘ │
│       │            │             │              │             │        │
│       └────────────┴──────┬──────┴──────────────┴─────────────┘        │
│                           │                                            │
│  ┌──────────────┐   ┌─────┴──────┐   ┌────────────────────────┐       │
│  │ Ask Ayantika │   │  Works CMS │   │  Admin Panel (/admin)  │       │
│  │   Chatbot    │   │  Showcase  │   │   Password-protected   │       │
│  └──────┬───────┘   └─────┬──────┘   └───────────┬────────────┘       │
└─────────┼─────────────────┼───────────────────────┼────────────────────┘
          │                 │                       │
          ▼                 ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        VERCEL (Hosting + Edge)                          │
│                                                                         │
│  ┌──────────────────┐  ┌────────────────────┐  ┌─────────────────────┐ │
│  │  Static Pages    │  │  API Routes        │  │  Edge Middleware    │ │
│  │  (ISR / SSG)     │  │  /api/chat         │  │  Rate limiting     │ │
│  │  Hero, Roadmap,  │  │  /api/views        │  │  Admin auth check  │ │
│  │  Lab, ESG Edge   │  │  /api/moderation   │  │                    │ │
│  └──────────────────┘  └──────┬─────────────┘  └────────────────────┘  │
└───────────────────────────────┼──────────────────────────────────────────┘
                                │
          ┌─────────────────────┼──────────────────────┐
          │                     │                      │
          ▼                     ▼                      ▼
┌──────────────┐    ┌────────────────────┐    ┌────────────────┐
│  Groq API    │    │  Supabase          │    │ Supabase       │
│  (Chatbot)   │    │  PostgreSQL        │    │ Storage        │
│  FREE TIER   │    │                    │    │                │
│  System      │    │  works             │    │ portfolio-     │
│  prompt with │    │  chat_logs         │    │ works/         │
│  portfolio   │    │  visitor_events    │    │                │
│  context     │    │                    │    │ PPT, PDF,      │
│              │    │                    │    │ DOCX files     │
│  Model:      │    │                    │    │ + thumbnails   │
│  llama-3.3-  │    │                    │    │                │
│  70b-versatile│   │  RLS enabled       │    │ Public bucket  │
└──────────────┘    └────────────────────┘    └────────────────┘
```

**Why this architecture works at ₹0:**
Every piece maps to a free tier. Supabase gives you the database AND storage AND auth in one place — no need for separate S3, Firebase, or a custom auth server. Vercel handles SSG/ISR and serverless API routes. Every piece is genuinely free — Groq provides 14,400 requests/day at no cost, Supabase handles DB + storage + auth, and Vercel serves the frontend.

---

## 2. Design System & Visual Identity

### 2.1 Color Palette

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| Deep Forest | `#0D1F1A` | `--color-forest` | Primary text, section dividers, dark backgrounds |
| Parchment | `#F5F2EB` | `--color-parchment` | Main canvas, card backgrounds |
| ESG Green | `#2D6A4F` | `--color-green` | Primary accent, CTAs, active states |
| Amber Signal | `#E9C46A` | `--color-amber` | Data callouts, highlights, "in progress" badges |
| Slate Teal | `#264653` | `--color-teal` | Secondary accent, links, headers |
| Muted Sand | `#D5CCBA` | `--color-sand` | Borders, disabled states, dividers |
| Error Coral | `#D85A30` | `--color-error` | Errors, destructive actions |

**Dark mode mapping:** Deep Forest becomes the base canvas. Parchment shifts to `#1A1A1A`. ESG Green brightens to `#3CB371`. All stored as CSS custom properties under `:root` and `[data-theme="dark"]`.

### 2.2 Typography

| Role | Font | Weight | Size | Where |
|---|---|---|---|---|
| Display / H1 | Fraunces | 700 | 48–64px | Hero headline, section titles |
| H2 | Fraunces | 600 | 28–36px | Section subheadings |
| H3 | Inter | 600 | 20–24px | Card titles, subsection labels |
| Body | Inter | 400 | 16px | Paragraphs, descriptions, chat |
| Caption / Meta | Inter | 500 | 12–13px | Tags, dates, metadata labels |
| Data / Code | JetBrains Mono | 400 | 14px | Tech stack badges, counters, code |

**Loading strategy:** Fraunces from Google Fonts (display=swap, subset latin). Inter via `next/font/google` (built-in to Next.js, zero layout shift). JetBrains Mono loaded only on pages that use it (projects, lab).

### 2.3 Signature Element

**The Terrain Contour Motif.** Subtle topographic contour lines at 3–5% opacity in section backgrounds. These reference:
- Environmental science (Ayantika's M.Sc. background — actual topographic maps)
- Product roadmaps (elevation = progress, terrain = difficulty)
- Data visualization (contour plots in emissions modeling)

Implementation: A single SVG pattern defined once in `globals.css`, applied via `background-image` with `background-size: 400px` and `opacity: 0.04`.

### 2.4 Motion Principles

| Context | Animation | Duration | Easing |
|---|---|---|---|
| Page load | Hero typewriter effect | 2.5s | steps(40, end) |
| Scroll reveal | Sections fade-up | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Counter | Number count-up (IntersectionObserver) | 2s | ease-out |
| Roadmap node hover | Scale + expand | 200ms | ease-out |
| Project card hover | Lift shadow | 150ms | ease-out |
| Chat panel open | Slide from right | 300ms | cubic-bezier(0.32, 0.72, 0, 1) |
| Filter tab switch | Content fade-swap | 200ms | ease |

All animations wrapped in `@media (prefers-reduced-motion: no-preference)`. Users who've set reduced motion get instant state changes, no transitions.

### 2.5 Responsive Breakpoints

| Breakpoint | Width | Layout shift |
|---|---|---|
| Mobile | < 640px | Single column, stacked cards, vertical roadmap |
| Tablet | 640–1024px | Two-column grid, horizontal roadmap starts |
| Desktop | 1024–1440px | Full layout, sidepanel chat |
| Wide | > 1440px | Content centered at max-width: 1200px |

---

## 3. Project Structure

```
ayantika-portfolio/
│
├── app/                              # Next.js App Router
│   ├── layout.jsx                    # Root layout: fonts, metadata, theme provider
│   ├── page.jsx                      # Home — assembles all sections
│   ├── globals.css                   # Design tokens, contour motif, base styles
│   │
│   ├── admin/
│   │   └── page.jsx                  # Admin CMS panel (password-gated)
│   │
│   └── api/
│       ├── chat/
│       │   └── route.js              # POST — Groq API proxy for chatbot
│       ├── views/
│       │   └── route.js              # POST — increment view count
│       └── moderation/
│           └── route.js              # GET — fetch chat logs for review
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx                # Minimal top nav: name + theme toggle + CTA
│   │   ├── Footer.jsx                # Contact links + "open to roles" badge
│   │   └── ThemeProvider.jsx         # Dark/light mode context
│   │
│   ├── sections/
│   │   ├── Hero.jsx                  # Section 01: typewriter, counters, pivot SVG
│   │   ├── PivotRoadmap.jsx          # Section 02: winding path timeline
│   │   ├── WorksShowcase.jsx         # Section 03: filterable project grid + CMS
│   │   ├── ProductLab.jsx            # Section 04: frameworks + guesstimate
│   │   └── ESGEdge.jsx               # Section 05: iceberg + skill mapping
│   │
│   ├── chat/
│   │   ├── ChatWidget.jsx            # Floating chat button + slide-over panel
│   │   ├── ChatMessage.jsx           # Individual message bubble
│   │   └── SuggestedQuestions.jsx     # Pre-populated question chips
│   │
│   ├── ui/
│   │   ├── AnimatedCounter.jsx       # Count-up number on scroll-into-view
│   │   ├── FilterTabs.jsx            # Reusable filter pill bar
│   │   ├── ProjectCard.jsx           # Single project card component
│   │   ├── RoadmapNode.jsx           # Single timeline node (expandable)
│   │   ├── FileViewer.jsx            # PDF/PPTX embedded viewer overlay
│   │   ├── CountdownBadge.jsx        # "Coming soon" countdown timer
│   │   ├── FrameworkExplorer.jsx     # Interactive framework selector + example
│   │   ├── GuesstimateStepper.jsx    # Step-through guesstimate demo
│   │   ├── IcebergDiagram.jsx        # SVG iceberg for ESG depth visual
│   │   └── TypewriterText.jsx        # Character-by-character text animation
│   │
│   └── admin/
│       ├── AdminAuth.jsx             # Password gate wrapper
│       ├── UploadForm.jsx            # Drag-and-drop file upload + metadata
│       ├── WorksManager.jsx          # List/edit/delete/reorder works
│       └── ChatLogsViewer.jsx        # Review chatbot conversations
│
├── lib/
│   ├── supabase.js                   # Supabase client + shared queries
│   ├── constants.js                  # Categories, statuses, framework data
│   ├── chatSystemPrompt.js           # Claude system prompt (portfolio context)
│   └── utils.js                      # formatDate, truncate, countWords, etc.
│
├── data/
│   ├── roadmap.json                  # Timeline nodes: role, year, skill, project
│   ├── projects.json                 # Static project metadata (fallback if DB empty)
│   ├── frameworks.json               # FOCUSED, GAME, SIFTED definitions + examples
│   └── guesstimates.json             # Sample guesstimate problems + solutions
│
├── public/
│   ├── fonts/                        # Self-hosted JetBrains Mono (if needed)
│   ├── og-image.png                  # Open Graph preview image
│   ├── contour-pattern.svg           # Terrain contour background motif
│   └── favicon.ico
│
├── .env.local                        # Local env vars (never committed)
├── .env.example                      # Template for collaborators
├── next.config.js
├── tailwind.config.js                # Extended with design tokens
├── package.json
└── README.md
```

**Why App Router over Pages Router:** App Router gives us React Server Components — the roadmap data, project list, and framework definitions load server-side with zero client JS. Only interactive pieces (chat, filters, guesstimate stepper) ship client-side code. This means faster load and better SEO, which matters for recruiter visits.

---

## 4. Database Schema (Supabase)

### 4.1 Entity Relationship Diagram

```
┌─────────────────────┐         ┌──────────────────────┐
│       works          │         │     chat_logs         │
├─────────────────────┤         ├──────────────────────┤
│ id (uuid, PK)       │         │ id (uuid, PK)        │
│ title (text)        │         │ session_id (text)     │
│ category (enum)     │         │ visitor_id (text)     │
│ description (text)  │         │ role (enum)           │
│ tags (text[])       │         │ content (text)        │
│ file_url (text)     │         │ flagged (boolean)     │
│ file_name (text)    │         │ created_at            │
│ file_type (enum)    │         └──────────────────────┘
│ thumbnail_url (text)│
│ status (enum)       │         ┌──────────────────────┐
│ reveal_date         │         │   visitor_events      │
│   (timestamptz)     │         ├──────────────────────┤
│ featured (boolean)  │         │ id (uuid, PK)        │
│ sort_order (int)    │         │ event_type (text)     │
│ view_count (int)    │         │ event_data (jsonb)    │
│ created_at          │         │ page_section (text)   │
│ updated_at          │         │ visitor_id (text)     │
└─────────────────────┘         │ created_at            │
                                └──────────────────────┘
```

### 4.2 Full SQL Schema

```sql
-- ============================================
-- TABLE 1: works (CMS-managed uploads)
-- ============================================
create table if not exists works (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  category       text not null
                   check (category in (
                     'teardown','prd','case-study','framework','other'
                   )),
  description    text,
  tags           text[] default '{}',
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

create trigger works_updated_at
  before update on works
  for each row execute function update_updated_at();


-- ============================================
-- TABLE 2: chat_logs (AI chatbot conversations)
-- ============================================
create table if not exists chat_logs (
  id           uuid primary key default gen_random_uuid(),
  session_id   text not null,
  visitor_id   text,
  role         text not null check (role in ('user','assistant')),
  content      text not null,
  flagged      boolean default false,
  created_at   timestamptz default now()
);

-- Index for weekly moderation review queries
create index idx_chat_logs_created on chat_logs (created_at desc);
create index idx_chat_logs_session on chat_logs (session_id);
create index idx_chat_logs_flagged on chat_logs (flagged)
  where flagged = true;


-- ============================================
-- TABLE 3: visitor_events (lightweight analytics)
-- ============================================
create table if not exists visitor_events (
  id           uuid primary key default gen_random_uuid(),
  event_type   text not null,
  event_data   jsonb default '{}',
  page_section text,
  visitor_id   text,
  created_at   timestamptz default now()
);

-- Index for analytics queries
create index idx_events_type on visitor_events (event_type, created_at desc);


-- ============================================
-- FUNCTIONS
-- ============================================

-- Increment view count (called from frontend)
create or replace function increment_view(work_id uuid)
returns void as $$
begin
  update works set view_count = view_count + 1 where id = work_id;
end;
$$ language plpgsql;

-- Log a visitor event (called from frontend)
create or replace function log_event(
  p_type text,
  p_data jsonb default '{}',
  p_section text default null,
  p_visitor text default null
) returns void as $$
begin
  insert into visitor_events (event_type, event_data, page_section, visitor_id)
  values (p_type, p_data, p_section, p_visitor);
end;
$$ language plpgsql;


-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Works: public reads published/coming_soon only
alter table works enable row level security;

create policy "Public reads published works"
  on works for select
  using (status in ('published', 'coming_soon'));

create policy "Admin full access"
  on works for all
  using (auth.role() = 'authenticated');

-- Chat logs: public can insert (to log their own messages)
alter table chat_logs enable row level security;

create policy "Anyone can insert chat logs"
  on chat_logs for insert
  with check (true);

create policy "Admin reads chat logs"
  on chat_logs for select
  using (auth.role() = 'authenticated');

-- Events: public can insert
alter table visitor_events enable row level security;

create policy "Anyone can log events"
  on visitor_events for insert
  with check (true);

create policy "Admin reads events"
  on visitor_events for select
  using (auth.role() = 'authenticated');


-- ============================================
-- STORAGE BUCKET
-- ============================================
insert into storage.buckets (id, name, public)
values ('portfolio-works', 'portfolio-works', true)
on conflict (id) do nothing;

create policy "Public reads files"
  on storage.objects for select
  using (bucket_id = 'portfolio-works');

create policy "Admin uploads files"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolio-works'
    and auth.role() = 'authenticated'
  );

create policy "Admin deletes files"
  on storage.objects for delete
  using (
    bucket_id = 'portfolio-works'
    and auth.role() = 'authenticated'
  );
```

### 4.3 Why these tables and nothing more

The schema is deliberately minimal. Three tables cover all dynamic data: `works` stores uploaded files and their display status, `chat_logs` captures every chatbot conversation for weekly moderation, and `visitor_events` is a generic analytics sink. Everything static (roadmap nodes, framework definitions, guesstimate problems) lives in JSON files under `/data/` — these change rarely and don't need a database. Fewer tables means fewer RLS policies to debug and a simpler mental model when working in Windsurf or Cursor.

---

## 5. Storage Architecture

### 5.1 Supabase Storage Bucket

```
portfolio-works/            (public bucket)
├── works/                  All uploaded files
│   ├── 1723945200-myntra-maya-teardown.pptx
│   ├── 1723945300-ragbench-prd-v2.pdf
│   └── 1723945400-meesho-returns-analysis.pdf
│
└── thumbnails/             Auto-generated or manually uploaded
    ├── 1723945200-thumb.png
    └── 1723945300-thumb.png
```

**Naming convention:** `{unix_timestamp}-{slugified_original_name}.{ext}` — prevents collisions, makes files sortable by upload date, and stays URL-safe.

**Access pattern:**
- Upload: Admin panel → `supabase.storage.from('portfolio-works').upload(path, file)` → returns public URL
- Read: Public URL served directly by Supabase CDN, no authentication needed
- Delete: Admin panel → `supabase.storage.from('portfolio-works').remove([path])`

### 5.2 PPTX/PDF Viewing Strategy

| Format | Viewer | How | Fallback |
|---|---|---|---|
| PDF | Browser native | `<iframe src="{url}#toolbar=0">` | Download link |
| PPTX | Microsoft Office Online | `https://view.officeapps.live.com/op/embed.aspx?src={encoded_url}` | Download link |
| DOCX | Microsoft Office Online | Same embed pattern as PPTX | Download link |

**Why Office Online and not Google Docs viewer:** Office Online has no API key requirement, handles PPTX animations/transitions better, and doesn't require a Google account. It simply takes any public URL and renders it. The only requirement is that the file URL is publicly accessible — which our public Supabase bucket satisfies.

---

## 6. Frontend — Section-by-Section

### Section 01: Hero

**Component:** `Hero.jsx` (client component — needs animation hooks)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─ Left (60%) ───────────────────┐  ┌─ Right (40%) ──────┐ │
│  │                                │  │                     │ │
│  │  I turn messy sustainability   │  │   ┌──┐  ┌──┐       │ │
│  │  data into products            │  │   │  ├──┤  │       │ │
│  │  people trust. |               │  │   └──┘  └──┘       │ │
│  │  (typewriter cursor blinks)    │  │     ↕    ↕         │ │
│  │                                │  │   ┌──┐  ┌──┐       │ │
│  │  ESG data architect →          │  │   │  ├──┤  │       │ │
│  │  AI product builder.           │  │   └──┘  └──┘       │ │
│  │                                │  │                     │ │
│  │  ┌──────┐  ┌──────┐  ┌──────┐ │  │   Animated SVG:     │ │
│  │  │  36  │  │ 201K │  │  10+ │ │  │   Skill nodes       │ │
│  │  │ RAG  │  │ tCO₂e│  │ Prod │ │  │   connecting into   │ │
│  │  │config│  │      │  │      │ │  │   a molecule on     │ │
│  │  └──────┘  └──────┘  └──────┘ │  │   page load         │ │
│  │                                │  │                     │ │
│  │  [ See what I've built ↓ ]     │  │                     │ │
│  └────────────────────────────────┘  └─────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Data flow:** Static — all content hardcoded. Counters animate via `AnimatedCounter` component using `IntersectionObserver` to trigger count-up when scrolled into view. The molecule SVG animates nodes fading in with staggered delays (200ms per node, 6 nodes total).

**Key implementation detail — the Typewriter:**

```jsx
// components/ui/TypewriterText.jsx
'use client'
import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 60, delay = 500 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timer = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        speed
      )
      return () => clearTimeout(timer)
    }
  }, [displayed, started, text, speed])

  return (
    <span>
      {displayed}
      <span className="animate-blink text-green">|</span>
    </span>
  )
}
```

### Section 02: Pivot Roadmap

**Component:** `PivotRoadmap.jsx` (client component — scroll and expand interactions)

```
┌──────────────────────────────────────────────────────────────┐
│  "How a sustainability scientist became obsessed             │
│   with products"                                             │
│                                                              │
│  ────○──────○──────○──────○──────○──────◉──── (winding path) │
│      │      │      │      │      │      │                    │
│      EY   Kosher   Re   Bajaj  NextLeap NOW                 │
│     2019   2020   2021   2022   2024   2026                  │
│                    │                                          │
│              ┌─────┴──────────────────┐                      │
│              │  Re Sustainability     │ (expanded node)      │
│              │  ─────────────────     │                      │
│              │  Duration: 1.5 years   │                      │
│              │                        │                      │
│              │  Skill unlocked:       │                      │
│              │  Enterprise SaaS       │                      │
│              │  product ownership     │                      │
│              │                        │                      │
│              │  "Deployed IBM Envizi. │                      │
│              │   Became the internal  │                      │
│              │   product owner.       │                      │
│              │   Realized I was doing │                      │
│              │   PM work without      │                      │
│              │   the title."          │                      │
│              │                        │                      │
│              │  → Led to: ClimateLens │                      │
│              └────────────────────────┘                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Data source:** `/data/roadmap.json` — loaded server-side, passed as props.

```json
[
  {
    "id": "ey",
    "role": "Climate Change & Sustainability Consultant",
    "company": "Ernst & Young",
    "period": "2019–2020",
    "year": 2019,
    "skillUnlocked": "Stakeholder mapping, regulatory translation",
    "quote": "Learned to translate complex regulation into client decisions. First taste of stakeholder mapping.",
    "ledTo": null,
    "color": "teal"
  },
  {
    "id": "kosher",
    "role": "Sustainability Analyst",
    "company": "Kosher Climate India",
    "period": "2020–2021",
    "year": 2020,
    "skillUnlocked": "Carbon inventories from scratch",
    "quote": "Built carbon inventories from scratch. Discovered I was always asking 'how do we make this easier for users?'",
    "ledTo": null,
    "color": "teal"
  },
  {
    "id": "re-sustainability",
    "role": "Sustainability Consultant",
    "company": "Re Sustainability",
    "period": "2021–2022",
    "year": 2021,
    "skillUnlocked": "Enterprise SaaS product ownership",
    "quote": "Deployed IBM Envizi enterprise SaaS. Became the internal product owner. Realized I was doing PM work without the title.",
    "ledTo": "ClimateLens",
    "color": "green"
  },
  {
    "id": "bajaj",
    "role": "Sustainability Manager / Sprih PO",
    "company": "Bajaj Finserv Group",
    "period": "2022–present",
    "year": 2022,
    "skillUnlocked": "Group ESG data architecture, GHG consolidation at scale",
    "quote": "Owned GHG accounting platform for 8+ entities. Ran BRSR reporting across regulated financial services. Started wondering: why is this software so painful?",
    "ledTo": "RAGBench, Policy Intelligence",
    "color": "green"
  },
  {
    "id": "nextleap",
    "role": "AI PM Fellow — Top 1%",
    "company": "NextLeap (Cohort 46)",
    "period": "2024",
    "year": 2024,
    "skillUnlocked": "Structured product thinking, PM frameworks",
    "quote": "Validated the instinct. Fell in love with product thinking.",
    "ledTo": "Claude Prism, Groww Pulse",
    "color": "amber"
  },
  {
    "id": "now",
    "role": "Building",
    "company": "Portfolio sprint + NMIMS MBA",
    "period": "2025–present",
    "year": 2025,
    "skillUnlocked": "Ship velocity, vibe coding, AI-native development",
    "quote": "RAGBench. Policy Intelligence. ClimateLens. 10+ projects in 60 days.",
    "ledTo": null,
    "color": "amber",
    "active": true
  }
]
```

**Interaction model:**
- Desktop: horizontal scroll with CSS `scroll-snap-type: x mandatory`
- Mobile: vertical stack with tap-to-expand
- One node expanded at a time (accordion pattern)
- Expanded node shows: role, duration, skill unlocked, quote, "This led me to build: [project]"

### Section 03: Works Showcase (CMS-Powered)

**Component:** `WorksShowcase.jsx` (client component — fetches from Supabase)

**Data flow:**

```
Page loads
   │
   ▼
getPublishedWorks()  ←── Supabase query (status IN published, coming_soon)
   │
   ▼
Render cards in filterable grid
   │
   ├── Published card: title + desc + tags + "Open PDF →" button
   │      │
   │      └── Click → FileViewer overlay + trackView(id)
   │
   └── Coming Soon card: title + category + CountdownBadge
          │
          └── No click action, countdown runs live
```

**Filter tabs:** Generated dynamically from the categories that actually exist in the data. If zero `teardown` items exist, that tab doesn't render. Filtering is client-side (instant, no API calls).

**File viewer overlay:** Full-screen overlay with the embedded viewer. PDF uses native browser iframe. PPTX/DOCX use the Microsoft Office Online embed URL. Close on click-outside or × button.

### Section 04: Product Lab

**Component:** `ProductLab.jsx` (client component — interactive widgets)

```
┌──────────────────────────────────────────────────────────────┐
│  "This is how I think — not a deck, a working method"        │
│                                                              │
│  ┌─ Framework Explorer (left 45%) ──┐ ┌─ Worked Example ──┐ │
│  │                                  │ │                    │ │
│  │  ┌────────┐ ┌─────┐ ┌────────┐  │ │  FOCUSED framework │ │
│  │  │FOCUSED │ │GAME │ │SIFTED  │  │ │  applied to:       │ │
│  │  │(active)│ │     │ │        │  │ │  "Redesign ESG     │ │
│  │  └────────┘ └─────┘ └────────┘  │ │   reporting for    │ │
│  │                                  │ │   Indian NBFCs"    │ │
│  │  F — Find the problem            │ │                    │ │
│  │  O — Outline user segments       │ │  F: Compliance     │ │
│  │  C — Crystallize the pain        │ │     officers spend │ │
│  │  U — Understand alternatives     │ │     3 weeks on     │ │
│  │  S — Scope the solution          │ │     BRSR...        │ │
│  │  E — Execute MVP                 │ │                    │ │
│  │  D — Define metrics              │ │  (content updates  │ │
│  │                                  │ │   when framework   │ │
│  └──────────────────────────────────┘ │   tab changes)     │ │
│                                       └────────────────────┘ │
│  ┌─ Guesstimate Challenge ──────────────────────────────────┐│
│  │                                                          ││
│  │  "How many ESG software buyers exist in India?"          ││
│  │                                                          ││
│  │  Step 1 of 5: Define the scope                           ││
│  │  ┌──────────────────────────────────────────────────┐    ││
│  │  │ Companies with >500 employees, listed or NBFC/   │    ││
│  │  │ bank regulated by RBI/SEBI requiring ESG         │    ││
│  │  │ disclosure under BRSR mandate...                  │    ││
│  │  └──────────────────────────────────────────────────┘    ││
│  │                                                          ││
│  │        ○ ● ○ ○ ○           [ Next → ]                   ││
│  │                                                          ││
│  └──────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

**Data source:** `/data/frameworks.json` and `/data/guesstimates.json` — static files.

**Key interaction:** The framework explorer is a tabbed component where clicking FOCUSED / GAME / SIFTED swaps both the framework definition on the left AND the worked example on the right. The guesstimate stepper is a separate widget below — a 5-step walkthrough showing structured estimation thinking.

### Section 05: ESG × AI Edge

**Component:** `ESGEdge.jsx` (server component with client interactive parts)

```
┌──────────────────────────────────────────────────────────────┐
│  "The moat most PMs don't have"                              │
│                                                              │
│  ┌─ Iceberg (left 50%) ────────┐  ┌─ PM Superpowers ──────┐ │
│  │                              │  │                        │ │
│  │   ~~~ water line ~~~         │  │ ESG stack → PM skill   │ │
│  │                              │  │ ─────────────────────  │ │
│  │   ▲ BRSR        (visible)   │  │                        │ │
│  │   ▲ GHG Protocol             │──│→ Systems thinking     │ │
│  │   ▲ TCFD / IFRS S2          │  │                        │ │
│  │   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │  │                        │ │
│  │   ▼ IBM Envizi   (deep)     │──│→ Enterprise SaaS       │ │
│  │   ▼ Scope 3 methodology     │──│→ Data architecture     │ │
│  │   ▼ MSCI ESG / CDP / SBTi   │──│→ Compliance tradeoffs  │ │
│  │   ▼ ESG survey design       │──│→ User research         │ │
│  │   ▼ Sprih PO (4 years)      │──│→ Cross-functional lead │ │
│  │                              │  │                        │ │
│  └──────────────────────────────┘  └────────────────────────┘ │
│                                                              │
│  ┌──────┐  ┌──────────┐  ┌──────┐  ┌────────────┐           │
│  │ 201K │  │ 8 entities│  │ 4 yr │  │ ₹0 budget  │           │
│  │tCO₂e │  │ managed   │  │depth │  │ constraint │           │
│  └──────┘  └──────────┘  └──────┘  └────────────┘           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Implementation:** The iceberg is a custom SVG with hover states — hovering a skill item below the waterline highlights the corresponding PM superpower on the right. The stat callouts use `AnimatedCounter`. The connector lines between iceberg items and PM skills are drawn as SVG paths that animate on scroll-into-view.

---

## 7. Backend — API Routes

### 7.1 Chat API (`/api/chat/route.js`)

**Purpose:** Proxies chat messages to Groq API (free tier, llama-3.3-70b-versatile) with portfolio-specific system prompt. Server-side only — the Groq API key never touches the browser.

```
Browser                    Vercel API Route               Groq API
  │                            │                              │
  │  POST /api/chat            │                              │
  │  { messages, sessionId }   │                              │
  │ ──────────────────────────>│                              │
  │                            │  Rate limit check            │
  │                            │  (max 20 msgs/session/hour)  │
  │                            │                              │
  │                            │  POST /v1/messages            │
  │                            │  { system: portfolioPrompt,  │
  │                            │    model: claude-sonnet-4-6,  │
  │                            │    messages,                  │
  │                            │    max_tokens: 500 }         │
  │                            │ ─────────────────────────────>│
  │                            │                              │
  │                            │  { content: [...] }          │
  │                            │ <─────────────────────────────│
  │                            │                              │
  │                            │  Log to chat_logs table      │
  │                            │  (both user + assistant msg)  │
  │                            │                              │
  │  { reply: "..." }          │                              │
  │ <──────────────────────────│                              │
```

```javascript
// app/api/chat/route.js

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Server-side only — full access
)

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
const RATE_LIMIT_PER_HOUR = 20

export async function POST(request) {
  try {
    const { messages, sessionId } = await request.json()

    if (!messages || !sessionId) {
      return NextResponse.json(
        { error: 'Missing messages or sessionId' },
        { status: 400 }
      )
    }

    // ── Rate limiting ──────────────────────────────────
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count } = await supabase
      .from('chat_logs')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .eq('role', 'user')
      .gte('created_at', oneHourAgo)

    if (count >= RATE_LIMIT_PER_HOUR) {
      return NextResponse.json(
        { error: 'Too many messages. Try again in a bit.' },
        { status: 429 }
      )
    }

    // ── Call Groq API ──────────────────────────────────
    const lastUserMsg = messages[messages.length - 1]?.content || ''

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "I'm not sure how to answer that."

    // ── Log both messages ─────────────────────────────
    await supabase.from('chat_logs').insert([
      { session_id: sessionId, role: 'user', content: lastUserMsg },
      { session_id: sessionId, role: 'assistant', content: reply },
    ])

    return NextResponse.json({ reply })

  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Try again.' },
      { status: 500 }
    )
  }
}

// ── System Prompt ──────────────────────────────────────────
const SYSTEM_PROMPT = `You are "Ask Ayantika" — an AI assistant on Ayantika's portfolio website. You answer questions about Ayantika's background, projects, skills, and career goals. You speak in first person as if you ARE Ayantika, with a warm, direct, slightly playful tone.

ABOUT AYANTIKA:
- Sustainability Manager at Bajaj Finserv Group in Pune, India
- M.Sc. Environmental Science (University First Rank, University of Burdwan)
- MBA in Operations & Data Science at NMIMS Mumbai
- NextLeap AI PM Fellowship — Top 1% Fellow (Cohort 46)
- 4+ years cross-sector ESG experience: EY, Kosher Climate, Re Sustainability, Bajaj Finserv
- Internal Product Owner for Sprih (live GHG accounting SaaS) at Bajaj Finserv
- Actively transitioning into Product Management (APM/PM-1 roles)
- Target companies: AI-native, climate-tech, ESG-focused, fintech

ESG & TECHNICAL STACK:
IBM Envizi, GHG Protocol (Scope 1/2/3), BRSR/BRSR Core, GRI, TCFD, CDP, SBTi, MSCI ESG, IFRS S1/S2, CSRD
Consolidated 201,215 tCO₂e across 8 Bajaj Finserv entities
Scope 3: EPA EEIO spend-based, employee commute surveys, capital goods analysis

PORTFOLIO PROJECTS:
- RAGBench: Benchmarking 36 RAG pipeline configs with real GHG Protocol PDFs, $0 budget
- Policy Intelligence: Insurance PDF → personalized family protection intel (hybrid RAG + rules engine)
- Claude Prism: AI output evaluation layer (Fact/Assumption/Inference/Uncertain), 43-respondent survey
- ClimateLens: Climate risk intelligence copilot for Indian banks/NBFCs mapped to RBI framework
- Groww Pulse: BERTopic clustering of Play Store reviews for product insights
- Myntra Maya: Full agentic copilot redesign with 5-agent architecture, 30-respondent survey
- Meesho returns teardown: 1,055 Play Store review analysis

PM FRAMEWORKS:
FOCUSED (product design), GAME (guesstimate), SIFTED (estimation), JTBD (user needs)

TECH STACK (all free tier):
Groq, Ollama (local embeddings), ChromaDB, Supabase, Vercel, Next.js
Builds with AI coding agents: Windsurf, Cursor, Lovable

CAREER GOAL:
Product leadership (CPO or founder) at the intersection of ESG data infrastructure and AI, 10-20 year horizon.

RULES:
- Answer questions about Ayantika's work, projects, skills, and goals
- Be specific and cite real numbers (201K tCO₂e, 36 RAG configs, etc.)
- Keep answers under 150 words unless asked for detail
- If asked something completely unrelated to Ayantika or product/tech/ESG, politely redirect
- Never make up projects or experiences not listed above
- Be honest about gaps — if Ayantika hasn't done something, say so
- Tone: confident but not arrogant, warm, slightly witty`
```

### 7.2 View Counter (`/api/views/route.js`)

```javascript
// app/api/views/route.js

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const { workId } = await request.json()
  if (!workId) return NextResponse.json({ error: 'Missing workId' }, { status: 400 })

  await supabase.rpc('increment_view', { work_id: workId })
  return NextResponse.json({ ok: true })
}
```

### 7.3 Moderation Endpoint (`/api/moderation/route.js`)

```javascript
// app/api/moderation/route.js
// Admin-only: returns chat logs for weekly review

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('key')

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = searchParams.get('since') ||
    new Date(Date.now() - 7 * 86400000).toISOString()

  const { data, error } = await supabase
    .from('chat_logs')
    .select('*')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Group by session
  const sessions = {}
  data.forEach(log => {
    if (!sessions[log.session_id]) sessions[log.session_id] = []
    sessions[log.session_id].push(log)
  })

  return NextResponse.json({
    total_messages: data.length,
    total_sessions: Object.keys(sessions).length,
    sessions,
  })
}
```

---

## 8. Ask Ayantika — AI Chatbot

### 8.1 Architecture

```
┌─────────────────────────────────────────┐
│  ChatWidget.jsx (floating button)       │
│                                         │
│  State: closed / open                   │
│  Position: fixed bottom-right           │
│  Button: "💬 Ask me anything"           │
│                                         │
│  On open → slide-over panel (right)     │
│  ┌─────────────────────────────────┐    │
│  │ Ask Ayantika              [×]   │    │
│  │─────────────────────────────────│    │
│  │                                 │    │
│  │ Suggested questions (chips):    │    │
│  │ ┌─────────────────────────────┐ │    │
│  │ │ What makes you different?   │ │    │
│  │ │ Tell me about RAGBench      │ │    │
│  │ │ What's your PM framework?   │ │    │
│  │ └─────────────────────────────┘ │    │
│  │                                 │    │
│  │ Message bubbles area            │    │
│  │ (scrollable)                    │    │
│  │                                 │    │
│  │─────────────────────────────────│    │
│  │ [Type a question...    ] [Send] │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### 8.2 Frontend Implementation

```jsx
// components/chat/ChatWidget.jsx — key logic
'use client'
import { useState, useRef, useEffect } from 'react'

const SUGGESTED_QUESTIONS = [
  "What makes you different from other PM candidates?",
  "Tell me about RAGBench",
  "What's your ESG background?",
  "What PM frameworks do you use?",
  "What kind of roles are you looking for?",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => crypto.randomUUID())
  const scrollRef = useRef(null)

  async function sendMessage(text) {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      })
      const data = await res.json()

      if (data.error) {
        setMessages([...updated, {
          role: 'assistant',
          content: data.error
        }])
      } else {
        setMessages([...updated, {
          role: 'assistant',
          content: data.reply
        }])
      }
    } catch {
      setMessages([...updated, {
        role: 'assistant',
        content: "Oops — something went wrong. Try again?"
      }])
    }
    setLoading(false)
  }

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages])

  // ... render logic
}
```

### 8.3 Cost Control

| Lever | Implementation |
|---|---|
| Short system prompt | ~600 tokens — well under context limits |
| max_tokens: 400 | Replies capped at ~300 words |
| Context window: last 10 messages | Older messages dropped from API call |
| Rate limit: 20 msgs/session/hour | Checked server-side before API call |
| Model: llama-3.3-70b-versatile on Groq | Free tier — 14,400 req/day, zero cost |
| Graceful fallback | If Groq is down or rate-limited, show friendly message |
| Response caching | Cache frequent Q&A pairs in Supabase — skip API call entirely |

**Estimated cost:** At 20 visitors/day, each sending 5 messages → 100 API calls/day. Groq free tier allows 14,400 req/day. Monthly cost: ₹0.

### 8.4 Moderation Workflow

```
Weekly (every Monday):
  │
  ├── Open /admin → Chat Logs tab
  │
  ├── Review conversations grouped by session
  │   │
  │   ├── Normal questions → no action
  │   ├── Off-topic/spam → flag in DB
  │   └── Abusive → flag + add IP/session to blocklist
  │
  └── Check analytics:
      ├── Most asked questions → add to suggested chips
      ├── Questions chatbot struggled with → improve system prompt
      └── Recruiter questions → tailor responses
```

---

## 9. Admin CMS Panel

### 9.1 Access Flow

```
yourdomain.com/admin
       │
       ▼
┌─ Password Screen ─┐     Wrong password
│  Enter password    │ ──────────────────→ Stay on screen
│  [............]    │
│  [  Enter →  ]     │     Correct password
└────────────────────┘ ──────────────────→ sessionStorage('admin_authed')
                                                    │
                                                    ▼
                                           ┌─ Admin Dashboard ─┐
                                           │                    │
                                           │  Stats row         │
                                           │  (total/pub/soon/  │
                                           │   draft counts)    │
                                           │                    │
                                           │  ┌─ Tab: Upload ─┐ │
                                           │  │ File drop zone │ │
                                           │  │ Metadata form  │ │
                                           │  │ Status picker  │ │
                                           │  └────────────────┘ │
                                           │                    │
                                           │  ┌─ Tab: Manage ─┐ │
                                           │  │ List all works │ │
                                           │  │ Change status  │ │
                                           │  │ Edit/delete    │ │
                                           │  └────────────────┘ │
                                           │                    │
                                           │  ┌─ Tab: Logs ───┐ │
                                           │  │ Chat sessions  │ │
                                           │  │ Flag/review    │ │
                                           │  └────────────────┘ │
                                           └────────────────────┘
```

### 9.2 Status Lifecycle

```
                 ┌──────────────┐
       Upload ──>│    DRAFT     │  Only admin can see.
                 │  (invisible) │  Use for WIP — upload early,
                 └──────┬───────┘  polish metadata later.
                        │
           Set status ──┤
           to "coming   │
           soon"        ▼
                 ┌──────────────┐
                 │ COMING SOON  │  Visitors see teaser card:
                 │  (teaser)    │  title + category + countdown.
                 └──────┬───────┘  No file access.
                        │
           Set status ──┤        Optional: set reveal_date.
           to           │        If set, card shows "3d 12h 4m"
           "published"  │        countdown timer live.
                        ▼
                 ┌──────────────┐
                 │  PUBLISHED   │  Full card with embedded
                 │  (live)      │  file viewer. View count
                 └──────────────┘  increments on open.
```

**Key insight for your workflow:** Upload your Myntra teardown PPTX today as a draft. Add the title, category ("teardown"), and tags. Set status to "coming soon" with reveal date = 4 days from now. Visitors immediately see a teaser card with countdown. When you're satisfied with the deck, flip to "published" from the admin dropdown. Zero Git operations.

---

## 10. Analytics & Moderation

### 10.1 Events Tracked

| Event | Trigger | Data stored |
|---|---|---|
| `page_view` | Any page load | `{ path, referrer }` |
| `section_view` | Section scrolled into view | `{ section: "roadmap" }` |
| `project_click` | Work card opened | `{ workId, title, category }` |
| `file_view` | File viewer opened | `{ workId, fileType }` |
| `filter_used` | Category filter clicked | `{ category }` |
| `roadmap_expand` | Timeline node expanded | `{ nodeId }` |
| `chat_opened` | Chat panel opened | `{}` |
| `framework_tab` | Framework tab switched | `{ framework }` |
| `guesstimate_step` | Guesstimate step advanced | `{ step, questionId }` |

### 10.2 Tracking Implementation

```javascript
// lib/analytics.js
import { supabase } from './supabase'

let visitorId = null

function getVisitorId() {
  if (visitorId) return visitorId
  if (typeof window === 'undefined') return null
  visitorId = sessionStorage.getItem('visitor_id')
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    sessionStorage.setItem('visitor_id', visitorId)
  }
  return visitorId
}

export function trackEvent(eventType, data = {}, section = null) {
  // Fire and forget — never block the UI
  supabase.rpc('log_event', {
    p_type: eventType,
    p_data: data,
    p_section: section,
    p_visitor: getVisitorId(),
  }).then(() => {})
}
```

### 10.3 Analytics Dashboard (Admin Tab)

The admin panel's third tab shows a simple analytics view:

- Most viewed works (sorted by view_count)
- Most common chat questions (grouped by similarity)
- Section engagement (which sections get scrolled to most)
- Visitor count (unique session IDs per day)

All queries run directly against Supabase using the service role key from the API route, never exposed client-side.

---

## 11. Deployment & Environment

### 11.1 Environment Variables

```bash
# .env.local (never committed)

# Supabase — from supabase.com dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Supabase service role — server-side only, full DB access
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Groq API — from console.groq.com
GROQ_API_KEY=gsk_...

# Admin access
ADMIN_PASSWORD=your-strong-password-here

# Site metadata
NEXT_PUBLIC_SITE_URL=https://ayantika.dev
```

**Critical distinction:** Variables starting with `NEXT_PUBLIC_` are bundled into client-side JavaScript and visible to anyone. That's fine for the Supabase anon key (it's designed for public use — RLS protects the data). The `SUPABASE_SERVICE_ROLE_KEY` and `CLAUDE_API_KEY` are server-only — they exist only in API routes and never reach the browser.

### 11.2 Vercel Configuration

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // ISR: regenerate static pages every 5 minutes
  // (so new published works appear without redeploy)
  experimental: {
    // App Router handles this via revalidate in page/layout
  },
}

module.exports = nextConfig
```

### 11.3 ISR (Incremental Static Regeneration) Strategy

| Page / Component | Rendering | Revalidation |
|---|---|---|
| `/` (home page) | SSG with ISR | `revalidate: 300` (5 minutes) |
| Hero section | Static | Never changes (hardcoded) |
| Roadmap | Static (server component) | Loaded from JSON at build |
| Works Showcase | Client-side fetch | Real-time from Supabase |
| Product Lab | Static (server component) | Loaded from JSON at build |
| ESG Edge | Static | Never changes |
| Chat widget | Client-side | Real-time API calls |
| `/admin` | Client-side only | No SSR, no ISR |

**Why Works Showcase fetches client-side:** This is the one section that changes frequently (you upload new works via admin). Client-side fetch from Supabase ensures visitors always see the latest published works without waiting for ISR revalidation. Every other section is static content that only changes when you push code.

---

## 12. Free Tier Budget Map

| Service | What it does | Free tier limit | Your projected usage |
|---|---|---|---|
| **Vercel** | Hosting, SSR, API routes | 100GB bandwidth, 100 hours compute | ~2GB/month, ~5 hours compute |
| **Supabase DB** | PostgreSQL (works, chat_logs, events) | 500MB, 50K rows | <1MB, <5K rows |
| **Supabase Storage** | PPT/PDF file hosting | 1GB storage, 2GB bandwidth | ~200MB files, ~500MB bandwidth |
| **Supabase Auth** | (Not used — password-based admin) | Unlimited | 0 |
| **Groq API** | Chatbot (llama-3.3-70b-versatile) | 14,400 req/day free | ~100 req/day → ₹0 |
| **Google Fonts** | Fraunces, Inter | Free forever | — |
| **Office Online Viewer** | PPTX/DOCX rendering | Free, no API key | — |

**Total monthly cost: ₹0** — every service on free tier, no exceptions

**Cost reduction levers if needed:**
- Cache common chat responses in Supabase (check if question was asked before, return cached answer)
- Reduce `max_tokens` from 500 to 300
- Switch chatbot model from `claude-sonnet-4-6` to `claude-haiku-4-5-20251001` (cheaper, still good)
- Add a "chatbot is sleeping" mode during low-traffic hours

---

## 13. Implementation Phases

### Phase 1 — Foundation (Days 1–3)

**Goal:** Live portfolio with static content, deployed to Vercel.

| Task | Files | Output |
|---|---|---|
| Scaffold Next.js 14 (App Router) | `npx create-next-app` | Running locally |
| Set up design tokens in CSS | `globals.css` | Colors, fonts, spacing working |
| Build Navbar + Footer | `Navbar.jsx`, `Footer.jsx` | Navigation shell |
| Build Hero section | `Hero.jsx`, `TypewriterText.jsx`, `AnimatedCounter.jsx` | Headline + counters animating |
| Build ESG Edge section | `ESGEdge.jsx`, `IcebergDiagram.jsx` | Static iceberg + stats |
| Deploy to Vercel | `vercel deploy` | Live at your-domain.vercel.app |

**Checkpoint:** A live URL with hero + ESG edge looking polished. Share with 2 trusted contacts for first-impression feedback.

### Phase 2 — Roadmap + Projects (Days 4–7)

**Goal:** The two most important differentiating sections live.

| Task | Files | Output |
|---|---|---|
| Create roadmap data | `data/roadmap.json` | 6 nodes with real content |
| Build Pivot Roadmap | `PivotRoadmap.jsx`, `RoadmapNode.jsx` | Scrollable timeline with expand |
| Set up Supabase project | SQL Editor → run schema | DB + storage bucket ready |
| Build Admin CMS panel | `admin/page.jsx`, `UploadForm.jsx`, `WorksManager.jsx` | Upload works from browser |
| Build Works Showcase | `WorksShowcase.jsx`, `ProjectCard.jsx`, `FileViewer.jsx` | Filterable grid with viewer |
| Upload 3–5 existing works | Via admin panel | Content visible on live site |

**Checkpoint:** Recruiters can now see your timeline story AND your actual deliverables. This is the "minimum wow" threshold.

### Phase 3 — Product Lab + Chat (Days 8–12)

**Goal:** The interactive proof-of-product-thinking sections.

| Task | Files | Output |
|---|---|---|
| Create framework data | `data/frameworks.json` | FOCUSED, GAME, SIFTED + examples |
| Build Framework Explorer | `FrameworkExplorer.jsx` | Tab-switching with live examples |
| Create guesstimate data | `data/guesstimates.json` | 2–3 problems with step-by-step |
| Build Guesstimate Stepper | `GuesstimateStepper.jsx` | Interactive step-through widget |
| Set up Groq API key | Vercel env vars (free from console.groq.com) | API key configured |
| Build Chat API route | `api/chat/route.js` | Proxy working |
| Build Chat Widget | `ChatWidget.jsx`, `ChatMessage.jsx` | Floating chat panel with Claude |

**Checkpoint:** Full portfolio experience. Chat works. Lab works. Everything deployed.

### Phase 4 — Polish + Analytics (Days 13–15)

**Goal:** Production-quality polish and data collection.

| Task | Files | Output |
|---|---|---|
| Add scroll animations | All sections | Fade-up on scroll-into-view |
| Add contour background motif | `globals.css`, `contour-pattern.svg` | Subtle terrain lines |
| Build analytics tracking | `lib/analytics.js` | Events logging to Supabase |
| Build Chat Logs viewer (admin) | `ChatLogsViewer.jsx` | Review conversations |
| Add dark mode | `ThemeProvider.jsx` | Toggle in navbar |
| SEO: og-image, meta tags, sitemap | `layout.jsx`, `public/og-image.png` | Social preview looking sharp |
| Mobile responsive pass | All components | Clean on phone |
| Performance audit | Lighthouse | Score > 90 on all metrics |

**Checkpoint:** Ready to share with hiring managers. Everything tracked. Chat moderated.

---

## Appendix A: Key Commands

```bash
# Local development
npm run dev                              # Start dev server at localhost:3000

# Deploy
git push origin main                     # Vercel auto-deploys on push

# Upload a new work (no code needed)
# 1. Go to yourdomain.com/admin
# 2. Drag and drop file
# 3. Fill metadata, set status
# 4. Done — live in 3 seconds

# Check chat logs
curl "https://yourdomain.com/api/moderation?key=YOUR_ADMIN_PASSWORD&since=2026-08-11"

# Supabase CLI (optional, for schema changes)
npx supabase login
npx supabase db push
```

---

## Appendix B: Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Supabase free tier exceeded | Low | File uploads stop | Compress files before upload. 1GB stores ~25 PPTX files. |
| Groq rate limit hit | Low | Chatbot throttled | 14,400 req/day is generous. Cache repeated questions in Supabase for instant replies. |
| Office Online viewer down | Very low | PPTX won't render | Fallback: direct download link always available. |
| Admin password leaked | Low | Unauthorized uploads | Change via Vercel env vars. No real data at risk. |
| Chat abuse/spam | Medium | Offensive content in logs | Rate limiting + weekly moderation review. Flag mechanism. |
| Vercel bandwidth exceeded | Very low | Site goes down | 100GB/month. A portfolio won't get close. |

---

*Document authored: August 2026*
*Stack: Next.js 14 · Supabase · Vercel · Claude Sonnet 4.6*
*Budget: ₹0 — every service free tier, no exceptions*
