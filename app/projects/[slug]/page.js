import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? project.title : "Not found" };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

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
        {[...project.tags, project.year].filter(Boolean).join(" · ")}
      </p>

      <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-neutral-700">
        {project.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

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
