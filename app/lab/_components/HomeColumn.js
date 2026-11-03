import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import {
  ContactLinks, Coursework, Education, Experience, LabSwitcher, StepCurve,
  Thumb, TopNav, labData, projectHref, projectMeta,
} from "./parts";

// Directions A and B: one text column, figures and portrait in the right margin.
export default function HomeColumn({ v }) {
  const { featured, slugs } = labData();
  return (
    <div className={`lab lab-${v}`}>
      <div className="frame">
        <TopNav v={v} />
        <div className="column">
          <header style={{ display: "flow-root" }}>
            <figure className="margin">
              <Image src={site.photo} alt={site.fullName} width={288} height={384} className="portrait" priority />
            </figure>
            <h1 className="name">{site.fullName}</h1>
            <p className="ui muted" style={{ marginTop: "0.5rem" }}>{site.role}</p>
            {v === "b" && <StepCurve />}
          </header>

          <section aria-labelledby="about">
            <h2 id="about" className="section-title">About</h2>
            <div className="about" style={{ marginTop: "1rem" }}>
              {site.intro.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </section>

          <section aria-labelledby="work">
            <h2 id="work" className="section-title">Selected work</h2>
            <div className="work">
              {featured.map((p) => (
                <article key={p.slug} className="work-item" style={{ display: "flow-root" }}>
                  <div className="work-thumb">
                    <Thumb p={p} sizes="(min-width: 62rem) 224px, 100vw" />
                  </div>
                  <h3>
                    <Link href={projectHref(v, p.slug)} className="quiet">{p.title}</Link>
                  </h3>
                  <p>{p.blurb}</p>
                  <p className="ui muted">{projectMeta(p)}</p>
                </article>
              ))}
            </div>
            <p className="ui" style={{ marginTop: "1rem" }}>
              <Link href="/projects">All projects</Link>
            </p>
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
            <Coursework slugs={slugs} v={v} />
          </section>

          <section aria-labelledby="links">
            <h2 id="links" className="section-title">Links</h2>
            <div style={{ marginTop: "1rem" }}>
              <ContactLinks />
            </div>
          </section>

          <footer style={{ marginTop: "5rem" }}>
            <LabSwitcher v={v} />
          </footer>
        </div>
      </div>
    </div>
  );
}
