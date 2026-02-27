# Rural Home Guide — Project Status

_Last updated: 2026-02-27 (session 4)_

---

## ✅ Completed

| Item | Status | Notes |
|---|---|---|
| Next.js holding page | ✅ Done | App Router, email capture form |
| Vercel deployment | ✅ Live | https://www.ruralhomeguide.com |
| Domain live | ✅ Confirmed | ruralhomeguide.com → resolves, 200 OK |
| Listmonk install | ✅ Done | Self-hosted, server configured |
| Vercel env vars | ✅ Set | LISTMONK_URL, LISTMONK_LIST_UUID, LISTMONK_LIST_ID, LISTMONK_USERNAME, LISTMONK_PASSWORD |
| Email capture API route | ✅ Done | `/app/api/subscribe/route.ts` — node:https, session-based auth, LISTMONK_LIST_ID shortcut |
| Email flow end-to-end | ✅ Verified | Signup confirmed landing in Listmonk (tested 2026-02-27) |
| Facebook page | ✅ Secured | Username: `ruralhomeguide` |
| Listmonk admin access | ✅ Established | Dashboard accessible |
| SEO meta tags | ✅ Done | OG + Twitter/X cards, canonical URL, robots meta |
| robots.txt | ✅ Done | `public/robots.txt` — allows all, points to sitemap |
| sitemap.xml | ✅ Done | `app/sitemap.ts` — all pages + all 7 guides auto-included |
| Web manifest | ✅ Done | `public/site.webmanifest` — theme/bg colors, icons |
| Favicon meta | ✅ Done | Apple touch icon, 16/32px PNG, manifest link in layout |
| Accessibility — form | ✅ Done | aria-label, aria-live, aria-invalid, role=alert, sr-only label, autocomplete |
| Focus styles | ✅ Done | Keyboard-visible focus ring on input + button |
| Button hover/disabled | ✅ Done | Hover darkens, disabled fades gracefully |
| Listmonk email template | ✅ Done | `docs/listmonk-confirmation-email.html` — branded, mobile-friendly |
| Facebook page copy | ✅ Done | `docs/facebook-page-copy.md` — name, bio, about, pinned post, cover photo spec |
| Vercel Analytics | ✅ Done | `@vercel/analytics` installed + `<Analytics />` in layout |
| OG image (dynamic) | ✅ Done | `app/opengraph-image.tsx` — edge runtime, auto-renders 1200×630 on deploy |
| OG image spec | ✅ Done | `docs/og-image-spec.md` — full layout, colors, type, manual + code options |
| Content outline | ✅ Done | `docs/content-outline.md` — 24 article briefs, 6 pillars, launch slate, calendar |
| MDX blog pipeline | ✅ Done | `@next/mdx`, `next-mdx-remote`, `gray-matter` installed; `next.config.ts` updated; `mdx-components.tsx` created |
| MDX content library | ✅ Done | `content/guides/` — 7 full MDX articles with frontmatter |
| Guides index page | ✅ Done | `/guides` — lists all articles, category labels, descriptions |
| Individual guide pages | ✅ Done | `/guides/[slug]` — full MDX rendering, prose styles, SEO metadata per article |
| Prose styles | ✅ Done | `app/globals.css` — `.prose-rural` class: headings, tables, lists, links, blockquotes |
| Homepage updated | ✅ Done | Badge → "Now live — read our guides"; "Browse the guides →" button added |
| 7 guides published | ✅ Live | All routes 200 OK, full content, correct SEO titles |

---

## 📄 Published Guides

| Guide | URL | Status |
|---|---|---|
| Buying Rural Land — Complete Guide | `/guides/buying-rural-land-complete-guide` | ✅ Live |
| Moving from City to Rural — Survival Guide | `/guides/moving-from-city-to-rural-guide` | ✅ Live |
| Rural Home Annual Maintenance Checklist | `/guides/rural-home-annual-maintenance-checklist` | ✅ Live |
| Rural Internet Options — Buyer's Guide | `/guides/rural-internet-options-guide` | ✅ Live |
| Rural Utilities Complete Guide | `/guides/rural-utilities-complete-guide` | ✅ Live |
| Rural Zoning & Permits Guide | `/guides/rural-zoning-permits-guide` | ✅ Live |
| The True Cost of Rural Living | `/guides/true-cost-of-rural-living` | ✅ Live |

---

## 🔄 Pending

| Item | Status | Notes |
|---|---|---|
| Facebook page setup | ⏳ Pending | Nando working on it — copy ready in `docs/facebook-page-copy.md` |
| Amazon Associates | ⏸ Holding | Waiting for organic growth before applying — revisit when traffic warrants |

---

## 📋 Decisions Log

| Decision | Chosen | Date | Notes |
|---|---|---|---|
| Content publishing platform | **MDX blog in Next.js** | 2026-02-27 | Built into existing repo. Not WordPress. |
| Amazon Associates / monetization | **Hold — organic first** | 2026-02-27 | Apply after meaningful traffic growth |

---

## 🌐 Site Check (2026-02-27)

| Route | Status |
|---|---|
| `/` | ✅ 200 |
| `/guides` | ✅ 200 |
| `/guides/buying-rural-land-complete-guide` | ✅ 200 |
| `/guides/moving-from-city-to-rural-guide` | ✅ 200 |
| `/guides/rural-home-annual-maintenance-checklist` | ✅ 200 |
| `/guides/rural-internet-options-guide` | ✅ 200 |
| `/guides/rural-utilities-complete-guide` | ✅ 200 |
| `/guides/rural-zoning-permits-guide` | ✅ 200 |
| `/guides/true-cost-of-rural-living` | ✅ 200 |
| `/sitemap.xml` | ✅ 200 |
| `/api/subscribe` | ✅ `{"success":true}` — confirmed in Listmonk |

---

## 📘 Facebook Check (2026-02-25)

- **Username secured:** `ruralhomeguide`
- **URL:** https://www.facebook.com/ruralhomeguide
- **Next step:** Apply copy from `docs/facebook-page-copy.md`

---

## 🏗️ Stack

- **Frontend:** Next.js 16 (App Router) → Vercel
- **Content:** MDX (`next-mdx-remote`, `gray-matter`) — `content/guides/`
- **Email:** Listmonk v6 (self-hosted) — session auth via `node:https`
- **Analytics:** Vercel Analytics
- **Domain:** ruralhomeguide.com
- **Repo:** github.com/fernandonavarro-dev/rural-home-guide
- **Agent branch:** `dev-clawdbot`
