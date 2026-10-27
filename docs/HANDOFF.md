# Handoff: where the project stands

Last updated: 27 Oct 2026. Read `docs/PROJECT_INSTRUCTIONS.md` first; it sets the working rules (one chunk at a time, security requirements, report format).

## Design source

Figma file "Daily Bath", page "Final Draft":
https://www.figma.com/design/sceQRGfO4UeF5W9ujYAozt/Daily-Bath?node-id=8175-1054

Three breakpoints are implemented from it: mobile (< 768px, design 393px), tablet (768–1023px, design 768px) and desktop (>= 1024px, design 1920px).

| Page | Desktop frame | Tablet frame | Mobile frame |
|---|---|---|---|
| Home | 10789:369 | 10860:3411 | 10865:7097 |
| Brand Story | 10839:5347 | 10862:4227 | 10870:7842 |
| All Products (filters closed / open) | 10839:5500 / 10839:5728 | 10862:4805 / 10863:5283 | 10870:8252 (+ filter sheet 10873:8936–9820) |
| Product Details | 10839:6005 | 10873:10554 | 10873:11748 (mislabelled "Brand Story") |
| Contact | 10839:6216 | 10863:6134 | 10873:10073 (mislabelled "Brand Story") |

## Done

| Page | Route | Key behaviour |
|---|---|---|
| Home | `/` | Hero, featured carousel (blur/scale, arrows, swipe), About (slide-in, card hover), categories (hover pill, links to Products), Why Choose Us (rise-in) |
| Brand Story | `/brand-story` | Hero enters from screen edges, philosophy accordion, scroll-pinned ingredients animation, Instagram section |
| Products | `/products`, `/products?category=…` | 4-col grid; Filters opens panel in first column (3-col grid); category strip sets title and filter; sort; infinite scroll; mobile bottom sheet |
| Product Details | `/products/[slug]` | Gallery, share, where-to-buy links, how-to videos, accordion, related products |
| Contact | `/contact` | Form via Server Action → Supabase `form_submissions` (insert-only RLS), validation, honeypot, rate limit |
| Shared | — | Sticky header with mobile menu, footer, design tokens in `src/app/globals.css` |

Placeholder data lives in `src/lib/products.ts`, `src/lib/product-details.ts`, `src/lib/categories.ts`, `src/lib/featured-products.ts` and `src/lib/site-config.ts` (search for `TODO(owner)`).

## Not done yet / suggested next steps

1. **Admin panel** (from the project instructions): Supabase Auth sign-in for one allowlisted admin, list contact submissions, change their status. Needs: Supabase project created, migration applied, admin email address.
2. **Terms & Conditions** and **Privacy Policy** pages (footer links currently 404). A privacy policy matters now the form collects personal data.
3. Optional: email notification when a contact message arrives.

## Owner actions still open

- Supabase: create project, run `supabase/migrations/…_create_form_submissions.sql`, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see README). Until then the form shows a "couldn't send" message.
- Turn on host-level rate limiting / bot protection (e.g. Vercel Firewall).
- Real content: product names, prices, descriptions, ingredients, ratings, review counts; final copy for the repeated "early brand-development stage" placeholder paragraph; Philosophy descriptions.
- Images still placeholder or low-resolution Figma exports: home hero, About lab photo, Brand Story photos, Body Mist category, three products (Pure Morning Body Mist, Soft Bloom Body Wash, Silk Moisture Body Cream), four homepage category tiles, Bearth logo (footer), sharper marketplace logos (SVG).
- Links: social profiles, Instagram reels / how-to videos, each product's marketplace URLs, the sixth marketplace's name, LinkedIn page.
- Confirm: support email (design says "Supprt@chardike.com"; site uses support@chardike.com), contact form subjects, "Derma Experties" spelling, the duplicate address in the design (Dhaka is used everywhere).

## Working notes

- Next.js 16.4 with Cache Components; read `node_modules/next/dist/docs/` before using framework APIs (see `AGENTS.md`).
- Checks: `npm run lint`, `npx tsc --noEmit`, `npm run build` (run the build first on a fresh clone so route types exist).
- Uploaded images are only usable when attached as files; images pasted into a message mid-task did not arrive as files.
- Commits are pushed straight to `main` on GitHub (AkashBasak/Daily-Bath).
