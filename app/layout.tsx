import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rural Home Guide — Coming Soon",
  description:
    "The complete guide to rural homeownership. Private wells, septic systems, and everything in between.",
  openGraph: {
    title: "Rural Home Guide",
    description:
      "The complete guide to rural homeownership. Private wells, septic systems, and everything in between.",
    url: "https://ruralhomeguide.com",
    siteName: "Rural Home Guide",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
