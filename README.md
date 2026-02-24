# Rural Home Guide

A Next.js holding page for [ruralhomeguide.com](https://ruralhomeguide.com) — the complete guide to rural homeownership.

---

## ⚠️ Branch Policy

> **Always push to `dev-clawdbot` — never to `dev` or `main`.**

| Branch | Purpose |
|---|---|
| `dev-clawdbot` | AI agent working branch — all automated commits go here |
| `dev` | Human-reviewed development branch |
| `main` | Production — protected, PRs only |

---

## Email Capture — Listmonk Integration

This site uses [Listmonk](https://listmonk.app) (self-hosted) for email capture.

**Server:** `YOUR_LISTMONK_SERVER_IP`
**Admin UI:** `http://YOUR_LISTMONK_SERVER_IP:9000`

### Setup

1. Copy `.env.local.example` → `.env.local`
2. Fill in your Listmonk credentials and list UUID (see Listmonk admin → Lists)
3. For Vercel: add the same env vars in project Settings → Environment Variables

### Environment Variables

| Variable | Description |
|---|---|
| `LISTMONK_URL` | Base URL of Listmonk instance (e.g. `http://YOUR_LISTMONK_SERVER_IP:9000`) |
| `LISTMONK_LIST_UUID` | UUID of the target mailing list |
| `LISTMONK_USERNAME` | Listmonk admin username |
| `LISTMONK_PASSWORD` | Listmonk admin password |

### How it works

- `/app/components/EmailForm.tsx` — client-side form component
- `/app/api/subscribe/route.ts` — Next.js API route that calls Listmonk's subscriber API
- New signups are added directly to the configured Listmonk list
- Duplicate signups (409) are silently accepted

---

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Fill in .env.local values, then:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Listmonk](https://listmonk.app) — self-hosted email
- Deploy via [Vercel](https://vercel.com)
