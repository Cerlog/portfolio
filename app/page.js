import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/data/site";

export default function Home() {
  const featured = getAllProjects().filter((p) => p.featured);

  return (
    <>
      <section>
        <div className="relative aspect-[3/4] w-44 rounded-xl bg-bg p-2 ring-1 ring-line">
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-surface">
            <Image
              src={site.photo}
              alt={site.fullName}
              fill
              sizes="176px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-medium tracking-tight">
          Hi, I&apos;m {site.name}
        </h1>

        <div className="prose-links mt-6 space-y-4 leading-relaxed text-fg">
          {site.intro.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {site.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted underline decoration-line underline-offset-4 hover:text-fg"
            >
              {link.label}
            </a>
          ))}

          <a
            href={site.cv}
            className="rounded-full border border-line px-4 py-1.5 hover:border-fg"
          >
            Download CV
          </a>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-medium tracking-tight">Selected work</h2>
          <Link
            href="/projects"
            className="text-sm text-muted hover:text-fg"
          >
            All projects
          </Link>
        </div>

        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}