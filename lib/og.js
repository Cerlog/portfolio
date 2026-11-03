// Shared pieces for the generated Open Graph images (app/**/opengraph-image.js).
// ImageResponse can't read CSS variables, so the colours below mirror the light
// tokens in app/globals.css. Keep them in sync if the palette changes.

import fs from "node:fs";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  bg: "#ffffff",
  fg: "#1a1a1a",
  muted: "#555555",
  line: "#dddddd",
};

export function ogFonts() {
  const dir = path.join(process.cwd(), "app", "fonts");
  return [
    { name: "Source Serif 4", data: fs.readFileSync(path.join(dir, "SourceSerif4-Regular.ttf")), weight: 400, style: "normal" },
    { name: "Source Serif 4", data: fs.readFileSync(path.join(dir, "SourceSerif4-SemiBold.ttf")), weight: 600, style: "normal" },
  ];
}

// A file in public/ as a data URI, for <img src> inside ImageResponse.
export function publicDataUri(publicPath) {
  const file = path.join(process.cwd(), "public", publicPath);
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", svg: "image/svg+xml" }[ext];
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}
