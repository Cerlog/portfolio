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

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const meta = [TYPE_LABELS[project.type], ...project.tags, project.year];

  return (
    <article>
      <Link
        href="/projects"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        Back to projects
      </Link>

      <h1 className="mt-6 text-3xl font-medium tracking-tight">
        {project.title}
      </h1>

      <p className="mt-2 text-sm text-neutral-400">
        {meta.filter(Boolean).join(" · ")}
      </p>

      <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-md bg-neutral-100">
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

      {project.files.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-medium">Downloads</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {project.files.map((file) => (
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

      {project.links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
