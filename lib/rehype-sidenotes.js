import { visit } from "unist-util-visit";

// GFM footnotes → sidenotes. Each footnote's text is copied into a
// <span class="sidenote"> right after its reference, for the margin on wide
// screens. The normal footnote list stays for narrow screens; CSS shows one or
// the other.
export default function rehypeSidenotes() {
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
