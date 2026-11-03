import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/data/site";

const link =
  "underline decoration-line underline-offset-4 hover:text-fg hover:decoration-fg";

function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="text-xl font-medium tracking-tight">
      {children}
    </h2>
  );
}

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const slugs = new Set(projects.map((p) => p.slug));

  return (
    <>
      <header>
        <h1 className="text-3xl font-medium tracking-tight">{site.fullName}</h1>
        <p className="mt-2 text-muted">{site.role}</p>

        <div className="relative mt-8 aspect-[3/4] w-40 overflow-hidden rounded-lg bg-surface ring-1 ring-line">
          <Image
            src={site.photo}
            alt={site.fullName}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
      </header>

      <section aria-labelledby="about" className="mt-16">
        <SectionHeading id="about">About</SectionHeading>
        <div className="prose-links mt-6 space-y-4 leading-relaxed">
          {site.intro.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </section>

      <section aria-labelledby="work" className="mt-16">
        <div className="flex items-baseline justify-between">
          <SectionHeading id="work">Selected work</SectionHeading>
          <Link href="/projects" className="text-sm text-muted hover:text-fg">
            All projects
          </Link>
        </div>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="education" className="mt-16">
        <SectionHeading id="education">Education</SectionHeading>
        <ul className="mt-6 space-y-3">
          {site.education.map((e) => (
            <li key={e.degree} className="leading-relaxed">
              <span>{e.degree}</span>
              <span className="text-muted">
                {" "}
                · {e.school} · {e.years}
                {e.thesis && (
                  <>
                    {" · "}
                    <Link href={e.thesis} className={link}>
                      Thesis
                    </Link>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="experience" className="mt-16">
        <SectionHeading id="experience">Experience</SectionHeading>
        <ul className="mt-6 space-y-3">
          {site.experience.map((x) => (
            <li key={x.role} className="leading-relaxed">
              <span>{x.role}</span>
              <span className="text-muted">
                {" "}
                · {x.place} · {x.years}
              </span>
              {x.detail && (
                <span className="block text-sm text-muted">{x.detail}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="coursework" className="mt-16">
        <SectionHeading id="coursework">Coursework</SectionHeading>
        <ul className="mt-6 space-y-2">
          {site.coursework.map((c) => {
            const href =
              c.project && slugs.has(c.project)
                ? `/projects/${c.project}`
                : `https://kurser.dtu.dk/course/${c.code}`;
            return (
              <li key={c.code} className="flex gap-4 leading-relaxed">
                <span className="w-12 shrink-0 text-sm tabular-nums text-muted">
                  {c.code}
                </span>
                <a href={href} className={link}>
                  {c.name}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="links" className="mt-16">
        <SectionHeading id="links">Links</SectionHeading>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {site.links.map((l) => (
            <a key={l.label} href={l.href} className={`text-muted ${link}`}>
              {l.label}
            </a>
          ))}
          <a
            href={site.cv.en}
            hrefLang="en"
            className="rounded-full border border-line px-4 py-1.5 hover:border-fg"
          >
            CV (EN)
          </a>
          <a
            href={site.cv.da}
            hrefLang="da"
            className="rounded-full border border-line px-4 py-1.5 hover:border-fg"
          >
            CV (DA)
          </a>
        </div>
      </section>
    </>
  );
}
