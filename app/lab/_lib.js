// Design lab helpers (temporary). Reads the real data; changes nothing on disk.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import rehypeFigures from "@/lib/rehype-figures";
import remarkCallouts from "@/lib/remark-callouts";

export const VARIANTS = ["a", "b", "c"];

export const VARIANT_NAMES = {
  a: "A · Scholarly",
  b: "B · Scholarly with step curve",
  c: "C · Split layout",
};

// GFM footnotes → sidenotes. Each footnote's text is copied into a
// <span class="sidenote"> right after its reference, for the margin on wide
// screens. The normal footnote list stays for narrow screens; CSS shows one or
// the other.
function rehypeSidenotes() {
  return (tree) => {
    const notes = new Map();
    visit(tree, "element", (node) => {
      if (node.tagName === "li" && String(node.properties.id || "").startsWith("user-content-fn-")) {
        notes.set(node.properties.id, node);
      }
    });
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "sup" || !parent) return;
      const a = node.children.find((c) => c.tagName === "a" && c.properties.dataFootnoteRef !== undefined);
      if (!a) return;
      const li = notes.get(String(a.properties.href).slice(1));
      if (!li) return;
      const number = a.children.map((c) => c.value || "").join("");
      const content = [];
      for (const p of li.children.filter((c) => c.tagName === "p")) {
        for (const c of p.children) {
          const isBackref = c.tagName === "a" && (c.properties.className || []).includes("data-footnote-backref");
          if (!isBackref) content.push(structuredClone(c));
        }
      }
      const sidenote = {
        type: "element",
        tagName: "span",
        properties: { className: ["sidenote"] },
        children: [
          { type: "element", tagName: "span", properties: { className: ["sidenote-number"] }, children: [{ type: "text", value: number }] },
          { type: "text", value: " " },
          ...content,
        ],
      };
      parent.children.splice(index + 1, 0, sidenote);
      return index + 2;
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkCallouts)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeHighlight, { detect: false })
  .use(rehypeFigures)
  .use(rehypeSidenotes)
  .use(rehypeStringify);

export async function renderLabMarkdown(md) {
  return String(await processor.process(md));
}

// The 02456 page with the two literature citations turned into notes. The
// reference details come from the reference list in Petr's 02456 report.
const RSTAR_NOTES = [
  ["rStar is a published method", "rStar[^qi] is a published method"],
  ["GSM-Symbolic approach of Mirzadeh et al., we", "GSM-Symbolic approach of Mirzadeh et al.,[^gsm] we"],
];
const RSTAR_REFS = `

[^qi]: Z. Qi, M. Ma, J. Xu, L. L. Zhang, F. Yang and M. Yang, “Mutual reasoning makes smaller LLMs stronger problem-solvers,” 2024.

[^gsm]: I. Mirzadeh, K. Alizadeh, H. Shahrokhi, O. Tuzel, S. Bengio and M. Farajtabar, “GSM-Symbolic: Understanding the limitations of mathematical reasoning in large language models,” 2024.
`;

export async function getLabRstar() {
  const file = path.join(process.cwd(), "content", "projects", "rstar-robustness.md");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  let md = content;
  for (const [from, to] of RSTAR_NOTES) {
    if (!md.includes(from)) throw new Error(`lab: expected text not found: ${from}`);
    md = md.replace(from, to);
  }
  md += RSTAR_REFS;
  return { ...data, slug: "rstar-robustness", html: await renderLabMarkdown(md) };
}

// Plain text of an intro paragraph (they contain <a> tags).
export function plainText(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
