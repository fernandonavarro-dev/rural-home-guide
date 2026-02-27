import Link from "next/link";
import Image from "next/image";
import { getAllGuides } from "../../lib/guides";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides — Rural Home Guide",
  description:
    "In-depth guides for rural homeowners. Private wells, septic systems, rural land buying, utilities, zoning, internet, and more.",
  alternates: { canonical: "https://www.ruralhomeguide.com/guides" },
  openGraph: {
    title: "Guides — Rural Home Guide",
    description:
      "In-depth guides for rural homeowners. Private wells, septic systems, rural land buying, utilities, zoning, internet, and more.",
    url: "https://www.ruralhomeguide.com/guides",
    siteName: "Rural Home Guide",
    type: "website",
  },
};

const C = {
  bg: "#F7F4EE",
  bgAlt: "#EEE9DF",
  green: "#1A3A0F",
  amber: "#C4860A",
  border: "#E5DFD3",
  muted: "#6B7280",
  text: "#374151",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: C.bg }}>
      {/* Header */}
      <header style={{ padding: "1.5rem 2rem", borderBottom: `1px solid ${C.border}` }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/RHG-v1.png"
              alt="Rural Home Guide logo"
              width={40}
              height={40}
              style={{ borderRadius: "50%", flexShrink: 0 }}
              priority
            />
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: "1.15rem",
                color: C.green,
                letterSpacing: "0.02em",
              }}
            >
              Rural Home Guide
            </span>
          </Link>
        </div>
      </header>

      {/* Page heading */}
      <section style={{ padding: "3.5rem 2rem 2rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.amber,
              marginBottom: "1rem",
            }}
          >
            Guides
          </p>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: C.green,
              margin: "0 0 1rem 0",
              lineHeight: 1.2,
            }}
          >
            Everything you need to know about rural homeownership
          </h1>
          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "1.05rem",
              color: C.muted,
              maxWidth: "600px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            In-depth, practical guides for rural homeowners — no jargon, no filler, no decade-old PDFs.
          </p>
        </div>
      </section>

      {/* Guides list */}
      <section style={{ padding: "1rem 2rem 5rem" }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            border: `1px solid ${C.border}`,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {guides.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              style={{
                display: "block",
                padding: "1.5rem 1.75rem",
                backgroundColor: i % 2 === 0 ? C.bg : C.bgAlt,
                borderBottom: i < guides.length - 1 ? `1px solid ${C.border}` : "none",
                textDecoration: "none",
              }}
            >
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: C.amber,
                  marginBottom: "0.4rem",
                  margin: "0 0 0.4rem 0",
                }}
              >
                {guide.category}
              </p>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: C.green,
                  margin: "0 0 0.5rem 0",
                }}
              >
                {guide.title}
              </h2>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: C.muted,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {guide.description.length > 160
                  ? guide.description.slice(0, 157) + "…"
                  : guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "1.5rem 2rem", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "#9CA3AF",
            }}
          >
            © {new Date().getFullYear()} ruralhomeguide.com
          </span>
        </div>
      </footer>
    </main>
  );
}
