import { MetadataRoute } from "next";
import { getAllGuides } from "../lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `https://www.ruralhomeguide.com/guides/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.ruralhomeguide.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.ruralhomeguide.com/guides",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideEntries,
  ];
}
