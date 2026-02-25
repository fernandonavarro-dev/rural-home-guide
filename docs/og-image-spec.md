# OG Image Spec — Rural Home Guide

This is the spec for `/public/og-image.png` — the link preview image used when
ruralhomeguide.com is shared on Twitter/X, Facebook, LinkedIn, iMessage, Slack, etc.

---

## Dimensions
- **Size:** 1200 × 630px
- **Format:** PNG (or high-quality JPG)
- **File:** `public/og-image.png`

---

## Color Palette
| Role | Hex |
|---|---|
| Background | `#F7F4EE` (warm cream) |
| Primary text | `#1A3A0F` (deep forest green) |
| Accent / badge | `#C4860A` (amber) |
| Badge background | `#FEF3C7` (light amber) |
| Border / divider | `#E5DFD3` |
| Muted text | `#6B7280` |

---

## Typography
| Element | Font | Weight | Size |
|---|---|---|---|
| Wordmark | Georgia (serif) | 700 | 28px |
| Headline | Georgia (serif) | 700 | 56–64px |
| Subheadline | System UI (sans) | 400 | 24px |
| Badge label | System UI (sans) | 600 | 14px, uppercase, tracked |
| Footer tagline | System UI (sans) | 400 | 18px |

---

## Layout (left-aligned, single column)

```
┌─────────────────────────────────────────────────────────┐
│  [logo area — top left]                                 │
│  Rural Home Guide   (Georgia 700, green, 28px)          │
│                                                         │
│  ┌──────────────────────┐                               │
│  │  Coming Soon  (badge)│  amber bg pill                │
│  └──────────────────────┘                               │
│                                                         │
│  The complete guide                                     │  ← Georgia 700, 60px, green
│  to rural homeownership.                               │
│                                                         │
│  Private wells. Septic systems. Propane.                │  ← sans 22px, #374151
│  Water rights. Real answers.                            │
│                                                         │
│  ────────────────────────────────────────               │  ← divider, #E5DFD3
│                                                         │
│  ruralhomeguide.com                                     │  ← amber, sans 18px
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Padding:** 72px on all sides
**No photography** — keep it clean, text-forward, brand-consistent

---

## Visual Accents (optional, subtle)
- A thin `1px` border inset from the edges in `#E5DFD3` (like a card frame)
- Small decorative leaf or line motif in bottom-right corner — keep minimal
- Alternatively: a faint diagonal texture using the bg color, barely visible

---

## How to Create

### Option A — Figma / Sketch
1. New frame: 1200 × 630
2. Fill: `#F7F4EE`
3. Drop in the typography per the layout above
4. Export as PNG

### Option B — Canva
1. Custom dimensions: 1200 × 630
2. Background: `#F7F4EE`
3. Use "Georgia" or closest available serif for headline
4. Export PNG

### Option C — Let the agent generate it
The image can also be auto-generated via a Next.js `opengraph-image.tsx` route using
`@vercel/og` — this renders the OG image on-the-fly from React JSX, no static file needed.
This is the cleanest long-term solution. Ready to implement on request.

---

## Next.js `opengraph-image.tsx` (auto-generate option)

If you want to skip creating a static file entirely, drop this in `app/opengraph-image.tsx`
and Vercel will generate the OG image dynamically at build/request time:

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rural Home Guide — The complete guide to rural homeownership";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#F7F4EE",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ fontSize: 28, fontWeight: 700, color: "#1A3A0F" }}>
          Rural Home Guide
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "#FEF3C7",
              color: "#C4860A",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: 99,
              width: "fit-content",
            }}
          >
            Coming Soon
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#1A3A0F",
              lineHeight: 1.15,
              maxWidth: "800px",
            }}
          >
            The complete guide to rural homeownership.
          </div>

          {/* Subheadline */}
          <div style={{ fontSize: 22, color: "#374151", maxWidth: "700px", lineHeight: 1.5 }}>
            Private wells. Septic systems. Propane. Water rights. Real answers.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E5DFD3",
            paddingTop: "24px",
          }}
        >
          <div style={{ fontSize: 18, color: "#C4860A" }}>ruralhomeguide.com</div>
          <div style={{ fontSize: 15, color: "#9CA3AF" }}>
            For the 43 million households on private wells.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

> ✅ **Recommended:** Use `opengraph-image.tsx` — it's automatic, always up to date,
> and you never need to maintain a static file. Just say the word and I'll add it.
