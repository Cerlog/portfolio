// Screenshots and basic checks for every page.
//   npm run build && npx next start -p 3000   (in another terminal)
//   npm run shots                              (BASE=http://localhost:3000 by default)
// Writes full-page PNGs to .shots/ (gitignored) and prints any problems:
// sideways scrolling, images without alt, not exactly one <h1>, text below
// WCAG AA contrast.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const OUT = path.join(process.cwd(), ".shots");
fs.mkdirSync(OUT, { recursive: true });

const slugs = fs
  .readdirSync("content/projects")
  .filter((f) => f.endsWith(".md") && f !== "markdown-demo.md")
  .map((f) => f.replace(/\.md$/, ""));
const pages = ["/", "/projects", ...slugs.map((s) => `/projects/${s}`), "/does-not-exist"];

const audit = () => {
  const lum = (c) => {
    const [r, g, b] = c.match(/[\d.]+/g).map(Number);
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const bgOf = (e) => {
    for (; e; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor;
      if (c && !c.endsWith(", 0)") && c !== "transparent") return c;
    }
    return "rgb(255, 255, 255)";
  };
  const problems = [];
  const over = document.documentElement.scrollWidth - innerWidth;
  if (over > 1) problems.push(`scrolls sideways by ${over}px`);
  for (const i of document.images) if (!i.hasAttribute("alt")) problems.push(`img without alt: ${i.src}`);
  const h1 = document.querySelectorAll("h1").length;
  if (h1 !== 1) problems.push(`${h1} h1 elements`);
  for (const e of document.querySelectorAll("body *")) {
    if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    if (e.closest(".katex, pre, svg")) continue;
    const s = getComputedStyle(e);
    if (s.display === "none" || s.visibility === "hidden" || !e.getClientRects().length) continue;
    const a = lum(s.color), b = lum(bgOf(e));
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
    if (ratio < (large ? 3 : 4.5)) problems.push(`contrast ${ratio.toFixed(2)}: "${e.textContent.trim().slice(0, 30)}"`);
  }
  return problems;
};

const browser = await chromium.launch();
let count = 0;
for (const scheme of ["light", "dark"]) {
  for (const width of [375, 1024, 1280, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const p of pages) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const name = (p === "/" ? "home" : p.slice(1).replace(/\//g, "_")) + `-${width}-${scheme}.png`;
      await page.screenshot({ path: path.join(OUT, name), fullPage: true });
      for (const problem of await page.evaluate(audit)) console.log(`${p} ${width} ${scheme}: ${problem}`);
      count++;
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`${count} screenshots in .shots/`);
