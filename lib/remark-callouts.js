// Obsidian-style callouts:
//
//   > [!note]                 → <div class="callout" role="note"> with a "Note" label
//   > [!tip] Custom title     → the custom title replaces the label
//   > [!warning]-             → collapsed <details>, label in <summary>
//   > [!important]+           → <details open>
//
// Types: note, tip, warning, important. Any other [!x] stays a plain blockquote.
// The title is plain text (the rest of the first line).

import { visit } from "unist-util-visit";

const LABELS = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  important: "Important",
};

const MARKER = /^\[!(\w+)\]([+-]?)[ \t]*([^\n]*)(?:\n|$)/;

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const first = node.children[0];
      if (first?.type !== "paragraph") return;
      const text = first.children[0];
      if (text?.type !== "text") return;

      const match = text.value.match(MARKER);
      if (!match) return;
      const type = match[1].toLowerCase();
      if (!LABELS[type]) return;

      const fold = match[2]; // "", "-" or "+"
      const title = match[3].trim() || LABELS[type];
      const collapsible = fold !== "";

      // Remove the marker line; drop the paragraph if nothing is left.
      text.value = text.value.slice(match[0].length);
      if (!text.value) first.children.shift();
      if (first.children.length === 0) node.children.shift();

      node.data = {
        hName: collapsible ? "details" : "div",
        hProperties: {
          className: ["callout"],
          dataCallout: type,
          ...(collapsible ? {} : { role: "note" }),
          ...(fold === "+" ? { open: true } : {}),
        },
      };

      node.children.unshift({
        type: "paragraph",
        data: {
          hName: collapsible ? "summary" : "p",
          hProperties: { className: ["callout-label"] },
        },
        children: [{ type: "text", value: title }],
      });
    });
  };
}
