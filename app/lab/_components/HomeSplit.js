import Link from "next/link";
import { site } from "@/data/site";
import Split from "./Split";
import { Coursework, Education, Experience, Thumb, labData, projectHref, projectMeta } from "./parts";

// Direction C home: the work first, as a figure-led list, then the rest.
export default function HomeSplit() {
  const { featured, others, slugs } = labData();
  return (
    <Split>
      <section aria-labelledby="work">
        <h1 id="work" className="page-title">Selected work</h1>
        <ul className="figure-list" style={{ marginTop: "1.5rem" }}>
          {featured.map((p) => (
            <li key={p.slug} className="figure-row">
              <Thumb p={p} sizes="(min-width: 48rem) 240px, 100vw" />
              <div>
                <h3>
                  <Link href={projectHref("c", p.slug)} className="quiet">{p.title}</Link>
                </h3>
                <p style={{ marginTop: "0.4rem" }}>{p.blurb}</p>
                <p className="ui muted" style={{ marginTop: "0.4rem" }}>{projectMeta(p)}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="section-title">More projects</h2>
        <ul className="figure-list" style={{ marginTop: "1rem" }}>
          {others.map((p) => (
            <li key={p.slug} className="text-row">
              <span className="ui muted code">{p.year}</span>
              <span>
                <Link href={projectHref("c", p.slug)} className="quiet">{p.title}</Link>
                <span className="ui muted"> · {projectMeta(p).replace(/ · \d{4}$/, "")}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="column">
        <section aria-labelledby="about">
          <h2 id="about" className="section-title">About</h2>
          <div className="about" style={{ marginTop: "1rem" }}>
            {site.intro.slice(1).map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </section>

        <section aria-labelledby="education">
          <h2 id="education" className="section-title">Education</h2>
          <Education />
        </section>

        <section aria-labelledby="experience">
          <h2 id="experience" className="section-title">Experience</h2>
          <Experience />
        </section>

        <section aria-labelledby="coursework">
          <h2 id="coursework" className="section-title">Coursework</h2>
          <Coursework slugs={slugs} v="c" />
        </section>
      </div>
    </Split>
  );
}
