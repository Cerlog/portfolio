// Reads every project from content/projects/<slug>.md.
// The frontmatter holds the metadata and the Markdown body is the page text.
// This runs only at build time (and in `next dev`), never in the browser.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const TYPES = ["project", "poster", "report"];
const showDrafts = process.env.NODE_ENV !== "production";

// Throws with the file name so a mistake in frontmatter fails the build clearly.
function validate(slug, data) {
  const fail = (msg) => {
    throw new Error(`content/projects/${slug}.md: ${msg}`);
  };

  if (!data.title) fail("missing `title`");
  if (!data.year) fail("missing `year`");
  if (!TYPES.includes(data.type)) {
    fail(`\`type\` must be one of ${TYPES.join(", ")} (got "${data.type}")`);
  }
  if (data.tags && !Array.isArray(data.tags)) fail("`tags` must be a list");
  if (!data.thumbnail?.startsWith("/thumbs/")) {
    fail("`thumbnail` must be a path in public/thumbs/, e.g. /thumbs/x.jpg");
  }
  for (const file of data.files ?? []) {
    if (!file.label || !file.path?.startsWith("/files/")) {
      fail("each entry in `files` needs a `label` and a `path` starting with /files/");
    }
  }
  for (const link of data.links ?? []) {
    if (!link.label || !link.href) fail("each entry in `links` needs `label` and `href`");
  }
}

function readProject(slug) {
  const source = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(source);
  validate(slug, data);

  return {
    slug,
    title: data.title,
    year: String(data.year),
    type: data.type,
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    featured: Boolean(data.featured),
    blurb: data.blurb ?? "",
    links: data.links ?? [],
    files: data.files ?? [],
    draft: Boolean(data.draft),
    content,
  };
}

function allSlugs() {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -3));
}

// Metadata for every visible project, newest first. No Markdown rendering.
export function getAllProjects() {
  return allSlugs()
    .map(readProject)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.year.localeCompare(a.year) || a.title.localeCompare(b.title))
    .map(({ content, ...meta }) => meta);
}

// One project with its body rendered to HTML, or undefined if it doesn't exist.
export async function getProject(slug) {
  if (!allSlugs().includes(slug)) return undefined;
  const { content, ...meta } = readProject(slug);
  if (meta.draft && !showDrafts) return undefined;
  return { ...meta, html: await renderMarkdown(content) };
}
