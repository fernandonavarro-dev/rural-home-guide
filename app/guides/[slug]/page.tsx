import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuides, getGuideContent } from "../../../lib/guides";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getGuideContent(slug);
    return {
      title: `${meta.title} — Rural Home Guide`,
      description: meta.description,
      alternates: {
        canonical: `https://www.ruralhomeguide.com/guides/${slug}`,
      },
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `https://www.ruralhomeguide.com/guides/${slug}`,
        siteName: "Rural Home Guide",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
      },
    };
  } catch {
    return {};
  }
}

const C = {
  bg: "#F7F4EE",
  green: "#1A3A0F",
  amber: "#C4860A",
  border: "#E5DFD3",
  muted: "#6B7280",
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;

  let guide;
  try {
    guide = getGuideContent(slug);
  } catch {
    notFound();
  }

  const { meta, content } = guide!;

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
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: C.green,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Rural Home Guide
          </Link>
          <Link
            href="/guides"
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.85rem",
              color: C.muted,
              textDecoration: "none",
            }}
          >
            ← All guides
          </Link>
        </div>
      </header>

      {/* Article */}
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.amber,
            margin: "0 0 1rem 0",
          }}
        >
          {meta.category}
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: C.green,
            lineHeight: 1.2,
            margin: "0 0 1.5rem 0",
          }}
        >
          {meta.title}
        </h1>
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "1.05rem",
            color: C.muted,
            lineHeight: 1.7,
            borderLeft: `3px solid ${C.amber}`,
            paddingLeft: "1rem",
            margin: "0 0 2.5rem 0",
          }}
        >
          {meta.description}
        </p>

        <div className="prose-rural">
          <MDXRemote source={content} />
        </div>
      </article>

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
