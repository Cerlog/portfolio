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
  return { title: project ? project.title : "Not found" };
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
  const downloads = [
    ...(project.poster ? [{ label: "Poster (PDF)", path: project.poster }] : []),
    ...project.files,
  ];
  const links = [
    ...(project.github ? [{ label: "Code on GitHub", href: project.github }] : []),
    ...project.links,
  ];

  return (
    <article>
      <Link
        href="/projects"
        className="text-sm text-muted hover:text-fg"
      >
        Back to projects
      </Link>

      <h1 className="mt-6 text-3xl font-medium tracking-tight">
        {project.title}
      </h1>

      <p className="mt-2 text-sm text-muted">
        {meta.filter(Boolean).join(" · ")}
      </p>

      {project.thesis && (
        <p className="mt-1 text-sm text-muted">
          {project.thesis.institution} · Supervised by{" "}
          {joinNames(project.thesis.supervisors)}
        </p>
      )}

      {project.course && (
        <p className="mt-1 text-sm text-muted">
          DTU course{" "}
          <a
            href={project.course.url}
            className="underline decoration-line underline-offset-4 hover:text-fg"
          >
            {project.course.code} {project.course.name}
          </a>
        </p>
      )}

      <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-md bg-surface">
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
          priority
        />
      </div>

      <div
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />

      {downloads.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-medium">Downloads</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {downloads.map((file) => (
              <li key={file.path}>
                <a
                  href={file.path}
                  download
                  className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
                >
                  {file.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted underline decoration-line underline-offset-4 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
