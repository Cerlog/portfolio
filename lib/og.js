// Shared pieces for the generated Open Graph images (app/**/opengraph-image.js).
// ImageResponse can't read CSS variables, so the colours below mirror the light
// tokens in app/globals.css. Keep them in sync if the palette changes.

import fs from "node:fs";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  bg: "#ffffff",
  fg: "#171717",
  muted: "#525252",
  line: "#e5e5e5",
};

export function ogFonts() {
  const dir = path.join(process.cwd(), "app", "fonts");
  return [
    { name: "Inter", data: fs.readFileSync(path.join(dir, "Inter-Regular.ttf")), weight: 400, style: "normal" },
    { name: "Inter", data: fs.readFileSync(path.join(dir, "Inter-Medium.ttf")), weight: 500, style: "normal" },
  ];
}

// A file in public/ as a data URI, for <img src> inside ImageResponse.
export function publicDataUri(publicPath) {
  const file = path.join(process.cwd(), "public", publicPath);
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", svg: "image/svg+xml" }[ext];
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}
