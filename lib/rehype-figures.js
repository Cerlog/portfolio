// Turns an image that stands alone in its paragraph and has a title,
//   ![Alt text for screen readers](/images/slug/fig.png "Caption shown below")
// into <figure><img alt=…><figcaption>Caption</figcaption></figure>.
// Alt text and caption stay separate. Every image is lazy-loaded.

import { visit } from "unist-util-visit";

const isBlank = (node) => node.type === "text" && !node.value.trim();

export default function rehypeFigures() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img") node.properties.loading = "lazy";
      if (node.tagName !== "p" || !parent) return;

      const content = node.children.filter((child) => !isBlank(child));
      if (content.length !== 1) return;
      const img = content[0];
      if (img.tagName !== "img" || !img.properties.title) return;

      const caption = String(img.properties.title);
      delete img.properties.title;
      img.properties.loading = "lazy";

      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          img,
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: caption }],
          },
        ],
      };
    });
  };
}
