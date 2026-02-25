# Rural Home Guide — Project Status

_Last updated: 2026-02-25_

---

## ✅ Completed

| Item | Status | Notes |
|---|---|---|
| Next.js holding page | ✅ Done | App Router, email capture form |
| Vercel deployment | ✅ Live | https://www.ruralhomeguide.com |
| Domain live | ✅ Confirmed | ruralhomeguide.com → resolves, 200 OK |
| Listmonk install | ✅ Done | Self-hosted, server configured |
| Listmonk list UUID | ✅ Set | In Vercel env vars |
| Vercel env vars | ✅ Set | LISTMONK_URL, LISTMONK_LIST_UUID, LISTMONK_USERNAME, LISTMONK_PASSWORD |
| Email capture API route | ✅ Done | `/app/api/subscribe/route.ts` |
| Facebook page | ✅ Secured | Username: `ruralhomeguide` |
| Listmonk admin access | ✅ Established | Dashboard accessible |
| SEO meta tags | ✅ Done | OG + Twitter/X cards, canonical URL, robots meta |
| robots.txt | ✅ Done | `public/robots.txt` — allows all, points to sitemap |
| sitemap.xml | ✅ Done | `app/sitemap.ts` — Next.js auto-generated at `/sitemap.xml` |
| Web manifest | ✅ Done | `public/site.webmanifest` — theme/bg colors, icons |
| Favicon meta | ✅ Done | Apple touch icon, 16/32px PNG, manifest link in layout |
| Accessibility — form | ✅ Done | aria-label, aria-live, aria-invalid, role=alert, sr-only label, autocomplete |
| Focus styles | ✅ Done | Keyboard-visible focus ring on input + button |
| Button hover/disabled | ✅ Done | Hover darkens, disabled fades gracefully |
| Listmonk email template | ✅ Done | `docs/listmonk-confirmation-email.html` — branded, mobile-friendly |
| Facebook page copy | ✅ Done | `docs/facebook-page-copy.md` — name, bio, about, pinned post, cover photo spec |

---

## 🔄 In Progress / Pending

| Item | Status | Notes |
|---|---|---|
| Listmonk agent access | ⏳ Pending | Need clawdbot account — dashboard URL + password |
| Email capture end-to-end test | ⏳ Pending | Test full subscribe flow once Listmonk creds confirmed |
| OG image | ⏳ Pending | `/public/og-image.png` (1200×630) — referenced in meta but not yet created |
| Favicon PNG files | ⏳ Pending | `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` — referenced but not yet created |
| Facebook page setup | ⏳ Pending | Apply copy from `docs/facebook-page-copy.md`, add cover/profile photo |
| Vercel Analytics | ⏳ Pending | One-line add for traffic baseline from day one |
| Content outline | ⏳ Pending | First 10-15 article briefs |

---

## 🔑 Listmonk Access — How to Give Me Access

**Recommended: Create a dedicated AI agent account**

1. Log in to Listmonk admin dashboard
2. Go to **Settings → Users**
3. Create a new user:
   - **Username:** `clawdbot`
   - **Password:** something strong — share it here or in Slack DM
   - **Role:** Admin (needed for subscriber API access)
4. Share the credentials + the dashboard URL (e.g. `http://YOUR_SERVER_IP:9000`)

---

## 🌐 Site Check (2026-02-25)

- **URL:** https://www.ruralhomeguide.com
- **Status:** ✅ Live, HTTP 200
- **Page content:** "Coming soon" holding page with email capture form
- **Copy:** "The complete guide to rural homeownership. Private wells. Septic systems. Propane. Land. Water rights."

---

## 📘 Facebook Check (2026-02-25)

- **Username secured:** `ruralhomeguide`
- **URL:** https://www.facebook.com/ruralhomeguide
- **Next step:** Apply copy from `docs/facebook-page-copy.md`

---

## 🏗️ Stack

- **Frontend:** Next.js (App Router) → Vercel
- **Email:** Listmonk (self-hosted)
- **Domain:** ruralhomeguide.com
- **Repo:** github.com/fernandonavarro-dev/rural-home-guide
- **Agent branch:** `dev-clawdbot`
