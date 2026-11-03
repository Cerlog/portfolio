import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { ogColors, ogFonts, ogSize, publicDataUri } from "@/lib/og";

export const alt = `${site.fullName}: ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: ogColors.bg,
          color: ogColors.fg,
          fontFamily: "Source Serif 4",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={publicDataUri("/monogram.svg")} width={96} height={96} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2 }}>
            {site.fullName}
          </div>
          <div style={{ marginTop: 20, fontSize: 32, color: ogColors.muted }}>
            {site.role}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
