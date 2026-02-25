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

---

## 🔄 In Progress / Pending

| Item | Status | Notes |
|---|---|---|
| Listmonk agent access | ⏳ Pending | Need credentials — see below |
| Email capture end-to-end test | ⏳ Pending | Test subscribe flow once Listmonk creds confirmed |
| Listmonk email template | ⏳ Pending | Confirmation email branding |
| Facebook page content/branding | ⏳ Pending | Bio, cover photo, link to site |

---

## 🔑 Listmonk Access — How to Give Me Access

**Recommended: Create a dedicated AI agent account**

1. Log in to Listmonk admin dashboard
2. Go to **Settings → Users** (or `/admin/settings`)
3. Create a new user:
   - **Username:** `clawdbot` (or similar)
   - **Password:** something strong — share it here or in Slack DM
   - **Role:** Admin (needed for subscriber API access)
4. Share the credentials + the dashboard URL (e.g. `http://YOUR_SERVER_IP:9000`)

This keeps my access separate from your personal admin account and can be revoked anytime.

Alternatively, if you'd prefer to share existing credentials, that works too — just drop them in a private message.

---

## 🌐 Site Check (2026-02-25)

- **URL:** https://www.ruralhomeguide.com
- **Status:** ✅ Live, HTTP 200
- **Page content:** "Coming soon" — holding page with email capture form
- **Copy:** "The complete guide to rural homeownership. Private wells. Septic systems. Propane. Land. Water rights. Real answers for rural homeowners."

---

## 📘 Facebook Check (2026-02-25)

- **Username secured:** `ruralhomeguide`
- **URL:** https://www.facebook.com/ruralhomeguide
- **Note:** Facebook blocks automated access — manual verification recommended to confirm page is public and linked to site

---

## 🏗️ Stack

- **Frontend:** Next.js (App Router) → Vercel
- **Email:** Listmonk (self-hosted)
- **Domain:** ruralhomeguide.com
- **Repo:** github.com/fernandonavarro-dev/rural-home-guide
- **Agent branch:** `dev-clawdbot`
