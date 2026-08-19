# Phase-Wise Implementation Guide

> **Portfolio:** "The Signal, not the Noise"
> **Monthly cost:** ₹0 — every service free tier, no exceptions
> **Companion doc:** SYSTEM_ARCHITECTURE.md

---

## Table of Contents

1. [Cost Fix — Truly ₹0 Architecture](#1-cost-fix--truly-0-architecture)
2. [Reframed Roadmap — PM Skills from ESG Consulting](#2-reframed-roadmap--pm-skills-from-esg-consulting)
3. [Phase A — Foundation & Identity](#3-phase-a--foundation--identity)
4. [Phase B — The Story Engine (Roadmap + Projects)](#4-phase-b--the-story-engine-roadmap--projects)
5. [Phase C — Proof-of-Thinking (Product Lab)](#5-phase-c--proof-of-thinking-product-lab)
6. [Phase D — Living Portfolio (Chat + CMS + Analytics)](#6-phase-d--living-portfolio-chat--cms--analytics)
7. [Phase E — Polish & Ship](#7-phase-e--polish--ship)
8. [Post-Launch Ops](#8-post-launch-ops)

---

## 1. Cost Fix — Truly ₹0 Architecture

The SYSTEM_ARCHITECTURE.md showed ~$0.50–$1.00/month for Claude API. That's eliminated. The chatbot now runs on **Groq free tier** — a service you already use for RAGBench.

### What changed

| Component | Before | After | Why |
|---|---|---|---|
| Chatbot LLM | Claude Sonnet 4.6 (paid API) | Groq free tier — `llama-3.3-70b-versatile` | 14,400 req/day free, zero cost |
| API route | `/api/chat` called Anthropic | `/api/chat` calls Groq | Same proxy pattern, different endpoint |
| System prompt | Identical | Identical | Groq supports system prompts |
| Quality | Excellent | Very good | Llama 3.3 70B handles conversational Q&A well |

### Updated Chat API Route

```javascript
// app/api/chat/route.js — Groq version (₹0)

export async function POST(request) {
  const { messages, sessionId } = await request.json()

  // Rate limiting (same as before — check Supabase chat_logs count)

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
  const reply = data.choices?.[0]?.message?.content
    || "I'm not sure how to answer that."

  // Log to Supabase (same as before)

  return NextResponse.json({ reply })
}
```

### Updated env vars

```bash
# .env.local — replace CLAUDE_API_KEY with:
GROQ_API_KEY=gsk_...          # From console.groq.com → API Keys
```

### Final ₹0 budget confirmation

| Service | Free tier | Your usage | Cost |
|---|---|---|---|
| Vercel | 100GB bandwidth | ~2GB/month | ₹0 |
| Supabase DB | 500MB | <1MB | ₹0 |
| Supabase Storage | 1GB | ~200MB | ₹0 |
| Groq API | 14,400 req/day | ~100 req/day | ₹0 |
| Google Fonts | Unlimited | 2 fonts | ₹0 |
| Office Online Viewer | Unlimited | ~50 views/month | ₹0 |
| **Total** | | | **₹0** |

---

## 2. Reframed Roadmap — PM Skills from ESG Consulting

The original roadmap told an ESG career story. The reframed version tells a **PM skills acquisition story** — each ESG role is positioned as the environment where a specific product skill was pressure-tested and earned.

The core narrative shift: *"I didn't pivot from ESG to Product. I've been doing product work for 4 years — I just did it inside sustainability."*

### Updated Roadmap Data

```json
[
  {
    "id": "ey",
    "company": "Ernst & Young",
    "role": "Climate Change & Sustainability — Advisory",
    "period": "2019–2020",
    "pmSkillUnlocked": "Stakeholder Management & Requirements Translation",
    "headline": "Translating ambiguity into actionable client deliverables",
    "story": "Worked with enterprise clients navigating India's evolving ESG disclosure landscape. Every engagement started with a vague regulatory mandate and ended with a structured compliance roadmap. This was product scoping in disguise — understanding what the 'user' (compliance officer) actually needed versus what the regulation literally said, reconciling multiple stakeholder priorities, and delivering under deadline.",
    "pmEvidence": [
      "Scoped client engagements by decomposing vague regulatory requirements into workstreams — the same skill as turning a business objective into a feature spec",
      "Managed competing stakeholder inputs (legal, operations, finance) to converge on a single deliverable — cross-functional alignment",
      "Learned to distinguish between what clients asked for and what they actually needed — the gap that defines great product thinking"
    ],
    "transferableFramework": "Stakeholder mapping, requirements gathering, scope definition, delivery under constraints",
    "color": "teal"
  },
  {
    "id": "kosher",
    "company": "Kosher Climate India",
    "role": "Sustainability Analyst — GHG Inventories",
    "period": "2020–2021",
    "pmSkillUnlocked": "Data Architecture & Systems Thinking",
    "headline": "Building data collection systems from zero",
    "story": "Built carbon inventories for organizations that had never measured their emissions. This meant designing the data collection architecture from scratch — which departments own which data, what format it arrives in, where gaps exist, and how to make the system repeatable without me. I was designing data products before I had the vocabulary for it.",
    "pmEvidence": [
      "Designed end-to-end data collection workflows across multiple departments — information architecture and data pipeline design",
      "Created repeatable templates that non-technical teams could use without training — UX thinking applied to internal tools",
      "Identified and prioritized data gaps using materiality logic — the same 80/20 prioritization PMs use to decide what to build first"
    ],
    "transferableFramework": "Data modeling, process design, build-for-others-not-yourself, prioritization by impact",
    "color": "teal"
  },
  {
    "id": "re-sustainability",
    "company": "Re Sustainability Limited",
    "role": "Sustainability Consultant → Internal Product Owner",
    "period": "2021–2022",
    "pmSkillUnlocked": "Product Ownership & Enterprise SaaS Intuition",
    "headline": "From using the tool to owning the tool",
    "story": "Started as a consultant deploying IBM Envizi (enterprise ESG SaaS) for clients. Within months, became the internal product owner — triaging bugs, defining configuration requirements, writing user stories for the vendor team, and training end-users. This was the moment I realized I had been gravitating toward product work my entire career. I wasn't just using software — I was shaping how it worked for its users.",
    "pmEvidence": [
      "Owned the product backlog for Envizi configuration — wrote user stories, prioritized bugs vs. features, negotiated scope with the vendor",
      "Ran user training sessions and synthesized feedback into product improvement requests — user research in practice",
      "Served as the bridge between technical vendor team and non-technical business stakeholders — the exact PM communication layer"
    ],
    "transferableFramework": "Product ownership, backlog management, user story writing, vendor management, feedback synthesis",
    "ledTo": "ClimateLens (concept)",
    "color": "green"
  },
  {
    "id": "bajaj",
    "company": "Bajaj Finserv Group",
    "role": "Sustainability Manager — ESG Data Architecture & Sprih PO",
    "period": "2022–Present",
    "pmSkillUnlocked": "Platform Thinking, Data Governance & Scaled Execution",
    "headline": "Owning the data platform across 8 regulated entities",
    "story": "Promoted to manage group-level ESG data architecture across Bajaj Finserv's entire portfolio — 8 regulated financial services entities, each with different data maturity. Built and owned the GHG consolidation workbook (201,215 tCO₂e). Became product owner of Sprih, a live enterprise GHG accounting SaaS. Designed cross-entity data pipelines, ran Scope 3 analysis using EPA EEIO methodology, and coordinated BRSR reporting with compliance, finance, and operations teams across all entities.",
    "pmEvidence": [
      "Product owner of Sprih (live GHG SaaS) — defining requirements, managing rollout across entities, prioritizing feature requests from 8 different business units",
      "Designed the group GHG consolidation architecture — a data platform problem requiring entity-level granularity and group-level aggregation",
      "Ran the FY25→FY26 variance analysis workflow — built the process, trained teams, delivered board-ready outputs",
      "Coordinated BRSR reporting across regulated entities — multi-stakeholder program management with hard regulatory deadlines",
      "Conducted vendor evaluation (6 vendors, weighted scorecard) for the Mega Forest Development Project — structured decision-making under ambiguity"
    ],
    "transferableFramework": "Platform thinking, data governance, program management, vendor evaluation, cross-functional execution at scale",
    "ledTo": "RAGBench, Policy Intelligence",
    "color": "green"
  },
  {
    "id": "nextleap",
    "company": "NextLeap — AI PM Fellowship",
    "role": "Top 1% Fellow, Cohort 46",
    "period": "2024",
    "pmSkillUnlocked": "Structured Product Frameworks & AI-Native Thinking",
    "headline": "Formalizing the instinct into repeatable method",
    "story": "The fellowship gave structure to what I'd been doing intuitively for years. Learned and applied FOCUSED, GAME, SIFTED, and JTBD frameworks. Built teardowns of Myntra (agentic copilot redesign, 30 respondents), Meesho (1,055 review analysis), and Groww (BERTopic clustering). More importantly, learned to think about AI-native product design — not just bolting AI onto existing flows, but rethinking the flow around AI capabilities.",
    "pmEvidence": [
      "Completed structured teardowns with real primary research (30-respondent survey for Myntra Maya, 43-respondent survey for Claude Prism)",
      "Applied guesstimate frameworks (GAME, SIFTED) to real market sizing problems",
      "Designed a 5-agent agentic architecture for Myntra Maya — systems design for AI products",
      "Scored Top 1% — validated that the product instinct built over 4 years of consulting was real"
    ],
    "transferableFramework": "FOCUSED, GAME, SIFTED, JTBD, product teardowns, primary research, AI product design",
    "color": "amber"
  },
  {
    "id": "now",
    "company": "Portfolio Sprint + NMIMS MBA",
    "role": "Building — 10+ products in 60 days",
    "period": "2025–Present",
    "pmSkillUnlocked": "Ship Velocity & Zero-to-One Execution",
    "headline": "Proving I don't just plan products — I ship them",
    "story": "The portfolio sprint is the final proof point. Built and shipped RAGBench (36 RAG pipeline configs, real GHG Protocol PDFs), Policy Intelligence (insurance PDF to family protection intel), Claude Prism (AI output evaluation, deployed), ClimateLens (climate risk copilot for Indian banks), and Groww Pulse (BERTopic review clustering). All under a ₹0 budget using Groq, Ollama, ChromaDB, Supabase, and Vercel. Built with AI coding agents (Windsurf, Cursor, Lovable) — the way AI-native PMs will build in 2027.",
    "pmEvidence": [
      "Shipped 10+ products in 60 days — velocity is a product skill",
      "Every project follows the same discipline: problem → user research → build → deploy → measure",
      "₹0 budget constraint turned into a feature — forces ruthless prioritization and creative architecture",
      "Each project is a self-contained case study with problem, insight, solution, and honest reflection on what failed"
    ],
    "transferableFramework": "Zero-to-one execution, rapid prototyping, constraint-driven design, vibe coding with AI agents",
    "active": true,
    "color": "amber"
  }
]
```

### How this renders differently on the portfolio

**Before (ESG-framed):**
> *Re Sustainability — Deployed IBM Envizi. Became internal product owner.*

**After (PM-framed):**
> *Re Sustainability — Product Ownership & Enterprise SaaS Intuition*
> *"From using the tool to owning the tool"*
> Hover/expand → Owned product backlog, wrote user stories, ran user training, bridged vendor and stakeholders.

The expanded node now shows three concrete PM evidence bullets — each one translatable to a PM interview answer. A recruiter hovering over any node gets a "oh, she's been doing this all along" reaction instead of "she's pivoting from sustainability."

---

## 3. Phase A — Foundation & Identity

### Objective
A live, deployed portfolio shell with the design system applied, Hero section complete, and Navbar + Footer functional. This is the "skeleton with skin" — no dynamic data, no database, just the visual identity and first impression locked in.

### Prerequisites
- Node.js 18+ installed locally
- Vercel account (free)
- GitHub repo created
- Google Fonts: Fraunces + Inter (added to Next.js layout)

### Tasks

**A1 — Scaffold and configure**
- Run `npx create-next-app@latest ayantika-portfolio` (App Router, Tailwind, TypeScript optional — JavaScript is fine for vibe coding)
- Set up Tailwind config with custom design tokens:

```javascript
// tailwind.config.js — extend with portfolio design system
module.exports = {
  theme: {
    extend: {
      colors: {
        forest: '#0D1F1A',
        parchment: '#F5F2EB',
        green: { DEFAULT: '#2D6A4F', light: '#F0FDF4' },
        amber: { DEFAULT: '#E9C46A', light: '#FEF3C7' },
        teal: '#264653',
        sand: '#D5CCBA',
        error: '#D85A30',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

- Create `globals.css` with the contour background motif (SVG pattern at 4% opacity), CSS custom properties, and base typography scale
- Deploy initial scaffold to Vercel — confirm live URL works

**A2 — Build layout shell**
- `Navbar.jsx` — minimal: name/logo left, theme toggle center, "Let's talk" CTA right. Fixed on scroll. No hamburger menu on mobile — just the name and CTA.
- `Footer.jsx` — "Open to APM/PM-1 roles in AI-native, climate-tech, ESG-focused companies." LinkedIn · GitHub · Email links. "Built with Next.js, Supabase, and too much coffee." one-liner.
- `ThemeProvider.jsx` — dark/light mode toggle using CSS custom properties. Store preference in `localStorage`.

**A3 — Build Hero section**
- `Hero.jsx` — full viewport height, two-column layout (60/40)
- Left column: `TypewriterText.jsx` for headline animation, subheadline as static text, three `AnimatedCounter.jsx` components (36 RAG configs / 201,215 tCO₂e / 10+ products), scroll CTA
- Right column: Animated SVG molecule diagram — 6 skill nodes (Data Architecture, User Research, Stakeholder Mapping, Product Ownership, AI Design, Ship Velocity) connecting with staggered fade-in on page load
- Mobile: stack vertically, molecule hides, counters become a horizontal scroll strip

**A4 — Build ESG Edge section**
- `ESGEdge.jsx` — the iceberg diagram + PM superpower mapping
- `IcebergDiagram.jsx` — custom SVG with waterline. Above: BRSR, GHG Protocol, TCFD/IFRS S2. Below: IBM Envizi, Scope 3 methodology, MSCI/CDP/SBTi, ESG survey design, Sprih PO.
- Right side: PM superpower labels connected by SVG paths. Hover on an iceberg item → highlights the corresponding PM skill.
- Stat callouts at bottom: 201K tCO₂e · 8 entities · 4 years · ₹0 budget
- These stat numbers use `AnimatedCounter` (triggers on scroll-into-view via IntersectionObserver)

### Phase A deliverable
A live Vercel URL with a polished hero + ESG section. The design identity is locked — colors, fonts, spacing, motion all working. Share with 2 trusted people for gut-check feedback before building further.

### Phase A file checklist

```
app/
  layout.jsx            ✓ Fonts, metadata, ThemeProvider
  page.jsx              ✓ Assembles Hero + ESGEdge
  globals.css           ✓ Design tokens, contour motif, base styles
components/
  layout/
    Navbar.jsx          ✓
    Footer.jsx          ✓
    ThemeProvider.jsx    ✓
  sections/
    Hero.jsx            ✓
    ESGEdge.jsx         ✓
  ui/
    TypewriterText.jsx  ✓
    AnimatedCounter.jsx ✓
    IcebergDiagram.jsx  ✓
public/
  contour-pattern.svg   ✓
  og-image.png          ✓ (placeholder — replace in Phase E)
  favicon.ico           ✓
tailwind.config.js      ✓ Extended with design tokens
```

---

## 4. Phase B — The Story Engine (Roadmap + Projects)

### Objective
The two sections that make or break recruiter engagement: the career roadmap (reframed as a PM skill journey) and the works showcase (CMS-powered, self-updating).

### Prerequisites
- Phase A complete and deployed
- Supabase project created (free tier)
- `supabase-schema.sql` ready to run

### Tasks

**B1 — Set up Supabase**
- Create project at supabase.com (region: Singapore)
- Run the full SQL schema in SQL Editor (works table, chat_logs table, visitor_events table, RLS policies, storage bucket)
- Create storage bucket: `portfolio-works` (public: ON)
- Copy env vars to Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Install SDK: `npm install @supabase/supabase-js`
- Create `lib/supabase.js` with shared client and helper functions

**B2 — Build the Pivot Roadmap**
- Create `data/roadmap.json` using the PM-reframed data from Section 2 of this document
- `PivotRoadmap.jsx` — the winding path timeline
  - Desktop: horizontal scroll with `scroll-snap-type: x mandatory`, CSS-drawn winding SVG path connecting nodes
  - Mobile: vertical stack, no horizontal scroll
  - Each node shows: company, PM skill unlocked (as the headline), period badge
  - Click/tap to expand: full story, PM evidence bullets, "This led me to build: [project]" link
  - One node expanded at a time (accordion)
  - The "Now" node glows with a subtle pulse animation (active indicator)
- `RoadmapNode.jsx` — single node component (collapsed + expanded states)

**Key design decision for roadmap rendering:**

```
Collapsed node:
┌─────────────────────────────┐
│  ◉ Bajaj Finserv Group      │
│    2022–Present              │
│    Platform Thinking &       │
│    Scaled Execution          │
│                    [expand ↓]│
└─────────────────────────────┘

Expanded node:
┌─────────────────────────────────────────────────────┐
│  ◉ Bajaj Finserv Group                              │
│    Sustainability Manager — ESG Data & Sprih PO     │
│    2022–Present                                      │
│                                                      │
│  "Owning the data platform across 8 regulated        │
│   entities"                                          │
│                                                      │
│  PM evidence:                                        │
│  → Product owner of Sprih (live GHG SaaS)           │
│  → Designed group GHG consolidation architecture     │
│  → Multi-stakeholder program management with         │
│    hard regulatory deadlines                         │
│  → Vendor evaluation: 6 vendors, weighted scorecard  │
│                                                      │
│  Skills: Platform thinking · Data governance ·       │
│          Program management · Vendor evaluation      │
│                                                      │
│  This led me to build → RAGBench, Policy Intel      │
│                                            [close ↑]│
└─────────────────────────────────────────────────────┘
```

**B3 — Build Admin CMS Panel**
- `app/admin/page.jsx` — the password-protected upload panel
- Uses the admin components already built (UploadForm, WorksManager)
- Admin password stored in Vercel env var `ADMIN_PASSWORD`
- Session-based auth via `sessionStorage` (not Supabase Auth — simpler, free)
- Features: drag-and-drop upload, metadata form (title, category, description, tags), status picker (draft / coming_soon / published), reveal date for coming_soon, featured toggle, edit existing works, delete works

**B4 — Build Works Showcase (public)**
- `WorksShowcase.jsx` — fetches from Supabase on mount, renders cards
- `ProjectCard.jsx` — single card component:
  - Published: title + description + tags + "Open PDF →" button
  - Coming Soon: title + category + `CountdownBadge` with live countdown + 🔒 "In progress" message
- `FileViewer.jsx` — full-screen overlay:
  - PDF: native browser `<iframe src="{url}#toolbar=0">`
  - PPTX/DOCX: Microsoft Office Online embed `https://view.officeapps.live.com/op/embed.aspx?src={encoded_url}`
  - Download button always available as fallback
- `FilterTabs.jsx` — generated from categories that exist in data (empty categories don't show)
- `CountdownBadge.jsx` — live countdown that updates every minute

**B5 — Upload initial content**
- Upload 3–5 existing works via the admin panel:
  - Myntra Maya teardown (PPTX) → published
  - RAGBench PRD (PDF) → published
  - Claude Prism case study (PDF) → published
  - Meesho returns analysis (PDF) → published
  - Policy Intelligence (PPTX) → coming_soon with reveal date
- Verify: all published works visible on live portfolio, coming_soon shows countdown, drafts are invisible

### Phase B deliverable
The portfolio now tells a complete story: the roadmap explains *how* each PM skill was earned, and the works section shows *what* was built with those skills. Recruiters landing on this can spend 5 minutes and understand the full picture. This is the **"minimum wow" milestone** — everything after this is enhancement.

### Phase B file checklist

```
lib/
  supabase.js           ✓
  constants.js          ✓ Categories, statuses, colors
data/
  roadmap.json          ✓ PM-reframed (from Section 2)
components/
  sections/
    PivotRoadmap.jsx    ✓
    WorksShowcase.jsx   ✓
  ui/
    RoadmapNode.jsx     ✓
    ProjectCard.jsx     ✓
    FileViewer.jsx      ✓
    FilterTabs.jsx      ✓
    CountdownBadge.jsx  ✓
  admin/
    AdminAuth.jsx       ✓
    UploadForm.jsx      ✓
    WorksManager.jsx    ✓
app/
  admin/page.jsx        ✓
  page.jsx              ✓ Updated to include Roadmap + Works
```

---

## 5. Phase C — Proof-of-Thinking (Product Lab)

### Objective
The section that separates this portfolio from every other "I-did-a-case-study" PM site. The Product Lab shows *how you think* — not through a static deck, but through an interactive framework explorer and a guesstimate challenge visitors can actually try.

### Prerequisites
- Phase B complete
- Framework and guesstimate content prepared (JSON files)

### Tasks

**C1 — Create framework content**
- `data/frameworks.json` — three frameworks fully defined:

```json
{
  "FOCUSED": {
    "name": "FOCUSED",
    "purpose": "Product design and feature scoping",
    "steps": [
      { "letter": "F", "name": "Find the problem", "desc": "What's the real pain point? Not the symptom." },
      { "letter": "O", "name": "Outline user segments", "desc": "Who experiences this pain and how differently?" },
      { "letter": "C", "name": "Crystallize the pain", "desc": "Quantify the cost of the problem to the user." },
      { "letter": "U", "name": "Understand alternatives", "desc": "How do users solve this today? What's broken?" },
      { "letter": "S", "name": "Scope the solution", "desc": "Define MVP boundaries ruthlessly." },
      { "letter": "E", "name": "Execute MVP", "desc": "Build the smallest thing that tests the hypothesis." },
      { "letter": "D", "name": "Define metrics", "desc": "How do you know it worked? North star + guardrails." }
    ],
    "workedExample": {
      "problem": "ESG compliance officers at Indian NBFCs spend 3+ weeks compiling BRSR reports manually",
      "applied": {
        "F": "Compliance officers at mid-size NBFCs waste 15–20 days per reporting cycle collecting, verifying, and formatting ESG data across departments.",
        "O": "Primary: compliance officers at NBFCs with 500–5000 employees. Secondary: CFOs who sign off. Tertiary: board audit committees.",
        "C": "At ₹1.5L/month avg salary × 0.75 months wasted = ₹1.12L per officer per year. 500 NBFCs × 2 officers avg = ₹11.25 crore market pain.",
        "U": "Excel templates (60%), external consultants (30%), enterprise ESG SaaS like Envizi (10% — too expensive for mid-tier).",
        "S": "MVP: auto-ingest utility bills + fleet data → pre-fill BRSR Principle 6 (environment). One principle, one entity, one year.",
        "E": "Upload-based web app. OCR utility bills, map to GHG emission factors, output BRSR-formatted section. Test with 5 NBFCs.",
        "D": "North star: time-to-complete for Principle 6 drops from 5 days to 1 day. Guardrail: data accuracy stays >95%."
      }
    }
  },
  "GAME": {
    "name": "GAME",
    "purpose": "Guesstimate and market sizing",
    "steps": [
      { "letter": "G", "name": "Ground the question", "desc": "Clarify what exactly you're estimating." },
      { "letter": "A", "name": "Assumptions & anchors", "desc": "State known facts and reasonable assumptions." },
      { "letter": "M", "name": "Math layer by layer", "desc": "Build the estimate top-down or bottom-up." },
      { "letter": "E", "name": "Error-check & sanity", "desc": "Does the answer pass the smell test?" }
    ],
    "workedExample": {
      "problem": "How many ESG software buyers exist in India?",
      "applied": {
        "G": "We're estimating the number of organizations in India that would actively purchase ESG/sustainability management software in 2026.",
        "A": "SEBI BRSR mandate covers top 1000 listed companies. RBI has ~85 NBFCs with ESG requirements. ~50 public sector banks/insurers. ~500 large private companies with voluntary ESG targets. Total addressable: ~1,635 entities.",
        "M": "BRSR-mandated (must buy): ~1,000 × 70% not yet using SaaS = 700. NBFCs + banks: 135 × 60% = 81. Voluntary adopters: 500 × 30% = 150. Total: ~931 active buyers.",
        "E": "India's ESG SaaS market is ~$50M (industry reports). At avg $30K/deal, that's ~1,667 buyers. Our bottom-up estimate of 931 is conservative but in the right order of magnitude. Reasonable."
      }
    }
  },
  "SIFTED": {
    "name": "SIFTED",
    "purpose": "Estimation problems with multiple variables",
    "steps": [
      { "letter": "S", "name": "Scope it", "desc": "Define geography, time, and exact metric." },
      { "letter": "I", "name": "Identify segments", "desc": "Break into non-overlapping groups." },
      { "letter": "F", "name": "Fact-anchor each segment", "desc": "Pin one real number per group." },
      { "letter": "T", "name": "Think through conversion", "desc": "Apply rates/multipliers segment by segment." },
      { "letter": "E", "name": "Estimate range", "desc": "Give low-mid-high, not a single number." },
      { "letter": "D", "name": "Defend your logic", "desc": "Explain what would make each assumption wrong." }
    ],
    "workedExample": {
      "problem": "Estimate daily carbon emissions from food delivery in Mumbai",
      "applied": {
        "S": "Daily CO₂ emissions from motorized food delivery trips in Mumbai metro area, 2026.",
        "I": "Segment by platform: Zomato (~55% share), Swiggy (~40%), others (~5%). Segment by vehicle: bikes (85%), EVs (10%), cycles (5%).",
        "F": "Mumbai does ~1.2M food deliveries/day (industry estimates). Average trip: 5km.",
        "T": "Bike trips: 1.02M × 5km × 60g CO₂/km = 306 tonnes. EV trips: 120K × 5km × 20g CO₂/km = 12 tonnes. Cycle trips: 60K × 0 = 0. Total: ~318 tonnes CO₂/day.",
        "E": "Low: 250 tonnes (shorter avg trips). Mid: 318 tonnes. High: 400 tonnes (higher trip distance + idle time emissions).",
        "D": "Biggest assumption risk: trip distance. If avg is 7km not 5km, estimate jumps 40%. Second risk: EV adoption rate — could be higher in 2026."
      }
    }
  }
}
```

**C2 — Build Framework Explorer**
- `FrameworkExplorer.jsx` — two-panel component
- Left panel: three tabs (FOCUSED / GAME / SIFTED). Clicking a tab shows the framework's steps with letter + name + description.
- Right panel: the worked example for the selected framework, updating dynamically when tabs switch.
- Each example is grounded in ESG/sustainability context — this reinforces the domain expertise while demonstrating PM methodology. The recruiter sees *both* skills working together.

**C3 — Build Guesstimate Stepper**
- `data/guesstimates.json` — 2–3 problems with step-by-step structured solutions
- `GuesstimateStepper.jsx` — a step-through widget:
  - Shows one question at the top
  - Below: current step (1 of 5) with content
  - Progress dots at bottom
  - "Next →" button advances
  - Final step: the answer with sanity check
- The visitor doesn't solve it — they *watch your thinking unfold* step by step. This is more impressive than a static answer because it shows the method is repeatable.

**C4 — Add teardown preview cards**
- Below the framework explorer and guesstimate, add 2–3 minimal preview cards for existing teardowns:
  - Myntra Maya — "5-agent agentic copilot redesign"
  - Meesho Returns — "1,055 Play Store reviews analyzed"
  - Groww Pulse — "BERTopic clustering for review insights"
- Each card links to the full work in the Works Showcase section (smooth scroll anchor)

### Phase C deliverable
The Product Lab is now the portfolio's most distinctive section. No other PM candidate has an interactive framework explorer with ESG-grounded worked examples AND a guesstimate stepper. This is what makes hiring managers stop scrolling.

### Phase C file checklist

```
data/
  frameworks.json       ✓ Three frameworks with worked examples
  guesstimates.json     ✓ 2–3 problems with step-by-step
components/
  sections/
    ProductLab.jsx      ✓
  ui/
    FrameworkExplorer.jsx  ✓
    GuesstimateStepper.jsx ✓
app/
  page.jsx              ✓ Updated to include Product Lab section
```

---

## 6. Phase D — Living Portfolio (Chat + CMS + Analytics)

### Objective
Turn the portfolio from a static showcase into a living product: an AI chatbot that answers recruiter questions, analytics that track engagement, and a moderation layer that keeps the chatbot clean.

### Prerequisites
- Phase C complete
- Groq API key obtained (free, from console.groq.com)
- `GROQ_API_KEY` added to Vercel env vars

### Tasks

**D1 — Build Chat API route**
- `app/api/chat/route.js` — the Groq proxy (see Section 1 of this doc for full implementation)
- System prompt: the comprehensive Ayantika context prompt (from SYSTEM_ARCHITECTURE.md, Section 7.1)
- Rate limiting: check `chat_logs` count per session per hour (max 20)
- Logging: insert both user message and assistant reply into `chat_logs` table
- Error handling: graceful fallback message if Groq is down or rate-limited

**D2 — Build Chat Widget**
- `ChatWidget.jsx` — the floating button + slide-over panel:
  - Fixed bottom-right button: "💬 Ask me anything"
  - Panel slides from right (not a modal — visitor stays on the page)
  - Header: "Ask Ayantika" + close button
  - Suggested question chips (5 pre-populated, shown before first message):
    - "What makes you different from other PM candidates?"
    - "Tell me about RAGBench"
    - "What's your ESG background?"
    - "What PM frameworks do you use?"
    - "What roles are you targeting?"
  - Message area: scrollable, auto-scrolls to bottom on new message
  - Input bar: text input + send button
  - Loading indicator: three-dot animation while waiting for Groq response
- `ChatMessage.jsx` — individual message bubble (user = right-aligned green, assistant = left-aligned parchment)
- `SuggestedQuestions.jsx` — chip buttons that populate and send on click

**D3 — Build Moderation layer**
- `app/api/moderation/route.js` — admin-only endpoint (password-gated via query param)
- Returns chat logs grouped by session, ordered by most recent
- Admin panel: add a third tab "Chat Logs" that fetches from this endpoint
- `ChatLogsViewer.jsx` — renders conversations as threaded sessions:
  - Session timestamp + message count
  - Expandable to see full conversation
  - Flag button per message (sets `flagged = true` in DB)
  - Flagged messages highlighted in red

**D4 — Build Analytics tracking**
- `lib/analytics.js` — the `trackEvent()` fire-and-forget function
- Add tracking calls to key interaction points:
  - Page load → `page_view`
  - Section scroll-into-view → `section_view` (via IntersectionObserver)
  - Work card click → `project_click`
  - File viewer open → `file_view`
  - Filter tab change → `filter_used`
  - Roadmap node expand → `roadmap_expand`
  - Chat panel open → `chat_opened`
  - Framework tab switch → `framework_tab`
  - Guesstimate step advance → `guesstimate_step`
- Admin panel: add analytics summary view (most viewed works, most common chat questions, section engagement)

**D5 — Build View Counter API**
- `app/api/views/route.js` — POST endpoint that calls `increment_view` RPC
- Called from `FileViewer` when a file is opened
- Server-side to prevent easy manipulation

### Phase D deliverable
The portfolio is now a *product*, not a website. It has an AI chatbot that answers recruiter questions in your voice, analytics tracking every interaction, and a moderation system for weekly review. This is the proof that you think like a PM — you built the feedback loop into the product itself.

### Phase D file checklist

```
app/
  api/
    chat/route.js       ✓
    views/route.js       ✓
    moderation/route.js  ✓
components/
  chat/
    ChatWidget.jsx       ✓
    ChatMessage.jsx      ✓
    SuggestedQuestions.jsx ✓
  admin/
    ChatLogsViewer.jsx   ✓
lib/
  analytics.js           ✓
  chatSystemPrompt.js    ✓
```

---

## 7. Phase E — Polish & Ship

### Objective
Production-quality polish: scroll animations, responsive perfection, dark mode, SEO, performance, and the small details that signal craft.

### Tasks

**E1 — Scroll animations**
- Add `fade-up` animation to all sections on scroll-into-view
- Use IntersectionObserver with `threshold: 0.1`
- Wrap in `@media (prefers-reduced-motion: no-preference)` — respect accessibility
- Stagger children: roadmap nodes animate one after another (100ms delay each), project cards stagger by row

**E2 — Dark mode**
- Extend `ThemeProvider` to apply `:root` and `[data-theme="dark"]` CSS variables
- Dark palette: Forest becomes canvas, Parchment shifts to `#1A1A1A`, Green brightens to `#3CB371`, Amber stays, Teal lightens
- Test every section in both modes — especially the iceberg SVG and roadmap path

**E3 — Responsive pass**
- Test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1024px (laptop), 1440px (desktop)
- Mobile specifics:
  - Roadmap: vertical stack, swipe to expand
  - Works grid: single column
  - Product Lab: stack framework explorer vertically (tabs on top, example below)
  - Chat panel: full-screen on mobile instead of slide-over
  - Guesstimate: full-width steps

**E4 — SEO and social preview**
- `layout.jsx` metadata:

```javascript
export const metadata = {
  title: 'Ayantika | PM Portfolio — ESG × AI Product Builder',
  description: 'Product manager portfolio: 4 years ESG consulting → AI-native product builder. Teardowns, PRDs, shipped products, and a chatbot that answers your questions.',
  openGraph: {
    title: 'Ayantika | The Signal, not the Noise',
    description: 'ESG data architect turned product builder. 10+ products shipped, ₹0 budget.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayantika | PM Portfolio',
    description: 'ESG × AI Product Builder',
    images: ['/og-image.png'],
  },
}
```

- Create `og-image.png` (1200×630): portfolio name + tagline + one-line pitch. Use the Fraunces + Inter type system, Deep Forest background, Green accent.
- Add `sitemap.xml` and `robots.txt`

**E5 — Performance audit**
- Run Lighthouse audit — target > 90 on all four metrics (Performance, Accessibility, Best Practices, SEO)
- Optimize images (Supabase-hosted thumbnails compressed to WebP)
- Verify fonts load with `display: swap`
- Check bundle size: ensure JetBrains Mono only loads on pages that need it
- Verify ISR revalidation working (works section updates within 5 minutes of admin changes)

**E6 — Final content pass**
- Review all copy: hero headline, roadmap stories, framework examples, guesstimate content, chatbot system prompt
- Check for typos, awkward phrasing, missing data
- Ensure all project links work
- Test chatbot with 10 real questions a recruiter would ask
- Test admin panel: upload, edit, delete, status change, featured toggle

### Phase E deliverable
The portfolio is production-ready. Share the URL with hiring managers. Add it to your resume header. Post it on LinkedIn with a "how I built my portfolio as a product" thread.

---

## 8. Post-Launch Ops

### Weekly routine (15 minutes)

| Task | Where | Action |
|---|---|---|
| Review chat logs | /admin → Chat Logs tab | Read conversations, flag off-topic, note common recruiter questions |
| Check analytics | /admin → Analytics tab | See which sections get engagement, which projects are most viewed |
| Update chatbot prompt | `lib/chatSystemPrompt.js` | Add answers for questions the chatbot struggled with |
| Upload new work | /admin → Upload tab | Drag and drop latest teardown/PRD, set status |

### Content pipeline

```
You're building something now
        │
        ▼
Upload as DRAFT to /admin
(invisible to visitors, metadata ready)
        │
        ▼
Almost done → flip to COMING SOON
(teaser card appears with countdown)
        │
        ▼
Done → flip to PUBLISHED
(full card with viewer, live in 3 seconds)
```

### When to update the chatbot system prompt

| Trigger | Action |
|---|---|
| You ship a new project | Add project name, problem, and outcome to the prompt |
| You get a new role/offer | Update career status in prompt |
| Recruiters keep asking the same question chatbot can't answer | Add a specific Q&A pair to the prompt |
| You learn a new framework | Add to the PM frameworks list in prompt |

### Iteration ideas (post-launch, as time allows)

| Idea | Effort | Impact |
|---|---|---|
| Add "What broke" section per project card — honest failure reflections | Low | High — shows maturity |
| Add visitor count badge to admin panel ("47 people viewed your portfolio this week") | Low | Motivating |
| A/B test hero headlines (swap via env var) | Low | Learn what resonates |
| Add a "recommend me for a role" CTA that copies a pre-written referral blurb to clipboard | Medium | Makes it easy for allies to forward |
| Add blog/notes section for long-form product thinking | Medium | SEO + thought leadership |
| Cache common chatbot responses in Supabase to reduce Groq calls | Low | Cost optimization (already ₹0 but reduces latency) |

---

*Document version: 1.0*
*Companion: SYSTEM_ARCHITECTURE.md*
*Total monthly cost: ₹0*
