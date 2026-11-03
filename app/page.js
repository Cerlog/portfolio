import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import WorkRow from "@/components/WorkRow";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/data/site";

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const slugs = new Set(projects.map((p) => p.slug));

  return (
    <SiteChrome>
      <section aria-labelledby="work">
        <h1 id="work" className="page-title">Selected work</h1>
        <ul className="figure-list">
          {featured.map((p) => (
            <WorkRow key={p.slug} project={p} headingLevel={2} />
          ))}
        </ul>
        <p className="ui" style={{ marginTop: "1rem" }}>
          <Link href="/projects">All projects</Link>
        </p>
      </section>

      <div className="column">
        <section aria-labelledby="about">
          <h2 id="about" className="section-title">About</h2>
          <div style={{ marginTop: "1rem" }}>
            {site.intro.map((paragraph, i) => (
              <p
                key={i}
                style={{ marginTop: i ? "1em" : 0 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="education">
          <h2 id="education" className="section-title">Education</h2>
          <ul className="plain-list">
            {site.education.map((e) => (
              <li key={e.degree}>
                {e.degree}
                <span className="muted">
                  {" "}· {e.school} · {e.years}
                </span>
                {e.thesis && (
                  <>
                    {" · "}
                    <Link href={e.thesis}>Thesis</Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="experience">
          <h2 id="experience" className="section-title">Experience</h2>
          <ul className="plain-list">
            {site.experience.map((x) => (
              <li key={x.role}>
                {x.role}
                <span className="muted">
                  {" "}· {x.place} · {x.years}
                </span>
                {x.detail && (
                  <span className="ui muted" style={{ display: "block" }}>{x.detail}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="coursework">
          <h2 id="coursework" className="section-title">Coursework</h2>
          <ul className="plain-list">
            {site.coursework.map((c) => {
              const href =
                c.project && slugs.has(c.project)
                  ? `/projects/${c.project}`
                  : `https://kurser.dtu.dk/course/${c.code}`;
              return (
                <li key={c.code}>
                  <span className="ui muted tabular code-label">{c.code}</span>{" "}
                  <a href={href} className="quiet">{c.name}</a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </SiteChrome>
  );
}
