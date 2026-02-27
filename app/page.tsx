import Link from "next/link";
import Image from "next/image";
import EmailForm from "./components/EmailForm";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F4EE",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid #E5DFD3",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", alignItems: "center", gap: "0.65rem" }}>
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
              color: "#1A3A0F",
              letterSpacing: "0.02em",
            }}
          >
            Rural Home Guide
          </span>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 2rem 4rem",
        }}
      >
        <div style={{ maxWidth: "680px", width: "100%" }}>
          {/* Badge */}
          <p
            style={{
              display: "inline-block",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#C4860A",
              backgroundColor: "#FEF3C7",
              padding: "0.3rem 0.75rem",
              borderRadius: "99px",
              marginBottom: "1.75rem",
            }}
          >
            Now live — read our guides
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#1A3A0F",
              margin: "0 0 1.25rem 0",
            }}
          >
            The complete guide to rural homeownership.
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "#4B5563",
              margin: "0 0 2.5rem 0",
              maxWidth: "560px",
            }}
          >
            Private wells. Septic systems. Propane. Land. Water rights. Real answers
            for rural homeowners — without the jargon, the link farms, or the decade-old PDFs.
          </p>

          {/* Email capture */}
          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Get new guides in your inbox
            </p>
            <EmailForm />
          </div>

          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "#9CA3AF",
              marginTop: "0.5rem",
            }}
          >
            No spam. No sharing. New guides, straight to your inbox.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <Link
              href="/guides"
              style={{
                display: "inline-block",
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#1A3A0F",
                backgroundColor: "#EEE9DF",
                border: "1px solid #D1C9B8",
                borderRadius: "8px",
                padding: "0.65rem 1.25rem",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              Browse the guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Topics preview */}
      <section
        style={{
          backgroundColor: "#EEE9DF",
          padding: "3rem 2rem",
          borderTop: "1px solid #E5DFD3",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: "1.5rem",
            }}
          >
            What we&apos;re covering
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.625rem",
            }}
          >
            {[
              "Private Wells",
              "Septic Systems",
              "Well Water Testing",
              "Water Softeners & Filtration",
              "Septic Maintenance",
              "Well Pump Troubleshooting",
              "Rural Home Buying",
              "Propane Systems",
              "Water Rights",
              "Land & Property",
            ].map((topic) => (
              <span
                key={topic}
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.875rem",
                  color: "#374151",
                  backgroundColor: "#F7F4EE",
                  border: "1px solid #D1C9B8",
                  borderRadius: "6px",
                  padding: "0.4rem 0.875rem",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "1.5rem 2rem",
          borderTop: "1px solid #E5DFD3",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "#9CA3AF",
            }}
          >
            © {new Date().getFullYear()} ruralhomeguide.com
          </span>
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "#9CA3AF",
            }}
          >
            Built for the 43 million American households on private wells.
          </span>
        </div>
      </footer>
    </main>
  );
}
