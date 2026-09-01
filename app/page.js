import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section>
        <div className="relative aspect-[3/4] w-44 rounded-xl bg-white p-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] ring-1 ring-neutral-900/10">
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-b from-neutral-50 to-neutral-100">
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

        <div className="prose-links mt-6 space-y-4 leading-relaxed text-neutral-700">
          {site.intro.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {site.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}

          <a
            href={site.cv}
            className="rounded-full border border-neutral-300 px-4 py-1.5 hover:border-neutral-900"
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
            className="text-sm text-neutral-500 hover:text-neutral-900"
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