import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/data/site";
import { VARIANTS, VARIANT_NAMES } from "../_lib";

// Links from the lab go to the lab copy of the 02456 page, otherwise the real page.
export function projectHref(v, slug) {
  return slug === "rstar-robustness" ? `/lab/${v}/rstar` : `/projects/${slug}`;
}

export function projectMeta(p) {
  const context = p.thesis
    ? `${p.thesis.degree} thesis`
    : p.course
      ? `${p.course.code} ${p.course.name}`
      : null;
  return [context, p.year].filter(Boolean).join(" · ");
}

export function labData() {
  const projects = getAllProjects();
  return {
    projects,
    featured: projects.filter((p) => p.featured),
    others: projects.filter((p) => !p.featured),
    slugs: new Set(projects.map((p) => p.slug)),
  };
}

// A schematic survival-style step curve: falling steps, no axes, no data.
export function StepCurve() {
  const steps = [
    [0, 4], [26, 7], [44, 9], [71, 13], [93, 15], [118, 19], [139, 21],
    [163, 24], [190, 27], [214, 29], [241, 32], [262, 34], [280, 34],
  ];
  let d = `M ${steps[0][0]} ${steps[0][1]}`;
  for (let i = 1; i < steps.length; i++) {
    d += ` H ${steps[i][0]} V ${steps[i][1]}`;
  }
  return (
    <svg className="km" viewBox="0 0 280 40" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function TopNav({ v }) {
  return (
    <nav className="topnav ui" aria-label="Main">
      <Link href={`/lab/${v}`} className="quiet">About</Link>
      <Link href="/projects" className="quiet">Projects</Link>
      <a href={site.cv.en} hrefLang="en" className="quiet">CV</a>
    </nav>
  );
}

export function LabSwitcher({ v }) {
  return (
    <p className="ui muted">
      Design lab:{" "}
      {VARIANTS.map((x, i) => (
        <span key={x}>
          {i > 0 && " · "}
          {x === v ? (
            <span aria-current="page">{VARIANT_NAMES[x]}</span>
          ) : (
            <Link href={`/lab/${x}`} className="quiet">{VARIANT_NAMES[x]}</Link>
          )}
        </span>
      ))}
      {" · "}
      <Link href="/lab/type" className="quiet">Typefaces</Link>
    </p>
  );
}

export function Thumb({ p, sizes }) {
  return (
    <Image
      src={p.thumbnail}
      alt=""
      width={600}
      height={400}
      sizes={sizes}
      style={{ width: "100%", height: "auto" }}
    />
  );
}

export function Education() {
  return (
    <ul className="plain-list">
      {site.education.map((e) => (
        <li key={e.degree}>
          {e.degree}
          <span className="muted">
            {" "}· {e.school} · {e.years}
          </span>
          {e.thesis && (
            <>
              {" "}· <Link href={e.thesis}>Thesis</Link>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <ul className="plain-list">
      {site.experience.map((x) => (
        <li key={x.role}>
          {x.role}
          <span className="muted">
            {" "}· {x.place} · {x.years}
          </span>
          {x.detail && <span className="ui muted" style={{ display: "block" }}>{x.detail}</span>}
        </li>
      ))}
    </ul>
  );
}

export function Coursework({ slugs, v }) {
  return (
    <ul className="plain-list">
      {site.coursework.map((c) => {
        const href =
          c.project && slugs.has(c.project)
            ? projectHref(v, c.project)
            : `https://kurser.dtu.dk/course/${c.code}`;
        return (
          <li key={c.code}>
            <span className="ui muted code">{c.code}</span>{" "}
            <a href={href} className="quiet">{c.name}</a>
          </li>
        );
      })}
    </ul>
  );
}

export function ContactLinks() {
  return (
    <p className="ui" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.5rem" }}>
      {site.links.map((l) => (
        <a key={l.label} href={l.href}>{l.label}</a>
      ))}
      <a href={site.cv.en} hrefLang="en">CV (English)</a>
      <a href={site.cv.da} hrefLang="da">CV (dansk)</a>
    </p>
  );
}

// Header lines of a project page.
export function ArticleHeader({ project }) {
  const meta = [
    project.group ? "Group project" : null,
    ...(project.tags || []),
    String(project.year),
  ].filter(Boolean);
  return (
    <header>
      <h1 className="page-title">{project.title}</h1>
      <p className="ui muted meta">{meta.join(" · ")}</p>
      {project.course && (
        <p className="ui muted">
          DTU course <a href={project.course.url}>{project.course.code} {project.course.name}</a>
        </p>
      )}
      <p className="ui downloads">
        {project.poster && <a href={project.poster} download>Poster (PDF)</a>}
        {project.github && <a href={project.github}>Code on GitHub</a>}
      </p>
    </header>
  );
}
