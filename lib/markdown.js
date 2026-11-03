// Markdown → HTML, run at build time. Raw HTML in the Markdown is dropped
// (remark-rehype's default), so the output only contains what the plugins make.

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeFigures from "./rehype-figures";
import remarkCallouts from "./remark-callouts";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkCallouts)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeHighlight, { detect: false })
  .use(rehypeFigures)
  .use(rehypeStringify);

export async function renderMarkdown(markdown) {
  return String(await processor.process(markdown));
}
