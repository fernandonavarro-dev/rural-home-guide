import fs from "fs";
import path from "path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export function getAllGuides(): GuideMeta[] {
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        category: data.category ?? "Guide",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getGuideContent(slug: string): { meta: GuideMeta; content: string } {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      category: data.category ?? "Guide",
    },
    content,
  };
}
