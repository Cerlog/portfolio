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
  if (data.course) {
    const { code, name, url } = data.course;
    if (!/^\d{5}$/.test(String(code ?? ""))) fail("`course.code` must be a five-digit DTU code");
    if (!name) fail("`course.name` is missing");
    if (url !== `https://kurser.dtu.dk/course/${code}`) {
      fail(`\`course.url\` must be https://kurser.dtu.dk/course/${code}`);
    }
  }
  if (data.group !== undefined && typeof data.group !== "boolean") {
    fail("`group` must be true or false");
  }
  if (data.github && !data.github.startsWith("https://github.com/")) {
    fail("`github` must be a https://github.com/ URL");
  }
  if (data.poster) {
    if (!data.poster.startsWith("/files/posters/")) fail("`poster` must be in /files/posters/");
    if (!fs.existsSync(path.join(process.cwd(), "public", data.poster))) {
      fail(`\`poster\` file not found: public${data.poster}`);
    }
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
    course: data.course
      ? { code: String(data.course.code), name: data.course.name, url: data.course.url }
      : null,
    group: data.group ?? null,
    github: data.github ?? null,
    poster: data.poster ?? null,
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
