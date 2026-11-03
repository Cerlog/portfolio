import { ImageResponse } from "next/og";
import { getAllProjects, getProject } from "@/lib/projects";
import { site } from "@/data/site";
import { ogColors, ogFonts, ogSize, publicDataUri } from "@/lib/og";

export const alt = "Project title, context and thumbnail, by Petr Boska Nylander";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

// One preview per project: its title, what kind of work it was, and its thumbnail.
export default async function Image({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  const context = project.thesis
    ? `${project.thesis.degree} thesis · ${project.year}`
    : project.course
      ? `${project.course.code} ${project.course.name} · ${project.year}`
      : project.year;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: 72,
          background: ogColors.bg,
          color: ogColors.fg,
          fontFamily: "Source Serif 4",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 24, color: ogColors.muted }}>{site.fullName}</div>
          <div
            style={{
              marginTop: 24,
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            {project.title}
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: ogColors.muted }}>
            {context}
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={publicDataUri(project.thumbnail)}
          width={480}
          height={320}
          style={{
            objectFit: "contain",
            border: `1px solid ${ogColors.line}`,
            borderRadius: 8,
            background: ogColors.bg,
          }}
        />
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
