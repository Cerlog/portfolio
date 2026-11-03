import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/projects";
import "katex/dist/katex.min.css";

// Only the slugs from content/projects/ exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Not found" };
  const url = `/projects/${slug}`;
  return {
    title: project.title,
    description: project.blurb,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.blurb,
      url,
    },
  };
}

const TYPE_LABELS = { poster: "Poster", report: "Report" };

// ["A"] → "A", ["A", "B"] → "A and B", ["A", "B", "C"] → "A, B and C"
function joinNames(names) {
  return names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const meta = [
    project.thesis ? `${project.thesis.degree} thesis` : TYPE_LABELS[project.type],
    project.group ? "Group project" : null,
    ...project.tags,
    project.year,
  ];
  const links = [
    ...(project.poster ? [{ label: "Poster (PDF)", href: project.poster, download: true }] : []),
    ...project.files.map((f) => ({ label: f.label, href: f.path, download: true })),
    ...(project.github ? [{ label: "Code on GitHub", href: project.github }] : []),
    ...project.links,
  ];

  return (
    <article>
      <header className="project-head column">
        <p className="ui" style={{ marginBottom: "1.5rem" }}>
          <Link href="/projects" className="quiet">All projects</Link>
        </p>
        <h1 className="page-title">{project.title}</h1>
        <p className="ui muted meta">{meta.filter(Boolean).join(" · ")}</p>
        {project.thesis && (
          <p className="ui muted">
            {project.thesis.institution} · Supervised by{" "}
            {joinNames(project.thesis.supervisors)}
          </p>
        )}
        {project.course && (
          <p className="ui muted">
            DTU course{" "}
            <a href={project.course.url}>
              {project.course.code} {project.course.name}
            </a>
          </p>
        )}
        {links.length > 0 && (
          <p className="ui links">
            {links.map((l) => (
              <a key={l.href} href={l.href} download={l.download || undefined}>
                {l.label}
              </a>
            ))}
          </p>
        )}
      </header>

      <div className="hero">
        <Image
          src={project.thumbnail}
          alt=""
          width={1200}
          height={800}
          sizes="(min-width: 64rem) 612px, 100vw"
          priority
        />
      </div>

      <div
        className="article"
        style={{ marginTop: "2.5rem" }}
        dangerouslySetInnerHTML={{ __html: project.html }}
      />
    </article>
  );
}
