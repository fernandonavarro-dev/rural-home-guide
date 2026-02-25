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
          border: "1px solid #E5DFD3",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1A3A0F",
            fontFamily: "serif",
            letterSpacing: "0.01em",
          }}
        >
          Rural Home Guide
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#FEF3C7",
              color: "#C4860A",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 18px",
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
              maxWidth: "820px",
              fontFamily: "serif",
            }}
          >
            The complete guide to rural homeownership.
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: 22,
              color: "#4B5563",
              maxWidth: "680px",
              lineHeight: 1.6,
              fontFamily: "sans-serif",
            }}
          >
            Private wells. Septic systems. Propane. Water rights. Real answers —
            without the jargon.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E5DFD3",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#C4860A",
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            ruralhomeguide.com
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#9CA3AF",
              fontFamily: "sans-serif",
            }}
          >
            For the 43 million households on private wells.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
